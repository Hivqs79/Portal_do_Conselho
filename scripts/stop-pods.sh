#!/bin/bash

cd ../k8s

kubectl scale deployment --all --replicas=0
