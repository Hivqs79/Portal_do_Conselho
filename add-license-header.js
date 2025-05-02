const fs = require("fs");
const path = require("path");

// Extensões de arquivos que receberão o cabeçalho
const targetExtensions = ['.js', '.ts', '.tsx', '.java', '.xml', '.yaml', '.yml'];

// Cabeçalho padrão da Apache 2.0 License
const licenseHeader = `/*
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
 */\n\n`;

const alreadyTagged = (content) => content.includes("Licensed under the Apache License");

function addHeaderToFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  if (alreadyTagged(content)) return;

  const newContent = licenseHeader + content;
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`✔️  Header added to: ${filePath}`);
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      // Ignorar pastas irrelevantes
      if (['node_modules', '.next', '.git'].includes(entry.name)) continue;
      walkDir(fullPath);
    } else {
      if (targetExtensions.includes(path.extname(entry.name))) {
        addHeaderToFile(fullPath);
      }
    }
  }
}

// Pastas principais que deseja percorrer
const rootDirs = ['back', 'front', 'docker', 'k8s', 'scripts'];

for (const dir of rootDirs) {
  const fullPath = path.join(__dirname, dir);
  if (fs.existsSync(fullPath)) walkDir(fullPath);
}