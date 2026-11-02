const fs = require('fs');

const SRC = 'docs/ai-daily/ai-daily-card-20261101-toc.html';
const OUT = 'docs/ai-daily/ai-daily-card-20261102-toc.html';

const src = fs.readFileSync(SRC, 'utf8');
const lines = src.split(/\r?\n/);

const headEnd = lines.findIndex(l => l.trim() === '</head>');
const head = lines.slice(0, headEnd + 1).join('\n')
  .replace('<title>AIGC 日报 · 2026.11.01</title>', '<title>AIGC 日报 · 2026.11.02</title>');

const tailStart = lines.findIndex(l => l.includes('<button class="back-to-top"'));
const tail = lines.slice(tailStart).join('\n');

const items = [
  {
    n: 1,
    title: '美团龙猫发布 LongCat-2.5：1.6T 参数原生多模态，视觉压成离散 token 进主干',
    tag: '🖼️ 原生多模态',
    desc: `11 月 2 日，美团龙猫发布面向<strong>长程智能体任务</strong>的原生多模态模型 <strong>LongCat-2.5</strong>。模型<strong>总参数量 1.6 万亿</strong>，每个 token 激活约 <strong>480 亿</strong>参数。相比 LongCat-2.0，这一代在两件事上继续加码：<strong>一是原生视觉理解</strong>——把视觉信号表示成<strong>多层级离散 token</strong>，让主干模型用<strong>统一的 token 形式</strong>同时处理视觉与文本输入，而不是外挂一个视觉编码器再对齐；<strong>二是智能体编程</strong>——在长序列训练中加入更多<strong>长程轨迹数据</strong>，并通过大规模长程强化学习，提升复杂代码库开发、完整项目构建等任务的端到端工程能力。<strong>最有工程价值的一手是失败轨迹回收</strong>：官方把真实 Agent 的<strong>失败轨迹转化为可复现、可验证的训练任务</strong>，针对模型能力短板持续补充训练数据——这比单纯堆成功样本更贴近真实工作流。<strong>基础设施侧</strong>：优化国产算力上的长上下文训练与 <strong>W4A4 推理</strong>，通过训推数值一致性和长上下文 rollout 优化支撑大规模长程 RL 的高效运行。系列一贯的 1M 级原生上下文与 ScMoE 稀疏架构延续，LongCat 系列一直是「纯国产算力训万亿模型」这条路线的主要样本。<strong>落地节奏</strong>：longcat.chat 已开放在线体验与 API，Github 与 HuggingFace 版本<strong>即将上线</strong>。官方特别点名 <strong>Visual Coding</strong> 场景，并称支持创意设计和 3D 等任务。`,
    chips: [['总参数', '1.6 万亿'], ['每 token 激活', '约 480 亿'], ['视觉表示', '多层级离散 token'], ['推理优化', 'W4A4 · 国产算力']]
  },
  {
    n: 2,
    title: 'DeepSeek 新一轮融资扩大至 1055 亿元，估值 6155 亿，近 30 家产业方入局',
    tag: '💴 产业资本',
    desc: `据 The Information 爆料并经国内媒体跟进，<strong>DeepSeek 最新一轮融资规模扩大到 1055 亿元人民币</strong>，估值来到 <strong>6155 亿元</strong>。比金额更值得注意的是投资方名单：宁德时代、中国移动、中国电信、长鑫存储、中芯国际、vivo、美的、立讯精密、吉利、美团、小红书等<strong>近 30 家企业</strong>，横跨半导体、通信、消费电子、智能家电、先进制造与互联网应用——几乎覆盖了国内所有能和 AI 产生联系的产业门类。<strong>这不是纯财务投资</strong>：中芯国际代表晶圆代工、长鑫存储代表国产 HBM 与内存、移动与电信代表骨干网和 IDC。<strong>梁文锋今年 7 月内部会议上的判断正好解释了这份名单</strong>：英伟达芯片价格年年上涨，客户将被迫寻找国产替代方案，国产芯片已经能实现平替，硬件和生态都不存在问题，<strong>唯一的问题是产能不够</strong>——这轮融资正是在为国产芯片适配与定制化提前铺路。<strong>投资方同时也是客户和渠道</strong>：vivo、美的、吉利是终端，美团、小红书是应用场景，DeepSeek 拿到的是一条<strong>从算力到终端的完整通路</strong>。在英伟达高端芯片供应受限、价格持续上涨的背景下，中国头部模型公司开始<strong>用股权换供应链确定性</strong>，而不是单纯买卡。与同日可灵的 198 亿融资对照，一天之内中国 AI 两笔巨额交割，方向却不同——DeepSeek 往上游硬件走，可灵往下游内容和 IP 走。`,
    chips: [['融资规模', '1055 亿元'], ['估值', '6155 亿元'], ['投资方', '近 30 家产业方'], ['核心意图', '换供应链确定性']]
  },
  {
    n: 3,
    title: '可灵 AI 198 亿增资交割完成，BAT 罕见同台，估值 1228 亿反超母公司快手',
    tag: '🎬 AI 视频融资',
    desc: `10 月 30 日晚，快手在港交所公告旗下视频生成大模型<strong>可灵 AI</strong> 完成本轮增资交割，全体投资者实缴约 <strong>198.02 亿元</strong>（约 29.05 亿美元），为<strong>全球视频生成赛道单轮最大融资</strong>。股东名单里 <strong>阿里（杭州阿里云飞天，13.63 亿元 / 1.12%）、腾讯（上海启善 + Parallel Mars，合计约 6.13 亿元 / 1.12%）、百度（3.41 亿元 / 0.28%）三家同框</strong>——想让 BAT 签下同一份投资协议，在过去二十年的中国互联网几乎难以想象。同批进场的还有<strong>国家人工智能产业投资基金</strong>（14 亿元）、国产 GPU 厂商沐曦股份、金蝶软件，以及华策影视、芒果产业投资人等头部文娱方。<strong>估值倒挂是这条新闻最扎眼的地方</strong>：按 8 月底增资比例倒推，可灵投后估值约 <strong>1228 亿元</strong>；而 10 月 30 日快手市值已回落至 <strong>976 亿元</strong>。一个上半年营收 15 亿元、占母公司总收入 <strong>2.2%</strong>、仍在巨额亏损的子公司，估值是年营收 1427 亿元母公司的 <strong>1.26 倍</strong>。<strong>中东资本退出、产业资本补位</strong>：原定投资方 BlueFive 旗下 BFI MIDCO（未缴 8000 万美元）与达康兰五（转让 7.8 亿元份额）退出，空缺由金蝶、温州睿达、共青城君可、沐曦数智、宁波知春华燕承接。<strong>IPO 兜底条款</strong>：若北京可灵未能在 2031 年 10 月 30 日前完成 IPO，投资方可要求按<strong>年化 8% 单利</strong>回购；据报道已选定中金、高盛、瑞银担任承销商，计划最早 2027 年赴港上市、募资至少 10 亿美元。<strong>产品侧节奏</strong>：9 月 28 日发布 Kling 4.0（单次最长 30 秒、10-bit HDR、最多 10 个关键帧 + 15 个参考素材），10 月 15 日完整版面向所有用户，10 月 21 日开发者 API 开放，10 月 28 日 API 面向全球企业客户。全球 200 多个国家和地区、超 1 亿用户、超 5 万家企业，<strong>约七成收入来自海外</strong>——Sora 于 9 月 24 日关闭 API 后留下的真空市场被中国团队接住了。`,
    chips: [['实缴增资', '198.02 亿元'], ['投后估值', '约 1228 亿元'], ['母公司市值', '976 亿元'], ['回购条款', '未 IPO 年化 8%']]
  },
  {
    n: 4,
    title: '四巨头统一 robots.txt AI 训练退出信号：一行配置对 OpenAI/谷歌/微软/Anthropic 同时生效',
    tag: '🚦 数据治理',
    desc: `10 月 30 日，<strong>OpenAI、谷歌、微软与 Anthropic 同日宣布</strong>将采用一项统一的 AI 训练退出标准。该信号由 Anthropic 标准技术负责人 <strong>Kevin Kelley</strong> 以个人互联网草案《Machine-Readable Training Preference Signal》提交给 <strong>IETF</strong>，复用已有三十多年历史的 <strong>robots.txt</strong>（RFC 9309），引入一个 policy token 放在原本写爬虫名的地方：<strong>写一次，四家爬虫全认</strong>。<strong>落地时间表差得很远</strong>：<strong>Anthropic 已率先采纳</strong>，OpenAI 称「未来几个月内」落实，<strong>谷歌计划 2027 年初支持</strong>，<strong>微软 2027 年 2 月 1 日</strong>起生效，Meta 表态支持但未给时间表。<strong>最关键的区分是：管「用途」不管「抓取」</strong>。站点可以保持完全可被抓取、搜索排名不变，只是声明「别拿去改生成模型的权重」。微软明确说明训练与 grounding 偏好都不影响必应收录，并额外提供页面级控制，允许分别退出 AI 训练与 AI grounding（用内容支撑 AI 回答以减少幻觉）。<strong>三个容易被忽略的细节</strong>：一是写在通配规则下的配置<strong>不算数</strong>，必须显式写出 token；二是谷歌有个额外设计——站点只写统一 token 而未单独点名 Google-Extended 时，<strong>视同已拒绝 Google-Extended</strong>，而 Google-Extended 同时还管 Gemini 应用的 grounding；三是信号<strong>只对生效后抓取的内容起作用</strong>，已进训练集的内容一字未提。<strong>现实参照</strong>：同期 Cloudflare 默认屏蔽 AI 爬虫，RSL 标准则允许向爬虫收费。而 robots.txt 从诞生那天起就是君子协定——没有罚款、没有封号，四家同时背书的意义在于把违约成本公开化。`,
    chips: [['载体', 'robots.txt / RFC 9309'], ['提出方', 'Anthropic → IETF'], ['最快落地', 'Anthropic 已生效'], ['最慢落地', '微软 2027-02-01']]
  },
  {
    n: 5,
    title: '特拉华州拟允许 AI 智能体创办并运营企业，设 30 个月监管沙盒',
    tag: '⚖️ 法律主体',
    desc: `11 月 2 日消息，美国<strong>特拉华州</strong>计划放宽商业监管规定，允许 <strong>AI 智能体运营的企业</strong>注册成立，即草案所称的「人工智能公司（AIC）」。草案为 AIC 设定 <strong>30 个月监管沙盒</strong>：AI 需在受监管环境中测试，由智能体作出商业决策。与正常企业一样，AI 企业可以<strong>持有资产、签署合同</strong>，<strong>可以成为诉讼对象，必要时也可以主动提起诉讼</strong>。<strong>法人资格的边界被推了一格</strong>：此前 AI 在法律上一直是「工具」，谁用谁担责；AIC 把 AI 放进「管理实体」的位置，等于在企业法层面给了它一种准人格。<strong>反对声已经出现</strong>：美国众议院监督委员会主席、共和党众议员<strong>詹姆斯·科默已致信特拉华州州长马特·迈耶</strong>，担心 AIC「可能用于保护实力雄厚的 AI 企业及投资者，使他们免于为鲁莽且造成伤害的行为承担责任」。<strong>为什么是折中而不是放行</strong>：加州大学法学教授 Andrew Baker 认为，特拉华州立法是在寻找折中方案，既让 AI 智能体创立的企业获得<strong>法律确定性</strong>，又用 30 个月窗口观察风险；外界判断是「如果美国各州不尽快采取行动，这类企业可能会率先在海外出现」。<strong>为什么是特拉华</strong>：美国过半上市公司注册在这里，公司法创新历来从这里开始。目前草案仍在起草阶段、尚未进入正式立法程序，提案人与背后支持者身份也未公开，国会已介入问询——若推进，将是州级公司法创新与联邦监管的一次正面碰撞。`,
    chips: [['主体形式', 'AI 智能体为管理实体'], ['沙盒期', '30 个月'], ['法律能力', '持股 / 签约 / 诉讼'], ['反对方', '众议员科默致信州长']]
  },
  {
    n: 6,
    title: 'Google StreamVibe：每秒判断「该不该开口」的视频智能体，5 分钟是道坎',
    tag: '👁️ 主动交互',
    desc: `Google 联合斯坦福、牛津及多所美国高校发布 <strong>StreamVibe</strong>——一个看着你做饭、装家具、修图，<strong>自己决定什么时候开口</strong>的视频智能体。它把用户意图分成三类处理：<strong>明说的</strong>（水开了叫我）、<strong>没说出口的</strong>（有困难就叫我）、<strong>干到一半改主意的</strong>（三分钟后从「汇报进度」改成「帮我质检」）。团队先做了个 <strong>4100 个样本、183 小时</strong>日常与软件操作录像的基准——由 Gemini 2.5 Flash 提议何时该帮忙、该说什么，再由<strong>四名人类评估者全票通过</strong>才算数；再训练出 <strong>StreamVibe-VL</strong>（底座为阿里开源的 Qwen3.5-9B），<strong>每秒决定一次</strong>沉默还是说话。<strong>花大力气教它闭嘴</strong>：第一阶段 SFT 之后模型太话痨，第二阶段用<strong>强化学习</strong>把它往「保守」里推，减少无谓打断。<strong>分工要说清楚</strong>：独立的记忆系统只跟踪哪些请求待办、哪些步骤已完成——<strong>只管记账，开不开口、说什么仍由模型自己拍板</strong>。<strong>提升幅度</strong>：响应时机与质量比同类模型高 <strong>10.7%</strong>，记忆系统再带来 <strong>12.3%</strong> 的主动交互提升并减少打断；不过 Google 自家的 Gemini 3.8 Flash 在若干测试里反而更高。<strong>5 分钟是硬坎</strong>：视频一长，所有被测模型把握时机的能力都明显下滑；当模型要基于自己此前的回答往下接时，错误逐层叠加，<strong>关键内容指标最多掉 61.5%</strong>。超过 5 分钟，模型很少挑对开口时机，跟踪「改了口的需求」尤其吃力。<strong>对照案例很直观</strong>：GIMP 转黑白那组，对照模型 JoyAI 报「图已经存好了」而用户根本还没打开，StreamVibe-VL 则在对的时机给出下一步——先点「颜色」再点「去饱和」。<strong>冷静看</strong>：目前只是论文 + 基准 + 权重，<strong>没有产品、没有发布日期、没有定价</strong>。`,
    chips: [['基准规模', '4100 样本 / 183 小时'], ['决策频率', '每秒一次'], ['时机与质量', '+10.7%'], ['长视频掉点', '最多 -61.5%']]
  },
  {
    n: 7,
    title: 'xAI 宣布 11 月 7 日起 Grok API 文本默认加隐形水印，响应欧盟 AI 法案',
    tag: '🔏 内容标识',
    desc: `xAI 开发者文档上线（美国时间 10 月 31 日）：<strong>从 11 月 7 日起</strong>，Grok 模型生成的文本将默认添加<strong>隐形水印</strong>，覆盖 <strong>grok-4.7、grok-4.6、grok-4.5、grok-4.3 以及 grok-4.20 的推理版、非推理版与多智能体版共 7 个模型</strong>，在全球所有地区的 API 端点生效——普通回复、结构化输出与工具调用参数都带。<strong>触发点是欧盟《人工智能法案》</strong>：第 50 条要求合成文本「以机器可读格式标记并可被检测为人工生成或经操纵生成」，透明度规则自 2026 年 8 月 2 日起适用，8 月 2 日前上市的系统须在 <strong>12 月 2 日</strong>前合规——11 月 7 日正好落在大限前 25 天。<strong>不是塞隐藏字符</strong>：水印融入生成时的 <strong>token 选择过程</strong>，不增加任何字符、标记或隐藏文本，不改变响应长度、质量与速度，也不改定价和请求响应格式。<strong>查验与关闭</strong>：调用方看响应头 <strong>x-watermark: true</strong> 即可确认；团队管理员可在控制台按模型关闭，5 分钟内生效，但<strong>需确认用途符合法律例外并自行承担标注与披露责任</strong>，操作会留在审计日志里。<strong>检测靠统计</strong>：xAI 给文本打分，结论分「有水印 / 无水印 / 不确定」三种，<strong>文本越长信号越强</strong>，检测接口需申请。OpenAI 曾测试：把 10% 的词替换成同义词，检出率从约 <strong>92% 掉到 66%</strong>。<strong>消费端不受影响</strong>：SuperGrok、X Premium 等订阅版 Grok 不在范围内。<strong>三家三种做法</strong>：Anthropic 对近期模型全球加水印且<strong>客户无法关闭</strong>（Opus 4.6 / Sonnet 4.6 仅在 temperature、top_p、top_k 保持默认时生效）；OpenAI 的 API 默认关闭、可按需开启，textGrain 仅面向欧盟的 ChatGPT 与 Codex。三家的检测器互不通用，而第 50 条本要求技术方案「尽可能互操作」。`,
    chips: [['生效日', '2026-11-07'], ['覆盖模型', '7 个 Grok 模型'], ['查验方式', 'x-watermark 响应头'], ['法规大限', '12-02（AI 法案第 50 条）']]
  },
  {
    n: 8,
    title: '赛迪研究院：中国 AI 推理数据量首超训练量，日均词元调用超 175 万亿',
    tag: '📈 规模化落地',
    desc: `10 月 31 日，工信部赛迪研究院（CCID）发布《新域新质创新发展十大趋势》。数据显示，<strong>我国人工智能推理数据量首次超过训练数据量</strong>，标志着 AI 从模型训练研发阶段迈入规模化产业应用阶段。截至 2026 年 6 月，<strong>日均词元调用量超过 175 万亿</strong>，相比 2024 年年初增长 <strong>1000 多倍</strong>。顶尖大模型的迭代周期也从过去的几个月压缩到<strong>几周甚至几天</strong>。<strong>交叉点的意义在成本结构</strong>：推理量超过训练量，意味着算力消耗的主力从「一次性炼模型」转向「持续跑服务」。这会直接改变硬件选型与指标体系——推理卡占比、显存带宽、单位 token 成本将取代「参数规模」成为更核心的衡量口径。<strong>1000 多倍的时间跨度是两年半</strong>（2024 年初到 2026 年 6 月），与同期 OpenRouter 口径下中国大模型周调用量连续十周居全球首位相互印证。<strong>落地侧的数字</strong>：随着「人工智能 + 制造」行动推进，我国已累计建成 <strong>500 多家卓越级智能工厂</strong>，覆盖 31 个省区市、涵盖超 <strong>80%</strong> 的制造业行业大类；国产算力与大模型已在钢铁、汽车等 <strong>20 个行业落地 1000 多个应用场景</strong>。<strong>用户侧参照</strong>：另据 CNNIC 9 月发布的《生成式人工智能应用发展报告（2026）》，截至 2026 年上半年我国生成式 AI 用户规模已超 <strong>7 亿人</strong>，普及率突破 50%。<strong>官方定性</strong>：赛迪研究院党委书记、副院长刘文强的表述是——AI「已不仅仅是工具的变革，而正在成为变革的工具」，正成为牵引全域变革的通用目的技术。`,
    chips: [['日均词元', '超 175 万亿'], ['增速', '较 2024 年初 1000+ 倍'], ['智能工厂', '500+ 家卓越级'], ['应用场景', '20 行业 1000+ 个']]
  }
];

const sections = [
  {
    id: 's1', kicker: 'i. Models &amp; Capital', title: '🧠 模型 &amp; 资本', count: '3 items',
    sub: '三条都在讲「中国 AI 的钱和模型同时往前推」—— 龙猫把视觉压成 token 进主干，DeepSeek 拿 1055 亿换供应链确定性，可灵 198 亿让 BAT 第一次同框',
    items: [1, 2, 3],
    cls: 'section'
  },
  {
    id: 's2', kicker: 'ii. Rules &amp; Guardrails', title: '📜 规矩 &amp; 护栏', count: '3 items',
    sub: '今天最硬的一条主线 —— 训练数据的规矩、生成内容的规矩、法律主体的规矩，同一天被立起来；共同点是都由 AI 公司自己提出或自己执行，且都缺牙齿',
    items: [4, 5, 6],
    cls: 'section-highlight'
  },
  {
    id: 's3', kicker: 'iii. Signals &amp; Data', title: '📊 信号 &amp; 数据', count: '2 items',
    sub: '一条给 AI 生成的内容盖上可检测的章，一条给出中国 AI 从「喂模型」走到「用模型」的交叉点 —— 标识与规模，是同一件事的两面',
    items: [7, 8],
    cls: 'section'
  }
];

const navLabels = {
  1: '龙猫 LongCat-2.5', 2: 'DeepSeek 1055 亿', 3: '可灵 198 亿 · BAT 同台',
  4: 'robots.txt 统一退出', 5: '特拉华 AI 开公司', 6: 'Google StreamVibe',
  7: 'Grok 隐形水印', 8: '推理量超训练量'
};

function cardHTML(it) {
  const chips = it.chips.map(c =>
    `<div class="data-chip"><div class="data-label">${c[0]}</div><div class="data-value">${c[1]}</div></div>`
  ).join('\n');
  return `    <div class="card" id="item-${it.n}">
      <div class="card-chrome">
        <span class="card-num">${it.n}</span>
        <span class="card-title">${it.title}</span>
        <span class="card-tag">${it.tag}</span>
      </div>
      <div class="card-desc">
        ${it.desc}
      </div>
      <div class="data-strip">
${chips}
      </div>
    </div>`;
}

let nav = `<nav class="sidebar" id="sidebar">
  <div class="sidebar-header">
    <div class="sidebar-brand">AI Daily Report</div>
    <h1>AIGC <em>日报</em></h1>
    <div class="sidebar-meta">2026.11.02 &middot; 星期一 &middot; 第 86 期 &middot; 8 条速报</div>
  </div>

  <div class="nav-section">
    <div class="nav-section-title">Overview</div>
    <a href="#top" class="nav-link active"><span class="nav-num">&middot;</span>今日速览</a>
  </div>
`;

sections.forEach((s, si) => {
  nav += `
  <div class="nav-section">
    <div class="nav-section-title">${s.kicker.split(' ').slice(1).join(' ')}</div>
    <a href="#${s.id}" class="nav-link"><span class="nav-num">&sect;${si + 1}</span>${s.title}</a>
`;
  s.items.forEach((num, idx) => {
    nav += `    <a href="#item-${num}" class="nav-link nav-sub"><span class="nav-num">${idx + 1}.</span>${navLabels[num]}</a>\n`;
  });
  nav += `  </div>\n\n`;
});

nav += `  <div class="sidebar-dots">
    <i style="background:var(--pink)"></i>
    <i style="background:var(--lemon)"></i>
    <i style="background:var(--blush)"></i>
    <i style="background:var(--sage)"></i>
  </div>
</nav>
`;

const lead = `今天的 8 条新闻，主线是<strong>给 AI 立规矩的一天</strong> &middot; 三条规矩同日落地：<strong>训练数据的规矩</strong>——OpenAI、谷歌、微软、Anthropic 罕见同框，认同一个写在 robots.txt 里的<strong>统一退出信号</strong>，网站写一行就能对四家同时说「别拿我的内容训练」；<strong>生成内容的规矩</strong>——xAI 宣布 <strong>11 月 7 日</strong>起 Grok API 吐出的每个字都带<strong>隐形水印</strong>，欧盟《AI 法案》12 月 2 日大限在前；<strong>法律身份的规矩</strong>——<strong>特拉华州</strong>起草法案，允许 AI 智能体当公司的管理实体，配 30 个月监管沙盒，国会已经有人写信反对 &middot; 而规矩之外，中国的钱还在加速进场：DeepSeek 新一轮融资扩大到 <strong>1055 亿元</strong>、估值 <strong>6155 亿元</strong>，宁德时代、中芯国际、长鑫存储、移动电信、vivo、美的、吉利、美团、小红书近 30 家产业方入局；快手可灵 AI <strong>198 亿元</strong>增资交割完成，阿里、腾讯、百度<strong>同台签了同一份协议</strong>，投后估值 1228 亿元反超市值 976 亿元的母公司 &middot; 模型侧也没停：美团龙猫 LongCat-2.5 把 1.6 万亿参数做成<strong>原生多模态</strong>，视觉信号压成离散 token 和文本一起进主干 &middot; 同场：思科把<strong>无上限 Token 预算</strong>交给一个 27 岁工程师，让他带两个人 24 个月内重写公司 98% 的遗留代码；Karpathy 用 Claude 两小时搭出 HackerTube；赛迪数据：中国 AI <strong>推理数据量首次超过训练数据量</strong>`;

let body = `<body>

${nav}<div class="main">
<div class="page">
<div class="header" id="top">
    <div class="swatches">
      <i style="background:var(--pink)"></i>
      <i style="background:var(--lemon)"></i>
      <i style="background:var(--blush)"></i>
      <i style="background:var(--sage)"></i>
    </div>
    <div class="header-kicker">AI Daily Report &middot; 2026.11.02 &middot; Mon &middot; Issue 86</div>
    <h1>AIGC <em>日报</em></h1>
    <p class="lead">${lead}</p>
    <div class="header-meta">
      <span class="meta-tag">🧠 模型 &amp; 资本</span>
      <span class="meta-tag">&middot;</span>
      <span class="meta-tag">📜 规矩 &amp; 护栏</span>
      <span class="meta-tag">&middot;</span>
      <span class="meta-tag">📊 信号 &amp; 数据</span>
      <span class="meta-tag">&middot;</span>
      <span class="meta-tag">2026.11.02 &middot; 第 86 期</span>
    </div>
  </div>

`;

sections.forEach(s => {
  body += `
  <div class="${s.cls}" id="${s.id}">
    <div class="section-chrome">
      <span class="section-kicker">${s.kicker}</span>
      <span class="section-count">${s.count}</span>
    </div>
    <div class="section-title">${s.title}</div>
    <div class="section-sub">${s.sub}</div>

`;
  s.items.forEach(num => {
    body += cardHTML(items.find(i => i.n === num)) + '\n\n';
  });
  body += `  </div>\n\n\n`;
});

const editNote = `  <div class="edit-note">
    <p>编辑点评</p>
    <p>今天 8 条新闻串起来是同一件事：<strong>AI 在过去 24 小时里被同时塞进了三个不同的框</strong>。</p>
    <p>三条主线同时展开：<strong>① 立规矩</strong>（四巨头统一 robots.txt 训练退出信号，网站写一行对四家同时生效；xAI 从 11 月 7 日起给 Grok API 的每个字盖隐形水印；特拉华州起草法案允许 AI 智能体当公司的管理实体）—— <strong>能不能拿、要不要标、算不算人，三个问题在同一天被摆上台面</strong>。<strong>② 加钱</strong>（DeepSeek 1055 亿、可灵 198 亿，一天之内中国 AI 两笔巨额交割）—— 方向却相反：<strong>DeepSeek 往上游硬件走</strong>（中芯、长鑫、移动、电信，换芯片与存储的确定性），<strong>可灵往下游内容走</strong>（阿里、腾讯、百度、华策、芒果，换场景与分发渠道）。<strong>③ 模型继续往前推</strong>（龙猫 LongCat-2.5 把视觉压成离散 token 和文本一起进主干，把「看设计稿写前端」从多模型拼接变成单模型单链路）。</p>
    <p>今天最高分给到 <strong>#1 美团龙猫 LongCat-2.5（9.3/P0）</strong>—— 它的分量不在 1.6 万亿这个数字，而在于<strong>原生多模态 + 长程智能体</strong>这两件事第一次被同一个国产模型同时做扎实，且坚持纯国产算力训推全流程。</p>
    <p>四条可以立刻执行的线索：<strong>① 视觉 → 代码链路值得重测</strong>（LongCat-2.5 这类原生多模态模型把「看设计稿写前端」压进单链路，等权重开源后做一次「KV → 活动 H5」的端到端实测，比现在的多模型拼接省一道对齐误差）；<strong>② 商用视频管线优先级排序</strong>（可灵 API 已全球开放且资本到位，198 亿 + 2031 年 IPO 兜底意味着服务稳定性有保障，在版本 PV、玩法演示短片场景应作为首选实测对象）；<strong>③ 给 AI 生成内容开始留痕</strong>（Grok 11/7 水印 + 欧盟 12/2 大限 + 四巨头训练退出信号，三件事共同指向「对外发布的 AI 内容需要可追溯的生成记录」—— 建议在物料归档流程里加一个「AI 参与程度 + 生成工具 + 改写记录」字段，成本极低，一年后可能很值钱）；<strong>④ 留意 robots.txt 的写法</strong>（若官网或社区平台不希望内容进入模型训练，现在是显式写出统一 token 的窗口期 —— 注意通配符规则不算数，必须点名，且谷歌会把它视同已拒绝 Google-Extended）。</p>
  </div>
</div>
</div>

`;

const out = head + '\n' + body + editNote + tail;
fs.writeFileSync(OUT, out, 'utf8');

const v = fs.readFileSync(OUT, 'utf8');
console.log('BYTES=', Buffer.byteLength(v));
console.log('title 2026.11.02 =', /<title>AIGC 日报 · 2026\.11\.02<\/title>/.test(v));
console.log('stale 11.01 title =', /2026\.11\.01<\/title>/.test(v));
console.log('</head> count =', (v.match(/<\/head>/g) || []).length);
console.log('class="card" id="item-" count =', (v.match(/class="card" id="item-/g) || []).length);
console.log('class="section" count =', (v.match(/class="section"/g) || []).length);
console.log('class="section-highlight" count =', (v.match(/class="section-highlight"/g) || []).length);
console.log('nav-sub count =', (v.match(/nav-link nav-sub/g) || []).length);
console.log('lead present =', /<p class="lead">/.test(v));
console.log('data-chip count =', (v.match(/class="data-chip"/g) || []).length);
