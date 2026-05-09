---
name: codm-dark-ops
description: "CODM Dark Ops 暗黑军事风格设计系统。触发词：CODM风格 / Dark Ops / 暗黑风格 / 军事风卡片 / CODM设计 / 竞品日报风格。适用于任何需要暗黑军事/情报科技感视觉风格的 HTML 卡片、报告、信息图。"
---

# Skill: CODM Dark Ops 设计系统

> **触发词**: `CODM风格` / `Dark Ops` / `暗黑风格` / `军事风卡片` / `CODM设计` / `竞品日报风格`
> **职责**: 将任意内容渲染为 CODM 竞品日报同款的 Dark Ops 暗黑军事科技风格 HTML
> **产物**: 1080px 宽 HTML 页面（可截图为 PNG）
> **来源**: 提炼自 `_deploy/daily-card/generate-competitive-card.js` v3.0

---

## 1. 设计哲学

| 关键词 | 说明 |
|--------|------|
| **暗黑基底** | 深黑背景 + 极低对比度装饰线，视觉重心集中在内容 |
| **军事情报感** | 标签式品牌栏、全大写标注、竖排暗水印、方块装饰符 |
| **数据驱动** | 强调结构化信息：对比表、强度条、威胁等级徽章 |
| **黄色锐利点缀** | 单一强调色穿透全暗画面，产生焦点引力 |
| **克制留白** | 56px 大边距 + 紧凑内部间距，呼吸感与信息密度并存 |

---

## 2. 核心设计变量（Design Tokens）

### 2.1 色彩系统

```
┌─────────────────────────────────────────────────┐
│  CODM Dark Ops — Color Palette                  │
├─────────────────────────────────────────────────┤
│                                                 │
│  ██████  #0D0D0D   — 主背景 (Background)       │
│  ██████  #141414   — 卡片背景 (Card BG)        │
│  ██████  #FFE600   — 强调色 (Accent Yellow)    │
│  ██████  #FF3B3B   — 警告/高威胁 (Danger)      │
│  ██████  #FFFFFF   — 主文字 (Primary Text)     │
│                                                 │
│  透明度层级:                                     │
│  · 主文字    rgba(255,255,255, 1.0)             │
│  · 副标题    rgba(255,255,255, 0.85)            │
│  · 正文      rgba(255,255,255, 0.65)            │
│  · 次要      rgba(255,255,255, 0.55)            │
│  · 辅助      rgba(255,255,255, 0.4)             │
│  · 装饰线    rgba(255,255,255, 0.08)            │
│  · 微装饰    rgba(255,255,255, 0.04)            │
│                                                 │
│  强调色透明度:                                   │
│  · 强调背景  rgba(255,230,0, 0.03)              │
│  · 强调边框  rgba(255,230,0, 0.12)              │
│  · 光晕      rgba(255,230,0, 0.06)              │
│                                                 │
└─────────────────────────────────────────────────┘
```

### 2.2 品牌/分类配色（可扩展）

| 名称 | 主色 | 背景 | 边框 | 图标 |
|------|------|------|------|------|
| 黄色系（默认/三角洲行动） | `#FFE600` | `rgba(255,230,0,0.06)` | `rgba(255,230,0,0.4)` | 🎯 |
| 青色系（暗区突围） | `#00E5FF` | `rgba(0,229,255,0.06)` | `rgba(0,229,255,0.3)` | 🏙️ |
| 橙色系（CODM/使命召唤） | `#FF6B35` | `rgba(255,107,53,0.06)` | `rgba(255,107,53,0.3)` | 🔫 |
| 绿色系（Battlefield） | `#4CAF50` | `rgba(76,175,80,0.06)` | `rgba(76,175,80,0.3)` | 🪖 |
| 灰色系（默认/未分类） | `#888888` | `rgba(255,255,255,0.04)` | `rgba(255,255,255,0.15)` | 📋 |

> **扩展规则**：新增分类时选择高饱和度、中明度色相，避免与现有色撞色。背景取主色 opacity 0.06，边框取 0.3-0.4。

### 2.3 字体栈

```css
font-family: 'Inter', 'Noto Sans SC', 'Microsoft YaHei', sans-serif;
```

| 用途 | 字号 | 字重 | 字间距 |
|------|------|------|--------|
| 主标题 | 48px | 900 | -1.5px |
| 板块标题 | 16px | 800 | 0.03em |
| 卡片标题 / 维度标题 | 14px | 700 | 0.02em |
| 正文 | 12-13.5px | 400-500 | normal |
| 标签 / Section Label | 11-12px | 700 | 0.15-0.25em |
| 标注文字 | 10-11px | 700 | 0.06em |

### 2.4 尺寸与间距

| 参数 | 值 | 说明 |
|------|---|------|
| 页面宽度 | `1080px` | 固定，9:16 适配手机截图 |
| 最小高度 | `1920px` | 高度自适应，≥1920 |
| 页边距（左右） | `56px` | 所有 section 统一 |
| 卡片内边距 | `14px 18px` ~ `22px 24px` | 小卡片偏小，大板块偏大 |
| 卡片间距 | `8-10px` | 紧凑 |
| 分隔线 | `1px solid rgba(255,255,255,0.08)` | |

---

## 3. 组件库

### 3.1 Cover 顶部区

```html
<div class="cover">
  <div class="cover-top">
    <div class="cover-brand">
      <span class="brand-bar"></span>         <!-- 4px×22px 黄色竖条 -->
      <span class="brand-label">标题标签</span> <!-- 黄底黑字 -->
      <span class="brand-sub">SUBTITLE v1</span>
    </div>
    <div class="cover-date">
      <div class="brand-name">品牌名</div>
      <div>副标注</div>
    </div>
  </div>
  <div class="cover-title">主标题<span class="hl">高亮词</span></div>
  <div class="cover-sub">ENGLISH SUBTITLE IN UPPERCASE</div>
</div>
```

关键样式：
- `.brand-bar`: `width: 4px; height: 22px; background: #FFE600`
- `.brand-label`: `background: #FFE600; color: #0D0D0D; padding: 4px 14px; font-size: 12px; font-weight: 800`
- `.cover-title`: `font-size: 48px; font-weight: 900; letter-spacing: -1.5px`
- `.hl`: `color: #FFE600`
- `.cover-sub`: `font-size: 14px; letter-spacing: 0.35em; text-transform: uppercase; color: rgba(255,255,255,0.6)`

### 3.2 Section Label（板块分隔标题）

```html
<div class="section-label">板块名称</div>
```

```css
.section-label {
  font-size: 12px;
  font-weight: 700;
  color: rgba(255,255,255,0.35);
  letter-spacing: 0.25em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 10px;
}
.section-label::after {
  content: '';
  flex: 1;
  height: 0.5px;
  background: rgba(255,255,255,0.08);
}
```

### 3.3 信息卡片（纵向列表）

```html
<div class="comp-card" style="border-left-color: #FFE600;">
  <div class="comp-header">
    <span class="comp-icon">🎯</span>
    <span class="comp-name">卡片名称</span>
    <span class="comp-threat threat-critical">HIGH THREAT</span>
  </div>
  <div class="comp-highlight">要点内容 1</div>
  <div class="comp-highlight">要点内容 2</div>
</div>
```

关键样式：
- `.comp-card`: `background: #141414; border: 0.5px solid rgba(255,255,255,0.06); border-left: 3px solid [品牌色]; padding: 14px 18px`
- 威胁徽章三等级：
  - `.threat-critical`: `background: #FF3B3B; color: #FFF`
  - `.threat-warning`: `background: rgba(255,230,0,0.12); color: #FFE600; border: 0.5px solid rgba(255,230,0,0.3)`
  - `.threat-normal`: `background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.5)`
- `.comp-highlight`: 12px, `rgba(255,255,255,0.65)`, 左侧小方点伪元素

### 3.4 横向对比表

```html
<div class="horiz-dim">
  <div class="horiz-dim-title">🎬 对比维度标题</div>
  <table class="horiz-table">
    <tr>
      <td class="horiz-name" style="border-left: 3px solid #FFE600;">名称</td>
      <td class="horiz-cell">数据 A</td>
      <td class="horiz-cell">数据 B</td>
    </tr>
  </table>
  <div class="horiz-insight">
    <span class="horiz-insight-icon">🔍</span>
    <span class="horiz-insight-text">洞察文字</span>
  </div>
</div>
```

关键样式：
- `.horiz-dim`: `background: #141414; border: 0.5px solid rgba(255,255,255,0.06); padding: 16px 20px`
- `.horiz-dim-title`: `14px; font-weight: 700; color: #FFE600`
- `.horiz-name`: `font-weight: 600; border-left: 3px solid [品牌色]; width: 100px`
- `.horiz-insight`: `background: rgba(255,230,0,0.03); border-left: 3px solid #FFE600`

### 3.5 强度条（Progress Bar）

```html
<div class="tempo-row">
  <span class="tempo-name">标签</span>
  <div class="tempo-bar-bg">
    <div class="tempo-bar-fill" style="width: 60%"></div>
  </div>
  <span class="tempo-stars">⭐⭐⭐</span>
</div>
```

关键样式：
- `.tempo-bar-bg`: `height: 6px; background: rgba(255,255,255,0.06)`
- `.tempo-bar-fill`: `background: linear-gradient(90deg, #FFE600, rgba(255,230,0,0.4))`

### 3.6 黄色高亮框（洞察/启发区）

```html
<div class="insights-box">
  <div class="insights-header">💡 板块标题</div>
  <div class="insight-item">
    <span class="insight-num">1</span>
    <div class="insight-body">
      <div class="insight-title">要点标题</div>
      <div class="insight-text">详细说明文字</div>
    </div>
  </div>
</div>
```

关键样式：
- `.insights-box`: `background: rgba(255,230,0,0.03); border: 1px solid rgba(255,230,0,0.12); padding: 22px 24px`
- `.insights-header`: `16px; font-weight: 800; color: #FFE600`（带左侧 4px 黄条伪元素）
- `.insight-num`: `26px×26px; background: rgba(255,230,0,0.12); color: #FFE600; font-size: 12px; font-weight: 800`

### 3.7 Footer

```html
<div class="footer">
  <div class="footer-left">
    <span class="footer-dot"></span>     <!-- 8px 黄色方块 -->
    <span class="footer-team"><strong>团队名</strong> · 部门</span>
  </div>
  <div class="footer-right">
    AUTO-GENERATED
    <div class="footer-deco">
      <span class="footer-sq"></span>    <!-- 三个渐变方块 -->
      <span class="footer-sq"></span>
      <span class="footer-sq"></span>
    </div>
  </div>
</div>
```

### 3.8 背景装饰

```css
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
}
```

---

## 4. 页面骨架（完整 HTML 模板）

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=1080">
<title>标题</title>
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
  }
  /* ... 粘贴上述组件样式 ... */
</style>
</head>
<body>
<div class="page">
  <div class="side-mark">自定义水印文字</div>
  
  <!-- Cover -->
  <div class="cover">...</div>
  
  <div class="divider"></div>
  
  <!-- 内容区：组合 §3 中的组件 -->
  <div class="content">
    <!-- 按需组合：section-label + 卡片/表格/强度条/洞察框 -->
  </div>
  
  <!-- Footer -->
  <div class="footer">...</div>
</div>
</body>
</html>
```

---

## 5. 使用指南

### 5.1 触发方式

用户说以下任何一种时，触发本 Skill：
- "用 CODM 风格生成 XXX"
- "Dark Ops 风格做一张卡片"
- "暗黑军事风的报告"
- "竞品日报那种风格"
- "CODM 设计风格"

### 5.2 执行流程

1. **读取本 Skill** → 获得完整设计系统
2. **分析内容结构** → 决定使用哪些组件（Cover + N 种内容组件 + Footer）
3. **映射数据** → 将用户内容映射到组件的 slot
4. **生成 HTML** → 输出到 `docs/` 或指定路径
5. **（可选）截图** → 用 Puppeteer 截图为 PNG

### 5.3 灵活适配规则

| 场景 | 适配方式 |
|------|---------|
| 内容没有"威胁等级" | 改用状态徽章（如 NEW / HOT / DONE） |
| 不是对比类数据 | 去掉横向表，用纵向信息卡列表 |
| 只有 3-4 个要点 | 用洞察框（§3.6）单板块呈现 |
| 需要数据可视化 | 用强度条（§3.5）+ 品牌色区分 |
| 标题不是"竞品日报" | 替换 Cover 文字，保持版式不变 |
| 高度 < 1920px | 允许，去掉 `min-height` 约束 |
| 多页内容 | 每 1920px 一个逻辑"页"，用全宽分隔线断开 |

### 5.4 禁止事项

- ❌ 不要加圆角（全局直角风格）
- ❌ 不要用彩色渐变背景（只用纯黑 + 微光晕）
- ❌ 不要用 box-shadow 投影（靠边框和背景差异区分层级）
- ❌ 不要用超过 2 种强调色（主用黄色，辅助色仅用于分类标识）
- ❌ 不要用 serif 字体
- ❌ 不要把内容撑到整个页面无留白

---

## 6. 示例产物参考

现有竞品日报产物位于 `docs/competitive-daily/`，可查看任意 HTML 文件作为实际效果参考：

```
docs/competitive-daily/competitive-daily-card-20260501.html
docs/competitive-daily/competitive-daily-card-20260430.html
docs/competitive-daily/competitive-daily-card-20260429.html
```

---

*提炼自 generate-competitive-card.js v3.0 | 创建日期: 2026-05-07*
