---
title: "周审计报告 · 2026 第 27 周"
type: insight
track: shared
created: 2026-07-06
updated: 2026-07-06
tags:
  - vault-health
  - weekly-audit
---

# 周审计报告 · 2026 第 27 周

> 扫描 wiki/ 总计 **118 篇**，活跃 **5 篇**，本周新标 REVIEW **0 篇**，归档 **0 篇**。  
> 执行时间：2026-07-06 09:35

## 📊 活性统计

| 维度 | 数量 | 占比 |
|-----|-----|-----|
| 活跃（有 used_by / surfaced_with / 入向链） | 5 | 4.2% |
| REVIEW（已标记待复核） | 3 | 2.5% |
| 归档（在 _archive/） | 1 | 0.8% |
| 睡眠（无活性标记） | 109 | 92.5% |
| **总数** | **118** | 100% |

> 健康基线：活跃占比应 ≥ 60%。当前 **4.2%** — **⚠️ 警戒状态**
> 
> **说明**：本周 vault 活性极低，主要原因是笔记体系刚建立，大部分笔记为 stub 状态尚未被使用。建议通过实际项目/决策引用激活笔记，或考虑批量 distill 合并冗余 stub。

---

## ✅ 本周活跃笔记（5 篇）

满足以下任一条件：
- 有 `used_by` 非空
- 有 `surfaced_with` 非空  
- 被其他笔记 wikilink 引用 ≥ 1 次
- 近 14 天被修改且关联活跃项目

| 笔记 | 活性来源 | 说明 |
|-----|---------|------|
| [[constraints-as-leverage]] | used_by + surfaced_with + 入向链 | 被 1 处 used_by 引用，连接报告提及，30 条入向链 |
| [[CHIEF.md]] | used_by | 被 1 处 used_by 引用 |
| [[character-consistency-techniques]] | used_by + surfaced_with + 入向链 | 被连接报告多次提及，15 条入向链 |
| [[INDEX-by-type]] | used_by + surfaced_with + 入向链 | 索引页，20 条入向链 |
| [[harness-engineering]] | 入向链 | 17 条入向链，核心概念页 |

---

## 🟡 当前 REVIEW 状态笔记（3 篇）

| 笔记 | REVIEW 标记日 | 标记原因 | 建议动作 |
|-----|--------------|---------|---------|
| [[constraints-as-leverage]] | 2026-06-01 | 历史标记 | **已激活**，建议清除 REVIEW 标记 |
| [[INDEX-by-type]] | 2026-06-01 | 历史标记 | **索引页永久保留**，建议清除 REVIEW 标记 |
| [[_archive/2026-05-pureref]] | 2026-06-01 | 已归档 | 已在 _archive/，状态正常 |

---

## 📦 归档历史（1 篇）

| 笔记 | 归档日 | 归档原因 |
|-----|-------|---------|
| [[_archive/2026-05-pureref]] | 2026-06-29 | weekly-audit: 28 天无活动 |

---

## 💡 本周建议

### 1. Vault 活性极低，需主动激活
当前活跃率仅 4.2%，远低于 60% 健康基线。主要原因：
- 笔记多为 stub（占位符），内容尚未充实
- 缺乏 `used_by` 引用链条

**建议动作**：
- 在接下来的一周，每完成一个决策或项目，强制要求引用至少 1 条 wiki 笔记
- 使用 `decision-feeder` 或 `writing-activator` 让笔记被用起来

### 2. 清理历史 REVIEW 标记
[[constraints-as-leverage]] 和 [[INDEX-by-type]] 已被多次引用，但仍带 REVIEW 标记，建议清除。

### 3. 考虑批量 distill
如果大量 stub 笔记长期（>30 天）未被使用，考虑触发 `distill` skill 合并相关主题。

---

## 🚨 异常检查

| 检查项 | 结果 |
|-------|------|
| 入向链失效 | ✅ 未发现 |
| frontmatter 缺失 | ⚠️ 大量 stub 笔记缺少完整 frontmatter（仅 title + tags） |
| 重复笔记 | ✅ 未发现 |
| _archive/ 完整性 | ✅ 正常 |

---

## 🔄 待复盘决策

本周无待复盘决策（decisions/ 目录为空）。

---

## 附录：活性判定规则

一条笔记是**活的**，如果满足任一条件：
1. frontmatter 有 `used_by:` 非空
2. frontmatter 有 `surfaced_with:` 非空
3. 全库 grep 本笔记有 ≥ 1 条入向 wikilink
4. 近 14 天被修改且 tag 命中活跃项目
5. 被 connection-surface 提及（本周新增连接）

---

*报告生成：weekly-audit skill | 第 27 周审计完成*
