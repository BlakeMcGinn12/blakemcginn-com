# AI Research & Oracle System - Deployment Guide

## Architecture Summary

```
┌─────────────────────────────────────────────────────────────────┐
│  AWS us-east-1                                                  │
│  ├── Lambda: ai-research-agent (Daily 6 AM EST)                 │
│  ├── DynamoDB: ai_findings, user_analyses, user_alerts         │
│  └── EventBridge: Daily cron trigger                           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ Webhook calls
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Render (Your existing site)                                    │
│  ├── /api/oracle/analyze  →  User analysis endpoint            │
│  ├── /api/oracle/webhook  →  Research notifications            │
│  └── /forecast            →  Frontend (already exists)         │
└─────────────────────────────────────────────────────────────────┘
```

---

## Step 1: Create DynamoDB Tables (us-east-1)

```bash
# Navigate to the research-agent directory
cd website/apps/research-agent

# Make scripts executable
chmod +x setup-dynamodb.sh deploy-lambda.sh

# Set up the tables
./setup-dynamodb.sh
```

Or run manually:

```bash
# Table 1: AI Findings
aws dynamodb create-table \
  --table-name ai_findings \
  --attribute-definitions AttributeName=source,AttributeType=S AttributeName=created_at,AttributeType=S \
  --key-schema AttributeName=source,KeyType=HASH AttributeName=created_at,KeyType=RANGE \
  --billing-mode PAY_PER_REQUEST \
  --region us-east-1

# Table 2: User Analyses
aws dynamodb create-table \
  --table-name user_analyses \
  --attribute-definitions AttributeName=user_id,AttributeType=S AttributeName=created_at,AttributeType=S \
  --key-schema AttributeName=user_id,KeyType=HASH AttributeName=created_at,KeyType=RANGE \
  --billing-mode PAY_PER_REQUEST \
  --region us-east-1

# Table 3: User Alerts
aws dynamodb create-table \
  --table-name user_alerts \
  --attribute-definitions AttributeName=user_id,AttributeType=S AttributeName=alert_id,AttributeType=S \
  --key-schema AttributeName=user_id,KeyType=HASH AttributeName=alert_id,KeyType=RANGE \
  --billing-mode PAY_PER_REQUEST \
  --region us-east-1
```

---

## Step 2: Set Environment Variables on Render

Go to your Render dashboard → Environment Variables:

```bash
# AWS Credentials (for Oracle to access DynamoDB)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...

# OpenAI
OPENAI_API_KEY=sk-...

# Oracle Security (generate with: openssl rand -hex 32)
ORACLE_SECRET=your-random-secret-here

# Email (optional - for alerts)
FROM_EMAIL=alerts@blakemcginn.com
```

---

## Step 3: Deploy Research Agent to AWS Lambda

```bash
cd website/apps/research-agent

# Set required env vars
export OPENAI_API_KEY=sk-...
export ORACLE_WEBHOOK_URL=https://blakemcginn.com/api/oracle/webhook
export ORACLE_SECRET=your-random-secret-here

# Deploy
./deploy-lambda.sh
```

This will:
1. Create the Lambda function
2. Set up the IAM role with DynamoDB/SES permissions
3. Create EventBridge cron rule (daily 6 AM EST)
4. Connect everything together

---

## Step 4: Deploy Oracle to Render

```bash
# From website root
cd website

# Add new dependencies
npm install @aws-sdk/client-dynamodb @aws-sdk/client-ses @aws-sdk/lib-dynamodb

# Commit and push
git add .
git commit -m "Add Oracle API and Research Agent"
git push origin main
```

Render will automatically deploy the new API routes.

---

## Step 5: Test Everything

### Test Oracle Endpoint

```bash
curl -X POST https://blakemcginn.com/api/oracle/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "job_description": "I am a marketing manager who creates ad campaigns, analyzes performance metrics, and manages a team of 3 people",
    "experience": "5 years",
    "industry": "Technology"
  }'
```

### Test Research Agent Manually

```bash
aws lambda invoke \
  --function-name ai-research-agent \
  --region us-east-1 \
  response.json

cat response.json
```

### Check Logs

```bash
# Lambda logs
aws logs tail /aws/lambda/ai-research-agent --region us-east-1 --follow

# Render logs (in Render dashboard)
```

---

## Cost Breakdown

| Service | Free Tier | Expected Cost |
|---------|-----------|---------------|
| DynamoDB | 25GB + 25M reads/writes | **$0** |
| Lambda | 1M requests | **$0** |
| EventBridge | 1M events | **$0** |
| SES | 62,000 emails | **$0** |
| OpenAI GPT-4o-mini | None | **~$5-10/month** |
| **Total** | | **~$5-10/month** |

---

## File Structure

```
website/
├── apps/
│   └── research-agent/
│       ├── index.js              # Lambda handler
│       ├── package.json
│       ├── setup-dynamodb.sh     # Creates tables
│       └── deploy-lambda.sh      # Deploys Lambda
├── src/
│   └── app/
│       └── api/
│           └── oracle/
│               ├── analyze/      # POST - User analysis
│               │   └── route.ts
│               └── webhook/      # PUT - Research notifications
│                   └── route.ts
└── .env                          # Add AWS credentials here
```

---

## Troubleshooting

### Lambda can't access DynamoDB
Check IAM role has `AmazonDynamoDBFullAccess` policy attached.

### Oracle can't access DynamoDB
Verify `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` are set in Render env vars.

### Webhook returns 401
Make sure `ORACLE_SECRET` matches between Lambda env vars and Render env vars.

### Research Agent not running daily
Check EventBridge rule in AWS Console → EventBridge → Rules → daily-ai-research

---

## Next Steps

1. ✅ Create DynamoDB tables
2. ✅ Deploy Lambda function
3. ✅ Add env vars to Render
4. ✅ Deploy Oracle API
5. ✅ Test the system
6. 🔄 Monitor for a few days
7. 🚀 Add more data sources (TwitterAPI.io, etc.)
