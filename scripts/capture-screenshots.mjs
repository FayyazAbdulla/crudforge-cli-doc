/**
 * Capture product screenshots for Starlight docs from the mock e2e app (:4200).
 * Usage (CLI repo serving): npm run e2e:serve
 * Then:          npm run shots:capture  (from docs repo)
 *
 * Env:
 *   BASE_URL=http://127.0.0.1:4200
 *   OUT_DIR=src/content/docs/assets/screenshots
 *   CAPTURE_IAM=1  — also capture IAM routes (needs e2e:serve:iam)
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const require = createRequire(import.meta.url);
const playwrightRoots = [
  path.resolve(root, '../crud-fordge/node_modules/playwright'),
  path.resolve(root, 'node_modules/playwright'),
  'playwright',
];
let chromium;
for (const candidate of playwrightRoots) {
  try {
    ({ chromium } = require(candidate));
    break;
  } catch {
    /* try next */
  }
}
if (!chromium) {
  console.error('Playwright not found. Install in CLI repo or: npm i -D playwright');
  process.exit(1);
}

const outDir = path.resolve(
  root,
  process.env.OUT_DIR || 'src/content/docs/assets/screenshots'
);
const baseURL = process.env.BASE_URL || 'http://127.0.0.1:4200';
const captureIam = process.env.CAPTURE_IAM === '1' || process.env.CAPTURE_IAM === 'true';

fs.mkdirSync(outDir, { recursive: true });

async function shot(page, name) {
  const file = path.join(outDir, name);
  await page.screenshot({ path: file, fullPage: false });
  console.log('wrote', path.relative(root, file));
}

async function signIn(page) {
  await page.goto('/auth/sign-in', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Sign in' }).waitFor({ state: 'visible' });
  await Promise.all([
    page.waitForURL(/\/admin(\/|$)/, { timeout: 30_000 }),
    page.getByRole('button', { name: 'Sign in' }).click(),
  ]);
}

async function confirmIfPresent(page) {
  const confirm = page.getByRole('button', { name: 'Confirm' });
  if (await confirm.isVisible({ timeout: 1500 }).catch(() => false)) {
    await confirm.click();
  }
}

async function captureCrud(page) {
  await page.goto('/auth/sign-in', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Sign in' }).waitFor({ state: 'visible' });
  await shot(page, '01-sign-in.png');

  await signIn(page);
  await page.waitForTimeout(500);
  await shot(page, '02-welcome.png');

  await page.goto('/admin/book', { waitUntil: 'networkidle' });
  await page.getByRole('heading', { name: /Book Management/i }).waitFor();
  await page.getByRole('cell', { name: 'Mock title 1', exact: true }).waitFor();
  await shot(page, '03-book-list.png');

  await page.getByRole('button', { name: 'New' }).click();
  await page.locator('mat-drawer.cforge-form-drawer').waitFor({ state: 'visible' });
  await page.waitForTimeout(300);
  await shot(page, '04-form-sidebar-new.png');
  await page.locator('mat-drawer.cforge-form-drawer').getByRole('button', { name: 'Cancel' }).click();
  await page.locator('mat-drawer.cforge-form-drawer').waitFor({ state: 'hidden' });

  await page.locator('button[matTooltip="Edit Book"]').first().click();
  await confirmIfPresent(page);
  await page.locator('mat-drawer.cforge-form-drawer').waitFor({ state: 'visible' });
  await page.waitForTimeout(300);
  await shot(page, '05-form-sidebar-edit.png');
  await page.locator('mat-drawer.cforge-form-drawer').getByRole('button', { name: 'Cancel' }).click();
  await page.locator('mat-drawer.cforge-form-drawer').waitFor({ state: 'hidden' });

  await page.getByRole('button', { name: 'Open filters' }).click();
  await page.getByRole('heading', { name: 'Advanced Filters' }).waitFor();
  await page.waitForTimeout(300);
  await shot(page, '06-filter-drawer.png');
  await page.keyboard.press('Escape').catch(() => {});
  const closeFilters = page.getByRole('button', { name: /Close|Cancel/i }).first();
  if (await closeFilters.isVisible({ timeout: 1000 }).catch(() => false)) {
    await closeFilters.click().catch(() => {});
  }
  // Prefer explicit close if still open
  if (await page.getByRole('heading', { name: 'Advanced Filters' }).isVisible().catch(() => false)) {
    await page.getByRole('button', { name: 'Apply Filters' }).click().catch(() => {});
  }

  await page.getByRole('button', { name: 'Switch to Card View' }).click();
  await page.getByRole('button', { name: 'Edit' }).first().waitFor();
  await page.waitForTimeout(300);
  await shot(page, '07-card-view.png');
  await page.getByRole('button', { name: 'Switch to Table View' }).click().catch(async () => {
    await page.getByRole('button', { name: /Table/i }).click();
  });

  await page.locator('button[matTooltip="View Details"]').first().click();
  await page.getByRole('heading', { name: 'Book Details' }).waitFor();
  // Wait for entity fields to hydrate (avoid empty detail shell)
  await page.getByText(/Mock title|Title|ISBN|Published/i).first().waitFor({ timeout: 10_000 }).catch(() => {});
  await page.waitForTimeout(500);
  await shot(page, '08-detail.png');
  await page.getByRole('button', { name: 'Back' }).click();
  await page.getByRole('heading', { name: /Book Management/i }).waitFor();

  await page.locator('button[matTooltip="Delete Book"]').first().click();
  await page.getByRole('heading', { name: 'Delete Book' }).waitFor();
  await page.waitForTimeout(300);
  await shot(page, '09-delete-confirm.png');
  await page.getByRole('button', { name: 'Cancel' }).click();
}

async function captureIamShots(page) {
  await page.goto('/auth/sign-in', { waitUntil: 'networkidle' });
  const userField = page.locator('#email');
  if (await userField.isVisible({ timeout: 2000 }).catch(() => false)) {
    await userField.fill('demo@crudforge.com');
    await page.locator('input[type="password"]').fill('admin');
  }
  await Promise.all([
    page.waitForURL(/\/admin(\/|$)/, { timeout: 30_000 }),
    page.getByRole('button', { name: 'Sign in' }).click(),
  ]);

  await page.goto('/admin/user-management', { waitUntil: 'networkidle' });
  await page.getByRole('heading', { name: 'User Management' }).waitFor({ timeout: 15_000 });
  await page.waitForTimeout(400);
  await shot(page, '10-iam-users.png');

  await page.goto('/admin/user-management/roles', { waitUntil: 'networkidle' });
  await page.getByRole('heading', { name: 'Roles' }).waitFor();
  await page.waitForTimeout(400);
  await shot(page, '11-iam-roles.png');

  await page.goto('/admin/user-management/role-permissions', { waitUntil: 'networkidle' });
  await page.getByRole('heading', { name: 'Role permissions' }).waitFor();
  await page.waitForTimeout(400);
  await shot(page, '12-iam-role-matrix.png');

  // Inject a faithful stand-in matching generated overlay markup/styles
  // (mock IAM does not expose a public force-lock API for docs capture)
  await page.evaluate(() => {
    const existing = document.querySelector('.cforge-disabled-backdrop');
    if (existing) return;
    const style = document.createElement('style');
    style.textContent = `
      .cforge-disabled-backdrop{position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;
        background:rgba(15,23,42,.72);backdrop-filter:blur(4px);font-family:system-ui,sans-serif}
      .cforge-disabled-modal{width:min(420px,92vw);border-radius:20px;padding:28px 24px;background:#0f172a;color:#f8fafc;
        box-shadow:0 25px 50px rgba(0,0,0,.45);text-align:center}
      .cforge-disabled-title{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#94a3b8;margin-bottom:8px}
      .cforge-disabled-headline{font-size:22px;font-weight:700;margin-bottom:8px}
      .cforge-disabled-message{font-size:14px;color:#cbd5e1;margin-bottom:20px;line-height:1.45}
      .cforge-disabled-timer{position:relative;width:140px;height:140px;margin:0 auto 16px}
      .cforge-disabled-svg{width:140px;height:140px;transform:rotate(-90deg)}
      .cforge-disabled-track{fill:none;stroke:#1e293b;stroke-width:10}
      .cforge-disabled-progress{fill:none;stroke:#f97316;stroke-width:10;stroke-linecap:round}
      .cforge-disabled-core{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
      .cforge-disabled-value{font-size:36px;font-weight:700}
      .cforge-disabled-unit{font-size:12px;color:#94a3b8;text-transform:uppercase}
      .cforge-disabled-countdown{font-size:13px;color:#94a3b8}
    `;
    document.head.appendChild(style);
    const el = document.createElement('div');
    el.className = 'cforge-disabled-backdrop';
    el.setAttribute('role', 'alertdialog');
    el.setAttribute('aria-label', 'Account access blocked');
    el.innerHTML = `
      <div class="cforge-disabled-modal">
        <div class="cforge-disabled-title">System Status</div>
        <div class="cforge-disabled-headline">Please wait...</div>
        <div class="cforge-disabled-message">Your account has been disabled. You will be signed out shortly.</div>
        <div class="cforge-disabled-timer">
          <svg class="cforge-disabled-svg" viewBox="0 0 200 200" aria-hidden="true">
            <circle class="cforge-disabled-track" cx="100" cy="100" r="80"></circle>
            <circle class="cforge-disabled-progress" cx="100" cy="100" r="80"
              stroke-dasharray="502" stroke-dashoffset="180"></circle>
          </svg>
          <div class="cforge-disabled-core">
            <div class="cforge-disabled-value">12</div>
            <div class="cforge-disabled-unit">sec</div>
          </div>
        </div>
        <div class="cforge-disabled-countdown">Signing out in 12s</div>
      </div>`;
    document.body.appendChild(el);
  });
  await page.waitForTimeout(200);
  await shot(page, '15-disabled-account.png');
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    baseURL,
    colorScheme: 'light',
  });
  const page = await context.newPage();

  try {
    const res = await page.goto(baseURL, { waitUntil: 'domcontentloaded', timeout: 15_000 });
    if (!res || !res.ok()) {
      throw new Error(`App not reachable at ${baseURL} (status ${res?.status()}). Run: npm run e2e:serve`);
    }
  } catch (err) {
    await browser.close();
    console.error(String(err.message || err));
    process.exit(1);
  }

  if (captureIam) {
    console.log('Capturing IAM shots from', baseURL);
    await captureIamShots(page);
  } else {
    console.log('Capturing CRUD shots from', baseURL);
    await captureCrud(page);
  }

  await browser.close();
  console.log('Done →', outDir);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
