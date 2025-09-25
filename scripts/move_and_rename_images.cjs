// Move and rename all .jpeg/.png images from attached_assets to public/attached_assets, renaming for web-safe usage
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../attached_assets');
const destDir = path.join(__dirname, '../public/attached_assets');

function webSafe(name) {
  return name.replace(/\s+/g, '_')
    .replace(/[()]/g, '')
    .replace(/:/g, '_')
    .replace(/-/g, '_')
    .replace(/__+/g, '_');
}

fs.readdirSync(srcDir).forEach(file => {
  if (file.match(/\.(jpeg|jpg|png)$/i)) {
    const safeName = webSafe(file);
    fs.copyFileSync(path.join(srcDir, file), path.join(destDir, safeName));
    console.log(`Moved and renamed: ${file} -> ${safeName}`);
  }
});
console.log('All images moved and renamed to public/attached_assets.');
