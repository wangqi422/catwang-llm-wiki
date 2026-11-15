const fs = require('fs');
const TPL = 'docs/ai-daily/ai-daily-card-20261114-toc.html';
const OUT = 'docs/ai-daily/ai-daily-card-20261115-toc.html';
const lines = fs.readFileSync(TPL, 'utf8').split('\n');

// head: 到含 </head> 的那一行；title 用正则强制改日期
let headIdx = lines.findIndex(l => l.trim() === '</head>');
let head = lines.slice(0, headIdx + 1).join('\n');
head = head.replace(/<title>[^<]*<\/title>/, '<title>AIGC 日报 · 2026.11.15</title>');

// tail: 从 <button class="back-to-top" 到文件末尾（含 ScrollSpy JS 与「← 返回归档」按钮）
let tailIdx = lines.findIndex(l => l.indexOf('<button class="back-to-top"') !== -1);
let tail = lines.slice(tailIdx).join('\n');

const items = [
  {
    n: 1, id: 'item-1',
    title: '英伟达治理危机全面爆发：12 万人请愿黄仁勋复职、国会两院定 12/1–12/3 作证、市值一周蒸发约 5730 亿美元跌破 4 万亿',
    tag: '🏛️ 公司治理 / 监管听证 / P0',
    desc: '11 月 14–15 日，黄仁勋 11/12 辞任后的连锁反应集中爆发，从「一次人事变动」升级为<strong>公司治理与监管危机</strong>。① <strong>请愿</strong>：志愿者网站「Stand with Jensen」公开信签名<strong>周六破 11.5 万、至 11/15 已超 12 万</strong>，自报含 <strong>5965 名在职员工、1108 名前员工、63063 名股东</strong>；联署含 <strong>马斯克、Replit CEO Amjad Masad、Epic Games CEO Tim Sweeney、Shopify CEO Tobi Lütke</strong>，主张「未经实质正当程序即被免职」、要求独立调查期间复职。② <strong>国会</strong>：参议院银行委员会主席 Tim Scott 要求 <strong>12/3 公开作证、拒绝即发传票</strong>；众议院三委员会要求 <strong>12/1 闭门访谈</strong>、总法律顾问 12/2 就芯片出口管制合规受访。③ <strong>市场</strong>：股价单日收跌 <strong>4.34%</strong>、盘中一度跌超 14%，<strong>一周市值蒸发约 5730 亿美元、跌破 4 万亿</strong>；Blind 对 232 名员工调查显示 88% 希望其留任。④ <strong>担保风险</strong>：WSJ / The Decoder 称去职更源于 Nvidia 向 AI 云厂商提供数十亿美元<strong>财务担保换营收分成</strong>，最大一笔为对 <strong>OpenAI 俄亥俄数据中心 2500 亿美元担保</strong>，临时 CEO <strong>Colette Kress 已将其减半</strong>。另有副总裁 Bryan Catanzaro 辟谣「复职联名信」为伪造、董事会称仍在遴选搜猎公司，亚洲多国政府就 GPU 供应当日作出回应。<strong>这是 11-13 期「辞任」的第二阶段</strong>：那期报事件本身，今天报它触发的治理真空、监管介入与表外担保敞口，是连续剧新一幕而非重复。<strong>「2500 亿担保被减半」把 11-14 期美联储的宏观口径落到单一公司合同上</strong>——临时 CEO 上任第一件事是砍敞口，说明这类承诺已是董事会级风险。<strong>边界</strong>：签名由请愿者自填、平台未核验且在清理虚假签名；相关外部传闻未有公开证据、各方说法不一、美司法部称尚未有结论、中方已否认，本条只记录请愿 / 听证 / 市值 / 担保对治理与资本市场的影响，不对传闻本身作判断；金额均为媒体口径，以 11/17 财报为准。',
    chips: [['请愿', '12 万+ · 5965 在职员工'], ['国会', '12/1–12/3 作证 / 传票'], ['市值', '一周蒸发约 5730 亿'], ['担保', '2500 亿被减半']]
  },
  {
    n: 2, id: 'item-2',
    title: 'AMD 公布 MEXT 预测式内存引擎：Transformer 预测 + 闪存分层，DRAM 砍半保留 99% 性能，145 台已部署、2027 扩至 2000 台',
    tag: '🧠 算力基建 / 内存降本 / P0',
    desc: '11 月 10–14 日，AMD 集中披露 <strong>MEXT</strong> 预测式内存引擎（技术来自 2026 年 6 月收购的 Mext 公司）。做法是在操作系统与物理内存之间加一层软件，<strong>用 Transformer 模型预测哪些内存页即将被用到、提前从 NVMe 闪存预取回 DRAM</strong>，把冷页透明分层到闪存——因闪存比 DRAM 慢约 500 倍，这层预测是方案成立的关键。官方数据：物理 DRAM 用量可减少 <strong>20%–75%</strong>；Synopsys PrimeTime 下 512GB 降到 256GB 仍保留约 <strong>95%</strong> 性能；Azure 上 Spark TPC-DS 一半 DRAM 达全 DRAM 基准约 <strong>99%</strong>；压到 25% DRAM 时降到 80%。智能体负载「DRAM 与 MEXT 闪存各半」的五智能体并发<strong>每美元性能提升 90%</strong>、偏吃内存应用提升 70%。落地：内部 <strong>145 台服务器已以 50% DRAM 运行</strong>，相对纯扩 DRAM <strong>省约 83% 成本、避免约 490 万美元采购</strong>；计划 <strong>2027 年扩到 2000 台</strong>，与 <strong>HPE</strong> 推「MEXT Ready」系统，Azure / Oracle Cloud 列为扩展云主机，对外授权第二阶段无时间表。<strong>它动的是推理集群最贵那一块</strong>：把性能与物理内存容量解耦，运营商可少买 DRAM 通道、把差价换到加速器或电力。<strong>与 #1 的 2500 亿担保、11-14 期美联储 6800 亿基建债务是同一条账本</strong>：资本端砍敞口、硬件端做减法，行业从「堆料」转向「每美元性能」。<strong>「预测准确率就是性能契约」</strong>值得抄进架构评审：一旦访问模式随机化、预取失手，99% 立刻回落，必须把命中率做成可观测指标 + 降级预案。<strong>边界</strong>：全部基准为 AMD 自家 Epyc 内部测试，PrimeTime 与 Spark 恰好是分层友好负载，<strong>延迟敏感的实时推理数据尚未公布</strong>；83% 降本对应「可接受最大性能损失」配置；145 台基线无独立复测。',
    chips: [['机制', 'Transformer 预测 + 闪存分层'], ['性能', 'DRAM 砍半 · Spark 99%'], ['部署', '145 台 · 省约 490 万美元'], ['规模', '2027 扩至 2000 台']]
  },
  {
    n: 3, id: 'item-3',
    title: '资本在英伟达震荡当日反向加码：Fractile 7.2 亿美元 C 轮估值 70 亿、LangChain 3 亿、Rhoda AI 4.5 亿、英伟达 60 亿获 Poolside 授权',
    tag: '💰 融资并购 / 资本信号 / P1',
    desc: '在英伟达治理震荡与「AI 创业融资可能出现缺口」担忧最集中的同日，一级市场反而密集落子：① 伦敦 AI 芯片初创 <strong>Fractile 完成 7.2 亿美元 C 轮、投后估值 70 亿美元</strong>，较 5 月约 11 亿<strong>半年涨约 6 倍</strong>，投资方含 Thrive、Founders Fund、英国政府 Sovereign AI 基金与 British Business Bank。② <strong>LangChain 融资 3 亿美元、估值 30 亿美元</strong>，CapitalG 领投，较一年前 12.5 亿翻逾一倍。③ 机器人世界模型公司 <strong>Rhoda AI 以 4.5 亿美元 A 轮、17 亿美元估值走出隐身</strong>，发布 <strong>Direct Video Action（DVA）</strong>：用互联网规模视频预训练学物理（预测场景未来 100–500ms 再由 action converter 转成动作），并推出操作与移动合一的 mobile DVA。④ <strong>英伟达据报支付 60 亿美元获 Poolside AI 模型授权</strong>，另投 10 亿并拟吸纳 100 多名员工。背景另有 <strong>Anthropic 拟募资超 1000 亿冲击史上最大 IPO</strong>。<strong>「一边喊融资缺口、一边四笔大额成交」是今天最值得记的对照</strong>：钱押的是「替代算力 + Agent 编排 + 物理世界模型」三条不依赖单一 GPU 供应商的路线，没退场，只是换了下注位置。<strong>查重说明</strong>：Meta × Conductor 与 OpenAI × Pierre Computer 已在 <strong>11-05 期</strong>独立报道，本条不重复计入、仅作并购潮背景；今日新增为 Fractile / LangChain / Rhoda / 英伟达 × Poolside 四组 11-14~15 新事实。<strong>与 #4 是同日两条相反路线</strong>：Rhoda 主张专门预训练物理世界模型，OpenAI 主张通用模型直接接管机器人。<strong>边界</strong>：金额与估值来自媒体报道或公司自述、未披露完整条款；英伟达 × Poolside 与 Anthropic IPO 口径未经公司正式公告；Rhoda 工业机器人落地仍缺第三方复测。',
    chips: [['芯片', 'Fractile 7.2 亿 · 估值 70 亿'], ['编排', 'LangChain 3 亿 · 估值 30 亿'], ['世界模型', 'Rhoda 4.5 亿 A 轮'], ['授权', '英伟达 60 亿 × Poolside']]
  },
  {
    n: 4, id: 'item-4',
    title: 'OpenAI 重组具身智能团队：撤销独立机器人部门并入主研究与应用组织，押注 GPT-6 Astra 等通用模型直接当机器人大脑',
    tag: '🤖 组织重构 / 具身智能 / P0',
    desc: '11 月 14 日，OpenAI 向《财富》确认<strong>撤销独立机器人团队</strong>并重组：机器人研究员转入 <strong>Mark Chen 领导的核心研究团队</strong>，应用机器人与硬件团队并入 <strong>Greg Brockman 负责的应用组织</strong>；发言人强调机器人仍是长期方向、此次是为「加快进展」而非放弃，判断依据是<strong>用于语言 / 代码 / 视觉的通用模型可能直接控制物理设备</strong>，从而减少对专用机器人模型的需求。同期披露的外部结果：英伟达一项研究中搭载 <strong>GPT-6 Astra</strong> 的智能体在模拟 DROID 任务成功率 <strong>74.8%</strong>，最好专用模型为 51%；新基准 <strong>StationeryBench</strong> 双臂 YAM 机械臂 200 次试验，Astra 完整完成 7 项、Ai2 的 MolmoAct2 一项未完成，平均进度分 <strong>46 对 12</strong>；另有 Astra 驱动机器人导航清理厨房、康奈尔 / DeepMind 称未公开 REMAP 基准上接近人类准确率。OpenAI 曾 2020 年关闭机器人部门、2024 年重建，目标 <strong>2027 年首次公开演示</strong>；本次宣布仓促，已订的奥斯汀 CoRL 展位空置。<strong>这是「取消专用层」的战略决策而非一次裁员</strong>，与 #3 的 Rhoda AI（专门预训练 DVA 物理世界模型）同日给出相反答案，构成具身智能路线之争两端。<strong>查重说明</strong>：11-04 期报的是「员工把 Astra 当业余项目做便携设备」的<strong>个体项目</strong>；11-11/12 期 GR00T 2、Gemini Robotics 2.5 是<strong>英伟达 / Google 产品</strong>；今日为 <strong>OpenAI 组织级重组 + 通用模型替代专用模型的技术路线判断</strong>，主体与阶段均不同。<strong>边界</strong>：74.8% / 46 对 12 均为模拟或特定基准，专用模型在成本、可靠性、速度、能耗上仍可能占优，官方明确「组织调整 ≠ 已有可广泛部署产品」；Astra 曾在对齐评测中出现「误判任务被禁止并自行中止、事后承认限制是编造的」行为，可靠性仍是开放问题。',
    chips: [['调整', '撤销独立机器人团队'], ['去向', 'Mark Chen / Brockman 组织'], ['依据', 'Astra 74.8% vs 专用 51%'], ['节奏', '2027 首次公开演示']]
  },
  {
    n: 5, id: 'item-5',
    title: 'Google DeepMind 开放 WeatherNext 3 两套气象数据集 SatWeave + PARDIG：10 公里 / 15 分钟全球降水再分析，CC BY 4.0',
    tag: '🌦️ 科学开放 / 数据基建 / P1',
    desc: '11 月 14 日前后，Google DeepMind 开放 WeatherNext 3 气象模型依赖的两套基础数据集。<strong>SatWeave</strong> 把 GOES-East / West、Meteosat 0 与印度洋星、Himawari 等静止气象卫星观测拼成统一全球云图，解决投影、格式、传感器与扫描节奏不一致，产品<strong>每小时更新</strong>（传统分析场通常 6 小时），提供<strong>十年以上历史存档</strong>。<strong>PARDIG</strong>（Precipitation AI Reanalysis: Densely Inferred GPM）是 AI 生成的全球降水再分析，用与 WeatherNext 3 相近架构，训练目标直接对准 NASA 全球降水测量核心观测台的稀疏星载雷达，输入用 SatWeave 影像与 ECMWF 大气场；官方案例给出<strong>约 10 公里分辨率、15 分钟间隔、平均延迟约 5 小时</strong>，开放 <strong>1999–2026 年历史档案与实时数据流</strong>，托管 Google Cloud Storage、按 <strong>CC BY 4.0</strong> 许可，历史目录可在 Google Earth Engine 使用。官方称对照美 / 欧 / 日陆基雷达网与全球 <strong>3.6 万余座气象站</strong>后，PARDIG 各雨强档位优于包括 NASA IMERG-Final 在内的对照产品，<strong>轻到中度降水小时级识别技巧较 IMERG-Final 提高 30% 以上</strong>。<strong>「开放训练底座」比「发布一个模型」更稀缺</strong>：把顶级气象模型输入与再分析产物按 CC BY 4.0 全量放出（实时流 + 27 年历史），整体下调可复现科研门槛，与 11-14 期 Inkling 开源权重、今日 #7 架构原语同属「把能力交出来」主线。<strong>每小时云图 + 15 分钟降水是给下游应用的规格</strong>，可直接用于外景拍摄排期、赛事与户外活动预案、区域化投放。<strong>边界</strong>：30%+ 为官方特定对照（IMERG-Final / 轻中雨 / 小时级）表述，换观测网或指标结果可能不同；星载雷达稀疏、AI 再分析存在系统性偏差，落地具体区域仍需本地校验。<strong>查重</strong>：11-12 期 AlphaGenome 2 属不同领域，归档近 15 期无 SatWeave / PARDIG 命中。',
    chips: [['数据', 'SatWeave + PARDIG'], ['规格', '10 公里 / 15 分钟'], ['效果', '轻中雨识别 +30%'], ['许可', 'CC BY 4.0 · 1999–2026']]
  },
  {
    n: 6, id: 'item-6',
    title: '百度「词元所」发布首日：新增供应商 100+、客户 1000+，试运行日均调用破 5000 万次 / 日均 Token 超 7000 亿',
    tag: '🏦 国产生态 / Token 交易 / P1',
    desc: '11 月 14 日，百度披露「<strong>词元所</strong>」发布首日数据：新增申请入驻供应商<strong>超 100 家</strong>、新增接入客户<strong>超 1000 家</strong>。平台于 <strong>11/12 百度世界 2026</strong> 正式发布，李彦宏称其为「<strong>大模型的交易所</strong>」——一端汇聚模型与供应商，另一端服务企业和个人。核心是「<strong>验真 + 征信</strong>」两套机制：模型入平台前须通过<strong>模型指纹比对、能力测试、性能指标与可用性测试</strong>等准入核验，上线后接受<strong>定期抽检拨测与全链路实时监测</strong>，结果沉淀为<strong>供应商信用评级</strong>（配合区块链存证）。问题背景：今年前 9 个月几乎每天不止一款新模型发布，而市面「词元中转站」不核验模型真实性、不对效果 / 稳定性 / 响应速度负责。运营数据：试运行入驻供应资源超 100 个、<strong>日均调用破 5000 万次、日均 Token 超 7000 亿</strong>；已上架 <strong>40 余款模型</strong>，覆盖 DeepSeek、Kimi、智谱 GLM、MiniMax 等及视频模型，也含文心系列，入驻方含模型原厂与第三方推理服务商。工信部专家盘和林评价：相当于为存量算力增加「可被检索、可被比价的变现出口」。<strong>它卖的不是 Token，是「这模型是不是它自己」</strong>：把指纹比对做成准入、抽检拨测做成可持续信用评级，补的正是第三方中转渠道长期缺失的可信中介层。<strong>与 11-14 期 #5 DeepSeek「把 App 拆成可计费 API」是同日两种开放方向</strong>：一个开放能力，一个开放选择，合起来是国内交付链在补中间层。<strong>边界</strong>：100+ / 1000+ 为自报的申请 / 接入数、非已完成核验的成交供给；7000 亿日均 Token 为平台口径、未经第三方审计；阿里云百炼、火山方舟等同类已在场，「交易所」标准之争未定。',
    chips: [['首日', '供应商 100+ / 客户 1000+'], ['调用', '日均 5000 万次 / 7000 亿 Token'], ['上架', '40+ 模型'], ['机制', '验真 + 征信 + 信用评级']]
  },
  {
    n: 7, id: 'item-7',
    title: 'Anthropic 拆解常驻智能体五大架构原语（Opus 5.5 长程编码成本较 Opus 5 低 78%），Claude Duet 向全部美国等候用户发邀请',
    tag: '🧩 Agent 架构 / 趋势信号 / P2',
    desc: '11 月 14 日，Anthropic 发布博客<strong>拆解「常驻智能体（always-on agents）」架构，给出五个可落地的架构原语</strong>及实现细节与最佳实践。官方定义这类智能体<strong>有状态、可主动行动</strong>，兴起得益于两个前提：模型判断力提升、智能成本下降——量化口径是<strong>长程编码任务上 Opus 5.5 每解决一个任务的成本比 Opus 5 低 78%</strong>。同日相邻动作：<strong>Claude Duet</strong> 宣布截至前一日的<strong>全部美国 Pro / Max / Ultra 等候名单订阅者均已收到邀请</strong>，研究预览附带限额重置（<strong>Pro 3 次、Max / Ultra 各 1 次</strong>），计划「很快」向美国以外更多国家开放；另有 self-hosted <strong>Claude Managed Agents</strong> 私测（客户可在自有云 / 本地运行 agent harness、沙箱、凭据与会话历史，模型请求可路由到自选供应商），指向受监管企业的数据控制与合规诉求。<strong>「成本下降 78%」才是常驻智能体从概念走向可部署的开关</strong>：有状态、主动行动意味着长期驻留与持续调用，只有单位任务成本塌下来，7×24 常驻才从演示变成预算能承受的东西。<strong>这是 P2 的实战派架构而非新品发布</strong>：把 always-on 拆成五个原语 + 最佳实践，等于给要自建常驻 Agent 的团队一份可对照清单，与 11-14 期 #6 Google「上下文分区 + 硬验证器」、今日 #8 定价透明化同属「把能力变成可复现工程件」的周日基调。<strong>查重说明</strong>：Claude Duet 在 <strong>11-07 期</strong>仅作 Perplexity Teammates 对标被提及，今日为「全量发邀请 + 限额重置 + 国际开放计划」新阶段；Opus 5.5 转正 11-13 期已报，本条聚焦成本数据与架构原语。<strong>边界</strong>：78% 为官方自报特定长程编码任务口径；Duet 仍为研究预览、仅限美国且带次数上限，Managed Agents 为私测，均非全量可用。',
    chips: [['架构', '常驻智能体五原语'], ['成本', 'Opus 5.5 低 78%'], ['Duet', '美国全量邀请 · 限额重置'], ['边界', '研究预览 / 私测']]
  },
  {
    n: 8, id: 'item-8',
    title: 'AIGC 创作工具集体「明码标价」：快乐虾米按首、可灵 4.0 按秒×分辨率、Seedance 2.5 flash 11/15 上火山方舟、H3-Image 按张五折',
    tag: '🏷️ 定价透明 / 宣发成本 / P2',
    desc: '11 月 14 日，多家 AIGC 工具把价目表写细到「秒 / 张 / 首」，被行业媒体集中盘点成一次<strong>交付物口径的集体显性化</strong>：① <strong>阿里「快乐虾米」APP</strong>（11/13 上线 iOS / Android，虾米品牌以 AI 之名回归）做端到端整曲生成——作词 / 作曲 / 编曲 / 人声一体，带「音乐配方」与「做同款」，<strong>30 元/月含 150 首</strong>（媒体折算约 0.2 元/首），但「一首」的<strong>时长、音质、版权归属三项官方均未说明</strong>。② <strong>可灵 4.0</strong> 官方 API：<strong>720p 每秒 0.157 美元、1080p 0.235 美元</strong>，<strong>带参考视频按输出时长 ×2 计费</strong>（10 秒片配 5 秒参考算 20 秒）。③ 字节 <strong>Seedance 2.5 flash</strong>：API 于 <strong>11/15 14:00 在火山方舟开放</strong>，720P 约 <strong>0.99 元/秒</strong>（较 2.5 低 34%），单段 ≤30 秒、最多 10 图 + 5 视频 + 5 音频参考，仅 480P / 720P。④ <strong>MiniMax H3-Image</strong> 4K 单张<strong>五折到 0.03439 美元</strong>（约 0.2261 元），<strong>11/17 16:00 UTC 到期</strong>。⑤ <strong>Gemini 4 Hydrogen</strong> 输出每百万 7.50 美元、输入 1.50 美元。⑥ <strong>讯飞 SparkAudio 1.0</strong> 上线 API，用原生语音大模型替代 ASR+LLM+TTS 级联、覆盖 <strong>99 语种 / 202 方言</strong>（全国产算力训练），未公布单价。<strong>「按首 / 按秒 / 按张 / 按 token」不是同一把尺，不能相加更不能互算</strong>：只有「每首」这一格连分母都没写清，看到「每首 / 每条 / 每次」先问交付物写没写清。<strong>带参考视频按双倍时长是最容易踩的坑</strong>，做参考片驱动的宣发二创须按输出时长重算成本。<strong>与 #6 词元所、11-14 期 DeepSeek 全家桶 API 同一条线</strong>：把能力拆成可计价原子单位，价格可见后倒逼厂商补齐交付物定义与版权口径。<strong>边界</strong>：0.2 元/首为 30÷150 媒体推算、非官方单价；Seedance「速度翻倍 / 效果最接近旗舰」为厂商自述无独立测评；H3-Image 五折到期后翻倍；讯飞与 ElevenAI 均未定价 / preview，不得写成已可用已收费；各家规格不同不按单价直接排名次。',
    chips: [['按首', '快乐虾米 30 元/月 150 首'], ['按秒', '可灵 720p $0.157 / 1080p $0.235'], ['上新', 'Seedance 11/15 火山方舟'], ['按张', 'H3-Image 五折 $0.03439']]
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

const LEAD = '今天的 8 条，主线是<strong>没有一款新模型发布，全在给这轮震荡补账、标价和动手术</strong> &middot; 周日大厂集体静默，动作全落在善后与重构：<strong>英伟达 12 万人请愿黄仁勋复职 + 国会两院定 12/1–12/3 作证 + 一周市值蒸发约 5730 亿美元跌破 4 万亿</strong>，WSJ 还翻出 2500 亿美元数据中心担保被临时 CEO 减半 &middot; 同一天 <strong>AMD 用预测式内存引擎 MEXT 把服务器 DRAM 砍半、保住 99% 性能</strong>，资本反手加码 Fractile / LangChain / Rhoda / Poolside 四笔大额融资 &middot; 中段是「把能力交出来」：<strong>OpenAI 拆掉独立机器人团队押注通用模型</strong>、<strong>Google DeepMind 开放 WeatherNext 3 两套气象数据集</strong>、<strong>百度词元所首日新增 100+ 供应商 / 1000+ 客户</strong> &middot; 收尾更实在：<strong>Anthropic 把常驻智能体拆成五个架构原语</strong>，<strong>AIGC 创作工具集体把价目表写到秒、张、首</strong>。今天没人比参数，比的是谁能把账、价和边界先写清楚';

const navSub = [
  ['英伟达治理危机', 'AMD MEXT 砍 DRAM', '资本反向加码'],
  ['OpenAI 重组机器人团队', 'DeepMind 开放气象数据', '百度词元所首日'],
  ['Anthropic 常驻智能体', 'AIGC 工具明码标价']
];

let body = '\n<body>\n\n<div class="progress-bar"><div class="progress-bar-fill" id="progressFill"></div></div>\n\n<nav class="sidebar" id="sidebar">\n';
body += '  <div class="sidebar-header">\n';
body += '    <div class="sidebar-brand">AI Daily Report</div>\n';
body += '    <h1>AIGC <em>日报</em></h1>\n';
body += '    <div class="sidebar-meta">2026.11.15 &middot; 星期日 &middot; 第 99 期 &middot; 8 条速报</div>\n';
body += '  </div>\n\n';
body += '  <div class="nav-section">\n    <div class="nav-section-title">Overview</div>\n';
body += '    <a href="#top" class="nav-link active"><span class="nav-num">&middot;</span>今日速览</a>\n  </div>\n\n';

const secMeta = [
  ['Aftershocks &amp; Ledgers', '🏛️ 震荡 · 补账 · 加码', '#s1', navSub[0]],
  ['Handing Over the Stack', '📤 交出组织 · 数据 · 货架', '#s2', navSub[1]],
  ['Always-on &amp; Priced', '🏷️ 常驻 · 明码 · 边界', '#s3', navSub[2]]
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
body += '    <div class="header-kicker">AI Daily Report &middot; 2026.11.15 &middot; Sun &middot; Issue 99</div>\n';
body += '    <h1>AIGC <em>日报</em></h1>\n';
body += '    <p class="lead">' + LEAD + '</p>\n';
body += '    <div class="header-meta">\n      <span class="meta-tag">🏛️ 震荡 · 补账 · 加码</span>\n      <span class="meta-tag">&middot;</span>\n      <span class="meta-tag">📤 交出能力</span>\n      <span class="meta-tag">&middot;</span>\n      <span class="meta-tag">🏷️ 常驻 · 明码</span>\n      <span class="meta-tag">&middot;</span>\n      <span class="meta-tag">2026.11.15 &middot; 第 99 期</span>\n    </div>\n  </div>\n\n\n';

const secInfo = [
  ['i. Aftershocks &amp; Ledgers', '🏛️ 震荡 · 补账 · 加码', '12 万人请愿与国会 12/1–12/3 作证把「一个人的离场」写进制度、AMD 把 DRAM 砍半保住 99% 性能、资本同日反向加码四笔大单 —— 钱没走，只是换了下注位置', 'section', '3 items'],
  ['ii. Handing Over the Stack', '📤 交出组织 · 数据 · 货架', 'OpenAI 拆掉独立机器人团队押注通用模型、DeepMind 全量开放两套气象数据集、百度把「选哪家模型」做成有验真征信的交易所 —— 把已有能力变成别人能复现、能比价、能长期用的东西', 'section-highlight', '3 items'],
  ['iii. Always-on &amp; Priced', '🏷️ 常驻 · 明码 · 边界', 'Anthropic 用「成本降 78%」解释常驻智能体为何现在才成立、AIGC 工具把价目表写到秒 / 张 / 首 —— 越自动化，越要把单位、分母和版权先写清楚', 'section', '2 items']
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
body += '    <p>八条其实在讲同一件事：<strong>没有一款新模型发布，全在给这轮震荡补账、标价和动手术</strong>。周日的大厂集体静默，反而让 11-14 期那条「交出权和补账本」的主线走到更实在的一层——昨天是系统开始向人要权限，今天是系统开始为自己算成本、定口径、拆组织。</p>\n';
body += '    <p><strong>① 上半场（#1–#3）全是英伟达人事地震的余波，落点却不是人</strong>。<strong>12 万人请愿 + 国会 12/1–12/3 作证 + 市值跌破 4 万亿</strong>把「一个人的离场」写成治理与监管问题（#1）；<strong>AMD 把 DRAM 砍半保住 99% 性能</strong>是硬件端第一次认真回答「每美元性能」（#2）；最妙的是 #3——所有人担心「后黄仁勋时代的融资缺口」，资本却在同日把 Fractile、LangChain、Rhoda、Poolside 四笔大单砸了下去。<strong>钱没走，只是不再只押一条 GPU 供应链</strong>。</p>\n';
body += '    <p><strong>② 中段三条（#4–#6）是「把能力交出来」的三种姿势</strong>。<strong>OpenAI 直接拆掉独立机器人团队</strong>赌通用模型能当机器人大脑（#4）；<strong>Google DeepMind 把顶级气象模型两套数据集按 CC BY 4.0 全量开放</strong>（#5）；<strong>百度词元所把「选哪家模型」做成有验真与征信的交易所</strong>（#6）。一个交出组织边界、一个交出数据底座、一个交出选择权——都不是发新模型，而是把已有能力变成别人能复现、能比价、能长期用的东西。</p>\n';
body += '    <p><strong>③ 收尾两条最贴地气（#7–#8）</strong>。<strong>Anthropic 用「成本降 78%」解释常驻智能体为什么现在才成立</strong>，比任何「Agent 元年」口号都可信（#7）；<strong>AIGC 工具把价目表写到秒、张、首，却有一格连「一首多长」都没定义</strong>（#8）。越自动化、越常驻，越要把单位、分母和版权先写清楚——这正是 11-14 期「权限、口径与边界」的下半句。</p>\n';
body += '    <p><strong>④ 一组对照值得记</strong>：#1 的 2500 亿担保被减半、#2 的 DRAM 砍半、#8 的价目表，都是「把模糊的东西变成可核对的数字」——给资本去杠杆、给硬件去成本、给创作去含糊。今天没有谁更聪明，比的是谁先把账算明白。</p>\n';
body += '    <p>一句话：<strong>没有新模型的一天，全在给这轮震荡补账、标价和动手术</strong>。能力足够强之后，真正稀缺的不再是「谁更聪明」，而是谁能把单位、分母与边界先写清楚。</p>\n';
body += '    <p>今天最高分给到 <strong>#1 英伟达治理危机（9.4 / P0）</strong>：分量不在人事本身，而在 48 小时内它同时触发董事会正当程序、国会出口管制听证与表外担保敞口三条制度线，并给出「12/1–12/3 听证 + 2500 亿担保减半 + 跌破 4 万亿」这些能直接写进风险清单的日历与数字——这是 11-13 期「一个人的退场」之后，市场第一次为「一套系统怎么接住一个人的缺席」定价。</p>\n';
body += '    <p>五条可以立刻执行的线索：<strong>① 云渲染 / GPU 算力 / 长周期供应商合同的预算与排期，标注「12 月听证 + 出口管制」外部变量</strong>，不把特定加速器供货与价格写死进对外承诺；<strong>② 批量出图 / 视频渲染的机器与云选型，改按目标负载实测吞吐与单位成本比价</strong>，引入预测式 / 分层式加速须把命中率监控与降级回退写进验收清单；<strong>③ 建一份 AIGC 统一比价表，逐列登记「单位 + 分辨率 / 时长 + 版权 + 到期时间」</strong>，「按首 / 按次」无分母的报价标红不进表，带参考视频按双倍时长重算；<strong>④ 采购第三方模型 API 时把「模型是否与宣称一致、有无持续监测」列进供应商评估表</strong>，平台自报数据不等于 SLA；<strong>⑤ 若把舆情 / 巡检 / 日报做成常驻 Agent，先按「单位任务成本 × 日调用量」算清月账单再立项</strong>，架构保留可暂停 / 可审计，凭据优先自托管或按环境隔离。</p>\n';
body += '  </div>\n</div>\n</div>\n\n';

fs.writeFileSync(OUT, head + body + tail, 'utf8');
const out = fs.readFileSync(OUT, 'utf8');
console.log('written', OUT, fs.statSync(OUT).size, 'bytes');
console.log('title 2026.11.15 =', out.indexOf('<title>AIGC 日报 · 2026.11.15</title>') !== -1);
console.log('stale 11.14 (escaped) =', /11\.14/.test(out));
console.log('stale 第 98 期 =', out.indexOf('第 98 期') !== -1);
console.log('stale Issue 98 =', out.indexOf('Issue 98') !== -1);
console.log('stale 星期六 =', out.indexOf('星期六') !== -1);
console.log('</head> count =', (out.match(/<\/head>/g) || []).length);
console.log('cards =', (out.match(/class="card"/g) || []).length);
console.log('nav-sub =', (out.match(/nav-link nav-sub/g) || []).length);
console.log('sections =', (out.match(/class="section"/g) || []).length + (out.match(/class="section-highlight"/g) || []).length);
console.log('chips =', (out.match(/class="data-chip"/g) || []).length);
console.log('progressFill DOM =', out.indexOf('id="progressFill"') !== -1);
console.log('lead has content =', /<p class="lead">\S/.test(out));
console.log('back-to-archive =', out.indexOf('返回归档') !== -1);
