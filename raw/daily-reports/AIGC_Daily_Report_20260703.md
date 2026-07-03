# AIGC 日报 · 2026.07.03 · 第 13 期

> 🎯 **本期主旋律**：**「AI 巨头'国家化'加速 + 国产大模型 2.5 万亿参数竞赛 + Agent 工具链爆发」**
>
> Anthropic 一夜三连（Fable 5 + Sonnet 5 + Claude Science + Claude Code → Claude Tag），OpenAI 提出 5% 股权给美国政府以换宽松监管，Kimi K3 官宣 2.5 万亿参数 7 月中发布，Claude Code 子智能体默认后台跑（Boris Cherny 八个月不写代码同时管上万个 Agent）。海外巨头"国家化" + 国产大模型"军备竞赛" + Agent 工程化"流水线化"三股力量在同一天交汇。

---

## 1. 海外巨头 & Agent 革命

### 1. Anthropic 一夜三连：Fable 5 全球 + Sonnet 5 + Claude Science + Claude Code 进化为 Claude Tag

**关键信息**：
- **Fable 5**：7 月 1 日全球可用，出口管制解除；7 月 7 日从订阅中移除，改为 AI 用量计费（Anthropic 官网公告）
- **Sonnet 5**：同步发布，"最 agentic 的 Sonnet"，针对编码和日常专业工作（Anthropic 官网）
- **Claude Science**：可定制科研 App，集成研究者常用工具与软件包，产出可审计工件，灵活算力访问（Anthropic 官网）
- **Claude Code → Claude Tag**：Anthropic 内部工具 Claude Code 进化为全公司使用的 Claude Tag，Fable 5 已接入，成为"团队 AI 记忆层"（Berry Xia X / Anthropic Newsroom）

**来源**：Anthropic 官网 · 公众号「卡尔的AI沃茨」 · X: @berryxia

**AIGC 速报解读**：Anthropic 把"个人加速器"变成了"公司操作系统"——Fable 5 是底座，Sonnet 5 是商品，Claude Science 是垂类钉子，Claude Tag 是公司记忆层。从今天起，Anthropic 不再是模型公司，而是"AI 工作流操作系统公司"。

---

### 2. Claude Code 子智能体默认后台运行：Boris Cherny 八个月不写代码，同时管上万个 Agent

**关键信息**：
- **Claude Code v2.1.198 发布**：后台智能体可自动提交、推送、创建草稿 PR（智源社区 / 今日头条 AI 简报）
- **下版 Claude Code**：子智能体**默认在后台跑**——Boris Cherny（Claude Code 创造者）官宣（智源社区）
- **后台通知机制**：新增 `agent_needs_input` / `agent_completed` 事件，前台用户可与主 Agent 聊天时，后台 Agent 在 worktree 完成代码并自动提交推送
- **/dataviz 技能**：新增图表与仪表盘设计指导 + 配色验证器
- **Claude Code 创造者自述**：八个月没手写过一行代码；有些日子同时管理着**数千甚至上万个 AI 智能体**——"你不再是那个给 Claude 写提示的人了，写提示的是另一个 Claude"

**来源**：智源社区（BAAI） · 今日头条 AI 简报 · X: Boris Cherny

**AIGC 速报解读**：Agent 已从"工具"变成"流水线"——Boris Cherny 的实践意味着 2026 H2 软件工程的稀缺资源，正从"能写代码的手"换成"知道该写什么的脑子"。一个 Claude 写剧本，一群 Claude 按剧本开工。CODM 团队每周的 60+ 个素材变体需求，未来可能就由 1 个 PM + 20 个 Agent 组成的工作流完成。

---

### 3. OpenAI 拟向美国政府提供 5% 股权（估值 426 亿美元）+ GPT-5.6 Sol 创 Terminal-Bench 2.1 91.9% 新纪录

**关键信息**：
- **5% 股权换宽松监管**：奥特曼向特朗普政府提议，将公司 5% 股权移交公共财富基金，估值约 426 亿美元；建议 Anthropic、谷歌、Meta 同步实施同等股权出让（财联社）
- **GPT-5.6 系列**：6/27 发布旗舰版 Sol、均衡版 Terra、轻量版 Luna；Sol 在 Terminal-Bench 2.1 基准测试中创下 91.9% 新纪录（新智元）
- **API 预览受限**：应美国政府要求，目前仅向少数可信合作伙伴开放 API 预览，OpenAI 强调"不应成为长期默认模式"
- **诉讼**：加州男子起诉 OpenAI，指控 ChatGPT 加剧其双相情感障碍病情（旧金山州法院）

**来源**：腾讯网（OpenAI 每日动态） · 财联社 · 新智元 · 华尔街见闻

**AIGC 速报解读**：OpenAI 已经被推到"国家 AI 基础设施"的位置——5% 股权不是慈善，是"政府背书换监管松绑"的交易。当 AI 头部公司股权与国家利益绑定，CODM 选模型时不能再只看"哪个 API 强"，还要看"哪个 API 长期可用"。

---

### 4. AI 行业从军备竞赛转向 ROI：Anthropic 牵手三星自研芯片，Meta 拟出租闲置算力

**关键信息**：
- **Anthropic × 三星**：正与三星深度接触探讨定制 AI 芯片开发，定位/服务器集成/性能指标待定；同时不放弃谷歌 TPU、亚马逊 Trainium、英伟达 GPU 多元硬件架构（科创板日报 7/3）
- **Meta 出租算力**：拟对外出租闲置 AI 算力，把"资本回报率"摆在"资本开支规模"前面
- **背景**：OpenAI 上周联合博通推出 Jalapeño 推理芯片，主打高能效；亚马逊/谷歌也在云服务中提供定制 TPU

**来源**：科创板日报（163.com 转载） · 财联社

**AIGC 速报解读**：AI 行业的下半场不再是"谁烧钱多"，而是"谁 ROI 高"——Anthropic 和 Meta 用行动承认了"算力军备竞赛"到顶。CODM 长期素材渲染 / AI 推理算力成本，2026 H2 可能因为供给侧释放迎来新一波降价。

---

## 2. 国产 AI & 大模型激战

### 5. Kimi K3 七月中发布：2.5 万亿参数 + 1M 上下文 + 多模态，国产最大

**关键信息**：
- **Kimi K3 官宣**：月之暗面员工 Young_AGI 在 X 上确认 7 月发布；参数量 2.5 万亿（中关村在线 / 站长之家 / CSDN）
- **规模对比**：超越 DeepSeek V4 Pro 的 1.6 万亿、超过文心 5.0 的 2.4 万亿，成为当前国产大模型中参数量最大的产品
- **能力**：1M 超长上下文 + 多模态理解与生成
- **Kimi 商业进展**：海外付费用户 4 倍增长，API 收入 4 倍增长，进入 200 多个国家与地区；员工总数仅 300 人
- **估值**：月之暗面 6 月初融资估值 300 亿美元（vs OpenAI/Anthropic 的 1 万亿，谷歌 4 万亿）

**来源**：中关村在线 · 站长之家 · CSDN 智能体专栏 · 新浪财经

**AIGC 速报解读**：国产大模型从"千亿卷到万亿"已不够，2.5 万亿参数 + 1M 上下文 + 多模态 = "三合一"超级模型成为新门槛。CODM 选中文 LLM 跑玩家社区/客服/UGC 内容审核时，Kimi K3 是 7 月必须重新评估的选项。

---

### 6. Anthropic 封号加码 + 开源"搭子"Skill：Claude Code + Codex 分工成本降至 30%

**关键信息**：
- **Anthropic 加大中国用户封号**：Claude Code 通过时区 + `ANTHROPIC_BASE_URL` 检测中国用户；7/2 新版本删除该检测代码，但部署了更强措施（公众号「卡尔的AI沃茨」）
- **Sonnet 5 新 tokenizer 涨价**：英文 token 数增至 1.4 倍，API 降价但实际更贵
- **开源"搭子"Skill**：让 Claude Code 与 Codex 分工协作——Claude 负责架构/审美/创作，Codex 负责实现/测试/部署——成本降至纯 Claude 的 30%，避免反复冷启动
- **Fable 5 窗口期**：至 7/7 周额度 50% 可用
- **Fable 5 副作用**：因过度安全防护能力大幅削弱（Berry Xia X）

**来源**：公众号「卡尔的AI沃茨」 · 公众号「数字生命卡兹克」 · X: @berryxia

**AIGC 速报解读**：Anthropic 的"分区封锁"是 2026 H2 中国 AI 工程师的常态挑战——"搭子"Skill 提供了一个工程化降本方案：不脱离 Claude Code 生态，但用 Codex 承担 70% 的脏活累活。CODM 团队的 AI 协作流程，7 月起应从"单 LLM"升级到"双 LLM 路由"。

---

## 3. 论文 & AI for Science

### 7. 字节跳动 Seed 开源 PAR 蛋白质生成自回归模型（Apache 2.0，400M / 60M 两版）

**关键信息**：
- **PAR（Protein Autoregressive Modeling via Multiscale Structure Generation）**：字节跳动 Seed 在 Hugging Face 开源（Berry Xia X / Hugging Face Daily Papers）
- **协议**：Apache 2.0
- **规模**：400M 和 60M 两个参数版本
- **方向**：AI for Science / 生物计算，生成高质量蛋白质结构
- **稀缺性**：字节在开源蛋白质模型方面动作较少，此次将"多尺度自回归"做法直接开源，被认为是对该领域较直接的贡献

**来源**：X: @berryxia · Hugging Face · DailyPapers

**AIGC 速报解读**：字节把"应用层"基因带到"科学层"——多尺度自回归蛋白质结构生成是行业前沿，Apache 2.0 协议意味着可商业化。CODM 团队做"未来科幻风"皮肤时，蛋白质折叠 / AI for Science 概念是可以放进视觉叙事的素材。

---

### 8. 微软 CEO 纳德拉"学习回路论"：AI 时代护城河不在模型，而在公司独有的学习回路

**关键信息**：
- **核心主张**：当智能成为可租赁的商品时，企业护城河不再是所使用的模型，而是公司独有的"学习回路"（Rohan Paul X / IT之家）
- **方法**：构建私有"爬坡机器"——一个从公司特定任务、痕迹、评估和结果中持续改进模型的循环
- **三个动作**：
  - 私有评估成为战略记忆
  - 工作流痕迹变成训练信号
  - 人类判断用于引导复合增长
- **结论**：未来的前沿不属于拥有最大模型的人，而属于拥有最佳学习回路的人

**来源**：X: @rohanpaul_ai · IT之家 · Microsoft 官方视频

**AIGC 速报解读**：纳德拉给"用第三方 API 的中小公司"指了一条路——你不需要有自己的基础模型，但你必须有"自己的任务数据 + 自己的评估体系 + 自己的工作流痕迹"。CODM 团队的所有素材生产记录、AB 测试数据、玩家反馈循环，本质上就是 CODM 自己的"学习回路"，护城河在 wiki/ 里。

---

## 4. 推荐上手顺序（按 CODM 团队场景）

| 优先级 | 工具 / 模型 | 上手理由 | 时间投入 |
|------|------|------|------|
| ⭐⭐⭐ | **Claude Code v2.1.198 + 后台子 Agent** | Boris Cherny 已八个月不写代码，同时管上万个 Agent | 1 周搭骨架 |
| ⭐⭐⭐ | **"搭子"Skill（Claude Code + Codex 分工）** | 成本降至 30%，绕开 Anthropic 封号 | 1 天集成 |
| ⭐⭐⭐ | **Kimi K3（7 月中）** | 2.5 万亿参数 + 1M 上下文 + 多模态，国产最大 | 7 月 15-20 日开测 |
| ⭐⭐ | **Claude Science** | 团队级 AI 记忆层 / 知识库解决方案 | 1 周评估 |
| ⭐⭐ | **Google Gemini Nano Banana 2 Lite + Omni Flash** | 新模型发布，Agent 推理可选 | 1 周搭 POC |
| ⭐ | **字节跳动 PAR 蛋白质模型** | 视觉叙事 / 科幻概念素材 | 0.5 天浏览 |

---

## 5. 本期小结

**海外巨头**：Anthropic 一夜三连 + Claude Code 后台 Agent 化 + OpenAI 5% 股权 = 头部公司"国家化"和"工具链操作系统化"两条主线在同一天交汇。

**国产大模型**：Kimi K3 2.5 万亿参数 7 月中发布，是 DeepSeek V4 正式版之外的最大看点——中国 AI 公司在 2026 H2 集体跨入"2 万亿俱乐部"。

**工程化趋势**：纳德拉"学习回路论" + Claude Code 后台 Agent + "搭子" Skill 三件事共同指向——**AI 协作的稀缺资源正从"写 prompt 的人"换成"知道该写什么的人"**。

**给 CODM 团队的 3 条建议**：

1. **Claude Sonnet 5 + Claude Code v2.1.198 子 Agent 后台跑** —— 2026 H2 素材产能成本最优解，7/7 前用满 Fable 5 周额度
2. **搭子 Skill（Claude Code + Codex 分工）** —— Anthropic 7/2 部署更强封号措施，"搭子"是 7 月中国团队标配
3. **Kimi K3 一发布就开测** —— 2.5 万亿 + 1M 上下文 + 多模态，对玩家社区运营/UGC 审核/中文素材生成可能是新的最佳选择

---

## 📊 信源统计

- **AI HOT 聚合源**（**第 0 轮·新接入**）：100 条过去 24h 全量池 → 19 条候选
- X 实战派/机构/中国生态：5 轮补强扫描 → 8 条 TOP
- 中文媒体（IT之家/中关村/站长之家/科创板日报/新智元/腾讯网/智源）：8 篇交叉验证
- GitHub Trending / Hugging Face / 公众号「卡尔的AI沃茨」+「数字生命卡兹克」：4 个一手源头

**总扫描**：**100 + 65 + 12** = **177 信源**（**比接入 AI HOT 之前多 100 条候选**）

---

*Generated by Claw 🦅 · 数据截止 2026-07-03 13:25 GMT+8*
