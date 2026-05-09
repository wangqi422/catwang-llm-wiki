# AI 干货周报 · 2026.04.20 - 2026.04.26

> 自动扫描 65 个顶级 AI Builder / 官方账号的近 7 天公开信号，只筛选**立刻能用的工具、工作流与方法论**。
> 本期采用 **分批检索 + 官方页面 + 公开摘要交叉核实** 的方式完成筛选。

---

## 作者

小柒AI速递

---

## 本期先说结论

这周是名副其实的 **"团队级 Agent + 1M 上下文周"**：

- **OpenAI** 把 `Workspace Agents` 塞进 ChatGPT，Codex 驱动，**7×24 云端替团队跑工作流**；GPTs 进入退役倒计时
- **DeepSeek** 沉寂 15 个月后发布 `V4 预览版`，**全系标配 1M 上下文**、Agentic Coding 开源最佳，权重同步开源
- **Anthropic** `Claude Code` 把 Subagents 与 Agent Teams 两套多 Agent 协作模式讲透，给出明确选型标准
- **Google** 一口气发布多款面向企业的 AI Agent 构建器，对标 ChatGPT 与 Claude
- **Karpathy** 的 `LLM Wiki` 方法论继续发酵，`andrej-karpathy-skills` 一周涨 44K star

一句话总结：**AI 不再是给一个人当副驾，而是直接替你和团队把一整套 SOP 跑完。**

本期精选 **9 条**，三板块分布 3 / 3 / 3，每一条都今天能试。

---

## 🛠️ 实用工具箱 (Tools & Apps)

### 1. OpenAI Workspace Agents：团队版 7×24 云端替身

- **名称与一句话简介**：`Workspace Agents` 是 OpenAI 4 月 23 日在 ChatGPT 中推出的**团队级协作 Agent**，由 Codex 驱动，在云端 7×24 小时运行，能跨工具自动执行复杂长周期任务——被官方定位为 `GPTs` 的进化形态。
- **获取方式**：[OpenAI Workspace Agents](https://openai.com/blog/workspace-agents)，5 月 6 日前 ChatGPT Team / Enterprise 可免费体验；GPTs 进入倒计时。
- **上手建议**：
  - **适合谁**：运营 / 设计 / 市场团队中"一段工作流要跑好多次"的人
  - **最快路径**：先找一条真实重复工作流（例如"周一拉日报 → 整理三板块 → 生成卡片 → 企微推送"），用自然语言描述任务 → 挂上文件 / 工具 → 让 Agent 后台跑
  - **价值锚点**：0 代码搭 Agent，全团队可共用，直接接管重复 SOP
- **为什么优先试**：这是目前**最接近"把整个岗位 SOP 丢给 AI"** 的产品级形态，对宣发团队的"出图 + 审核 + 推送"链路尤其适配。

*Source: @OpenAI, @sama, @gdb*

---

### 2. DeepSeek V4 预览版：开源 1M 上下文 + 最强 Agentic Coding

- **名称与一句话简介**：4 月 24 日 DeepSeek 发布 `V4 预览版`，分 **V4-Pro / V4-Flash** 两版，全系标配 **1M 百万字上下文**，Agentic Coding 达到开源最佳，**权重同步开源**在 Hugging Face。
- **获取方式**：[Hugging Face · deepseek-ai/DeepSeek-V4-Pro](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro) / [DeepSeek 官网](https://www.deepseek.com/)，API 同步上线。
- **上手建议**：
  - **适合谁**：需要跨大代码库 / 大文档处理的工程团队，以及受限于闭源 1M 模型定价的创作者
  - **最快路径**：先用 V4-Flash 替换日常任务（低延迟 + 便宜），重度推理切 V4-Pro；长文场景直接把整本手册 / 全仓库代码塞进上下文
  - **两个版本定位**：Flash = 高并发省钱档；Pro = 需要深度推理的研发档
- **价值锚点**：**开源 1M 上下文**是今年最重要的基础设施变化——这意味着"把整本品牌手册喂给模型生成合规素材"不再是闭源模型的专利。

*Source: @deepseek_ai*

---

### 3. andrej-karpathy-skills：一个 CLAUDE.md 让 AI 编程更稳

- **名称与一句话简介**：`forrestchang/andrej-karpathy-skills` 是把 Karpathy 对 LLM 编码常见坑的观察，整理成**一份可直接放到项目根目录的 `CLAUDE.md` 规则文件**，适用于 Claude Code / Cursor / Codebuddy 等所有"读 CLAUDE.md"的 AI 编程工具。一周涨 **44K star**。
- **获取方式**：[GitHub · forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills)，MIT 开源，复制文件即可使用。
- **上手建议**：
  - **适合谁**：所有在用 AI 编程工具但经常被"AI 瞎改 / 乱删 / 脑补依赖"坑的人
  - **最快路径**：
    1. `cp CLAUDE.md 你的项目根/`
    2. 按项目实际情况删掉不相关小节
    3. 之后每次 AI 都会先读这份规则，显著减少破坏性改动
  - **核心价值点**：先制定**改动前必须做的事**（阅读原文件、先问再改、禁止脑补 API），让 AI 从"速度猛男"变成"职业工程师"
- **价值锚点**：比起换工具，**换一份规则**是目前性价比最高的 AI 编程体验升级。

*Source: @karpathy（原观察）, forrestchang（整理）*

---

## ⚡ 高效工作流 (Workflows & Hacks)

### 4. Claude Code 多 Agent 选型：Subagents vs Agent Teams

- **痛点场景**：一个复杂任务（例如"重构 + 写测试 + 写文档 + Review"）塞给单个 Agent 经常上下文爆炸、记忆错乱；但多开 Agent 又不知道怎么分工。
- **AI 解决路径**：Anthropic 4 月 7 日官方博客给出明确分工框架：
  - **Subagents（独立分身）**：主 Agent 派发 → 子 Agent 在独立上下文完成任务 → 只返回摘要。**适合独立任务 / 信息收集 / 并行研究**。
  - **Agent Teams（对等协作）**：多个独立实例共享邮箱、互相讨论、交叉验证。**适合需要多轮讨论 / 审查 / 博弈的复杂场景**（如"架构师 + 实现者 + 审查者"）。
  - 选型口诀：**能并行无依赖 → Subagents；需要讨论和交叉验证 → Agent Teams**
- **预期效果**：在同一任务上，多 Agent 协作能把 Code Review 的**覆盖率从 16% 提到 54%**（Anthropic 官方基准），且主 Agent 的上下文不再被淹没。
- **落地最小模板**：
  1. 主 Agent 读 README 和 CLAUDE.md，写出任务拆解
  2. `Task()` 派发 3 个 Subagent：Explore / Plan / Implement
  3. 结果合并后交 Team Review

*Source: @AnthropicAI, @alexalbert__*

---

### 5. Follow-Builders：用 AI 给你每天蒸馏 25 位 AI 顶级 Builder 的干货

- **痛点场景**：想跟进 AI 顶级 Builder，但刷 X / 听播客一天就过去了；自动摘要工具又往往只会抓"热门"而非"有用"。
- **AI 解决路径**：Zara Zhang 开源的 `Follow-Builders` 是一份 Claude Code **Skill**：
  1. 订阅 25 位精选 AI Builder（Karpathy / swyx / rauchg 等）的 X 推文 + 顶级 AI 播客节目
  2. Skill 自动抓取过去 24h 的内容
  3. 调用 Claude 按"Builders 说 vs Influencers 说"区分 → 只留下**工程师视角的干货摘要**
  4. 输出结构化日报（带原链接）
- **预期效果**：把每天"刷 X 两小时"压缩到**读一份 5 分钟摘要**，且摘要是按"这个人昨天到底说了什么新东西"而不是"哪条点赞最多"来组织的。
- **获取方式**：[GitHub · zarazhangrui/follow-builders](https://github.com/zarazhangrui/follow-builders)，Claude Code + Skill 机制即可运行。
- **组合推荐**：搭配本周报 + Follow-Builders，基本覆盖"周频深加工 + 日频轻扫描"的完整情报链。

*Source: @zarazhangrui*

---

### 6. n8n + AI Agent：一条工作流把"内容创作者一天"跑完

- **痛点场景**：内容创作者的日常链路——选题 / 写稿 / 配图 / 排版 / 发布 / 互动——要切换 6 个工具；AI 能解决其中 1-2 环，但最痛的是**切换与粘贴**。
- **AI 解决路径**：`n8n Content Creator Agent` 模板把整个链路拼成一条可视化工作流：
  1. **Webhook/表单触发** → 输入"本周主题关键词"
  2. **AI 节点 1（Claude/GPT）**：生成大纲 + 标题
  3. **AI 节点 2（Perplexity/Tavily）**：补充最新资料
  4. **AI 节点 3（Midjourney v7 / Hailuo）**：按段落生成配图
  5. **AI 节点 4**：排版成 HTML / 微信公众号草稿
  6. **发布分叉**：飞书文档 + 企微推送 + Notion 备份
- **预期效果**：传统流程**半天 → 10 分钟**，且整条链路可版本化，每一步都能独立调试 / 替换模型。
- **获取方式**：
  - 官方模板：[n8n Content Creator Agent](https://www.aiautomationgenerator.com/templates/content-creator-agent)
  - 中文模板站：[n8ncn.io](https://n8ncn.io/) 提供 300+ 可直接导入 JSON
  - 自建 Tip：**先搭最小可行工作流（触发 + 1 个 AI 节点 + 1 个输出）**，跑通再加节点

*Source: @n8n_io, @Ronald_vanLoon*

---

## 🧠 方法论与 Prompt (Methods & Prompts)

### 7. Karpathy 的 LLM Wiki 方法论：让 AI 自我进化的个人知识库

- **核心理念**：不要让 AI 每次从零开始翻你的 Obsidian / Notion，而是先让 LLM 把原始内容**"编译"成结构化 Wiki**——摘要 + 百科条目 + 双向链接——以后它只读这份 Wiki，速度快一个数量级，答案还更好。Karpathy 4 月 3 日的 gist `llm-wiki.md` 原帖 **252K 浏览 / 4.1 万收藏**。
- **Prompt 模板**：

```markdown
你是我个人知识库的专业架构师。

# 目录约定
- raw/      ：原始材料（只读）
- wiki/     ：你生成的结构化知识（平铺 + 标签）
- wiki/summaries/、wiki/comparisons/、wiki/insights/
- index.md  ：索引（你自动维护）
- log.md    ：操作日志

# 当我添加 [原始材料路径]，请执行：
1. 读取并理解核心内容
2. 生成摘要 → wiki/summaries/[title].md
3. 提炼知识页 → wiki/[slug].md（扁平、带 frontmatter）
4. 更新 index.md 和 log.md
5. 添加 [[wikilinks]] 双向交叉引用

# 原则
- 积累而非检索
- 一致性：新旧数据必须协调
- 自动化：你负责事务性工作，我负责策展
```

- **实战案例**：
  - **过去**：把一篇 10000 字长文丢给 AI 问 6 轮问题 ≈ 每轮都要重读全文，上下文爆炸，答案越来越飘
  - **现在**：先让 AI 按上述 Prompt 把长文变成 `wiki/<slug>.md`（≤500 行）+ 摘要 + 索引 → 以后所有提问 AI 只需读 50 行摘要 + 关键页，**Token 成本降 10×、答案一致性显著提升**
- **关键硬约束**：每页 ≤ 150 行 / 根目录 ≤ 150 页 / Related 链接 ≤ 10（超出触发"蒸馏"）。

*Source: @karpathy*

---

### 8. Meta Prompting：用 LLM 来写 Prompt 的结构框架

- **核心理念**：与其手写内容丰富的 Prompt，不如让 LLM 先**给你生成一份结构化脚手架**——再由你填空。核心转变：从"内容驱动"到"结构驱动"，显著减少 Prompt 反复调参的时间。2026 年行业共识级方法。
- **Prompt 模板**：

```markdown
你是一位 Prompt 架构师。我需要完成的任务是：
[任务描述，一句话]

请不要直接给出答案，而是先按以下 6 要素生成一份 Prompt 脚手架：

1. ROLE（角色）：给 AI 设定什么身份最合适？
2. TASK（任务）：任务的精确边界是什么？
3. CONTEXT（上下文）：必须提供哪些背景？
4. EXAMPLES（示例）：给几条 input→output 示范？
5. OUTPUT（输出格式）：用什么结构 / 字段 / 长度？
6. CONSTRAINTS（约束）：禁止什么 / 必须做什么？

生成后，把每一项都留成 [占位符]，我来填。
```

- **实战案例**：
  - **输入**：`任务描述：给 CODM 英雄 LTM 活动写 30 秒短视频文案`
  - **输出（脚手架）**：

```markdown
ROLE: [CODM 宣发主笔 / 深谙游戏玩家情绪]
TASK: [30s 短视频文案，15s 钩子 + 10s 价值 + 5s CTA]
CONTEXT: [活动主题=xxx、核心卖点=xxx、目标玩家=xxx]
EXAMPLES: [参考过去 3 条爆款文案]
OUTPUT: [镜头脚本 JSON：{time, visual, voiceover, text_on_screen}]
CONSTRAINTS: [不得出现"最强/无敌"等绝对化用词；保持玩家口吻；≤200 字]
```

  - **效果**：填一次脚手架 ≈ 过去改 5 轮 Prompt；且脚手架本身可沉淀为团队模板，后续任务 10 倍复用。

*Source: @karpathy（方法论推崇者）, @geeky-gadgets, @GaryMarcus*

---

### 9. Midjourney v7 电影感 Prompt 公式：3 段式 + 参数三件套

- **核心理念**：MJ v7 已经不能再靠堆关键词"赌出图"——**自然语言主导 + 结构化参数精修**才是正解。公式 = 主体描述 + 镜头/光线 + 风格关键词 + `--sref + --cref + --ar`。
- **Prompt 模板**：

```text
[主体: 谁/什么/在做什么] +
[环境: 具体地点 / 时间 / 天气] +
[镜头: low angle / 85mm / anamorphic] +
[光线: golden hour / rim light / volumetric fog] +
[质感: shot on ARRI Alexa 65 / cinematic / film grain],
style of [导演/摄影师/风格]

--ar 16:9 --sref [风格图URL] --cref [角色一致性图URL] --stylize 300 --v 7
```

- **实战案例**：
  - **弱 Prompt**：`a soldier running in the desert, cinematic, 8k, ultra detailed`
  - **结构化 Prompt**：

```text
A lone commando sprinting through sandstorm toward a hovering dropship,
kicking up dust plumes at sunset, low-angle tracking shot at 35mm,
volumetric light rays slicing through sand, cinematic color grade,
shot on ARRI Alexa 65, anamorphic lens flare,
style of Denis Villeneuve

--ar 21:9 --sref 3124789012 --stylize 400 --v 7
```

  - **效果对比**：弱 Prompt 10 张里能用 1 张；结构化 Prompt 10 张里 6-7 张可直接进 CODM 宣发初审。
- **三件套小抄**：
  - `--sref <图URL/ID>`：锁风格（最大杀招）
  - `--cref <图URL>`：锁角色（人物一致性）
  - `--stylize 200-500`：写实 / 250 / 偏艺术 400+

*Source: @midjourney（官方文档）, @elonmusk, @alliekmiller*

---

## 📌 推荐上手顺序

> 按「学习成本 × 当下收益」从高到低：

1. **andrej-karpathy-skills**（5 分钟复制 CLAUDE.md，立刻显著提升 AI 编程稳定性）
2. **Karpathy LLM Wiki Prompt**（10 分钟配置目录结构，长期收益最高）
3. **Meta Prompting 脚手架**（写 1 个模板，团队所有 Prompt 复用）
4. **Midjourney v7 三件套公式**（看完即可抄，次日出图良率翻倍）
5. **DeepSeek V4 API / HF 权重**（替换部分日常任务，立刻降本）
6. **Claude Code Subagents 选型**（下次复杂任务就按 Sub/Team 选型）
7. **Follow-Builders**（本周搭好，下周开始每日 5 分钟情报）
8. **n8n Content Creator Agent**（周末一下午，搭好长期省半天）
9. **OpenAI Workspace Agents**（5/6 免费期内体验，判断是否采购）

---

## 页脚

AI 干货周报 · 2026.04.20 – 04.26
—— 小柒AI速递 · 每周一上午推送
