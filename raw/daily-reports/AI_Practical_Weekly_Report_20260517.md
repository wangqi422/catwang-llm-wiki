# AI 干货周报 · 2026.05.12 - 2026.05.17

> 自动扫描 65 个顶级 AI Builder / 官方账号的近 7 天公开信号，
> 只筛选立刻能用的工具、工作流与方法论。

## 作者
小柒AI速递

## 本期先说结论

这周是名副其实的 **「Agent 自主化 + 工作流标准化」周**：Karpathy 开源 autoresearch 让 AI 自己优化模型、Anthropic 上线 Dreaming 让 Agent 从错误中学习、Skills 正在取代 MCP 成为 AI Agent 开发新标准。本期精选 8 条，每一条都今天能试。

---

## 🛠️ 实用工具箱 (Tools & Apps)

### 1. autoresearch — AI 自己优化 AI，一块 GPU 就能跑

Andrej Karpathy 开源了一个仅 630 行 Python 的「AI 自主科研」框架。核心机制：AI Agent 在一个 Git 特性分支上循环「改代码 → 5 分钟训练 → 检查分数 → 更好就提交」，人类只需写好 `program.md` 任务说明书，然后去睡觉（或蒸桑拿）。

**能解决什么痛点**：传统 AI 研究需要人类盯着实验、手动调参、反复重启训练。autoresearch 把「提出想法 → 实现 → 验证」的循环完全交给 AI，人类只负责定义问题和约束。

**获取方式**：
- GitHub: `https://github.com/karpathy/autoresearch`
- 依赖：单块 GPU（训练 5 分钟/轮），Python 环境

**上手建议**：
1. 先跑通 `prepare.py` 准备数据（下载数据集 + 训练 BPE 分词器）
2. 读 `program.md` 理解如何给 AI 写任务说明书
3. 运行 `train.py`，AI Agent 会自动在特性分支上迭代
4. 第二天早上查看实验日志，合并好的提交

*Source: @karpathy*

---

### 2. Claude Code + Skills — 让 AI 按照你的规范写代码

Karpathy 的 `karpathy-skills` 仓库一周突破 10 万星，Matt Pocock 的 `mattpocock/skills` 紧随其后 6 万+。核心思想：把「如何让 AI 干活」从每次手写 Prompt，变成可复用、可分享、可组装的标准化模块（Skills）。

**能解决什么痛点**：以前每次让 AI 写代码都要重新教它「你是谁 / 你要干什么 / 边界在哪」。现在把指令和经验打包成 Skill，一句话直接跑。

**获取方式**：
- Karpathy Skills: `https://github.com/karpathy/karpathy-skills`
- Matt Pocock Skills: `https://github.com/mattpocock/skills`
- 用法：把 Skills 目录放到你的 `.claude/skills/` 下，Claude Code 自动加载

**上手建议**：
1. 先抄 Karpathy 的 `caution.md`（AI 编码陷阱清单）
2. 根据你的项目写专属 Skill（比如「CODM 资产命名规范」）
3. 在 `CLAUDE.md` 里引用你的 Skills，让 AI 每次自动遵守

*Source: @karpathy, @mattpocock*

---

### 3. GitHub Copilot CLI 1.0.45 — 快速迭代，新增 /autopilot 命令

过去 7 天发布了 5 个版本（1.0.41 → 1.0.45），核心更新：
- 后台认证，UI 立即渲染（启动速度大幅提升）
- MCP server 错误信息改进
- 新增 `/autopilot` 斜杠命令：在交互模式和自动驾驶模式之间切换
- 路径补全闪烁修复

**能解决什么痛点**：Copilot CLI 是 GitHub 官方的 AI 终端助手，快速迭代说明团队在认真打磨用户体验。

**获取方式**：
```bash
npm install -g @githubnext/github-copilot-cli
```

**上手建议**：
1. 安装后运行 `copilot-cli auth` 登录 GitHub
2. 试试 `/autopilot` 模式：让 AI 自主执行多步任务
3. 结合 MCP server 扩展能力（比如连接本地文件系统）

*Source: @github*

---

## ⚡ 高效工作流 (Workflows & Hacks)

### 4. 「复合工程」(Compounding Engineering) — 让每单位工作使未来工作更容易

Dan Shipper（Every 创始人）提出的方法论：不要让 AI 只是「完成当前任务」，而要让它「让下一个任务更容易」。

**具体做法**：
- 每次让 AI 完成工作后，顺便让它把「如何做这件事」写成一个可复用的 Prompt/Skill
- 把这些 Prompt/Skill 存到 GitHub 仓库，变成团队的「知识资产」
- 下次类似任务，直接调用，不用重新教 AI

**实际案例**：Dan 的团队用这个方法，只用了「两个工程师 + 15 个 Claude Code 实例」就构建并发布了 Quora（AI 邮件助手），已有 2,500 活跃用户。

**获取方式**：
- 阅读 Dan Shipper 的原文：`https://lennysvault.com/insights/growth-scaling-tactics/...`
- 实践：从下一个任务开始，让 AI 顺便生成一个「如何做这件事」的 Skill

**上手建议**：
1. 下次让 AI 帮你写 PRD 时，顺便让它生成 `/write-prd` 命令
2. 把常用工作流（代码审查、文档生成、数据分析）都变成 Skills
3. 团队共享 Skills 仓库，形成「知识复利」

*Source: @danshipper*

---

### 5. LLM Wiki 方法 — 替代 RAG 的新范式，让 LLM 自己建知识库

Karpathy 提出的个人知识库构建模式：**不让 LLM 临时检索，而是让它在摄入知识时就处理、编译、维护一个 Markdown 知识库**。

**为什么比 RAG 好**：
- RAG：每次查询都临时检索，没有知识积累，不知道 AI 参考了什么
- LLM Wiki：知识被「编译」一次，持续更新，所有推理过程可审计

**三层架构**：
1. **Raw Sources**（原始资料）：不可变，LLM 只读不写
2. **The Wiki**（维基）：LLM 生成的 Markdown 文件集合，自动交叉引用
3. **Ingest Workflow**（消化工作流）：LLM 自动读取 Raw → 更新 Wiki

**比喻**：Obsidian 是 IDE，LLM 是程序员，Wiki 是代码库。你不是在「使用」知识库，你是在「开发」知识库。

**获取方式**：
- Karpathy 的 Gist: `https://gist.github.com/karpathy/...`（搜索 "LLM Wiki Karpathy"）
- 实践：用 Obsidian + Claude Code，让 AI 自动维护你的知识库

**上手建议**：
1. 在 Obsidian 库里创建 `raw/` 目录存放原始材料
2. 创建 `wiki/` 目录作为 LLM 输出目标
3. 写一份 `INGEST.md` 告诉 AI 如何提取、交叉引用、更新 wiki
4. 每次丢进去新素材，让 AI 自动更新 wiki

*Source: @karpathy*

---

### 6. Claude Dreaming — Agent 从自己的错误中学习，Harvey 完成任务率提升 6 倍

Anthropic 在 Code with Claude 开发者大会上发布了 Dreaming 功能：AI Agent 在后台回顾过去会话和记忆，提取模式，生成「未来自我可以参考的笔记和 Playbook」。

**与 Memory 的区别**：
- Memory（2026 年初发布）：保留偏好和上下文，单次/跨次会话可用
- Dreaming：更高层次的抽象，跨会话提取模式，生成可复用的 Playbook

**实际效果**：
- 法律 AI 公司 Harvey：任务完成率提升约 **6 倍**
- 医疗文档审查公司 Wisedocs：文档审查时间减少 **50%**
- Netflix：同时处理数百个构建日志，用多 Agent 编排

**关键特性**：
- 不修改模型权重（不是 fine-tuning）
- 所有记忆都是纯文本笔记，人类可审计
- 智能体自己写「给未来自己的笔记」，越来越擅长

**获取方式**：
- Claude Managed Agents 平台（Anthropic 企业版）
- 需要申请访问权限

**上手建议**：
1. 如果你在用 Claude Code，确保开启 Memory 功能
2. 在 `CLAUDE.md` 里明确告诉 AI「完成后把经验写入 skills/ 目录」
3. 定期review AI 生成的笔记，确保质量

*Source: @AnthropicAI, @alexalbert__*

---

## 🧠 方法论与 Prompt (Methods & Prompts)

### 7. 「锯齿状智能」(Jagged Intelligence) — 理解 AI 能力的边界

Karpathy 在 Sequoia AI Ascent 2026 炉边谈话中提出的概念：AI 的能力分布是「锯齿状的」—— 一边能重构 10 万行代码库，一边会建议你「走路去 50 米外的洗车店」。

**核心解释**：AI 的能力不是均匀的，而是高度依赖「可验证性」和「经济激励」：
- **可验证的任务**（代码能跑、答案能对）：AI 表现超人
- **不可验证的任务**（常识判断、模糊决策）：AI 可能犯低级错误

**对你的启示**：
- 不要指望 AI 「理解」你的业务上下文，除非你能把上下文写进 Prompt/Skill
- 把任务设计成「可验证」的：让 AI 生成多种方案，你来选择（而不是让它自主决策）
- 用 Skills 把「人类常识」编码进去，弥补 AI 的锯齿状缺陷

**Prompt 模板**：
```
你是一个 [角色]。
你的任务是 [目标]。
约束条件：
1. [硬性约束，可验证]
2. [硬性约束，可验证]
参考我的 Skills: [[skills/xxx.md]]
如果不确定，给出 3 个选项让我选择，不要自己决定。
```

*Source: @karpathy*

---

### 8. Skills 取代 MCP —— AI 工作流标准化的未来方向

过去两个月，GitHub Trending 榜首从 `microsoft/mcp` 变成了 `karpathy/karpathy-skills` 和 `mattpocock/skills`。这释放了一个明确信号：**AI 工作流的标准化正在从「工具调用协议」（MCP）转向「领域知识包」（Skills）**。

**为什么 Skills 更有优势**：
- MCP：定义「AI 能调用哪些工具」，是**能力层**的标准化
- Skills：定义「AI 在某个领域如何思考、如何行动」，是**知识层**的标准化
- Skills 更轻量（一个 Markdown 文件），更容易分享和版本控制

**当前生态**：
- Karpathy Skills：聚焦 AI 编码最佳实践（如何不让 AI 乱改代码）
- Matt Pocock Skills：聚焦 TypeScript/React 开发工作流
- 社区正在形成 Skills 市场（类似 VS Code 扩展市场）

**你的行动**：
1. 去 GitHub 搜 `topic:claude-skills` 看看别人分享了什么
2. 把你的 CODM 工作流程写成 Skills（比如「赛季海报生成流程」）
3. 开源你的 Skills，建立个人影响力

*Source: @karpathy, @mattpocock, @zarazhangrui*

---

## § 4 推荐上手顺序

1. **Claude Code + Skills**（学习成本 ⭐，价值收益 ⭐⭐⭐⭐⭐）—— 立刻能大幅提升 AI 编码质量
2. **LLM Wiki 方法**（学习成本 ⭐⭐，价值收益 ⭐⭐⭐⭐）—— 替代 RAG，建立真正积累的知识库
3. **「复合工程」工作流**（学习成本 ⭐⭐，价值收益 ⭐⭐⭐⭐）—— 让 AI 不仅完成任务，还让未来任务更容易
4. **autoresearch**（学习成本 ⭐⭐⭐⭐，价值收益 ⭐⭐⭐⭐⭐）—— 如果你有 GPU，一夜之间跑完一个小型研究实验室的工作量
5. **理解「锯齿状智能」**（学习成本 ⭐，价值收益 ⭐⭐⭐）—— 帮你设计更好的 AI 协作流程
6. **Claude Dreaming**（学习成本 ⭐⭐，价值收益 ⭐⭐⭐⭐）—— 如果你在用企业版 Claude，开启这个功能

---

## 页脚

**AI 干货周报 · 2026.05.12 – 05.17**

—— 小柒AI速递 · 每周一上午推送

*本周长图将于今日稍晚发布，敬请关注*
