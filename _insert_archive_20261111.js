const fs = require('fs');
const FILE = 'docs/ai-daily/index.html';
const raw = fs.readFileSync(FILE, 'utf8');
const eol = raw.indexOf('\r\n') !== -1 ? '\r\n' : '\n';
const lines = raw.split(/\r?\n/);

// 幂等：已插入则跳过
if (raw.indexOf('"date": "2026-11-11"') !== -1 || raw.indexOf('date: "2026-11-11"') !== -1) {
  console.log('SKIP: 2026-11-11 条目已存在');
  process.exit(0);
}

const entry = {
  date: '2026-11-11',
  url: 'ai-daily-card-20261111-toc.html',
  type: 'daily',
  title: 'AIGC 每日速报 · 2026.11.11',
  desc: '第 95 期主线「从锁在保险柜，到铺进每个人的工位」：Google 把限量两周的 Gemini 4 Carbon 全面 GA（三项真实工作流评测第一、与 Argon 同价）、Anthropic 正式启动 IPO 路演（定价 $70–78、七巨头 260 亿配售）并同日推出 Claude Whiteboards / Sheets / Data 办公套件把微软股价砸跌 3%；中场是 Stripe 完成约 75 亿美元收购 OpenRouter、MiniMax 开源 H3-Image 把 4K 出图压进 10 秒、OpenAI 让 12 亿周活的 ChatGPT 长出商家入口；收尾是 Adobe MAX 把生成媒体塞进 Premiere 时间轴并预告本地 MCP，以及 GR00T 2 与 Gemini Robotics 2.5 同日双发进奔驰产线。',
  tags: ['Gemini 4 Carbon', 'Anthropic IPO', 'Claude 办公套件', 'Stripe × OpenRouter', 'H3-Image', 'Adobe MAX', 'GR00T 2', '第 95 期'],
  time: '09:45'
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
  console.log('top desc has Carbon =', (DATA[0].desc || '').indexOf('Carbon') !== -1);
  console.log('top tags =', (DATA[0].tags || []).length);
} catch (e) {
  console.log('DATA eval FAILED:', e.message);
}
console.log('url field present (grep) =', /"date": "2026-11-11",\s*\r?\n\s*"url": "ai-daily-card-20261111-toc.html"/.test(after));
console.log('written', FILE, fs.statSync(FILE).size, 'bytes');
