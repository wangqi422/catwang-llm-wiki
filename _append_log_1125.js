const fs = require('fs');
const path = require('path');
const f = path.join(__dirname, 'log.md');
let s = fs.readFileSync(f, 'utf8');

const entry = [
'## [2026-11-25 16:15] AIGC 每日速报 2026.11.25（第 109 期 · xiaoqi-ai-daily skill 全五阶段）',
'',
'- **第 109 期主线**：AI 一夜破两座数学圣杯，转头给资本和算力算起了成本账 —— Anthropic 与 OpenAI 相隔不到 4 小时先后证明 VP≠VNP（Claude 70 页/7.3 万行 Lean + OpenAI 30 页/44 万行 Lean、均无人类核验，破 1979 年悬置 47 年猜想）（9.5/P0）+ OpenAI 把矩阵乘法指数钉死精确 9/4、推翻 ω=2 猜想与 Strassen 1994 预测、HN 460+ 分（9.3/P0）+ 欧盟拟设 500 亿欧元主权科技基金 STEF 主投 AI/量子、1:6 撬动（9.0/P0）+ Anthropic 上市 4 日破发收 81.91 美元、市值一度失守万亿、9009 亿算力承诺（8.9/P0）+ Sand.ai 480B 视频模型 MAGI-2 把 30 秒 1080p 打到 0.5 元/秒、盲测全球第二（8.7/P1）+ 腾讯混元开源 Hy4 flash GGUF 权重塞进 64GB Mac mini、89 tok/s（8.5/P1）+ OpenAI GPT-6 湿实验做出可结合新蛋白 322 中 35 个（10.9%）（8.4/P1）+ Tidal 12·9 起下架 2900 万首纯 AI 歌、96% 零播放（8.2/P1）；均分 8.8',
'- **产物**：MD raw/daily-reports/AIGC_Daily_Report_20261125.md（34KB）；H5 docs/ai-daily/ai-daily-card-20261125-toc.html（36KB / 8 卡 / 3 章节 3-3-2 / 32 chips / 8 nav-sub / lead / </head>=1）；海报 docs/ai-daily/ai-daily-poster-20261125.png（922.5KB / 1440×1920）；归档 DATA 置顶含 url+8tags',
'- **采集**：AI HOT news v1 mode=all&window=24h&limit=100 两页 200 条（hasMore=true）+ aihot.news 热度榜 Top5（Anthropic 上市破发 +24189）+ 7 轮中英 WebSearch',
'- **查重**：黄仁勋复职/GLM-5.4/Claude Ship/黎曼证明等昨日热度榜条目全剔除；Anthropic IPO 按「定价→首日收涨→破发」连续剧新阶段保留（11-19/20 已报不同阶段）；Hy4 flash 按「发布→权重开源」承诺兑现新阶段保留（11-17 已报发布）；MAGI-2/Tidal/STEF/VP≠VNP/矩阵 9/4/GPT-6 蛋白均零命中；Bezos Prometheus（人物观点级）与千问 Go 打电话（P2）未入选',
'- **发布**：commit d3488fe（MD/H5/归档）+ eeb17a4（海报）；阶段 4 强校验跨日对照 11-24 H5/index 均 200 → 今日首轮 503/404 → 部署 45574690431 首跑 Found 0 artifact(s) 抖动 → rerun 成功 → curl 200 size35999 + WebFetch 二次确认第 109 期/星期三/8 卡 3 章节/lead/tagline/返回归档；海报 ViewImage 确认暖纸底+四色圆点+粉色 Hero+半透白卡+Cormorant 斜体序号+评分列+底部四色数据卡、与 H5 同源；一条龙推群阶段中断（海报 commit 后部署 45575048464 连续 3 次 Found 0 artifact(s) 抖动、PNG 未就绪）→ 改用新 commit 触发全新 workflow 恢复部署 → PNG 200 后 push-poster.js 单独补推 3/3 群（群 A/群 B/竞品视觉日报群，markdown_v2 单条 209/4096 字节）',
''
].join('\r\n');

// insert after line 1 (title), preserving CRLF
const anchor = '# 操作日志 | Operation Log';
const idx = s.indexOf(anchor);
if (idx < 0) { console.error('anchor not found'); process.exit(1); }
const endOfLine = s.indexOf('\n', idx) + 1;
const rest = s.slice(endOfLine);
if (rest.includes('## [2026-11-25 16:15] AIGC 每日速报')) {
  console.log('already exists, skip');
  process.exit(0);
}
// normalize rest to CRLF if needed for consistent insertion
const out = s.slice(0, endOfLine) + entry + rest;
fs.writeFileSync(f, out, 'utf8');
console.log('appended log entry');
