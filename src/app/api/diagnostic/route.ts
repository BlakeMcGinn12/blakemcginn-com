import { NextRequest } from 'next/server';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

const ddbClient = new DynamoDBClient({ 
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
  }
});

const docClient = DynamoDBDocumentClient.from(ddbClient);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  
  // Simple auth
  if (secret !== process.env.ORACLE_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    // Get recent findings
    const { Items: findings } = await docClient.send(new ScanCommand({
      TableName: 'ai_findings',
      Limit: 50
    }));
    
    // Get recent analyses
    const { Items: analyses } = await docClient.send(new ScanCommand({
      TableName: 'user_analyses',
      Limit: 20
    }));
    
    // Get subscribers
    const { Items: subscribers } = await docClient.send(new ScanCommand({
      TableName: 'email_subscribers',
      Limit: 20
    }));
    
    return Response.json({
      timestamp: new Date().toISOString(),
      summary: {
        totalFindings: findings?.length || 0,
        totalAnalyses: analyses?.length || 0,
        totalSubscribers: subscribers?.length || 0
      },
      recentFindings: findings?.slice(0, 10),
      recentAnalyses: analyses?.slice(0, 5),
      tables: ['ai_findings', 'user_analyses', 'user_alerts', 'email_subscribers']
    });
  } catch (error) {
    return Response.json({
      error: 'Failed to fetch diagnostics',
      details: (error as Error).message
    }, { status: 500 });
  }
}
