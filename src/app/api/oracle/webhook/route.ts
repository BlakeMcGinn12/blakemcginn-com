import { NextRequest } from 'next/server';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

// Initialize AWS clients
const ddbClient = new DynamoDBClient({ 
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
  }
});

const docClient = DynamoDBDocumentClient.from(ddbClient);
const sesClient = new SESClient({ 
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
  }
});

export async function PUT(request: NextRequest) {
  console.log('Oracle webhook received from Research Agent');
  
  try {
    // Verify authorization
    const auth = request.headers.get('Authorization');
    const expectedAuth = `Bearer ${process.env.ORACLE_SECRET}`;
    
    if (auth !== expectedAuth) {
      console.error('Unauthorized webhook attempt');
      return Response.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Parse findings
    const { findings } = await request.json();
    
    if (!findings || !Array.isArray(findings) || findings.length === 0) {
      return Response.json(
        { error: 'No findings provided' },
        { status: 400 }
      );
    }
    
    console.log(`Processing ${findings.length} major findings`);
    
    // Extract all affected roles from findings
    const affectedRoles = findings
      .flatMap((f: any) => f.affected_roles || [])
      .filter((role: string) => role && role.length > 0);
    
    const uniqueRoles = [...new Set(affectedRoles)];
    console.log('Affected roles:', uniqueRoles);
    
    if (uniqueRoles.length === 0) {
      return Response.json({
        success: true,
        alerted: 0,
        message: 'No specific roles affected'
      });
    }
    
    // Find users with affected roles (last 90 days)
    const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString();
    const affectedUsers = await findAffectedUsers(uniqueRoles, ninetyDaysAgo);
    
    console.log(`Found ${affectedUsers.length} potentially affected users`);
    
    // Create alerts for affected users
    const alertsCreated = [];
    
    for (const user of affectedUsers) {
      // Check if user already has a recent alert for this
      const hasRecentAlert = await checkRecentAlert(user.user_id, findings[0].title);
      
      if (!hasRecentAlert) {
        const alert = await createAlert(user.user_id, findings);
        alertsCreated.push(alert);
        
        // Send email notification if we have their email
        if (user.email) {
          await sendRiskAlertEmail(user.email, user.role_title, findings);
        }
      }
    }
    
    console.log(`Created ${alertsCreated.length} new alerts`);
    
    return Response.json({
      success: true,
      findings_processed: findings.length,
      roles_affected: uniqueRoles.length,
      users_checked: affectedUsers.length,
      alerts_created: alertsCreated.length
    });
    
  } catch (error) {
    console.error('Webhook processing failed:', error);
    return Response.json(
      { error: 'Processing failed', details: (error as Error).message },
      { status: 500 }
    );
  }
}

async function findAffectedUsers(roles: string[], since: string) {
  // Query user_analyses table for users with matching roles
  // Note: This requires a scan since role_title is not the partition key
  // For production, consider a GSI on role_title
  
  try {
    // Get recent analyses and filter by role
    // This is a simplified version - in production use a GSI
    const { Items } = await docClient.send(new QueryCommand({
      TableName: 'user_analyses',
      IndexName: 'role_index', // You'd need to create this GSI
      KeyConditionExpression: 'created_at > :date',
      FilterExpression: roles.map((_, i) => `contains(role_title, :role${i})`).join(' OR '),
      ExpressionAttributeValues: {
        ':date': since,
        ...roles.reduce((acc, role, i) => ({ ...acc, [`:role${i}`]: role }), {})
      }
    }));
    
    // Deduplicate by user_id
    const uniqueUsers = new Map();
    (Items || []).forEach((item: any) => {
      if (!uniqueUsers.has(item.user_id)) {
        uniqueUsers.set(item.user_id, item);
      }
    });
    
    return Array.from(uniqueUsers.values());
    
  } catch (err) {
    console.error('Failed to query affected users:', err);
    
    // Fallback: return empty array or use a simpler query
    // In production, you'd want to create a GSI on role_title
    return [];
  }
}

async function checkRecentAlert(userId: string, findingTitle: string) {
  try {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    
    const { Items } = await docClient.send(new QueryCommand({
      TableName: 'user_alerts',
      KeyConditionExpression: 'user_id = :uid AND created_at > :date',
      FilterExpression: 'contains(message, :title)',
      ExpressionAttributeValues: {
        ':uid': userId,
        ':date': oneDayAgo,
        ':title': findingTitle.substring(0, 50)
      }
    }));
    
    return (Items || []).length > 0;
  } catch (err) {
    return false;
  }
}

async function createAlert(userId: string, findings: any[]) {
  const alertId = `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const topFinding = findings[0];
  
  const alert = {
    user_id: userId,
    alert_id: alertId,
    alert_type: 'major_finding',
    severity: Math.max(...findings.map((f: any) => f.risk_impact || 5)),
    message: `New AI development may affect your role: ${topFinding.title}`,
    details: {
      findings: findings.map((f: any) => ({
        title: f.title,
        summary: f.summary,
        risk_impact: f.risk_impact
      }))
    },
    read: false,
    created_at: new Date().toISOString()
  };
  
  await docClient.send(new PutCommand({
    TableName: 'user_alerts',
    Item: alert
  }));
  
  return alert;
}

async function sendRiskAlertEmail(email: string, roleTitle: string, findings: any[]) {
  try {
    const topFinding = findings[0];
    const fromEmail = process.env.FROM_EMAIL || 'alerts@blakemcginn.com';
    
    await sesClient.send(new SendEmailCommand({
      Source: fromEmail,
      Destination: {
        ToAddresses: [email]
      },
      Message: {
        Subject: {
          Data: `🚨 Automation Alert: New AI developments affecting ${roleTitle}`
        },
        Body: {
          Text: {
            Data: `Hi there,

Our AI research has detected new developments that may affect your role as a ${roleTitle}.

${topFinding.title}
Impact: ${topFinding.risk_impact}/10

${topFinding.summary}

View your updated forecast: https://blakemcginn.com/forecast

Best regards,
The Automation Oracle
`
          },
          Html: {
            Data: `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #1e40af;">🚨 Automation Risk Alert</h2>
  
  <p>Our AI research has detected new developments that may affect your role as a <strong>${roleTitle}</strong>.</p>
  
  <div style="background: #f8fafc; border-left: 4px solid #dc2626; padding: 15px; margin: 20px 0;">
    <h3 style="margin-top: 0;">${topFinding.title}</h3>
    <p><strong>Impact Level:</strong> ${topFinding.risk_impact}/10</p>
    <p>${topFinding.summary}</p>
  </div>
  
  <a href="https://blakemcginn.com/forecast" 
     style="display: inline-block; background: #1d4ed8; color: white; padding: 12px 24px; 
            text-decoration: none; border-radius: 6px; margin: 20px 0;">
    View Updated Forecast
  </a>
  
  <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
    You're receiving this because you analyzed your role on our Automation Forecast tool.
  </p>
</body>
</html>
`
          }
        }
      }
    }));
    
    console.log(`Alert email sent to ${email}`);
  } catch (err) {
    console.error('Failed to send email:', err);
  }
}

// Health check endpoint
export async function GET() {
  return Response.json({
    status: 'ok',
    service: 'oracle-webhook',
    timestamp: new Date().toISOString()
  });
}
