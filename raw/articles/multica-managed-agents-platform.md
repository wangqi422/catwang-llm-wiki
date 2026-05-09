# Multica — The Open-Source Managed Agents Platform

> 来源: https://github.com/multica-ai/multica
> 获取时间: 2026-04-10
> 原始链接: https://t.co/mLCPJe965E

---

## 项目概述

**Multica** 是一个开源的托管代理平台（Managed Agents Platform），旨在将编程代理（Coding Agents）转变为真正的团队成员。核心理念：像对待同事一样给 Agent 分配任务，Agent 会主动接手工作、编写代码、报告阻碍并更新状态。

- **GitHub**: https://github.com/multica-ai/multica
- **官网**: https://multica.ai
- **Stars**: 5.4k
- **Forks**: 663
- **最新版本**: v0.1.22（2026-04-10）
- **许可证**: 开源
- **提交数**: 2,079

---

## 核心理念

> Assign tasks like you would to a colleague. Agents pick up work, write code, report blockers, and update status — cutting out copy-paste prompting and manual oversight.

兼容的 Agent CLI：
- Claude Code
- Codex
- OpenClaw
- OpenCode

---

## 主要功能

### 1. 代理即队友（Agents as Teammates）
Agent 拥有个人资料，在看板上显示，参与对话，创建 Issue，并主动报告阻碍。

### 2. 自主执行（Autonomous Execution）
全任务生命周期管理：入队 → 认领 → 开始 → 完成/失败。支持通过 WebSocket 进行实时进度流传输。

### 3. 可复用技能（Compounding Skills）
每个解决方案都会成为团队可复用的技能（如部署、迁移、代码审查），随时间积累团队能力。

### 4. 统一运行时（Unified Runtime）
一个仪表板管理所有计算资源（本地守护进程和云运行时），自动检测可用的 CLI。

### 5. 多工作区（Multi-Workspace）
支持跨团队组织工作，具有工作区级别的隔离。

---

## 技术架构

| 层 | 技术 |
|---|---|
| 前端 | Next.js 16 (App Router) |
| 后端 | Go (Chi router, sqlc, gorilla/websocket) |
| 数据库 | PostgreSQL 17 with pgvector |
| Agent 运行时 | 本地守护进程，执行 Claude Code, Codex, OpenClaw, OpenCode |

### 编程语言构成
- TypeScript: 55.6%
- Go: 41.6%
- MDX: 1.3%
- 其他: CSS, Shell, Makefile 等

---

## 部署方式

### 1. 云端服务（Multica Cloud）
直接访问 https://multica.ai 使用。

### 2. Docker 自托管
需要 Docker 和 Docker Compose，克隆仓库后配置 `.env` 并运行 `docker compose`。

---

## 与其他方案的关系

Multica 代表了多 Agent 协作的"平台化"方向：
- 不同于 Harness Engineering 的"固定角色 + 固定流程"结构化调度
- 更接近"动态调度"路线，Agent 可以自主认领任务
- 强调技能复用和团队能力积累
- 提供看板式的可视化管理界面

---

## 适用场景

- 团队级 AI 辅助开发（多人多 Agent 并行）
- 跨项目的 Agent 技能复用
- 需要任务追踪和进度可视化的场景
- 已有多个 coding agent CLI 需要统一管理的场景

## 不太适合的场景

- 单人小项目（运维成本过高）
- 纯知识管理类项目（非代码生产场景）
- 对 Agent 行为需要严格确定性控制的场景（Harness Engineering 更合适）
