const fs = require('fs');
const p = 'log.md';
let s = fs.readFileSync(p, 'utf8');
const nl = s.includes('\r\n') ? '\r\n' : '\n';

const lines = [
  '',
  '## [2026-11-12 09:55] daily-card | AIGC 日报第 96 期五阶段全流程',
  '- 产物：raw/daily-reports/AIGC_Daily_Report_20261112.md / docs/ai-daily/ai-daily-card-20261112-toc.html（46106B · 8 卡 · 8 nav-sub · 32 chips · 3 章节 3-3-2）/ docs/ai-daily/ai-daily-poster-20261112.png（667.8KB · 2880×3840 @2x）；归档首页 DATA 顶部追加 11-12（eval count 140→141，url 字段 / 8 tags / 单条目块 JSON.parse 均通过）',
  '- 主线「从会答，到会判、会交、会干活」：① Google Gemini Decision 1 决策模型（不逐 token 生成 / 单次评 1000 题 / 150–250ms / $0.10/M 输入 / 9.4 P0）② A2UI 1.0 生成式 UI 协议首个稳定版（Apache 2.0 / 智能体回原生交互界面 / 9.1）③ AlphaGenome 2 单细胞基因组模型（1.07 亿图谱 / 68 组织 / 8.9）④ 阿里 Qwen4-Max 预览版（8.8）⑤ xAI Grok Bot 1.0 进 Slack / Teams / 会议（8.6）⑥ 腾讯元宝搜索上线 + 曝字节造中国版 Muse（8.4）⑦ Anthropic IPO 认购数倍超额（904 亿融资 / 新增 114 亿云承诺 / 8.3）⑧ fal / Luma 换角不重拍（8.1）；评分均值 8.7',
  '- 阶段 1：AI HOT v1 `https://aihot.news/api/v1/items?mode=all&window=24h&limit=100`（浏览器 UA 必需，cursor 分页 page.nextCursor / page.hasMore，2 页各 100 条 / 共 200 条）+ aihot.news 热度榜 + 8 轮定向 WebSearch，候选池远超 ≥25 门槛',
  '- 查重拦截：Seedream 5.5（11-10 第 94 期 #3 已报）、Runway Praxis-1（10-01 期已报）、MiMo-V2.6（10-11 期已报）均剔除；Anthropic IPO 明确区分 11-11「启动路演」与 11-12「认购超额 + 904 亿 + 新增 114 亿云承诺」两个不同阶段并在正文写明',
  '- 阶段 3：复用 11-11 TOC 模板 head（截到 `</head>`）+ tail（从 `<button class="back-to-top"` 起），强制替换 `<title>`；生成脚本 `_gen_h5_20261112.js`；commit `acc11d1`（MD/H5/归档/脚本）push 成功，远端/本地 sha 比对一致',
  '- 阶段 4 强制关卡：今日 H5 首次 curl 404 → 跨日对照（11-11 H5 与 index 均 200，排除 Pages 全局故障）→ `gh run watch 43137235021` 36s success → curl 第 1 轮即 200 + WebFetch 二次确认（title=2026.11.12 / 第 96 期 / Issue 96 / 星期四 / 8 卡 / 8 nav-sub / 3 章节 / 32 chips / lead / ← 返回归档 / progressFill 全部 PASS，无 11.11 旧残留），方进入推群',
  '- 阶段 5：`publish-ai-daily-poster.js --date 20261112 --dry` 预检 + 单独 `push-poster.js --dry`（3 群 / config.local.json 凭据 / 209 字节 md2 单条）→ 实发一条龙全程无人工干预跑通；**修复 tagline 缺失**：海报 tagline 取 MD「## 编辑点评 → 一句话：」，今日 MD 初稿尾部写成「编辑说明」导致 `(未提取到)`，补齐 `## 编辑点评` 章节 + 一句话后重生成，圆角卡片正常显示；海报设计 DNA 与 H5 同源（暖纸底 #F2EEDF + 四色 + 半透白卡 rgba(255,255,255,0.55) + Cormorant Garamond 斜体数字 + 粉色 Hero）',
  '- 推送结果：Pages 第 6 次检测 200 → **3/3 群成功**（群 A + 群 B + 竞品视觉日报群），固定单条 `markdown_v2` 209/4096 字节 = 海报图 + 「点击看更多内容」；海报 PNG / H5 / 归档三公网 URL 均 200',
  '- Commits：`acc11d1`（MD/H5/归档/生成脚本）、`e6d32dd`（MD 编辑点评 / tagline 源）、`1331992`（海报 HTML+PNG），均 push 成功；`export PATH="/c/Program Files/GitHub CLI:$PATH"` 前置注入继续有效'
];

if (!s.endsWith('\n')) s += nl;
s += lines.join(nl) + nl;
fs.writeFileSync(p, s, 'utf8');
console.log('appended', lines.length, 'lines; total bytes =', fs.statSync(p).size);
console.log('newline style =', nl === '\r\n' ? 'CRLF' : 'LF');
