#!/usr/bin/env node
// Weekly App Store description watcher.
//
// Fetches the current App Store description for every Artificial Igknorance
// app (via the public iTunes Lookup API) and compares it to the saved
// baseline in descriptions.json. Prints which apps changed and a line-level
// diff so a human (or a scheduled Claude session) can update the matching
// website page.
//
// Usage:
//   node scripts/appstore/check.mjs                 # report changes vs baseline
//   node scripts/appstore/check.mjs --update-baseline  # save current as the new baseline
//
// The website page for each app is listed below so updates land in the right
// place. The iTunes "version" + "currentVersionReleaseDate" are tracked too,
// so a bump with no description change is still visible.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASELINE = join(__dirname, 'descriptions.json');

// name | App Store id | storefront country | website page
const APPS = [
  { name: 'Escalator Field Command', id: '6756789866', cc: 'us', page: 'src/pages/escalator-field-command.astro' },
  { name: 'HealthTrail Medical',     id: '6758072258', cc: 'us', page: 'src/pages/healthtrail-medical.astro' },
  { name: 'SnapLedger',              id: '6759497982', cc: 'ca', page: 'src/pages/snapledger.astro' },
  { name: 'Gold Watcher',            id: '6758283387', cc: 'us', page: 'src/pages/gold-watcher.astro' },
  { name: 'Silver Watcher',          id: '6760270695', cc: 'us', page: 'src/pages/silver-watcher.astro' },
  { name: 'Copper Watcher',          id: '6757655923', cc: 'us', page: 'src/pages/copper-watcher.astro' },
  { name: 'Lithium Watcher',         id: '6761344726', cc: 'us', page: 'src/pages/lithium-watcher.astro' },
  { name: 'RidgePacker',             id: '6766699306', cc: 'us', page: 'src/pages/ridgepacker.astro' }
];

async function fetchApp({ id, cc }) {
  const url = `https://itunes.apple.com/lookup?id=${id}&country=${cc}`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${id}`);
  const data = await res.json();
  const r = (data.results || [])[0];
  if (!r) throw new Error(`No App Store result for ${id} (${cc})`);
  return {
    description: (r.description || '').trim(),
    version: r.version || '',
    releaseDate: r.currentVersionReleaseDate || ''
  };
}

function lineDiff(oldText, newText) {
  const oldLines = new Set(oldText.split('\n').map((l) => l.trim()).filter(Boolean));
  const newLines = new Set(newText.split('\n').map((l) => l.trim()).filter(Boolean));
  const added = [...newLines].filter((l) => !oldLines.has(l));
  const removed = [...oldLines].filter((l) => !newLines.has(l));
  return { added, removed };
}

const updateBaseline = process.argv.includes('--update-baseline');

let baseline = {};
try {
  baseline = JSON.parse(readFileSync(BASELINE, 'utf8'));
} catch {
  console.log('No baseline yet — run with --update-baseline to create one.\n');
}

const current = {};
const changed = [];

for (const app of APPS) {
  try {
    const live = await fetchApp(app);
    current[app.id] = { name: app.name, page: app.page, ...live };
    const prev = baseline[app.id];

    if (!prev) {
      console.log(`NEW   ${app.name} — no baseline entry yet (v${live.version})`);
      changed.push(app.name);
      continue;
    }

    const descChanged = prev.description !== live.description;
    const versionChanged = prev.version !== live.version;

    if (descChanged) {
      changed.push(app.name);
      const { added, removed } = lineDiff(prev.description || '', live.description);
      console.log(`\nCHANGED  ${app.name}  (v${prev.version} -> v${live.version})  page: ${app.page}`);
      if (removed.length) console.log('  -- removed:\n' + removed.map((l) => '     - ' + l).join('\n'));
      if (added.length) console.log('  ++ added:\n' + added.map((l) => '     + ' + l).join('\n'));
    } else if (versionChanged) {
      console.log(`bump  ${app.name} — version ${prev.version} -> ${live.version}, description unchanged`);
    } else {
      console.log(`ok    ${app.name} — unchanged (v${live.version})`);
    }
  } catch (err) {
    console.log(`ERROR ${app.name} — ${err.message}`);
  }
}

if (updateBaseline) {
  mkdirSync(dirname(BASELINE), { recursive: true });
  writeFileSync(BASELINE, JSON.stringify(current, null, 2) + '\n');
  console.log(`\nBaseline updated -> ${BASELINE}`);
}

console.log(`\nRESULT: ${changed.length} app(s) with description changes${changed.length ? ': ' + changed.join(', ') : ''}`);
