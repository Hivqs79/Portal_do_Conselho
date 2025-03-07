export default function Decryptor(jsonComChave: string): object {
  const [jsonEmbaralhado, chaveString] = jsonComChave.split("&&"); // Separa os dois elementos
  if (!jsonEmbaralhado || !chaveString)
    throw new Error("Formato inválido para decodificação!");

  const chave = chaveString.split(",").map(Number); // Converte a chave de volta para array de números
  const jsonOriginalArray: string[] = new Array(jsonEmbaralhado.length);

  chave.forEach((indiceOriginal, i) => {
    jsonOriginalArray[indiceOriginal] = jsonEmbaralhado[i];
  });

  const jsonOriginal = jsonOriginalArray.join("");
  return JSON.parse(jsonOriginal); // Converte a string de volta para JSON
}