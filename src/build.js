// build.js - Build script chính
// Chạy: node src/build.js
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

import { config } from './config.js';
import { fetchDeveloperApps, saveAppsCache } from './fetch-apps.js';
import { generatePrivacyPolicy, generateSupportContent } from './generate-privacy.js';
import { buildHomePage } from './page-home.js';
import { buildAppPage } from './page-app.js';
import { buildPrivacyPage, buildSupportPage } from './page-legal.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const CACHE_FILE = path.join(ROOT, 'apps-cache.json');

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function writeFile(filePath, content) {
  await ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, content, 'utf-8');
}

async function loadOrFetchApps() {
  const useCache = process.argv.includes('--cache');
  
  if (useCache) {
    try {
      const cached = await fs.readFile(CACHE_FILE, 'utf-8');
      const apps = JSON.parse(cached);
      console.log(`📦 Using cached data (${apps.length} apps)`);
      return apps;
    } catch (e) {
      console.log('⚠️  No cache found, fetching fresh data...');
    }
  }
  
  const apps = await fetchDeveloperApps();
  await saveAppsCache(apps, CACHE_FILE);
  return apps;
}

/**
 * Parse App Store URL thành app object tối giản cho pending apps.
 * URL format: https://apps.apple.com/{country}/app/{slug}/id{id}
 */
function parsePendingApps() {
  return (config.pendingApps || []).map(entry => {
    const match = entry.appStoreUrl.match(/\/app\/([^/]+)\/id(\d+)/i);
    if (!match) {
      console.warn(`⚠️  Bỏ qua URL không hợp lệ: ${entry.appStoreUrl}`);
      return null;
    }
    const slug = decodeURIComponent(match[1]);
    const id = match[2];
    // Capitalize từng từ (hỗ trợ tiếng Việt)
    const autoName = slug.split('-').map(w => w ? w[0].toUpperCase() + w.slice(1) : '').join(' ');
    return {
      id,
      slug,
      name: entry.name || autoName,
      appStoreUrl: entry.appStoreUrl,
      isPending: true,
      contentRating: '4+',
      icon: null,
    };
  }).filter(Boolean);
}

async function buildSitemap(apps, pendingApps = []) {
  const baseUrl = config.deployment.baseUrl;
  const today = new Date().toISOString().split('T')[0];

  const urls = [
    { loc: `${baseUrl}/`, priority: '1.0' },
    ...apps.flatMap(app => [
      { loc: `${baseUrl}/apps/${app.slug}/`, priority: '0.8' },
      { loc: `${baseUrl}/apps/${app.slug}/privacy/`, priority: '0.5' },
      { loc: `${baseUrl}/apps/${app.slug}/support/`, priority: '0.5' },
    ]),
    ...pendingApps.flatMap(app => [
      { loc: `${baseUrl}/apps/${app.slug}/privacy/`, priority: '0.5' },
      { loc: `${baseUrl}/apps/${app.slug}/support/`, priority: '0.5' },
    ]),
  ];
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
}

async function buildRobotsTxt() {
  return `User-agent: *
Allow: /

Sitemap: ${config.deployment.baseUrl}/sitemap.xml
`;
}

async function build() {
  console.log('\n🚀 Starting build process...\n');
  const startTime = Date.now();

  // 1. Clean dist directory
  console.log('🧹 Cleaning dist directory...');
  await fs.rm(DIST, { recursive: true, force: true });
  await ensureDir(DIST);

  // 2. Fetch apps + parse pending apps
  console.log('📡 Loading apps...');
  const apps = await loadOrFetchApps();
  const pendingApps = parsePendingApps();
  console.log(`   ✓ ${apps.length} apps loaded${pendingApps.length ? `, ${pendingApps.length} pending` : ''}\n`);
  
  // 3. Build homepage
  console.log('🏠 Building homepage...');
  const homeHtml = buildHomePage(apps);
  await writeFile(path.join(DIST, 'index.html'), homeHtml);
  console.log('   ✓ /index.html');
  
  // 4. Build app pages
  console.log('\n📱 Building app pages...');
  for (const app of apps) {
    const appDir = path.join(DIST, 'apps', app.slug);
    
    // Landing page
    const appHtml = buildAppPage(app, apps);
    await writeFile(path.join(appDir, 'index.html'), appHtml);
    
    // Privacy policy
    const privacyContent = generatePrivacyPolicy(app);
    const privacyHtml = buildPrivacyPage(privacyContent, app, apps);
    await writeFile(path.join(appDir, 'privacy', 'index.html'), privacyHtml);
    
    // Support page
    const supportContent = generateSupportContent(app);
    const supportHtml = buildSupportPage(supportContent, app, apps);
    await writeFile(path.join(appDir, 'support', 'index.html'), supportHtml);
    
    console.log(`   ✓ ${app.name}`);
    console.log(`     /apps/${app.slug}/`);
    console.log(`     /apps/${app.slug}/privacy/`);
    console.log(`     /apps/${app.slug}/support/`);
  }
  
  // 5. Build pending app pages (privacy + support only, không có landing page)
  if (pendingApps.length > 0) {
    console.log('\n⏳ Building pending app pages...');
    for (const app of pendingApps) {
      const appDir = path.join(DIST, 'apps', app.slug);

      const privacyContent = generatePrivacyPolicy(app);
      const privacyHtml = buildPrivacyPage(privacyContent, app, apps);
      await writeFile(path.join(appDir, 'privacy', 'index.html'), privacyHtml);

      const supportContent = generateSupportContent(app);
      const supportHtml = buildSupportPage(supportContent, app, apps);
      await writeFile(path.join(appDir, 'support', 'index.html'), supportHtml);

      console.log(`   ✓ ${app.name} (pending — chưa lên store)`);
      console.log(`     /apps/${app.slug}/privacy/`);
      console.log(`     /apps/${app.slug}/support/`);
    }
  }

  // 6. Build sitemap.xml & robots.txt
  console.log('\n🗺️  Building SEO files...');
  await writeFile(path.join(DIST, 'sitemap.xml'), await buildSitemap(apps, pendingApps));
  await writeFile(path.join(DIST, 'robots.txt'), await buildRobotsTxt());
  console.log('   ✓ /sitemap.xml');
  console.log('   ✓ /robots.txt');
  
  // 7. Build apps.json (data API for any future client-side use)
  await writeFile(
    path.join(DIST, 'apps.json'),
    JSON.stringify(apps, null, 2)
  );
  console.log('   ✓ /apps.json');
  
  // 8. Done
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  const totalPages = 1 + apps.length * 3 + pendingApps.length * 2 + 3;

  console.log(`\n✅ Build complete in ${duration}s`);
  console.log(`   ${totalPages} files generated → ${DIST}\n`);
  console.log(`📋 Summary:`);
  console.log(`   • 1 homepage`);
  console.log(`   • ${apps.length} app landing pages`);
  console.log(`   • ${apps.length + pendingApps.length} privacy policies`);
  console.log(`   • ${apps.length + pendingApps.length} support pages`);
  if (pendingApps.length > 0) {
    console.log(`   • ${pendingApps.length} pending app(s) — privacy & support only`);
  }
  console.log(`   • SEO: sitemap.xml, robots.txt`);
  console.log(`   • Data: apps.json\n`);
  
  console.log(`🎯 URLs to use in App Store Connect:`);
  console.log(`   For each app, copy these URLs into the matching fields:\n`);
  apps.slice(0, 3).forEach(app => {
    console.log(`   ${app.name}:`);
    console.log(`     Marketing URL:  ${config.deployment.baseUrl}/apps/${app.slug}/`);
    console.log(`     Support URL:    ${config.deployment.baseUrl}/apps/${app.slug}/support/`);
    console.log(`     Privacy URL:    ${config.deployment.baseUrl}/apps/${app.slug}/privacy/\n`);
  });
  if (apps.length > 3) {
    console.log(`   ... and ${apps.length - 3} more apps (see /dist/apps.json)\n`);
  }
}

build().catch(err => {
  console.error('\n❌ Build failed:', err);
  console.error(err.stack);
  process.exit(1);
});
