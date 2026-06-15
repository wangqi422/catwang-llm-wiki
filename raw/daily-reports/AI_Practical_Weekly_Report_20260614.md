# AI 干货周报 · 2026.06.08 - 06.14

> 自动扫描 65 个顶级 AI Builder / 官方账号的近 7 天公开信号，
> 只筛选立刻能用的工具、工作流与方法论。

## 作者
小柒AI速递

## 本期先说结论
这周是名副其实的「Agent 工作流爆发周」：Anthropic 发布了 Claude Fable 5 + Dynamic Workflows，Google 把 Managed Agents 推入公测，Kimi 开源 K2.7 Code 编程模型，Kling 2.6 把声音和画面一次性生成。从模型能力到工具链到创作工具，全栈在往"AI 自己干活"演进。
本期精选 9 条，每一条都今天能试。

## 🔗 本周自我连接（Vault Connection Surface）

> 本周 vault 自检发现的关键非显式连接：

1. **Claude Dynamic Workflows ↔ midjourney-locking-pattern**：Anthropic 的 fan-out-and-synthesize 模式，与 vault 中「单一变量锁定法」本质同构——都是用约束缩小搜索空间后并行展开。建议合并为 [[constraint-driven-parallelism]]。
2. **Kling 2.6 音视频一体 ↔ codm-cg-vfx-ai-sop**：Kling 的原生音频+视频协同，直接挑战 CODM 宣发流水线中"先做画面再后期配音"的传统流程。建议更新 SOP 加入音视频一体生成路径。

---

## 🛠️ 实用工具箱 (Tools & Apps)

### 1. Claude Fable 5 — Anthropic 双层架构新旗舰

Claude Fable 5 是 Anthropic 最强的公开模型，MMLU-Pro 98.3%，同时推出受限版 Claude Mythos 5（仅对安全合作伙伴开放）。Fable 5 在 Claude Code 中通过 `/model fable` 即可切换，支持 Dynamic Workflows 动态编排子 Agent。

- **获取方式**：Claude Code v2.1.170+ → `/model fable`；API 端点已上线
- **上手建议**：Pro/Max/Team 用户可直接用；企业版需升级至最新 SDK
- **Source**: *@AnthropicAI*

### 2. Google Managed Agents — 一行 API 调出沙箱 Agent

Google 在 Gemini API 公测了 Managed Agents：一次 API 调用即分配一个远程沙箱 Linux 环境，Agent 可在其中规划、执行代码、管理文件、浏览网页——全托管，无需基础设施。这是 Google 对标 OpenAI Code Interpreter 和 Anthropic Computer Use 的产品。

- **获取方式**：Gemini API / Google AI Studio → Managed Agents 公测通道
- **上手建议**：先在 AI Studio 中试用沙箱环境，再迁移到 API 自动化流程
- **Source**: *@GoogleDeepMind*

### 3. Kling 2.6 — 音视频一次生成，告别后期配音

可灵 2.6 最大的突破是**原生音频+视频一体化生成**：对白、音效、环境音在一次生成中与画面协同设计，不需要先生成视频再后期拼音频。对 CODM 宣发场景来说，这意味着 CG 短片可以直接带声音出稿。

- **获取方式**：可灵官网 / Layer 平台已上线
- **上手建议**：试一个 10 秒动作场景 + 对白提示词，体验音视频同步生成
- **Source**: *@BytedanceTalk*

---

## ⚡ 高效工作流 (Workflows & Hacks)

### 4. Claude Code Dynamic Workflows — JS 驱动子 Agent 编排

Anthropic 发布了 Dynamic Workflows 引擎，让 Claude Code 从"问答式助手"变成"自动化引擎"。用户写一段 JS 包装器即可：① 生成多个子 Agent 并行处理 ② 路由输出到后处理函数 ③ 用对抗验证循环迭代。内置模板：日志分析、简历排序、Bug 分诊、论点验证。

**痛点场景**：多步骤任务（如分析一个月 Slack 日志）需要反复手动触发 Agent。

**AI 解决路径**：
1. 编写 JS wrapper，定义 fan-out 逻辑（拆分问题 → 分发子 Agent → 聚合结论）
2. 或用 Anthropic 内置模板，`import { logAnalysis } from '@anthropic/workflows'`
3. 设置对抗验证：一个 Agent 产出论点，另一个 Agent 反驳，仅当反驳失败时接受论点

**预期效果**：长任务处理时间缩短 60-80%，减少人工中间检查环节。

*Source: @AnthropicAI*

### 5. HeyGen 全平台视频整合 — Sora/Veo/Kling 一站式

HeyGen 6 月大更新：直接在平台内集成 Sora、Veo、Kling 三大视频生成模型，加上虚拟人像和编辑能力，成为真正的一站式视频生产中心。营销团队不再需要 5-6 个 SaaS 订阅来回切换。

**痛点场景**：品牌视频需要跨 Sora（电影质感）、Veo（快速出稿）、Kling（风格控制）三个平台切换。

**AI 解决路径**：
1. 在 HeyGen 中选模型 → 输入同一份 Prompt
2. A/B 对比三模型输出，选出最佳版本
3. 在 HeyGen 内添加虚拟人像 + 配音，一条龙出稿

**预期效果**：视频迭代周期从 2-3 天缩短到 2-3 小时。

*Source: @heygen_official*

### 6. NotebookLM Agentic Research — 从"问答助手"到"研究 Agent"

Google 6 月 8 日升级 NotebookLM：不再需要提前准备完整资料集，可以先用零散想法开始，Agent 自动用 Google Search 发现相关来源。每个 Notebook 内置安全云电脑，可以跑代码、出图表、导出 PPT/PDF/Excel。

**痛点场景**：分析师花 60% 时间在收集、验证、格式化资料，而非分析本身。

**AI 解决路径**：
1. 输入松散的研究问题 → NotebookLM 自动发现并推荐相关来源
2. 在 Notebook 内跑 Python 分析 → 直接出图表
3. 一键导出 PPT/PDF → 跳过所有格式化环节

**预期效果**：研究到出稿时间压缩 70%，告别"资料-分析-排版"三步走。

*Source: @GoogleDeepMind*

---

## 🧠 方法论与 Prompt (Methods & Prompts)

### 7. Karpathy 四原则 — 让 AI 编程从"赌运气"变"可控"

Karpathy 总结的 AI 编程四条铁律，实测将任务成功率从 59% 提升到 97%，Bug 引入率从 22% 降到 3%：

**核心理念**：AI 编程的核心矛盾是"它能做的远多于它应做的"——克制即智慧。

**Prompt 模板**（直接复制进 CLAUDE.md）：

```
# 开发原则

## 1. 先想再写（Think Before Coding）
- 动手前先复述需求，不确定就提问，不要猜
- 要改现有代码，先读懂相关部分再动
- 拿不准某个函数存不存在，先确认再用

## 2. 先求简单（Simplicity First）
- 用能解决问题的最简方案，不引入用不上的抽象
- 不为"将来可能用到"提前造轮子（YAGNI）
- 加新依赖前先问：标准库或现有依赖能不能做

## 3. 外科手术式改动（Surgical Changes）
- 只改跟当前任务直接相关的行；不顺手重构
- 一次提交只做一件事
- 看到别处想优化，先列出来问我

## 4. 目标驱动（Goal-Driven Execution）
- 动手前先说清"怎么算做完"（验收标准）
- 每个改动都要跑通对应测试
- 交付时说明：改了什么、为什么这么改、怎么验证的
```

**实战案例**：一个 Django 项目"添加用户权限控制"——无原则版 AI 实现了完整 RBAC 系统（800+ 行，引入 7 个新模型）；四原则版 AI 先问需求细节，最终只改 120 行，一次 Code Review 通过。

*Source: @karpathy*

### 8. RCCF Prompt 框架 — 2026 年 Prompt 工程标准

2026 年 Prompt 工程已从"写更长的指令"进化到"写更清晰的规格书"。RCCF（Role + Context + Constraints + Format）是当前最通用的四块结构：

**核心理念**：把 Prompt 当技术需求文档写——角色、背景、约束、格式，缺一不可。

**Prompt 模板**：

```
ROLE: 你是 [具体角色+专业领域+经验级别]
CONTEXT: [谁在看、当前痛点、已有材料]
CONSTRAINTS:
- [禁止用语/格式]
- [字数/长度限制]
- [必须包含/必须排除的内容]
- [语气/风格要求]
FORMAT: [输出结构：JSON/Markdown表格/分段式...]
```

**实战案例**：

```
ROLE: 你是资深游戏宣发文案，专精 FPS 品牌海报
CONTEXT: 目标受众是 18-30 岁男性玩家，喜欢硬核军事美学
CONSTRAINTS:
- 禁用"震撼""革命性""赋能"等营销套话
- 每句不超过 20 字
- 必须包含一个数字（版本号/武器数/地图数）
FORMAT: 3 句话：1 句钩子 + 1 句核心卖点 + 1 句 CTA
```

*Source: @karpathy, @swyx*

### 9. Dreaming V3 记忆架构 — 让 ChatGPT 真正"认识你"

OpenAI 6 月 4 日上线 Dreaming V3，ChatGPT 记忆系统的最大升级：后台进程自动跨年对话合成用户画像——项目、偏好、旅行、习惯，无需手动"记住这个"。时间感知能力：说"7 月去新加坡"，回来后自动更新记忆。计算量降 5x，首次面向免费用户开放。

**核心理念**：从"你告诉 AI 记什么"到"AI 主动理解你是谁"——记忆即上下文工程。

**Prompt 模板**（引导 AI 建立有效记忆）：

```
在我的个人信息中，请确保以下维度是最新的：
1. [当前项目/工作重点]
2. [偏好风格/工具链]
3. [近期日程/旅行计划]

如果你注意到某个记忆条目已过时（如已完成的旅行、已结束的项目），
请主动询问是否需要更新，而不是保留过时信息。
```

**实战案例**：告诉 ChatGPT "我在做 CODM S39 赛季海报"，之后每次对话它自动带入 CODM 品牌色、当前赛季主题、历史设计偏好，省去每次重新描述上下文。

*Source: @OpenAI*

---

## 📌 推荐上手顺序

| # | 条目 | 学习成本 | 价值收益 | 优先级 |
|---|------|---------|---------|--------|
| 1 | Karpathy 四原则 | ⭐ 5 分钟复制 CLAUDE.md | ⭐⭐⭐⭐⭐ 立刻降低 AI 编程错误 | 🔥 必做 |
| 2 | RCCF Prompt 框架 | ⭐ 5 分钟套模板 | ⭐⭐⭐⭐ 统一所有 Prompt 质量 | 🔥 必做 |
| 3 | Claude Fable 5 | ⭐⭐ 切换模型 | ⭐⭐⭐⭐⭐ 最强公开模型 | 🔥 必试 |
| 4 | Kling 2.6 音视频 | ⭐⭐ 写提示词 | ⭐⭐⭐⭐ 宣发视频直接带声音 | 推荐 |
| 5 | NotebookLM Agent | ⭐⭐ 输入研究问题 | ⭐⭐⭐⭐ 研究到出稿一条龙 | 推荐 |
| 6 | Google Managed Agents | ⭐⭐⭐ API 调用 | ⭐⭐⭐ 全托管沙箱 Agent | 进阶 |
| 7 | Claude Dynamic Workflows | ⭐⭐⭐ 写 JS wrapper | ⭐⭐⭐⭐ 子 Agent 编排 | 进阶 |
| 8 | HeyGen 整合平台 | ⭐⭐ 选模型+输 Prompt | ⭐⭐⭐ 视频一站式生产 | 推荐 |
| 9 | Dreaming V3 记忆 | ⭐ 什么都不用做 | ⭐⭐⭐⭐ 自动理解你 | 已上线 |

---

*—— 小柒AI速递 · 每周一上午推送*
