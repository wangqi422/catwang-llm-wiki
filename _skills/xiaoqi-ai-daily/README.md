# xiaoqi-ai-daily

小柒 AI 日报（AIGC Daily）端到端发布流水线 Skill。

## 做什么

把 AI 日报从「采集」到「推送企微群」的五阶段全链路固化成可复用流程：

1. **情报采集** — 8 轮搜索，65 个 X 账号 + AI HOT 聚合源，全部限过去 24h
2. **筛选写 MD** — P0/P1/P2 优先级筛出 8 条，产出结构化日报 MD
3. **H5 卡片** — Soft Editorial + TOC 侧边栏，更新归档首页，push GitHub Pages
4. **URL 校验** — 强制 HTTP 200 关卡，404 走五步修复流程
5. **海报推群** — 3:4 海报 + `markdown_v2` 单条消息（海报图 + 「点击看更多内容」）推双群

## 安装

复制到 WorkBuddy 用户级 skill 目录：

```bash
cp -r _skills/xiaoqi-ai-daily ~/.workbuddy/skills/xiaoqi-ai-daily
```

然后在 `~/.workbuddy/skills/agent-created-skills.json` 里注册：

```json
{
  "name": "xiaoqi-ai-daily",
  "createdAt": "2026-08-07T15:08:00+08:00",
  "skillDir": "xiaoqi-ai-daily"
}
```

CodeBuddy 用户把目标目录换成 `~/.codebuddy/skills/`。

## 触发词

AI 日报 / AIGC 日报 / 今日 AI /跑日报 / 发日报 / 补发日报 / 日报海报 / 推日报到群 / AI daily

## 依赖

| 依赖 | 说明 |
|---|---|
| 仓库 | `catwang-llm-wiki`（脚本和数据都在里面） |
| Node | puppeteer 已装在 `_deploy/` 和仓库根目录 |
| `gh` CLI | 已登录，用于 `gh auth token` 注入 push |
| 企微 webhook | 配在 `_deploy/wecom-push/config.json` → `aiDailyWebhooks` |

## 日常使用

日报 MD 已存在，只要出海报 + 推群：

```bash
cd <repo>
node _deploy/wecom-push/publish-ai-daily-poster.js --date YYYYMMDD --dry   # 预检
node _deploy/wecom-push/publish-ai-daily-poster.js --date YYYYMMDD         # 实发
```

完整流程、命令速查、12 条坑位、9 项验证清单见 [SKILL.md](./SKILL.md)。

## 相关

- `_skills/daily-card.md` — 仓库内详细 skill（65 信源完整清单、MD 格式规范、历史坑位）
- `_deploy/wecom-push/` — 推送脚本
- `_deploy/daily-card/` — 海报生成+ 截图脚本
