#!/usr/bin/env node
/**
 * push-html-as-file.js
 * 将 H5 文件直接作为「文件」推送到企微群（msgtype=file）
 * 同事下载后双击浏览器即可看到完整视觉效果，不依赖任何 Pages 服务
 *
 * Usage:
 *   node push-html-as-file.js <html-path>
 *   node push-html-as-file.js docs/ai-daily/ai-daily-card-20260530-toc.html
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const { resolveWebhooks, printSetupHelp } = require('./resolve-webhooks');

// 凭据解析：ENV → config.local.json → config.json（占位符会被忽略）
const _resolved = resolveWebhooks(__dirname);
const WEBHOOK_KEY = (_resolved.webhook || '').match(/key=([\w-]+)/)?.[1];

if (!WEBHOOK_KEY) {
  printSetupHelp('webhook');
  process.exit(1);
}

// ── HTTP 工具 ─────────────────────────────
function httpRequest(options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

// ── 步骤 1：上传文件到企微临时素材库 ──────
async function uploadFile(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const fileName = path.basename(filePath);
  const boundary = '----WBPB' + Date.now();

  // multipart/form-data 拼装
  const head = Buffer.from(
    `--${boundary}\r\n` +
    `Content-Disposition: form-data; name="media"; filename="${fileName}"; filelength=${fileBuffer.length}\r\n` +
    `Content-Type: application/octet-stream\r\n\r\n`,
    'utf-8'
  );
  const tail = Buffer.from(`\r\n--${boundary}--\r\n`, 'utf-8');
  const body = Buffer.concat([head, fileBuffer, tail]);

  const options = {
    hostname: 'qyapi.weixin.qq.com',
    path: `/cgi-bin/webhook/upload_media?key=${WEBHOOK_KEY}&type=file`,
    method: 'POST',
    headers: {
      'Content-Type': `multipart/form-data; boundary=${boundary}`,
      'Content-Length': body.length,
    },
  };

  const res = await httpRequest(options, body);
  const json = JSON.parse(res.body);
  if (json.errcode !== 0) {
    throw new Error(`上传失败: ${JSON.stringify(json)}`);
  }
  return json.media_id;
}

// ── 步骤 2：发送 file 消息 ──────────────────
async function sendFile(mediaId) {
  const payload = JSON.stringify({
    msgtype: 'file',
    file: { media_id: mediaId },
  });

  const options = {
    hostname: 'qyapi.weixin.qq.com',
    path: `/cgi-bin/webhook/send?key=${WEBHOOK_KEY}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload),
    },
  };

  const res = await httpRequest(options, payload);
  const json = JSON.parse(res.body);
  if (json.errcode !== 0) {
    throw new Error(`发送失败: ${JSON.stringify(json)}`);
  }
  return true;
}

// ── 主流程 ────────────────────────────────
async function main() {
  const arg = process.argv[2];
  if (!arg) {
    console.error('用法: node push-html-as-file.js <html-path>');
    process.exit(1);
  }

  const wikiRoot = path.resolve(__dirname, '../..');
  const htmlPath = path.isAbsolute(arg) ? arg : path.resolve(wikiRoot, arg);

  if (!fs.existsSync(htmlPath)) {
    console.error(`❌ 文件不存在: ${htmlPath}`);
    process.exit(1);
  }

  const stats = fs.statSync(htmlPath);
  const sizeMB = stats.size / 1024 / 1024;
  const fileName = path.basename(htmlPath);

  console.log('============================================================');
  console.log('  企微群 — HTML 文件直推');
  console.log('============================================================');
  console.log(`📄 文件: ${fileName}`);
  console.log(`📏 大小: ${(stats.size / 1024).toFixed(1)} KB`);

  if (sizeMB > 20) {
    console.error('❌ 企微 file 类型限制 20MB');
    process.exit(1);
  }
  if (stats.size < 5) {
    console.error('❌ 文件太小（企微 file 类型最小 5 字节）');
    process.exit(1);
  }

  console.log('\n[1/2] 上传文件到企微临时素材库 ...');
  const mediaId = await uploadFile(htmlPath);
  console.log(`   ✅ 上传成功，media_id=${mediaId.slice(0, 12)}...`);

  console.log('\n[2/2] 发送 file 消息到群 ...');
  await sendFile(mediaId);
  console.log('   ✅ 发送成功');

  console.log('\n🎉 完成！群内同事可下载此 HTML，双击浏览器即可看到完整视觉效果');
  console.log('   ⚠️  企微临时素材有效期 3 天，请提示同事尽快下载');
}

main().catch((err) => {
  console.error('\n❌ 出错:', err.message);
  process.exit(1);
});
