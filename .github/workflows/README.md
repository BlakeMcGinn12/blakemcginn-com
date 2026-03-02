# GitHub Actions Deployment Setup

This workflow deploys the AI Research Agent infrastructure automatically via GitHub Actions.

## Required GitHub Secrets

Go to your GitHub repo → Settings → Secrets and variables → Actions → New repository secret

Add these secrets:

| Secret Name | Value | Where to Get It |
|-------------|-------|-----------------|
| `AWS_ACCESS_KEY_ID` | `AKIA...` | AWS IAM Console → User → Security credentials |
| `AWS_SECRET_ACCESS_KEY` | `wJalr...` | Same as above (create new access key) |
| `OPENAI_API_KEY` | `sk-...` | OpenAI Dashboard → API Keys |
| `ORACLE_WEBHOOK_URL` | `https://blakemcginn.com/api/oracle/webhook` | Your site's API endpoint |
| `ORACLE_SECRET` | `a3f8d2e9...` | Generate with: `openssl rand -hex 32` |

## How to Deploy

### Option 1: Automatic (On Push)
When you push changes to `apps/research-agent/**` on the `main` branch, the workflow runs automatically.

### Option 2: Manual Trigger
1. Go to GitHub repo → Actions tab
2. Select "Deploy AI Research Agent"
3. Click "Run workflow"

## What Gets Deployed

1. **DynamoDB Tables** (us-east-1):
   - `ai_findings` - Stores AI research discoveries
   - `user_analyses` - Stores user forecast history
   - `user_alerts` - Stores notification queue

2. **Lambda Function** (us-east-1):
   - Name: `ai-research-agent`
   - Runtime: Node.js 20.x
   - Trigger: Daily at 6 AM EST via EventBridge

3. **EventBridge Rule**:
   - Cron schedule: `0 11 * * ? *` (6 AM EST)
   - Invokes Lambda daily

## AWS IAM User Setup

If you don't have AWS credentials yet:

1. Go to AWS Console → IAM → Users
2. Create new user: `github-actions-deploy`
3. Attach policies:
   - `AWSLambdaFullAccess`
   - `AmazonDynamoDBFullAccess`
   - `AmazonEventBridgeFullAccess`
   - `IAMFullAccess` (for creating Lambda execution role)
4. Create access key → copy to GitHub secrets

## Verify Deployment

After the workflow runs, check:

```bash
# List DynamoDB tables
aws dynamodb list-tables --region us-east-1

# Check Lambda function
aws lambda get-function --function-name ai-research-agent --region us-east-1

# Test Lambda manually
aws lambda invoke \
  --function-name ai-research-agent \
  --region us-east-1 \
  response.json && cat response.json
```

## Troubleshooting

**Workflow fails with "Unable to locate credentials"**
→ Check that AWS secrets are correctly set in GitHub

**Lambda creation fails with IAM error**
→ Ensure the IAM user has `IAMFullAccess` policy

**DynamoDB table already exists error**
→ This is fine, the workflow handles this gracefully
