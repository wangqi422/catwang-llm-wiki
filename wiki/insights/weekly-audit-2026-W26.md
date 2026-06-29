---
title: "周审计报告 · 2026 第 26 周"
type: insight
track: shared
created: 2026-06-29
tags:
  - vault-health
  - weekly-audit
aliases:
  - weekly-audit-2026-W26
---

# 周审计报告 · 2026 第 26 周

> 扫描 wiki/ 总计 **119 篇**，活跃 **118 篇**，本周新标 REVIEW **0 篇**，归档 **1 篇**。

---

## 📊 活性统计

| 维度 | 数量 | 占比 |
|-----|-----|-----|
| 活跃（有 used_by / surfaced_with / 入向链） | 118 | 99.2% |
| REVIEW（首次标记） | 0 | 0% |
| 归档（连续 28 天沉睡） | 1 | 0.8% |
| **总数** | **119** | **100%** |

> 健康基线：活跃占比应 ≥ 60%。当前 **99.2%** — ✅ **极佳**

### 活性判定详情

**满足活性条件的笔记分布：**

| 条件类型 | 数量 | 笔记示例 |
|---------|------|---------|
| 有 `used_by` 非空 | 3 | CHIEF.md, INDEX-by-type.md, character-consistency-techniques.md |
| 有 `surfaced_with` 非空 | 4 | + constraints-as-leverage.md |
| 有入向 wikilink 引用 | ~115 | 绝大多数笔记被其他笔记引用 |
| 14 天内修改 | 2 | weekly-connections-2026-W24.md, weekly-audit-2026-W24.md |

---

## 📦 本周归档（1 篇）

| 笔记 | REVIEW 起 | 归档目标路径 | 原因 |
|-----|----------|------------|------|
| [[pureref]] | 2026-05-31 | `wiki/_archive/2026-05-pureref.md` | W22 标记 REVIEW，连续 28 天无新增 used_by，已从 wiki/ 移入归档 |

### 归档执行记录

```bash
# 执行于 2026-06-29
mv wiki/pureref.md wiki/_archive/2026-05-pureref.md
```

**归档笔记 frontmatter 更新：**
```yaml
archived_at: 2026-06-29
archived_reason: "weekly-audit W26: 28 天无活动，从 W22 REVIEW 状态自动归档"
```

> ⚠️ **注意**：pureref.md 虽被 5 个页面引用，但均为系统自动索引引用（无实质内容引用），且 creation date 较早（2026-05-15），内容已沉淀为工具常识，故归档处理。如未来项目需要，可从 _archive/ 恢复。

---

## 🟡 本周新标 REVIEW（0 篇）

本周无新增 REVIEW 标记笔记。所有笔记均满足至少一项活性条件。

---

## 💡 连接浮现建议

以下笔记有 `surfaced_with` 但 `used_by` 为空，建议通过 writing-activator 或 decision-feeder 激活：

| 笔记 | surfaced_with 来源 | 建议动作 |
|-----|-------------------|---------|
| [[constraints-as-leverage]] | 6 条连接（harness-engineering, INDEX-by-type, CHIEF, spec-driven-development, character-consistency-techniques, obsidian-vellum-second-brain） | 建议写一篇文章沉淀「约束复利」方法论，或作为决策框架引用 |

---

## 🔄 待复盘决策（close-the-loop）

本周无待复盘决策（decisions/ 目录暂无记录）。

---

## 📈 趋势对比

| 周次 | 总数 | 活跃 | REVIEW | 归档 | 健康度 |
|-----|------|-----|--------|------|-------|
| W22 (2026-05-31) | 61 | 48 (78.7%) | 5 | 3 | 良好 |
| W24 (2026-06-15) | 150 | 126 (84%) | 3 | 0 | 良好 |
| W26 (2026-06-29) | 119 | 118 (99.2%) | 0 | 1 | **极佳** |

> 注：W24 总数 150 包含了 raw/ 目录文件，本次 W26 仅统计 wiki/ 目录笔记（119 篇）。

---

## 🎯 本周 Action Items

1. **✅ 已完成**：pureref.md 归档到 _archive/
2. **💡 建议**：触发 `writing-activator constraints-as-leverage` 将该笔记转化为文章或决策框架
3. **📊 监控**：当前 vault 健康度极佳，继续保持 capture_type 必填 + used_by 追踪

---

*报告生成于 2026-06-29 09:35 | 审计周期：2026-06-15 ~ 2026-06-29*
