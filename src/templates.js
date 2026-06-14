// templates.js - Templates HTML/CSS dùng chung
import { config } from './config.js';

const { brand, developer } = config;

/**
 * CSS chung cho toàn site - phong cách editorial / refined
 */
export const baseCss = `
:root {
  --bg: ${brand.bgColor};
  --ink: ${brand.textColor};
  --ink-soft: #4A4A47;
  --ink-faint: #6E6E6A;
  --accent: ${brand.accentColor};
  --accent-dim: rgba(255,90,31,0.10);
  --paper: #ffffff;
  --line: ${brand.textColor};
  --line-soft: rgba(15,15,13,0.10);
  --line-faint: rgba(15,15,13,0.06);
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.06);
  --shadow-md: 0 8px 24px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04);
  --shadow-lg: 0 20px 60px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06);
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-pill: 100px;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--ink);
  font-family: 'Söhne', 'Inter Tight', system-ui, -apple-system, sans-serif;
  font-size: 16px;
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

@font-face {
  font-family: 'Editorial';
  src: local('PP Editorial Old'), local('Times New Roman');
  font-display: swap;
}

.font-display {
  font-family: 'Fraunces', 'Playfair Display', 'PP Editorial Old', Georgia, serif;
  font-weight: 400;
  font-style: italic;
  letter-spacing: -0.02em;
  line-height: 0.95;
}

.font-mono {
  font-family: 'JetBrains Mono', ui-monospace, 'SF Mono', Consolas, monospace;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 32px;
}

@media (max-width: 768px) {
  .container { padding: 0 20px; }
}

a { color: inherit; text-decoration: none; }

/* ============ HEADER ============ */
.site-header {
  border-bottom: 1px solid var(--line-soft);
  background: rgba(250,250,247,0.88);
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: box-shadow 0.3s;
}

.site-header.scrolled {
  box-shadow: var(--shadow-sm);
}

.site-header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 0;
}

.brand {
  display: flex;
  align-items: baseline;
  gap: 10px;
  font-size: 14px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-weight: 500;
}

.brand-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: var(--ink);
  color: var(--bg);
  border-radius: 50%;
  font-size: 14px;
  transform: translateY(2px);
}

.brand-name { font-weight: 600; }
.brand-divider { color: var(--ink-faint); }
.brand-tag { color: var(--ink-soft); font-weight: 400; }

.nav {
  display: flex;
  gap: 32px;
  font-size: 14px;
}

.nav a {
  color: var(--ink-soft);
  transition: color 0.2s;
  position: relative;
}

.nav a:hover { color: var(--ink); text-decoration: underline; text-underline-offset: 3px; }

@media (max-width: 640px) {
  .nav { display: none; }
}

/* ============ FOOTER ============ */
.site-footer {
  border-top: 2px solid var(--line);
  margin-top: 120px;
  padding: 60px 0 40px;
  font-size: 13px;
  color: var(--ink-soft);
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 60px;
  margin-bottom: 40px;
}

@media (max-width: 768px) {
  .footer-grid { grid-template-columns: 1fr; gap: 32px; }
}

.footer-col h4 {
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-faint);
  margin-bottom: 20px;
  font-weight: 600;
}

.footer-col a {
  display: block;
  padding: 4px 0;
  color: var(--ink-soft);
  transition: color 0.2s;
}

.footer-col a:hover { color: var(--ink); }

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  border-top: 1px solid var(--line-soft);
  font-size: 12px;
  color: var(--ink-faint);
  letter-spacing: 0.02em;
}

@media (max-width: 640px) {
  .footer-bottom { flex-direction: column; gap: 12px; text-align: center; }
}

/* ============ ANIMATIONS ============ */
@keyframes rise {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.rise { animation: rise 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) backwards; }
.fade { animation: fadeIn 1s ease-out backwards; }

/* ============ LINK ANIMATED ============ */
.link-animated {
  position: relative;
}
.link-animated::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 0;
  height: 1px;
  background: currentColor;
  transition: width 0.25s ease;
}
.link-animated:hover::after { width: 100%; }

/* ============ FOCUS ============ */
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 2px;
}

/* ============ REDUCED MOTION ============ */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* ============ SMALL MOBILE ============ */
@media (max-width: 480px) {
  .container { padding: 0 16px; }
}
`;

/**
 * HTML <head> chuẩn cho SEO
 */
export function buildHead({ title, description, image, url, type = 'website' }) {
  return `
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">

<!-- Open Graph -->
<meta property="og:type" content="${type}">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
${image ? `<meta property="og:image" content="${image}">` : ''}
${url ? `<meta property="og:url" content="${url}">` : ''}

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(title)}">
<meta name="twitter:description" content="${escapeHtml(description)}">
${image ? `<meta name="twitter:image" content="${image}">` : ''}

<!-- Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400;1,9..144,500&family=Inter+Tight:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

<!-- Favicon -->
<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${encodeURIComponent(brand.logo)}</text></svg>">

<style>${baseCss}</style>`;
}

/**
 * Header chung
 */
export function buildHeader(currentPath = '/') {
  return `
<header class="site-header">
  <div class="container site-header-inner">
    <a href="/" class="brand">
      <span class="brand-mark">${brand.logo}</span>
      <span class="brand-name">${escapeHtml(developer.name)}</span>
      <span class="brand-divider">·</span>
      <span class="brand-tag">Independent iOS Developer</span>
    </a>
    <nav class="nav">
      <a href="/">Apps</a>
      <a href="/#about">About</a>
      <a href="mailto:${developer.email}">Contact</a>
    </nav>
  </div>
</header>
<script>window.addEventListener('scroll',()=>{document.querySelector('.site-header')?.classList.toggle('scrolled',scrollY>20)},{passive:true});</script>`;
}

/**
 * Footer chung
 */
export function buildFooter(apps = []) {
  const year = new Date().getFullYear();
  const recentApps = apps.slice(0, 6);
  
  return `
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-col">
        <h4>About</h4>
        <p style="color: var(--ink-soft); line-height: 1.6; max-width: 400px;">
          ${escapeHtml(developer.tagline)}. Independent iOS developer based in Vietnam, building tools for focused work and everyday life.
        </p>
        <p style="margin-top: 16px;">
          <a href="mailto:${developer.email}" class="link-animated" style="color: var(--ink-soft); padding-bottom: 1px;">${developer.email}</a>
        </p>
      </div>
      <div class="footer-col">
        <h4>Apps</h4>
        ${recentApps.map(a => `<a href="/apps/${a.slug}/">${escapeHtml(a.name)}</a>`).join('')}
      </div>
      <div class="footer-col">
        <h4>Legal</h4>
        <a href="/privacy/">General Privacy Policy</a>
        <a href="/support/">General Support</a>
        <a href="https://apps.apple.com/us/developer/quyen-dang/id${developer.id}" target="_blank" rel="noopener">App Store Profile ↗</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© ${year} ${escapeHtml(developer.name)}. All rights reserved.</span>
      <span class="font-mono">Built with care · Updated daily</span>
    </div>
  </div>
</footer>`;
}

/**
 * Escape HTML để tránh XSS khi render data từ App Store
 */
export function escapeHtml(text) {
  if (text == null) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Wrapper cho mọi page
 */
export function buildPage({ head, body }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>${head}</head>
<body>${body}</body>
</html>`;
}
