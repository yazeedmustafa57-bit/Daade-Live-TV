const { chromium } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.screenshot({ path: '/root/daade-live-tv/screenshot.png', fullPage: true });
  const title = await page.title();
  const headings = await page.$$eval('h1, h2, h3', els => els.map(e => e.tagName + ': ' + e.textContent.trim()));
  const sections = await page.$$eval('section', els => els.length);
  console.log(JSON.stringify({ title, headings, sections }, null, 2));
  await browser.close();
})();
