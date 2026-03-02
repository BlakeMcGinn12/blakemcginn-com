# AWS Lambda Debugging Pattern

## Problem
Cannot access CloudWatch logs directly from sandboxed environment (no AWS CLI, no outbound internet).

## Solution: Diagnostic API Endpoint

Instead of fetching logs, expose system state via an API endpoint on the main application.

### Implementation

```typescript
// src/app/api/diagnostic/route.ts
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
  
  if (secret !== process.env.ORACLE_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Query DynamoDB tables
  const { Items: findings } = await docClient.send(new ScanCommand({
    TableName: 'ai_findings',
    Limit: 50
  }));
  
  return Response.json({
    timestamp: new Date().toISOString(),
    summary: {
      totalFindings: findings?.length || 0
    },
    recentFindings: findings?.slice(0, 10)
  });
}
```

### Usage

Agent can query instantly via:
```
https://yoursite.com/api/diagnostic?secret=YOUR_SECRET
```

### Advantages

- ✅ Instant access (no delay)
- ✅ No git history pollution
- ✅ Query any time
- ✅ Full system state, not just logs
- ✅ Works with sandboxed environments

### When to Use

- Debugging Lambda functions
- Checking DynamoDB state
- Monitoring system health
- Verifying data flow

### When NOT to Use

- Real-time log streaming (still need CloudWatch)
- Deep log analysis (only summary data)
- Production monitoring (use proper tools)

## Alternative: GitHub Actions Log Fetcher

If diagnostic endpoint isn't enough, use GitHub Actions to fetch logs and commit them:

```yaml
name: Fetch Logs
on:
  workflow_dispatch:  # Manual trigger
  
jobs:
  fetch-logs:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: aws-actions/configure-aws-credentials@v4
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-east-1
    - run: |
        aws logs tail /aws/lambda/my-function --since 2h > logs/latest.txt
        git add logs/ && git commit -m "Update logs" && git push
```

**Trade-off:** 2-minute delay, messy git history.

## Recommendation

**Use Diagnostic API** for most debugging. It's cleaner, faster, and purpose-built.

**Use GitHub Actions** only when you need actual CloudWatch log content.
