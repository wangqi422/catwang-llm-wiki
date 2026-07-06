# AI 干货周报 · 2026.06.29 - 2026.07.05

> 自动扫描 65 个顶级 AI Builder / 官方账号的近 7 天公开信号，  
> 只筛选立刻能用的工具、工作流与方法论。

## 作者
小柒AI速递

## 本期先说结论
这周是名副其实的 **「Agent 工程化落地周」**：Anthropic 用 Claude Sonnet 5 把旗舰能力下放到中端价位，美团 LongCat-2.0 用国产算力训练出万亿参数开源模型，Google Gemini Omni Flash 让视频生成进入「对话式编辑」时代。

本期精选 **9 条**，每一条都今天能试。

---

## 🛠️ 实用工具箱 (Tools & Apps)

### 1. Claude Sonnet 5 — 最 Agentic 的中端模型
Anthropic 发布 Claude Sonnet 5，定位是「迄今为止智能体能力最强的 Sonnet」。它能自主制定计划、调用浏览器和终端等外部工具，在没有人工干预的情况下独立完成多步骤任务。

**关键改进**：
- **SWE-bench Pro**: 63.2%（Sonnet 4.6 仅 58.1%，Opus 4.8 为 69.2%）
- **Terminal-Bench 2.1**: 80.4%（较前代提升 13.4 个百分点）
- **定价**: 8/31 前输入 $2/百万 token、输出 $10/百万（标准定价 $3/$15，比 Opus 4.8 便宜约 60%）

**适合谁**: 需要 Agent 能力但预算有限的开发者、想替换 Sonnet 4.6 的用户  
**最快路径**: Claude 网页版 / Claude Code 已默认切换，API 调用模型名 `claude-sonnet-5`  
*Source: @AnthropicAI, @berryxia*

---

### 2. LongCat-2.0 — 国产算力训练的万亿参数开源模型
美团开源 LongCat-2.0，总参数 1.6T（MoE 架构，每 token 激活约 48B），原生支持 1M 超长上下文。**训练全程在五万卡国产算力集群完成，英伟达含量为零。**

**关键数据**：
- **SWE-bench Pro**: 59.5%（超越 GPT-5.5 的 58.6%）
- **Terminal-Bench 2.1**: 70.8%
- **定价**: $0.75/$2.95（促销期 $0.30/$1.20）
- **协议**: MIT（商用友好，可闭源派生）

**适合谁**: 需要长上下文（1M token）的代码 Agent 开发者、关注国产算力的团队  
**最快路径**: 官方 `longcat.chat` 或 `longcat.ai` 直接试用；OpenRouter 已上架  
*Source: @Meituan_LongCat, awesomeagents*

---

### 3. Gemini Omni Flash — 对话式视频编辑
Google 发布 Gemini Omni Flash，支持文本/图片/视频多模态输入生成视频，**最大亮点是「对话式编辑」**——生成后可继续用自然语言修改，如「把背景从雨天换成晴天」「让人物向左转 45 度」。

**关键参数**：
- **视频生成时长**: 10 秒（更长时长 coming soon）
- **定价**: $0.10/秒（720p，与 Veo 3.1 Fast 同价）
- **Video Arena 排名**: 1404 Elo，登顶榜首

**适合谁**: 短视频创作者、电商产品视频制作、需要快速迭代视频内容的团队  
**最快路径**: Google AI Studio / Gemini API 已开放，Flow 平台可直接体验  
*Source: @GoogleDeepMind, @op7418*

---

### 4. X Hosted MCP — Twitter 官方 MCP 上线
X（Twitter）推出官方 hosted MCP，AI 智能体可通过 MCP 协议直接调用 X API 获取实时信息，支持 Grok、Cursor、Claude 等工具。

**关键信息**：
- **定价**: 个人优惠价 $0.01/次调用（1 美元 = 1000 次）
- **实测**: 拉取近三天书签仅花 $0.1
- **用途**: 自动整理、总结、分析你的 X 数据

**适合谁**: 重度依赖 Twitter 信息获取的用户、需要实时社媒数据的 Agent 开发者  
**最快路径**: 创建 X APP 并充值 → 获取配置 ID → 交给 Claude/Codex 辅助配置 → 授权启动  
*Source: @op7418, X Developer*

---

## ⚡ 高效工作流 (Workflows & Hacks)

### 5. Every「复利工程」— 单人维护 5 款产品的秘密
媒体软件公司 Every 公开「复利工程」方法论，用单人工程团队维护 5 款产品。核心不是写代码更快，而是 **80% 时间花在 Plan 和 Review，只有 20% 写代码**。

**四步循环**：
1. **Plan**: AI 生成实现计划、任务列表、测试策略
2. **Work**: 按 plan 执行，每个改动后跑测试
3. **Review**: 14 个专项审查 agent 并行检查（安全/性能/架构/风格）
4. **Compound**: 把解法写入 CLAUDE.md 和 docs/solutions/，让 AI 下次自动避坑

**配套开源**: 26 个专项 agent、23 条工作流命令、13 项技能，支持 Claude Code / Codex / Cursor  
**核心洞察**: 代码是思考的副产品，工程师的核心价值从「实现」转移到「判断」
*Source: @xiaohu, Every Engineering*

---

### 6. Claude Code 四种 Agent 循环模式
Anthropic 官方定义了四种 agent 循环类型，帮助开发者根据场景选择合适的交互模式：

| 循环类型 | 触发方式 | 适用场景 |
|---------|---------|---------|
| **Turn-based** | 用户每次提示触发 | 探索性任务，需要频繁人工确认 |
| **Goal-based** | `/goal` 命令设定可验证完成标准 | 有明确完成条件的任务 |
| **Time-based** | `/loop` 按时间间隔重复 | 定时任务，可用 `/schedule` 移至云端 |
| **Proactive** | 基于事件或计划自动运行 | 完全自动化，无人实时参与 |

**进阶技巧**: 编写 SKILL.md 文件将人工验证步骤编码，让 Claude 进行端到端自检  
*Source: @ClaudeDevs, Claude Blog*

---

### 7. Claude Design 系统提示词开源
Anthropic 旗下 Claude Design 的反向工程系统提示词在 GitHub 以 MIT 许可证开源，包含 **20 章提示词和 14 项技能**，覆盖内容纪律、美学、无障碍（WCAG）、交互状态、系统思维等。

**亮点**: 
- 针对 Fable 5/Opus 4.7+ 系列校准
- 新增「自主决策」条款：小决定直接执行记录而不询问
- 支持 Claude Code/Claude.ai 及 Codex 两种变体

**适合谁**: 想学习顶尖 AI 设计系统提示工程的人、需要构建类似 Agent 的开发者  
*Source: Hacker News, GitHub Trystan-SA*

---

## 🧠 方法论与 Prompt (Methods & Prompts)

### 8. Anthropic 提示词工程实战心法
Anthropic 应用 AI 工程师 Margot Van Laar 在 Code with Claude 大会分享核心观点：**我们很少从零写提示词，大部分时间在调试和维护已有生产提示词。**

**两个实战场景**：

**场景 A: 维护客服机器人**
- 用 XML 标签结构化清理提示词
- 移除旧模型遗留的「禁止列表」指令（新模型会过度拟合）
- 精确计算应调用工具，转人工决策需明确代价与收益

**场景 B: 从零构建零售排班 Agent**
- 拆成「生成 → 评估 → 修复」三个简单提示词，比一个大提示词更稳定
- 选用更强推理模型（Opus）处理复杂逻辑

**核心心法**:  **评估（Eval）是唯一严谨方式，没有评估就是碰运气。**
*Source: @berryxia, Code with Claude*

---

### 9. shot-scraper video — 让 AI 智能体录制演示视频
shot-scraper 1.10 新增 video 命令，支持通过 `storyboard.yml` 文件定义操作步骤，利用 Playwright 录制浏览器视频。开发者 Simon Willison 强调：**把 `--help` 输出设计得足够详细，可使编码 Agent 直接利用该命令生成演示视频。**

**核心价值**: 
- 解决「视频开头白帧」「宽度固定」等问题
- 适合需要为 Agent 工作流生成可视化演示的场景
- 可集成到自动化文档生成流程

**快速开始**: `pip install shot-scraper && shot-scraper video storyboard.yml`  
*Source: Simon Willison Blog*

---

## 📌 本周自我连接

来自 vault 连接发现（weekly-connections-2026-W27）：

> 本周无新增知识笔记，vault 活性需关注。建议通过 `writing-activator` 或 `decision-feeder` 激活现有笔记，或录入新的 AI 工具/方法学习笔记。

---

## 🔗 相关链接

- **Claude Sonnet 5**: https://www.anthropic.com/news/claude-sonnet-5
- **LongCat-2.0**: https://www.meituan.com/news/NN260630164005904
- **Gemini Omni Flash**: https://deepmind.google/blog/start-building-with-nano-banana-2-lite-and-gemini-omni-flash
- **Every 复利工程**: https://github.com/everydotai/compound-engineering
- **Claude Design 提示词**: https://github.com/Trystan-SA/claude-design-system-prompt

---

*本期周报 · Issue #13 | 2026.06.29 – 07.05*  
*—— 小柒AI速递 · 每周一上午推送*
