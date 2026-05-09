---
name: evolution-engine
description: "统一进化引擎 Skill：合并 Skill 优化 与 Prompt 进化 两套重叠机制。触发词：优化skill / skill评分 / 达尔文 / darwin / 进化prompt / 优化prompt / prompt迭代 / 新建prompt / 存prompt。根据目标自动进入 skill 模式（优化 `_skills/*.md`）或 prompt 模式（管理 `prompts/**/*.md`）。"
---

# Skill: Evolution Engine（统一进化引擎）

> **触发词**: `优化skill` / `skill评分` / `达尔文` / `darwin` / `进化prompt` / `优化prompt` / `prompt迭代` / `新建prompt` / `存prompt` / `帮我存一下`
> **职责**: 把原来的 **Skill 优化系统** 与 **Prompt 自动进化系统** 合并为一个统一的“评估 → 变异/改进 → 验证 → 棘轮保留”引擎。
> **兼容说明**: 本文件已吸收原 `_skills/prompt-evolve.md`。以后凡是优化 Skill、评估 Prompt、归档 Prompt，都先读本文件。

---

## 0. 模式判断（先选对象）

| 目标对象 | 模式 | 典型路径 | 核心动作 |
|---|---|---|---|
| Skill 文档 | **skill 模式** | `_skills/*.md` | 评分、改写、测试、保留或回滚 |
| Prompt 文档 | **prompt 模式** | `prompts/**/*.md` | 识别、分类、评分、A/B 进化、归档 |
| 用户直接丢来一段疑似做图提示词 | **prompt 模式** | 待归档文本 | 先识别是不是 Prompt，再决定保存与进化 |

**默认路由规则**：
- 用户提到 `skill`、`SKILL.md`、SOP、流程文档 → `skill 模式`
- 用户提到 `prompt`、做图指令、模型参数、负面词、风格词 → `prompt 模式`
- 不确定时，先做 **识别协议**，不要直接误入 ingest

---

## 1. 共用设计哲学

1. **单一可编辑资产**：每轮只改一个文件
2. **双重验证**：结构评估 + 效果验证
3. **棘轮机制**：只有变好才保留，退步就回滚
4. **人在回路**：关键节点要给用户看结果，而不是黑箱连跑
5. **版本可追溯**：每次改动都必须能解释“改了什么、为什么、效果如何”

统一循环：

```text
Baseline → 找最弱维度 → 生成一个改进方案 → 验证 → keep / revert → 记录历史
```

---

## 2. skill 模式（原 Darwin Skill）

### 2.1 适用范围

- 优化 `_skills/*.md`
- 评估某个 Skill 是否清晰、可执行、边界完整
- 审查触发词、检查点、异常处理是否足够

### 2.2 8 维 Rubric（总分 100）

#### 结构维度（60 分）

| # | 维度 | 权重 |
|---|---|---|
| 1 | Frontmatter 质量 | 8 |
| 2 | 工作流清晰度 | 15 |
| 3 | 边界条件覆盖 | 10 |
| 4 | 检查点设计 | 7 |
| 5 | 指令具体性 | 15 |
| 6 | 资源整合度 | 5 |

#### 效果维度（40 分）

| # | 维度 | 权重 |
|---|---|---|
| 7 | 整体架构 | 15 |
| 8 | 实测表现 | 25 |

### 2.3 执行流程

#### Phase 0: 初始化

- 确定优化范围：单个 / 指定列表 / 全部 `_skills/*.md`
- 读取 `_deploy/darwin-skill/results.tsv`
- 若需要，建立测试 Prompt 列表

#### Phase 1: 基线评估

- 逐项按 8 维打分
- 设计 2-3 个典型测试 Prompt
- 若能跑子 agent，则做 `with_skill` vs `baseline` 对比
- 若不能跑，退化为 `dry_run`

#### Phase 2: 单变量改进

- 只改最低分维度
- 一次只做一个明确改动
- 重新评估，只有 **新分数严格更高** 才保留

#### Phase 3: 记录与展示

- 结果写入 `_deploy/darwin-skill/results.tsv`
- 需要时生成成果卡片
- 把改前改后摘要给用户看

### 2.4 skill 模式约束

1. 不改变 Skill 的核心用途，只优化表达与执行质量
2. 每轮只改一个维度，避免无法归因
3. 效果验证优先独立执行，避免“自己改自己评”
4. 回滚用 `git revert`，不用破坏性命令

---

## 3. prompt 模式（原 Prompt Evolve）

### 3.1 Prompt 识别协议

命中以下特征 **≥2 条**，判定为 Prompt：

| 特征 | 典型信号 |
|---|---|
| 视觉描述词 | cinematic lighting, 8K, bokeh, dramatic shadows |
| 画面/场景描述 | “一个战士站在废墟前” |
| 模型参数 | `--ar 16:9`, `seed`, `steps`, `cfg_scale` |
| 负面提示词 | `negative prompt`, `--no watermark` |
| 模型名 | Midjourney, SDXL, FLUX, Kling, Runway, Wan |
| 关键词堆叠结构 | 逗号分隔的大量视觉关键词 |
| 语境暗示 | “帮我存一下这个 prompt” |

判定规则：
- 命中 `0-1` 条 → 不是 Prompt，走正常流程
- 命中 `≥2` 条 → 进入 Prompt 分类
- 不确定 → 主动确认是“存 Prompt”还是“普通 ingest”

### 3.2 Prompt 分类决策树

按最终交付物归档：

- 视频/动画 → `prompts/videos/`
- 角色立绘 → `prompts/characters/`
- 竖版海报 → `prompts/posters/`
- 横版 Banner → `prompts/banners/`
- 场景/环境 → `prompts/scenes/`
- 材质/纹理 → `prompts/textures/`
- 无法归类 → `prompts/other/`

**原则**：按最终用途归类，不按元素数量归类。

### 3.3 6 维 Rubric（总分 100）

#### 结构维度（40 分）

| # | 维度 | 权重 |
|---|---|---|
| 1 | 意图清晰度 | 10 |
| 2 | 构图指导 | 8 |
| 3 | 风格一致性 | 8 |
| 4 | 品牌合规 | 7 |
| 5 | 技术规范 | 7 |

#### 效果维度（60 分）

| # | 维度 | 权重 |
|---|---|---|
| 6 | 出图质量 | 60 |

### 3.4 prompt 模式执行流程

#### Phase 0: 初始化 / 新建 / 归档

- 读目标 Prompt 或用户新提交的文本
- 如尚未归档：
  - 选分类目录
  - 用 `_templates/prompt-template.md` 建页
  - 记录初始版本
- 读取 `prompts/_evolution-log.tsv`

#### Phase 1: 基线评估

- 从 6 维评分
- 如条件允许，生成 3 张样图
- 用户优先做人类判定；用户不在时可记为 `ai_eval`

#### Phase 2: 单策略变异

每轮只用一种策略：
- `M1` 结构重组
- `M2` 风格强化
- `M3` 细节填充
- `M4` 负面提示词优化
- `M5` 模型特性利用
- `M6` 探索性重写（高风险，需用户同意）

#### Phase 3: A/B 对比与棘轮保留

- 新旧 Prompt 并排生成或对比
- 用户选择：新版更好 / 旧版更好 / 差不多
- 只有明显更好才更新主版本
- 历史写入 `prompts/_evolution-log.tsv`
- 截图保存到 `prompts/_gallery/`

### 3.5 prompt 模式约束

1. 每轮只用一种变异策略
2. 品牌红线不可突破
3. 版本链必须可追溯
4. 图像效果优先人类判断
5. 成功模式要沉淀到 `_best-practices.md`

---

## 4. 统一记录系统

| 模式 | 历史文件 | 关键内容 |
|---|---|---|
| skill 模式 | `_deploy/darwin-skill/results.tsv` | 分数变化、保留/回滚、验证方式 |
| prompt 模式 | `prompts/_evolution-log.tsv` | 版本变化、变异策略、评估模式 |

### 成果展示

- `skill 模式`：可生成结果卡片，展示分数变化与改进点
- `prompt 模式`：保存样图对比，并更新最佳实践

---

## 5. 速查命令

### skill 模式

- `优化所有skills`
- `优化 xxx 这个skill`
- `评估所有skills的质量`
- `看看skill优化历史`

### prompt 模式

- `进化 prompts/posters/xxx.md`
- `进化所有海报 prompt`
- `评估 prompts/characters/ 下所有 prompt`
- `新建prompt：CODM S12 海报`
- `看看 prompt 进化记录`
- `总结 prompt 进化规律`

---

## 6. 与其他 Skill 的关系

- `design-style`：做图风格参数与品牌设计系统联动
- `publish`：高质量 Prompt 的输出图可进入展示文章
- `daily-card`：日报中发现的新视觉语言，可反向沉淀为 Prompt / Skill 优化样本
- `ingest`：如果用户丢来的文本不是 Prompt，应回到正常知识摄取链路
