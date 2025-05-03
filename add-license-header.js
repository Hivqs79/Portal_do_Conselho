const fs = require("fs");
const path = require("path");

// Tipos de arquivos e seus formatos de comentário
const commentStyles = {
  '.js': { start: '/*', line: ' *', end: ' */' },
  '.ts': { start: '/*', line: ' *', end: ' */' },
  '.tsx': { start: '/*', line: ' *', end: ' */' },
  '.java': { start: '/*', line: ' *', end: ' */' },
  '.xml': { start: '<!--', line: ' ', end: '-->' },
  '.yaml': { start: '#', line: '#', end: '' },
  '.yml': { start: '#', line: '#', end: '' },
};

// Conteúdo da licença
const licenseLines = [
  "Copyright 2025 Pedro Henrique Panstein, Pedro Augusto Wilhelm, Mateus Henrique Bosquetti, Kaua Eggert, Vinícius Eduardo dos Santos.",
  "",
  "Licensed under the Apache License, Version 2.0 (the \"License\");",
  "you may not use this file except in compliance with the License.",
  "You may obtain a copy of the License at",
  "",
  "    http://www.apache.org/licenses/LICENSE-2.0",
  "",
  "Unless required by applicable law or agreed to in writing, software",
  "distributed under the License is distributed on an \"AS IS\" BASIS,",
  "WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.",
  "See the License for the specific language governing permissions and",
  "limitations under the License.",
];

// Gera o cabeçalho com base no estilo de comentário
function generateHeader(ext) {
  const style = commentStyles[ext];
  if (!style) return '';

  const lines = licenseLines.map(line => `${style.line} ${line}`.trimEnd());
  if (style.start === style.line && !style.end) {
    return lines.join('\n') + '\n\n';
  }

  return [style.start, ...lines, style.end, ''].join('\n') + '\n';
}

function alreadyTagged(content) {
  return content.includes("Licensed under the Apache License");
}

function addHeaderToFile(filePath) {
  const ext = path.extname(filePath);
  const style = commentStyles[ext];
  if (!style) return;

  const content = fs.readFileSync(filePath, 'utf8');
  if (alreadyTagged(content)) return;

  const newContent = generateHeader(ext) + content;
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`✔️  Header added to: ${filePath}`);
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      if (['node_modules', '.next', '.git'].includes(entry.name)) continue;
      walkDir(fullPath);
    } else {
      const ext = path.extname(entry.name);
      if (Object.keys(commentStyles).includes(ext)) {
        addHeaderToFile(fullPath);
      }
    }
  }
}

// Pastas a percorrer
const rootDirs = ['back', 'front', 'docker', 'k8s', 'scripts'];

for (const dir of rootDirs) {
  const fullPath = path.join(__dirname, dir);
  if (fs.existsSync(fullPath)) walkDir(fullPath);
}