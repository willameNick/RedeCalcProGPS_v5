// Copia os arquivos estáticos da raiz do repositório (usados pelo GitHub Pages)
// para www/, que é o webDir consumido pelo Capacitor ao empacotar o app Android.
// Mantém a raiz do repo intocada para não afetar o deploy do GitHub Pages.
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dest = path.join(root, 'www');

const filesToCopy = ['index.html', 'manifest.webmanifest', 'sw.js', 'jspdf.umd.min.js'];
const dirsToCopy = ['icons'];

function copyRecursive(src, destPath) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(destPath, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(destPath, entry));
    }
  } else {
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.copyFileSync(src, destPath);
  }
}

fs.rmSync(dest, { recursive: true, force: true });
fs.mkdirSync(dest, { recursive: true });

for (const file of filesToCopy) {
  copyRecursive(path.join(root, file), path.join(dest, file));
}
for (const dir of dirsToCopy) {
  copyRecursive(path.join(root, dir), path.join(dest, dir));
}

console.log('www/ gerado a partir dos arquivos estáticos da raiz.');
