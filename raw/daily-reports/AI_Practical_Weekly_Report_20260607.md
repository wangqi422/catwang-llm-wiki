# AI 干货周报 · 2026.06.01 - 2026.06.07

> 自动扫描 65 个顶级 AI Builder / 官方账号的近 7 天公开信号，  
> 只筛选立刻能用的工具、工作流与方法论。

## 作者
小柒AI速递

## 本期先说结论
这周是名副其实的「**Agent 工作流周**」：Claude Code 动态工作流正式上线，一次性可调度数百个子 Agent 并行工作；MiniMax M3 发布，百万上下文 + 原生多模态 + 编程能力超越 GPT-5.5；DeepSeek V4 系列全面开源，1M 上下文成为标配。本期精选 **9 条**，每一条都今天能试。

## 📌 本周自我连接发现

根据 vault 连接扫描（[[weekly-connections-2026-W23]]），本周发现 **4 条非显式连接**：
- **🔗 PRINCIPLE**：[[constraints-as-leverage]] 与 [[character-consistency-aigc]] 共享「约束即杠杆」原理
- **🔗 PRINCIPLE**：[[agent-stack-mcp-a2a]] 与 [[multi-agent-engineering]] 可整合为 Agent 架构分层
- **📎 EVIDENCE**：[[eye-realism-prompt-technique]] 可作为 [[urban-character-prompt]] 的子环节
- **🌀 PATTERN**：INDEX-by-type / weekly-audit / CHIEF 三者共同构成 vault 健康度监控体系

---

## 🛠️ 实用工具箱 (Tools & Apps)

### 1. Claude Code 动态工作流 —— 一个 AI 指挥几百个 AI 干活
Anthropic 正式推出 Dynamic Workflows，让 Claude Code 能够编写 JavaScript 调度脚本，同时启动数十至数百个并行子 Agent 分头干活、互相审查，最后交付验证过的结果。

**核心能力**：
- **跨并行 Agent 扇出扩展**：任务拆分为子任务同步运行
- **Agent 自我检验**：独立 Agent 以对抗性视角审查彼此发现
- **断点恢复**：长时间任务可暂停后恢复
- **编排逻辑可复用**：保存为斜杠命令重复使用

**获取方式**：Claude Code CLI / Desktop / VS Code 扩展（Max、Team、Enterprise 计划）

**上手建议**：
1. 在提示词中包含 "workflow" 关键词触发
2. 或运行 `/deep-research` 体验内置调研工作流
3. 开启 Ultracode 模式 (`/effort ultracode`) 自动决策何时使用工作流

**Source**: @AnthropicAI / Claude Code 团队

---

### 2. MiniMax M3 —— 国产首个 Frontier 能力开源模型
MiniMax 发布 M3 模型，成为国内首个同时具备「前沿编程 + 百万上下文 + 原生多模态」三项能力的开源模型。

**核心参数**：
- 最高 **1M tokens** 上下文窗口（保障 512K 可用）
- 原生多模态：图片、视频输入及电脑桌面操作
- 自研 MSA (MiniMax Sparse Attention) 架构

**性能表现**：
- SWE-Bench Pro：**59.0%**（超越 GPT-5.5 和 Gemini 3.1 Pro）
- Claw-Eval Agent 评测：**最高分**
- BrowseComp：**83.5 分**（超越 Opus 4.7 的 79.3）

**获取方式**：
- API 已开放，512K 上下文版本限时 **5 折**（7 天内）
- 模型权重及技术报告将于 **10 天内开源**

**价格**（限时 5 折后）：
- 输入：2.1 元/百万 tokens
- 输出：8.4 元/百万 tokens

**Source**: @MiniMax_AI

---

### 3. DeepSeek V4 系列 —— 1M 上下文成为标配
DeepSeek 发布 V4-PRO 和 V4-Flash，支持 100 万 token 上下文，MIT 协议完全开源。

**关键数据**：
| 型号 | 总参数 | 激活参数 | 输入价格 | 输出价格 |
|-----|-------|---------|---------|---------|
| V4-PRO | 1.6T | 49B | 12元/MT | 24元/MT |
| V4-Flash | 284B | 13B | **1元/MT** | **2元/MT** |

**技术亮点**：
- 混合注意力架构 + 流形约束超连接 (mHC)
- Muon 优化器提升训练收敛速度
- 百万上下文下算力消耗仅为 V3.2 的 **27%**

**Agent 适配**：针对 Claude Code、OpenClaw、OpenCode、CodeBuddy 等主流 Agent 产品专项优化

**获取方式**：DeepSeek 官方 API / 昇腾全系列已适配 / 寒武纪 Day 0 适配

**Source**: @deepseek_ai

---

### 4. Midjourney V7 —— 视频生成 + Omni-Reference 上线
Midjourney V7 正式推出，首次支持视频生成（最长 21 秒），并带来多项图像生成增强。

**新功能一览**：
- **视频生成**：最长 21 秒，支持 FPV 无人机镜头、轨道环绕等运镜
- **Omni-Reference**：全新参考机制，支持多对象一致性控制
- **Draft Mode**：渲染速度提升 10 倍，GPU 成本减半
- **语音输入**：直接语音转提示词
- **个性化默认开启**：通过 200 张图片打分学习用户审美

**Omni-Reference 使用**：
```
--oref <参考图URL> --ow 100  # 权重 25-400
```

**获取方式**：midjourney.com（Standard 或 Pro 订阅）

**Source**: @midjourney

---

## ⚡ 高效工作流 (Workflows & Hacks)

### 5. Claude Code 10x 生产力完全指南
来自社区高阶用户的系统化实践，覆盖上下文工程、Plan Mode、多 Agent 并行的完整技法。

**核心心法**：你是上下文工程师，不是 Prompt 工程师

**关键实践**：
1. **CLAUDE.md 分层**：全局 (~/.claude/) → 项目级 → 模块级
2. **.claudeignore**：排除无关文件节省 Token（比 Cursor 少用 5.5x token）
3. **任务边界控制**：精确 Prompt 防止蝴蝶效应
4. **Plan Mode**：复杂任务先规划再执行（Shift+Tab 切换）
5. **Session 卫生**：每个任务开新 Session，`/clear` 清空上下文

**Subagent 最佳实践**：
```
【搜索任务 - Subagent 模式】
在独立 Session 里搜索整个 src/ 目录：
- 找出所有使用 createUser() 这个已废弃函数的地方
- 只返回文件路径和行号，不要把文件内容带回来
```

**多 Agent 任务分配**：
| 任务类型 | 推荐模型 | 原因 |
|---------|---------|------|
| 代码库探索 | claude-haiku | 快、便宜 |
| 实现新功能 | claude-sonnet | 平衡 |
| 复杂重构 | claude-opus | 最强推理 |
| 安全 Review | claude-opus | 最强理解力 |

**Source**: Claude Code 社区 / @claudecode

---

### 6. Karpathy LLM Wiki 工作流 —— 轻量终身第二大脑
Andrej Karpathy 分享的 LLM 个人知识库工作流刷屏，核心是用「文件夹 + 文本文件 + AI」搭建终身第二大脑。

**核心架构（3 文件夹 + 1 规则）**：
```
my-knowledge-base/
├── raw/          # 原始材料（只读不改）
├── wiki/         # AI 自动生成的结构化维基
├── outputs/      # AI 生成的答案/报告
└── CLAUDE.md     # AI 的"工作手册"
```

**工作流**：
1. 所有原始材料丢进 `raw/`
2. AI 自动整理成 `wiki/` 结构化页面
3. 提问时 AI 基于 `wiki/` 回答
4. 有价值的输出存档到 `outputs/`

**进阶工具**：
- **Graphify**：将代码/文档/论文转为可查询知识图谱（MIT 开源，2.2k stars）
- **Obsidian**：作为阅读前端，支持 Marp 插件生成幻灯片

**核心洞察**：在 ~400k 词规模下，结构化 markdown + LLM 管理的索引已足够，无需复杂 RAG。

**Source**: @karpathy

---

## 🧠 方法论与 Prompt (Methods & Prompts)

### 7. Tool Use Prompting Patterns —— 可靠工具调用的 5 个模式
来自 SurePrompts 的系统性总结，解决工具调用中最常见的 5 种失败模式。

**5 种失败模式与对策**：

| 失败模式 | 表现 | Prompt 级解决方案 |
|---------|------|------------------|
| Wrong tool | 该调 search 却调了 read_file | 工具描述加 "Does NOT..." 明确否定 |
| No tool | 该查数据却用训练数据回答 | System prompt 明确要求某类问题必须调工具 |
| Malformed args | JSON 格式错误或缺字段 | Schema 清晰 + 工具描述给示例 |
| Infinite loop | 重复调同一个工具 | 加停止条件和最大重试次数 |
| Trusted hallucination | 工具返回空，模型却编造内容 | 明确指令：空结果时如何响应 |

**好工具描述的 5 要素**：
1. Name：简短、动词化、有区分度
2. Purpose：一句话说明解决什么问题
3. Parameters：命名、类型、描述、必填标记
4. Example use：具体示例参数和返回值
5. **Negative**：明确说明「不做什么」（最重要）

**Prompt 模板**：
```
When a tool call returns an error:
1. Read the error message — do not ignore it
2. If transient (timeout/rate limit), retry once
3. If permanent, stop and report the error to user
4. Never hallucinate a result
```

**Source**: SurePrompts / @sureprompts

---

### 8. OpenAI 工具调用进化史 —— 从 Prompt 黑魔法到原生支持
回顾 OpenAI 工具调用和 JSON 输出的三段进化，帮助开发者选择正确的技术方案。

**三阶段对比**：

| 阶段 | 时间 | 工具调用 | JSON 输出 | 可靠性 |
|-----|------|---------|----------|-------|
| 早期 | ~2023 | Prompt 描述 + 文本解析 | Prompt 约束 + 后处理修复 | 😰 经常出错 |
| JSON Mode | 2024 | Prompt 描述 | `json_object` 保证合法 JSON | 😐 格式合法，Schema 不保证 |
| 现在 | 2024.08+ | 原生 `tools` + `strict: true` | `json_schema` + Structured Outputs | 😎 开箱即用 |

**关键升级**：
- **原生工具调用**：通过 `tools` 参数结构化声明，`tool_calls` 返回结构化调用指令
- **Structured Outputs**：`strict: true` 确保 100% 符合 Schema，不多字段、不少字段、类型正确

**迁移建议**：
> 如果你正在构建 LLM 应用，强烈建议直接上原生工具调用 + Structured Outputs，别再回到 prompt 手工解析的黑暗时代。

**Source**: OpenAI 官方文档 / 社区实践

---

### 9. Claude Code Prompt 工程 —— 从入门到精通的 7 层架构
系统化 Prompt 策略，从日常技巧到 CLAUDE.md、SKILL.md 的分层架构。

**日常 Prompt 5 黄金法则**：
1. **先说目标，再说约束**：目标在前，约束在后
2. **提供具体文件路径**：减少搜索时间和误判
3. **用验收标准代替实现指令**：给自主空间，但要可衡量
4. **一次一件事**：不相关需求拆开来
5. **利用 follow-up 迭代**：同一会话内精调，不重启

**7 层架构**：
```
L1: CLAUDE.md      → 写规则和约束
L2: SKILL.md       → 写模板和输出格式
L3: 会话 Prompt    → 写具体任务和验收标准
L4: Hooks          → 自动化触发检查
L5: Agent          → 定义子 Agent 职责边界
L6: Subagent       → 独立上下文做研究
L7: Multi-Agent    → 并行任务分配
```

**验证驱动开发**：
```
实现 validateEmail 函数：
- user@example.com → true
- invalid → false
- user@.com → false
- missing@tld → false

实现后运行测试，确认所有用例通过再汇报完成。
```

**委托 vs 监督矩阵**：
- **可完全委托**：测试生成、样板代码、代码迁移、文档注释、Lint 错误
- **需要监督**：认证流程、支付逻辑、安全关键重构、生产部署

**Source**: LoreAI / @loreai

---

## 📋 推荐上手顺序

按「学习成本 × 价值收益」排序：

1. **Claude Code 动态工作流**（高价值，中成本）→ 立即试用 `/deep-research`
2. **Karpathy Wiki 工作流**（高价值，低成本）→ 今天就能搭起来
3. **Tool Use Prompting Patterns**（中价值，低成本）→ 优化现有工具调用
4. **MiniMax M3 API**（高价值，中成本）→ 申请 API 密钥，替换现有模型
5. **DeepSeek V4-Flash**（高价值，低成本）→ 1元/MT 价格，直接替换
6. **Midjourney V7**（中价值，高成本）→ 需订阅，适合视觉创作者

---

## 📊 本周信源统计

| 信源类型 | 扫描数 | 命中数 |
|---------|-------|-------|
| 机构官方 | 17 | 4 |
| 个人 Builder | 48 | 5 |
| 技术社区 | - | 3 |
| **总计** | **65** | **9** |

---

*AI 干货周报 · 2026.06.01 – 06.07*  
*—— 小柒AI速递 · 每周一上午推送*
