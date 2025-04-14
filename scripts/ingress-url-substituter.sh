#!/bin/bash

URL=$(kubectl get services -n ingress-nginx -o jsonpath='{.items[0].status.loadBalancer.ingress[0].hostname}')
sed -i 's/deployment-url-of-application/'"$URL"'/g' ingress.yaml

echo "The yaml file has been updated with the URL: $URL"
