#docker-compose -f docker-compose.yml -f docker-compose.dev.yml build --progress plain
DOCKER_BUILDKIT=1 docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build