const fs = require('fs');
const path = require('path');

const htmlFiles = ['index.html', 'admin.html', 'dashboard.html'];
let missing = [];

for (const htmlFile of htmlFiles) {
  const html = fs.readFileSync(htmlFile, 'utf8');
  const regex = /(?:src|href)="([^"]+\.js)"/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const ref = match[1];
    if (ref.startsWith('http') || ref.startsWith('https') || ref.startsWith('//') || ref.startsWith('#') || ref.startsWith('mailto:')) {
      continue;
    }
    const filePath = path.join(path.dirname(htmlFile), ref);
    if (!fs.existsSync(filePath)) {
      missing.push(`${htmlFile} -> ${ref}`);
    }
  }
}

if (missing.length) {
  console.error('Missing assets:', missing.join(', '));
  process.exit(1);
} else {
  console.log('All assets exist');
}

