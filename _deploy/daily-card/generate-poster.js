#!/usr/bin/env node
/**
 * AIGC 日报海报生成器
 * 从 raw/daily-reports/AIGC_Daily_Report_YYYYMMDD.md 提取数据，生成海报 HTML
 *
 * Usage:
 *   node generate-poster.js                       # 最新日报，3:4 竖版（默认）
 *   node generate-poster.js --date 20260807       # 指定日期
 *   node generate-poster.js --ratio 16:9          # 16:9 横版
 *
 * 尺寸：3:4 → 1440×1920（单栏纵向）  |  16:9 → 1920×1080（左右双栏）
 * 视觉规范沿用 ai-weekly-poster 系列：暖色纸质底 + 四色圆点
 */

const fs = require('fs');
const path = require('path');

const WIKI_ROOT = path.resolve(__dirname, '..', '..');
const REPORTS_DIR = path.join(WIKI_ROOT, 'raw', 'daily-reports');
const OUT_DIR = path.join(WIKI_ROOT, 'docs', 'ai-daily');

const RATIOS = {
  '3:4':  { w: 1440, h: 1920, key: '3x4',  suffix: '' },
  '16:9': { w: 1920, h: 1080, key: '16x9', suffix: '-16x9' },
};

// ── 参数 ──────────────────────────────────────────
function parseArgs() {
  const args = process.argv.slice(2);
  let date = null;
  let ratio = '3:4';
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--date' && args[i + 1]) date = args[++i].replace(/-/g, '');
    else if (args[i] === '--ratio' && args[i + 1]) ratio = args[++i];
  }
  if (!RATIOS[ratio]) {
    console.error(`不支持的比例: ${ratio}（可选${Object.keys(RATIOS).join(' / ')}）`);
    process.exit(1);
  }
  if (!date) {
    const dates = fs.existsSync(REPORTS_DIR)
      ? fs.readdirSync(REPORTS_DIR)
          .map(f => (f.match(/^AIGC_Daily_Report_(\d{8})\.md$/) || [])[1])
          .filter(Boolean).sort().reverse()
      : [];
    date = dates[0];
    if (!date) {
      const t = new Date();
      date = `${t.getFullYear()}${String(t.getMonth() + 1).padStart(2, '0')}${String(t.getDate()).padStart(2, '0')}`;
    }
  }
  return { date, ratio };
}

// ── 从 MD 提取数据 ─────────────────────────────────
function extractData(mdContent) {
  const lines = mdContent.split('\n');
  const items = [];

  const tableStart = lines.findIndex(l => l.match(/^\|.*新闻标题/));
  if (tableStart >= 0) {
    for (let i = tableStart + 1; i < lines.length; i++) {
      const line = lines[i];
      if (!line.startsWith('|')) break;
      if (line.includes('---')) continue;
      const cells = line.split('|').filter(c => c.trim());
      if (cells.length >= 5) {
        const titleCell = cells[1].trim();
        const m = titleCell.match(/\[(.+?)\]/);
        items.push({
          num: cells[0].trim(),
          title: m ? m[1] : titleCell,
          source: cells[2].trim(),
          tags: cells[3].trim().split(/\s+/).filter(t => t.startsWith('#')).map(t => t.slice(1)),
          score: parseFloat(cells[4].trim()) || 0,
        });
      }
      if (items.length >= 8) break;
    }
  }

  // 评分回填：概览表「重要性」列是 P0/P1/P2，parseFloat 会得 0；从详情区「评分：X.X/10」提取真实分数
  const scoreRe = /###\s*#(\d+)[\s\S]*?评分[：:]\s*([\d.]+)/g;
  let sm;
  while ((sm = scoreRe.exec(mdContent)) !== null) {
    const num = sm[1];
    const score = parseFloat(sm[2]);
    const item = items.find(it => it.num === num);
    if (item && !Number.isNaN(score)) item.score = score;
  }

  // 副标题：MD 里通常没有独立副标题行，优先从同日 TOC HTML 的 .subtitle 提取
  let lead = '';
  const h1Idx = lines.findIndex(l => /^#\s/.test(l));
  if (h1Idx >= 0) {
    for (let i = h1Idx + 1; i < Math.min(h1Idx + 8, lines.length); i++) {
      const t = lines[i].trim();
      if (t && !t.startsWith('#') && !t.startsWith('|') && !t.startsWith('---') && !t.startsWith('>')) {
        lead = t.replace(/\*\*/g, '');
        break;
      }
    }
  }

  // 编辑点评里的「一句话：xxx」作为 tagline（兼容有无** 包裹）
  let tagline = '';
  const edIdx = lines.findIndex(l => l.startsWith('## 编辑点评'));
  if (edIdx >= 0) {
    const block = lines.slice(edIdx + 1, edIdx + 40).join('\n');
    const m = block.match(/一句话[：:]\s*\*{0,2}([^*\n。]{4,60}[。！]?)/);
    if (m) tagline = m[1].trim().replace(/[。]$/, '');
  }

  return { items, lead, tagline };
}

// 从同日 TOC HTML 提取副标题（比 MD 更可靠）
function extractLeadFromToc(date) {
  const tocPath = path.join(OUT_DIR, `ai-daily-card-${date}-toc.html`);
  if (!fs.existsSync(tocPath)) return '';
  const html = fs.readFileSync(tocPath, 'utf-8');
  const m = html.match(/<p\s+class="lead"[^>]*>([\s\S]*?)<\/p>/);
  if (!m) return '';
  return m[1]
    .replace(/<[^>]+>/g, '')
    .replace(/&middot;/g, '·')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&[a-z]+;/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

//高亮标题里的关键实体（模型名/数字）
function emphasize(title) {
  return title
    .replace(/(GPT-[\d.]+\w*|Astra|Luna|Sol|Grok [\d.]+|MiniMax H\d|Seedance [\d.]+|FLUX \d|Muse Spark [\d.]+|Discovery Loop|Taalas|HuggingFace|DeepSeek|Anthropic|Jeff Dean|Meta|AMD|GitHub|可灵4K)/g, '<b>$1</b>')
    .replace(/(\d+\s*亿[美元次]*|\d+\s*万亿|100 亿次)/g, '<b>$1</b>');
}

// ── 共用：字体与配色 ──────────────────────────────
const FONT_LINK = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Work+Sans:wght@300;400;500;600&family=Noto+Sans+SC:wght@300;400;500;700;900&family=Noto+Serif+SC:wght@300;400;500&display=swap" rel="stylesheet">`;

const PALETTE = `:root{--paper:#F2EEDF;--paper-2:#ECE6D2;--ink:#2A241B;--ink-soft:#5C5345;--pink:#E1A4C2;--lemon:#D6DD63;--blush:#E8C9B6;--sage:#B7C7A8;--lilac:#C9BEDC}`;

function metaBits(date, items) {
  const y = date.slice(0, 4), m = date.slice(4, 6), d = date.slice(6, 8);
  return {
    y, m, d,
    dateFmt: `${y}.${m}.${d}`,
    weekday: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][new Date(+y, +m - 1, +d).getDay()],
    avg: items.length ? (items.reduce((s, i) => s + i.score, 0) / items.length).toFixed(1) : '—',
  };
}

function trimLead(lead, max) {
  if (!lead) return '今日 AI 要闻速览';
  return lead.length > max ? lead.slice(0, max - 2).replace(/[，。、·\s]+$/, '') + '…' : lead;
}

// ── 3:4竖版 (1440×1920) · 对齐 AI Daily H5 风格 ───
// 暖纸底 + 半透白卡 + 四色系 + 斜体数字 + data chips
function buildHTML34({ date, items, lead, tagline }) {
  const { dateFmt, weekday, avg } = metaBits(date, items);
  const leadHtml = trimLead(lead, 74);

  const hero = items[0];
  const seconds = items.slice(1, 3);
  const listed = items.slice(3, 8);

  // Hero card: 粉底色 + 大号斜体数字 + 标题 + tag pill
  const heroCardHtml = hero ? `<div class="hero-highlight">
    <div class="hero-card">
      <div class="hc-num">01</div>
      <div class="hc-body">
        <div class="hc-title">${emphasize(hero.title)}</div>
        <div class="hc-row">
          <span class="hc-tag">${hero.tags[0] || hero.source}</span>
          <span class="hc-score">${hero.score.toFixed(1)}</span>
        </div>
      </div>
    </div>
  </div>` : '';

  // Secondary cards: 半透白卡
  const secNums = ['02', '03'];
  const secondHtml = seconds.map((it, i) => `<div class="sec-card">
    <span class="sec-num">${secNums[i]}</span>
    <span class="sec-title">${emphasize(it.title)}</span>
    <span class="sec-tag">${it.tags[0] || it.source}</span>
  </div>`).join('\n');

  // List items
  const listHtml = listed.map((it, i) => `<div class="list-item">
    <span class="list-num">${String(i + 4).padStart(2, '0')}</span>
    <span class="list-title">${it.title}</span>
    <span class="list-score">${it.score.toFixed(1)}</span>
  </div>`).join('\n');

  // Data chips
  const chips = [
    { label: '精选', value: `${items.length} 条` },
    { label: '均分', value: avg },
    { label: '日期', value: dateFmt },
    { label: '周几', value: weekday },
  ];
  const chipHtml = chips.map(c => `<div class="chip"><span class="chip-label">${c.label}</span><span class="chip-value">${c.value}</span></div>`).join('\n');

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>AIGC 日报 · ${dateFmt} · 海报</title>
${FONT_LINK}
<style>
:root{--paper:#F2EEDF;--paper-2:#ECE6D2;--ink:#2A241B;--ink-soft:#5C5345;--ink-faint:rgba(42,36,27,0.35);--pink:#E1A4C2;--lemon:#D6DD63;--blush:#E8C9B6;--sage:#B7C7A8;--lilac:#C9BEDC;--card-bg:rgba(255,255,255,0.55);--border:rgba(42,36,27,0.14);--border-strong:rgba(42,36,27,0.3)}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1440px;height:1920px;background:var(--paper);color:var(--ink);font-family:"Work Sans","Noto Sans SC",system-ui,sans-serif;font-weight:300;overflow:hidden;position:relative;-webkit-font-smoothing:antialiased}

.poster{position:relative;z-index:1;width:100%;height:100%;display:flex;flex-direction:column}

/* ── Header 区（对齐 H5 .header）── */
.header{padding:72px 96px 0}
.header-kicker{font-family:"Cormorant Garamond",serif;font-style:italic;font-size:28px;color:var(--ink-soft);margin-bottom:18px;letter-spacing:0.01em}
.header-row{display:flex;align-items:flex-start;justify-content:space-between}
.header h1{font-family:"Cormorant Garamond","Noto Serif SC",serif;font-weight:500;font-size:110px;line-height:0.92;letter-spacing:-0.015em;color:var(--ink)}
.header h1 em{font-style:italic;font-weight:400}
.lead{font-family:"Noto Sans SC",sans-serif;font-size:26px;font-weight:400;line-height:1.55;color:var(--ink-soft);max-width:980px;margin-top:18px}
.header-meta{display:flex;gap:20px;margin-top:28px;padding-top:24px;border-top:1px solid var(--border)}
.header-meta span{font-family:"Work Sans",sans-serif;font-size:18px;font-weight:400;color:var(--ink-soft);letter-spacing:0.04em}
.header-meta b{font-weight:500;color:var(--ink)}

/* Swatches（对齐 H5 .swatches）*/
.swatches{display:flex;gap:16px;padding-top:6px}
.swatches i{width:36px;height:36px;border-radius:50%;display:block}

/* ── Hero Highlight 区（对齐 H5 .section-highlight）── */
.hero-highlight{background:var(--pink);margin:40px 0 0;padding:48px 96px}
.hero-card{background:rgba(255,255,255,0.7);border-radius:28px;padding:40px 44px;display:flex;align-items:center;gap:36px}
.hc-num{font-family:"Cormorant Garamond",serif;font-style:italic;font-size:90px;line-height:0.85;color:var(--ink);flex-shrink:0}
.hc-body{flex:1;display:flex;flex-direction:column;gap:16px}
.hc-title{font-family:"Noto Sans SC",sans-serif;font-size:38px;font-weight:600;line-height:1.35;color:var(--ink)}
.hc-title b{font-weight:700;color:var(--ink)}
.hc-row{display:flex;align-items:center;gap:16px}
.hc-tag{font-family:"Work Sans",sans-serif;font-size:16px;font-weight:400;letter-spacing:0.06em;color:var(--ink-soft);padding:6px 16px;border-radius:999px;background:var(--paper-2)}
.hc-score{font-family:"Work Sans",sans-serif;font-size:16px;color:var(--ink-soft);letter-spacing:0.04em;margin-left:auto}

/* ── Secondary Cards ── */
.secondary-section{display:grid;grid-template-columns:1fr 1fr;gap:20px;padding:36px 96px 0}
.sec-card{background:var(--card-bg);border-radius:28px;padding:28px 32px;display:flex;align-items:center;gap:22px}
.sec-num{font-family:"Cormorant Garamond",serif;font-style:italic;font-size:48px;line-height:1;color:var(--ink);flex-shrink:0;width:60px;text-align:center}
.sec-title{font-family:"Noto Sans SC",sans-serif;font-size:24px;font-weight:600;line-height:1.45;color:var(--ink);flex:1}
.sec-title b{font-weight:700}
.sec-tag{font-family:"Work Sans",sans-serif;font-size:15px;color:var(--ink-soft);padding:5px 14px;border-radius:999px;background:var(--paper-2);flex-shrink:0}

/* ── List ── */
.list-section{padding:28px 96px 0;flex:1;display:flex;flex-direction:column}
.list-header{font-family:"Cormorant Garamond",serif;font-style:italic;font-size:20px;color:var(--ink-soft);margin-bottom:6px;letter-spacing:0.02em}
.list-items{display:flex;flex-direction:column;flex:1}
.list-item{display:flex;align-items:center;gap:18px;padding:18px 0;border-bottom:1px solid var(--border)}
.list-item:last-child{border-bottom:none}
.list-num{font-family:"Cormorant Garamond",serif;font-style:italic;font-size:22px;color:var(--ink);width:40px;flex-shrink:0;opacity:0.45}
.list-title{font-family:"Noto Sans SC",sans-serif;font-size:23px;font-weight:400;line-height:1.4;color:var(--ink);flex:1}
.list-score{font-family:"Work Sans",sans-serif;font-size:18px;color:var(--ink-soft);letter-spacing:0.04em}

/* ── Data Chips（对齐 H5 .data-strip）── */
.data-strip{display:flex;gap:20px;padding:36px 96px 0}
.chip{flex:1;border-radius:20px;padding:22px 20px;text-align:center;display:flex;flex-direction:column;gap:6px}
.chip:nth-child(1){background:var(--pink)}
.chip:nth-child(2){background:var(--lemon)}
.chip:nth-child(3){background:var(--blush)}
.chip:nth-child(4){background:var(--sage)}
.chip-label{font-family:"Cormorant Garamond",serif;font-style:italic;font-size:18px;color:var(--ink);opacity:0.6}
.chip-value{font-family:"Cormorant Garamond",serif;font-size:36px;font-weight:500;color:var(--ink)}

/* ── 底部（对齐 H5 .edit-note + .footer）── */
.bottom-section{padding:36px 96px 64px;margin-top:auto}
.tagline{background:var(--paper-2);border-radius:20px;padding:28px 32px;margin-bottom:28px}
.tagline p{font-family:"Cormorant Garamond","Noto Serif SC",serif;font-size:28px;font-weight:500;color:var(--ink);line-height:1.5;margin:0}
.footer{display:flex;justify-content:space-between;align-items:center;padding-top:20px;border-top:1px solid var(--border)}
.footer-left{font-family:"Cormorant Garamond",serif;font-style:italic;font-size:20px;color:var(--ink-soft)}
.footer-right{font-family:"Work Sans",sans-serif;font-size:16px;color:var(--ink-faint)}
</style>
</head>
<body>
  <div class="poster">
    <div class="header">
      <div class="header-kicker">AI Daily Report · ${dateFmt} · ${weekday}</div>
      <div class="header-row">
        <h1>AIGC <em>日报</em></h1>
        <div class="swatches">
          <i style="background:var(--pink)"></i>
          <i style="background:var(--lemon)"></i>
          <i style="background:var(--blush)"></i>
          <i style="background:var(--sage)"></i>
        </div>
      </div>
      <p class="lead">${leadHtml}</p>
      <div class="header-meta">
        <span>精选 <b>${items.length}</b> 条</span>
        <span>均分 <b>${avg}</b></span>
      </div>
    </div>

    ${heroCardHtml}

    <div class="secondary-section">
${secondHtml}
    </div>

    <div class="list-section">
      <div class="list-header">Also today</div>
      <div class="list-items">
${listHtml}
      </div>
    </div>

    <div class="data-strip">
${chipHtml}
    </div>

    <div class="bottom-section">
${tagline ? `      <div class="tagline"><p>${tagline}</p></div>` : ''}
      <div class="footer">
        <span class="footer-left">小柒AI速递 · 每日上午推送</span>
        <span class="footer-right">catwang-llm-wiki</span>
      </div>
    </div>
  </div>
</body>
</html>
`;
}

// ── 16:9 横版 (1920×1080) ─────────────────────────
function buildHTML169({ date, items, lead, tagline }) {
  const { dateFmt, weekday, m, d, avg } = metaBits(date, items);
  const top4 = items.slice(0, 4);
  const rest = items.slice(4);
  const leadHtml = trimLead(lead, 58);

  const cards = top4.map(it => `<div class="highlight-card">
        <div class="hl-head"><span class="hl-label">${it.tags[0] || it.source}</span><span class="hl-score">${it.score.toFixed(1)}</span></div>
        <div class="hl-body">${emphasize(it.title)}</div>
      </div>`).join('\n');

  const restList = rest.map(it =>
    `        <li><span class="ri-num">${it.num}</span><span class="ri-title">${it.title}</span><span class="ri-score">${it.score.toFixed(1)}</span></li>`
  ).join('\n');

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>AIGC 日报 · ${dateFmt} · 海报</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Work+Sans:wght@300;400;500;600&family=Noto+Sans+SC:wght@300;400;500;700;900&family=Noto+Serif+SC:wght@300;400;500&display=swap" rel="stylesheet">
<style>
:root{--paper:#F2EEDF;--paper-2:#ECE6D2;--ink:#2A241B;--ink-soft:#5C5345;--pink:#E1A4C2;--lemon:#D6DD63;--blush:#E8C9B6;--sage:#B7C7A8;--lilac:#C9BEDC}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1920px;height:1080px;background:var(--paper);color:var(--ink);font-family:"Work Sans","Noto Sans SC",system-ui,sans-serif;overflow:hidden;position:relative}

.bg-circle{position:absolute;border-radius:50%;opacity:0.35;z-index:0}
.bg-c1{width:480px;height:480px;background:var(--pink);top:-130px;right:-90px}
.bg-c2{width:320px;height:320px;background:var(--lemon);bottom:-70px;left:-50px}
.bg-c3{width:220px;height:220px;background:var(--blush);bottom:190px;right:300px}
.bg-c4{width:160px;height:160px;background:var(--sage);top:110px;left:360px}

.poster{position:relative;z-index:1;width:100%;height:100%;display:grid;grid-template-columns:1fr 1fr;padding:78px 100px;gap:66px}

.left{display:flex;flex-direction:column;gap:26px}
.kicker{font-family:"Cormorant Garamond",serif;font-style:italic;font-size:22px;color:var(--ink-soft)}
.left h1{font-family:"Cormorant Garamond","Noto Serif SC",serif;font-weight:500;font-size:104px;line-height:0.94;letter-spacing:-0.02em}
.left h1 em{font-style:italic;font-weight:400}
.lead{font-family:"Noto Sans SC",sans-serif;font-size:27px;font-weight:500;line-height:1.5;max-width:600px}
.meta-row{display:flex;gap:14px;flex-wrap:wrap;margin-top:2px}
.meta-chip{font-family:"Work Sans",sans-serif;font-size:16px;color:var(--ink-soft);padding:6px 16px;border:1px solid rgba(42,36,27,0.2);border-radius:999px;background:rgba(255,255,255,0.5)}

.rest{margin-top:6px;border-top:1px solid rgba(42,36,27,0.14);padding-top:18px}
.rest-title{font-family:"Cormorant Garamond",serif;font-style:italic;font-size:17px;color:var(--ink-soft);margin-bottom:10px}
.rest ul{list-style:none;display:flex;flex-direction:column;gap:7px}
.rest li{display:flex;align-items:baseline;gap:11px;font-family:"Noto Sans SC",sans-serif;font-size:16px;color:var(--ink-soft);line-height:1.45}
.ri-num{font-family:"Cormorant Garamond",serif;font-size:16px;color:var(--ink);opacity:0.5;min-width:15px}
.ri-title{flex:1}
.ri-score{font-family:"Work Sans",sans-serif;font-size:14px;color:var(--ink);opacity:0.45}

.footer-line{margin-top:auto;font-family:"Cormorant Garamond",serif;font-style:italic;font-size:20px;color:var(--ink-soft)}

.right{display:flex;flex-direction:column;justify-content:center;gap:17px}
.highlight-card{border-radius:24px;padding:23px 28px;display:flex;flex-direction:column;gap:7px}
.highlight-card:nth-child(1){background:var(--pink)}
.highlight-card:nth-child(2){background:var(--lemon)}
.highlight-card:nth-child(3){background:var(--blush)}
.highlight-card:nth-child(4){background:var(--sage)}
.hl-head{display:flex;align-items:center;justify-content:space-between;gap:12px}
.hl-label{font-family:"Cormorant Garamond",serif;font-style:italic;font-size:16px;color:var(--ink);opacity:0.62}
.hl-score{font-family:"Work Sans",sans-serif;font-size:15px;font-weight:500;color:var(--ink);opacity:0.55;background:rgba(255,255,255,0.45);padding:2px 11px;border-radius:999px}
.hl-body{font-family:"Noto Sans SC",sans-serif;font-size:19px;font-weight:400;line-height:1.55;color:var(--ink)}
.hl-body b{font-weight:700}

.tagline-card{border-radius:20px;padding:19px 24px;background:rgba(255,255,255,0.55);border-left:4px solid var(--pink);margin-top:3px}
.tagline-card p{font-family:"Noto Sans SC",sans-serif;font-size:18px;font-weight:500;color:var(--ink);line-height:1.6}

.swatches{position:absolute;right:100px;top:78px;display:flex;gap:12px;z-index:2}
.swatches i{width:28px;height:28px;border-radius:50%;display:block}
</style>
</head>
<body>
  <div class="bg-circle bg-c1"></div>
  <div class="bg-circle bg-c2"></div>
  <div class="bg-circle bg-c3"></div>
  <div class="bg-circle bg-c4"></div>

  <div class="swatches">
    <i style="background:var(--pink)"></i>
    <i style="background:var(--lemon)"></i>
    <i style="background:var(--blush)"></i>
    <i style="background:var(--sage)"></i>
  </div>

  <div class="poster">
    <div class="left">
      <div class="kicker">AI Daily Report · ${dateFmt} · ${weekday}</div>
      <h1>AIGC<br><em>日报</em></h1>
      <p class="lead">${leadHtml}</p>
      <div class="meta-row">
        <span class="meta-chip">精选 ${items.length} 条</span>
        <span class="meta-chip">均分 ${avg}</span>
        <span class="meta-chip">${m}.${d}</span>
      </div>
      <div class="rest">
        <div class="rest-title">Also today</div>
        <ul>
${restList}
        </ul>
      </div>
      <div class="footer-line">小柒AI速递 · 每日上午推送</div>
    </div>

    <div class="right">
${cards}
${tagline ? `      <div class="tagline-card"><p>${tagline}</p></div>` : ''}
    </div>
  </div>
</body>
</html>
`;
}

// ── 主流程 ────────────────────────────────────────
function main() {
  const { date, ratio } = parseArgs();
  const spec = RATIOS[ratio];
  const mdPath = path.join(REPORTS_DIR, `AIGC_Daily_Report_${date}.md`);

  if (!fs.existsSync(mdPath)) {
    console.error(`找不到日报 MD: AIGC_Daily_Report_${date}.md`);
    process.exit(1);
  }

  const data = extractData(fs.readFileSync(mdPath, 'utf-8'));
  if (data.items.length === 0) {
    console.error('未能从 MD 提取到条目，请检查概览表格格式');
    process.exit(1);
  }

  // 副标题优先用 TOC HTML 的（更贴合当日主题）
  const tocLead = extractLeadFromToc(date);
  if (tocLead) data.lead = tocLead;

  console.log(`比例: ${ratio} (${spec.w}×${spec.h})`);
  console.log(`副标题: ${data.lead || '(兜底文案)'}`);
  console.log(`Tagline: ${data.tagline || '(未提取到)'}`);

  const html = ratio === '3:4'
    ? buildHTML34({ date, ...data })
    : buildHTML169({ date, ...data });

  const fileName = `ai-daily-poster-${date}${spec.suffix}.html`;
  const outPath = path.join(OUT_DIR, fileName);
  fs.writeFileSync(outPath, html, 'utf-8');

  console.log(`海报 HTML: ${path.relative(WIKI_ROOT, outPath).replace(/\\/g, '/')}`);
  console.log(ratio === '3:4'
    ? `布局: 纵向单栏| ${data.items.length} 条全部上彩卡`
    : `布局: 左右双栏 | TOP4 上彩卡 | 其余 ${data.items.length - 4} 条列表`);
  console.log(`\n下一步截图:\n  node screenshot-poster.js --html docs/ai-daily/${fileName}`);
}

main();
