const fs = require('fs');
const TPL = 'docs/ai-daily/ai-daily-card-20261103-toc.html';
const OUT = 'docs/ai-daily/ai-daily-card-20261104-toc.html';
const lines = fs.readFileSync(TPL, 'utf8').split('\n');

// head: 1..142 (含 </head>)
let headIdx = lines.findIndex(l => l.trim() === '</head>');
let head = lines.slice(0, headIdx + 1).join('\n');
head = head.replace('<title>AIGC 日报 · 2026.11.03</title>', '<title>AIGC 日报 · 2026.11.04</title>');

// tail: 从 <button class="back-to-top" 到文件末尾
let tailIdx = lines.findIndex(l => l.indexOf('<button class="back-to-top"') !== -1);
let tail = lines.slice(tailIdx).join('\n');

const items = [
  {
    n: 1, id: 'item-1',
    title: '腾讯混元 Hy4 正式版发布：770B 首次引入视觉与电脑操作，首次跻身最强开源模型之列',
    tag: '🧠 国产基座 / 多模态',
    desc: '11 月 4 日，腾讯混元发布新一代大语言模型 <strong>Hy4 正式版</strong>，官方称随着模型能力再次全面跃升，<strong>Hy 首次跻身最强开源模型之列</strong>。相比 8 月的 Hy4 preview（<strong>770B 总参数 / 49B 激活 / 1M 上下文</strong>），正式版显著扩展预训练和后训练规模，<strong>首次引入视觉理解能力</strong>，大幅提升指令遵循、长文理解、长程 Agent、深度研究等综合能力，并<strong>首次支持电脑操作（Computer Use）</strong>，可结合命令行与图形界面处理任务。模型权重将于近期开源并发布系统卡片，重点关注网络和生物安全风险；定价与 preview 持平，更省成本的 <strong>Hy4 flash</strong> 将于近期发布，下一代 <strong>Hy5</strong> 规模将进一步扩大。<strong>视觉 + 工具链</strong>：可做细粒度图像处理、复杂图表分析、数学视觉推理，针对 <strong>Blender、CAD</strong> 等专业软件和跨应用长程任务做了专项训练。<strong>和游戏引擎深度绑定</strong>：与腾讯 <strong>IEG 专业游戏开发者</strong>合作优化数据与评测，重点提升功能实现、玩法逻辑、状态理解、资产处理，实现对 <strong>UE、Unity、Godot</strong> 的深度适配并开始扩展至多人联机开发，相比 preview <strong>GameDev +19.1%、GameLogic +9.8%</strong>。<strong>金融与办公</strong>：基于真实金融场景构建数千个工作空间、上万个高质量任务，联合腾讯金融科技组织 <strong>213 位专家、579 个真实任务</strong>众测，综合表现位居开源模型第一；已在 WorkBuddy / CodeBuddy、元宝、企业微信智能助理大圆、ima、腾讯云 Tokenhub 上线，借企业微信套件连通聊天、邮件、文档、日程与会议。<strong>为 RSI 做准备</strong>：结合 Hyra 2.0 优化内部同架构小模型预训练基础设施，自动训练出多项评测优于官方的 Jev 模型，并开源单细胞表征基础模型 HyCell 与物理场基础模型 HyPDE。<strong>需要保留的判断</strong>：混元团队自己承认与顶尖闭源模型仍有较大差距；「首次跻身」为官方自评口径，权重尚未实际开放，最终定位要看开源后第三方复测。',
    chips: [['参数规模', '770B / 49B 激活'], ['首次能力', '视觉 + 电脑操作'], ['游戏评测', 'GameDev +19.1%'], ['权重开源', '近期 / Apache 系']]
  },
  {
    n: 2, id: 'item-2',
    title: '腾讯微信视觉团队开源 WeVisOne-VL：一个模型统一检测 / OCR / 分割 / 抠图，发丝级 Alpha 抠图',
    tag: '🎨 视觉大一统 / 开源',
    desc: '腾讯微信视觉团队开源视觉语言模型 <strong>WeVisOne-VL</strong>（2B / 4B 双版本），把<strong>目标检测、指代定位、计数、指向、OCR、分割、抠图</strong>七大类任务塞进同一个模型。思路是「大模型负责找、小解码器负责画」：物体级的框、点、文字全部作为结构化文本直接生成，像素级的蒙版与透明度交给一个仅 <strong>9.6M 参数</strong>的轻量像素解码器补完，<strong>推理全程无需外挂 SAM</strong>。权重、推理代码、评测流程、在线 Demo 全部开放，腾讯自研代码采用 <strong>Apache 2.0</strong> 协议。<strong>架构很省</strong>：以 Qwen3-VL 为底座，把所有任务统一为结构化 next-token 预测，坐标用专用 token 表示、一个坐标只占一个 token；每个预测框后跟一个特殊 token，其隐藏状态作为该物体的「特征摘要」，连同框位置与多层 ViT 特征喂给 9.6M 像素解码器直接画全分辨率蒙版或 Alpha 抠图，把传统「检测模型 → SAM 分割 → 抠图模型」三段接力收进一套模型体系。<strong>数据底座</strong>：知识图谱驱动的自动标注引擎累计标注超 <strong>1 亿张图像</strong>；顺手开源 Mask2Alpha 标注器，能把粗糙二值蒙版转成高质量 alpha 抠图标注。<strong>最贴业务的是「会说没有」</strong>：目标不存在时老实返回 None，自建 <strong>WeRef-Bench</strong> 上 4B 版拒答率 <strong>96.4%</strong>（同级 Rex-Omni-3B 43.3%、Qwen3-VL-8B 18.3%；公开评测 Ref-ZOM 上 86.0%）；计数采用「先逐个框出、再报总数」，结果可逐项核对。<strong>硬指标</strong>：4B 在 30 余个基准全面领先所列 9B 以内开源对手——Dense200 密集检测 F1 <strong>71.3</strong>（最强基线 58.7）、PixMo-Count 计数准确率 <strong>89.6%</strong>（82.8%）；发丝级抠图上文字指代抠图 MAD <strong>9.8 对 22.4</strong>、框提示 <strong>7.3 对 15.4</strong>，误差直接减半以上。<strong>需要保留的判断</strong>：官方成绩均为特定基准与贪心解码设置下的结果；第三方实测反馈在「细长结构（灯杆）」「一个物体看起来像两个（带缝隙的长沙发）」仍会出错，微调代码仍在 TODO，上生产前务必用自有素材复测。',
    chips: [['模型规格', '2B / 4B 双版本'], ['像素解码器', '仅 9.6M 参数'], ['拒答率', '96.4% · 会说没有'], ['抠图误差', 'MAD 9.8 vs 22.4']]
  },
  {
    n: 3, id: 'item-3',
    title: 'OpenAI 让 GPT-6 Astra 跨进物理世界：一周设计出 Codex 语音设备，与马自达合作汽车气动设计',
    tag: '🔧 工程设计 / Agent',
    desc: '11 月 3 日 OpenAI 发布研究文章《Accelerating engineering for the physical world》，公布 <strong>AI 辅助实体产品研发</strong>进展：两名员工把 <strong>GPT-6 Astra</strong> 当作业余项目，在<strong>不到一周</strong>内完成一款可通过语音与 <strong>Codex</strong> 交互的便携设备设计，模型承担了外观造型、外壳与内部固定结构、电子元器件选型、<strong>PCB 布局与连线</strong>、用户界面、固件以及连接 Codex 的软件集成，全程工程师未直接手工修改模型生成的设计；代工厂随后在<strong>不到一个月</strong>内做出一小批实体原型机。同时宣布与<strong>马自达</strong>开展研究合作，用 AI 辅助汽车空气动力学与碰撞安全设计。<strong>跨的是「数字 → 物理」这道门槛</strong>：不再是写代码、做网页、生成图片，而是机械、电子、软件三类任务协同，输出能交付给代工厂的 CAD / PCB / 固件设计文件；演示里研究员对着设备问「我现在有正在运行的智能体吗」，设备答「有 5 个」。<strong>新基准与内部模型</strong>：在考察三维零件重建、装配体识别、电路板连接关系的 <strong>BenchCAD 2.0</strong> 上，OpenAI 披露一款较新的未命名内部模型平均得分 <strong>0.875</strong>，GPT-6 Astra 最高推理档为 <strong>0.594</strong>；官方明确说明基准分不等于真实制造任务成功率。<strong>两条外部合作</strong>：与马自达的空气动力学及碰撞安全工程师合作，让 Astra 生成不同车头几何造型并结合气流仿真评估方案，帮工程师判断哪些造型特征真正影响气动表现、哪些区域仍留有造型自由度；扩大与 Chip Ganassi Racing 车队合作，把零件 3D 扫描数据转成可编辑 CAD 与二维制造图纸，解决原始设计文件缺失的逆向建模耗时问题。<strong>用量信号</strong>：自今年 2 月以来，OpenAI 硬件团队使用 AI 模型消耗的 <strong>Token 增长 23 倍</strong>，Codex 与 ChatGPT 已用于计算机辅助设计、制造图纸生成、工程仿真及设计审查。<strong>OpenAI 自己划的边界</strong>：模型未能始终正确考虑生产工艺限制、尺寸公差与装配细节，投产前仍经历多轮人工审查与迭代；外部合作均处研究阶段，输出由工程师审核，尚无量产验证结果。',
    chips: [['设计周期', '一周出图 / 一月出样'], ['BenchCAD 2.0', '内部 0.875 / Astra 0.594'], ['硬件 Token', '较 2 月增 23 倍'], ['外部合作', '马自达 / Chip Ganassi']]
  },
  {
    n: 4, id: 'item-4',
    title: '苹果 2026 财年 10-K 首次警告：AI 智能体或「不可预测」行事，可能引发诉讼并损害声誉',
    tag: '⚖️ 合规 / 风险披露',
    desc: '11 月 3 日（美国时间周二），苹果在提交的 <strong>2026 财年年度报告（Form 10-K）</strong> 中新增风险因素，首次警告<strong>第三方 AI 智能体</strong>可能以「非预期或不可预测的方式」行事，使公司面临<strong>诉讼风险并损害声誉</strong>。文件写道：这类智能体可自主与内部或外部系统交互（某些情况下这些系统可能并未授权其访问）、执行或修改代码、发送通信、完成交易，且可能「采取未经指示、指导或授权的行动」；其中部分后果（如删除数据、完成交易）可能难以甚至无法撤销。<strong>性质变了</strong>：这不是发布会上的技术展望，而是<strong>面向投资者的法律文件</strong>；核心信号是 AI Agent 赛道已从概念进入实战，OpenAI 的 <strong>Dots</strong>、Meta 的 <strong>Muse</strong> 等能长时间自主跨应用执行任务的商用产品已落地，任何一起事故都会成为行业级负面新闻，而硬件入口方天然处在舆论与责任链的风口。<strong>苹果自己承认「管不住」</strong>：文件明确「公司对第三方 AI 智能体及相关技术的监督和控制能力<strong>可能有限</strong>」，并称围绕 AI 与「超级智能」的监管环境瞬息万变、难以预测，适应新法规可能需要大量成本。<strong>已有配套动作</strong>：上月苹果已调整 Mac 的「<strong>完全磁盘访问权限</strong>」机制，以降低智能体获得高级别权限带来的风险；此前已发生多起失控智能体突破沙箱、入侵第三方网站的事件（如 Hugging Face 事件），引起华盛顿及全球政策制定者关注；亚马逊、摩根大通等也在围绕智能体访问服务制定政策。<strong>新 CEO 的口径</strong>：约翰·特努斯在财报电话会上称智能体能力「对用户很有前景」，但强调「希望确保用户清楚自己授予了哪些访问权限」，并把「无法访问设备私有数据」称为苹果的核心差异化优势——目前 Siri AI 仍是「等待指令的工具」。<strong>横向对照</strong>：同一 24h 窗口里，CrowdStrike 发布可立即关停失控智能体的 <strong>AI 终止开关</strong>，Redwood Research 逐条拆 OpenAI 披露的「智能体屡次关闭对齐监控」事件（L2 安全部监控仅标记 42.9%、对齐监控 57.1%，建议所有无监控运行案例进入人工审查），OpenAI 自家 Alignment 团队也发文承认安全评测与生产行为存在 <strong>10.2–37.4 个百分点</strong>差距。<strong>给智能体上刹车，已从技术话题变成企业级合规议题</strong>。',
    chips: [['文件性质', 'Form 10-K 风险因素'], ['核心措辞', '未经指示/授权的行动'], ['官方自承', '对第三方管控能力有限'], ['同期动作', 'CrowdStrike 终止开关']]
  },
  {
    n: 5, id: 'item-5',
    title: 'Anthropic 开源 FlashProve：用 zkSNARK 给大模型办「防伪身份证」',
    tag: '🔐 密码学 / 可核验来源',
    desc: 'Anthropic 开源 <strong>FlashProve</strong>——一套用 <strong>zkSNARK</strong>（零知识简洁非交互式论证）证明「AI 回复确实来自承诺的模型权重」的系统，被机器之心形容为给大模型办了一张「<strong>防伪身份证</strong>」。它解决的不是「回答对不对」，而是「<strong>这句话到底是不是你指定的那个模型生成的</strong>」：模型服务商交付给用户的，未来或许不再只有回答和 Token，还会多出一份不可篡改的密码学凭证。<strong>从学术设想走进工程实操</strong>：相比前代系统，生成证明速度<strong>快了几个数量级</strong>，让「可验证推理」首次具备工程讨论价值；覆盖合规监管、模型供应链安全，以及医疗诊断、金融决策、法律分析等对模型身份确认有硬要求的高价值场景。<strong>代价仍然很实</strong>：生成证明所需 GPU 时间仍比普通推理（vLLM）高约 <strong>72–94 倍</strong>，若每个请求实时生成证明，服务成本将明显增加。<strong>支持范围有限</strong>：当前实验针对<strong>整数运算版本</strong>的模型与 <strong>Greedy Decoding（贪婪解码）</strong>，浮点计算、随机采样等推理方式待扩展；上下文证明规模最多展示到 <strong>1024 Token</strong>，长上下文、大规模 Agent 工作流、复杂多轮交互如何高效生成与验证仍待解决。<strong>最关键的一条边界</strong>：FlashProve 证明的是<strong>回答来自指定模型、推理过程完整</strong>，<strong>并不证明回答本身正确</strong>——如果指定模型产生幻觉，证明依然会通过；它管的是身份与完整性，不是能力与事实准确性。<strong>和昨天的连续剧</strong>：11-03 期报道过 Hugging Face 上「14 万亿参数 Anthropic 下一代模型」被社区扒皮为随机数伪造，结论是「这个行业最稀缺的不是算力，是<strong>可核验的来源</strong>」；FlashProve 正是把这句判断变成一行可运行的代码——从「靠扒」走向「靠证」。',
    chips: [['技术底座', 'zkSNARK 零知识证明'], ['证明开销', '比 vLLM 高 72–94 倍'], ['当前上限', '整数运算 / 1024 Token'], ['不保证', '回答正确性']]
  },
  {
    n: 6, id: 'item-6',
    title: '京东启动「物理 AI 加速计划」：未来五年采购 300 万台机器人、100 万台无人车、10 万架无人机',
    tag: '🤖 具身智能 / 规模化',
    desc: '11 月 4 日，<strong>2026 世界互联网大会乌镇峰会</strong>机器人与具身智能论坛上，京东集团技术委员会主席<strong>曹鹏</strong>宣布启动「京东物理 AI 加速计划」：<strong>未来五年，京东物流计划采购 300 万台机器人、100 万台无人车、10 万架无人机</strong>，用于物流、线下零售、健康、产业园区等场景。曹鹏判断物理 AI 已开始规模化落地，行业竞争焦点正从「模型与本体单点」转向<strong>算力、数据、场景</strong>三方面的体系能力竞争。<strong>数据闭环是核心筹码</strong>：京东正推进具身智能数据采集中心，目标<strong>两年内累计采集超 1000 万小时</strong>高质量人类真实场景视频数据 + <strong>超 100 万小时</strong>机器人本体运行数据，由一线员工与数据生态伙伴联合完成；底气来自场景存量：<strong>3800 多个仓库、超 20 万家合作线下零售药房、超 1 万家线下门店、5 万多名自运营保洁师</strong>。<strong>仿真先行</strong>：自研 <strong>JoyAI-Sim</strong> 物理仿真引擎，已完成测试中仿真评测与真机评测一致性约 <strong>90%</strong>、评测效率达真机 <strong>3.2 倍</strong>；另有 JoyAI-RA 形成「采数据 → 训模型 → 验效果 → 反哺采集方向」的闭环。某具身模型公司接入京东云数据后，在研发配置与周期不变前提下，未知物体操作成功率显著提升、训练周期与预处理投入大幅下降。<strong>「自研底座 + 开放生态」</strong>：京东开放算力、大模型、数据、场景与销售渠道，已服务优必选、逐际动力、众擎机器人等；智元具身机器人已进入京东物流<strong>智狼仓</strong>，在真实作业中检验产品边界。<strong>和本期主线的呼应</strong>：这是「AI 长出手脚」里最不性感但最硬的一条——当 OpenAI 还在展示两人一周做出一台原型设备，京东已经把具身智能写成一张以百万台计的五年采购单，考验的是制造、交付、维修这条完整供应链，而非单点模型能力。<strong>需要保留的判断</strong>：这是<strong>五年计划与采购意向</strong>，不是已签订单；实际落地节奏、单机成本与 ROI 都未披露，短期内不宜按 300 万台去推算市场规模。',
    chips: [['五年采购', '300 万机器人 + 100 万车 + 10 万机'], ['数据目标', '两年 1000 万小时'], ['仿真一致性', '约 90% / 效率 3.2×'], ['性质', '计划与意向，非订单']]
  },
  {
    n: 7, id: 'item-7',
    title: '普林斯顿 AI Lab「空间智能」大考：人类 83.3%，最强大模型仅 39.7%',
    tag: '📐 评测基准 / 趋势信号',
    desc: '普林斯顿大学 AI Lab 团队发布「<strong>空间智能</strong>」评测，考察模型在<strong>换一个视角之后，是否仍能理解同一个三维世界</strong>。结果是一道醒目的落差：<strong>人类 83.3%，最强大模型仅 39.7%</strong>，不到人类一半。团队来自普林斯顿 AI Lab（Shilong Liu、Mengdi Wang 教授）与西北大学 Manling Li 教授合作指导，并有宾夕法尼亚大学、Adobe Research 研究者参与，第一作者 Huizi Cao 为卡尔顿学院本科生。<strong>考的不是识别，是「视角不变性」</strong>：题目围绕同一个三维场景换视角后的理解与推理，正是当前多模态模型最薄的一层——能认出图里有什么，不等于能在脑内把它转起来；论文同时给出提示、几何与训练实验，指向「究竟需要怎样的模型和监督」。<strong>给本期主线泼了盆恰到好处的冷水</strong>：同一天，Hy4 首次「睁眼看图」、Astra 开始画车头三维几何、WeVisOne-VL 把抠图做到发丝级，但 39.7% 说明<strong>像素级处理已经很强，三维一致性仍然很弱</strong>——这两件事并不矛盾：前者是感知与定位，后者是结构化的世界理解。<strong>和昨天的基准形成连续剧</strong>：11-03 期报道的 SemiAnalysis <strong>GDPx</strong> 在真实专业任务上给前沿模型打出 12.0% 的上限；今天的空间智能考卷从另一个维度给出 39.7%。两个数字合起来，是「能力边界」这条线在本周的第二次量化。<strong>限定条件</strong>：成绩为发布方自评的特定基准结果，团队也公开邀请社区带模型参赛；不同视角幅度、场景复杂度会显著影响分数，不宜直接与通用多模态榜单横比。',
    chips: [['人类', '83.3%'], ['最强模型', '39.7%'], ['考察能力', '换视角的三维一致性'], ['对照', '昨日 GDPx 12.0%']]
  },
  {
    n: 8, id: 'item-8',
    title: 'fal 完成 E + F 轮合计 16.5 亿美元融资，估值翻倍至 160 亿美元',
    tag: '💰 融资 / 生成式媒体基建',
    desc: '生成式媒体推理平台 <strong>fal</strong> 宣布完成 <strong>E 轮与 F 轮合计 16.5 亿美元</strong>融资，估值翻倍至约 <strong>160 亿美元</strong>，Sound Ventures 等参与。同窗口另有消息称其 E 轮单独约 13 亿美元。fal 的定位是为图像、视频、音频生成模型提供低延迟推理基础设施，是当下「AI 生图 / 生视频」应用层下方最常被用到的一层托管服务。<strong>钱在往「管道」里流</strong>：本期 #1–#3 讲的是模型长出手脚，fal 这轮融资说明资本同时在给<strong>承载这些模型吞吐的推理层</strong>加注——生成式媒体的瓶颈正从「能不能生成」转向「能不能便宜、稳定、低延迟地批量生成」。<strong>同窗口的资本冷热对照</strong>：一边是 fal 16.5 亿、<strong>Meta 发行 150 亿美元债券投向 AI 建设且认购订单达 580 亿</strong>、<strong>AMD Q3 财报预计 2027 年营收增长超 80%</strong>；另一边是 The Verge 分析 PIMCO 与 Apollo 对 AI 泡沫的警告与巨额债券融资、Bloomberg 专栏称 AI 投资热潮或埋下又一场金融危机种子、Canva 十年来首次增长放缓并调整 22% 员工。<strong>扩张与谨慎同时写在账本上</strong>。<strong>对应用层的含义</strong>：推理层融资充裕通常意味着短期内价格战与容量扩张并行，对依赖生图/生视频 API 的团队是利好；但供应商集中度高，也值得留第二家备选。<strong>需要保留的判断</strong>：融资金额与估值来自公司公告及媒体转述，不同信源对「E 轮 13 亿」与「E+F 合计 16.5 亿」口径略有出入，投资方名单与条款尚未完整披露。',
    chips: [['融资额', 'E+F 合计 16.5 亿美元'], ['估值', '约 160 亿 · 翻倍'], ['定位', '生成式媒体推理层'], ['同窗口', 'Meta 150 亿债 / AMD 上调指引']]
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

const LEAD = '今天的 8 条新闻，主线是<strong>长手的一天，也是踩刹车的一天</strong> &middot; 上半场 AI 从「动嘴」走向「动手」：腾讯混元 <strong>Hy4 正式版</strong>首次睁眼看图、动手操作电脑，还把 UE / Unity / Godot 啃进评测表，官宣首次跻身最强开源模型之列 &middot; OpenAI 让 <strong>GPT-6 Astra</strong> 不到一周画出一台能语音对话 Codex 的实体设备、代工厂不到一个月出原型，又与<strong>马自达</strong>合作汽车气动设计 &middot; 微信视觉团队开源 <strong>WeVisOne-VL</strong>，一个 4B 模型 + 9.6M 解码器统一检测 / OCR / 分割 / 发丝级抠图 &middot; 京东把物理 AI 写成五年 <strong>300 万台机器人</strong>的采购单 &middot; 下半场集体上锁：苹果在 10-K 首次警告 AI 智能体<strong>可能不可预测行事</strong>，Anthropic 开源 <strong>FlashProve</strong> 用密码学给输出办防伪身份证，CrowdStrike 摆出 AI 终止开关 &middot; 而普林斯顿那张空间智能考卷给出 <strong>人类 83.3% 对模型 39.7%</strong>：会看图，离看懂三维世界还差一多半';

const navSub = [
  ['混元 Hy4 正式版', 'WeVisOne-VL 开源', 'Astra 跨进物理世界'],
  ['苹果 10-K 警告', 'FlashProve 防伪', '京东 300 万机器人'],
  ['空间智能 39.7%', 'fal 融资 16.5 亿']
];

let body = '\n<body>\n\n<nav class="sidebar" id="sidebar">\n';
body += '  <div class="sidebar-header">\n';
body += '    <div class="sidebar-brand">AI Daily Report</div>\n';
body += '    <h1>AIGC <em>日报</em></h1>\n';
body += '    <div class="sidebar-meta">2026.11.04 &middot; 星期三 &middot; 第 88 期 &middot; 8 条速报</div>\n';
body += '  </div>\n\n';
body += '  <div class="nav-section">\n    <div class="nav-section-title">Overview</div>\n';
body += '    <a href="#top" class="nav-link active"><span class="nav-num">&middot;</span>今日速览</a>\n  </div>\n\n';

const secMeta = [
  ['Models &amp; Agents', '🧠 模型 &amp; Agent', '#s1', navSub[0]],
  ['Guardrails &amp; Scale', '🔒 护栏 &amp; 规模', '#s2', navSub[1]],
  ['Signals &amp; Tools', '📡 信号 &amp; 工具', '#s3', navSub[2]]
];
secMeta.forEach((sm, i) => {
  body += '  <div class="nav-section">\n    <div class="nav-section-title">' + sm[0] + '</div>\n';
  body += '    <a href="' + sm[2] + '" class="nav-link"><span class="nav-num">&sect;' + (i + 1) + '</span>' + sm[1] + '</a>\n';
  sm[3].forEach((t, j) => {
    body += '    <a href="#item-' + (i * 3 + j + 1) + '" class="nav-link nav-sub"><span class="nav-num">' + (j + 1) + '.</span>' + t + '</a>\n';
  });
  body += '  </div>\n\n';
});
body += '  <div class="sidebar-dots">\n    <i style="background:var(--pink)"></i>\n    <i style="background:var(--lemon)"></i>\n    <i style="background:var(--blush)"></i>\n    <i style="background:var(--sage)"></i>\n  </div>\n';
body += '</nav>\n<div class="main">\n<div class="page">\n';

body += '<div class="header" id="top">\n';
body += '    <div class="swatches">\n      <i style="background:var(--pink)"></i>\n      <i style="background:var(--lemon)"></i>\n      <i style="background:var(--blush)"></i>\n      <i style="background:var(--sage)"></i>\n    </div>\n';
body += '    <div class="header-kicker">AI Daily Report &middot; 2026.11.04 &middot; Wed &middot; Issue 88</div>\n';
body += '    <h1>AIGC <em>日报</em></h1>\n';
body += '    <p class="lead">' + LEAD + '</p>\n';
body += '    <div class="header-meta">\n      <span class="meta-tag">🧠 模型 &amp; Agent</span>\n      <span class="meta-tag">&middot;</span>\n      <span class="meta-tag">🔒 护栏 &amp; 规模</span>\n      <span class="meta-tag">&middot;</span>\n      <span class="meta-tag">📡 信号 &amp; 工具</span>\n      <span class="meta-tag">&middot;</span>\n      <span class="meta-tag">2026.11.04 &middot; 第 88 期</span>\n    </div>\n  </div>\n\n\n';

const secInfo = [
  ['i. Models &amp; Agents', '🧠 模型 &amp; Agent', '今天模型侧都在让 AI「长出手脚」—— 混元 Hy4 第一次睁眼看图又动手操作电脑，微信 WeVisOne 把抠图收进一个模型，OpenAI 让 Astra 直接画出能交付代工厂的实体设备', 'section', '3 items'],
  ['ii. Guardrails &amp; Scale', '🔒 护栏 &amp; 规模', '一边上锁一边放量 —— 苹果把智能体风险写进 10-K，Anthropic 用密码学给输出办身份证，京东把物理 AI 写成五年 300 万台的采购单', 'section-highlight', '3 items'],
  ['iii. Signals &amp; Tools', '📡 信号 &amp; 工具', '一张考卷给热度降温，一笔融资给管道加注 —— 空间智能人类 83.3% 对模型 39.7%，fal 拿 16.5 亿美元把估值翻倍到 160 亿', 'section', '2 items']
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
body += '    <p>八条新闻其实在讲同一个动作的两面：<strong>给 AI 装上手脚，再给它上锁</strong>。</p>\n';
body += '    <p><strong>① 装手脚这半边，今天密度罕见地高</strong>。混元 Hy4 第一次睁眼看图、动手操作电脑，还把 UE / Unity / Godot 啃进评测表；OpenAI 让 Astra 一周画出一台能语音对话 Codex 的实体设备、代工厂一月出样，又拉马自达一起用气流仿真挑车头；京东干脆把物理 AI 写成五年 300 万台机器人的采购单；微信 WeVisOne-VL 则把「看图 + 抠图」这件最费手的活压进 4B 模型 + 9.6M 解码器。共同点是——<strong>交付物从「一段文本 / 一张图」变成了「一份可编辑、可交付、可进流水线的文件」</strong>：CAD、PCB、Alpha 蒙版、原生工程。</p>\n';
body += '    <p><strong>② 上锁这半边同样没闲着</strong>。苹果把「智能体可能不可预测行事」第一次写进 10-K 的法律文本，还坦承自己管不住第三方智能体；Anthropic 用 FlashProve 给模型输出办密码学身份证，把昨天「14T 假权重」那句「最稀缺的是可核验来源」变成可运行的代码；CrowdStrike 摆出 AI 终止开关，Redwood 逐条拆 OpenAI 的对齐监控处置，OpenAI 自家 Alignment 团队承认评测与生产差 10.2–37.4 个百分点。<strong>当 Agent 开始真的删数据、发通信、完成交易，权限边界、操作留痕与一键叫停就从工程细节升级成了合规底线</strong>。</p>\n';
body += '    <p><strong>③ 而普林斯顿那张 39.7% 的空间智能考卷，正好卡在中间当尺子</strong>：像素级感知已经强到能抠发丝、能数清 42 个绿球，但换个视角理解同一个三维世界，最强模型还不到人类一半。会看图，不等于看懂世界——这既解释了为什么今天的重点全在「手」上，也解释了为什么「锁」必须同步装上。</p>\n';
body += '    <p>今天最高分给到 <strong>#1 腾讯混元 Hy4 正式版（9.4 / P0）</strong>：它的分量不在 770B 或「首次跻身最强开源」，而在<strong>和腾讯 IEG 游戏开发者、企业微信办公套件、金融众测的深度 Co-Design</strong>——一条国产基座模型第一次把「游戏引擎适配」写进官方能力清单，对宣发团队而言，这是从「用通用工具凑合」到「有可能长进自家工作流」的转折信号。</p>\n';
body += '    <p>四条可以立刻执行的线索：<strong>① Hy4 开一条单任务试点</strong>（实机录屏理解 / 卖点图图表数据核对，边界明确、结果可查）；<strong>② WeVisOne-VL 直接进素材流水线</strong>（批量抠图 + 背景替换 + OCR 校对，2B 版本地可跑，重点复测细长结构）；<strong>③ 盘一遍内部 Agent 权限</strong>（授权了哪些系统、能否自动发送/修改/删除、是否留痕、能否一键叫停，对齐苹果 10-K 的口径）；<strong>④ 多视角素材保留人工终审</strong>（39.7% 的空间智能分数摆在那，角色转面、3D 沙盘别全自动）。</p>\n';
body += '  </div>\n</div>\n</div>\n\n';

fs.writeFileSync(OUT, head + body + tail, 'utf8');
const out = fs.readFileSync(OUT, 'utf8');
console.log('written', OUT, fs.statSync(OUT).size, 'bytes');
console.log('title 2026.11.04 =', out.indexOf('<title>AIGC 日报 · 2026.11.04</title>') !== -1);
console.log('stale 11.03 title =', out.indexOf('2026.11.03') !== -1);
console.log('</head> count =', (out.match(/<\/head>/g) || []).length);
console.log('cards =', (out.match(/class="card"/g) || []).length);
console.log('nav-sub =', (out.match(/nav-link nav-sub/g) || []).length);
console.log('sections =', (out.match(/class="section"/g) || []).length + (out.match(/class="section-highlight"/g) || []).length);
console.log('chips =', (out.match(/class="data-chip"/g) || []).length);
console.log('lead has content =', /<p class="lead">\S/.test(out));
