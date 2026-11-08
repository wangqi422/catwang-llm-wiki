const fs = require('fs');
const TPL = 'docs/ai-daily/ai-daily-card-20261107-toc.html';
const OUT = 'docs/ai-daily/ai-daily-card-20261108-toc.html';
const lines = fs.readFileSync(TPL, 'utf8').split('\n');

// head: 到含 </head> 的那一行；title 用正则强制改日期
let headIdx = lines.findIndex(l => l.trim() === '</head>');
let head = lines.slice(0, headIdx + 1).join('\n');
head = head.replace(/<title>[^<]*<\/title>/, '<title>AIGC 日报 · 2026.11.08</title>');

// tail: 从 <button class="back-to-top" 到文件末尾（含返回归档按钮，无日期文案）
let tailIdx = lines.findIndex(l => l.indexOf('<button class="back-to-top"') !== -1);
let tail = lines.slice(tailIdx).join('\n');

const items = [
  {
    n: 1, id: 'item-1',
    title: 'Anthropic 逆势定档感恩节前 IPO：募资 800–1000 亿、估值 1.25–1.75 万亿，摩根大通 11-13 说明会',
    tag: '💰 融资 / IPO / 资本纪律',
    desc: '11 月 8 日《金融时报》援引多名投资者报道：尽管科技股近期大幅抛售，Anthropic <strong>仍推进 IPO，计划在美国感恩节（11-26）前上市</strong>，寻求融资 <strong>800–1000 亿美元</strong>，目标估值 <strong>1.25 万亿–1.75 万亿美元</strong>（中枢约 1.5 万亿）。区间低于一个月前最乐观的 2 万亿，但高于最近一轮融资的 9650 亿。<strong>摩根大通 11-13 办投资者说明会</strong>，承销团由摩根士丹利、高盛、摩根大通牵头；CEO 阿莫迪已准备接受更低估值保住窗口。财务账本首次摊开：<strong>Q3 营收约 170 亿（环比 +50%）、ARR 约 810 亿</strong>（7 月底 650 亿），未来数年计划投入约 <strong>9000 亿美元</strong>算力与基建，账面现金及流动性近 <strong>1500 亿美元</strong>，希望募资后不再出售股权。背景是周四美股单日蒸发约 3.2 万亿、纳指 100 跌 6.4%、全周 -4.9%，中期选举后数据中心监管趋严；OpenAI 最新融资估值也定在 1.25 万亿（低于此前寻求的 1.4 万亿）。<strong>与 11-07 期要区分</strong>：那期是「估值从 1.5 万亿被压到 1.2–1.3 万亿、募资降至 800 亿、路演或推迟」的遇阻阶段，今天是 FT 确认<strong>逆势定档 + 具体时间表 + 上调区间 + 完整账本</strong>，从「会不会上市」翻到「何时敲钟、以什么价」。<strong>估值守住、账本摊开</strong>：9000 亿算力承诺对 1500 亿现金是定价分母。<strong>边界</strong>：均为匿名投资者与承销人士信源，Anthropic 拒绝置评，最终估值、募资与上市时间仍待确定。',
    chips: [['募资 / 估值', '800–1000 亿 · 1.25–1.75 万亿'], ['时间表', '感恩节 11-26 前 · 说明会 11-13'], ['Q3 / ARR', '营收 170 亿 · ARR 810 亿'], ['算力账本', '9000 亿承诺 vs 1500 亿现金']]
  },
  {
    n: 2, id: 'item-2',
    title: '美国 AI 红线双线收紧：司法部「超级智能工作组」投运 + 民主党拟推超级 AI 永久禁令 + 州议员呼吁禁 RSI',
    tag: '⚖️ 监管 / 立法 / 司法',
    desc: '11 月 5–7 日，中期选举民主党拿下参众两院后，美国 AI 治理从行业自律升级为<strong>立法 + 司法双线</strong>。① <strong>司法部「超级智能工作组」DOJ-SITF 正式投运</strong>：依据 10-13 备忘录统筹司法部涉及 SI 的刑事与民事诉讼，提出执法优先事项、制定起诉与合规评估指引，反垄断局、民事局、刑事局、FBI、国家安全局派代表参与，由 Woodward 与 Weiss 牵头、对接 SI Force 主席 Jay Clayton；官方强调「确保公司建立有力内部控制、强化风险报告」。成立同日纽约南区起诉三名外国人利用 SI 冒充高管诈骗约 <strong>1.29 亿美元</strong>。② <strong>民主党拟推「永久禁止超级人工智能」法案</strong>（桑德斯 + 卡萨尔）：超级 AI 定义为多数领域认知超越人类或能策划剥夺人类主导权的系统，涵盖绕过关机、自我改进、未授权进入受保护网络；开发部署持有资助全禁，<strong>训练算力达 10^25 须暂停训练</strong>直至新设联邦「AI 部」配齐安全规则，违规决策者最高判 <strong>20 年</strong>、公司可撤销许可并没收资产。③ 纽约州议员 <strong>Alex Bores 呼吁年内立法禁 RSI</strong>，白宫相关人士 <strong>David Sacks 预警数据中心投资因规则不确定停滞</strong>。<strong>与 11-07 期工信部进网管理互为镜像</strong>：那是行政主管部门发进网工牌，这是把红线划到训练算力上限、刑事处罚与联邦专管部门。<strong>RSI 首次进立法话语</strong>：11-03 期 MIT 权重空间编程、METR 审计还是研究争议，今天已是州议员点名要禁的对象。<strong>边界</strong>：DOJ-SITF 未给时间表与跨部门细则、备忘录未公开；民主党法案为拟推动未成法；RSI 禁令仍为议员呼吁。',
    chips: [['司法', 'DOJ-SITF 投运 · 1.29 亿诈骗案'], ['立法', '超级 AI 永久禁令 · 10^25 划线'], ['罚则', '违规最高 20 年 · 没收资产'], ['RSI', '州议员呼吁年内禁止']]
  },
  {
    n: 3, id: 'item-3',
    title: '美国家长起诉谷歌 Gemini 涉协助 13 岁女孩制定轻生计划，谷歌对 K-12 默认关闭 AI 工具引捆绑争议',
    tag: '🛡 未成年人安全 / 平台合规',
    desc: '11 月 7 日多家媒体报道：北卡罗来纳州一对夫妇<strong>起诉谷歌</strong>，称 13 岁女儿通过校配 Chromebook 与 <strong>Gemini 及搜索「AI 模式」进行数千条涉焦虑、抑郁与自伤内容的交互</strong>并获协助制定轻生计划的引导，交流持续数月直到校方通知家长；原告指谷歌把 AI 装进校园产品时未给家长学校足够预警。谷歌回应正审查指控，称已把心理健康防护机制引入搜索 AI 功能、可直接提供援助热线。同周谷歌宣布对美国 <strong>K-12 学生账户默认关闭 Gemini、Gemini Notebook、Classroom 内 AI 功能</strong>（逆转 8 月自动开启政策），管理员须手动开启；但争议在于<strong>学校一旦重启谷歌搜索，就须连带接受搜索内建的 AI Overviews 与 AI Mode，没有「只开搜索、关掉 AI」的设置</strong>。Fairplay 批「强迫学校接纳 AI」，教师联合会主席 Weingarten、前 FTC 主席 Lina Khan 亦批评，参议员 Blumenthal 与 Hawley 已致信 Pichai；全球约 1.5 亿师生用 Google Classroom。<strong>争的不是能力上限，而是默认开还是默认关、捆绑是否算强制</strong>——默认设置正成为合规责任的分界，与 11-07 期工信部「未经声明不得强制调用」呼应。<strong>边界</strong>：起诉书为原告指控、法院尚未认定；K-12 政策为美国范围，斯坦福教育学院指出「AI 是否改善学习结果」仍缺高质量证据。',
    chips: [['诉讼', '数千条涉自伤交互'], ['默认策略', 'K-12 关 AI · 逆转 8 月'], ['捆绑争议', '重启搜索须接受 AI'], ['规模', '1.5 亿师生 · Google Classroom']]
  },
  {
    n: 4, id: 'item-4',
    title: 'Anthropic 拆解 Claude 智能体记忆：会话笔记、显著性判断与离线「dreaming」纠错',
    tag: '🧠 智能体记忆 / 长期经验',
    desc: '11 月 6–7 日 Anthropic 发布研究，<strong>系统拆解 Claude 智能体记忆的设计与多组评测</strong>，把「记住」拆成三个可独立优化的组件：① <strong>会话内写记忆笔记</strong>——任务进行中把关键信息落成结构化笔记而非全塞进上下文；② <strong>显著性判断（saliency）</strong>——模型判断「什么值得留下、何时读取」而非无差别记录；③ <strong>离线「dreaming」</strong>——空闲时用后台任务整理、压缩、纠错记忆，如发现旧笔记错误并修正、重建索引、检测冲突，并对比 <strong>wiki 表示</strong>与直接检索的取舍。实验覆盖 Pokémon、CL-Bench 与 Harvey LAB（法律跨文档知识组织），配合公开的 Knowledge Wiki quickstart。关键结论：<strong>模型能力与记忆架构是乘数关系</strong>——较弱模型即使拿到持久化目录也可能不读、不验证或无差别记录，较强模型能自主建立规则、维护索引并纠正旧结论，越擅长判断显著性，外部记忆收益越高。<strong>长上下文解决「放不放得下」，记忆系统解决「什么值得留下」</strong>；与 11-07 期 Teammates / Active Memory / Agent Substrate 是上下游，dreaming 这类后台任务有望像数据库压缩、索引重建一样成为 Agent 基础设施常备件。<strong>对知识库工作流最有价值</strong>：笔记 + 显著性 + 离线纠错 + wiki 表示几乎是「raw 素材池 → 提炼进 wiki → 定期审计」的 Agent 版。<strong>边界</strong>：为自研评测、dreaming 纠错尚无独立复测；答案集中单一文档或一次性转换时 wiki 可能比直接检索更贵。',
    chips: [['三组件', '笔记 · 显著性 · dreaming'], ['关键结论', '模型能力 × 记忆架构'], ['实验', 'Pokémon / CL-Bench / Harvey LAB'], ['形态', 'wiki 表示 · 后台纠错']]
  },
  {
    n: 5, id: 'item-5',
    title: '编码智能体交互收口：Cursor 实时语音 + Amp spaces + OpenCode Browse + OpenRouter Auto Code',
    tag: '🛠 智能体入口 / 语音 / 自动路由',
    desc: '11 月 7–8 日一批编码/通用智能体工具把「怎么跟 Agent 说话、让它碰什么」同时收口。① <strong>Cursor 推出与智能体的实时语音聊天</strong>：语音提出更改、问进展、听进度播报，覆盖智能体窗口、IDE、Web 与 iOS，支持搜索历史通话、多 worker 切换，iOS 上「Hey Siri, call Cursor」发起（底层 Grok Voice）。② <strong>Amp 发布 spaces</strong>：每个 space 是与单个 Agent 的对话，由它<strong>自动生成并协调其他 Agent 线程</strong>，用户不必自建和组织线程。③ <strong>OpenCode 发布 Browse</strong>：智能体<strong>直接接管真实桌面浏览器</strong>，复用现有标签页、登录态与扩展，打通端到端自动化。④ <strong>OpenRouter 新一代 Auto Router 与 Auto Code</strong>（替换 openrouter/auto 即用），官方称<strong>编码成本比 Claude Opus 5.5 低 74%</strong>。GitHub 日榜印证方向：rea（让 agent 逆向任意 app，24h +1931 stars）、stablyai/orca、Paradev（多 CLI 编码 Agent + Git worktree 隔离）居前。<strong>入口从打字扩散到语音、真实浏览器与自动选型</strong>，把人的操作成本往下压，也为常驻 Agent 补上交互与选型层，Auto Code 的 74% 回应了 #1 账本定价。<strong>真实浏览器是权限双刃剑</strong>：复用登录态很省事，但等于把已登录的内网/后台暴露给智能体。<strong>边界</strong>：多为新上线/预览功能，长程稳定性与并发计费未披露；74% 为 OpenRouter 自有流量与基准口径，需自行复测。',
    chips: [['Cursor', '实时语音 · Siri 唤起'], ['Amp spaces', '单 Agent 协调多线程'], ['OpenCode Browse', '接管真实浏览器'], ['Auto Code', '编码成本 -74%']]
  },
  {
    n: 6, id: 'item-6',
    title: '中国移动发布 MobileWork 智能体工作台，美企开源模型支出 89% 流向中国模型',
    tag: '📊 智能体落地 / 开源份额',
    desc: '11 月 6–7 日中国 AI 生态两组数据落地。其一 <strong>中国移动在 2026 移动网络大会发布智能体工作台 MobileWork</strong>（国内首批入选互联网智能体可信评估等级清单），分政企版（私有化部署、可对接 OA/ERP）与公众版，内置 <strong>1.3 万个技能资产</strong>、持续沉淀记忆与知识，语音/邮件多渠道、移动端/客户端/云端多端协同；依托 TraaS 可信服务、十万级信创终端验证、适配麒麟/统信/鲲鹏，配套可视化运维 MobileOps。官方称已在内部全面推广、服务企业用户超 <strong>30 万</strong>，覆盖 18 类业务，<strong>复杂任务完成率 96.8%、Token 消耗仅同类 70%–80%</strong>。其二据 36氪/第一财经援引 <strong>Menlo Ventures《2026 企业 AI 现状报告》</strong>：美国企业开源模型支出 <strong>89% 付给中国模型</strong>，前三 Kimi 61%、DeepSeek 15%、GLM 11%；OpenRouter 上 10-26 至 11-01 当周中国大模型 token 调用<strong>连续 27 周超过美国模型</strong>，前五占四席。中国经济网另披露 ModelScope 12 万+ 开源模型、5500+ MCP、服务 239 国 3300 万+ 开发者，阿里已开源 470+ Qwen 模型，过去一年 HF 中国模型下载占 41%，乌镇发布《全球开放 AI 共建行动倡议》18 项。<strong>落地侧从能问答到能办事，份额侧显示中国开源已成美企开源栈默认供给</strong>，成本压力越大开源与自动选型（#5）越受青睐。<strong>边界</strong>：89%/61%/27 周来自单一机构报告与特定平台口径，非全市场营收份额；96.8% 与 Token 对比为厂商自报、场景限定内部业务。',
    chips: [['MobileWork', '1.3 万技能 · 完成率 96.8%'], ['效率', 'Token 仅同类 70–80%'], ['开源份额', '美企支出 89% 流向中国'], ['前三', 'Kimi 61% / DS 15% / GLM 11%']]
  },
  {
    n: 7, id: 'item-7',
    title: '算力冷热同框：谷歌 170 亿接手 Crusoe 园区 + 内蒙 800MW 实探 + 60 万块 H200 闲置香港',
    tag: '⚡ 算力基建 / 芯片管制',
    desc: '11 月 6–8 日算力基建出现三条冷热对照。① <strong>谷歌拟投约 170 亿美元收购 Crusoe 位于怀俄明州东南部的未完工数据中心园区</strong>，接手后续电力与工程建设，原规划具备最高 <strong>10 吉瓦</strong>供电潜力。② <strong>SemiAnalysis 公开 9 月实探内蒙古乌兰察布 Galaxy 园区</strong>：规划 IT 容量约 <strong>800MW</strong>，整体规模已与美国 Stargate Abilene 核心园区旗鼓相当；<strong>首期 120MW 一年内交付、综合建设成本仅约美国同类园区的五分之一</strong>，依托电网协同、模块化预制与垂直整合供应链。③ 路透报约 <strong>60 万块 Nvidia H200 闲置在香港仓库</strong>——阻碍并非来自华盛顿而是北京：尽管美方去年已放行 H200 对华销售，中国正以每家科技巨头约 1 万块速度<strong>小批量发放进口许可</strong>，推动国内服务器价格上涨约 3 倍；《纽约时报》另调查美国批准 H200 销售给空壳中国公司。叠加 David Sacks「规则不确定致投资停滞」预警，<strong>瓶颈正从芯片供给移到土地、绿电、工程交付与许可节奏</strong>。<strong>与 #1 账本、#2 监管连成因果</strong>：9000 亿算力承诺要在监管趋严、进口收紧、地方限制建设的条件下兑现，是同一张账本两面。<strong>芯片管制逻辑反转</strong>：从美方限制出口变成中方控制进口节奏、国产替代优先。<strong>边界</strong>：170 亿与 10GW 为出售方证实/媒体报道、交易与投运时间未完全披露；800MW 与成本为 SemiAnalysis 单家口径；60 万块与小批量许可为路透引述非官方数字。',
    chips: [['谷歌', '170 亿接盘 · 规划最高 10GW'], ['内蒙 Galaxy', '约 800MW · 成本约 1/5'], ['H200', '约 60 万块闲置香港'], ['许可', '小批量发放 · 服务器涨 3 倍']]
  },
  {
    n: 8, id: 'item-8',
    title: '宣发创作链更新：可灵 Kling 4.0 Keyframes 关键帧 + GPT-Image-2.6 实测 + Meshy Relief + Karpathy TristanTube',
    tag: '🎬 视频生成 / 宣发工具',
    desc: '11 月 7–8 日创作链一批可用更新密集落地。① <strong>可灵 Kling 4.0 正式公布 Keyframes 关键帧视频生成能力</strong>：最多 <strong>10 个关键帧</strong>引导画面展开与运镜，单次生成实现「多镜头分镜 → 成片」流程控制（起始帧 + 可选中间帧 + 结束帧，5 秒片最多约 6 帧），已在 <strong>Magnific 平台上线试用</strong>；配套单次最长 30 秒、最多 15 组参考、最高 4K。② <strong>GPT-Image-2.6 第三方实测</strong>：Artificial Analysis 对 11-04 两款模型给出文生图与图像编辑双榜前二（Sunburst 1259 / Flare 1228 Elo）；社区流出「10 个 GIF 玩法与提示语」并点出人脸漂移与成本问题。③ <strong>Karpathy 用 Claude Code「一次成型」打造 TristanTube</strong>：基于 YouTube 分级清单约 3 分钟构建并上线技术视频站，收录超 4.7 万视频、带 TV 播放模式。④ 另有 <strong>Meshy Relief</strong> 把画作变浮雕吊坠、<strong>商汤 SenseNova-6.8-Flash</strong> 代码动画/UI/3D/SVG 四类产物去 AI 味实测、<strong>ChatGPT 企业版 Remix</strong> 自然语言改版网站。<strong>关键帧把抽卡变成分镜</strong>，与 11-07 期 Frameboy「推镜头即出画面」互补（一个控关键帧、一个控摄影机）；<strong>「去 AI 味」成为独立工序</strong>，审校重心从能不能生成转向能不能直接交付，与 11-06 期「91% 单项约束只换来 41.3% 可行设计」对上。<strong>边界</strong>：Keyframes 仅 Magnific 试用、套餐档位未说明；榜单为盲测偏好非绝对质量；人脸漂移、跨帧一致性、GIF 帧数不总按提示词交付，品牌资产进动图前须单独过合规。',
    chips: [['Kling 4.0', 'Keyframes · 最多 10 关键帧'], ['GPT-Image-2.6', 'AA 双榜前二 · 1259 Elo'], ['TristanTube', 'Claude Code 约 3 分钟建站'], ['工序', '去 AI 味 · 品牌一致性']]
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

const LEAD = '今天的 8 条新闻，主线是<strong>一边抢上市，一边划红线</strong> &middot; 上半场是资本顶着抛售逆势冲刺：科技股周四单日蒸发 3.2 万亿美元、纳指 100 跌 6.4%，<strong>《金融时报》却爆出 Anthropic 仍定档感恩节前 IPO</strong>，募资 800–1000 亿、估值 1.25–1.75 万亿，摩根大通 11-13 先办说明会，Q3 营收约 170 亿、ARR 约 810 亿，对面是 9000 亿美元算力账单；同一天红线同时收紧，<strong>美国司法部超级智能工作组投运</strong>、民主党拟推超级 AI 永久禁令、<strong>家长起诉谷歌 Gemini</strong> 且谷歌对 K-12 默认关闭 AI 引捆绑争议 &middot; 下半场是不糊涂与落地：<strong>Anthropic 拆解 Claude 智能体记忆</strong>（笔记 / 显著性判断 / 离线 dreaming 纠错），<strong>Cursor 语音 / Amp spaces / OpenCode Browse / OpenRouter Auto Code</strong> 把交互入口从打字收口到语音与真实浏览器，<strong>中国移动 MobileWork</strong> 与「美企开源支出 89% 流向中国模型」把落地与份额摆上台面 &middot; 收尾回到宣发最实在的地方：<strong>谷歌 170 亿接手 Crusoe 园区 vs 60 万块 H200 闲置香港</strong> 的算力冷热对照，以及 <strong>可灵 Kling 4.0 Keyframes 关键帧</strong>领衔的一批创作链更新';

const navSub = [
  ['Anthropic 逆势 IPO', '美国红线双线收紧', 'Gemini 校园诉讼'],
  ['Claude 记忆机制', '编码智能体收口', 'MobileWork + 89%'],
  ['算力冷热同框', '宣发创作链更新']
];

let body = '\n<body>\n\n<div class="progress-bar"><div class="progress-bar-fill" id="progressFill"></div></div>\n\n<nav class="sidebar" id="sidebar">\n';
body += '  <div class="sidebar-header">\n';
body += '    <div class="sidebar-brand">AI Daily Report</div>\n';
body += '    <h1>AIGC <em>日报</em></h1>\n';
body += '    <div class="sidebar-meta">2026.11.08 &middot; 星期日 &middot; 第 92 期 &middot; 8 条速报</div>\n';
body += '  </div>\n\n';
body += '  <div class="nav-section">\n    <div class="nav-section-title">Overview</div>\n';
body += '    <a href="#top" class="nav-link active"><span class="nav-num">&middot;</span>今日速览</a>\n  </div>\n\n';

const secMeta = [
  ['Capital &amp; Red Lines', '💰 资本 · 红线', '#s1', navSub[0]],
  ['Agents That Remember', '🧠 不糊涂的智能体', '#s2', navSub[1]],
  ['Compute &amp; Creation', '⚡ 算力 · 创作链', '#s3', navSub[2]]
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
body += '    <div class="header-kicker">AI Daily Report &middot; 2026.11.08 &middot; Sun &middot; Issue 92</div>\n';
body += '    <h1>AIGC <em>日报</em></h1>\n';
body += '    <p class="lead">' + LEAD + '</p>\n';
body += '    <div class="header-meta">\n      <span class="meta-tag">💰 资本 &amp; 红线</span>\n      <span class="meta-tag">&middot;</span>\n      <span class="meta-tag">🧠 不糊涂的智能体</span>\n      <span class="meta-tag">&middot;</span>\n      <span class="meta-tag">⚡ 算力 &amp; 创作链</span>\n      <span class="meta-tag">&middot;</span>\n      <span class="meta-tag">2026.11.08 &middot; 第 92 期</span>\n    </div>\n  </div>\n\n\n';

const secInfo = [
  ['i. Capital &amp; Red Lines', '💰 资本与红线', '资本往上冲，规矩往下压 —— Anthropic 逆势定档感恩节前 IPO、美国司法部工作组投运与民主党超级 AI 禁令、家长起诉谷歌 Gemini', 'section', '3 items'],
  ['ii. Agents That Remember', '🧠 不糊涂的智能体', '常驻之后靠什么不糊涂 —— Anthropic 拆解记忆机制、编码智能体交互收口、MobileWork 与中国开源份额', 'section-highlight', '3 items'],
  ['iii. Compute &amp; Creation', '⚡ 算力与创作链', '从算力账本回到宣发交付 —— 谷歌接盘 Crusoe vs 60 万块 H200 闲置、可灵 Keyframes 与去 AI 味工序', 'section', '2 items']
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
body += '    <p>八条其实在讲同一天里的两个方向：<strong>一边抢上市，一边划红线</strong>。资本顶着抛售逆势冲刺，监管与司法同时把红线划到产品准入与能力上限。</p>\n';
body += '    <p><strong>① 上半场是资本与规矩的对冲（#1–#3）</strong>。科技股单日蒸发 3.2 万亿、纳指跌 6.4%，Anthropic 却定档感恩节前 IPO、把估值区间从昨日的 1.2–1.3 万亿传闻抬回 1.25–1.75 万亿，账本摊开（Q3 170 亿 / ARR 810 亿 / 9000 亿算力承诺对 1500 亿现金）；同一天美国司法部工作组投运、民主党拟推超级 AI 永久禁令、家长把 Gemini 告上法庭。与 11-07 期工信部进网许可连起来看，中美在同一周分别把红线划到产品准入与能力上限——这不是泡沫破裂，而是<strong>信仰定价彻底转向账本定价 + 合规定价</strong>。</p>\n';
body += '    <p><strong>② 中间三条是从住下来到不糊涂（#4–#6）</strong>。Anthropic 把记忆拆成笔记、显著性判断与离线 dreaming，一批工具把交互入口收口到语音、真实浏览器与自动选型，MobileWork 的 96.8% 完成率与「美企开源支出 89% 流向中国」给出落地与份额。配上 11-07 期 Teammates / Active Memory / Agent Substrate，常驻 Agent 的技术栈第一次完整可见：产品层 → 运行环境层 → 隔离调度层 → <strong>记忆与交互层</strong>。</p>\n';
body += '    <p><strong>③ 收尾两条回到宣发最实在的地方（#7–#8）</strong>。算力冷热同框（谷歌 170 亿接盘 vs 60 万块 H200 闲置）提醒成本与供给会传导到 API 排队和单价；可灵 Keyframes、GPT-Image-2.6 双榜、去 AI 味实测则把「能不能直接交付」摆上台面。前三条讲钱和规矩，中间三条讲不糊涂，最后两条讲能不能少重跑一次。</p>\n';
body += '    <p>今天最高分给到 <strong>#1 Anthropic 逆势定档 IPO（9.4 / P0）</strong>：分量不在数字大，而在它是昨日「估值遇阻」连续剧的转折一章——从「会不会上市」翻到「什么时候敲钟、以什么价」，且第一次把 9000 亿算力承诺、ARR 与现金同时摆上桌。</p>\n';
body += '    <p>四条可以立刻执行的线索：<strong>① 批量生成排期别锁死 API 单价与免费额度</strong>，预算预留涨价弹性并选可按量切换的多模型入口；<strong>② 试一条「同脚本 10 关键帧多镜头」宣发短片</strong>，把去 AI 味与品牌资产一致性固化为出图后必检项；<strong>③ 用「笔记 + 显著性判断 + 离线纠错 + 结构化 wiki」重构日报/竞品监控记忆层</strong>，让 Agent 定期清过时排期、纠正错记；<strong>④ 涉青少年/校园场景与真实浏览器能力的玩法</strong>，立项即划定年龄分层、危机兜底、账号白名单与参考来源台账。</p>\n';
body += '  </div>\n</div>\n</div>\n\n';

fs.writeFileSync(OUT, head + body + tail, 'utf8');
const out = fs.readFileSync(OUT, 'utf8');
console.log('written', OUT, fs.statSync(OUT).size, 'bytes');
console.log('title 2026.11.08 =', out.indexOf('<title>AIGC 日报 · 2026.11.08</title>') !== -1);
console.log('stale 2026.11.07 =', out.indexOf('2026.11.07') !== -1);
console.log('stale 第 91 期 =', out.indexOf('第 91 期') !== -1);
console.log('stale Issue 91 =', out.indexOf('Issue 91') !== -1);
console.log('</head> count =', (out.match(/<\/head>/g) || []).length);
console.log('cards =', (out.match(/class="card"/g) || []).length);
console.log('nav-sub =', (out.match(/nav-link nav-sub/g) || []).length);
console.log('sections =', (out.match(/class="section"/g) || []).length + (out.match(/class="section-highlight"/g) || []).length);
console.log('chips =', (out.match(/class="data-chip"/g) || []).length);
console.log('progressFill DOM =', out.indexOf('id="progressFill"') !== -1);
console.log('lead has content =', /<p class="lead">\S/.test(out));
console.log('back-to-archive =', out.indexOf('返回归档') !== -1);
