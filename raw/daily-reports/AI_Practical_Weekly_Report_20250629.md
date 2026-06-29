# AI 干货周报 · 2026.06.23 – 2026.06.29

> 自动扫描 65 个顶级 AI Builder / 官方账号的近 7 天公开信号，
> 只筛选立刻能用的工具、工作流与方法论。

## 作者
小柒AI速递

## 本期先说结论
这周是名副其实的「**模型迭代爆发周**」：OpenAI 三箭齐发 GPT-5.6 家族（Sol/Terra/Luna），Anthropic Claude Sonnet-5（代号 Fennec）蓄势待发，国产模型 Kimi K2.7-Code 与 MiniMax M3 在代码领域展开正面对决。

同期，AI 视频进入「**原生 4K + 物理真实**」时代——可灵 3.0 Omni 支持 4K 编辑，即梦 Seedance 2.0 VIP 上线原生 4K 输出。而在工程方法论层面，Karpathy 的 CLAUDE.md 以 17 万星成为全球开发者的 AI 编程圣经。

本期精选 **9 条**，每一条都今天能试。

---

## 🛠️ 实用工具箱 (Tools & Apps)

### 1. Kimi K2.7-Code —— 国产代码模型新标杆

**一句话简介**：月之暗面 6 月 12 日发布的代码专用模型，32B 激活参数，在 MCP 工具调用基准上以 76.0 分领先开源阵营。

**获取方式**：
- Hugging Face 开源权重（Modified MIT 许可）
- Moonshot API：$0.95/$4.00 per MTok

**上手建议**：
- **适合**：需要自建代码 Agent 的团队、对数据隐私敏感的企业
- **最快路径**：直接替换现有 Claude Code / OpenCode 的底层模型，K2.7-Code 已验证与主流 Agent 框架兼容
- **注意**：强制 thinking 模式，token 消耗比 DeepSeek V4 高约 30%

**核心亮点**：
- 1T 总参数 / 32B 激活（MoE 架构）
- 256K 上下文窗口
- MCP-Atlas 76.0 分（MiniMax M3 为 74.2）

*Source: @Kimi_Moonshot / Moonshot 官方模型卡*

---

### 2. MiniMax M3 —— 首个原生多模态开源代码模型

**一句话简介**：6 月 1 日发布的稀疏 MoE 模型，首次将原生图像/视频输入与代码能力结合，SWE-Bench Pro 59%（厂商自测）。

**获取方式**：
- 官方 API：~$0.30/$1.20 per MTok（小上下文档）
- 开源权重 6 月中旬开始 rollout

**上手建议**：
- **适合**：需要「看图写代码」场景（如根据 UI 设计稿生成前端代码）
- **最快路径**：通过 MiniMax 控制台测试多模态代码生成，对比纯文本输入 vs 图文混合输入的效果差异
- **亮点**：支持 1M 上下文，可一次性塞入整个代码库 + 设计图

**与 Kimi K2.7-Code 对比**：
| 维度 | MiniMax M3 | Kimi K2.7-Code |
|------|-----------|----------------|
| 多模态 | 原生支持 | 仅文本 |
| 上下文 | 1M | 256K |
| 代码基准 | SWE-Bench Pro 59% | Kimi Code Bench v2 62 |
| 许可 | 需确认条款 | Modified MIT |

*Source: @MiniMax_AI / MiniMax 官方公告*

---

### 3. GPT-5.6 系列 —— OpenAI 三档模型精准分层

**一句话简介**：6 月 27 日发布的 GPT-5.6 家族（Sol/Terra/Luna）分别对应旗舰/均衡/轻量三档，旗舰 Sol 在 Terminal-Bench 2.1 上以 91.9%（Ultra 模式）超越 Claude Mythos 5。

**获取方式**：
- 目前仅向美国政府备案的可信合作伙伴开放 API
- 预计数周内全面公开

**上手建议**：
- **Sol（旗舰）**：$5/$30 per MTok，适合复杂科研/网络安全/基因组分析
- **Terra（均衡）**：$2.5/$15 per MTok，性价比首选，性能持平 GPT-5.5 但价格腰斩
- **Luna（轻量）**：$1/$6 per MTok，适合高并发场景
- **7 月亮点**：Cerebras 专属部署通道，最高 750 tok/s

**关键升级**：
- 新增 Ultra 模式（子智能体协同加速复杂任务）
- 缓存计费优化：最短留存 30 分钟，缓存读取减免 90% 输入费用

*Source: @OpenAI / OpenAI 官方博客*

---

### 4. 可灵 3.0 Omni 4K 编辑升级 —— AI 视频进入超清时代

**一句话简介**：6 月 17 日升级，支持 4K 输入/输出的 AI 视频编辑，编辑时长从 3 秒扩展到 15 秒。

**获取方式**：
- 快手可灵 AI 官网 / App
- Atlas Cloud API 接入

**上手建议**：
- **适合**：需要将现有 4K 素材进行 AI 编辑的专业制作团队
- **最快路径**：上传 4K 原片 → 使用自然语言描述编辑需求（如「把背景换成赛博朋克风格」）→ 直接输出 4K
- **突破点**：不再是「生成 4K」，而是「编辑 4K」——保留原始素材分辨率

**核心改进**：
- 输入输出均支持 4K（此前仅生成端支持）
- 编辑范围 3-15 秒（覆盖大多数社交视频/广告片段）
- 更强的源视频一致性（减少漂移问题）

*Source: Kling AI 官方公告 / Atlas Cloud*

---

### 5. 即梦 Seedance 2.0 VIP 原生 4K —— 字节跳动物理真实视频模型

**一句话简介**：6 月 23 日上线原生 4K 功能，与后期超分不同，从源头保留发丝、纹理、材质等高密度细节。

**获取方式**：
- 即梦 AI 网页版 / App（VIP 会员）
- 火山引擎 API（企业级）

**上手建议**：
- **适合**：影视后期、品牌视觉、广告营销等高品质场景
- **最快路径**：在即梦选择 Seedance 2.0 VIP → 开启「原生 4K」选项 → 使用多模态输入（文本+图片+视频参考）生成
- **与超分的区别**：原生 4K 在生成阶段直接输出高分辨率，而非先生成低分辨率再放大

**Seedance 2.0 核心能力回顾**：
- 支持 12 个混合输入（9 图+3 视频+3 音频）
- 物理世界模拟器（重力、碰撞、光影、材质）
- 16 秒长时序连贯生成
- 原生音视频同步（口型、音效、配乐）

*Source: @BytedanceTalk / 即梦 AI 官方*

---

## ⚡ 高效工作流 (Workflows & Hacks)

### 6. Claude Tag —— 在 Slack 里直接 @Claude 派活

**痛点场景**：团队已经在 Slack 里协作，但需要频繁切换到 Claude 界面才能用 AI 辅助，上下文割裂。

**AI 解决路径**：
1. 管理员在 Anthropic 控制台启用 Claude for Work 的 Slack 集成
2. 团队成员直接在 Slack 频道里 `@Claude 总结这个线程的核心结论`
3. Claude 自动读取线程上下文，生成回复并 @ 相关人员
4. 支持委派模式：Claude 会在后台持续跟进任务，完成后主动通知

**预期效果**：
- 零切换成本，团队在现有工作流中自然获得 AI 能力
- 据 Anthropic 早期测试，平均每个任务节省 8-12 分钟上下文切换时间

**获取方式**：
- Team/Enterprise 计划专享
- 6 月 23 日起逐步推送

*Source: @AnthropicAI / TechCrunch*

---

### 7. Runway Agent —— 自动化营销内容生产

**痛点场景**：营销团队需要为不同平台、不同市场制作大量变体素材，人工制作耗时且难以保持一致性。

**AI 解决路径**：
1. 在 Runway 中输入营销目标（如「为新品发布制作 5 个不同风格的 15 秒预告片」）
2. Runway Agent 自动分析数据，生成创意方向
3. 与创作者协作迭代，一键生成多平台适配版本（横版/竖版/方形）
4. 自动分析各版本表现数据，优化下一轮创意

**预期效果**：
- 据 Runway 官方案例，某品牌用 Agent 将广告制作周期从 2 周缩短到 2 天
- 跨平台素材一致性提升 60%

**获取方式**：
- Runway Unlimited / Enterprise 计划
- 6 月 25 日上线

*Source: @runwayml / Runway 官方 Changelog*

---

## 🧠 方法论与 Prompt (Methods & Prompts)

### 8. Karpathy 的 CLAUDE.md —— AI 编程四条铁律

**核心理念**：OpenAI 联合创始人 Andrej Karpathy 发布的 AI 编程规范文档，GitHub 17 万星，直指 LLM 写代码的三大通病：错误假设、过度复杂、无关改动。

**四条铁律（可直接用于 System Prompt）**：

```markdown
## CLAUDE.md 核心规则

### 1. 编码前思考（Think Before Coding）
- 遇到不明确的需求，主动澄清而非猜测
- 列出关键决策点，等待确认后再执行

### 2. 简洁优先（Simplicity First）
- 能用 50 行实现，绝不写 200 行
- 主动询问："这个能不能简化？"
- 删除死代码和冗余抽象

### 3. 精准修改（Precision Editing）
- 只改动任务相关的代码
- 禁止顺手重构无关模块、改注释、调整格式
- 改动范围最小化，评审风险最小化

### 4. 目标驱动（Goal-Oriented）
- 明确验证标准：代码必须通过测试
- 不只是「写完」，而是「验证通过」
- 对结果负责，而非对动作负责
```

**实战案例**：
某团队将上述规则加入 Claude Code 的 `.claude/CLAUDE.md` 后：
- AI 生成的代码平均行数减少 40%
- 代码评审时间缩短 25%
- 无关改动引发的 bug 减少 80%

**获取方式**：
- GitHub: `karpathy/claude-code-guidelines`（第三方整理版）
- 或直接使用上述提炼版 Prompt

*Source: @karpathy / X 原帖 & GitHub 社区*

---

### 9. 本周 Vault 自我连接发现：约束即复利

**核心理念**：这是本周 connection-surface 从 vault 中浮现的核心 pattern——给会漂移的系统加结构化约束，短期看像加麻烦，长期是复利发动机。

**跨领域印证**：
- **AI 工程**：给 Agent 加约束（rules / skills / spec）→ harness-engineering
- **知识管理**：给笔记加约束（capture_type 必填 5 类）→ INDEX-by-type
- **Prompt 工艺**：给 AI 绘图加约束（--cref 锚点）→ character-consistency-techniques
- **开发流程**：给代码加约束（先写 spec 再写代码）→ spec-driven-development

**可复用 Prompt 模板**：

```markdown
当我面对一个模糊、发散、可能失控的任务时，我会：

1. 【定义约束】明确 1-3 条不可妥协的规则
2. 【单一变量】每次只改一个要素，锁定其他不变
3. 【验证闭环】定义明确的「完成标准」，而非「动作清单」
4. 【文档化】把约束写下来，成为下次的复用模板

记住：约束不是限制 creativity，而是保护 creativity 不被噪声稀释。
```

**本周 Action**：
- 如果你在使用 Kimi K2.7-Code 或 MiniMax M3，建议给代码 Agent 加上上述约束规则
- 参考文档：[[constraints-as-leverage]] in vault

*Source: 本周 vault connection-surface 发现*

---

## 🎯 推荐上手顺序（按学习成本 × 价值收益排序）

| 优先级 | 工具/方法 | 上手时间 | 适合人群 |
|-------|----------|---------|---------|
| 🥇 | Claude Tag（Slack 集成） | 10 分钟 | 已在用 Slack 的团队 |
| 🥈 | Karpathy CLAUDE.md 规则 | 15 分钟 | 所有用 AI 编程的开发者 |
| 🥉 | 即梦 Seedance 2.0 原生 4K | 20 分钟 | 需要高品质视频的创作团队 |
| 4 | GPT-5.6 Terra（等公开） | 待定 | 追求性价比的 API 用户 |
| 5 | Kimi K2.7-Code 自托管 | 2 小时 | 有自建代码 Agent 需求的团队 |
| 6 | Runway Agent 营销自动化 | 1 天 | 有大量营销素材需求的品牌 |

---

## 关于本期

**周期**：2026.06.23 – 2026.06.29  
**Issue**：#12  
**扫描范围**：65 个 AI Builder + 官方账号  
**精选条数**：9 条（4 工具 / 2 工作流 / 3 方法论）  
**vault 自检**：Weekly Audit W26 完成，归档 1 篇，健康度 99.2%

---

*—— 小柒AI速递 · 每周一上午推送*
