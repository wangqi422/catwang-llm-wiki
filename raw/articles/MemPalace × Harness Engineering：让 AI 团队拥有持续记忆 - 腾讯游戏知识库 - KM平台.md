---
title: "MemPalace × Harness Engineering：让 AI 团队拥有持续记忆 - 腾讯游戏知识库 - KM平台"
source: "https://km.woa.com/group/29321/articles/show/625994?kmref=woa_tips_daily"
author:
published:
created: 2026-04-08
description:
tags:
  - "clippings"
---
2026-04-07 22:12

AI辅助声明

427

1

8

分享

宽屏

文章摘要

思维导图

文章朗读

## MemPalace × Harness Engineering：让 AI 团队拥有持续记忆

> **系列定位** ：本文是《Harness Engineering实战》的延伸篇，上篇解决"团队如何可靠运转"，本篇解决"团队如何持续成长"。  
> **适用对象** ：正在用 AI 做内容运营、监控、报告生成的团队，希望 AI 不再"每次从零开始"的人。  
> **参考案例** ：小风团队（CF端游运营监控）  
> 发布时间：2026年4月

---

## 序章：一个演员发现了我们没解决的问题

好莱坞演员 Milla Jovovich 用 AI 工作了几个月后，发现了一个问题——每次对话结束，所有决策和思考都消失了。

她没有等 AI 公司解决这个问题。她和朋友用 Claude Code 花了几个月，做出了 MemPalace——借鉴古希腊记忆宫殿术，把 AI 记忆组织成可导航的空间结构。

结果：行业 benchmark 历史首个满分，MIT 开源。

我们看到这件事，立刻问自己： **它说的那个问题，我们有吗？**

有。而且不只是记忆消失，是更深的问题。

---

## 一、我们缺什么：Harness × Memory 双重诊断

《Harness Engineering实战》帮我们找到了三个结构性缺口：验证缺失、上下文过载、单点全包。

MemPalace 让我们看到了第四个缺口，也是最难感知的一个：

> **AI 团队没有跨会话记忆，每次执行都是全新的个体，无法真正积累经验。**

对照小风团队的实际问题：

| 症状 | 根本原因 |
| --- | --- |
| 口碑评级「感觉偏负」，但说不出比上周好还是差 | 没有历史基准线，评级靠当次感知 |
| 版本报告写「玩家反馈积极」，无法说「比步枪荣耀首周高 15%」 | 无历史版本对比数据 |
| 「幻神返场吐槽持续升温」写了三周，不知道是不是真的在升 | 没有时序存储，趋势只靠 AI 推测 |
| 案例库是静态文档，每次响应都要全量加载 | 没有语义检索，5000 字的案例库每次整体消耗 token |
| 「口碑健康指数基准线」一直是 P0 待落地事项 | 没有工具存储连续数据 |

这五个症状，指向同一个缺失： **团队有缰绳，但没有宫殿。**

---

## 二、升级后的核心公式

> **原版（Harness Engineering）：Agent = Model + Harness**
> 
> **升级版：Agent = Model + Harness + Palace**

三个要素分工清晰：

- **Model** ：智能本身，语言理解、推理、生成
- **Harness（缰绳）** ：控制系统，角色分工、验证层、上下文架构
- **Palace（宫殿）** ：记忆系统，跨会话存储、语义检索、时序积累

缺 Harness，AI 没有方向，会犯错、越界、失控。  
缺 Palace，AI 没有记忆，每次从零开始，无法积累，无法成长。

---

## 三、MemPalace 是什么，怎么工作

MemPalace 的核心思路借鉴古希腊记忆宫殿术：把信息组织成有空间结构的层级，让 AI 像在建筑里导航一样检索记忆。

### 空间结构

```javascript
Wing（翼楼）— 一个人或一个项目

  └── Room（房间）— 话题维度

        └── Closet（壁橱）— 压缩摘要，AI 快速定位用

              └── Drawer（抽屉）— 原始内容，完整保留
```

翼楼之间有 Tunnel（隧道）连通，同一话题在不同翼楼之间自动关联。

**检索效果对比（官方 benchmark 数据）：**

| 检索范围 | 准确率 |
| --- | --- |
| 全库搜索（无结构） | 60.9% |
| 限定翼楼 Wing | 73.1%（+12%） |
| 限定翼楼 + 大厅 Hall | 84.8%（+24%） |
| 限定翼楼 + 房间 Room | 94.8%（+34%） |

结构本身就是 34% 的准确率提升。

### 四层记忆加载策略

| 层级 | 内容 | 大小 | 触发方式 |
| --- | --- | --- | --- |
| L0 | 身份：这个 AI 是谁、监控什么 | ~50 token | 每次必加载 |
| L1 | 关键事实：当前重点、活跃风险、竞品快照 | ~120 token（AAAK 压缩） | 每次必加载 |
| L2 | 场景记忆：最近会话、当前项目 | 按需 | 话题出现时 |
| L3 | 深度检索：语义查询全库 | 按需 | 明确需要时 |

每次 AI 启动，只需 ~170 token 加载 L0+L1，就知道「自己是谁、现在在做什么、有什么风险」。需要历史数据时，精准检索对应 Wing + Room，按需取用。

---

## 四、小风团队实践：从架构设计到落地

### 4.1 Wing 结构设计

```javascript
cf-palace/

├── wing_cf_daily        ← 日报存档

├── wing_cf_weekly       ← 周报存档

├── wing_cf_version      ← 版本报告存档

├── wing_cf_crisis       ← 舆情案例库（核心价值）

├── wing_cf_competitor   ← 竞品监控基准

└── wing_cf_baseline     ← 口碑健康基准线（P0 待落地项）
```

### 4.2 安装与初始化

```bash
pip install mempalace

mempalace init ~/cf-palace

# 导入历史存档

mempalace mine ~/exports/daily/   --mode convos --wing cf_daily

mempalace mine ~/exports/weekly/  --mode convos --wing cf_weekly

mempalace mine ~/exports/cases/   --wing cf_crisis

# 接入 MCP（让 AI 直接调用）

claude mcp add mempalace -- python -m mempalace.mcp_server
```

### 4.3 Cron Prompt 改造（核心步骤）

每个定时任务在执行流程之前，加入三行记忆加载：

```javascript
【记忆加载——每次执行前必做】

1. mempalace wake-up --wing cf_weekly

   → 加载关键事实层（~170 token），知道当前监控重点和活跃风险

2. mempalace search "[本版本名] 口碑"

   → 检索历史对比数据，让评级有历史依据

3. mempalace search "竞品 近期动态"

   → 核查竞品基准，只记录变化量，不重复描述静态数据
```

每次执行完成后，加入两行记忆写入：

```javascript
【记忆更新——每次执行后必做】

1. mempalace_kg_add("CF端游", "口碑评级_[日期]", "[评级结论]")

   → 积累口碑基准线，30天后自动成型

2. mempalace_add_drawer 写入本次报告摘要到 wing_cf_daily

   → 下次可检索
```

### 4.4 小审与 Palace 联动验证

在小审检查清单中新增两条 Palace 依赖项：

```javascript
□ 口碑评级是否有历史依据？

  → 必须调用 mempalace search 对比后才能放行

  → 不能只写「玩家反馈积极」，需写「评级中性偏正，与步枪荣耀首周持平」

□ 竞品数据是否过期（>7天）？

  → 检查 wing_cf_competitor 最后更新时间，过期需注明「数据截至 XX 日」
```

### 4.5 口碑基准线：P0 事项的解法

舆情三大机制建设框架中，「口碑健康指数基准线」一直是 P0 待落地事项，依赖条件是「风讯历史数据」——但风讯接口至今未开放。

MemPalace 提供了另一条路： **不等外部接口，从今天开始自建。**

每次日报写入一条 KG 三元组：

```python
mempalace_kg_add("CF端游", f"口碑评级_{today}", rating)

# rating: "L0正面" / "L1中性偏正" / "L1中性偏负" / "L2负面" / "L1+紧急"
```

30天后：

```bash
mempalace_kg_timeline "CF端游"

# → 输出时间轴口碑趋势，真实基准线自然成型
```

---

## 五、通用方法论：适用于任何 AI 内容团队

以下提炼自小风团队实践，可直接复用于其他场景（其他游戏产品、其他内容监控体系）。

### 五步建立 AI 团队记忆体系

**Step 1：设计 Wing 结构（30分钟）**

每个 Wing 对应一个人或一个项目维度，思考原则：

- 「我经常需要检索什么历史信息？」→ 建对应 Wing
- 「什么信息需要跨维度关联？」→ 用 Tunnel 连通
- 不要建超过 10 个 Wing，精简优于全覆盖

**Step 2：导入历史存档（1-2天）**

不要等「系统完善了再导入」，先把现有的报告/案例库/决策记录批量 mine 进去。即使格式不完美，有数据就有价值。

**Step 3：改造 Prompt——加入记忆加载和写入（每个任务 10分钟）**

记忆加载写在 Prompt 开头，记忆写入写在 Prompt 结尾。这是让 AI 团队从「执行者」变成「学习者」的关键一步。

**Step 4：在验证层加入 Palace 依赖项**

小审（或任何验证角色）的检查清单中，加入「是否有历史依据支撑」的硬性要求。历史依据 = Palace 检索结果。

**Step 5：建立 KG 时序积累机制**

每次报告写入一条 KG 三元组，不需要立刻有用，30天后会有你现在无法想象的价值。

---

## 六、三个维度的升级效果对比

| 维度 | 升级前 | 升级后 |
| --- | --- | --- |
| **报告质量** | 「玩家反馈较为积极」 | 「口碑中性偏正，与步枪荣耀首周基本持平，低于功夫联动版本 8%」 |
| **token 效率** | 历史案例库全量加载（~5000 token） | 语义检索按需取用（~500 token） |
| **基准线建设** | 依赖外部接口，P0 长期搁置 | 每日自动积累，30天成型 |
| **验证可信度** | 小审只能核查「是否混入手游」 | 小审可核查「评级是否有历史数据支撑」 |
| **竞品监控** | 每次重复描述静态数据 | Palace 存基准，只记录变化量 |

---

## 七、一句话总结

> **Harness 让 AI 有方向，Palace 让 AI 有记忆。两者结合，AI 团队才能真正持续进化，而不只是反复执行。**

---

## 附录：参考资源

| 资源 | 链接 |
| --- | --- |
| MemPalace GitHub | [https://github.com/milla-jovovich/mempalace](https://github.com/milla-jovovich/mempalace "https://github.com/milla-jovovich/mempalace") |
| 上篇：AI内容监控系统从零搭建 | [https://km.woa.com/articles/show/655123](https://km.woa.com/articles/show/655123?kmref=user_articles_list) |
| 进阶篇：Harness Engineering 实战 | [https://km.woa.com/articles/show/656054](https://km.woa.com/articles/show/656054?kmref=user_articles_list) |

---

*By 小小 × 惊风 | 2026-04-07*

更新于：2026-04-07 22:12

标签：

相关阅读(2)

微信扫一扫赞赏

收录

反馈

8

8

1

- [有人尝试过采用前端Remotion来复刻动漫视频并用模型来转制成不同风格？](https://teko.woa.com/mkplus/q/304131?kmref=entry_card)
	TEKO 63阅读 4月2日
- [KaLM大模型应用实践](https://km.woa.com/knowledge/8139?kmref=entry_card)
	文集 6379阅读 3月11日
- [小米的AI“mimo”也来了，似乎能媲美ds？](https://km.woa.com/q/view/367849?kmref=entry_card)
	乐问 4527阅读 2025年12月17日
- [我觉得元宝产品设计非常不诚实](https://km.woa.com/q/view/367815?kmref=entry_card)
	乐问 4086阅读 2025年12月17日
- [字节的豆包这么强，做对了什么？](https://km.woa.com/q/view/367026?kmref=entry_card)
	乐问 24786阅读 2025年12月02日

![](https://km.woa.com/img/download_openkm.png)

扫一扫安装手机KM

解释