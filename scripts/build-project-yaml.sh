#!/bin/bash

DIR="../k8s"
OUTPUT_FILE="combined.yaml"

> $OUTPUT_FILE

for FILE in "$DIR"/*.yaml; do
    cat "$FILE" >> $OUTPUT_FILE
    echo -e "\n---" >> $OUTPUT_FILE
done

echo "Conteúdo combinado em $OUTPUT_FILE"
