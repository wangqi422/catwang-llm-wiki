#!/usr/bin/env node
/**
 * CODM 竞品日报卡片 — 一键生成入口（9:16 长图版）
 * 
 * Usage:
 *   node run-competitive.js                        # 处理最新竞品日报
 *   node run-competitive.js --date 20260416        # 处理指定日期
 *   node run-competitive.js <path-to-md>           # 处理指定 MD 文件
 * 
 * 流程：
 *   1. MD → 1080×1920 HTML 卡片（generate-competitive-card.js）
 *   2. HTML → PNG 截图（Puppeteer 1080×1920 固定裁切）
 *   3. 将产物复制到 docs/competitive-daily/
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const SCRIPT_DIR = __dirname;
const WIKI_ROOT = path.resolve(SCRIPT_DIR, '../../');
const OUTPUT_DIR = path.join(WIKI_ROOT, 'docs', 'competitive-daily');

console.log('╔══════════════════════════════════════════════╗');
console.log('║  🎯 CODM 竞品日报卡片 v2.1                 ║');
console.log('║  1080×1920 · 9:16 · Dark Ops + Data Extract ║');
console.log('╚══════════════════════════════════════════════╝\n');

const args = process.argv.slice(2).join(' ');

// Step 1: 生成 HTML
console.log('📝 Step 1/4: 从竞品日报 MD 生成 9:16 HTML 卡片...\n');
try {
  execSync(`node "${path.join(SCRIPT_DIR, 'generate-competitive-card.js')}" ${args}`, {
    stdio: 'inherit',
    cwd: SCRIPT_DIR,
  });
} catch (e) {
  console.error('❌ HTML 生成失败');
  process.exit(1);
}

// Step 1.5: 结构化数据提取 → JSON
console.log('\n📊 Step 1.5/4: 结构化数据提取 → JSON...\n');
try {
  execSync(`node "${path.join(SCRIPT_DIR, 'extract-competitive-data.js')}" ${args}`, {
    stdio: 'inherit',
    cwd: SCRIPT_DIR,
  });
} catch (e) {
  console.warn('⚠️  数据提取失败（非致命，继续流程）');
  console.warn(`   ${e.message}`);
}

// 查找生成的 HTML 文件
const htmlFiles = fs.readdirSync(OUTPUT_DIR)
  .filter(f => f.startsWith('competitive-daily-card-') && f.endsWith('.html'))
  .sort();

if (htmlFiles.length === 0) {
  console.error('❌ 未找到生成的 HTML 文件');
  process.exit(1);
}

const latestHtml = htmlFiles[htmlFiles.length - 1];
const htmlPath = path.join(OUTPUT_DIR, latestHtml);
const dateMatch = latestHtml.match(/(\d{8})/);
const dateStr = dateMatch ? dateMatch[1] : '';

// Step 2: 截图
console.log('\n📸 Step 2/4: Puppeteer 截图 → 1080px 宽度自适应高度 PNG...\n');
try {
  execSync(`node "${path.join(SCRIPT_DIR, 'screenshot-competitive.js')}" "${htmlPath}"`, {
    stdio: 'inherit',
    cwd: SCRIPT_DIR,
  });
} catch (e) {
  console.error('❌ 截图失败（确保已安装 puppeteer: npm i puppeteer）');
  console.log('   保留 HTML 文件供手动截图: ' + latestHtml);
  // 不退出，继续复制 HTML
}

// Step 3: 确认产物已在 docs/competitive-daily/
console.log('\n📂 Step 3/4: 确认产物在 docs/competitive-daily/...\n');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const pngPath = path.join(OUTPUT_DIR, latestHtml.replace('.html', '.png'));

console.log(`   ✅ ${latestHtml} 已在 docs/competitive-daily/`);

if (fs.existsSync(pngPath)) {
  console.log(`   ✅ ${latestHtml.replace('.html', '.png')} 已在 docs/competitive-daily/`);
}

// 复制 MD 源文件（如果存在）
const mdName = `CODM_Competitive_Daily_${dateStr}.md`;
const mdSrc = path.join(WIKI_ROOT, 'raw', 'daily-reports', mdName);
if (fs.existsSync(mdSrc)) {
  fs.copyFileSync(mdSrc, path.join(OUTPUT_DIR, mdName));
  console.log(`   ✅ ${mdName} → docs/competitive-daily/`);
}

// 保留 HTML 供 GitHub Pages 使用
console.log(`   ✅ ${latestHtml} 保留供 GitHub Pages 发布`);

console.log('\n🎉 全部完成！');
console.log(`   📁 卡片: docs/competitive-daily/competitive-daily-card-${dateStr}.png`);
console.log(`   📏 尺寸: 1080×1920 (9:16)`);

// Step 4: 汇总信息
const dataPath = path.join(OUTPUT_DIR, 'data', `competitive-${dateStr}.json`);
if (fs.existsSync(dataPath)) {
  const dataSize = (fs.statSync(dataPath).size / 1024).toFixed(1);
  console.log(`   📊 数据: docs/competitive-daily/data/competitive-${dateStr}.json (${dataSize} KB)`);
}
const indexPath = path.join(OUTPUT_DIR, 'data', 'competitive-index.json');
if (fs.existsSync(indexPath)) {
  try {
    const index = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
    console.log(`   📋 索引: ${index.length} 份日报已归档`);
  } catch (e) { /* ignore */ }
}
