const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/saravanan/Documents/New folder';

// Match grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) but NOT already using min(...)
const inlineRegex = /grid-template-columns:\s*repeat\(auto-fit,\s*minmax\((?!min\()(\d+px),\s*1fr\)\)/g;

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== '.agents' && file !== '.gemini' && file !== 'scratch') {
        walkDir(fullPath);
      }
    } else if (file.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (inlineRegex.test(content)) {
        content = content.replace(inlineRegex, 'grid-template-columns: repeat(auto-fit, minmax(min($1, 100%), 1fr))');
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated inline grid columns in: ${fullPath}`);
      }
    }
  }
}

walkDir(rootDir);
console.log('Finished updating inline HTML grids.');
