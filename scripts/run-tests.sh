#!/bin/bash

docker-compose -f ./scripts/docker-compose.yml down

if [ $1 != "better_sqlite" ] && [ $1 != "sqlite" ]; then
    docker-compose -f ./scripts/docker-compose.yml up -d $1
fi

npm run test:$1
