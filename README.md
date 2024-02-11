# SagePageApp

Sage Page is a dynamic tool that integrates with the ChatGPT API to facilitate the creation and management of wikis in markdown format. It features a chat window for interaction, an editor window for direct markdown editing, and a file-tree window that visualizes the markdown documents in a hierarchical tree structure. Users can interact with ChatGPT to generate content, edit subsections, and seamlessly convert chat responses into organized markdown documents or subsections within the tree.


## Build

- `./tools/bin/docker-build-dev.sh`

## Build production

- `./tools/bin/docker-build-prod.sh` -> `./tools/bin/deploy.sh` -> EC2 -> Target Groups -> my-ecs-tasks -> remove old targets

[//]: # (ecs-cli compose --project-name sage-page-app service up --create-log-groups --force-deployment --cluster-config my-ecs-config --ecs-profile my-ecs-profile)

[//]: # (- Fun ./tools/bin/docker-build.sh)

[//]: # (- build a new task definition revision - highlight previous and create new - json)

[//]: # (- instantiate a new task)

[//]: # (- service update to latest, force deploy)
# TODO
- Remove old service and cluster
- www.sage-page.net