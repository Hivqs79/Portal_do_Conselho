export function Encryptor(data: object): string {
  const jsonString: string = JSON.stringify(data);
  let encryptedString: string = "";

  for (let i = 0; i < jsonString.length; i++) {
    encryptedString += String.fromCharCode(jsonString.charCodeAt(i) + 3);
  }

  return `${btoa(encryptedString)}`;
}
