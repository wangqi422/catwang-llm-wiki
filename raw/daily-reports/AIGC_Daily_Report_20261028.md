# AIGC 每日速报 · 2026.10.28

> 今天的 8 条新闻，主线是**世界模型从 demo 走向产品**。Google DeepMind 发布 **Genie 4**，一句话生成可交互虚拟世界并同步原生音频，支持实时提示词编辑，皮查伊称其为「迄今最逼真、最具互动性」的世界模型，Ethan Mollick 现场用它跑了 DOOM 演示，Logan Kilpatrick 预告即将登陆 API。国产侧两条线并行：**蚂蚁百灵**发布灵光 2.0 并开源 **Ling-3.1-flash-base** 与 **Ling-3.1-flash-1019**（评测提升至 44 分），卡兹克实测灵光 2.0 接入 15 个国民级 App 打造个人 Personal Agent；**面壁智能**开源 **MiniCPM-OCR 1.0**，**百度**开源 **Unlimited OCR 2**（SR-SWA 让超长文档解析注意力开销不随页数上涨），OCR 赛道同日双开源。微软 **MAI Image 2.7 Preview** 图像编辑模型登上 Arena 第 3 和 Artificial Analysis 第 2，Mustafa Suleyman 宣布 MAI-Image 升至全球图像编辑模型第二。算力侧 **NVIDIA 与 Oracle** 将 OCI Superclusters 扩展至**多吉瓦规模**并上线 **Vera Rubin NVL72** 与 Vera CPU。Anthropic 收购一人公司 **Mithril Medicine**，创始人用 Claude 推进肌肉萎缩症疗法，Yuchen Jin 称这是「真正的单人十亿美元公司范式」。Liquid AI 发布 **LFM3 系列**：一个 1.7B 底座衍生六个 2B 级多模态开源权重模型。Cursor 推出 **design mode Annotate** 标注功能并开始将 Bot 纳入团队。

>
> **副标题（lead）**：世界模型从 demo 到产品 —— Google Genie 4 一句话生成可交互世界、蚂蚁百灵灵光 2.0 接入 15 个国民 App、微软 MAI Image 2.7 登榜、NVIDIA × Oracle 多吉瓦 Superclusters

## 今日概览

| # | 新闻标题 | 来源 | 主题标签 | 重要性 |
|---|---------|------|---------|--------|
| 1 | Google DeepMind 发布 Genie 4 世界模型：一句话生成可交互虚拟世界并同步原生音频 | Google DeepMind / The Verge / Ars Technica / IT之家 | 世界模型·实时交互·原生音频·Genie 4 | P0 |
| 2 | 蚂蚁百灵发布灵光 2.0 并开源 Ling-3.1-flash-base 与 Ling-3.1-flash-1019 | 蚂蚁百灵 / Artificial Analysis / 卡兹克 | 国产模型·开源·Personal Agent·灵光 2.0 | P0 |
| 3 | 微软发布 MAI Image 2.7 Preview：图像编辑登 Arena 第 3、Artificial Analysis 第 2 | Microsoft AI / Testing Catalog / Mustafa Suleyman | 图像编辑·MAI Image·Arena·基准排名 | P0 |
| 4 | NVIDIA 与 Oracle 将 OCI Superclusters 扩展至多吉瓦规模并上线 Vera Rubin NVL72 | NVIDIA Newsroom / Rohan Paul | 算力基建·Vera Rubin·Superclusters·多吉瓦 | P0 |
| 5 | Anthropic 收购一人公司 Mithril Medicine：创始人用 Claude 推进肌肉萎缩症疗法 | Anthropic / Yuchen Jin / Oran Ge | AI 制药·一人公司·Mithril·药物研发 | P0 |
| 6 | Liquid AI 发布 LFM3 系列：一个 1.7B 底座衍生六个 2B 级多模态开源模型 | Liquid AI / Hugging Face / Rohan Paul | 开源权重·多模态·LFM3·小模型 | P0 |
| 7 | 面壁开源 MiniCPM-OCR 1.0 + 百度开源 Unlimited OCR 2：OCR 赛道同日双开源 | 面壁智能 / 邵猛 / 百度 | OCR·文档解析·开源·SR-SWA | P1 |
| 8 | Cursor design mode 新增 Annotate 标注功能并开始将 Bot 纳入团队 | Cursor / Michael Truell / Testing Catalog | AI 编码·design mode·Annotate·Bot 团队 | P1 |

---

## §1 模型 & Agent

### #1 ⭐ Google DeepMind 发布 Genie 4 世界模型：一句话生成可交互虚拟世界并同步原生音频

> **来源**：[Google DeepMind 博客](https://deepmind.google) / [The Verge](https://www.theverge.com) / [Ars Technica](https://arstechnica.com) / [IT之家](https://www.ithome.com) / [Ethan Mollick X](https://x.com/emollick) | **评分**：9.3/10 | **标签**：世界模型·实时交互·原生音频·Genie 4

#### 核心事件
Google DeepMind 发布交互式世界模型 **Genie 4** 研究预览版，支持**一句话生成可交互虚拟世界**并**同步原生音频**，用户可实时操控环境并即时编辑提示词。CEO Sundar Pichai 称其为「迄今最逼真、最具互动性」的世界模型；Demis Hassabis 亲自转发。Ethan Mollick 现场用它跑了 **DOOM 演示**，实时生成游戏环境体验流畅。Logan Kilpatrick 预告 **Genie 4 即将登陆 API**。The Verge 报道称可生成「更长更真实的交互体验」，Ars Technica 评价「人物更真实、物理模拟更精确」。

#### 技术亮点 / 影响分析
- **「原生音频 + 实时编辑」是 Genie 4 相比前代最大的跃迁**：Genie 3 只能生成无声世界，Genie 4 把音频当作世界模型的一等公民——脚步声、环境音、物体碰撞全部同步生成，**意味着世界模型第一次逼近「完整感官体验」而非「可视化沙盒」**
- **实时提示词编辑打破「生成即固定」**：用户可以在体验过程中即时修改描述（如「把白天改成夜晚」「加一场雨」），世界实时响应。**这把世界模型从「生成一段视频」变成了「持续运行的可编程环境」**
- **DOOM 演示的象征意义大于技术意义**：世界模型跑经典游戏不是新鲜事（GameNGen 已做过），但 Genie 4 的流畅度和交互性让 Ethan Mollick 主动转发，**说明这条路线已经从论文 demo 走向可公开体验的产品形态**
- **即将登陆 API 是最关键的信号**：Genie 3 发布时无 API 计划，Genie 4 明确预告 API，**意味着开发者很快就能把「一句话生成可交互世界」嵌入自己的产品**
- **对宣发的启示**：世界模型 + 原生音频 = **可交互的品牌场景体验**。未来品牌 KV 不再只是静态图或视频，而是一个用户可以走进去、改天气、换时间的实时场景

#### 三句话总结
1. Google DeepMind 发布 Genie 4 世界模型研究预览版，一句话生成可交互虚拟世界并同步原生音频，支持实时提示词编辑，皮查伊称其为迄今最逼真最具互动性的世界模型
2. Ethan Mollick 现场用 Genie 4 跑 DOOM 演示，Logan Kilpatrick 预告即将登陆 API，The Verge 评价可生成更长更真实的交互体验
3. 对 CODM 宣发团队：**世界模型 + 原生音频让品牌场景从「看」变成「走进去」**。可关注 Genie 4 API 开放后的早期接入机会，优先在概念预告片或互动 H5 中试点「一句话生成战场环境」的体验

---

### #2 蚂蚁百灵发布灵光 2.0 并开源 Ling-3.1-flash-base 与 Ling-3.1-flash-1019

> **来源**：[蚂蚁百灵公众号](https://mp.weixin.qq.com) / [Artificial Analysis](https://artificialanalysis.ai) / [数字生命卡兹克](https://mp.weixin.qq.com) / [AntLingAGI X](https://x.com/AntLingAGI) | **评分**：8.9/10 | **标签**：国产模型·开源·Personal Agent·灵光 2.0

#### 核心事件
蚂蚁百灵发布**灵光 2.0**，同步开源 **Ling-3.1-flash-base** 与 **Ling-3.1-flash-1019** 两个模型权重。Artificial Analysis 评测显示 **Ling 3.1 Flash 1019 提升至 44 分**。卡兹克实测灵光 2.0 **接入 15 个国民级 App**（米家、钉钉、支付宝等）打造个人 Personal Agent，展示「国产 personal agent 整合米家钉钉支付宝等应用」的实际体验。

#### 技术亮点 / 影响分析
- **「开源权重 + Personal Agent 产品」双线并行是蚂蚁的差异化打法**：大多数国产厂商要么只开源模型（DeepSeek 路线）要么只做产品（豆包路线），蚂蚁同时推进。**开源建生态、产品做体验，两条腿走路**
- **Ling 3.1 Flash 1019 的 44 分是什么水平**：Artificial Analysis 的 Intelligence Index 中，44 分已超过多数 7B 级开源模型，**在 flash 级（轻量快速）定位中属于第一梯队**
- **接入 15 个国民级 App 是灵光 2.0 最有传播力的点**：不是「能调 API」而是「已经接好了你每天在用的 App」，**从模型能力到用户可感知的价值之间，蚂蚁把最后一公里走通了**
- **Personal Agent 赛道正在升温**：本周 Sentient OS（YC F26）发布端侧 AI 读取个人数据生成 markdown，加上灵光 2.0 接入国民 App，**「个人智能体管你数字生活」从概念变成产品**

#### 三句话总结
1. 蚂蚁百灵发布灵光 2.0 并开源 Ling-3.1-flash-base 与 Ling-3.1-flash-1019，Artificial Analysis 评测提升至 44 分
2. 卡兹克实测灵光 2.0 接入米家、钉钉、支付宝等 15 个国民级 App 打造个人 Personal Agent，展示国产 personal agent 的实际体验
3. 对 CODM 宣发团队：**「模型开源 + 产品接入国民 App」的打法值得借鉴**——技术能力要落到用户可感知的场景。可关注灵光 2.0 的 Agent 编排能力是否可用于内部工具链整合

---

### #3 微软发布 MAI Image 2.7 Preview：图像编辑登 Arena 第 3、Artificial Analysis 第 2

> **来源**：[Microsoft AI 官方博客](https://microsoft.ai) / [Testing Catalog](https://www.testingcatalog.com) / [Mustafa Suleyman X](https://x.com/mustafasuleyman) / [Arena](https://arena.ai) | **评分**：8.7/10 | **标签**：图像编辑·MAI Image·Arena·基准排名

#### 核心事件
微软 AI 发布 **MAI Image 2.7 Preview** 图像编辑模型，登上 **Arena 图像编辑榜第 3** 和 **Artificial Analysis AA-Image-Editing v2.1 第 2**。Mustafa Suleyman 宣布 **MAI-Image 升至全球图像编辑模型第二**。Testing Catalog 报道模型已上线 MDASH 平台。

#### 技术亮点 / 影响分析
- **微软在图像编辑赛道的排名爬升速度惊人**：从 MAI-Image-Flash 到 2.7 Preview，**一年内从「没进榜」到「AA 第 2」**，说明微软自研图像模型已经跨过从「能用」到「能用且好用」的门槛
- **「Preview」标签说明还有上升空间**：2.7 是 preview 版本而非 GA，**正式版大概率还会在指令遵循、细节一致性上继续优化**
- **图像编辑 vs 图像生成的赛道分化**：Arena 和 AA 都在单独做「编辑」榜，**说明行业已经把「改图」（inpainting / style transfer / object replacement）从「生成」中独立出来当作一个能力维度评测**
- **对宣发的启示**：MAI Image 2.7 登榜意味着**微软生态内的图像编辑能力已可用**。如果团队已用 Azure / Copilot，可以直接在现有工作流里试 MAI Image 2.7 的编辑能力，无需额外接入第三方工具

#### 三句话总结
1. 微软发布 MAI Image 2.7 Preview 图像编辑模型，登 Arena 图像编辑榜第 3、Artificial Analysis AA-Image-Editing v2.1 第 2
2. Mustafa Suleyman 宣布 MAI-Image 升至全球图像编辑模型第二，Testing Catalog 报道已上线 MDASH
3. 对 CODM 宣发团队：**图像编辑能力正在被单独评测和排名，说明「改图」已是独立能力维度**。可关注 MAI Image 2.7 在军事题材素材（武器替换、场景改天气/时间）上的实际表现

---

## §2 行业 & 基础设施

### #4 NVIDIA 与 Oracle 将 OCI Superclusters 扩展至多吉瓦规模并上线 Vera Rubin NVL72

> **来源**：[NVIDIA Newsroom](https://nvidianews.nvidia.com) / [Rohan Paul X](https://x.com/rohanpaul) | **评分**：8.6/10 | **标签**：算力基建·Vera Rubin·Superclusters·多吉瓦

#### 核心事件
NVIDIA 与 Oracle 宣布将 **OCI Superclusters 扩展至多吉瓦规模**，并上线 **Vera Rubin NVL72** 与 **Vera CPU**。这是继上周 Meta 950 亿募资、SpaceX Apollo 400 亿 GPU 租赁之后，AI 算力基建的又一重磅动作。

#### 技术亮点 / 影响分析
- **「多吉瓦」是算力规模的新计量单位**：过去说「多少块 GPU」，现在说「多少吉瓦电力」，**说明 AI 算力竞争已经从芯片数量竞争升级为能源规模竞争**
- **Vera Rubin NVL72 上线意味着下一代架构开始交付**：Blackwell 还在放量，Vera Rubin 已经进 Supercluster，**NVIDIA 在用代际交替保持对 AMD / 自研芯片的领先窗口**
- **Oracle 从「数据库公司」变成「AI 算力供应商」**：OCI 在 AI 算力赛道的存在感越来越强，**上周 OpenAI 也被曝将使用谷歌云 TPU，云厂商格局正在被 AI 算力需求重写**

#### 三句话总结
1. NVIDIA 与 Oracle 宣布将 OCI Superclusters 扩展至多吉瓦规模，上线 Vera Rubin NVL72 与 Vera CPU
2. 这是本周继 Meta 950 亿、SpaceX Apollo 400 亿之后第三笔百亿级 AI 算力基建动作
3. 对 CODM 宣发团队：**算力基建的规模扩张最终会传导为模型成本下降**——今天的多吉瓦 Supercluster 是未来更便宜 API 的供给侧基础。持续关注而非直接行动

---

### #5 Anthropic 收购一人公司 Mithril Medicine：创始人用 Claude 推进肌肉萎缩症疗法

> **来源**：[Anthropic 官方](https://www.anthropic.com) / [Yuchen Jin X](https://x.com/YuchenJin) / [Oran Ge X](https://x.com/oran_ge) | **评分**：8.4/10 | **标签**：AI 制药·一人公司·Mithril·药物研发

#### 核心事件
Anthropic 收购一人公司 **Mithril Medicine**，创始人**用 Claude 推进肌肉萎缩症疗法**研究。Yuchen Jin 评价这是「**真正的单人十亿美元公司范式**」。Anthropic 同时分享 Claude 支持药物研发的早期成果，已用于 **6 家药企的真实药物研发项目**。

#### 技术亮点 / 影响分析
- **「一人公司被收购」是 AI 时代组织形态的标志性事件**：一个人 + Claude 做出被大厂收购的成果，**说明 AI 让「个人产出」与「组织产出」的差距急剧缩小**
- **Anthropic 收购 Mithril 的战略意图**：不是买技术（一人公司技术有限），而是**买「Claude 在药物研发中的实战验证案例」**——这是 Anthropic 向投资者证明 Claude 在垂直领域价值的最有力叙事
- **6 家药企真实项目是比收购本身更重要的信号**：AI for Drug Discovery 从论文走向真实管线，**意味着模型能力已经跨过「能辅助」到「被信任用于真实决策」的门槛**

#### 三句话总结
1. Anthropic 收购一人公司 Mithril Medicine，创始人用 Claude 推进肌肉萎缩症疗法，Yuchen Jin 称其为「真正的单人十亿美元公司范式」
2. Anthropic 同步分享 Claude 已用于 6 家药企的真实药物研发项目，AI for Drug Discovery 从论文走向真实管线
3. 对 CODM 宣发团队：**「一人 + AI = 被收购的公司」是组织效率的极致案例**。可思考团队内部哪些环节可以由「一个人 + AI」完成，减少协调成本

---

### #6 Liquid AI 发布 LFM3 系列：一个 1.7B 底座衍生六个 2B 级多模态开源模型

> **来源**：[Liquid AI X](https://x.com/LiquidAI_) / [Hugging Face](https://huggingface.co) / [Rohan Paul X](https://x.com/rohanpaul) | **评分**：8.3/10 | **标签**：开源权重·多模态·LFM3·小模型

#### 核心事件
Liquid AI 发布 **LFM3 系列**开源权重模型：以 **1.7B 文本底座**衍生出**六个 2B 级多模态模型**，1.7B 文本模型**超越前代 2.6B**。全部开源权重，覆盖文本、视觉、音频等多模态任务。

#### 技术亮点 / 影响分析
- **「一个底座衍生六个模型」是高效的模型家族设计**：不是训练六个独立模型，而是**共享 1.7B 底座 + 各自的模态适配层**，训练成本和推理成本都大幅降低
- **1.7B 超越前代 2.6B 说明小模型效率仍在快速提升**：参数更少、能力更强，**端侧部署的经济性持续改善**
- **LFM3 的定位是「设备端 + 嵌入式」**：2B 级模型可以在手机、IoT、车载等场景本地运行，**与 NVIDIA Nemotron Bolt E4B（上周报道）形成端侧小模型赛道的竞争格局**

#### 三句话总结
1. Liquid AI 发布 LFM3 系列开源权重模型，1.7B 文本底座衍生六个 2B 级多模态模型，1.7B 超越前代 2.6B
2. 全部开源权重，覆盖文本、视觉、音频等多模态任务，定位设备端与嵌入式场景
3. 对 CODM 宣发团队：**端侧小模型能力持续提升意味着「离线 AI 工具」越来越可行**——出差、保密环境、无网场景下的素材处理可以不依赖云端

---

## §3 趋势 & 工具

### #7 面壁开源 MiniCPM-OCR 1.0 + 百度开源 Unlimited OCR 2：OCR 赛道同日双开源

> **来源**：[面壁智能 OpenBMB X](https://x.com/OpenBMB) / [邵猛 X](https://x.com/shao__meng) / [百度](https://cloud.baidu.com) | **评分**：8.2/10 | **标签**：OCR·文档解析·开源·SR-SWA

#### 核心事件
**面壁智能**开源 **MiniCPM-OCR 1.0** 及校验模型 **MiniCPM-OCR Jev**；**百度**开源 **Unlimited OCR 2**，核心创新 **SR-SWA**（Sparse Region-Selective Window Attention）让超长文档解析的注意力开销**尽量不随页数上涨**，支持几十到几百页文档解析。同日两条 OCR 开源发布，赛道竞争白热化。

#### 技术亮点 / 影响分析
- **SR-SWA 解决的是「长文档 OCR 的注意力爆炸」问题**：传统 ViT 处理 100 页文档时注意力矩阵是 O(n²) 增长，SR-SWA 通过稀疏区域选择让开销接近线性，**这是「能处理整本书」而非「能处理一页」的技术基础**
- **同日双开源说明 OCR 是被低估的热赛道**：Agent 时代文档解析是前置能力（读 PDF、读合同、读财报），**OCR 精度直接决定下游 Agent 的信息质量**
- **面壁 + 百度同日发布是国产 OCR 生态的集体信号**：不是巧合，而是**Agent 应用爆发带来的文档解析需求倒逼模型层供给**

#### 三句话总结
1. 面壁智能开源 MiniCPM-OCR 1.0 与校验模型 MiniCPM-OCR Jev，百度开源 Unlimited OCR 2（SR-SWA 让超长文档解析注意力开销不随页数上涨）
2. 同日双开源反映 Agent 时代文档解析需求爆发，OCR 从「辅助能力」升级为「Agent 前置基础设施」
3. 对 CODM 宣发团队：**OCR 精度提升直接利好「竞品截图文字提取」「历史素材归档检索」「合同/排期文档自动解析」**。可关注百度 Unlimited OCR 2 在多页设计文档上的表现

---

### #8 Cursor design mode 新增 Annotate 标注功能并开始将 Bot 纳入团队

> **来源**：[Cursor 官方 X](https://x.com/cursor_ai) / [Michael Truell X](https://x.com/mtruell) / [Testing Catalog](https://www.testingcatalog.com) | **评分**：8.0/10 | **标签**：AI 编码·design mode·Annotate·Bot 团队

#### 核心事件
Cursor 发布 **design mode Annotate** 功能，支持在设计模式中直接添加标注；同时 CEO Michael Truell 宣布 Cursor **开始将 Bot 纳入团队**管理。Grok Bot 也分享了销售团队共享机器人的用法。

#### 技术亮点 / 影响分析
- **「Annotate」补齐了 design mode 的协作闭环**：过去 design mode 只能看不能标，现在可以像 Figma 一样在界面上加注释，**让「设计 → 开发」的沟通成本进一步降低**
- **「Bot 纳入团队」是 Cursor 从工具走向平台的信号**：不只是「你用 Cursor 写代码」，而是「Cursor 里的 Bot 是你的团队成员」，**AI 编码工具正在从 IDE 变成协作平台**
- **与本周微软 Agent 365 的方向一致**：巨头和独角兽都在把 AI 从「辅助工具」重新定义为「团队成员」，**组织形态正在被重新设计**

#### 三句话总结
1. Cursor design mode 新增 Annotate 标注功能，支持在设计模式中直接添加注释
2. CEO Michael Truell 宣布 Cursor 开始将 Bot 纳入团队管理，从 IDE 工具向协作平台演进
3. 对 CODM 宣发团队：**「Bot 纳入团队」的思路可迁移到非编码场景**——设计团队也可以有「素材整理 Bot」「版本对比 Bot」作为团队成员而非工具
