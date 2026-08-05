# AI 干货周报 · 2026.07.28 – 08.02

> 自动扫描 65 个顶级 AI Builder / 官方账号的近 7 天公开信号，
> 只筛选立刻能用的工具、工作流与方法论。

## 作者
小柒AI速递

## 本期先说结论

这周是名副其实的「国产开源 + 巨头降价」双线轰炸周：月之暗面把 2.8 万亿参数的 Kimi K3 完整权重甩上 HuggingFace，DeepSeek V4 Flash 正式版 API 公测，MiniMax H3 全模态上线——三家国产模型同时亮剑。另一边，OpenAI 把 GPT-5.6 Luna 砍价 80%，用降价迎战，Anthropic 用 Claude Opus 5 同价替换打防守反击。而对开发者来说，MCP 协议本周完成了史上最大升级——从有状态转向无状态 HTTP 架构，Agent 基础设施终于可以像普通 Web 服务一样部署了。

本期精选 **8 条**，每一条都今天能试。

---

## 🛠️ 实用工具箱 (Tools & Apps)

### 1. DeepSeek V4 Flash 正式版 · Agent 能力飞跃，成本击穿行业底线

**是什么**：7 月 31 日，DeepSeek 开放 V4-Flash-0731 正式版 API 公测。模型结构与 4 月预览版一致，仅重做后训练——但 Agent 能力（工具调用、多步骤执行、代码生成）实现质的飞跃。Artificial Analysis 智能指数 50 分，仅比 GPT-5.6 Luna（51 分）低 1 分。

**获取方式**：
- API 文档：`api-docs.deepseek.com`
- 已接入 Codex CLI、网易有道全线产品
- 定价：自研 API 上单任务成本比 GPT-5.6 Luna 降价后**仍低约 60%**（关键：98% 缓存命中折扣，远超行业普遍的 90%）

**上手建议**：
- **适合谁**：需要高频 Agent 调用（代码生成、文件操作、长对话）的开发者，预算敏感型团队
- **最快路径**：替换现有 `deepseek-chat` API 端点 → `DeepSeek-V4-Flash-0731`，代码零改动；然后逐步接入 Agent 工具链测试多步骤能力
- **注意**：V4-Pro 正式版将在近期发布，可关注

*Source: @deepseek_ai · Artificial Analysis · Arena.ai*

---

### 2. Kimi K3 完整模型权重开源 · 2.8T 参数史上最大开源模型

**是什么**：7 月 27 日晚，月之暗面在 HuggingFace 正式公开 Kimi K3 完整权重和技术报告。2.8 万亿参数 MoE 架构，896 个路由专家中每 Token 仅激活 16 个，原生支持文本+图像+视频理解，100 万 Token 超长上下文。同日还开源了高性能注意力内核、MoE 通信库和 Agent 环境基础设施。

**获取方式**：
- HuggingFace：`huggingface.co/moonshotai/Kimi-K3`
- 托管访问：Kimi.com / Kimi Work / Kimi Code / Kimi API
- API 定价：$0.30/M 缓存命中输入、$3.00/M 缓存未命中输入、$15.00/M 输出
- 部署要求：MXFP4 权重，推荐 ≥ 64 张加速卡

**上手建议**：
- **适合谁**：需要超长上下文 + 深度推理的内容创作者、分析师；有自建算力的大型团队
- **最快路径**：先用 Kimi API 体验 1M 上下文能力（上传整本书提问）→ 确认场景匹配后再评估自部署
- **杀手场景**：整本论文/法律文档分析、长周期编程项目（K3 曾用 32 Agent 27 分钟完成 Redis 零日漏洞挖掘和 PoC）

*Source: @Kimi_Moonshot · HuggingFace*

---

### 3. MiniMax H3 全模态模型上线 · 文本+图像+音频一站式

**是什么**：MiniMax 发布 H3 全模态模型，统一处理文本、图像、音频输入输出。这是国内首个将三模态整合进单一模型的产品级方案，对标 Google Gemini 的全模态路线。

**获取方式**：
- API：`api.minimax.chat`（已开放调用）
- 支持场景：文本对话、图像理解与生成、语音合成与识别

**上手建议**：
- **适合谁**：需要同时处理多媒体内容的创作者、教育类产品、客服系统
- **最快路径**：注册 MiniMax API → 用 "请描述这张图片并用语音回复" 的复合指令测试全模态链路
- **亮点**：单一 API 端点覆盖三种模态，无需拼接多个模型

*Source: @MiniMax_AI*

---

## ⚡ 高效工作流 (Workflows & Hacks)

### 4. GPT-5.6 降价 80% 后的成本重构指南

**痛点场景**：OpenAI 7 月 30 日将 GPT-5.6 Luna 输入价格砍到 $0.20/M、输出 $1.20/M（降 80%），Terra 降 20%，Sol 保持不变但新增 Fast 模式（2.5× 吞吐，$10/$60）。面对复杂的价格矩阵，很多团队不知道如何重新算账。

**AI 解决路径**：

| 场景 | 旧选型 | 新选型 | 成本变化 |
|------|--------|--------|----------|
| 批量客服/内容审核 | GPT-5.6 Terra | GPT-5.6 Luna | **-80%** |
| 日常 Agent 工作流 | GPT-5.6 Luna | DeepSeek V4 Flash | **-60%**（相比 Luna 降价后） |
| 高智商推理 | Claude Opus 5 | Claude Opus 5（不变） | 同价但智力提升 |
| 低延迟 Agent 循环 | GPT-5.6 Sol | Sol Fast 模式 | 2.5× 吞吐，成本 ×2 |
| 海量缓存场景 | — | DeepSeek V4 Flash | 缓存命中 98% 折扣，极致低价 |

**预期效果**：如果你的 Agent 工作流月耗 $10,000 Token 费用，按上述优化后可降至 $2,000–3,000。关键是**不要一刀切**——不同任务用不同模型。

*Source: @OpenAI · StackSpend · VentureBeat*

---

### 5. MCP 无状态协议升级 · Agent 基础设施部署实战

**痛点场景**：旧版 MCP 需要客户端与特定服务端实例维持持久会话（Session），在 Kubernetes/Serverless 环境中一旦 Pod 下线 Agent 就中断。这是企业级 Agent 部署的最大卡点。

**AI 解决路径**：
1. **升级 SDK**：TypeScript/Python/Go/C# SDK 均已支持 2026-07-28 规范，`npm install @modelcontextprotocol/sdk@latest`
2. **移除 Session 依赖**：删除代码中所有 `Mcp-Session-Id` 头、`initialize` 握手逻辑
3. **切换到 Streamable HTTP**：每个请求自描述（`Mcp-Method` + `Mcp-Name` 头），可路由到任意后端实例
4. **长任务用 Tasks 扩展**：返回 durable task handle，客户端可断开后重连继续跟踪
5. **交互式调用用 MRTR**：服务端返回 `resultType: "input_required"`，客户端重试时附带 `inputResponses`

**预期效果**：MCP Server 可以像普通 Web 服务一样部署到 Cloudflare Workers、AWS Lambda 等无状态基础设施——水平扩展零成本。Google Cloud、Cloudflare、Netlify 已宣布 Day Zero 支持。

**附：迁移检查清单**
- [ ] 检查是否依赖 session ID 或 initialize 握手（最大 breaking change）
- [ ] 评估 elicitation/sampling → 迁移到 MRTR 模式
- [ ] 更新 OAuth 集成（启用 iss 校验）
- [ ] 为 list 响应添加 TTL 缓存策略

*Source: MCP Blog · @AnthropicAI · VentureBeat*

---

## 🧠 方法论与 Prompt (Methods & Prompts)

### 6. Claude Opus 5 高智商任务实战 · 什么时候该用 Opus 而不是 Fable

**核心理念**：Anthropic 7 月 24 日用 Claude Opus 5 同价替换 Opus 4.8——前沿智力接近 Fable 5，但价格只有一半。关键在于"智力足够即可"原则：不是所有任务都需要最强模型。

**Prompt 模板**：
```
你是一个 [角色]，需要使用深度推理完成以下任务。

任务：[具体描述]
约束：
- 输出必须包含推理步骤
- 如果遇到不确定性，标注 [ESTIMATE] 或 [NEEDS VERIFICATION]
- 最终结论用 ### 结论 包裹

开始。
```

**实战案例**：
- **代码审查**：Opus 5 在 CursorBench 仅落后 Fable 5 的 0.5%，但成本减半
- **法律文档分析**：用 Opus 5 + 1M 上下文（配合 Kimi K3 开源能力参考），长文档逻辑一致性优于 GPT-5.6
- **ARC-AGI 3 推理**：Opus 5 得分 3 倍于次优模型——抽象推理是 Opus 的绝对主场

**决策规则**：
```
IF 任务需要跨多步推理 AND 预算敏感 → Claude Opus 5
IF 任务需要绝对最高智力 AND 预算充足 → Claude Fable 5
IF 任务需要高吞吐 + 低成本 → DeepSeek V4 Flash
IF 任务需要多模态 → GPT-5.6 Sol / MiniMax H3
```

*Source: @AnthropicAI · Anthropic Blog*

---

### 7. 字节 SeedRealtime 全双工 · 实时音视频 AI 交互设计范式

**核心理念**：字节跳动发布 SeedRealtime——音视频全双工大模型，已上线豆包 App。核心理念是"AI 不再是轮流发言的对讲机，而是能边听边说、随时打断的真实对话对象"。这对交互设计是范式级转变。

**Prompt 模板**（设计实时 AI 交互场景用）：
```
设计一个基于 SeedRealtime 的 [应用场景]：

1. 用户触发方式：[语音唤醒词 / 按钮 / 自动检测]
2. AI 需要实时感知的信号：
   - 音频：[说话内容 / 语气 / 情绪 / 环境音]
   - 视频：[人脸表情 / 手势 / 屏幕内容]
3. AI 的输出模式：[语音回复 / 屏幕叠加层 / 动作指令]
4. 中断处理：用户可以 [随时打断 / 等待当前回合结束]
5. 状态管理：当用户中断时，AI 应 [保存当前上下文 / 丢弃并重新开始]

参考豆包 App 的 [具体功能] 作为交互蓝本。
```

**实战案例**：
- **AI 视频剪辑助手**：用户边看素材边说"把这段剪掉，从 3:15 开始"，AI 实时操作时间线
- **AI 编程结对**：开发者边写代码边语音描述思路，AI 实时建议补全并显示在屏幕上
- **AI 同传**：实时语音识别 + 翻译 + 合成，保持说话人语气和节奏

*Source: @BytedanceTalk · 字节 Seed 团队*

---

### 8. 阿里 Wan2.6 全链路视频生成 · 从一句话到成片的工业化 Pipeline

**核心理念**：阿里通义万相 Wan2.6 打通了"文本→分镜脚本→视频片段→配音→剪辑"全链路，不再是单一的"文生视频"工具，而是一个视频制作操作系统。

**实战案例**：
```
输入：30 秒产品宣传片，风格：赛博朋克，产品：智能手表

Step 1 — 分镜生成（Wan2.6 文本模式）：
  生成 5 个分镜描述，每个 5-6 秒

Step 2 — 视频生成（Wan2.6 图生视频）：
  逐分镜生成视频片段，保持风格一致性

Step 3 — 配音（MiniMax H3 语音合成）：
  根据分镜描述生成旁白

Step 4 — 背景音乐（可选，Wan2.6 音效模式）：
  自动匹配赛博朋克风格 BGM

Step 5 — 剪辑输出：
  片段拼接 + 字幕叠加 → 成片
```

**关键技巧**：
- **风格一致性**：第一个分镜生成后，后续分镜在 Prompt 中引用 `保持与帧1一致的色调和光影` 
- **节奏控制**：每段视频生成时指定 `duration: 5-6s, tempo: fast`
- **过渡处理**：分镜衔接处留 0.5s 重叠，避免硬切

**获取方式**：`tongyi.aliyun.com/wanxiang`（百炼平台）

*Source: @Alibaba_Qwen · 阿里通义官网*

---

## 推荐上手顺序

| 优先级 | 条目 | 学习成本 | 价值收益 |
|--------|------|----------|----------|
| 1 | DeepSeek V4 Flash 替换现有 API | ⭐ 极低 | 💰💰💰 极高 |
| 2 | GPT-5.6 成本重构 | ⭐ 极低 | 💰💰💰 极高 |
| 3 | Claude Opus 5 切换 | ⭐ 极低 | 💰💰 高 |
| 4 | MCP 无状态迁移 | ⭐⭐ 中 | 💰💰 高 |
| 5 | MiniMax H3 试用 | ⭐ 极低 | 💰💰 高 |
| 6 | Wan2.6 视频 Pipeline | ⭐⭐ 中 | 💰💰 高 |
| 7 | SeedRealtime 交互设计 | ⭐⭐⭐ 高 | 💰 中 |
| 8 | Kimi K3 自部署 | ⭐⭐⭐ 高 | 💰💰 高 |

---

*本期周报完。下周一见。*

—— 小柒AI速递
