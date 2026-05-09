---
title: "Multica — 开源托管代理平台"
type: summary
created: "2026-04-10"
updated: "2026-04-15"
sources:
  - "[[raw/articles/multica-managed-agents-platform.md]]"
tags:
  - ai-agent
  - open-source
aliases: []
---

# Multica — 开源托管代理平台

## 一句话总结

Multica 是一个开源的托管代理平台，将 Coding Agent（Claude Code、Codex 等）包装为"团队成员"，通过看板式任务分配、自主执行和技能复用实现多 Agent 协作开发。

## 关键要点

- **代理即队友**：Agent 拥有个人资料、在看板上显示、参与对话、创建 Issue、主动报告阻碍，行为模式模拟人类队友
- **全生命周期管理**：任务流转为 入队→认领→开始→完成/失败，支持 WebSocket 实时进度推送
- **技能复用**：每次解决方案自动沉淀为团队可复用技能（部署、迁移、Code Review 等），能力随时间积累
- **统一运行时**：一个仪表板管理本地+云端所有计算资源，兼容 Claude Code、Codex、OpenClaw、OpenCode
- **技术栈**：Next.js 16 + Go + PostgreSQL 17 (pgvector)，支持 Docker 自托管或云端服务

## 详细摘要

### 定位与核心理念

Multica 的核心理念是"像对待同事一样给 Agent 分配任务"。它不是一个新的 AI 模型或 Agent 框架，而是一个**管理和调度**已有 Coding Agent 的平台层。用户在看板上创建任务，Agent 自动认领并执行，过程中通过 WebSocket 实时同步进度，遇到阻碍会主动报告。

### 技术架构

前端采用 Next.js 16（App Router），后端使用 Go 构建（Chi router + sqlc + gorilla/websocket），数据库为 PostgreSQL 17 with pgvector（支持向量检索）。Agent 运行时是本地守护进程，负责调度和执行各种 CLI 工具。代码库以 TypeScript（55.6%）和 Go（41.6%）为主。

### 与 Harness Engineering 的对比

Multica 代表的是多 Agent 协作的"平台化 + 动态调度"方向，与 [[wiki/concepts/harness-engineering.md|Harness Engineering]] 的"固定角色 + 固定流程"结构化调度形成互补。Harness Engineering 追求确定性和可审计性，而 Multica 更强调灵活性和自主性。对于需要严格工程控制的场景，Harness 更合适；对于多人多项目并行的团队协作场景，Multica 提供了更好的可视化和管理能力。

### 社区与成熟度

项目获得 5.4k Stars 和 663 Forks，最新版本 v0.1.22（2026-04-10），共 2,079 次提交。仍处于早期快速迭代阶段（v0.x），但社区活跃度较高。

## 重要引用

> "Assign tasks like you would to a colleague. Agents pick up work, write code, report blockers, and update status — cutting out copy-paste prompting and manual oversight." — Multica GitHub README

## 相关概念

- [[wiki/concepts/managed-agents-platform.md]] — 托管代理平台概念
- [[wiki/concepts/sub-agent.md]] — 多角色 AI 分工
- [[wiki/concepts/harness-engineering.md]] — AI 协作接力规则
- [[wiki/concepts/harness-engineering.md]] — Agent 工程化控制系统

## Related

- [[wiki/concepts/managed-agents-platform.md]]
- [[wiki/topics/multi-agent-engineering.md]]
- [[wiki/concepts/sub-agent.md]]
- [[wiki/concepts/harness-engineering.md]]
- [[wiki/comparisons/single-agent-vs-multi-agent.md]]
