# AIGC 日报 | 2026-06-28

> 每工作日 9:30 自动生成 | 推送时间：2026-06-28 09:20

---

## 今日概览

| #  | 新闻标题 | 来源 | 主题标签 | 重要性 |
|----|---------|------|----------|--------|
| 1 | DeepSeek × 北大开源 DSpark 推测解码框架：单用户生成速度提升 60-85% | 36氪 / IT之家 / DeepSeek | `#开源` `#推理加速` `#DeepSeek` | 9.4 |
| 2 | OpenAI × Broadcom 联合发布 Jalapeño 首款自研推理芯片：9 个月流片，成本降 50% | Broadcom 官方 / 21世纪经济 | `#AI芯片` `#自研` `#OpenAI` | 9.2 |
| 3 | Anthropic 指控阿里 Qwen 实施 28.8M 次蒸馏攻击：4 倍于此前 DeepSeek 案 | Bloomberg / The Information | `#蒸馏攻击` `#中美AI` | 9.0 |
| 4 | Mistral AI 发布 OCR4：170 种语言，OmniDocBench 击败 GPT-5.5 Pro | Mistral 官方 / TechTimes | `#多语言OCR` `#开源模型` | 8.8 |
| 5 | Karpathy 内部 Claude.md 军规泄露：10 条实战规则碾压 GitHub 18 万星版 | 新智元 / 36氪 | `#Agent` `#工程实践` | 8.7 |
| 6 | OpenMontage：GitHub 周榜第一的 Agentic 视频制作系统，500+ Agent Skills | GitHub Trending / Trendshift | `#Agent视频` `#开源` | 8.6 |
| 7 | Anthropic 停招初级工程师双重警告：增长伴随失业，AI 经济悖论难解 | Anthropic / The Decoder | `#人才动态` `#经济冲击` | 8.5 |
| 8 | 微博 weibo-cli 正式上线：70+ API + MCP 协议，国内首个 Agent 原生 CLI | IT之家 / 微博开放平台 | `#MCP` `#Agent工具` | 8.3 |

---

### #1 ⭐ DeepSeek × 北大开源 DSpark 推测解码框架：单用户生成速度提升 60-85%

> **来源**：[36氪](https://eu.36kr.com/zh/p/3871187114448133) / [IT之家](https://www.ithome.com/0/969/379.htm) / [DeepSeek 官方](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-DSpark) | **评分**：9.4/10 | **标签**：`#开源` `#推理加速` `#DeepSeek`

#### 核心事件
2026 年 6 月 27 日，DeepSeek 联合北京大学正式开源 **DSpark 推测解码（Speculative Decoding）框架**——这是 500 亿元融资后的首个开源动作。同步发布 DeepSeek-V4-Pro-DSpark 与 DeepSeek-V4-Flash-DSpark 模型权重，以及训练代码仓库 DeepSpec。梁文锋亲自署名论文《DSpark: Confidence-Scheduled Speculative Decoding with Semi-Autoregressive Generation》。

#### 技术亮点 / 影响分析
- **单用户生成速度 60-85%**：相比成熟生产基线 MTP-1，在保持吞吐不变的前提下实现显著加速
- **高并发吞吐提升 51-400%**：硬件感知前缀调度动态调整验证长度，避免"高拒绝风险尾部 token" 消耗批量算力
- **半自回归架构**：并行主干网络生成候选 token + 轻量级顺序模块注入前缀依赖，破解"草稿长度-准确率"权衡
- **MIT 开源协议**：Hugging Face 与 GitHub 双仓库开放，企业可立即部署

#### 三句话总结
1. DSpark 是首个由 DeepSeek × 北大联合开源的推测解码框架，瞄准大模型"高并发+高时延"双痛点
2. 置信度调度 + 硬件感知调度器把单用户速度拉到 60-85%，高并发场景最高翻 4 倍
3. 对 CODM 宣发团队：批量跑图、文案生成、版本对比这类"低延迟+高并发"工作流可显著省算力，配合 DeepSeek-V4 性价比依然无人能敌

---

### #2 ⭐ OpenAI × Broadcom 联合发布 Jalapeño 首款自研推理芯片：9 个月流片，成本降 50%

> **来源**：[Broadcom 官方](https://broadcom.com/company/news/product-releases/64506) / [21世纪经济报道](https://m.21jingji.com/article/20260626/herald/29c0f43e149fd059467b8af35387cd23.html) / [钛媒体](https://www.tmtpost.com/agent/ai-article/18558) | **评分**：9.2/10 | **标签**：`#AI芯片` `#自研` `#OpenAI`

#### 核心事件
2026 年 6 月 24 日，OpenAI 与 Broadcom 联合发布首款自研 AI 推理芯片 **Jalapeño（Inteligence Processor）**——这是 OpenAI 软硬全栈战略的关键一步。工程样片已交付 Sam Altman 和 Greg Brockman，2026 年底开始在微软等数据中心进行**吉瓦级（gigawatt scale）部署**。

#### 技术亮点 / 影响分析
- **9 个月从设计到流片**：被双方称为"高性能 ASIC 领域最快开发周期之一"——AI 模型反向加速了芯片设计流程
- **每瓦性能优于当前 SOTA**：早期测试显示 Jalapeño 在生产目标频率下执行 GPT-5.3-Codex-Spark 负载，能效显著领先
- **50% 成本降低**：Broadcom CEO 陈福阳透露，相比典型 AI GPU 成本减半——直接缓解 2025 年 OpenAI 209 亿美元运营亏损
- **10GW 多代算力平台第一代产品**：与 Broadcom 此前的合作承诺落地，2029 年底前分阶段部署

#### 三句话总结
1. OpenAI 首款自研推理芯片 Jalapeño 亮相，9 个月流片刷新 ASIC 开发纪录，AI 反向加速芯片设计成为新范式
2. 50% 成本降低 + 吉瓦级部署意味着 ChatGPT/Codex/API 的推理价格将进一步下调，"AI 计算通胀"有望缓解
3. 对 CODM 宣发团队：OpenAI 模型推理价格预期下行可降低长期 API 成本，但需关注 OpenAI 是否同步收紧 API 配额或引导私有化部署

---

### #3 ⭐ Anthropic 指控阿里 Qwen 实施 28.8M 次蒸馏攻击：4 倍于此前 DeepSeek 案

> **来源**：[Bloomberg](https://www.buildfastwithai.com/blogs/ai-news-today-june-26-2026) / [The Information](https://www.theinformation.com) / Anthropic 致信全文 | **评分**：9.0/10 | **标签**：`#蒸馏攻击` `#中美AI` `#地缘政治`

#### 核心事件
Anthropic 于 6 月 10 日致信美国参议院银行委员会主席 Tim Scott 与资深议员 Elizabeth Warren，正式指控阿里巴巴及 Qwen 实验室**实施史上最大规模蒸馏攻击**——约 **25,000 个虚假账户**在 4 月 22 日至 6 月 5 日间生成 **2,880 万次与 Claude 的交换**。被针对性蒸馏的能力正是 Claude Mythos Preview 的强项：agentic reasoning、软件工程、长程任务。

#### 技术亮点 / 影响分析
- **4 倍于此前指控量**：此前 Anthropic 2 月指控 DeepSeek/Moonshot/MiniMax 的 16M 次交换，阿里 Qwen 案近乎翻倍
- **直接关联 Mythos 强项能力**：攻击方明确针对软件工程与长程任务——即 Mythos Preview 的核心差异化能力
- **致信时机关键**：在 US 政府下架 Fable 5 指令与 Anthropic 提交 IPO S-1 之前两星期，加剧地缘政治叙事
- **Alibaba 未公开回应**：致信全文中称"中国政府涉嫌共谋"，Anthropic 将其定性为"经济与地缘威胁"

#### 三句话总结
1. Anthropic 致信美国国会指控阿里 Qwen 实施 28.8M 次蒸馏攻击，规模 4 倍于此前针对 DeepSeek 的指控
2. 攻击方针对性蒸馏 Mythos Preview 强项（软件工程+长程任务），加剧"中国 AI 复制美国前沿能力"叙事
3. 对 CODM 宣发团队：中美 AI 监管可能升级为出口管制，国产化/合规化模型选型（DeepSeek/智谱/Kimi）需成为长期备选方案

---

### #4 ⭐ Mistral AI 发布 OCR4：170 种语言，OmniDocBench 击败 GPT-5.5 Pro

> **来源**：[Mistral 官方](https://mistral.ai/news/ocr-4) / [TechTimes](https://www.techtimes.com/articles/318978/20260624/mistral-ocr-4-ships-structure-aware-document-ai-runs-your-own-infrastructure.htm) / [量子位](https://www.qbitai.com/2026/06/438789.html) | **评分**：8.8/10 | **标签**：`#多语言OCR` `#开源模型` `#文档智能`

#### 核心事件
法国 Mistral AI 于 6 月 23 日发布 **Mistral OCR 4**——专精文档识别的"小而美"模型，定位企业 RAG 与智能体工作流。170 种语言跨 10 大语族，OmniDocBench 拿到 93.07 分的人类评审最高胜率（vs GPT-5.5 Pro 66.4% / Gemini 3.1 Pro Preview 70%）。

#### 技术亮点 / 影响分析
- **结构化输出**：每个文本块返回**边框坐标 + 类型标签（标题/表格/公式/签名）+ 置信度评分**——这是 Mistral 客户最期待的能力
- **自部署 + 数据主权**：单容器部署，企业可让敏感文档完全留在自己基础设施内（金融/法律/政务刚需）
- **单节点 2000 页/分钟**：超高吞吐量适合大规模批处理，4 美元/千页（批处理 5 折 = 2 美元/千页）
- **集成 Search Toolkit**：直接接入 Mistral 开源企业搜索框架，提供 citation-ready 的 RAG 流水线

#### 三句话总结
1. Mistral OCR 4 是首个支持 170 种语言的结构化 OCR 模型，OmniDocBench 93.07 分超越 GPT-5.5 Pro 与 Gemini 3.1 Pro
2. 单容器自部署 + 数据主权能力直击企业级金融/法律/政务场景，是欧洲 AI 切入"文档垂直赛道"的代表作
3. 对 CODM 宣发团队：批量处理多语言玩家素材（社区评论、外服运营文档）时 Mistral OCR 4 是性价比首选，且合规性更适合企业内数据

---

### #5 ⭐ Karpathy 内部 Claude.md 军规泄露：10 条实战规则碾压 GitHub 18 万星版

> **来源**：[新智元](https://k.sina.cn/article_5953466437_162dab0450670autg8.html) / [36氪](https://www.36kr.com/p/3866817190417673) | **评分**：8.7/10 | **标签**：`#Agent` `#工程实践` `#Claude`

#### 核心事件
Andrej Karpathy 5 月 19 日入职 Anthropic 预训练团队后，**5 周内迭代的内部 Claude.md 配置文件意外流出**——10 条实战军规标题为《CLAUDE.md: Field Notes on Getting a Language Model to Write Code You Will Not Rewrite》，副标题"A Short List of Rules, Earned by Watching the Same Mistakes Twice"。

#### 技术亮点 / 影响分析
- **从 4 条到 10 条**：1 月 26 日 Karpathy 公开的 4 条吐槽（悄悄做假设、过度工程化、乱改不该改的代码、缺乏成功标准）被开发者 Forrest Chang 做成 GitHub 仓库 3 个月破 18.3 万星；本次流出的是**完整实战版 2 倍强度**
- **解决"我几乎所有任务"**：社区用户评价该文件"它解决了我们几乎所有当前的任务"——Claude 终于不再"对着干"
- **Anthropic 内部必读**：是 Anthropic 预训练团队在 Agent 工作流中的实战沉淀，**标题暗含"看够同样错误犯两遍才攒出"**
- **学术界格式排版**：与 GitHub 散装 markdown 不同，**采用学术论文格式**——可见 Anthropic 内部对 Agent 工作流的严谨度

#### 三句话总结
1. Karpathy 入职 Anthropic 5 周后迭代的内部 Claude.md 军规流出，10 条实战规则是 GitHub 18 万星社区版的 2 倍强度
2. 这份文件让 Claude"终于不再对着干"——意味着 Anthropic 内部已经形成"Agent 编码可控性"的系统方法论
3. 对 CODM 宣发团队：可直接用这 10 条军规校准 Claude Code/Cursor/Cline 等 Agent 工具的 prompt 模板，把 AI 编程"返工率"压到最低

---

### #6 ⭐ OpenMontage：GitHub 周榜第一的 Agentic 视频制作系统，500+ Agent Skills

> **来源**：[GitHub Trending](https://trendshift.io/weekly) / [Trendshift Weekly](https://trendshift.io/weekly) | **评分**：8.6/10 | **标签**：`#Agent视频` `#开源` `#Workflow`

#### 核心事件
GitHub 周榜（Jun 22-28）第一名 **OpenMontage（calesthio/OpenMontage）**——**世界首个开源 Agentic 视频制作系统**，3.7k stars 本周增长。整合 12 个 pipelines、52 tools、500+ agent skills，**把 AI 编程助手变成完整视频制作工作室**。

#### 技术亮点 / 影响分析
- **Pipeline × Tools × Skills 三层架构**：12 条视频制作流水线 + 52 个工具（剪辑/转场/调色/字幕） + 500 个 Agent Skills
- **AI 编程助手直接驱动**：与 Claude Code、Codex、Opencode、Cursor 无缝集成，**自然语言指挥视频生产**
- **Workflow automation 标杆**：不仅是工具，更是"AI 程序员+AI 剪辑师+AI 调色师"协同的工作流范式
- **Agent 视频赛道开闸**：紧随 palmier-io/palmier-pro（macOS 视频编辑器）等项目，**Agentic Video 正式成为独立赛道**

#### 三句话总结
1. OpenMontage 拿下 GitHub 周榜第一，3.7k stars 周增长，把 AI 编程助手变成完整视频制作工作室
2. 12 pipelines × 52 tools × 500 skills 的三层架构是 Agent 视频赛道的工程标杆，远超"AI 一键生成"的概念
3. 对 CODM 宣发团队：可立即用 OpenMontage 串接 Sora 2/Runway/Veo 3.1/Kling 3.0 自动化制作赛事高光、玩家故事、版本对比等长尾视频

---

### #7 ⭐ Anthropic 停招初级工程师双重警告：增长伴随失业，AI 经济悖论难解

> **来源**：[Anthropic](https://www.anthropic.com) / [The Decoder](https://the-decoder.com) | **评分**：8.5/10 | **标签**：`#人才动态` `#经济冲击` `#Anthropic`

#### 核心事件
Anthropic 联合创始人 Jack Clark 公开表示，**公司已停止招聘初级软件工程师**："直觉的回报率比以往高得多。"Claude 处理大规模实验——这项工作过去需要庞大的初级研究员团队完成。公司现在**只招聘"高级直觉"型资深员工**。

#### 技术亮点 / 影响分析
- **两端同时拉满的危险悖论**：Clark 警告 AI 可能带来"远超趋势的 GDP 增长"+"只有衰退期才会出现的失业率飙升"——**没有政府准备好应对这种组合**
- **顶尖专家产出倍增 + 入门级工作自动化**：Claude 把"会写代码的实习生"工作量压到 0，但同时让"高级架构师"产出翻 10 倍
- **Anthropic 是行业先行者**：作为前沿 AI 实验室，Anthropic 的人才策略是**全行业的预演**——Codex 4M+ 周活、Claude Code 持续增长都是同方向信号
- **教育/就业市场连锁反应**：大学 CS 入门课程、企业初级岗位、初级外包都将面临"AI 替代潮"

#### 三句话总结
1. Anthropic 停招初级工程师并发出"增长+失业"双重警告——是 AI 经济悖论的最直接行业信号
2. AI 让"专家产出倍增+入门工作自动化"两端同时拉满，但**没有任何政府准备好应对这种组合**
3. 对 CODM 宣发团队：团队结构需从"金字塔（多初级）"向"橄榄球（多资深+多 AI）"转型；初级设计师/插画师/视频剪辑岗位可考虑内部 AI 转岗

---

### #8 ⭐ 微博 weibo-cli 正式上线：70+ API + MCP 协议，国内首个 Agent 原生 CLI

> **来源**：[IT之家](https://tech.sina.cn/2026-06-26/detail-inietsps5205508.d.html) / [微博开放平台](https://open.weibo.com) | **评分**：8.3/10 | **标签**：`#MCP` `#Agent工具` `#社交平台`

#### 核心事件
微博开放平台于 6 月 22 日正式上线官方命令行工具 **weibo-cli**——**国内主流社交平台首个面向开发者的官方 CLI 工具**，专为开发者和 AI Agent 设计。封装 70+ API 接口，覆盖内容发布、互动管理、内容检索、趋势分析、粉丝画像、营销自动化六大场景。

#### 技术亮点 / 影响分析
- **MCP 协议原生支持**：对 AI Agent 原生适配，**即插即用**，微博账号可直接被 Claude/Codex 等 Agent 工具操控
- **4 种输出格式**：JSON、YAML、Table、Raw，便于命令行管道化（`weibo-cli ... | jq ... | agent ...`）
- **5 档订阅 29-899 元/月**：Free 5次/小时；基础 29元（3000 Credits）；Plus 69元（7500）；专业 299元（32000）；Ultra 899元（100000）
- **OAuth + 设备码双认证**：支持 SSH、Docker 等无图形环境，**AI Agent 可在远程服务器完全无人值守运行**

#### 三句话总结
1. 微博 weibo-cli 是国内首个官方社交平台 CLI 工具，70+ API + MCP 协议让微博账号可被 AI Agent 端到端操控
2. 5 档订阅（29-899 元/月）+ Free 试用降低了 Agent 工作流的集成门槛，**宣发团队可立即自动化社区运营**
3. 对 CODM 宣发团队：可把社区运营（玩家互动、热搜监控、活动抽奖、舆情报警）编排为 Agent 工作流，每周节省 10+ 小时人工

---

## 编辑点评

今天是周日但 AI 行业 24h 内新闻密度依然充足——**DeepSeek DSpark 与 OpenAI Jalapeño 是今日最重磅的双子星**：一边是中国阵营以"开源+算法加速"路线继续打性价比牌，单用户生成速度 60-85% 提升 + 500 亿融资后首开源动作，**梁文锋再次亲自署名**；另一边是美国阵营以"软硬全栈自研"路线打成本牌，9 个月流片 + 50% 成本降低 + 吉瓦级部署，**OpenAI 终于开始自己造芯片**。两条路线分别从"算法"和"硬件"两个维度推进"AI 通胀"降温。

地缘政治层面，**Anthropic 指控阿里 Qwen 28.8M 次蒸馏攻击**让"中国 AI 复制美国前沿能力"叙事再次升级——是出口管制前兆还是商业博弈筹码，下周国会听证值得跟踪。

工具层面，**Mistral OCR 4、Karpathy Claude.md 军规、OpenMontage 三件套**值得关注：Mistral 把欧洲 AI 切入文档垂直赛道，Karpathy 把 Anthropic 内部 Agent 工作流模板化，OpenMontage 把 Agent 视频赛道正式开闸。**微博 weibo-cli + MCP 协议**则让国内社媒运营第一次有了"Agent 原生"入口。

**对 CODM 宣发的启发**：本周重点关注"Agent 化"——AI 编程让 Anthropic 停招初级工程师、AI 视频让 OpenMontage 拿下 GitHub 周榜、社交运营让 weibo-cli 接入 MCP。**团队结构与工作流需向"高级直觉 × AI Agent 编排"方向重构**，把基础执行交给 Agent，把创造力和策略判断留给资深设计师。
