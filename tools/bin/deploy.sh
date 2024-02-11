#aws ecs update-service --cluster sage-page-ecs-3 --service sage-page-app --force-new-deployment
aws ecs update-service --cluster sage-page-ecs-3 --service ALB-Service --force-new-deployment > /dev/null
