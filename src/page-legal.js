// page-legal.js - Templates cho privacy & support pages
import { config } from './config.js';
import { buildPage, buildHead, buildHeader, buildFooter, escapeHtml } from './templates.js';

const legalCss = `
/* ============ LEGAL PAGES (Privacy & Support) ============ */
.legal-hero {
  padding: 80px 0 40px;
  border-bottom: 1px solid var(--line);
}

.legal-eyebrow {
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-faint);
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.legal-eyebrow::before {
  content: '';
  width: 24px;
  height: 1px;
  background: var(--ink);
}

.legal-hero-title {
  font-size: clamp(40px, 7vw, 88px);
  margin-bottom: 24px;
  letter-spacing: -0.02em;
  line-height: 0.95;
}

.legal-meta {
  display: flex;
  gap: 32px;
  font-size: 13px;
  color: var(--ink-soft);
  flex-wrap: wrap;
  font-family: 'JetBrains Mono', monospace;
}

.legal-meta-item span:first-child {
  color: var(--ink-faint);
  margin-right: 8px;
}

.legal-content {
  padding: 60px 0 0;
  max-width: 760px;
  margin: 0 auto;
}

.legal-section-block {
  margin-bottom: 56px;
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 24px;
}

@media (max-width: 640px) {
  .legal-section-block { grid-template-columns: 1fr; gap: 12px; }
}

.legal-section-num {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--ink-faint);
  letter-spacing: 0.06em;
  padding-top: 8px;
}

.legal-section-content h2 {
  font-family: 'Fraunces', serif;
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 16px;
  letter-spacing: -0.01em;
}

.legal-section-content p {
  font-size: 16px;
  line-height: 1.7;
  color: var(--ink-soft);
  margin-bottom: 16px;
  white-space: pre-wrap;
}

.legal-list {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: var(--line-soft);
  border: 1px solid var(--line-soft);
}

.legal-list-item {
  background: var(--bg);
  padding: 24px;
}

.legal-list-item h3 {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.legal-list-item h3::before {
  content: '';
  width: 6px;
  height: 6px;
  background: var(--accent);
  border-radius: 50%;
}

.legal-list-item p {
  font-size: 14px;
  margin: 0;
  color: var(--ink-soft);
}

/* ============ FAQ ============ */
.faq-list {
  margin-top: 24px;
  border-top: 1px solid var(--line);
}

.faq-item {
  border-bottom: 1px solid var(--line-soft);
  padding: 24px 0;
}

.faq-question {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 12px;
  cursor: pointer;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.faq-question::-webkit-details-marker { display: none; }

.faq-question::after {
  content: '+';
  font-size: 24px;
  color: var(--accent);
  font-weight: 300;
  transition: transform 0.3s;
}

details[open] .faq-question::after { transform: rotate(45deg); }

.faq-answer {
  font-size: 15px;
  line-height: 1.7;
  color: var(--ink-soft);
  margin-top: 8px;
}

/* ============ CONTACT BOX ============ */
.contact-box {
  margin-top: 32px;
  padding: 32px;
  background: var(--ink);
  color: var(--bg);
  border-radius: 4px;
}

.contact-box h3 {
  font-family: 'Fraunces', serif;
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 8px;
}

.contact-box p {
  color: rgba(255,255,255,0.7);
  margin-bottom: 16px;
}

.contact-email {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--accent);
  color: var(--ink);
  padding: 12px 20px;
  border-radius: 100px;
  font-weight: 600;
  font-size: 14px;
  transition: transform 0.2s;
}

.contact-email:hover { transform: translateY(-2px); }

.contact-tip {
  margin-top: 16px;
  font-size: 13px;
  color: rgba(255,255,255,0.5);
  font-style: italic;
}

/* Back to app link */
.back-to-app {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  font-size: 14px;
  color: var(--ink-soft);
  margin-bottom: 32px;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s, color 0.2s;
}

.back-to-app:hover { color: var(--accent); border-color: currentColor; }

.back-to-app img {
  width: 32px;
  height: 32px;
  border-radius: 8px;
}
`;

/**
 * Build privacy policy page
 */
export function buildPrivacyPage(privacyContent, app, allApps) {
  const head = buildHead({
    title: privacyContent.title,
    description: `Privacy Policy for ${app.name}. We are committed to protecting your privacy.`,
    url: `${config.deployment.baseUrl}/apps/${app.slug}/privacy/`,
  }) + `<style>${legalCss}</style>`;

  const body = `
${buildHeader()}

<main>
  <section class="container legal-hero">
    ${app ? `
      <a href="/apps/${app.slug}/" class="back-to-app">
        <img src="${app.icon}" alt="">
        <span>← Back to ${escapeHtml(app.name)}</span>
      </a>
    ` : ''}
    <div class="legal-eyebrow">Privacy Policy</div>
    <h1 class="legal-hero-title font-display">Your privacy,<br><em style="color: var(--accent);">protected.</em></h1>
    <div class="legal-meta">
      <div class="legal-meta-item"><span>App:</span>${escapeHtml(privacyContent.appName)}</div>
      <div class="legal-meta-item"><span>Last updated:</span>${escapeHtml(privacyContent.lastUpdated)}</div>
      <div class="legal-meta-item"><span>Version:</span>1.0</div>
    </div>
  </section>

  <section class="container legal-content">
    ${privacyContent.sections.map((section, i) => `
      <div class="legal-section-block">
        <div class="legal-section-num">§ ${String(i + 1).padStart(2, '0')}</div>
        <div class="legal-section-content">
          <h2>${escapeHtml(section.heading)}</h2>
          <p>${escapeHtml(section.body)}</p>
          ${section.items ? `
            <div class="legal-list">
              ${section.items.map(item => `
                <div class="legal-list-item">
                  <h3>${escapeHtml(item.title)}</h3>
                  <p>${escapeHtml(item.desc)}</p>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    `).join('')}
  </section>
</main>

${buildFooter(allApps)}
`;

  return buildPage({ head, body });
}

/**
 * Build support page
 */
export function buildSupportPage(supportContent, app, allApps) {
  const head = buildHead({
    title: supportContent.title,
    description: `Get help and support for ${app.name}. FAQ, troubleshooting, and contact information.`,
    url: `${config.deployment.baseUrl}/apps/${app.slug}/support/`,
  }) + `<style>${legalCss}</style>`;

  const body = `
${buildHeader()}

<main>
  <section class="container legal-hero">
    ${app ? `
      <a href="/apps/${app.slug}/" class="back-to-app">
        <img src="${app.icon}" alt="">
        <span>← Back to ${escapeHtml(app.name)}</span>
      </a>
    ` : ''}
    <div class="legal-eyebrow">Support Center</div>
    <h1 class="legal-hero-title font-display">We're here<br>to <em style="color: var(--accent);">help.</em></h1>
    <div class="legal-meta">
      <div class="legal-meta-item"><span>App:</span>${escapeHtml(supportContent.appName)}</div>
      <div class="legal-meta-item"><span>Response time:</span>1-2 business days</div>
    </div>
  </section>

  <section class="container legal-content">
    ${supportContent.sections.map((section, i) => `
      <div class="legal-section-block">
        <div class="legal-section-num">§ ${String(i + 1).padStart(2, '0')}</div>
        <div class="legal-section-content">
          <h2>${escapeHtml(section.heading)}</h2>
          ${section.body ? `<p>${escapeHtml(section.body)}</p>` : ''}
          
          ${section.faqs ? `
            <div class="faq-list">
              ${section.faqs.map(faq => `
                <details class="faq-item">
                  <summary class="faq-question">${escapeHtml(faq.q)}</summary>
                  <div class="faq-answer">${escapeHtml(faq.a)}</div>
                </details>
              `).join('')}
            </div>
          ` : ''}
          
          ${section.contact ? `
            <div class="contact-box">
              <h3>Email Support</h3>
              <p>Send us a message and we'll get back to you as soon as possible.</p>
              <a href="mailto:${section.contact.email}?subject=${encodeURIComponent(section.contact.subject)}" class="contact-email">
                ${section.contact.email} →
              </a>
              <p class="contact-tip">${escapeHtml(section.contact.tip)}</p>
            </div>
          ` : ''}
        </div>
      </div>
    `).join('')}
  </section>
</main>

${buildFooter(allApps)}
`;

  return buildPage({ head, body });
}
