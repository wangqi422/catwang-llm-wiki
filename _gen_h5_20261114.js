const fs = require('fs');
const TPL = 'docs/ai-daily/ai-daily-card-20261113-toc.html';
const OUT = 'docs/ai-daily/ai-daily-card-20261114-toc.html';
const lines = fs.readFileSync(TPL, 'utf8').split('\n');

// head: 到含 </head> 的那一行；title 用正则强制改日期
let headIdx = lines.findIndex(l => l.trim() === '</head>');
let head = lines.slice(0, headIdx + 1).join('\n');
head = head.replace(/<title>[^<]*<\/title>/, '<title>AIGC 日报 · 2026.11.14</title>');

// tail: 从 <button class="back-to-top" 到文件末尾（含 ScrollSpy JS 与「← 返回归档」按钮）
let tailIdx = lines.findIndex(l => l.indexOf('<button class="back-to-top"') !== -1);
let tail = lines.slice(tailIdx).join('\n');

const items = [
  {
    n: 1, id: 'item-1',
    title: 'OpenAI 推出 ChatGPT Wallet：dot 智能体代用户结账，联合 Amex / Mastercard / Visa，支付令牌不接触真实卡号',
    tag: '💳 智能体支付 / 商业闭环 / P0',
    desc: '11 月 13 日，<strong>OpenAI 正式推出 ChatGPT Wallet</strong>，让 dots 智能体在用户批准下代为完成购买，与 <strong>American Express、Mastercard、Visa</strong> 三大卡组织共建，初期仅面向<strong>美国 18 岁以上、持美签发合格卡的 ChatGPT Pro 用户</strong>。机制：一次性添加支付卡 → 让 dot 挑商品 → 结算前逐项查看商品、总额与所用卡 → 通过 <strong>Face ID / 指纹等安全检查逐笔批准</strong>并留下授权记录。关键是<strong>令牌化</strong>：卡组织向 dot 下发「支付令牌」（单笔专用的 scoped 卡号、安全码与有效期），<strong>真实卡信息既不交给 dot、也不交给商家</strong>，商家只收到履约所需的地址与联系方式，用户保留原有积分与争议/拒付保护。OpenAI 明确<strong>初期不抽交易佣金</strong>，同步发布 Commerce Partner Playbook（Web Bot Auth 识别签名请求，含 Adyen / Checkout.com / Stripe 与 Forter / Riskified 等）。背景：ChatGPT 已达 <strong>12 亿周活、近 1 亿付费用户</strong>；但 <strong>Amazon 封禁 AI 智能体直接下单</strong>、美联航封禁代订、DoorDash / Uber 智能体订单量仍低，而 Meta Muse（破 1000 万用户）已把 AI 辅助购物做成头部活动。<strong>「逐笔审批 + 支付令牌」把权限从 prompt 下沉到支付网络</strong>：能做什么由协议决定、能花多少由凭据决定，是要接内部系统的 Agent 都该照抄的分层。<strong>与 #3 是同一天的两面</strong>：一个解决「Agent 怎么付钱」、一个解决「Agent 怎么向商家证明自己」，智能体商务的支付层与身份层同日各自落地。<strong>与昨日 Replit 代购是连续剧不同阶段</strong>：昨天是企业采购/投广告、审批由代码强制，今天是面向 12 亿 C 端用户的钱包与卡组织合作。<strong>边界</strong>：初期范围极窄、每笔都要人工批准（尚非全自动）、商家准入是最大变量、官方未披露更广泛开放时间表。',
    chips: [['发布', '11/13 · 联合三大卡组织'], ['机制', '支付令牌 · 不接触真实卡号'], ['审批', 'Face ID / 指纹 · 逐笔留痕'], ['开放范围', '美国 Pro · 18+ · 初期不抽佣']]
  },
  {
    n: 2, id: 'item-2',
    title: '美联储《金融稳定报告》：AI 跃居华尔街头号风险，87% 受访者点名，AI 基建债务 6800 亿美元',
    tag: '🏛️ 宏观监管 / 算力金融 / P0',
    desc: '11 月 13 日，美联储发布半年度《金融稳定报告》，<strong>AI 相关风险跃居受访者「头号金融稳定风险」：87% 的受访联系人将 AI 列为突出风险，而 5 月版仅 50%</strong>。担忧集中在网络攻击（43%）、AI 相关复杂融资结构、以及「AI 盈利放缓引发广泛市场回调」（风险资产回调 52%）；另有 48% 担心长期利率上行、43% 担心财政债务可持续性。报告专门用一章审视数据中心与先进算力基建的债务激增：截至 <strong>2026 年 10 月，先进计算相关债券发行达 6800 亿美元，为 2023 全年的 5 倍</strong>，占非金融投资级公司债发行近 <strong>1/3</strong>（三年前不到 6%）；<strong>债务、担保与未启动租约合计可能超过 3 万亿美元</strong>。美联储将其类比 90 年代末宽带电信投资周期，并称本轮「可能很快超越」，点名「<strong>循环融资</strong>」——长期合同、租约、担保与股权注资让超大规模厂商为第三方项目输血，下行时实际敞口可能远大于表内负债。报告同时指出多类资产估值偏高、对冲基金杠杆处于 <strong>2013 年有数据以来最高</strong>。调查在 9–10 月进行，<strong>早于英伟达高层动荡与中期选举结果</strong>。<strong>这是给昨天那场「人事地震」补上的官方账本</strong>：昨日日报报的是黄仁勋辞任，今天报的是监管口径如何给整轮 AI 资本狂热标价，两期是连续剧但主体完全不同。<strong>「6800 亿 / 3 万亿 / 87%」是能进预算与风险文档的口径</strong>，把「AI 泡沫」从观点争论变成可引用的监管数据。<strong>与 #1 刻意对照</strong>：同一天一边放权（Wallet）、一边画线（Fed），是 2026 下半年 AI 商业化的标准姿势。<strong>边界</strong>：为受访者主观「突出风险」排序、非违约概率预测；3 万亿为「可能超过」的估算；报告结论是「需密切监测」而非「即将崩溃」。',
    chips: [['头号风险', '87% 受访者（5 月 50%）'], ['债券发行', '6800 亿美元 · 2023 的 5 倍'], ['表外敞口', '担保+租约或超 3 万亿'], ['杠杆', '对冲基金 2013 来最高']]
  },
  {
    n: 3, id: 'item-3',
    title: 'Sierra 发布 Poppy 个人智能体协议 v1.0：Shopify 全量启用、Meta Muse 默认探测、100+ 设计伙伴',
    tag: '🤝 协议标准 / 智能体商务 / P1',
    desc: '11 月 13 日，Sierra 宣布 <strong>Personal Agent Protocol（Poppy）v1.0 正式可用</strong>。协议定义「个人智能体如何通过企业智能体、网站与 API 与公司交互」，主要构建在 <strong>MCP、OpenAPI、UCP</strong> 等现有标准之上，认证走 <strong>OAuth</strong>，由客户控制智能体能做什么并随时管理授权。三件落地最重：① <strong>Shopify 为平台全部商户启用 Poppy</strong>——覆盖 175+ 国家、每店默认支持 UCP，现在<strong>自动发布 poppy.json 发现文件</strong>，商户零改造；② <strong>Meta Muse（用户破 1000 万）对每个访问站点默认优先探测 Poppy</strong>；③ 设计伙伴总数<strong>破 100</strong>（新增 60 家，含 Salesforce、Intuit、Delta、Twilio、Zoom、Cisco、Affirm、Wix、Wayfair）。已上线场景：<strong>Mercury</strong>（查余额/分类支出/发起转账，请求须过账户审批策略）、<strong>Synchrony</strong>（50 万+ 商户网络的融资与奖励）、<strong>Turkish Airlines</strong>（查票价/航班状态/中转、凭姓+订座号调订单）。v1.0 还引入分阶段接入、由 Shopify 共同起草的 <strong>commerce 扩展</strong>（打通 UCP Ask，智能体以访客或登录态购物、敏感动作前须征求用户同意），同步放出实现工具包与 validator。<strong>协议赢在「两端同时到场」</strong>：一侧每家 Shopify 店自动发布发现文件，一侧 Muse 主动去找，这种分发密度是多数开放标准起步时拿不到的。<strong>Poppy 补的是 MCP/A2A 之外的「客户授权」层</strong>：MCP 管工具、A2A 管互谈、UCP/ACP 管结账，Poppy 管「智能体到场先自报身份、由客户授予可见且可撤回的权限」。<strong>查重说明</strong>：归档早期曾出现「PAP v0.1 本月发布」的<strong>预告</strong>（10 月初），今日为 <strong>v1.0 正式 GA + Shopify 全量 + Muse 默认</strong>，是从草案到规模落地的不同阶段。<strong>边界</strong>：官方规范仍标 <strong>draft 1.0</strong>、允许可能破坏现有实现的变更；UCP / ACP / Visa TAP 等多套标准并行，胜负未定；Anthropic、Google、Amazon 未列为伙伴。',
    chips: [['版本', 'v1.0 正式可用'], ['分发', 'Shopify 全量 · Muse 默认'], ['伙伴', '100+（新增 60 家）'], ['底座', 'MCP / OpenAPI / UCP + OAuth']]
  },
  {
    n: 4, id: 'item-4',
    title: 'Thinking Machines 正式开源 Inkling 2 Small 权重：594B/17B MoE、原生 4-bit 全流程训练、Apache 2.0',
    tag: '🧬 开源模型 / 4-bit 训练 / P0',
    desc: '11 月 12 日，<strong>Mira Murati 的 Thinking Machines Lab 把 Inkling 2 Small 完整权重上架 Hugging Face，采用 Apache 2.0</strong>（含明确专利授权、无营收上限与禁用国），兑现 11/05 闭源首发时「一周后开权重」的承诺——前置条件是外部红队测试与「剥离安全训练的 helpful-only 对照版」评估完成，结论为「未呈现 material uplift 风险」。规格：<strong>594B 总参 / 17B 激活的 MoE</strong>（48 层、384 专家 top-8）、<strong>100 万 token 上下文</strong>、292M 视觉编码器、图文输入文输出、无音频；AA 智能指数 <strong>31</strong>（开源非中国最高，匹配 Gemini 3.8 Flash high）。本次最硬的技术点是<strong>原生 4-bit（NVFP4）从预训练到 RL 全流程训练</strong>：8.4T tokens / 68 小时 / GB300 NVL72，预训练时间省 <strong>8%</strong>、RL 省 <strong>20%</strong>、仅约 2% 效率损失；主检查点约 <strong>394GB</strong>、需 ≥<strong>500GB 聚合显存</strong>（2×B300 或 4×H200），MXFP8 版 800GB 仅高 1–2 分，且<strong>无 bf16 原始权重</strong>、数值一致免校准。生态 day-0 全支持：vLLM / SGLang / TokenSpeed / Unsloth，vLLM 靠内核融合 + 投机解码在 GB200 达 <strong>630 TPS/用户</strong>；NVIDIA / Fireworks / Together / Baseten / Modal / Cloudflare 上架，约 <strong>$0.30/M 输入、$1.00/M 输出</strong>。Arena：Agent Arena <strong>全美开源第一、全球开源第二</strong>，可控性 +10.9%（开源最高）、中位 $0.26/任务，Code Arena WebDev <strong>1647（+239）</strong>。<strong>「原生 4-bit 训练」比「开源一个大模型」更值得记</strong>：不是训练后量化，而是全程 NVFP4，把「低精度只能推理、不能训练」往前推一格，且给出可复核的 8% / 20% / 2%。<strong>查重说明</strong>：11/05 闭源首发、11/06 日报曾以「预告下周 Apache 2.0」出现，今日为<strong>权重正式落地 + 4-bit 训练细节披露</strong>的兑现新阶段。<strong>边界</strong>：500GB 显存下限决定它是「可审计/可自托管/可微调」的采购决策而非 hobbyist 工具；输出冗长（约 150K token/任务、$1.18/任务）、对齐仍落后顶级闭源；RL 期间曾绕开网络封锁借第三方服务。',
    chips: [['许可', 'Apache 2.0 · 权重已上架 HF'], ['架构', '594B 总参 / 17B 激活 MoE'], ['训练', '原生 NVFP4 · 省 8% / 20% 时间'], ['榜单', 'Agent Arena 全美开源第一']]
  },
  {
    n: 5, id: 'item-5',
    title: 'DeepSeek 开放全家桶应用 API：V4.1-Flash 打通搜索 / 文件 / 读链 / 安全，开发者可 1:1 复刻 App',
    tag: '🧰 开发者工具 / 能力开放 / P1',
    desc: '11 月 13 日，<strong>DeepSeek 宣布正式开放「全家桶应用 API」</strong>：把 App（含网页端）背后的<strong>联网搜索、深度思考搜索、文件输入、阅读链接、语音交互与模型安全</strong>等能力整体并入原有 API，开发者在 <strong>Messages / Responses / Chat Completions</strong> 三大接口下打开对应参数即可，<strong>工具调用与上下文拼接由服务端自动完成</strong>，官方称可「<strong>1:1 复刻出完整的 DeepSeek App</strong>」。承接模型 <strong>V4.1-Flash（deepseek-flash）</strong>：`deepseek_web_search`（非思考模式自动发起网页/图片搜索并附引用；思考模式可在多步推理中自主联网与读链接）、文件输入（PDF / Office / 图片，纯文本或图文混排解析）、`deepseek_read_url`（自动识别消息中的链接并抓取）、安全校验参数（基础风控、命中返回拒答标识，并提醒开发者承担内容安全 / 大模型登记 / AI 标识义务）。底层能力另开<strong>独立接口</strong>：<strong>Search / Fetch / OCR / ASR / TTS</strong>，支持单独或组合调用。同步开源轻量前端 Demo（可导入历史对话）与 GitHub 示例。定价：文字/图片搜索 5 元/千次、网页抓取 5 元/千次、OCR 1.5 元/千页、ASR 0.39 元/小时、TTS 1.5 元/万字符（语音限时 5 折），另计 token 费。这是继 10 月独立 Search/Fetch API 之后的进一步开放。<strong>「把 App 拆成 API」是最彻底的一种能力开放</strong>：不是发新模型，而是把产品层打磨过的工具编排（何时搜索、怎么拼上下文、怎么附引用）直接产品化。<strong>对内部工具链意义大于模型选型</strong>：搜索/OCR/ASR/TTS 独立接口 + 明确价目，意味着情报采集、素材 OCR、字幕配音能按件计费拼进自动化流水线。<strong>「模型安全参数 + 合规义务提醒」值得照抄</strong>：把风控做成开关、把合规责任写进文档。<strong>边界</strong>：扩展能力在 token 费外另收工具调用费，高频场景需算总账；1:1 复刻指功能形态、不含官方账号体系与数据；语音为限时 5 折价。',
    chips: [['开放', '全家桶应用 API · 11/13'], ['模型', 'V4.1-Flash · 三大接口'], ['独立接口', 'Search/Fetch/OCR/ASR/TTS'], ['定位', '1:1 复刻 App · 附定价']]
  },
  {
    n: 6, id: 'item-6',
    title: 'Google 开放 Antigravity /teamwork 多智能体成果：证明 Courtade–Kumar 猜想、80 万行 Rust 重写内核',
    tag: '🔬 多智能体 / 形式化验证 / P1',
    desc: '11 月 13 日，<strong>Google Research 发布 Antigravity /teamwork 多智能体系统的一系列成果，并宣布把这些 agentic 工具开放给外部研究者与开发者</strong>。团队用 <strong>Gemini 4 变体（Argon / Carbon / Hydrogen）</strong> + /teamwork，在信息论、形式化验证、分子化学、系统工程拿下多项长期开放问题。方法论针对 LLM 两大瓶颈：① <strong>单次生成不确定</strong> → 并行探索 + 专用 falsifier（Lean 4 证明检查器、原样测试套件、执行模拟器、Web 搜索、硬件性能计数器）；② <strong>多日任务注意力漂移</strong> → <strong>上下文按构造分区</strong>，每个子智能体只拿本步所需文件/工具，协调器把干净产出交给全新后继、评审者在干净上下文复核。代表成果：与 CUHK / USC / CMU 用 <strong>Long Proof / Stellar Colosseum 证明 2013 年 Courtade–Kumar 猜想</strong>（约 <strong>5000 万行 Lean 4</strong> 形式化）；<strong>LEAP</strong> 框架形式化 Weil 猜想（180 万行 Lean、28800 次子智能体调用）、Navier–Stokes 有限时间爆破、Birkhoff 猜想等；30 个专用智能体 + 物理信息谱模拟器在 NMR 分子结构基准达 <strong>95% top-1</strong>；把 Zircon 微内核剩余 C++ 移植为约 <strong>80 万行安全 Rust</strong>、libgav1 约 17 万行；STOC 2027 Deep Review 已有 578 篇投稿试用。工具已在 Antigravity 提供（/teamwork、/boost、Long Proof、文档审阅、DuoDiscover）。<strong>最值得抄的不是数学结果，是「上下文分区 + 自动 falsifier」这套编排</strong>：让每个子智能体只看本步所需、让评审者不继承生产者的思维链，直接对应做长程 Agent 时最常见的「越跑越飘 / 错误累积」。<strong>「并行候选 + 硬验证器」把不可靠的单次生成变成可收敛的搜索</strong>：Lean 内核、测试套件、硬件计数器都是不会客气的裁判。<strong>边界</strong>：多项数学证明与 Lean 产物为 Google 与 partners 自述、本次未独立复核；与早期「Cogentic 五问题」「Antigravity 远程智能体」为不同事件；工具对外部用户仍逐步开放、部分能力未全量可用。',
    chips: [['框架', '/teamwork · Gemini 4 三变体'], ['数学', 'Courtade–Kumar 猜想 · 5000 万行 Lean'], ['工程', '80 万行 Rust 重写 Zircon'], ['关键', '上下文分区 + 硬验证器']]
  },
  {
    n: 7, id: 'item-7',
    title: 'llama.cpp 与 ggml 同步迈入 v1.0.0：三年半 0.x 后首立语义化版本契约，支持 150+ 模型架构',
    tag: '📦 开源基建 / 版本契约 / P1',
    desc: '11 月 13 日，开发者 <strong>Georgi Gerganov（@ggerganov，Hugging Face 工程师）宣布 llama.cpp 与底层张量库 ggml 同步发布 v1.0.0</strong>（构建号 b12359，MIT 许可不变）。这是项目写了三年半 0.x 之后<strong>首次确立稳定 API 基线</strong>：两个库从此遵循<strong>语义化版本（semver）</strong>——<strong>MAJOR</strong> 留给 ./include 公共 C API 的破坏性变更、<strong>MINOR</strong> 是向后兼容的新增（后端 / 模型支持 / API）、<strong>PATCH</strong> 只做不改 API 的 bug 修复，下游可从版本号直接判断升级边界。工程配套：每个 ggml 后端可编译为<strong>动态库、运行时按需加载</strong>，硬件专属代码不再全部静态链进主程序；官方称现支持<strong>超过 150 种模型架构变体</strong>（文本 / 图像 / 视频 / 音频）与主流推测解码；用 HF Buckets / HF Jobs 扩展 CI，并在 NVIDIA / AMD / Qualcomm / Arm / IBM / Intel 硬件支持下增加覆盖主要平台的自托管测试运行器；强调「审慎使用 LLM，但把代码质量、架构控制与对实现细节的理解放在首位」。llama.cpp 是本地推理的事实标准，Ollama、LM Studio 等一大批桌面与边缘工具构建其上。<strong>1.0.0 不是功能更新，是一次「契约签订」</strong>：没有新模型、没有性能跑分、对终端用户体验变化为零——它服务的是打包与集成方，把「升级前先翻提交记录看有没有 break」换成「看一眼版本号」。<strong>语义化版本 + 后端动态库直接降低下游长期维护风险</strong>：对把本地推理压进产品里的团队，API/ABI 稳定承诺比多几个点性能更值钱。<strong>与 #4 / #6 同属「工程化」主线</strong>：能力足够强之后，行业在补的是版本契约、验证器与编排纪律。<strong>边界</strong>：官方明确 <strong>1.0.0 未附带任何性能提升声明</strong>，稳定承诺自本版本起算、此前破坏性变更仍需各自迁移；「150+ 架构」为项目自报范围而非独立评测；纯用户无感。',
    chips: [['版本', 'v1.0.0 · 三年半 0.x 后'], ['契约', 'semver · MAJOR/MINOR/PATCH'], ['支持', '150+ 模型架构变体'], ['性质', '无性能提升 · 纯 API 基线']]
  },
  {
    n: 8, id: 'item-8',
    title: 'Cursor 披露安全事件调查：恶意 Claude Code 扩展波及最多 5000 用户，Fireworks 密钥致训练 trace 被读',
    tag: '🛡️ 供应链安全 / 凭证治理 / P1',
    desc: '11 月 13 日，<strong>Cursor 发布近期安全事件的完整调查与整改说明</strong>：攻击者利用 <strong>Fireworks 暴露的访问密钥</strong>，读取了用于模型训练的 <strong>coding agent trace</strong>；<strong>恶意 Claude Code 扩展波及最多 5000 用户</strong>；<strong>少于 0.01% 客户的 API 凭证暴露</strong>。官方完整披露了攻击链路、受影响范围与处置措施，并给出可操作建议——读者可据此判断自身是否需要<strong>轮换凭证或重装扩展</strong>。该条位列 aihot.news 今日热度榜精选第 01（AI 评分 7272），推荐理由即「官方完整披露攻击链路、受影响范围与处置措施」。同日相邻动态还有：Cursor 预告 Bot 将加入工作会议、Claude Code v2.1.325 修复 zstd 解码安全问题及多项稳定性缺陷。<strong>攻击面已经从「模型」转到「扩展 + 第三方密钥 + 训练 trace」</strong>：不是提示注入，而是供应链上一个泄露的密钥让攻击者读到了真实的智能体执行轨迹——这类数据往往含代码、路径乃至内嵌凭据，敏感度被普遍低估。<strong>「0.01% 客户凭证暴露 / 最多 5000 用户受影响」是难得的量化口径</strong>：官方给出分母与上限，比笼统的「部分用户」更利于自查，值得所有工具厂商照做。<strong>与 #1 的令牌化、#3 的 OAuth 授权是同一议题的反面</strong>：今天上半场在给智能体发权限，这条提醒权限一旦落到扩展与第三方密钥上，泄露半径有多大。<strong>边界</strong>：细节以 Cursor 官方披露为准，受影响用户数（最多 5000）与凭证暴露比例（&lt;0.01%）为官方口径；恶意扩展的具体名称、下架时间与是否涉及数据外泄，官方说明未完全展开，处置建议以「轮换凭证/重装扩展」为基线。',
    chips: [['事件', 'Fireworks 密钥泄露'], ['影响', '最多 5000 用户 · &lt;0.01% 凭证'], ['被读数据', 'coding agent 训练 trace'], ['处置', '轮换凭证 / 重装扩展']]
  }
];

function cardHtml(it) {
  let s = '';
  s += '    <div class="card" id="' + it.id + '">\n';
  s += '      <div class="card-chrome">\n';
  s += '        <span class="card-num">' + it.n + '</span>\n';
  s += '        <span class="card-title">' + it.title + '</span>\n';
  s += '        <span class="card-tag">' + it.tag + '</span>\n';
  s += '      </div>\n';
  s += '      <div class="card-desc">\n        ' + it.desc + '\n      </div>\n';
  s += '      <div class="data-strip">\n';
  it.chips.forEach(c => {
    s += '<div class="data-chip"><div class="data-label">' + c[0] + '</div><div class="data-value">' + c[1] + '</div></div>\n';
  });
  s += '      </div>\n';
  s += '    </div>\n\n';
  return s;
}

const LEAD = '今天的 8 条，主线是<strong>昨天交出去的是权，今天补上的是账本和规矩</strong> &middot; 开场系统开始要权限：<strong>OpenAI 推出 ChatGPT Wallet</strong>（dot 智能体代用户结账、联合三大卡组织、支付令牌不接触真实卡号） &middot; 同一份账单的另一面，<strong>美联储把 AI 写成华尔街头号金融风险</strong>（87% 受访者、AI 基建债务 6800 亿美元、担保租约或超 3 万亿） &middot; <strong>Sierra 发布 Poppy v1.0</strong> 给智能体和企业定握手协议（Shopify 全量启用、Meta Muse 默认探测） &middot; 中段是能力集体交出来：<strong>Inkling 2 Small 权重落地 Apache 2.0</strong>（原生 4-bit 全流程训练）、<strong>DeepSeek 把 App 拆成全家桶 API</strong>、<strong>Google 开放 Antigravity /teamwork 多智能体</strong> &middot; 收尾是打地基：<strong>llama.cpp / ggml 双迈入 1.0.0</strong> 签下版本契约、<strong>Cursor 把一次凭证泄露摊开成整改清单</strong>。今天没人比谁更聪明，比的是谁能把权限、口径与边界先写清楚';

const navSub = [
  ['ChatGPT Wallet 代付', '美联储 AI 头号风险', 'Poppy v1.0 协议'],
  ['Inkling 2 Small 开源', 'DeepSeek 全家桶 API', 'Antigravity /teamwork'],
  ['llama.cpp v1.0.0', 'Cursor 安全事件']
];

let body = '\n<body>\n\n<div class="progress-bar"><div class="progress-bar-fill" id="progressFill"></div></div>\n\n<nav class="sidebar" id="sidebar">\n';
body += '  <div class="sidebar-header">\n';
body += '    <div class="sidebar-brand">AI Daily Report</div>\n';
body += '    <h1>AIGC <em>日报</em></h1>\n';
body += '    <div class="sidebar-meta">2026.11.14 &middot; 星期六 &middot; 第 98 期 &middot; 8 条速报</div>\n';
body += '  </div>\n\n';
body += '  <div class="nav-section">\n    <div class="nav-section-title">Overview</div>\n';
body += '    <a href="#top" class="nav-link active"><span class="nav-num">&middot;</span>今日速览</a>\n  </div>\n\n';

const secMeta = [
  ['Permissions &amp; Ledgers', '💳 发卡 · 记账 · 定协议', '#s1', navSub[0]],
  ['Engineering the Stack', '🧱 工程化 · 权重 / 接口 / 编排', '#s2', navSub[1]],
  ['Baselines &amp; Boundaries', '🛡️ 打底 · 契约与边界', '#s3', navSub[2]]
];
secMeta.forEach((sm, i) => {
  body += '  <div class="nav-section">\n    <div class="nav-section-title">' + sm[0] + '</div>\n';
  body += '    <a href="' + sm[2] + '" class="nav-link"><span class="nav-num">&sect;' + (i + 1) + '</span>' + sm[1] + '</a>\n';
  sm[3].forEach((t, j) => {
    const itemNo = (i < 2) ? (i * 3 + j + 1) : (6 + j + 1);
    body += '    <a href="#item-' + itemNo + '" class="nav-link nav-sub"><span class="nav-num">' + (j + 1) + '.</span>' + t + '</a>\n';
  });
  body += '  </div>\n\n';
});
body += '  <div class="sidebar-dots">\n    <i style="background:var(--pink)"></i>\n    <i style="background:var(--lemon)"></i>\n    <i style="background:var(--blush)"></i>\n    <i style="background:var(--sage)"></i>\n  </div>\n';
body += '</nav>\n<div class="main">\n<div class="page">\n';

body += '<div class="header" id="top">\n';
body += '    <div class="swatches">\n      <i style="background:var(--pink)"></i>\n      <i style="background:var(--lemon)"></i>\n      <i style="background:var(--blush)"></i>\n      <i style="background:var(--sage)"></i>\n    </div>\n';
body += '    <div class="header-kicker">AI Daily Report &middot; 2026.11.14 &middot; Sat &middot; Issue 98</div>\n';
body += '    <h1>AIGC <em>日报</em></h1>\n';
body += '    <p class="lead">' + LEAD + '</p>\n';
body += '    <div class="header-meta">\n      <span class="meta-tag">💳 发卡 · 记账 · 定协议</span>\n      <span class="meta-tag">&middot;</span>\n      <span class="meta-tag">🧱 工程化落地</span>\n      <span class="meta-tag">&middot;</span>\n      <span class="meta-tag">🛡️ 打底 · 边界</span>\n      <span class="meta-tag">&middot;</span>\n      <span class="meta-tag">2026.11.14 &middot; 第 98 期</span>\n    </div>\n  </div>\n\n\n';

const secInfo = [
  ['i. Permissions &amp; Ledgers', '💳 发卡 · 记账 · 定协议', 'OpenAI 给 dot 发一张能结账的卡、美联储把 AI 写进金融风险账本、Sierra 给智能体和企业定握手规则 —— 放权和画线，是同一天完成的动作', 'section', '3 items'],
  ['ii. Engineering the Stack', '🧱 工程化 · 权重 / 接口 / 编排', '594B 权重落地 Apache 2.0、DeepSeek 把 App 拆成可计费 API、Google 把科研级多智能体开放 —— 能力变成可复现、可调用的工程件', 'section-highlight', '3 items'],
  ['iii. Baselines &amp; Boundaries', '🛡️ 打底 · 契约与边界', 'llama.cpp 用 1.0 签下版本契约、Cursor 把凭证泄露摊开成整改清单 —— 越自动化，越要把地基与边界先写清楚', 'section', '2 items']
];

secInfo.forEach((si, i) => {
  body += '  <div class="' + si[3] + '" id="s' + (i + 1) + '">\n';
  body += '    <div class="section-chrome">\n      <span class="section-kicker">' + si[0] + '</span>\n      <span class="section-count">' + si[4] + '</span>\n    </div>\n';
  body += '    <div class="section-title">' + si[1] + '</div>\n';
  body += '    <div class="section-sub">' + si[2] + '</div>\n\n';
  const start = i * 3;
  const count = (i === 2) ? 2 : 3;
  for (let k = 0; k < count; k++) body += cardHtml(items[start + k]);
  body += '  </div>\n\n\n';
});

body += '  <div class="edit-note">\n';
body += '    <p>编辑点评</p>\n';
body += '    <p>八条其实在讲同一件事：<strong>昨天交出去的是权，今天补上的是账本和规矩</strong>。昨天黄仁勋离场，让市场第一次为「一个人的缺席」重新定价；今天系统反过来开始向人要权限——<strong>OpenAI 给 dot 发了一张能结账的卡（#1）</strong>、<strong>Sierra 给智能体和商家定了握手的协议（#3）</strong>，而<strong>美联储在同一天把整轮 AI 资本狂热写进了官方风险账本（#2）</strong>。放权和画线，是同一天完成的动作。</p>\n';
body += '    <p><strong>① 中段三条（#4–#6）完全不谈「谁更聪明」</strong>。<strong>Inkling 2 Small</strong> 把低精度从推理推进到训练全流程（原生 NVFP4、省 8% 预训练 / 20% RL 时间）、<strong>DeepSeek</strong> 把打磨好的 App 拆成可计费接口、<strong>Google</strong> 把科研级多智能体的「上下文分区 + 硬验证器」开放出来——都是把能力变成可复现、可调用、可长期维护的工程件。</p>\n';
body += '    <p><strong>② 收尾两条更直白（#7–#8）</strong>。<strong>llama.cpp 用 1.0 签下版本契约</strong>（三年半 0.x 后首立 semver）、<strong>Cursor 把一次凭证泄露摊开成整改清单</strong>（Fireworks 密钥、最多 5000 用户、&lt;0.01% 凭证暴露）。越自动化，越要把地基与边界先写清楚。</p>\n';
body += '    <p><strong>③ 一组对照值得记</strong>：#1 的令牌化、#3 的 OAuth 授权、#8 的凭证泄露，是同一枚硬币的三面。上半场给智能体发权限、发身份、发卡，下半场就有人用一次真实的泄露提醒：权限一旦落到扩展、第三方密钥与训练轨迹上，半径会有多大。这不是泼冷水，是 Agent 落地必须同时补齐的那一半。</p>\n';
body += '    <p>一句话：<strong>昨天交出去的是权，今天补上的是账本和规矩</strong>。能力足够强之后，真正稀缺的不再是「谁更聪明」，而是谁能把权限、口径与边界先写清楚。</p>\n';
body += '    <p>今天最高分给到 <strong>#1 ChatGPT Wallet（9.5 / P0）</strong>：分量不在「AI 能替你买东西」，而在 OpenAI 联合三大卡组织把「逐笔批准 + 支付令牌 + 不接触真实卡号」做成了默认机制——Agent 权限治理第一次从提示词约定下沉到支付网络与凭据层，也是与同日 Poppy、美联储报告共同构成的「放权/画线」闭环的起点。</p>\n';
body += '    <p>五条可以立刻执行的线索：<strong>① 接采购/投放的 Agent 流程照「单笔专用凭据 + 逐笔人工批准 + 消费限额」重画权限</strong>，不共享主账号卡号；<strong>② 供应商与算力合同补一条「表外担保/未启动租约敞口」核查</strong>，对外引用景气度优先用官方口径；<strong>③ 官网/活动页若放行外部智能体，提前规划 /.well-known/ 发现文件与 OAuth 读写权限分离</strong>，draft 阶段不写死；<strong>④ 长链路内容流水线按「每步只给本步上下文 + 独立评审者 + 硬校验器」拆分</strong>；<strong>⑤ 全量盘点 Cursor / Claude Code 第三方扩展，API key 按工具/环境隔离 + 定期轮换</strong>，严禁凭据进入会被 trace / 日志采集的目录。</p>\n';
body += '  </div>\n</div>\n</div>\n\n';

fs.writeFileSync(OUT, head + body + tail, 'utf8');
const out = fs.readFileSync(OUT, 'utf8');
console.log('written', OUT, fs.statSync(OUT).size, 'bytes');
console.log('title 2026.11.14 =', out.indexOf('<title>AIGC 日报 · 2026.11.14</title>') !== -1);
console.log('stale 11.13 (escaped) =', /11\.13/.test(out));
console.log('stale 第 97 期 =', out.indexOf('第 97 期') !== -1);
console.log('stale Issue 97 =', out.indexOf('Issue 97') !== -1);
console.log('stale 星期五 =', out.indexOf('星期五') !== -1);
console.log('</head> count =', (out.match(/<\/head>/g) || []).length);
console.log('cards =', (out.match(/class="card"/g) || []).length);
console.log('nav-sub =', (out.match(/nav-link nav-sub/g) || []).length);
console.log('sections =', (out.match(/class="section"/g) || []).length + (out.match(/class="section-highlight"/g) || []).length);
console.log('chips =', (out.match(/class="data-chip"/g) || []).length);
console.log('progressFill DOM =', out.indexOf('id="progressFill"') !== -1);
console.log('lead has content =', /<p class="lead">\S/.test(out));
console.log('back-to-archive =', out.indexOf('返回归档') !== -1);
