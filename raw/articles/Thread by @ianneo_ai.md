---
title: "Thread by @ianneo_ai"
source: "https://x.com/ianneo_ai/status/2042910729213481143"
author:
  - "[[@ianneo_ai]]"
published: 2026-04-11
created: 2026-04-11
description: "继续：基于 Karpathy 的 LLM Wiki 方法 把 Obsidian 和 Claude Code 接起来之后，写东西的方式彻底变了！！ 以前写一篇教程：查资料 → 整理大纲 → 写正文 → 找配图 → 排版，一篇两小时起步 现在的流程是这样： 把素材丢进 raw"
tags:
  - "clippings"
---
**Ian (伊恩)** @ianneo\_ai 2026-04-11

继续：基于 Karpathy 的 LLM Wiki 方法

把 Obsidian 和 Claude Code 接起来之后，写东西的方式彻底变了！！

以前写一篇教程：查资料 → 整理大纲 → 写正文 → 找配图 → 排版，一篇两小时起步

现在的流程是这样：

把素材丢进 raw/，说一句「加到 wiki」，Claude 自动消化成结构化笔记

想写文章，说「基于这些笔记写一篇」，它从我自己的知识库里取料，不是凭空编

写完直接喊「配图」，它按 定制的风格生成 HTML 卡片，Playwright 截成 PNG，封面和插图一次出齐

全程在 Obsidian 里看得见摸得着，每一步都能改

最大的变化不是快了多少，是终于敢写长文了

看效果 👇

> 2026-04-11
> 
> Karpathy 的 LLM Wiki 方法实测了一下，是目前最适合一人企业的知识库方案
> 
> 逻辑特别简单：
> 
> raw/ 放原始素材，Claude 只读不改
> 
> wiki/ 放 Claude 消化后的笔记，按主题分
> 
> 一个 index.md 做全局索引，一个 log.md 记录每次操作
> 
> 然后在 CLAUDE.md 里写死三个触发词：
> 
> 加到 wiki→ 自动归档 +
> 
> ![Image](https://pbs.twimg.com/media/HFngHH3agAEtDN-?format=jpg&name=large) ![Image](https://pbs.twimg.com/media/HFnfR55akAAA4J3?format=jpg&name=large)

---

**刀刀** @daodao166888 [2026-04-11](https://x.com/daodao166888/status/2042916960103436731)

哇，这个分享看得我眼睛一亮！

Karpathy的LLM Wiki方法本来就很有启发性，你把它和Obsidian、Claude Code这么深度接起来之后，感觉整个知识管理一下子从“手动整理”变成了“自动养成”。素材扔进raw/就自动消化成结构化笔记，还有触发词自动归档、合并同类项、级联更新，甚至写文章时直接从自己的wiki里拉料、生成配图……这不光是效率提升，简直是把“写长文”的心理门槛彻底降低了。

看到你这个流程，我才发现自己的笔记管理还停留在比较初级的阶段——素材虽然不丢，但整理和调用还是得自己操心。

真的谢谢你这么详细地拆解出来，期待你后续更多长文和实操案例，继续跟着学了！

---

**Ian (伊恩)** @ianneo\_ai [2026-04-11](https://x.com/ianneo_ai/status/2042928535300604264)

谢谢喜欢

---

**QingYue** @YuLin807 [2026-04-11](https://x.com/YuLin807/status/2042950580134420564)

完了！又多了一个会用AI写长文的人

---

**Ian (伊恩)** @ianneo\_ai [2026-04-11](https://x.com/ianneo_ai/status/2042951010608648459)

😭

---

**ImL1s** @aa22396584 [2026-04-11](https://x.com/aa22396584/status/2042939025888284830)

把接这个组合很聪明，双向链接知识库加写作，基本消灭了找资料这步骤。想问下你的流程是生成草稿后再在手动完善，还是全程都在编辑器里搞定？