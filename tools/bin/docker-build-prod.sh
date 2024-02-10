# For backend
docker build --no-cache -t backend ./backend
docker tag backend:latest 437884575683.dkr.ecr.us-east-1.amazonaws.com/backend:latest
docker push 437884575683.dkr.ecr.us-east-1.amazonaws.com/backend:latest

# For frontend
docker build --no-cache -t frontend ./frontend
docker tag frontend:latest 437884575683.dkr.ecr.us-east-1.amazonaws.com/frontend:latest
docker push 437884575683.dkr.ecr.us-east-1.amazonaws.com/frontend:latest
