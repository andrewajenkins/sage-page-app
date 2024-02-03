# SagePageApp

Sage Page is a dynamic tool that integrates with the ChatGPT API to facilitate the creation and management of wikis in markdown format. It features a chat window for interaction, an editor window for direct markdown editing, and a file-tree window that visualizes the markdown documents in a hierarchical tree structure. Users can interact with ChatGPT to generate content, edit subsections, and seamlessly convert chat responses into organized markdown documents or subsections within the tree.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
Run express server with `npm run dev`. Type rs to restart.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Build production

- Fun ./tools/bin/docker-build.sh
- build a new task definition revision - highlight previous and create new - json
- instantiate a new task
- service update to latest, force deploy

`ng build`   
`npx http-server ./dist/sage-page-app/browser`    
`aws codepipeline update-pipeline --cli-input-json file://full-pipeline.json`
`aws codepipeline get-pipeline --name sage-page-ecs-pipeline-1 > full-pipeline.json`
`aws ecs register-task-definition --cli-input-json file://tools/task-definition.json`
`aws ecs update-service --cluster <cluster-name>> --service <service-name> --task-definition <task-definition-name>`
`chmod 400 your-key.pem`

`scp -i ~/sage-page-app-key-pair.pem tools/deploy.sh ec2-user@54.196.82.199:~/`
`ssh -i ~/sage-page-app-key-pair.pem ec2-user@54.196.82.199`
`cd ~/scripts/`
`chmod +x install.sh`
`./install.sh`
`docker run -it 437884575683.dkr.ecr.us-east-1.amazonaws.com/sage-page-ecr-repo:latest /bin/bash`
`./tools/bin/docker-build.sh`
`docker rm angular-ssr-app`
`docker run --name angular-ssr-app -p 80:80 437884575683.dkr.ecr.us-east-1.amazonaws.com/sage-page-ecr-repo:latest`
