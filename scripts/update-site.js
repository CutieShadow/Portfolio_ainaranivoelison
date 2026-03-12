import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

function parseArgs() {
  const out = {};
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].replace(/^--/, '');
      out[key] = args[i + 1];
      i++;
    }
  }
  return out;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = parseArgs();
const sitePath = path.resolve(__dirname, '../src/config/site.json');

if (!fs.existsSync(sitePath)) {
  console.error('Configuration file not found:', sitePath);
  process.exit(1);
}

const site = JSON.parse(fs.readFileSync(sitePath, 'utf-8'));
let changed = false;

['displayName','firstName','lastName','shortName','cvName','cvDownloadName','github','linkedin','instagram','email'].forEach((k) => {
  const argKey = k === 'cvName' ? 'cvName' : k;
  if (args[argKey]) {
    // map cvName to cvDownloadName if needed
    if (argKey === 'cvName') {
      site.cvDownloadName = args[argKey];
    } else if (site[argKey] !== args[argKey]) {
      site[argKey] = args[argKey];
    }
    changed = true;
  }
});

if (changed) {
  fs.writeFileSync(sitePath, JSON.stringify(site, null, 2), 'utf-8');
  console.log('Updated site config at', sitePath);
} else {
  console.log('No updates provided. Use flags like --firstName "Aïna" --lastName "RANIVOELISON" --displayName "Aïna Ranivoelison" --cvName "file.pdf"');
}

// If cvName provided, also try to update About.jsx download attribute
if (args.cvName) {
  const aboutPath = path.resolve(__dirname, '../src/Pages/About.jsx');
  if (fs.existsSync(aboutPath)) {
    let about = fs.readFileSync(aboutPath, 'utf-8');
    about = about.replace(/download=\"[^\"]*\"/, `download={site.cvDownloadName}`);
    // ensure we import site in About.jsx (if not already)
    if (!/import site from\s+"\.\.\/config\/site.json"/.test(about)) {
      about = about.replace(/(import\s+'aos\/dist\/aos.css'\s*)/, `$1\nimport site from "../config/site.json";\n`);
    }
    fs.writeFileSync(aboutPath, about, 'utf-8');
    console.log('Updated download attribute in About.jsx (if present).');
  }
}

console.log('Done. You can now run `npm run dev` to see changes.');
