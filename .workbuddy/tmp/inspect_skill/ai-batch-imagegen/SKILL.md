---
name: ai-batch-imagegen
description: 零Token批量生图工作流。通过 Playwright over CDP 操控用户本地已登录的 Midjourney 网页 + 司内 3000(woa) 平台(Nano Banana/Gemini + GPT-Image2), 用"组件库随机组合提示词 + 可选垫图"无限批量出图, 直到手动停止。当用户要"批量生图/海量出图/挂机生成/跑一批概念图/key visual 发散/沦陷海报/角色机甲群像"等大批量 AI 出图需求时使用。生图发生在浏览器里, 不走 API 不耗模型 Token。
agent_created: true
---

# AI 批量生图工作流 (ai-batch-imagegen)

零 Token 批量生图: 用 Playwright over CDP 操控用户**已登录**的网页(Midjourney + 司内 3000/woa 平台)发提示词。生图在浏览器里发生, 不走 API、不耗模型 Token。Token 只花在"想方案/改组件库"。

## 适用与前提
- **MJ**: 公网 alpha.midjourney.com, 纯文本生图。
- **3000(woa)**: 司内 `3000.woa.com`, 支持 Nano Banana(Gemini) + GPT-Image2 双模型, 支持**垫图(图生图)**, 这是相比 MJ 的最大优势。⚠️ 司内平台只能发给司内同事用。
- 前提: 本地有一个**远程调试 Chrome(端口 9222)**, 且在里面已登录好上述平台。用 `scripts/启动调试Chrome.bat` 拉起。

## 核心架构 (为什么省 Token)
1. **组件库 `components.yaml`**: 场景/色调/镜头/修饰/物体 等维度, 各几十条。
2. **`prompt_engine.py`**: 本地随机笛卡尔积, 每次组装一条结构不重复的提示词 → 上百万种骨架, 零 Token。
3. **循环脚本** `run_woa.py` / `run_mj.py`: `while 未建STOP` 持续取词发送, 直到手动停。
4. 改题材 = 改 `components.yaml`; 改平台/模型/间隔/输出/停止 = 改 `config.yaml`。**不用改 Python。**

## 标准操作流程
1. **确认调试 Chrome 在线**: 探测 `http://127.0.0.1:9222/json/version`。不在线 → 让用户运行 `scripts/启动调试Chrome.bat` 并登录各平台。
2. **配置**: 按需求改 `scripts/config.yaml`(平台开关/模型画面参数/垫图路径/停止方式) 和 `scripts/components.yaml`(题材方向)。
3. **自检提示词**: `python prompt_engine.py --sample 5` 确认方向对。
4. **试发 1 条验证**: 先跑出 1 张, 截图肉眼确认垫图生效、方向正确, 再放量。
5. **正式跑**(后台): `python run_woa.py` 和/或 `python run_mj.py`。
6. **停止**: 在 `output_dir` 下建 `STOP` 文件(优雅停, 等当前条结束); 或 config 设 `stop_at: "10:30"` 到点自停。必要时再按命令行杀进程兜底。
7. **回收成图**: `python collect.py woa gemini 30` / `python collect.py mj 40`(浏览器内截图绕防盗链)。

## 关键经验 (务必遵守, 全是踩坑换来的)
- 🔴 **参考图计数别校验**: 比例图标(16:9等)class 也含 `p-[6px]`、历史成图 src 含 `atcos`, 都会污染计数; 「N张」文字时有时无。**上传不报错即视为成功**, 靠"发1条截图肉眼确认"验证。
- 🔴 **参考图是服务端会话态, reload/新开标签都清不掉、跨标签共享**: 要换垫图类别时别指望清图。**最优: 每个模型固定只做一类**(如 gemini 专做机甲单图垫、openai 专做 boss 六图垫), 启动传一次全程不换。多类需求拆给"模型×类别"或交给 MJ 纯文本。
- ⚠️ **MJ "已发N条"≠出图数**: Fast hours 耗尽时输入框照样清空但不出图。必须检测 body 含 "run out of Fast hours" → reload + 切 Relax。`config.force_relax` 已默认处理; v8.0 需 `--fast` 不要用。
- ⚠️ **司内 3000 登录态 6-8h 过期**: OAuth 重定向后 URL 带 `?code=`, 脚本"进不去"。`run_woa.py` 已内置"连续N次失败→reload 自愈"。
- ⚠️ **CDP 会被多余标签拖垮**: 历史出图/网盘等标签多了会让 connect_over_cdp 超时(曾拖到3分钟)。`config.auto_clean_tabs` 启动时自动清。
- ⚠️ **成图防盗链**: http url 直接下载得到登录 HTML。必须用 `collect.py` 在浏览器内对 `<img>` 做 element.screenshot()。
- ✅ **多图垫图(如6张)一次 set_input_files 全生效**: GPT-Image2 能多角色同框还原 + 执行"C位"构图(某角色靠位置+主光突出而非尺寸); Gemini 单图垫一致性极好。
- ✅ **垫图保布局**: 喂布局图加前缀 "Using the attached reference image, recreate the SAME layout, keep ... in EXACT original positions"。俯视图务必强调 TOP-DOWN FLAT, 否则 ring/circular 会被理解成 3D 轨道环。

## 文件
- `scripts/config.yaml` — 统一配置(端口/输出/平台/模型/垫图/停止/自愈)
- `scripts/components.yaml` — 题材组件库(改这个换题材)
- `scripts/prompt_engine.py` — 提示词随机组装
- `scripts/common.py` — 共享工具(CDP/控件/停止/自愈)
- `scripts/run_woa.py` — 3000 双模型循环(垫图+自愈)
- `scripts/run_mj.py` — MJ 纯文本循环(默认 Relax)
- `scripts/collect.py` — 成图批量截图回收
- `scripts/启动调试Chrome.bat` — 拉起调试 Chrome
- `references/troubleshooting.md` — 完整踩坑手册

详细排错见 `references/troubleshooting.md`。
