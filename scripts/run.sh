#!/bin/bash

trap "kill -- -$$" EXIT
(cd ../k8s && kubectl apply -f .) &
(kubectl port-forward svc/kafka-service 9092:9092) &
(kubectl port-forward svc/general-api-service 8081:8081) &
(cd ../front/app && npm run dev)