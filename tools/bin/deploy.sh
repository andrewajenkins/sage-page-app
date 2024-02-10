#aws ecs create-service --cli-input-yaml file://ecs-params.yml --cluster sage-page-ecs-name-2
docker context use myecscontext
docker compose up