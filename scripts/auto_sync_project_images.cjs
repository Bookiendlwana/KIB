// Auto-sync project images: ensures all expected filenames exist in attached_assets, renames files if needed
const fs = require('fs');
const path = require('path');
const storagePath = path.join(__dirname, '../server/storage.ts');
const assetsDir = path.join(__dirname, '../attached_assets');

// Helper to extract all expected image filenames from storage.ts
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

// Get all actual filenames in attached_assets
function getActualFilenames() {
  return fs.readdirSync(assetsDir).filter(f => fs.statSync(path.join(assetsDir, f)).isFile());
}

function normalize(name) {
  return name.replace(/\s+/g, ' ').trim();
}

function autoSync() {
  const expected = getExpectedFilenames().map(normalize);
  const actual = getActualFilenames().map(normalize);

  let changes = 0;
  for (const exp of expected) {
    if (!actual.includes(exp)) {
      // Try to find a close match (ignoring spaces, underscores, etc.)
      const candidate = actual.find(a => a.replace(/[_\s]/g, '').toLowerCase() === exp.replace(/[_\s]/g, '').toLowerCase());
      if (candidate) {
        // Rename candidate to expected
        fs.renameSync(path.join(assetsDir, candidate), path.join(assetsDir, exp));
        console.log(`Renamed: ${candidate} -> ${exp}`);
        changes++;
      } else {
        console.log(`Missing: ${exp}`);
      }
    }
  }
  console.log(`Auto-sync complete. ${changes} files renamed. Check for any 'Missing' above.`);
}

autoSync();
