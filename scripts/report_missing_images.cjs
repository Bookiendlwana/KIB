// Report missing or mismatched project images
const fs = require('fs');
const path = require('path');
const storagePath = path.join(__dirname, '../server/storage.ts');
const assetsDir = path.join(__dirname, '../attached_assets');

function getExpectedFilenames() {
  const content = fs.readFileSync(storagePath, 'utf8');
  const regex = /imageUrl:\s*["'](?:\/attached_assets\/|\/projects\/)([^"']+)/g;
  const filenames = [];
  let match;
  while ((match = regex.exec(content))) {
    filenames.push(match[1]);
  }
  return filenames;
}

function getActualFilenames() {
  return fs.readdirSync(assetsDir).filter(f => fs.statSync(path.join(assetsDir, f)).isFile());
}

function reportMissing() {
  const expected = getExpectedFilenames();
  const actual = getActualFilenames();
  const missing = expected.filter(exp => !actual.includes(exp));
  const extra = actual.filter(act => !expected.includes(act));

  console.log('--- Missing Images ---');
  missing.forEach(f => console.log(f));
  console.log('--- Extra Images (not used by any project) ---');
  extra.forEach(f => console.log(f));
  console.log('--- End Report ---');
}

reportMissing();
