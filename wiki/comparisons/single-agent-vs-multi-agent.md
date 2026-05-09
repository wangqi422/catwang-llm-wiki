---
title: "单 Agent vs 多 Agent 路线对比"
type: comparison
created: "2026-04-09"
updated: "2026-04-15"
sources:
  - "[[raw/articles/万字长文教你如何打造自己的 Harness Engineering - KM平台.md]]"
tags:
  - comparison
  - ai-agent
  - harness
aliases: []
---

# 单 Agent vs 多 Agent 路线对比

## 概述

在 [[wiki/concepts/harness-engineering.md|Harness Engineering]] 实践中，当单 Agent 在复杂需求下开始失稳，需要选择多 Agent 路线。JK Launcher 项目对比了三种路线后，最终选择了结构化调度。

## 对比表

| 维度 | 继续强化单 Agent | 去中心化协作 | 结构化调度 |
|------|-----------------|-------------|-----------|
| **看起来最吸引人的地方** | 成本最低、改造最少 | 灵活、像 AI 团队自由讨论 | 流程清晰、文档化强、可审计 |
| **真正的问题** | 角色冲突越来越严重，长链路易失稳 | 路径不稳定、责任边界不清、难长期维护 | 前期设计成本高、产物多 |
| **流程稳定性** | 中（依赖单一上下文） | 低（每次可能走不同路径） | 高（固定阶段和迁移边） |
| **可维护性** | 中（Rule 堆积） | 低（好看但难维护） | 高（流程定义文件 + 角色契约） |
| **可审计性** | 低（过程不透明） | 低（决策路径不确定） | 高（完整文档链） |
| **角色替换** | 不适用 | 难（角色边界漂移） | 易（契约在则边界在） |
| **典型代表** | 单 Cursor/Claude Agent | AutoGen GroupChat | JK Launcher 七角色体系 |
| **最终结论** | 早期阶段有效，不能成为最终形态 | 被明确放弃 | 最终选择的主路线 |

## 结构化调度内部的进一步选择

| 做法 | 特点 | 选择 |
|------|------|------|
| **A: 固定角色 + 固定流程** | 稳定、易维护、易沉淀规范 | 选择 |
| **B: 固定 PM + 动态生成 Agent** | 灵活但角色边界漂、维护成本高 | 放弃 |

## 结论

> "真正贵的不是 token，真正贵的是失控。"

对长期维护的真实工程来说，可控、可追踪、可复用比"理论上更灵活"重要得多。结构化调度是灵活性与稳定性之间最务实的选择。

## Related

- [[wiki/concepts/sub-agent.md]]
- [[wiki/concepts/workflow.md]]
- [[wiki/concepts/harness-engineering.md]]
- [[wiki/topics/multi-agent-engineering.md]]
- [[wiki/summaries/2026-04-09-harness-engineering-practice.md]]
