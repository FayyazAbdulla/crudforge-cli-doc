#!/usr/bin/env node
/** Fail if brand assets / tokens are missing. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const requiredFiles = [
  'public/logo.png',
  'public/logo-mark.png',
  'public/favicon.png',
  'src/styles/brand.css',
  'astro.config.mjs',
];

let failed = false;
for (const rel of requiredFiles) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) {
    console.error(`Missing: ${rel}`);
    failed = true;
  }
}

const css = fs.readFileSync(path.join(root, 'src/styles/brand.css'), 'utf8');
if (!css.includes('#791eff') && !css.includes('#791EFF')) {
  console.error('brand.css must define #791EFF');
  failed = true;
}

const astro = fs.readFileSync(path.join(root, 'astro.config.mjs'), 'utf8');
if (!astro.includes('791EFF') && !astro.includes('791eff')) {
  console.error('astro.config.mjs should reference brand violet');
  failed = true;
}

if (failed) process.exit(1);
console.log('design:audit OK — logos + brand tokens present');
