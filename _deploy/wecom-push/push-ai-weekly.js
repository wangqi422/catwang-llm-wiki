/**
 * AI 干货周报 → 企业微信群推送
 * 
 * 精简推送：从 AI 干货周报 MD 提取摘要生成 Markdown
 * 
 * 使用方式：
 *   node push-ai-weekly.js                          # 推送最新周报
 *   node push-ai-weekly.js --date 20260601          # 推送指定日期（周日日期）
 *   node push-ai-weekly.js --dry-run               # 预览推送内容
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// ── 配置 ──────────────────────────────────────────
const WIKI_ROOT = path.resolve(__dirname, '..', '..');
const { resolveWebhooks } = require('./resolve-webhooks');

// 凭据解析：ENV → config.local.json → config.json（占位符会被忽略）
const _resolved = resolveWebhooks(__dirname);
const configWebhook = _resolved.webhook;
const configWebhooks = _resolved.webhooks;
const configGitPages = _resolved.githubPagesBase;

const DEFAULT_WEBHOOK = process.env.WECOM_WEBHOOK || configWebhook;
const GITHUB_PAGES_BASE = process.env.GITHUB_PAGES_BASE || configGitPages;

// ── 路径解析 ──────────────────────────────────────
function collectWeeklyDates(dirPath) {
  if (!fs.existsSync(dirPath)) return [];
  return fs.readdirSync(dirPath)
    .map(fileName => fileName.match(/^AI_Practical_Weekly_Report_(\d{8})\.md$/))
    .filter(Boolean)
    .map(match => match[1]);
}

function resolveLatestWeeklyDate() {
  const rawDir = path.join(WIKI_ROOT, 'raw', 'daily-reports');
  const dates = collectWeeklyDates(rawDir);
  const latestDate = dates.sort().reverse()[0];
  if (latestDate) return latestDate;
  
  const today = new Date();
  return `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
}

function resolveMdPath(dateStr) {
  const mdPath = path.join(WIKI_ROOT, 'raw', 'daily-reports', `AI_Practical_Weekly_Report_${dateStr}.md`);
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
    config.date = resolveLatestWeeklyDate();
  }
  
  return config;
}

// ── 从周报 MD 提取推送摘要（极简版 · 对齐 daily 推送格式） ────────────────────────
// 2026-06-01 改版：一行 hook + 一个查看完整周报链接
function extractWeeklyMarkdown(mdContent, dateStr) {
  const mdLines = mdContent.split('\n');

  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const day = dateStr.slice(6, 8);

  // 提取本周主题（优先级：「主题」>「本期先说结论」段落 > TOP 1 ### 标题）
  let hookText = '';

  // 1. 任意行里的「XXX」括号内容（一般周报开头会有「Agent 工程化爆发周」这种）
  for (const line of mdLines.slice(0, 30)) {
    const m = line.match(/「(.+?)」/);
    if (m && m[1].length >= 3 && m[1].length <= 30) {
      hookText = m[1];
      break;
    }
  }

  // 2. fallback：首个 ### 1. 标题
  if (!hookText) {
    const h3 = mdLines.find(l => /^###\s+\d+\.\s*/.test(l));
    if (h3) {
      hookText = h3.replace(/^###\s+\d+\.\s*/, '').replace(/\*\*/g, '').split('——')[0].trim();
    }
  }

  // 3. 兜底
  if (!hookText) {
    hookText = '本周 AI 干货精选';
  }

  const hook = `🔥 ${hookText}`;
  const pageUrl = `${GITHUB_PAGES_BASE}/docs/ai-daily/ai-weekly-card-${dateStr}-toc.html`;

  const lines = [];
  lines.push(`**AI 干货周报 · ${year}.${month}.${day}**`);
  lines.push('');
  lines.push(hook);
  lines.push('');
  lines.push(`👉 [查看完整周报](${pageUrl})`);

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
  return new Promise((resolve, reject) => {
    const url = new URL(webhookUrl);
    const data = JSON.stringify({
      msgtype: 'markdown',
      markdown: { content: markdown }
    });
    
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
    
    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => responseData += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(responseData);
          if (result.errcode === 0) {
            resolve({ success: true, result });
          } else {
            reject(new Error(`WeCom API error: ${result.errmsg} (code: ${result.errcode})`));
          }
        } catch (e) {
          reject(new Error(`Parse response failed: ${e.message}`));
        }
      });
    });
    
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// ── 主流程 ─────────────────────────────────────────
async function main() {
  const config = parseArgs();
  
  console.log(`📰 AI 干货周报推送`);
  console.log(`   日期: ${config.date}`);
  console.log(`   模式: ${config.dryRun ? '预览' : '正式推送'}`);
  console.log('');
  
  // 检查 MD 文件
  const mdPath = resolveMdPath(config.date);
  if (!mdPath) {
    console.error(`❌ 找不到周报文件: raw/daily-reports/AI_Practical_Weekly_Report_${config.date}.md`);
    process.exit(1);
  }
  
  console.log(`✅ 找到周报: ${path.relative(WIKI_ROOT, mdPath)}`);
  
  // 读取并提取摘要
  const mdContent = fs.readFileSync(mdPath, 'utf-8');
  const pushMarkdown = extractWeeklyMarkdown(mdContent, config.date);
  
  console.log('');
  console.log('─'.repeat(50));
  console.log('推送内容预览:');
  console.log('─'.repeat(50));
  console.log(pushMarkdown);
  console.log('─'.repeat(50));
  console.log(`字节数: ${Buffer.byteLength(pushMarkdown, 'utf-8')}`);
  console.log('');
  
  if (config.dryRun) {
    console.log('🚫 预览模式，未实际发送');
    return;
  }
  
  // 发送
  if (!config.webhook) {
    console.error('❌ 未配置 webhook，请设置 --webhook 参数或在 config.json 中配置');
    process.exit(1);
  }
  
  try {
    console.log('📤 正在推送...');
    const result = await sendMarkdown(config.webhook, pushMarkdown);
    console.log('✅ 推送成功');
    console.log(`   响应: ${JSON.stringify(result.result)}`);
  } catch (err) {
    console.error(`❌ 推送失败: ${err.message}`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('💥 程序错误:', err.message);
  process.exit(1);
});
