const fs = require('fs');
const FILE = 'docs/ai-daily/index.html';
const raw = fs.readFileSync(FILE, 'utf8');
const eol = raw.indexOf('\r\n') !== -1 ? '\r\n' : '\n';
const lines = raw.split(/\r?\n/);

// 幂等：已插入则跳过
if (raw.indexOf('"date": "2026-11-10"') !== -1 || raw.indexOf('date: "2026-11-10"') !== -1) {
  console.log('SKIP: 2026-11-10 条目已存在');
  process.exit(0);
}

const entry = {
  date: '2026-11-10',
  url: 'ai-daily-card-20261110-toc.html',
  type: 'daily',
  title: 'AIGC 每日速报 · 2026.11.10',
  desc: '第 94 期主线「冲最强与拼最省，是同一天」：Anthropic 上市前夜发布 Claude Fable 5.2 / Mythos 5.2 登顶 AA 指数 65 分、API 降价 20%，Meta 同日反向发布最小最省模型 Muse Ember（36 分追平 Haiku 5.5 而成本仅 1/3）；中场是 Google 第八代 TPU 扩至四款、Anthropic S-1 冷静期届满最快本周启动 IPO 路演、蓝色浪潮下参议院审议 BAAJA 让数据中心自担电网成本；收尾给到字节 Seedream 5.5 的 100 轮像素级编辑与原生 RGBA 透明、百度 ERNIE Evolve 自动化研究系统与 Zyphra 端侧开源 TTS ZONOS3-Mini。',
  tags: ['Anthropic', 'Fable 5.2', 'Muse Ember', 'TPU 8tx', 'IPO 路演', '蓝色浪潮', 'Seedream 5.5', '第 94 期'],
  time: '09:50'
};

// 生成对象文本，每行加 2 空格缩进以匹配 DATA 数组内的层级
const objText = JSON.stringify(entry, null, 2)
  .split('\n')
  .map(l => '  ' + l)
  .join(eol) + ',';

const anchorIdx = lines.findIndex(l => l.trim() === 'const DATA = [');
if (anchorIdx < 0) {
  console.error('ERROR: 找不到 const DATA = [ 锚点');
  process.exit(1);
}

// 在数组起始后插入；后续元素自带逗号，我们这条也要带末尾逗号
lines.splice(anchorIdx + 1, 0, objText);
fs.writeFileSync(FILE, lines.join(eol), 'utf8');

// 校验：eval 整个 DATA 数组（历史条目含无引号 key，JSON.parse 整体不可靠）
const after = fs.readFileSync(FILE, 'utf8');
const m = after.match(/const DATA = (\[[\s\S]*?\]);/);
let count = -1, firstUrl = '';
try {
  const DATA = eval(m[1]);
  count = DATA.length;
  firstUrl = DATA[0].url;
  console.log('DATA eval OK, count =', count);
  console.log('top entry date =', DATA[0].date, '| url =', firstUrl);
  console.log('top desc has Fable 5.2 =', (DATA[0].desc || '').indexOf('Fable 5.2') !== -1);
  console.log('top tags =', (DATA[0].tags || []).length);
} catch (e) {
  console.log('DATA eval FAILED:', e.message);
}
console.log('url field present (grep) =', /"date": "2026-11-10",\s*\r?\n\s*"url": "ai-daily-card-20261110-toc.html"/.test(after));
console.log('written', FILE, fs.statSync(FILE).size, 'bytes');
