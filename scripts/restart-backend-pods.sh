#!/bin/bash

NAMESPACE="default"
DEPLOYMENTS=(
    "general-api" 
    "chat-api"
    "kafka-work-service"
    # "logs-api"
    # "aws-image-api"
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