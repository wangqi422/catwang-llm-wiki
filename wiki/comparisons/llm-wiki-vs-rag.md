---
title: "LLM Wiki vs RAG"
type: comparison
created: "2026-04-08"
updated: "2026-04-15"
sources:
  - "[[raw/articles/Grok.md]]"
tags:
  - comparison
  - knowledge-management
aliases: []
---

# LLM Wiki vs RAG

## 概述

[[wiki/concepts/llm-wiki.md|LLM Wiki]] 和 [[wiki/concepts/rag.md|RAG]] 是两种根本不同的 LLM 知识增强范式。前者强调"编译"（主动加工并持久化），后者强调"检索"（临时查找并生成）。[[wiki/people/andrej-karpathy.md|Karpathy]] 明确将 LLM Wiki 定位为 RAG 的进阶替代。

## 对比表

| 维度 | LLM Wiki | RAG |
|------|----------|-----|
| **核心机制** | LLM 主动编译成结构化 Wiki | 查询时临时检索 + 生成 |
| **知识持久化** | 高（Wiki 是永久加工后的 artifact） | 低（答案生成后即丢弃） |
| **结构化程度** | 很高（自动建页、链接、索引、总结） | 低（依赖原始文档结构） |
| **积累性** | 知识持续累积，越用越"聪明" | 无积累，每次重新检索 |
| **矛盾检测** | 自动发现并标注不同来源的矛盾 | 不检测矛盾 |
| **维护成本** | 需要定期 Lint 维护 | 基本无需维护 |
| **前置成本** | 高（Ingest 需要编译时间） | 低（文档入库即可用） |
| **数据所有权** | 极高（纯 Markdown，本地文件） | 取决于具体实现 |
| **适合场景** | 深度研究、长期积累、复杂主题 | 快速问答、临时查询 |
| **工具依赖** | Obsidian + LLM Agent | 向量数据库 + LLM API |

## 结论

- **选 LLM Wiki**：当你需要在某个领域深度积累，追求知识的"复利效应"，且愿意投入前置编译时间
- **选 RAG**：当你需要快速从大量文档中找答案，不追求知识的长期沉淀
- **最佳实践**：两者可以结合——RAG 做快速查询入口，LLM Wiki 做长期知识沉淀层

## Related

- [[wiki/concepts/llm-wiki.md]]
- [[wiki/concepts/rag.md]]
- [[wiki/concepts/knowledge-compilation.md]]
- [[wiki/topics/personal-knowledge-management.md]]
- [[wiki/summaries/2026-04-08-grok-karpathy-llm-wiki.md]]
