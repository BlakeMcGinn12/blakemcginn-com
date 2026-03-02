// Add this function to index.js to log to DynamoDB instead of just CloudWatch

async function logToDynamoDB(level, message, data = {}) {
  try {
    await docClient.send(new PutCommand({
      TableName: 'lambda_logs',
      Item: {
        log_id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
        level,
        message,
        data,
        function_name: 'ai-research-agent'
      }
    }));
  } catch (err) {
    console.error('Failed to write log:', err);
  }
}

// Use it like this:
// await logToDynamoDB('INFO', 'Starting research', { finding_count: 5 });
