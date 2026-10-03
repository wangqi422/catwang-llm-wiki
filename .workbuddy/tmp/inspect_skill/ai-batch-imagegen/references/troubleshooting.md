# 排错手册 (ai-batch-imagegen)

这些都是真实踩过的坑 + 验证过的解法。遇到对应症状直接照做。

## 1. CDP 连不上 / connect_over_cdp 超时(甚至几分钟)
- **症状**: 脚本卡在连接、迟迟无日志, 或报 `TimeoutError: connect_over_cdp`。
- **真因**: Chrome 开了大量无关标签(历史出图 cdn 图片页、网盘下载页等), 把 CDP 端点拖慢。
- **解法**: `config.auto_clean_tabs: true`(启动自动清); 手动确认 `curl http://127.0.0.1:9222/json/version` 是否秒回。曾从超时恢复到 0.3s。

## 2. 参考图"挂了几张"判断不准
- **症状**: 明明传了 1 张却显示 6、或显示 0。
- **真因**: ① 画面比例选项(1:1/16:9/21:9…)的小图标 class 也含 `p-[6px]`, 数它恒=6; ② 右侧历史成图 src 含 `atcos` 也被算入; ③「N张」计数文字时有时无。
- **解法**: **根本不做数量校验**。`set_input_files` 不抛异常即视为成功, 直接发; 靠"发1条 → collect 截图 → 肉眼确认垫图生效"验证。

## 3. 想换一类垫图, 但旧图清不掉
- **症状**: reload、新开标签后参考图仍在, 且多个标签共享同一批。
- **真因**: 参考图是绑账号的服务端会话态, 前端清不掉。
- **解法**: 不要在一个标签里频繁换类。**每个模型固定一类**(gemini→A 类、openai→B 类), 启动各传一次, 全程不换。更多类就交给 MJ 纯文本, 或分时段跑。

## 4. MJ 跑了一堆却没出图
- **症状**: 日志"已发 N 条"一直涨, 但平台没新图; 页面有 "You've run out of Fast hours" 弹窗。
- **真因**: 处于 Fast 模式且 fast hours 耗尽; 输入框照常清空让脚本误判成功。
- **解法**: 用 Relax 模式(免费无限)。`config.force_relax: true` 会检测该弹窗→reload→点 Relax 按钮(选中=红色字)。`versions` 不要放 `--v 8.0`(它强制 --fast)。

## 5. 司内 3000 跑几小时后全部"进不去"
- **症状**: 后半夜日志全是 "[model] 进不去"。
- **真因**: 司内 SSO 登录态约 6-8h 过期, OAuth 重定向后 URL 带 `?code=`, 输入框定位失败。
- **解法**: `run_woa.py` 已内置"连续 reconnect_after_fails 次失败 → reload 自愈"。若仍不行需用户手动在浏览器重登一次。

## 6. 成图下载下来是登录 HTML / 打不开
- **真因**: 成图 http url 有防盗链, 直接 urllib/requests 下载拿到的是登录页。
- **解法**: 用 `collect.py` 在浏览器内对成图 `<img>` 元素做 `element.screenshot()`。woa 成图在右侧记录区(x>560, 宽>180); MJ 成图 src 含 `cdn.midjourney`。

## 7. 垫图保布局却变成 3D 行星环
- **真因**: 俯视布局图里 "circular/ring" 被理解成 3D 轨道环。
- **解法**: 提示词强调 **TOP-DOWN FLAT / overhead view**, 并加 "keep ... in EXACT original positions, do not move them"。

## 8. 停止生图
- **优雅停**(推荐): 在 `output_dir` 下建一个名为 `STOP` 的空文件, 脚本跑完当前条自然退出。
- **到点自停**: config `task.stop_at: "10:30"`。
- **兜底强杀**(Windows PowerShell):
  `Get-CimInstance Win32_Process -Filter "name='python.exe'" | Where-Object { $_.CommandLine -match "run_woa|run_mj" } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force }`

## 9. MJ 版本与平台细节
- MJ **V8 只在 Alpha 测试页支持**(`alpha.midjourney.com`), 正式 `www.midjourney.com` 跑不出 V8。
- 版本号写**全称**: `--v 8.0` / `--v 8.1`, 简写 `--v 8` 不识别。
- `--v 8.0` 不支持 Relax 必须 `--fast`(耗 fast hours), 所以本 skill 默认只用 `--v 6 / --v 7 / --v 8.1`(全 Relax 免费)。
- MJ 发送不要用 `element.click()`(偶发 not enabled 死等), 用 `fill()+focus()+keyboard.press(Enter)`。
- MJ Alpha 垫图(Style References/sref): Alpha 无可见 file input、槽内图不暴露为 `<img>`, setInputFiles 不可靠。**要垫图就用 3000 平台**; 非要 MJ 套风格则让用户手动把图拖进 Style References 槽, 之后整批自动套用。

## 10. 3000(woa) 平台控件细节
- 进页: 复用已登录 tab 改 hash 路由切模型(`location.hash='#/dashboard/draw/openai'` / `gemini`), 比 goto 稳(goto 偶发跳 SSO)。
- 提示词框是 `[contenteditable=true]`(非 textarea), 必须 `keyboard.type`。切模型时提示词会被复用带过去。
- 画面选项是文字卡片: 找 `innerText===目标文字` 的叶子 div 向上找可点祖先(质量/解析度宽>80, 比例小格宽>35)。选中态判色不可靠, 截图肉眼确认最快。
- 🔴 **必须先点解析度再点比例**: 选「超精 4K」后比例选项会从 15 个缩成只剩 9:16/16:9/原尺寸/智能(无 2:1!), 顺序反了点不到。4K 横版用 16:9 代替 2:1。
- OpenAI(GPT-Image2): 解析度「超精 4K」+比例「16:9」+质量「高质量」。
- Gemini(Nano Banana): 解析度「4K」+比例「16:9」(有 21:9)+无质量项+思考「深入」更精。
- 生成按钮: 底部绿条文字 `^消耗 \d+ 算力点生成$`, y>700; 点后变「当前有任务正在运行」。
- woa 限并发: 4K 较重, 发下一条前轮询 body 是否「当前有任务正在运行/排队」, 等完再发。
- 复用 MJ 提示词到 woa: 用 `re.split(r'\s--(?:ar|v|s|fast|q|stylize|chaos|niji)\b', p)[0]` 去掉 MJ 参数留纯自然语言。

## 11. ChatGPT 公网版(可选, 本 skill 默认走 3000 不用它)
- 输入框是 ProseMirror `div#prompt-textarea`, **fill 无效必须 keyboard.type**。
- 长对话会上下文污染(黑图/乱码), 每 3 条 `page.goto` 回项目页新开对话。
- 想落在某项目内: goto 该 project URL(`chatgpt.com/g/g-p-XXXX-名字`)再发。
- 上传参考图: `input[type=file]` 可能多个, 第一个隐藏的(accept 空)往往才有效; 传后检测 `img[src^=blob:]` 确认。

## 12. 提示词写法(MJ vs GPT/woa)
- **MJ**: 视觉短语堆叠+逗号分隔+末尾参数。`<场景>, <风格>, cinematic key visual --ar 16:9 --s 80 --v 8.1`
- **GPT/woa**: 自然语言指令, 可让它直出英文标题。
- 发散维度参考: 色调(暖/冷/红/蓝/银白灰/黑金/青橙撞色/紫核/霓虹)、质感(UE5/硬表面/哑光/高光金属/全息玻璃/碳纤维战损/陶瓷装甲)、风格主义(克苏鲁/超现实/写实军事/近未来/硬科幻/中式科幻/巨物/极简/复古未来/废土/生物机械)、构图(标题留白/英雄居中/三分动感/仰视史诗/光束神性/极简/全景叙事)。
- 用户给参考图但要纯文本跑: 反推外形特征写进提示词(如"蓝+银黑+金机甲, 猛禽前倾, 反关节腿")。
- 前期发散**不要 AI 审图**(烧 token 又慢), 用户肉眼挑; 中后期少量候选才可选 AI 辅助。

## 运行环境
- Python 需要 `playwright` 和 `pyyaml`; 浏览器复用用户已登录的 Chrome(端口 9222), 无需 playwright install 浏览器。
- 发送间隔默认 MJ 31s、woa 含等待约 60-90s/条, 错峰降低抢焦点概率。
- 规模账: 1 提示词 = MJ 多版本 + woa = 数次, 几十方向 → 上千次, 以小时计, 必须挂机。
- bash 里 inline `python -c` 的反斜杠正则会被吞 → 把逻辑写进 .py 文件再跑。
