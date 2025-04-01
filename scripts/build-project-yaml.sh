#!/bin/bash

# Diretório contendo os arquivos .yaml
DIR="../k8s"
# Nome do arquivo de saída
OUTPUT_FILE="combined.yaml"

# Limpa o arquivo de saída caso exista
> $OUTPUT_FILE

# Itera sobre todos os arquivos .yaml no diretório (não inclui subpastas)
for FILE in "$DIR"/*.yaml; do
    # Adiciona o conteúdo do arquivo ao arquivo de saída
    cat "$FILE" >> $OUTPUT_FILE
    # Adiciona um separador "---" ao final de cada arquivo
    echo -e "\n---" >> $OUTPUT_FILE
done

echo "Conteúdo combinado em $OUTPUT_FILE"
