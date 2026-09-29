#!/usr/bin/env node
/**
 * Pull selected headings from the CRUDForge CLI README into tmp/sync-notes.md
 * for human/agent merge into Starlight pages.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const cliRoot = process.env.CRUDFORGE_CLI_PATH
  ? path.resolve(process.env.CRUDFORGE_CLI_PATH)
  : path.resolve(root, '..', 'crud-fordge');
const readmePath = path.join(cliRoot, 'README.md');
const outDir = path.join(root, 'tmp');
const outPath = path.join(outDir, 'sync-notes.md');

const WANTED = [
  'Installation',
  'CLI Usage',
  'Keycloak auth and IAM',
  'QA and CI',
];

if (!fs.existsSync(readmePath)) {
  console.error(`CLI README not found at ${readmePath}`);
  console.error('Set CRUDFORGE_CLI_PATH or clone crud-fordge next to this repo.');
  process.exit(1);
}

const text = fs.readFileSync(readmePath, 'utf8');
const lines = text.split(/\r?\n/);
const sections = [];
let current = null;

for (const line of lines) {
  const h2 = /^##\s+(.+)$/.exec(line);
  if (h2) {
    if (current) sections.push(current);
    const title = h2[1].replace(/[^\w\s&/-]/g, '').trim();
    current = { title: h2[1], plain: title, body: [] };
    continue;
  }
  if (current) current.body.push(line);
}
if (current) sections.push(current);

const picked = sections.filter((s) =>
  WANTED.some((w) => s.plain.toLowerCase().includes(w.toLowerCase()) || s.title.includes(w))
);

fs.mkdirSync(outDir, { recursive: true });
const stamp = new Date().toISOString();
let md = `# Sync notes from CLI README\n\nGenerated: ${stamp}\nSource: \`${readmePath}\`\n\n`;
md += `> Draft only — merge into \`src/content/docs\` via content-writer. Do not publish this file.\n\n`;

if (!picked.length) {
  md += '_No matching sections found._\n';
} else {
  for (const s of picked) {
    md += `## ${s.title}\n\n${s.body.join('\n').trim()}\n\n---\n\n`;
  }
}

fs.writeFileSync(outPath, md);
console.log(`Wrote ${outPath} (${picked.length} section(s))`);
