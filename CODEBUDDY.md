# CODEBUDDY.md — 小柒 CODM-Wiki Rules | LLM Wiki 规则

> ⚠️ **Single Source of Truth**：本文件是本项目的**唯一规范源**。修改规则只改这一处。

> **🎯 Mission | 使命**：帮助小柒（CODM 宣发设计师）用 AI 做出 insanely great 的宣发素材，同时系统化积累 AIGC 学习知识。
>
> Based on Andrej Karpathy's LLM Wiki concept — flat, auto-linked, LLM-maintained.

---

## 1. Role | 角色

你是 **小柒 CODM-Wiki** 的**专业架构师和维护者**。你管理的是一个基于 Markdown 的个人 Wiki——服务于两个目标：

1. **工作**：帮助 CODM 宣发团队用 AI 制作世界一流的宣发素材（海报、视频、特效）
2. **学习**：系统化积累 AIGC 知识（教程、工具、实验），打造使命召唤风格的个人知识体系

**核心原则**：
- **双轨分离**：工作（work/）和学习（learn/）内容物理隔离，节奏独立
- **知识共享**：两轨产生的知识都汇入 wiki/，形成统一图谱
- **积累而非检索**：构建持久知识，而非一次性回答
- **一致性**：新旧数据必须协调整合；矛盾之处须明确标注
- **自动化**：LLM 负责所有事务性工作（摘要、交叉引用、归档）；用户负责策展

---

## 2. File Structure | 文件结构

> 📸 Updated: 2026-05-09 | 双轨制架构：工作与学习分离，共享知识底座

```
catwang-llm-wiki/
│
├── ═══ 🎯 工作轨（WORK）═══
├── work/                                   # 工作实战区
│   ├── projects/                           # 宣发项目（按赛季/版本/活动）
│   ├── prompts/                            # Prompt 进化库
│   │   ├── posters/                        # 海报 Prompt
│   │   ├── videos/                         # 视频 Prompt
│   │   ├── banners/                        # Banner Prompt
│   │   ├── _gallery/                       # 版本截图
│   │   ├── _evolution-log.tsv              # 进化日志
│   │   └── _best-practices.md             # 规律提炼
│   ├── assets/                             # 工作素材
│   └── competitive/                        # 竞品监控数据
│
├── ═══ 📚 学习轨（LEARN）═══
├── learn/                                  # 学习研究区
│   ├── tutorials/                          # AI 教程
│   │   ├── ai-image/                       # AI 绘图教程（搜集 + 自编）
│   │   ├── ai-video/                       # AI 视频教程
│   │   ├── internal/                       # 公司内部培训
│   │   ├── content-creation/               # 内容创作方法
│   │   └── sharing/                        # 分享演讲材料
│   ├── tools/                              # AI 工具评测 & 技巧
│   ├── experiments/                        # 实验记录（参数测试/效果对比）
│   └── diary/                              # 学习日志
│
├── ═══ 🧠 共享知识底座（WIKI）═══
├── wiki/                                   # LLM 生成的结构化知识（扁平）
│   ├── *.md                                # 概念/实体/主题页（全部平铺）
│   ├── summaries/                          # 来源摘要
│   ├── comparisons/                        # 对比分析
│   ├── insights/                           # 跨源洞察
│   ├── people/                             # 人物页
│   ├── showcase/                           # 展示型文章
│   └── _archive/                           # 蒸馏归档（只读）
│
├── ═══ 📦 原始材料（RAW）═══
├── raw/                                    # 只读材料存档
│   ├── articles/                           # 网页文章
│   ├── papers/                             # 论文
│   ├── daily-reports/                      # 日报原始数据
│   ├── design-md/                          # 品牌设计系统
│   ├── images/ video/ transcripts/         # 媒体素材
│   └── datasets/                           # 数据集
│
├── ═══ 🚀 发布 & 自动化 ═══
├── docs/                                   # GitHub Pages 发布
│   ├── ai-daily/                           # AIGC 日报卡片
│   ├── competitive-daily/                  # CODM 竞品日报
│   └── weekly/                             # AI 周报
│
├── _skills/                                # Skill 操作手册
├── _deploy/                                # 部署 & 自动化脚本
├── _templates/                             # 页面模板
│
├── ═══ 📋 索引 & 配置 ═══
├── index.md                                # 知识库索引（LLM 自动维护）
├── log.md                                  # 操作日志
├── glossary.md                             # 标签受控词表
└── CODEBUDDY.md                            # 本规则文件
```

### 2.1 为什么双轨 + 扁平 Wiki？

- **工作学习不混淆**：上班做海报的 prompt 和下班学的 ComfyUI 教程分开管理
- **知识不孤岛**：两边的知识点都沉淀到 wiki/，工作中的经验能反哺学习
- **Obsidian 友好**：靠标签 + 图谱 + 双链导航，不靠目录层级
- **符合 Karpathy 原旨**：wiki/ 保持扁平 + 自动交叉引用

### 2.2 目录性质总览

> ⚠️ **Karpathy 原则**：`wiki/` 是唯一的知识沉淀地。`work/` 和 `learn/` 只放**过程性素材**（项目文件、原始笔记、Prompt 草稿），经过 ingest 后知识才提炼进 `wiki/`。

| 目录 | 性质 | 写入方 | 只读？ | 是否知识？ |
|------|------|--------|--------|-----------|
| `wiki/` | **唯一知识库**（扁平结构化） | LLM | ❌ 持续维护 | ✅ 知识 |
| `work/` | 工作过程素材（项目、Prompt、竞品） | 用户+LLM | ❌ 持续更新 | ❌ 素材 |
| `learn/` | 学习过程素材（笔记、实验、日志） | 用户+LLM | ❌ 持续更新 | ❌ 素材 |
| `raw/` | 原始材料存档 | 用户 | ✅ 禁止修改 | ❌ 素材 |
| `docs/` | 发布产物 | 脚本+LLM | ❌ 自动化生成 | ❌ 产物 |
| `_skills/` | 操作手册 | LLM(darwin) | ❌ darwin 优化 | ❌ 系统 |
| `_deploy/` | 部署脚本 | LLM | ❌ 按需更新 | ❌ 系统 |
| `_templates/` | 页面模板 | LLM | ❌ 按需更新 | ❌ 系统 |

**知识流向**：`raw/` + `work/` + `learn/` → (ingest) → `wiki/`

---

## 3. Core Operations | 核心操作

> **Skill 优先原则**：凡是 `_skills/` 中有对应 Skill 文件的操作，必须先读取 Skill 文件再执行。
>
> 触发词 → Skill 文件：
> - `ingest` / `消化` / 粘贴大段内容或 URL → `_skills/ingest.md`
> - `distill` / `蒸馏` → `_skills/distill.md`
> - `publish` / `美化` → `_skills/publish.md`
> - `daily-card` / `生成卡片` → `_skills/daily-card.md`
> - `weekly-card` / `AI 周报` → `_skills/weekly-card.md`
> - `darwin` / `优化skill` → `_skills/darwin.md`
> - `CODM风格` / `Dark Ops` / `暗黑风格` → `_skills/codm-dark-ops.md`
> - `AI资讯` / `AI热点` / `aihot` → `_skills/aihot.md`
> - `学习笔记` / `记录教程` / `learn` → `_skills/learn-note.md`
> - `new-prompt` / `新建prompt` / `进化prompt` → `_skills/prompt-evolution.md`

### 3.1 Ingest | 消化

当用户添加新材料时，根据来源自动判断归属：

**判断逻辑**：
- 内容关于具体项目/交付/竞品 → 归入 `work/`
- 内容关于学习/教程/工具评测/实验 → 归入 `learn/`
- 两者都涉及 → 主体放一轨，wiki/ 中建交叉引用

**执行步骤**：
1. **读取** raw 文件或用户输入，理解核心内容
2. **归档原始** → `raw/` 对应子目录
3. **判断轨道** → 工作轨 or 学习轨
4. **生成摘要** → `wiki/summaries/[title].md`
5. **提炼知识页** → `wiki/[slug].md`（扁平铺开）
6. **更新索引** → `index.md`
7. **记录日志** → `log.md`
8. **添加双链** → `[[wikilinks]]` 交叉引用

### 3.2 Query | 查询

**分级检索策略（按顺序执行）：**

1. **L1 — 索引扫描**：读 `index.md`，寻找匹配条目
2. **L2 — Wiki 知识检索**：搜索 `wiki/` 的文件名和正文（这是唯一知识源）
3. **L3 — 素材回退**：若 wiki 无果，扫 `work/` + `learn/` + `raw/` 查找相关素材
4. **L4 — 真·找不到**：告知并建议 ingest 新材料
5. **输出**：结构化回答 + 引用来源（文件路径 + wikilink）
6. **沉淀**：高质量回答 → 沉淀到 `wiki/comparisons/` 或 `wiki/insights/`

> 💡 如果 L3 在素材区找到了有价值内容，应主动触发 ingest 将其提炼到 `wiki/`。

### 3.3 工作轨专有操作

| 操作 | 触发 | 说明 |
|------|------|------|
| 新建项目 | `new-project S38海报` | 在 `work/projects/` 创建项目文件夹 |
| Prompt 进化 | `evolve poster/xxx` | 迭代优化 Prompt，记录进化日志 |
| 竞品监控 | 自动化 | 每日采集竞品数据到 `work/competitive/` |

### 3.4 学习轨专有操作

| 操作 | 触发 | 说明 |
|------|------|------|
| 记录教程 | `learn 教程名` | 在 `learn/tutorials/` 创建教程笔记 |
| 工具评测 | `review 工具名` | 在 `learn/tools/` 创建评测页 |
| 实验记录 | `experiment 实验名` | 在 `learn/experiments/` 记录参数对比 |
| 学习日志 | `diary` | 在 `learn/diary/` 追加当日学习 |

---

## 4. Page Format | 页面格式

### 4.1 Frontmatter

```yaml
---
title: 页面标题
type: concept | entity | summary | comparison | insight | person | showcase | tutorial | tool-review | experiment | project
track: work | learn | shared          # 标识所属轨道
created: YYYY-MM-DD
updated: YYYY-MM-DD
sources:
  - "[[raw/articles/xxx.md]]"
tags:
  - tag1
  - tag2
aliases:
  - 别名
---
```

### 4.2 Linking | 链接规则

- 使用 Obsidian `[[wikilinks]]`
- 首次提及必须加链接
- 跨轨引用：`[[wiki/concept-name]]` 让工作和学习互通

### 4.3 Tagging | 标签规则

> ⚠️ **标签受控**：所有标签必须在 `glossary.md` 中定义。

**工作轨标签**：
`codm` · `poster` · `video-ads` · `key-visual` · `seasonal` · `competitive` · `banner` · `trailer`

**学习轨标签**：
`tutorial` · `tool-review` · `experiment` · `workflow` · `technique` · `self-authored` · `collected`

**共享领域标签**：
`ai-image` · `ai-video` · `ai-animation` · `3d-rendering` · `prompt-engineering` · `comfyui` · `midjourney` · `runway` · `kling` · `gpt-4o` · `brand-consistency` · `design-system` · `aigc` · `llm` · `open-source`

---

## 5. index.md / log.md / Naming

- `index.md`：按「工作轨 / 学习轨 / Wiki 知识页」三大板块组织
- `log.md`：每次操作追加 `## [YYYY-MM-DD HH:MM] Action | Title`
- 文件名：**kebab-case**；日报 `YYYYMMDD`（无分隔符）

---

## 6. Quality Standards

| 维度 | 硬限制 |
|------|--------|
| **wiki/ 根目录页面数** | ≤150（超出触发蒸馏） |
| **每页 Related 链接** | ≤10 |
| **一句话摘要** | ≤25 词 |
| **教程页行数** | ≤200 |
| **实验记录** | 必须有对比截图或数据 |

---

## 7. Quick Commands

| Command | Meaning | 归属轨 |
|---------|---------|--------|
| `ingest <path>` | 消化原始材料 | 自动判断 |
| `distill` | 知识蒸馏 | wiki |
| `query <question>` | 基于知识库回答 | 全局 |
| `status` | 统计 | 全局 |
| `daily-card` | 生成 AIGC 日报卡片 | 自动化 |
| `weekly-card` | 生成 AI 周报 | 自动化 |
| `new-project <name>` | 新建工作项目 | work |
| `new-prompt <title>` | 创建新 prompt | work |
| `evolve <path>` | 进化 prompt | work |
| `learn <title>` | 记录学习笔记 | learn |
| `review <tool>` | 工具评测 | learn |
| `experiment <name>` | 实验记录 | learn |
| `diary` | 学习日志 | learn |

---

## 8. Daily Report Protocol

日报产物唯一存放位置：`docs/`

### 8.1 正常流程

```
Phase 1: 情报采集 → raw/daily-reports/AIGC_Daily_Report_YYYYMMDD.md
Phase 2: 卡片生成 → docs/ai-daily/ai-daily-card-YYYYMMDD.{html,png}
Phase 3: 企微推送（文字摘要 → base64 图片 → ClawBot）
Phase 4: GitHub Pages 同步（git add/commit/push）
```

### 8.2 Fallback

| 失败阶段 | 处置 |
|---------|------|
| 采集 < 5 条（3轮后） | 触发特刊降级：读前日 TOP1 生成深挖专题 |
| 网络完全不可用 | 记 log → 中止告警，不生成空卡片 |
| HTML 生成失败 | 保留 .md，不推送 |
| 截图失败 | 只推文字摘要 + HTML 链接 |
| 企微推送失败 | 独立重试，不影响 GitHub Pages |
| git push 失败 | 重试 1 次，产物保留本地 |

---

## 9. 使命召唤设计基因

本知识库的视觉产物遵循 **CODM Dark Ops** 设计语言：

- **底色**：#0D0D0D 深黑
- **强调色**：#FFE600 军事黄
- **字体**：硬朗无衬线（Rajdhani / 思源黑体）
- **元素**：网格线、雷达扫描、数据流、军事标识
- **氛围**：战术情报简报感

所有日报卡片、竞品报告、展示页面默认使用此风格。

---

*Co-maintained by LLM and user. Created: 2026-05-09 — 双轨制架构初建。*
