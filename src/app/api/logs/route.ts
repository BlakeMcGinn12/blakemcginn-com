import { NextRequest } from 'next/server';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb';

const ddbClient = new DynamoDBClient({ 
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
  }
});

const docClient = DynamoDBDocumentClient.from(ddbClient);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const hours = parseInt(searchParams.get('hours') || '24');
    
    const since = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
    
    const { Items } = await docClient.send(new QueryCommand({
      TableName: 'lambda_logs',
      KeyConditionExpression: 'function_name = :fn AND #ts > :since',
      ExpressionAttributeNames: {
        '#ts': 'timestamp'
      },
      ExpressionAttributeValues: {
        ':fn': 'ai-research-agent',
        ':since': since
      },
      ScanIndexForward: false
    }));
    
    return Response.json({
      logs: Items || [],
      count: (Items || []).length
    });
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch logs' },
      { status: 500 }
    );
  }
}
