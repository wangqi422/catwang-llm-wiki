#!/usr/bin/env node
/**
 * AI Daily 海报推送到企微群（支持多群）
 *
 * 【标准流程】（2026-08-07 用户拍板）
 *   1. 生成海报         node _deploy/daily-card/generate-poster.js --date YYYYMMDD
 *   2. 截图node _deploy/daily-card/screenshot-poster.js --html docs/ai-daily/ai-daily-poster-YYYYMMDD.html
 *   3. 提交 + push      git add/commit/push（md2 模式依赖公网图片 URL）
 *   4. 等 Pages 就绪    脚本内置轮询等待，最多 3 分钟
 *   5. 预检node _deploy/wecom-push/push-poster.js --date YYYYMMDD --dry
 *   6. 实发             node _deploy/wecom-push/push-poster.js --date YYYYMMDD
 *
 * 【输出格式】固定为一条 markdown_v2 消息：
 *   ![](海报公网URL)
 *
 *   [点击看更多内容](H5日报URL)
 *
 * 【两种模式】--mode
 *   md2(默认)一条 markdown_v2 = 图片 + 链接。需先 push 到 GitHub Pages
 *   split两条：msgtype=image (base64 直传) + msgtype=markdown 链接。不依赖公网 URL
 *
 * 【坑位记录】
 *   - msgtype=markdown_v2 支持 ![](url) 图片语法，可与 [文本](url) 同条共存 ← 推荐
 *   - markdown_v2 不支持 <font color> 和 @群成员；客户端 <4.1.36 降级为纯文本
 *   - msgtype=image 走 base64 + md5 直传，**不用** upload_media
 *   - upload_media 只支持 type=file；拿它的 media_id 发 image 会 40009
 *   - 不要用 msgtype=file 发图，会显示成灰色文件附件要点开下载
 *   - image 限制：base64 编码前 < 2MB，仅 jpg/png
 *   - 频率限制：每个 webhook <= 20 条/分钟
 *   - webhook 已发消息无法撤回，务必先 --dry 预检
 *
 * 用法：
 *   node _deploy/wecom-push/push-poster.js --date 20260807 --dry
 *   node _deploy/wecom-push/push-poster.js --date 20260807
 *   node _deploy/wecom-push/push-poster.js --date 20260807 --mode split
 *   node _deploy/wecom-push/push-poster.js --date 20260807 --group "AI 日报群 1"
 *   node _deploy/wecom-push/push-poster.js --png <path> --url <h5url> --text "自定义文案"
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');

const REPO_ROOT = path.resolve(__dirname, '../..');
const CONFIG_PATH = path.join(__dirname, 'config.json');

// ── 读配置 ────────────────────────────────
let cfg = {};
try {
  cfg = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
} catch (e) {
  console.error(`✗ 读取 config.json 失败: ${e.message}`);
  process.exit(1);
}
const PAGES_BASE = process.env.GITHUB_PAGES_BASE || cfg.githubPagesBase || 'https://wangqi422.github.io/catwang-llm-wiki';

// ── 参数解析 ──────────────────────────────
function arg(name, fallback = null) {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 && process.argv[i + 1] && !process.argv[i + 1].startsWith('--')
    ? process.argv[i + 1]
    : fallback;
}
const DRY = process.argv.includes('--dry');
const NOWAIT = process.argv.includes('--no-wait');
const MODE = arg('mode', 'md2'); // md2 | split
const date = arg('date', new Date().toISOString().slice(0, 10).replace(/-/g, ''));
const groupFilter = arg('group', null);

const pngPath = arg('png', path.join(REPO_ROOT, 'docs/ai-daily', `ai-daily-poster-${date}.png`));
const pngUrl = arg('pngurl', `${PAGES_BASE}/docs/ai-daily/ai-daily-poster-${date}.png`);
const h5Url = arg('url', `${PAGES_BASE}/docs/ai-daily/ai-daily-card-${date}-toc.html`);
const linkText = arg('text', '点击看更多内容');

if (!['md2', 'split'].includes(MODE)) {
  console.error(`✗ --mode 只支持 md2 | split，收到: ${MODE}`);
  process.exit(1);
}

// ── 解析目标群 ────────────────────────────
let targets = Array.isArray(cfg.aiDailyWebhooks) ? cfg.aiDailyWebhooks.filter((w) => w.url) : [];
if (process.env.WECOM_WEBHOOK_KEY) {
  targets = [{ name: 'ENV 指定群', url: `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${process.env.WECOM_WEBHOOK_KEY}` }];
}
if (groupFilter) {
  targets = targets.filter((w) => w.name === groupFilter);
  if (targets.length === 0) {
    console.error(`✗ 未找到群「${groupFilter}」，config.json 里aiDailyWebhooks 可选：`);
    (cfg.aiDailyWebhooks || []).forEach((w) => console.error(`    - ${w.name}`));
    process.exit(1);
  }
}
if (targets.length === 0) {
  console.error('✗ config.json 里aiDailyWebhooks 为空，请先配置群 webhook');
  process.exit(1);
}

// ── 校验本地文件 ──────────────────────────
if (!fs.existsSync(pngPath)) {
  console.error(`✗ 海报文件不存在: ${pngPath}`);
  console.error(`  先跑：node _deploy/daily-card/generate-poster.js --date ${date}`);
  console.error(`  再跑：node _deploy/daily-card/screenshot-poster.js --html docs/ai-daily/ai-daily-poster-${date}.html`);
  process.exit(1);
}
const buf = fs.readFileSync(pngPath);
const sizeKB = (buf.length / 1024).toFixed(1);

console.log('── 推送预检 ──────────────────');
console.log(`  模式     : ${MODE === 'md2' ? 'md2（一条消息：图片+链接）' : 'split（两条消息）'}`);
console.log(`  海报文件 : ${pngPath}`);
console.log(`  文件大小 : ${sizeKB}KB`);
if (MODE === 'md2') console.log(`  图片 URL : ${pngUrl}`);
console.log(`  H5 链接  : ${h5Url}`);
console.log(`  链接文案 : ${linkText}`);
console.log(`  目标群   : ${targets.map((t) => t.name).join(' / ')}（共 ${targets.length} 个）`);
console.log('');

// ── 构造消息 ──────────────────────────────
const messages = [];

if (MODE === 'md2') {
  const content = `![](${pngUrl})\n\n[${linkText}](${h5Url})`;
  const bytes = Buffer.byteLength(content, 'utf8');
  if (bytes > 4096) {
    console.error(`✗ content ${bytes} 字节超过 markdown_v2 的 4096 上限`);
    process.exit(1);
  }
  console.log('── 消息 (markdown_v2) ─────────');
  console.log(content.split('\n').map((l) => `  ${l}`).join('\n'));
  console.log(`  [${bytes}/4096 字节]`);
  messages.push({ payload: { msgtype: 'markdown_v2', markdown_v2: { content } }, label: '图片+链接（一条）' });
} else {
  if (buf.length > 2 * 1024 * 1024) {
    console.error(`✗ 图片 ${sizeKB}KB 超过企微 image 的 2MB 上限，请压缩或改用 --mode md2`);
    process.exit(1);
  }
  const b64 = buf.toString('base64');
  const md5 = crypto.createHash('md5').update(buf).digest('hex');
  console.log('── 消息 1 (image) ─────────────');
  console.log(`  base64 ${(b64.length / 1024).toFixed(1)}KB · md5 ${md5}`);
  console.log('── 消息 2 (markdown) ──────────');
  console.log(`  [${linkText}](${h5Url})`);
  messages.push({ payload: { msgtype: 'image', image: { base64: b64, md5 } }, label: '消息 1 (海报图片)' });
  messages.push({
    payload: { msgtype: 'markdown', markdown: { content: `[${linkText}](${h5Url})` } },
    label: '消息 2 (跳转链接)',
  });
}
console.log('');

if (DRY) {
  console.log('✓ DRY RUN — 未实际发送');
  process.exit(0);
}

// ── 等 GitHub Pages 就绪（仅 md2 模式）──
function headStatus(url) {
  return new Promise((resolve) => {
    const u = new URL(url);
    const req = https.request({ hostname: u.hostname, path: u.pathname, method: 'HEAD' }, (res) => {
      res.resume();
      resolve(res.statusCode);
    });
    req.on('error', () => resolve(0));
    req.setTimeout(8000, () => { req.destroy(); resolve(0); });
    req.end();
  });
}

async function waitForPages(url, maxTries = 22, gapMs = 8000) {
  for (let i = 1; i <= maxTries; i++) {
    const code = await headStatus(url);
    if (code === 200) {
      console.log(`✓ GitHub Pages 已就绪（第 ${i} 次检测，HTTP 200）`);
      return true;
    }
    if (i === 1) console.log(`⏳ 等 GitHub Pages 部署（当前 HTTP ${code}）...`);
    if (i < maxTries) await new Promise((r) => setTimeout(r, gapMs));
  }
  return false;
}

// ── 发送 ──────────────────────────────────
function send(webhookUrl, payload, label) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(payload);
    const u = new URL(webhookUrl);
    const req = https.request(
      {
        hostname: u.hostname,
        path: u.pathname + u.search,
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
      },
      (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => {
          let json;
          try { json = JSON.parse(data); } catch { json = { raw: data }; }
          if (json.errcode === 0) {
            console.log(`  ✓ ${label}`);
            resolve(json);
          } else {
            console.error(`  ✗ ${label} 失败: ${JSON.stringify(json)}`);
            reject(new Error(json.errmsg || data));
          }
        });
      }
    );
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

(async () => {
  if (MODE === 'md2' && !NOWAIT) {
    const ok = await waitForPages(pngUrl);
    if (!ok) {
      console.error(`\n✗ GitHub Pages 图片 3 分钟内未就绪: ${pngUrl}`);
      console.error('  请确认已git push，或改用 --mode split（base64 直传，不依赖公网 URL）');
      console.error('  也可加 --no-wait 跳过检测强制发送');
      process.exit(1);
    }
    console.log('');
  }

  const failed = [];
  for (const t of targets) {
    console.log(`→ ${t.name}`);
    try {
      for (let i = 0; i < messages.length; i++) {
        await send(t.url, messages[i].payload, messages[i].label);
        if (i < messages.length - 1) await new Promise((r) => setTimeout(r, 600));
      }
    } catch (e) {
      failed.push(`${t.name}: ${e.message}`);
    }
    await new Promise((r) => setTimeout(r, 800)); // 群间间隔，避免触发频率限制
  }

  console.log('');
  if (failed.length === 0) {
    console.log(`✓ 全部推送完成（${targets.length} 个群）`);
  } else {
    console.error(`✗ ${failed.length}/${targets.length} 个群推送失败：`);
    failed.forEach((f) => console.error(`    ${f}`));
    process.exit(1);
  }
})().catch((e) => {
  console.error(`\n✗ 推送中断: ${e.message}`);
  process.exit(1);
});
