## Docker

## Setup

Docker can be used for development.

If you want deploy this application to docker. You have to adjust the env and docker-compose configurations. Set this `MONGO_URL=URL` so that you can access the DB inside the container docker.

`container_name` in each service is customizable.

## Deploy

Before deploying an application to Docker, make sure you have Docker installed on the server. [Documentation Docker](https://docs.docker.com/engine/install/).

#### Terminal Commands

Makes builds

```sh
docker-compose build --no-cache
```

Aggregates the output of each container(Development)

```sh
docker-compose up
```

Aggregates the output of each container with custom compose file location

```sh
docker-compose -f docker-compose.production.yml up
```

Detached mode: Run containers in the background,

```sh
docker-compose up -d
```

Detached mode: Run containers in the background with new builds,

```sh
docker-compose up -d --build
```

Check running docker compose

```sh
docker-compose ps
```

Removes each container

```sh
docker-compose down
```
