---
name: daily-pipeline
description: "统一日报流水线 Skill：合并 AI Daily 速报卡片 与 CODM 竞品日报 两条重叠 Pipeline。触发词：daily-card / 生成卡片 / 速报卡片 / 竞品日报 / competitive daily / CODM日报 / 推送日报 / 今日竞品。根据输入自动选择 AIGC 速报分支（MD→HTML→PNG）或 CODM 竞品分支（情报收集→MD→HTML→GitHub Pages→企微推送）。"
---

# Skill: Daily Pipeline（统一日报流水线）

> **触发词**: `daily-card` / `生成卡片` / `速报卡片` / `竞品日报` / `competitive daily` / `CODM日报` / `推送日报` / `今日竞品`
> **职责**: 统一处理两类日报产物：
> 1. **AI Daily 速报** → 从 AIGC 日报生成 9:16 PNG 卡片
> 2. **CODM 竞品日报** → 从竞品情报生成 Dark Ops HTML，并发布到 GitHub Pages + 企业微信
> **兼容说明**: 本文件已吸收原 `_skills/competitive-daily.md`，以后所有日报型任务统一先读本文件。

---

## 0. 路由判断（先判分支，再执行）

| 用户意图 | 分支 | 最终产物 | 是否需要推送 |
|---|---|---|---|
| `daily-card` / `生成卡片` / `速报卡片` / AIGC 日报卡片 | **AIGC 速报分支** | `PNG` 图片（HTML 仅作截图中间文件） | 可选 |
| `竞品日报` / `今日竞品` / `competitive daily` | **CODM 竞品分支** | `HTML` 网页 + `MD` 原文 | 通常需要 |
| `推送日报` | **CODM 竞品分支** | 复用已生成 HTML 后直接推送 | 必需 |

**强制规则**：
- 先根据用户语言和目标产物选分支，不要把两条流水线混着跑。
- 如果用户没说清楚，但提到了 `AIGC_Daily_Report_YYYYMMDD.md`，默认走 **AIGC 速报分支**。
- 如果用户没说清楚，但提到了 `CODM_Competitive_Daily_YYYYMMDD.md`、竞品、推送、GitHub Pages，默认走 **CODM 竞品分支**。

---

## 1. 共用骨架（两条日报都遵守）

### Phase 1: 找到或创建当天日报源文件

- AIGC 分支：检查 `raw/daily-reports/AIGC_Daily_Report_YYYYMMDD.md`
- CODM 分支：检查 `raw/daily-reports/CODM_Competitive_Daily_YYYYMMDD.md`
- 若源文件不存在：
  - AIGC 分支 → 执行 **§2.10 AIGC 情报采集流水线**（65 信源 + 5 轮分批搜索）
  - CODM 分支 → 先执行情报收集并撰写当日竞品日报 MD

### Phase 2: 与 Wiki 编译衔接

- 如果日报还没进入知识库，先走 `ingest` 流程：
  - 创建/更新 `wiki/summaries/`
  - 更新相关 `concepts` / `entities` / `insights`
  - 更新 `index.md` 与 `log.md`
- 若用户明确只要视觉产物，可跳过重新 ingest，但要说明这是"仅生成发布物，不更新知识库"。

### Phase 3: 生成视觉产物

- 统一原则：**先读日报 MD，再生成视觉层**，不要只凭记忆或上次结果直接拼图。
- 所有非日报的生成结果默认落到 `wiki/outputs/` 作为中间层或备份层。日报卡片只存 `docs/`。
- **AIGC 分支必须同时生成 TOC 版 H5**（Soft Editorial + 侧边栏导航风格）：
  - 输出文件：`docs/ai-daily/ai-daily-card-YYYYMMDD-toc.html`
  - 参考模板：`docs/ai-daily/ai-daily-card-20260511-toc.html`
  - 侧边栏高亮色用柠檬黄 `#D6DD63`
  - 右上角必须有固定「← 返回归档」按钮

### Phase 4: 归档 + 发布 + 推送（AIGC 分支必须执行全部步骤）

**Step 4.1 — 更新归档首页**：
- 打开 `docs/ai-daily/index.html`
- 在 `const DATA = [` 数组的**最顶部**追加一条新记录：
```js
{
  type: "daily",  // 日报用 "daily"，周报用 "weekly"
  date: "YYYY-MM-DD",
  time: "09:30",
  title: "AIGC 日报 · YYYY.MM.DD",
  desc: "一句话描述当天主要内容",
  url: "ai-daily-card-YYYYMMDD-toc.html",
  tags: ["标签1", "标签2", "标签3"]
}
```

**Step 4.2 — Git Push 发布到 GitHub Pages**：
```bash
git add docs/ai-daily/
git commit -m "feat: AIGC daily YYYY.MM.DD"
git push origin main
```
- 等待 ~30 秒 GitHub Actions 自动部署
- 在线地址：`https://wangqi422.github.io/catwang-llm-wiki/docs/ai-daily/ai-daily-card-YYYYMMDD-toc.html`

**Step 4.3 — 推送企业微信群**：
```bash
node _deploy/wecom-push/push-ai-daily.js
```
- 推送内容：① Markdown 文字摘要（标题列表 + 一句话总结）→ ② H5 在线链接
- 如果 push 脚本不存在或 webhook 未配，手动提示用户

**Step 4.4 — 记录日志**：
- 更新 `log.md`
- CODM 分支：HTML 完成后继续执行 GitHub Pages 发布和企业微信推送。

---

## 2. AIGC 速报分支（原 daily-card）

### 2.1 目标

从 `raw/daily-reports/AIGC_Daily_Report_YYYYMMDD.md` 中提取 TOP N 条目，生成 **1080×1920 满屏 9:16 卡片**。

### 2.2 输出物

```text
_deploy/daily-card/
├── generate-card.js
├── screenshot.js
└── run.js

docs/ai-daily/
├── ai-daily-card-YYYYMMDD.html   # 最终 HTML（GitHub Pages 发布）
├── ai-daily-card-YYYYMMDD.png    # 最终卡片截图
└── _manifest.json

docs/ai-daily/                     # ← 日报卡片唯一存放处
├── AIGC_Daily_Report_YYYYMMDD.md
├── ai-daily-card-YYYYMMDD.html
└── ai-daily-card-YYYYMMDD.png
```

### 2.3 执行命令

```bash
node _deploy/daily-card/run.js
node _deploy/daily-card/run.js --all
node _deploy/daily-card/run.js raw/daily-reports/AIGC_Daily_Report_YYYYMMDD.md
```

### 2.4 解析规则

生成器从以下结构提取数据：

```markdown
### #N ⭐ 标题文字

| 项目 | 详情 |
|------|------|
| **主题标签** | `#Tag1` `#Tag2` |

**📝 三句话摘要**
1. 第一句...
2. 第二句...
3. 第三句...

| **加权总分** | **X.X/10** |
```

### 2.5 视觉规则

- Notion 白底风格，`Inter + Noto Sans SC`
- 所有条目必须完整落在 `1920px` 高度内
- 描述最多 `55` 字符，超出截断但不乱码
- `TOP1` 用红色强调，`TOP2-3` 用蓝紫渐变
- 评分 ≥ `8.8` 或排名第 1 的条目增加 `🔥`

### 2.6 无新闻降级策略（Fallback：TOP1 应用案例深挖）

> **触发条件**：当日 web search 后判断没有足够有新闻价值的 AI 新闻（如周末、节假日），
> 不要硬凑低质量新闻，而是切换到 **应用案例深挖模式**。

**降级流程**：

1. **读取前一天的日报 memory**（`.codebuddy/automations/aigc-2/memory.md`），找到 TOP 1 新闻主题
2. **全网搜索该主题的最佳实践 / 应用案例 / 教程**：
   - 搜索关键词：`"{TOP1主题}" best practice | use case | tutorial | workflow | 实战 | 案例 | 教程 2026`
   - 至少搜索 3 轮（中文+英文+特定平台如 YouTube/B站/知乎）
   - 优先找：实际落地案例 > 官方教程 > 社区最佳实践 > 行业分析
3. **生成日报 MD**（格式变化）：
   - 标题改为：`AIGC 每日速报 · YYYY.MM.DD · 深度专题`
   - 副标题：`🔍 深度：{TOP1主题} 全网最佳应用案例`
   - 内容结构：
     ```markdown
     ## 📌 今日专题：{TOP1 主题}
     > 承接昨日 TOP 1 热点，今天深挖全网最佳实践与应用案例

     ### #1 ⭐ 案例标题
     | 项目 | 详情 |
     |------|------|
     | **主题标签** | `#Tag1` `#Tag2` |
     | **来源** | 平台/作者 |
     | **加权总分** | **X.X/10** |

     **📝 案例摘要**
     1. 核心做法/工作流
     2. 亮点/创新点
     3. 可复用的关键技巧

     ... (至少 5 个案例)
     ```
4. **卡片生成**：使用同一套 `run.js` 生成卡片（格式兼容 `### #N ⭐` 解析规则）
5. **推送标注**：企微推送文案开头标注 `📚 今日为深度专题（非实时新闻）`

**判断标准**（是否启动降级）：
- web search 3 轮后，有价值的新闻 < 5 条 → 启动降级
- 搜索结果大部分是前几天的旧闻重复 → 启动降级
- **不要在工作日（周一至周五）轻易降级**，工作日通常有足够新闻

### 2.7 异常处理

- `Node` 不可用 → 允许仅生成 HTML 或提示安装 Node
- `Puppeteer` 截图失败 → 保留 HTML，提示手动截图
- 日报格式不符 → 列出无法解析的条目，禁止静默跳过
- **日报内容为空或条目 <3** → 告知用户日报内容不足，建议先补充后再生成卡片

### 2.9 AIGC 分支检查点

| 阶段 | 检查项 | 通过条件 | 失败动作 |
|------|--------|---------|---------|
| 解析后 | 条目数量 | ≥3 条 | 停止，提示日报内容不足 |
| HTML 生成后 | 文件存在且 >5KB | 文件可读 | 重试生成，失败则报错 |
| PNG 截图后 | 图片尺寸 = 1080×1920 | 宽高正确 | 检查 Puppeteer viewport 设置 |
| 推送前 | 预览确认（人工）或 dry_run（自动化） | 内容完整 | 自动化模式下仍推送但记录异常 |

### 2.8 AIGC 分支质量红线

1. **条目不丢失**：所有 `### #N ⭐` 条目必须出现在卡片中
2. **不溢出**：所有内容必须完整显示在单页内
3. **不留白**：卡片底部不得出现明显空白
4. **可读性**：标题完整、描述不乱码
5. **错误可恢复**：排版异常时可人工编辑 `docs/ai-daily/*.html` 后重新截图

---

### 2.10 AIGC 情报采集流水线（65 信源 · 5 轮分批搜索）

> **与 AI 周报（weekly-card）共用同一套 65 信源**，区别仅在时间窗口：
> - 周报：过去 7 天，精选 8-10 条实用干货
> - **日报：过去 24h，精选 8 条最新动态（新闻+工具+发布+重大事件）**

#### 2.10.1 扫描目标 —— 65 个 AI 信源（与周报完全同步）

**机构账号（17 个）：**
```
@OpenAI @GoogleDeepMind @nvidia @NVIDIAIAI @AnthropicAI @MetaAI
@deepseek_ai @Alibaba_Qwen @midjourney @Kimi_Moonshot @MiniMax_AI
@BytedanceTalk @DeepMind @GoogleAI @GroqInc @Hailuo_AI @MIT_CSAIL
@BMData
```

**个人账号（48 个）：**
```
@elonmusk @sama @zuck @demishassabis @DarioAmodei @karpathy @ylecun
@geoffreyhinton @ilyasut @AndrewYNg @Jeffdean @drfefei @Thom_Wolf
@danielamodei @gdb @GaryMarcus @JustinLin610 @stetepete @ESYudkowsky
@erikbryn @alliekmiller @tunguz @Ronald_vanLoon @DeepLearnt07
@nigewillson @petitegeek @YuHelenYu @TamaraMcCleary @swyx @joshwoodward
@kevinwli @petergyang @thenanyu @realmadhuuguru @catwu @trtq212
@amasad @rauchg @alexalbert__ @levie @ryolu__matturck @zarazhangrui
@nikunj @danshipper @adityaag
```

**⭐ 实战派优先扫描（6 个，先扫这批）：**
```
@zarazhangrui @danshipper @swyx @karpathy @rauchg @amasad
```

**📰 中文 AI 媒体补充源（日报专用，周报不含）：**
```
机器之心 · 量子位 · 新智元 · 36氪AI频道 · InfoQ · CSDN AI
IT之家AI · 腾讯云开发者 · 阿里云官方 · 极客公园 · 品玩
HuggingFace Blog · ArXiv Daily（仅重大论文落地） · ProductHunt（前3名AI产品）
```

#### 2.10.2 扫描方法 —— 5 轮分批 Web Search

| 轮次 | 目标 | 搜索策略 |
|------|------|----------|
| **第 1 轮** | 实战派 6 人 + 头部机构 | `(@karpathy OR @sama OR @rauchg OR @zarazhangrui OR @OpenAI OR @AnthropicAI) AI today 2026` |
| **第 2 轮** | 中国 AI 生态 | `(DeepSeek OR Qwen OR Kimi OR 智谱 OR MiniMax OR 月之暗面) 发布 OR 开源 OR 更新 今日` |
| **第 3 轮** | AI 创作工具 | `(Midjourney OR Runway OR Kling OR 可灵 OR Veo OR Sora OR 即梦 OR Hailuo) new OR update OR release` |
| **第 4 轮** | 中文 AI 媒体聚合 | `site:36kr.com OR site:jiqizhixin.com OR site:qbitai.com AI 今日` |
| **第 5 轮** | 补扫长尾 + 垂直 | `AI agent OR AI coding OR AI video generation latest news {today_date}` |

**时间过滤**：所有搜索加 `freshness=day`（仅过去 24h）。

**执行规则**：
- 每轮至少命中 2 条有价值信息，否则换关键词补搜
- 5 轮后总计应有 ≥15 条候选，再筛选出 TOP 8
- 优先取一手来源（官方博客 > 官方推文 > 媒体报道）

#### 2.10.3 筛选标准

##### ✅ 日报必含（按优先级）

| 优先级 | 类型 | 说明 |
|--------|------|------|
| **P0** | 重大发布 | 新模型发布、重大开源、产品上线（OpenAI/Anthropic/Google/DeepSeek/Qwen 等） |
| **P0** | 行业事件 | 政策/监管/收购/融资超 1 亿美元 |
| **P1** | 工具更新 | AI 创作工具新版本、新功能上线 |
| **P1** | 开源动态 | 有影响力的开源项目发布/更新 |
| **P2** | 实用教程 | 来自实战派的 Prompt/Workflow/教程（日报简报，详见周报） |
| **P2** | 趋势信号 | Agent/协议/标准/生态变化 |

##### ❌ 必须排除

- 纯学术论文（无落地应用）
- 旧闻翻炒（> 48h 的内容）
- PR 软文 / 广告
- 纯观点争论 / 预测 / 八卦
- 跑分榜单炒作（无实际能力提升说明）

#### 2.10.4 日报 MD 输出格式（固定结构）

```markdown
# AIGC 日报 | YYYY-MM-DD

> 每工作日 9:30 自动生成 | 推送时间：YYYY-MM-DD HH:MM

---

## 今日概览

| #  | 新闻标题 | 来源 | 主题标签 | 重要性 |
|----|---------|------|----------|--------|
| 1 | [标题] | [一手来源] | [tag] | X.X |
| ... | ... | ... | ... | ... |

---

### #1 ⭐ [标题]

> **来源**：[具体来源+链接] | **评分**：X.X/10 | **标签**：[tag]

#### 核心事件
[2-3 句描述]

#### 技术亮点 / 影响分析
- **要点1**：[具体信息]
- **要点2**：[具体信息]
- **要点3**：[具体信息]

#### 三句话总结
1. [核心事实]
2. [技术/行业意义]
3. [对 CODM 宣发团队的潜在价值]

---

[... 重复 8 条 ...]

## 编辑点评

[3-5 句综述，点出今日最大看点 + 对 CODM 宣发的启发]
```

#### 2.10.5 质量检查清单

- [ ] 已执行 ≥5 轮搜索（覆盖实战派/机构/中国生态/创作工具/长尾）
- [ ] 候选条目 ≥15 条，精选 TOP 8
- [ ] 每条有**一手来源**（非二手媒体转述优先）
- [ ] 8 条覆盖 ≥3 个不同主题标签（不全是同一类）
- [ ] 无旧闻（全部 < 48h）
- [ ] 每条三句话总结的第 3 句关联 CODM 宣发团队价值
- [ ] 重要性评分合理（TOP1 ≥ 9.0，TOP8 ≥ 7.5）
- [ ] 编辑点评包含对设计团队的具体建议

---

## 3. CODM 竞品分支（原 competitive-daily）

### 3.1 目标

生成 CODM 宣发设计团队的 **竞品情报日报**，包含：
1. 官方一手情报收集
2. 结构化日报 MD
3. Dark Ops 风格 HTML
4. GitHub Pages 发布
5. 企业微信群推送

### 3.2 监控对象

| 竞品 | 核心渠道 | 备注 |
|---|---|---|
| 三角洲行动 | 官方 X / YouTube / 微博 / B站 | 第一优先级 |
| 暗区突围 | 官方 X / YouTube / 微博 / B站 / TapTap | 直接竞品（手游+端游两个账号） |
| CODM / 战区手游 | 官方 X / YouTube / 微博 / B站 | 自家产品与承接窗口（端游+手游两个频道） |
| Battlefield | 官方 X / YouTube / 官网 / Steam | 大盘参考 |

#### 🔗 必监控固定频道（每日必查）

**YouTube 官方频道：**

| 频道 | 链接 | 所属游戏 | 重点关注 |
|---|---|---|---|
| Delta Force Game | https://www.youtube.com/@DeltaForceGame | 三角洲行动 | 赛季CG、宣传PV、玩法预告 |
| Call of Duty | https://www.youtube.com/@CallofDuty | 使命召唤（主品牌/端游） | 系列级CG、赛季预告、联动PV |
| Call of Duty: Mobile | https://www.youtube.com/@callofdutymobile | 使命召唤手游(CODM) | 赛季CG、联动PV、玩法预告 |

**B站官方账号：**

| 账号名 | 链接 | 所属游戏 | 重点关注 |
|---|---|---|---|
| 三角洲行动 | https://space.bilibili.com/3494376565115651 | 三角洲行动 | 国服CG首发、赛季PV、代言人视频 |
| 暗区突围 | https://space.bilibili.com/1915056903 | 暗区突围（手游） | 赛季CG、运营活动PV |
| 暗区突围无限 | https://space.bilibili.com/3546578394548722 | 暗区突围：无限（端游） | 赛季CG、周年庆PV、联动视频 |

> **强制规则**：每日情报收集时必须检查以上 6 个频道的最新动态，不可仅依赖搜索引擎。

### 3.2a 必监控情报维度（优先级排序）

以下维度按**对 CODM 宣发的直接威胁程度**排序，**代言人/品牌合作**为最高优先级：

| 优先级 | 维度 | 说明 | 搜索关键词示例 |
|---|---|---|---|
| **P0** | **代言人 / 品牌合作** | 明星/IP/导演/品牌联名官宣 | `代言人`、`品牌合作`、`联动`、`姜文`、`让子弹飞`、`MonsterVerse` |
| **P0** | **赛季/版本更新** | 大版本、新赛季、新地图上线 | `S4`、`新赛季`、`版本更新`、`上线` |
| **P1** | **IP 联动活动** | 影视/动漫/游戏跨界联动 | `联动`、`IP合作`、`古墓丽影`、`哥斯拉` |
| **P1** | **限时活动/运营事件** | 周年庆、节日活动、电竞赛事 | `周年庆`、`猛攻节`、`锦标赛`、`赛事` |
| **P2** | **新玩法/新模式** | 游戏机制创新、模式上线 | `新模式`、`新玩法`、`DMZ`、`BR` |
| **P2** | **社区/口碑动态** | 玩家迁移、评分变化、社区热议 | `玩家流失`、`评分`、`Steam评价` |

**强制规则**：
- **代言人/品牌合作信息必须收录**，无论是否已官宣多日（只要在当前周期内有新素材释放）
- 每个竞品至少覆盖 P0 + P1 维度，P2 视当日情报密度补充

### 3.2b 🎬 CG / 视频内容专项监控（新增）

> **目标**：每日检查各竞品官方频道是否发布了新的**游戏 CG / 宣传 PV / 赛季预告片 / 联动 PV**，如有则必须在日报中收录。

**触发条件**（满足任一即触发）：
- 官方 YouTube / B站频道发布了新视频（24h 内）
- 视频标题或内容涉及：CG / Cinematic / Trailer / 预告片 / PV / 宣传片 / 赛季动画 / 联动短片 / 代言人视频
- 视频时长 ≥30 秒且 ≤10 分钟（典型 CG/PV 范围）

**日报收录格式**（每条 CG/视频必须包含以下信息）：

```markdown
- 🎬 **[视频标题]**
  - 📺 链接：[YouTube/B站完整URL]
  - 🖼️ 封面：[视频封面截图描述 / 封面URL]
  - 📝 简介：[1-2句内容摘要：视频主题、核心画面、亮点]
  - ⏱️ 时长：[X分X秒]
  - 📅 发布时间：[YYYY-MM-DD]
```

**示例**：
```markdown
- 🎬 **三角洲行动「回声」赛季CG：声纹追猎**
  - 📺 链接：https://www.youtube.com/watch?v=XXXXXX
  - 🖼️ 封面：干员Morse在暴雨城市中使用声纹扫描器追踪目标，赛博朋克风格的深蓝紫色调
  - 📝 简介：S9「回声」赛季CG动画，展示新干员Morse的声纹战术能力，全片2分钟，好莱坞级CG品质
  - ⏱️ 时长：2分15秒
  - 📅 发布时间：2026-04-16
```

**强制规则**：
1. **CG/PV 内容优先级 = P0**，发现即收录，不等其他情报凑齐
2. **视频封面必须描述**：封面的主要视觉元素、色调、构图特征（供设计团队参考）
3. **链接必须是官方频道直链**，不接受搬运/二创链接
4. **自家 CODM 的 CG 也必须收录**——方便与竞品进行视觉对比分析
5. 如当日有多个竞品同时发布 CG，在日报 `📌 重点速览` 中用 `🎬` 标记提醒

### 3.3 一手来源优先级（强制）

1. 官方 **B站**（国内首发阵地，CG/PV/代言人视频常在此首发）：
   - 三角洲行动：https://space.bilibili.com/3494376565115651
   - 暗区突围（手游）：https://space.bilibili.com/1915056903
   - 暗区突围无限（端游）：https://space.bilibili.com/3546578394548722
2. 官方 **微博**（代言人/联动通常先在这发布）
3. 官方 **X(Twitter)**
4. 官方 **YouTube**（CG/Trailer 的国际首发渠道）：
   - Delta Force Game：https://www.youtube.com/@DeltaForceGame
   - Call of Duty：https://www.youtube.com/@CallofDuty
   - Call of Duty: Mobile：https://www.youtube.com/@callofdutymobile
5. 官方网站 / **Steam** / **EA**
6. 中文游戏媒体（17173、游民星空、3DM、腾讯新闻）—— **仅用于验证和补充国内专属信息**

**禁止**使用任何非官方自媒体、玩家论坛帖子作为核心来源。

**国内代言人/联动特殊规则**：
- 微博/B站 官宣优先级高于 X/YouTube
- 中文媒体（17173、游民星空）可作为一手来源的补充验证
- 搜索时必须包含中文关键词：`代言人`、`联动`、`品牌合作`

### 3.4 竞品分支输出物

```text
raw/daily-reports/CODM_Competitive_Daily_YYYYMMDD.md
docs/competitive-daily/index.html                                    # 归档目录 H5
docs/competitive-daily/competitive-daily-card-YYYYMMDD.html          # 9:16 卡片 HTML（自动生成）
docs/competitive-daily/competitive-daily-card-YYYYMMDD.png           # 9:16 卡片 PNG（1080×1920）
docs/competitive-daily/data/competitive-YYYYMMDD.json                # 结构化数据 JSON（自动提取）
docs/competitive-daily/data/competitive-index.json                   # 全量数据索引（自动维护）
_deploy/daily-card/generate-competitive-card.js                      # MD → 9:16 HTML 生成器
_deploy/daily-card/extract-competitive-data.js                       # MD → JSON 结构化数据提取器
_deploy/daily-card/run-competitive.js                                # 一键入口（MD→HTML→JSON→PNG→docs/）
_deploy/generate-competitive-archive.js                              # 归档页生成器
_deploy/wecom-push/push-competitive-daily.js                         # 企微推送（精简摘要+PNG长图）
```

### 3.4a 卡片生成命令（v2.1 — 含结构化数据提取）

```bash
# 一键生成（MD → 9:16 HTML → JSON 数据提取 → PNG → 复制到 docs/）
node _deploy/daily-card/run-competitive.js
node _deploy/daily-card/run-competitive.js --date 20260416

# 仅生成 HTML（不截图、不提取数据）
node _deploy/daily-card/generate-competitive-card.js --date 20260416

# 仅提取结构化数据 → JSON
node _deploy/daily-card/extract-competitive-data.js --date 20260416

# 回补所有历史日报数据（含汇总统计）
node _deploy/daily-card/extract-competitive-data.js --all
```

**JSON 数据字段**（`docs/competitive-daily/data/competitive-YYYYMMDD.json`）：

| 字段 | 说明 | 来源 |
|---|---|---|
| `meta` | 日期、星期、提取时间、版本 | 文件名 |
| `overview` | 今日概览全文 | `## 📊 今日概览` 后段落 |
| `highlights[]` | 重点速览（含 priority 评分） | `📌 重点速览` 列表 |
| `competitors[]` | 竞品详情（含威胁等级、要点、宣发节奏、来源） | 各竞品 `## ` 板块 |
| `competitors[].threatLevel` | `high` / `medium` / `low` / `self` | 直接解析 `**威胁等级：🔴 高**` 行 |
| `competitors[].threatReason` | 威胁原因（如"P0代言人官宣+双IP"） | `— 原因描述` |
| `competitors[].tempo` | 宣发节奏一句话 | `宣发节奏：` 行 |
| `intensityTable[]` | 宣发强度对比表（含评分 1-5） | `## 📊 宣发强度对比` 表格 |
| `insights[]` | 运营洞察（含 CODM 启示） | `## 💡 运营洞察` 板块 |
| `stats` | 聚合统计（威胁分布、强度评分等） | 自动计算 |

**卡片规格**：
- **尺寸**：1080×1920 px（9:16 竖屏，与 AIGC 速报一致）
- **风格**：Dark Ops（`#0D0D0D` 背景 + `#FFE600` 强调色）
- **内容结构**：Cover → 概览 → 威胁条 → 竞品卡片（精简 2 条 highlight）→ 宣发强度对比 → **CODM 运营启发**（重点板块）→ Footer
- **CODM 运营启发**：从 MD 的 `💡 运营洞察` → `对 CODM 的启示` 自动提取，是卡片底部的重点黄色框

### 3.5 MD 固定结构（v3.1 — 横向精简+纵向完整）

> **核心理念**：横向对比负责「秒扫全局」，纵向详情负责「看细节」。
> 横向表格只用关键词（3列），不重复纵向已有的长描述。两个板块各司其职、不冗余。

```markdown
🗓️ 竞品日报 · YYYY年M月D日

## 📊 今日概览
[一段话全景综述，100-150字，加粗最关键结论]

📌 重点速览
- 🔥🔥🔥 [最高威胁：关键词级别一句话]
- 🔥🔥🔥 [高威胁]
- 🔥🔥 [高关注]
- 🔥 [值得注意]

---

## 🔀 横向维度对比

### 🎬 IP联动 / 代言人

| 竞品 | 核心牌面 | 影响力 |
|---|---|---|
| 三角洲行动 | [关键词] | ⭐×N |
| CODM | [关键词] | ⭐×N |
| 暗区突围 | [关键词] | ⭐×N |
| BF6 | [关键词] | ⭐×N |

> 🔍 [一句话横向洞察，点出谁赢、CODM怎么打]

---

### 📅 赛季节奏

| 竞品 | 赛季/阶段 | 下一节点 |
|---|---|---|
| ... | ... | ... |

> 🔍 [一句话横向洞察]

---

### 💰 福利策略

| 竞品 | 核心福利 | 策略 |
|---|---|---|
| ... | ... | ... |

> 🔍 [一句话横向洞察]

---

## 📊 宣发强度对比

| 竞品 | 强度 | 核心手段 |
|---|---|---|
| ... | ⭐×N | ... |

---

## 🔽 竞品详情

### 🎯 三角洲行动（Delta Force）

**威胁等级：🔴/🟡/🟢 高/中/低 — [原因]**

- 🔥🔥🔥 [要点完整描述]
- 🔥🔥 [要点]
- [常规要点]

宣发节奏：[一句话总结]

来源:
- [URL]

---

[... 其他竞品同结构 ...]

---

🎬 视频/CG 动态（如有新视频发布）
> 以下为当日各竞品官方频道发布的新 CG / PV / 宣传片

- 🎬 **[视频标题]**（[竞品名]）
  - 📺 链接：[YouTube/B站完整URL]
  - 🖼️ 封面：[封面画面描述]
  - 📝 简介：[1-2句内容摘要]
  - ⏱️ 时长：[X分X秒]
  - 📅 发布时间：[YYYY-MM-DD]

---

## 💡 运营洞察
### N. [洞察标题 — 结合横向纵向分析]

[洞察正文：引用横向对比结论+纵向详情数据]

**对 CODM 的启示**
- [可执行建议1]
- [可执行建议2]
```

**横向维度表格规则（v3.1 精简）**：
- **固定 3 列**：竞品 / 核心信息（关键词级别，≤15字）/ 评估或下一节点
- 横向洞察用 `> 🔍` 引用格式，**一句话**，不要长段落
- 横向表格中**禁止**出现纵向详情里已有的完整描述，只提关键词

**横向维度选择规则**（每日至少 2 个，按当日情报密度选择）：

| 维度 | 何时启用 | 3列格式 |
|---|---|---|
| 🎬 IP联动/代言人 | 任一竞品有IP/代言人动态时 **必选** | 竞品 / 核心牌面 / 影响力 |
| 📅 赛季/版本节奏 | 常驻维度，每日必选 | 竞品 / 赛季阶段 / 下一节点 |
| 💰 福利/付费策略 | 任一竞品有福利/促销时启用 | 竞品 / 核心福利 / 策略 |
| 🎮 玩法/模式创新 | 任一竞品有新模式上线时启用 | 竞品 / 新模式 / 差异化 |
| 🏆 电竞/赛事 | 任一竞品有赛事动态时启用 | 竞品 / 赛事 / 关注度 |
| 📱 社区/口碑 | 出现舆论事件或评分变化时启用 | 竞品 / 事件 / 趋势 |

**强制规则**：
- 横向对比表在纵向详情之前，先全局扫再看细节
- 横向洞察用 `> 🔍` 引用格式，一句话
- 横向和纵向**不重复同一段描述**——横向给关键词，纵向给完整信息

### 3.6 HTML 渲染规则（v3.1 — 精简横向+完整纵向卡片版）

- **尺寸**：1080px 宽 × 高度自适应（约 2100-2300px）
- 背景：`#0D0D0D`，强调色：`#FFE600`
- **内容结构**（按顺序）：
  1. **Cover** — 标题 + 日期
  2. **概览** — 一段话全景
  3. **🔀 横向维度对比** — 每个维度一个精简 3 列对比表 + `> 🔍` 一句话洞察
  4. **宣发强度对比条** — 条形图样式
  5. **🔽 竞品详情** — 每竞品卡片（2-3 条 highlight + 威胁等级条）
  6. **CODM 运营启发** — 从 `💡 运营洞察` → `对 CODM 的启示` 提取（黄色框重点区）
  7. **Footer**
- **横向对比表样式**：精简 3 列，`#141414` 卡片背景，品牌色左边框
- **横向洞察框**：`border-left: 3px solid #FFE600` + `> 🔍` 引用格式

### 3.7 发布与推送

#### 卡片生成 + 截图

```bash
# 一键：MD → HTML → PNG → docs/
node _deploy/daily-card/run-competitive.js --date YYYYMMDD
```

#### GitHub Pages

```bash
node _deploy/generate-competitive-archive.js
git add docs/competitive-daily/index.html
git add docs/competitive-daily/competitive-daily-card-YYYYMMDD.html
git add docs/competitive-daily/CODM_Competitive_Daily_YYYYMMDD.md
git commit -m "daily: CODM competitive card YYYYMMDD"
git push origin main
```


公网链接格式：

```text
https://wangqi422.github.io/catwang-llm-wiki/docs/competitive-daily/competitive-daily-card-YYYYMMDD.html
```

#### 企业微信推送（v2.0 — 精简摘要 + 9:16 PNG）

```bash
# 预览推送内容（不实际发送）
node _deploy/wecom-push/push-competitive-daily.js --date YYYYMMDD --dry-run

# 正式推送（Markdown 精简摘要 + PNG 长图）
node _deploy/wecom-push/push-competitive-daily.js --date YYYYMMDD
```

**推送内容结构**（精简版，≤4096 字节）：
1. 标题 + 日期
2. 概览一句话（≤150 字）
3. **📌 今日速览**（从 `📌 重点速览` 提取，最多 4 条，含🔥优先级标记）
4. 竞品动态（每个竞品：名称 + 直接解析的威胁🔴🟡🟢 + 1 句核心）
5. **CODM 运营启发**（2-3 条，`<font color="warning">` 高亮）
6. GitHub Pages 完整日报链接
7. 紧接着发送 9:16 PNG 长图卡片（280KB 左右）

### 3.8 竞品分支质量红线

1. **链接必须是一手来源**
2. **每个核心竞品至少有一条有效更新或明确写"暂无新动态"**
3. **代言人/品牌合作信息必须出现在日报中**（无论是否已官宣多日，只要有新素材释放）
4. **设计参考必须站在 CODM 宣发视角，不是新闻复述**
5. **企业微信推送内容必须 ≤4096 字节**
6. **HTML 视觉必须保持 CODM Dark Ops 风格一致**
7. **CODM 运营启发必须出现在卡片和推送摘要中**
8. **CG/PV 视频收录必须完整**：当日官方频道新发布的 CG/PV 必须收录（含链接+封面描述+简介），不可遗漏

### 3.9 竞品分支检查点

| 阶段 | 检查项 | 通过条件 | 失败动作 |
|------|--------|---------|---------|
| 情报收集后 | 核心竞品覆盖度 | 每个竞品有内容或"暂无" | 补充搜索缺失竞品 |
| 情报收集后 | 6 个固定频道检查 | 每个频道已查看最新动态 | 逐一补查遗漏频道 |
| 情报收集后 | CG/PV 收录完整性 | 当日新发 CG 全部收录（含链接+封面+简介） | 回查频道补充遗漏视频 |
| MD 生成后 | 结构完整性 | 含重点速览 + 竞品分区 + 运营洞察 + 视频板块（如有） | 补充缺失章节 |
| HTML → PNG 后 | 卡片尺寸 + 运营启发板块 | 1080×1920 + 黄色框存在 | 检查 generate-competitive-card.js |
| 推送前 | Markdown 长度 | ≤4096 bytes | 精简摘要再推送 |

---

## 4. 执行清单（LLM 速查）

### AIGC 速报

- [ ] 确认目标日报存在
- [ ] 如有必要先执行 `ingest`
- [ ] 运行 `_deploy/daily-card/run.js`
- [ ] 检查 `docs/ai-daily/*.html` 与 `*.png`
- [ ] 记录 `log.md`

### CODM 竞品

- [ ] 确认今天是否已有 `CODM_Competitive_Daily_YYYYMMDD.md`
- [ ] 如无则先做情报收集并撰写 MD
- [ ] 检查 6 个固定频道（3 YouTube + 3 B站）的最新动态
- [ ] 如有新 CG/PV 发布，按规范格式收录（链接+封面描述+简介）
- [ ] 如有必要先执行 `ingest`
- [ ] 生成 9:16 卡片 + 数据提取：`node _deploy/daily-card/run-competitive.js --date YYYYMMDD`
- [ ] 检查 `docs/competitive-daily/data/competitive-YYYYMMDD.json` 数据完整性
- [ ] 检查 `docs/competitive-daily/*.html` 与 `*.png`（280KB 左右）
- [ ] 预览 PNG 卡片
- [ ] Dry-run 推送：`node _deploy/wecom-push/push-competitive-daily.js --date YYYYMMDD --dry-run`
- [ ] 正式推送：`node _deploy/wecom-push/push-competitive-daily.js --date YYYYMMDD`
- [ ] 记录 `log.md`

---

## 5. 与其他 Skill 的关系

- `ingest`：日报进入知识库的标准编译入口
- `publish`：可把日报进一步转成展示型长文
- `darwin`：可继续优化日报类 Skill 或相关 Prompt
- `design-style`：竞品日报 HTML 的风格规则可从品牌设计系统中继续抽象
