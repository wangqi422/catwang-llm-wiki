# AIGC 日报 | 2026-06-05

> 每工作日 9:30 自动生成 | 推送时间：2026-06-05 09:30

---

## 今日概览

| #  | 新闻标题 | 来源 | 主题标签 | 重要性 |
|----|---------|------|----------|--------|
| 1 | Anthropic 递归自我改进报告：80%合并代码由 Claude 编写 | Anthropic Institute | #AI自我进化 #Claude | 9.5 |
| 2 | Google Gemma 4 12B：革命性无编码器架构，16GB 内存本地运行 | Google AI Blog | #开源模型 #多模态 | 9.2 |
| 3 | Perplexity Computer：通用数字工作者 Agent 发布 | Perplexity Official | #Agent #生产力 | 9.0 |
| 4 | ChatGPT 推出 Dreaming 记忆系统，事实记忆准确率翻倍 | OpenAI Official | #AI记忆 #ChatGPT | 8.7 |
| 5 | DeepSeek 700 亿融资 + Code 即将发布，ACM 金牌大神挂帅 | 量子位 / 36氪 | #DeepSeek #AI编程 | 8.5 |
| 6 | 微信开放 A2A Agent-to-Agent 能力，华为小米首批接入 | 腾讯官方 / 财联社 | #Agent #微信 | 8.3 |
| 7 | 英伟达 Cosmos 3 物理AI基础模型 + 收购 Kumo AI | NVIDIA GTC Taipei | #物理AI #英伟达 | 8.2 |
| 8 | Anthropic 开源 AI 漏洞发现框架，从侦察到补丁全自动 | GitHub / Anthropic | #AI安全 #开源 | 8.0 |

---

### #1 ⭐ Anthropic 递归自我改进报告：80%合并代码由 Claude 编写

> **来源**：https://www.anthropic.com/institute/recursive-self-improvement | **评分**：9.5/10 | **标签**：#AI自我进化 #Claude

#### 核心事件
Anthropic 研究院发布《当AI建造自身》报告，首次披露递归自我改进的实证数据：2026 年 Q2 工程师人均每天合并的代码量是 2024 年的 8 倍，其中超过 80% 由 Claude 编写。AI 可靠完成任务的时长约每 4 个月翻倍，Claude Opus 4.6 已能处理 12 小时级别的长程任务。

#### 技术亮点 / 影响分析
- **要点1**：AI 在「执行明确任务」方面已接近甚至超越人类水平，但「自主选择目标」仍有显著差距
- **要点2**：报告警告完全递归自我改进可能增加人类失去控制权的风险，安全防护重要性大幅提升
- **要点3**：这一进展距 Karpathy 加入 Anthropic 预训练团队仅两周，印证其"pre-training 还有大空间"的判断

#### 三句话总结
1. Anthropic 首次量化披露 AI 自我进化速度：代码产出 8 倍增长，80% 由 Claude 自己写
2. 任务可靠时长每 4 个月翻倍，表明 AI 正从"工具"走向"自主工作者"
3. 对 CODM 宣发团队而言，AI 自我进化意味着宣发素材生产链可望在半年内实现全自动闭环

---

### #2 ⭐ Google Gemma 4 12B：革命性无编码器架构，16GB 内存本地运行

> **来源**：https://www.aibase.com/news/28643 | **评分**：9.2/10 | **标签**：#开源模型 #多模态

#### 核心事件
Google 发布 Gemma 4 12B 模型，采用革命性的无编码器（Encoder-Free）架构，完全取消传统多模态模型中的编码器组件。视觉输入仅需一次矩阵乘法、位置嵌入和归一化操作即可处理，音频信号直接投射到文本 token 维度空间。

#### 技术亮点 / 影响分析
- **要点1**：120 亿参数模型可在仅 16GB 显存笔记本上流畅运行，大幅降低部署门槛
- **要点2**：采用 Multi-Token Prediction 技术加速推理，性能接近 Google 更大的 26B MoE 模型
- **要点3**：Apache 2.0 开源，支持 Ollama、vLLM 等主流框架，Gemma 4 系列累计下载量已超 1.5 亿次

#### 三句话总结
1. 无编码器架构颠覆多模态设计范式，计算复杂度大幅降低
2. 16GB 本地运行 + Apache 2.0 开源 = 个人开发者也能跑顶级多模态
3. 对 CODM 宣发来说，本地跑多模态模型意味着素材生成不再依赖云端，隐私和速度双提升

---

### #3 ⭐ Perplexity Computer：通用数字工作者 Agent 发布

> **来源**：Perplexity Official / The New Stack | **评分**：9.0/10 | **标签**：#Agent #生产力

#### 核心事件
Perplexity 发布 Computer——不是聊天机器人，而是"通用数字工作者"。用户描述目标后，Computer 部署子 Agent 自动浏览、研究、创建、连接 Gmail/Slack/Notion/Calendar 等数百个 App，可运行数小时甚至数月。口号：Chat answers. Agents do tasks. Computer works.

#### 技术亮点 / 影响分析
- **要点1**：对标 OpenClaw 但面向非技术用户，浏览器端运行，零配置上手
- **要点2**：同日 Anthropic 扩展 Claude Cowork 13 个企业插件（Google Workspace/DocuSign 等），Notion 发布 Custom Agents
- **要点3**：Agent 标准竞赛白热化：Anthropic Skills 仓库 76K+ stars，MCP SDK 月下载 9700 万

#### 三句话总结
1. Agent 从开发者工具正式进入普通用户视野，Perplexity Computer 是标志性产品
2. 多家巨头同日发布 Agent 产品，2026 年是 Agent 元年已成定局
3. 对 CODM 宣发团队，Agent 可自动监控竞品社媒、生成素材初稿、管理发布日历

---

### #4 ⭐ ChatGPT 推出 Dreaming 记忆系统，事实记忆准确率翻倍

> **来源**：OpenAI Official / 36氪 | **评分**：8.7/10 | **标签**：#AI记忆 #ChatGPT

#### 核心事件
OpenAI 推出 ChatGPT 记忆系统重大升级"Dreaming"架构：引入后台持续运行的自动化流程，跨多轮对话综合提炼用户信息，并随时间推移主动更新记忆状态。事实记忆准确率从 41.5% 跃升至 82.8%，偏好遵循率从 31.4% 升至 71.3%。

#### 技术亮点 / 影响分析
- **要点1**：时效性准确率从 9.4% 飙升至 75.1%，过期信息自动更新为历史记忆
- **要点2**：Anthropic 于 5 月 6 日 Code with Claude 大会已发布同名 Dreaming 功能，早约一个月
- **要点3**：记忆系统是 Agent 长期可靠运行的基础设施，两大巨头同方向押注

#### 三句话总结
1. ChatGPT 记忆从"存储"进化为"做梦"——后台持续提炼更新
2. 事实准确率翻倍、时效性提升 8 倍，AI 终于不会用过期信息误导你了
3. 对宣发团队，AI 记住品牌调性/历史素材后可生成更一致的内容

---

### #5 ⭐ DeepSeek 700 亿融资 + Code 即将发布，ACM 金牌大神挂帅

> **来源**：量子位 / 36氪 | **评分**：8.5/10 | **标签**：#DeepSeek #AI编程

#### 核心事件
DeepSeek 完成 700 亿元人民币融资，同时 Code 产品即将发布，由 ACM 竞赛金牌得主崔添翼挂帅。此前美国 AI Agent 初创公司 Lindy 已将 100% 流量从 Claude 切换到 DeepSeek V4，称每年节省数百万美元且性能提升。

#### 技术亮点 / 影响分析
- **要点1**：V4 参数量 1.6T，支持 1M 上下文，限时输出价格 6 元/百万 Token，同级别最优
- **要点2**：适配华为昇腾 950PR 等国产算力，缓解算力制约
- **要点3**：Lindy 创始人称切换工作量比预想高 100 倍，但成本和性能双胜

#### 三句话总结
1. DeepSeek 融资+产品双线并进，Code 产品有望改变 AI 编程格局
2. 美国初创用脚投票从 Claude 切到 DeepSeek，中国模型正快速追赶
3. 低成本+高性能的组合对宣发团队的 AI 工具选型极具吸引力

---

### #6 ⭐ 微信开放 A2A Agent-to-Agent 能力，华为小米首批接入

> **来源**：腾讯官方 / 财联社 / 北京日报 | **评分**：8.3/10 | **标签**：#Agent #微信

#### 核心事件
微信正与华为、荣耀、小米、OPPO、vivo 合作推出 A2A（Agent-to-Agent）助手能力，用户可通过手机语音助理发起微信音视频通话或向好友发送消息。荣耀已首批接入，YOYO 智能体可直接语音发微信。

#### 技术亮点 / 影响分析
- **要点1**：基于 A2A 协作机制 + 双重授权，数据安全与隐私有保障
- **要点2**：微信首次以合作形式向手机厂商开放 Agent 调用能力，过去长期审慎
- **要点3**：超级 App + 手机系统的跨生态协同，是 Agent 落地的关键基础设施

#### 三句话总结
1. 微信开放 Agent 接口是中国 Agent 生态的里程碑事件
2. 语音发微信消息/打电话，Agent 从概念变成日常操作
3. 对 CODM 宣发，微信 A2A 意味着未来可通过语音指令一键推送素材到社群

---

### #7 ⭐ 英伟达 Cosmos 3 物理AI基础模型 + 收购 Kumo AI

> **来源**：NVIDIA GTC Taipei / 腾讯新闻 | **评分**：8.2/10 | **标签**：#物理AI #英伟达

#### 核心事件
英伟达在 2026 台北 GTC 大会发布 Cosmos 3 物理AI基础模型，采用全新混合 Transformer 架构，集成视觉推理、世界生成和动作预测。同日宣布收购 Kumo AI（商业预测基础模型），联合创始人 Jure Leskovec 已加入英伟达。

#### 技术亮点 / 影响分析
- **要点1**：Cosmos 3 是全球首款完全开放的全模态物理AI模型，成立 Cosmos Coalition 全球联盟
- **要点2**：黄仁勋在 COMPTUEX 称 Marvell 将成为"下一家万亿美元公司"，后者当日暴涨 32%
- **要点3**：物理AI + 商业预测的组合，表明英伟达正从芯片公司向 AI 基础设施公司全面转型

#### 三句话总结
1. 物理AI开放模型意味着机器人/自动驾驶训练成本将大幅下降
2. Kumo AI 收购补齐商业预测短板，英伟达 AI 版图再扩张
3. 物理AI与游戏宣发直接相关——未来游戏 CG 或可由物理AI自动生成

---

### #8 ⭐ Anthropic 开源 AI 漏洞发现框架，从侦察到补丁全自动

> **来源**：GitHub / Anthropic | **评分**：8.0/10 | **标签**：#AI安全 #开源

#### 核心事件
Anthropic 在 GitHub 开源 defending-code-reference-harness 框架，实现基于 Claude 的自主漏洞发现与修复完整流水线：侦察→发现→验证→报告→补丁，覆盖 C/C++ 内存漏洞，使用 Docker + ASAN 沙箱隔离。

#### 技术亮点 / 影响分析
- **要点1**：提供完整 Claude Code 技能集：/threat-model、/vuln-scan、/triage、/patch
- **要点2**：同日 Claude Code GitHub Action 爆出提示注入漏洞，安全风险与防护能力同步暴露
- **要点3**：OpenHack 开源安全扫描工具同时出现，成本仅为 Opus 方案的 1/40

#### 三句话总结
1. AI 安全进入"用AI对抗AI"阶段，攻防自动化是必然趋势
2. 提示注入漏洞暴露 Agent 生态的供应链安全隐患
3. 对 CODM 团队，AI 安全工具可用于游戏客户端/反作弊系统的自动化检测

---

## 编辑点评

今日最大看点无疑是 **Anthropic 递归自我改进报告**——这不再是对未来的预测，而是对已发生事实的量化披露。80% 的代码由 AI 自己写、任务时长每 4 个月翻倍，这些数据点共同指向一个结论：**AI 正在加速构建自身**。与此同时，Google Gemma 4 12B 以无编码器架构打破多模态部署成本壁垒，Perplexity Computer 让 Agent 从开发者工具走向普通用户，微信开放 A2A 能力则标志着中国 Agent 生态的基础设施正式启动。对 CODM 宣发团队而言，建议优先关注：① Perplexity Computer 的竞品社媒自动监控能力；② Gemma 4 12B 本地多模态模型用于素材生成原型验证；③ 微信 A2A 的社群消息自动化推送场景。
