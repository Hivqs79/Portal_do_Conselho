#!/bin/bash

trap "kill -- -$$" EXIT
(cd ../k8s && kubectl apply -f .) &
# (kubectl port-forward svc/kafka-service 9092:9092) &
#(kubectl port-forward svc/general-api-service 8081:8081) &
(kubectl port-forward svc/chat-api-service 8082:8082) &
(kubectl port-forward svc/logs-api-service 8070:8070) &
(kubectl port-forward svc/aws-image-api-service 3060:3060) &
(cd ../front/app && npm run dev)