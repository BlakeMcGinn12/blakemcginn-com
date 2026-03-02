#!/bin/bash
# get-logs.sh - Run this on Hostinger to fetch Lambda logs

export AWS_REGION=us-east-1
export AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY"
export AWS_SECRET_ACCESS_KEY="$AWS_SECRET_KEY"

echo "=== Lambda Function Status ==="
aws lambda get-function --function-name ai-research-agent --query 'Configuration.State' --output text

echo ""
echo "=== CloudWatch Logs (Last Hour) ==="
aws logs filter-log-events \
  --log-group-name /aws/lambda/ai-research-agent \
  --start-time $(($(date +%s) - 3600))000 \
  --output table

echo ""
echo "=== DynamoDB Tables ==="
aws dynamodb list-tables --region us-east-1 | grep -E "ai_findings|user_analyses|email"

echo ""
echo "=== Last Lambda Invocation ==="
aws lambda invoke \
  --function-name ai-research-agent \
  --payload '{}' \
  --cli-binary-format raw-in-base64-out \
  response.json 2>&1

echo ""
echo "=== Lambda Response ==="
cat response.json 2>/dev/null || echo "No response file"
