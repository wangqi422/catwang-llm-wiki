const fs = require('fs');
const TPL = 'docs/ai-daily/ai-daily-card-20261112-toc.html';
const OUT = 'docs/ai-daily/ai-daily-card-20261113-toc.html';
const lines = fs.readFileSync(TPL, 'utf8').split('\n');

// head: 到含 </head> 的那一行；title 用正则强制改日期
let headIdx = lines.findIndex(l => l.trim() === '</head>');
let head = lines.slice(0, headIdx + 1).join('\n');
head = head.replace(/<title>[^<]*<\/title>/, '<title>AIGC 日报 · 2026.11.13</title>');

// tail: 从 <button class="back-to-top" 到文件末尾（含 ScrollSpy JS 与「← 返回归档」按钮）
let tailIdx = lines.findIndex(l => l.indexOf('<button class="back-to-top"') !== -1);
let tail = lines.slice(tailIdx).join('\n');

const items = [
  {
    n: 1, id: 'item-1',
    title: '黄仁勋辞任英伟达 CEO：33 年时代落幕，CFO Colette Kress 临时接棒，市值一日蒸发 1820 亿美元',
    tag: '🪑 公司治理 / 算力格局 / P0',
    desc: '美东时间 11 月 12 日，<strong>NVIDIA 官网发布公告：联合创始人黄仁勋（Jensen Huang）即刻辞去总裁、CEO 及董事会成员职务</strong>，结束自 1993 年创立以来长达 33 年的掌舵。董事会同步公布「双轨过渡」：执行副总裁兼 CFO <strong>Colette Kress 出任临时 CEO</strong>（继续兼任 CFO），资深董事、前新思科技 CEO <strong>Harvey C. Jones 出任公司历史上首任董事会主席</strong>（打破 33 年不设主席的惯例），正式 CEO 遴选已启动、内外部候选人同时考虑。官方强调运营、客户承诺与产品路线图不中断，2027 财年 Q3 财报仍按计划于 <strong>11 月 17 日盘后</strong>发布。资本市场剧烈反应：11/12 开盘一度暴跌逾 14%（最低约 151 美元），收跌 <strong>4.34% 报 166.19 美元</strong>，市值一日蒸发约 <strong>1820 亿美元（超 1.2 万亿元人民币）</strong>，自 2025 年 7 月以来首次跌破 4 万亿美元；本周累计跌 10.96%、市值蒸发约 4928 亿美元。同日 AMD 涨 5.86%、博通涨 5.54%，CoreWeave 跌近 7%；摩根士丹利、美银将其移出首选名单，富国、花旗下调目标价。<strong>真正的风险是「创始人即战略」不可复制</strong>：NVIDIA 五年售出近 1400 万颗旗舰 AI 芯片、占市场约 85%，黄仁勋本人是 CUDA 生态、对 neocloud 的财务担保、过去一年在欧洲近 100 亿美元投资等关系网的唯一枢纽。Azeem Azhar 与 Tomasz Tunguz 均指出，与 1985 年乔布斯离任不同，这次<strong>没有准备好的继任者</strong>；Tunguz 把换帅类比「央行换主席」，传导路径覆盖初创融资条件、开源生态节奏与定制芯片格局。<strong>与软件端形成同日对照</strong>：同日 Anthropic 正式向 SEC 提交 IPO 注册声明、定档 11/19 纳斯达克上市（估值目标 1.3–1.45 万亿美元），OpenAI 完成 150 亿美元融资（融前估值 1.25 万亿）、Q3 营收约 100 亿美元环比 +50% 但运营亏损 109 亿——硬件王座松动与软件公司进场定价发生在同一天。<strong>边界</strong>：辞职原因、间谍传闻与调查均为媒体 / 官方多口径拼合，NVIDIA 公告只谈「过渡」不谈原因；盘中跌幅各报道口径 13%–14% 不等，继任者未定，一切影响评估均为推演。',
    chips: [['职务变动', '总裁 / CEO / 董事 即刻辞任'], ['过渡', 'CFO Colette Kress 临时 CEO'], ['市场', '收跌 4.34% · 蒸发 1820 亿美元'], ['下一关', '11 月 17 日 Q3 财报']]
  },
  {
    n: 2, id: 'item-2',
    title: 'Google 发布 Gemini 4 Hydrogen 并全球全渠道推送：跑分倒挂自家旗舰，单任务成本仅 Sonnet 5.5 的 32%',
    tag: '⚡ 模型发布 / 性价比 / P0',
    desc: '北京时间 11/12 傍晚至 11/13 凌晨，<strong>Google DeepMind 正式发布 Gemini 4 Hydrogen 并即日起向全球所有用户推送</strong>，覆盖桌面 / 移动 / 网页、Gemini App、Google Search（AI Mode 默认模型）、AI Studio、Gemini API、Android Studio 与 Gemini for Business；付费 Pro / Ultra 用户可在 Antigravity 使用，<strong>免费用户无需手动选模型</strong>，提示词合适时经自动模型选择即可用上。它补齐 Gemini 4 系列的「日常快速执行」档：Carbon / Argon 负责复杂推理与长程自主，Hydrogen 主打日常编码与智能体工作流。官方数据：默认 high 档任务完成速度为 Gemini 3.8 Flash 的 <strong>2.5 倍</strong>，Terminal-Bench 4.1 从 18.2% 升至 <strong>57%</strong>，虚构信息减少超 80%，输出约 200 token/s；新增 low / medium / high / <strong>xhigh</strong> 四档思考强度。第三方评测：Artificial Analysis 智能指数默认 high 档 <strong>51 分</strong>（超过更大更贵的 Argon 50 分）、xhigh 档 <strong>54 分</strong>，仅比 Claude Sonnet 5.5(max) 与 GPT-6.1 Sol(max) 各低 1 分，但<strong>每任务成本约为 Sonnet 的 32%</strong>（xhigh $3.16 / high $1.87）；AA-Omniscience 幻觉率 <strong>8%</strong>（Sonnet 5.5 为 43%、GPT-6.1 Sol 为 52%）。Cursor 同步接入，CursorBench 4.0 默认 effort <strong>54.3%</strong>（3.8 Flash 为 39.6%）；Agent Arena 第 5 名且为前十中<strong>最快</strong>（中位 5.3 分钟 / 任务、$1.60）。定价 <strong>$1.50/M 输入、$7.50/M 输出</strong>（思考 token 按输出计），完整 100 万 token 上下文统一计价不分阶梯，缓存输入 $0.075/M。同步向 Ultra 用户推送 Antigravity 内置 <strong>Orchestrator</strong>：Carbon 做架构规划、Hydrogen 做编码与测试，官方称配额少用 24%、耗时降 19%。<strong>「跑分倒挂 + 成本倒挂」是本次最值得注意的结构变化</strong>：一个 Flash 档位的模型在智能指数上超过自家上代旗舰 Argon，成本却只有约 19%；企业选型口径正从「跑分谁高」转向「元每任务 + 成功率」。<strong>成本压力从「塞多少上下文」挪到「吐多少输出」</strong>：输出单价是输入的 5 倍且思考 token 按输出计费，做 Agent 时优先砍冗余输出。<strong>边界</strong>：CursorBench / SWE-sweep / Agent Arena 多为第一方或单一评测口径、混合 effort 档位不完全可比；VentureBeat 指出其价格约为 Claude Haiku 5.5 / GPT-6 Luna 等低价模型最低标准价的 15 倍，「便宜」是相对旗舰而非绝对低价；OSWorld 与 Terminal-Bench 4.0 仍由 Sonnet 5.5 领先。',
    chips: [['速度', '2.5× 于 Gemini 3.8 Flash'], ['智能指数', '51 (high) · 54 (xhigh)'], ['定价', '$1.50 输入 / $7.50 输出 · 1M 统一'], ['成本', '约 Sonnet 5.5 的 32%']]
  },
  {
    n: 3, id: 'item-3',
    title: 'Anthropic 三连发：Claude Opus 5.5 转正当家默认，Claude Meetings 开进视频会议，Claude Tag 发布创业指南',
    tag: '🎙️ 办公智能体 / 默认入口 / P0',
    desc: '11/12–11/13，Anthropic 一天内连发三份官方内容。① 宣布 <strong>Claude Opus 5.5 成为 Pro、Max、Ultra、Team 四档套餐的默认模型</strong>，并推荐作为研究、分析、写作等知识工作的日常主力；同步给出完整模型矩阵与定价：Haiku 5.5（$0.10/$0.50）、Sonnet 5.5（$2/$10）、<strong>Opus 5.5（$4/$20）</strong>、Fable 5.2（$8/$40），全家族共享 100 万 token 上下文。官方建议：习惯「Sonnet 日常 + Opus 重度」的团队值得重新评估，更强模型用更少工作量完成任务往往抵消更高单价；效果不如预期时先调高 effort 档位再换更强模型。② 推出 <strong>Claude Meetings beta</strong>：Claude 以可见参会者身份加入团队视频通话（首发原生支持 Google Meet，后续扩展 Zoom / Teams），会中回答语音或文字提问、协作创建文档与白板等 Artifacts，会后自动汇总笔记、转录文本与行动项并沉淀在专用会话页；面向 Team / Enterprise 逐步开放，官方同步公布 beta 范围、免费期限与隐私默认设置。③ 发布 <strong>Claude Tag 创业公司使用指南</strong>，基于 Kikoff、NavigateAI、Orderful、Moritz 等 8 家高增长公司访谈，总结 on-call 分诊、Thread to PR、公司大脑、自助数据、例行报告五大场景及频道配置建议。同期还有 Claude 自托管 Managed Agents 私测、Claude for Manufacturing 插件（17 项制造技能）。<strong>从「事后总结」前移到「实时参会」是办公智能体最难的一步</strong>：会议里有上下文、潜台词与社交压力，能不抢话、被点名才精准发言，比离线纪要难得多。<strong>「默认模型」是一次静默但重量级的产品决策</strong>：不改功能、不改价格，却把绝大多数用户的主力从 Sonnet 切到 Opus 5.5，本质是 Anthropic 判断「能力溢价已经盖过单价」。<strong>与 #2 正面照面</strong>：同一天，Google 用低单价 + 全渠道抢高频任务，Anthropic 用高能力 + 默认入口抢知识工作，企业选型从「选一个最强模型」变成「按任务分层」。<strong>边界</strong>：Meetings 仍是 beta、限 Team / Enterprise、平台仅 Google Meet；官方未公布会议场景准确率、误触发率与人工满意度数据；Pro / Team 标准席位不含 Fable 5.2（按用量额度计费）。',
    chips: [['默认模型', 'Opus 5.5 · 四档套餐'], ['Meetings', '可见参会者 · Google Meet 首发'], ['矩阵', 'Haiku / Sonnet / Opus / Fable'], ['Tag 指南', '8 家公司 · 五大场景']]
  },
  {
    n: 4, id: 'item-4',
    title: '李飞飞 World Labs 开放世界模型 Atlas：应用 + 全量 API，一张图生成关键帧、视频片段与 3D Gaussian splats',
    tag: '🌍 世界模型 / 空间智能 / P1',
    desc: '北京时间 11/12 傍晚，<strong>李飞飞创办的 World Labs 宣布世界模型 Atlas 向所有人开放</strong>，李飞飞本人转发官宣并表达期待。同步上线 Atlas 资源站点与两款网页应用：<strong>Viewfinder</strong>（用 Atlas 空间智能从单张图像生成可探索的世界）与 <strong>Chisel</strong>（3D 创作工作流），并<strong>开放驱动 Atlas 应用的全部 API 端点</strong>供开发者和 Agent 调用。三类空间输出共用一个入口：<strong>关键帧、视频片段、3D Gaussian splats</strong>。AI HOT 近 24h 聚合池对该事件有 5 条以上独立命中（开放公告、资源站上线、Viewfinder、Chisel、API 端点），是当天创意工具侧最集中的发布。<strong>世界模型从「演示」变成「可调用的基础设施」</strong>：过去 Atlas 类能力多以论文 / Demo 形式出现，这次直接给应用 + API + Agent 可调用端点，空间内容生成门槛下探到「一张图进、一段视频或一个 3D 场景出」。<strong>与视频生成模型是两条路线</strong>：后者生成像素序列，世界模型生成的是有空间一致性的场景表征（3D Gaussian splats），天然适合反复取景、换机位、做延展，这正是宣发物料最常遇到的「一版主视觉延展多机位」需求。<strong>与 #5 智能眼镜、同日 Figma 3D transforms open beta 连成一条链</strong>：空间内容从生成、编辑到呈现的链路正在被一次性铺齐。<strong>查重说明</strong>：归档早期条目曾出现 World Labs / 李飞飞 / Atlas 相关标签（当时为 Frameboy 等阶段性演示），<strong>今日为「向所有人开放 + 应用与全量 API 端点」的新阶段</strong>，不是重复选题。<strong>边界</strong>：官方未公布生成分辨率上限、单场景耗时、商业授权与定价细节；「向所有人开放」的区域与速率限制以资源站点为准；3D Gaussian splats 输出仍需下游引擎渲染，不等于可直接进游戏管线。',
    chips: [['开放范围', '所有人 · 应用 + 全量 API'], ['两款应用', 'Viewfinder / Chisel'], ['三类输出', '关键帧 / 视频 / 3D GS'], ['落点', '一版 KV 多机位延展']]
  },
  {
    n: 5, id: 'item-5',
    title: 'Google Gemini 智能眼镜开启预购：395 美元起、12 月 10 日发货，实时翻译 + 免手 Gemini',
    tag: '👓 可穿戴 / 硬件入口 / P1',
    desc: '11/12–11/13，<strong>Google Labs VP Josh Woodward 官宣 Gemini 智能眼镜开启预购</strong>，官网 glasses.google 可直接下单，<strong>12 月 10 日发货</strong>；首批用户可到部分 Warby Parker、Gentle Monster 与 Google 门店试戴体验。产品与 <strong>Samsung、Gentle Monster、Warby Parker</strong> 合作推出，<strong>起价 395 美元</strong>，集成 Gemini 免手操作与<strong>实时语音翻译</strong>（Sundar Pichai 已公开体验实时语音翻译效果），支持语音交互。AI HOT 聚合池近 24h 对该事件有 4 条以上独立命中（预购官宣、合作方与定价、实时翻译、线下试戴）。<strong>从「模型全渠道推送」到「硬件定档发货」是同一天完成的闭环</strong>：#2 的 Hydrogen 铺进软件全层级，眼镜把同一个 Gemini 落到可穿戴出货节奏上，Google 是唯一能把模型同时塞进搜索、App、API 与自研硬件的玩家。<strong>眼镜是少数可能成为「下一代手机式入口」的形态</strong>：实时翻译 + 免手 Gemini 是最不依赖屏幕的刚需场景，对本地生活、导购、线下活动场景尤其关键。<strong>边界</strong>：395 美元为起价，具体配置、地区与发货范围以官网为准；实时翻译的语种、延迟与离线能力官方未给统一口径；12/10 是首批发货日而非全面铺货日；与 #2 的 Hydrogen 全渠道推送是同日两件事，不应合并理解。',
    chips: [['预购', 'glasses.google 已开放'], ['发货', '12 月 10 日首批'], ['起价', '395 美元 · 三方联名'], ['能力', '免手 Gemini · 实时翻译']]
  },
  {
    n: 6, id: 'item-6',
    title: 'Replit Agent 学会替企业花钱：Stripe Link / Visa 代购 + Google Ads 投放，逐笔审批由代码强制执行',
    tag: '💳 Agent 权限 / 商业闭环 / P1',
    desc: '11/12，<strong>Replit 给 Replit Agent 新增两项能力</strong>：① 通过 <strong>Stripe Link 与 Visa</strong> 为企业代购物资；② 在 Replit 内<strong>直接创建并投放 Google Ads</strong>，覆盖 Search、YouTube 等渠道。购物与投放都在同一对话里完成，智能体从「帮你写代码、跑任务」跨到了「拿着付款凭据替你花钱」。安全设计是本次重点：<strong>支付需逐笔审批，且审批检查由代码强制执行</strong>（而非提示词约定），官方给出完整流程与权限说明。同日的对照事件还有：美联航以网络安全与合规风险为由封禁个人 AI 智能体代客订票、OpenRouter 发布 Agent 防死循环四层防护。<strong>智能体从「帮你写」跨到「替你买」，动作边界第一次被产品化</strong>：能下单、能投广告意味着 Agent 开始持有真实付款凭据与预算，权限模型从「能看什么」升级到「能花多少」。<strong>「审批由代码强制执行」最值得抄</strong>：把权限从 prompt 约束下沉到执行层，避免越狱或幻觉直接绕过，这是所有要接内部系统的 Agent 都该照做的分层。<strong>平台 / 支付 / 工程三方同日给 Agent 画线</strong>：美联航封禁代订（平台准入）、逐笔审批（支付）、防死循环与成本上限（工程），说明 2026 下半年 Agent 的竞争焦点已从能力转向可控性。<strong>边界</strong>：代购与投放的地域、额度、企业资质门槛未完全公开；逐笔审批意味着高吞吐场景仍需人工介入，尚非全自动；与「Grok Build 分享链接漏洞致 3.7 万个应用公网可访问」同属 Agent 权限治理议题，但为不同事件。',
    chips: [['两项能力', '企业代购 / Google Ads 投放'], ['支付', 'Stripe Link + Visa'], ['审批', '逐笔 · 代码强制执行'], ['同日对照', '美联航封禁代订']]
  },
  {
    n: 7, id: 'item-7',
    title: 'Epoch AI 卫星影像测算华为和林格尔：10.5 万颗 Ascend 910C ≈ 8.1 万张 H100 等效算力',
    tag: '🛰️ 算力信号 / 可复核口径 / P2',
    desc: '11/12，<strong>Epoch AI 通过卫星影像与冷却设备模型估算</strong>：华为和林格尔数据中心已投运约 <strong>105,000 颗 Ascend 910C</strong> 与 <strong>8,000 颗 Ascend 910B</strong> 芯片，对应约 <strong>81,000 张 H100 等效算力</strong>，约为全球最大 AI 数据中心 <strong>SpaceX Colossus 2 的 7%</strong>。报告同时公开了「用公开影像量化算力规模」的方法路径，让「中美算力差距」第一次有了第三方可复核的数字口径。<strong>把差距从口号变成可复核数字</strong>：卫星影像 + 冷却负荷 + 芯片型号反推等效算力，第三方可按同一方法复核与更新，比厂商发布会口径更接近真实供给。<strong>口径从「芯片型号与出货量」换成「已投运的等效算力」</strong>：这是评估国产算力供给时更有意义的单位，也提醒团队别把「规划产能」当「可用算力」。<strong>与 #1 形成呼应</strong>：一边是 NVIDIA 治理层变动给全球算力供给带来治理折扣，一边是国产算力有了可比对口径，供应链评估需要同时看两条线。<strong>边界</strong>：数字为第三方推算而非厂商披露，误差来自冷却模型假设与芯片利用率；只能当方向信号，<strong>不能写进采购依据或对外材料</strong>，真要选型仍以厂商可核验的实测吞吐与交付周期为准。',
    chips: [['芯片', '10.5 万 910C + 8 千 910B'], ['等效算力', '约 8.1 万张 H100'], ['对比', '约 Colossus 2 的 7%'], ['方法', '卫星影像 + 冷却模型']]
  },
  {
    n: 8, id: 'item-8',
    title: 'OpenRouter 用 460 美元重译全站 7 种语言，并给出 Agent 防死循环四层防护',
    tag: '🧮 工程实战 / 成本工程 / P2',
    desc: '11/12–11/13，OpenRouter 连发两篇工程实践。① 上线含简体中文、日语等 <strong>7 种语言 Beta 本地化</strong>，并公开<strong>自纠错翻译流水线</strong>：用 GPT-6.1 Sol 翻译 <strong>16,918 条字符串</strong>，经代码检查、同模型校验与每日 AI 审查重试，最坏每条约 20 次模型调用，<strong>全站重译约 $460</strong>，约为传统机器翻译牌价的 <strong>6%</strong>；错误报告会转化为术语规则、风格注释或评测用例沉淀下来，越用越准。② 发布 <strong>Agent 无限循环烧钱</strong>的实测教程，实测六个模型后给出<strong>四层防护</strong>：doom-loop 检测、loopKey 参数归一化、stopWhen 步数与成本上限、API key 信用额度——前两层识别「同一动作反复重试」，后两层在失控时硬性叫停。同日另有 RAG 重排序实测：274 题基准 precision@1 从 81% 提升到 97%。<strong>$460 全站 7 语言本地化是一个能直接改写预算表的数字</strong>：对多语言物料、出海落地页与活动页尤其关键，且「错误沉淀成规则」的设计让质量随轮次提升而非一次性消耗。<strong>四层防护是今天最可立即落地的工程清单</strong>：任一层触发即停、第二天看日志再放宽阈值，成本上限与信用额度是最后一道保险，不能省。<strong>与 #6 是同一条纪律的两面</strong>：一个解决「Agent 能花多少」，一个解决「Agent 会不会自己把钱烧光」。<strong>边界</strong>：$460 对应 OpenRouter 自有站点的字符串量，不同业务文本量与术语复杂度差异大；20 次 / 条为最坏情况而非常态；四层防护需自行接进工具调用层，不是开箱即用的托管能力。',
    chips: [['本地化', '7 语言 · 16,918 条字符串'], ['成本', '约 $460 · 牌价的 6%'], ['四层防护', '检测 / 归一 / 上限 / 额度'], ['附带', 'RAG precision@1 81%→97%']]
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

const LEAD = '今天的 8 条，主线是<strong>一个人的退场，换来一整套系统的接管</strong> &middot; 开场是最重的人事：<strong>黄仁勋即刻辞去英伟达总裁、CEO 与董事职务</strong>（CFO Colette Kress 临时接棒、33 年时代落幕、市值一日蒸发 1820 亿美元） &middot; 同一天 <strong>Google 把 Gemini 4 Hydrogen 推向全球所有用户</strong>（跑分倒挂上代旗舰、单任务成本仅 Sonnet 5.5 的 32%）、<strong>Anthropic 让 Claude Opus 5.5 转正当家并开进视频会议</strong> &middot; 中场是能力集体落地：<strong>World Labs 开放世界模型 Atlas</strong>、<strong>Gemini 智能眼镜定档 12 月 10 日发货</strong>、<strong>Replit Agent 开始替企业代购与投广告</strong> &middot; 收尾落到算账：<strong>Epoch AI 用卫星影像给国产算力标价</strong>、<strong>OpenRouter 用 460 美元重译全站 7 种语言</strong>。今天没人比谁更聪明，比的是谁能把「一个人」的缺席，换成一套不依赖任何人的系统';

const navSub = [
  ['黄仁勋辞任 Nvidia', 'Gemini 4 Hydrogen', 'Claude 进会议室'],
  ['World Labs Atlas', 'Gemini 智能眼镜', 'Replit Agent 代购'],
  ['华为和林格尔算力', 'OpenRouter 460 美元']
];

let body = '\n<body>\n\n<div class="progress-bar"><div class="progress-bar-fill" id="progressFill"></div></div>\n\n<nav class="sidebar" id="sidebar">\n';
body += '  <div class="sidebar-header">\n';
body += '    <div class="sidebar-brand">AI Daily Report</div>\n';
body += '    <h1>AIGC <em>日报</em></h1>\n';
body += '    <div class="sidebar-meta">2026.11.13 &middot; 星期五 &middot; 第 97 期 &middot; 8 条速报</div>\n';
body += '  </div>\n\n';
body += '  <div class="nav-section">\n    <div class="nav-section-title">Overview</div>\n';
body += '    <a href="#top" class="nav-link active"><span class="nav-num">&middot;</span>今日速览</a>\n  </div>\n\n';

const secMeta = [
  ['A Seat Empties', '🪑 交权 · 全渠道铺开', '#s1', navSub[0]],
  ['From Model to Matter', '🌐 从模型，到能用的东西', '#s2', navSub[1]],
  ['Ledgers &amp; Guardrails', '🧮 算账 · 画线', '#s3', navSub[2]]
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
body += '    <div class="header-kicker">AI Daily Report &middot; 2026.11.13 &middot; Fri &middot; Issue 97</div>\n';
body += '    <h1>AIGC <em>日报</em></h1>\n';
body += '    <p class="lead">' + LEAD + '</p>\n';
body += '    <div class="header-meta">\n      <span class="meta-tag">🪑 交权 · 全渠道铺开</span>\n      <span class="meta-tag">&middot;</span>\n      <span class="meta-tag">🌐 能力落地</span>\n      <span class="meta-tag">&middot;</span>\n      <span class="meta-tag">🧮 算账 · 画线</span>\n      <span class="meta-tag">&middot;</span>\n      <span class="meta-tag">2026.11.13 &middot; 第 97 期</span>\n    </div>\n  </div>\n\n\n';

const secInfo = [
  ['i. A Seat Empties', '🪑 交权 · 全渠道铺开', '一个人的离场、一个模型的全球推送、一个助手进会议室 —— 同一天，AI 的「谁来掌舵」和「铺给谁用」同时改写', 'section', '3 items'],
  ['ii. From Model to Matter', '🌐 从模型，到能用的东西', '世界模型开门、眼镜定档发货、Agent 开始替企业花钱 —— 能力第一次集体落到可交付物', 'section-highlight', '3 items'],
  ['iii. Ledgers &amp; Guardrails', '🧮 算账 · 画线', '用卫星给算力标价、用 460 美元给多语言标价 —— 越自动化，越要把口径与上限先写清楚', 'section', '2 items']
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
body += '    <p>八条其实在讲同一件事：<strong>「计价单位」正在悄悄换轨</strong>。黄仁勋离场，让市场第一次为「一个人的缺席」重新定价；Gemini 4 Hydrogen 让模型选型从跑分变成「元每任务」；OpenRouter 用 460 美元给多语言物料标了价；Epoch AI 用卫星影像给国产算力标了价。当能力足够便宜、足够铺开之后，真正稀缺的不再是「谁更聪明」，而是「谁能把权限、口径与账本先写清楚」。</p>\n';
body += '    <p><strong>① 开场是最重的一条人事，也是最重的一次重新定价（#1）</strong>。<strong>黄仁勋即刻辞去 NVIDIA 总裁、CEO 与董事职务</strong>，CFO Colette Kress 临时接棒、Harvey C. Jones 任首任董事会主席，股价收跌 4.34%、市值一日蒸发 1820 亿美元。分量不在股价，而在它让「创始人即战略」这条隐含假设第一次被公开检验——占全球 85% 旗舰 AI 芯片份额的公司把指挥棒暂时交给一位 CFO，整个 AI 行业都要为治理不确定性重新算一次账。11/17 财报是首场压力测试。</p>\n';
body += '    <p><strong>② 中间五条是「系统接管」的两组动作（#2–#6）</strong>。<strong>Gemini 4 Hydrogen</strong> 全渠道推送、跑分倒挂上代旗舰且成本仅 Sonnet 5.5 的 32%；<strong>Anthropic</strong> 让 Opus 5.5 转正当家默认、把 Claude 开进视频会议；<strong>World Labs 开放 Atlas</strong>、<strong>Gemini 智能眼镜定档 12/10 发货</strong>、<strong>Replit Agent 开始替企业代购与投广告</strong>。一边是把能力无条件铺给所有人，一边是 Agent 刚开始替企业花钱就被平台、支付与工程三方同日画线（美联航封禁代订、逐笔审批、防死循环）——<strong>放权和收口，是同一天完成的动作</strong>。</p>\n';
body += '    <p><strong>③ 收尾两条落到算账（#7–#8）</strong>。Epoch AI 用卫星影像与冷却模型估算华为和林格尔约 8.1 万张 H100 等效算力，把「差距」变成可复核数字；OpenRouter 用约 460 美元重译全站 7 种语言，并给出 Agent 防死循环四层防护。一个往上游给算力标价，一个往下游给工程兜底，都是「系统不依赖某个人」的具体样子。</p>\n';
body += '    <p>一句话：<strong>一个人的退场，换来一整套系统的接管</strong>。能力越便宜、铺得越广，越要把权限、口径与账本先写清楚——今天所有大动作，都在把「靠一个人」换成「靠一套系统」。</p>\n';
body += '    <p>今天最高分给到 <strong>#1 黄仁勋辞任英伟达 CEO（9.6 / P0）</strong>：分量不在股价，而在它让占全球 85% 旗舰 AI 芯片份额的公司第一次要为「一个人的缺席」重新定价，并与同日软件端进场公开定价形成钱流向的转折，是本期所有叙事的起点。</p>\n';
body += '    <p>五条可以立刻执行的线索：<strong>① 把 GPU / 云渲染长期合同的签署节点推到 11/17 财报之后</strong>，并把单一硬件路线的备选方案补进风险清单；<strong>② 用 Hydrogen 承接批量切图校验与文案初筛</strong>，在 AI Studio 用真实工单对比 high / xhigh 的成功率与账单，优先砍冗余输出而非塞更长上下文；<strong>③ 内部单次会议试点 Claude Meetings</strong>，明确未定稿物料不进会议共享空间；<strong>④ 用 Viewfinder 从一版定稿 KV 延展多机位空镜做 A/B</strong>，重点验收 IP 元素跨机位一致性与商用授权；<strong>⑤ 给所有在跑的 Agent 补上步数与成本双上限</strong>，并把「能下单 / 能投广告」的权限与额度单列、独立支付凭据。</p>\n';
body += '  </div>\n</div>\n</div>\n\n';

fs.writeFileSync(OUT, head + body + tail, 'utf8');
const out = fs.readFileSync(OUT, 'utf8');
console.log('written', OUT, fs.statSync(OUT).size, 'bytes');
console.log('title 2026.11.13 =', out.indexOf('<title>AIGC 日报 · 2026.11.13</title>') !== -1);
console.log('stale 11.12 (escaped) =', /11\.12/.test(out));
console.log('stale 第 96 期 =', out.indexOf('第 96 期') !== -1);
console.log('stale Issue 96 =', out.indexOf('Issue 96') !== -1);
console.log('stale 星期四 =', out.indexOf('星期四') !== -1);
console.log('</head> count =', (out.match(/<\/head>/g) || []).length);
console.log('cards =', (out.match(/class="card"/g) || []).length);
console.log('nav-sub =', (out.match(/nav-link nav-sub/g) || []).length);
console.log('sections =', (out.match(/class="section"/g) || []).length + (out.match(/class="section-highlight"/g) || []).length);
console.log('chips =', (out.match(/class="data-chip"/g) || []).length);
console.log('progressFill DOM =', out.indexOf('id="progressFill"') !== -1);
console.log('lead has content =', /<p class="lead">\S/.test(out));
console.log('back-to-archive =', out.indexOf('返回归档') !== -1);
