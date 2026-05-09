# LLM Wiki — Cross-Platform Desktop Application

> 来源: https://github.com/nashsu/llm_wiki
> 获取时间: 2026-04-10
> 原始链接: https://t.co/1dv5jcXmzW

---

## 项目概述

**LLM Wiki** 是一个跨平台桌面应用程序，能够自动将用户的文档转化为有组织的、相互链接的知识库。与传统 RAG（每次从头检索并回答）不同，该项目采用 LLM 增量构建并维护持久化 Wiki 的模式。

基于 Andrej Karpathy 提出的 "LLM Wiki pattern" 设计理念，将其实现为完整的桌面应用，增加了大量扩展功能。

- **GitHub**: https://github.com/nashsu/llm_wiki
- **作者**: nashsu
- **Stars**: 520
- **最新版本**: v0.2.0（2026-04-10）
- **许可证**: GNU General Public License v3.0
- **主要语言**: TypeScript (66.5%), JavaScript (22.5%), Rust (9.4%)

---

## 核心特性

### 1. 两步链式思维摄取（Two-Step Chain-of-Thought Ingestion）

- **第一步**：LLM 分析源文件（关键实体、概念、联系、矛盾）
- **第二步**：基于分析生成 Wiki 页面，包含来源追溯和增量缓存

### 2. 四信号知识图谱（Four-Signal Knowledge Graph）

基于四种信号计算页面相关性：
- 直接链接（Direct Links）
- 来源重叠（Source Overlap）
- Adamic-Adar 指标
- 类型亲和力（Type Affinity）

支持 sigma.js 图谱可视化和交互。

### 3. Louvain 社区检测

自动发现知识集群并进行凝聚力评分。

### 4. 图谱洞察（Graph Insights）

自动发现"令人惊讶的连接"（Surprising Connections）和"知识缺口"（Knowledge Gaps），支持一键深度研究。

### 5. 四阶段查询检索

分词搜索 → 图谱扩展 → 预算控制 → 上下文组装。

### 6. 深度研究（Deep Research）

使用 Tavily API 进行网络搜索，自动提取结果并摄入 Wiki。

### 7. Chrome 网页剪辑器

一键捕获网页内容并自动转化为 Markdown 摄入知识库。

### 8. 多格式文档支持

PDF, DOCX, PPTX, XLSX, 图片, 音视频等。

### 9. 级联删除

删除源文件时，自动清理相关的 Wiki 页面和断开的链接。

### 10. 多对话与持久化

支持独立对话会话，聊天记录和设置持久化保存。

---

## 技术栈

| 层 | 技术 |
|---|---|
| 桌面端 | Tauri v2 (Rust 后端) |
| 前端 | React 19 + TypeScript + Vite |
| UI 组件 | shadcn/ui + Tailwind CSS v4 |
| 编辑器 | Milkdown (WYSIWYG) |
| 图谱 | sigma.js + graphology + ForceAtlas2 |
| LLM 接口 | OpenAI, Anthropic, Google, Ollama, 自定义端点 |

---

## 安装方式

### 预构建二进制文件
从 GitHub Releases 下载安装包：
- macOS: .dmg
- Windows: .msi
- Linux: .deb / .AppImage

### 从源码构建
需要 Node.js 20+, Rust 1.70+：
```bash
git clone https://github.com/nashsu/llm_wiki.git
cd llm_wiki
npm install
npm run tauri dev      # 开发模式
npm run tauri build    # 生产构建
```

### 浏览器扩展
Chrome 扩展管理页面 → 开启开发者模式 → 加载 `extension/` 文件夹。

---

## 与 Karpathy 原版方案的对比

| 维度 | Karpathy 原版（Agent + Obsidian） | nashsu/llm_wiki 桌面应用 |
|------|----------------------------------|-------------------------|
| 形态 | 纯文本 + Agent CLI | GUI 桌面应用 |
| 图谱可视化 | 依赖 Obsidian Graph View | 内置 sigma.js 四信号图谱 |
| 社区检测 | 无 | Louvain 算法自动发现知识集群 |
| 图谱洞察 | 无 | 自动发现惊讶连接和知识缺口 |
| 深度研究 | 手动 | Tavily API 一键网络搜索+摄入 |
| 网页剪藏 | 手动复制 | Chrome 插件一键剪藏 |
| 多格式支持 | 主要 Markdown | PDF/DOCX/PPTX/XLSX/图片/音视频 |
| 级联删除 | 手动维护 | 自动级联清理 |
| 查询机制 | Agent 直接搜索 Markdown | 四阶段检索（分词→图谱扩展→预算→组装） |
| 门槛 | 需要配置 Agent + Obsidian | 下载安装即用 |
