---
name: publish
description: "图文美化发布 Skill：将 wiki 页面转化为带精美配图、专业排版的展示型文章。5步标准流程+5条质量红线。触发词：publish <路径> / 美化 <路径> / 生成展示版 / 图文发布。本 Skill 是 CODEBUDDY.md §3.3 的标准操作实现。"
---

# Skill: Publish（图文美化发布）

> **触发词**: `publish <wiki页面路径>` / `美化 <wiki页面路径>` / `生成展示版`
> **职责**: 将 wiki 页面转化为带精美配图、专业排版的展示型文章
> **权威来源**: 本 Skill 是 CODEBUDDY.md §3.3 的标准操作实现

---

## 概述

将研究型 wiki 页面（纯文本、重链接）转化为**展示型文章**（有配图、有排版、可直接发布到公众号/博客/知乎）。

输出两个产物：
1. **`wiki/showcase/<slug>.md`** — 排版优化后的展示版文章
2. **`assets/images/<slug>/`** — 配套的 AI 生成配图

---

## 前置检查

- [ ] 源 knowledge 页面存在且有实质内容（≥20行正文，否则建议先充实内容再 publish）
- [ ] `assets/images/` 目录存在（不存在则创建）
- [ ] `wiki/showcase/` 目录存在（不存在则创建）
- [ ] 该页面未被 publish 过（如已有 showcase 版，询问用户是否覆盖更新）

---

## 第一步：分析源页面，制定配图方案

阅读源 wiki 页面，输出**配图计划表**：

```markdown
### 配图计划

| 序号 | 位置 | 内容描述 | 风格 | 尺寸建议 |
|------|------|---------|------|---------|
| 1 | 文章封面（顶部） | 主题概念可视化 | 深色·大标题居中·副标题 | 1200×630 |
| 2 | 核心概念章节 | 架构/流程图 | 浅色·中轴分层/流程图 | 1200×800 |
| 3 | 对比/要点章节 | 对比卡片/要点列表 | 浅色·卡片网格 | 1200×800 |
| ... | ... | ... | ... | ... |
```

⏸️ 【检查点】展示配图计划表给用户，确认后再开始生成配图。用户可调整图片数量、风格或内容方向。

**设计系统 — 深色科技风（Dark Tech）**：

参考 Linear / Vercel / Raycast 的现代科技设计语言。

**调色板**：

| 色号 | 色值 | 用途 |
|------|------|------|
| 背景深 | `#0d0d12` | 封面/深色卡片背景 |
| 背景中 | `#1a1a2e` | 章节背景、次级面板 |
| 背景浅 | `#16213e` | 卡片、代码块背景 |
| 主题紫 | `#7c3aed` | 标题渐变起点、强调色 |
| 主题蓝 | `#2563eb` | 按钮、链接、图标 |
| 主题青 | `#06b6d4` | 标题渐变终点、高亮 |
| 强调橙 | `#f97316` | 警示、重要标注 |
| 强调绿 | `#10b981` | 成功、正面对比 |
| 文字白 | `#f1f5f9` | 正文、标题 |
| 文字灰 | `#94a3b8` | 副标题、说明文字 |
| 卡片边框 | `#2d2d3f` | 卡片描边、分割线 |

**配图类型与风格**：

| 类型 | 风格描述 |
|------|---------|
| **封面图** | 深色背景 `#0d0d12`，大标题用紫→青渐变（`#7c3aed` → `#06b6d4`），副标题白色 `#f1f5f9`，底部排列 2-3 个品牌色圆角按钮（蓝/青/白），周围有微光点/光晕装饰 |
| **架构图** | 深色背景 `#1a1a2e`，用 `#2d2d3f` 描边的圆角卡片排列，卡片内文字白色，层级用缩进+连线表达，关键节点用主题蓝 `#2563eb` 高亮 |
| **流程图** | 深色背景，步骤用彩色圆角卡片（蓝→紫→青渐变序列），白色文字，步骤间用细线+箭头连接 |
| **对比图** | 深色背景，左右两列卡片，正面用绿 `#10b981`，反面用橙 `#f97316`，中间有 VS 标识 |
| **要点图** | 深色背景，3-4 个圆角卡片网格排列，每个卡片左侧有彩色竖条（蓝/紫/青/橙轮换），图标+白色文字 |
| **数据图** | 深色背景，图表用渐变色（紫→蓝→青），数字用大号白色字体突出 |

---

## 第二步：生成配图

使用 `image_gen` 工具为每个配图位置生成图片：

**命名规则**: `assets/images/<slug>/<序号>-<简短描述>.png`

**Prompt 编写规范**：

每个 prompt **必须**包含以下要素（按顺序）：

1. **背景色**：明确写出色值，如 "dark background #0d0d12"
2. **布局**：居中/左右分栏/网格/时间线
3. **色彩方案**：写出具体渐变和强调色，如 "title with purple-to-cyan gradient (#7c3aed to #06b6d4)"
4. **文字内容**：用引号包裹需要显示的中文文字
5. **装饰元素**：微光点、光晕、渐变线条
6. **风格后缀**：`clean, modern, minimal, dark tech aesthetic, UI design style, no photo, vector illustration, high contrast`

**示例 Prompt（封面图）**：
```
Dark background #0d0d12 with subtle radial gradient. Large centered title "从 0 到 1 搭建 AI 知识库" in bold with purple-to-cyan gradient (#7c3aed to #06b6d4). Below the title, subtitle "不是 RAG，是编译型知识库" in light gray #94a3b8. At the bottom, three rounded pill buttons labeled "Obsidian" "Claude Code" "三层架构" in colors #2563eb, #06b6d4, #f1f5f9 respectively. Subtle glow effects and dot grid pattern in background. Clean, modern, minimal, dark tech aesthetic, UI design style, no photo, vector illustration, high contrast.
```

**示例 Prompt（架构图）**：
```
Dark background #1a1a2e. Three-layer architecture diagram: top layer labeled "raw/" in rounded card with border #2d2d3f, middle layer "wiki/" with blue accent #2563eb, bottom layer "CLAUDE.md" with purple accent #7c3aed. Layers connected by thin glowing lines. Each card has white text #f1f5f9 and a small icon. Clean, modern, dark tech UI diagram, no photo, vector style.
```

**不使用真人照片，用图标和抽象图形。**

**尺寸**：
- 封面图: `1536x1024`（横版）
- 内容图: `1024x1024`（方形）或 `1536x1024`（横版）

**异常处理**：
- **image_gen 失败**：重试 1 次，仍失败则跳过该图位，在 showcase 文章中用文字描述替代，并在总结中告知用户
- **图片质量不佳**（文字乱码/布局混乱）：调整 Prompt 重新生成，最多重试 2 次
- **全部配图失败**：仅生成文字版 showcase，不嵌入图片，告知用户后续可手动补充

⏸️ 【检查点】所有配图生成后，展示缩略图列表给用户确认，再进入文章写作阶段。

---

## 第三步：生成展示版文章

基于源 knowledge 页面内容，生成 `wiki/showcase/<slug>.md`，遵循以下排版规范：

```markdown
**Type**: showcase
**Title**: {{展示标题（比原标题更吸引人）}}
**Created**: {{日期}}
**Updated**: {{日期}}
**Original**: [[wiki/原页面路径]]
**Sources**: {{继承原页面的 Sources}}
**Tags**: {{继承原页面的 Tags}}

---

# {{大标题}}

> {{一句话 hook，吸引读者继续看}}

![[assets/images/<slug>/01-cover.png]]

---

## {{章节 1 标题}}

{{重写后的内容：更口语化、更有节奏感、更易读}}

![[assets/images/<slug>/02-xxx.png]]

{{继续内容...}}

---

## {{章节 2 标题}}

...

---

## 总结

{{3-5 句话收尾，带行动号召}}

---

> 本文基于 [[wiki/原页面路径]] 整理生成
```

**排版规范**：
1. **标题层级**：# 大标题 → ## 章节 → ### 小节，不跳级
2. **段落节奏**：每段 3-5 句话，避免大段文字墙
3. **配图位置**：每个主要章节至少一张配图
4. **引用高亮**：重要观点用 `> blockquote` 突出
5. **列表化**：要点、步骤用有序/无序列表
6. **分隔符**：章节间用 `---` 分隔，增加视觉节奏
7. **口语化改写**：把学术/技术语言改为通俗表达，但不丢精度

---

## 第四步：更新索引

- 在 `index.md` 中添加 **展示文章 (Showcase)** 区域（如不存在则新建）
- 登记新的展示文章
- 在 `log.md` 中记录本次操作

---

## 第五步：输出总结

```
## Publish 完成

**源页面**: [[wiki/xxx]]
**展示文章**: [[wiki/showcase/xxx.md]]
**配图数量**: N 张

### 配图清单
| 图片 | 位置 | 说明 |
|------|------|------|
| ![[assets/images/slug/01-cover.png]] | 封面 | ... |
| ... | ... | ... |

在 Obsidian 中打开 [[wiki/showcase/xxx.md]] 预览效果。
```

---

## 质量红线

1. **配图必须生成**：每篇展示文章至少 2 张配图（封面+1张内容图）
2. **不编造新信息**：展示版内容基于源 wiki 页面，只做排版和表达优化，不添加原文没有的事实
3. **保留溯源链接**：展示版底部必须链回源 wiki 页面
4. **图片必须存在**：文章中引用的每张图片在 `assets/images/` 下都能找到
5. **文件命名规范**：showcase 文件用 kebab-case，图片用序号-描述格式

---

## 与其他 Skill 的关系

| Skill | 联动方式 |
|-------|---------|
| `design-style` | 当用户说"用XX风格 publish"时，先触发 design-style 加载品牌设计系统，再用该系统的配色/排版替代本文默认的深色科技风 |
| `ingest` | publish 的源页面应已通过 ingest 进入知识库；如果源页面缺少内容，建议先 ingest 对应 raw 文件 |
| `distill` | 蒸馏后的精炼概念页是 publish 的优质素材源 |
| `darwin` | darwin 可评估 publish 的配图 Prompt 质量并迭代优化 |

---

## 额外边界条件

| 场景 | 处理方式 |
|------|---------|
| 源页面无法生成有意义配图（如纯对比表/数据页） | 跳过配图，只生成文字版 showcase，在总结中说明 |
| showcase 文件名已存在 | 在前置检查中发现 → 询问用户是覆盖更新还是创建新版本（加 `-v2` 后缀） |
| 用户指定了非默认风格 | 先触发 `design-style` Skill → 用返回的 Design Tokens 替代本文§2中的深色科技风配色 |
| image_gen 配额耗尽 | 生成纯文字版 showcase + 在每个图位放占位描述 `<!-- TODO: 生成配图 -->` |
