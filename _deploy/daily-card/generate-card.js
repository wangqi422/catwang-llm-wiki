#!/usr/bin/env node
/**
 * AI Daily Card Generator
 * 从 AIGC_Daily_Report_YYYYMMDD.md 自动提取 TOP10 并生成 1080×1920 满屏卡片
 * 
 * Usage:
 *   node generate-card.js <path-to-daily-report.md> [--output <dir>]
 *   node generate-card.js                           # 自动查找最新日报
 *   node generate-card.js --all                     # 生成所有日报卡片
 */

const fs = require('fs');
const path = require('path');

// ─── 配置 ───
const WIKI_ROOT = path.resolve(__dirname, '../../');
const RAW_DIR = path.join(WIKI_ROOT, 'raw', 'daily-reports');
const OUTPUT_DIR = path.join(WIKI_ROOT, 'docs', 'ai-daily');

const WEEKDAY_CN = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
const WEEKDAY_EN = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

// ─── 颜色主题（每日轮换） ───
const COVER_GRADIENTS = [
  'linear-gradient(135deg, #6940a5 0%, #2383e2 40%, #0f7b6c 80%, #d44c47 100%)',
  'linear-gradient(135deg, #d44c47 0%, #e8590c 30%, #d9730d 60%, #dfab01 100%)',
  'linear-gradient(135deg, #0f7b6c 0%, #2383e2 40%, #6940a5 80%, #d44c47 100%)',
  'linear-gradient(135deg, #2383e2 0%, #6940a5 40%, #d44c47 80%, #e8590c 100%)',
  'linear-gradient(135deg, #d9730d 0%, #dfab01 30%, #0f7b6c 60%, #2383e2 100%)',
  'linear-gradient(135deg, #6940a5 0%, #d44c47 40%, #e8590c 80%, #d9730d 100%)',
  'linear-gradient(135deg, #0f7b6c 0%, #dfab01 40%, #d9730d 80%, #d44c47 100%)',
];

const HL_COLORS = ['hl', 'hl-red', 'hl-purple', 'hl-orange', 'hl-teal'];
const DV_COLORS = ['dv-red', 'dv-purple', 'dv-blue', 'dv-teal', 'dv-orange'];
const NUM_STYLES = ['num-hot', 'num-feat', 'num-default'];

// ─── 解析日报 MD ───
function parseDailyReport(mdContent, filePath) {
  const lines = mdContent.split('\n');
  
  // 提取日期
  const dateMatch = filePath.match(/(\d{4})(\d{2})(\d{2})/);
  const year = dateMatch ? dateMatch[1] : '2026';
  const month = dateMatch ? dateMatch[2] : '04';
  const day = dateMatch ? dateMatch[3] : '01';
  const dateObj = new Date(`${year}-${month}-${day}`);
  const weekdayCN = WEEKDAY_CN[dateObj.getDay()];
  const weekdayEN = WEEKDAY_EN[dateObj.getDay()];

  // 提取 TOP N 条目
  const items = [];
  let i = 0;
  while (i < lines.length) {
    const headingMatch = lines[i].match(/^###\s+#(\d+)(?:\s+⭐)?\s+(.+)/);
    if (headingMatch) {

      const num = parseInt(headingMatch[1]);
      const rawTitle = headingMatch[2].trim();
      
      // 找三句话摘要
      let summaryLines = [];
      let j = i + 1;
      let inSummary = false;
      while (j < lines.length && !lines[j].match(/^###\s+#\d+(?:\s+⭐)?\s+/)) {

        if (lines[j].includes('三句话摘要')) {
          inSummary = true;
          j++;
          continue;
        }
        if (inSummary) {
          const summaryLine = lines[j].match(/^\d+\.\s+(.+)/);
          if (summaryLine) {
            summaryLines.push(summaryLine[1].trim());
          } else if (lines[j].match(/^\*\*[🔥🎨📋]/)) {
            break;
          }
        }
        j++;
      }

      // 提取加权总分
      let score = 0;
      for (let k = i; k < j && k < lines.length; k++) {
        const scoreMatch = lines[k].match(/\*\*(?:加权总分|综合评分)\*\*\s*\|\s*\*\*(\d+\.?\d*)\/10\*\*/);
        if (scoreMatch) {
          score = parseFloat(scoreMatch[1]);
          break;
        }
      }

      // 提取主题标签
      let tags = [];
      for (let k = i; k < Math.min(i + 15, lines.length); k++) {
        const tagMatch = lines[k].match(/\| \*\*主题标签\*\* \| (.+) \|/);
        if (tagMatch) {
          tags = tagMatch[1].match(/#[^\s`]+/g) || [];
          tags = tags.map(t => t.replace(/`/g, ''));
          break;
        }
      }

      items.push({
        num,
        title: rawTitle,
        summary: summaryLines[0] || '',
        score,
        tags,
      });

      i = j;
    } else {
      i++;
    }
  }

  // 提取关键趋势总结标题
  const trends = [];
  for (let k = 0; k < lines.length; k++) {
    const trendMatch = lines[k].match(/^###\s+\d+\.\s+(.+)/);
    if (trendMatch && lines[k - 2]?.includes('关键趋势总结')) {
      // Skip, we'll just use data strip for highlights
    }
  }

  return {
    year, month, day, weekdayCN, weekdayEN, dateObj,
    items,
    itemCount: items.length,
  };
}

// ─── 生成卡片标题（从 items 中提炼关键词） ───
function extractKeyHighlight(item) {
  // 从标题中提取产品/工具名
  const title = item.title;
  // 匹配中英文混合的产品名
  const productMatch = title.match(/^([A-Za-z0-9\s.+\-]+(?:\s+V?\d+\.?\d*)?)/);
  if (productMatch) return productMatch[1].trim();
  // 中文开头的
  const cnMatch = title.match(/^(.{2,8})[：:]/);
  if (cnMatch) return cnMatch[1];
  return title.substring(0, 15);
}

// ─── 智能分类 ───
function categorizeItems(items) {
  const categories = {
    video: { emoji: '🎬', label: 'AI 视频生成', items: [] },
    image: { emoji: '🖼️', label: 'AI 图像 & 设计', items: [] },
    agent: { emoji: '🤖', label: 'AI Agent & 平台', items: [] },
    '3d_audio': { emoji: '🎮', label: '3D/音频 & 工具', items: [] },
    industry: { emoji: '🔥', label: '行业趋势 & 大事', items: [] },
  };

  const videoKW = /视频|video|film|movie|stream|动画|anime|MV|短剧|Sora|Runway|Kling|可灵|Seedance|即梦|Pika|HappyHorse|Wan\d|Veo|LTX|Lightricks|AnimeDiff|CogVideo/i;
  const imageKW = /图像|image|图片|生图|出图|Midjourney|DALL|Flux|Recraft|Firefly|GLM.?Image|Nano.?Banana|Ideogram|Stable.?Diffusion|海报|LOGO|矢量|SVG|品牌设计/i;
  const agentKW = /Agent|Claude|GPT|Muse|Computer.?Use|Cowork|MCP|A2A|LLM|大模型|多模态|框架|Platform|平台|Protocol|Lovart|设计Agent/i;
  const tdKW = /3D|三维|Unity|Unreal|UE|Hitem|渲染|Render|DLSS|Reallusion|音频|Audio|音乐|Music|Beat|VR|AR|游戏引擎/i;

  for (const item of items) {
    const text = item.title + ' ' + item.summary + ' ' + item.tags.join(' ');
    if (videoKW.test(text)) {
      categories.video.items.push(item);
    } else if (imageKW.test(text)) {
      categories.image.items.push(item);
    } else if (tdKW.test(text)) {
      categories['3d_audio'].items.push(item);
    } else if (agentKW.test(text)) {
      categories.agent.items.push(item);
    } else {
      categories.industry.items.push(item);
    }
  }

  // 只返回有内容的分类
  return Object.values(categories).filter(c => c.items.length > 0);
}

// ─── 生成新闻条目标题 HTML（带高亮） ───
function formatNewsTitle(item, globalNum) {
  let title = item.title;
  // 先转义 HTML
  title = title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  
  // 提取产品名高亮
  const hlColor = HL_COLORS[globalNum % HL_COLORS.length];
  
  // 匹配英文产品名（开头）
  const engProduct = title.match(/^([A-Za-z0-9\s.+\-&amp;]+(?:\s+V?\d+\.?\d*\s*(?:Alpha|Beta|Pro|GA|Omni)?)?)/);
  if (engProduct && engProduct[1].trim().length > 2) {
    const product = engProduct[1].trim();
    title = `<span class="${hlColor}">${product}</span>${title.substring(engProduct[1].length)}`;
  } else {
    // 尝试高亮 ：前面的部分
    const cnSplit = title.match(/^(.+?)[：:—–]/);
    if (cnSplit) {
      title = `<span class="${hlColor}">${cnSplit[1]}</span>${title.substring(cnSplit[1].length)}`;
    }
  }

  // 如果分数 >= 8.5 或排名 <= 2，加🔥标签
  if (item.score >= 8.8 || item.num <= 1) {
    title += '<span class="inline-tag tag-red">🔥</span>';
  }

  return title;
}

// ─── 生成描述（从三句话摘要中裁剪） ───
function formatDesc(item) {
  let desc = item.summary;
  if (!desc) return '';
  // 去除 markdown 格式
  desc = desc.replace(/\*\*/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  // 限制长度（约 45 个中文字符）
  if (desc.length > 55) {
    desc = desc.substring(0, 52) + '…';
  }
  return desc.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ─── 生成 Data Strip（取 TOP 5 关键数据点） ───
function generateDataStrip(items) {
  const dataPoints = [];
  for (const item of items.slice(0, 8)) {
    const highlight = extractKeyHighlight(item);
    // 从摘要中提取关键数值
    const numMatch = item.summary.match(/(\$[\d.]+[亿万BM]?|\d+[KkBbMm亿万]+|\d+%|\d+[FfPpKk]+(?:\/\d+[Pp])?|#\d+|[\d.]+\/10)/);
    let value = '';
    if (item.score >= 9) value = '⭐ ' + item.score;
    else if (numMatch) value = numMatch[1];
    else value = item.score >= 8 ? '★ ' + item.score : '↑ TOP' + item.num;

    if (highlight.length <= 12 && dataPoints.length < 5) {
      dataPoints.push({
        label: highlight.length > 8 ? highlight.substring(0, 8) : highlight,
        value: value,
        color: DV_COLORS[dataPoints.length % DV_COLORS.length],
      });
    }
  }
  // 确保至少 5 个
  while (dataPoints.length < 5 && dataPoints.length < items.length) {
    const item = items[dataPoints.length];
    dataPoints.push({
      label: 'TOP ' + item.num,
      value: item.score ? item.score + '分' : '—',
      color: DV_COLORS[dataPoints.length % DV_COLORS.length],
    });
  }
  return dataPoints.slice(0, 5);
}

// ─── 生成 HTML ───
function generateHTML(data) {
  const { year, month, day, weekdayCN, weekdayEN, dateObj, items, itemCount } = data;
  const coverGradient = COVER_GRADIENTS[dateObj.getDay() % COVER_GRADIENTS.length];
  const categories = categorizeItems(items);
  const dataPoints = generateDataStrip(items);

  // 收集所有 hashtag
  const allTags = [];
  for (const item of items.slice(0, 8)) {
    const name = extractKeyHighlight(item).replace(/\s+/g, '');
    if (name.length <= 12 && !allTags.includes('#' + name)) {
      allTags.push('#' + name);
    }
  }

  // 根据条目数量动态调整尺寸 —— 目标：精确撑满 1920px
  const totalItems = items.length;
  const sectionCount = categories.length;
  
  // 精确计算各区域高度预算
  // Cover + Header(icon+title+subtitle+tags+border) + DataStrip + BottomBar + Footer
  // 然后剩余全部给 section-headings + news-items
  
  let coverHeight, titleSize, descSize, headerPadTop, headerPadBot, sectionMarginTop;
  let itemPaddingV, dataStripMarginTop, dataStripPadding, bottomPad, footerHeight;
  
  if (totalItems <= 10) {
    // 10 条：大字号 + 大间距 + 高 cover → 撑满 1920px
    coverHeight = 160;
    titleSize = 21;
    descSize = 14.5;
    headerPadTop = 18;
    headerPadBot = 20;
    sectionMarginTop = 26;
    itemPaddingV = 20;
    dataStripMarginTop = 22;
    dataStripPadding = 16;
    bottomPad = 12;
    footerHeight = 58;
  } else if (totalItems <= 15) {
    coverHeight = 150;
    titleSize = 18.5;
    descSize = 13.5;
    headerPadTop = 14;
    headerPadBot = 16;
    sectionMarginTop = 18;
    itemPaddingV = 11;
    dataStripMarginTop = 16;
    dataStripPadding = 12;
    bottomPad = 8;
    footerHeight = 54;
  } else {
    // 16+ 条：紧凑排版
    coverHeight = 140;
    titleSize = 17;
    descSize = 12.5;
    headerPadTop = 12;
    headerPadBot = 14;
    sectionMarginTop = 16;
    itemPaddingV = 9;
    dataStripMarginTop = 14;
    dataStripPadding = 10;
    bottomPad = 6;
    footerHeight = 50;
  }

  // 生成新闻列表 HTML
  let globalNum = 0;
  let sectionsHTML = '';
  for (const cat of categories) {
    sectionsHTML += `
    <div class="section-heading"><span class="sec-emoji">${cat.emoji}</span>${cat.label}</div>
    <div class="news-list">`;
    for (const item of cat.items) {
      globalNum++;
      const numStyle = item.num <= 1 ? 'num-hot' : item.num <= 3 ? 'num-feat' : 'num-default';
      sectionsHTML += `
      <div class="news-item">
        <div class="news-num ${numStyle}">${globalNum}</div>
        <div class="news-content">
          <div class="news-title">${formatNewsTitle(item, globalNum)}</div>
          <div class="news-desc">${formatDesc(item)}</div>
        </div>
      </div>`;
    }
    sectionsHTML += `
    </div>`;
  }

  // Data Strip HTML
  let dataStripHTML = '';
  for (const dp of dataPoints) {
    dataStripHTML += `
      <div class="data-cell">
        <div class="data-label">${dp.label}</div>
        <div class="data-value ${dp.color}">${dp.value}</div>
      </div>`;
  }

  // Bottom tags HTML
  const bottomTagsHTML = allTags.slice(0, 8).map(t => `<span class="bottom-tag">${t}</span>`).join('\n        ');

  // 分类标签
  const tagColors = ['tag-purple', 'tag-blue', 'tag-teal', 'tag-red', 'tag-pink', 'tag-orange', 'tag-green'];
  const propTagsHTML = categories.map((c, i) =>
    `<span class="notion-tag ${tagColors[i % tagColors.length]}">${c.emoji} ${c.label.split('·')[0].trim()}</span>`
  ).join('\n        ');

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=1080">
<title>AI Daily · 设计师速报 · ${year}.${month}.${day}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Noto+Sans+SC:wght@400;500;700;900&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  html, body {
    width: 1080px;
    overflow: hidden;
    font-family: 'Inter', 'Noto Sans SC', ui-sans-serif, -apple-system, sans-serif;
    -webkit-font-smoothing: antialiased;
    background: #ffffff;
    color: rgb(55, 53, 47);
  }

  .page {
    width: 1080px;
    height: 1920px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
  }

  /* ── Cover ── */
  .cover {
    height: ${coverHeight}px;
    background: ${coverGradient};
    /* items: ${totalItems}, sections: ${sectionCount} */
    position: relative;
    flex-shrink: 0;
  }

  .cover::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 15% 60%, rgba(255,255,255,0.2) 0%, transparent 55%),
      radial-gradient(ellipse at 85% 30%, rgba(255,255,255,0.12) 0%, transparent 50%);
  }

  .cover-badge {
    position: absolute;
    top: 22px;
    right: 48px;
    font-size: 12px;
    font-weight: 700;
    color: rgba(255,255,255,0.5);
    letter-spacing: 5px;
    text-transform: uppercase;
  }

  .cover-date {
    position: absolute;
    bottom: 18px;
    right: 48px;
    font-size: 13px;
    font-weight: 500;
    color: rgba(255,255,255,0.4);
    letter-spacing: 1px;
  }

  /* ── Content ── */
  .content {
    flex: 1;
    padding: 0 48px;
    padding-bottom: 6px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  /* ── Header ── */
  .header {
    padding-top: ${headerPadTop}px;
    padding-bottom: ${headerPadBot}px;
    border-bottom: 1.5px solid rgb(233, 233, 231);
    flex-shrink: 0;
  }

  .page-icon {
    font-size: 44px;
    margin-top: -38px;
    margin-bottom: 5px;
    filter: drop-shadow(0 2px 6px rgba(0,0,0,0.1));
  }

  .page-title {
    font-size: 42px;
    font-weight: 900;
    color: rgb(55, 53, 47);
    letter-spacing: -1.5px;
    line-height: 1.15;
  }

  .page-subtitle {
    font-size: 14.5px;
    color: rgba(55, 53, 47, 0.4);
    font-weight: 400;
    margin-top: 4px;
  }

  .prop-tags {
    display: flex;
    gap: 7px;
    flex-wrap: wrap;
    margin-top: 12px;
  }

  .notion-tag {
    display: inline-flex;
    align-items: center;
    padding: 2px 10px;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 600;
    line-height: 20px;
    white-space: nowrap;
  }

  .tag-blue    { background: rgb(211, 229, 239); color: rgb(24, 51, 71); }
  .tag-purple  { background: rgb(232, 222, 238); color: rgb(65, 36, 84); }
  .tag-green   { background: rgb(219, 237, 219); color: rgb(28, 56, 41); }
  .tag-orange  { background: rgb(250, 222, 201); color: rgb(73, 41, 14); }
  .tag-red     { background: rgb(255, 226, 221); color: rgb(93, 23, 21); }
  .tag-pink    { background: rgb(245, 224, 233); color: rgb(76, 35, 55); }
  .tag-teal    { background: rgb(211, 229, 226); color: rgb(15, 49, 44); }

  /* ── Section Heading ── */
  .section-heading {
    font-size: 14px;
    font-weight: 700;
    color: rgba(55, 53, 47, 0.45);
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-top: ${sectionMarginTop}px;
    margin-bottom: 6px;
    padding-bottom: 7px;
    border-bottom: 1.5px solid rgb(241, 241, 239);
    flex-shrink: 0;
  }

  .section-heading .sec-emoji { margin-right: 5px; }

  /* ── Sections Wrapper (fills remaining space) ── */
  .sections-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    overflow: hidden;
  }

  /* ── News List ── */
  .news-list {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .news-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: ${itemPaddingV}px 4px;
    border-bottom: 1px solid rgba(55, 53, 47, 0.04);
  }

  .news-num {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 5px;
    font-size: 13px;
    font-weight: 700;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .num-hot {
    background: linear-gradient(135deg, #d44c47, #e8590c);
    color: #fff;
  }

  .num-feat {
    background: linear-gradient(135deg, #2383e2, #6940a5);
    color: #fff;
  }

  .num-default {
    background: rgba(55, 53, 47, 0.06);
    color: rgba(55, 53, 47, 0.5);
  }

  .news-content { flex: 1; min-width: 0; }

  .news-title {
    font-size: ${titleSize}px;
    font-weight: 700;
    color: rgb(55, 53, 47);
    line-height: 1.35;
    letter-spacing: -0.2px;
  }

  .news-title .hl { color: rgb(35, 131, 226); }
  .news-title .hl-red { color: rgb(212, 76, 71); }
  .news-title .hl-purple { color: rgb(105, 64, 165); }
  .news-title .hl-orange { color: rgb(217, 115, 13); }
  .news-title .hl-teal { color: rgb(0, 135, 107); }

  .news-desc {
    font-size: ${descSize}px;
    color: rgba(55, 53, 47, 0.42);
    line-height: 1.42;
    margin-top: 3px;
  }

  .inline-tag {
    display: inline-block;
    padding: 0px 6px;
    border-radius: 3px;
    font-size: 10px;
    font-weight: 600;
    vertical-align: middle;
    margin-left: 5px;
    position: relative;
    top: -1px;
  }

  /* ── Data Strip ── */
  .data-strip {
    display: flex;
    gap: 0;
    border-radius: 6px;
    overflow: hidden;
    flex-shrink: 0;
    margin-top: ${dataStripMarginTop}px;
  }

  .data-cell {
    flex: 1;
    padding: ${dataStripPadding}px 5px;
    text-align: center;
    border-right: 1px solid rgba(55, 53, 47, 0.06);
  }

  .data-cell:last-child { border-right: none; }
  .data-cell:nth-child(odd) { background: rgb(251, 251, 250); }
  .data-cell:nth-child(even) { background: rgb(247, 246, 243); }

  .data-label {
    font-size: 9.5px;
    font-weight: 600;
    color: rgba(55, 53, 47, 0.38);
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-bottom: 2px;
  }

  .data-value {
    font-size: 18px;
    font-weight: 800;
    letter-spacing: -0.3px;
  }

  .dv-red { color: rgb(212, 76, 71); }
  .dv-blue { color: rgb(35, 131, 226); }
  .dv-orange { color: rgb(217, 115, 13); }
  .dv-purple { color: rgb(105, 64, 165); }
  .dv-teal { color: rgb(0, 135, 107); }

  /* ── Bottom ── */
  .bottom-bar {
    flex-shrink: 0;
    padding: ${bottomPad}px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgb(233, 233, 231);
    margin-top: ${bottomPad}px;
  }

  .bottom-tags { display: flex; gap: 5px; flex-wrap: wrap; }

  .bottom-tag {
    font-size: 11px;
    color: rgba(55, 53, 47, 0.28);
    padding: 2px 7px;
    border-radius: 3px;
    background: rgba(55, 53, 47, 0.04);
    font-weight: 500;
  }

  .bottom-source {
    font-size: 11px;
    color: rgba(55, 53, 47, 0.18);
  }

  /* ── Footer ── */
  .footer {
    flex-shrink: 0;
    height: ${footerHeight}px;
    background: rgb(251, 251, 250);
    border-top: 1px solid rgb(233, 233, 231);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
  }

  .footer-logo { font-size: 17px; }
  .footer-text {
    font-size: 12px;
    font-weight: 600;
    color: rgba(55, 53, 47, 0.28);
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .sep-dot {
    width: 3px; height: 3px; border-radius: 50%;
    background: rgba(55, 53, 47, 0.12);
    display: inline-block;
  }
</style>
</head>
<body>

<div class="page">

  <div class="cover">
    <div class="cover-badge">AI DAILY · DESIGNER EDITION</div>
    <div class="cover-date">${year} · ${month} · ${day} ${weekdayEN}</div>
  </div>

  <div class="content">

    <div class="header">
      <div class="page-icon">🎨</div>
      <h1 class="page-title">AI Daily · 设计师 ${totalItems} 条速报</h1>
      <div class="page-subtitle">${year}年${parseInt(month)}月${parseInt(day)}日 · ${weekdayCN} · 小柒运营</div>
      <div class="prop-tags">
        ${propTagsHTML}
      </div>
    </div>

    <div class="sections-wrapper">
${sectionsHTML}
    </div>

    <!-- Data Strip -->
    <div class="data-strip">${dataStripHTML}
    </div>

    <!-- Bottom Tags -->
    <div class="bottom-bar">
      <div class="bottom-tags">
        ${bottomTagsHTML}
      </div>
      <span class="bottom-source">AIGC Daily · CodeBuddy</span>
    </div>

  </div>

  <div class="footer">
    <span class="footer-logo">🎨</span>
    <span class="footer-text">AI Daily · Designer catwang Edition</span>
    <span class="sep-dot"></span>
    <span class="footer-text" style="font-weight:500; letter-spacing:1px;">Powered by CodeBuddy</span>
    <span class="sep-dot"></span>
    <span class="footer-text" style="font-weight:500; letter-spacing:1px;">小柒运营</span>
  </div>

</div>

</body>
</html>`;
}

// ─── 主程序 ───
function main() {
  const args = process.argv.slice(2);
  
  // 确保输出目录存在
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let filesToProcess = [];

  if (args.includes('--all')) {
    // 生成所有日报卡片
    const allFiles = fs.readdirSync(RAW_DIR)
      .filter(f => f.startsWith('AIGC_Daily_Report_') && f.endsWith('.md'))
      .sort();
    filesToProcess = allFiles.map(f => path.join(RAW_DIR, f));
  } else if (args.length > 0 && !args[0].startsWith('--')) {
    // 指定文件
    const inputPath = path.resolve(args[0]);
    if (!fs.existsSync(inputPath)) {
      console.error(`❌ 文件不存在: ${inputPath}`);
      process.exit(1);
    }
    filesToProcess = [inputPath];
  } else {
    // 自动查找最新日报
    const allFiles = fs.readdirSync(RAW_DIR)
      .filter(f => f.startsWith('AIGC_Daily_Report_') && f.endsWith('.md'))
      .sort();
    if (allFiles.length === 0) {
      console.error('❌ raw/daily-reports/ 下没有找到日报文件');
      process.exit(1);
    }
    filesToProcess = [path.join(RAW_DIR, allFiles[allFiles.length - 1])];
  }

  const results = [];

  for (const filePath of filesToProcess) {
    const mdContent = fs.readFileSync(filePath, 'utf-8');
    const data = parseDailyReport(mdContent, filePath);
    
    if (data.items.length === 0) {
      console.warn(`⚠️ 跳过 ${path.basename(filePath)}: 未找到 TOP N 条目`);
      continue;
    }

    const html = generateHTML(data);
    
    // 输出文件名
    const dateStr = `${data.year}${data.month}${data.day}`;
    const htmlPath = path.join(OUTPUT_DIR, `ai-daily-card-${dateStr}.html`);
    
    fs.writeFileSync(htmlPath, html, 'utf-8');
    
    results.push({
      date: `${data.year}-${data.month}-${data.day}`,
      items: data.itemCount,
      htmlPath,
      pngPath: htmlPath.replace('.html', '.png'),
    });

    console.log(`✅ ${path.basename(filePath)} → ${data.itemCount} 条 → ${path.basename(htmlPath)}`);
  }

  // 输出汇总 JSON（供截图脚本使用）
  const manifestPath = path.join(OUTPUT_DIR, '_manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`\n📋 共处理 ${results.length} 份日报，Manifest: ${manifestPath}`);
  
  return results;
}

module.exports = { parseDailyReport, generateHTML, main };

if (require.main === module) {
  main();
}
