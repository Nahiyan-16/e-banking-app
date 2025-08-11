#!/bin/bash

# Set AWS region
REGION="us-east-1"

# Run this script from this file's directory
cd "$(dirname "$0")"
# Exit if any command fails
set -e

# Load CloudFormation stack outputs
echo "Fetching stack outputs..."
BACKEND_STACK_NAME="eBankBackendStack"


OUTPUTS=$(aws cloudformation describe-stacks \
  --stack-name $BACKEND_STACK_NAME \
  --region $REGION \
  --query "Stacks[0].Outputs" \
  --output json)

if [ -z "$OUTPUTS" ]; then
  echo "Failed to retrieve stack outputs. Ensure the backend stack '$BACKEND_STACK_NAME' is deployed."
  exit 1
fi

API_URL=$(echo "$OUTPUTS" | jq -r '.[] | select(.OutputKey=="ApiEndpoint").OutputValue')
API_KEY_ID=$(echo "$OUTPUTS" | jq -r '.[] | select(.OutputKey=="ApiKeyId").OutputValue')
USER_POOL_CLIENT_ID=$(echo "$OUTPUTS" | jq -r '.[] | select(.OutputKey=="UserPoolClientId").OutputValue')
USER_POOL_ID=$(echo "$OUTPUTS" | jq -r '.[] | select(.OutputKey=="UserPoolId").OutputValue')
IDENTITY_POOL_ID=$(echo "$OUTPUTS" | jq -r '.[] | select(.OutputKey=="IdentityPoolId").OutputValue')

API_URL="${API_URL}/users"
API_KEY=$(aws apigateway get-api-keys \
  --include-values \
  --region $REGION \
  --query "items[?id=='$API_KEY_ID'].value" \
  --output text)

echo "API_URL: $API_URL"
echo "API_KEY: $API_KEY"
echo "USER_POOL_ID: $USER_POOL_ID"
echo "USER_POOL_CLIENT_ID: $USER_POOL_CLIENT_ID"
echo "IDENTITY_POOL_ID: $IDENTITY_POOL_ID"

# Generate .env.production
cat <<EOF > ../../.env.production
REACT_APP_API_URL=$API_URL
REACT_APP_API_KEY=$API_KEY
EOF

echo ".env.production created."

# Generate aws-exports.js in src/
cat <<EOF > ../../src/aws-exports.js
const awsmobile = {
  "aws_project_region": "$REGION",
  "aws_cognito_identity_pool_id": "$IDENTITY_POOL_ID",
  "aws_cognito_region": "$REGION",
  "aws_user_pools_id": "$USER_POOL_ID",
  "aws_user_pools_web_client_id": "$USER_POOL_CLIENT_ID",
  "oauth": {},
  "aws_cognito_username_attributes": ["EMAIL"],
  "aws_cognito_signup_attributes": [
    "ADDRESS",
    "BIRTHDATE",
    "PHONE_NUMBER",
    "EMAIL",
    "GIVEN_NAME",
    "FAMILY_NAME"
  ],
  "aws_cognito_mfa_configuration": "OFF",
  "aws_cognito_mfa_types": ["SMS"],
  "aws_cognito_password_protection_settings": {
    "passwordPolicyMinLength": 8,
    "passwordPolicyCharacters": []
  },
  "aws_cognito_verification_mechanisms": ["EMAIL"]
};

export default awsmobile;
EOF

echo "aws-exports.js created in src/ directory."
echo "Environment generation completed successfully."