export function embaralharJSON(obj: object): string {
  const jsonString = JSON.stringify(obj); // Converte o JSON para string
  const indices: number[] = Array.from(jsonString, (_, i) => i);
  indices.sort(() => Math.random() - 0.5); // Embaralha os índices
  const jsonEmbaralhado = indices.map((i) => jsonString[i]).join("");

  // Concatena JSON embaralhado + separador && + chave convertida em string
  return `${jsonEmbaralhado}&&${indices.join(",")}`;
}