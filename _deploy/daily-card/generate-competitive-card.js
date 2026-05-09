#!/usr/bin/env node
/**
 * CODM 竞品日报卡片生成器（v3.0 — 横向+纵向双轴版）
 * 
 * 从 CODM_Competitive_Daily_YYYYMMDD.md 提取竞品情报，
 * 生成 Dark Ops 风格卡片 HTML（1080px宽 × 高度自适应），用于截图推送。
 * 
 * v3.0 新增：横向维度对比板块（IP联动/赛季节奏/福利策略）
 * 
 * Usage:
 *   node generate-competitive-card.js                          # 自动查找最新竞品日报
 *   node generate-competitive-card.js <path-to-md>             # 指定日报
 *   node generate-competitive-card.js --date 20260416          # 指定日期
 */

const fs = require('fs');
const path = require('path');

// ─── 配置 ───
const WIKI_ROOT = path.resolve(__dirname, '../../');
const RAW_DIR = path.join(WIKI_ROOT, 'raw', 'daily-reports');
const OUTPUT_DIR = path.join(WIKI_ROOT, 'docs', 'competitive-daily');

const WEEKDAY_CN = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

// ─── 竞品配色 ───
const COMPETITOR_COLORS = {
  '三角洲行动': { accent: '#FFE600', bg: 'rgba(255,230,0,0.06)', border: 'rgba(255,230,0,0.4)', icon: '🎯' },
  '暗区突围': { accent: '#00E5FF', bg: 'rgba(0,229,255,0.06)', border: 'rgba(0,229,255,0.3)', icon: '🏙️' },
  '使命召唤手游': { accent: '#FF6B35', bg: 'rgba(255,107,53,0.06)', border: 'rgba(255,107,53,0.3)', icon: '🔫' },
  'CODM': { accent: '#FF6B35', bg: 'rgba(255,107,53,0.06)', border: 'rgba(255,107,53,0.3)', icon: '🔫' },
  'Battlefield': { accent: '#4CAF50', bg: 'rgba(76,175,80,0.06)', border: 'rgba(76,175,80,0.3)', icon: '🪖' },
  'default': { accent: '#888888', bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.15)', icon: '📋' },
};

// ─── 解析竞品日报 MD（v3.0 — 支持横向+纵向） ───
function parseCompetitiveReport(mdContent, filePath) {
  const lines = mdContent.split('\n');
  
  // 提取日期
  const dateMatch = filePath.match(/(\d{4})(\d{2})(\d{2})/);
  const year = dateMatch ? dateMatch[1] : '2026';
  const month = dateMatch ? dateMatch[2] : '04';
  const day = dateMatch ? dateMatch[3] : '01';
  const dateObj = new Date(`${year}-${month}-${day}`);
  const weekdayCN = WEEKDAY_CN[dateObj.getDay()];

  // 提取今日概览
  let overview = '';
  const overviewStart = lines.findIndex(l => l.match(/^## 📊|^## .*概览/));
  if (overviewStart >= 0) {
    let j = overviewStart + 1;
    while (j < lines.length && !lines[j].startsWith('##') && !lines[j].startsWith('---') && !lines[j].startsWith('📌')) {
      const line = lines[j].trim();
      if (line && !line.startsWith('|') && !line.startsWith('>')) {
        overview += (overview ? ' ' : '') + line.replace(/\*\*/g, '');
      }
      j++;
    }
  }

  // ────── 横向维度对比提取 ──────
  const horizontalDimensions = [];
  const horizStart = lines.findIndex(l => l.match(/^## 🔀|^## .*横向/));
  if (horizStart >= 0) {
    let j = horizStart + 1;
    let currentDim = null;
    
    while (j < lines.length) {
      const line = lines[j].trim();
      
      // 到达纵向详情或运营洞察板块时结束
      if (line.match(/^## 🔽|^## .*纵向|^## 💡|^## .*运营洞察|^## 📊/)) break;
      
      // 新的维度标题：### 🎬 IP联动 / 代言人 — xxx
      const dimMatch = line.match(/^### (.{1,4})\s+(.+)/);
      if (dimMatch) {
        if (currentDim) horizontalDimensions.push(currentDim);
        currentDim = {
          icon: dimMatch[1].trim(),
          title: dimMatch[2].trim(),
          table: [],      // 对比表数据
          insight: '',     // 横向洞察
        };
        j++;
        continue;
      }
      
      // --- 分隔线：结束当前维度的表格解析
      if (line === '---' && currentDim && currentDim.table.length > 0) {
        horizontalDimensions.push(currentDim);
        currentDim = null;
        j++;
        continue;
      }
      
      // 解析对比表格行（只在有当前维度时）
      if (currentDim && line.startsWith('|') && !line.match(/^[\s|:-]+$/) && !line.includes('竞品')) {
        const cols = line.split('|').filter(c => c.trim()).map(c => c.trim().replace(/\*\*/g, ''));
        if (cols.length >= 3) {
          currentDim.table.push(cols);
        }
      }
      
      // 横向洞察（支持两种格式：`**🔍 横向洞察**` 和 `> 🔍 xxx`）
      if (currentDim && (line.match(/^🔍\s*横向洞察|^\*\*🔍\s*横向洞察/) || line.match(/^>\s*🔍/))) {
        let insightText = line
          .replace(/^\*\*🔍\s*横向洞察\*\*[：:]?\s*/, '')
          .replace(/^🔍\s*横向洞察[：:]?\s*/, '')
          .replace(/^>\s*🔍\s*/, '')
          .trim();
        j++;
        while (j < lines.length && lines[j].trim() && !lines[j].trim().startsWith('#') && !lines[j].trim().startsWith('---') && !lines[j].trim().startsWith('|') && !lines[j].trim().startsWith('>')) {
          insightText += ' ' + lines[j].trim();
          j++;
        }
        currentDim.insight = insightText;
        continue;
      }
      
      j++;
    }
    if (currentDim) horizontalDimensions.push(currentDim);
  }

  // ────── 纵向竞品详情提取 ──────
  const competitors = [];
  const skipSections = ['今日概览', '运营洞察', '数据速览', '宣发强度', '宣发节奏', '横向维度', '纵向竞品', '竞品详情'];
  
  // 先找到纵向详情的起始位置（兼容 `## 🔽 竞品详情` 和 `## 🔽 纵向竞品详情`）
  const vertStart = lines.findIndex(l => l.match(/^## 🔽|^## .*纵向|^## .*竞品详情/));
  
  if (vertStart >= 0) {
    // 新格式：在 🔽 板块内用 ### 识别竞品
    // 找到板块结束位置（下一个 ## 标题）
    let vertEnd = lines.length;
    for (let i = vertStart + 1; i < lines.length; i++) {
      if (lines[i].match(/^## /)) { vertEnd = i; break; }
    }
    
    const compRegex = /^### .{1,4}\s+(.+)/;
    for (let i = vertStart + 1; i < vertEnd; i++) {
      const compMatch = lines[i].match(compRegex);
      if (!compMatch) continue;
      
      const name = compMatch[1].trim();
      if (skipSections.some(s => name.includes(s))) continue;
      if (name.length < 2) continue;
      
      processCompetitor(lines, i, name, competitors);
    }
  } else {
    // 旧格式：用 ## 识别竞品
    const compRegex = /^## .{1,4}\s+(.+)/;
    for (let i = 0; i < lines.length; i++) {
      const compMatch = lines[i].match(compRegex);
      if (!compMatch) continue;
      
      const name = compMatch[1].trim();
      if (skipSections.some(s => name.includes(s))) continue;
      if (name.length < 2) continue;
      
      processCompetitor(lines, i, name, competitors);
    }
  }

  // 提取 💡 运营洞察 / CODM 启示板块
  const codmInsights = [];
  const insightStart = lines.findIndex(l => l.match(/^## .*运营洞察|^## 💡/));
  if (insightStart >= 0) {
    let j = insightStart + 1;
    let currentTitle = '';
    let currentCodm = '';
    
    while (j < lines.length && !lines[j].match(/^## .*数据速览|^## 📈/)) {
      const line = lines[j].trim();
      
      const titleMatch = line.match(/^### \d+\.\s+(.+)/);
      if (titleMatch) {
        if (currentTitle && currentCodm) {
          codmInsights.push({ title: currentTitle, insight: currentCodm });
        }
        currentTitle = titleMatch[1].replace(/\*\*/g, '');
        currentCodm = '';
      }
      
      if (line.match(/对 CODM 的启示/)) {
        j++;
        while (j < lines.length && lines[j].trim().startsWith('- ')) {
          currentCodm += (currentCodm ? '\n' : '') + lines[j].trim().replace(/^- /, '').replace(/\*\*/g, '');
          j++;
        }
        continue;
      }
      
      j++;
    }
    
    if (currentTitle && currentCodm) {
      codmInsights.push({ title: currentTitle, insight: currentCodm });
    }
  }

  // 提取宣发强度对比表格
  let tempoData = [];
  const tempoStart = lines.findIndex(l => l.match(/宣发强度对比|宣发节奏对比/));
  if (tempoStart >= 0) {
    let j = tempoStart + 1;
    while (j < lines.length && !lines[j].startsWith('---') && !lines[j].match(/^## /)) {
      const line = lines[j].trim();
      if (line.startsWith('|') && !line.includes('---') && !line.includes('竞品') && !line.match(/^[\s|:-]+$/)) {
        const cols = line.split('|').filter(c => c.trim()).map(c => c.trim());
        if (cols.length >= 2) {
          // 自动检测星星所在列（兼容 3 列和 4 列格式）
          let starCol = cols.findIndex(c => c.includes('⭐'));
          if (starCol < 0) starCol = Math.min(cols.length - 1, 2);
          tempoData.push({
            name: cols[0].replace(/\*\*/g, ''),
            event: starCol > 1 ? cols[1] : '',
            intensity: (cols[starCol] || '').match(/⭐/g)?.length || 0,
            means: cols[starCol + 1] || cols[cols.length - 1] || '',
          });
        }
      }
      j++;
    }
  }

  return {
    year, month, day, weekdayCN, dateObj,
    overview: overview.slice(0, 250),
    horizontalDimensions: horizontalDimensions.slice(0, 3),
    competitors,
    codmInsights: codmInsights.slice(0, 3),
    tempoData: tempoData.slice(0, 4),
  };
}

// 提取单个竞品信息
function processCompetitor(lines, startIdx, name, competitors) {
  const highlights = [];
  let threatLevel = 'normal';
  let threatReason = '';
  let tempo = '';
  
  let j = startIdx + 1;
  while (j < lines.length && !lines[j].match(/^### /) && !lines[j].match(/^## /)) {
    const line = lines[j].trim();
    
    const threatMatch = line.match(/\*\*威胁等级[：:]\s*(🔴|🟡|🟢)\s*(高|中|低)\s*[—–-]\s*(.+?)\*\*/);
    if (threatMatch) {
      threatLevel = threatMatch[1] === '🔴' ? 'critical' : threatMatch[1] === '🟡' ? 'warning' : 'normal';
      threatReason = threatMatch[3].trim();
      j++; continue;
    }
    
    const attentionMatch = line.match(/\*\*关注等级[：:]\s*(⚡+)\s*(.+?)\*\*/);
    if (attentionMatch) {
      const level = attentionMatch[1].length;
      threatLevel = level >= 3 ? 'critical' : level >= 2 ? 'warning' : 'normal';
      threatReason = attentionMatch[2].trim();
      j++; continue;
    }
    
    const tempoMatch = line.match(/^宣发节奏[：:](.+)$/);
    if (tempoMatch) { tempo = tempoMatch[1].trim(); j++; continue; }
    
    if (line.startsWith('- ') && !line.match(/^来源/) && !line.match(/^- http/)) {
      const text = line.replace(/^- /, '').replace(/\*\*/g, '').trim();
      if (text.includes('🔥🔥🔥') || text.includes('🔥🔥')) {
        highlights.unshift(text.replace(/🔥/g, '').trim());
      } else if (text.includes('🔥')) {
        highlights.push(text.replace(/🔥/g, '').trim());
      } else if (highlights.length < 4) {
        highlights.push(text);
      }
    }
    
    j++;
  }
  
  competitors.push({
    name,
    highlights: highlights.slice(0, 3),
    threatLevel,
    threatReason,
    tempo,
  });
}

// ─── 截断文本 ───
function truncate(text, maxLen) {
  if (!text) return '';
  text = text.replace(/\*\*/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  if (text.length > maxLen) return text.slice(0, maxLen - 1) + '…';
  return text;
}

function escapeHtml(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ─── 生成 HTML（v3.0 — 横向+纵向） ───
function generateHTML(data) {
  const { year, month, day, weekdayCN, competitors, codmInsights, tempoData, overview, horizontalDimensions } = data;
  
  // ── 横向维度对比 HTML ──
  let horizHtml = '';
  if (horizontalDimensions.length > 0) {
    horizHtml = horizontalDimensions.map(dim => {
      // 对比表格
      let tableRows = dim.table.map(cols => {
        // 第一列竞品名加品牌色
        let nameCol = cols[0];
        let brandColor = '#888';
        for (const [key, val] of Object.entries(COMPETITOR_COLORS)) {
          if (key !== 'default' && nameCol.includes(key)) { brandColor = val.accent; break; }
        }
        if (nameCol.includes('三角洲')) brandColor = '#FFE600';
        else if (nameCol.includes('CODM') || nameCol.includes('使命召唤')) brandColor = '#FF6B35';
        else if (nameCol.includes('暗区')) brandColor = '#00E5FF';
        else if (nameCol.includes('Battlefield') || nameCol.includes('战地')) brandColor = '#4CAF50';
        
        const restCols = cols.slice(1).map(c => 
          `<td class="horiz-cell">${escapeHtml(truncate(c, 50))}</td>`
        ).join('');
        
        return `<tr>
          <td class="horiz-name" style="border-left: 3px solid ${brandColor};">${escapeHtml(nameCol)}</td>
          ${restCols}
        </tr>`;
      }).join('');
      
      let insightBox = dim.insight ? `
        <div class="horiz-insight">
          <span class="horiz-insight-icon">🔍</span>
          <span class="horiz-insight-text">${escapeHtml(truncate(dim.insight, 150))}</span>
        </div>` : '';
      
      return `
        <div class="horiz-dim">
          <div class="horiz-dim-title">${dim.icon} ${escapeHtml(dim.title)}</div>
          <table class="horiz-table">
            ${tableRows}
          </table>
          ${insightBox}
        </div>`;
    }).join('');
  }

  // ── 竞品卡片 HTML ──
  let competitorCards = '';
  for (const comp of competitors.slice(0, 4)) {
    let colors = COMPETITOR_COLORS['default'];
    for (const [key, val] of Object.entries(COMPETITOR_COLORS)) {
      if (key !== 'default' && comp.name.includes(key)) { colors = val; break; }
    }
    const threatLabel = comp.threatLevel === 'critical' ? 'HIGH THREAT' 
      : comp.threatLevel === 'warning' ? 'ACTIVE' : 'NORMAL';
    const threatClass = comp.threatLevel === 'critical' ? 'threat-critical' 
      : comp.threatLevel === 'warning' ? 'threat-warning' : 'threat-normal';
    
    let highlightsHtml = comp.highlights.slice(0, 2).map(h => 
      `<div class="comp-highlight">${escapeHtml(truncate(h, 70))}</div>`
    ).join('');
    
    competitorCards += `
      <div class="comp-card" style="border-left-color: ${colors.accent};">
        <div class="comp-header">
          <span class="comp-icon">${colors.icon}</span>
          <span class="comp-name">${escapeHtml(comp.name)}</span>
          <span class="comp-threat ${threatClass}">${threatLabel}</span>
        </div>
        ${highlightsHtml}
      </div>`;
  }

  // ── 宣发节奏条 HTML ──
  let tempoHtml = '';
  if (tempoData.length > 0) {
    tempoHtml = tempoData.map(t => {
      const stars = '⭐'.repeat(Math.min(t.intensity, 5));
      const barWidth = Math.min(t.intensity * 20, 100);
      return `
        <div class="tempo-row">
          <span class="tempo-name">${escapeHtml(truncate(t.name, 10))}</span>
          <div class="tempo-bar-bg">
            <div class="tempo-bar-fill" style="width:${barWidth}%"></div>
          </div>
          <span class="tempo-stars">${stars || '—'}</span>
        </div>`;
    }).join('');
  }

  // ── CODM 运营启发 HTML ──
  let insightsHtml = '';
  if (codmInsights.length > 0) {
    insightsHtml = codmInsights.map((ci, idx) => `
      <div class="insight-item">
        <span class="insight-num">${idx + 1}</span>
        <div class="insight-body">
          <div class="insight-title">${escapeHtml(truncate(ci.title, 40))}</div>
          <div class="insight-text">${escapeHtml(truncate(ci.insight, 120))}</div>
        </div>
      </div>`
    ).join('');
  }

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=1080">
<title>CODM 竞品日报 · ${year}.${month}.${day}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Noto+Sans+SC:wght@400;500;700;900&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  html, body {
    width: 1080px;
    overflow-x: hidden;
    font-family: 'Inter', 'Noto Sans SC', 'Microsoft YaHei', sans-serif;
    -webkit-font-smoothing: antialiased;
    background: #0D0D0D;
    color: #FFFFFF;
  }

  .page {
    width: 1080px;
    min-height: 1920px;
    background: #0D0D0D;
    display: flex;
    flex-direction: column;
    position: relative;
    padding-bottom: 0;
  }

  /* ── 背景装饰 ── */
  .page::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 400px;
    background: radial-gradient(ellipse at 50% 0%, rgba(255,230,0,0.06) 0%, transparent 70%);
    pointer-events: none;
  }

  .side-mark {
    position: fixed;
    right: 28px;
    top: 50%;
    transform: translateY(-50%);
    writing-mode: vertical-lr;
    font-size: 11px;
    letter-spacing: 0.6em;
    color: rgba(255,255,255,0.04);
    font-weight: 300;
    pointer-events: none;
  }

  /* ── Cover 区 ── */
  .cover {
    padding: 40px 56px 24px;
    flex-shrink: 0;
    position: relative;
    z-index: 1;
  }

  .cover-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .cover-brand {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .brand-bar { width: 4px; height: 22px; background: #FFE600; }

  .brand-label {
    background: #FFE600;
    color: #0D0D0D;
    padding: 4px 14px;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.06em;
  }

  .brand-sub {
    font-size: 13px;
    color: rgba(255,255,255,0.5);
    letter-spacing: 0.02em;
    margin-left: 8px;
  }

  .cover-date {
    font-size: 12px;
    color: rgba(255,255,255,0.4);
    text-align: right;
    line-height: 1.6;
  }

  .cover-date .brand-name {
    font-weight: 600;
    color: rgba(255,255,255,0.55);
  }

  .cover-title {
    font-size: 48px;
    font-weight: 900;
    letter-spacing: -1.5px;
    line-height: 1.1;
    margin-bottom: 6px;
  }

  .cover-title .hl { color: #FFE600; }

  .cover-sub {
    font-size: 14px;
    color: rgba(255,255,255,0.6);
    letter-spacing: 0.35em;
    text-transform: uppercase;
  }

  /* ── 分隔线 ── */
  .divider {
    height: 1px;
    background: rgba(255,255,255,0.08);
    margin: 0 56px;
    flex-shrink: 0;
  }

  /* ── 概览区 ── */
  .overview {
    padding: 20px 56px 14px;
    flex-shrink: 0;
  }

  .overview-text {
    font-size: 13.5px;
    color: rgba(255,255,255,0.65);
    line-height: 1.7;
  }

  /* ── 威胁条 ── */
  .threat-bar {
    display: flex;
    gap: 8px;
    padding: 0 56px;
    margin-bottom: 14px;
    flex-shrink: 0;
  }

  .threat-pill {
    font-size: 11px;
    font-weight: 700;
    padding: 4px 14px;
    letter-spacing: 0.06em;
    border: 1px solid;
  }

  .threat-pill-high {
    border-color: #FF3B3B;
    color: #FF3B3B;
    background: rgba(255,59,59,0.10);
  }

  .threat-pill-mid {
    border-color: rgba(255,255,255,0.25);
    color: rgba(255,255,255,0.6);
    background: rgba(255,255,255,0.03);
  }

  /* ── Section Label ── */
  .section-label {
    font-size: 12px;
    font-weight: 700;
    color: rgba(255,255,255,0.35);
    letter-spacing: 0.25em;
    text-transform: uppercase;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }

  .section-label::after {
    content: '';
    flex: 1;
    height: 0.5px;
    background: rgba(255,255,255,0.08);
  }

  /* ════════════════════════════════════════════════
     横向维度对比
     ════════════════════════════════════════════════ */
  .horiz-section {
    padding: 0 56px;
    margin-bottom: 16px;
  }

  .horiz-dim {
    background: #141414;
    border: 0.5px solid rgba(255,255,255,0.06);
    padding: 16px 20px;
    margin-bottom: 10px;
  }

  .horiz-dim-title {
    font-size: 14px;
    font-weight: 700;
    color: #FFE600;
    margin-bottom: 12px;
    letter-spacing: 0.02em;
  }

  .horiz-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
    margin-bottom: 10px;
  }

  .horiz-table tr {
    border-bottom: 0.5px solid rgba(255,255,255,0.06);
  }

  .horiz-table tr:last-child {
    border-bottom: none;
  }

  .horiz-name {
    font-weight: 600;
    color: rgba(255,255,255,0.85);
    padding: 8px 10px 8px 12px;
    white-space: nowrap;
    width: 100px;
    border-left: 3px solid #888;
  }

  .horiz-cell {
    padding: 8px 8px;
    color: rgba(255,255,255,0.6);
    line-height: 1.5;
  }

  .horiz-insight {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 10px 12px;
    background: rgba(255,230,0,0.03);
    border-left: 3px solid #FFE600;
    margin-top: 4px;
  }

  .horiz-insight-icon {
    font-size: 14px;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .horiz-insight-text {
    font-size: 12px;
    color: rgba(255,255,255,0.65);
    line-height: 1.6;
  }

  /* ════════════════════════════════════════════════
     纵向竞品卡片
     ════════════════════════════════════════════════ */
  .content {
    padding: 0 56px;
    display: flex;
    flex-direction: column;
  }

  .comp-cards {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;
  }

  .comp-card {
    background: #141414;
    border: 0.5px solid rgba(255,255,255,0.06);
    border-left: 3px solid #888;
    padding: 14px 18px;
  }

  .comp-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
  }

  .comp-icon { font-size: 15px; }

  .comp-name {
    font-size: 14px;
    font-weight: 700;
    color: #FFFFFF;
    flex: 1;
    letter-spacing: 0.01em;
  }

  .comp-threat {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.15em;
    padding: 3px 10px;
    text-transform: uppercase;
  }

  .threat-critical { background: #FF3B3B; color: #FFFFFF; }
  .threat-warning { background: rgba(255,230,0,0.12); color: #FFE600; border: 0.5px solid rgba(255,230,0,0.3); }
  .threat-normal { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.5); border: 0.5px solid rgba(255,255,255,0.1); }

  .comp-highlight {
    font-size: 12px;
    color: rgba(255,255,255,0.65);
    line-height: 1.6;
    padding-left: 14px;
    position: relative;
    margin-bottom: 4px;
  }

  .comp-highlight::before {
    content: '';
    position: absolute;
    left: 0; top: 7px;
    width: 4px; height: 4px;
    background: rgba(255,255,255,0.2);
  }

  /* ── 宣发强度 ── */
  .tempo-section {
    margin-bottom: 16px;
    flex-shrink: 0;
  }

  .tempo-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
  }

  .tempo-name {
    width: 90px;
    font-size: 12px;
    font-weight: 600;
    color: rgba(255,255,255,0.7);
    flex-shrink: 0;
    text-align: right;
  }

  .tempo-bar-bg {
    flex: 1;
    height: 6px;
    background: rgba(255,255,255,0.06);
    position: relative;
  }

  .tempo-bar-fill {
    position: absolute;
    left: 0; top: 0; bottom: 0;
    background: linear-gradient(90deg, #FFE600, rgba(255,230,0,0.4));
  }

  .tempo-stars {
    font-size: 10px;
    width: 80px;
    flex-shrink: 0;
  }

  /* ── CODM 运营启发 ── */
  .insights-section {
    display: flex;
    flex-direction: column;
    margin-bottom: 0;
  }

  .insights-box {
    background: rgba(255,230,0,0.03);
    border: 1px solid rgba(255,230,0,0.12);
    padding: 22px 24px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .insights-header {
    font-size: 16px;
    font-weight: 800;
    color: #FFE600;
    letter-spacing: 0.03em;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;
  }

  .insights-header::before {
    content: '';
    width: 4px;
    height: 18px;
    background: #FFE600;
    flex-shrink: 0;
  }

  .insight-item {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    padding: 5px 0;
  }

  .insight-num {
    width: 26px;
    height: 26px;
    background: rgba(255,230,0,0.12);
    color: #FFE600;
    font-size: 12px;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .insight-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .insight-title {
    font-size: 14px;
    font-weight: 700;
    color: #FFFFFF;
    letter-spacing: 0.02em;
  }

  .insight-text {
    font-size: 12.5px;
    color: rgba(255,255,255,0.55);
    line-height: 1.6;
  }

  /* ── Footer ── */
  .footer {
    height: 72px;
    padding: 0 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid rgba(255,255,255,0.08);
    flex-shrink: 0;
    margin-top: 20px;
  }

  .footer-left {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .footer-dot { width: 8px; height: 8px; background: #FFE600; }

  .footer-team {
    font-size: 12px;
    color: rgba(255,255,255,0.4);
    font-weight: 500;
  }

  .footer-team strong { color: rgba(255,255,255,0.6); }

  .footer-right {
    font-size: 11px;
    color: rgba(255,255,255,0.25);
    text-align: right;
    letter-spacing: 0.06em;
  }

  .footer-deco {
    display: flex;
    gap: 4px;
    margin-top: 4px;
    justify-content: flex-end;
  }

  .footer-sq { width: 6px; height: 6px; background: #FFE600; }
  .footer-sq:nth-child(2) { opacity: 0.4; }
  .footer-sq:nth-child(3) { opacity: 0.15; }
</style>
</head>
<body>

<div class="page">

  <div class="side-mark">CALL OF DUTY MOBILE · COMPETITIVE INTEL</div>

  <!-- Cover -->
  <div class="cover">
    <div class="cover-top">
      <div class="cover-brand">
        <span class="brand-bar"></span>
        <span class="brand-label">竞品日报</span>
        <span class="brand-sub">COMPETITIVE INTEL v3</span>
      </div>
      <div class="cover-date">
        <div class="brand-name">CALL OF DUTY</div>
        <div>使命召唤手游</div>
      </div>
    </div>
    <div class="cover-title">CODM 竞品<span class="hl">日报</span></div>
    <div class="cover-sub">${year}.${month}.${day} · ${weekdayCN} · DAILY INTEL</div>
  </div>

  <div class="divider"></div>

  <!-- 概览 -->
  <div class="overview">
    <div class="overview-text">${escapeHtml(overview)}</div>
  </div>

  <!-- 威胁条 -->
  <div class="threat-bar">
    ${competitors.filter(c => c.threatLevel === 'critical').length > 0 
      ? '<span class="threat-pill threat-pill-high">[ 高威胁 ×' + competitors.filter(c => c.threatLevel === 'critical').length + ' ]</span>' : ''}
    ${competitors.filter(c => c.threatLevel === 'warning').length > 0 
      ? '<span class="threat-pill threat-pill-mid">[ 关注 ×' + competitors.filter(c => c.threatLevel === 'warning').length + ' ]</span>' : ''}
    ${competitors.filter(c => c.threatLevel === 'normal').length > 0 
      ? '<span class="threat-pill threat-pill-mid">[ 运营中 ×' + competitors.filter(c => c.threatLevel === 'normal').length + ' ]</span>' : ''}
  </div>

  <!-- ═══ 横向维度对比 ═══ -->
  ${horizontalDimensions.length > 0 ? `
  <div class="horiz-section">
    <div class="section-label">🔀 横向维度对比 · CROSS COMPARISON</div>
    ${horizHtml}
  </div>
  ` : ''}

  <div class="content">

    <!-- 宣发强度对比 -->
    ${tempoData.length > 0 ? `
    <div class="tempo-section">
      <div class="section-label">宣发强度 · TEMPO</div>
      ${tempoHtml}
    </div>` : ''}

    <!-- 纵向竞品详情 -->
    <div class="section-label">🔽 竞品详情 · COMPETITOR DETAIL</div>
    <div class="comp-cards">
      ${competitorCards}
    </div>

    <!-- CODM 运营启发 -->
    <div class="insights-section">
      <div class="section-label">CODM 运营启发 · ACTION ITEMS</div>
      <div class="insights-box">
        <div class="insights-header">结合横向对比 + 竞品动态，CODM 可以这样做</div>
        ${insightsHtml || `
        <div class="insight-item">
          <span class="insight-num">—</span>
          <div class="insight-body">
            <div class="insight-text">今日竞品动态暂无显著运营启发</div>
          </div>
        </div>`}
      </div>
    </div>

  </div>

  <!-- Footer -->
  <div class="footer">
    <div class="footer-left">
      <span class="footer-dot"></span>
      <span class="footer-team"><strong>J3 宣发设计组</strong> · 小柒运营日报</span>
    </div>
    <div class="footer-right">
      ${year}.${month}.${day}<br>
      POWERED BY CODEBUDDY
      <div class="footer-deco">
        <span class="footer-sq"></span>
        <span class="footer-sq"></span>
        <span class="footer-sq"></span>
      </div>
    </div>
  </div>

</div>

</body>
</html>`;
}

// ─── 主程序 ───
function main() {
  const args = process.argv.slice(2);
  
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let filePath;

  const dateIdx = args.indexOf('--date');
  if (dateIdx >= 0 && args[dateIdx + 1]) {
    const dateStr = args[dateIdx + 1].replace(/-/g, '');
    filePath = path.join(RAW_DIR, `CODM_Competitive_Daily_${dateStr}.md`);
  } else if (args.length > 0 && !args[0].startsWith('--')) {
    filePath = path.resolve(args[0]);
  } else {
    const allFiles = fs.readdirSync(RAW_DIR)
      .filter(f => f.startsWith('CODM_Competitive_Daily_') && f.endsWith('.md'))
      .sort();
    if (allFiles.length === 0) {
      console.error('❌ raw/daily-reports/ 下没有找到竞品日报文件');
      process.exit(1);
    }
    filePath = path.join(RAW_DIR, allFiles[allFiles.length - 1]);
  }

  if (!fs.existsSync(filePath)) {
    console.error(`❌ 文件不存在: ${filePath}`);
    process.exit(1);
  }

  console.log(`📄 解析竞品日报: ${path.basename(filePath)}`);
  const mdContent = fs.readFileSync(filePath, 'utf-8');
  const data = parseCompetitiveReport(mdContent, filePath);

  console.log(`   横向维度: ${data.horizontalDimensions.length} 个`);
  console.log(`   竞品详情: ${data.competitors.length} 个`);
  console.log(`   CODM 启发: ${data.codmInsights.length} 条`);
  console.log(`   宣发强度: ${data.tempoData.length} 行`);

  const html = generateHTML(data);

  const dateStr = `${data.year}${data.month}${data.day}`;
  const htmlPath = path.join(OUTPUT_DIR, `competitive-daily-card-${dateStr}.html`);
  
  fs.writeFileSync(htmlPath, html, 'utf-8');
  console.log(`✅ 生成卡片 HTML: ${path.basename(htmlPath)}`);
  console.log(`   宽度: 1080px / 高度: 自适应`);
  
  return { htmlPath, dateStr, data };
}

module.exports = { parseCompetitiveReport, generateHTML, main };

if (require.main === module) {
  main();
}
