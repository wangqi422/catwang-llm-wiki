const fs = require('fs');
const TPL = 'docs/ai-daily/ai-daily-card-20261106-toc.html';
const OUT = 'docs/ai-daily/ai-daily-card-20261107-toc.html';
const lines = fs.readFileSync(TPL, 'utf8').split('\n');

// head: 到含 </head> 的那一行；title 用正则强制改日期
let headIdx = lines.findIndex(l => l.trim() === '</head>');
let head = lines.slice(0, headIdx + 1).join('\n');
head = head.replace(/<title>[^<]*<\/title>/, '<title>AIGC 日报 · 2026.11.07</title>');

// tail: 从 <button class="back-to-top" 到文件末尾（含返回归档按钮，无日期文案）
let tailIdx = lines.findIndex(l => l.indexOf('<button class="back-to-top"') !== -1);
let tail = lines.slice(tailIdx).join('\n');

const items = [
  {
    n: 1, id: 'item-1',
    title: 'AI 资本同日重定价：OpenAI 首批 110 亿美元到账、Anthropic IPO 估值下修、企业 AI 支出见顶信号',
    tag: '💰 融资 / IPO / 资本纪律',
    desc: '11 月 6 日彭博报道 <strong>OpenAI 完成新一轮融资首批约 110 亿美元到账，对应估值 1.25 万亿美元</strong>；首批出资方为 Coatue 与普信集团，后续有软银、红杉、Founders Fund、a16z 与阿联酋财团，剩余部分预计数周内完成。本轮<strong>总规模从最初 300 亿目标降到约 200 亿</strong>、估值目标从 1.4 万亿降到 1.25 万亿（仍高于今年 3 月的 8520 亿）。《纽约时报》DealBook 同日披露：<strong>累计投入约 650 亿美元的软银本轮仅商谈数亿美元</strong>，Coatue 也在数亿美元级，阿联酋财团预计成最大出资方。CFO Sarah Friar 称「好的 CFO 总会在能融资的时候融资」，强调<strong>数据中心投资计划不变、仍推进 2027 年上市可能性</strong>。同一天 <strong>Anthropic IPO 潜在估值从 1.5 万亿下修至 1.2–1.3 万亿</strong>（部分投资人认为接近 1 万亿），<strong>募资拟从最高 1000 亿降到约 800 亿</strong>，路演或延至 11-16 当周甚至推迟；招股书显示前九个月营收约 <strong>332 亿美元、同比约 +1200%</strong>，但 S-1 里 <strong>10 月营收一栏留空</strong>。Ramp 数据显示企业 AI token 支出增长放缓；彭博另报微软逐步关停从甲骨文租用的部分算力并不再续签。<strong>与 11-01 期要区分</strong>：那期报的是「300 亿→200 亿、1.4 万亿→1.25 万亿」的传闻阶段，今天是首批资金实际到账 + 出资方削减结构曝光 + 估值下修扩散到 Anthropic。<strong>估值守住，支票变小</strong>：两家估值都还在万亿以上，但投资人从愿付任何价转为要折扣、要营收数据。触发点是 11-05 美股 AI 股 19 个月最大单日跌幅（纳指 -5.52%、市值一日蒸发约 2.5 万亿美元）与中期选举后 41 项地方公投 40 项倾向限制数据中心。<strong>边界</strong>：均为匿名信源与媒体报道，两家公司未公开确认，本轮尚未 close，最终规模与估值仍可能变化。',
    chips: [['OpenAI 首批', '110 亿美元到账'], ['估值 / 目标', '1.25 万亿 · 300→200 亿'], ['Anthropic IPO', '1.5→1.2–1.3 万亿'], ['触发点', '纳指 -5.52% · 19 个月最大跌幅']]
  },
  {
    n: 2, id: 'item-2',
    title: '工信部印发《关于加强智能体终端设备进网管理的通知》：智能体进手机先过进网许可',
    tag: '📋 监管 / 进网许可 / 身份码',
    desc: '11 月 6 日工信部印发 <strong>《关于加强智能体终端设备进网管理的通知》</strong>，覆盖<strong>预置安装智能体的手机、平板、可穿戴设备等电信终端</strong>，部署四项任务：① <strong>智能体与终端适配</strong>——开发者加强适配验证，须在产品设置页<strong>公示适配验证列表</strong>（已完成适配的终端型号与操作系统信息），上架分发平台前提交验证情况；② <strong>改进进网管理</strong>——进网检测中开展适配验证与风险评估，依法开展<strong>涉诈风险安全评估与反诈能力前置性评测</strong>，终端所用智能体须参考国标<strong>配备唯一身份码</strong>，生产企业保证获证前后一致性；③ <strong>强化现网升级管理</strong>——OTA 推送智能体升级须提交方案（时间、规模、用户群、场景、经营模式、数据与反诈措施），升级结束提交报告，<strong>经工信部组织专家评估、征求意见后方可正式提供服务</strong>；④ <strong>健全分发管理</strong>——应用分发平台推动 App 开发者通过<strong>电子签名主动声明是否同意智能体调用，未经声明同意不得强制调用调取</strong>，不得提供不兼容设备型号的智能体下载安装。官方定调引导 AI 技术<strong>为人所用、为人服务、为人所控</strong>，建立适配验证→进网检测→现网升级→分发管理全链条制度；中国信通院将建设智能体版本与终端型号适配库、可信身份体系与管理平台。<strong>与 11-05 期区分</strong>：那是乌镇峰会 20 家单位的《智能体发展自律公约》（行业自律八条 + 身份注册平台），今天是<strong>行政主管部门的进网许可制度</strong>，具强制力，并把唯一身份码从倡议写进进网要求。<strong>迭代节奏被纳入监管</strong>：OTA 升级要报方案、交报告、过专家评估，系统级智能体不再能先推后改。<strong>入口之争第一次有明文边界</strong>：未经声明不得强制调用，直指手机厂商与超级 App 让智能体跨应用代操作的野心。<strong>边界</strong>：通知为框架性部署，具体检测标准、适配库与身份体系仍在建设，执行细则与「重大变化」判定口径待后续文件。',
    chips: [['发布方', '工信部 · 11-06'], ['四项任务', '适配 / 进网 / OTA / 分发'], ['关键要求', '唯一身份码 · 专家评估'], ['用户权利', '未声明不得强制调用']]
  },
  {
    n: 3, id: 'item-3',
    title: 'Meta 无限期暂停商业网页抓取条款：挪威、巴西、英国三国监管同日夹击',
    tag: '⚖️ 数据合规 / 司法 / 授权链',
    desc: 'Meta 宣布<strong>无限期暂停原定 11 月 20 日生效的商业条款更新</strong>——该条款曾要求商业账号授权 Meta 抓取其关联网站内容且<strong>无退出选项</strong>。压垮它的不是舆论而是司法：<strong>挪威奥斯陆法院</strong>应十家媒体申请颁布临时禁令、<strong>巴西法院</strong>禁止未经授权使用新闻内容、<strong>英国竞争与市场管理局（CMA）</strong>启动正式调查，美国参议员 Schiff 与 Blackburn 亦致信扎克伯格要求撤回。Meta 称将继续与各方磋商，<strong>暂停不等于撤回</strong>。同日 <strong>Anthropic 通知 API 客户：11 月 16 日起 Claude Opus 4.6 / 4.5、Sonnet 4.5、Haiku 4.5 陆续加入不可见文本水印</strong>，以赶上<strong>欧盟 AI 法案 12 月 2 日</strong>合规期限；水印为 DeepMind <strong>SynthID-Text 变体</strong>，通过选词统计模式嵌入，不增加 token、不含用户信息，但本轮四款模型<strong>仅在默认采样参数下带水印</strong>，开发者调整 temperature、top_p 后可能失效。<strong>与 11-02 期四巨头统一 robots.txt 退出信号是同一条主线的下一章</strong>：那次是站方可选退出的企业协同，这次是平台方被司法强制暂停——训练与检索内容的来源可追溯性正从自律条款变成法定义务。<strong>授权链成为固定合规成本</strong>：与 11-06 期 Anthropic × 美联社首份新闻内容授权协议连起来看，模型厂商从先抓再说转向先谈授权、先加标识。<strong>水印的缝隙要说清</strong>：默认参数才生效意味着合规承诺与工程现实仍有距离，调整采样是开发者常见操作。<strong>边界</strong>：Meta 是暂停非撤回，CMA 调查与各国诉讼仍在进行；Anthropic 水印覆盖率与鲁棒性尚无独立复测，不宜按全面合规解读。',
    chips: [['Meta', '无限期暂停 11-20 条款'], ['三国监管', '挪威禁令 · 巴西裁定 · 英国 CMA'], ['Anthropic 水印', '11-16 · 四款旧模型'], ['合规期限', '欧盟 AI 法案 12-02']]
  },
  {
    n: 4, id: 'item-4',
    title: 'Perplexity 发布 Teammates：常驻工作智能体，内部 30 天跑出约一万个',
    tag: '🛠 常驻 Agent / 订阅产品',
    desc: '11 月 6 日 Perplexity 推出 <strong>Teammates</strong>，把 AI 助手从会话内写提示词改成<strong>给目标后常驻在岗</strong>。用户只需描述高层目标，Teammates 便跨营销、销售、客服、运营等场景<strong>持续监控项目进展、主动汇报异常与待办</strong>，可主动联系用户、同事与其他智能体，并复用 Perplexity 既有项目、技能与记忆，不必反复给指令。每个 Teammate <strong>运行在隔离环境、沿用主账号的权限与访问控制</strong>，避免越权读取数据。先面向 <strong>Max 订阅（200 美元/月）</strong> 网页版研究预览开放，随后上 iOS 与桌面原生应用。Perplexity 称内部工作区 30 天内已跑约 <strong>10000 个 teammates</strong>（约为员工数 20 倍），前一日约 1000 个活跃；CEO Aravind Srinivas 预计组织最终会为每名员工运行数百个队友。官方点名强项是深度研究、数据分析、QA、工单分诊与代码评审，对标 <strong>OpenAI Dots</strong> 与 <strong>Anthropic Claude Duet</strong>。<strong>交互范式变了</strong>：从一问一答变成带目标的持续代理，常驻 Agent 第一次被明码标价为 200 美元/月的高端订阅商品，而非免费聊天附赠功能。<strong>与 11-06 期 Kimi Hosted Agents 是上下游</strong>：那边把 Harness 做成 7×24 云托管环境，这边卖住在环境里的员工；再配本期 #6 的 Agent Substrate，产品层 / 运行环境层 / 隔离调度层同一天拼齐。<strong>10000 与 20 倍要留判断</strong>：厂商自报的内部数据，与 11-05 期 Uber 3.2 亿订单只有 4 单来自 AI 智能体形成对照——企业内部 Agent 密度与外部消费端落地仍不在同一曲线。<strong>边界</strong>：The Verge 指其明显贵于同类 agent，仍处研究预览，长程稳定性、并发计费与跨 Agent 失败恢复无第三方验证。',
    chips: [['订阅', 'Max · 200 美元/月'], ['内部 30 天', '约 10000 个 teammates'], ['活跃度', '前一日约 1000 个'], ['形态', '常驻在岗 · 主动汇报']]
  },
  {
    n: 5, id: 'item-5',
    title: 'Meta Muse 三连发：Spaces 自定义空间 + Active Memory / Active Focus + 实时语音虚拟形象全美开放',
    tag: '🛠 智能体记忆 / 生成式 UI',
    desc: '11 月 6 日 Meta 一次性推进三条。① <strong>Muse Spaces</strong>：用户无需写代码，用<strong>一段文字描述想要的工具</strong>，生成式 Agent Muse 便在侧边栏搭出可复用的个性化空间（旅行规划器、健身追踪、项目看板），可接入第三方应用，并能在<strong>后台持续更新数据</strong>——演唱会日期变动、机票降价、储蓄进度自动刷新，目前小范围测试。② <strong>Active Memory / Active Focus</strong>：扎克伯格宣布 Muse 与 Meta AI 接入基于 <strong>Muse Wonder 训练的专用模型</strong>，前者跨时间保留相关信息，后者在遇障碍或条件变化时继续完成目标；Meta 测试称 <strong>遗忘关键信息的可能性降至约 1/2.4</strong>，应对变化约束的表现<strong>提升 67%</strong>。③ <strong>Muse Realtime Voice / Realtime Avatar 全美开放</strong>：移动端、网页、Mac 可与动画虚拟角色实时语音 / 视频对话，表情手势随对话情绪变化，支持<strong>随时打断</strong>、纯语音 / 侧栏 / 全屏三种形态，还能一边讲话一边让 Muse 处理已授权后台任务，后续进入 AI Glasses 与 Muse Charm；官方技术演示 <strong>25FPS、约 870ms 首个音视频响应延迟</strong>。<strong>三条指向同一件事</strong>：把 AI 从对话框搬进用户高频入口 + 长期记忆 + 后台自更新。<strong>与本期 #4、#6 是同一天三条独立路线</strong>：Perplexity 让 Agent 常驻工作区，Meta 让 Agent 常驻个人入口与记忆，Google 让 Agent 常驻基础设施——住下来不是一家公司的选择，而是行业动作。<strong>生成式 UI 对营销侧最有价值</strong>：活动数据看板、玩家问答位、素材进度追踪可按需生成而非排开发档期。<strong>边界</strong>：Spaces 为小范围测试，记忆与专注提升为 Meta 自测，Realtime Avatar 仅美国开放且模型不看见用户，25FPS / 870ms 是官方指定系统条件下的演示值。',
    chips: [['Active Memory', '遗忘率降至约 1/2.4'], ['Active Focus', '变化约束表现 +67%'], ['Realtime Avatar', '25FPS · 约 870ms'], ['Spaces', '描述即生成 · 后台自更新']]
  },
  {
    n: 6, id: 'item-6',
    title: 'Google 向 CNCF 捐赠 Agent Substrate / gVisor / OpenRL，Agent Substrate 在 GKE 正式可用',
    tag: '🛠 智能体基础设施 / 隔离调度',
    desc: '11 月 6 日 Google 将 <strong>Agent Substrate、gVisor 与 OpenRL 捐赠给 CNCF Sandbox</strong>，并宣布 <strong>Agent Substrate 在 Google Kubernetes Engine（GKE）正式可用</strong>。该基础设施面向智能体运行与隔离：<strong>闲置会话可在 500 毫秒内恢复，容器密度提升 10 倍，每秒支持超过 500 次挂起与恢复</strong>，为常驻 Agent 提供运行时与隔离层。同日 <strong>Google Antigravity 向所有付费个人订阅开放远程智能体</strong>：可在独立云虚拟机执行用户提交的任务，用户通过移动设备管理权限，之后获取测试结果与代码合并请求；并支持在同一项目连接 GitHub 仓库与 Google Drive 文件夹，跨网页与移动应用处理代码与文档。<strong>常驻 Agent 的经济性瓶颈在挂起 / 恢复而非模型推理</strong>：#4 里每名员工数百个队友能不能成立，取决于闲置时占多少资源、唤醒要多久，500ms 恢复 + 10 倍密度正是把这道门槛往下压。<strong>三层栈在同一天拼齐</strong>：产品层（Perplexity Teammates）→ 运行环境层（11-06 期 Kimi Hosted Agents）→ 隔离与调度基础设施层（Agent Substrate / gVisor）。<strong>捐给 CNCF 的信号</strong>：智能体运行时正从厂商私有能力变成行业标准件，后续多云 / 自建部署有了可复用底座，降低被单一云锁定的风险。<strong>边界</strong>：CNCF Sandbox 属早期项目阶段，规范与生态仍在演进；密度与恢复耗时为 Google 自测，未披露多租户真实成本；Antigravity 远程智能体的并发与计费口径尚待确认。',
    chips: [['捐赠', 'Agent Substrate / gVisor / OpenRL'], ['落地', 'CNCF Sandbox · GKE GA'], ['恢复 / 密度', '500ms · 容器 ×10'], ['挂起恢复', '每秒 500+ 次']]
  },
  {
    n: 7, id: 'item-7',
    title: '世界模型同日双响：World Labs Frameboy 实时 15FPS 探索 + NVIDIA 开源 4 个 Cosmos 3 与 VFlash',
    tag: '🎬 世界模型 / 实时交互 / 开源仿真',
    desc: '11 月 5–6 日两条世界模型进展同时落地。其一，李飞飞联合创办的 <strong>World Labs 发布 Frameboy 研究预览</strong>：基于约两个月前发布的自回归世界模型 <strong>Atlas</strong>（原生处理文本 / 图像 / 视频 / 3D，全部输入合并进一个共享空间上下文），用户在<strong>浏览器中控制摄影机</strong>，云端 GPU 依据镜头位置与朝向<strong>逐帧生成新视角画面，以最高 15FPS 流式传回</strong>；输入可以是<strong>单张图片</strong>，也可以是<strong>真实地点的多视角照片</strong>，官方 Demo 借用掌机与游戏卡带形象呈现像玩游戏一样探索。实时能力已接入封闭内测的 <strong>Viewfinder</strong>（逐帧搭场景 → Frameboy 叠加层实时进入探索）。这是 9 月 AMD 宣布约 <strong>82 亿美元收购 World Labs</strong> 后团队交出的首个技术成果。其二，<strong>NVIDIA 开源 4 个 Cosmos 3 世界模拟模型</strong>（各 <strong>16B 可训练参数</strong>，基于 Cosmos 3 Nano 后训练，OpenMDW1.1 许可允许商用）：覆盖自动驾驶 <strong>11 路相机同步视频 + 激光雷达</strong>生成、流式交互仿真、<strong>空间控制信号转真实感视频</strong>（深度 / 分割 / 边缘 / 模糊布局 + 文本提示）、双臂机器人动作预测；同步发布 <strong>VFlash 并行视觉解码框架</strong>，利用边界框、轨迹等视觉图元的固定结构一次预测完整图元，在 Jetson Thor / DGX Spark 指定任务下<strong>机器人推理最高提速 5.1 倍</strong>，MolmoSpaces 四组任务平均成功率从 <strong>62.6% 升至 70.2%</strong>。<strong>试错成本几乎归零</strong>：过去调一次机位要等几十秒到几分钟渲染、发现角度错了再拖回去重来，Frameboy 改成推镜头即出画面，正是分镜预演与勘景最需要的一步。<strong>一个推体验、一个推可部署</strong>：Frameboy 是云端实时交互研究预览，Cosmos 3 是可下载可商用、能适配自有相机组与机器人的开源权重。<strong>与 11-05 期乌镇世界模型区分</strong>：那批主打 4D 高斯资产与国产昇腾底座，这两条主打实时流式生成与开源仿真数据生成。<strong>边界</strong>：Frameboy 仍需高性能云端 GPU、成本高于本地渲染，15FPS 低于现代游戏常见 30 / 60FPS；Cosmos 3 公告未给出流式变体质量与速度数据、未说明最低显存要求；两者都不是可交付成片工具。',
    chips: [['Frameboy', '最高 15FPS 流式'], ['输入', '单图 / 真实多视角照片'], ['Cosmos 3', '4 款 · 各 16B · 可商用'], ['VFlash', '推理最高提速 5.1 倍']]
  },
  {
    n: 8, id: 'item-8',
    title: '生成链补上「自检」与「工作台」：蚂蚁 Ling-3.2-flash 视觉反馈自检 + Krea Video 一体化工作台',
    tag: '🎬 多模态 / 宣发工具 / 工作流',
    desc: '11 月 6 日两条创作链进展同时落地。其一，<strong>蚂蚁百灵发布原生多模态模型 Ling-3.2-flash</strong>：<strong>560B 总参 / 25B 激活</strong>的 MoE，支持 <strong>1M 原生长上下文</strong>与文本、图片、视频原生输入，重点强化复杂视觉理解、多模态长程 Agent、<strong>3D 空间理解与交互</strong>、医疗多模态四大能力。核心亮点是<strong>视觉反馈自检与异常自适应恢复</strong>：把渲染画面、软件界面当作观测输入，比对布局差异自动修正，遇报错可定位重试、继续推进长程任务。官方称 <strong>DesignArena 图像转前端以 1238 分进入前十</strong>，OmniDocBench1.5（92.21）、ZEROBench Sub（43.71）、Vision2Web（85.86）三项<strong>超过 Claude Opus 5</strong>；API 输入每百万词元 <strong>0.3 美元</strong>，上线前两周限时免费，兼容 OpenAI 与 Anthropic 协议，已在灵光 2.0 落地，权重近期开放。其二，<strong>Krea 推出全新 Krea Video 工作台</strong>，把生成、编辑、风格迁移与音效制作整合进浏览器：<strong>电影级镜头运动控制</strong>（推 / 拉 / 横移 / 环绕 / 俯仰）、<strong>100+ 预设风格</strong>、<strong>UGC 广告模板</strong>、视频风格迁移与音效生成，并作为多模型入口调用 Seedance / Gemini Omni / Kling / Runway / MiniMax。同日 <strong>Viggle 发布视频转换智能体 Viggle Remake 并开放权重</strong>，<strong>fal 开放 FLUX 3 Max 免费视频生成至 11 月 9 日</strong>。<strong>看懂图升级为看着画面给自己纠错</strong>：多模态 Agent 把生成结果当观测输入，等于把审校环节做进模型侧，与 11-06 期「91% 单项约束只换来 41.3% 可行设计」的整体验收短板正好对上。<strong>Krea Video 的价值在收口</strong>：减少多工具切换与来回导出，UGC 广告模板直接瞄准短视频营销。<strong>边界</strong>：Ling-3.2-flash 三项超 Opus 5 为官方自评、权重未开放、医疗场景需专业验证；Krea 各模型镜头控制能力与输入限制不同，同一指令跨模型结果不一致；Viggle / fal 的免费窗口与商用授权需逐项确认，不宜按聚合站参数排产。',
    chips: [['Ling-3.2-flash', '560B / 25B 激活 · 1M 上下文'], ['自检', '视觉反馈 · 自动纠错重试'], ['Krea Video', '100+ 风格 · UGC 广告模板'], ['价格', '输入 0.3 美元/百万词元']]
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

const LEAD = '今天的 8 条新闻，主线是<strong>钱开始挑项目，智能体开始常驻</strong> &middot; 上半场是重定价：<strong>OpenAI 完成 110 亿美元首批到账、估值 1.25 万亿美元</strong>，但本轮从 300 亿目标砍到约 200 亿、软银从累计投入 650 亿缩到只谈数亿美元；同日 <strong>Anthropic IPO 估值从 1.5 万亿被压到 1.2–1.3 万亿</strong>、S-1 里 10 月营收一栏仍空着；<strong>工信部</strong>给智能体发进网工牌，<strong>Meta</strong> 被挪威、巴西、英国三国司法按住 &middot; 下半场方向恰好相反：<strong>Perplexity Teammates</strong> 让 Agent 变成 200 美元/月常驻在岗的同事，内部 30 天跑出约一万个；<strong>Meta Muse</strong> 装上 Active Memory 与 Active Focus；<strong>Google 把 Agent Substrate 捐给 CNCF</strong>，闲置会话 500ms 恢复、容器密度提升 10 倍 &middot; 收尾回到宣发最实在的地方：<strong>World Labs Frameboy</strong> 让世界模型从等渲染变成推镜头（最高 15FPS），<strong>NVIDIA 开源 4 个 Cosmos 3</strong>，<strong>蚂蚁 Ling-3.2-flash 与 Krea Video</strong> 把视觉自检和一体化工作台塞进生成链';

const navSub = [
  ['资本重定价', '工信部进网管理', 'Meta 抓取条款'],
  ['Perplexity Teammates', 'Meta Muse 三连', 'Agent Substrate 捐 CNCF'],
  ['Frameboy + Cosmos 3', 'Ling-3.2 + Krea Video']
];

let body = '\n<body>\n\n<div class="progress-bar"><div class="progress-bar-fill" id="progressFill"></div></div>\n\n<nav class="sidebar" id="sidebar">\n';
body += '  <div class="sidebar-header">\n';
body += '    <div class="sidebar-brand">AI Daily Report</div>\n';
body += '    <h1>AIGC <em>日报</em></h1>\n';
body += '    <div class="sidebar-meta">2026.11.07 &middot; 星期六 &middot; 第 91 期 &middot; 8 条速报</div>\n';
body += '  </div>\n\n';
body += '  <div class="nav-section">\n    <div class="nav-section-title">Overview</div>\n';
body += '    <a href="#top" class="nav-link active"><span class="nav-num">&middot;</span>今日速览</a>\n  </div>\n\n';

const secMeta = [
  ['Repricing &amp; Rules', '💰 重定价 · 规矩', '#s1', navSub[0]],
  ['Agents That Stay', '🛠 常驻智能体', '#s2', navSub[1]],
  ['Worlds &amp; Workflows', '🎬 世界模型 · 生成工作流', '#s3', navSub[2]]
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
body += '    <div class="header-kicker">AI Daily Report &middot; 2026.11.07 &middot; Sat &middot; Issue 91</div>\n';
body += '    <h1>AIGC <em>日报</em></h1>\n';
body += '    <p class="lead">' + LEAD + '</p>\n';
body += '    <div class="header-meta">\n      <span class="meta-tag">💰 重定价 &amp; 规矩</span>\n      <span class="meta-tag">&middot;</span>\n      <span class="meta-tag">🛠 常驻智能体</span>\n      <span class="meta-tag">&middot;</span>\n      <span class="meta-tag">🎬 世界模型 &amp; 生成工作流</span>\n      <span class="meta-tag">&middot;</span>\n      <span class="meta-tag">2026.11.07 &middot; 第 91 期</span>\n    </div>\n  </div>\n\n\n';

const secInfo = [
  ['i. Repricing &amp; Rules', '💰 重定价与规矩', '估值守住万亿、支票变小变谨慎 —— OpenAI 110 亿到账但出资方缩手、Anthropic IPO 估值下修、工信部给智能体发进网工牌、Meta 被三国司法按住', 'section', '3 items'],
  ['ii. Agents That Stay', '🛠 常驻智能体', '产品层、记忆层、基础设施层在同一天拼齐 —— 200 美元/月的 Teammates、记得住的 Muse、挂得起的 Agent Substrate', 'section-highlight', '3 items'],
  ['iii. Worlds &amp; Workflows', '🎬 世界模型与生成工作流', '从等渲染到推镜头，从多工具切换到一体化工作台 —— Frameboy 实时 15FPS、Cosmos 3 开源、Ling-3.2-flash 看着画面自己纠错', 'section', '2 items']
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
body += '    <p>八条其实在讲同一天里的两个方向：<strong>钱开始挑项目，智能体开始常驻</strong>。资本与监管在同一天把无限扩张的假设收了回去，产品侧却让 AI 从你问它答变成它一直在岗。</p>\n';
body += '    <p><strong>① 上半场是重定价（#1–#3）</strong>。OpenAI 110 亿到账但出资方集体缩手、Anthropic IPO 估值被压到 1.2–1.3 万亿、工信部给智能体发进网工牌、Meta 被三国司法按住。值得注意的是<strong>估值仍守在万亿以上，缩的是支票和节奏</strong>——这不是泡沫破裂，而是从信仰定价转向账本定价；11-05 美股 19 个月最大单日跌幅与中期选举后 41 项公投 40 项限制数据中心，把算力能不能落地、电费谁付直接塞进了估值模型。</p>\n';
body += '    <p><strong>② 中间三条是常驻（#4–#6）</strong>。Perplexity Teammates 让 Agent 变成 200 美元/月的同事，Meta 用 Active Memory 让它记得住，Google 用 Agent Substrate 让它挂得起、醒得快——产品层、记忆层、基础设施层是三家公司在同一天独立交出的三块拼图。配上 11-06 期 Kimi Hosted Agents 的运行环境，常驻 Agent 的技术栈第一次完整可见：产品层 → 运行环境层 → 隔离调度层。</p>\n';
body += '    <p><strong>③ 收尾两条回到宣发最实在的地方（#7–#8）</strong>。Frameboy 把世界模型从等渲染推进到推镜头，Cosmos 3 把仿真权重开源到自有机房；Ling-3.2-flash 让模型看着自己的画面纠错，Krea Video 把生成、改片、音效收进一个工作台。前三条讲钱和规矩，中间三条讲住下来，最后两条讲能不能少重跑一次。</p>\n';
body += '    <p>今天最高分给到 <strong>#1 资本重定价（9.3 / P0）</strong>：分量不在数字大，而在估值守住、支票变小这个转折第一次同时发生在两家头部实验室身上，且立刻传导到算力租约与企业 AI 支出预期。</p>\n';
body += '    <p>四条可以立刻执行的线索：<strong>① 用 Frameboy / Viewfinder 试一次分镜预演</strong>（只做草稿，15FPS 与云端成本决定它不进成片）；<strong>② 在 Krea Video 开一条同镜头多风格试点</strong>，验 UGC 广告模板是否省掉来回导出；<strong>③ 给常驻 Agent 排期前先算清 200 美元/月 × 队友数与权限继承规则</strong>，避免越权读到未发布资产；<strong>④ 给 AI 素材与系统级智能体入口补一份适配验证列表 + 调用声明 + 参考来源台账</strong>的合规清单，把 #2 与 #3 的要求前置到立项阶段。</p>\n';
body += '  </div>\n</div>\n</div>\n\n';

fs.writeFileSync(OUT, head + body + tail, 'utf8');
const out = fs.readFileSync(OUT, 'utf8');
console.log('written', OUT, fs.statSync(OUT).size, 'bytes');
console.log('title 2026.11.07 =', out.indexOf('<title>AIGC 日报 · 2026.11.07</title>') !== -1);
console.log('stale 11.06 title =', out.indexOf('2026.11.06') !== -1);
console.log('stale 第 90 期 =', out.indexOf('第 90 期') !== -1);
console.log('</head> count =', (out.match(/<\/head>/g) || []).length);
console.log('cards =', (out.match(/class="card"/g) || []).length);
console.log('nav-sub =', (out.match(/nav-link nav-sub/g) || []).length);
console.log('sections =', (out.match(/class="section"/g) || []).length + (out.match(/class="section-highlight"/g) || []).length);
console.log('chips =', (out.match(/class="data-chip"/g) || []).length);
console.log('progressFill DOM =', out.indexOf('id="progressFill"') !== -1);
console.log('lead has content =', /<p class="lead">\S/.test(out));
console.log('back-to-archive =', out.indexOf('返回归档') !== -1);
