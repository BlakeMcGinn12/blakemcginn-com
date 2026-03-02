import { NextRequest } from 'next/server';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';

const ddbClient = new DynamoDBClient({ 
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
  }
});

const docClient = DynamoDBDocumentClient.from(ddbClient);

export async function POST(request: NextRequest) {
  try {
    const { email, source } = await request.json();
    
    if (!email || !email.includes('@')) {
      return Response.json(
        { error: 'Valid email required' },
        { status: 400 }
      );
    }
    
    // Check if email already exists
    const { Items } = await docClient.send(new QueryCommand({
      TableName: 'email_subscribers',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email.toLowerCase()
      }
    }));
    
    if (Items && Items.length > 0) {
      // Update existing record with new source
      await docClient.send(new PutCommand({
        TableName: 'email_subscribers',
        Item: {
          email: email.toLowerCase(),
          created_at: Items[0].created_at,
          updated_at: new Date().toISOString(),
          sources: [...new Set([...Items[0].sources, source])],
          active: true
        }
      }));
      
      return Response.json({
        success: true,
        message: 'Email updated'
      });
    }
    
    // Create new subscriber
    await docClient.send(new PutCommand({
      TableName: 'email_subscribers',
      Item: {
        email: email.toLowerCase(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        sources: [source],
        active: true
      }
    }));
    
    return Response.json({
      success: true,
      message: 'Email saved'
    });
    
  } catch (error) {
    console.error('Failed to save email:', error);
    return Response.json(
      { error: 'Failed to save email' },
      { status: 500 }
    );
  }
}
