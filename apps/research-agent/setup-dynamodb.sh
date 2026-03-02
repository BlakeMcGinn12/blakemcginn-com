#!/bin/bash
# setup-dynamodb.sh - Run this to create the DynamoDB tables in us-east-1

set -e

echo "Creating DynamoDB tables in us-east-1..."

# Table 1: ai_findings - Stores AI research discoveries
aws dynamodb create-table \
  --table-name ai_findings \
  --attribute-definitions \
    AttributeName=source,AttributeType=S \
    AttributeName=created_at,AttributeType=S \
  --key-schema \
    AttributeName=source,KeyType=HASH \
    AttributeName=created_at,KeyType=RANGE \
  --billing-mode PAY_PER_REQUEST \
  --region us-east-1 \
  --no-cli-pager || echo "Table ai_findings may already exist"

# Table 2: user_analyses - Stores user forecast history
aws dynamodb create-table \
  --table-name user_analyses \
  --attribute-definitions \
    AttributeName=user_id,AttributeType=S \
    AttributeName=created_at,AttributeType=S \
  --key-schema \
    AttributeName=user_id,KeyType=HASH \
    AttributeName=created_at,KeyType=RANGE \
  --billing-mode PAY_PER_REQUEST \
  --region us-east-1 \
  --no-cli-pager || echo "Table user_analyses may already exist"

# Table 3: user_alerts - Stores notification queue
aws dynamodb create-table \
  --table-name user_alerts \
  --attribute-definitions \
    AttributeName=user_id,AttributeType=S \
    AttributeName=alert_id,AttributeType=S \
  --key-schema \
    AttributeName=user_id,KeyType=HASH \
    AttributeName=alert_id,KeyType=RANGE \
  --billing-mode PAY_PER_REQUEST \
  --region us-east-1 \
  --no-cli-pager || echo "Table user_alerts may already exist"

# Table 4: capability_updates - Stores AI tool capability timeline
aws dynamodb create-table \
  --table-name capability_updates \
  --attribute-definitions \
    AttributeName=tool_name,AttributeType=S \
    AttributeName=launch_date,AttributeType=S \
  --key-schema \
    AttributeName=tool_name,KeyType=HASH \
    AttributeName=launch_date,KeyType=RANGE \
  --billing-mode PAY_PER_REQUEST \
  --region us-east-1 \
  --no-cli-pager || echo "Table capability_updates may already exist"

echo ""
echo "Tables created successfully (or already exist)!"
echo ""
echo "To verify, run:"
echo "  aws dynamodb list-tables --region us-east-1"
