---
name: codm-dark-ops
description: "CODM Dark Ops design system — generates dark military-tech styled HTML cards/reports with #0D0D0D background and #FFE600 accent. Use this skill whenever the user mentions CODM style, Dark Ops, dark military style, competitive daily style, intel report card, or wants any content rendered in a dark/military/tech-ops visual theme. Also trigger when the user asks for a '暗黑风格卡片', '军事风报告', '竞品日报风格', or says 'CODM设计'. Even if the user just says 'make it look like a military intel briefing' or 'dark ops aesthetic', use this skill."
---

# CODM Dark Ops Design System

Generate any content as a 1080px-wide, dark-themed HTML page with military intelligence aesthetics. This design system was distilled from the CODM Competitive Daily Report card generator.

---

## 1. Design Philosophy

- **Pure black base** — `#0D0D0D` background, no gradients, no noise
- **Military intel feel** — tag-style brand bar, uppercase section labels, vertical watermark, square decorators
- **Data-driven** — comparison tables, intensity bars, threat badges
- **Single accent punch** — `#FFE600` yellow cuts through the darkness
- **Restrained whitespace** — 56px margins, tight internal spacing
- **Zero border-radius** — everything is sharp-cornered

---

## 2. Design Tokens

### Colors

| Token | Value | Use |
|-------|-------|-----|
| Background | `#0D0D0D` | Page background |
| Card BG | `#141414` | Cards, modules |
| Accent | `#FFE600` | Highlights, labels, insight boxes |
| Danger | `#FF3B3B` | High-threat badges |
| Text Primary | `#FFFFFF` | Headlines |
| Text 85% | `rgba(255,255,255,0.85)` | Subtitles |
| Text 65% | `rgba(255,255,255,0.65)` | Body text |
| Text 55% | `rgba(255,255,255,0.55)` | Secondary |
| Text 40% | `rgba(255,255,255,0.4)` | Dates, aux |
| Border | `rgba(255,255,255,0.08)` | Dividers |
| Ghost | `rgba(255,255,255,0.04)` | Watermarks |
| Accent BG | `rgba(255,230,0,0.03)` | Insight box fill |
| Accent Border | `rgba(255,230,0,0.12)` | Insight box border |
| Accent Glow | `rgba(255,230,0,0.06)` | Top radial glow |

### Category Colors (extendable)

| Category | Color | Background | Border |
|----------|-------|-----------|--------|
| Yellow (default) | `#FFE600` | `rgba(255,230,0,0.06)` | `rgba(255,230,0,0.4)` |
| Cyan | `#00E5FF` | `rgba(0,229,255,0.06)` | `rgba(0,229,255,0.3)` |
| Orange | `#FF6B35` | `rgba(255,107,53,0.06)` | `rgba(255,107,53,0.3)` |
| Green | `#4CAF50` | `rgba(76,175,80,0.06)` | `rgba(76,175,80,0.3)` |
| Gray | `#888888` | `rgba(255,255,255,0.04)` | `rgba(255,255,255,0.15)` |

To add new categories: pick a saturated mid-brightness hue, use opacity 0.06 for bg and 0.3-0.4 for border.

### Typography

```css
font-family: 'Inter', 'Noto Sans SC', 'Microsoft YaHei', sans-serif;
```

| Use | Size | Weight | Spacing |
|-----|------|--------|---------|
| Main title | 48px | 900 | -1.5px |
| Section header | 16px | 800 | 0.03em |
| Card title | 14px | 700 | 0.02em |
| Body | 12-13.5px | 400-500 | normal |
| Label | 11-12px | 700 | 0.15-0.25em |

### Layout

| Property | Value |
|----------|-------|
| Page width | `1080px` (fixed) |
| Min height | `1920px` (flexible) |
| Page margins | `56px` left/right |
| Card padding | `14-24px` |
| Card gap | `8-10px` |

---

## 3. Complete CSS

Include this entire stylesheet in every generated HTML file:

```css
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
}

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

.divider {
  height: 1px;
  background: rgba(255,255,255,0.08);
  margin: 0 56px;
}

/* Cover */
.cover { padding: 40px 56px 24px; position: relative; z-index: 1; }
.cover-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
.cover-brand { display: flex; align-items: center; gap: 10px; }
.brand-bar { width: 4px; height: 22px; background: #FFE600; }
.brand-label { background: #FFE600; color: #0D0D0D; padding: 4px 14px; font-size: 12px; font-weight: 800; letter-spacing: 0.06em; }
.brand-sub { font-size: 13px; color: rgba(255,255,255,0.5); letter-spacing: 0.02em; margin-left: 8px; }
.cover-date { font-size: 12px; color: rgba(255,255,255,0.4); text-align: right; line-height: 1.6; }
.cover-date .brand-name { font-weight: 600; color: rgba(255,255,255,0.55); }
.cover-title { font-size: 48px; font-weight: 900; letter-spacing: -1.5px; line-height: 1.1; margin-bottom: 6px; }
.cover-title .hl { color: #FFE600; }
.cover-sub { font-size: 14px; color: rgba(255,255,255,0.6); letter-spacing: 0.35em; text-transform: uppercase; }

/* Section Label */
.section-label {
  font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.35);
  letter-spacing: 0.25em; text-transform: uppercase;
  display: flex; align-items: center; gap: 10px; margin-bottom: 12px;
  padding: 0 56px;
}
.section-label::after { content: ''; flex: 1; height: 0.5px; background: rgba(255,255,255,0.08); }

/* Info Cards */
.content { padding: 0 56px; display: flex; flex-direction: column; }
.comp-cards { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
.comp-card { background: #141414; border: 0.5px solid rgba(255,255,255,0.06); border-left: 3px solid #888; padding: 14px 18px; }
.comp-header { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
.comp-icon { font-size: 15px; }
.comp-name { font-size: 14px; font-weight: 700; color: #FFFFFF; flex: 1; }
.comp-threat { font-size: 10px; font-weight: 700; letter-spacing: 0.15em; padding: 3px 10px; text-transform: uppercase; }
.threat-critical { background: #FF3B3B; color: #FFFFFF; }
.threat-warning { background: rgba(255,230,0,0.12); color: #FFE600; border: 0.5px solid rgba(255,230,0,0.3); }
.threat-normal { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.5); border: 0.5px solid rgba(255,255,255,0.1); }
.comp-highlight { font-size: 12px; color: rgba(255,255,255,0.65); line-height: 1.6; padding-left: 14px; position: relative; margin-bottom: 4px; }
.comp-highlight::before { content: ''; position: absolute; left: 0; top: 7px; width: 4px; height: 4px; background: rgba(255,255,255,0.2); }

/* Horizontal Comparison */
.horiz-section { padding: 0 56px; margin-bottom: 16px; }
.horiz-dim { background: #141414; border: 0.5px solid rgba(255,255,255,0.06); padding: 16px 20px; margin-bottom: 10px; }
.horiz-dim-title { font-size: 14px; font-weight: 700; color: #FFE600; margin-bottom: 12px; }
.horiz-table { width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 10px; }
.horiz-table tr { border-bottom: 0.5px solid rgba(255,255,255,0.06); }
.horiz-table tr:last-child { border-bottom: none; }
.horiz-name { font-weight: 600; color: rgba(255,255,255,0.85); padding: 8px 10px 8px 12px; white-space: nowrap; width: 100px; border-left: 3px solid #888; }
.horiz-cell { padding: 8px; color: rgba(255,255,255,0.6); line-height: 1.5; }
.horiz-insight { display: flex; align-items: flex-start; gap: 8px; padding: 10px 12px; background: rgba(255,230,0,0.03); border-left: 3px solid #FFE600; margin-top: 4px; }
.horiz-insight-icon { font-size: 14px; flex-shrink: 0; }
.horiz-insight-text { font-size: 12px; color: rgba(255,255,255,0.65); line-height: 1.6; }

/* Intensity Bars */
.tempo-section { padding: 0 56px; margin-bottom: 16px; }
.tempo-row { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
.tempo-name { width: 90px; font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.7); text-align: right; }
.tempo-bar-bg { flex: 1; height: 6px; background: rgba(255,255,255,0.06); position: relative; }
.tempo-bar-fill { position: absolute; left: 0; top: 0; bottom: 0; background: linear-gradient(90deg, #FFE600, rgba(255,230,0,0.4)); }
.tempo-stars { font-size: 10px; width: 80px; }

/* Insight Box */
.insights-section { padding: 0 56px; margin-bottom: 16px; }
.insights-box { background: rgba(255,230,0,0.03); border: 1px solid rgba(255,230,0,0.12); padding: 22px 24px; }
.insights-header { font-size: 16px; font-weight: 800; color: #FFE600; display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
.insights-header::before { content: ''; width: 4px; height: 18px; background: #FFE600; }
.insight-item { display: flex; gap: 12px; align-items: flex-start; padding: 5px 0; }
.insight-num { width: 26px; height: 26px; background: rgba(255,230,0,0.12); color: #FFE600; font-size: 12px; font-weight: 800; display: flex; align-items: center; justify-content: center; }
.insight-body { flex: 1; }
.insight-title { font-size: 14px; font-weight: 700; color: #FFFFFF; }
.insight-text { font-size: 12.5px; color: rgba(255,255,255,0.55); line-height: 1.6; }

/* Footer */
.footer { height: 72px; padding: 0 56px; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid rgba(255,255,255,0.08); margin-top: 20px; }
.footer-left { display: flex; align-items: center; gap: 8px; }
.footer-dot { width: 8px; height: 8px; background: #FFE600; }
.footer-team { font-size: 12px; color: rgba(255,255,255,0.4); font-weight: 500; }
.footer-team strong { color: rgba(255,255,255,0.6); }
.footer-right { font-size: 11px; color: rgba(255,255,255,0.25); text-align: right; letter-spacing: 0.06em; }
.footer-deco { display: flex; gap: 4px; margin-top: 4px; justify-content: flex-end; }
.footer-sq { width: 6px; height: 6px; background: #FFE600; }
.footer-sq:nth-child(2) { opacity: 0.4; }
.footer-sq:nth-child(3) { opacity: 0.15; }
```

---

## 4. Component HTML Templates

### Cover

```html
<div class="cover">
  <div class="cover-top">
    <div class="cover-brand">
      <span class="brand-bar"></span>
      <span class="brand-label">LABEL TEXT</span>
      <span class="brand-sub">SUBTITLE</span>
    </div>
    <div class="cover-date">
      <div class="brand-name">BRAND</div>
      <div>Secondary info</div>
    </div>
  </div>
  <div class="cover-title">Main <span class="hl">Title</span></div>
  <div class="cover-sub">ENGLISH SUBTITLE IN UPPERCASE</div>
</div>
```

### Info Card

```html
<div class="comp-card" style="border-left-color: #FFE600;">
  <div class="comp-header">
    <span class="comp-icon">🎯</span>
    <span class="comp-name">Card Name</span>
    <span class="comp-threat threat-critical">HIGH</span>
  </div>
  <div class="comp-highlight">Key point 1</div>
  <div class="comp-highlight">Key point 2</div>
</div>
```

Badge variants: `threat-critical` (red), `threat-warning` (yellow outline), `threat-normal` (gray). For non-threat contexts, use labels like NEW / HOT / DONE.

### Horizontal Comparison Table

```html
<div class="horiz-dim">
  <div class="horiz-dim-title">🎬 Dimension Title</div>
  <table class="horiz-table">
    <tr>
      <td class="horiz-name" style="border-left-color: #FFE600;">Name</td>
      <td class="horiz-cell">Data A</td>
      <td class="horiz-cell">Data B</td>
    </tr>
  </table>
  <div class="horiz-insight">
    <span class="horiz-insight-icon">🔍</span>
    <span class="horiz-insight-text">Insight text here</span>
  </div>
</div>
```

### Intensity Bar

```html
<div class="tempo-row">
  <span class="tempo-name">Label</span>
  <div class="tempo-bar-bg"><div class="tempo-bar-fill" style="width:60%"></div></div>
  <span class="tempo-stars">⭐⭐⭐</span>
</div>
```

### Insight Box

```html
<div class="insights-box">
  <div class="insights-header">💡 Section Title</div>
  <div class="insight-item">
    <span class="insight-num">1</span>
    <div class="insight-body">
      <div class="insight-title">Point title</div>
      <div class="insight-text">Detailed explanation</div>
    </div>
  </div>
</div>
```

### Footer

```html
<div class="footer">
  <div class="footer-left">
    <span class="footer-dot"></span>
    <span class="footer-team"><strong>Team Name</strong> · Dept</span>
  </div>
  <div class="footer-right">
    AUTO-GENERATED
    <div class="footer-deco">
      <span class="footer-sq"></span>
      <span class="footer-sq"></span>
      <span class="footer-sq"></span>
    </div>
  </div>
</div>
```

---

## 5. Generation Rules

1. Always output a complete, standalone HTML file with `<!DOCTYPE html>`
2. Include the FULL CSS from §3 inline in a `<style>` tag — no external stylesheets except Google Fonts
3. Choose components based on content structure — you don't need to use all of them
4. Page structure: `<div class="page">` → side-mark → cover → divider → content sections → footer
5. File naming: `{descriptive-slug}-{YYYYMMDD}.html`

### Adaptation Rules

| Scenario | Approach |
|----------|----------|
| No "threat levels" | Use status badges (NEW / HOT / DONE / ACTIVE) |
| Not comparison data | Skip horizontal table, use info card list |
| Few key points (3-4) | Use single insight box |
| Quantitative data | Use intensity bars with category colors |
| Title isn't "竞品日报" | Replace cover text, keep layout |
| Short content | Remove `min-height: 1920px` |
| Long content | Break into logical pages with full-width dividers |

### Strict Prohibitions

- ❌ NO border-radius (everything stays sharp-cornered)
- ❌ NO colorful gradient backgrounds (only solid black + subtle glow)
- ❌ NO box-shadow (use borders and background difference for depth)
- ❌ NO more than 2 accent colors (primary yellow + one category color)
- ❌ NO serif fonts
- ❌ NO wall-of-text without spacing

---

## 6. Example Usage

**Input**: "用 CODM 风格做一个 AI 视频工具对比卡片"

**Output**: A complete HTML file with:
- Cover: "AI 视频工具对比" title with yellow highlight
- Horizontal table comparing tools (Runway, Kling, Sora, etc.)
- Intensity bars showing capability levels
- Insight box with key takeaways
- Footer with generation timestamp
