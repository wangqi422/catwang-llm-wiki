/**
 * AIGC 日报 → 企业微信群推送
 * 
 * 精简推送：从 AIGC 日报 MD 提取 TOP 条目生成 Markdown 摘要 + PNG 卡片
 * 
 * 使用方式：
 *   node push-ai-daily.js                          # 推送最新日报
 *   node push-ai-daily.js --date 20260430          # 推送指定日期
 *   node push-ai-daily.js --dry-run               # 预览推送内容
 * 
 * 推送内容：
 *   1. Markdown 文字摘要（≤4096 字节）
 *   2. PNG 卡片图片（1080×1920，≤2MB）
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');

// ── 配置 ──────────────────────────────────────────
const WIKI_ROOT = path.resolve(__dirname, '..', '..');
const configPath = path.join(__dirname, 'config.json');

let configWebhook = '';
let configWebhooks = [];
let configGitPages = 'https://wangqi422.github.io/catwang-llm-wiki';

try {
  if (fs.existsSync(configPath)) {
    const cfg = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    configWebhook = cfg.webhook || '';
    if (Array.isArray(cfg.webhooks) && cfg.webhooks.length > 0) {
      configWebhooks = cfg.webhooks.filter(w => w.url);
    }
    if (cfg.githubPagesBase) configGitPages = cfg.githubPagesBase;
  }
} catch (e) { /* ignore */ }

const DEFAULT_WEBHOOK = process.env.WECOM_WEBHOOK || configWebhook;
const GITHUB_PAGES_BASE = process.env.GITHUB_PAGES_BASE || configGitPages;

// ── 路径解析 ──────────────────────────────────────
function collectReportDates(dirPath) {
  if (!fs.existsSync(dirPath)) return [];
  return fs.readdirSync(dirPath)
    .map(fileName => fileName.match(/^AIGC_Daily_Report_(\d{8})\.md$/))
    .filter(Boolean)
    .map(match => match[1]);
}

function resolveLatestReportDate() {
  const rawDir = path.join(WIKI_ROOT, 'raw', 'daily-reports');
  const dates = collectReportDates(rawDir);
  const latestDate = dates.sort().reverse()[0];
  if (latestDate) return latestDate;
  
  const today = new Date();
  return `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
}

function resolveMdPath(dateStr) {
  const mdPath = path.join(WIKI_ROOT, 'raw', 'daily-reports', `AIGC_Daily_Report_${dateStr}.md`);
  return fs.existsSync(mdPath) ? mdPath : null;
}

// ── 参数解析 ──────────────────────────────────────
function parseArgs() {
  const args = process.argv.slice(2);
  const config = { date: null, webhook: DEFAULT_WEBHOOK, dryRun: false };
  
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--date' && args[i + 1]) {
      config.date = args[i + 1].replace(/-/g, '');
      i++;
    } else if (args[i] === '--webhook' && args[i + 1]) {
      config.webhook = args[i + 1];
      i++;
    } else if (args[i] === '--dry-run') {
      config.dryRun = true;
    }
  }
  
  if (!config.date) {
    config.date = resolveLatestReportDate();
  }
  
  return config;
}

// ── 从 MD 提取精简推送摘要 ────────────────────────
function extractPushMarkdown(mdContent, dateStr) {
  const lines = [];
  const mdLines = mdContent.split('\n');
  
  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const day = dateStr.slice(6, 8);
  
  // 提取 TOP 1 标题作为 hook
  let hookTitle = '';
  const tableStart = mdLines.findIndex(l => l.match(/^\|.*新闻标题/));
  if (tableStart >= 0) {
    for (let i = tableStart + 1; i < mdLines.length; i++) {
      const line = mdLines[i];
      if (!line.startsWith('|') || line.includes('---')) continue;
      const cells = line.split('|').filter(c => c.trim());
      if (cells.length >= 2) {
        const titleCell = cells[1].trim();
        const titleMatch = titleCell.match(/\[(.+?)\]/);
        hookTitle = titleMatch ? titleMatch[1] : titleCell;
        break;
      }
    }
  }
  
  // 如果没从表格拿到，尝试从 ### #1 ⭐ 提取
  if (!hookTitle) {
    const h3Match = mdLines.find(l => l.match(/^### #1 ⭐/));
    if (h3Match) hookTitle = h3Match.replace(/^### #1 ⭐\s*/, '').trim();
  }
  
  const hook = hookTitle ? `🔥 ${hookTitle}` : `📰 今日 AI 圈 8 条重磅`;
  
  lines.push(`**AIGC 日报 · ${year}.${month}.${day}**`);
  lines.push('');
  lines.push(hook);
  lines.push('');
  const pageUrl = `${GITHUB_PAGES_BASE}/docs/ai-daily/ai-daily-card-${dateStr}-toc.html`;
  lines.push(`👉 [查看完整日报](${pageUrl})`);
  
  let markdown = lines.join('\n');
  
  // 字节限制检查
  const mdBytes = Buffer.byteLength(markdown, 'utf-8');
  if (mdBytes > 4096) {
    console.warn(`⚠️  Markdown ${mdBytes} 字节超过 4096 限制，将截断`);
    markdown = markdown.slice(0, 4093) + '...';
  }
  
  return markdown;
}

// ── 发送 Markdown ──────────────────────────────────
function sendMarkdown(webhookUrl, markdown) {
  return sendToWecom(webhookUrl, {
    msgtype: 'markdown',
    markdown: { content: markdown }
  });
}

// ── 发送图片 ──────────────────────────────────────
function sendImage(webhookUrl, imagePath) {
  const imageData = fs.readFileSync(imagePath);
  
  if (imageData.length > 2 * 1024 * 1024) {
    throw new Error(`图片 ${(imageData.length / 1024 / 1024).toFixed(1)}MB 超过 2MB 限制`);
  }
  
  const base64 = imageData.toString('base64');
  const md5 = crypto.createHash('md5').update(imageData).digest('hex');
  
  return sendToWecom(webhookUrl, {
    msgtype: 'image',
    image: { base64, md5 }
  });
}

// ── 通用发送 ──────────────────────────────────────
function sendToWecom(webhookUrl, payload) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const url = new URL(webhookUrl);
    
    const options = {
      hostname: url.hostname,
      port: url.port || 443,
      path: url.pathname + url.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };
    
    const client = url.protocol === 'https:' ? https : http;
    
    const req = client.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(body);
          if (result.errcode === 0) {
            resolve(result);
          } else {
            reject(new Error(`企微返回错误: ${result.errmsg} (errcode: ${result.errcode})`));
          }
        } catch (e) {
          reject(new Error(`解析响应失败: ${body}`));
        }
      });
    });
    
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// ── Git Push ──────────────────────────────────────
function gitPush(dateStr) {
  const docsDir = 'docs/ai-daily';
  try {
    execSync(`git add "${docsDir}/"`, { cwd: WIKI_ROOT, stdio: 'pipe' });
    
    const status = execSync(`git status --porcelain "${docsDir}/"`, { cwd: WIKI_ROOT, encoding: 'utf-8' });
    if (!status.trim()) {
      console.log(`   ℹ️  无新文件需要提交`);
      return true;
    }
    
    execSync(`git commit -m "daily: AIGC daily card ${dateStr}"`, { cwd: WIKI_ROOT, stdio: 'pipe' });
    execSync(`git push origin main`, { cwd: WIKI_ROOT, stdio: 'pipe' });
    console.log(`   ✅ 已推送到 GitHub`);
    return true;
  } catch (err) {
    console.warn(`   ⚠️  Git push 失败: ${err.message}`);
    return false;
  }
}

// ── 主流程 ───────────────────────────────────────
async function main() {
  const config = parseArgs();
  const dateFmt = `${config.date.slice(0, 4)}.${config.date.slice(4, 6)}.${config.date.slice(6, 8)}`;
  
  console.log(`\n📰 AIGC 日报推送`);
  console.log('─'.repeat(50));
  console.log(`📅 日期: ${dateFmt}`);
  console.log(`🔧 模式: ${config.dryRun ? 'Dry Run（仅预览）' : '正式推送'}`);
  
  // 1. 定位 MD 源文件
  const mdPath = resolveMdPath(config.date);
  if (!mdPath) {
    console.error(`\n❌ 找不到日报 MD: AIGC_Daily_Report_${config.date}.md`);
    process.exit(1);
  }
  console.log(`📄 MD: ${path.relative(WIKI_ROOT, mdPath).replace(/\\/g, '/')}`);
  
  // 2. 定位 PNG 卡片
  const pngPath = path.join(WIKI_ROOT, 'docs', 'ai-daily', `ai-daily-card-${config.date}.png`);
  const hasPng = fs.existsSync(pngPath);
  
  if (hasPng) {
    const pngSize = fs.statSync(pngPath).size;
    console.log(`📸 PNG: ai-daily-card-${config.date}.png (${(pngSize / 1024).toFixed(0)} KB)`);
    if (pngSize > 2 * 1024 * 1024) {
      console.error(`❌ 图片 ${(pngSize / 1024 / 1024).toFixed(1)}MB 超过 2MB 限制！`);
    }
  } else {
    console.warn(`⚠️  未找到 PNG 卡片`);
  }
  
  // 3. 从 MD 提取精简推送摘要
  const mdContent = fs.readFileSync(mdPath, 'utf-8');
  const markdown = extractPushMarkdown(mdContent, config.date);
  
  console.log('\n📝 推送文字预览：');
  console.log('═'.repeat(50));
  console.log(markdown);
  console.log('═'.repeat(50));
  console.log(`📏 字节数: ${Buffer.byteLength(markdown, 'utf-8')} / 4096`);
  
  // 4. Dry Run 模式
  if (config.dryRun) {
    console.log('\n🧪 Dry Run 完成！');
    return;
  }
  
  // 5. 检查 Webhook
  const webhookList = [];
  if (config.webhook && config.webhook !== DEFAULT_WEBHOOK) {
    webhookList.push({ name: '命令行指定', url: config.webhook });
  } else if (configWebhooks.length > 0) {
    webhookList.push(...configWebhooks);
  } else if (config.webhook && !config.webhook.includes('YOUR_KEY_HERE')) {
    webhookList.push({ name: '默认群', url: config.webhook });
  }

  if (webhookList.length === 0) {
    console.error('\n❌ 未配置有效的 Webhook 地址！');
    process.exit(1);
  }
  
  // 6. Git push
  console.log(`\n📤 上传到 GitHub...`);
  gitPush(config.date);
  
  // 7. 正式推送（只推送到第一个群）
  const targetWebhook = webhookList[0];
  console.log(`\n🚀 推送到「${targetWebhook.name}」...`);
  
  try {
    console.log(`   📝 发送文字摘要...`);
    await sendMarkdown(targetWebhook.url, markdown);
    console.log(`   ✅ 文字摘要发送成功`);
    
    if (hasPng) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`   📸 发送 PNG 卡片...`);
      await sendImage(targetWebhook.url, pngPath);
      console.log(`   ✅ PNG 卡片发送成功`);
    }
  } catch (err) {
    console.error(`   ❌ 推送失败: ${err.message}`);
    process.exit(1);
  }
  
  console.log(`\n🎉 AIGC 日报推送完成！`);
}

main();