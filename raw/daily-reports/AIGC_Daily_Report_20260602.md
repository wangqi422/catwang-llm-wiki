# AIGC 日报 | 2026-06-02

> 每工作日 9:30 自动生成 | 推送时间：2026-06-02 14:15

---

## 今日概览

| #  | 新闻标题 | 来源 | 主题标签 | 重要性 |
|----|---------|------|----------|--------|
| 1 | Anthropic 递交保密 IPO 申报，抢先 OpenAI 上市 | 腾讯新闻/环球市场播报 | `#Anthropic` `#IPO` | 9.5 |
| 2 | Qwen3.7-Plus 多模态 Agent 模型发布 | 阿里百炼/腾讯视频 | `#Qwen` `#Agent` | 9.2 |
| 3 | MiniMax M3 正式发布：1M 上下文 + 原生多模态 + SWE-Bench Pro 超越 GPT-5.5 | 凤凰网科技/腾讯新闻 | `#MiniMax` `#开源` | 9.0 |
| 4 | 腾讯微信 AI 助手即将上线，右滑呼出 | 新浪科技 | `#腾讯` `#微信AI` | 8.8 |
| 5 | Claude 修复 Opus 4.8 并行调用异常，重置 Pro/Max 限额 | 腾讯视频 AI 早报 | `#Claude` `#修复` | 8.5 |
| 6 | NVIDIA RTX Spark 进军 PC 芯片，3nm 工艺联合联发科 | 第一财经 | `#NVIDIA` `#AI PC` | 8.3 |
| 7 | Perplexity Computer 发布通用数字工作者 Agent | TheNewStack | `#Perplexity` `#Agent` | 8.0 |
| 8 | JetBrains 发布 12B MoE 架构模型 Mellum 2 | 腾讯视频 AI 早报 | `#JetBrains` `#编程模型` | 7.8 |

---

### #1 ⭐ Anthropic 递交保密 IPO 申报，抢先 OpenAI 启动上市

> **来源**：[腾讯新闻/环球市场播报](https://new.qq.com/rain/a/20260602A00P5V00) | **评分**：9.5/10 | **标签**：`#Anthropic` `#IPO` `#融资`

#### 核心事件
Anthropic 已向美国 SEC 递交保密上市申请材料，在 IPO 进程上抢先竞品 OpenAI。发行股份数量与发行价尚未敲定，待 SEC 审核完成后获得择机上市选择权。

#### 技术亮点 / 影响分析
- **估值超越**：刚完成 650 亿美元融资，投后估值升至 9650 亿美元，超越 OpenAI（8520 亿美元）
- **营收爆发**：年化营收突破 470 亿美元（4 月仅 300 亿，去年仅 90 亿），增长惊人
- **上市竞速**：与 OpenAI 上演激烈上市竞速，成 SpaceX 之后最受期待 IPO
- **安全博弈**：因拒绝向美国防部开放全自主杀伤武器，被列入供应链风险清单，已提起诉讼

#### 三句话总结
1. Anthropic 向 SEC 递交保密 IPO 申报，估值 9650 亿美元超越 OpenAI
2. 年化营收 470 亿美元，Claude 代码编程模型成企业端增长引擎，与 OpenAI 上演资本竞速
3. IPO 后融资能力将进一步增强，对 CODM 宣发团队意味着 Claude 系列产品迭代加速，AI 辅助设计工具链持续升级

---

### #2 ⭐ Qwen3.7-Plus 多模态 Agent 模型发布

> **来源**：[阿里百炼/腾讯视频 AI 早报](https://wv.video.qq.com/export/UzFfBgAAxKWDHAgZYxrEjMzT4DBZDTXd3zSYTwIX46R2Qy9Z6pI) | **评分**：9.2/10 | **标签**：`#Qwen` `#Agent` `#多模态`

#### 核心事件
阿里千问正式发布多模态模型 Qwen3.7-Plus，统一视觉与语言能力，能操作图形和命令行界面，具备完整的 Agent 能力。

#### 技术亮点 / 影响分析
- **多模态 Agent**：支持 GUI 操作 + 命令行操作，真正可执行任务的 Agent 模型
- **API 开放**：通过阿里云百炼提供 API，可在千问 Studio 中体验
- **国产多模态追赶**：补齐与海外前沿模型的多模态 Agent 差距

#### 三句话总结
1. 阿里千问发布 Qwen3.7-Plus，统一视觉语言能力并具备完整 Agent 能力
2. 支持 GUI/CLI 双界面操作，API 已开放，国产多模态 Agent 能力追平海外前沿
3. CODM 宣发团队可用 Qwen3.7-Plus 构建自动化设计工作流，如批量素材生成+自动排版

---

### #3 ⭐ MiniMax M3 正式发布：1M 上下文 + 原生多模态 + SWE-Bench Pro 超越 GPT-5.5

> **来源**：[凤凰网科技](https://tech.ifeng.com/c/8tb4RhHvtIJ) | **评分**：9.0/10 | **标签**：`#MiniMax` `#开源` `#MSA`

#### 核心事件
稀宇科技正式发布 MiniMax M3，采用自研稀疏注意力架构 MSA，支持 1M 超长上下文、原生多模态（图文视频+桌面操作），编程超越 GPT-5.5，10 天内开源权重。

#### 技术亮点 / 影响分析
- **MSA 架构**：1M 上下文下每 token 计算量仅为前代 1/20，prefilling 加速 9x，decoding 加速 15x
- **SWE-Bench Pro 59.0%**：超越 GPT-5.5 和 Gemini 3.1 Pro，接近 Opus 4.7
- **原生多模态**：国内首个同时具备 1M 上下文 + 原生多模态 + 顶级编程的三合一模型
- **即将开源**：10 天内开源模型权重，同步上线 Agent 产品 MiniMax Code
- **Token Plan 切换**：切换至行业统一的 Token-Based 计费，Plus 49 元/月、Max 119 元/月、Ultra 469 元/月

#### 三句话总结
1. MiniMax M3 采用 MSA 架构，1M 上下文计算量降至前代 1/20，编程超 GPT-5.5
2. 国内首个三合一模型（1M 上下文+原生多模态+顶级编程），10 天内开源权重
3. 开源后可直接本地部署，CODM 宣发团队可用于自动化文案生成与多模态设计辅助

---

### #4 ⭐ 腾讯微信 AI 助手即将上线，右滑呼出

> **来源**：[新浪科技](https://k.sina.com.cn/article_7857201856_1d45362c001906a3nm.html) | **评分**：8.8/10 | **标签**：`#腾讯` `#微信AI` `#Agent`

#### 核心事件
腾讯正接近推出微信嵌入式 AI 代理，用户可在微信主界面向右滑动访问 AI 助手聊天窗口，计划最快本月启动上线前合规流程。

#### 技术亮点 / 影响分析
- **入口极简**：右滑呼出 AI 助手，零学习成本触达 13 亿用户
- **任务型 Agent**：不只是聊天，可在微信内协助完成任务（订餐、打车、支付等）
- **合规先行**：先启动合规流程再分阶段推广，体现腾讯审慎策略

#### 三句话总结
1. 腾讯即将在微信内嵌入 AI 助手，右滑呼出，13 亿用户零门槛使用
2. AI Agent 首次深入超级 App，从聊天扩展到任务执行，重新定义移动端 AI 交互
3. 微信 AI 入口或成品牌宣发新阵地，CODM 可提前规划 AI 助手互动式营销

---

### #5 ⭐ Claude 修复 Opus 4.8 并行调用异常，重置 Pro/Max 限额

> **来源**：[腾讯视频 AI 早报](https://wv.video.qq.com/export/UzFfBgAAxKWDHAgZYxrEjMzT4DBZDTXd3zSYTwIX46R2Qy9Z6pI) | **评分**：8.5/10 | **标签**：`#Claude` `#修复` `#额度`

#### 核心事件
Claude 官方为所有 Pro 和 Max 计划用户重置 5 小时及周限额，修复了 Claude Code 中因 Opus 4.8 请求处理异常导致额度被过快消耗的缺陷。

#### 技术亮点 / 影响分析
- **并行调用 Bug**：Opus 4.8 的并行请求处理异常，导致额度消耗远超预期
- **重置限额**：Pro/Max 用户额度全面重置，缓解因 Bug 造成的额度浪费
- **体验优化**：Opus 4.8 动态工作流上线后负载激增，此次修复提升稳定性

#### 三句话总结
1. Claude 修复 Opus 4.8 并行调用 Bug，为 Pro/Max 用户重置额度
2. Opus 4.8 动态工作流上线后负载激增暴露稳定性问题，本次修复提升体验
3. 修复后 Claude Code 稳定性提升，CODM 团队使用 AI 辅助设计工作流更可靠

---

### #6 ⭐ NVIDIA RTX Spark 进军 PC 芯片，3nm 工艺联合联发科

> **来源**：[第一财经](https://news.qq.com/rain/a/20260602A02BD600?adChannelId=finance_stock) | **评分**：8.3/10 | **标签**：`#NVIDIA` `#AI PC` `#芯片`

#### 核心事件
英伟达发布面向个人电脑的 RTX Spark 超级芯片，3nm 工艺联合联发科打造，可适配 Arm 架构 Windows 系统，2026 秋季起戴尔、联想等品牌将搭载。英伟达股价大涨 6.25%，英特尔和高通分别下挫。

#### 技术亮点 / 影响分析
- **3nm AI PC 芯片**：原生 AI 加速，PC 行业 40 年底层革新
- **Arm 架构 Windows**：打破 Intel x86 垄断，戴尔/联想/华硕 2026 秋季搭载
- **市场震动**：英伟达 +6.25%，戴尔 +10%，英特尔 -4.67%，高通 -8.78%

#### 三句话总结
1. 英伟达发布 RTX Spark 3nm AI PC 芯片，联合联发科挑战 Intel 垄断
2. Arm 架构 Windows + 原生 AI 加速，PC 行业 40 年最大底层变革
3. AI PC 本地推理能力大幅提升，CODM 宣发素材可在本地完成 AI 生成与渲染

---

### #7 ⭐ Perplexity Computer 发布通用数字工作者 Agent

> **来源**：[TheNewStack](https://thenewstack.io/perplexity-computer-vibe-coding-openai-anthropic-pentagon/) | **评分**：8.0/10 | **标签**：`#Perplexity` `#Agent` `#自动化`

#### 核心事件
Perplexity 发布 Computer——通用数字工作者 Agent，用户描述目标后自动部署子 Agent 浏览、研究、创建并连接工具，连接 Gmail/Slack/Notion/Calendar 等，可运行数小时甚至数月。

#### 技术亮点 / 影响分析
- **通用 Agent**：不同于聊天机器人，可自主完成复杂任务链
- **子 Agent 架构**：自动部署子 Agent 执行浏览、研究、创建等子任务
- **生态连接**：Gmail/Slack/Notion/Calendar 等数百个应用集成

#### 三句话总结
1. Perplexity 发布通用数字工作者 Agent，描述目标即可自动执行复杂任务链
2. 子 Agent 架构+数百应用集成，从聊天机器人进化为真正的数字员工
3. Agent 自动化工作流可复用于宣发日常，如自动搜集竞品信息+整理日报

---

### #8 ⭐ JetBrains 发布 12B MoE 架构模型 Mellum 2

> **来源**：[腾讯视频 AI 早报](https://wv.video.qq.com/export/UzFfBgAAxKWDHAgZYxrEjMzT4DBZDTXd3zSYTwIX46R2Qy9Z6pI) | **评分**：7.8/10 | **标签**：`#JetBrains` `#编程模型` `#MoE`

#### 核心事件
JetBrains 发布 12B 参数 MoE 架构编程模型 Mellum 2，面向 IDE 内编程辅助场景优化。

#### 技术亮点 / 影响分析
- **MoE 架构**：12B 参数中仅激活部分专家，推理效率高
- **IDE 原生**：深度集成 IntelliJ/PyCharm 等 JetBrains IDE
- **编程专精**：针对代码补全、重构、调试场景优化

#### 三句话总结
1. JetBrains 发布 12B MoE 编程模型 Mellum 2，推理效率高且 IDE 深度集成
2. 编程专精模型+MoE 架构，IDE 内代码辅助体验大幅提升
3. 编程模型持续迭代，间接推动 AI 辅助工具链进化，降低宣发自动化脚本编写门槛

---

## 编辑点评

今日最大看点无疑是 **Anthropic 抢先 OpenAI 递交 IPO 申请**——估值 9650 亿美元已超 OpenAI，年化营收 470 亿美元的增速令资本市场沸腾。这意味着 Claude 系列产品将获得更充沛的研发资金，AI 辅助设计工具链有望加速进化。

同时 **MiniMax M3 开源 + Qwen3.7-Plus Agent 化** 标志着国产大模型正式进入"1M 上下文 + 原生多模态 + 顶级编程"三合一时代，10 天后 M3 开源权重更将释放本地部署红利。对 CODM 宣发团队而言，开源模型可直接用于素材生成自动化，成本可控且数据不出境。

**NVIDIA RTX Spark** 进军 PC 芯片则意味着 2026 秋季起，本地 AI 推理能力将大幅普及——宣发素材的 AI 生成与渲染不再依赖云端，延迟更低、隐私更安全。

**给 CODM 宣发团队的建议**：
1. 关注 M3 开源后的本地部署方案，提前搭建多模态素材生成管线
2. 微信 AI 助手上线后，可率先探索品牌 AI 互动营销新形态
3. RTX Spark AI PC 上市后，评估本地 AI 渲染工作站升级方案
