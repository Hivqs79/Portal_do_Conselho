#!/bin/bash
cd ..

docker build -t hivqs79/portal-do-conselho_general-api:latest -f ./docker/Dockerfile.general-api .

docker push hivqs79/portal-do-conselho_general-api:latest