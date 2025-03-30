#!/bin/bash
cd ..

docker build -t hivqs79/portal-do-conselho_general-api:latest -f ./docker/Dockerfile.general-api .
docker build -t hivqs79/portal-do-conselho_chat-api:latest -f ./docker/Dockerfile.chat-api .
docker build -t hivqs79/portal-do-conselho_aws-image-api:latest -f ./docker/Dockerfile.aws-api .

docker push hivqs79/portal-do-conselho_general-api:latest
docker push hivqs79/portal-do-conselho_chat-api:latest
docker push hivqs79/portal-do-conselho_aws-image-api:latest