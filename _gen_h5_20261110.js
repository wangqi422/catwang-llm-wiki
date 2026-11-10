const fs = require('fs');
const TPL = 'docs/ai-daily/ai-daily-card-20261109-toc.html';
const OUT = 'docs/ai-daily/ai-daily-card-20261110-toc.html';
const lines = fs.readFileSync(TPL, 'utf8').split('\n');

// head: 到含 </head> 的那一行；title 用正则强制改日期
let headIdx = lines.findIndex(l => l.trim() === '</head>');
let head = lines.slice(0, headIdx + 1).join('\n');
head = head.replace(/<title>[^<]*<\/title>/, '<title>AIGC 日报 · 2026.11.10</title>');

// tail: 从 <button class="back-to-top" 到文件末尾（含 ScrollSpy JS 与「← 返回归档」按钮，无日期文案）
let tailIdx = lines.findIndex(l => l.indexOf('<button class="back-to-top"') !== -1);
let tail = lines.slice(tailIdx).join('\n');

const items = [
  {
    n: 1, id: 'item-1',
    title: 'Anthropic 发布 Claude Fable 5.2 / Mythos 5.2：IPO 前夜重夺性能王座，AA 指数 65 分登顶、API 再降价 20%',
    tag: '🚀 旗舰模型 / 分级开放 / 推理经济性',
    desc: '美东时间 11 月 9 日，<strong>Anthropic 发布新一代旗舰 Claude Fable 5.2 与 Claude Mythos 5.2</strong>，11 月 10 日中文媒体集中报道。两款<strong>共享同一底层模型</strong>，差别在安全边界与访问权限：Fable 5.2 面向所有用户、内置网络安全与生物安全防护；Mythos 5.2 削减这两类防护，通过 Cyber / Life Sciences 验证计划仅向审核过的研究机构开放。官方称新模型在复杂编程、科研推理、图表理解、电脑操作与机器人控制上系统升级，<strong>输出速度较前代最高提升 30%</strong>，API 价格下调 <strong>20% 至每百万输入 8 美元 / 输出 40 美元</strong>，已在 Claude Platform / Claude Code / AWS / Google Cloud / Azure / OpenRouter / Cursor / Devin / Perplexity / Higgsfield 全渠道上线。<strong>跑分全面登顶</strong>：Artificial Analysis Intelligence Index v5 以 <strong>65 分第一</strong>（Gemini 4 Carbon 60、Opus 5.5 59）；FrontierCode 2.0 复杂编程 32.4% → <strong>49.1%</strong>；Chartography 图表理解 44.8% → <strong>73.4%</strong>；ARC-AGI-2 报 93.8%；Arena WebDev / Code Arena / AA-3D 均登顶。<strong>从「发一个最强模型」到「同一底座分级开放」</strong>：本质是<strong>把权限、安全边界与合规范围做成可出售的服务包</strong>，preserved thinking 全 API 账号覆盖以反蒸馏（官方称可减少被蒸馏数据 90%–99%），模型网关、身份认证、权限控制、日志审计正成为模型服务的基础设施层。<strong>长程多智能体是最硬的差异化</strong>：1000 个运行 Fable 5.2 早期版本的智能体在无 Prove2Me 平台与研究者指导的沙箱内、用 <strong>28.7 小时复现费马大定理的形式化证明</strong>（输出 token 仅为 9 月首次形式化的 1/3、证明长度 1/7，Opus 5.5 同期仅完成 26%）；另有协调逾 1000 个子智能体 <strong>8 天从零构建可启动的原型操作系统</strong>、与 Diode Computers 合作端到端设计三种电子设备（PCB / CAD / 固件 / DFM，三块电路板直接由工厂按设计文件制造）、Mythos 5.2 预测基因治疗载体 AAV 完整衣壳结构（AAV2 误差约一个原子宽度）、在 MIPLIB 203 个优化难题中 72 次超过已知最优解。<strong>边界与反面注脚</strong>：所有跑分为官方公布或第三方早期评测、口径不一且尚无统一独立复测；Addy Osmani 与实测者指出 <strong>Fable 5.2 token 消耗偏高、单任务成本与 5.1 相当</strong>，降价不等于总账单下降；Ethan Mollick 评其「接近 AGI 但仍呈锯齿状」；归档 9 月曾报过「费马大定理形式化证明首次完成」，今天是<strong>同一证明的多智能体复现实验</strong>、属新能力佐证而非重复选题。',
    chips: [['AA 指数', '65 分登顶'], ['FrontierCode 2.0', '32.4% → 49.1%'], ['定价', '$8 / $40 · 降价 20%'], ['长程智能体', '1000 个 · 28.7h']]
  },
  {
    n: 2, id: 'item-2',
    title: 'Meta 发布最小最高效模型 Muse Ember：36 分追平 Claude Haiku 5.5、成本仅 1/3，$0.10/$0.50 每百万 token',
    tag: '🪙 小模型 / Agent 高频任务 / 单位成本',
    desc: '11 月 9 日 <strong>Meta 发布 Muse Ember（muse-ember-1.0）</strong>，官方定位「<strong>最小、最高效的复杂推理执行模型</strong>」，面向工具调用、编码子任务、路由、抽取、长文档解析等智能体日常高频重复任务，扎克伯格本人发推、AI at Meta 与 Artificial Analysis 同步跟进。第三方评测给出关键对照：<strong>Artificial Analysis 智能指数 36 分，追平 Claude Haiku 5.5，而单任务成本仅约三分之一</strong>；官方对标 Claude Haiku 5.5 与 GPT-6 Luna 给出逐项成本与基准对比。定价极致激进：<strong>Meta Model API 每百万输入 0.10 美元 / 输出 0.50 美元</strong>，同步上线 OpenRouter、Google Cloud（连同 Muse Wonder、Muse Spark 1.3），并在 <strong>Code Arena: WebDev 以 1608 分登顶「最高分小模型」</strong>。<strong>与 #1 构成同一天的一体两面</strong>：Anthropic 用 Fable 5.2 冲「最强」，Meta 用 Muse Ember 拼「最省」，前者服务难任务与长程智能体，后者接管占调用量大头的高频重复步骤——<strong>大模型竞争已从「谁更聪明」分化成「谁把单位任务成本压得更低」</strong>。<strong>小模型的价值不在跑分而在调度位</strong>：Agent 工作流里真正烧钱的是路由、抽取、格式校验、子任务编码这类海量轻任务，把这一层从旗舰换成 36 分 / 1/3 成本的 Ember，等于<strong>给多智能体系统装了经济档</strong>，也是 #1「1000 智能体」这类长程任务能否规模化商用的前提。<strong>生态铺开速度是信号</strong>：发布当天即上 Meta Model API / OpenRouter / Google Cloud / Arena 榜单，明显冲「默认小模型」的生态位，而非一次研究展示。<strong>边界</strong>：36 分与「成本 1/3」来自 AA 与 Meta 各自口径、无统一独立复测；小模型在开放、需全局自洽的长程任务上仍有明显短板（对照 11-09 期双基准）；$0.10/$0.50 为 Meta Model API 定价，第三方平台另计；官方未披露参数规模与训练细节。',
    chips: [['智能指数', '36 分 · 追平 Haiku 5.5'], ['单任务成本', '约 1/3'], ['定价', '$0.10 / $0.50'], ['WebDev 小模型', '1608 分登顶']]
  },
  {
    n: 3, id: 'item-3',
    title: '字节 Seedream 5.5 发布：支持最多 100 轮像素级稳定图像编辑与原生 RGBA 透明输出',
    tag: '🎨 图像创作 / 多轮编辑 / 设计产线',
    desc: '11 月 9 日，<strong>字节跳动 Seed 团队发布新一代图像创作模型 Seedream 5.5</strong>（豆包 / 即梦 / 火山引擎同系），核心升级两点：<strong>支持最多 100 轮像素级稳定图像编辑</strong>——多轮反复修改下主体、光影与细节保持一致，不随轮次累积漂移；以及<strong>原生 RGBA 透明输出</strong>，可直接产出带透明通道的素材、省去后期抠图。The Decoder、IT之家与火山引擎当日集中报道。<strong>「改 100 轮不崩」直击产线痛点</strong>：当前 AI 出图最常见的问题不是首图不好，而是<strong>改到第五、第六轮主体就变形</strong>；把多轮稳定性做成明确指标，意味着模型从「抽卡工具」向「可承接修改意见的产线工位」靠近，与 11-09 期富士电视台「本地素材训练 → 提示词生成 → 后期校色调」的三道工序是同一方向。<strong>RGBA 透明输出是宣发场景的关键拼图</strong>：角色立绘、武器贴花、活动徽章、UI 角标这些素材需要透明底才能进合成，原生透明通道省掉抠图与边缘处理，直接缩短 KV 衍生与本地化改版的一道工序。<strong>与视频侧形成矩阵</strong>：同周还有 fal FLUX 3 Max 五折、PixVerse Draw to Fly、ComfyUI v0.44（Branch Node / LoRA 堆叠）等更新，图像侧竞争正从「单张惊艳」转向「可控、可复改、可交付」。<strong>边界</strong>：「100 轮」与「像素级稳定」为厂商口径、尚无第三方跨轮次一致性评测；原生 RGBA 的边缘质量与印刷 / 游戏引擎色彩管理兼容性未披露；国内媒体多为转述、官方技术报告细节有限。',
    chips: [['多轮编辑', '最多 100 轮稳定'], ['透明输出', '原生 RGBA'], ['竞争点', '可复改 / 可交付'], ['可试点', '立绘 / 贴花 / 徽章']]
  },
  {
    n: 4, id: 'item-4',
    title: 'Google 第八代 TPU 扩至四款：发布 TPU 8tx 机密计算与 8i Max 双芯片长上下文，一年内四款变体',
    tag: '🔲 AI 芯片 / 算力基建 / 长上下文',
    desc: '11 月 9 日 <strong>Google 宣布扩充第八代 TPU 阵容，新增 TPU 8tx 与 TPU 8i Max</strong>，Sundar Pichai、Google 官方账号与 AMD CEO Lisa Su 均发声。<strong>TPU 8tx 面向政府机构及受监管行业的保密计算 / 机密推理需求</strong>，可与 AMD 芯片协同（Lisa Su 确认 <strong>AMD EPYC 为 TPU 8tx 主机处理器</strong>）；<strong>TPU 8i Max 则把两颗 TPU 芯片封装在一起</strong>、提升算力与内存容量，面向需要<strong>长上下文窗口</strong>的 AI 应用。两款预计 <strong>2027 年推出</strong>。至此 Google 一年内交付四款 TPU 变体，行业研究预计 TPU 相关芯片、软件与硬件销售额到 <strong>2028 年将超过 1350 亿美元</strong>，远高于 2026 年预计的约 120 亿美元。<strong>按场景切芯片，而非一颗通用加速器</strong>：机密计算与长上下文被拆成两款专用 silicon，说明<strong>推理负载的分化已经细到硬件层</strong>；与 #1 Fable 5.2「同一底座分级开放」是同一种思路，只是落在芯片上。<strong>与 Nvidia 的正面竞争 + AMD 站队</strong>：一年四款变体、EPYC 作主机 CPU，配合 #6「蓝色浪潮」下数据中心电力与审批收紧，Google 在卖的其实是「同等电力预算下能跑更多长上下文任务」的能效账本。<strong>1350 亿 vs 120 亿的落差要打折看</strong>：这是行业研究对 2028 年的预测口径、含软件与硬件，不等于已确认订单；两款产品 2027 才推出，中间存在路线图调整与监管变量。<strong>边界</strong>：产品为「预计 2027 年推出」的发布阶段、尚无实机与第三方基准；销售额为第三方行业预测；机密计算的具体合规认证、8i Max 的双芯片互联与内存规格未完整披露。',
    chips: [['TPU 8tx', '机密计算 · EPYC 主控'], ['TPU 8i Max', '双芯片 · 长上下文'], ['推出时间', '预计 2027 年'], ['2028 预测', '>1350 亿美元']]
  },
  {
    n: 5, id: 'item-5',
    title: 'Anthropic 最快本周启动 IPO 路演：S-1 冷静期今日届满，估值讨论 1.1–1.7 万亿美元，拟月内登陆纳斯达克',
    tag: '📈 IPO / 资本 / 估值分歧',
    desc: '据 11 月 9 日媒体报道，<strong>Anthropic 最快 11 月 10 日（本周二）正式启动 IPO 投资者营销（路演）</strong>。依据 SEC 规定，公司公开提交 IPO 注册文件后须满 <strong>15 个日历日</strong>才能启动面向投资者的营销；Anthropic 于 <strong>10 月 26 日公开提交 S-1</strong>，今日正好是冷静期届满后的最早窗口。若进展顺利，有望 <strong>11 月 16 日当周完成定价并登陆纳斯达克</strong>（代码 ANT），赶在 11 月 26 日感恩节前完成上市。估值讨论分歧明显：<strong>Morningstar 报告称 Anthropic 股权价值约 1.7 万亿美元</strong>，Bloomberg 则报道 AI 融资遇冷、IPO 估值讨论下探至 <strong>1.1 万亿美元</strong>；同期 OpenAI 于 11 月 7 日完成约 110 亿美元首期融资、对应估值 <strong>1.25 万亿美元</strong>（本轮总额最高 200 亿美元，低于 9 月原定 1.4 万亿目标）。<strong>产品发布与资本窗口被精确对齐</strong>：S-1 冷静期届满日 = 旗舰模型发布次日 = 路演最早窗口，这不是巧合，而是上市前把「技术竞争力」与「商业化潜力」同时摆给机构投资者的标准动作。<strong>1.1 万亿 ~ 1.7 万亿的分歧本身就是信号</strong>：约 6000 亿美元的跨度，反映的是 11 月 5 日中期选举后 AI 板块集体抛售（纳指单日 -5.52%、英伟达 -9.26%）、以及「公开市场是否愿意接盘」的疑问。<strong>与 11-08 / 11-09 期连成一条账本线</strong>：11-08 报招股书「到 2045 年近 9000 亿美元算力与基建承诺」、11-09 报「34 亿美元接手 1.7GW 燃气发电机组」把承诺兑现成实物，今天报的是这些资产与承诺<strong>即将接受公开市场定价</strong>。<strong>边界</strong>：路演与定价时间均为媒体援引知情人士的最快窗口、非官宣；1.1 万亿 / 1.7 万亿为第三方估值讨论区间、非发行价；S-1 可更新、发行规模与定价未定；AI 板块波动与监管变化都可能推迟时间表。',
    chips: [['冷静期', '10/26 S-1 · 今日届满'], ['估值区间', '1.1 – 1.7 万亿美元'], ['拟上市', '纳斯达克 ANT'], ['对照', 'OpenAI 1.25 万亿']]
  },
  {
    n: 6, id: 'item-6',
    title: '「蓝色浪潮」冲击美国 AI 基建：参议院审议 BAAJA 让数据中心自担电网成本，高盛估暂停令或影响 45% 规划产能',
    tag: '⚖️ 监管政策 / 数据中心 / 电力',
    desc: '美国中期选举民主党大胜、控制两院并在数据中心产业集中的<strong>得克萨斯、佐治亚、俄亥俄</strong>赢得州长选举后，竞选期间承诺的<strong>收紧 AI 监管、暂停新建数据中心</strong>开始进入立法程序。<strong>11 月 10 日参议院审议两党能源法案《两党美国可负担性与就业法案》（BAAJA）</strong>：一方面加快新建发电厂与输电线路审批，另一方面<strong>要求大型数据中心运营商承担更多为其服务的电网升级成本</strong>，并设保护条款防止项目失败后由居民与公用事业用户兜底。特朗普公开支持并敦促通过，但 TD Cowen 估通过概率已从选举前的 <strong>40% 降至 25%</strong>。<strong>高盛估算潜在数据中心建设暂停令或影响美国 45% 规划产能</strong>；得州当选州长称在保障措施到位前必须暂停相关项目，南卡当选参议员提议对新建数据中心实施两年禁令。同期欧洲 <strong>11 月 6–7 日 15 国上百个组织联合抗议</strong>超大规模数据中心扩张，爱尔兰数据中心耗电已占全国约 23%、丹麦把大型数据中心排在供电顺序最后，微软因供电推迟至 2030 年后退出英国埃塞克斯项目。<strong>与 11-09 期正面照面：一边自己买电，一边国会限电</strong>——昨天 Anthropic 用 34 亿美元接手 1.7GW 燃气发电机组、把并网排队优先权买断，今天参议院开始要求数据中心自担电网升级成本、州长酝酿暂停令；<strong>同一批玩家，前一天在解决电力供给，后一天被要求为电力外部性买单</strong>。<strong>瓶颈已从芯片移到土地、绿电、地方许可与电价政治</strong>：野村报告指出电网升级与新增发电成本无法再转嫁给居民，新建超大规模数据中心的周期将被显著拉长。<strong>边界</strong>：BAAJA 仍在参议院审议、通过概率被下调至 25%；「两年禁令」「暂停先进 AI 开发」多为当选议员表态与提议、尚未成为法律；45% 产能影响为高盛情景估算；欧洲抗议与项目退出为个案，不等于全欧停建。',
    chips: [['法案', 'BAAJA · 自担电网成本'], ['通过概率', '40% → 25%'], ['产能影响', '高盛估 45%'], ['欧洲', '15 国联合抗议']]
  },
  {
    n: 7, id: 'item-7',
    title: '百度发布 ERNIE Evolve 自动化研究系统：AI 自动刷新 NanoChat / NanoGPT Speedrun 纪录并落地推理优化',
    tag: '🔁 AI for AI Research / 训练优化',
    desc: '11 月 9 日，<strong>百度发布 ERNIE Evolve 自动化研究系统</strong>，官方称该系统<strong>刷新 NanoChat 与 NanoGPT Speedrun 纪录</strong>（这类 speedrun 衡量在固定算力预算下把模型训练到目标损失所需的时间），并已把研究成果<strong>落地到 ERNIE-5.5-Flash 的推理优化</strong>。核心思路是让 AI 智能体自主提出、实现并评估训练与推理的改进方案，把过去依赖研究员手工调参的迭代循环自动化。<strong>「AI 做 AI 研究」从演示走向可验收产物</strong>：与 11-09 期 AutoDNA 把实验拆成可校验原子步骤、#1 用 1000 智能体复现数学证明同构——<strong>在有明确指标（损失 / 训练时长 / 吞吐）且可自动验证的闭环里，智能体已能自主迭代</strong>；差别是这次的验收标准是 speedrun 榜单与真实推理优化落地。<strong>与「推理经济性」主线合流</strong>：#2 Muse Ember 靠模型架构压成本、#4 TPU 靠硬件压成本，ERNIE Evolve 走的是<strong>让 AI 自动优化训练与推理代码</strong>这条路，三条路径同时出现，说明「降本」已成为与「提能力」并列的独立工程方向。<strong>国产开源生态的连续剧</strong>：与 11-06 期「百度 ERNIE 5.5 Flash Base 开源 280B/14B 激活」属不同事件（那次是权重开源，这次是自动化研究系统 + 推理优化落地）；同期还有小红书 DeCoRL 多图合成强化学习、美团 LongCat-2.5 开源等，国产阵营在「方法 + 系统」层的产出密度在上升。<strong>边界</strong>：speedrun 纪录与优化幅度为厂商自报口径、尚无第三方独立复现；NanoChat / NanoGPT 为小规模研究基准，不能直接外推到前沿大模型训练；ERNIE-5.5-Flash 的具体推理增益数据未完整披露。',
    chips: [['刷新', 'NanoChat / NanoGPT'], ['落地', 'ERNIE-5.5-Flash 推理'], ['范式', '可自动验证闭环'], ['方向', '推理经济性']]
  },
  {
    n: 8, id: 'item-8',
    title: 'Zyphra 开源 ZONOS3-Mini：稀疏 MoE 端侧 TTS，手机浏览器实时零样本语音克隆',
    tag: '🔊 开源 TTS / 端侧推理 / 语音克隆',
    desc: '<strong>Zyphra Research 发布并开源 ZONOS3-Mini</strong>，一个 <strong>Apache 2.0 许可的零样本语音克隆 TTS 模型</strong>，采用<strong>稀疏 MoE 架构、总参数 8 亿 / 激活参数仅 1 亿</strong>。关键在端侧实时性：在 <strong>Pixel 9 浏览器端 Time To First Audio 低于 570 ms</strong>、在 <strong>M3 MacBook Air 上低于 150 ms</strong>，即无需服务器即可在手机浏览器里完成实时语音合成。<strong>端侧 TTS 的门槛被压到「浏览器即可跑」</strong>：8 亿总参 / 1 亿激活的稀疏 MoE + 亚秒级首音，意味着<strong>配音、旁白、多语言本地化可以在用户设备或本地工作站完成</strong>，不必把音频上传到云端 API，隐私与延迟同时改善。<strong>与本期主线呼应</strong>：#2 Muse Ember 把「高频轻任务」下沉到小模型，ZONOS3-Mini 把「语音合成」下沉到端侧，方向一致——<strong>能力不再只堆在云端旗舰，而是按成本与延迟分层铺开</strong>。<strong>零样本克隆是双刃剑</strong>：Apache 2.0 全开源降低了多语言配音与角色试音的成本，但「任意音色克隆」也把声音权合规推到台前（对照 11-09 期猫王 / Eminem 版权方援引 ELVIS 法案起诉 Suno），<strong>商用必须配授权名单与生成留痕</strong>。<strong>边界</strong>：570 ms / 150 ms 为厂商在特定设备上的自报数据、跨机型与浏览器差异未披露；零样本克隆的相似度、多语言覆盖与情感控制无第三方评测；Apache 2.0 许可不等于训练数据已获声音权授权。',
    chips: [['架构', '8 亿总参 / 1 亿激活'], ['Pixel 9 浏览器', 'TTFA < 570ms'], ['M3 MBA', 'TTFA < 150ms'], ['许可', 'Apache 2.0']]
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

const LEAD = '今天的 8 条新闻，主线是<strong>冲最强与拼最省，是同一天</strong> &middot; 上半场是两个极端：<strong>Anthropic 在 IPO 路演窗口打开的当天发布 Claude Fable 5.2 / Mythos 5.2</strong>，Intelligence Index v5 以 65 分登顶、FrontierCode 2.0 冲到 49.1%、API 再降价 20%；<strong>Meta 同日反向发布「最小最省」的 Muse Ember</strong>，36 分追平 Claude Haiku 5.5 而成本仅 1/3；<strong>字节 Seedream 5.5</strong> 把「改 100 轮不崩 + 原生 RGBA 透明」递到设计师手里 &middot; 中场三件都在模型之外：<strong>Google 把第八代 TPU 扩至四款</strong>（8tx 机密计算 / 8i Max 双芯片长上下文）、<strong>Anthropic 最快本周启动 IPO 路演</strong>（估值讨论 1.1–1.7 万亿美元）、<strong>「蓝色浪潮」让参议院开始给数据中心算电费</strong>（BAAJA 法案 + 高盛估暂停令或影响 45% 规划产能），与昨日 34 亿买燃气机组正面照面 &middot; 收尾两条是方法与工具：<strong>百度 ERNIE Evolve 让 AI 自动刷新训练 speedrun 纪录</strong>、<strong>Zyphra 把零样本语音克隆 TTS 塞进手机浏览器</strong>';

const navSub = [
  ['Fable 5.2 登顶', 'Muse Ember 最省', 'Seedream 5.5'],
  ['TPU 扩至四款', 'IPO 路演窗口', '蓝色浪潮限电'],
  ['ERNIE Evolve', 'ZONOS3-Mini']
];

let body = '\n<body>\n\n<div class="progress-bar"><div class="progress-bar-fill" id="progressFill"></div></div>\n\n<nav class="sidebar" id="sidebar">\n';
body += '  <div class="sidebar-header">\n';
body += '    <div class="sidebar-brand">AI Daily Report</div>\n';
body += '    <h1>AIGC <em>日报</em></h1>\n';
body += '    <div class="sidebar-meta">2026.11.10 &middot; 星期二 &middot; 第 94 期 &middot; 8 条速报</div>\n';
body += '  </div>\n\n';
body += '  <div class="nav-section">\n    <div class="nav-section-title">Overview</div>\n';
body += '    <a href="#top" class="nav-link active"><span class="nav-num">&middot;</span>今日速览</a>\n  </div>\n\n';

const secMeta = [
  ['Frontier &amp; Efficiency', '🚀 冲最强 · 拼最省', '#s1', navSub[0]],
  ['Compute, Capital &amp; Regulation', '⚡ 算力 · 资本 · 红线', '#s2', navSub[1]],
  ['Tools &amp; Methods', '🛠️ 递到手里的工具', '#s3', navSub[2]]
];
secMeta.forEach((sm, i) => {
  body += '  <div class="nav-section">\n    <div class="nav-section-title">' + sm[0] + '</div>\n';
  body += '    <a href="' + sm[2] + '" class="nav-link"><span class="nav-num">&sect;' + (i + 1) + '</span>' + sm[1] + '</a>\n';
  sm[3].forEach((t, j) => {
    // §3 只有 2 条，item 编号从 7 开始
    const itemNo = (i < 2) ? (i * 3 + j + 1) : (6 + j + 1);
    body += '    <a href="#item-' + itemNo + '" class="nav-link nav-sub"><span class="nav-num">' + (j + 1) + '.</span>' + t + '</a>\n';
  });
  body += '  </div>\n\n';
});
body += '  <div class="sidebar-dots">\n    <i style="background:var(--pink)"></i>\n    <i style="background:var(--lemon)"></i>\n    <i style="background:var(--blush)"></i>\n    <i style="background:var(--sage)"></i>\n  </div>\n';
body += '</nav>\n<div class="main">\n<div class="page">\n';

body += '<div class="header" id="top">\n';
body += '    <div class="swatches">\n      <i style="background:var(--pink)"></i>\n      <i style="background:var(--lemon)"></i>\n      <i style="background:var(--blush)"></i>\n      <i style="background:var(--sage)"></i>\n    </div>\n';
body += '    <div class="header-kicker">AI Daily Report &middot; 2026.11.10 &middot; Tue &middot; Issue 94</div>\n';
body += '    <h1>AIGC <em>日报</em></h1>\n';
body += '    <p class="lead">' + LEAD + '</p>\n';
body += '    <div class="header-meta">\n      <span class="meta-tag">🚀 冲最强 &amp; 拼最省</span>\n      <span class="meta-tag">&middot;</span>\n      <span class="meta-tag">⚡ 算力 · 资本 · 红线</span>\n      <span class="meta-tag">&middot;</span>\n      <span class="meta-tag">🛠️ 递到手里的工具</span>\n      <span class="meta-tag">&middot;</span>\n      <span class="meta-tag">2026.11.10 &middot; 第 94 期</span>\n    </div>\n  </div>\n\n\n';

const secInfo = [
  ['i. Frontier &amp; Efficiency', '🚀 冲最强 · 拼最省', '一个冲天花板、一个抠单位成本 —— Fable 5.2 登顶、Muse Ember 压成本、Seedream 5.5 补产线工序', 'section', '3 items'],
  ['ii. Compute, Capital &amp; Regulation', '⚡ 算力 · 资本 · 红线', '都在模型之外 —— TPU 按场景切芯片、S-1 冷静期届满启动路演、国会开始给数据中心算电费', 'section-highlight', '3 items'],
  ['iii. Tools &amp; Methods', '🛠️ 递到手里的工具', '一个给可验收的迭代方法、一个给端侧下沉的能力 —— ERNIE Evolve 与 ZONOS3-Mini', 'section', '2 items']
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
body += '    <p>八条其实在讲同一件事：<strong>冲最强与拼最省，是同一天</strong>。前沿能力还在往天花板冲，但决定它能不能被大规模用起来的，已经换成了单位任务成本、电力与审批、以及能不能直接进产线。</p>\n';
body += '    <p><strong>① 上半场是两个极端（#1–#3）</strong>。Anthropic 在 IPO 路演窗口打开当天发布 Fable 5.2 / Mythos 5.2，用 65 分登顶、49.1% 编程、1000 智能体 28.7 小时复现费马证明来证明「最强」；Meta 同日交出 36 分追平 Haiku 5.5、成本仅 1/3 的 Muse Ember 来回答「最省」；字节 Seedream 5.5 则把「改 100 轮不崩 + 透明通道」递到设计师手里。一个冲能力上限，一个抠单位成本，一个补产线工序——<strong>同一个推理经济性之战的三个截面</strong>。</p>\n';
body += '    <p><strong>② 中间三条都在模型之外（#4–#6）</strong>。Google 按机密计算与长上下文把 TPU 切成四款；Anthropic 的 S-1 冷静期今日届满、路演与旗舰发布精确对齐；「蓝色浪潮」让参议院开始要求数据中心自担电网成本。与 11-09 期「34 亿美元买下 1.7GW 燃气机组」连起来看最清楚：<strong>玩家前一日买断电力供给，次日被要求为电力外部性买单</strong>，昨日报的是账本上的承诺，今天报的是承诺怎么被公开市场与地方政治重新定价。</p>\n';
body += '    <p><strong>③ 收尾两条是方法与工具（#7–#8）</strong>。ERNIE Evolve 让 AI 自主刷新训练 speedrun，ZONOS3-Mini 把语音克隆塞进手机浏览器——前者给「怎么把迭代变成可验收闭环」，后者给「怎么把能力下沉到端侧」，但两者也都提醒：自动化要配自建基准，开源要配授权名单。</p>\n';
body += '    <p>一句话：<strong>冲最强的和拼最省的同一天登场，而电网与国会开始给这场竞赛划线</strong>。</p>\n';
body += '    <p>今天最高分给到 <strong>#1 Anthropic 发布 Claude Fable 5.2 / Mythos 5.2（9.5 / P0）</strong>：分量不只在跑分登顶，更在「同一底座分级开放 + 1000 智能体长程交付」把模型竞争从榜单推到用途分级与调用经济，且发布时点与 IPO 路演窗口精确对齐，是本期所有「模型之外」叙事的起点。</p>\n';
body += '    <p>四条可以立刻执行的线索：<strong>① 把 KV 衍生页 / 活动 H5 / 数据可视化素材列入「首稿自动化」试点</strong>，但按 Fable 5.2「token 消耗高、单任务成本未降」的实测，先用自己的工作流复测单任务成本再砍预算；<strong>② 把标题分类、标签打标、摘要初筛、多语言改写、素材元数据抽取迁到 Ember 档经济模型</strong>，旗舰额度只留创意与终审，切换前用自建验收集复测准确率；<strong>③ 用 Seedream 5.5 做角色立绘 / 武器贴花 / 活动徽章的多轮改稿与透明通道合成试点</strong>，跑 10–20 轮一致性压测，并固化「品牌资产锁定 → 提示词改稿 → 透明合成 → 人工终审」四道工序；<strong>④ 建立 AI 素材合规与供应商风险双清单</strong>——禁用艺人与声线名单、授权音色白名单、生成提示词留痕，加上「算力供应商区域政策 / 限流 / 财报容量公告」月度巡检，大版本排期预留本地渲染或离线兜底。</p>\n';
body += '  </div>\n</div>\n</div>\n\n';

fs.writeFileSync(OUT, head + body + tail, 'utf8');
const out = fs.readFileSync(OUT, 'utf8');
console.log('written', OUT, fs.statSync(OUT).size, 'bytes');
console.log('title 2026.11.10 =', out.indexOf('<title>AIGC 日报 · 2026.11.10</title>') !== -1);
console.log('stale 2026.11.09 =', out.indexOf('2026.11.09') !== -1);
console.log('stale 第 93 期 =', out.indexOf('第 93 期') !== -1);
console.log('stale Issue 93 =', out.indexOf('Issue 93') !== -1);
console.log('</head> count =', (out.match(/<\/head>/g) || []).length);
console.log('cards =', (out.match(/class="card"/g) || []).length);
console.log('nav-sub =', (out.match(/nav-link nav-sub/g) || []).length);
console.log('sections =', (out.match(/class="section"/g) || []).length + (out.match(/class="section-highlight"/g) || []).length);
console.log('chips =', (out.match(/class="data-chip"/g) || []).length);
console.log('progressFill DOM =', out.indexOf('id="progressFill"') !== -1);
console.log('lead has content =', /<p class="lead">\S/.test(out));
console.log('back-to-archive =', out.indexOf('返回归档') !== -1);
