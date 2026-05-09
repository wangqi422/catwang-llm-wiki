---
title: "getdesign.md — 为 AI Agent 收集的 62 个品牌设计系统"
type: summary
created: "2026-04-11"
updated: "2026-04-15"
sources:
  - "[[raw/articles/getdesign-md-design-systems-for-ai-agents.md]]"
tags:
  - design-system
  - ai-agent
aliases: []
---

# getdesign.md — 为 AI Agent 收集的 62 个品牌设计系统

## 一句话总结

getdesign.md 是一个开源项目（voltagent/awesome-design-md），收录了 62 个知名品牌的 DESIGN.md 设计规格文件，让 AI 编码代理能按特定品牌风格自动生成 UI。

## 关键要点

- **核心理念**：将品牌设计系统浓缩为一个 `DESIGN.md` 文件，放入项目后 AI Agent 自动遵循该风格
- **收录规模**：62 个品牌，9 大类别（开发者工具、汽车、AI 平台、加密货币、消费品牌等）
- **使用方式**：选品牌 → 下载 DESIGN.md → 放入项目根目录 → AI 按风格生成代码
- **适配工具**：Cursor、Claude Code、Copilot 等 AI 编码代理均可使用
- **与 Harness Engineering 的关系**：DESIGN.md 本质上是 [[wiki/concepts/harness-engineering.md|SPEC]] 在 UI 设计领域的具体应用——用一份结构化文档约束 AI 的输出风格

## 设计风格速查（按场景分类）

### 深色高端风格
| 品牌 | 关键词 |
|------|--------|
| SpaceX | 严格黑白，全出血图像，未来感 |
| Tesla | 激进减法，全视口摄影，近乎零 UI |
| Lamborghini | 纯黑色表面，金色点缀，戏剧性大写排版 |
| Ferrari | 明暗对照法，法拉利红点缀，电影级黑色 |
| BMW | 深色高级表面，精确的德国工程美学 |

### 开发者工具风格
| 品牌 | 关键词 |
|------|--------|
| Vercel | 黑白精确度，Geist 字体 |
| Stripe | 标志性紫色渐变，字重 300 优雅 |
| Linear | 超极简主义，精确，紫色点缀 |
| Cursor | 时尚深色界面，渐变点缀 |
| Supabase | 深翠绿色主题，代码优先 |

### AI 产品风格
| 品牌 | 关键词 |
|------|--------|
| Claude | 温暖赤陶色点缀，干净编辑布局 |
| ElevenLabs | 深色电影级 UI，音频波形美学 |
| Mistral AI | 法国设计极简主义，紫色调 |
| Runway | 电影级深色 UI，丰富媒体布局 |

### 温暖友好风格
| 品牌 | 关键词 |
|------|--------|
| Notion | 温暖极简主义，衬线标题，柔和表面 |
| Airbnb | 温暖珊瑚色点缀，摄影驱动，圆角 UI |
| Zapier | 温暖橙色，友好插图驱动 |
| Figma | 充满活力的多色，俏皮又专业 |

## 实践建议

1. **做应用时**：根据产品定位选择对应风格的品牌作为参考
   - 开发者工具 → Vercel / Linear / Stripe
   - AI 产品 → Claude / Cursor / Runway
   - 消费产品 → Airbnb / Notion / Spotify
   - 高端/奢侈品 → SpaceX / Tesla / Lamborghini
2. **使用方法**：从 GitHub 仓库下载对应品牌的 DESIGN.md → 放入项目根目录
3. **自定义**：可以混搭多个品牌的设计元素，创建自己的 DESIGN.md

## 来源

- 原始链接: https://t.co/GNOfAyiVp1
- GitHub 项目: voltagent/awesome-design-md
- 原始资料: [[raw/articles/getdesign-md-design-systems-for-ai-agents.md]]
- **完整 DESIGN.md 本地副本**: 58 个品牌的完整设计系统文件已存入 `raw/design-md/` 目录，可直接复制到项目使用
  - 详见概念页: [[wiki/concepts/design-md.md]]
