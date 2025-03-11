export function Decryptor(encryptedData: string): Record<string, any> | null {
  try {
    const decodedString: string = atob(encryptedData);
    let decryptedString: string = "";
    
    for (let i = 0; i < decodedString.length; i++) {
      decryptedString += String.fromCharCode(decodedString.charCodeAt(i) - 3);
    }
    
    return JSON.parse(decryptedString) as Record<string, any>;
  } catch (error) {
    return null;
  }
}
