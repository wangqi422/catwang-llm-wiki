import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');

function read(relativePath) {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) throw new Error(`Missing ${relativePath}`);
  return fs.readFileSync(absolutePath, 'utf8');
}

const html = read('index.html');
const css = read('css/styles.css');
const app = read('js/app.js');
const data = read('js/assets-data.js');

const requiredIds = [
  'hero', 'identity', 'video', 'posters', 'gallery', 'style-dna',
  'learning-template', 'sources', 'asset-grid', 'asset-modal'
];
for (const id of requiredIds) {
  if (!html.includes(`id="${id}"`)) throw new Error(`Missing #${id}`);
}
if (!html.includes('css/styles.css')) throw new Error('Missing stylesheet link');
if (!html.includes('js/assets-data.js') || !html.includes('js/app.js')) throw new Error('Missing scripts');
if (!css.includes('@media (prefers-reduced-motion: reduce)')) throw new Error('Missing reduced-motion support');
if (/border-radius\s*:/.test(css)) throw new Error('Rounded corners are forbidden');
if (app.includes('fetch(')) throw new Error('Runtime fetch breaks file:// support');

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(data, sandbox);
if (!Array.isArray(sandbox.window.BLACKCELL_ASSETS) || sandbox.window.BLACKCELL_ASSETS.length !== 30) {
  throw new Error('Asset data did not expose 30 browser-ready records');
}

const appSandbox = {
  window: { BLACKCELL_ASSETS: sandbox.window.BLACKCELL_ASSETS },
  document: {
    documentElement: { classList: { add() {} } },
    readyState: 'loading',
    addEventListener() {}
  },
  console
};
vm.createContext(appSandbox);
vm.runInContext(app, appSandbox);
const api = appSandbox.window.BlackCellArchive;
if (!api) throw new Error('Missing window.BlackCellArchive API');
for (const name of ['filterAssets', 'renderGallery', 'openAsset', 'closeAsset', 'moveAsset']) {
  if (typeof api[name] !== 'function') throw new Error(`Missing application function ${name}`);
}
const all = api.filterAssets('all');
const duplicates = api.filterAssets('duplicate');
if (all.length !== 30) throw new Error(`All filter returned ${all.length}`);
if (duplicates.length !== 2 || duplicates.some((item) => item.sourceStatus !== 'duplicate')) {
  throw new Error('Duplicate filter returned incorrect records');
}

console.log('PASS: static page contract');
