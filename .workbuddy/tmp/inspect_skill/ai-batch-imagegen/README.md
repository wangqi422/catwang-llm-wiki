# ai-batch-imagegen · 零 Token 批量生图工作流

把"操控本地已登录浏览器批量出图"的整套流程打包成一个 WorkBuddy Skill。生图发生在浏览器里(Midjourney + 司内 3000 平台), **不走 API、不耗模型 Token**。

## 它能做什么
- 用"组件库随机组合"生成上百万种不重复提示词, 无限批量出图直到你喊停。
- 支持 **垫图(图生图)**: 给 3000 平台的 Nano Banana / GPT-Image2 喂参考图 + 提示词, 保布局/保角色。
- 自带自愈: 自动清多余标签、MJ 自动切 Relax(免费)、司内登录态过期自动重连。
- 一键回收成图(绕过防盗链)。

## 怎么用 (3 步)
1. **拉起调试 Chrome**: 双击 `scripts/启动调试Chrome.bat`, 在打开的 Chrome 里登录 Midjourney 和/或司内 3000 平台。
2. **改两个配置**:
   - `scripts/config.yaml` — 平台开关、模型画面参数、垫图路径、停止方式、输出目录。
   - `scripts/components.yaml` — 你的题材方向(场景/色调/镜头/物体)。改这个就能换题材。
3. **跑**: `python scripts/run_woa.py` 和/或 `python scripts/run_mj.py`(建议后台跑)。
   - 停止: 在输出目录建一个名为 `STOP` 的空文件; 或 config 里设 `stop_at: "10:30"` 到点自停。
   - 回收成图: `python scripts/collect.py woa gemini 30`。

## 依赖
- Python 包: `playwright`、`pyyaml`(`pip install playwright pyyaml`, 无需 `playwright install`, 复用本地 Chrome)。
- 一个远程调试 Chrome(端口 9222), 且已登录目标平台。

## 注意
- **司内 3000(woa) 平台只能司内同事使用**; 发给外部的人请只用 MJ 部分(把 config 里 `woa.enabled` 设为 false)。
- 详细排错见 `references/troubleshooting.md`, 设计原理与经验见 `SKILL.md`。

## 分享方式
直接把整个 `ai-batch-imagegen/` 文件夹发给对方, 让其放进 `~/.workbuddy/skills/`(或项目的 `.workbuddy/skills/`)即可。对方对 AI 说"用 ai-batch-imagegen 批量生图"就会自动加载这套流程。
