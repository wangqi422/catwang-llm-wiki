const fs = require('fs');
const TPL = 'docs/ai-daily/ai-daily-card-20261111-toc.html';
const OUT = 'docs/ai-daily/ai-daily-card-20261112-toc.html';
const lines = fs.readFileSync(TPL, 'utf8').split('\n');

// head: 到含 </head> 的那一行；title 用正则强制改日期
let headIdx = lines.findIndex(l => l.trim() === '</head>');
let head = lines.slice(0, headIdx + 1).join('\n');
head = head.replace(/<title>[^<]*<\/title>/, '<title>AIGC 日报 · 2026.11.12</title>');

// tail: 从 <button class="back-to-top" 到文件末尾（含 ScrollSpy JS 与「← 返回归档」按钮）
let tailIdx = lines.findIndex(l => l.indexOf('<button class="back-to-top"') !== -1);
let tail = lines.slice(tailIdx).join('\n');

const items = [
  {
    n: 1, id: 'item-1',
    title: 'Google 发布 Gemini Decision 1 与 Gemini Decisions API：不逐 token 生成，单次前向传播评 1000 题，150–250ms / $0.10 每百万输入',
    tag: '🧭 决策模型 / 新品类 / 低延迟低成本',
    desc: '北京时间 11 月 12 日凌晨（当地时间 11 月 11 日），<strong>Google 在 Google AI Studio 正式推出 Gemini Decisions API，由全新的 Gemini Decision 1 模型驱动</strong>。与传统生成式大模型逐 token 生成文字不同，这款模型专为<strong>封闭选项集里的决策任务</strong>设计：不解码答案，而是通过<strong>单次前向传播</strong>对预设候选答案评分，直接返回判断结果、概率与置信度。官方口径下，可在 <strong>150–250ms 端到端延迟</strong>内，对文本、图像、音频、视频与 PDF（最多 256K tokens）一次性评估<strong>最多 1000 个是 / 否判断、多选（最多 255 选项）或打分题</strong>。定价为<strong>每百万输入 token $0.10、输出 token 费用为零</strong>，约为 Flash-Lite 的五分之一。Sundar Pichai 在 X 发文介绍并展示 Stitch Rapid 几秒内设计完整产品流程（1 倍速）；模型已上线 OpenRouter，Artificial Analysis 的 Decision Index 给出 66 分，中文媒体口径为「9 项测试拿下 7 项第一、准确率最高 92.2%」。<strong>把「判断」从「生成」里拆出来是一个新品类</strong>：过去想让 AI 判断一封邮件是不是垃圾邮件、或决定一项任务交给哪个 Agent，要调生成式模型再从文本里抽结果，现在省掉整套解码。<strong>与 #2 A2UI、#3 AlphaGenome 2 是同一天的同构动作</strong>——Google 没有再堆一个「更能生成」的通用旗舰，而是把输出形态拆成判断、界面、单细胞预测三个专用形态，竞争口径从「会不会答」转向「能不能交付一个可直接用的结果」。<strong>边界</strong>：9 项 7 第一、92.2%、66 分多为官方或第三方单一口径、无统一独立复测；专为封闭选项集设计、<strong>不能生成开放式内容</strong>；「校准误差最低」为官方说法。',
    chips: [['推理方式', '单次前向传播 · 不逐 token'], ['单次上限', '1000 题 / 256K tokens'], ['延迟与价', '150–250ms · $0.10/M 输入'], ['测试口径', '9 项 7 第一 · 最高 92.2%']]
  },
  {
    n: 2, id: 'item-2',
    title: 'Google 开源 A2UI 1.0 生成式 UI 协议首个稳定版：智能体直接回复原生交互界面，Apache 2.0，Atlassian / Alation / 字节已接入',
    tag: '🧩 生成式 UI / 开放协议 / 原生渲染',
    desc: '北京时间 11 月 12 日（当地时间 11 月 11 日），<strong>Google 宣布生成式 UI 开放协议 A2UI 1.0 正式上线</strong>，官网已将 v1.0 列为现行版本（首个稳定版，v0.9.1 为上一版）。A2UI 是 Google 于 2025 年底公布的协议，让智能体不只回文字，而是发送<strong>声明式组件描述</strong>、由客户端用自己的原生组件绘制交互界面——确认表单、图表、选择器都成为新的「回答方式」。项目以 <strong>Apache 2.0 开源</strong>，由 Google 创建、CopilotKit 与社区贡献。1.0 新增<strong>双向函数调用</strong>（<code>callAgentFunction</code> / <code>callRendererFunction</code>，航班选择器可在组件内就地核查余位）、无障碍支持（ARIA live region / hidden）、扩展元数据命名空间、<code>allowedParents</code> / <code>allowedChildren</code> 嵌套约束、分级 <code>ValidationResult</code>（错误 / 警告 / 提示）、<code>requiresUserActivation</code>、多目录 <code>catalogId</code> 混合与 <code>@path</code> 动态绑定。开源渲染器覆盖 Web（React / Angular / Lit 稳定）、Flutter（移动 / Web / 桌面）、SwiftUI（iOS）、Jetpack Compose（Android，v1.0 仍为 Planned）；Web 与 Flutter 渲染器可在 MCP Apps 内工作；智能体 SDK 在 Python 之外新增 TypeScript 与 Dart。落地案例：<strong>Atlassian 把 A2UI 引入 Jira</strong>（工作项内交互卡片补问）、<strong>Alation 用其构建指标卡与图表信息流</strong>（可展示背后 SQL）、彭博社，以及<strong>字节跳动早在 2026 年 6 月就为跨端框架 Lynx 发布 A2UI 渲染器</strong>；CopilotKit 同步推出基于 1.0 的 Generative UI（标准目录 70 组件，含 18 个 A2UI 基础组件）。<strong>安全分工前置最值得抄</strong>：模型只描述「要展示什么」，应用执行渲染，数据与子组件在服务端绑定、敏感数值不进模型；采用<strong>声明式数据格式而非可执行代码</strong>，从根上避开模型现场写 React / SwiftUI 带来的脚本注入与样式破坏。<strong>它不是 MCP / AG-UI / A2A 的替代品</strong>，而是补上 UI 载荷这一层——一条任务链可四者协作；与 MCP Apps（服务端预制 HTML + 沙盒 iframe）是两条路线。<strong>交付物从「答案」变成「工作节点」</strong>，竞争从答案正确率转向任务完成率。<strong>边界</strong>：版本状态并不整齐（Compose 1.0 Planned、Flutter / SwiftUI Alpha、Gemini Enterprise 仍 0.9.1、ADK Web 集成 v0.8），准确说法是「协议核心进入稳定、生态拿到迁移基准」；官方案例均未给出统一任务完成率与大规模对照数据。',
    chips: [['协议', 'A2UI 1.0 · Apache 2.0'], ['渲染器', 'React / Flutter / SwiftUI / Compose'], ['1.0 新增', '双向函数调用 · 分级校验'], ['已接入', 'Atlassian / Alation / 字节 Lynx']]
  },
  {
    n: 3, id: 'item-3',
    title: 'Google DeepMind 发布 AlphaGenome 2：从组织平均深入单细胞类型，1.07 亿单细胞图谱 / 68 组织，识别变异能力近翻倍',
    tag: '🧬 基因组 AI / 单细胞 / 科学落地',
    desc: '当地时间 11 月 11 日，<strong>Google DeepMind 发布新一代基因组 AI 模型 AlphaGenome 2</strong>，能够预测 DNA 序列及其变异对<strong>特定人类细胞类型和细胞状态</strong>的影响。新模型采用<strong>条件模型架构</strong>，使用超过 <strong>1.07 亿个人类和小鼠单细胞图谱、覆盖 68 种组织</strong>训练，识别基因表达相关遗传变异的能力<strong>接近上一代两倍</strong>，并新增 DNA 甲基化等分子指标预测，支持在不重新训练的情况下分析此前未见过的细胞类型与生物状态。DeepMind 称通过「从广泛的组织平均值深入到单个细胞类型和细胞状态」实现了阶跃式提升，能把静态细胞图谱转化为<strong>遗传学的预测引擎</strong>——例如解析特定心肌细胞或血液免疫细胞内的活动，帮助发现仅在特定细胞类型中起作用的关键 DNA 变异。官方援引近期研究称，调控开关通过在肠道免疫细胞中过度激活 ETS2 基因驱动炎症性肠病，而 AlphaGenome 2 能在<strong>计算层面复现这一发现</strong>。目前通过 AlphaGenome API 开放非商业研究，并以私人预览版开放给商业研究。<strong>从「平均」到「条件」是能力而非参数量的跃迁</strong>：上一代依赖组织平均值、会漏掉疾病相关细胞中的变异效应；条件架构让同一段 DNA 在不同细胞状态下被差异读取，且能外推到训练时未见过的细胞类型。<strong>有落地验证，不是纯跑分</strong>：复现 ETS2 / 炎症性肠病的已知发现，是「预测能对齐实验结论」的证据。<strong>与 #1 / #2 同构</strong>：同一天 Google 把「模型该输出什么」拆到判断、界面、单细胞预测三个专用形态，前沿实验室正从「一个模型包打天下」转向「按交付物形态做专用模型」。<strong>边界</strong>：「接近翻倍」为官方口径、无独立大规模复测；当前仅非商用 API + 商用私人预览；与临床转化之间仍隔实验验证与监管。',
    chips: [['训练数据', '1.07 亿单细胞 · 68 组织'], ['能力', '识别变异近前代 2 倍'], ['架构', '条件模型 · 外推未见细胞'], ['开放', '非商用 API · 商用私预']]
  },
  {
    n: 4, id: 'item-4',
    title: '阿里官宣 Qwen4 与 Qwen4-Max 预览版：代际升级追平第一梯队，兼容 OpenAI / Anthropic 接口，Token Plan 订阅制开放',
    tag: '🚀 国产旗舰 / 多模态 / 接口兼容',
    desc: '<strong>阿里正式官宣新一代千问 Qwen4 大模型系列，Qwen4-Max 预览版同步上线</strong>，在通用推理、数学代码、多模态理解、长上下文、智能体执行等核心维度完成代际升级，官方称在多项国际基准评测中追平全球第一梯队，同步优化端云协同部署效率，后续逐步释放全系列版本与开源权重。Qwen4-Max 可直接读取<strong>页面截图、带图表的文档与视频内容</strong>，不必把不同输入拆给不同模型；接口兼容 <strong>OpenAI Chat Completions / Responses 以及 Anthropic Messages</strong> 格式，存量业务代码迁移成本低；除 API 外还可通过 <strong>Qoder、千问办公、千问 App、QwenStudio</strong> 多入口体验。需要注意的是，<strong>预览版当前仅通过 Token Plan 订阅制开放调用、暂不支持通用按量付费</strong>（Credits 统一计量）。适用场景为复杂编程、多步骤 Agent、长文档 / 混合资料分析与专业办公；不适合高并发、低延迟、成本敏感的简单问答（用 Qwen4-Flash / Plus 更划算）。一个容易踩的坑：<strong>从该预览模型开始，<code>max_tokens</code> 与 <code>max_completion_tokens</code> 限制的是「思考内容 + 最终回答」的总量</strong>，按旧习惯只给最终回答留额度，长推理任务会提前截断。双 11 期间阿里云 Token Plan 两款月卡 5 折起、Qoder 月卡 3.3 折、千问办公基础版首月 3 折起。<strong>国产「集中冲顶」里的最新一棒</strong>：近一周已有 11-06 百度 ERNIE 5.5 Flash Base 开源、11-10 ERNIE Evolve、小米 MiMo-V2.6，Qwen4 是 Qwen3.8 → Qwen4 的<strong>全新系列代际升级</strong>（非旧模型继续报道）。<strong>接口兼容 + 多入口是冲份额最实在的一招</strong>，把迁移成本压到最低。<strong>边界</strong>：「追平第一梯队」为官方口径、无统一独立复测；预览版非全量开放，开源权重「后续逐步释放」无明确日期；简单任务用旗舰不划算，官方自己给了分流建议。',
    chips: [['系列', 'Qwen4 / Qwen4-Max 预览'], ['接口', '兼容 OpenAI / Anthropic'], ['多模态', '截图 / 图表文档 / 视频'], ['调用', '仅 Token Plan 订阅制']]
  },
  {
    n: 5, id: 'item-5',
    title: 'xAI 发布 Grok Bot 1.0：可进 Slack、Teams 与会议的 AI 团队协作队友，马斯克亲自站台',
    tag: '👥 AI 队友 / 企业协作 / 入口',
    desc: '<strong>xAI 发布 Grok Bot 1.0</strong>，定位为「可协作的 AI 团队成员」：不再是你去聊天框问一句、它答一句的助手，而是<strong>可接入 Slack 与 Microsoft Teams、能被邀请进会议、在团队沟通渠道里与人类同事一起工作</strong>的常驻 AI 队友。马斯克本人在 X 上宣传，Grok Bot 工程参与者也介绍了上线细节；AI HOT 聚合池在近 24h 内对该事件有 7 条以上独立命中（发布、可邀入会议、接入 Slack / Teams、团队协作定位等），是当天热度最集中的产品发布之一。同期 <strong>Databricks 升级的 Genie 智能体已宣布接入 ChatGPT、Claude、Microsoft Copilot Cowork 与 Grok Bot</strong>，企业协作入口的混战正式开打。<strong>从「你问它答」到「它在群里」</strong>：AI 从「一次性会话」变成「常驻协作渠道的成员」，与 11-11 期 Claude 办公套件（Whiteboards / Sheets / Data）、#2 A2UI「交付物变界面」、#6 入口争夺同属「AI 铺进工位」这条主线的延续——入口不再是聊天框，而是团队本来就在的地方。<strong>企业协作入口正在变成多方混战</strong>：微软 Copilot Cowork、Anthropic 办公套件、Databricks Genie、xAI Grok Bot 同场，谁占住团队默认打开的那个渠道，谁就拿到后续所有工作流的分发权。<strong>权限与数据隔离是硬前提</strong>：同一聚合池里还有 Grok 被指生成不当图像面临集体诉讼，以及 <strong>Grok Build 分享链接漏洞导致 SpaceXSI 内部资料与数千用户数据公开暴露</strong>（安全公司 Claroc 称 94.7% 的 Grok 构建应用可被任意访问）——AI 队友进协作渠道前，能看什么、能发什么、能碰哪些文件必须先收口。<strong>边界</strong>：核心能力与可用性多为厂商官宣 / 演示口径，无统一任务完成率与大规模企业对照数据；上述安全事件为第三方披露，与 1.0 发布本身需分开看。',
    chips: [['定位', 'AI 团队协作队友'], ['渠道', 'Slack / Teams / 会议'], ['站台', '马斯克亲自宣传'], ['前提', '权限与数据隔离先行']]
  },
  {
    n: 6, id: 'item-6',
    title: '腾讯元宝搜索正式上线，同日曝字节做「中国版 Muse」给豆包造超级大脑，张一鸣称 2029–30 追平美国顶尖实验室',
    tag: '🔎 搜索入口 / 超级助手 / 国产阵营',
    desc: '<strong>腾讯全新搜索产品「元宝搜索」正式上线</strong>（36氪获悉），把元宝从 AI 助手向「搜索 + 助手」复合入口补齐。同日有消息称<strong>字节跳动计划推出类似 Meta Muse 的 AI 助手、给豆包造一个「超级大脑」</strong>（爱范儿 / 36氪报道），并引述张一鸣内部表态：需到 <strong>2029 或 2030 年才追平美国顶尖实验室</strong>。两条合起来看，中国 AI 入口正从「聊天框」向「搜索 + 超级助手」扩张。这与近 24h 内的其他入口动作同构：OpenAI 的 Businesses in ChatGPT（11-11 期 #6，商家入口）、<strong>Gemini 接入 Apple CarPlay</strong>（iOS 用户可在车内免提语音对话）、ChatGPT 桌面应用上线财务功能——大家都在抢「用户第一个打开的那个框」。<strong>入口的定义在变</strong>：过去搜索是「找链接」、助手是「给答案」，现在两者合并成「直接替你完成」；腾讯把元宝补上搜索，是拿自有内容生态 + 检索给 AI 入口加底座。<strong>国产阵营第一次给出公开时间锚</strong>：张一鸣「2029–2030 追平」在普遍只讲「已追平 / 已超越」的宣传口径里显得少见，也侧面说明超级助手被当作长周期工程而非一次发布。<strong>与 #1 / #2 / #5 合看</strong>：Decision 1 改「输出什么」、A2UI 改「交付成什么样」、Grok Bot 改「待在哪里」、元宝搜索改「从哪儿进来」——今天所有大动作都在重排「人和 AI 的接口」，而不只是模型能力。<strong>边界</strong>：元宝搜索的产品细节与覆盖范围为媒体获悉口径；字节「中国版 Muse」仍为消息 / 计划阶段、非已发布产品；张一鸣表态为内部转述。',
    chips: [['腾讯', '元宝搜索正式上线'], ['字节', '豆包「中国版 Muse」'], ['时间锚', '张一鸣：2029–30 追平'], ['同场', 'Gemini 进 Apple CarPlay']]
  },
  {
    n: 7, id: 'item-7',
    title: 'Anthropic IPO 认购数倍超额：拟合计融资最高 904 亿美元、估值约 1.4 万亿，11 月 18 日定价，路演前新增 114 亿云采购承诺',
    tag: '📈 IPO / 资本 / 算力账本',
    desc: '11 月 11 日多家媒体报道，<strong>Anthropic IPO 认购需求已达到可供发行股份数量的数倍</strong>，主要受大型基石投资者认购意向推动。公司及联合创始人计划通过 IPO 与私募<strong>合计融资最高 904 亿美元</strong>，若完成将超过 SpaceX IPO 成为史上规模最大的上市交易；目标完全稀释估值约 <strong>1.4 万亿美元</strong>（低于部分投资者此前预期）。路演首日机构订单已覆盖全部 <strong>8.25 亿股</strong>，承销商正考虑上调发行估值至 <strong>1.5 万亿美元或更高</strong>，最终定价预计 <strong>11 月 18 日</strong>锁定。同时据其向 SEC 提交的招股文件，过去一个月内与<strong>微软、谷歌新增约 114 亿美元云服务采购承诺</strong>，使两家平台总支出承诺分别升至 <strong>492 亿与 1216 亿美元</strong>；并披露与小型云服务商 <strong>Lambda 签订的 349 亿美元租赁协议存在被取消风险</strong>（Lambda 未能在约定期限内建成数据中心）。创投公司 Copper Sky 负责人 Jack Selby 提示，这场世纪 IPO 可能成为 AI 行情高点，且首批股票禁售期届满后或引发连锁式回调。<strong>与昨日（第 95 期 #2）是同一事件的新阶段，不是重复选题</strong>：11-11 报的是「正式启动 IPO 路演 + 定价区间 $70–78 + 七巨头 260 亿配售」；今天报的是「认购数倍超额 + 904 亿融资总额 + 8.25 亿股被覆盖 + 11/18 定价 + 新增 114 亿云承诺 + Lambda 349 亿取消风险」——从「开卖」到「卖爆并把账本再摊开一层」。<strong>账本的另一面比估值更值得看</strong>：1216 亿 / 492 亿云承诺、Lambda 数据中心延期导致的 349 亿取消风险，与 11-09 期 1.7GW 卡特彼勒发电机组、11-03 期 Q3 财报由盈转亏是同一条「算力账本」线。<strong>数字都还没定稿</strong>：904 亿含私募、1.4 万亿为完全稀释估值、1.5 万亿只是承销商考虑中的上调、11/18 才是定价日。<strong>边界</strong>：认购倍数、基石名单与承销商上调意向均为媒体 / 知情人口径；云采购承诺与 Lambda 风险来自招股文件披露，Lambda 方面尚无公开回应。',
    chips: [['认购', '数倍超额 · 8.25 亿股覆盖'], ['融资', '最高 904 亿美元'], ['估值', '约 1.4 万亿 · 拟上调 1.5 万亿'], ['定价日', '11 月 18 日']]
  },
  {
    n: 8, id: 'item-8',
    title: '生成链补上「换角」与「对话内出图」：fal 上线 ChatGPT 插件 + Recast 换角不重拍，Luma 视频同镜头改角增删',
    tag: '🎬 生成式视频 / 局部编辑 / 宣发产线',
    desc: '近 24 小时生成链密集补上「后期可改」的能力：<strong>fal 上线 ChatGPT 插件</strong>，可在对话中直接生成与编辑图像、视频（聚合池多条独立命中），并推出 <strong>Recast「换角不重拍」</strong>；<strong>Luma 上线视频 Character Swap & Insert</strong>，可在<strong>同一镜头里改角、增删角色并保持镜头一致</strong>。同期机器之心报道 <strong>Fable 5.2 一句话生成 3D 短片</strong>、建模 / 运镜 / 渲染全包，并讨论「视频模型也要迎来苦涩的教训」（规模化后能力趋同、工程与数据成胜负手）。三件事合起来是一个明确信号：<strong>视频生成从「一次出片」走向「局部可改、可复用」</strong>。<strong>「局部可改」正是宣发最缺的一块</strong>：过去改一个角色、换一个联动 IP，往往要整条重跑、重新对镜头与节奏；换角不重拍 / 同镜头增删角色，把改动从「整片重生成」压成「单镜头局部重生成」，省的是工时也是一致性风险。<strong>入口也在收进对话流</strong>：fal 把生成 / 编辑做进 ChatGPT 插件，与 #2 A2UI「交互界面即答案」、#5 Grok Bot「AI 待在协作渠道里」同向。<strong>查重说明</strong>：11-10 期（第 94 期 #3）已报<strong>字节 Seedream 5.5 的 100 轮像素级编辑与原生 RGBA 透明</strong>，本条不重复该事件，聚焦「视频换角 + 对话内插件入口」这一新增面；10-01 期报过的 Runway Praxis-1 亦不在本条范围。<strong>边界</strong>：换角、增删角色、同一镜头一致性均为厂商官宣 / 演示口径，跨镜头一致性、商用授权、水印与素材版权需在自家素材上实测；Fable 5.2 生 3D 短片为模型能力展示、非新模型发布。',
    chips: [['fal', 'ChatGPT 插件 · 对话内出图'], ['Recast', '换角不重拍'], ['Luma', '同镜头改角增删'], ['落点', '一版 TVC 多地区版本']]
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

const LEAD = '今天的 8 条新闻，主线是<strong>从会答，到会判、会交、会干活</strong> &middot; 上半场是 Google 一家的「不生成」三连：<strong>Gemini Decision 1 干脆不逐 token 生成文字</strong>（单次前向传播评 1000 题、150–250ms、$0.10/M 输入、输出零费用）、<strong>A2UI 1.0 让智能体回一张原生交互界面而不是一段文字</strong>（首个稳定版、Apache 2.0 开源）、<strong>AlphaGenome 2 把基因组预测从组织平均压进单细胞类型</strong>（1.07 亿图谱 / 68 组织、识别变异近翻倍） &middot; 中场是国产与入口正面照面：<strong>阿里官宣 Qwen4 / Qwen4-Max 预览版</strong>（代际升级 + 兼容 OpenAI / Anthropic 接口）、<strong>xAI 发布可进 Slack / Teams / 会议的 Grok Bot 1.0</strong>、<strong>腾讯元宝搜索上线</strong>并曝字节给豆包造「中国版 Muse」 &middot; 收尾落到钱与产线：<strong>Anthropic IPO 认购数倍超额</strong>（904 亿融资、新增 114 亿云承诺）、<strong>fal / Luma 补上换角不重拍与对话内出图</strong>。今天没有谁在比谁写得多，大家比的是谁交得出东西';

const navSub = [
  ['Decision 1 决策模型', 'A2UI 1.0 协议', 'AlphaGenome 2'],
  ['Qwen4-Max 冲顶', 'Grok Bot 1.0', '元宝搜索上线'],
  ['Anthropic 超额认购', '换角不重拍']
];

let body = '\n<body>\n\n<div class="progress-bar"><div class="progress-bar-fill" id="progressFill"></div></div>\n\n<nav class="sidebar" id="sidebar">\n';
body += '  <div class="sidebar-header">\n';
body += '    <div class="sidebar-brand">AI Daily Report</div>\n';
body += '    <h1>AIGC <em>日报</em></h1>\n';
body += '    <div class="sidebar-meta">2026.11.12 &middot; 星期四 &middot; 第 96 期 &middot; 8 条速报</div>\n';
body += '  </div>\n\n';
body += '  <div class="nav-section">\n    <div class="nav-section-title">Overview</div>\n';
body += '    <a href="#top" class="nav-link active"><span class="nav-num">&middot;</span>今日速览</a>\n  </div>\n\n';

const secMeta = [
  ['Beyond Generation', '🧭 不生成 · 交结果', '#s1', navSub[0]],
  ['Frontier &amp; Entries', '🌐 冲顶 · 抢入口', '#s2', navSub[1]],
  ['Ledgers &amp; Pipelines', '🛠️ 账本 · 进产线', '#s3', navSub[2]]
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
body += '    <div class="header-kicker">AI Daily Report &middot; 2026.11.12 &middot; Thu &middot; Issue 96</div>\n';
body += '    <h1>AIGC <em>日报</em></h1>\n';
body += '    <p class="lead">' + LEAD + '</p>\n';
body += '    <div class="header-meta">\n      <span class="meta-tag">🧭 不生成 &amp; 交结果</span>\n      <span class="meta-tag">&middot;</span>\n      <span class="meta-tag">🌐 冲顶 · 抢入口</span>\n      <span class="meta-tag">&middot;</span>\n      <span class="meta-tag">🛠️ 账本 · 进产线</span>\n      <span class="meta-tag">&middot;</span>\n      <span class="meta-tag">2026.11.12 &middot; 第 96 期</span>\n    </div>\n  </div>\n\n\n';

const secInfo = [
  ['i. Beyond Generation', '🧭 不生成 · 交结果', '判断、界面、单细胞 —— Google 一天把「模型该输出什么」拆成了三份', 'section', '3 items'],
  ['ii. Frontier &amp; Entries', '🌐 冲顶 · 抢入口', '国产代际升级、AI 队友进协作渠道、搜索与超级助手抢「第一个打开的框」', 'section-highlight', '3 items'],
  ['iii. Ledgers &amp; Pipelines', '🛠️ 账本 · 进产线', '算力账本再摊开一层，生成链补上「换角」与「对话内出图」', 'section', '2 items']
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
body += '    <p>八条其实在讲同一件事：<strong>从会答，到会判、会交、会干活</strong>。昨天（11-11 期）比的是「谁能把能力最快最广地铺开」，今天比的换成了「AI 到底该交出什么」——最密集的动作来自 Google 一家，它没再发一个「更能生成」的通用模型，而是把输出形态拆成了判断、界面、单细胞预测三份。今天没有谁在比谁写得多，大家比的是谁交得出东西。</p>\n';
body += '    <p><strong>① 上半场是「不生成」三连（#1–#3）</strong>。<strong>Gemini Decision 1</strong> 干脆不逐 token 生成文字，单次前向传播就对最多 1000 个封闭问题给出判断、概率与置信度，150–250ms、$0.10/M 输入、输出零费用；<strong>A2UI 1.0</strong> 让智能体不再只回一段文字，而是回一张由应用原生组件绘制的可交互界面，首个稳定版以 Apache 2.0 开源；<strong>AlphaGenome 2</strong> 把基因组预测从组织平均压进单个细胞类型与状态，识别变异能力接近翻倍。三者指向同一件事：<strong>AI 的交付物正在从「供人阅读的答案」，变成「可以判断、可以核对、可以触发的工作节点」</strong>。</p>\n';
body += '    <p><strong>② 中间三条是国产与入口的正面照面（#4–#6）</strong>。阿里官宣 Qwen4 / Qwen4-Max 预览版，代际升级 + 兼容 OpenAI / Anthropic 接口 + 多入口铺开；xAI 发布 Grok Bot 1.0，把 AI 做成能进 Slack、Teams 与会议的「团队成员」；腾讯元宝搜索正式上线、同日曝字节要给豆包造「中国版 Muse」超级大脑。Decision 1 改「输出什么」、A2UI 改「交付成什么样」、Grok Bot 改「待在哪里」、元宝搜索改「从哪儿进来」——<strong>今天所有大动作都在重排「人和 AI 的接口」，而不只是模型能力</strong>。</p>\n';
body += '    <p><strong>③ 收尾两条落到钱与产线（#7–#8）</strong>。Anthropic IPO 认购数倍超额、904 亿美元融资与新增 114 亿云承诺把算力账本再摊开一层（明确区分 11-11「启动路演」与今日「认购超额 + 新账本」两个不同阶段）；fal / Luma 补上「换角不重拍」与「对话内出图」，让视频生成第一次有了后期局部可改的能力。一个往上游算钱，一个往下游省工时。</p>\n';
body += '    <p>一句话：<strong>昨天在比谁先把能力铺到所有人手边，今天在比谁能把结果直接交到人手边，而交付物越具体，越要把权限、口径与账本先写清楚</strong>。</p>\n';
body += '    <p>今天最高分给到 <strong>#1 Google Gemini Decision 1（9.4 / P0）</strong>：分量不只在 150–250ms 与 $0.10/M 的经济性，更在它把「判断」从「生成」里整个拆出来成了一个新品类，并与同日 A2UI、AlphaGenome 2 一起，把行业竞争从「生成能力」正式推向「交付物形态」——是本期所有叙事的起点。</p>\n';
body += '    <p>五条可以立刻执行的线索：<strong>① 把素材初筛 / 合规打标 / 多尺寸质检换成 Decision 1 式的批量判断 API</strong>（一次 1000 题、250ms、$0.10/M），但先用自家标注集测校准误差、别拿官方 92.2% 当验收线；<strong>② 用 A2UI 式交互卡片在 Web 内部工具试点「候选物料 + 参数 + 审批项」一屏确认</strong>，把「读完再搬」压成「点一下」，Android 完整 1.0 与企业侧 0.9.1 未齐前不铺全渠道；<strong>③ 拿 Qwen4-Max 试跑现有 OpenAI / Anthropic 格式脚本</strong>（日报流水线、批量切图校验），先按「思考 + 回答总量」重新核 <code>max_tokens</code>，别把双 11 折扣价写进长期预算；<strong>④ 把 AI 队友进协作渠道的权限按项目隔离</strong>——Grok Build 分享链接暴露内部资料就是反面教材，未定稿宣发物料不开全量文件权限；<strong>⑤ 用 fal / Luma 的换角能力对一条已定稿旧片做 A/B</strong>（整片重跑 vs 局部重生成），比成片一致性与工时，同时把「活动标准信息包」同步喂给主流 AI 搜索可抓取的官方页面，做白帽 AEO 巡检、明确不操纵模型输出的合规红线。</p>\n';
body += '  </div>\n</div>\n</div>\n\n';

fs.writeFileSync(OUT, head + body + tail, 'utf8');
const out = fs.readFileSync(OUT, 'utf8');
console.log('written', OUT, fs.statSync(OUT).size, 'bytes');
console.log('title 2026.11.12 =', out.indexOf('<title>AIGC 日报 · 2026.11.12</title>') !== -1);
console.log('stale 11.11 (escaped) =', /11\.11/.test(out));
console.log('stale 第 95 期 =', out.indexOf('第 95 期') !== -1);
console.log('stale Issue 95 =', out.indexOf('Issue 95') !== -1);
console.log('stale 星期三 =', out.indexOf('星期三') !== -1);
console.log('</head> count =', (out.match(/<\/head>/g) || []).length);
console.log('cards =', (out.match(/class="card"/g) || []).length);
console.log('nav-sub =', (out.match(/nav-link nav-sub/g) || []).length);
console.log('sections =', (out.match(/class="section"/g) || []).length + (out.match(/class="section-highlight"/g) || []).length);
console.log('chips =', (out.match(/class="data-chip"/g) || []).length);
console.log('progressFill DOM =', out.indexOf('id="progressFill"') !== -1);
console.log('lead has content =', /<p class="lead">\S/.test(out));
console.log('back-to-archive =', out.indexOf('返回归档') !== -1);
