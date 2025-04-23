#!/bin/bash
cd ..

docker build -t hivqs79/portal-do-conselho_general-api:latest -f ./docker/Dockerfile.general-api .
# docker build -t hivqs79/portal-do-conselho_email-api:latest -f ./docker/Dockerfile.email-api .
# docker build -t hivqs79/portal-do-conselho_kafka-work-service:latest -f ./docker/Dockerfile.kafka-work-service .
# docker build -t hivqs79/portal-do-conselho_chat-api:latest -f ./docker/Dockerfile.chat-api .
# docker build -t hivqs79/portal-do-conselho_aws-image-api:latest -f ./docker/Dockerfile.aws-api .
# docker build -t hivqs79/portal-do-conselho_logs-api:latest -f ./docker/Dockerfile.logs-api .
# docker build -t hivqs79/portal-do-conselho_front-app:latest -f ./docker/Dockerfile.front-app .

docker push hivqs79/portal-do-conselho_general-api:latest
# docker push hivqs79/portal-do-conselho_email-api:latest
# docker push hivqs79/portal-do-conselho_kafka-work-service:latest
# docker push hivqs79/portal-do-conselho_chat-api:latest
# docker push hivqs79/portal-do-conselho_aws-image-api:latest
# docker push hivqs79/portal-do-conselho_logs-api:latest
# docker push hivqs79/portal-do-conselho_front-app:latest