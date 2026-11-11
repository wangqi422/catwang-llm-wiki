const fs = require('fs');
const TPL = 'docs/ai-daily/ai-daily-card-20261110-toc.html';
const OUT = 'docs/ai-daily/ai-daily-card-20261111-toc.html';
const lines = fs.readFileSync(TPL, 'utf8').split('\n');

// head: 到含 </head> 的那一行；title 用正则强制改日期
let headIdx = lines.findIndex(l => l.trim() === '</head>');
let head = lines.slice(0, headIdx + 1).join('\n');
head = head.replace(/<title>[^<]*<\/title>/, '<title>AIGC 日报 · 2026.11.11</title>');

// tail: 从 <button class="back-to-top" 到文件末尾（含 ScrollSpy JS 与「← 返回归档」按钮，无日期文案）
let tailIdx = lines.findIndex(l => l.indexOf('<button class="back-to-top"') !== -1);
let tail = lines.slice(tailIdx).join('\n');

const items = [
  {
    n: 1, id: 'item-1',
    title: 'Google 全面开放 Gemini 4 Carbon：三项真实工作流评测第一、成本比次优低 2 倍，与 Argon 同价 $2/$10',
    tag: '🚀 旗舰模型 / 全面开放 / 长程智能体',
    desc: '11 月 10 日（北京时间 11 日凌晨），<strong>Google CEO Sundar Pichai 与 DeepMind 首席 AI 架构师 Koray Kavukcuoglu 宣布 Gemini 4 Carbon 正式全面开放</strong>。该模型 <strong>10 月 28 日首发时仅通过「Fairwind 计划」向筛选后的网络安全防御团队开放</strong>，两周后走出受限测试，<strong>面向所有付费 API 开发者、企业客户、科研人员及 Google AI Ultra 订阅用户</strong>开放，覆盖 Gemini API / AI Studio、Gemini for Business、Gemini App、搜索 AI Mode 与 Antigravity。Google 这次把重心放在<strong>真实工作流</strong>：Carbon 在 <strong>CursorBench 4.0（编程）、Perplexity WANDR（检索）、Zapier AutomationBench（业务流程自动化）三项独立基准均排第一</strong>，且<strong>单任务成本比表现次优的外部模型低 2 倍以上</strong>；AutomationBench 得分 53.9%（vs Argon 51.3% / Opus 5.5 42.5% / GPT-6 Astra 41.4%），Terminal-Bench 4.0 达 65.2%。定价与 Argon 同价：11 月 30 日前 <strong>$2 / $10 每百万输入 / 输出 token</strong>、12 月 1 日起 $4 / $20，1M 上下文。同步上线 <strong>Antigravity <code>/swarm</code> 蜂群模式</strong>——一句提示词转成一整支可实时追踪的协同智能体团队，把 Carbon 分给架构设计 / 协调 / 审计等重推理角色，并行挂更快更轻的模型与对抗性验证器在隔离工作区跑。<strong>与昨日「冲最强」正面照面且是新阶段</strong>：归档 10-28 期报的是 Carbon 首发（AA v5 以 59 分登顶、仅限网安防御者），今天是<strong>从受限测试到全面 GA</strong>；AA 榜里它 60 分排在 Fable 5.2（65 分）之后，但 Google 选择用「真实工作流 + 成本」应战。<strong>评测口径从「会不会答」转向「能不能交付」</strong>，与 11-10 期「推理经济性之战」一脉相承。<strong>安全是解禁前提</strong>：官方称模拟网攻拦截 99% 攻击轨迹、单次突破率 0.8%（Argon 3.1%），375 题智能体诚实性测试通过 92%（Argon 70%）。<strong>边界</strong>：三项第一、成本「低 2 倍」、53.9% / 65.2% 均为官方或合作方口径、无统一独立复测；$2/$10 是 11 月 30 日前体验价、12 月翻倍；免费档不可用；<code>/swarm</code> 为预览版；官方同时给出对照——第三方测算 Carbon 比 DeepSeek V4 Pro 高 37 分，但单任务成本是对方的 4.4 倍。',
    chips: [['三项工作流评测', '全部第一'], ['单任务成本', '比次优低 2 倍+'], ['首发定价', '$2 / $10 · 12 月翻倍'], ['长程智能体', 'Antigravity /swarm']]
  },
  {
    n: 2, id: 'item-2',
    title: 'Anthropic 正式启动 IPO 路演：定价 $70–78、估值 1.26–1.41 万亿、七巨头 260 亿配售，认购火爆承销商拟上调至 $1.5T',
    tag: '📈 IPO / 资本 / 算力账本',
    desc: '11 月 10 日（美东周二），<strong>Anthropic 正式启动 IPO 投资者路演</strong>并在官网发布路演视频，拟以代码 <strong>ANT</strong> 登陆纳斯达克全球精选市场。第二次修订版 S-1/A 给出确定条款：<strong>发行 8.25 亿股 A 类普通股、定价区间每股 $70–78</strong>（公司新发约 8.014 亿股、现有股东仅售约 2365 万股），按上限计基础募资约 <strong>643.5 亿美元</strong>，承销商另有 30 天最多 1.2375 亿股超额配售权；同时安排<strong>谷歌、英伟达、AMD、博通、美光、微软、台积电相关实体七家按发行价同步私募认购 260 亿美元</strong>无投票权股份（谷歌、英伟达各约 100 亿）。估值两种口径：按发行后股本约 <strong>9160 亿–1.02 万亿美元</strong>，完全摊薄口径 <strong>1.26–1.41 万亿美元</strong>；若公开发行与配售全部完成并计入超额配售，<strong>整体融资规模最高约 904–1000 亿美元</strong>，有望超过 SpaceX 今年 6 月的 862 亿美元纪录。11 月 11 日金融时报进一步报道：路演首日认购意向强劲，高盛与摩根士丹利牵头的承销团队<strong>正考虑把发行价提到 $78 以上、目标估值推高至 1.5 万亿美元或更高</strong>。招股书披露 Q3 营收约 <strong>169.6 亿美元</strong>（同比逾十倍、环比增速由 144% 降至 47%）、前三季度累计 332.4 亿美元、10 月年化营收 810 亿美元，以及约 <strong>9009 亿美元</strong>采购与租赁承诺（绝大部分指向算力基建）。<strong>与昨日是「预告 → 落地」的连续剧</strong>：11-10 期 #5 报的是冷静期届满、最快本周启动路演、估值讨论 1.1–1.7 万亿；今天是<strong>路演正式启动 + 白纸黑字定价、股数、七巨头配售名单与认购反馈</strong>。三期连起来才完整：11-08 报 9000 亿算力承诺 → 11-09 报 34 亿接手 1.7GW 燃气机组 → 今天报资产与承诺<strong>正式交给定价</strong>。<strong>「1 万亿 / 1.4 万亿 / 1.5 万亿」不是三套方案，而是三种口径</strong>；七巨头既是投资人又是客户与算力供应商，260 亿几乎全部流入公司，本质是<strong>用战略股东的资产负债表为 9009 亿算力承诺背书</strong>，招股书也坦承降价与折扣抵消了 Q3 约 6 亿美元由用量增长带来的收入增量。<strong>边界</strong>：最终发行价与挂牌日待定价确认；1.5 万亿为 FT 援引知情人士的承销商意向、非官宣；高盛 2030 年营收超 6000 亿为分析师模型、非业绩承诺；AI 板块近期波动与监管变量都可能改变时间表。',
    chips: [['定价区间', '$70 – $78 / 股'], ['完全摊薄估值', '1.26 – 1.41 万亿'], ['七巨头配售', '260 亿美元'], ['总融资', '最高 904 – 1000 亿']]
  },
  {
    n: 3, id: 'item-3',
    title: 'Anthropic 发布 Claude 办公套件 Whiteboards / Sheets / Data：正面挑战微软 Office，微软盘中跌超 3%',
    tag: '🗂️ 办公套件 / AI 入口 / 团队协作',
    desc: '11 月 10 日，<strong>Anthropic 一次性推出 Claude Whiteboards（白板）、Claude Sheets（表格）两款测试版，并把原 Claude Dashboards 转正更名为 Claude Data</strong>，加上此前的文档、演示文稿与设计功能，Claude 办公版图正式成形。三款<strong>面向所有付费计划</strong>、覆盖网页 / 桌面 / 移动端：Whiteboards 把一句模糊口头计划整理成含时间线、负责人与日期的共享白板，按主题归类讨论、起草行动项，可框选局部单独提问，产出可转文档 / 幻灯片或导出 Lucid、Miro、Vani；Sheets 一句提示词生成带多个标签页、公式、格式与下拉菜单的表格，逐次标注 AI 改动、支持多人协作，可导出 .xlsx / CSV 或续接 Airtable、Asana、monday.com、Smartsheet；Data 连接 Redshift、BigQuery、ClickHouse、Snowflake、Salesforce，产出仪表盘、数据故事乃至 AI 解说短视频，新增<strong>「认证查询」统一指标口径</strong>与<strong>「实时共享」（观看者无需数据源凭据即可看已授权结果）</strong>。同步升级的<strong>交互式连接器</strong>让 Adobe、Atlassian、Box 在对话旁全屏打开、由 Claude 直接修改正在用的页面或文件，改动实时呈现且需逐次批准；还预告能进通话记录并同步更新文档的 <strong>Claude Meetings</strong>。消息出来后<strong>微软股价盘中直线跳水超 3%、收跌 2.2%</strong>。<strong>从「生成内容」到「承载工作」</strong>：过去得把 Claude 输出复制到 Excel / Miro 才能用，这次把协作场所本身搬进 Claude。产品负责人 Nicholas Lin 坦承 Sheets「目前仍相当基础」、不以财务建模为目标，官方发布当天自评 basic 是难得的诚实。<strong>最锋利的一刀是「实时共享无需交出凭据」</strong>——拆掉了「分享看板 = 分享数据源凭据」这一企业协作的经典阻力。<strong>交互式连接器 + MCP Apps 才是入口野心</strong>：把长程智能体落到别人的软件里，与 #4 收编模型路由、#6 铺商家入口一起抢「工作流默认发生在谁的地盘」。<strong>与 IPO 路演精确对齐</strong>：#2 的招股故事需要回答「模型能力怎么变成可持续企业收入」，办公套件正是答案。<strong>边界</strong>：Whiteboards / Sheets 为 beta、自评 basic、官方明确不替代 Excel；Enterprise 默认关闭白板与表格、需管理员在 Organization settings → Artifacts 开启，Claude Data 11 月 19 日默认开启；Claude Meetings 仅为预告；可用应用名单与企业数据合规细则未完整披露。',
    chips: [['三款产品', 'Whiteboards / Sheets / Data'], ['微软股价', '盘中跌超 3% · 收 -2.2%'], ['覆盖', '全部付费计划 · 三端'], ['关键能力', '实时共享无需凭据']]
  },
  {
    n: 4, id: 'item-4',
    title: 'Stripe 完成约 75 亿美元收购 OpenRouter：史上最大一笔，1000 万开发者、日处理逾 10 万亿 token，承诺保持中立',
    tag: '💳 收购 / 模型路由 / AI 经济基建',
    desc: '11 月 10 日，<strong>OpenRouter 官方宣布「从今天起正式成为 Stripe 的一部分」，Stripe 同步确认完成交割</strong>。据纽约时报援引知情人士，交易价约 <strong>75 亿美元</strong>，为 <strong>Stripe 史上最大一笔收购</strong>；协议早在 <strong>8 月达成</strong>、11 月 10 日完成，Stripe 未官方确认价格。OpenRouter 成立于 2023 年，用单一 API 接入 <strong>80+ provider 的 400+ 模型</strong>、<strong>日处理逾 10 万亿 token</strong>、服务<strong>超 1000 万开发者与公司</strong>，今年 5 月才以 13 亿美元估值完成 1.13 亿美元 B 轮——不到半年并购价已是该估值五倍以上。官方合并理由务实：Stripe 多年为全球企业运行关键基础设施，可让 OpenRouter 把「新模型接入、故障期可用性、按团队执行支出与数据策略」这层运营基建建得更快；Stripe 创始人在致投资者信中称<strong>资本与智能正成为每家企业的两条核心数字流</strong>。对最关心的中立性，OpenRouter 明确承诺不变：模型与供应商继续在质量、可靠性、价格上竞争，选什么由用户决定，产品、使命与服务承诺均不调整、继续独立运营。<strong>与归档里「敲定协议」是不同阶段</strong>：此前某期 desc 已报 8 月「Stripe 敲定超 70 亿美元收购 OpenRouter」，今天报的是<strong>正式完成交割、双方官宣并入、NYT 给出定价与独立运营 / 中立承诺</strong>，属同一交易从协议到落地的新进展。<strong>「计费」与「算力」正在合流</strong>：OpenRouter 本就是按用量计费的模型网关，Stripe 是全球最大在线支付基建之一，合并后模型调用、账单、税务可能落进同一套系统。<strong>中立性是这桩交易真正的考题</strong>：价值恰在「不站队」的 400+ 模型自动故障切换，一旦路由层归了支付公司，竞争对手与大客户难免重估；8 月协议刚公布时费用管理平台 Ramp 就推出对标 Router.com 争这块市场。<strong>与「铺开」主线同构</strong>：#1 把最强模型铺给所有人、#3 把 AI 铺进办公协作、#6 把 ChatGPT 铺成商家入口，Stripe 则是把<strong>模型调用与结算</strong>铺成一层通用经济基建。<strong>边界</strong>：75 亿美元为 NYT 援引知情人士、未官宣；400+ 模型 / 10 万亿 token / 1000 万开发者为厂商自报；「独立运营 + 中立」为官方承诺、无长期履约验证；合并后定价与合同条款是否变化未披露。',
    chips: [['交易价', '约 75 亿美元 · 史上最大'], ['规模', '400+ 模型 / 1000 万开发者'], ['日吞吐', '逾 10 万亿 token'], ['承诺', '独立运营 · 保持中立']]
  },
  {
    n: 5, id: 'item-5',
    title: 'MiniMax 开源 H3-Image：10 秒直出 4K（16MP）、最多 16 张参考图、开放权重，单价仅同档 50–70%',
    tag: '🎨 开源生图 / 4K 高分辨率 / 设计产线',
    desc: '11 月 10 日，<strong>MiniMax 发布并当天开放 H3-Image 权重</strong>（Hugging Face），一款衍生自视频模型 H3 的图像生成模型，支持文生图、参考图生成与图像编辑。核心指标是<strong>直接生成 4096×4096（约 16MP / 4K）图像、最快约 10 秒</strong>，无需超分辨率放大；官方 P50 中位耗时：4K 文生图标准模式 16.0 秒、Highspeed 10.3 秒（同规格 Nano Banana 2.1 为 50.0 / 51.0 秒），4K 单图编辑 18.2 / 12.5 秒（对照 48.0 / 54.0 秒）。宣称<strong>最多理解 16 张参考图</strong>、开源模型中<strong>最强指令遵循</strong>，并强化后训练全链路（数据、强化学习、步数压缩、PE、部署优化）以削弱「AI 塑料感」。支持多种画幅（4096² 方图、5472×3072 的 16:9、6272×2688 的 21:9），有效生成范围约 400 万–2000 万像素。除开放权重外同步上线 MiniMax 开放平台、MiniMax Code 与海螺 AI，本地部署文档列出 <strong>SGLang、vLLM、Diffusers、ComfyUI</strong> 四条路径；<strong>定价仅同档主流工具的 50–70%</strong>，4K 文生图单张约 ¥0.2261、Highspeed ¥0.4275，发布首周 16MP 及以上规格再打五折。同日已上线 Arena Battle Mode、fal、Krea 与 ComfyUI 原生支持。<strong>「4K」与「十秒」第一次进了同一句话</strong>：主流图像模型仍集中在 1MP–4MP、4K 多靠超分且以分钟计，把等待压到 10–20 秒意味着<strong>改构图、换光线、调细节可以连续试错</strong>——与 11-10 期 Seedream 5.5「改 100 轮不崩」同指「可承接修改意见的产线工位」。<strong>竞争点从画质转向「高分辨率场景下的效率与成本」</strong>：开放权重 + 单价 50–70% + 首周五折 + 四条本地部署路径，组合是冲「可自部署、可定制、可算清账」的生态位，与 #1「最强档不加价」、#2「降价抵消 6 亿收入」同一逻辑。<strong>16 张参考图 + 强指令遵循对品牌一致性最有用</strong>：可一次喂入角色设定、武器 / 载具三视图、品牌色板与历史 KV。<strong>与本期产线三件套连成一条</strong>：#3 把协作搬进 Claude、#7 让生成媒体进 Premiere 时间轴、#5 把 4K 开源生图压到十秒，加上 Seedream 5.5 的 RGBA 透明输出，「生成 → 多轮改 → 合成 → 剪辑」正被逐个工具化。<strong>边界</strong>：10 秒、5 倍速、「开源最强指令遵循」、50–70% 定价均为厂商自报、无第三方基准；爱范儿实测 10–20 秒、慢于官方口径；首周五折为限时；色彩管理与印刷 / 游戏引擎兼容性未披露；开放权重不等于训练数据已获商用授权。',
    chips: [['4K 直出', '4096² / 16MP · ~10 秒'], ['参考图', '最多 16 张'], ['单价', '同档 50 – 70%'], ['开放', '权重 + 4 条本地部署']]
  },
  {
    n: 6, id: 'item-6',
    title: 'OpenAI 推出 Businesses in ChatGPT 测试版：Business Hub + Business Agents，12 亿周活向搜索与广告入口铺开',
    tag: '🏪 商家入口 / 对话式商务 / 广告',
    desc: '11 月 10 日，<strong>OpenAI 推出「Businesses in ChatGPT」测试版</strong>，把<strong>每周约 12 亿活跃用户</strong>的 ChatGPT 向企业与消费者之间的连接平台推进，直接对标 Google 商家资料与商业信息检索。产品两部分：<strong>Business Hub</strong>——企业认领并验证自己在 ChatGPT 中的商家主页，更新关键信息、上传含定价与库存的产品目录，查看被提及次数、主页浏览量、网站点击量与「发现主题」等聚合洞察；<strong>Business Agents</strong>——用户点击回复里的企业资料即可开启一段独立标注的对话，向企业 AI 智能体咨询产品差异与功能匹配。Business Agents 目前<strong>仅向美国境内符合条件的电商与在线服务企业</strong>开放，企业还可赞助自己的 Agent、把它作为 ChatGPT 广告落地页，赞助位明确标注且与模型回复相互独立。接入路径三类：合格企业经 Hub 认领、现有 Enterprise 客户与广告主经客户经理办理、Shopify 商家可从 Hub 或 Shopify 后台直接绑定。OpenAI 强调<strong>不向企业共享用户对话或 Agent 聊天记录</strong>，洞察均为聚合数据且需达到互动阈值才可查看。<strong>一次战略转向，不是一次功能更新</strong>：OpenAI 今年 3 月已下线带结算购物车、按佣金抽成的电商功能，这次放弃「在 ChatGPT 里完成交易」，改做<strong>发现与研究层</strong>——控制信息流、把用户导去既有平台成交，形似 Google 商家资料 + 搜索广告。<strong>与本期「铺入口」主线完全同构</strong>：#1 把模型铺给所有人、#3 把 Claude 铺成工作台、#4 把模型调用铺成结算基建，OpenAI 铺的是<strong>「12 亿周活的注意力 → 商家可被发现、可被咨询、可被投放」</strong>；谁掌握用户决策前的第一问，谁就掌握新的营销入口。<strong>隐私设计是能否被企业接受的前提</strong>：只给聚合洞察、设互动量阈值、Agent 对话与原生回答分离并标注身份、赞助位与模型回复隔离。<strong>对营销侧的直接含义</strong>：一旦「在 ChatGPT 里被提及 / 被点进主页 / 被咨询」成为可量化指标，AI 可见度优化（AEO / GEO）会从概念变成渠道 KPI；对照归档「GEO 投毒三个月连收三张罚单」的合规案例，白帽做法只能是完善结构化、可验证的官方信息。<strong>边界</strong>：仅 beta、Business Agents 限美国合格电商与在线服务企业；定价与 GA 时间表未披露；企业验证要求未公开；12 亿周活、聚合洞察口径为 OpenAI 自报；广告与回复隔离效果无第三方审计。',
    chips: [['周活', '约 12 亿'], ['两块产品', 'Business Hub + Agents'], ['首批', '仅美国电商 / 在线服务'], ['对标', 'Google 商家资料 / 广告']]
  },
  {
    n: 7, id: 'item-7',
    title: 'Adobe MAX 2026：生成式视频 / 音效 / 配乐进 Premiere 时间轴，PS 新增 Relight，本地 MCP 让智能体直改原生工程文件',
    tag: '🎬 创意工具 / 生成式工作流 / 原生工程',
    desc: '11 月 10 日，<strong>Adobe 在迈阿密 MAX 2026 大会发布 Creative Cloud 一轮更新</strong>。最受产线关注的是 <strong>Premiere 时间轴里的生成式媒体工具转正</strong>：可直接在剪辑过程中生成视频、音效、环境声与配乐，既调 Firefly 自家模型，也接 <strong>Google、Kling、Runway、Luma</strong> 第三方模型，另配清理脏录音、分串音、拆对白与配乐的音频工具；<strong>Generative Remove（测试版）</strong>让编辑框选穿帮物体、AI 用生成式细节补全而不动周围画面，正是去年 Sneaks 里 Project Frame Forward 的正式版。Photoshop 拿到 <strong>Relight</strong>（最多三个点光源 / 定向光、动态调整光影色调）、<strong>移除工具升级</strong>（连倒影、阴影、脚印一起识别处理）、Generative Restyle 与 Quick Compare；Lightroom 补上 Glow、瑕疵去除与测试中的 Open Eyes；Premiere 的 Color Mode 正式开放。<strong>最远的一档是本地 MCP</strong>：第三方 AI 智能体将能在用户自己电脑上直接操作 <strong>PSD / AI / PR / AE 原生工程文件</strong>，图层、矢量、序列保持可编辑、创作者仍可手动接管，而不只拿到一张被压平的生成结果；该集成与 Firefly Builder 排在 <strong>2027 年初私测</strong>、价格未公布。此外 Creative Agent 扩展到 PS / PR / AI / ID / AE / Frame.io，Firefly Graph 支持搭建可复用工作流，企业侧 GenStudio 引入 CX Enterprise Coworker 与 <strong>Brand Intelligence</strong>（维持品牌规范下把设计适配不同格式）。Adobe 同期完成对 Topaz Labs 的收购。<strong>「生成能力进流程」的标志不是按钮变多，而是工程文件还能被人接手</strong>：与 11-10 期 Seedream 5.5「改 100 轮不崩」、#5 H3-Image「十秒可连续试错」是同一条产线演进。<strong>多模型聚合 + Brand Intelligence 是给团队用的</strong>：Premiere 同时接五家模型，等于把 #4 的「路由 / 中立」带进剪辑台；Brand Intelligence 对「一版 KV 铺全渠道多尺寸」最对味。<strong>本地 MCP 值得提前盯但别当现货</strong>：让 Agent 批量改 20 个 PSD 同一图层有了官方路径，但排在 2027 年初私测，Firefly Design / Graph / Assemble 仍挂 beta。<strong>效率提升会先变成 KPI 而非闲暇</strong>：Adobe 与 Harris Poll 对 2000+ 美国创作者调查显示，用 AI 者 78% 认为加速业务、用过智能体的 59% 说省时间、77% 认为决定权应留在人手里。<strong>边界</strong>：Generative Remove、Open Eyes、本地 MCP、Firefly Builder / Design / Graph 分处 beta 或 2027 初私测；穿帮物体面积过大或背景复杂时 AI 填充易扭曲、仍需手工修补；多模型接入的配额、计费与商用授权细则未完整披露。',
    chips: [['Premiere', '生成视频 / 音效 / 配乐进时间轴'], ['Photoshop', 'Relight + 连倒影移除'], ['多模型', 'Firefly + Google / Kling / Runway / Luma'], ['本地 MCP', '2027 初私测 · 原生工程可编辑']]
  },
  {
    n: 8, id: 'item-8',
    title: 'NVIDIA GR00T 2 与 Google Gemini Robotics 2.5 同日双发：VLA 进奔驰在用产线，分拣成功率 96%',
    tag: '🤖 物理 AI / 机器人 / VLA / 工业落地',
    desc: '11 月 10 日，物理 AI 侧同日双发。<strong>Google DeepMind 发布迄今能力最强的视觉-语言-动作（VLA）模型 Gemini Robotics 2.5</strong>，在 <strong>200+ 项真实任务</strong>（用食品夹分餐、给礼盒系蝴蝶结、液体移液等）评测中，按任务类型不同成功率较此前基线高 <strong>30%–100%</strong>、完成速度快 <strong>20%–30%</strong>；与 Apptronik、梅赛德斯-奔驰合作，在匈牙利凯奇凯梅特与德国辛德尔芬根的<strong>在用汽车生产线</strong>上做概念验证，Apollo 2 人形机器人自主完成零部件分拣（kitting），由 Gemini Robotics ER 跟踪工作流、2.5 控制手臂与手部，<strong>成功率 96%</strong>。同步发布开源越狱测试基准 <strong>ASIMOV-Jailbreak</strong>（数百条伪装成正常请求的提示词），官方称 Gemini 4 Argon 抗越狱率 99.5%（上一代 ER 2 为 82%）。同日 <strong>NVIDIA 在 CoRL 发布 GR00T 2 开放世界动作模型</strong>，可从人类视频学习并驱动机械手臂、机械手与人形机器人，配套 DexBench / VABAR 两个开放工业基准；英伟达把推理智能体与 GR00T 2 结合——智能体负责任务拆解、过程检查与异常恢复、GR00T 2 负责精细动作，三类玩具装配任务分别完成 <strong>98/100、97/100、97/100</strong> 次，富士康正把它用于服务器制造自动化验证。<strong>VLA 的评价体系从「单任务成功」推到「真实产线稳定执行」</strong>：奔驰试点不是实验室 demo，而是在用产线上按每台车精确需求顺序从散料箱拣取金属支架、放入排序容器，重复性强、容错空间小；96% 意味着行业要重估人形机器人在总装与物料准备环节的渗透节奏，与 #1 Carbon「真实工作流评测」是同一种转向。<strong>通用大模型与专用 VLA 开始分工协同</strong>：Google 用 Argon 从真实场景图像重建数字孪生、生成仿真训练数据、分析失败原因，Robotics 2.5 专管动作执行；NVIDIA 用推理智能体管拆解与异常恢复、GR00T 2 管精细动作——与 #1 <code>/swarm</code> 的「重推理角色 + 轻量执行 + 对抗验证」几乎同构。<strong>安全被同步写进发布</strong>：ASIMOV-Jailbreak 呼应 #1「先限后放」与 #3 逐次批准，能力越靠近物理世界，权限围栏越要前置。<strong>与宣发的关系是「素材与场景」而非「工具」</strong>：机器人进真实产线的画面、工业级 3D / 动作数据，正是版本 PV、世界观延展与联名视觉的素材库。<strong>边界</strong>：200+ 任务、30%–100% / 20%–30% 与 96% 均为官方或实验室口径，奔驰试点仍处概念验证、未披露任务时长、试验次数与产线节拍；99.5% 属 Argon 而非本次 Robotics 2.5；两款目前仅面向 Google 机器人合作伙伴 / 研究机构开放，无公众开放时间表；GR00T 2 的 97–98/100 为厂商自报玩具装配测试。',
    chips: [['Robotics 2.5', '200+ 任务 · 成功率高 30–100%'], ['奔驰产线', '分拣成功率 96%'], ['GR00T 2', '推理智能体 + 动作模型'], ['安全基准', 'ASIMOV-Jailbreak 开源']]
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

const LEAD = '今天的 8 条新闻，主线是<strong>从锁在保险柜，到铺进每个人的工位</strong> &middot; 上半场是「解禁日」三连：<strong>Google 把只给网安防御者的 Gemini 4 Carbon 全面 GA</strong>（三项真实工作流评测第一、成本比次优低 2 倍、与 Argon 同价 $2/$10）、<strong>Anthropic 正式启动 IPO 路演</strong>（定价 $70–78、七巨头 260 亿配售、拟上调至 $1.5T）、<strong>Anthropic 又用 Whiteboards / Sheets / Data 把 Claude 铺成办公套件</strong>（微软盘中跌超 3%） &middot; 中场三条都在「铺入口」：<strong>Stripe 完成约 75 亿美元收购 OpenRouter</strong>、<strong>MiniMax 开源 H3-Image 把 4K 出图压进 10 秒</strong>、<strong>OpenAI 让 12 亿周活的 ChatGPT 长出商家主页与 Business Agent</strong> &middot; 收尾两条落到产线与物理世界：<strong>Adobe MAX 把生成媒体塞进 Premiere 时间轴并预告本地 MCP</strong>、<strong>GR00T 2 与 Gemini Robotics 2.5 同日双发进奔驰产线</strong>';

const navSub = [
  ['Carbon 全面开放', 'IPO 路演启动', 'Claude 办公套件'],
  ['Stripe × OpenRouter', 'H3-Image 开源', 'ChatGPT 商家入口'],
  ['Adobe MAX 2026', '机器人同日双发']
];

let body = '\n<body>\n\n<div class="progress-bar"><div class="progress-bar-fill" id="progressFill"></div></div>\n\n<nav class="sidebar" id="sidebar">\n';
body += '  <div class="sidebar-header">\n';
body += '    <div class="sidebar-brand">AI Daily Report</div>\n';
body += '    <h1>AIGC <em>日报</em></h1>\n';
body += '    <div class="sidebar-meta">2026.11.11 &middot; 星期三 &middot; 第 95 期 &middot; 8 条速报</div>\n';
body += '  </div>\n\n';
body += '  <div class="nav-section">\n    <div class="nav-section-title">Overview</div>\n';
body += '    <a href="#top" class="nav-link active"><span class="nav-num">&middot;</span>今日速览</a>\n  </div>\n\n';

const secMeta = [
  ['Release Day', '🔓 解禁日 · 三连击', '#s1', navSub[0]],
  ['Entries &amp; Infrastructure', '🌐 铺入口 · 抢地盘', '#s2', navSub[1]],
  ['Pipelines &amp; Physical AI', '🛠️ 进产线 · 进现场', '#s3', navSub[2]]
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
body += '    <div class="header-kicker">AI Daily Report &middot; 2026.11.11 &middot; Wed &middot; Issue 95</div>\n';
body += '    <h1>AIGC <em>日报</em></h1>\n';
body += '    <p class="lead">' + LEAD + '</p>\n';
body += '    <div class="header-meta">\n      <span class="meta-tag">🔓 解禁日 &amp; 三连击</span>\n      <span class="meta-tag">&middot;</span>\n      <span class="meta-tag">🌐 铺入口 · 抢地盘</span>\n      <span class="meta-tag">&middot;</span>\n      <span class="meta-tag">🛠️ 进产线 · 进现场</span>\n      <span class="meta-tag">&middot;</span>\n      <span class="meta-tag">2026.11.11 &middot; 第 95 期</span>\n    </div>\n  </div>\n\n\n';

const secInfo = [
  ['i. Release Day', '🔓 解禁日 · 三连击', '限量两周的模型全面解禁、上市定价落定、聊天框铺成办公套件 —— 昨天限量预告的，今天一次出完', 'section', '3 items'],
  ['ii. Entries &amp; Infrastructure', '🌐 铺入口 · 抢地盘', '用户的工作、调用与决策默认发生在谁的地盘 —— 结算基建、开源生图、商家入口三条线同时铺开', 'section-highlight', '3 items'],
  ['iii. Pipelines &amp; Physical AI', '🛠️ 进产线 · 进现场', '不再问会不会，而问能不能在强节拍现场稳定交付、还能不能被人接手', 'section', '2 items']
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
body += '    <p>八条其实在讲同一件事：<strong>从锁在保险柜，到铺进每个人的工位</strong>。昨天（11-10 期）比的是能力上限与单位成本，今天比的换成了「谁能把能力最快、最广地铺开」——限量两周的模型全面解禁、聊天框铺成办公套件与商家入口、模型调用铺成结算基建、4K 生图铺成开源权重、生成媒体铺进剪辑时间轴、VLA 铺进奔驰产线。</p>\n';
body += '    <p><strong>① 上半场是「解禁日」三连（#1–#3）</strong>。Google 把 10 月 28 日只给网安防御者的 Gemini 4 Carbon 全面 GA，用三项真实工作流评测第一与「与 Argon 同价」接招 Fable 5.2 的跑分登顶；Anthropic 同一天做了两件事——正式启动 IPO 路演把 $70–78 定价与七巨头 260 亿配售摆上台面，又把 Claude 从聊天框铺成 Whiteboards / Sheets / Data 办公套件，直接把微软股价砸掉 3%。<strong>上市前夜的技术、产品、资本三张牌一次出完，不是巧合</strong>。</p>\n';
body += '    <p><strong>② 中间三条都在「铺入口」（#4–#6）</strong>。Stripe 完成史上最大收购、把 OpenRouter 的模型路由与自己的支付结算并成一层 AI 经济基建；MiniMax 把 4K 生图压进十秒并开放权重、单价砍到同档 50–70%；OpenAI 让 12 亿周活的 ChatGPT 长出商家主页与 Business Agent，放弃站内成交、改做发现与广告层。三家抢的是同一件事：<strong>用户的工作、调用与决策，默认发生在谁的地盘</strong>。</p>\n';
body += '    <p><strong>③ 收尾两条落到产线与物理世界（#7–#8）</strong>。Adobe MAX 把生成式视频 / 音效 / 配乐塞进 Premiere 时间轴、图层仍可编辑，并预告 2027 年初的本地 MCP；GR00T 2 与 Gemini Robotics 2.5 同日双发，VLA 在奔驰在用产线做到 96% 分拣。两者共同把评价标准从「会不会」推到「能不能在强节拍现场稳定交付、还能不能被人接手」。</p>\n';
body += '    <p>一句话：<strong>昨天在比谁更强更省，今天在比谁先把能力铺到所有人手边，而铺得越快，越要把权限、口径与账本先写清楚</strong>。</p>\n';
body += '    <p>今天最高分给到 <strong>#1 Google 全面开放 Gemini 4 Carbon（9.4 / P0）</strong>：分量不只在三项真实工作流评测第一与「最强档不加价」，更在它把竞争口径从跑分正式拉到「能否交付 + 单位任务成本」，并用 <code>/swarm</code> 把长程多智能体做成一个产品开关，同时以「先限后放」的安全部署示范了前沿能力该如何解禁——是本期所有「铺开」叙事的起点。</p>\n';
body += '    <p>五条可以立刻执行的线索：<strong>① 用 <code>/swarm</code> 式分工试点一版 KV 多尺寸衍生 / 多语言本地化</strong>（旗舰管创意终审、轻模型管切图换字、验证器管格式），但先按 Carbon「12 月 $4/$20」与「高 37 分却贵 4.4 倍」复测单任务成本再切；<strong>② 把 AI 工具预算写成弹性条款</strong>——首发体验价会到期、厂商进入公开市场后定价与配额受季度财报约束，并把「供应商财报 / 容量公告 / 合并后合同变动」纳入月度巡检；<strong>③ 用 H3-Image + Seedream 5.5 固化「品牌资产锁定 → 多参考图喂入 → 4K 直出 / 多轮改稿 → 透明合成 → 人工终审」工序</strong>，跑 10–20 轮一致性压测、核对首周五折到期后单价与开放权重商用授权；<strong>④ 用 Claude 办公套件在非敏感项目跑「白板 → 行动项 → 表格 → 看板」闭环</strong>，重点验「实时共享无需交出数据源凭据」，正式财务建模与含玩家数据的表暂不迁入；<strong>⑤ 把 Adobe MAX 已转正的时间轴生成媒体 / Relight / 移除工具排进 PV 补镜头与穿帮擦除试点</strong>，本地 MCP 与 Firefly Graph 列 2027 预研、不写进本季度排期，同时把「品牌在主流 AI 助手里被如何提及」纳入白帽 AEO 巡检、明确不操纵模型输出的合规红线。</p>\n';
body += '  </div>\n</div>\n</div>\n\n';

fs.writeFileSync(OUT, head + body + tail, 'utf8');
const out = fs.readFileSync(OUT, 'utf8');
console.log('written', OUT, fs.statSync(OUT).size, 'bytes');
console.log('title 2026.11.11 =', out.indexOf('<title>AIGC 日报 · 2026.11.11</title>') !== -1);
console.log('stale 2026.11.10 =', out.indexOf('2026.11.10') !== -1);
console.log('stale 第 94 期 =', out.indexOf('第 94 期') !== -1);
console.log('stale Issue 94 =', out.indexOf('Issue 94') !== -1);
console.log('</head> count =', (out.match(/<\/head>/g) || []).length);
console.log('cards =', (out.match(/class="card"/g) || []).length);
console.log('nav-sub =', (out.match(/nav-link nav-sub/g) || []).length);
console.log('sections =', (out.match(/class="section"/g) || []).length + (out.match(/class="section-highlight"/g) || []).length);
console.log('chips =', (out.match(/class="data-chip"/g) || []).length);
console.log('progressFill DOM =', out.indexOf('id="progressFill"') !== -1);
console.log('lead has content =', /<p class="lead">\S/.test(out));
console.log('back-to-archive =', out.indexOf('返回归档') !== -1);
