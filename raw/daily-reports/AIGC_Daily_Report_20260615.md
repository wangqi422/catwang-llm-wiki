# AIGC 日报 | 2026-06-15

> 每工作日 9:30 自动生成 | 推送时间：2026-06-15 16:30

---

## 今日概览

| #  | 新闻标题 | 来源 | 主题标签 | 重要性 |
|----|---------|------|----------|--------|
| 1 | Kimi K2.7 Code 高速版上线 | 月之暗面 | #编程模型 | 9.2 |
| 2 | Claude Fable 5 正式发布 | Anthropic | #大模型 | 9.5 |
| 3 | Google Managed Agents 公测 | Google | #Agent | 8.8 |
| 4 | DeepSeek V4 永久降价 75% | DeepSeek | #价格战 | 8.5 |
| 5 | Kling 2.6 音视频一体生成 | 字节跳动 | #AI视频 | 8.7 |
| 6 | Qwen3.7-Plus 视觉中国第一 | 阿里 | #多模态 | 8.3 |
| 7 | NotebookLM 升级 Agent 模式 | Google | #知识工具 | 8.0 |
| 8 | Cursor 3.7 Canvas Design Mode | Cursor | #AI编程 | 7.8 |

---

### #1 ⭐ Kimi K2.7 Code 高速版今日上线

> **来源**：月之暗面官方公告 | **评分**：9.2/10 | **标签**：#编程模型 #开源

#### 核心事件
月之暗面 Kimi K2.7 Code 编程大模型高速版于 6 月 15 日正式上线，输出速度达普通版 5-6 倍（常规 180 Token/s，短上下文最高 260 Token/s），同时 Code Bench v2 提升 21.8%，平均 token 消耗降低 30%。

#### 技术亮点 / 影响分析
- **高速版资费**为普通版 2 倍，但速度 5-6 倍——性价比实际更高
- K2.7 Code 必须开启思考模式，手动关闭会报错并回退至 K2.6
- 非编程任务仍建议用综合能力更强的 K2.6

#### 三句话总结
1. Kimi K2.7 Code 高速版今日上线，输出速度 180-260 Token/s
2. 编程能力大幅提升（Code Bench +21.8%），token 消耗降低 30%
3. 对 CODM 宣发技术栈：K2.7 可用于自动化脚本/数据处理工作流，高速版显著降低等待成本

---

### #2 ⭐ Claude Fable 5 — Anthropic 双层架构旗舰发布

> **来源**：Anthropic 官方博客 | **评分**：9.5/10 | **标签**：#大模型 #安全

#### 核心事件
Anthropic 发布 Claude Fable 5（公开最强）和 Claude Mythos 5（仅限安全合作伙伴），MMLU-Pro 98.3%，首创"Constitutional Self-Correction"自我纠正机制，支持 Dynamic Workflows 动态编排。

#### 技术亮点 / 影响分析
- Fable 5 在 Claude Code 中通过 `/model fable` 直接切换
- 双层架构（Fable/Mythos）首次实现"能力分级部署"——高风险能力不公开
- 支持 fan-out-and-synthesize 子 Agent 编排 + 对抗验证

#### 三句话总结
1. Anthropic 发布 Claude Fable 5，MMLU-Pro 98.3%，最强的公开 Claude 模型
2. 首创 Constitutional Self-Correction + 双层分级部署（Fable/Mythos）
3. 对宣发设计：Fable 5 的子 Agent 编排可自动化多步骤设计评审流程

---

### #3 ⭐ Google Managed Agents 公测

> **来源**：Google AI Blog | **评分**：8.8/10 | **标签**：#Agent #云服务

#### 核心事件
Google 在 Gemini API 公测 Managed Agents：一次 API 调用分配远程沙箱 Linux 环境，Agent 可规划、执行代码、管理文件、浏览网页，全托管无需基础设施。

#### 技术亮点 / 影响分析
- 对标 OpenAI Code Interpreter + Anthropic Computer Use
- 沙箱环境自动管理，无需运维
- 通过 Gemini API 和 Google AI Studio 均可接入

#### 三句话总结
1. Google Managed Agents 公测，一行 API 调出全托管 Agent 沙箱
2. Agent 可在沙箱内执行代码、浏览网页、管理文件
3. 对宣发自动化：可用于自动化素材采集、竞品监控、数据清洗等重复性工作

---

### #4 ⭐ DeepSeek V4 永久降价 75%

> **来源**：DeepSeek 官方 | **评分**：8.5/10 | **标签**：#价格战 #开源

#### 核心事件
DeepSeek V4 开源 Pro 与 Flash 两款模型，均支持 100 万 token 上下文。永久降价 75% 后，同样任务 GPT-5 成本约 $15，DeepSeek 仅需约 $0.50——成本仅为 GPT 的 1/30。

#### 技术亮点 / 影响分析
- DeepSeek V4-Pro：1.6T MoE 架构，49B 活跃参数，LiveCodeBench 93.5%
- DeepSeek V4-Flash：284B MoE 架构，13B 活跃参数，SWE-Bench Verified 79%
- 两款均为 MIT 开源许可

#### 三句话总结
1. DeepSeek V4 永久降价 75%，同样任务成本仅为 GPT 的 1/30
2. Pro/Flash 双模型开源，100 万 token 上下文
3. 对宣发团队：高性价比长文本处理（竞品报告/数据清洗）首选 DeepSeek

---

### #5 ⭐ Kling 2.6 原生音视频一体生成

> **来源**：可灵/字节跳动 | **评分**：8.7/10 | **标签**：#AI视频 #创作工具

#### 核心事件
Kling 2.6 实现音视频一体化生成：对白、音效、环境音在一次生成中与画面协同设计，告别传统"先画面后配音"流程。支持原生 4K（3840×2160）视频输出。

#### 技术亮点 / 影响分析
- 提示词可指定分层音频：对白+环境+音效同步
- 运动感强的场景自带沉浸式声音
- Layer 平台已集成，可直接使用

#### 三句话总结
1. Kling 2.6 原生音频+视频一体化生成，不再需要后期配音
2. 支持对白、音效、环境音在一次生成中协同设计
3. 对 CODM CG 短片：可直接出带声音的宣发片段，大幅简化制作流程

---

### #6 ⭐ Qwen3.7-Plus 视觉能力中国第一

> **来源**：阿里云 | **评分**：8.3/10 | **标签**：#多模态 #视觉

#### 核心事件
阿里 Qwen3.7-Plus 视觉能力全球第五、中国第一，实现"看、想、写、做、验"一个模型全搞定，可一键复刻桌面端专业软件。

#### 技术亮点 / 影响分析
- 统一多模态架构，视觉理解+生成一体
- 可复刻桌面端专业软件操作流程
- 开发者可通过阿里云 API 接入

#### 三句话总结
1. Qwen3.7-Plus 视觉能力中国第一，全球第五
2. 一个模型搞定"看想写做验"全流程
3. 对宣发设计：可用于视觉参考分析、设计稿自动化检测

---

### #7 ⭐ NotebookLM 升级 Agent 模式

> **来源**：Google | **评分**：8.0/10 | **标签**：#知识工具 #研究

#### 核心事件
NotebookLM 6 月 8 日升级：不再需要提前准备完整资料集，可用零散想法开始，Agent 自动发现相关来源。内置安全云电脑，可跑代码、出图表、导出 PPT/PDF/Excel。

#### 技术亮点 / 影响分析
- Gemini 3.5 + Antigravity 引擎
- 大文档分析胜率 69.9%，网页研究胜率 78.2%
- 支持图表、PDF、Word、CSV、JSON、Excel、PPT、图片输出

#### 三句话总结
1. NotebookLM 从"问答助手"进化为"研究 Agent"
2. 支持自动发现来源+代码执行+多格式导出
3. 对宣发调研：竞品分析→报告生成一条龙

---

### #8 ⭐ Cursor 3.7 Canvas Design Mode

> **来源**：Cursor | **评分**：7.8/10 | **标签**：#AI编程 #设计

#### 核心事件
Cursor 3.7 发布 Canvas Design Mode：在浏览器和画布中多选元素、语音叙述 Agent 运行、交互式上下文用量报告、全屏共享画布。

#### 技术亮点 / 影响分析
- Design Mode 可视化编辑与代码同步
- Voice narration 边看边说，Agent 边听边做
- 上下文用量报告帮助控制 Token 消耗

#### 三句话总结
1. Cursor 3.7 Canvas Design Mode 让 AI 编程可视化
2. 支持语音叙述 + 多选元素 + 上下文监控
3. 对宣发开发：H5 页面制作、官网迭代更高效

---

## 编辑点评

本周最大看点是**Agent 工作流的全面爆发**——从模型层（Fable 5 + Dynamic Workflows）到平台层（Managed Agents + NotebookLM Agent）到工具层（Kling 音视频 + Cursor Design Mode），AI 正在从"你问我答"变成"你说目标我来干"。对 CODM 宣发团队而言，最立竿见影的三件事：① 把 Karpathy 四原则复制进 CLAUDE.md，立刻降低 AI 编程出错率；② 试试 Kling 2.6 音视频一体生成，看看 CG 短片能不能直接带声音出稿；③ NotebookLM Agent 模式做竞品调研，从资料到 PPT 一条龙。
