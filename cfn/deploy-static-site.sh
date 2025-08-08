#!/bin/bash

STACK_NAME="e-bank-temp-site"
REGION="us-east-1"
TEMPLATE_FILE="./s3-static-site.yml"
BUILD_DIR="../build"

# Check if build directory exists and if a index.html file exists, if not, create it
if [ ! -d "$BUILD_DIR" ]; then
    echo "Build directory $BUILD_DIR does not exist. Exiting."
    if [ ! -f "$BUILD_DIR/index.html" ]; then
        echo "index.html not found in build directory. Exiting."
        exit 1
    fi
    exit 1
fi

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