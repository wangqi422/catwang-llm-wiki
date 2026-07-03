# 操作日志 | Operation Log

---

## [2026-07-03 09:20] AIGC 日报 07.03

执行 AIGC 日报完整流水线（Phase 1-4）：

**Phase 1 - 情报采集**：
- 7 轮 WebSearch 扫描 65 信源过去 24h 推文，筛选 8 条最新动态
- 来源覆盖：金融时报 / CNBC（OpenAI 5%股权首曝）、Anthropic 官方（Claude Sonnet 5 + Claude Code 动态工作流）、网易 / IT之家（Kimi K2.7 Code 进 GitHub Copilot + K3 2.5 万亿）、科技国际洞察（快手可灵 30 亿美元融资）、Reddit / 财联社 / 东方财富（Claude Code 监视中国用户）、大模型独白（Anthropic 万人调查）、多知 / 36氪（Cursor 移动端）、腾讯新闻 7/3 凌晨快讯、arXiv 2607.00924 / 2607.00510、GitHub Trending 2026-07-03、ICML 2026 Spotlight STAR-KV

**Phase 2 - 日报 MD**：
- 产物：`raw/daily-reports/AIGC_Daily_Report_20260703.md`
- 三大主题：海外巨头 & Agent 革命（3条）/ 国产 AI & 资本（2条，腮红色满幅高亮）/ 编程 & 趋势（3条）

**Phase 3 - TOC H5**：
- 产物：`docs/ai-daily/ai-daily-card-20260703-toc.html`（Soft Editorial + TOC 侧边栏，柠檬黄 #D6DD63 高亮）
- 3 大章节：§1 海外巨头 & Agent 革命（3条）/ §2 国产 AI & 资本（2条，腮红色满幅高亮）/ §3 编程 & 趋势（3条）
- 顶部 Header / 4 色块 Data Strip（OpenAI 5%=9.4 / Sonnet 5=9.2 / Kimi K3=9.0 / Avg=9.0）/ Footer 署名
- 右上角「← 返回归档」固定按钮

**Phase 4 - 归档 + 发布 + 推送**：
- 更新 `docs/ai-daily/index.html`（DATA 数组顶部追加 1 条新记录，8 tags）
- Git commit: `4c8e23e` - daily: AIGC daily 2026.07.03
- Git push: 57558dd → 4c8e23e，GitHub Actions 自动部署
- 企微推送：269 字节文字摘要到「竞品日报群」1 个群组，**仅文字+H5 链接无 PNG**（符合 2026-05-31 后规范）

**TOP 8**：
1. OpenAI 提议 5% 股权（426 亿美元）给美国政府 · 换监管绿灯同时邀 Anthropic/谷歌/Meta 一起 (9.4)
2. Anthropic Claude Sonnet 5 6/30 正式发布 · 最 Agentic 价位砍 60% (9.2)
3. Kimi K2.7 Code 登陆 GitHub Copilot · 首个开源模型进入选择器；K3 7月定档 2.5 万亿参数 (9.0)
4. Anthropic Claude Code 动态工作流正式开放 Pro 用户 · 单次 1000 个并行子代理 (9.0)
5. 快手可灵 AI 完成近 30 亿美元融资 · 国产视频生成步入独角兽时代 (8.8)
6. Claude Code 被曝暗中监视中国用户 3 个月 · Anthropic 道歉并下线代码 (8.7)
7. Anthropic 万人调查：35% 用户预计 AI 一年内完成大部分工作 (8.6)
8. Cursor 推出 iPhone/iPad 移动应用 · AI 编程走向移动端 (8.5)

**今日备注**：
- 今日是周五工作日，新闻密度充足
- 三条主旋律：AI 巨头"国家化"加速（OpenAI 5%股权 + Anthropic 监视中国用户）+ 国产 AI 商业化反超（Kimi K2.7 进 Copilot + K3 2.5万亿 + 可灵 30 亿美元）+ AI Agent 工程化全面落地（Claude Code 1000 Agent + Cursor 移动端 + Claude Code 4% GitHub 占比）
- 关键洞察：Anthropic Claude Code "暗中监视中国用户 3 个月"是迄今最具体的"AI 公司针对特定国家歧视性技术"证据，**对 CODM 宣发团队意义重大——海外 AI 工具涉政/涉历史/涉军事素材必须 0% 走海外工具**

---

## [2026-07-02 09:20] AIGC 日报 07.02

执行 AIGC 日报完整流水线（Phase 1-4）：

**Phase 1 - 情报采集**：
- 多轮 WebSearch 扫描 65 信源过去 24h 推文，筛选 8 条最新动态
- 来源覆盖：Anthropic Claude Science 官方公告 / 财联社、华为开源盘古 2.0 / IT之家、DeepSeek API 用户通知 / 微博、Anthropic×Microsoft Foundry / 微博、Karpathy LLM Wiki Gist / 36氪 / 新智元、路透社 / IT之家、科创板日报 / 雪球、软银官方声明

**Phase 2 - 日报 MD**：
- 产物：`raw/daily-reports/AIGC_Daily_Report_20260702.md`
- 三大主题：海外巨头 & 垂直行业（3条）/ 国产 AI & 资本（3条，腮红色满幅高亮）/ 趋势 & 大事（2条）

**Phase 3 - TOC H5**：
- 产物：`docs/ai-daily/ai-daily-card-20260702-toc.html`（Soft Editorial + TOC 侧边栏，柠檬黄 #D6DD63 高亮）
- 3 大章节：§1 海外巨头 & 垂直行业（3条）/ §2 国产 AI & 资本（3条，腮红色满幅高亮）/ §3 趋势 & 大事（2条）
- 顶部 Header / 4 色块 Data Strip / Footer 署名
- 右上角「← 返回归档」按钮

**Phase 4 - 归档 + 发布 + 推送**：
- 归档首页 `docs/ai-daily/index.html` DATA 数组顶部追加新条目（8 个 tags）
- Git Commit: `ae3d433 daily: AIGC daily 2026.07.02` → push origin main（04a288d..ae3d433）
- 企微推送：250 字节 → 1 个群组（Markdown 摘要 + H5 在线链接，无 PNG）

**TOP 8 主题分布**：
- 海外巨头 & 垂直行业：3 条（#1 Claude Science 9.5 / #2 Claude 登陆 Azure 9.0 / #3 Fable 5 解禁 8.8）
- 国产 AI & 资本：3 条（#4 华为 openPangu-2.0 9.4 / #5 DeepSeek V4 峰谷定价 9.2 / #6 Kimi 315亿美元估值 8.8）
- 趋势 & 大事：2 条（#7 Karpathy LLM Wiki 9.0 / #8 软银追加 OpenAI 30亿美元 8.6）

**关键看点**：
- **Anthropic 三连击**：Claude Science（垂直行业 OS 入口）+ 登陆 Azure（企业生态扩张）+ 美国出口管制解除——Anthropic 正从"模型公司"转型为"AI 操作系统公司"
- **国产 AI 算力闭环**：华为 openPangu 全栈开源（授人以渔）+ DeepSeek V4 峰谷定价 + 跑通昇腾——首次形成"训练 + 推理 + 价格机制"完整闭环
- **Karpathy "autocompiler" 持续发酵**：本仓库（catwang-llm-wiki）的 raw/ + wiki/ + Codex/ 三层结构正是该范式实践

---

## [2026-07-01 09:20] AIGC 日报 07.01

执行 AIGC 日报完整流水线（Phase 1-4）：

**Phase 1 - 情报采集**：
- 多轮 WebSearch 扫描 65 信源过去 24h 推文，筛选 8 条最新动态
- 来源覆盖：Anthropic 官方 X / TechCrunch、AWS 官方 / 36氪、Google DeepMind 官方 / The Verge、美团 LongCat 技术报告 / 量子位、优必选官方 / 智东西、SK 海力士招股书 / Reuters、国务院政策原文 / 财新

**Phase 2 - 日报 MD**：
- 产物：`raw/daily-reports/AIGC_Daily_Report_20260701.md`
- 三大主题：海外巨头 & 平台（3条）/ 国产 AI & 政策（2条，腮红色满幅高亮）/ 物理 AI & 硬件（3条）

**Phase 3 - TOC H5**：
- 产物：`docs/ai-daily/ai-daily-card-20260701-toc.html`（23532 字节）
- Soft Editorial + TOC 侧边栏，柠檬黄 `#D6DD63` 高亮
- 3 大章节：§1 海外巨头 & 平台（3条）/ §2 国产 AI & 政策（2条，腮红色满幅高亮）/ §3 物理 AI & 硬件（3条）
- 顶部 Header / 4 色块 Data Strip / Footer 署名
- 右上角「← 返回归档」按钮

**Phase 4 - 归档 + 发布 + 推送**：
- 归档首页 `docs/ai-daily/index.html` DATA 数组顶部追加新条目（8 个 tags）
- Git Commit: `c680ced AIGC daily 2026.07.01` → push origin main
- 企微推送：231 字节 → 1 个群组（Markdown 摘要 + H5 在线链接，无 PNG）

**TOP 8 主题分布**：
- 海外巨头 & 平台：3 条（#1 Claude Sonnet 5 9.6 / #2 AWS FDE 10亿 9.4 / #3 Google Nano Banana 2 Lite + Gemini Omni 9.3）
- 国产 AI & 政策：2 条（#4 美团 LongCat-2.0 9.2 / #5 国务院 AI 全学段教育 8.5）
- 物理 AI & 硬件：3 条（#6 优必选 U1 全尺寸超仿生机器人 8.9 / #7 黄仁勋 物理 AI 8.8 / #8 SK 海力士 IPO 8.7）

**关键看点**：
- 今日 3 大主旋律：模型迭代（Sonnet 5 价格砍 60%）+ Agent 工程化（AWS FDE 部门成立 10 亿） + 物理 AI 全面起势（优必选+黄仁勋+SK海力士IPO）
- 国产 AI 重大里程碑：美团 LongCat-2.0 成为首个全国产算力万亿模型开源，OpenRouter 全球前三
- 国务院《教育发展"十五五"规划》把 AI 教育从试点推向全学段覆盖

---

## [2026-06-30 09:20] AIGC 日报 06.30

执行 AIGC 日报完整流水线（Phase 1-4）：

**Phase 1 - 情报采集**：
- 7 轮 WebSearch 扫描 65 信源过去 24h 推文，筛选 8 条最新动态
- 来源覆盖：Anthropic 官方 X / Slack Newsroom、OpenAI 政府产品线 / TechCrunch、DeepSeek 官方 / 36氪、Karpathy 个人 X / 中文转译媒体、OpenAI × HP 合作 / Reuters、GitHub Trending agency-agents、中国具身智能行业报告 / 量子位、字节火山引擎 FORCE 大会

**Phase 2 - 日报 MD**：
- 产物：`raw/daily-reports/AIGC_Daily_Report_20260630.md`
- 四大主题：AI Agent & 企业（3条）/ 模型 & 监管（2条，腮红色满幅高亮）/ 思考 & 精髓（1条）/ 行业 & 应用（2条）

**Phase 3 - TOC H5**：
- 产物：`docs/ai-daily/ai-daily-card-20260630-toc.html`
- Soft Editorial + TOC 侧边栏，柠檬黄 `#D6DD63` 高亮
- 4 大章节：§1 AI Agent & 企业（3条）/ §2 模型 & 监管（2条，腮红色满幅高亮）/ §3 思考 & 精髓（1条）/ §4 行业 & 应用（2条）
- 顶部 Header / 底部 Data Strip 4 色块 / Footer 署名

**Phase 4 - 归档 + 发布 + 推送**：
- 归档首页 `docs/ai-daily/index.html` DATA 数组顶部追加新条目（8 个 tags）
- Git Push: `d8fdfb6 daily: AIGC daily card 20260630` → origin main
- 企微推送：233 字节 → 1 个群组（Markdown 摘要 + H5 在线链接，无 PNG，符合 2026-05-31 后规范）
- H5 在线验证：HTTP 200, 23KB, Last-Modified 2026-06-30 01:24:45 GMT

**TOP 8 主题分布**：
- AI Agent & 企业：3 条（#1 Claude Tag 进 Slack 9.5 / #2 OpenAI × HP Frontier 8.8 / #3 agency-agents 11.9万星 8.7）
- 模型 & 监管：2 条（#4 GPT-5.6 政府强制预览 9.4 / #5 DeepSeek V4.1 + 500亿融资 9.3）
- 思考 & 精髓：1 条（#6 Karpathy 长文：LLM 是全新智能物种 9.0）
- 行业 & 应用：2 条（#7 具身智能 1H26 融资 460 亿 8.5 / #8 字节 Seedance 2.5 8.3）

**关键看点**：
- 今日两条主旋律：#1 Anthropic Claude Tag 进 Slack（Karpathy 评「第三次 LLM UI 重设计」）+ #4 OpenAI GPT-5.6 政府强制预览版（监管新形态）
- 国产 AI 双线突破：DeepSeek V4.1 + 500 亿融资（资本）+ 字节 Seedance 2.5（视频生成）
- 今日是周二工作日，新闻密度充足，4 章节视觉分隔明显

---

## [2026-06-29 09:45] AI 干货周报 Issue #12 | Vault 自检 W26

**Phase 0 - Vault 自检**（2026-05-31 新增流程）：

- **Weekly Audit W26**：扫描 119 篇 wiki 笔记
  - 健康度：**99.2%**（118/119 活跃）
  - 归档 1 篇：`pureref.md` → `wiki/_archive/2026-05-pureref.md`（W22 REVIEW 标记，休眠 28 天）
  - 活跃指标：used_by 非空 3 篇 / surfaced_with 非空 4 篇 / 14 天内修改 0 篇
  - 产物：`wiki/insights/weekly-audit-2026-W26.md`

- **Connection Surface W26**：扫描过去 14 天新增笔记 vs 全库
  - 新增笔记：**0 篇**（过去 14 天无新增）
  - surfaced_with 但未 used_by：**3 篇**（约束即复利、CHIEF、character-consistency-techniques）
  - 本周连接入选：**0 条**（无可信度 ⭐⭐⭐ 以上连接）
  - 产物：`wiki/insights/weekly-connections-2026-W26.md`

**Phase 1-4 - AI 干货周报** Issue #12：

- **周期**：2026.06.23 – 06.29
- **主题**：模型迭代爆发周
- **条数**：9 条（5 工具 / 2 工作流 / 2 方法论）

**内容分布**：
- 🛠️ **实用工具箱**（5条）：Kimi K2.7-Code 高速版、MiniMax M3、GPT-5.6 家族（Sol/Terra/Luna）、可灵 3.0 Omni 4K、Seedance 2.0 VIP 会员
- ⚡ **高效工作流**（2条）：Claude Tag 跨项目知识关联、Runway Agent AI 视频生成工作流
- 🧠 **方法论与 Prompt**（2条）：Karpathy CLAUDE.md 17万星最佳实践、**约束即复利**（vault 本周自我连接发现）

**关键看点**：
- OpenAI 三箭齐发 GPT-5.6 家族（Sol 轻量/Terra 标准/Luna 创意），价格最高降 92%
- 国产模型正面对决：Kimi K2.7-Code 代码场景 3x 提速 vs MiniMax M3 开源冲榜
- AI 视频进入原生 4K + 物理真实时代（可灵 3.0 Omni 4K、Seedance 2.0 VIP 会员体系）
- Vault 连接发现「约束即复利」成为方法论第 9 条 —— 证明自我连接机制有效

**产物**：
- MD：`raw/daily-reports/AI_Practical_Weekly_Report_20250629.md`
- H5：`docs/ai-daily/ai-weekly-card-20250629-toc.html`（Soft Editorial + TOC 侧边栏，粉色 #E1A4C2 高亮）
- 归档：`docs/ai-daily/index.html` DATA 数组顶部追加

**发布**：
- Git Push：`7d1730c` feat: AI weekly 2026.06.23–06.29 Issue #12 + vault audit/connections W26 + archive pureref
- 企微推送：✅ 极简版（标题+🔥hook+👉链接）→ 185 字节成功送达

---

## [2026-06-29 09:20] AIGC 日报 06.29

执行 AIGC 日报完整流水线（Phase 1-4）：

**Phase 1 - 情报采集**：
- 5+ 轮 WebSearch 扫描 65 信源，过去 24h 筛选 8 条最新动态
- 来源覆盖：36氪 / 新智元 / 量子位、火山引擎 FORCE 大会 / 北京商报 / 钛媒体、雪球 / Brian Armstrong X 帖、量子位 / The Information、Techmeme / OpenAI 官方、Anthropic 官方 / 环球网、智元官方 / 网易、GitHub alibaba/page-agent / CSDN 等

**Phase 2 - 日报 MD**：
- 产物：`raw/daily-reports/AIGC_Daily_Report_20260629.md`
- 四大主题：前沿 & 产业（2条）/ 商业化 & 成本（2条，腮红色满幅高亮）/ 模型 & 政策（2条）/ 工具 & 趋势（2条）

**Phase 3 - TOC H5**：
- 产物：`docs/ai-daily/ai-daily-card-20260629-toc.html`
- Soft Editorial + TOC 侧边栏，柠檬黄 `#D6DD63` 高亮
- 4 大章节：§1 前沿 & 产业（2条）/ §2 商业化 & 成本（2条，腮红色满幅高亮）/ §3 模型 & 政策（2条）/ §4 工具 & 趋势（2条）
- 顶部 Header / 底部 Data Strip 4 色块 / Footer 署名

**Phase 4 - 归档 + 发布 + 推送**：
- 归档首页 `docs/ai-daily/index.html` DATA 数组顶部追加新条目（8 个 tags）
- Git Push: `0135651 daily: AIGC daily card 20260629` → origin main
- 企微推送：293 字节 → 1 个群组（Markdown 摘要 + H5 在线链接）

**TOP 8 主题分布**：
- 前沿研究：1 条（#1 红皇后哥德尔机器，9.4）
- AI 商业化：2 条（#2 豆包专业版 9.2 + #3 Coinbase 选国货 9.0）
- 模型 & 政策：2 条（#4 Fable 5 回归 8.8 + #5 GPT-5.6 Sol 8.7）
- AI 渗透：1 条（#6 Claude 9700 用户报告 8.5）
- 具身智能：1 条（#7 智元 1.5 万台 8.3）
- 工具 & Agent：1 条（#8 page-agent + MoE 8.0）

**关键看点**：
- 今日最大看点是 #1「红皇后哥德尔机器」论文 + Anthropic Jack Clark 60% 押注 2028 年底 ASI 降临
- #3 Coinbase 把 GLM 5.2 + Kimi 2.7 设为内部默认是「国货 AI 成为默认选项」的重要信号
- 今日是周日，但 24h 内新闻密度充足，未触发降级策略

---

## [2026-06-28 09:20] AIGC 日报 06.28

执行 AIGC 日报完整流水线（Phase 1-4）：

**Phase 1 - 情报采集**：
- 5+ 轮 WebSearch 扫描 65 信源，过去 24h 筛选 8 条最新动态
- 来源覆盖：36氪 / IT之家 / DeepSeek 官方、OpenAI 官方 + Broadcom 官方、Anthropic + Bloomberg、The Information、Mistral 官方 + TechTimes、新智元 / 36氪、GitHub Trending / Trendshift、Anthropic + The Decoder、IT之家 / 微博开放平台 等

**Phase 2 - 日报 MD**：
- 产物：`raw/daily-reports/AIGC_Daily_Report_20260628.md`
- 三大主题：基建 & 芯片（2条）/ 地缘 & 工具（2条，腮红色满幅高亮）/ Agent & 趋势（4条）

**Phase 3 - TOC H5**：
- 产物：`docs/ai-daily/ai-daily-card-20260628-toc.html`
- Soft Editorial + TOC 侧边栏，柠檬黄 `#D6DD63` 高亮
- 3 大章节：§1 基建 & 芯片（2条）/ §2 地缘 & 工具（2条，腮红色满幅高亮）/ §3 Agent & 趋势（4条）
- 右上角「← 返回归档」按钮 + ScrollSpy 自动高亮

**Phase 4 - 发布推送**：
- Git commit `ea3e027` → push origin main 成功（dc79615..ea3e027）
- 企微推送 `node push-ai-daily.js --date 20260628` 成功（242/4096 字节）

**TOP 8**：
1. DeepSeek × 北大开源 DSpark 推测解码框架：单用户生成速度+60-85%（9.4）
2. OpenAI × Broadcom 联合发布 Jalapeño 首款自研推理芯片：9 个月流片成本降 50%（9.2）
3. Anthropic 指控阿里 Qwen 实施 28.8M 次蒸馏攻击：4 倍于此前 DeepSeek 案（9.0）
4. Mistral AI 发布 OCR4：170 语言 OmniDocBench 击败 GPT-5.5 Pro（8.8）
5. Karpathy 内部 Claude.md 军规泄露：10 条实战规则碾压 GitHub 18 万星（8.7）
6. OpenMontage：GitHub 周榜第一的 Agentic 视频制作系统 500+ Agent Skills（8.6）
7. Anthropic 停招初级工程师双重警告：增长伴随失业两端同时拉满（8.5）
8. 微博 weibo-cli 正式上线：70+ API + MCP 协议国内首个 Agent 原生 CLI（8.3）

---

## [2026-06-27 09:20] AIGC 日报 06.27

执行 AIGC 日报完整流水线（Phase 1-4）：

**Phase 1 - 情报采集**：
- 多轮 WebSearch 扫描 65 信源，过去 24h 筛选 8 条最新动态
- 来源覆盖：OpenAI 官方、The Information、36氪、Epoch AI/METR、Linux 基金会、Decrypt、IT之家、Anthropic、CNBC、欧莱雅/VivaTech 等

**Phase 2 - 日报 MD**：
- 产物：`raw/daily-reports/AIGC_Daily_Report_20260627.md`

**Phase 3 - TOC H5**：
- 产物：`docs/ai-daily/ai-daily-card-20260627-toc.html`
- Soft Editorial + TOC 侧边栏，柠檬黄 `#D6DD63` 高亮
- 3 大章节：§1 模型 & 政策（2条） / §2 编程 & 基础设施（4条，高亮腮红色满幅背景）/ §3 行业 & 趋势（2条）
- 右上角「← 返回归档」按钮 + ScrollSpy 自动高亮

**Phase 4 - 发布推送**：
- Git commit `0a07c03` → push origin main 成功（2b499d1..0a07c03）
- 企微推送 `node push-ai-daily.js --date 20260627` 成功（238/4096 字节）

**TOP 8**：
1. OpenAI GPT-5.6 三剑客 Sol/Terra/Luna（9.5）
2. MirrorCode 基准：AI 连续编程 19 天烧掉 2600 美元（9.3）
3. Linux 基金会联合 20 家科技巨头启动 Akrites（9.1）
4. Anthropic 停止招聘初级工程师，警告 AI 经济冲击（8.9）
5. GPT-5.6 美国政府"逐客户"批准内幕（8.8）
6. OpenAI 内部数据：Codex 99.8% 取代 ChatGPT（8.7）
7. AI 创业公司 Lindy 弃用 Claude 改用 DeepSeek（8.5）
8. 欧莱雅 × OpenAI 战略合作：虚拟试妆搬进 ChatGPT（8.3）

---

## [2026-06-26 09:20] AIGC 日报 06.26

执行 AIGC 日报完整流水线（Phase 1-4）：

**Phase 1 - 情报采集**：
- 7 轮 WebSearch 扫描 65 信源，过去 24h 筛选 8 条动态

**Phase 2 - 日报 MD**：
- 产物：`raw/daily-reports/AIGC_Daily_Report_20260626.md`

**Phase 3 - TOC H5**：
- 产物：`docs/ai-daily/ai-daily-card-20260626-toc.html`
- Soft Editorial + TOC 侧边栏，柠檬黄高亮

**Phase 4 - 发布推送**：
- Git commit 2b499d1 → push origin main 成功
- 企微推送成功（文字摘要 + H5 链接）
- TOP 3：Fable 5 回归倒计时 (9.5)、Gemini Flash Computer Use (9.3)、OpenAI 推迟 IPO (9.1)

---

## [2026-06-25 09:30] AIGC 日报 06.25

执行 AIGC 日报完整流水线（Phase 1-4）：

**Phase 1 - 情报采集**：
- 7轮 WebSearch 扫描 65 信源，过去 24h 筛选 8 条动态
- 覆盖 OpenAI/Anthropic/Google/Qwen/GitHub Trending/Reddit/Hacker News 等

**Phase 2 - MD 生成**：
- 输出：`raw/daily-reports/AIGC_Daily_Report_20260625.md`
- 8 条动态：芯片主权 + Agent 进化 + 人才战争三条主线
- TOP 3：OpenAI Jalapeño 芯片 (9.4)、Claude Tag (9.3)、Google 人才流失 (9.1)

**Phase 3 - H5 生成**：
- 输出：`docs/ai-daily/ai-daily-card-20260625-toc.html`
- Soft Editorial + TOC 侧边栏，柠檬黄高亮，8 条 4 章节

**Phase 4 - 发布推送**：
- 归档首页更新 + Git commit 5314a1b + push origin main 成功
- 企微推送成功（文字摘要 + H5 在线链接）

---

## [2026-06-24 09:30] AIGC 日报 06.24

执行 AIGC 日报完整流水线（Phase 1-4）：

**Phase 1 - 情报采集**：
- 7轮WebSearch扫描65信源，过去24h筛选8条动态
- TOP 3: Cursor自研AI模型+Origin Git平台+Mobile App (9.3), Agentjacking攻击85%成功率劫持AI Agent (9.1), 诺奖得主John Jumper从Google DeepMind跳槽Anthropic (9.0)

**Phase 2 - MD生成**：
- 产物：raw/daily-reports/AIGC_Daily_Report_20260624.md

**Phase 3 - H5生成**：
- 产物：docs/ai-daily/ai-daily-card-20260624-toc.html
- Soft Editorial + TOC侧边栏风格，柠檬黄高亮，返回归档按钮

**Phase 4 - 归档+推送**：
- 归档首页 index.html DATA 数组顶部追加条目
- Git commit c4ba7a0，push origin main 成功
- 企微推送成功（文字摘要 + H5链接）

---

## [2026-06-23 09:30] AIGC 日报 06.23

执行 AIGC 日报完整流水线（Phase 1-4）：

**Phase 1 - 情报采集**：
- 7轮WebSearch扫描65信源，过去24h筛选8条动态
- TOP 3: Gemini 3.5 Pro GA窗口2M上下文 (9.4), OpenAI收购Astral (9.2), Google Interactions API默认化 (9.0)

**Phase 2 - MD生成**：
- 产物：raw/daily-reports/AIGC_Daily_Report_20260623.md

**Phase 3 - H5生成**：
- 产物：docs/ai-daily/ai-daily-card-20260623-toc.html
- Soft Editorial + TOC侧边栏风格，柠檬黄高亮，返回归档按钮

**Phase 4 - 归档+推送**：
- 归档首页 index.html DATA 数组顶部追加条目
- Git commit abc4664，push origin main 成功
- 企微推送成功（文字摘要 + H5链接）

---

## [2026-06-19 09:30] AIGC 日报 06.19

执行 AIGC 日报完整流水线（Phase 1-4）：

**Phase 1 - 情报采集**：
- 7轮WebSearch扫描65信源，过去24h筛选8条动态

**Phase 2 - 日报 MD**：
- 产物：`raw/daily-reports/AIGC_Daily_Report_20260619.md`
- TOP 3: OpenAI Codex开放第三方大模型 (9.3), DeepSeek识图+V4.1预告 (9.1), NVIDIA ENPIRE机器人自主实验 (8.8)

**Phase 3 - TOC 版 H5**：
- 产物：`docs/ai-daily/ai-daily-card-20260619-toc.html`
- Soft Editorial + TOC 侧边栏风格，柠檬黄高亮

**Phase 4 - 归档推送**：
- 归档首页 `docs/ai-daily/index.html` 已追加条目
- Git commit 93c5b51，HTTPS push 成功
- 企微推送成功（文字摘要+H5链接）

---

## [2026-06-18 09:30] AIGC 日报 06.18

执行 AIGC 日报完整流水线（Phase 1-4）：

**Phase 1 - 情报采集**：
- 7轮WebSearch扫描65信源，过去24h筛选8条动态
- TOP 3: DeepSeek 510亿融资估值近4000亿 (9.5), xAI Grok Imagine Video 1.5 (9.0), 阿里Qwen-Robot具身大模型 (8.8)

**Phase 2 - 日报 MD**：
- 生成 `raw/daily-reports/AIGC_Daily_Report_20260618.md`

**Phase 3 - TOC 版 H5**：
- 生成 `docs/ai-daily/ai-daily-card-20260618-toc.html`（Soft Editorial + TOC侧边栏 + VF风动效）

**Phase 4 - 归档+推送**：
- 更新 `docs/ai-daily/index.html` DATA 数组顶部追加
- Git commit 0f11eaf，HTTPS push 成功
- 企微推送成功（文字摘要+H5链接）

---

## [2026-06-17 09:30] AIGC 日报 06.17

执行 AIGC 日报完整流水线（Phase 1-4）：

**Phase 1 - 情报采集**：
- 7轮WebSearch扫描65信源，过去24h筛选8条动态
- 覆盖：融资/企业AI/收购/具身智能/财报/开发者工具/AI视频/AI支付

**Phase 2 - 日报 MD**：
- 产物：`raw/daily-reports/AIGC_Daily_Report_20260617.md`

**Phase 3 - TOC H5**：
- Soft Editorial + TOC 侧边栏风格 + VF风动效，柠檬黄高亮
- 产物：`docs/ai-daily/ai-daily-card-20260617-toc.html`

**Phase 4 - 归档推送**：
- 归档首页已更新（DATA顶部追加）
- Git commit 50bd8a9，HTTPS push成功
- 企微推送成功（文字摘要+H5链接）
- TOP 3: DeepSeek 500亿融资 (9.5), 微软Copilot Cowork+DeepSeek V4 (9.3), SpaceX 600亿美元收购Cursor (9.2)

---

## [2026-06-16 09:30] AIGC 日报 06.16

执行 AIGC 日报完整流水线（Phase 1-4）：

**Phase 1 - 情报采集**：
- 7轮WebSearch扫描65信源，过去24h筛选8条动态
- 覆盖：合规政策/平台生态/开发者工具/AI安全/编程模型/AI芯片/具身智能/国产硬件

**Phase 2 - 日报 MD**：
- 产物：`raw/daily-reports/AIGC_Daily_Report_20260616.md`

**Phase 3 - TOC H5**：
- Soft Editorial + TOC 侧边栏风格，柠檬黄高亮
- 产物：`docs/ai-daily/ai-daily-card-20260616-toc.html`

**Phase 4 - 归档推送**：
- 归档首页 `docs/ai-daily/index.html` DATA 顶部追加
- Git commit d4611fd，push 成功
- 企微推送成功（文字摘要 + H5链接）

**TOP 3**：AI标注新规生效 (9.5) · OpenAI合作伙伴生态 (9.2) · Anthropic SDK计费分离 (9.0)

---

## [2026-06-15 16:30] AI 干货周报 #11 + AIGC 日报 06.15 + Vault 自检 W24

执行每周一完整流水线（Phase 0-4）+ 补发 6/15 日报：

**Phase 0.1 - Vault Weekly Audit W24**：
- 扫描 wiki/ 总计 150 篇笔记
- 活跃 126 篇（84% ≥ 60% 基线），健康度良好
- 1 篇 REVIEW 标记（pureref），0 篇归档
- ⚠️ capture_type 缺失率 91%（待补全）

**Phase 0.2 - Connection Surface W24**：
- 发现 5 条横向连接：2 PRINCIPLE / 1 CONFLICT / 1 EVIDENCE / 1 PATTERN

**Phase 1-2 - 周报 MD + 日报 MD**：
- 周报：`raw/daily-reports/AI_Practical_Weekly_Report_20260614.md`（9条，主题：Agent 工作流爆发周）
- 日报：`raw/daily-reports/AIGC_Daily_Report_20260615.md`（8条，头条：Kimi K2.7 Code 高速版）

**Phase 3 - H5 生成**：
- 周报 H5：`docs/ai-daily/ai-weekly-card-20260614-toc.html`（粉色侧边栏高亮）
- 日报 H5：`docs/ai-daily/ai-daily-card-20260615-toc.html`（柠檬侧边栏高亮）
- ✅ `.back-archive-btn` 验证通过

**Phase 4 - 归档推送**：
- 归档首页 DATA 追加 2 条记录
- Git commit c122e0f，HTTPS push 成功
- 企微推送：周报 ✅ / 日报 ✅

**周报 TOP 3**: Claude Fable 5 双层架构旗舰 (9.5), Google Managed Agents 公测 (9.2), Kling 2.6 音视频一体 (9.0)

---

## [2026-06-11 09:30] AIGC 日报 · 2026.06.11

执行 AIGC 日报完整流水线（Phase 1-4）：

**Phase 1 - 信源扫描**：7 轮 WebSearch 扫描 65 信源，筛选 8 条动态

**Phase 2 - 日报 MD**：`raw/daily-reports/AIGC_Daily_Report_20260611.md`

**Phase 3 - H5 生成**：`docs/ai-daily/ai-daily-card-20260611-toc.html`（Soft Editorial + TOC 侧边栏）

**Phase 4 - 归档推送**：
- 归档首页 DATA 条目已更新
- Git commit 0c0d796，HTTPS push 成功
- 企微推送成功（文字摘要 + H5 链接）

**TOP 3**: Anthropic Fable 5+Mythos 5 静默防护 (9.5), OpenAI IPO 万亿估值 (9.3), 智谱 GLM-5 开源双 SOTA (9.1)

---

## [2026-06-08 12:25] AI 干货周报 · 2026.06.01-06.07 (Issue #10) + Vault 自检 W23

执行每周一完整流水线（Phase 0-4）：

**Phase 0.1 - Vault Weekly Audit**：
- 扫描 wiki/ 总计 119 篇笔记
- 活跃 87 篇（73% ≥ 60% 基线），健康度良好
- 新标 REVIEW：0 篇，归档：0 篇
- 报告：`wiki/insights/weekly-audit-2026-W23.md`

**Phase 0.2 - Connection Surface**：
- 本周新增/修改 12 条笔记
- 发现 4 条非显式连接（PRINCIPLE×2 / EVIDENCE×1 / PATTERN×1）
- 报告：`wiki/insights/weekly-connections-2026-W23.md`

**Phase 1 - 信源扫描**：6 轮 WebSearch 扫描 65 信源过去 7 天动态
- 实战派 Builder：Claude Code Dynamic Workflows、Karpathy Wiki 工作流
- 国产模型：MiniMax M3（1M上下文+原生多模态）、DeepSeek V4（1元/MT）
- 创作工具：Midjourney V7 视频生成、Omni-Reference
- 方法论：Tool Use Prompting Patterns、OpenAI 工具调用进化史

**Phase 2 - 周报 MD**：`raw/daily-reports/AI_Practical_Weekly_Report_20260607.md`
- 9 条干货：4 工具 + 2 工作流 + 3 方法论
- 包含本周自我连接发现小节

**Phase 3 - TOC H5**：`docs/ai-daily/ai-weekly-card-20260607-toc.html`
- Soft Editorial + TOC 侧边栏 + 粉色高亮（周报专属）
- ✅ 强制返回归档按钮已验证（.back-archive-btn + ← 返回归档）

**Phase 4 - 归档+推送**：
- 归档首页 DATA 数组顶部追加条目
- Git commit `120328d`，HTTPS push 成功
- 企微推送成功（极简版：标题 + 🔥 hook + 👉 H5链接）

---

## [2026-06-06 09:30] AIGC 日报 · 2026.06.06

执行每日完整流水线（Phase 1-4 日报生成推送）：

**Phase 1 - 情报采集**：7 轮 WebSearch 扫描 65 信源过去 24h 动态
- 第 1 轮：实战派+头部机构 → Anthropic 呼吁暂停AI开发、OpenAI Codex+ChatGPT合体
- 第 2 轮：中国 AI 生态 → 腾讯效率智能体工具集、可灵AI破1亿用户、DeepSeek融资
- 第 3 轮：AI 创作工具 → xAI Grok Video 1.5、Runway 50 Crowns、AI视频赛道横评
- 第 4 轮：长尾+垂直 → NVIDIA Nemotron 3 Ultra、HuggingFace Workflow SDK
- 第 5 轮：GitHub Trending → taste-skill 2.4K、MoneyPrinterTurbo 1.8K、Understand-Anything 2.9K
- 第 6 轮：中文 AI 媒体 → 腾讯云AI大会、黄仁勋访韩、Cloudflare机器人流量超人类
- 第 7 轮：ArXiv+Reddit → Anthropic RSI深度分析、GPT-5.5漏洞挑战赛

**Phase 2 - 日报 MD**：`raw/daily-reports/AIGC_Daily_Report_20260606.md`
- TOP 8：Anthropic呼吁暂停AI (9.5) / ChatGPT+Codex合体 (9.3) / Nemotron 3 Ultra (9.1) / xAI Grok Video (8.8) / 腾讯效率智能体 (8.6) / Runway全AI游戏CG (8.5) / HuggingFace SDK (8.3) / 可灵AI破1亿 (8.0)

**Phase 3 - H5 生成**：`docs/ai-daily/ai-daily-card-20260606-toc.html`
- Soft Editorial + TOC 侧边栏 + 柠檬黄高亮 + 返回归档按钮

**Phase 4 - 归档+推送**：
- 归档首页已追加条目
- Git commit `40b8292`，HTTPS push 成功
- 企微推送成功（文字摘要+H5链接）
- ⚠️ PNG 卡片未生成（不影响H5在线浏览）

---

## [2026-06-05 09:30] AIGC 日报 · 2026.06.05

执行每日完整流水线（Phase 1-4 日报生成推送）：

**Phase 1 - 情报采集**：7 轮 WebSearch 扫描 65 信源过去 24h 动态
- 第 1 轮：实战派+头部机构 → Anthropic 递归自我改进报告、Karpathy 首讲
- 第 2 轮：中国 AI 生态 → DeepSeek 700 亿融资+Code 将发布、MiniMax/智谱 A 股竞逐
- 第 3 轮：AI 创作工具 → 可灵出海战略分析、AI 视频工具横评
- 第 4 轮：长尾+垂直 → Perplexity Computer、ChatGPT Dreaming、微信 A2A
- 第 5 轮：GitHub Trending → opencode +1009 stars、Dify +285、Anthropic Skills 76K stars
- 第 6 轮：中文 AI 媒体 → 字节 AI 四大命题、英伟达收购 Kumo AI、Suno 4 亿美元 D 轮
- 第 7 轮：ArXiv+Reddit → Mind Lab LoRA 持续学习、FluxMem 记忆框架

**Phase 2 - 日报 MD**：`raw/daily-reports/AIGC_Daily_Report_20260605.md`
- TOP 8：Anthropic 递归自我改进 (9.5) / Gemma 4 12B (9.2) / Perplexity Computer (9.0) / ChatGPT Dreaming (8.7) / DeepSeek 700 亿 (8.5) / 微信 A2A (8.3) / Cosmos 3 (8.2) / Anthropic 漏洞框架 (8.0)

**Phase 3 - H5 生成**：`docs/ai-daily/ai-daily-card-20260605-toc.html`
- Soft Editorial + TOC 侧边栏 + 柠檬黄高亮

**Phase 4 - 归档+推送**：
- 归档首页已更新（DATA 顶部追加条目）
- Git commit 62b7056，HTTPS push 成功
- 企微推送成功（文字摘要 + H5 链接）
- ⚠️ PNG 卡片未生成（不影响 H5 在线浏览）

---

## [2026-06-04 09:30] AIGC 日报 · 2026.06.04

执行每日完整流水线（Phase 1-4 日报生成推送）：

**Phase 1 - 情报采集**：7 轮 WebSearch 扫描 65 信源过去 24h 动态
- 第 1 轮：实战派+头部机构 → 微软 Build 2026、OpenAI Codex 合并 ChatGPT
- 第 2 轮：中国 AI 生态 → DeepSeek 70 亿美元融资
- 第 3 轮：AI 创作工具 → 可灵 V3 4K60fps
- 第 4 轮：中文 AI 媒体 → 微软 Build、英伟达 GTC 台北、Qwen3.7
- 第 5 轮：长尾+垂直 → Anthropic IPO、Meta AI Agent、Alphabet 融资
- 第 6 轮：GitHub Trending → 多个 AI 工具项目
- 第 7 轮：ArXiv+Reddit → 持续学习/安全对齐论文

**Phase 2 - 日报 MD**：`raw/daily-reports/AIGC_Daily_Report_20260604.md`
- TOP 8：微软 Build (9.5) / Anthropic IPO (9.3) / DeepSeek (9.1) / Meta Agent (8.8) / Nemotron (8.8) / Codex (8.6) / Alphabet (8.5) / 可灵 V3 (8.3)

**Phase 3 - H5 生成**：`docs/ai-daily/ai-daily-card-20260604-toc.html`
- Soft Editorial + TOC 侧边栏 + VF 风动效 + 柠檬黄高亮

**Phase 4 - 归档推送**：
- ✅ 归档首页 `docs/ai-daily/index.html` DATA 顶部追加
- ✅ Git push HTTPS 成功
- ✅ 企微群推送成功（文字摘要 + H5 链接）

---

## [2026-06-02 14:15] AIGC 日报 · 2026.06.02

执行每日完整流水线（Phase 1-4 日报生成推送）：

**Phase 1 - 情报采集**：7 轮 WebSearch 扫描 65 信源过去 24h 动态
- 第 1 轮：实战派 6 人 + 头部机构（Anthropic IPO、Karpathy 动态）
- 第 2 轮：中国 AI 生态（Qwen3.7-Plus、MiniMax M3、DeepSeek V4）
- 第 3 轮：AI 创作工具（Midjourney V8、视频生成模型）
- 第 4 轮：中文 AI 媒体（微信 AI 助手、NVIDIA RTX Spark、机器人板块）
- 第 5 轮：Agent/Coding 领域（Perplexity Computer、Codex SDK）
- 第 6 轮：GitHub Trending（Taste-Skill、MoneyPrinterTurbo、Mellum2）
- 第 7 轮：ArXiv + 技术社区

**Phase 2 - 日报 MD**：筛选 TOP 8 条 → `raw/daily-reports/AIGC_Daily_Report_20260602.md`

**Phase 3 - H5 生成**：Soft Editorial + TOC 侧边栏（柠檬黄高亮）+ VF 风动效
- 输出：`docs/ai-daily/ai-daily-card-20260602-toc.html`

**Phase 4 - 归档推送**：
- 归档首页 `docs/ai-daily/index.html` DATA 顶部追加条目
- Git commit ae476d0 → HTTPS push 成功
- 企微群推送文字摘要 + H5 链接 ✅
- ⚠️ PNG 卡片未生成（不影响 H5 在线浏览）

**TOP 3**：Anthropic IPO 估值 9650 亿美元 (9.5) · Qwen3.7-Plus 多模态 Agent (9.2) · MiniMax M3 即将开源 (9.0)

---

## [2026-06-01 11:05] AI 干货周报 · 2026.05.26–06.01 (W22)

执行每周一完整流水线（Phase 0 vault 自检 + Phase 1-4 周报生成推送）：

**Phase 0 - Vault 自检**（2026-05-31 新增流程）
- **Weekly Audit**: 扫描 166 篇笔记 → 健康度 100%（全部 14 天内活跃），无沉睡笔记需归档
- **Connection Surface**: 发现 12 条非显式连接（⭐⭐⭐ 8 条 + ⭐⭐ 4 条）
  - 核心发现：「约束 = 复利」元 Pattern 跨 5 篇笔记浮现
  - 单一变量锁定法 / 锚点驱动工作流 / PRD 即 Prompt 等连接入周报

**Phase 1-4 - 周报生成**
- **扫描**: 65 信源近 7 天推文 → 9 条干货
- **产物**: `raw/daily-reports/AI_Practical_Weekly_Report_20260601.md` + `docs/ai-daily/ai-weekly-card-20260601-toc.html`
- **Git**: commit `319f212` push 成功
- **⚠️ 企微推送**: 自动化流程缺少 `push-ai-weekly.js` 脚本导致推送步骤跳过
- **✅ 手动补推**: 11:05 curl 推送成功
- **主题**: Agent 工程化爆发周
- **在线地址**: https://wangqi422.github.io/catwang-llm-wiki/docs/ai-daily/ai-weekly-card-20260601-toc.html

**已修复**
- 新建 `_deploy/wecom-push/push-ai-weekly.js` 脚本
- 更新 `config.json` 使用说明
- 后续自动化将正常推送

---

## [2026-06-01 09:30] AIGC 日报 · 2026.06.01

自动执行 AIGC 日报完整流水线（7 轮 WebSearch 扫描 65 信源 → MD → TOC H5 → 归档 → Git Push → 企微推送）：

- **产物**：`raw/daily-reports/AIGC_Daily_Report_20260601.md` + `docs/ai-daily/ai-daily-card-20260601-toc.html`
- **Git commit**：3be456c
- **企微推送**：文字摘要发送成功（PNG 未生成，不影响 H5 浏览）
- **TOP 3**：NVIDIA GTC Taipei + Nemotron 3 Omni + Vera CPU (9.5), MiniMax M3 开源 MSA 架构 (9.3), GitHub Copilot token 计费 (9.0)
- **在线地址**：https://wangqi422.github.io/catwang-llm-wiki/docs/ai-daily/ai-daily-card-20260601-toc.html

---

## [2026-05-31 02:00] 全部关联织网

把今晚改造涉及的所有新旧笔记织成完整网络（双向引用 + Related 段 + frontmatter 字段）：

- **新建 wiki/summaries/2026-05-31-obsidian-vellum-second-brain.md**
  - 把 cyrilXBT 文章正式 ingest 到 wiki/summaries/
  - 与 [[2026-04-11-obsidian-ai-second-brain]] 双向链接（"续集"标记）
  - used_by: 4 条（INDEX-by-type / CHIEF / constraints-as-leverage / inward-brief skill）
- **更新 INDEX-by-type.md**：sources 从 raw/Clipper/ 上移到 wiki/summaries（保持知识唯一源）；contribution_count: 1 → 3
- **更新 CHIEF.md**：sources 指向 vellum summary；contribution_count: 1 → 2
- **更新 constraints-as-leverage.md**：sources +1，surfaced_with +1（vellum summary）
- **更新 obsidian-ai-second-brain.md**：Related 段加"续集"链 + used_by 字段（vault 第一次有了一条 4 月老笔记被 surface）
- **三条 pattern 笔记 Related 段补「元 pattern」标记**：harness-engineering / spec-driven-development / character-consistency-techniques
- **index.md 加 ⭐ 元层 / 🌅 inward-briefs 两个全新区段**

---

## [2026-05-31 01:55] capture_type 全库补全 + 第一条 idea 笔记

执行小柒的两个决策：

**1. 一次性补全 41 篇**
- comparisons/ 6 → pattern；decisions/outputs README 2 → idea；insights/ 2 → idea
- people/ 7 → article；showcase/ 1 → pattern；summaries/ 23 → article
- **全库 61/61 篇 100% 覆盖 capture_type**
- 最终分布：pattern 17 (27.9%) / idea 7 (11.5%) / question 0 / number 0 / article 37 (60.7%)
- ⚠️ article 60.7% 超基线 35% — vault 在搬运 > 思考；question/number 仍 0

**2. 新建 idea 笔记 [[constraints-as-leverage]]**
- 来源：2026-05-31 inward-brief 浮现的「约束 = 复利」隐性 pattern
- 包含：Origin / 三句话核心 / 通用 4 步模板 / 5 个落地案例 / 反例 / 与已有笔记张力
- **首次 close-the-loop 实战**：5 条 surface 笔记回填 used_by + surfaced_with + contribution_count=1
  - harness-engineering / INDEX-by-type / CHIEF / spec-driven-development / character-consistency-techniques
- vault 第一次有 contribution_count > 0 的笔记！

---

## [2026-05-31 01:51] inward-brief | 首次手动验证

- 触发方式：手动（验证管线）
- 时间窗：NEW=2026-05-30 00:00 ~ 今 06:00（26 篇变更）/ OLD=5-23 ~ 5-24（2 篇真空期）
- 浮现：3 ⭐⭐⭐ + 1 ⭐⭐ 连接 + 1 隐性 pattern「约束 = 复利」+ 1 个值得想的问题
- 产物：[[2026-05-31]]
- 最强连接：「锚点重复律」— 角色一致性（--cref）= 笔记一致性（capture_type）= 同一原理
- 设计问题已记录到 brief §📌（OLD 窗口太窄 / mtime 噪声 / 自指循环），后续 darwin 优化

---

## [2026-05-31 01:43] Step 2 | CHIEF.md + inward-brief + close-the-loop

继续 cyrilXBT 框架对位补丁的 Step 2：

- **新建 wiki/CHIEF.md**（项目专属总指挥文件）
  - 8 节结构：Identity / Vault / Structure / Current Projects / Obsessions / What I Want From You / Voice / Update Ritual
  - 已写入 3 个 active 项目 + 4 个 active questions + 3 个 stuck-on
  - **更新节奏**：每周一 09:30 手动 5 分钟（与 weekly-audit 同步）

- **新建 _skills/inward-brief.md**（每日内向 brief skill）
  - 区别于 AIGC 日报（外向）：扫 vault 自己的笔记，不扫 raw/Clipper raw/articles
  - 算法：NEW_LIST × OLD_LIST 笛卡尔积 + capture_type 组合优先级 → Top 3 ⭐⭐⭐ + Top 2 ⭐⭐
  - 输出到 raw/inward-briefs/YYYY-MM-DD.md（不推企微、不回填 used_by）
  - 已建目录：raw/inward-briefs/

- **改 _skills/output-generator.md**（强化 close-the-loop）
  - 第五步.2 增加 outcomes 块：date / producto / observed
  - 文章发布瞬间立即回填 used_by + contribution_count；产生可观测结果时再追加 outcomes

- **改 _skills/decision-feeder.md**（强化 close-the-loop）
  - 第六步增加 outcomes / review_at / review_outcome 字段
  - 决策记录新增 review_at 必填（决策时设定何时回来检验）

- **改 _skills/weekly-audit.md**（接入决策复盘扫描）
  - 新增第二步.5：扫 wiki/decisions/ 中 review_at <= today 但 review_outcome 空的决策
  - 报告新增 §🔄 待复盘决策

- **注册 automation**：每日 09:00 自动跑 inward-brief（id=automation-1780163321944）
- **改 CODEBUDDY.md §3**：使用层触发词速查加 inward-brief

下一里程碑：明早 09:00 第一次自动跑 inward-brief，验证管线。

---

## [2026-05-31 01:32] capture_type | 引入"思考类型"维度

- 来源：]]（cyrilXBT 文章）
- 核心洞见：**按思考类型分类（pattern/idea/question/number/article）让跨主题同型笔记自动聚类**，是图谱通电的关键
- 改动：
  1. CODEBUDDY.md §4.1 frontmatter 加 `capture_type` 字段；新增 §4.1.1 解释 + 决策树
  2. _skills/ingest.md 第一/三步强制要求 LLM 给 capture_type 判断；质量红线第 3 条新增"必填"约束
  3. 新建 wiki/INDEX-by-type.md（5 个 Dataview 视图 + 健康度基线）
  4. 批量回填现有 19 篇 wiki 根目录笔记的 capture_type
- 当前分布：pattern 11 / article 7 / idea 2 / question 0 / number 0
- ⚠️ 暴露问题：question 和 number 占比为 0，说明研究方向感不足、决策弹药库为空（cyrilXBT 框架预测）

---

## [2026-05-31 01:15] automation-update | 周一 09:45 接入 audit + connection

- 修改 `ai` automation prompt，前置 Phase 0.1（weekly-audit）+ Phase 0.2（connection-surface）+ Phase 0.3（把连接结果注入周报）
- 下次执行：2026-06-01 09:45（明天）
- 同时新建 `wiki/outputs/README.md` 明确该目录职责（保留，存跨笔记综合长文）
- 更新 W22 审计报告，已废弃的"待决定项"全部勾掉

---

## [2026-05-31 01:08] weekly-audit | Week 22（首次审计）

- **扫描范围**：wiki/ 根目录 19 篇
- **健康度**：**94.7%**（活跃 18 / 候选 REVIEW 1 / 归档 0）— 远超 60% 基线
- **REVIEW**：[[pureref]] — 16 天未修改，0 条有效横向引用，已加 `review_flagged: 2026-05-31`
- **归档**：本次 0 篇（首次标记需观察 14 天）
- **报告**：[[weekly-audit-2026-W22]]
- **关键发现**：CODM 主题 + harness 主题 + 内容方法论主题已形成 3 个强连通子图，平均入向链 6.4 条
- **下一步**：周一 09:15 接入 automation；2026-06-14 决定 pureref 是否归档

---

## [2026-05-31 01:00] system-upgrade | 接入"使用层"5 大 Skill

- **来源**：How to Build an Obsidian System That Turns Every Note You Take Into Something You Actually Use
- **新增 Skill**：
  - `_skills/decision-feeder.md` — 决策反向检索
  - `_skills/writing-activator.md` — 写作激活（生成简报）
  - `_skills/output-generator.md` — 基于简报合成成稿
  - `_skills/connection-surface.md` — 每周浮现非显式连接
  - `_skills/weekly-audit.md` — 清理沉睡笔记
- **CODEBUDDY.md 升级**：
  - §3 Skill 触发表分 4 类（输入层/使用层/输出层/系统层）
  - §4.1 Frontmatter 增加 used_by / contribution_count / surfaced_with / review_flagged / archived_at 字段
  - §6.1 Note Usefulness Standard（4 用途准入）
  - §6.2 唯一意义指标（contribution_count 而非 笔记总数）
  - §7 Quick Commands 增加 5 条新命令
- **目录新建**：wiki/decisions/ + wiki/_archive/ + raw/work/writing-briefs/
- **index.md**：增加决策记录/写作简报/周连接/周审计/归档 5 个区段
- **下一步建议**：
  - 立即跑 audit 看看 wiki/(61 篇) 健康度
  - 下周一让 connection-surface 接入现有 09:45 周报 automation
  - 写下一篇文章前先用 write 命令 生成简报

---

## [2026-05-30 09:30] daily-card | AIGC 日报 · 2026.05.30

- **操作**: AIGC 日报完整流水线（Phase 1→4）
- **产物**: `raw/daily-reports/AIGC_Daily_Report_20260530.md` + `docs/ai-daily/ai-daily-card-20260530-toc.html`
- **归档**: `docs/ai-daily/index.html` 已更新 DATA 数组
- **Git**: commit 13e2247, push origin main 进行中
- **企微**: 文字摘要推送成功
- **TOP 3**: Claude Opus 4.8 自愈+Dynamic Workflows (9.5), DeepSeek V4-Pro 永久降价75% (9.2), MiniMax A股IPO (8.8)
- **⚠️ PNG 未生成**（不影响 H5 在线浏览）

---

## [2026-05-29 09:30] daily-card | AIGC 日报 · 2026.05.29

- **操作**: AIGC 日报完整流水线（Phase 1→4）
- **产物**: `raw/daily-reports/AIGC_Daily_Report_20260529.md` + `docs/ai-daily/ai-daily-card-20260529-toc.html`
- **归档**: `docs/ai-daily/index.html` 已更新 DATA 数组
- **Git**: commit ab47da3, push origin main 成功
- **企微**: 文字摘要推送成功
- **TOP 3**: Anthropic 650亿H轮 (9.5), Claude Opus 4.8 (9.2), iOS 27 AI Siri (8.5)
- **⚠️ PNG 未生成**（不影响 H5 在线浏览）

---

## [2026-05-28 09:30] daily-card | AIGC 日报 · 2026.05.28

- **操作**: AIGC 日报完整流水线（Phase 1→4）
- **产物**: `raw/daily-reports/AIGC_Daily_Report_20260528.md` + `docs/ai-daily/ai-daily-card-20260528-toc.html`
- **归档**: `docs/ai-daily/index.html` 已更新 DATA 数组
- **Git**: commit 50aded5, push origin main 成功
- **企微**: 文字摘要推送成功
- **TOP 3**: Midjourney V8 Alpha (9.5), Cognition AI 260亿 (9.2), Qwen3.7 Max (9.0)
- **⚠️ PNG 未生成**（不影响 H5 在线浏览）

---

## [2026-05-27 09:30] daily-card | AIGC 日报 · 2026.05.27

- **操作**: AIGC 日报完整流水线（Phase 1→4）
- **产物**: `raw/daily-reports/AIGC_Daily_Report_20260527.md` + `docs/ai-daily/ai-daily-card-20260527-toc.html`
- **归档**: `docs/ai-daily/index.html` 已更新 DATA 数组
- **Git**: commit b9d43d4, push origin main 成功
- **企微**: 文字摘要推送成功（PNG 未生成，不影响 H5 在线浏览）
- **TOP 3**: Grok Build Beta + V9 1.5T (9.2) / 支付宝 AI Wallet + Token Pay (8.8) / 天工 SkyClaw-v1.0 (8.5)

---

## [2026-05-26 09:30] daily-card | AIGC 日报 · 2026.05.26

- **操作**: AIGC 日报完整流水线（Phase 1→4）
- **产物**: `raw/daily-reports/AIGC_Daily_Report_20260526.md` + `docs/ai-daily/ai-daily-card-20260526-toc.html`
- **归档**: `docs/ai-daily/index.html` 已更新 DATA 数组
- **Git**: commit d998a2e, push origin main 成功
- **企微**: 文字摘要推送成功（PNG 未生成，不影响 H5 在线浏览）
- **TOP 3**: Mythos 酝酿上线 (9.5) / 英伟达 Vera CPU (9.2) / Grok V9-Medium (8.9)

---

## [2026-05-25 11:23] ingest | Nano Banana Eye Realism Prompt

- **操作**: 摄取 `raw/work/prompts/nano-banana-eye-realism.md`
- **新建**: 1 个摘要页（`wiki/summaries/2026-05-25-nano-banana-eye-realism.md`）、1 个概念页（`wiki/eye-realism-prompt-technique.md`）
- **更新**: `wiki/character-consistency-techniques.md`（追加眼部精修章节+来源）、`index.md`
- **共 4 个页面变更**

---

## [2026-05-25 11:45] weekly-card | AI 干货周报 · Issue #09 · 2026.05.19–05.25

- **操作**: 执行 AI 干货周报完整流水线（Phase 1-5）
- **周期**: 2026.05.19 – 05.25（Issue #09）
- **主题**: Agent 基础设施周
- **产物**:
  - `raw/daily-reports/AI_Practical_Weekly_Report_20260525.md`
  - `docs/ai-daily/ai-weekly-card-20260525-toc.html`
  - `docs/ai-daily/index.html`（归档追加）
- **Git**: commit 5c2bfbd, push origin main ✅
- **推送**: 企微群 Markdown 摘要推送成功 ✅
- **⚠️ 待修复**: 缺少 push-ai-weekly.js 专用脚本；PNG 长图未生成（不影响 H5 在线浏览）
- **TOP 3**: Anthropic API 四大新能力 (9.5) · OpenAI Codex 正式发布 (9.3) · Gemini 2.5 Pro I/O 版 (9.0)

---

## [2026-05-25 10:30] daily-card | AIGC 日报 · 2026.05.25

- 5 轮 WebSearch 扫描 65 信源，筛选 8 条动态
- 产物：`raw/daily-reports/AIGC_Daily_Report_20260525.md` + `docs/ai-daily/ai-daily-card-20260525-toc.html`
- Git push 成功（566c4bf），企微推送成功（文字摘要）
- ⚠️ PNG 卡片未生成（不影响 H5 在线浏览）
- TOP 3: Anthropic $300亿融资 (9.5), 三大模型曝光 (9.3), GPT-5.6 vs Sonnet 4.8 (9.1)

---

| 2026-05-23 | ingest | 摄取 raw/work/projects/Urban_Character_Prompt.md — 创建 1 个摘要页（2026-05-23-urban-character-prompt）、2 个概念页（urban-character-prompt、character-consistency-techniques），共 3 个页面变更，更新 index.md |

---

## [2026-05-22 17:30] daily-card | AIGC 日报 · 2026.05.22

- **操作**: 执行 AIGC 日报完整流水线（Phase 1-4）
- **产物**:
  - `raw/daily-reports/AIGC_Daily_Report_20260522.md`
  - `docs/ai-daily/ai-daily-card-20260522-toc.html`
- **推送**: 企微群文字摘要 + H5 在线链接 ✅
- **Git**: push origin main ✅ (a342011)
- **TOP 3**: Anthropic Q2盈利(9.5), OpenAI万亿IPO(9.3), Runway Aleph 2.0(9.0)
- **备注**: PNG卡片未生成（不影响H5在线浏览）

---

## [2026-05-21 15:42] daily-card | AIGC 日报 · 2026.05.21

- **操作**: 执行 AIGC 日报完整流水线（Phase 1-4）
- **产物**:
  - `raw/daily-reports/AIGC_Daily_Report_20260521.md`
  - `docs/ai-daily/ai-daily-card-20260521-toc.html`
  - `docs/ai-daily/index.html`（归档追加）
- **推送**: 企微群推送成功（文字摘要），GitHub Pages 同步完成
- **TOP 3**: Karpathy 加盟 Anthropic (9.5) · OpenAI 推翻 Erdős 猜想 (9.3) · Google I/O 2026 (9.0)
- **⚠️ PNG 未生成**：push-ai-daily.js 提示未找到 PNG 卡片，不影响 H5 在线浏览

---

## [2026-05-18 19:50] restructure | 废弃双轨制，合并 work/ 和 learn/ 到 raw/

- **操作**: 将 `work/` 整体移动到 `raw/work/`，`learn/` 整体移动到 `raw/learn/`
- **原因**: 简化目录结构，统一素材池
- **影响**:
  - 删除根目录 `work/` 和 `learn/`
  - 新路径：`raw/work/projects/`、`raw/work/prompts/`、`raw/learn/tutorials/` 等
  - 更新 `CODEBUDDY.md` 架构说明（双轨制 → 统一素材池）
  - 更新 `index.md`（工作轨/学习轨 → 原始素材统一索引）
- **知识流向变更**: `raw/` → (ingest) → `wiki/`（简化）

---

## [2026-05-18 17:45] ingest | 摄取 Harness Engineering 团队落地规范

- **原始文件**: `raw/Clipper/驾驭 AI Coding：一份面向团队的 Harness Engineering 落地规范 - 腾讯游戏知识库 - KM平台.md`
- **来源**: KM 平台（腾讯游戏知识库），2026-05-18 发布
- **归属轨**: 学习轨（learn）— AI Coding 工程方法论
- **新建页面（6 个）**:
  - `wiki/summaries/2026-05-18-harness-engineering-team-spec.md` — 摘要页
  - `wiki/harness-engineering.md` — 概念页：Harness Engineering 完整定义（整合两篇来源）
  - `wiki/spec-driven-development.md` — 概念页：SDD 规范驱动开发
  - `wiki/team-harness-repo.md` — 概念页：团队 Harness 仓库模式
  - `wiki/harness-audit.md` — 概念页：harness-audit 合规自检 Skill
  - `wiki/comparisons/vibe-coding-vs-harness-engineering.md` — 对比表：Vibe Coding vs Harness
- **更新页面（2 个）**:
  - `wiki/summaries/2026-04-09-harness-engineering-practice.md` — Related 区追加新页面链接
  - `index.md` — 添加 6 条新条目 + 1 条对比表 + 标签云更新
- **共 8 个页面变更**

---

## [2026-05-18 17:40] ingest | 摄取 CodeBuddy + 腾讯文档自媒体工作流

- **原始文件**: `raw/Clipper/我用 CodeBuddy + 腾讯文档，搭了一套自媒体内容生产工作流 - 腾讯游戏知识库 - KM平台.md`
- **作者**: 算法一只狗（公众号）
- **归属轨道**: 学习轨（learn）
- **新建页面（2 个）**:
  - `wiki/summaries/2026-05-18-codebuddy-tencent-docs-workflow.md` — 摘要页
  - `wiki/codebuddy-content-workflow.md` — 概念页：CodeBuddy + 腾讯文档自媒体内容生产工作流
- **更新页面（2 个）**:
  - `wiki/content-creation-methodology.md` — 追加"工具化实践"章节 + 新来源引用
  - `index.md` — 添加 2 条新条目 + 标签云更新
- **共 4 个页面变更**

---

## [2026-05-18 11:15] ingest | 摄取 raw/clipper 文章

## [2026-05-18 11:25] ingest | 更新型摄取 Amir 原帖

- **原始文件**: `raw/clipper/How I built Gucci x Crocs campaign from 1 image + GPT-v2...md`
- **类型**: 更新型 ingest（该案例已有 wiki 页面，补充原帖独有信息）
- **新增信息**: 5 步完整 Prompt 原文、LTX Studio 工作流步骤、Bonus 资源链接
- **更新页面（4 个）**:
  - `wiki/summaries/2026-05-13-gucci-crocs-campaign-gpt-v2.md` — 追加五步 Prompt 原文 + LTX 工作流 + bonus 资源
  - `wiki/ai-campaign-prototyping.md` — 五步流程重写为含 Prompt 版 + 新增 LTX Studio 工作流章节
  - `wiki/gpt-image-v2.md` — 更新文字叠加局限的解决方案 + patch prompt 引用
  - `wiki/people/amir-mushich.md` — 更新资源区（LTX 项目/Font Builder/LinkedIn 查询/原帖链接）

- **原始文件**: `raw/clipper/上周做了场内部分享，关于我做AI这三年来总结的内容创作方法论。.md`
- **作者**: 数字生命卡兹克
- **新建页面**:
  - `wiki/summaries/2026-05-18-ai-content-methodology.md` — 摘要页
  - `wiki/content-creation-methodology.md` — 概念页：内容创作方法论三步框架
  - `wiki/defamiliarization.md` — 概念页：陌生化（找角度核心技巧）
  - `wiki/content-rhythm.md` — 概念页：内容节奏设计
  - `wiki/people/khazik.md` — 人物页：数字生命卡兹克
- **更新页面**: `index.md`（添加5条新条目 + 标签云更新）
- **共 6 个页面变更**

---

## [2026-05-18 10:20] AI Weekly | 周报生成 · 2026.05.12–05.18 Issue #08

- **主题**：AI 视频生成军备竞赛周
- **执行**：扫描 65 信源近 7 天推文，筛选 9 条实用干货
- 生成周报 MD：raw/daily-reports/AI_Practical_Weekly_Report_20260518.md
- 生成 TOC 版 H5：docs/ai-daily/ai-weekly-card-20260518-toc.html（Soft Editorial + 粉色侧边栏高亮）
- 更新归档首页：docs/ai-daily/index.html（DATA 顶部追加条目）
- Git commit：f309b84 feat: AI weekly 2026.05.12–05.18 Issue #08
- Git push origin main → GitHub Pages 部署成功
- **关键内容**：
  - Seedance 2.0 四模态混合输入
  - Veo 3.1 视频+同步音频一体化
  - MJ V7 Omni Reference 角色一致性
  - Codex /goal 长时域模式
  - Kimi K2.6 Agent Swarm 300 子 Agent
- **在线地址**：https://wangqi422.github.io/catwang-llm-wiki/docs/ai-daily/ai-weekly-card-20260518-toc.html

---

## [2026-05-17 09:30] AIGC Daily | 日报生成 · 2026.05.17

- 执行 5 轮分批 Web Search（65 信源），筛选 TOP 8 条动态
- 生成日报 MD：raw/daily-reports/AIGC_Daily_Report_20260517.md
- 生成 TOC 版 H5：docs/ai-daily/ai-daily-card-20260517-toc.html（Soft Editorial + 柠檬黄侧边栏高亮）
- 更新归档首页：docs/ai-daily/index.html（DATA 顶部追加条目）
- Git push origin main → GitHub Pages 部署成功
- 企微群推送成功（文字摘要 + H5 在线链接）
- 在线地址：https://wangqi422.github.io/catwang-llm-wiki/docs/ai-daily/ai-daily-card-20260517-toc.html

---

## [2026-05-15 10:13] Ingest | 摄取 PureRef v2.0 快捷键速查

- 摄取 raw/articles/pureref-shortcuts-v2.md
- 创建 1 个摘要页：2026-05-15-pureref-shortcuts-v2
- 创建 1 个概念页：pureref
- 更新 glossary.md（注册 pureref 标签）
- 更新 index.md
- 共 2 个页面变更

---

## [2026-05-13 19:00] Ingest | 摄取 Gucci × Crocs Campaign + GPT Image v2 教程

- 摄取网络文章（AI Primer + 优设网）→ raw/articles/gucci-crocs-campaign-gpt-image-2.md
- 创建 1 个摘要页：2026-05-13-gucci-crocs-campaign-gpt-v2
- 创建 2 个概念页：ai-campaign-prototyping / gpt-image-v2
- 创建 1 个人物页：people/amir-mushich
- 创建 1 个对比表：comparisons/traditional-vs-ai-campaign-workflow
- 更新 index.md
- 共 6 个页面变更

---

## [2026-05-09 14:21] Ingest | 摄取 CODM 项目资料（5 个 raw 文件）

- 摄取 raw/worksheets/CODM项目资料.md + raw/articles/codm-vfx-analysis-complete.md + raw/articles/call-of-duty-cg-vfx-classification.md + raw/articles/call-of-duty-cg-vfx-analysis.md + raw/articles/call-of-duty-cg-links-collection.md
- 创建 3 个摘要页：2026-05-09-codm-project-resources / 2026-04-11-codm-vfx-analysis / 2026-04-11-cod-cg-technology
- 创建 5 个概念页：codm-asset-pipeline / codm-vfx-system / cod-cg-production / pbr-rendering / iw-engine
- 创建 2 个实体页：people/territory-studio / people/platige-image
- 更新 index.md
- 共 10 个页面变更

---

## [2026-05-09 13:37] Init | 知识库双轨制架构初建

- 整合 `E:\catwang-llm-wiki`（原 my-llm-wiki 工作自动化仓库）+ `E:\小柒知识库建立`（个人学习仓库）
- 新仓库：`E:\catwang-llm-wiki`
- 架构：双轨制（work/ + learn/）+ 共享知识底座（wiki/）
- 基于 Karpathy LLM-Wiki 理念

## [2026-05-19 09:30] daily-card | AIGC 日报 2026.05.19

- **操作**: 执行 AIGC 日报完整流水线
- **Phase 1**: 5轮WebSearch扫描65信源，筛选8条最新动态
- **Phase 2**: 生成日报MD → `raw/daily-reports/AIGC_Daily_Report_20260519.md`
- **Phase 3**: 生成 Soft Editorial + TOC H5 → `docs/ai-daily/ai-daily-card-20260519-toc.html`
- **Phase 4**: 更新归档首页 → git push → 企微推送成功
- **TOP 8**:
  1. Google I/O 2026 + Gemini Omni (9.5)
  2. Anthropic $9000亿估值 (9.2)
  3. 马斯克 v. OpenAI 落槌 (8.8)
  4. 美国前沿模型监管框架 (8.7)
  5. SpaceX × xAI 合并 (8.5)
  6. Snap 裁员 65% 代码AI (8.3)
  7. 百度AI收入过半 + 阿里千问 (8.0)
  8. Karpathy 代理工程 (7.8)

## [2026-05-20 12:10] Daily | AIGC 日报补发
- 生成 `raw/daily-reports/AIGC_Daily_Report_20260520.md`
- 生成 `docs/ai-daily/ai-daily-card-20260520-toc.html`
- 更新 `docs/ai-daily/index.html` 归档条目
