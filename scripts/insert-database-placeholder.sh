#!/bin/bash

kubectl exec -it $(kubectl get pods -l app=mysql-general -o jsonpath='{.items[0].metadata.name}') -- mysql -u root -proot < database-placeholder.sql

echo "Database placeholder inserted successfully."