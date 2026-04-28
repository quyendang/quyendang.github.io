// page-home.js - Trang chủ liệt kê tất cả apps
import { config } from './config.js';
import { buildPage, buildHead, buildHeader, buildFooter, escapeHtml } from './templates.js';

const homeCss = `
/* ============ HOMEPAGE ============ */
.hero {
  padding: 100px 0 80px;
  position: relative;
}

.hero-eyebrow {
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-faint);
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.hero-eyebrow::before {
  content: '';
  width: 24px;
  height: 1px;
  background: var(--ink);
}

.hero-title {
  font-size: clamp(48px, 9vw, 120px);
  margin-bottom: 32px;
  max-width: 900px;
}

.hero-title .accent {
  color: var(--accent);
  font-style: italic;
}

.hero-meta {
  display: flex;
  gap: 60px;
  align-items: end;
  margin-top: 60px;
  padding-top: 24px;
  border-top: 1px solid var(--line);
  flex-wrap: wrap;
}

.hero-meta-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.hero-meta-label {
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-faint);
}

.hero-meta-value {
  font-size: 24px;
  font-weight: 500;
}

.hero-meta-value.font-display {
  font-size: 32px;
}

/* ============ APPS GRID ============ */
.apps-section {
  padding: 80px 0 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 48px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--line);
}

.section-title {
  font-size: clamp(32px, 5vw, 56px);
}

.section-counter {
  font-size: 14px;
  color: var(--ink-faint);
  font-family: 'JetBrains Mono', monospace;
}

.apps-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  background: var(--line-soft);
  border: 1px solid var(--line-soft);
}

@media (max-width: 768px) {
  .apps-grid { grid-template-columns: 1fr; }
}

.app-card {
  background: var(--bg);
  padding: 40px 36px;
  display: flex;
  gap: 24px;
  align-items: start;
  transition: background 0.3s, transform 0.3s;
  position: relative;
  overflow: hidden;
}

.app-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--accent);
  transform: translateY(101%);
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  z-index: 0;
}

.app-card:hover::before { transform: translateY(0); }

.app-card:hover { color: var(--bg); }
.app-card:hover .app-meta-tag { 
  border-color: rgba(255,255,255,0.3);
  color: rgba(255,255,255,0.85);
}
.app-card:hover .app-tagline { color: rgba(255,255,255,0.85); }
.app-card:hover .app-arrow { transform: translate(8px, -8px); }

.app-card > * { position: relative; z-index: 1; }

.app-icon {
  width: 96px;
  height: 96px;
  border-radius: 22px;
  flex-shrink: 0;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  background: #fff;
}

.app-content {
  flex: 1;
  min-width: 0;
  padding-top: 4px;
}

.app-number {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.12em;
  color: var(--ink-faint);
  margin-bottom: 8px;
}

.app-card:hover .app-number { color: rgba(255,255,255,0.6); }

.app-name {
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin-bottom: 8px;
  line-height: 1.2;
}

.app-tagline {
  font-size: 15px;
  color: var(--ink-soft);
  margin-bottom: 16px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.app-meta {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.app-meta-tag {
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 4px 10px;
  border: 1px solid var(--line-soft);
  border-radius: 100px;
  color: var(--ink-soft);
  font-weight: 500;
}

.app-arrow {
  position: absolute;
  top: 36px;
  right: 36px;
  font-size: 20px;
  color: var(--ink-faint);
  transition: transform 0.3s, color 0.3s;
  z-index: 2;
}

.app-card:hover .app-arrow { color: var(--bg); }

/* ============ ABOUT SECTION ============ */
.about-section {
  padding: 120px 0 60px;
  border-top: 1px solid var(--line);
  margin-top: 120px;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
  align-items: start;
}

@media (max-width: 768px) {
  .about-grid { grid-template-columns: 1fr; gap: 32px; }
}

.about-label {
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-faint);
}

.about-text {
  font-size: clamp(20px, 2.5vw, 28px);
  line-height: 1.4;
  letter-spacing: -0.01em;
}

.about-text em {
  color: var(--accent);
  font-style: italic;
  font-family: 'Fraunces', serif;
}

.about-text p + p { margin-top: 24px; }
`;

export function buildHomePage(apps) {
  const head = buildHead({
    title: `${config.developer.name} — Independent iOS Apps`,
    description: config.developer.tagline,
    url: config.deployment.baseUrl,
  }) + `<style>${homeCss}</style>`;

  const totalRating = apps.reduce((sum, a) => sum + (a.rating || 0) * (a.ratingCount || 0), 0);
  const totalRatings = apps.reduce((sum, a) => sum + (a.ratingCount || 0), 0);
  const avgRating = totalRatings > 0 ? (totalRating / totalRatings).toFixed(1) : '—';
  const oldestYear = apps.reduce((min, a) => {
    const y = new Date(a.releaseDate).getFullYear();
    return y < min ? y : min;
  }, new Date().getFullYear());

  const body = `
${buildHeader('/')}

<main>
  <section class="hero container">
    <div class="hero-eyebrow rise" style="animation-delay: 0.1s">Independent iOS Studio · Since ${oldestYear}</div>
    <h1 class="hero-title font-display rise" style="animation-delay: 0.2s">
      Apps for the<br>
      moments that <span class="accent">matter</span>.
    </h1>
    <p style="font-size: 18px; max-width: 580px; color: var(--ink-soft); line-height: 1.6;" class="rise" style="animation-delay: 0.3s">
      ${escapeHtml(config.developer.tagline)}. Privacy-first. No ads. No tracking. Just thoughtful tools that respect your time.
    </p>

    <div class="hero-meta rise" style="animation-delay: 0.5s">
      <div class="hero-meta-item">
        <span class="hero-meta-label">Apps Shipped</span>
        <span class="hero-meta-value font-display">${apps.length}</span>
      </div>
      <div class="hero-meta-item">
        <span class="hero-meta-label">Average Rating</span>
        <span class="hero-meta-value font-display">${avgRating}<span style="color: var(--ink-faint); font-size: 18px;"> / 5</span></span>
      </div>
      <div class="hero-meta-item">
        <span class="hero-meta-label">Total Reviews</span>
        <span class="hero-meta-value font-display">${totalRatings.toLocaleString()}</span>
      </div>
      <div class="hero-meta-item">
        <span class="hero-meta-label">Headquarters</span>
        <span class="hero-meta-value">Đà Lạt, VN</span>
      </div>
    </div>
  </section>

  <section class="apps-section container" id="apps">
    <div class="section-header">
      <h2 class="section-title font-display">The Catalogue<span class="accent" style="color: var(--accent)">.</span></h2>
      <span class="section-counter">${String(apps.length).padStart(2, '0')} / ${String(apps.length).padStart(2, '0')}</span>
    </div>

    <div class="apps-grid">
      ${apps.map((app, i) => `
        <a href="/apps/${app.slug}/" class="app-card rise" style="animation-delay: ${0.1 + i * 0.05}s">
          <img src="${app.icon}" alt="${escapeHtml(app.name)} icon" class="app-icon" loading="lazy">
          <div class="app-content">
            <div class="app-number">No. ${String(i + 1).padStart(3, '0')}</div>
            <h3 class="app-name">${escapeHtml(app.name)}</h3>
            <p class="app-tagline">${escapeHtml(app.shortDescription || app.description.slice(0, 120))}</p>
            <div class="app-meta">
              <span class="app-meta-tag">${escapeHtml(app.genre)}</span>
              ${app.rating > 0 ? `<span class="app-meta-tag">★ ${app.rating.toFixed(1)}</span>` : ''}
              <span class="app-meta-tag">${escapeHtml(app.price)}</span>
            </div>
          </div>
          <span class="app-arrow">↗</span>
        </a>
      `).join('')}
    </div>
  </section>

  <section class="about-section container" id="about">
    <div class="about-grid">
      <div>
        <div class="about-label">About the studio</div>
      </div>
      <div class="about-text font-display" style="font-style: normal; font-weight: 400;">
        <p>I'm <em>Quyen Dang</em>, an indie developer based in the misty highlands of Đà Lạt, Vietnam.</p>
        <p>I build small, deliberate iOS apps — the kind that earn a permanent spot on your home screen. Every app here is crafted by one person, with care for detail and respect for your privacy.</p>
        <p style="font-size: 16px; font-family: 'Inter Tight', sans-serif; color: var(--ink-soft); margin-top: 32px;">
          For collaborations, feedback, or support requests, write to <a href="mailto:${config.developer.email}" style="color: var(--accent); border-bottom: 1px solid currentColor;">${config.developer.email}</a>
        </p>
      </div>
    </div>
  </section>
</main>

${buildFooter(apps)}
`;

  return buildPage({ head, body });
}
