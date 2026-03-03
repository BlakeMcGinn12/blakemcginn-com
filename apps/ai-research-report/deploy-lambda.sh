#!/bin/bash
# deploy-lambda.sh - Deploy the daily AI research report Lambda

set -e

echo "==============================================="
echo "Deploying AI Research Daily Report Lambda"
echo "==============================================="
echo ""

FUNCTION_NAME="ai-research-daily-report"
REGION="us-east-1"
ROLE_NAME="ai-research-agent-role"  # reuse existing role with DynamoDB & logging
ZIP_FILE="function.zip"

echo "Step 1: Installing dependencies..."
npm install

echo ""
echo "Step 2: Creating deployment package..."
zip -r "$ZIP_FILE" . -x '*.git*' -x '*.zip' -x 'deploy*.sh' -x 'setup*.sh'

echo ""
echo "Step 3: Checking if Lambda function exists..."
if aws lambda get-function --function-name "$FUNCTION_NAME" --region "$REGION" 2>&1 | grep -q "ResourceNotFoundException"; then
  echo "Function doesn't exist. Creating..."

  # Get or create IAM role (assumes ai-research-agent-role already exists in most setups)
  ROLE_ARN=$(aws iam get-role --role-name "$ROLE_NAME" --query 'Role.Arn' --output text 2>/dev/null || echo "")

  if [ -z "$ROLE_ARN" ]; then
    echo "Creating IAM role $ROLE_NAME ..."

    cat > trust-policy.json << 'EOF'
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF

    aws iam create-role \
      --role-name "$ROLE_NAME" \
      --assume-role-policy-document file://trust-policy.json

    aws iam attach-role-policy \
      --role-name "$ROLE_NAME" \
      --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole

    aws iam attach-role-policy \
      --role-name "$ROLE_NAME" \
      --policy-arn arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess

    echo "Waiting for IAM role to propagate..."
    sleep 10

    ROLE_ARN=$(aws iam get-role --role-name "$ROLE_NAME" --query 'Role.Arn' --output text)
  fi

  aws lambda create-function \
    --function-name "$FUNCTION_NAME" \
    --runtime nodejs20.x \
    --handler index.handler \
    --role "$ROLE_ARN" \
    --zip-file fileb://"$ZIP_FILE" \
    --region "$REGION" \
    --timeout 300 \
    --memory-size 512 \
    --no-cli-pager
else
  echo "Function exists. Updating code..."
  aws lambda update-function-code \
    --function-name "$FUNCTION_NAME" \
    --zip-file fileb://"$ZIP_FILE" \
    --region "$REGION" \
    --no-cli-pager
fi

echo ""
echo "Step 4: Setting up EventBridge cron trigger..."
RULE_NAME="daily-ai-research-report"

# 6:30 AM Eastern (approx 11:30 UTC; adjust if needed)
aws events put-rule \
  --name "$RULE_NAME" \
  --schedule-expression "cron(30 11 * * ? *)" \
  --region "$REGION" \
  --no-cli-pager 2>/dev/null || true

FUNCTION_ARN=$(aws lambda get-function --function-name "$FUNCTION_NAME" --region "$REGION" --query 'Configuration.FunctionArn' --output text)

aws events put-targets \
  --rule "$RULE_NAME" \
  --targets "Id=1,Arn=$FUNCTION_ARN" \
  --region "$REGION" \
  --no-cli-pager 2>/dev/null || true

aws lambda add-permission \
  --function-name "$FUNCTION_NAME" \
  --statement-id EventBridgeInvokeReport \
  --action lambda:InvokeFunction \
  --principal events.amazonaws.com \
  --source-arn "arn:aws:events:$REGION:$(aws sts get-caller-identity --query Account --output text):rule/$RULE_NAME" \
  --region "$REGION" \
  --no-cli-pager 2>/dev/null || true

echo ""
echo "==============================================="
echo "Deployment Complete!"
echo "==============================================="
echo "Function: $FUNCTION_NAME"
echo "Region:  $REGION"
echo "Schedule: Daily at ~6:30 AM ET (cron(30 11 * * ? *))"
echo ""
echo "Remember to set environment variables on the Lambda:"
echo "  OPENAI_API_KEY, POSTMARK_SERVER_TOKEN, REPORT_TO_EMAIL, REPORT_FROM_EMAIL"
echo ""

rm -f trust-policy.json "$ZIP_FILE"
