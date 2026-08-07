#!/usr/bin/env node
/**
 * AI Daily 海报「一条龙」发布：生成 → 截图 → 提交 push → 推送多群
 *
 * 【标准流程】（2026-08-07 用户拍板固化）
 *   Step 1  生成海报 HTML   generate-poster.js --date YYYYMMDD --ratio 3:4
 *   Step 2  Puppeteer 截图  screenshot-poster.js --html ...
 *   Step 3  git add/commit/push（用 gh auth token 注入，绕过密码交互）
 *   Step 4  等GitHub Pages 就绪（push-poster.js 内置轮询）
 *   Step 5  推送到 config.json 的 aiDailyWebhooks 所有群（md2 单条消息）
 *
 * 用法：
 *   node _deploy/wecom-push/publish-ai-daily-poster.js                  # 今天
 *   node _deploy/wecom-push/publish-ai-daily-poster.js --date 20260807
 *   node _deploy/wecom-push/publish-ai-daily-poster.js --dry            # 全程预检不发不推
 *   node _deploy/wecom-push/publish-ai-daily-poster.js --skip-git# 海报已 push 过，只推群
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '../..');
const DEPLOY_DIR = path.join(REPO_ROOT, '_deploy');

function arg(name, fallback = null) {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 && process.argv[i + 1] && !process.argv[i + 1].startsWith('--')
    ? process.argv[i + 1]
    : fallback;
}
const DRY = process.argv.includes('--dry');
const SKIP_GIT = process.argv.includes('--skip-git');
const date = arg('date', new Date().toISOString().slice(0, 10).replace(/-/g, ''));

const htmlRel = `docs/ai-daily/ai-daily-poster-${date}.html`;
const pngRel = `docs/ai-daily/ai-daily-poster-${date}.png`;
const pngAbs = path.join(REPO_ROOT, pngRel);

function run(cmd, cwd = DEPLOY_DIR, label = '') {
  if (label) console.log(`\n▶ ${label}`);
  console.log(`  $ ${cmd}`);
  if (DRY) { console.log('    (DRY RUN 跳过)'); return ''; }
  try {
    const out = execSync(cmd, { cwd, encoding: 'utf8', stdio: 'pipe', maxBuffer: 20 * 1024 * 1024 });
    if (out.trim()) console.log(out.trim().split('\n').map((l) => `    ${l}`).join('\n'));
    return out;
  } catch (e) {
    const msg = (e.stdout || '') + (e.stderr || '') || e.message;
    console.error(msg.trim().split('\n').map((l) => `    ${l}`).join('\n'));
    throw new Error(`命令失败: ${cmd}`);
  }
}

console.log('══════════════════════════════════════');
console.log(`  AI Daily 海报发布 · ${date}${DRY ? ' · DRY RUN' : ''}`);
console.log('══════════════════════════════════════');

// ── Step 0：源文件检查 ────────────────────
const mdCandidates = [
  path.join(REPO_ROOT, 'raw/daily-reports', `AIGC_Daily_Report_${date}.md`),
  path.join(REPO_ROOT, 'docs/ai-daily', `AIGC_Daily_Report_${date}.md`),
];
const mdPath = mdCandidates.find((p) => fs.existsSync(p));
if (!mdPath) {
  console.error(`\n✗ 找不到当日日报 MD，请先生成 AIGC 日报：`);
  mdCandidates.forEach((p) => console.error(`    ${p}`));
  process.exit(1);
}
console.log(`\n✓ 日报源文件: ${path.relative(REPO_ROOT, mdPath)}`);

try {
  // ── Step 1-2：生成 + 截图 ───────────────
  run(`node daily-card/generate-poster.js --date ${date} --ratio 3:4`, DEPLOY_DIR, 'Step 1  生成海报 HTML');
  run(`node daily-card/screenshot-poster.js --html ${htmlRel}`, DEPLOY_DIR, 'Step 2  Puppeteer 截图');

  if (!DRY && !fs.existsSync(pngAbs)) throw new Error(`截图产物不存在: ${pngAbs}`);
  if (!DRY) console.log(`  海报大小: ${(fs.statSync(pngAbs).size / 1024).toFixed(1)}KB`);

  // ── Step 3：提交 + push ─────────────────
  if (SKIP_GIT) {
    console.log('\n▶ Step 3  git 提交推送 —— 已用 --skip-git 跳过');
  } else {
    console.log('\n▶ Step 3  git 提交推送');
    const status = DRY ? '' : execSync(`git status --porcelain ${htmlRel} ${pngRel}`, { cwd: REPO_ROOT, encoding: 'utf8' });
    if (!DRY && !status.trim()) {
      console.log('    海报无变更，跳过提交');
    } else {
      run(`git add ${htmlRel} ${pngRel}`, REPO_ROOT);
      run(`git commit -m "feat(ai-daily): add ${date} poster (3:4)"`, REPO_ROOT);
    }
    // gh token 注入，绕过 credential-helper 找不到 /dev/tty 的问题
    const pushCmd = 'GH_TOKEN=$(gh auth token) && git -c "url.https://x-access-token:${GH_TOKEN}@github.com/.insteadOf=https://github.com/" push origin main';
    if (DRY) {
      console.log(`  $ ${pushCmd}`);
      console.log('    (DRY RUN 跳过)');
    } else {
      execSync(pushCmd, { cwd: REPO_ROOT, encoding: 'utf8', stdio: 'inherit', shell: 'bash' });
      console.log('    ✓ push 完成');
    }
  }

  // ── Step 4-5：等Pages + 推群 ───────────
  console.log('\n▶ Step 4-5  等 GitHub Pages 就绪 + 推送企微群');
  const pushArgs = `--date ${date}${DRY ? ' --dry' : ''}`;
  run(`node wecom-push/push-poster.js ${pushArgs}`, DEPLOY_DIR);

  console.log('\n══════════════════════════════════════');
  console.log(DRY ? '  ✓ DRY RUN 完成，未实际发布' : '  ✓发布完成');
  console.log('══════════════════════════════════════');
} catch (e) {
  console.error(`\n✗ 发布中断: ${e.message}`);
  process.exit(1);
}
