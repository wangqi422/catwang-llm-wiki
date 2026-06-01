# AI 干货周报 · 2026.05.26 - 2026.06.01

> 自动扫描 65 个顶级 AI Builder / 官方账号的近 7 天公开信号，
> 只筛选立刻能用的工具、工作流与方法论。

## 作者
小柒AI速递

## 本期先说结论

这周是名副其实的 **「Agent 工程化爆发周」**：

- Anthropic 放出 **Dynamic Workflows** —— 数百子 Agent 并行处理 75 万行代码移植，11 天完成原本需要团队数月的工程
- Kimi K2.6 开源，**300 子 Agent 集群** 调度能力直接对标 GPT-5.4
- Karpathy 公开 **LLM Knowledge Base** 工作流 —— 从"写代码"转向"编译知识"
- OpenAI 正式推出 **Tool Search** —— 让模型按需检索工具而非一次性加载全部

本期精选 **9 条**，每一条都今天能试。

---

## 🛠️ 实用工具箱 (Tools & Apps)

### 1. Claude Opus 4.8 + Dynamic Workflows —— 数百 AI 代理并行工程

**一句话**：Claude 化身项目经理，一次指挥数百个子 Agent 并行工作，自动验证、持续迭代直到收敛。

**核心能力**：
- **动态规划与扇出(Fan out)**：自动拆解大型任务，启动数十到数百个平行子代理
- **对抗式验证**：配置专门的"对抗 Agent"试图打破现有结果，持续迭代直至收敛
- **长时运行**：支持数小时到数天不间断执行，中断后可恢复进度

**实战案例**：
Bun 作者用 Dynamic Workflows 将 75 万行 Zig 代码移植到 Rust：
- 数百个代理平行撰写 .rs 文件，每个文件配两位 AI 审查员
- 通过修复循环驱动编译与测试，直到完全通过
- **最终结果**：99.8% 测试通过率，仅耗时 11 天

**上手路径**：
1. 在 Claude Code 终端输入 `/fast` 切换快速模式（2.5x 速度，1/3 价格）
2. 直接指令或在设置中开启 `ultracode` 体验多代理协作
3. 建议先从较小范围任务开始测试（Token 消耗显著）

**Source**: @AnthropicAI @claudeai

---

### 2. Kimi K2.6 —— 开源 Agent 集群，300 子 Agent 并行

**一句话**：月之暗面开源最新旗舰模型，Agent 集群从 100 子代理扩展到 300 个，协作步骤从 1500 步提升至 4000 步。

**核心亮点**：
| 维度 | K2.6 | 对比 |
|-----|------|------|
| 子 Agent 数 | 300 个 | K2.5 的 3 倍 |
| 协作步骤 | 4000 步 | 3 倍扩展 |
| SWE-Bench Pro | 58.6% | 领先 GPT-5.4 |
| 长程编码 | 单次修改 4000+ 行 | 系统级优化 |

**实战案例**：
- **金融引擎重构**：8 年历史的撮合引擎，K2.6 迭代 12 种优化策略，吞吐量提升 185%
- **论文转技能**：天体物理论文 → 7000 字研究论文 + 2 万条数据集 + 14 张天文图表
- **招聘自动化**：基于简历自动生成 100 个子 Agent，分别匹配 100 个岗位并定制化简历

**获取方式**：
- 官网：https://kimi.moonshot.cn
- API：https://platform.moonshot.cn
- 输入价格：$0.95/MTok（较 K2.5 上涨 58%）

**Source**: @Kimi_Moonshot

---

### 3. Claude Artifacts 一键分享 —— 写完即发布

**一句话**：Claude "工坊模式"更新，写完的网页应用支持一键分享，无需自建服务器。

**使用方式**：
1. 开启 Artifacts 模式（锥形瓶图标）
2. 让 Claude 生成网页/应用/游戏
3. 点击预览框中的 **Publish** 按钮
4. 获得可分享的公开链接

**核心特性**：
- **人人可玩**：被分享的应用无需注册 Claude 账号即可访问
- **一键 Remix**：别人分享的应用支持一键导入自己的 Claude 账号进行修改
- **版本历史**：自动记住每个修改版本，可随时回滚

**上手建议**：
适合快速原型验证、小游戏开发、交互式演示页面制作。

**Source**: @alexalbert__

---

### 4. OpenAI Tool Search —— 让模型按需找工具

**一句话**：新功能让 LLM 无需一次性加载全部工具，而是按需搜索、动态加载。

**解决的问题**：
传统方式一次性塞给模型 1000 个工具 → Token 爆炸、选择困难、准确率下降

**Tool Search 工作流程**：
```
用户提问 → LLM 发现没有直接工具 → 调用 tool_search → 
返回相关工具 Schema → LLM 再调用具体工具 → 执行并返回结果
```

**适用场景**：
- 工具数量 > 20 个的大型 Agent 系统
- MCP / 插件生态
- 企业内部工具平台

**API 示例**：
```python
response = client.responses.create(
    model="gpt-5.5",
    input="List open orders for customer CUST-12345.",
    tools=[crm_namespace, {"type": "tool_search"}],
    parallel_tool_calls=False,
)
```

**Source**: @OpenAI

---

## ⚡ 高效工作流 (Workflows & Hacks)

### 5. Karpathy 的 LLM Knowledge Base 工作流 —— 从"写代码"到"编译知识"

**核心转变**：Karpathy 最近的大量 Token 不再用于"操控代码"，而是用于"操控知识"（Markdown 和图像形式存储）。

**六步工作流**：
```
Raw/ → Compile → Scale → Query → Output → Lint
```

| 步骤 | 操作 | 说明 |
|-----|------|------|
| **Ingest** | 收集原始资料 | 论文、文章、代码仓库、数据集、图片 → raw/ |
| **Compile** | LLM 编译 Wiki | 自动生成结构化 Markdown、双向链接、概念分类 |
| **Scale** | 达到临界质量 | ~100 篇文章、40 万字后成为强大知识基底 |
| **Query** | 复杂问题查询 | LLM 搜索相关页面、交叉引用、综合作答 |
| **Output** | 多格式输出 | Markdown、Marp 幻灯片、matplotlib 图表 |
| **Lint** | 健康检查 | 找矛盾、补缺失、发现新关联 |

**关键洞见**：
> "RAG 被高估了（在小规模下）。LLM 自己维护的索引文件和摘要就够用了。"

**目录结构模板**：
```
vault/
├── raw/          # 原始资料（只读）
├── wiki/         # LLM 编译的知识 Wiki
├── derived/      # LLM 查询产出
├── index.md      # 总索引
└── CLAUDE.md     # AI 指令文件
```

**Source**: @karpathy

---

### 6. Claude Agent 编排模式 —— Handoffs vs Agents as Tools

**两种核心模式**：

| 模式 | 使用场景 | 控制权 |
|-----|---------|--------|
| **Handoffs** | 专家应接管对话分支 | 转移到专家 Agent |
| **Agents as Tools** | 管理者应保持控制 | 调用专家作为工具 |

**Handoffs 代码示例**：
```python
from agents import Agent, handoff

billing_agent = Agent(name="Billing agent")
refund_agent = Agent(name="Refund agent")

triage_agent = Agent(
    name="Triage agent",
    handoffs=[billing_agent, handoff(refund_agent)]
)
```

**Agents as Tools 代码示例**：
```python
summarizer = Agent(name="Summarizer", instructions="Generate concise summary...")

main_agent = Agent(
    name="Research assistant",
    tools=[
        summarizer.as_tool(
            tool_name="summarize_text",
            tool_description="Generate concise summary..."
        )
    ]
)
```

**选型建议**：
- 需要专家完全接管 → Handoffs
- 需要管理者综合多个专家输出 → Agents as Tools
- 保持路由表面清晰：每个专家职责狭窄、handoffDescription 简短具体

**Source**: @AnthropicAI

---

### 7. Prompt Chaining 端到端自动化 —— 多步骤 AI 工作流

**核心思想**：链接多个 AI Prompt 的输出，构建动态工作流。

**实战案例：客服邮件自动处理**
```
邮件原文 
  → [Prompt 1] 提取关键要点 
  → [Prompt 2] 情感分类 
  → [Prompt 3] 生成回复建议
```

**每步 Prompt 模板**：

**Step 1 - 提取关键要点**：
```
提取客户支持邮件中三个最重要的关键点：
邮件: "{email_text}"
关键点:
```

**Step 2 - 情感分类**：
```
根据以下客户关切，将整体情感分类为'正面'、'中性'或'负面'：
{key_points}
情感:
```

**Step 3 - 生成回复**：
```
基于以上关键点和情感，做两件事：
1. 一句话总结客户问题
2. 建议礼貌、有帮助的回复
```

**技术优势**：
- 每个步骤可独立调试优化
- 中间结果可追溯
- 易于添加异常处理分支

**Source**: Tech Daily Shot

---

## 🧠 方法论与 Prompt (Methods & Prompts)

### 8. 约束 = 复利 —— 驯化漂移系统的元方法论

**核心主张**：给会漂的系统加结构化约束，短期看像加麻烦，长期是**复利发动机**。

**会漂的系统**：
- AI 创作会漂、团队风格会漂
- Prompt 复用率会漂、笔记主题会漂
- 所有"自由度大、反馈慢"的系统都会熵增

**约束复利四步法**：

| 步骤 | 提问 | 落地案例 |
|-----|------|---------|
| **1. 找 anchor** | 对齐该参照什么？ | `--cref` 锚点图 / `capture_type` 五类 |
| **2. 强制必填** | 不加约束的入口在哪？ | ingest 强制判断 / Prompt 库强制版本号 |
| **3. 暴露偏离** | 漂移时如何被看见？ | weekly-audit / INDEX-by-type Dataview |
| **4. 反馈回流** | 修正后的能量去哪？ | used_by 回填 / contribution_count 累计 |

**本周自我连接**：
- [[character-consistency-techniques]] — `--cref` 约束 AI 绘图漂移
- [[INDEX-by-type]] — `capture_type` 约束笔记分类漂移
- [[harness-engineering]] — rules/skills/spec 约束 Agent 行为漂移

**判断公式**：
> "如果未来这件事至少会发生 5 次，且每次的输入有 70% 的相似度，加约束。否则不加。"

**Source**: @catwqwang（本周 vault 连接发现）

---

### 9. 单一变量锁定法 —— Prompt 工艺的核心 Pattern

**原理**：**高 weight 锁定单一视觉变量**，实现稳定输出。

**跨平台映射**：

| 平台 | 技术 | 锁定的变量 |
|-----|------|-----------|
| Midjourney | `--cref URL --cw 100` | 角色面部+服装+发型 |
| Stable Diffusion | IP-Adapter + ControlNet | 参考图特征注入 |
| Eye Realism | 眼部专用 Prompt | 虹膜、角膜缘、眼神光等 10 维度 |

**锚点图 Prompt 模板**：
```
精确到解剖学级别描述，从大到小逐层锁定：
1. 骨骼结构 → 2. 五官 → 3. 皮肤 → 4. 发型
5. 装备层级（由外到内）：帽子→上衣→背心→手套→裤子→靴子→武器
6. 姿态关键词：combat relaxed / micro-asymmetric stance
7. 光影作为身份锚：固定光源方向和色调
```

**建议沉淀**：可将此法提炼为 [[single-variable-locking]]，作为团队 Prompt 工艺培训材料。

**Source**: @catwqwang（character-consistency + eye-realism 连接发现）

---

## §4 推荐上手顺序

| 顺序 | 条目 | 学习成本 | 价值收益 | 适合人群 |
|-----|------|---------|---------|---------|
| 1 | Claude Artifacts 一键分享 | ⭐ | ⭐⭐⭐⭐⭐ | 所有人，立刻可用 |
| 2 | Karpathy Knowledge Base | ⭐⭐ | ⭐⭐⭐⭐⭐ | 知识工作者 |
| 3 | Claude Agent 编排模式 | ⭐⭐⭐ | ⭐⭐⭐⭐ | Agent 开发者 |
| 4 | OpenAI Tool Search | ⭐⭐ | ⭐⭐⭐⭐ | 工具平台开发者 |
| 5 | 约束 = 复利方法论 | ⭐ | ⭐⭐⭐⭐⭐ | 系统设计者 |
| 6 | Dynamic Workflows | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 工程师、团队负责人 |

---

## 📊 本周信源覆盖

- ✅ OpenAI：Tool Search、Function Calling 进化
- ✅ Anthropic：Opus 4.8、Dynamic Workflows、Artifacts 分享
- ✅ Kimi：K2.6 开源、300 Agent 集群
- ✅ Karpathy：Knowledge Base 工作流公开
- ✅ 方法论：约束 = 复利（本周 vault 自我连接发现）

---

*AI 干货周报 · Issue #10*
*周期：2026.05.26 - 2026.06.01*
*—— 小柒AI速递 · 每周一上午推送*
