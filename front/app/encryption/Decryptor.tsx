/*
 * Copyright 2025 Pedro Henrique Panstein, Pedro Augusto Wilhelm, Mateus Henrique Bosquetti, Kaua Eggert, Vinícius Eduardo dos Santos.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
