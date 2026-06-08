# AI 干货周报 · 2026.05.19 - 2026.05.25

> 自动扫描 65 个顶级 AI Builder / 官方账号的近 7 天公开信号，
> 只筛选立刻能用的工具、工作流与方法论。

## 作者
小柒AI速递

## 本期先说结论
这周是名副其实的「**Agent 基础设施周**」：Anthropic 和 OpenAI 同时释放重磅 API 能力，开发者构建 AI Agent 的门槛被大幅拉低。从代码执行到远程工具连接，从文件管理到长时缓存，AI 从「对话助手」向「自动化执行体」的转型正在加速。

本期精选 **9 条**，每一条都今天能试。

---

## 🛠️ 实用工具箱 (Tools & Apps)

### 1. Anthropic API 四大 Agent 能力发布

Anthropic 在 5 月 22 日放出四张王牌，让开发者零门槛构建生产级 AI Agent：

**Code Execution Tool** — Claude 现在能在安全沙箱中直接执行 Python 代码，不只是写代码，而是能进行财务建模、数据分析、科学计算。每天免费 50 小时，超出后 $0.05/小时。

**MCP Connector** — 一键连接远程 MCP 服务器（如 Zapier、Asana），无需写客户端代码，自动处理认证、工具发现、错误处理。

**Files API** — 上传文件一次，跨多次对话复用，告别重复上传成本。

**Extended Prompt Caching** — 缓存 TTL 从 5 分钟延长到 1 小时，长流程 Agent 成本最高降 90%、延迟降 85%。

**上手建议**：有 Claude API 的开发者今天就能在控制台开启 Beta 测试，四项能力在 Messages API 中直接可用。

*Source: @AnthropicAI*

---

### 2. OpenAI Codex 云端编程 Agent 正式发布

5 月 16 日 OpenAI 推出 Codex —— 基于云的软件工程 Agent，可以在并行沙箱环境中处理多项编码任务。

**核心能力**：
- 写功能、修 Bug、代码审查、提 PR
- 每项任务在独立云环境中运行，预装代码库
- 由 codex-1（o3 优化版本）驱动，支持强化学习训练
- 任务耗时 1-30 分钟，可实时监控进度

**获取方式**：ChatGPT Pro/Team/Enterprise 已可用，Plus 用户也已开放。

**上手建议**：在代码库根目录放置 `AGENTS.md` 文件，告诉 Codex 如何导航代码、运行测试、遵循项目规范——就像给新人工程师写 onboarding 文档。

*Source: @OpenAI*

---

### 3. Krea AI 视频增强升级至 8K 120fps

Krea 在 5 月上旬发布 Video Enhance 功能，与 Topaz Labs 合作，支持将视频 upscaling 到 **8K 分辨率 + 120fps**。

**适用场景**：
- AI 生成视频的后期画质提升
- 老旧素材的高清修复
- 营销视频的专业级输出

**获取方式**：https://krea.ai（Krea Enhancer 模块）

*Source: @krea_ai*

---

### 4. ElevenLabs 多模态对话式 AI 上线

ElevenLabs 5 月 29 日发布重大升级：对话式 AI 现在支持**文本 + 语音同时输入**。

**解决痛点**：
- 纯语音交互中转写邮箱、ID、订单号容易出错
- 长串数字语音输入体验差

**核心优势**：用户可随时在语音和文本间无缝切换，复杂信息打字输入，自然对话用语音。

**获取方式**：https://elevenlabs.io，在组件设置中开启「允许文本输入」。

*Source: @elevenlabsio*

---

## ⚡ 高效工作流 (Workflows & Hacks)

### 5. Google Gemini 2.5 Pro I/O 版：Web 应用开发利器

5 月 6 日 Google 提前放出 Gemini 2.5 Pro Preview (I/O edition)，针对**交互式 Web 应用开发**大幅强化。

**能力提升**：
- WebDev Arena Leaderboard 第一，比之前版本高 147 Elo 分
- 更直观地理解编程提示词
- 支持复杂 Agentic 工作流开发

**工作流建议**：
1. 在 Google AI Studio 打开 Gemini 2.5 Pro
2. 用自然语言描述想要的 Web 应用（如「一个带搜索功能的电影展示页面」）
3. 一键导出可运行的 HTML/CSS/JS 代码
4. 在 Canvas 中实时预览和迭代

**获取方式**：Gemini API / Google AI Studio / Gemini App 均已可用

*Source: @GoogleAI*

---

### 6. Figma Make Custom Skills：可复用的 AI 工作流模板

Figma 在 5 月 11 日为 Make 功能推出 **Custom Skills** —— 用 markdown 文件定义可复用的设计工作流。

**痛点场景**：每次让 AI 生成原型都要重复描述设计规范、组件用法、品牌调性。

**AI 解决路径**：
1. 创建 Skill 文件（如 `design-system.md`），写入你的设计规范
2. 在 Make 中用 `/` 命令调用（如 `/apply-design-system`）
3. AI 自动按照规范生成原型

**进阶用法**：
- 连接 Notion/Confluence，让 AI 读取 PRD 自动生成原型
- 团队共享 Skills，统一设计标准

*Source: @figma*

---

## 🧠 方法论与 Prompt (Methods & Prompts)

### 7. AGENTS.md：让 AI 编程助手理解你的代码库

OpenAI Codex 和 Claude Code 都支持通过 `AGENTS.md` 文件来指导 AI 如何在一个代码库中工作。

**核心理念**：就像给新入职的工程师写 onboarding 文档，告诉 AI 项目结构、如何运行测试、代码规范是什么。

**AGENTS.md 模板**：

```markdown
# 项目指南

## 技术栈
- 前端：React + TypeScript + Tailwind CSS
- 后端：Node.js + Express
- 数据库：PostgreSQL

## 常用命令
- `npm run dev`：启动开发服务器
- `npm test`：运行测试
- `npm run lint`：代码检查

## 代码规范
- 使用函数组件，避免类组件
- API 调用放在 `src/api/` 目录
- 类型定义放在 `src/types/` 目录

## 文件组织
/src
  /components    # 可复用组件
  /pages        # 页面组件
  /api          # API 调用
  /utils        # 工具函数
```

**实战案例**：放置 AGENTS.md 后，Codex/Claude Code 的代码生成准确率显著提升，生成的代码更符合项目风格。

*Source: @OpenAI @AnthropicAI*

---

### 8. Claude API Agent 构建四要素最佳实践

基于 Anthropic 5 月 22 日发布的新能力，构建生产级 Agent 的推荐架构：

**Step 1：工具层**
- 代码执行（Code Execution）→ 数据分析、可视化
- MCP 连接（MCP Connector）→ 连接外部系统（Asana、Zapier 等）
- 网络搜索（Web Search）→ 获取实时信息

**Step 2：数据层**
- Files API → 上传知识库/数据集，跨会话复用
- 延长缓存（Extended Caching）→ 1 小时上下文保持，成本降 90%

**Step 3：编排层**
```python
# 伪代码示例
response = client.messages.create(
    model="claude-opus-4",
    tools=[
        {"type": "code_execution"},
        {"type": "mcp", "server_url": "https://mcp.zapier.com/..."},
        {"type": "web_search"}
    ],
    files=[file_id_1, file_id_2],  # Files API
    prompt_caching={"ttl": "1h"},   # 延长缓存
    messages=[...]
)
```

**预期效果**：一个项目管理 Agent 可以自动查任务、读报告、分析风险、生成图表——全程无需人工干预。

*Source: @AnthropicAI*

---

### 9. AI 工具选型决策树（2025 年 5 月版）

面对 explosion 的 AI 工具，如何快速决策？

**Prompt 模板**：

```
请帮我为以下场景选择最合适的 AI 工具：

场景：[描述你的需求]

请按以下维度对比推荐工具：
1. 最适合的工具（1-2 个）
2. 核心优势
3. 上手难度（1-5 星）
4. 成本考量
5. 替代方案

可选工具范围：
- 编程：Claude Code, OpenAI Codex, GitHub Copilot, Cursor
- 视频：Runway, Kling, Krea, Pika, Luma
- 图像：Midjourney, Stable Diffusion, DALL-E, Imagen
- 语音：ElevenLabs, Whisper, Azure Speech
- 自动化：n8n, Make, Zapier
```

**实战案例**：输入「需要一个能根据产品描述自动生成营销视频的工具」，AI 会推荐 Runway/Kling + ElevenLabs 的组合，并给出具体工作流。

*Source: @amasad*

---

## 📊 本期信源统计

| 信源类型 | 扫描账号 | 精选条目 |
|---------|---------|---------|
| 机构官方 | OpenAI, Anthropic, Google, Figma, ElevenLabs, Krea | 9 条 |
| 实战派 | swyx, amasad | 方法论 2 条 |

---

*本期周报由 AI 辅助生成，人工筛选审校。*
*—— 小柒AI速递 · Issue #09*


---
## 知识关联

**AI 工程实践**：[[harness-engineering]] · [[spec-driven-development]] · [[vibe-coding-vs-harness-engineering]] · [[2026-04-09-harness-engineering-practice]]

**工具与模型**：[[gpt-image-v2]] · [[ai-video-landscape-2026]] · [[single-agent-vs-multi-agent]]

**CODM 应用**：[[codm-aigc-workflow]] · [[ai-campaign-prototyping]]

---
*← 返回 [[INDEX-by-type]]*

---
*月度索引：[[daily-index-2026-05]] · 返回 [[INDEX-by-type]]*
