#!/bin/bash

# Copyright 2025 Pedro Henrique Panstein, Pedro Augusto Wilhelm, Mateus Henrique Bosquetti, Kaua Eggert, Vinícius Eduardo dos Santos.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.


cd ..

# docker build -t hivqs79/portal-do-conselho_general-api:latest -f ./docker/Dockerfile.general-api .
# docker build -t hivqs79/portal-do-conselho_email-api:latest -f ./docker/Dockerfile.email-api .
# docker build -t hivqs79/portal-do-conselho_kafka-work-service:latest -f ./docker/Dockerfile.kafka-work-service .
# docker build -t hivqs79/portal-do-conselho_chat-api:latest -f ./docker/Dockerfile.chat-api .
# docker build -t hivqs79/portal-do-conselho_aws-image-api:latest -f ./docker/Dockerfile.aws-api .
# docker build -t hivqs79/portal-do-conselho_logs-api:latest -f ./docker/Dockerfile.logs-api .
docker build -t hivqs79/portal-do-conselho_front-app:latest -f ./docker/Dockerfile.front-app .

# docker push hivqs79/portal-do-conselho_general-api:latest
# docker push hivqs79/portal-do-conselho_email-api:latest
# docker push hivqs79/portal-do-conselho_kafka-work-service:latest
# docker push hivqs79/portal-do-conselho_chat-api:latest
# docker push hivqs79/portal-do-conselho_aws-image-api:latest
# docker push hivqs79/portal-do-conselho_logs-api:latest
docker push hivqs79/portal-do-conselho_front-app:latest