const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/saravanan/Documents/New folder';

// Match the subscribe box dynamically regardless of line endings or whitespace
const regex = /<div class="footer-subscribe-box">\s*<input type="email" placeholder="Subscribe\.\.\." required>\s*<button type="submit">Go<\/button>\s*<\/div>/g;

const newSegment = `<div class="footer-subscribe-box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 0.5rem; color: var(--text-secondary); flex-shrink: 0;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              <input type="email" placeholder="Subscribe..." required>
              <button type="submit">Go</button>
            </div>`;

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
      if (regex.test(content)) {
        content = content.replace(regex, newSegment);
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Added envelope icon to subscribe box in: ${fullPath}`);
      }
    }
  }
}

walkDir(rootDir);
console.log('Finished updating subscribe boxes.');
