// Node.js script to sync and rename attached_assets files to match project data
const fs = require('fs');
const path = require('path');

// Path to storage.ts and attached_assets
const storagePath = path.join(__dirname, '../server/storage.ts');
const assetsDir = path.join(__dirname, '../attached_assets');

// Helper: Normalize filename for matching
function normalize(name) {
  return name.replace(/\s+/g, '').replace(/_/g, '').toLowerCase();
}

// 1. Extract expected image filenames from storage.ts
const storageContent = fs.readFileSync(storagePath, 'utf8');
const regex = /(["'])(\/attached_assets\/|\/projects\/)([^"']+?\.(?:jpe?g|png|webp|gif))/gi;
const expected = [];
let match;
while ((match = regex.exec(storageContent))) {
  expected.push(match[3]);
}

// 2. Scan attached_assets for actual files
const actualFiles = fs.readdirSync(assetsDir).filter(f => f.match(/\.(jpe?g|png|webp|gif)$/i));
const actualNormalized = actualFiles.map(f => ({ orig: f, norm: normalize(f) }));

// 3. For each expected filename, find a match and rename if needed
expected.forEach(expectedName => {
  const normExpected = normalize(expectedName);
  const found = actualNormalized.find(f => f.norm === normExpected);
  if (found && found.orig !== expectedName) {
    // Rename file
    const oldPath = path.join(assetsDir, found.orig);
    const newPath = path.join(assetsDir, expectedName);
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed: ${found.orig} -> ${expectedName}`);
  }
});

console.log('Image sync complete.');
