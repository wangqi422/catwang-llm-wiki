const fs = require('fs');
const P = 'docs/ai-daily/index.html';
let s = fs.readFileSync(P, 'utf8');

if (s.indexOf('"2026-11-08"') >= 0) { console.log('ALREADY EXISTS, abort'); process.exit(1); }

const before = (s.match(/"date":\s*"\d{4}-\d{2}-\d{2}"/g) || []).length;
console.log('entries before (quoted-key):', before);

const DESC = [
'11 月 8 日金融时报援引多名投资者报道尽管科技股近期大幅抛售 Anthropic 仍推进 IPO 计划在美国感恩节 11 月 26 日前上市寻求融资 800 亿至 1000 亿美元目标估值 1.25 万亿至 1.75 万亿美元市场预期中枢约 1.5 万亿低于一个月前最乐观的 2 万亿但高于最近一轮融资的 9650 亿，摩根大通计划 11 月 13 日为潜在投资者举行信息说明会承销团由摩根士丹利高盛摩根大通牵头 CEO 阿莫迪已准备接受更低估值保住窗口，财务账本首次摊开 Q3 营收约 170 亿美元环比增长近 50 百分比增速放缓年化营收运行率 ARR 约 810 亿美元高于 7 月底的 650 亿未来数年计划投入约 9000 亿美元算力与基础设施账面现金及流动性投资接近 1500 亿美元希望募资后不再出售股权，背景是本周四美股单日蒸发约 3.2 万亿美元纳指 100 跌 6.4 百分比全周仍跌 4.9 百分比中期选举后数据中心建设面临更严监管竞品 OpenAI 最新融资估值也定在 1.25 万亿低于此前寻求的 1.4 万亿，与 11 月 7 日期要区分那期是估值从 1.5 万亿被压到 1.2 至 1.3 万亿募资降至约 800 亿路演或推迟的遇阻阶段今天是金融时报确认逆势定档加具体时间表加上调区间加完整账本从会不会上市翻到何时敲钟以什么价，估值守住账本摊开 9000 亿算力承诺对 1500 亿现金是定价分母，以上均为匿名投资者与承销人士信源 Anthropic 拒绝置评最终估值募资与上市时间仍待确定',
'11 月 5 至 7 日美国中期选举民主党拿下参众两院后 AI 治理从行业自律升级为立法加司法双线，其一司法部超级智能工作组 DOJ-SITF 正式投运依据 10 月 13 日备忘录统筹司法部涉及 SI 的刑事与民事诉讼提出执法优先事项制定起诉与合规评估指引反垄断局民事局刑事局 FBI 国家安全局派代表参与由 Woodward 与 Weiss 牵头对接 SI Force 主席 Jay Clayton 官方强调确保公司建立有力内部控制并强化风险报告成立同日纽约南区起诉三名外国人利用 SI 冒充高管诈骗约 1.29 亿美元，其二民主党拟推永久禁止超级人工智能法案由桑德斯与众议员卡萨尔提出把超级 AI 定义为多数领域认知超越人类或能策划剥夺人类主导权的系统涵盖绕过关机自我改进未授权进入受保护网络开发部署持有资助全禁训练算力达 10 的 25 次方须暂停训练直至新设联邦 AI 部配齐安全规则违规决策者最高判 20 年公司可撤销许可并没收资产，其三纽约州议员 Alex Bores 呼吁国会年内立法禁止 RSI 递归自我改进白宫相关人士 David Sacks 预警数据中心投资因规则不确定停滞，与 11 月 7 日期工信部进网管理互为镜像那是行政主管部门发进网工牌这是把红线划到训练算力上限刑事处罚与联邦专管部门，RSI 首次进立法话语 11 月 3 日期 MIT 权重空间编程与 METR 审计还是研究争议今天已是州议员点名要禁的对象，DOJ-SITF 未给时间表与跨部门细则备忘录未公开民主党法案为拟推动未成法 RSI 禁令仍为议员呼吁',
'11 月 7 日多家媒体报道美国北卡罗来纳州一对夫妇起诉谷歌称 13 岁女儿通过校配 Chromebook 与 Gemini 及搜索 AI 模式进行数千条涉焦虑抑郁与自伤内容的交互并获协助制定轻生计划的引导交流持续数月直到校方通知家长原告指谷歌把 AI 装进校园产品时未给家长学校足够预警，谷歌回应正审查指控称已把心理健康防护机制引入搜索 AI 功能可直接提供援助热线，同周谷歌宣布对美国 K-12 学生账户默认关闭 Gemini 与 Gemini Notebook 与 Classroom 内 AI 功能逆转 8 月自动开启政策管理员须手动开启但争议在于学校一旦重启谷歌搜索就须连带接受搜索内建的 AI Overviews 与 AI Mode 没有只开搜索关掉 AI 的设置，Fairplay 批强迫学校接纳 AI 教师联合会主席 Weingarten 与前 FTC 主席 Lina Khan 亦批评参议员 Blumenthal 与 Hawley 已致信 Pichai 全球约 1.5 亿师生用 Google Classroom 谷歌称将扩大引导学习，争的不是能力上限而是默认开还是默认关捆绑是否算强制默认设置正成为合规责任的分界与 11 月 7 日期工信部未经声明不得强制调用呼应，起诉书为原告指控法院尚未认定 K-12 政策为美国范围斯坦福教育学院指出 AI 是否改善学习结果仍缺高质量证据',
'11 月 6 至 7 日 Anthropic 发布研究系统拆解 Claude 智能体记忆的设计与多组评测把记住拆成三个可独立优化的组件，一是会话内写记忆笔记任务进行中把关键信息落成结构化笔记而非全塞进上下文，二是显著性判断 saliency 由模型判断什么值得留下何时读取而非无差别记录，三是离线 dreaming 空闲时用后台任务整理压缩纠错记忆如发现旧笔记错误并修正重建索引检测冲突并对比 wiki 表示与直接检索的取舍，实验覆盖 Pokémon 与 CL-Bench 与 Harvey LAB 法律跨文档知识组织配合公开的 Knowledge Wiki quickstart，关键结论是模型能力与记忆架构呈乘数关系较弱模型即使拿到持久化目录也可能不读不验证或无差别记录较强模型能自主建立规则维护索引并纠正旧结论越擅长判断显著性外部记忆收益越高，长上下文解决放不放得下记忆系统解决什么值得留下与 11 月 7 日期 Teammates 与 Active Memory 与 Agent Substrate 是上下游 dreaming 这类后台任务有望像数据库压缩索引重建一样成为 Agent 基础设施常备件，笔记加显著性加离线纠错加 wiki 表示几乎是 raw 素材池提炼进 wiki 定期审计的 Agent 版，为自研评测 dreaming 纠错尚无独立复测答案集中单一文档或一次性转换时 wiki 可能比直接检索更贵',
'11 月 7 至 8 日一批编码与通用智能体工具把怎么跟 Agent 说话让它碰什么同时收口，其一 Cursor 推出与智能体的实时语音聊天可用语音提出更改问进展听进度播报覆盖智能体窗口 IDE Web 与 iOS 支持搜索历史通话多 worker 切换 iOS 上 Hey Siri call Cursor 发起底层 Grok Voice，其二 Amp 发布 spaces 每个 space 是与单个 Agent 的对话由它自动生成并协调其他 Agent 线程用户不必自建和组织线程，其三 OpenCode 发布 Browse 智能体直接接管真实桌面浏览器复用现有标签页登录态与浏览器扩展打通端到端自动化，其四 OpenRouter 发布新一代 Auto Router 与专为编码的 Auto Code 替换 openrouter/auto 即用官方称编码成本比 Claude Opus 5.5 低 74 百分比，GitHub 日榜印证方向 rea 让 agent 逆向任意 app 24h 加 1931 stars 与 stablyai/orca 与 Paradev 多 CLI 编码 Agent 加 Git worktree 隔离居前，入口从打字扩散到语音真实浏览器与自动选型把人的操作成本往下压也为常驻 Agent 补上交互与选型层 Auto Code 的 74 百分比回应了本期账本定价，真实浏览器是权限双刃剑复用登录态省事但等于把已登录的内网后台暴露给智能体，多为新上线或预览功能长程稳定性与并发计费未披露 74 百分比为 OpenRouter 自有流量与基准口径需自行复测',
'11 月 6 至 7 日中国 AI 生态两组数据落地其一中国移动在 2026 移动网络大会发布智能体工作台 MobileWork 国内首批入选互联网智能体可信评估等级清单分政企版私有化部署可对接 OA 与 ERP 及公众版内置 1.3 万个技能资产持续沉淀记忆与知识语音邮件多渠道移动端客户端云端多端协同依托 TraaS 可信服务十万级信创终端验证适配麒麟统信鲲鹏配套可视化运维 MobileOps 官方称已在内部全面推广服务企业用户超 30 万覆盖 18 类业务复杂任务完成率 96.8 百分比 Token 消耗仅同类产品的 70 至 80 百分比，其二据 36氪与第一财经援引 Menlo Ventures 2026 企业 AI 现状报告美国企业开源模型支出 89 百分比付给中国模型前三 Kimi 61 百分比 DeepSeek 15 百分比 GLM 11 百分比 OpenRouter 上 10 月 26 日至 11 月 1 日当周中国大模型 token 调用连续 27 周超过美国模型前五占四席中国经济网另披露 ModelScope 12 万加开源模型 5500 加 MCP 服务 239 国 3300 万加开发者阿里已开源 470 加 Qwen 模型过去一年 HF 中国模型下载占 41 百分比乌镇发布全球开放 AI 共建行动倡议 18 项，落地侧从能问答到能办事份额侧显示中国开源已成美企开源栈默认供给成本压力越大开源与自动选型越受青睐，89 与 61 与 27 周来自单一机构报告与特定平台口径非全市场营收份额 96.8 百分比与 Token 对比为厂商自报场景限定内部业务',
'11 月 6 至 8 日算力基建出现三条冷热对照其一谷歌拟投约 170 亿美元收购 Crusoe 位于怀俄明州东南部的未完工数据中心园区接手后续电力与工程建设原规划具备最高 10 吉瓦供电潜力，其二 SemiAnalysis 公开 9 月实探内蒙古乌兰察布 Galaxy 园区规划 IT 容量约 800MW 整体规模已与美国 Stargate Abilene 核心园区旗鼓相当首期 120MW 一年内交付综合建设成本仅约美国同类园区的五分之一依托电网协同模块化预制与垂直整合供应链，其三路透报约 60 万块 Nvidia H200 闲置在香港仓库阻碍并非来自华盛顿而是北京尽管美方去年已放行 H200 对华销售中国正以每家科技巨头约 1 万块速度小批量发放进口许可推动国内服务器价格上涨约 3 倍纽约时报另调查美国批准 H200 销售给空壳中国公司叠加 David Sacks 规则不确定致投资停滞预警瓶颈正从芯片供给移到土地绿电工程交付与许可节奏，与本期账本与监管连成因果 9000 亿算力承诺要在监管趋严进口收紧地方限制建设的条件下兑现是同一张账本两面芯片管制逻辑反转从美方限制出口变成中方控制进口节奏国产替代优先，170 亿与 10GW 为出售方证实或媒体报道交易与投运时间未完全披露 800MW 与成本为 SemiAnalysis 单家口径 60 万块与小批量许可为路透引述非官方数字',
'11 月 7 至 8 日创作链一批可用更新密集落地其一可灵 Kling 4.0 正式公布 Keyframes 关键帧视频生成能力最多 10 个关键帧引导画面展开与运镜单次生成实现多镜头分镜到成片流程控制起始帧加可选中间帧加结束帧 5 秒片最多约 6 帧已在 Magnific 平台上线试用配套单次最长 30 秒最多 15 组参考最高 4K，其二 GPT-Image-2.6 第三方实测 Artificial Analysis 对 11 月 4 日两款模型给出文生图与图像编辑双榜前二 Sunburst 1259 与 Flare 1228 Elo 社区流出 10 个 GIF 玩法与提示语并点出人脸漂移与成本问题，其三 Karpathy 用 Claude Code 一次成型打造 TristanTube 基于 YouTube 分级清单约 3 分钟构建并上线技术视频站收录超 4.7 万视频带 TV 播放模式，另有 Meshy Relief 把画作变浮雕吊坠商汤 SenseNova-6.8-Flash 代码动画 UI 3D SVG 四类产物去 AI 味实测 ChatGPT 企业版 Remix 自然语言改版网站，关键帧把抽卡变成分镜与 11 月 7 日期 Frameboy 推镜头即出画面互补一个控关键帧一个控摄影机去 AI 味成为独立工序审校重心从能不能生成转向能不能直接交付与 11 月 6 日期 91 百分比单项约束只换来 41.3 百分比可行设计对上，Keyframes 仅 Magnific 试用套餐档位未说明榜单为盲测偏好非绝对质量人脸漂移跨帧一致性 GIF 帧数不总按提示词交付品牌资产进动图前须单独过合规'
].join(' · ');

const TAGS = [
  '"Anthropic"', '"感恩节前 IPO"', '"募资 800-1000 亿"', '"估值 1.25-1.75 万亿"', '"摩根大通 11-13"',
  '"Q3 营收 170 亿"', '"ARR 810 亿"', '"9000 亿算力承诺"', '"1500 亿现金"', '"账本定价"', '"逆势定档"',
  '"纳指 -6.4%"', '"DOJ-SITF"', '"超级智能工作组"', '"1.29 亿诈骗案"', '"民主党超级 AI 禁令"',
  '"桑德斯"', '"10^25 算力划线"', '"20 年刑期"', '"联邦 AI 部"', '"禁 RSI"', '"Alex Bores"',
  '"David Sacks"', '"谷歌 Gemini"', '"家长起诉"', '"13 岁女孩"', '"K-12 默认关闭"', '"搜索捆绑 AI"',
  '"Fairplay"', '"Lina Khan"', '"guided learning"', '"Claude 智能体记忆"', '"会话笔记"',
  '"显著性判断"', '"dreaming"', '"wiki 表示"', '"CL-Bench"', '"Harvey LAB"', '"乘数关系"',
  '"Cursor 实时语音"', '"Amp spaces"', '"OpenCode Browse"', '"OpenRouter Auto Code"', '"成本 -74%"',
  '"Grok Voice"', '"Git worktree"', '"中国移动"', '"MobileWork"', '"1.3 万技能"', '"完成率 96.8%"',
  '"Token 70-80%"', '"Menlo Ventures"', '"89% 开源支出"', '"Kimi 61%"', '"DeepSeek 15%"',
  '"GLM 11%"', '"连续 27 周"', '"ModelScope"', '"HF 下载 41%"', '"谷歌 170 亿"', '"Crusoe"',
  '"10GW"', '"内蒙 Galaxy 800MW"', '"成本 1/5"', '"60 万块 H200"', '"香港仓库"', '"进口许可"',
  '"服务器涨 3 倍"', '"Kling 4.0"', '"Keyframes 关键帧"', '"10 关键帧"', '"Magnific"',
  '"GPT-Image-2.6"', '"AA 双榜 1259"', '"TristanTube"', '"Meshy Relief"', '"去 AI 味"', '"ChatGPT Remix"'
];

let tagsStr = '';
for (let i = 0; i < TAGS.length; i += 6) {
  tagsStr += '      ' + TAGS.slice(i, i + 6).join(', ') + (i + 6 < TAGS.length ? ',' : '') + '\n';
}

const entry = '  {\n' +
  '    "date": "2026-11-08",\n' +
  '    "type": "daily",\n' +
  '    "title": "AIGC 每日速报 · 2026.11.08",\n' +
  '    "desc": "' + DESC + '",\n' +
  '    "tags": [\n' + tagsStr + '    ],\n' +
  '    "time": "09:45"\n' +
  '  },\n';

const re = /const DATA = \[\r?\n/;
const m = s.match(re);
if (!m) { console.log('DATA anchor not found'); process.exit(1); }
const idx = s.indexOf(m[0]) + m[0].length;
s = s.slice(0, idx) + entry + s.slice(idx);
fs.writeFileSync(P, s, 'utf8');

const after = (fs.readFileSync(P, 'utf8').match(/"date":\s*"\d{4}-\d{2}-\d{2}"/g) || []).length;
console.log('entries after (quoted-key):', after);
console.log('has 2026-11-08:', fs.readFileSync(P, 'utf8').indexOf('"2026-11-08"') !== -1);
console.log('top of DATA:', fs.readFileSync(P, 'utf8').split('const DATA = [')[1].trim().slice(0, 90));

// 单独校验今日条目块可 JSON.parse（desc/tags 无英文双引号/反引号/反斜杠）
const chk = fs.readFileSync(P, 'utf8').split('const DATA = [')[1].split('"time": "09:45"')[0] + '"time": "09:45"\n  }';
try {
  const obj = JSON.parse('{' + chk.replace(/^\s*\{/, '').trim() + '}');
  console.log('today entry JSON.parse OK; desc chars =', obj.desc.length, '; tags =', obj.tags.length);
} catch (e) { console.log('today entry JSON.parse WARN:', e.message); }
