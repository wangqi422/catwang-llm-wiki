/**
 * AI 干货周报长图截图脚本（参数化版本）
 *
 * 用法：
 *   node screenshot-weekly.js --date 20260419
 *   node screenshot-weekly.js --html docs/ai-daily/ai-weekly-card-20260419.html
 *
 * 默认：
 *   - 读取 docs/ai-daily/ai-weekly-card-<DATE>.html（优先无后缀，兼容旧 -v2）
 *   - 输出 docs/ai-daily/ai-weekly-card-<DATE>.png
 *   - 视口 1080，设备像素比 2x（高清）
 *   - 自动检测页面高度 → 截取完整长图
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

function parseArgs() {
  const args = process.argv.slice(2);
  const cfg = { date: null, html: null, width: 1080, dpr: 2 };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--date' && args[i + 1]) { cfg.date = args[++i].replace(/-/g, ''); }
    else if (args[i] === '--html' && args[i + 1]) { cfg.html = args[++i]; }
    else if (args[i] === '--width' && args[i + 1]) { cfg.width = parseInt(args[++i], 10); }
    else if (args[i] === '--dpr' && args[i + 1]) { cfg.dpr = parseFloat(args[++i]); }
  }
  if (!cfg.date && !cfg.html) {
    // 默认：上周日（今天是周一 → 上周日 = 昨天；其他情况取最近周日）
    const today = new Date();
    const dow = today.getDay(); // 0=Sun..6=Sat
    const daysBack = dow === 0 ? 0 : dow;
    const sun = new Date(today.getTime() - daysBack * 86400000);
    const y = sun.getFullYear();
    const m = String(sun.getMonth() + 1).padStart(2, '0');
    const d = String(sun.getDate()).padStart(2, '0');
    cfg.date = `${y}${m}${d}`;
  }
  return cfg;
}

(async () => {
  const cfg = parseArgs();
  const WIKI_ROOT = path.resolve(__dirname, '..', '..');

  let htmlPath;
  let outPath;
  if (cfg.html) {
    htmlPath = path.isAbsolute(cfg.html) ? cfg.html : path.join(WIKI_ROOT, cfg.html);
    outPath = htmlPath.replace(/\.html$/i, '.png');
  } else {
    // 优先无后缀（v2 = 唯一正确版式），兼容旧 -v2 文件
    const noSuffix = path.join(WIKI_ROOT, 'docs', 'ai-daily', `ai-weekly-card-${cfg.date}.html`);
    const v2Suffix = path.join(WIKI_ROOT, 'docs', 'ai-daily', `ai-weekly-card-${cfg.date}-v2.html`);
    htmlPath = fs.existsSync(noSuffix) ? noSuffix : (fs.existsSync(v2Suffix) ? v2Suffix : noSuffix);
    outPath = htmlPath.replace(/\.html$/i, '.png');
  }

  if (!fs.existsSync(htmlPath)) {
    console.error(`❌ 未找到 HTML 文件: ${htmlPath}`);
    process.exit(1);
  }

  console.log(`📄 HTML: ${path.relative(WIKI_ROOT, htmlPath)}`);
  console.log(`🖼️  PNG : ${path.relative(WIKI_ROOT, outPath)}`);
  console.log(`📐 视口: ${cfg.width} × auto @ ${cfg.dpr}x`);

  const browser = await puppeteer.launch({ headless: 'new' });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: cfg.width, height: 800, deviceScaleFactor: cfg.dpr });
    const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/') + '?v=' + Date.now();
    await page.goto(fileUrl, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 500));
    const height = await page.evaluate(() => document.body.scrollHeight);
    console.log(`📏 页面高度: ${height}px → 输出 ${cfg.width} × ${height} @ ${cfg.dpr}x`);
    await page.setViewport({ width: cfg.width, height, deviceScaleFactor: cfg.dpr });
    await page.screenshot({ path: outPath, fullPage: true });
    const size = fs.statSync(outPath).size;
    console.log(`✅ 截图完成: ${(size / 1024 / 1024).toFixed(2)} MB`);
    if (size > 2 * 1024 * 1024) {
      console.warn(`⚠️  图片 > 2MB，可能超过企微推送限制（企微图片上限 2MB base64 前原始大小）`);
    }
  } finally {
    await browser.close();
  }
})();
