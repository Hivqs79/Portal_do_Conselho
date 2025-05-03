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


trap "kill -- -$$" EXIT
(./create-pods.sh) &
# (kubectl port-forward svc/front-service 3000:80)
(kubectl port-forward svc/kafka-service 9093:9093) &
(kubectl port-forward svc/general-api-service 8081:8081) &
(kubectl port-forward svc/chat-api-service 8082:8082) &
(kubectl port-forward svc/email-api-service 8083:8083) &
(kubectl port-forward svc/logs-api-service 8070:8070) &
(kubectl port-forward svc/aws-image-api-service 3060:3060) &
(kubectl port-forward svc/kafka-work-service 3090:3090) &
(cd ../front/app && npm run dev)