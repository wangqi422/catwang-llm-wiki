---
title: AI 干货周报生成与推送
type: skill
created: 2026-04-20
updated: 2026-04-20
tags:
  - aigc
  - skill
  - automation
---

# Skill · AI 干货周报（AI Practical Weekly）

> 每周一早上自动扫描 **65 个顶级 AI Builder / 官方账号** 的近 7 天公开推文，筛选出**立刻能用的工具、工作流改进和可复用方法论**，产出三板块周报 MD + 苹果白底 1080×长图 PNG，推送到企业微信群。
> **专为 AI 内容创作者 / CODM 宣发设计团队设计**：只看实用干货，跳过极客技术细节。落款：**小柒AI速递**。

**触发词**：`ai-weekly` / `AI 周报` / `干货周报` / `生成周报` / `推送周报` / `weekly-card` / `小柒AI速递`

**参考模板（唯一正确版式）**：`docs/ai-daily/ai-weekly-card-20260419-v2.html`（Apple 白底长图版 · 完整 CSS 设计系统见 §2.2）

---

## 1. 输出产物

| 产物 | 路径 | 用途 |
|------|------|------|
| 周报 MD | `raw/daily-reports/AI_Practical_Weekly_Report_<SUN_DATE>.md` | 完整结构化周报（3 板块 8-10 条） |
| 周报 HTML | `docs/ai-daily/ai-weekly-card-<SUN_DATE>.html` | 1080 宽 Apple 白底长图网页（v2 唯一版式） |
| 周报 PNG | `docs/ai-daily/ai-weekly-card-<SUN_DATE>.png` | 1080×auto @ 2x 高清长图（企微推送） |

> `<SUN_DATE>` = 周期末日（上周日）YYYYMMDD。周一触发时 `SUN_DATE = 昨天`。
> 例：2026-04-20（周一）运行 → `<SUN_DATE>=20260419`，周期 = 2026-04-13 ~ 2026-04-19。

---

## 2. 流水线 6 Phase

### Phase 1 · 65 信源扫描 & 干货筛选（核心）

#### 2.1.1 扫描目标 —— 65 个 AI 信源

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

> ⭐ **实战派优先扫描账号**（干货密度最高，先扫这 6 个）：
> `@zarazhangrui` `@danshipper` `@swyx` `@karpathy` `@rauchg` `@amasad`

#### 2.1.2 扫描方法 —— 分批 Web Search

使用 `web_search` / `googleSearch` 工具：

| 参数 | 取值 |
|------|------|
| 时间范围 | `freshness=week`（过去 7 天） |
| 分批大小 | 每批 10-15 个账号 |
| 关键词 | `tool` / `workflow` / `method` / `tutorial` / `prompt` / `tip` / `guide` / `framework` |
| 查询模板 | `(from:@account1 OR from:@account2 OR …) (tool OR workflow OR prompt OR tutorial)` |
| 补充源 | 若 X 原文搜不到，可用 `account_name "keyword" site:x.com OR site:twitter.com past week` |

**执行顺序建议**（≥ 5 轮）：
1. 🎯 实战派 6 人（`@zarazhangrui` 等）
2. 机构官方 17 个（分 2 批）
3. 个人账号前半 24 个
4. 个人账号后半 24 个
5. 按关键词补扫（`"workflow" past week`、`"new prompt" past week` 等）

#### 2.1.3 筛选标准 —— P1/P2/P3 必含 + 红线必排

##### ✅ 必须包含（P1/P2/P3）

**Priority 1 · 立刻能用（Immediately Usable）**
- 工具、插件或应用，能解决实际问题
- 分步教程或指南
- 验证过确实有效的 Prompt 模板
- 开源、免费或高性价比的刚需 AI 产品

**Priority 2 · 工作流改进（Workflow Improvement）**
- 跨工具的自动化整合方案（Zapier / Make / n8n 联动 AI 模型实操）
- 显著提效降本的真实个人 / 企业案例，含具体步骤
- 创作者日常任务的 AI 化改造：文案、视频剪辑、配音、绘图、数据处理

**Priority 3 · 可复用方法论（Reusable Methodologies）**
- 结构化 Prompt 编写框架或思维导图
- 解决特定场景难题的新思路（幻觉控制 / 长文本 / 多模态一致性）
- 对现有优质 AI 产品的逆向工程或创新用法拆解

##### ❌ 必须排除（硬红线，一条都不能上）

- 纯学术论文、模型架构推演、底层算法解析（如 Attention 机制细节）
- 缺乏实操价值的财报、融资、人事变动、PR 软文
- AI 行业八卦、空洞未来预测、情绪化观点争论（如"AI 毁灭人类"）
- 只有炫酷演示但**未开放 / 未开源**的"期货"产品
- Benchmark 跑分 / 榜单炒作
- CODM / 游戏宣发设计组用不上的纯技术背景信息

#### 2.1.4 三板块重写 —— 信息降噪 + 通俗中文

对筛选出的高价值条目，翻译成**通俗易懂的中文**，按三板块分类：

##### 🛠️ 实用工具箱 (Tools & Apps)
每条必含字段：
- **名称与一句话简介**：是什么、解决什么痛点
- **获取方式**：官方链接 / 访问路径
- **上手建议**：适合什么人群、最快使用路径（Step 1-3）
- **Source**：`*Source: @用户名*`

##### ⚡ 高效工作流 (Workflows & Hacks)
每条必含字段：
- **痛点场景**：传统方式的痛点
- **AI 解决路径**：Step-by-step 的工具组合或操作步骤
- **预期效果**：节省的时间 / 提升的质量估算
- **Source**：`*Source: @用户名*`

##### 🧠 方法论与 Prompt (Methods & Prompts)
每条必含字段：
- **核心理念**：一句话解释方法论的核心
- **Prompt 模板**：可直接 Copy/Paste，占位符用 `[括号]`
- **实战案例**：展示具体输入 vs 输出对比
- **Source**：`*Source: @用户名*`

#### 2.1.5 输出规范（硬性）

| 规范 | 要求 |
|------|------|
| 条数 | **精选 8-10 条**（宁缺毋滥，不凑数） |
| 语气 | 客观、专业、接地气，"说人话"，避免形容词堆砌 |
| 排版 | 严格 Markdown，善用**粗体**提取关键字，保证移动端阅读 |
| 出处 | 每条末尾标注 `*Source: @账号*` |
| 落款 | 文件开头 `## 作者\n小柒AI速递` |

#### 2.1.6 MD 文件结构（严格遵守）

```markdown
# AI 干货周报 · YYYY.MM.DD - YYYY.MM.DD

> 自动扫描 65 个顶级 AI Builder / 官方账号的近 7 天公开信号，
> 只筛选立刻能用的工具、工作流与方法论。

## 作者
小柒AI速递

## 本期先说结论
这周是名副其实的「XX 周」：……
本期精选 N 条，每一条都今天能试。

## 🛠️ 实用工具箱 (Tools & Apps)

### 1. 标题
……正文……
*Source: @account*

### 2. 标题
……

## ⚡ 高效工作流 (Workflows & Hacks)

### N. 标题
……

## 🧠 方法论与 Prompt (Methods & Prompts)

### N. 标题
……
```

- **输出位置**：`raw/daily-reports/AI_Practical_Weekly_Report_<SUN_DATE>.md`

---

### Phase 2 · HTML 卡片生成（v2 长图版 — 唯一正确版式）

> ⚠️ **唯一正确版式 = v2 长图版**（`ai-weekly-card-YYYYMMDD-v2.html`）。
> 不要使用 Notion 风格的固定 1080×1920 版（那是旧版，已弃用）。
> 参考模板：`docs/ai-daily/ai-weekly-card-20260419-v2.html`

#### 2.2.1 设计系统总览 — Apple 白底 + Claude Design System

| 属性 | 取值 |
|------|------|
| **画板** | 宽度 `1080px`，高度**自适应**（不固定，典型 4000-5500px） |
| **主背景** | `#f5f5f7`（Apple 灰白） |
| **卡片底色** | `#fff`（纯白） |
| **边框色** | `#e5e5ea` |
| **主文字色** | `#1d1d1f` |
| **次文字色** | `#424245`（正文）/ `#6e6e73`（描述）/ `#86868b`（辅助） |
| **字体栈** | `-apple-system, BlinkMacSystemFont, "SF Pro Display", "PingFang SC", "Helvetica Neue", Arial, sans-serif` |
| **等宽字体** | `"SF Mono", "JetBrains Mono", "Menlo", monospace`（代码块专用） |
| **页边距** | `padding: 60px 70px 50px` |
| **圆角** | 卡片 `14px`，结论卡 `16px`，子卡片 `10px`，Chip `6px`，Badge `100px` |

#### 2.2.2 配色系统 — 9 色循环编号徽章

每条条目的圆形编号徽章按顺序循环使用 9 种 Apple 系统色：

| 编号 | class | 色值 | 色名 |
|------|-------|------|------|
| 1 | `.c1` | `#0071e3` | Apple Blue |
| 2 | `.c2` | `#5856d6` | Apple Indigo |
| 3 | `.c3` | `#af52de` | Apple Purple |
| 4 | `.c4` | `#ff2d55` | Apple Pink |
| 5 | `.c5` | `#ff9500` | Apple Orange |
| 6 | `.c6` | `#34c759` | Apple Green |
| 7 | `.c7` | `#00c7be` | Apple Teal |
| 8 | `.c8` | `#ff3b30` | Apple Red |
| 9 | `.c9` | `#5ac8fa` | Apple Cyan |

子卡片 accent 色系（4 种）：

| accent | 背景 | 边框 | 标题色 |
|--------|------|------|--------|
| `accent-blue` | `#eff6ff` | `#dbeafe` | `#1d4ed8` |
| `accent-green` | `#f0fdf4` | `#dcfce7` | `#15803d` |
| `accent-orange` | `#fff7ed` | `#ffedd5` | `#c2410c` |
| `accent-purple` | `#faf5ff` | `#f3e8ff` | `#7e22ce` |

Chip 标签色系（header-meta 区域）：

| class | 背景 | 文字 | 边框 |
|-------|------|------|------|
| `.chip.blue` | `#e8f0fe` | `#1a73e8` | `#d2e3fc` |
| `.chip.green` | `#e6f4ea` | `#137333` | `#ceead6` |
| `.chip.orange` | `#fef7e0` | `#b06000` | `#feefc3` |

#### 2.2.3 必备组件（从上到下）

1. **顶部 Badge**（`.badge-top`）
   - 白底圆角胶囊 `border-radius: 100px`
   - 左侧橙色圆点 `●`（`color: #ff9500`）
   - 文字：`AI 干货周报 · Issue #NN`（NN 从 01 递增）

2. **居中大标题**（`.main-title`）
   - `font-size: 46px; font-weight: 700; letter-spacing: -0.5px`
   - 固定文字：`AI 干货周报`

3. **副标题**（`.sub-title`）
   - `font-size: 22px; font-weight: 600; color: #424245`
   - 格式：`本周主题关键词 · N 条立刻能用的干货`

4. **描述文字**（`.desc`）
   - `font-size: 15px; color: #6e6e73; max-width: 820px; margin: 0 auto`

5. **Chip 标签行**（`.header-meta`）
   - 4 个 Chip：扫描范围（默认）/ 精选 N 条（blue）/ 3 大板块（green）/ 日期范围（orange）

6. **深色结论卡**（`.conclusion-card`）
   - 背景：`linear-gradient(135deg, #1d1d1f 0%, #2d2d30 100%)`
   - 白色文字 + 2×2 网格子项（`.conclusion-grid`）
   - 每项含橙色 UPPERCASE 标签 + 白色正文
   - 底部橙色左边框 tagline：`border-left: 3px solid #ff9500`

7. **三板块 Section**（§1 / §2 / §3）
   - Section 头：`§ N` 编号（左侧黑色圆点 `8×8px`）+ 板块标题（`font-size: 26px`）
   - 板块名称固定：
     - `§ 1  🛠️ 实用工具箱 · Tools & Apps`
     - `§ 2  ⚡ 高效工作流 · Workflows & Hacks`
     - `§ 3  🧠 方法论与 Prompt · Methods & Prompts`

8. **条目卡片**（`.card`，每条 1 张）
   - 白底 `#fff`，边框 `1px solid #e5e5ea`，圆角 `14px`，padding `24px 26px`
   - 卡片头：彩色圆形编号（26×26px）+ 粗体标题（18px）+ 灰底 tag 胶囊
   - 卡片正文：14px 描述，`strong` 加粗高亮关键词
   - **子卡片栅格**（2 列 `.sub-grid` 或 3 列 `.sub-grid-3`）：
     - 适合谁 / 最快路径 / Step 1-2-3 / 过去 vs 现在 对比
     - 每个子卡片：浅色 accent 背景 + UPPERCASE 小标题 + 正文
   - **代码块**（方法论条目必备）：
     - `background: #1d1d1f`，圆角 10px，padding 18px 20px
     - 等宽字体，语法色：`.cmt`（#6e6e73 灰），`.key`（#ff9500 橙），`.str`（#34c759 绿）
   - 底部来源：虚线分割 + 橙色圆点前缀 `◉`

9. **§ 4 推荐上手顺序**（`.gallery` 3×2 六宫格）
   - 白底卡片，蓝色圆形编号（22×22px）
   - 标题 13px bold + 描述 11px 灰
   - 按「学习成本 × 价值收益」从高到低排序

10. **页脚**（`.footer`）
    - `border-top: 1px solid #e5e5ea`
    - 居中文字：`AI 干货周报 · YYYY.MM.DD – MM.DD`
    - 落款：`—— 小柒AI速递 · 每周一上午推送`

#### 2.2.4 HTML 生成规则

- **完全手写 HTML+CSS**，不依赖外部框架（无 Tailwind/Bootstrap）
- **不引用外部字体 CDN**（系统字体栈即可，截图环境无网络）
- **所有样式内联在 `<style>` 标签中**（单文件，Puppeteer 截图友好）
- **不使用 JavaScript**（纯静态 HTML）
- **宽度严格 1080px**，body 和 .page 都设 `width: 1080px`
- **高度自适应**，不设 `height` 和 `overflow: hidden`（长图模式）
- **Issue 编号**：从 `#01` 递增，通过计算 `(当前年份-2026)*52 + 当前周数` 或手动指定

- **输出位置**：`docs/ai-daily/ai-weekly-card-<SUN_DATE>.html`（不再加 `-v2` 后缀，v2 即唯一版式）

---

### Phase 3 · Puppeteer 截图

- **脚本**：`_deploy/daily-card/screenshot-weekly.js`
- **调用**：
  ```powershell
  node _deploy/daily-card/screenshot-weekly.js --date 20260419
  ```
- **参数**：
  - `--date YYYYMMDD`（默认取上周日）
  - `--html <相对路径>`（可直接指定 HTML）
  - `--width 1080`（默认）
  - `--dpr 2`（默认高清，如 > 2MB 降到 1.5）
- **输出**：`docs/ai-daily/ai-weekly-card-<SUN_DATE>.png`（1080×自适应 @ 2x）
- **硬红线**：企微图片限制 **2MB**。如 2x 导致超过，自动降 `--dpr 1.5` 重截。

---

### Phase 4 · 企业微信推送

- **脚本**：`_deploy/wecom-push/push-ai-weekly.js`
- **Webhook**：`_deploy/wecom-push/config.json`（默认 key=56d19b7a-5bc8-44ee-9b3a-af2619e87cab）
- **调用**：
  ```powershell
  node _deploy/wecom-push/push-ai-weekly.js --date 20260419
  ```
- **推送顺序**（固定）：
  1. 先推 Markdown 文字摘要（本期结论 + 8-10 条条目标题，≤4096 字节）
  2. 再推 PNG 长图（完整周报视觉）
- **参数**：
  - `--date YYYYMMDD`
  - `--webhook <URL>`（覆盖默认）
  - `--skip-git`（不 git push）

---

### Phase 5 · 微信 ClawBot 推送（可选）

同 `daily-card.md` 做法，使用 `deliver_attachments` 工具推送 PNG + 文字摘要到目标微信群/联系人。**周报自动化默认不含此步**，如需添加在自动化 prompt 中追加即可。

---

### Phase 6 · GitHub Pages 同步

- `push-ai-weekly.js` 内置 `git add docs/ai-daily/ → commit → push origin main`
- GitHub Pages 地址：`https://wangqi422.github.io/my-llm-wiki/docs/ai-daily/ai-weekly-card-<SUN_DATE>.html`

---

## 3. 一键手动触发（测试用）

```powershell
# 1) 准备好 raw/daily-reports/AI_Practical_Weekly_Report_20260419.md
#    和 docs/ai-daily/ai-weekly-card-20260419.html

# 2) 截图
node _deploy/daily-card/screenshot-weekly.js --date 20260419

# 3) 推送
node _deploy/wecom-push/push-ai-weekly.js --date 20260419
```

---

## 4. 周报 vs 日报 关键差异

| 维度 | AIGC 日报 | AI 干货周报 |
|------|----------|------------|
| 频率 | 每天 09:30 | 每周一 09:45 |
| 周期 | 当天 24h | 过去 7 天（周一-周日） |
| 信源 | 全网新闻 + 官方博客 | **65 个 AI Builder 的 X 账号** |
| 模板 | Notion 白底 1080×1920 | Apple 白底 1080×auto（长图） |
| 精选条数 | 5-10 条 | **8-10 条**（宁缺毋滥） |
| 结构 | 扁平列表 + 评分 | 三板块（工具/工作流/方法论） |
| 筛选框架 | 新闻价值 | **P1/P2/P3 必含 + 4 条红线必排** |
| 落款 | — | **小柒AI速递** |
| 文件名 | `AIGC_Daily_Report_YYYYMMDD.md` | `AI_Practical_Weekly_Report_YYYYMMDD.md` |
| HTML 文件 | `ai-daily-card-YYYYMMDD.html` | `ai-weekly-card-YYYYMMDD.html` |
| 推送脚本 | `push-ai-daily.js` | `push-ai-weekly.js` |
| 自动化 ID | `aigc-2` | `ai` |

---

## 5. 相关文件

- Skill：`_skills/daily-card.md`（日报 / 竞品日报流水线，本文姊妹篇）
- 模板（唯一正确版式）：`docs/ai-daily/ai-weekly-card-20260419-v2.html`（Apple 白底长图版，后续产出去掉 `-v2` 后缀）
- 样例 MD：`raw/daily-reports/AI_Practical_Weekly_Report_20260419.md`
- 截图脚本：`_deploy/daily-card/screenshot-weekly.js`
- 推送脚本：`_deploy/wecom-push/push-ai-weekly.js`
- 配置：`_deploy/wecom-push/config.json`
- 自动化 ID：`ai`（FREQ=WEEKLY;BYDAY=MO;BYHOUR=9;BYMINUTE=45）

---

## 6. 质量红线（Checklist）

生成前自检：

- [ ] 已扫描 ≥ 50 个账号（65 信源，允许部分静默账号跳过）
- [ ] **必查清单（核心机构当周公告，缺一必补）**：
  - OpenAI 当周是否发新模型 / 新功能（关注 `@OpenAI` `@sama` `@gdb` 官方推 + `openai.com/index/` 博客）
  - Anthropic 当周是否发新模型 / 新工具 / Skill / Design 更新（`@AnthropicAI` + `anthropic.com/news`）
  - Google DeepMind 当周是否发 Gemini / Genie / Veo 更新（`@GoogleDeepMind` `@demishassabis`）
  - 月之暗面 / DeepSeek / Kimi / Qwen / MiniMax / 智谱 当周开源动态
  - Midjourney / Runway / 即梦 / 可灵 当周设计创作工具更新
- [ ] 实战派 6 人（`@zarazhangrui` `@danshipper` `@swyx` `@karpathy` `@rauchg` `@amasad`）均已扫过
- [ ] 所有条目都通过 P1/P2/P3 筛选
- [ ] 无任何红线内容（论文架构 / 财报 / 八卦 / 期货 / 跑分）
- [ ] **去重检查**：与上一期周报对比，重要工具如本周仍在持续发酵可保留但**必须以"实战工作流第二期"角度切入**（不要重复介绍）
- [ ] 每条都有 **获取方式** + **上手建议** + **Source**
- [ ] 方法论条目有 **Prompt 模板**（含 `[占位符]`）+ **实战案例**
- [ ] 精选 **8-10 条**，三板块都有内容（至少 2/3/2）
- [ ] 落款 `小柒AI速递` 在 MD 和 HTML 页脚
- [ ] MD 开头带周期日期 `YYYY.MM.DD - YYYY.MM.DD`
- [ ] HTML 完全复刻 v2 版式（Apple 白底长图：彩色编号徽章 + 子卡片栅格 + 深色代码块 + 6 宫格 Gallery，详见 §2.2）
- [ ] PNG ≤ 2MB（超限降 dpr，screenshot-weekly.js 已支持 `--dpr 1.5` 小数）
- [ ] 企微推送顺序：先 Markdown 再图片
- [ ] config.json `webhooks` 数组 **3 个群齐全**（AI小柒速递 / 新群 / 竞品日报群），不要被回退到只 2 个
