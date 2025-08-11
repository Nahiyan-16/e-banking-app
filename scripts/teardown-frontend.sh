#!/bin/bash

#Set the Region
REGION="us-east-1"

STACK_NAME="eBankFrontendStack"

# Get the S3 bucket name before deleting
BUCKET_NAME=$(aws cloudformation describe-stacks \
    --stack-name $STACK_NAME \
    --region $REGION \
    --query "Stacks[0].Outputs[?OutputKey=='S3BucketName'].OutputValue" \
    --output text)

if [ -z "$BUCKET_NAME" ]; then
    echo "Failed to retrieve S3 bucket name from CloudFormation stack. Exiting."
    exit 1
fi

echo "Deleting all files from S3 bucket: $BUCKET_NAME"
aws s3 rm s3://$BUCKET_NAME --recursive
aws s3 rb s3://$BUCKET_NAME --force

echo "Deleting CloudFormation stack: $STACK_NAME"
aws cloudformation delete-stack --stack-name $STACK_NAME --region $REGION

echo "Waiting for stack deletion to complete..."
aws cloudformation wait stack-delete-complete --stack-name $STACK_NAME --region $REGION

if [ $? -ne 0 ]; then
    echo "CloudFormation stack deletion failed. Exiting."
    exit 1
fi

echo "CloudFormation stack deleted successfully."
echo "S3 bucket $BUCKET_NAME cleaned up."
echo "Static site teardown completed."