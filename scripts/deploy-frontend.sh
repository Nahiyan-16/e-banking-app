#!/bin/bash

# Set AWS region
REGION="us-east-1"

# Be in the script's directory

STACK_NAME="eBankFrontendStack"
TEMPLATE_FILE="./cloudformation/s3-static-site.yml"
BUILD_DIR="../build"

# Prerequisites check
if ! command -v aws &> /dev/null; then
    echo "AWS CLI not found. Please install it and configure your credentials."
    exit 1
fi

# Check permissions
./util-scripts/check-permissions.sh

if ! command -v jq &> /dev/null; then
    echo "jq not found. Please install it to parse JSON responses."
    exit 1
fi

# Generate the environment variables file for the frontend
echo "Generating environment variables for the frontend..."
./util-scripts/env-generator.sh

# Build the React app
echo "Building the React app..."
cd ../
npm install
npm run build
cd scripts

if [ $? -ne 0 ]; then
    echo "React build failed. Exiting."
    exit 1
fi
echo "React app built successfully."

# Deploy the CloudFormation stack
echo "Deploying CloudFormation stack..."
aws cloudformation deploy \
    --template-file $TEMPLATE_FILE \
    --stack-name $STACK_NAME \
    --region $REGION \
    --capabilities CAPABILITY_NAMED_IAM \

if [ $? -ne 0 ]; then
    echo "CloudFormation deployment failed. Exiting."
    exit 1
fi
echo "CloudFormation stack deployed."

# Get the S3 bucket name from the stack outputs
BUCKET_NAME=$(aws cloudformation describe-stacks \
    --stack-name $STACK_NAME \
    --region $REGION \
    --query "Stacks[0].Outputs[?OutputKey=='S3BucketName'].OutputValue" \
    --output text)

if [ -z "$BUCKET_NAME" ]; then
    echo "Failed to retrieve S3 bucket name from CloudFormation stack. Exiting."
    exit 1
fi

# Sync the build directory to the S3 bucket
echo "Syncing build directory to S3 bucket: $BUCKET_NAME"
aws s3 sync $BUILD_DIR/ s3://$BUCKET_NAME --delete

if [ $? -ne 0 ]; then
    echo "Failed to sync files to S3 bucket. Exiting."
    exit 1
fi
echo "Files synced to S3 bucket."

WEBSITE_URL="http://${BUCKET_NAME}.s3-website-${REGION}.amazonaws.com"

echo "Static site deployed successfully!"
echo "You can access your site at: $WEBSITE_URL"