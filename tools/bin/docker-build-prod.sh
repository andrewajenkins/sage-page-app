### create new repository
#aws ecr create-repository --repository-name nginx --region us-east-1

aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 437884575683.dkr.ecr.us-east-1.amazonaws.com

# For backend
docker build --no-cache -t backend ./backend
docker tag backend:latest 437884575683.dkr.ecr.us-east-1.amazonaws.com/backend:latest
docker push 437884575683.dkr.ecr.us-east-1.amazonaws.com/backend:latest

# For frontend
docker build --no-cache -t frontend ./frontend
docker tag frontend:latest 437884575683.dkr.ecr.us-east-1.amazonaws.com/frontend:latest
docker push 437884575683.dkr.ecr.us-east-1.amazonaws.com/frontend:latest

# For nginx
#docker pull nginx:latest
docker build --no-cache -t nginx ./tools/nginx
docker tag nginx:latest 437884575683.dkr.ecr.us-east-1.amazonaws.com/nginx:latest
docker push 437884575683.dkr.ecr.us-east-1.amazonaws.com/nginx:latest
