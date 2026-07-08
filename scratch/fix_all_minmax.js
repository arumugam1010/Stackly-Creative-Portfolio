const fs = require('fs');
const path = require('path');

const cssDir = 'c:/Users/saravanan/Documents/New folder/assets/css';

// Match minmax(280px, 1fr) or minmax(300px, 1fr) but NOT already using min(...)
const minmaxRegex = /minmax\((?!min\()(\d+px),\s*1fr\)/g;

const files = fs.readdirSync(cssDir);

for (const file of files) {
  if (file.endsWith('.css')) {
    const fullPath = path.join(cssDir, file);
    let content = fs.readFileSync(fullPath, 'utf8');
    if (minmaxRegex.test(content)) {
      content = content.replace(minmaxRegex, 'minmax(min($1, 100%), 1fr)');
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`Updated responsive minmax grids in: ${file}`);
    }
  }
}

console.log('Finished updating responsive grids.');
