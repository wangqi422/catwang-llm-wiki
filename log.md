# 操作日志 | Operation Log

---

## [2026-05-18 19:50] restructure | 废弃双轨制，合并 work/ 和 learn/ 到 raw/

- **操作**: 将 `work/` 整体移动到 `raw/work/`，`learn/` 整体移动到 `raw/learn/`
- **原因**: 简化目录结构，统一素材池
- **影响**:
  - 删除根目录 `work/` 和 `learn/`
  - 新路径：`raw/work/projects/`、`raw/work/prompts/`、`raw/learn/tutorials/` 等
  - 更新 `CODEBUDDY.md` 架构说明（双轨制 → 统一素材池）
  - 更新 `index.md`（工作轨/学习轨 → 原始素材统一索引）
- **知识流向变更**: `raw/` → (ingest) → `wiki/`（简化）

---

## [2026-05-18 17:45] ingest | 摄取 Harness Engineering 团队落地规范

- **原始文件**: `raw/Clipper/驾驭 AI Coding：一份面向团队的 Harness Engineering 落地规范 - 腾讯游戏知识库 - KM平台.md`
- **来源**: KM 平台（腾讯游戏知识库），2026-05-18 发布
- **归属轨**: 学习轨（learn）— AI Coding 工程方法论
- **新建页面（6 个）**:
  - `wiki/summaries/2026-05-18-harness-engineering-team-spec.md` — 摘要页
  - `wiki/harness-engineering.md` — 概念页：Harness Engineering 完整定义（整合两篇来源）
  - `wiki/spec-driven-development.md` — 概念页：SDD 规范驱动开发
  - `wiki/team-harness-repo.md` — 概念页：团队 Harness 仓库模式
  - `wiki/harness-audit.md` — 概念页：harness-audit 合规自检 Skill
  - `wiki/comparisons/vibe-coding-vs-harness-engineering.md` — 对比表：Vibe Coding vs Harness
- **更新页面（2 个）**:
  - `wiki/summaries/2026-04-09-harness-engineering-practice.md` — Related 区追加新页面链接
  - `index.md` — 添加 6 条新条目 + 1 条对比表 + 标签云更新
- **共 8 个页面变更**

---

## [2026-05-18 17:40] ingest | 摄取 CodeBuddy + 腾讯文档自媒体工作流

- **原始文件**: `raw/Clipper/我用 CodeBuddy + 腾讯文档，搭了一套自媒体内容生产工作流 - 腾讯游戏知识库 - KM平台.md`
- **作者**: 算法一只狗（公众号）
- **归属轨道**: 学习轨（learn）
- **新建页面（2 个）**:
  - `wiki/summaries/2026-05-18-codebuddy-tencent-docs-workflow.md` — 摘要页
  - `wiki/codebuddy-content-workflow.md` — 概念页：CodeBuddy + 腾讯文档自媒体内容生产工作流
- **更新页面（2 个）**:
  - `wiki/content-creation-methodology.md` — 追加"工具化实践"章节 + 新来源引用
  - `index.md` — 添加 2 条新条目 + 标签云更新
- **共 4 个页面变更**

---

## [2026-05-18 11:15] ingest | 摄取 raw/clipper 文章

## [2026-05-18 11:25] ingest | 更新型摄取 Amir 原帖

- **原始文件**: `raw/clipper/How I built Gucci x Crocs campaign from 1 image + GPT-v2...md`
- **类型**: 更新型 ingest（该案例已有 wiki 页面，补充原帖独有信息）
- **新增信息**: 5 步完整 Prompt 原文、LTX Studio 工作流步骤、Bonus 资源链接
- **更新页面（4 个）**:
  - `wiki/summaries/2026-05-13-gucci-crocs-campaign-gpt-v2.md` — 追加五步 Prompt 原文 + LTX 工作流 + bonus 资源
  - `wiki/ai-campaign-prototyping.md` — 五步流程重写为含 Prompt 版 + 新增 LTX Studio 工作流章节
  - `wiki/gpt-image-v2.md` — 更新文字叠加局限的解决方案 + patch prompt 引用
  - `wiki/people/amir-mushich.md` — 更新资源区（LTX 项目/Font Builder/LinkedIn 查询/原帖链接）

- **原始文件**: `raw/clipper/上周做了场内部分享，关于我做AI这三年来总结的内容创作方法论。.md`
- **作者**: 数字生命卡兹克
- **新建页面**:
  - `wiki/summaries/2026-05-18-ai-content-methodology.md` — 摘要页
  - `wiki/content-creation-methodology.md` — 概念页：内容创作方法论三步框架
  - `wiki/defamiliarization.md` — 概念页：陌生化（找角度核心技巧）
  - `wiki/content-rhythm.md` — 概念页：内容节奏设计
  - `wiki/people/khazik.md` — 人物页：数字生命卡兹克
- **更新页面**: `index.md`（添加5条新条目 + 标签云更新）
- **共 6 个页面变更**

---

## [2026-05-18 10:20] AI Weekly | 周报生成 · 2026.05.12–05.18 Issue #08

- **主题**：AI 视频生成军备竞赛周
- **执行**：扫描 65 信源近 7 天推文，筛选 9 条实用干货
- 生成周报 MD：raw/daily-reports/AI_Practical_Weekly_Report_20260518.md
- 生成 TOC 版 H5：docs/ai-daily/ai-weekly-card-20260518-toc.html（Soft Editorial + 粉色侧边栏高亮）
- 更新归档首页：docs/ai-daily/index.html（DATA 顶部追加条目）
- Git commit：f309b84 feat: AI weekly 2026.05.12–05.18 Issue #08
- Git push origin main → GitHub Pages 部署成功
- **关键内容**：
  - Seedance 2.0 四模态混合输入
  - Veo 3.1 视频+同步音频一体化
  - MJ V7 Omni Reference 角色一致性
  - Codex /goal 长时域模式
  - Kimi K2.6 Agent Swarm 300 子 Agent
- **在线地址**：https://wangqi422.github.io/catwang-llm-wiki/docs/ai-daily/ai-weekly-card-20260518-toc.html

---

## [2026-05-17 09:30] AIGC Daily | 日报生成 · 2026.05.17

- 执行 5 轮分批 Web Search（65 信源），筛选 TOP 8 条动态
- 生成日报 MD：raw/daily-reports/AIGC_Daily_Report_20260517.md
- 生成 TOC 版 H5：docs/ai-daily/ai-daily-card-20260517-toc.html（Soft Editorial + 柠檬黄侧边栏高亮）
- 更新归档首页：docs/ai-daily/index.html（DATA 顶部追加条目）
- Git push origin main → GitHub Pages 部署成功
- 企微群推送成功（文字摘要 + H5 在线链接）
- 在线地址：https://wangqi422.github.io/catwang-llm-wiki/docs/ai-daily/ai-daily-card-20260517-toc.html

---

## [2026-05-15 10:13] Ingest | 摄取 PureRef v2.0 快捷键速查

- 摄取 raw/articles/pureref-shortcuts-v2.md
- 创建 1 个摘要页：2026-05-15-pureref-shortcuts-v2
- 创建 1 个概念页：pureref
- 更新 glossary.md（注册 pureref 标签）
- 更新 index.md
- 共 2 个页面变更

---

## [2026-05-13 19:00] Ingest | 摄取 Gucci × Crocs Campaign + GPT Image v2 教程

- 摄取网络文章（AI Primer + 优设网）→ raw/articles/gucci-crocs-campaign-gpt-image-2.md
- 创建 1 个摘要页：2026-05-13-gucci-crocs-campaign-gpt-v2
- 创建 2 个概念页：ai-campaign-prototyping / gpt-image-v2
- 创建 1 个人物页：people/amir-mushich
- 创建 1 个对比表：comparisons/traditional-vs-ai-campaign-workflow
- 更新 index.md
- 共 6 个页面变更

---

## [2026-05-09 14:21] Ingest | 摄取 CODM 项目资料（5 个 raw 文件）

- 摄取 raw/worksheets/CODM项目资料.md + raw/articles/codm-vfx-analysis-complete.md + raw/articles/call-of-duty-cg-vfx-classification.md + raw/articles/call-of-duty-cg-vfx-analysis.md + raw/articles/call-of-duty-cg-links-collection.md
- 创建 3 个摘要页：2026-05-09-codm-project-resources / 2026-04-11-codm-vfx-analysis / 2026-04-11-cod-cg-technology
- 创建 5 个概念页：codm-asset-pipeline / codm-vfx-system / cod-cg-production / pbr-rendering / iw-engine
- 创建 2 个实体页：people/territory-studio / people/platige-image
- 更新 index.md
- 共 10 个页面变更

---

## [2026-05-09 13:37] Init | 知识库双轨制架构初建

- 整合 `E:\catwang-llm-wiki`（原 my-llm-wiki 工作自动化仓库）+ `E:\小柒知识库建立`（个人学习仓库）
- 新仓库：`E:\catwang-llm-wiki`
- 架构：双轨制（work/ + learn/）+ 共享知识底座（wiki/）
- 基于 Karpathy LLM-Wiki 理念

## [2026-05-19 09:30] daily-card | AIGC 日报 2026.05.19

- **操作**: 执行 AIGC 日报完整流水线
- **Phase 1**: 5轮WebSearch扫描65信源，筛选8条最新动态
- **Phase 2**: 生成日报MD → `raw/daily-reports/AIGC_Daily_Report_20260519.md`
- **Phase 3**: 生成 Soft Editorial + TOC H5 → `docs/ai-daily/ai-daily-card-20260519-toc.html`
- **Phase 4**: 更新归档首页 → git push → 企微推送成功
- **TOP 8**:
  1. Google I/O 2026 + Gemini Omni (9.5)
  2. Anthropic $9000亿估值 (9.2)
  3. 马斯克 v. OpenAI 落槌 (8.8)
  4. 美国前沿模型监管框架 (8.7)
  5. SpaceX × xAI 合并 (8.5)
  6. Snap 裁员 65% 代码AI (8.3)
  7. 百度AI收入过半 + 阿里千问 (8.0)
  8. Karpathy 代理工程 (7.8)

## [2026-05-20 12:10] Daily | AIGC 日报补发
- 生成 `raw/daily-reports/AIGC_Daily_Report_20260520.md`
- 生成 `docs/ai-daily/ai-daily-card-20260520-toc.html`
- 更新 `docs/ai-daily/index.html` 归档条目
