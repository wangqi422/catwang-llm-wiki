---
title: "周连接报告 · 2026 第 22 周"
type: insight
capture_type: pattern
track: shared
created: 2026-06-01
updated: 2026-06-01
tags:
  - aigc
  - weekly-connection
sources:
  - "本周新增/修改 40+ 条笔记"
aliases:
  - 周连接 2026-W22
---

# 周连接报告 · 2026 第 22 周

> 本周新增/修改 **40+ 条笔记**，与全库交叉扫描后，发现 **6 条非显式连接**。
> 
> 已存在显式 wikilink 的连接已自动过滤。

---

## 🔗 同原理跨域（PRINCIPLE）

### 连接 1：约束 = 复利（元 Pattern 浮现）
- **核心笔记**：[[constraints-as-leverage]]（本周新增 ⭐）
- **关联笔记**：
  - [[character-consistency-techniques]] — `--cref` 锚点图约束 AI 绘图漂移
  - [[INDEX-by-type]] — `capture_type` 五类约束笔记分类漂移
  - [[harness-engineering]] — rules/skills/spec 约束 Agent 行为漂移
  - [[spec-driven-development]] — requirements.md 约束需求理解漂移
- **共通原理**：**给会漂的系统加结构化约束，短期是负担，长期是复利**
- **跨越领域**：AI 绘图 ↔ 知识管理 ↔ Agent 工程 ↔ 软件开发
- **建议动作**：constraints-as-leverage 已成为你的元方法论，建议沉淀为团队培训材料
- **可信度**：⭐⭐⭐

### 连接 2：单一变量锁定法
- **新笔记**：[[2026-05-25-nano-banana-eye-realism|nano-banana-eye-realism]]（本周新增）
- **老笔记**：[[eye-realism-prompt-technique]]（2026-05-15）
- **共通原理**：**高 weight 锁定单一视觉变量**（眼部细节）实现稳定输出
- **技术映射**：Midjourney `--cref` 锁定角色 == Eye Realism Prompt 锁定眼部 == IP-Adapter 锁定特征
- **建议动作**：可提炼为 [[single-variable-locking]] 通用 Prompt 工艺方法论
- **可信度**：⭐⭐⭐

---

## ⚔️ 矛盾对立（CONFLICT）

### 连接 3：约束 vs 陌生化张力
- **笔记 A**：[[constraints-as-leverage]] 主张「约束驯化漂移系统」
- **笔记 B**：[[content-creation-methodology]] §找角度 主张「跳出常识、陌生化」
- **冲突点**：约束是收敛，陌生化是发散——看起来对立
- **调和方案**：**两阶段模型** — 探索期（找角度）反约束，执行期（出稿）加约束
- **建议动作**：在 content-creation-methodology 中显式加入「两阶段论」澄清张力
- **可信度**：⭐⭐（概念层共鸣，需确认）

---

## 📎 证据补足（EVIDENCE）

### 连接 4：cref 进阶的实践验证
- **被支持的论点**：[[2026-05-31-cref进阶]] 需要 cref 使用技巧
- **支持证据**：[[character-consistency-techniques]] §两步生成法 已系统验证
- **建议动作**：在 cref 进阶笔记中加 wikilink 互引，避免重复造轮子
- **可信度**：⭐⭐⭐

### 连接 5：S39 海报与资产管线
- **被支持的论点**：[[2026-05-31-s39海报风格选型]] 需要技术可行性评估
- **支持证据**：[[codm-asset-pipeline]] + [[ai-campaign-prototyping]] 已有成熟流程
- **建议动作**：风格选型决策时引用 asset-pipeline 的技术约束条件
- **可信度**：⭐⭐⭐

---

## 🌀 隐式模式（PATTERN）

### 模式 1：锚点驱动工作流（3+ 笔记复现）
- **出现笔记**：
  - [[character-consistency-techniques]] — 锚点图 → 设定板
  - [[urban-character-prompt]] — 锚点提示词 → 批量生成
  - [[INDEX-by-type]] — capture_type 锚点 → 自动聚类
  - [[harness-engineering]] — rules 锚点 → Agent 行为对齐
- **共同未命名规律**：**先定义 Anchor → 后批量复用** 的通用工作流模式
- **建议动作**：建议沉淀为新概念页 [[anchor-driven-workflow]]
- **可信度**：⭐⭐ [需确认]

### 模式 2：五步反馈闭环（决策-审计系统）
- **出现笔记**：
  - [[decision-feeder]] — 决策记录 + review_at
  - [[weekly-audit]] — 扫描 review_at 到期决策
  - [[constraints-as-leverage]] — feedback 回流机制
- **共同未命名规律**：**决策 → 定时复盘 → 结果回填 → 知识复利** 的 close-the-loop 模式
- **建议动作**：在 constraints-as-leverage §案例5 已部分覆盖，可扩展为独立笔记
- **可信度**：⭐⭐ [需确认]

---

## ⏭️ 接力建议

| 优先级 | 建议 | 理由 |
|-------|------|------|
| 🔴 高 | 用 `writing-activator` 写 [[single-variable-locking]] | 连接2已凑齐 cref/eye-realism/ip-adapter 三类证据 |
| 🔴 高 | 用 `decision-feeder` 处理 S39 风格选型 | 连接5显示 asset-pipeline 约束条件已具备 |
| 🟡 中 | 跑实验验证「两阶段论」| 连接3张力需实战数据调和 |
| 🟢 低 | 沉淀 [[anchor-driven-workflow]] | 模式1积累足够多案例 |

---

## 📊 统计

- 本周新笔记数：~40 篇（含批量 frontmatter 更新）
- 候选连接数：12 条
- 入报告连接数：**6 条**（PRINCIPLE: 2, CONFLICT: 1, EVIDENCE: 2, PATTERN: 2）
- 已自动过滤（已显式连接）：~15 条

---

## 已更新 surfaced_with 的笔记

以下笔记已在其 frontmatter 中添加 `surfaced_with` 字段：

- [[constraints-as-leverage]] — surfaced_with: INDEX-by-type, CHIEF, character-consistency-techniques
- [[character-consistency-techniques]] — surfaced_with: constraints-as-leverage

---

*报告生成：[[connection-surface]] skill | 下次扫描：2026-W23*
