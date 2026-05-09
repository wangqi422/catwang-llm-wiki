# awesome-design-md

> Source: https://github.com/VoltAgent/awesome-design-md
> Captured: 2026-04-13
> Stars: 46.3k | Forks: 5.7k | License: MIT
> Tags: landing-page, awesome-list, design-tokens, design-system, vibe-coding, google-stitch, design-md

## 仓库描述

一个受流行品牌设计系统启发的 DESIGN.md 文件精选合集。将其放入你的项目中，让编码代理生成匹配的 UI。

## 核心概念：什么是 DESIGN.md？

- **定义**：由 Google Stitch 引入的新概念，是一个 AI 代理读取以生成一致 UI 的纯文本文档。
- **格式**：Markdown 文件。不需要 Figma 导出、JSON 架构或特殊工具。
- **使用方式**：将其放入项目根目录，任何 AI 编码代理或 Google Stitch 都能立即理解 UI 的外观。
- **核心理念**：Markdown 是大语言模型（LLM）读取效果最好的格式。

### 与 AGENTS.md 的区别

| 文件 | 角色 | 功能 |
|------|------|------|
| `AGENTS.md` | 编码代理 | 定义如何构建项目 |
| `DESIGN.md` | 设计代理 | 定义项目的外观和感觉 |

## 收录内容（共 66 个设计系统）

### AI & LLM 平台
Claude, Cohere, ElevenLabs, Minimax, Mistral AI, Ollama, OpenCode AI, Replicate, RunwayML, Together AI, VoltAgent, xAI

### 开发者工具 & IDE
Cursor, Expo, Lovable, Raycast, Superhuman, Vercel, Warp

### 后端、数据库 & DevOps
ClickHouse, Composio, HashiCorp, MongoDB, PostHog, Sanity, Sentry, Supabase

### 生产力 & SaaS
Cal.com, Intercom, Linear, Mintlify, Notion, Resend, Zapier

### 设计 & 创意工具
Airtable, Clay, Figma, Framer, Miro, Webflow

### 金融科技 & 加密货币
Binance, Coinbase, Kraken, Revolut, Stripe, Wise

### 电商 & 零售
Airbnb, Meta, Nike, Shopify

### 媒体 & 消费科技
Apple, IBM, NVIDIA, Pinterest, PlayStation, SpaceX, Spotify, The Verge, Uber, WIRED

### 汽车
BMW, Bugatti, Ferrari, Lamborghini, Renault, Tesla

## DESIGN.md 文件内部结构

每个文件遵循 Stitch DESIGN.md 格式，包含以下扩展章节：

1. **视觉主题与氛围** (Visual Theme & Vibe)：情绪、密度、设计哲学
2. **调色板与角色** (Color Palette & Roles)：语义名称 + 十六进制值 + 功能角色
3. **排版规则** (Typography)：字体系列、完整层次结构表
4. **组件样式** (Component Styles)：按钮、卡片、输入框、导航及其状态
5. **布局原则** (Layout Principles)：间距比例、网格、留白哲学
6. **深度与海拔** (Depth & Elevation)：阴影系统、表面层次
7. **做与不做** (Do's and Don'ts)：设计指导原则和反模式
8. **响应式行为** (Responsive Behavior)：断点、触摸目标、折叠策略
9. **代理提示指南** (Agent Prompt Guide)：快速颜色参考、现成的提示词

### 每个站点包含的文件

- `DESIGN.md`：设计系统文档（供代理读取）
- `preview.html` / `preview-dark.html`：展示色板、字体比例、按钮和卡片等视觉目录

## 如何使用

1. 复制某个站点的 `DESIGN.md` 到你的项目根目录
2. 告诉你的 AI 代理使用它（例如："build me a page that looks like this"）

## 关键洞察

- **DESIGN.md 是设计系统的 Markdown 化**：将传统的 Figma Design Token / JSON Schema 转为 LLM 原生可读的 Markdown 格式
- **Google Stitch 催生**：作为 Google Stitch 项目的设计描述格式被社区广泛采用
- **Vibe Coding 运动的一部分**：与 Cursor Rules、AGENTS.md 等一起构成"AI 原生开发规范"体系
- **品牌还原的新路径**：通过结构化文字描述（而非视觉稿）传递设计意图给 AI
- **开源生态繁荣**：46.3k Star 证明社区强烈需求
- **覆盖顶级品牌**：从 Apple/Nike/Tesla 到 Stripe/Figma/Vercel，跨 9 大行业 66 个品牌

## 贡献与许可

- 贡献指南：鼓励改进现有文件或报告问题，建议在提交 PR 之前先开启 Issue 讨论
- 许可证：MIT License
- 免责声明：从公共网站提取的设计系统文档，不声称拥有任何网站视觉身份的所有权
