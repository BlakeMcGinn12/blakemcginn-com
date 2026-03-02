#!/bin/bash
# deploy-lambda.sh - Deploy the research agent to AWS Lambda

set -e

echo "==============================================="
echo "Deploying AI Research Agent to AWS Lambda"
echo "==============================================="
echo ""

# Configuration
FUNCTION_NAME="ai-research-agent"
REGION="us-east-1"
ROLE_NAME="ai-research-agent-role"
ZIP_FILE="function.zip"

# Check for required env vars
if [ -z "$OPENAI_API_KEY" ]; then
    echo "Error: OPENAI_API_KEY not set"
    exit 1
fi

if [ -z "$ORACLE_WEBHOOK_URL" ]; then
    echo "Error: ORACLE_WEBHOOK_URL not set"
    echo "Example: https://blakemcginn.com/api/oracle/webhook"
    exit 1
fi

if [ -z "$ORACLE_SECRET" ]; then
    echo "Error: ORACLE_SECRET not set"
    echo "Generate with: openssl rand -hex 32"
    exit 1
fi

echo "Step 1: Installing dependencies..."
npm install

echo ""
echo "Step 2: Creating deployment package..."
zip -r $ZIP_FILE . -x '*.git*' -x '*.zip' -x 'deploy*.sh' -x 'setup*.sh'

echo ""
echo "Step 3: Checking if Lambda function exists..."
if aws lambda get-function --function-name $FUNCTION_NAME --region $REGION 2>&1 | grep -q "ResourceNotFoundException"; then
    echo "Function doesn't exist. Creating..."
    
    # Create IAM role if it doesn't exist
    if ! aws iam get-role --role-name $ROLE_NAME 2>&1 | grep -q "NoSuchEntity"; then
        echo "Creating IAM role..."
        
        # Create trust policy
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
        
        # Create role
        aws iam create-role \
            --role-name $ROLE_NAME \
            --assume-role-policy-document file://trust-policy.json \
            --no-cli-pager
        
        # Attach policies
        aws iam attach-role-policy \
            --role-name $ROLE_NAME \
            --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
        
        aws iam attach-role-policy \
            --role-name $ROLE_NAME \
            --policy-arn arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess
        
        aws iam attach-role-policy \
            --role-name $ROLE_NAME \
            --policy-arn arn:aws:iam::aws:policy/AmazonSESFullAccess
        
        echo "Waiting for IAM role to propagate..."
        sleep 10
    fi
    
    # Get role ARN
    ROLE_ARN=$(aws iam get-role --role-name $ROLE_NAME --query 'Role.Arn' --output text)
    
    # Create function
    aws lambda create-function \
        --function-name $FUNCTION_NAME \
        --runtime nodejs20.x \
        --handler index.handler \
        --role $ROLE_ARN \
        --zip-file fileb://$ZIP_FILE \
        --region $REGION \
        --timeout 300 \
        --memory-size 512 \
        --environment "Variables={OPENAI_API_KEY=$OPENAI_API_KEY,ORACLE_WEBHOOK_URL=$ORACLE_WEBHOOK_URL,ORACLE_SECRET=$ORACLE_SECRET,ENABLE_NITTER=false}" \
        --no-cli-pager
else
    echo "Function exists. Updating code..."
    aws lambda update-function-code \
        --function-name $FUNCTION_NAME \
        --zip-file fileb://$ZIP_FILE \
        --region $REGION \
        --no-cli-pager
    
    echo "Updating environment variables..."
    aws lambda update-function-configuration \
        --function-name $FUNCTION_NAME \
        --environment "Variables={OPENAI_API_KEY=$OPENAI_API_KEY,ORACLE_WEBHOOK_URL=$ORACLE_WEBHOOK_URL,ORACLE_SECRET=$ORACLE_SECRET,ENABLE_NITTER=false}" \
        --region $REGION \
        --no-cli-pager
fi

echo ""
echo "Step 4: Setting up EventBridge cron trigger..."
RULE_NAME="daily-ai-research"

# Create rule if it doesn't exist
aws events put-rule \
    --name $RULE_NAME \
    --schedule-expression "cron(0 11 * * ? *)" \
    --region $REGION \
    --no-cli-pager 2>/dev/null || true

# Add Lambda as target
FUNCTION_ARN=$(aws lambda get-function --function-name $FUNCTION_NAME --region $REGION --query 'Configuration.FunctionArn' --output text)

aws events put-targets \
    --rule $RULE_NAME \
    --targets "Id=1,Arn=$FUNCTION_ARN" \
    --region $REGION \
    --no-cli-pager 2>/dev/null || true

# Add permission for EventBridge to invoke Lambda
aws lambda add-permission \
    --function-name $FUNCTION_NAME \
    --statement-id EventBridgeInvoke \
    --action lambda:InvokeFunction \
    --principal events.amazonaws.com \
    --source-arn "arn:aws:events:$REGION:$(aws sts get-caller-identity --query Account --output text):rule/$RULE_NAME" \
    --region $REGION \
    --no-cli-pager 2>/dev/null || true

echo ""
echo "==============================================="
echo "Deployment Complete!"
echo "==============================================="
echo ""
echo "Function: $FUNCTION_NAME"
echo "Region: $REGION"
echo "Schedule: Daily at 6:00 AM EST (11:00 UTC)"
echo ""
echo "To test manually:"
echo "  aws lambda invoke --function-name $FUNCTION_NAME --region $REGION /dev/null"
echo ""
echo "To view logs:"
echo "  aws logs tail /aws/lambda/$FUNCTION_NAME --region $REGION --follow"
echo ""

# Cleanup
rm -f trust-policy.json $ZIP_FILE
