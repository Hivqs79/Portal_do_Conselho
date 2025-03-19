#!/bin/bash

trap "kill -- -$$" EXIT
#(cd ../back/placeholder-api && node index.js) &
(cd ../front/app && npm run dev) &
(cd ../k8s && kubectl apply -f .)
(kubectl.exe port-forward svc/kafka-service 9092:9092)
