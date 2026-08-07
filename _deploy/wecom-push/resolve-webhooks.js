#!/usr/bin/env node
/**
 * 企微webhook 凭据解析（统一入口）
 *
 * 【为什么存在】
 * config.json 在 public 仓库里，不能放真实 webhook key（任何人拿到就能往群里发消息）。
 * 本模块按优先级解析真实凭据，config.json 只保留占位符和群名结构。
 *
 * 【解析优先级】（高 → 低）
 *   1. 环境变量           WECOM_WEBHOOK_KEY / WECOM_WEBHOOK / WECOM_AI_DAILY_KEYS
 *   2. 本地私密文件       _deploy/wecom-push/config.local.json（已 gitignore）
 *   3. config.json       仅当值不是占位符时才用（兼容旧配置）
 *
 * 【config.local.json 格式】（与 config.json 同构，只需写要覆盖的字段）
 *   {
 *     "aiDailyWebhooks": [
 *       { "name": "群 A", "url": "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=真实key" },
 *       { "name": "群 B", "url": "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=真实key" }
 *     ],
 *     "webhooks": [ ... ],
 *     "webhook": "https://..."
 *   }
 *
 * 【环境变量格式】
 *   WECOM_AI_DAILY_KEYS=key1,key2         多个 key 逗号分隔，自动拼成完整 URL
 *   WECOM_WEBHOOK_KEY=key                 单个 key
 *   WECOM_WEBHOOK=https://完整URL         完整 URL
 */

const fs = require('fs');
const path = require('path');

const WECOM_BASE = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=';
const PLACEHOLDER_PAT = /YOUR_|<.*>|PLACEHOLDER|xxx{3,}|REPLACE_ME/i;

/** 判断一个 webhook 值是否只是占位符 */
function isPlaceholder(v) {
  if (!v || typeof v !== 'string') return true;
  if (PLACEHOLDER_PAT.test(v)) return true;
  // 没有 key= 或key= 后面为空
  const m = v.match(/key=([^&\s]*)/);
  return !m || !m[1];
}

/** key 或完整 URL → 完整 URL */
function toUrl(keyOrUrl) {
  const s = String(keyOrUrl).trim();
  if (!s) return '';
  return s.startsWith('http') ? s : WECOM_BASE + s;
}

/** 读 JSON，失败返回 {} */
function readJson(p) {
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch {
    return {};
  }
}

/**
 * 解析 webhook 配置
 * @param {string} dir wecom-push 目录（默认本模块所在目录）
 * @returns {{ webhook: string, webhooks: Array, aiDailyWebhooks: Array, githubPagesBase: string, source: string, raw: object }}
 */
function resolveWebhooks(dir = __dirname) {
  const base = readJson(path.join(dir, 'config.json'));
  const local = readJson(path.join(dir, 'config.local.json'));
  const sources = [];

  // ── aiDailyWebhooks ──
  let aiDaily = [];
  if (process.env.WECOM_AI_DAILY_KEYS) {
    aiDaily = process.env.WECOM_AI_DAILY_KEYS.split(',')
      .map((k) => k.trim())
      .filter(Boolean)
      .map((k, i) => ({ name: `群 ${i + 1}（env）`, url: toUrl(k) }));
    sources.push('aiDailyWebhooks←ENV');
  } else if (Array.isArray(local.aiDailyWebhooks) && local.aiDailyWebhooks.length) {
    aiDaily = local.aiDailyWebhooks.filter((w) => w.url && !isPlaceholder(w.url));
    if (aiDaily.length) sources.push('aiDailyWebhooks←config.local.json');
  }
  if (!aiDaily.length && Array.isArray(base.aiDailyWebhooks)) {
    const usable = base.aiDailyWebhooks.filter((w) => w.url && !isPlaceholder(w.url));
    if (usable.length) {
      aiDaily = usable;
      sources.push('aiDailyWebhooks←config.json');
    }
  }
  // 单key 环境变量兜底
  if (!aiDaily.length && process.env.WECOM_WEBHOOK_KEY) {
    aiDaily = [{ name: '群（WECOM_WEBHOOK_KEY）', url: toUrl(process.env.WECOM_WEBHOOK_KEY) }];
    sources.push('aiDailyWebhooks←WECOM_WEBHOOK_KEY');
  }

  // ── webhooks（竞品日报多群）──
  let hooks = [];
  if (Array.isArray(local.webhooks) && local.webhooks.length) {
    hooks = local.webhooks.filter((w) => w.url && !isPlaceholder(w.url));
    if (hooks.length) sources.push('webhooks←config.local.json');
  }
  if (!hooks.length && Array.isArray(base.webhooks)) {
    const usable = base.webhooks.filter((w) => w.url && !isPlaceholder(w.url));
    if (usable.length) {
      hooks = usable;
      sources.push('webhooks←config.json');
    }
  }

  // ── webhook（单群，向后兼容）──
  let hook = '';
  if (process.env.WECOM_WEBHOOK) {
    hook = process.env.WECOM_WEBHOOK;
    sources.push('webhook←ENV');
  } else if (process.env.WECOM_WEBHOOK_KEY) {
    hook = toUrl(process.env.WECOM_WEBHOOK_KEY);
    sources.push('webhook←WECOM_WEBHOOK_KEY');
  } else if (local.webhook && !isPlaceholder(local.webhook)) {
    hook = local.webhook;
    sources.push('webhook←config.local.json');
  } else if (base.webhook && !isPlaceholder(base.webhook)) {
    hook = base.webhook;
    sources.push('webhook←config.json');
  } else if (hooks.length) {
    hook = hooks[0].url;
  } else if (aiDaily.length) {
    hook = aiDaily[0].url;
  }

  return {
    webhook: hook,
    webhooks: hooks,
    aiDailyWebhooks: aiDaily,
    githubPagesBase:
      process.env.GITHUB_PAGES_BASE ||
      local.githubPagesBase ||
      base.githubPagesBase ||
      'https://wangqi422.github.io/catwang-llm-wiki',
    source: sources.join(' | ') || '（未解析到任何凭据）',
    raw: { ...base, ...local },
  };
}

/** 打印未配置时的引导信息 */
function printSetupHelp(which = 'aiDailyWebhooks') {
  console.error('');
  console.error(`✗ 未解析到可用的${which} 凭据。三种配法任选其一：`);
  console.error('');
  console.error('  【方式 1】环境变量（推荐用于 CI / 自动化）');
  console.error('    export WECOM_AI_DAILY_KEYS="key1,key2"');
  console.error('');
  console.error('  【方式 2】本地私密文件（推荐用于本机开发，已 gitignore）');
  console.error('    创建 _deploy/wecom-push/config.local.json：');
  console.error('    {');
  console.error('      "aiDailyWebhooks": [');
  console.error('        { "name": "群 A", "url": "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=真实key" }');
  console.error('      ]');
  console.error('    }');
  console.error('');
  console.error('  【方式 3】单群临时推送');
  console.error('    export WECOM_WEBHOOK_KEY="key"');
  console.error('');
  console.error('  ⚠️ 不要把真实 key 写进 config.json —— 该文件在 public 仓库里');
  console.error('');
}

/** 脱敏显示 URL（只留 key 前 8 位） */
function maskUrl(url) {
  return String(url).replace(/key=([^&\s]{0,8})[^&\s]*/,'key=$1***');
}

module.exports = { resolveWebhooks, printSetupHelp, maskUrl, toUrl, isPlaceholder, WECOM_BASE };
