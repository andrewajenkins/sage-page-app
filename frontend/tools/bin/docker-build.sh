# Authenticate with ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 437884575683.dkr.ecr.us-east-1.amazonaws.com

# Build Docker image
docker build -t 437884575683.dkr.ecr.us-east-1.amazonaws.com/sage-page-ecr-repo .
#
## Push Docker image to ECR
docker push 437884575683.dkr.ecr.us-east-1.amazonaws.com/sage-page-ecr-repo:latest
