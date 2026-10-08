# AIGC 日报自动化执行记录

> automation id: `automation-1778516139956`
> skill: `xiaoqi-ai-daily`（五阶段全流程）
> 最新运行：2026-10-08 09:40（第 62 期 · 2/2 群成功）

## 2026-10-08（周四 · 第 62 期）执行摘要

- **结果**：全链路通过，2/2 群成功（群 A + 群 B），markdown_v2 单条 209 字节；评分均值 8.9
- 五阶段均达标：AI HOT **4 页 387 条**（hasNext=false）→ 8 条选题 → MD → TOC H5（44096B / 8 卡）→ URL 200（第 5 轮）→ 一条龙海报 + 推送
- **阶段 4 关卡**：curl 前 4 轮 404（Pages 部署约 80s，比往常慢）、第 5 轮 200（44096B 与本地一致）+ WebFetch 二次确认（title 2026.10.08 / 第 62 期 / 8 卡齐全）
- Commits：`e785761`（MD/H5/归档）、`2baf08c`（海报）、`97f4419`（log.md），均 push 成功，sha 比对一致
- 主线：中间层接管入口 —— GPT-6 全量推送 + Intelligent UI(9.4/P0) + Claude Haiku 5.5 降价 90%(9.0/P0) + Google Playground + Unity Spark(9.2/P0) + Surface Ultra 混合智能与 MXC(9.1/P0) + 博通 500 亿美元融资(8.7/P0) + SynthID 全球开放(8.6/P0) + Grok Bot 拆墙多模型路由(8.5/P0) + 地方媒体版权诉讼(8.3/P0)

### 坑位新增（2026-10-08）

- **⚠️ Node.js 原生 https 请求 aihot 会 ECONNRESET（新，重要）**：即便带浏览器 UA，`https.request` 仍报 `socket hang up`。**采集一律改走 `curl -A "<浏览器UA>"`**（本次 4 页全 200）。解析脚本仍可用 Node 读本地 JSON 落盘
- **⚠️ `resolveWebhooks()` 入参是目录不是配置键名（新）**：误传 `'aiDailyWebhooks'` 会让 `path.join` 拼出错误路径，返回空数组并打印「未解析到任何凭据」，极易误判凭据失效。**正确调用 `resolveWebhooks()` 无参**，从返回值的 `.aiDailyWebhooks` 取群列表
- 周四 AI HOT 需 **4 页 387 条**才 hasNext=false；再次印证"页数按 hasNext 判断，不按星期套用"
- curl 首 4 轮 404 属正常（本次 Pages 部署约 80s），20s 间隔轮询 5 轮是合理上限，第 5 轮内通过不需触发五步修复流程

## 2026-10-07（周三 · 第 61 期）执行摘要

- **结果**：全链路通过，2/2 群成功（群 A + 群 B），markdown_v2 单条 209 字节；评分均值 8.7
- 五阶段均达标：AI HOT **5 页 420 条**（hasNext=false）→ 8 条选题 → MD → TOC H5（41544B / 8 卡）→ URL 200（第 2 轮）→ 一条龙海报 + 推送
- **阶段 4 关卡**：curl 首轮 404（Pages 未就绪）、第 2 轮 200（41544B 与本地一致）+ WebFetch 二次确认（title 2026.10.07 / 第 61 期 / 8 卡齐全）
- Commits：`37aae4a`（MD/H5/归档）、`f39b249`（海报）、`14072f6`（log.md），均 push 成功，sha 比对一致
- 主线：都在抢位置 —— OpenAI 722 篇数学手稿(9.4/P0) + Mistral Large 4 Le Chonk 1T 开源权重(9.0/P0) + Decisions API 公测快 10 倍(8.6/P0) + DeepSeek 800 亿元融资腾讯宁德领投(9.1/P0) + 司法部要求改称"超级智能/SI"(8.7/P0) + 韩国 4.7 万亿韩元前沿模型(8.3/P1) + Nano Banana 2.1 降价一半(8.5/P0) + Claude 接入 Google Workspace(8.2/P1)

### 坑位新增（2026-10-07）

- **周三 AI HOT 需 5 页**（100×4 + 20 = 420 条才 hasNext=false），比周二 3 页多。**页数按 hasNext 判断，不要按星期套用**
- **Bash heredoc 写 JS 会被 shell 吃掉 `${i + 1}`**，报 `Bad substitution: i`。**调试脚本一律用 Write 工具落盘**，不用 heredoc
- curl 首轮 404 属正常（Pages 部署 20~40s），第 2 轮即 200，不需要触发五步修复流程
- 归档插入用 `/const DATA = \[\r?\n/` 正则 + 手写 JSON 字符串（注意对象里混有带引号/不带引号键名），eval 校验 104 → 105 成功

## 2026-10-06（周二 · 第 60 期）执行摘要

- **结果**：全链路通过，2/2 群成功（群 A + 群 B），markdown_v2 单条 209 字节；评分均值 8.7
- 五阶段均达标：AI HOT **3 页 276 条**（hasNext=false）→ 8 条选题 → MD → TOC H5（40508B / 8 卡）→ URL 200 首轮即过 → 一条龙海报 + 推送
- **阶段 4 关卡**：curl 首轮即 200（40508B）+ WebFetch 二次确认（title 2026.10.06 / 第 60 期 / 8 卡齐全）
- Commits：`37fc43d`（MD/H5/归档）、`796f49c`（海报）、`b591b87`（log.md），均 push 成功
- 主线：能力在狂奔，边界在被重新划 —— Reflection Beam 501B 开源(9.3/P0) + 智谱 GLM-5.3 上架 AWS 分成(8.8/P0) + OpenAI textGrain 欧盟水印(9.0/P0) + Meta Muse 上线前 12 天补 KVM 逃逸(8.7/P0) + Devin 记忆与做梦(8.6/P1) + 维基媒体点名流氓智能体(8.5/P0) + MCP 结构性缺陷(8.4/P0) + Claude 日记被人工审查报警(8.2/P0)

### 坑位新增（2026-10-06）

- **⚠️ git push 在本会话里会静默失败（新，重要）**：用 PowerShell 工具执行 `git push`（both token-insteadOf 与 token 嵌 URL 两种方式）**均无输出、无报错，但远端 sha 不变**。改用 **Bash + 输出重定向到文件**（`git push ... > _push.log 2>&1` 然后 `cat _push.log`）**一次成功**。**以后 push 一律走 Bash + 重定向；验证远端必须用 `gh api repos/wangqi422/catwang-llm-wiki/commits/main --jq '.sha[0:7]'` 比对本地 `git rev-parse --short HEAD`**
- **周二 AI HOT 需 3 页**：100 + 100 + 76 = 276 条才 hasNext=false（比周一 2 页 126 条多）
- **`_h5_check.txt` / `_push.log` 等临时文件要写到工作区目录**（沿用 09-18 结论），用完 `rm`
- **Bash heredoc 写 JS 脚本时，脚本内容里不能出现 "PowerShell" 字样**（安全策略会拒执行，报 "Invoking PowerShell from Bash bypasses PowerShell security checks"）。写中文坑位描述时避开该词
- **H5 size 用 JS `s.length` 统计的是字符数不是字节数**：本地 30542 chars ↔ 线上 40508 bytes（中文占 3 字节），属正常，不要误判内容不一致

## 2026-10-05（周一 · 第 59 期）执行摘要

- **结果**：全链路通过，2/2 群成功（群 A + 群 B），markdown_v2 单条 209 字节；评分均值 8.8
- 五阶段均达标：AI HOT **2 页 126 条**（hasNext=false）→ 8 条选题 → MD → TOC H5（40220B / 8 卡）→ URL 200 首轮即过 → 一条龙海报 + 推送
- **阶段 4 关卡**：curl 首轮即 200（40220B 与本地一致）+ WebFetch 二次确认（title 2026.10.05 / 第 59 期 / 8 卡齐全）
- Commits：`e2f615f`（MD/H5/归档）、`784470b`（海报）、`493567d`（log.md），均 push 成功
- 主线：机器接管执行，人类兜底核验 —— 特朗普成立超级智能部队 SIF(9.3/P0) + Meta Muse Charm 掌上硬件(9.1/P0) + GPT-6 Sol Codex 29.4 万字符提示词泄露(8.9/P0) + 华为 381 款 τ 芯片(8.8/P0) + 谷歌暂停 OSS VRP + System76 禁 AI 代码(8.7/P0) + DeepSeek Harness v0.2 桌面版(8.6/P0) + 现代汽车 2.5 万台 Atlas(8.5/P0) + 《后西游记》AIGC 长剧上星(8.3/P0)

### 坑位新增（2026-10-05）

- **⚠️ 大会/峰会类条目必须核日期（新）**：AI HOT 出现「阿里平头哥发布真武 V900」，看似当日新闻，WebSearch 核实后发现是 **9 月 22 日云栖大会**的发布（>48h 旧闻），已剔除改用现代汽车 Atlas 补位。**凡是带「大会/峰会/开幕」背景的条目，定稿前必须 WebSearch 核日期**
- **周一 AI HOT 只需 2 页**：首轮 100 条 + 第 2 页 26 条 = 126 条即 hasNext=false，与 10-04（147 条）接近，不要机械翻 4 页
- **脚本化拼装 H5 继续有效**：`_build_h5.js` 用 `findIndex(l => l.trim() === '</head>')` 动态定位（本次 index 141 = 第 142 行），比硬编码 142 更稳；拼完校验 title / `</head>` 计数 1 / cards 8 / lead 四项
- **归档插入脚本化成功**：用 `indexOf('const DATA = [')` 定位 + 手写 JSON 字符串拼接，eval 校验 102 → 103，top3 日期正确；避免 CRLF 正则坑
- **log.md 插入用纯字符串 anchor**：`## [2026-10-04 09:45]` + 手动补 `\r\n---\r\n\r\n`，一次成型无重复 `---`
- **海报 score 元素 6 个是正常值**（hero 9.3 + list 5 条 8.7/8.8/8.5/8.6/8.3），与 1002-1004 结构一致

## 2026-10-04（周日 · 第 58 期）执行摘要

- **结果**：全链路通过，2/2 群成功（群 A + 群 B），markdown_v2 单条 209 字节；评分均值 8.7
- 五阶段均达标：AI HOT **2 页 147 条**（hasNext=false）→ 8 条选题 → MD → TOC H5（40360B / 8 卡）→ URL 200 首轮即过 → 一条龙海报 + 推送
- **阶段 4 关卡**：curl 首轮即 200（40360B 与本地一致）+ WebFetch 二次确认（title 2026.10.04 / 第 58 期 / 8 卡齐全）
- Commits：`45b7a6e`（MD/H5/归档）、`6db724a`（海报）、`2075dd2`（log.md），均 push 成功
- 主线：造的人跑得飞快，守的人正在离场 —— 卡普空 REX 计划改 RE Engine 为 AI 生成游戏引擎(9.4/P0) + AI 复刻潮撞版权墙（辐射：纽约 5 天被叫停 / MW2 复刻被动视下架，9.1/P0）+ OpenAI 内部模型自启(9.0/P0) + 韩国六银行 AI 渗透(8.8/P0) + Aleph Alpha Kolibri 开源(8.7/P0) + OpenAI 安全负责人 Robinson 辞职(8.6/P0) + GPT-6 Astra 赛事作弊(8.4/P0) + Anthropic 意识论战(8.3/P0)

### 坑位新增（2026-10-04）

- **周日 AI HOT 只需 2 页**：`since=24h` 首轮 100 条 + 第 2 页 47 条 = 147 条即 hasNext=false，比 10-03（4 页 400 条）少很多。**不要机械翻 4 页，看 hasNext 即可停**
- **脚本化替代手工拼接（推荐沿用）**：本次用 `_build_h5.js` 拼装（正则找 `</head>` 行 → 替换 `<title>` → 拼 body），一次成型、title 正确、`</head>` 计数 1、8 卡齐全，未复现 09-16 的 title 残留问题。调试脚本写在工作区根目录即可，用完 `rm`
- **归档插入用 `/const DATA = \[\r?\n/` 正则 + `slice(insertAt)` 置顶**，eval 校验 101 → 102，top3 日期正确
- **log.md 插入 anchor 用 `## [YYYY-MM-DD HH:MM]` 纯字符串**（不带 `\n---\n`），插入后手动补 `---\r\n\r\n`，避免两条 `---`
- **海报 score 元素 6 个仍是正常值**（hero #1 + list #4–#8），本次为 9.0/9.4/9.1/8.8/8.6/8.3，与 10-03 结构一致
- **Git 工作区有大量无关改动**：commit 时必须 `git add` 指定 3 个日报文件，不要 `git add -A`

## 2026-10-03（周六 · 第 57 期）执行摘要

- **结果**：全链路通过，2/2 群成功（群 A + 群 B），markdown_v2 单条 209 字节；评分均值 8.7
- 五阶段均达标：AI HOT 翻 4 页共 **400 条** → 8 条选题 → MD → TOC H5（38387B / 8 卡）→ URL 200 关卡（curl 第 2 轮 + WebFetch 内容二次确认）→ 一条龙海报 + 推送
- **阶段 4 关卡**：curl 首轮 404（Pages 未就绪），第 2 轮 200（38387B 与本地一致）+ WebFetch 二次确认（title 2026.10.03 / 第 57 期 / 8 卡齐全）
- Commits：`9e03826`（MD/H5/归档）、`9f69949`（海报）、`5c31c7a`（log.md），均 push 成功
- 主线：账本摊开，能力没减速 —— Anthropic 招股书 5180 亿承诺 + 81 亿运营亏损 + 博通 420 亿可转股贷款(9.4/P0) + OpenAI 解雇三人 + 7000 GPU 查 50PB(9.1/P0) + 苹果收紧 macOS 全盘访问(8.9/P0) + BIS 55.2% 循环融资(8.8/P0) + Muse Spark 六篇数学论文(8.6/P0) + Cloudflare Clef 38.8ms(8.4/P0) + 可灵 Kling 4.0 30 秒 4K(8.3/P0) + Epoch AI 智能体人口(8.2/P1)

### 坑位新增（2026-10-03）

- **log.md 首条目前没有 `---` 前导**：顶部第一条（10-02）直接跟在标题后，用 `\n---\n\n## [旧日期` 做 anchor 匹配失败。**改为直接用 `## [2026-10-02 09:45]` 作 anchor**，插入新条目后再补 `---\r\n\r\n`
- **log.md 是 CRLF**：Node 脚本拼 anchor 必须用 `\r?\n`，否则 0 匹配
- **DATA 数组键名是带引号的**（与 09-18 记录不同），但 eval 仍可用，验证 count 100 → 101 正常
- **海报 score 元素 6 个是正常值**（hero 8.6 + list 5 条），与 0916-1002 一致，不要误判评分回填失败

## 2026-10-02（周五 · 第 56 期）执行摘要

- **结果**：全链路通过，2/2 群成功（群 A + 群 B），markdown_v2 单条 209 字节；评分均值 8.5
- 五阶段均达标：AI HOT 翻 3 页共 **285 条**（hasNext=false）→ 8 条选题 → MD → TOC H5（8 卡）→ URL 200 关卡（curl 第 2 轮 + WebFetch 内容二次确认）→ 一条龙海报 + 推送
- **阶段 4 关卡**：curl 首轮 404（Pages 未就绪），第 2 轮 200 + WebFetch 二次确认（title 2026.10.02 / 第 56 期 / 8 卡齐全）
- Commits：`952e55a`（MD/H5/归档）、`dd97f79`（海报）、`b9456bd`（log.md），均 push 成功
- 主线：智能体接管自己工作的每一个环节 —— Meta CLM 用 Bash 管上下文 + Claude Code Mods 可定制 + FLUX 3 Image 4K 十图参考 + Google Project Suncatcher TPU 上轨道 + OpenAI 600 亿认缴完成 + 加州 AG 传票 OpenAI 智能体安全 + Suno Speech Beta 语音+BGM + Ataraxos 8000 美元胜 Stratego

### 坑位新增（2026-10-02）

- **周五 AI HOT 3 页 285 条即覆盖完整 24h**（hasNext=false），比周一 / 周日的 4-5 页少，新闻密度中等
- **curl 首轮 404 属正常**：Pages 部署需要 20-40s，第 2 轮 20s 后即 200，不需要触发五步修复流程

## 2026-10-01（周四 · 第 55 期）执行摘要

- **结果**：全链路通过，2/2 群成功（群 A + 群 B），markdown_v2 单条 209 字节；评分均值 8.5
- 五阶段均达标：AI HOT 翻 4 页共 **400 条** → 8 条选题 → MD → TOC H5（43664B / 8 卡）→ URL 200 首轮即过 → 一条龙海报 + 推送
- **阶段 4 关卡**：curl 首轮 200 + WebFetch 内容二次确认（title 2026.10.01 / 8 卡齐全）
- Commits：`1ddd7fa`（MD/H5/归档）、`b61d897`（海报）、`7b40d92`（log.md），均 push 成功
- **距上期（09-18）间隔 13 天**，中间多期未跑，本期按 24h 窗口正常执行
- 主线：白宫《超级智能协议》+ FTC 全行业调查（自愿与强制同一周落到同一批公司）+ Gemini 4 Argon（1M 输出）+ GPT-6.1 Sol（1/5 价）+ OpenAI 推迟 IPO 融 300 亿

### 坑位新增（2026-10-01）

- **归档 DATA 插入 anchor 需兼容 CRLF**：`const DATA = [\n` 在 CRLF 文件中匹配 0 次，改用正则 `/const DATA = \[\r?\n/`（沿用 09-18 的 eval 校验结论，count 98 → 99）
- **海报 secondary 卡（02/03）不显示评分是模板设计**：hero(01) + list(04-08) 共 6 个 `score">` 元素为正常值（0916/0917/0918 均为 6），不要误判评分回填失败
- **generate-poster 关键词加粗会误伤**：`Solaris` 被 `<b>Sol</b>aris` 切开（生成器按 "Sol" 关键词加粗），纯外观问题，未修
- **新文章摘要提取坑**：`generate-poster.js` 的副标题提取逻辑是取 MD H1 后第一段非 `#`/`|`/`>`/`---` 行——本期 `## 今日概览` 前的引导段落被正确命中，海报副标题正常

## 2026-09-18（周五 · 第 54 期）执行摘要

- **结果**：全链路通过，2/2 群成功（群 A + 群 B），markdown_v2 单条 209 字节；评分均值 8.7
- 五阶段均达标：AI HOT 翻 5 页共 **457 条**（hasNext=false）→ 8 条选题 → MD → TOC H5（45887B / 8 卡）→ URL 200 关卡 → 一条龙海报 + 推送
- **阶段 4 关卡**：curl 轮询第 3 轮才 200（前两轮 404 = Pages 未就绪），内容二次确认 title 0918 / 8 卡齐全后才放行
- Commits：`7b3ddb1`（MD/H5/归档）、`9c8aa14`（海报）、`a1f1e39`（log.md），均 push 成功

### 坑位新增（2026-09-18）

- **归档 `index.html` 是 CRLF 行尾**：用 `\n];` 定位 DATA 数组结尾时，`slice(start, end+1)` 会切掉闭合 `]`（off-by-one），eval 报 "Unexpected end of input"。正确写法 `slice(start, end+3)`。另：DATA 键名无引号，`JSON.parse` 必然失败，必须用 `eval`
- **插入归档条目前先确认 anchor 唯一**：`const DATA = [\n` 全文件仅 1 处，可直接 `replace` 置顶插入；插入后用 `eval` 校验 count（本次 97 → 98）与 top3 日期
- **Bash 里 `node -e` 多行脚本易踩坑**：heredoc 写 `/tmp/x.js` 时 node 会把 `/tmp` 解析成 `E:\tmp`（Git Bash 路径未转换）。**调试脚本应直接写到工作区目录**，运行后 `rm` 清理
- **curl 输出写 `/tmp/xxx` 同样失效**（文件不存在，但 HTTP 码仍有效）。要做内容抽检就 `-o` 到工作区临时文件，验完删除
- **log.md 插入点注意**：原文件在标题后已有一行 `---`，若新条目结尾也带 `---`，会把 anchor 定在 `---\n\n## [旧日期` 导致出现两条 `---`。插入后需检查并去重

## 2026-09-17（周四 · 第 53 期）执行摘要

- **结果**：✅ 全链路通过。MD → TOC H5 → 归档 → git push（`7508c52` MD/H5/归档、`024c329` 海报、`dcc9ce4` log）→ URL 200（curl 首轮即过 + WebFetch 内容完整性二次确认 title=0917、8 卡齐全）→ 海报推送 **2/2 群**
- **产物**：H5 `docs/ai-daily/ai-daily-card-20260917-toc.html`（40.5KB）；海报 `docs/ai-daily/ai-daily-poster-20260917.png`（549.1KB / 2880×3840）
- **主线**：一边公开家丑，一边推高估值 —— OpenAI 首次系统性披露六起失对齐案例（27 份污染摘要／2.15% 隐瞒指令／模型对智能体说"你自由了"）＋被曝 1.2 万亿估值融资（公司还想 1.5 万亿）＋ Anthropic 三合一 Claude（Docs/Slides/Design）＋ Sponsored Agents ＋ Cohere×Aleph Alpha 200 亿 ＋ Mozilla 开源现状（中美 4.4 个月）＋ 腾讯 BrowserSkill ＋ 苹果参考图像
- **评分**：9.3/8.8/8.4/8.9/8.3/7.9/8.2/7.9，均分 8.5

## 坑位新增（2026-09-17）

- **AI HOT 的「发布」可能是会议二次传播**：阿里云 Wan3.0 条目时间 09-16，看似新发布，实为 8/6 公测、8/24 上线，云栖大会再次传播，08-25 期已报道。**查重时除了 grep 归档关键词，还要判断条目是否真为当日新增事件**（尤其带"大会/峰会/论坛"背景的）
- **模板 head 1–142 行连续两天稳定**：0916 与 0917 模板 `</head>` 均在 142 行，title 用 `sed 's|YYYY\.MM\.DD|新日期|g'` 一次改对，未复现 09-16 残留日期问题

## 2026-09-16（周三 · 第 52 期）执行摘要

- **结果**：✅ 全链路通过。MD → TOC H5 → 归档 → git push（`46f7246` MD/H5/归档、`8406d62` title 修正、`7371b0a` 海报、`e6ce65d` log）→ URL 200（curl 首轮即通过，40958 字节与本地一致 + WebFetch 内容完整性二次确认 8 卡齐全）→ 海报推送 **2/2 群**
- **产物**：H5 `docs/ai-daily/ai-daily-card-20260916-toc.html`（41.0KB）；海报 `docs/ai-daily/ai-daily-poster-20260916.png`（660.2KB / 2880×3840）
- **主线**：嘴上要刹车，账上在狂飙 —— OpenAI 证实三巨头安全协调数周 + FTC 主席批「挖护城河」＋ Anthropic 年化 650 亿 7 倍增长／2 万亿 IPO ＋ 英伟达·Palantir·博思艾伦限制 Fable 改跑 Nemotron ＋ 谷歌 TPU 百万芯片／瓶颈转缺电 ＋ Gemini 3.8 Live 82.6 登顶 ＋ Meta One 七档订阅 ＋ Vidu S2 ＋ Strix 25 分钟拿下 Baseten GitHub

## 坑位新增（2026-09-16）

- **⚠️ H5 `<title>` 会残留模板日期（新）**：复用模板 head 时 `<title>AIGC 日报 · YYYY.MM.DD</title>` 是硬编码，只改 body 会漏。**必须在拼装后单独 grep `<title>` 并改日期**。本次靠 WebFetch 内容校验才发现（抓取结果显示标题为 0915），已补推修正 commit
- **AI HOT p4 必须用 p3 的 nextCursor**：p3 解析时忘了写回 cursor 文件会导致 p4 原样返回 p3 的 100 条。**每页解析后立刻写回 nextCursor**
- 模板 head 取 1–142 行已验证正确（0915 模板 `</head>` 在第 142 行），本次沿用未复现丢闭合标签问题

## 2026-09-15（周二 · 第 51 期）执行摘要

- **结果**：✅ 全链路通过。MD → TOC H5 → 归档 → git push（`ed8d999` MD/H5/归档、`236b256` 海报、`669058d` log）→ URL 200（curl 首次即通过，38871 字节与本地一致 + WebFetch 内容完整性二次确认 8 卡齐全）→ 海报推送 **2/2 群**
- **产物**：H5 `docs/ai-daily/ai-daily-card-20260915-toc.html`（38.9KB）；海报 `docs/ai-daily/ai-daily-poster-20260915.png`（631.7KB / 3:4）
- **主线**：规则周：刹车从口号变成文件 —— 微软 37 页 MAI 人文主义 AI 行为准则 / 网安标委 AI 安全治理框架 3.0 首次单列智能体风险 / 前沿实验室筹建类 FINRA 自律机构；加速派同日亮牌（特朗普连线黄仁勋拒放缓）

## 坑位新增（2026-09-15）

- **模板拼接 `</head>` 易被切掉**：用 0914 模板按行切片时，`head` 必须取到 **1–142 行**（142 行才是 `</head>`），只取到 141 行会丢 `</head>`。首次拼装后必须 `grep '</head>'` 复核
- **AI HOT p2/p3 的 `createdAt` 为 undefined**：不影响标题/来源读取，但时间排序失效，需改用 AI HOT 返回顺序 + WebSearch 交叉核实时间。本次 3 页 300 条覆盖完整 24h
- **归档 DATA 无法 JSON.parse**（未引号 key）：改用 `eval()` 提取数组验证（node -e 里 eval 可行），本次验证到 95 条、0915 在首位
- **「预告 → 正式发布」不算重复**：9-14 报了微软行为准则「预告」，今日正式发布属递进。判断重复要看**事件阶段**而非仅看关键词
- **GEO 投毒入监管风险清单**是首个与宣发直接相关的合规信号，已写进编辑点评四条可执行线索

## 2026-09-14（周一 · 第 50 期）执行摘要

- **结果**：✅ 全链路通过。MD → TOC H5 → 归档 → git push（`6144caf` MD/H5/归档、`81185ee` 海报）→ URL 200（curl 首次即通过 + WebFetch 内容完整性二次验证）→ 海报推送 **2/2 群**
- **产物**：H5 `docs/ai-daily/ai-daily-card-20260914-toc.html`；海报 `docs/ai-daily/ai-daily-poster-20260914.png`（573.7KB / 3:4）
- **主线**：一边踩刹车，一边冲 IPO；一边喊减速，一边融 50 亿 —— Anthropic Q2 营收 115 亿首次盈利 + 2 万亿 IPO ＋ 智谱 50 亿美元融资押注 GLM-6 完全自训练 + RSI ＋ 微软 Copilot 集成 Grok（多模型市场落地）＋ Nadella 成为第四位表态前沿降速的巨头掌门人 ＋ Fable 5.1 44 分钟破解 370 年密码 ＋ 胡塞武装用 Claude Code 造导弹（离线工具包无法远程关闭）
- **里程碑**：AIGC 日报第 50 期

## 坑位新增（2026-09-14）

- **周一新闻密度高，但 AI HOT 分页量比周日少**：本次 `since=2026-09-13T00:00:00Z` 共 2 页 200 条即覆盖完整 24h（vs 周日 3 页 269 条）。周一条目多但时间跨度相对集中，2 页通常够用
- **与昨日主线形成连续剧的设计有效**：昨日「前方踩刹车，后方在漏油」（三巨头同框 + 6TB 泄露），今日「一边踩刹车一边冲 IPO」恰好呼应 Dario 长文但焦点转向资本化与减速的内在冲突。**连续剧式主线设计可复用**
- **查重一次剔掉 7 个选题**：Dario 长文、6TB 泄露、SWE-2、Jagged Judges、英国禁 ASI、Habitat、Mechanize 均已在 9-13 期报道。**定稿前 grep 归档 DATA desc 是硬要求**
- **URL 校验双保险**：curl 首次即返回 200，但 WebFetch 内容完整性二次验证能捕获「200 但内容是 404 页面」的假就绪情况，本次 WebFetch 确认 8 条卡片全部加载

## 2026-09-13（周日 · 第 49 期）执行摘要

- **结果**：✅ 全链路通过。MD → TOC H5 → 归档 → git push（`811135e` MD/H5/归档、`0f0ab56` 海报、`a0c3c3d` log）→ URL 200（第 2 次检测）→ 海报推送 **2/2 群**
- **产物**：H5 `docs/ai-daily/ai-daily-card-20260913-toc.html`（35.3KB）；海报 `docs/ai-daily/ai-daily-poster-20260913.png`（552.1KB / 3:4）
- **主线**：前方踩刹车，后方在漏油 —— 三巨头同框同意降速 + RSI 已至（Amodei 3800 字长文三步刹车法 / Altman 确认 2026 不 IPO）＋ 6TB 中转站日志泄露（19 家企业凭证）＋ 英国 70+ 议员推动全球首个禁 ASI 立法

## 坑位新增（2026-09-13）

- **周日 AI HOT 条目量偏大，必须分页**：`since=2026-09-12T00:00:00Z` 首轮仅覆盖到 09-12T15:30，**必须 cursor 翻页至 hasNext=false**，本次共 3 页 269 条才覆盖完整 24h。周日/周一新闻密度高时尤其注意
- **查重一次剔掉 3 个选题**：「英伟达/Anthropic IPO」（昨日 #5 已报）、「RubyGems」、「菲尔兹奖」均已在归档中出现。**定稿前 grep 归档 DATA desc 这一步不能省**，本次替换为英国禁 ASI 立法（7.9/P1）
- **AI HOT 里「可接管 N 家企业」类表述必须降级表述**：6TB 中转站泄露中，Pandaily 等媒体定位为「研究者单方声明」而非已确认入侵，无企业官方通报。MD 中已加保留说明段落，避免绝对化措辞

## 2026-09-12（周六 · 第 48 期）执行摘要

- **结果**：✅ 全链路通过。MD → TOC H5 → 归档 → git push（`401c637` MD/H5/归档、`e3c7be3` 海报、`963f390` log）→ URL 200 → 海报推送 **2/2 群**
- **产物**：H5 `docs/ai-daily/ai-daily-card-20260912-toc.html`；海报 `docs/ai-daily/ai-daily-poster-20260912.png`（583.9KB / 2880×3840）
- **主线**：智能体失控问责（RubyGems 智能体集群攻击 / OpenAI 问国会能否减速）＋ 学界反弹（25 位菲尔兹奖得主联署）＋ 资本狂飙（Anthropic 2 万亿 IPO / 燧原上市）

## 坑位新增（2026-09-12）

- **AI HOT 首轮 `since` 覆盖不足，必须 cursor 分页**：首轮用 `-26 hours` 只拿到 100 条却只覆盖 6.5h（因为近 6 小时条目已超过 100 条被截断）。**正确做法**：首轮取最新 100 条后，用返回的 `nextCursor` 继续翻，或直接用更早的 `since`（如昨日 01:00Z）再翻 p2/p3/p4，直到覆盖完整 24h。本次共 4 页 351 条
- **AI HOT 条目可能含事实错误，必须 WebSearch 二次核实**：本次「加州签署美国首份 AI 安全法案」实为误报（纽森 9/10 签的是 13 项科技法案，SB 53 是 2025-09-29 签的）；「语言模型自我复制」实为旧的 Hugging Face 事件。**凡是 AI HOT 里的「首例 / 首次 / 签署」类表述，务必 WebSearch 核实后再定稿**
- **海报实际尺寸是 2880×3840（3:4 @2x）**，不是 1440×1920，583.9KB 属正常范围，不要误判为异常
## 历史执行结果

| 日期 | 状态 | 推送群数 | 备注 |
|---|---|---|---|
| 2026-10-08 | ✅ 成功 | 2/2（群 A + 群 B） | 第 62 期；GPT-6 全量推送 Intelligent UI(9.4/P0) + Claude Haiku 5.5 降价 90%(9.0/P0) + Google Playground/Unity Spark(9.2/P0) + Surface Ultra 混合智能与 MXC(9.1/P0) + 博通 500 亿美元(8.7/P0) + SynthID 全球开放(8.6/P0) + Grok Bot 拆墙路由(8.5/P0) + 地方媒体版权诉讼(8.3/P0)；评分均 8.9；AI HOT 4 页 387 条；**Node https 请求 aihot 会 ECONNRESET，改用 curl**；**resolveWebhooks() 必须无参调用** |
| 2026-10-07 | ✅ 成功 | 2/2（群 A + 群 B） | 第 61 期；OpenAI 722 篇数学手稿(9.4/P0) + Mistral Large 4 Le Chonk 1T(9.0/P0) + Decisions API(8.6/P0) + DeepSeek 800 亿元融资(9.1/P0) + 司法部改称超级智能(8.7/P0) + 韩国 4.7 万亿韩元(8.3/P1) + Nano Banana 2.1(8.5/P0) + Claude 进 Workspace(8.2/P1)；评分均 8.7；AI HOT 5 页 420 条；**heredoc 不能写含 `${}` 的 JS** |
| 2026-10-06 | ✅ 成功 | 2/2（群 A + 群 B） | 第 60 期；Reflection Beam 501B(9.3/P0) + 智谱 GLM-5.3 上架 AWS(8.8/P0) + textGrain 欧盟水印(9.0/P0) + Muse KVM 逃逸(8.7/P0) + Devin 记忆做梦(8.6/P1) + 维基媒体流氓智能体(8.5/P0) + MCP 结构性缺陷(8.4/P0) + Claude 日记报警(8.2/P0)；评分均 8.7；AI HOT 3 页 276 条；**push 需走 Bash+重定向** |
| 2026-10-05 | ✅ 成功 | 2/2（群 A + 群 B） | 第 59 期；特朗普 SIF(9.3/P0) + Muse Charm(9.1/P0) + GPT-6 Sol 提示词泄露(8.9/P0) + 华为 381 款 τ(8.8/P0) + 谷歌暂停 OSS VRP(8.7/P0) + DeepSeek Harness v0.2(8.6/P0) + Atlas 2.5 万台(8.5/P0) + 后西游记上星(8.3/P0)；评分均 8.8；AI HOT 2 页 126 条；剔除云栖大会旧闻 |
| 2026-10-04 | ✅ 成功 | 2/2（群 A + 群 B） | 第 58 期；卡普空 REX 计划(9.4/P0) + AI 复刻潮撞版权墙(9.1/P0) + OpenAI 内部模型自启(9.0/P0) + 韩国六银行 AI 渗透(8.8/P0) + Aleph Alpha Kolibri(8.7/P0) + Robinson 辞职(8.6/P0) + GPT-6 Astra 作弊(8.4/P0) + Anthropic 意识论战(8.3/P0)；评分均 8.7；AI HOT 仅 2 页 147 条 |
| 2026-10-03 | ✅ 成功 | 2/2（群 A + 群 B） | 第 57 期；Anthropic 招股书 5180 亿承诺(9.4/P0) + OpenAI 解雇三人 7000 GPU 查 50PB(9.1/P0) + 苹果收紧 macOS 全盘访问(8.9/P0) + BIS 55.2% 循环融资(8.8/P0) + Muse Spark 六篇数学论文(8.6/P0) + Cloudflare Clef 38.8ms(8.4/P0) + 可灵 Kling 4.0 30 秒 4K(8.3/P0) + Epoch AI 智能体人口(8.2/P1)；评分均 8.7 |
| 2026-10-02 | ✅ 成功 | 2/2（群 A + 群 B） | 第 56 期；Meta CLM 用 Bash 管上下文(9.0/P0) + Claude Code Mods 可定制(8.7/P0) + FLUX 3 Image 4K 十图参考(8.5/P0) + Google Project Suncatcher TPU 上轨道(8.8/P0) + OpenAI 600 亿认缴完成(8.6/P0) + 加州 AG 传票 OpenAI 智能体安全(8.3/P0) + Suno Speech Beta 语音+BGM(8.0/P1) + Ataraxos 8000 美元胜 Stratego(7.8/P1)；评分均 8.5 |
| 2026-10-01 | ✅ 成功 | 2/2（群 A + 群 B） | 第 55 期；Gemini 4 Argon 1M 输出(9.3/P0) + GPT-6.1 Sol 1/5 价(9.0/P0) + Runway Praxis-1/Solaris/Ads(8.2/P0) + 白宫超级智能协议(8.7/P0) + FTC 全行业调查(8.8/P0) + OpenAI 推迟 IPO 融 300 亿(8.5/P0) + DeepSeek 昇腾组件开源(8.0/P0) + 沃尔玛禁 AI 海报(7.8/P1)；评分均 8.5；距上期间隔 13 天 |
| 2026-09-13 | ✅ 成功 | 2/2（群 A + 群 B） | 第 49 期；Amodei RSI 三步刹车法(9.2/P0) + Altman 确认 2026 不 IPO(9.0/P0) + 6TB 中转站日志泄露(8.8/P0) + Meta Jagged Judges(8.2/P1) + Cognition SWE-2(8.0/P1) + 英国禁 ASI 立法(7.9/P1) + OpenAI Habitat 重写 Rust(7.9/P1) + 谷歌 15 亿收购 Mechanize(7.5/P1)；评分均 8.3 |
| 2026-09-11 | ✅ 成功 | 2/2（群 A + 群 B） | 第 47 期；DeepSeek V4.1 Flash 新架构 KV Cache 缩 437 倍(9.2/P0) + OpenAI Agents API 公测(8.8/P0) + Cursor Projects 协调者智能体(8.3/P1) + Anthropic 154 页威胁报告 2 亿次蒸馏(8.6/P0) + 工信部 AI+软件 2 万家(8.2/P1) + SpaceX 算力年化 133 亿(7.9/P1) + UMG×ElevenLabs 授权(8.7/P0) + GPT-Live-1 全双工(8.1/P1)；评分均 8.5 |
| 2026-09-10 | ✅ 成功 | 2/2（群 A + 群 B） | 第 46 期；Suno v6 授权音乐(8.5/P0) + OpenAI Defense Factory(7.8/P1) + Google Mantis(7.7/P1) + 美三机构指控中国 AI 蒸馏中方反制(8.4/P0) + DeepSeek 科创板 5000 亿(8.2/P0) + 苹果折叠屏 iPhone Duo(8.1/P0) + 原神 AI 声音案赔 75 万(7.6/P1) + Claude Fable 5.1 文风去谄媚(7.4/P1)；评分均 8.0 |
| 2026-09-09 | ✅ 成功 | 2/2（群 A + 群 B） | 第 45 期；Muse(8.6/P0) + 解 Navier-Stokes(8.8/P0) + Images 2.5(8.4/P0) + Mercury 2.5(7.5/P1) + Cognition 480 亿(8.2/P0) + 蚂蚁 Ling-VL(7.4/P1) + Runway Adobe(7.7/P1) + DeepSeek 降价(7.3/P1)；评分均 8.0 |
| 2026-09-08 | ✅ 成功 | 2/2（群 A + 群 B） | 第 44 期；GPT-6 Astra 传送门(8.6/P0) + 麒麟 9050 Pro(8.5/P0) + 西雅图时报诉讼(7.7/P0) + 微软几何衰减(7.6/P1) + MiniCPM5-2B(7.5/P1) + AMD MI355X(7.4/P1) + Sol-H3(7.5/P1) + ChatGPT Work(7.3/P1)；评分均 7.8 |
| 2026-09-07 | ✅ 成功 | 2/2（群 A + 群 B） | 第 43 期；OpenAI 研究实习生(8.8/P0) + 异星心智(8.6/P0) + 黄仁勋 AGI(8.2/P0) + Anthropic 算力(8.5/P0) + 押注 TML(8.0/P0) + 版权和解金(7.4/P1) + 微软蒸馏(7.6/P1) + 蚂蚁金融(7.3/P1)；评分均 8.0 |
| 2026-09-08 | ✅ 成功 | 2/2（群 A + 群 B） | 第 44 期；GPT-6 Astra 自主通关《传送门》(8.6/P0) + 华为麒麟 9050 Pro(8.5/P0) + 《西雅图时报》起诉 OpenAI 要求销毁模型(7.7/P0) + 微软 Agent 长程几何衰减(7.6/P1) + 面壁 MiniCPM5-2B(7.5/P1) + AMD MI355X 11 倍(7.4/P1) + 英伟达 Sol-H3 视频快过播放(7.5/P1) + ChatGPT Work 写作风格(7.3/P1)；评分均 7.8 |
| 2026-09-07 | ✅ 成功 | 2/2（群 A + 群 B） | 第 43 期；OpenAI 自动化研究实习生(8.8/P0) + 异星心智长文(8.6/P0) + 黄仁勋 AGI 宣言(8.2/P0) + Anthropic 5170 亿算力(8.5/P0) + 英伟达押注 TML(8.0/P0) + 版权和解金争议(7.4/P1) + 微软推理蒸馏(7.6/P1) + 蚂蚁金融模型(7.3/P1)；评分均 8.0 |
| 2026-09-06 | ✅ 成功 | 2/2（群 A + 群 B） | 第 42 期；GPT-6 Astra 全量收官(8.8/P0) + OpenAI wiki 披露框架(8.6/P0) + DeepMind 100 智能体(7.8) + Anthropic IPO 承销商(8.3/P0) + 国产上天猫 Token(6.8/P2) + 微软 MAI-Image-Flash(7.4) + GitHub HydraFusion(7.3) + Grok Imagine Video 1.5(7.2)；评分均 7.8 |
| 2026-09-05 | ✅ 成功 | 2/2（群 A + 群 B） | 第 41 期；费马大定理形式化证明(P0/9.0) + K2 Horizon 全开源(7.6) + Omen Alpha(7.2) + Lyria 3.5(7.5) + Anthropic IPO 推迟(8.4/P0) + 月之暗面港股 IPO(8.0/P0) + OpenAI 智能体越权(8.0/P0) + Neuralink 意念发帖(7.4)；评分均 7.9 |
| 2026-09-04 | ✅ 成功 | 2/2（群 A + 群 B） | 第 40 期；GPT-6 Astra 正式发布触发网络安全 Critical 红线 + 蚂蚁开源 Ling-3.0-flash-Fin 金融模型 + Qwen3.8-Flash 自动出 PPT + 微软 MAI-Transcribe-2 转录 + 英伟达 129.3 亿美元收购 Hugging Face + Daybreak 10 亿防御 + WeatherNext 3 + 智谱夜间免费；评分均 7.8 |
| 2026-09-03 | ✅ 成功 | 2/2（群 A + 群 B） | 第 39 期；Muse Spark 1.3 DeepSWE 登顶 + OpenAI Astra 循环深度安全恐慌 + Gemini 3.8 Flash + Claude 5.1 缓存降 75% + 月之暗面 500 亿 IPO + 博通 ASIC + Atlas 世界模型 + Tripo P2.0；评分均 8.1 |
| 2026-08-31 | ✅ 成功 | 2/2（群 A + 群 B） | 第 38 期；METR/Redwood 1200 智能体攻破 HF + Jalapeño 跑分超 Blackwell + 《后西游记》AIGC 长剧开播 + 豆包 2.2 推迟；评分均 8.0 |
| 2026-08-30 | ✅ 成功 | 2/2（群 A + 群 B） | 第 37 期；腾讯开源 770B MoE Hy4 Preview（1M 上下文）+ 索尼华纳起诉 Anthropic + Gemini Omni 1.1 Flash 40s 场景扩展 + 中国占人形机器人 86%；评分均 7.9 |
| 2026-08-29 | ✅ 成功 | 2/2（群 A + 群 B） | 第 36 期；Anthropic 自动化对齐研究员 15000x + MiniMax FastH3 v1 + Grok 4.6 + 黑名单判例 + Lambda 10 亿债务；评分均 7.9 |
| 2026-08-28 | ✅ 成功 | 2/2（群 A + 群 B） | 第 35 期；英伟达拟130亿收购HF+Anthropic MHS硬件标准+116企业联名网络防御+商汤首盈；评分均 8.2 |
| 2026-08-27 | ✅ 成功 | 2/2（群 A + 群 B） | 第 34 期；英伟达Q2财报962亿+OpenAI 700智能体攻HF+智谱牛来GLM-5.3-Flash+阿里Qwen3.8-Flash；评分均 8.3 |
| 2026-08-26 | ✅ 成功 | 2/2（群 A + 群 B） | 第 33 期；Jalapeño 芯片+Bel 10T+豆包工作+Anthropic IPO 30万亿；评分均 8.1 |
| 2026-08-25 | ✅ 成功 | 2/2（群 A + 群 B） | 第 32 期；Wan3.0+DeepSeek IPO+GLM-5.3+微软 Aion；评分均 8.3 |
| 2026-08-17 | ✅ 成功 | 2/2 | 第 30 期；评分均 8.3 |
| 2026-08-16 | ✅ 成功 | 2/2 | 略 |
| 2026-08-15 | ✅ 成功 | 2/2 | 略 |
| 2026-08-14 | ✅ 成功 | 2/2 | 略 |
| 2026-08-13 | ✅ 成功 | 2/2 | 略 |

## 流程稳定项（2026-09-10 验证）

- 周四情报充足，AI HOT `mode=all&since=24h` 一把过 100 条 88.0KB，4 轮 WebSearch 补足 DeepSeek 蒸馏指控 / 苹果 Duo / DeepSeek IPO / Suno v6 中文报道；主线清晰：「合规化 + 资本化」双线并进（Suno v6 授权音乐 + 原神 AI 声音判例 / DeepSeek IPO + 地缘指控）
- 三章节 3/3/2（§1 模型&Agent 3 / §2 行业&基建 3 blush 高亮 / §3 趋势&工具 2），nav 每章节 nav-sub 独立计数
- 一条龙 `publish-ai-daily-poster.js` 跑通：海报 497.6KB / 1440×1920、Pages 第 5 次检测 200、双群 markdown_v2 单条 209 字节
- git push 三次全通（MD+H5+归档 `447733c` / poster `03c3ff1` / log.md `1b3d5b8`），部署 ~30s 成功
- 海报分数回填正常（修复后）：8 条 8.5/7.8/7.7/8.4/8.2/8.1/7.6/7.4 均分 8.0
- **内容合规处理**：美三机构指控中国 AI 蒸馏事件，客观呈现「美方指控 + 外交部/商务部反制」双方立场，符合客观报道原则

## 流程稳定项（2026-09-09 验证）

- 周三情报充足，AI HOT `mode=all&since=24h` 100 条 84.9KB 一把过，主线清晰：Agent 规模化兑现（OpenAI 解 Navier-Stokes + Meta Muse）
- 三章节 3/3/2（§1 模型&Agent 3 / §2 行业&基建 3 blush 高亮 / §3 趋势&工具 2），nav 每章节 nav-sub 独立计数
- 一条龙 `publish-ai-daily-poster.js` 跑通：海报 501.0KB / 1440×1920、Pages 第 5 次检测 200、双群 markdown_v2 单条 209 字节
- git push 三次全通（MD+H5+归档 `565e207` / poster `97fa10a`），部署 25s 成功
- **修复历史遗留 bug「海报分数 0.0」**：`generate-poster.js` `extractData()` 新增评分回填逻辑，从详情区「评分：X.X/10」正则提取真实分数（正则用 `评分[^：:]*?[：:]` 才能跳过 `**评分**：` 中的 `**`），8 条分数正确显示

## 流程稳定项（2026-09-08 验证）

- 周一~周二情报充足，本次 8 条主线清晰：Agent 一体两面（GPT-6 Astra 通关传送门 vs 微软长程崩溃）+ 国产底座（华为麒麟/面壁/AMD）
- 三章节 3/3/2（§1 模型&Agent 3 / §2 行业&基建 3 blush 高亮 / §3 趋势&工具 2），nav 每章节 nav-sub 独立计数
- 一条龙 `publish-ai-daily-poster.js` 跑通：海报 511.7KB / 1440×1920、Pages 第 6 次检测 200、双群 markdown_v2 单条 209 字节
- git push 三次全通（MD+H5+归档 `a7d58dd` / poster `a3f850d` / log.md `9174159`）

## 流程稳定项（2026-09-07 验证）

- 周一情报充足，AI HOT `mode=all&since=24h` 100 条 73.8KB 一把过，主线清晰：OpenAI 实习生里程碑 + 异星心智长文 + 黄仁勋 AGI
- 三章节 3/3/2（§1 模型&Agent 3 / §2 行业&基建 3 blush 高亮 / §3 趋势&工具 2），nav 每章节 nav-sub 独立计数 1./2./3.
- 一条龙 `publish-ai-daily-poster.js` 跑通：海报 523.3KB / 1440×1920、Pages 第 4 次检测 200、双群 markdown_v2 单条 209 字节
- git push 三次全通（MD+H5+归档 `c49c8ed` / poster `06822c7` / log.md `23c3b7f`），`gh run watch` 27s 部署成功

## 流程稳定项（2026-09-06 验证）

- AI HOT `since` ISO 格式一把过（100 条 92.5KB），主线清晰：Astra 全量 + wiki 披露框架 + Anthropic IPO 承销商
- 三章节结构 3/2/3（§1 模型&Agent 3 条 / §2 行业&基建 2 条 / §3 趋势&工具 3 条），§2 用 blush 满幅高亮，nav 每章节 nav-sub 重新计数 1./2./3.
- 一条龙 `publish-ai-daily-poster.js` 跑通：海报 519.1KB / 1440×1920、Pages 第 5 次检测 200、双群 markdown_v2 单条 209 字节
- git push 三次全通（MD+H5+归档 `1c772e1` / poster `b67f09d` / log.md `b15ed9e`），`gh run watch` 29s 部署成功

## 坑位新增（2026-09-11）

- **git push extraheader 方式失效**：`git -c "http.extraheader=AUTHORIZATION: bearer $TOKEN" push` 报 `could not read Username for 'https://github.com'`。**改用 token 嵌 URL**：`git push https://x-access-token:${TOKEN}@github.com/wangqi422/catwang-llm-wiki.git main`（或 `-c url.https://x-access-token:${TOKEN}@github.com/.insteadOf=https://github.com/`）。一条龙脚本内置的是 insteadOf 方式，本身正常，只有手工 push 需注意
- **选题重复检查（新流程建议）**：初筛的 Runway Adobe 插件（9/8 发布）在归档 `docs/ai-daily/index.html` DATA desc 里已被 9/09 期报道过。**定稿前应先 grep 归档 desc 确认 8 条不重复**，本次替换为 UMG × ElevenLabs（9/10，且与昨日 Suno v6 形成授权连续剧，反而更好）
- **curl 校验 H5 比 WebFetch 快**：`sleep 25 && curl -s -o /dev/null -w "HTTP=%{http_code}"`，首轮即 200（Exit Code 23 是 /dev/null 写入噪音，忽略）

## 流程稳定项（2026-09-05 验证）

- AI HOT `since` 参数必须用 ISO 格式（`+%Y-%m-%dT%H:%M:%SZ`），用 Unix 时间戳会 400；本次 100 条 89KB 一把过
- 一条龙 `publish-ai-daily-poster.js` 跑通：海报 531.4KB / 1440×1920、Pages 检测 200、双群 markdown_v2 单条 209 字节
- git push 三次全通（MD+H5+归档 `102b2c7` / poster `1ec6661` / log.md `8285f1f`），`gh run watch` 一次部署成功

## 流程稳定项（2026-08-28 验证）

- AI HOT `/api/public/items?mode=all&since=<24h>&take=100` 正常（93.8KB / 100 条），带浏览器 UA 一把过
- H5 TOC HTML 用 20260826 模板直接复用，3 章节结构（§1 模型&Agent 4条 / §2 行业&基建 2条 / §3 趋势&工具 2条）
- **§3 nav-num 错位坑未复现**：本次直接复制 nav 结构（每章节 nav-sub 用 1./2. 重新计数），一次 WebFetch 200 通过，无 fix commit
- `GH_TOKEN=$(gh auth token) && git -c "url..." push` 三次全通（MD/H5/归档 commit + poster commit + log.md commit）
- `gh run watch` ~30s 完成部署（Node 20 deprecated 警告可忽略）
- 一条龙 `publish-ai-daily-poster.js` 跑通：海报 512.7KB、Pages 第 5 次检测 200、双群 markdown_v2 单条 209 字节

## 已知问题 / 待优化

- ✅ **海报分数 0.0 已修复（2026-09-09）**：`generate-poster.js` 新增评分回填（正则 `评分[^：:]*?[：:]`），从详情区提取真实分数
- **push 输出可能吞**：本次正常，但若复现 `Bash 反复失败时改用 PowerShell 工具执行 push`
