# CODM Dark Ops — Design System Instructions for Codex

> **用法**：`codex --instructions _skills/codm-dark-ops-codex.md "用 CODM 风格生成 XXX"`
> 或在 `AGENTS.md` 中 include 本文件。

---

## Role

你是一个视觉设计生成器。当用户要求使用 **CODM 风格 / Dark Ops / 暗黑风格 / 军事风卡片 / 竞品日报风格** 时，你必须按照以下设计系统生成 HTML 页面。

---

## 1. 设计哲学

- **暗黑基底**：深黑背景 `#0D0D0D` + 极低对比度装饰线，视觉重心集中在内容
- **军事情报感**：标签式品牌栏、全大写标注、竖排暗水印、方块装饰符
- **数据驱动**：强调结构化信息 — 对比表、强度条、威胁等级徽章
- **黄色锐利点缀**：单一强调色 `#FFE600` 穿透全暗画面
- **克制留白**：56px 大边距 + 紧凑内部间距
- **全局直角**：禁止圆角、禁止 box-shadow

---

## 2. Design Tokens

### 色彩

| Token | 值 | 用途 |
|-------|---|------|
| `--bg` | `#0D0D0D` | 页面背景 |
| `--card-bg` | `#141414` | 卡片/模块背景 |
| `--accent` | `#FFE600` | 强调色（标题高亮、标签、洞察框） |
| `--danger` | `#FF3B3B` | 高威胁/警告 |
| `--text-primary` | `#FFFFFF` | 主文字 |
| `--text-85` | `rgba(255,255,255,0.85)` | 副标题 |
| `--text-65` | `rgba(255,255,255,0.65)` | 正文 |
| `--text-55` | `rgba(255,255,255,0.55)` | 次要文字 |
| `--text-40` | `rgba(255,255,255,0.4)` | 辅助/日期 |
| `--border` | `rgba(255,255,255,0.08)` | 分隔线/卡片边框 |
| `--ghost` | `rgba(255,255,255,0.04)` | 水印/微装饰 |
| `--accent-bg` | `rgba(255,230,0,0.03)` | 强调背景 |
| `--accent-border` | `rgba(255,230,0,0.12)` | 强调边框 |
| `--accent-glow` | `rgba(255,230,0,0.06)` | 顶部光晕 |

### 品牌/分类配色

| 分类 | 主色 | 背景(0.06) | 边框(0.3-0.4) |
|------|------|-----------|--------------|
| 默认/黄色系 | `#FFE600` | `rgba(255,230,0,0.06)` | `rgba(255,230,0,0.4)` |
| 青色系 | `#00E5FF` | `rgba(0,229,255,0.06)` | `rgba(0,229,255,0.3)` |
| 橙色系 | `#FF6B35` | `rgba(255,107,53,0.06)` | `rgba(255,107,53,0.3)` |
| 绿色系 | `#4CAF50` | `rgba(76,175,80,0.06)` | `rgba(76,175,80,0.3)` |
| 灰色系 | `#888888` | `rgba(255,255,255,0.04)` | `rgba(255,255,255,0.15)` |

### 字体

```css
font-family: 'Inter', 'Noto Sans SC', 'Microsoft YaHei', sans-serif;
```

| 用途 | 字号 | 字重 | 字间距 |
|------|------|------|--------|
| 主标题 | 48px | 900 | -1.5px |
| 板块标题 | 16px | 800 | 0.03em |
| 卡片标题 | 14px | 700 | 0.02em |
| 正文 | 12-13.5px | 400-500 | normal |
| Section Label | 11-12px | 700 | 0.15-0.25em |

### 尺寸

| 参数 | 值 |
|------|---|
| 页面宽度 | `1080px` |
| 最小高度 | `1920px`（可自适应） |
| 页边距 | `56px` 左右 |
| 卡片内边距 | `14-24px` |
| 卡片间距 | `8-10px` |

---

## 3. 组件库（完整 CSS + HTML）

### 3.0 基础 + 背景装饰

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

/* 顶部黄色光晕 */
.page::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 400px;
  background: radial-gradient(ellipse at 50% 0%, rgba(255,230,0,0.06) 0%, transparent 70%);
  pointer-events: none;
}

/* 右侧竖排暗水印 */
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
```

### 3.1 Cover

```css
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
```

```html
<div class="cover">
  <div class="cover-top">
    <div class="cover-brand">
      <span class="brand-bar"></span>
      <span class="brand-label">标题标签</span>
      <span class="brand-sub">SUBTITLE</span>
    </div>
    <div class="cover-date">
      <div class="brand-name">BRAND</div>
      <div>副标注</div>
    </div>
  </div>
  <div class="cover-title">主标题<span class="hl">高亮词</span></div>
  <div class="cover-sub">ENGLISH SUBTITLE</div>
</div>
```

### 3.2 Section Label

```css
.section-label {
  font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.35);
  letter-spacing: 0.25em; text-transform: uppercase;
  display: flex; align-items: center; gap: 10px; margin-bottom: 12px;
}
.section-label::after { content: ''; flex: 1; height: 0.5px; background: rgba(255,255,255,0.08); }
```

### 3.3 信息卡片

```css
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
```

```html
<div class="comp-card" style="border-left-color: #FFE600;">
  <div class="comp-header">
    <span class="comp-icon">🎯</span>
    <span class="comp-name">名称</span>
    <span class="comp-threat threat-critical">HIGH</span>
  </div>
  <div class="comp-highlight">要点 1</div>
  <div class="comp-highlight">要点 2</div>
</div>
```

### 3.4 横向对比表

```css
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
```

### 3.5 强度条

```css
.tempo-row { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
.tempo-name { width: 90px; font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.7); text-align: right; }
.tempo-bar-bg { flex: 1; height: 6px; background: rgba(255,255,255,0.06); position: relative; }
.tempo-bar-fill { position: absolute; left: 0; top: 0; bottom: 0; background: linear-gradient(90deg, #FFE600, rgba(255,230,0,0.4)); }
.tempo-stars { font-size: 10px; width: 80px; }
```

```html
<div class="tempo-row">
  <span class="tempo-name">标签</span>
  <div class="tempo-bar-bg"><div class="tempo-bar-fill" style="width:60%"></div></div>
  <span class="tempo-stars">⭐⭐⭐</span>
</div>
```

### 3.6 洞察/高亮框

```css
.insights-box { background: rgba(255,230,0,0.03); border: 1px solid rgba(255,230,0,0.12); padding: 22px 24px; }
.insights-header { font-size: 16px; font-weight: 800; color: #FFE600; display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
.insights-header::before { content: ''; width: 4px; height: 18px; background: #FFE600; }
.insight-item { display: flex; gap: 12px; align-items: flex-start; padding: 5px 0; }
.insight-num { width: 26px; height: 26px; background: rgba(255,230,0,0.12); color: #FFE600; font-size: 12px; font-weight: 800; display: flex; align-items: center; justify-content: center; }
.insight-body { flex: 1; }
.insight-title { font-size: 14px; font-weight: 700; color: #FFFFFF; }
.insight-text { font-size: 12.5px; color: rgba(255,255,255,0.55); line-height: 1.6; }
```

### 3.7 Footer

```css
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

## 4. 生成规则

1. **输出格式**：始终输出完整可运行的 HTML 文件（含 `<!DOCTYPE html>`）
2. **组件选择**：根据内容结构选择合适的组件组合，不必全部使用
3. **适配**：
   - 没有"威胁等级"时 → 改用状态徽章（NEW / HOT / DONE）
   - 非对比数据 → 去掉横向表，用信息卡列表
   - 少量要点 → 用洞察框单板块
   - 需要量化 → 用强度条
4. **文件命名**：`{slug}-{YYYYMMDD}.html`
5. **宽度固定 1080px**，高度自适应

## 5. 禁止事项

- ❌ 圆角（border-radius）
- ❌ 彩色渐变背景
- ❌ box-shadow 投影
- ❌ 超过 2 种强调色
- ❌ serif 字体
- ❌ 满屏无留白

---

## 6. Quick Start

```bash
# 方式 1：作为 --instructions 传入
codex --instructions _skills/codm-dark-ops-codex.md "用 Dark Ops 风格生成一份 AI 工具对比卡片"

# 方式 2：在 AGENTS.md 中引用
# 在项目根 AGENTS.md 添加：
# 当用户提到 "CODM风格" 或 "Dark Ops" 时，读取 _skills/codm-dark-ops-codex.md 作为设计规范。
```

---

*Based on generate-competitive-card.js v3.0 | Packaged: 2026-05-07*
