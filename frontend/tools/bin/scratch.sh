#ng build
#npx http-server ./dist/sage-page-app/browser
#aws codepipeline update-pipeline --cli-input-json file://full-pipeline.json
#aws codepipeline get-pipeline --name sage-page-ecs-pipeline-1 > full-pipeline.json
#aws ecs register-task-definition --cli-input-json file://tools/task-definition.json
#aws ecs update-service --cluster <cluster-name>> --service <service-name> --task-definition <task-definition-name>
#chmod 400 your-key.pem
#
#scp -i ~/sage-page-app-key-pair.pem tools/deploy.sh ec2-user@54.196.82.199:~/
#ssh -i ~/sage-page-app-key-pair.pem ec2-user@54.196.82.199
#cd ~/scripts/
#chmod +x install.sh
#./install.sh
#docker run -it 437884575683.dkr.ecr.us-east-1.amazonaws.com/sage-page-ecr-repo:latest /bin/bash
#./tools/bin/docker-build.sh
#docker rm angular-ssr-app
#docker run --name angular-ssr-app -p 80:80 437884575683.dkr.ecr.us-east-1.amazonaws.com/sage-page-ecr-repo:latest
#aws ecs list-tasks --cluster sage-page-ecs-name-2 --service-name sage-page-ecs-SERVICE
