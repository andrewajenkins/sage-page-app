#!/bin/bash

# Function to build and push Docker images
build_and_push() {
    service_name=$1
    build_context=$2

    echo "Building and pushing $service_name..."
    docker build --no-cache -t $service_name $build_context
    docker tag $service_name:latest 437884575683.dkr.ecr.us-east-1.amazonaws.com/$service_name:latest
    docker push 437884575683.dkr.ecr.us-east-1.amazonaws.com/$service_name:latest
    echo "$service_name pushed successfully."
}

# Login to AWS ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 437884575683.dkr.ecr.us-east-1.amazonaws.com

# Check for arguments
if [ $# -eq 0 ]; then
    # No arguments provided, do everything
    build_and_push "backend" "./backend"
    build_and_push "frontend" "./frontend"
    build_and_push "nginx" "./tools/nginx"
else
    # Process arguments
    for arg in "$@"
    do
        case $arg in
            --backend)
                build_and_push "backend" "./backend"
                shift # Remove --backend from processing
                ;;
            --frontend)
                build_and_push "frontend" "./frontend"
                shift # Remove --frontend from processing
                ;;
            --nginx)
                build_and_push "nginx" "./tools/nginx"
                shift # Remove --nginx from processing
                ;;
        esac
    done
fi
