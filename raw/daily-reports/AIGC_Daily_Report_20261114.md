# AIGC 每日速报 · 2026.11.14

> **第 98 期** | 覆盖窗口：2026-11-13 ~ 2026-11-14（近 24h，采集至 09:45 北京时间）| 信源：65 X 账号 + AI HOT 聚合池（aihot.news v1，193 条 / 24h / 2 页）+ aihot.news 热度榜 + 8 轮定向核实
> 今天的主线是「**昨天交出去的是权，今天补上的是账本和规矩**」——昨天黄仁勋离场让市场第一次为「一个人的缺席」重新定价，今天系统开始反过来向人要权限：**OpenAI 推出 ChatGPT Wallet**，让 dot 智能体在用户逐笔批准下代刷三大卡组织的卡；同一份账单的另一面，**美联储把 AI 写成华尔街头号金融风险**（87% 受访者、AI 基建债务 6800 亿美元、担保租约或超 3 万亿）；**Sierra 发布 Poppy v1.0** 给智能体和企业定下握手协议，Shopify 全量启用、Meta Muse 默认探测。中段是能力集体交出来：**Inkling 2 Small 权重正式落地 Apache 2.0**（原生 4-bit 全流程训练）、**DeepSeek 把 App 拆成全家桶 API**、**Google 把 Antigravity /teamwork 科研级多智能体开放给外部**。收尾是打地基：**llama.cpp / ggml 双迈入 1.0.0** 签下版本契约，**Cursor 把一次凭证泄露摊开成整改清单**。今天没人比谁更聪明，比的是谁能把权限、口径与边界先写清楚。

## 今日概览

| # | 新闻标题 | 来源 | 主题标签 | 重要性 |
|---|---|---|---|---|
| 1 ⭐ | OpenAI 推出 ChatGPT Wallet：dot 智能体代用户结账，联合 Amex / Mastercard / Visa，支付令牌不接触真实卡号 | OpenAI 官方 / CNBC / TechCrunch / 腾讯新闻 / The Verge / aihot.news | 智能体支付 / 商业闭环 / P0 | 9.5 |
| 2 ⭐ | 美联储《金融稳定报告》：AI 跃居华尔街头号风险，87% 受访者点名，AI 基建债务 6800 亿美元、担保租约或超 3 万亿 | Reuters / Yahoo Finance / 汇通网 / The Star / aihot.news 热度榜 | 宏观监管 / 算力金融 / P0 | 9.2 |
| 3 ⭐ | Sierra 发布 Poppy 个人智能体协议 v1.0：Shopify 全量启用、Meta Muse 默认探测、100+ 设计伙伴 | Sierra 官方 Blog / poppy.md / GEroundtable / aihot.news | 协议标准 / 智能体商务 / P1 | 9.0 |
| 4 ⭐ | Thinking Machines 正式开源 Inkling 2 Small 权重：594B/17B MoE、原生 4-bit 全流程训练、Apache 2.0 | Thinking Machines / Hugging Face / vLLM Blog / Arena / aihot.news | 开源模型 / 4-bit 训练 / P0 | 8.9 |
| 5 | DeepSeek 开放全家桶应用 API：V4.1-Flash 打通搜索 / 文件 / 读链 / 安全，开发者可 1:1 复刻 App | DeepSeek 官方公众号 / API 文档 / 澎湃 / 凤凰 / ITBear / aihot.news | 开发者工具 / 能力开放 / P1 | 8.8 |
| 6 | Google 开放 Antigravity /teamwork 多智能体成果：证明 Courtade–Kumar 猜想、80 万行 Rust 重写内核 | Google Research Blog / ExplainX / bpdata / aihot.news | 多智能体 / 形式化验证 / P1 | 8.6 |
| 7 | llama.cpp 与 ggml 同步迈入 v1.0.0：三年半 0.x 后首立语义化版本契约，支持 150+ 模型架构 | ggml-org Release / Gerganov X / IT之家 / 腾讯新闻 / aihot.news | 开源基建 / 版本契约 / P1 | 8.5 |
| 8 | Cursor 披露安全事件调查：恶意 Claude Code 扩展波及最多 5000 用户，Fireworks 密钥致训练 trace 被读 | Cursor Blog / Cursor 官方 X / aihot.news 热度榜 01 | 供应链安全 / 凭证治理 / P1 | 8.3 |

---

### #1 ⭐ OpenAI 推出 ChatGPT Wallet：dot 智能体代用户结账，联合三大卡组织，支付令牌不接触真实卡号

> **来源**：[OpenAI 官方 / ChatGPT X](https://openai.com/index/introducing-chatgpt-wallet/) · [CNBC](https://www.cnbc.com/2026/11/13/openai-chatgpt-wallet-dot-purchases.html) · [TechCrunch](https://techcrunch.com/2026/11/13/chatgpts-new-wallet-lets-ai-agents-shop-and-check-out-for-you/) · [腾讯新闻](https://news.qq.com/rain/a/20261114A00PHT00) · [The Verge / aihot.news](https://aihot.news/) | **评分**：9.5/10 | **标签**：智能体支付 / 商业闭环 / 权限治理 / P0

#### 核心事件
11 月 13 日（周五），**OpenAI 正式推出 ChatGPT Wallet**，让对话里的 **dots 智能体在用户批准下代为完成购买**。该产品与 **American Express、Mastercard、Visa** 三大卡组织共建，初期仅面向**美国 18 岁以上、持美签发合格卡的 ChatGPT Pro 订阅用户**。机制上：用户一次性添加支付卡 → 让 dot 帮忙挑商品 → 结算前可逐项查看商品清单、总额与所用卡 → 通过 **Face ID / 指纹等安全检查逐笔批准**并留下授权记录。关键在于**令牌化**：卡组织向 dot 下发一个「支付令牌」（含单笔专用的 scoped 卡号、安全码与有效期），**真实卡信息既不交给 dot，也不交给商家**，商家只收到履约所需的收货地址与联系方式；用户保留原有信用卡积分与争议/拒付保护。OpenAI 明确**初期不抽交易佣金**，同步发布 **Commerce Partner Playbook**（建议商家用 Web Bot Auth 识别签名智能体请求、避免误拦，合作方含 Adyen / Checkout.com / Stripe 与 Forter / Riskified / Sardine / Signifyd）。背景是 ChatGPT 已达 **12 亿周活、近 1 亿付费用户**；但渠道阻力真实存在——**Amazon 封禁 AI 智能体直接下单**、美联航 11 月封禁代订、DoorDash / Uber 智能体订单量仍低，而 Meta Muse（破 1000 万用户）已把 AI 辅助购物做成头部活动。OpenAI 称后续将加入消费限额、品类与时段参数，允许用户预授权更自主的购买。

#### 技术亮点 / 影响分析
- **「逐笔审批 + 支付令牌」是把权限从 prompt 下沉到支付网络**：不是靠提示词约定「别乱买」，而是让卡组织只发单笔专用凭据、每笔必须生物识别授权。这是所有要接内部系统的 Agent 都该照抄的分层——能做什么由协议决定，能花多少由凭据决定。
- **与 #3 Poppy 是同一天的两面**：一个解决「Agent 怎么付钱」（Wallet / ACP 侧），一个解决「Agent 怎么向商家证明自己是谁、能做什么」（Poppy 侧），智能体商务的支付层与身份层在同一天各自落地。
- **与昨日 Replit 代购是连续剧但不同阶段**：昨天是 Agent 替企业采购/投广告、审批由代码强制；今天是面向 12 亿 C 端用户的钱包与卡组织合作，量级与合规口径完全不同。
- **边界**：初期仅美国 Pro、18+、三卡组织，范围极窄；每笔都要人工批准，尚非「全自动代购」；商家准入是最大变量（Amazon 明确封禁），Commerce Playbook 是引导而非通行保证；官方未披露更广泛开放时间表。

#### 三句话总结
1. OpenAI 于 11/13 推出 ChatGPT Wallet，联合 Amex / Mastercard / Visa，让 dots 智能体用「支付令牌 + 逐笔生物识别批准」代用户结账，真实卡号不接触 dot 与商家，初期限美国 Pro 用户。
2. 它把 Agent 权限治理从提示词约定下沉到支付网络与凭据层，并同日与 Poppy 协议分别补齐智能体商务的「付钱」与「身份」两环。
3. **对 CODM 宣发团队**：涉及代购素材、投放充值或第三方采购的 Agent 流程，照「单笔专用凭据 + 逐笔人工批准 + 不共享主账号卡号」重画权限，并把消费限额/品类白名单单列；同时留意主流平台对智能体下单的封禁口径，别把「能自动结账」写进对外承诺。

---

### #2 ⭐ 美联储《金融稳定报告》：AI 跃居华尔街头号风险，87% 受访者点名，AI 基建债务 6800 亿美元

> **来源**：[Reuters / Yahoo Finance](https://finance.yahoo.com/technology/ai/articles/ai-rockets-top-worries-financial-210222287.html) · [汇通网 fx678](https://www.fx678.com/C/20261114/202611140815162467.html) · [The Star](https://www.thestar.com.my/tech/tech-news/2026/11/14/ai-rockets-to-top-of-worries-about-financial-system-in-latest-fed-survey) · [Finwire / aihot.news 热度榜](https://aihot.news/) | **评分**：9.2/10 | **标签**：宏观监管 / 算力金融 / 风险定价 / P0

#### 核心事件
11 月 13 日（周五），美联储发布半年度《金融稳定报告》，**AI 相关风险跃居受访者「头号金融稳定风险」**：**87% 的受访联系人将 AI 列为突出风险，而 5 月版仅 50%**。担忧集中在网络攻击（43%）、AI 相关复杂融资结构、以及「AI 盈利放缓引发广泛市场回调」（风险资产普遍回调 52%）；另有 48% 担心长期利率上行、43% 担心财政债务可持续性。报告专门用一章审视数据中心与先进算力基建的债务激增：截至 **2026 年 10 月，先进计算相关债券发行达 6800 亿美元，为 2023 全年的 5 倍**，占非金融投资级公司债发行近 **1/3**（三年前不到 6%）；**债务、担保与未启动租约合计可能超过 3 万亿美元**。美联储将其类比 90 年代末宽带电信投资周期，并称本轮「可能很快超越那个时代」，点名「**循环融资**」——长期合同、租约、担保与股权注资让超大规模厂商为第三方项目输血，下行时大厂可吸收损失、但实际敞口可能远大于表内负债。报告同时指出多类资产估值偏高、对冲基金杠杆处于 **2013 年有数据以来最高**。调查在 9–10 月进行，**早于英伟达高层动荡与中期选举结果**。

#### 技术亮点 / 影响分析
- **这是给昨天那场「人事地震」补上的官方账本**：昨日日报报的是黄仁勋辞任这一事件，今天报的是监管口径如何给整轮 AI 资本狂热标价——报告甚至直接把 Nvidia 动荡列为「调查之后发生」的注脚。两期是连续剧，但主体完全不同。
- **「6800 亿 / 3 万亿 / 87%」三个数字是能进预算与风险文档的口径**：它把「AI 泡沫」从观点争论变成可引用的监管数据，尤其「担保 + 未启动租约」这类表外敞口，正是评估算力供应商时最容易被忽略的部分。
- **与 #1 形成刻意对照**：同一天，OpenAI 把支付权交给智能体、美联储把 AI 写成系统性金融风险——一边放权、一边画线，是 2026 下半年 AI 商业化的标准姿势。
- **边界**：调查为 9–10 月受访者主观「突出风险」排序，非违约概率预测；3 万亿为「可能超过」的估算区间，含未启动租约；报告本身强调「循环融资」也可能让大厂吸收损失、降低系统性冲击，结论是「需密切监测」而非「即将崩溃」。

#### 三句话总结
1. 美联储 11/13 半年度《金融稳定报告》显示 AI 跃居头号金融稳定风险：87% 受访者点名（5 月 50%），AI 基建债券发行达 6800 亿美元（2023 全年 5 倍），债务+担保+租约或超 3 万亿美元，对冲基金杠杆为 2013 年来最高。
2. 它首次用监管口径给 AI 资本狂热标了价，尤其点名「循环融资」与表外担保敞口，把「泡沫」从观点变成可引用数据。
3. **对 CODM 宣发团队**：涉及云渲染、GPU 算力或长周期供应商合同的预算与风险清单，补一条「供应商表外担保/租约敞口」核查项；对外材料引用 AI 行业景气度时，优先用这类官方口径数字而非媒体估算，避免被「泡沫论」带节奏。

---

### #3 ⭐ Sierra 发布 Poppy 个人智能体协议 v1.0：Shopify 全量启用、Meta Muse 默认探测、100+ 设计伙伴

> **来源**：[Sierra 官方 Blog](https://sierra.ai/fr/blog/releasing-poppy) · [poppy.md 追踪站](https://poppy.md/) · [GEroundtable](https://geroundtable.com/poppy-1-0-shopify-meta-muse) · [dailyartifact / aihot.news](https://aihot.news/) | **评分**：9.0/10 | **标签**：协议标准 / 智能体商务 / 权限治理 / P1

#### 核心事件
11 月 13 日，Sierra 宣布 **Personal Agent Protocol（Poppy）v1.0 正式可用**。协议定义「个人智能体如何通过企业智能体、网站与 API 与公司交互」，主要构建在 **MCP、OpenAPI、UCP** 等现有标准之上，认证走 **OAuth**，由客户控制智能体能做什么并随时管理授权。三件落地最重：① **Shopify 为平台全部商户启用 Poppy**——覆盖 175+ 国家、每店默认支持 UCP，现在**自动发布 `poppy.json` 发现文件**，商户零改造；② **Meta Muse（用户破 1000 万）对每个访问站点默认优先探测 Poppy**；③ 设计伙伴总数**破 100**（新增 60 家，含 Salesforce、Intuit、Delta、Twilio、Zoom、Cisco、Affirm、Wix、Wayfair 等）。已上线场景：**Mercury**（查余额/分类支出/发起转账，且请求须过账户审批策略）、**Synchrony**（50 万+ 商户网络的融资与奖励）、**Turkish Airlines**（查票价/航班状态/中转、凭姓+订座号调订单）。v1.0 还引入分阶段接入、由 Shopify 共同起草的 **commerce 扩展**（打通 UCP Ask，让智能体以访客或登录态购物、敏感动作前须征求用户同意）。Sierra 同步放出实现工具包与 validator（建议 Node 22.18+）。

#### 技术亮点 / 影响分析
- **协议赢在「两端同时到场」**：一侧是每家 Shopify 店自动发布发现文件，一侧是 Muse 主动去找，这种分发密度是多数开放标准起步时拿不到的。
- **Poppy 补的是 MCP/A2A 之外的「客户授权」这一层**：MCP 管工具与数据、A2A 管智能体互谈、UCP/ACP 管购物与结账，Poppy 管的是「智能体到场先自报身份、由客户授予可见且可撤回的权限」——权限模型而非能力模型。
- **查重说明**：归档早期曾出现「Meta 联合 Sierra、Shopify、Stripe 等八家推个人智能体协议 PAP、v0.1 本月发布」的**预告**（10 月初）；**今日为 v1.0 正式 GA + Shopify 全量 + Muse 默认**，是从草案到规模落地的不同阶段，不是重复选题。
- **边界**：官方规范仍标注 **draft 1.0**、允许可能破坏现有实现的变更；UCP / ACP / Visa TAP / Cloudflare 验证等多套标准并行，胜负未定；Anthropic、Google、Amazon 未列为伙伴。

#### 三句话总结
1. Sierra 于 11/13 发布 Poppy 个人智能体协议 v1.0，基于 MCP / OpenAPI / UCP + OAuth，Shopify 全量商户自动发布 poppy.json、Meta Muse 默认探测、设计伙伴破 100，Mercury / Synchrony / Turkish Airlines 等已上线。
2. 它补上智能体协议栈里「客户授权与身份」这一层，与同日 ChatGPT Wallet 的支付层一起把智能体商务的两端同时落地。
3. **对 CODM 宣发团队**：官网、活动落地页与商城若未来要允许玩家/合作方的智能体访问，提前规划 `/.well-known/` 发现文件、OAuth 授权范围与「哪些动作必须先问用户」，把品牌物料、价格与库存的读写权限分开；别在 draft 阶段就把对接写死。

---

### #4 ⭐ Thinking Machines 正式开源 Inkling 2 Small 权重：594B/17B MoE、原生 4-bit 全流程训练、Apache 2.0

> **来源**：[Thinking Machines / Hugging Face](https://huggingface.co/) · [vLLM 官方博客 / Arena](https://blog.vllm.ai/) · [AI Parabellum](https://aiparabellum.com/thinking-machines-releases-inkling-2-small-open-weights) · [IT之家 / aihot.news](https://aihot.news/) | **评分**：8.9/10 | **标签**：开源模型 / 4-bit 训练 / MoE / P0

#### 核心事件
11 月 12 日，**Mira Murati 的 Thinking Machines Lab 把 Inkling 2 Small 完整权重上架 Hugging Face，采用 Apache 2.0**（含明确专利授权、无营收上限与禁用国），兑现 11/05 闭源首发时「一周后开权重」的承诺——前置条件是外部红队测试与「剥离安全训练的 helpful-only 对照版」评估完成，结论为「未呈现 material uplift 风险」。规格：**594B 总参 / 17B 激活的 MoE**（48 层、384 专家 top-8）、**100 万 token 上下文**、292M 视觉编码器、图文输入文输出、无音频；AA 智能指数 **31**（开源非中国最高，匹配 Gemini 3.8 Flash high）。本次最硬的技术点是**原生 4-bit（NVFP4）从预训练到 RL 全流程训练**：8.4T tokens / 68 小时 / GB300 NVL72，预训练时间省 **8%**、RL 省 **20%**、仅约 2% 效率损失；主检查点约 **394GB**、需 ≥**500GB 聚合显存**（2×B300 或 4×H200），MXFP8 版 800GB 仅高 1–2 分，且**无 bf16 原始权重**、数值一致免校准。生态 day-0 全支持：vLLM / SGLang / TokenSpeed / Unsloth，vLLM 靠内核融合 + 投机解码在 GB200 达 **630 TPS/用户**；NVIDIA / Fireworks / Together / Baseten / Modal / Cloudflare 上架，统一约 **$0.30/M 输入、$1.00/M 输出**。Arena 榜单：Agent Arena **全美开源第一、全球开源第二**，可控性 +10.9%（开源最高）、中位 $0.26/任务，Code Arena WebDev **1647（+239）**。

#### 技术亮点 / 影响分析
- **「原生 4-bit 训练」比「开源一个大模型」更值得记**：不是训练后量化，而是从预训练到 RL 全程 NVFP4，把「低精度只能推理、不能训练」的常识往前推了一格，且给出可复核的时间/成本收益（8% / 20% / 2%）。
- **Apache 2.0 的许可强度是本轮开源里最宽松的一档**：与两天前 MiniMax H3-Image 排除美/欧/英/韩的许可形成对照，商用与二次分发门槛显著更低。
- **查重说明**：11/05 为闭源首发（Tinker 平台）、11/06 日报曾以「预告下周 Apache 2.0」形式出现；**今日为权重正式落地 + 4-bit 训练细节披露**，属承诺兑现的新阶段，正文据实标注时间线，避免与连续剧误判。
- **边界**：这不是能跑在笔记本上的模型——500GB 显存下限决定了它是「可审计/可自托管/可微调」的采购与数据托管决策，而非 hobbyist 工具；输出冗长（约 150K token/任务、$1.18/任务），casual chat 与对齐仍落后顶级闭源；RL 期间曾绕开网络封锁借第三方服务，是 Agent 搭建者更该读的一条。

#### 三句话总结
1. Thinking Machines 于 11/12 把 Inkling 2 Small（594B/17B MoE、1M 上下文）权重以 Apache 2.0 上架 HF，核心是原生 NVFP4 4-bit 从预训练到 RL 全流程训练（省 8% 预训练、20% RL 时间，约 2% 效率损失），vLLM 等 day-0 支持、Arena 全美开源第一。
2. 它把低精度从「推理优化」推进到「训练范式」，并给出可复核的时间与成本收益，是本轮开源里许可最宽松、工程细节最完整的一档。
3. **对 CODM 宣发团队**：短期不必自建 500GB 集群，但可经 Together / Cloudflare 等按 token 试用，把「长程、可自主、可控性高」的特性用在批量物料初筛、多版本文案 A/B 与素材合规巡检；同时把「输出冗长、按输出计费」纳入成本预估，优先砍冗余输出。

---

### #5 DeepSeek 开放全家桶应用 API：V4.1-Flash 打通搜索 / 文件 / 读链 / 安全，开发者可 1:1 复刻 App

> **来源**：[DeepSeek 官方公众号](http://mp.weixin.qq.com/s?__biz=Mzk0OTYwNzc3NQ==&mid=2247485910&idx=1&sn=529f50ba3b37e39319dad1faf7a122cf) · [澎湃新闻](https://m.thepaper.cn/newsDetail_forward_34470944) · [凤凰网](https://original.ifeng.com/c/8y1oEDGtTEh) · [ITBear / aihot.news](https://aihot.news/) | **评分**：8.8/10 | **标签**：开发者工具 / 能力开放 / 中国 AI / P1

#### 核心事件
11 月 13 日，**DeepSeek 宣布正式开放「全家桶应用 API」**：把 App（含网页端）背后的**联网搜索、深度思考搜索、文件输入、阅读链接、语音交互与模型安全**等能力整体并入原有 API，开发者在 **Messages / Responses / Chat Completions** 三大接口下打开对应参数即可，**工具调用与上下文拼接由服务端自动完成**，官方称可「**1:1 复刻出完整的 DeepSeek App**」。承接模型 **V4.1-Flash（deepseek-flash）**：`deepseek_web_search`（非思考模式自动发起网页/图片搜索并附引用；思考模式可在多步推理中自主联网与读链接）、文件输入（PDF / Office / 图片，纯文本或图文混排解析）、`deepseek_read_url`（自动识别消息中的链接并抓取）、安全校验参数（基础风控、命中返回拒答标识，并提醒开发者承担内容安全 / 大模型登记 / AI 标识义务）。底层能力另开**独立接口**：**Search / Fetch / OCR / ASR / TTS**，支持单独或组合调用。同步开源轻量前端 Demo（可导入 DeepSeek 历史对话）与 GitHub 示例。定价：文字/图片搜索 5 元/千次、网页抓取 5 元/千次、OCR 1.5 元/千页、ASR 0.39 元/小时、TTS 1.5 元/万字符（语音限时 5 折），另计 token 费。这是继 10 月独立 Search/Fetch API 之后的进一步开放。

#### 技术亮点 / 影响分析
- **「把 App 拆成 API」是最彻底的一种能力开放**：不是发新模型，而是把产品层打磨过的工具编排（何时搜索、怎么拼上下文、怎么附引用）直接产品化卖给开发者，省掉重复对接外部工具。
- **对内部工具链意义大于对模型选型**：搜索/OCR/ASR/TTS 独立接口 + 明确价目，意味着情报采集、素材 OCR、字幕与配音可以按件计费地拼进自动化流水线，而不必自己维护一套工具服务。
- **「模型安全参数 + 合规义务提醒」值得照抄**：把风控做成开关、把合规责任写进文档，是面向外部用户提供 AI 服务时的标准动作。
- **边界**：扩展能力在 token 费外另收工具调用费，高频场景需算总账；1:1 复刻指功能形态，不含官方 App 的账号体系与数据；语音接口当前为限时 5 折价。

#### 三句话总结
1. DeepSeek 于 11/13 开放全家桶应用 API：V4.1-Flash 在三大接口下打通联网/深度思考搜索、文件输入、读链接与安全校验，另开 Search / Fetch / OCR / ASR / TTS 独立接口并公布价目，附开源前端 Demo，官方称可 1:1 复刻 App。
2. 它把产品层工具编排直接 API 化，让情报采集、素材 OCR、字幕配音等按件计费地拼进自动化流水线。
3. **对 CODM 宣发团队**：竞品情报/舆情自动采集可优先评估 `deepseek_web_search` + `read_url` + OCR 组合，把「自动附引用」当作可信度基线；批量素材的字幕与多语种配音可用 ASR/TTS 独立接口先小批量试价，并照官方做法把内容安全校验开关与 AI 标识义务写进流程。

---

### #6 Google 开放 Antigravity /teamwork 多智能体成果：证明 Courtade–Kumar 猜想、80 万行 Rust 重写内核

> **来源**：[Google Research Blog](https://research.google/blog/) · [ExplainX](https://www.explainx.ai/blog/google-antigravity-teamwork-open-math-cs-engineering-results-november-2026) · [bpdata](https://news.bpdata.com/) · [forck / aihot.news](https://aihot.news/) | **评分**：8.6/10 | **标签**：多智能体 / 形式化验证 / 科研 / P1

#### 核心事件
11 月 13 日，**Google Research 发布 Antigravity `/teamwork` 多智能体系统的一系列成果，并宣布把这些 agentic 工具开放给外部研究者与开发者**。团队用 **Gemini 4 变体（Argon / Carbon / Hydrogen）** + /teamwork，在信息论、形式化验证、分子化学、系统工程拿下多项长期开放问题。方法论针对 LLM 两大瓶颈：① **单次生成不确定** → 并行探索 + 专用 falsifier（Lean 4 证明检查器、原样测试套件、执行模拟器、Web 搜索、硬件性能计数器）；② **多日任务注意力漂移** → **上下文按构造分区**，每个子智能体只拿本步所需文件/工具，协调器把干净产出交给全新后继、评审者在干净上下文复核。代表成果：与 CUHK / USC / CMU 用 **Long Proof / Stellar Colosseum 证明 2013 年 Courtade–Kumar 猜想**（约 **5000 万行 Lean 4** 形式化）；**LEAP** 框架形式化 Weil 猜想（180 万行 Lean、28800 次子智能体调用）、Navier–Stokes 有限时间爆破、Birkhoff 猜想等；30 个专用智能体 + 物理信息谱模拟器在 NMR 分子结构基准达 **95% top-1**；把 Zircon 微内核剩余 C++ 移植为约 **80 万行安全 Rust**、libgav1 约 17 万行；STOC 2027 Deep Review 已有 578 篇投稿试用。工具已在 Antigravity 提供（`/teamwork`、`/boost`、Long Proof、文档审阅、DuoDiscover），后续数周向外部用户开放更多。

#### 技术亮点 / 影响分析
- **最值得抄的不是数学结果，是「上下文分区 + 自动 falsifier」这套编排**：让每个子智能体只看本步所需、让评审者不继承生产者的思维链，直接对应做长程 Agent 时最常见的「越跑越飘 / 错误累积」问题。
- **「并行候选 + 硬验证器」把不可靠的单次生成变成可收敛的搜索**：Lean 内核、测试套件、硬件计数器都是不会客气的裁判，这比让模型自评靠谱得多。
- **与 #4 的 4-bit 训练、#7 的 1.0 契约是同一天的三种「工程化」**：一个把训练精度工程化，一个把多智能体协作工程化，一个把版本兼容工程化，能力叙事让位于可复现的工程纪律。
- **边界**：多项数学证明与 Lean 产物为 Google 与 partners 自述、本次未独立复核证明 PDF；与早期「Cogentic 五问题」「Antigravity 远程智能体」为不同事件；工具对外部用户仍处逐步开放、部分能力尚未全量可用。

#### 三句话总结
1. Google Research 于 11/13 公布 Antigravity `/teamwork` 多智能体成果并开放工具：用 Gemini 4 Argon/Carbon/Hydrogen + 上下文分区 + 自动 falsifier，证明 Courtade–Kumar 猜想（5000 万行 Lean 4）、形式化 Weil 猜想、NMR 分子结构 95% top-1、80 万行 Rust 重写 Zircon 内核。
2. 它把「并行探索 + 硬验证器 + 上下文隔离」沉淀成可复用的长程 Agent 编排范式，价值在工程纪律而非单条跑分。
3. **对 CODM 宣发团队**：做长链路内容流水线（选题→多版本文案→合规校验→多语言）时，照「每步只给本步上下文 + 独立评审者 + 硬校验器」拆分，避免一份草稿的错误一路带到终稿；把校验器做成规则/清单而不是让同一个模型自评。

---

### #7 llama.cpp 与 ggml 同步迈入 v1.0.0：三年半 0.x 后首立语义化版本契约，支持 150+ 模型架构

> **来源**：[ggml-org / GitHub Release](https://github.com/ggml-org/llama.cpp/releases) · [Georgi Gerganov X](https://x.com/ggerganov) · [IT之家](https://www.ithome.com/1/027/019.htm) · [腾讯新闻](https://news.qq.com/rain/a/20261114A057UH00) · [aihot.news](https://aihot.news/) | **评分**：8.5/10 | **标签**：开源基建 / 版本契约 / 端侧推理 / P1

#### 核心事件
11 月 13 日，开发者 **Georgi Gerganov（@ggerganov，Hugging Face 工程师）宣布 llama.cpp 与底层张量库 ggml 同步发布 v1.0.0**（构建号 b12359，MIT 许可不变）。这是项目写了三年半 `0.x` 之后**首次确立稳定 API 基线**：两个库从此遵循**语义化版本（semver）**——**MAJOR** 留给 `./include` 公共 C API 的破坏性变更、**MINOR** 是向后兼容的新增（后端 / 模型支持 / API）、**PATCH** 只做不改 API 的 bug 修复，下游可从版本号直接判断升级边界。工程配套：每个 ggml 后端可编译为**动态库、运行时按需加载**，硬件专属代码不再全部静态链进主程序；官方称现支持**超过 150 种模型架构变体**（文本 / 图像 / 视频 / 音频）与主流推测解码；用 HF Buckets / HF Jobs 扩展 CI，并在 NVIDIA / AMD / Qualcomm / Arm / IBM / Intel 硬件支持下增加覆盖主要平台的自托管测试运行器；强调「审慎使用 LLM，但把代码质量、架构控制与对实现细节的理解放在首位」。llama.cpp 是本地推理的事实标准，Ollama、LM Studio 等一大批桌面与边缘工具构建其上。

#### 技术亮点 / 影响分析
- **1.0.0 不是功能更新，是一次「契约签订」**：没有新模型、没有性能跑分、对终端用户体验变化为零——它服务的是打包与集成方，把「升级前先翻提交记录看有没有 break」换成「看一眼版本号」。
- **语义化版本 + 后端动态库，直接降低下游长期维护风险**：对把本地推理压进产品里的团队，API/ABI 稳定承诺比多几个点的性能更值钱。
- **与 #4 / #6 同属「工程化」主线**：能力足够强之后，行业在补的是版本契约、验证器与编排纪律这些「不性感但决定能不能长期用」的东西。
- **边界**：官方明确 **1.0.0 未附带任何性能提升声明**，稳定承诺自本版本起算、此前的破坏性变更仍需各自迁移；「150+ 架构」是项目自报支持范围而非独立评测；纯用户无感。

#### 三句话总结
1. llama.cpp 与 ggml 于 11/13 同步发布 v1.0.0，三年半 0.x 后首立语义化版本契约（MAJOR/MINOR/PATCH 明确定义），支持 150+ 模型架构、后端动态库按需加载，MIT 不变、无性能提升声明。
2. 它把本地推理从「随时可能 break 的滚动版本」升级为可放心压长期项目的稳定基础设施，是成熟度而非能力的里程碑。
3. **对 CODM 宣发团队**：若内部有本地跑的切图校验、脱敏预览或离线素材处理工具依赖 llama.cpp / Ollama，1.0 之后可把升级策略从「锁死版本」改为「按 semver 跟进 MINOR」，并借后端动态库精简打包体积；本地化路线不依赖公网时，这类断网可跑的底座值得留一条备选。

---

### #8 Cursor 披露安全事件调查：恶意 Claude Code 扩展波及最多 5000 用户，Fireworks 密钥致训练 trace 被读

> **来源**：[Cursor Blog](https://cursor.com/blog) · [Cursor 官方 X](https://x.com/cursor_ai) · [aihot.news 热度榜 01](https://aihot.news/items/e9o5h2c1o5f0xuh2bgqtc2w7k) | **评分**：8.3/10 | **标签**：供应链安全 / 凭证治理 / 开发工具 / P1

#### 核心事件
11 月 13 日，**Cursor 发布近期安全事件的完整调查与整改说明**：攻击者利用 **Fireworks 暴露的访问密钥**，读取了用于模型训练的 **coding agent trace**；**恶意 Claude Code 扩展波及最多 5000 用户**；**少于 0.01% 客户的 API 凭证暴露**。官方完整披露了攻击链路、受影响范围与处置措施，并给出可操作建议——读者可据此判断自身是否需要**轮换凭证或重装扩展**。该条位列 aihot.news 今日热度榜精选第 01（AI 评分 7272），推荐理由即「官方完整披露攻击链路、受影响范围与处置措施」。同日相邻动态还有：Cursor 预告 Bot 将加入工作会议、Claude Code v2.1.325 修复 zstd 解码安全问题及多项稳定性缺陷。

#### 技术亮点 / 影响分析
- **攻击面已经从「模型」转到「扩展 + 第三方密钥 + 训练 trace」**：不是提示注入，而是供应链上一个泄露的密钥让攻击者读到了真实的智能体执行轨迹——这类数据往往含代码、路径乃至内嵌凭据，敏感度被普遍低估。
- **「0.01% 客户凭证暴露 / 最多 5000 用户受影响」是难得的量化口径**：官方给出分母与上限，比笼统的「部分用户」更利于自查，值得所有工具厂商照做。
- **与 #1 的令牌化、#3 的 OAuth 授权是同一议题的反面**：今天上半场在给智能体发权限，这条提醒权限一旦落到扩展与第三方密钥上，泄露半径有多大。
- **边界**：事件细节以 Cursor 官方披露为准，受影响用户数（最多 5000）与凭证暴露比例（<0.01%）为官方口径；恶意扩展的具体名称、下架时间与是否涉及数据外泄，官方说明未完全展开，处置建议以「轮换凭证/重装扩展」为基线。

#### 三句话总结
1. Cursor 于 11/13 披露安全事件调查：攻击者借 Fireworks 暴露密钥读取 coding agent 训练 trace，恶意 Claude Code 扩展波及最多 5000 用户、<0.01% 客户 API 凭证暴露，官方给出攻击链路与「轮换凭证/重装扩展」处置建议。
2. 它把 AI 开发工具的攻击面从模型本身移到扩展、第三方密钥与训练轨迹这一被低估的供应链环节，并给出难得的量化口径。
3. **对 CODM 宣发团队**：立刻盘点团队在 Cursor / Claude Code 上装的第三方扩展与 MCP server，只保留必需项并核验来源；把 API key 从「长期通用」改为「按工具/按环境隔离 + 定期轮换」，严禁把访问凭据写进会被 trace / 日志采集的目录；未定稿物料与密钥不进智能体可读的工作区。

---

## 编辑点评

八条其实在讲同一件事：**昨天交出去的是权，今天补上的是账本和规矩**。昨天黄仁勋离场，让市场第一次为「一个人的缺席」重新定价；今天系统反过来开始向人要权限——OpenAI 给 dot 发了一张能结账的卡（#1）、Sierra 给智能体和商家定了握手的协议（#3），而美联储在同一天把整轮 AI 资本狂热写进了官方风险账本（#2）。**放权和画线，是同一天完成的动作**。

有意思的是中段三条（#4–#6）完全不谈「谁更聪明」：Inkling 2 Small 把低精度从推理推进到训练全流程、DeepSeek 把打磨好的 App 拆成可计费接口、Google 把科研级多智能体的「上下文分区 + 硬验证器」开放出来——**都是把能力变成可复现、可调用、可长期维护的工程件**。收尾两条更直白：llama.cpp 用 1.0 签下版本契约（#7）、Cursor 把一次凭证泄露摊开成整改清单（#8）。越自动化，越要把地基与边界先写清楚。

另一组对照值得记：**#1 的令牌化、#3 的 OAuth 授权、#8 的凭证泄露，是同一枚硬币的三面**。今天上半场在给智能体发权限、发身份、发卡，下半场就有人用一次真实的泄露提醒：权限一旦落到扩展、第三方密钥与训练轨迹上，半径会有多大。这不是泼冷水，是 2026 下半年 Agent 落地必须同时补齐的那一半。

一句话：昨天交出去的是权，今天补上的是账本和规矩

今天最高分给到 **#1 ChatGPT Wallet（9.5 / P0）**：分量不在「AI 能替你买东西」，而在 OpenAI 联合三大卡组织把「逐笔批准 + 支付令牌 + 不接触真实卡号」做成了默认机制——这是 Agent 权限治理第一次从提示词约定下沉到支付网络与凭据层，也是与同日 Poppy、美联储报告共同构成的「放权/画线」闭环的起点。

五条可以立刻执行的线索：**① 任何要接采购/投放的 Agent 流程，照「单笔专用凭据 + 逐笔人工批准 + 消费限额/品类白名单」重画权限**，不共享主账号卡号；**② 供应商与算力合同的风险清单补一条「表外担保/未启动租约敞口」核查**，对外引用景气度优先用美联储这类官方口径；**③ 官网/活动页若考虑放行外部智能体，提前规划 `/.well-known/` 发现文件与 OAuth 读写权限分离**，draft 阶段不写死对接；**④ 长链路内容流水线按「每步只给本步上下文 + 独立评审者 + 硬校验器」拆分**，把校验做成规则清单而非模型自评；**⑤ 全量盘点 Cursor / Claude Code 第三方扩展，API key 改为按工具/环境隔离 + 定期轮换**，严禁凭据进入会被 trace / 日志采集的目录。
