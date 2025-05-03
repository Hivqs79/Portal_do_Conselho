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


NAMESPACE="default"
DEPLOYMENTS=(
    "general-api" 
    "chat-api"
    "kafka-work-service"
    "logs-api"
    "aws-image-api"
    "email-api"
    )

for DEPLOYMENT in "${DEPLOYMENTS[@]}"; do
  echo "Processando Deployment: $DEPLOYMENT"

  POD_NAMES=$(kubectl get pods -n $NAMESPACE -l app=$DEPLOYMENT -o jsonpath="{.items[*].metadata.name}")

  if [ -z "$POD_NAMES" ]; then
    echo "Nenhum Pod encontrado para o Deployment $DEPLOYMENT no namespace $NAMESPACE."
    continue
  fi

  for POD in $POD_NAMES; do
    echo "Deletando Pod: $POD"
    kubectl delete pod $POD -n $NAMESPACE
  done

  echo "Pods do Deployment $DEPLOYMENT processados com sucesso."
done

echo "Todos os Deployments foram processados."