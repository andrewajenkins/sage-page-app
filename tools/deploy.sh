#!/bin/bash

set -ex

# Your EC2 instance's private key file
PRIVATE_KEY="~/sage-page-app-key-pair.pem"

# SSH connection parameters
SSH_USER="ec2-user"
EC2_INSTANCE_IP="54.196.82.199"

# Docker container and ECR repository details
CONTAINER_NAME="angular-ssr-app"
AWS_REGION="us-east-1"
AWS_ACCOUNT_ID="437884575683"
ECR_REPO="sage-page-ecr-repo"

# SSH into the EC2 instance
ssh -i "$PRIVATE_KEY" "$SSH_USER"@"$EC2_INSTANCE_IP" << EOF

# Stop and remove existing container (optional)
docker stop "$CONTAINER_NAME" || true
docker rm "$CONTAINER_NAME" || true

# Log in to Amazon ECR
aws ecr get-login-password --region "$AWS_REGION" | docker login --username AWS --password-stdin "$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com"

# Pull the latest image from Amazon ECR
docker pull "$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO:latest"

# Run the updated container
docker run -d --name angular-ssr-app -p 80:80 437884575683.dkr.ecr.us-east-1.amazonaws.com/sage-page-ecr-repo:latest
#docker run -d --name "$CONTAINER_NAME" -p 80:80 "$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO:latest"

EOF

echo "Deployment completed."
