# MEMORY.md — 长期记忆

> 最后更新：2026-07-05

## 信源架构（65 + 1 模式 · 2026-07-03 起）

AIGC 日报 / 周报共享：**65 X 账号 + 1 聚合源**（AI HOT）。
- **AI HOT** (`https://aihot.virxact.com/all`) — 中文 AI 资讯全量聚合池
  - 模式 `?mode=all&since=<时间>&take=100`（日报 24h / 周报 7d）
  - **强制带浏览器 UA**（nginx UA 黑名单会 403）
  - 调 API 规范见 `_skills/aihot.md`
- 信源清单：日报 `_skills/daily-card.md` §2.10.1 / 周报 `_skills/weekly-card.md` §2.1.1
- **加新信源必须两处同步**（2026-07-03 起）

## AI HOT API 基础设施问题（2026-07-05 新增）

- **症状**：连续 4 种方法 TLS 失败（Bash/curl、PowerShell、Node.js https、WebFetch）
- **错误**："Client network socket disconnected before secure TLS connection was established" / "基础连接已经关闭: 发送时发生错误"
- **绕过**：8 轮 WebSearch 兜底（信源 177 → 25 缩减，但能完成流水线）
- **下次优化**：检查 DNS / 替代 TLS 库 / 延后重试 3 次

## AI 资讯 Skill 双轨（2026-07-03）

| 维度 | `aihot`（三源聚合版） | `aihot-official`（官方版 v0.3.1） |
|------|---------------------|--------------------------------|
| 数据源 | X 官号 + aihot + smol.ai | **仅 aihot.virxact.com** |
| 路由触发 | 默认走 `aihot` | 用户说"AI HOT 日报/hot-topics"时走 |

## 项目架构

**统一素材池 + 使用层 Skill**（2026-05-18 起）：
- `raw/` — 原始素材统一池；`wiki/` — 唯一知识沉淀（扁平）
- `docs/` — GitHub Pages 发布产物；`_skills/` — Skill 手册
- 知识流向：`raw/` → (ingest) → `wiki/` → (使用层) → `docs/`/`decisions/`

## Skill 体系（4 层）

- **输入**：`ingest` `distill` `learn` `new-prompt` `scrape-comp`
- **使用**（⭐ 2026-05-31）：`decide` `write` `output` `connect` `audit` `inward-brief`
- **输出**：`daily-card` `weekly-card` `publish` `aihot` `Dark Ops`
- **系统**：`darwin`（8 维评估，仅保留分数提≥3 的改动）

## Frontmatter 强制字段

```yaml
capture_type: pattern | idea | question | number | article  # ⭐ 必填
used_by: []; contribution_count: 0; surfaced_with: []; review_flagged: null
```
- 类型基线：pattern≥15% / idea≥25% / question≥10% / number≥15% / article≤35%
- 唯一意义指标：`contribution_count`（活跃笔记 30 天内有 used_by 增量 ≥60%）

## AI 日报 & 周报设计规范（Soft Editorial + TOC 侧边栏）

- 底色 `#F2EEDF` / 文字 `#2A241B` / 四色：粉 `#E1A4C2` 柠檬 `#D6DD63` 腮红 `#E8C9B6` 鼠尾草 `#B7C7A8`
- 字体：Cormorant Garamond（标题）/ Work Sans（正文）/ Noto Sans SC
- 侧边栏 260px 固定 + ScrollSpy，日报柠檬黄高亮 / 周报粉高亮
- 满幅色块通过 `margin-left/right: -56px; padding: 48px 56px;` 实现
- 偶数章节用腮红色满幅背景切换

### 发布流程（每次日报/周报必须执行）
1. 生成 TOC H5（含 `← 返回归档` 固定按钮 + 顶部 3px 渐变进度条）
2. 归档首页 `docs/ai-daily/index.html` DATA 数组**顶部追加**
3. Git add + commit + push origin main（GitHub Actions 自动部署）
4. 推送企微（**仅文字摘要 + H5 链接，不发 PNG** —— 2026-05-31 起规则）
5. 更新 `log.md`

⚠️ **PNG 推送已禁用**：`_deploy/wecom-push/push-ai-daily.js` 用 `if (false && hasPng)` 短路

### 补发注意（2026-05-20）
`_deploy/daily-card/run.js` 会在截图后删 `ai-daily-card-*.html`，可能误删 TOC 版。补发 TOC 版时**不要直接跑 run.js**，先单独生成 `*-toc.html`。

## 竞品日报（Dark Ops 暗黑军事）

- 底色 `#0D0D0D` / 强调色 黄 `#FFE600`
- 品牌色：三角洲=黄 / 暗区=青 `#00E5FF` / CODM=橙 `#FF6B35` / BF6=绿 `#4CAF50`
- 全局**禁止圆角**（直角）
- 命名：`competitive-daily-YYYYMMDD-toc.html` / 归档 `docs/competitive-daily/index.html`

## 写作风格：瘦普诙谐口吻（长期固定）

- 自称"本王" / 反讽 + 自嘲 + 玩梗 / 短句 + 破折号
- 调性梯度 A 轻度 / B 中度 / C 放飞 / D 最放飞
- 触发：改写 / 写得有趣 / CODM 宣发 / 视频号 / 玩家向
- **不适用**：纯技术文档 / 数据报告 / 合规审查
- 梗克制（一段 1-2 个）；标题/数据/严肃落点保持正式
