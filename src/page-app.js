// page-app.js - Landing page chi tiết cho từng app
import { config } from './config.js';
import { buildPage, buildHead, buildHeader, buildFooter, escapeHtml } from './templates.js';

const appCss = `
/* ============ APP DETAIL PAGE ============ */
.app-hero {
  padding: 80px 0 60px;
  position: relative;
}

.breadcrumb {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.06em;
  color: var(--ink-faint);
  margin-bottom: 48px;
  display: flex;
  gap: 8px;
  align-items: center;
}

.breadcrumb a:hover { color: var(--accent); }

.app-hero-grid {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 64px;
  align-items: start;
}

@media (max-width: 768px) {
  .app-hero-grid { 
    grid-template-columns: 1fr; 
    gap: 32px; 
  }
}

.app-hero-icon {
  width: 240px;
  height: 240px;
  border-radius: 54px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.08);
  background: #fff;
}

@media (max-width: 768px) {
  .app-hero-icon { width: 160px; height: 160px; border-radius: 36px; }
}

.app-hero-info {
  padding-top: 8px;
}

.app-eyebrow {
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-faint);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.app-eyebrow::before {
  content: '';
  width: 24px;
  height: 1px;
  background: var(--ink);
}

.app-hero-title {
  font-size: clamp(40px, 6vw, 72px);
  margin-bottom: 16px;
  line-height: 1;
}

.app-subtitle {
  font-size: clamp(18px, 2vw, 22px);
  color: var(--ink-soft);
  font-style: italic;
  margin-bottom: 32px;
  font-family: 'Fraunces', serif;
  font-weight: 400;
  max-width: 600px;
}

.app-cta-row {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 32px;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: var(--ink);
  color: var(--bg);
  padding: 14px 24px;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.02em;
  transition: background 0.2s, transform 0.2s;
}

.btn-primary:hover {
  background: var(--accent);
  transform: translateY(-2px);
}

.btn-primary svg { width: 22px; height: 22px; }

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 0;
  font-size: 14px;
  color: var(--ink-soft);
  border-bottom: 1px solid var(--line-soft);
}

.btn-secondary:hover { color: var(--accent); border-color: currentColor; }

.app-stats {
  display: flex;
  gap: 32px;
  padding-top: 24px;
  border-top: 1px solid var(--line-soft);
  flex-wrap: wrap;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-label {
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-faint);
}

.stat-value {
  font-size: 20px;
  font-weight: 500;
  font-family: 'Fraunces', serif;
}

/* ============ DESCRIPTION ============ */
.section {
  padding: 80px 0;
  border-top: 1px solid var(--line);
}

.section-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 64px;
}

@media (max-width: 768px) {
  .section-grid { grid-template-columns: 1fr; gap: 24px; }
}

.section-label {
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-faint);
  font-weight: 600;
  position: sticky;
  top: 100px;
}

.section-body {
  font-size: 18px;
  line-height: 1.7;
  color: var(--ink-soft);
  white-space: pre-wrap;
  word-wrap: break-word;
}

.section-body p { margin-bottom: 1em; }

/* ============ SCREENSHOTS ============ */
.screenshots-section {
  padding: 80px 0;
  border-top: 1px solid var(--line);
  overflow: hidden;
}

.screenshots-header {
  margin-bottom: 48px;
}

.screenshots-title {
  font-size: clamp(32px, 5vw, 56px);
  margin-bottom: 8px;
}

.screenshots-rail {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  padding: 20px 0 40px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
}

.screenshots-rail::-webkit-scrollbar {
  height: 6px;
}

.screenshots-rail::-webkit-scrollbar-track {
  background: var(--line-soft);
}

.screenshots-rail::-webkit-scrollbar-thumb {
  background: var(--ink-soft);
  border-radius: 3px;
}

.screenshot {
  flex: 0 0 auto;
  width: 280px;
  height: 600px;
  border-radius: 36px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.08);
  scroll-snap-align: start;
  background: #f0f0f0;
  object-fit: cover;
  transition: transform 0.4s;
}

.screenshot:hover { transform: scale(1.02); }

@media (max-width: 640px) {
  .screenshot { width: 220px; height: 470px; }
}

/* ============ INFO CARDS ============ */
.info-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--line-soft);
  border: 1px solid var(--line-soft);
  margin-top: 32px;
}

@media (max-width: 768px) {
  .info-grid { grid-template-columns: repeat(2, 1fr); }
}

.info-cell {
  background: var(--bg);
  padding: 24px 20px;
}

.info-cell-label {
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-faint);
  margin-bottom: 6px;
  font-weight: 600;
}

.info-cell-value {
  font-size: 16px;
  font-weight: 500;
}

/* ============ LEGAL LINKS ============ */
.legal-section {
  padding: 80px 0;
  border-top: 1px solid var(--line);
}

.legal-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 32px;
}

@media (max-width: 640px) {
  .legal-grid { grid-template-columns: 1fr; }
}

.legal-card {
  border: 1px solid var(--line);
  padding: 32px;
  transition: background 0.3s, color 0.3s;
  position: relative;
  overflow: hidden;
}

.legal-card:hover {
  background: var(--ink);
  color: var(--bg);
}

.legal-card-label {
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-faint);
  margin-bottom: 12px;
}

.legal-card:hover .legal-card-label { color: rgba(255,255,255,0.6); }

.legal-card-title {
  font-size: 28px;
  font-family: 'Fraunces', serif;
  font-weight: 400;
  margin-bottom: 8px;
}

.legal-card-desc {
  font-size: 14px;
  color: var(--ink-soft);
  margin-bottom: 24px;
}

.legal-card:hover .legal-card-desc { color: rgba(255,255,255,0.7); }

.legal-card-arrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 500;
}
`;

function formatBytes(bytes) {
  if (!bytes) return '—';
  const mb = bytes / (1024 * 1024);
  if (mb < 1) return `${Math.round(bytes / 1024)} KB`;
  return `${mb.toFixed(1)} MB`;
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

export function buildAppPage(app, allApps) {
  const description = app.description || '';
  const head = buildHead({
    title: `${app.name} — ${app.shortDescription || app.genre}`,
    description: description.slice(0, 160),
    image: app.icon,
    url: `${config.deployment.baseUrl}/apps/${app.slug}/`,
    type: 'product',
  }) + `<style>${appCss}</style>`;

  const screenshots = [
    ...app.screenshots.slice(0, 8),
    ...app.ipadScreenshots.slice(0, 2)
  ];

  const body = `
${buildHeader()}

<main>
  <section class="container app-hero">
    <div class="breadcrumb">
      <a href="/">Apps</a>
      <span>/</span>
      <span>${escapeHtml(app.name)}</span>
    </div>

    <div class="app-hero-grid">
      <div class="rise">
        <img src="${app.icon}" alt="${escapeHtml(app.name)}" class="app-hero-icon">
      </div>
      <div class="app-hero-info">
        <div class="app-eyebrow rise" style="animation-delay: 0.1s">${escapeHtml(app.genre)} · ${escapeHtml(app.price)}</div>
        <h1 class="app-hero-title font-display rise" style="animation-delay: 0.2s">${escapeHtml(app.name)}</h1>
        <p class="app-subtitle rise" style="animation-delay: 0.3s">${escapeHtml(app.shortDescription || description.slice(0, 140))}</p>
        
        <div class="app-cta-row rise" style="animation-delay: 0.4s">
          <a href="${app.appStoreUrl}" target="_blank" rel="noopener" class="btn-primary">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
            Download on the App Store
          </a>
          <a href="/apps/${app.slug}/support/" class="btn-secondary">
            Get Support →
          </a>
        </div>

        <div class="app-stats">
          ${app.rating > 0 ? `
          <div class="stat">
            <span class="stat-label">Rating</span>
            <span class="stat-value">★ ${app.rating.toFixed(1)} <span style="color: var(--ink-faint); font-size: 14px;">(${app.ratingCount.toLocaleString()})</span></span>
          </div>
          ` : ''}
          <div class="stat">
            <span class="stat-label">Version</span>
            <span class="stat-value">${escapeHtml(app.version || '—')}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Released</span>
            <span class="stat-value">${formatDate(app.releaseDate)}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Updated</span>
            <span class="stat-value">${formatDate(app.currentVersionReleaseDate)}</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  ${screenshots.length > 0 ? `
  <section class="screenshots-section">
    <div class="container screenshots-header">
      <h2 class="screenshots-title font-display">A look <em style="color: var(--accent);">inside.</em></h2>
      <p style="color: var(--ink-soft); font-size: 16px;">Scroll horizontally to see all screens.</p>
    </div>
    <div class="container" style="max-width: none; padding-left: 32px;">
      <div class="screenshots-rail">
        ${screenshots.map(url => `
          <img src="${url}" alt="${escapeHtml(app.name)} screenshot" class="screenshot" loading="lazy">
        `).join('')}
      </div>
    </div>
  </section>
  ` : ''}

  <section class="section">
    <div class="container">
      <div class="section-grid">
        <div class="section-label">About this app</div>
        <div class="section-body">${escapeHtml(description)}</div>
      </div>

      <div class="info-grid">
        <div class="info-cell">
          <div class="info-cell-label">Category</div>
          <div class="info-cell-value">${escapeHtml(app.genre)}</div>
        </div>
        <div class="info-cell">
          <div class="info-cell-label">Age Rating</div>
          <div class="info-cell-value">${escapeHtml(app.contentRating)}</div>
        </div>
        <div class="info-cell">
          <div class="info-cell-label">Size</div>
          <div class="info-cell-value">${formatBytes(app.fileSize)}</div>
        </div>
        <div class="info-cell">
          <div class="info-cell-label">Languages</div>
          <div class="info-cell-value">${app.languages.length}</div>
        </div>
        <div class="info-cell">
          <div class="info-cell-label">Min iOS</div>
          <div class="info-cell-value">${escapeHtml(app.minimumOsVersion || '—')}</div>
        </div>
        <div class="info-cell">
          <div class="info-cell-label">Devices</div>
          <div class="info-cell-value">${app.isUniversal ? 'iPhone & iPad' : 'iPhone'}</div>
        </div>
        <div class="info-cell">
          <div class="info-cell-label">Price</div>
          <div class="info-cell-value">${escapeHtml(app.price)}</div>
        </div>
        <div class="info-cell">
          <div class="info-cell-label">Bundle ID</div>
          <div class="info-cell-value font-mono" style="font-size: 12px;">${escapeHtml(app.bundleId || '—')}</div>
        </div>
      </div>
    </div>
  </section>

  <section class="legal-section">
    <div class="container">
      <div class="section-grid">
        <div class="section-label">Legal & Help</div>
        <div>
          <h3 class="font-display" style="font-size: 36px; margin-bottom: 8px;">Need anything else?</h3>
          <p style="color: var(--ink-soft); max-width: 500px;">Privacy and support resources, written specifically for ${escapeHtml(app.name)}.</p>
          
          <div class="legal-grid">
            <a href="/apps/${app.slug}/privacy/" class="legal-card">
              <div class="legal-card-label">Document</div>
              <div class="legal-card-title">Privacy Policy</div>
              <div class="legal-card-desc">How ${escapeHtml(app.name)} handles (or doesn't handle) your data.</div>
              <span class="legal-card-arrow">Read policy →</span>
            </a>
            <a href="/apps/${app.slug}/support/" class="legal-card">
              <div class="legal-card-label">Help Center</div>
              <div class="legal-card-title">Support & FAQ</div>
              <div class="legal-card-desc">Common questions and how to get in touch with us.</div>
              <span class="legal-card-arrow">Get help →</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>

${buildFooter(allApps)}
`;

  return buildPage({ head, body });
}
