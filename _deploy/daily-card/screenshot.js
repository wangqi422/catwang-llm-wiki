#!/usr/bin/env node
/**
 * AI Daily Card Screenshot
 * 将生成的 HTML 卡片截图为 1080×1920 PNG
 * 
 * Usage:
 *   node screenshot.js                      # 截图所有 _manifest.json 中的卡片
 *   node screenshot.js <html-file>          # 截图指定 HTML 文件
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.resolve(__dirname, '../../docs/ai-daily');

async function screenshotHTML(htmlPath, pngPath) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--force-device-scale-factor=1'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
    
    const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
    await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });
    
    // 等待字体加载
    await new Promise(r => setTimeout(r, 2000));
    
    await page.screenshot({
      path: pngPath,
      type: 'png',
      clip: { x: 0, y: 0, width: 1080, height: 1920 },
    });

    const stats = fs.statSync(pngPath);
    console.log(`📸 ${path.basename(pngPath)} (${(stats.size / 1024).toFixed(0)} KB)`);
  } finally {
    await browser.close();
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length > 0 && !args[0].startsWith('--')) {
    // 截图指定文件
    const htmlPath = path.resolve(args[0]);
    const pngPath = htmlPath.replace('.html', '.png');
    await screenshotHTML(htmlPath, pngPath);
  } else {
    // 从 manifest 读取所有需要截图的文件
    const manifestPath = path.join(OUTPUT_DIR, '_manifest.json');
    if (!fs.existsSync(manifestPath)) {
      console.error('❌ _manifest.json 不存在，请先运行 generate-card.js');
      process.exit(1);
    }
    
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    console.log(`📋 准备截图 ${manifest.length} 个卡片...\n`);
    
    for (const item of manifest) {
      if (fs.existsSync(item.htmlPath)) {
        await screenshotHTML(item.htmlPath, item.pngPath);
      } else {
        console.warn(`⚠️ 跳过: ${item.htmlPath} 不存在`);
      }
    }
    
    console.log(`\n✅ 全部完成！输出目录: ${OUTPUT_DIR}`);
  }
}

main().catch(err => {
  console.error('❌ 截图失败:', err.message);
  process.exit(1);
});
