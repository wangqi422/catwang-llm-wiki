---
title: "万字长文教你如何打造自己的 Harness Engineering"
type: summary
created: "2026-04-09"
updated: "2026-04-15"
sources:
  - "[[raw/articles/万字长文教你如何打造自己的 Harness Engineering - KM平台.md]]"
tags:
  - harness
  - ai-agent
  - protocol
aliases: []
---

# 万字长文教你如何打造自己的 Harness Engineering

## 一句话总结

本文以真实项目 JK Launcher 为案例，从零到一完整拆解了 Harness Engineering 的 12 章搭建过程——从概念定义、SPEC 先行、Rule/Skill 分层，到七角色多 Agent 结构化调度、总验证脚本闭环、项目级知识库（dev-map + 任务看板），最终收束为"约束与流程、反馈、知识库、进化"四块拼图。

## 关键要点

- **Harness Engineering 定义**：不是某个工具或提示词技巧，而是一整套让 AI 在工程里稳定产出正确结果的工程系统——可约束、可协作、可校验、可持续维护 [[wiki/concepts/harness-engineering.md]]
- **六大核心零件**：Rule（规矩）、Skill（标准操作手册）、Sub Agent（角色分工）、Workflow（接力规则）、Scripts（硬门禁）、MCP（外接能力接口），逐层叠加而非互相替代
- **SPEC 先行**：第一步不是写 Rule 或拆 Agent，而是先磨出设计规格文档，把目标、边界、验收标准与 AI 反复聊透 [[wiki/concepts/harness-engineering.md]]
- **Rule 的天花板**：Rule 是软约束，AI 会忽略、绕过、解释性执行；Rule 只能做"原则约束"，不能做"流程执行" [[wiki/concepts/harness-engineering.md]]
- **Skill 标准化**：将编译、测试、验证等高频固定动作从 Rule 中拆出，做成 AI 的"标准操作手册" [[wiki/concepts/harness-engineering.md]]
- **结构化多 Agent**：选择固定角色 + 固定流程的结构化调度，而非去中心化协作或动态生成——"真正贵的不是 token，真正贵的是失控" [[wiki/topics/multi-agent-engineering.md]]
- **七角色体系**：PM（路由器）→ 需求分析 → 方案设计 → 闸门总控 → 开发实现 → 代码审查 → 测试验证 [[wiki/concepts/sub-agent.md]]
- **总验证脚本**：整个 Harness 最关键的基础设施之一，把"完成"从 AI 的主观汇报变成可检查的客观结果 [[wiki/concepts/harness-engineering.md]]
- **项目级知识库**：dev-map（开发导航图）+ 任务看板（需求态势板），给 AI 项目级记忆 [[wiki/concepts/harness-engineering.md]]
- **Memory 靠边站**：团队级 Harness 中，团队要对齐的真相应落在仓库资产中，Memory 只是润滑剂，不能当规范源
- **人与 AI 关系**：人从"执行者"上移为"系统设计者"和"最后责任人"，AI 是执行力极强但必须被制度化管理的团队
- **四块拼图**：约束与流程 + 反馈 + 知识库 + 进化，缺一块都会出典型症状

## 详细摘要

### 第一部分：概念定义与起步（第 1-4 章）

文章首先厘清了六个最容易混淆的概念：**Rule**（工程规矩/底线）、**Skill**（固定动作的标准操作手册）、**Sub Agent**（分工明确的 AI 角色）、**Workflow**（接力赛规则）、**Scripts**（硬门禁和事后验证）、**MCP**（外接能力的标准插座）。它们逐层叠加：Rule 负责底线 → Skill 标准化高频动作 → Scripts 判断结果对不对 → Sub Agent 拆分角色 → Workflow 定义接力顺序 → MCP 延伸到外部系统。

起步时，作者强调 **SPEC（设计规格文档）先行**——先和 AI 反复磨透需求、边界、验收标准，而非直接写 Rule。随后发现仅靠 SPEC 不够，AI 不会百分百按文档执行，于是引入 Rule。但 Rule 也有天花板：AI 会忽略、绕过、找理由。于是将固定流程从 Rule 中拆出做成 Skill，让 Rule 变轻、AI 执行更稳。

### 第二部分：结构化多 Agent（第 5-7 章）

当需求变复杂，单 Agent 开始失稳。作者对比了三种路线：继续强化单 Agent（角色冲突越来越严重）、去中心化协作（好看但难维护）、结构化调度（流程清晰可审计）。最终选择结构化调度。

七个 Agent 不是拍脑袋拆出来的，而是被问题一步步逼出来的：先拆需求分析/方案设计/开发实现三层骨架 → 补闸门总控 → 补代码审查和测试验证两层收口 → 补只做路由的 PM。同时给不同 Agent 配不同档位的模型以控制成本。

真正落地后经历了六轮补稳：下游改上游文档 → PM 越界 → Agent 专业性不足 → Rule 约束不够用 → Agent 偷懒需要基线对比 → 流程本身难维护（补流程定义文件 + 角色契约 + 流程校验脚本）。

### 第三部分：反馈闭环与项目知识（第 8-10 章）

总验证脚本是整套 Harness 最关键的基础设施之一。它把静态规范检查、编译、测试、工程一致性等收成统一入口，使"完成"的定义从 AI 主观汇报变为脚本客观判定。事后验证补上的不是一个步骤，而是整个反馈闭环。

项目级知识库通过 dev-map（开发导航图，由开发 Agent 维护）和任务看板（由 PM 维护）实现。核心不是给 AI 塞百科全书，而是给一套够准的索引。

关于 Memory，作者态度明确：团队级 Harness 中，"手册应进仓库，别只靠聊天记忆"。Memory 可以用于个人偏好，但团队要对齐的东西必须落在仓库可见、可审计、可交接的资产上。

### 第四部分：全貌与未来（第 11-12 章）

文章最终将 Harness 收束为四块拼图：**约束与流程**（怎么按节奏纪律推进）、**反馈**（做出来的算不算过关）、**知识库**（从哪读起的索引）、**进化**（人与 AI 共同驱动 Harness 自身改版）。四块相辅相成，缺一块都有典型症状。

未来方向包括：更多规则脚本化、流程产品化（状态机 + LangGraph）、项目类型模板、以及通过 MCP 将闭环从开发延伸到构建→签名→制品→发布→回写的完整工程交付。

## 重要引用

> "Harness Engineering 就像是在给 AI 搭一整套'工程作战系统'。规格设计文档是作战目标，Rule 是纪律，Skill 是标准动作，Sub Agent 是兵种分工，Workflow 是指挥链，Scripts 是验收和反馈闭环。" — [[raw/articles/万字长文教你如何打造自己的 Harness Engineering - KM平台.md]]

> "真正贵的不是 token，真正贵的是失控。" — [[raw/articles/万字长文教你如何打造自己的 Harness Engineering - KM平台.md]]

> "Rule 不是没用，而是 Rule 只能做'原则约束'，不能做'流程执行'。" — [[raw/articles/万字长文教你如何打造自己的 Harness Engineering - KM平台.md]]

> "Harness 不是只靠相信 AI，而是靠不断补机制，让它没有太多偷懒空间。" — [[raw/articles/万字长文教你如何打造自己的 Harness Engineering - KM平台.md]]

> "先让 AI 知道该做什么，再让它知道必须怎么做，再让它在复杂任务里学会分工，最后再让整套流程本身变成可维护的工程资产。" — [[raw/articles/万字长文教你如何打造自己的 Harness Engineering - KM平台.md]]

## Related

- [[wiki/concepts/harness-engineering.md]] — 核心概念（含 Rule/Skill/Workflow/Scripts/SPEC/dev-map）
- [[wiki/concepts/sub-agent.md]] — 多角色 AI 分工
- [[wiki/concepts/mcp-protocol.md]] — 外接能力接口
- [[wiki/topics/multi-agent-engineering.md]] — 上级主题
- [[wiki/comparisons/single-agent-vs-multi-agent.md]] — 路线对比

<details><summary>See Also</summary>

- [[wiki/summaries/2026-04-08-grok-karpathy-llm-wiki.md]]

</details>
