# AI 干货周报 · 2026.05.12 - 2026.05.17

> 自动扫描 65 个顶级 AI Builder / 官方账号的近 7 天公开信号，
> 只筛选立刻能用的工具、工作流与方法论。

## 作者
小柒AI速递

## 本期先说结论

这周是名副其实的 **「模型迭代 + 商业化落地加速」周**：OpenAI 上线 GPT-5.5 Instant 成为默认模型、Anthropic 企业客户数首次反超 OpenAI、DeepSeek R2 开源性能超越 Llama 4、百度提出 AI 时代新度量衡 DAA。本期精选 10 条干货，覆盖模型更新、工具落地、方法论三个维度，每一条都今天能试。

---

## 🛠️ 实用工具箱 (Tools & Apps)

### 1. GPT-5.5 Instant & Realtime-2 — OpenAI 默认模型更新，推理与语音双升级
OpenAI 于5月12日正式推送 **GPT-5.5 Instant**，取代 GPT-5.3 Instant 成为 ChatGPT 免费及付费用户默认模型，同步发布 **GPT-Realtime-2** 实时语音模型。

**核心升级**：
1. 推理能力跃升：AIME2025、MMMU-Pro 等权威测试性能显著提升，编程、数学推理能力大幅增强
2. 认知偏差降低：优化金融、法律、医疗等敏感领域输出，减少幻觉，提升专业场景可信度
3. 生态拓展：新增跨文件解析、Gmail 邮件调取等上下文管理功能，打通个人与办公生态
4. 语音升级：Realtime-2 支持更自然的实时语音交互，延迟更低

**获取方式**：
- ChatGPT 用户可直接使用，API 开发者可调用 `gpt-5.5-instant` 和 `gpt-realtime-2` 模型
- 参考文档：https://platform.openai.com/docs/models

**上手建议**：
1. 体验 GPT-5.5 Instant 的跨文件解析功能，上传多个工作文档让 AI 整合分析
2. 开发者调用 API 时对比 GPT-5.3 的性能差异，评估是否迁移

*Source: @OpenAI*

---

### 2. 文心大模型 5.1 — 百度发布效价比新标杆，提出 AI 时代新度量衡 DAA
百度在 **Create2026 开发者大会** 发布文心大模型 5.1，在继承 5.0 能力基础上，总参数压缩至约1/3、激活参数压缩至约1/2，仅用同规模模型约6%的预训练成本，在 Arena 搜索榜取得全球第四、国内第一。

**核心亮点**：
1. 效价比突破：用极低预训练成本实现顶级性能，打破“参数越大越强”的路径依赖
2. 新度量衡 DAA：李彦宏提出“日活智能体数（DAA）”取代 Token 成为 AI 时代核心指标，关注 Agent 实际完成任务的能力
3. 智能体矩阵：同步发布 DuMate、秒哒、一镜、伐谋等智能体，覆盖个人创造到企业决策全场景

**获取方式**：
- 文心一言官网：https://yiyan.baidu.com
- 企业用户可申请文心大模型 API

**上手建议**：
1. 体验文心 5.1 的效价比优势，对比同规模其他模型的性能
2. 关注 DAA 指标，评估自己的智能体产品的用户活跃度

*Source: @百度AI*

---

### 3. autoresearch — AI 自己优化 AI，一块 GPU 就能跑

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

### 1. OpenAI DeployCo — 40亿美元布局AI企业落地，告别“只卖模型”
OpenAI 于5月11日宣布成立控股子公司 **The Deployment Company（DeployCo）**，初始投资超40亿美元，联合19家投资、咨询机构和系统集成商，为企业客户提供类似Palantir的工程师驻场服务（FDE），推动AI深度嵌入企业核心业务。

**核心逻辑**：
AI竞争从“模型性能军备竞赛”转向“落地能力竞赛”，OpenAI 通过 DeployCo 提供从技术部署到流程重构的全栈服务，解决企业“买了模型不会用”的痛点。

**生态协同**：
DeployCo 整合了 TPG、贝恩资本、高盛等机构的行业经验，结合 OpenAI 的技术能力，为企业客户提供定制化的AI部署方案。

**上手建议**：
1. 企业用户可关注 DeployCo 的服务，评估是否需要通过专业团队部署AI
2. 开发者可学习 OpenAI 的部署最佳实践，提升自己的企业级AI落地能力

*Source: @OpenAI*

---

### 2. Anthropic 金融智能体落地 — 10款专用Agent重构金融信息服务
Anthropic 上周推出 **10款金融行业专用AI智能体**，接入邓白氏、穆迪等权威金融数据，深度适配Excel、PowerPoint等企业办公软件，覆盖投行、资管、风控、合规等金融核心场景。

**实际效果**：
传统金融信息服务商需要人工完成数据处理、模型搭建、合规审查等工作，Anthropic 的金融智能体可自动化这些流程，效率提升数倍。

**数据支撑**：
Anthropic 企业客户数占比已达 **34.4%**，首次超过 OpenAI 的32.3%，营收即将突破450亿美元，是去年年底的5倍。

**获取方式**：
Claude for Financial Services 企业版，需要申请访问权限。

**上手建议**：
1. 金融行业的开发者可申请试用 Claude 金融智能体，评估对业务的提效作用
2. 参考 Anthropic 的垂直领域Agent设计思路，为自己的行业设计专用智能体

*Source: @AnthropicAI*

---

### 3. 「复合工程」(Compounding Engineering) — 让每单位工作使未来工作更容易

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

### 1. DeepSeek R2 开源 — 670B MoE 模型性能超越 Llama 4，训练成本仅550万美元
DeepSeek 于5月16日发布 **R2 开源大模型**，采用670B参数的MoE架构，多项基准测试超越 Llama 4，训练成本仅550万美元，再次打破“高性能模型需要高成本”的迷思。

**核心优势**：
1. 性能强劲：多项基准测试超越 Llama 4，媲美闭源顶级模型
2. 成本低廉：训练成本仅550万美元，远低于同性能的其他模型
3. 开源开放：模型和训练细节完全开源，可供开发者和企业免费使用

**获取方式**：
- GitHub: https://github.com/deepseek-ai/DeepSeek-R2
- 可直接下载模型权重，或通过API调用

**上手建议**：
1. 开发者可下载 DeepSeek R2 模型，部署到自己的服务器，测试性能
2. 企业用户可评估用 DeepSeek R2 替代闭源模型，降低成本

*Source: @deepseek_ai*

---

### 2. GPT-5 Agent Mode — OpenAI 推出24小时自主任务模式
OpenAI 于5月16日推出 **GPT-5 Agent Mode**，支持AI自主浏览网页、编码、执行多步骤任务，最长可持续工作24小时，无需用户手动干预。

**核心能力**：
1. 长时间自主工作：最长24小时持续执行任务，适合复杂、多步骤的项目
2. 多工具协同：可自主调用浏览器、代码编辑器、文件系统等工具，完成端到端的任务
3. 进度同步：自动向用户同步任务进度，遇到问题时请求人工介入

**获取方式**：
ChatGPT Plus/Pro 用户可申请试用，API 开发者可调用 `gpt-5-agent` 模型

**上手建议**：
1. 试用 Agent Mode 完成一个多步骤任务，比如“调研某行业竞品并生成报告”
2. 开发者可调用 API，将 Agent Mode 集成到自己的产品中

*Source: @OpenAI*

---

### 3. 「锯齿状智能」(Jagged Intelligence) — 理解 AI 能力的边界

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

1. **GPT-5.5 Instant & Realtime-2**（学习成本 ⭐，价值收益 ⭐⭐⭐⭐⭐）—— 立刻体验OpenAI最新模型，推理与语音双升级
2. **文心大模型5.1 + DAA 度量衡**（学习成本 ⭐，价值收益 ⭐⭐⭐⭐）—— 掌握AI时代新指标，理解大模型效价比方向
3. **DeepSeek R2 开源模型**（学习成本 ⭐⭐，价值收益 ⭐⭐⭐⭐⭐）—— 低成本部署高性能开源模型，替代闭源方案
4. **Claude Code + Skills**（学习成本 ⭐，价值收益 ⭐⭐⭐⭐⭐）—— 大幅提升AI编码质量，可复用工作流
5. **GPT-5 Agent Mode**（学习成本 ⭐⭐，价值收益 ⭐⭐⭐⭐⭐）—— 体验24小时自主任务，适合复杂项目
6. **OpenAI DeployCo 企业落地方案**（学习成本 ⭐⭐，价值收益 ⭐⭐⭐⭐）—— 企业用户必看，解决AI落地最后一公里问题
7. **LLM Wiki 方法**（学习成本 ⭐⭐，价值收益 ⭐⭐⭐⭐）—— 替代RAG，建立可积累的知识库
8. **「复合工程」工作流**（学习成本 ⭐⭐，价值收益 ⭐⭐⭐⭐）—— 让AI不仅完成任务，还让未来任务更容易
9. **理解「锯齿状智能」**（学习成本 ⭐，价值收益 ⭐⭐⭐）—— 帮你设计更好的 AI 协作流程
10. **Claude Dreaming**（学习成本 ⭐⭐，价值收益 ⭐⭐⭐⭐）—— 如果你在用企业版 Claude，开启这个功能

---

## 页脚

**AI 干货周报 · 2026.05.12 – 05.17**

—— 小柒AI速递 · 每周一上午推送

*本周长图将于今日稍晚发布，敬请关注*
