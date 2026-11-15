const fs = require('fs');
const F = 'docs/ai-daily/index.html';
let s = fs.readFileSync(F, 'utf8');
const eol = s.indexOf('\r\n') !== -1 ? '\r\n' : '\n';

const entry = [
  '  {',
  '    "date": "2026-11-15",',
  '    "url": "ai-daily-card-20261115-toc.html",',
  '    "type": "daily",',
  '    "title": "AIGC 每日速报 · 2026.11.15",',
  '    "desc": "第 99 期主线「没有一款新模型发布，全在给这轮震荡补账、标价和动手术」：英伟达 12 万人请愿黄仁勋复职 + 国会 12/1–12/3 作证 + 一周市值蒸发约 5730 亿跌破 4 万亿、WSJ 揭 2500 亿担保被减半；AMD 用 MEXT 预测内存引擎把 DRAM 砍半保住 99% 性能；资本同日反向加码 Fractile / LangChain / Rhoda / Poolside；中段 OpenAI 重组机器人团队押注通用模型、DeepMind 开放 SatWeave + PARDIG 气象数据集、百度词元所首日 100+ 供应商；收尾 Anthropic 常驻智能体五原语、AIGC 工具明码标价。",',
  '    "tags": [',
  '      "英伟达治理危机",',
  '      "AMD MEXT",',
  '      "资本反向加码",',
  '      "OpenAI 重组机器人",',
  '      "WeatherNext 3 数据开放",',
  '      "百度词元所",',
  '      "常驻智能体原语",',
  '      "第 99 期"',
  '    ],',
  '    "time": "09:45"',
  '  },'
].join(eol);

const anchor = 'const DATA = [';
if (s.indexOf('"date": "2026-11-15"') !== -1) {
  console.log('ALREADY EXISTS — skip');
  process.exit(0);
}
const pos = s.indexOf(anchor);
if (pos === -1) { console.log('ANCHOR NOT FOUND'); process.exit(1); }
s = s.slice(0, pos + anchor.length) + eol + entry + s.slice(pos + anchor.length);
fs.writeFileSync(F, s, 'utf8');

// eval 校验整个 DATA 数组
const m = s.match(/const DATA\s*=\s*(\[[\s\S]*?\]);/);
const arr = eval(m[1]);
console.log('DATA total =', arr.length);
console.log('first date =', arr[0].date, '| url =', arr[0].url, '| tags =', arr[0].tags.length);
console.log('quoted-key count =', (s.match(/"date":\s*"/g) || []).length);
console.log('eol =', eol === '\r\n' ? 'CRLF' : 'LF');
