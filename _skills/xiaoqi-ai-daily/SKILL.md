---
name: xiaoqi-ai-daily
description: 小柒 AI 日报（AIGC Daily）端到端发布流水线。当用户提到「AI日报」「AIGC日报」「今日AI」「跑日报」「发日报」「补发日报」「AI daily」「日报海报」「推日报到群」时触发。覆盖五阶段全链路：8 轮 65 信源采集（含 AI HOT 聚合源）→ P0/P1/P2 筛选写 MD → 生成 Soft Editorial + TOC 侧边栏 H5 卡片 + 更新归档首页 → 强制 URL 200校验（含 404 五步修复流程）→ 生成 3:4 海报并以 markdown_v2 单条消息（海报图 + 「点击看更多内容」链接）推送到企微双群。仓库为 catwang-llm-wiki，日常执行只需跑 publish-ai-daily-poster.js 一条龙脚本。
description_zh: 小柒 AI 日报全流程
description_en: Xiaoqi AI Daily pipeline
disable: false
agent_created: true
---

# 小柒 AI 日报（AIGC Daily）发布流水线

**仓库根目录**：`<repo>`（小柒本机为 `E:\catwang-llm-wiki`）
**自动化**：每日 09:30 全自动执行（automation id `automation-1778516139956`）
**目标群**：企微双群（`config.json` → `aiDailyWebhooks`）

---

## When to use

触发词（任一命中即加载本skill）：

- 「AI 日报」「AIGC 日报」「今日 AI」「AI daily」
- 「跑日报」「发日报」「补发日报」「重发日报」
- 「日报海报」「推日报到群」「日报推送」
- 用户询问 AI 日报的流程、信源、推送方式
- 自动化任务在09:30 触发 AIGC 日报

**不适用**：CODM 竞品日报（走 `_skills/daily-card.md` 的 CODM 分支）、AI 干货周报（走 `weekly-card`）。

---

## 快速通道（90% 场景用这个）

日报 MD 已存在，只要出海报 + 推群：

```bash
cd <repo>

# 1) 预检（强烈建议先跑，webhook 已发消息无法撤回）
node _deploy/wecom-push/publish-ai-daily-poster.js --date YYYYMMDD --dry

# 2) 实发（生成海报 → 截图 → git push → 等 Pages → 推双群）
node _deploy/wecom-push/publish-ai-daily-poster.js --date YYYYMMDD
```

从零跑全流程（无 MD）→ 走下面五阶段。

---

##五阶段完整流程

### 阶段 1 · 情报采集（8 轮搜索）

信源：**65 个 X 账号 + 1 个聚合源**。所有搜索加 `freshness=day`（仅过去 24h）。

| 轮次 | 目标 | 关键点 |
|---|---|---|
| **第 0 轮** | AI HOT 聚合池 | `https://aihot.virxact.com/all` → `?mode=all&since=<24h前>&take=100`，**必须带浏览器 UA**（nginx UA 黑名单会 403，别误判接口挂了）。详见已装的 `aihot` skill |
| 第 1 轮 | 实战派 + 头部机构 | `@karpathy @sama @rauchg @zarazhangrui @OpenAI @AnthropicAI` |
| 第 2 轮 | 中国 AI 生态 | DeepSeek / Qwen / Kimi / 智谱 / MiniMax / 月之暗面 |
| 第 3 轮 | AI 创作工具 | Midjourney / Runway /可灵 / Veo / Sora / 即梦 / Hailuo |
| 第 4 轮 | 中文媒体 | `site:36kr.com OR site:jiqizhixin.com OR site:qbitai.com` |
| 第 5 轮 | 长尾垂直 | AI agent / AI coding / AI video generation |
| 第 6 轮 | GitHub + HN | GitHub Trending（日增 star ≥50）、HN（score ≥50） |
| 第 7 轮 | arXiv + Reddit | r/MachineLearning、r/LocalLLaMA |

**通过条件**：8 轮后候选 ≥25 条。每轮至少命中 2 条，不够换关键词补搜。
**信源优先级**：官方博客 > 官方推文 > 媒体报道。

完整 65 信源账号清单见 `_skills/daily-card.md` §2.10.1。

**降级策略**（周末/节假日新闻不足）：
- 触发：3 轮后有价值新闻 < 5 条，或结果大部分是旧闻重复
- 动作：切「TOP1 应用案例深挖模式」——读前一天 TOP1 主题，全网搜最佳实践/案例/教程（≥3 轮，中英文+ YouTube/B站/知乎），产出 ≥5 个案例
- 标题改`AIGC 每日速报 · YYYY.MM.DD · 深度专题`，推送文案开头标 `📚 今日为深度专题（非实时新闻）`
- **工作日（周一至周五）不轻易降级**

### 阶段 2 · 筛选 + 写日报 MD

**优先级**：
- **P0** — 重大发布（新模型/重大开源/产品上线）、行业事件（政策/监管/收购/融资 >1 亿美元）
- **P1** — 工具更新、开源动态
- **P2** — 实用教程（实战派 Prompt/Workflow）、趋势信号（Agent/协议/标准）

**必须排除**：纯学术论文（无落地）、>48h 旧闻、PR 软文/广告、纯观点争论/预测/八卦、跑分榜单炒作

**输出**：`raw/daily-reports/AIGC_Daily_Report_YYYYMMDD.md`

结构 = 今日概览表（8 行：`| # | 新闻标题 | 来源 | 主题标签 | 重要性 |`）+ 8 条详情：

```markdown
### #1⭐ [标题]

> **来源**：[具体来源+链接] | **评分**：X.X/10 | **标签**：[tag]

#### 核心事件
[2-3 句描述]

#### 技术亮点 / 影响分析
- **要点1**：...
- **要点2**：...
- **要点3**：...

#### 三句话总结
1. [核心事实]
2. [技术/行业意义]
3. [对 CODM 宣发团队的潜在价值]   ← 第3 句必须落到这里
```

海报生成器依赖概览表解析，**表格格式不能改**。

### 阶段 3 · H5 卡片 + 归档页

1. 生成 `docs/ai-daily/ai-daily-card-YYYYMMDD-toc.html`
   - 样式参考 `docs/ai-daily/ai-daily-card-20260511-toc.html`（Soft Editorial + TOC 侧边栏）
   - 侧边栏柠檬黄高亮，右上角加返回归档按钮
   - `<p class="lead">` 副标题会被海报生成器读取，必须写
2. 更新 `docs/ai-daily/index.html` 归档首页（DATA 数组顶部追加条目）
3. `git push origin main`

> ⚠️ **绝对不要跑 `_deploy/daily-card/run.js`** ——旧逻辑会在截图后删除 `docs/ai-daily/ai-daily-card-*.html`，可能误删 TOC 版 H5。

### 阶段 4 · URL 校验（强制关卡，不过不准推）

用 `WebFetch` 访问 H5 在线链接，**必须 HTTP 200**：

```
https://wangqi422.github.io/catwang-llm-wiki/docs/ai-daily/ai-daily-card-YYYYMMDD-toc.html
```

404 → 按顺序排查，每步后重新验证：

1. `git fetch origin && git log --oneline origin/main -3` —— 确认远程有最新 commit
2. `gh run list --workflow "Deploy to GitHub Pages" --limit 3` —— 看部署状态，排队中就 `gh run watch <RUN_ID>`
3. `git submodule status` —— **最常见 404 根因**。症状：workflow 日志有 `fatal: No url found for submodule path` 或 checkout exit 128。修复：`git rm --cached <路径> && rm -rf .git/modules/<名称>`
4. `gh api repos/wangqi422/catwang-llm-wiki/pages --jq '{build_type, source}'` —— 应为 `build_type: workflow`, `source path: /`
5. `gh api repos/wangqi422/catwang-llm-wiki/pages/builds --method POST` —— 强制 rebuild
6. 仍失败 → **不推送**，记异常日志并通知用户手动检查

### 阶段 5 · 海报生成 + 推双群

```bash
cd <repo>
node _deploy/wecom-push/publish-ai-daily-poster.js --date YYYYMMDD --dry   # 预检
node _deploy/wecom-push/publish-ai-daily-poster.js --date YYYYMMDD# 实发
```

一条龙脚本内含 5 步：
1. `generate-poster.js --date YYYYMMDD --ratio 3:4` → 1440×1920 海报 HTML
2. `screenshot-poster.js --html docs/ai-daily/ai-daily-poster-YYYYMMDD.html` → PNG（自动嗅探 body 尺寸）
3. `git add/commit/push`（`gh auth token` 注入，绕过 `/dev/tty` 密码交互）
4. 轮询等 GitHub Pages 就绪（8s 间隔，最多 3 分钟）
5. 推送 `aiDailyWebhooks` 全部群，群间隔 800ms

**固定消息格式**（一条 `markdown_v2`，约 209/4096 字节，**不要改**）：

```markdown
![](https://wangqi422.github.io/catwang-llm-wiki/docs/ai-daily/ai-daily-poster-YYYYMMDD.png)

[点击看更多内容](https://wangqi422.github.io/catwang-llm-wiki/docs/ai-daily/ai-daily-card-YYYYMMDD-toc.html)
```

群里呈现：海报图片直接渲染，下方一行蓝色可点击链接跳 H5 全文。

**海报设计DNA（必须与 H5 卡片同源，2026-08-07 用户拍板）**：
- 暖纸底 `#F2EEDF` + 暖棕墨 `#2A241B`
- 四色系：粉 `#E1A4C2` / 黄 `#D6DD63` / 桃 `#E8C9B6` / 绿 `#B7C7A8`
- 半透白卡 `rgba(255,255,255,0.55)`
- Cormorant Garamond italic 做序号；四色圆点 swatches +彩色 data chips
- Hero 用粉色底强调区，tagline 用 `paper-2` 底圆角卡片
- **被否过的方向**：白底 + 玫红大数字（"封面不好看"）、8 条等宽彩卡（"条纹太多"）

### 阶段 6 · 收尾

更新 `log.md`。总结里报告：8 条标题、H5 链接、海报路径、推送成功的群数量。

---

## 常用命令速查

```bash
cd <repo>

# 单独生成海报（不推送）
node _deploy/daily-card/generate-poster.js --date YYYYMMDD --ratio 3:4
node _deploy/daily-card/screenshot-poster.js --html docs/ai-daily/ai-daily-poster-YYYYMMDD.html

# 单独推送（海报已 push过）
node _deploy/wecom-push/push-poster.js --date YYYYMMDD --dry
node _deploy/wecom-push/push-poster.js --date YYYYMMDD

# 只推一个群
node _deploy/wecom-push/push-poster.js --date YYYYMMDD --group "群 A"

# Pages挂了 → base64 直传（两条消息，不依赖公网 URL）
node _deploy/wecom-push/push-poster.js --date YYYYMMDD --mode split

# 海报已 push 过，一条龙只补推群
node _deploy/wecom-push/publish-ai-daily-poster.js --date YYYYMMDD --skip-git

# 16:9 横版海报（PPT 首页用）
node _deploy/daily-card/generate-poster.js --date YYYYMMDD --ratio 16:9
node _deploy/daily-card/screenshot-poster.js --html docs/ai-daily/ai-daily-poster-YYYYMMDD-16x9.html
```

**push-poster.js 参数**：`--date` / `--mode md2|split` / `--dry` / `--group "群名"` / `--no-wait` / `--png <本地路径>` / `--pngurl <公网URL>` / `--url <H5链接>` / `--text "自定义文案"`

---

## Webhook 凭据配置（安全）

⚠️ **仓库是 public 的，`config.json` 里只放占位符，绝不能填真实 key**（任何人拿到 key 就能往群里发消息）。

凭据解析走 `_deploy/wecom-push/resolve-webhooks.js`，优先级：

| 优先级 | 来源 | 适用场景 |
|---|---|---|
| 1 |环境变量 `WECOM_AI_DAILY_KEYS="key1,key2"` | CI / 自动化 |
| 2 | `config.local.json`（已 gitignore） | 本机日常（当前用这个） |
| 3 | `config.json` | 仅当值不是 `YOUR_*` 占位符时才生效 |

**本机配法**（`_deploy/wecom-push/config.local.json`）：

```json
{
  "aiDailyWebhooks": [
    { "name": "群 A", "url": "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=真实key" },
    { "name": "群 B", "url": "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=真实key" }
  ]
}
```

`--dry` 预检会打印「凭据来源」和脱敏后的 key（只显示前 8 位），可用来确认读的是哪份配置。未解析到凭据时脚本会打印三种配法引导并退出。

---

## Pitfalls

**推送相关**：
- **`msgtype=image` 走 base64 + md5 直传，不经过 `upload_media`** —— 最容易踩的坑，曾在upload_media 里绕了半天
- `upload_media` 只支持 `type=file`（`type=image` 得 40004）；拿 file 的 media_id 发 image 消息得 40009
- **不要用 `msgtype=file` 发图** —— 群里显示成灰色文件附件要点开下载，观感差
- `markdown_v2` 不支持 `<font color>` 和 `@群成员`；旧版 `markdown` 不支持 `![](url)` 图片语法
- `markdown_v2` 在客户端 < 4.1.36（安卓 < 4.1.38）会降级为纯文本
- webhook 频率限制 **≤ 20 条/分钟**；**已发消息无法撤回**，务必先 `--dry`
- **"发我看看" ≠ "发群里"** —— 用户说"先发我测试"是要在对话窗口预览（Read + present_files），不是推群。推群前必须先展示预览并等确认

**脚本相关**：
- puppeteer 装在 `_deploy/` 和仓库根目录，**其他目录 require 会 MODULE_NOT_FOUND**
- puppeteer 启动必须带 `--no-sandbox --disable-setuid-sandbox`（Windows 下否则起不来，已内置）
- Playwright 在此环境不可用（进程被静默拦截，无 stdout/stderr，退出码 1）—— 用仓库自带 puppeteer
- `git push` 报 `could not read Username`（`gh` 已登录也会）→ credential-helper 找不到 `/dev/tty`。绕过：
  ```bash
  GH_TOKEN=$(gh auth token) && git -c "url.https://x-access-token:${GH_TOKEN}@github.com/.insteadOf=https://github.com/" push origin main
  ```
- **`git push` 输出被 shell 吞掉**（2026-08-07 新发现）：push 后 stdout/stderr 全空、连后面的 `echo` 都没输出、退出码 1，但**实际可能已推送成功**。
  - 不要信 push 的返回码，用 `gh api` 验证真实状态：
    ```bash
    gh api repos/wangqi422/catwang-llm-wiki/commits/main --jq '.sha[0:7]'   # 远端
    git rev-parse --short HEAD                # 本地
    ```
  - Bash 反复失败时改用 PowerShell 工具执行 push（实测有效）
  - 加 `| grep -v libpng` 过滤噪音反而更容易触发输出被吞，先看完整输出再过滤

**数据相关**：
- 海报副标题取 TOC HTML 的 `<p class="lead">`（MD 里只有 `>` 引用行，不可靠）
- MD 概览表格格式不能改，海报生成器依赖它解析
- 日报条目 <3 条 → 停止，提示内容不足

---

## Verification

推送前逐项确认：

| 检查项 | 通过条件 |
|---|---|
| 候选新闻数| 8 轮后 ≥25 条，最终筛出 8 条 |
| 日报 MD | 存在且有完整概览表 + 8 条详情 |
| H5 HTML | 文件存在且 >5KB，`<p class="lead">` 有内容 |
| 归档首页 | `docs/ai-daily/index.html` DATA 数组已追加今日条目 |
| **H5 在线 URL** | **WebFetch 返回 200**（不过不准推） |
| 海报 PNG | 1440×1920，文件存在，通常 400-500KB |
| 海报公网 URL | curl HEAD 返回 200 |
| 推送预检 | `--dry` 输出正常，content≤4096 字节，目标群数 = 2 |
| 推送结果 | 每个群返回 `errcode: 0` |

---

## 相关文件

| 路径 | 作用 |
|---|---|
| `_deploy/wecom-push/publish-ai-daily-poster.js` | ★ 一条龙发布脚本 |
| `_deploy/wecom-push/push-poster.js` | 多群推送（md2 / split） |
| `_deploy/wecom-push/config.json` | `aiDailyWebhooks` 群配置 |
| `_deploy/daily-card/generate-poster.js` | 海报 HTML 生成（3:4 / 16:9） |
| `_deploy/daily-card/screenshot-poster.js` | Puppeteer 截图（自动嗅探尺寸） |
| `_skills/daily-card.md` | 仓库内详细 skill（65 信源清单、MD 格式、历史坑位） |
| `raw/daily-reports/AIGC_Daily_Report_*.md` | 日报源文件 |
| `docs/ai-daily/` | H5 卡片 + 海报 + 归档首页 |
