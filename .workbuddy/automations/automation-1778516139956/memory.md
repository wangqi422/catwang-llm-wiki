# AIGC 日报自动化执行历史

## 2026-08-17 (Mon)
- **状态**: ✅ 五阶段全流程成功（第 30 期）
- **8 条日报标题**: Anthropic 186页风险报告披露Model 2 / Stripe 70亿收购OpenRouter / DeepSeek 峰谷定价今日生效+Harness 42h 10万星 / OpenAI 解散灾难性风险团队 / GPT-5.6 Sol Codex 1M上下文+Ultrafast 14倍速 / 斯坦福AI指数中国84%vs美国38% / Grok Imagine 47段精准编辑 / 银行算力贷Token授信
- **H5**: 200 OK（curl 实测 27757 字节；workflow queued → `gh run watch` 30s 内完成部署）
- **海报**: 528.1KB, 1440×1920（3:4），副标题 lead 正常提取
- **推送**: 群 A + 群 B 成功（一条龙 publish-ai-daily-poster.js，markdown_v2 单条 209 字节，Pages 第 4 次检测 200）
- **git push**: token URL 直推三次全过（ade5cad MD+H5+index / c920f75 poster / eea1fd3 log）
- **踩坑**: ① AI HOT `/all?mode=` JSON 接口返回 HTML（已不可用），`/feed/all.xml` 稳定（50 条/50KB），采集以 feed 为准 ② curl 组合命令偶发 exit 23 无输出，拆开单条 `-o 文件 -w` 可复现 200

## 2026-08-16 (Sun)
- **状态**: ✅ 五阶段全流程成功（第 29 期）
- **8 条日报标题**: SpaceX 600 亿收购 Cursor 落锤 / Anthropic Q2 首盈利+91 亿算力长约 / 白宫 Agent 安全审查框架 / 台积电美国投资 2650 亿押 A16 / 欧盟 DMA 逼 Google 开放 Android 助手 / 上半年 AI 投资破 5100 亿 / 小红书开源 dots3-note 280B MoE / tl;dv 泄露 18 万条会议录制
- **H5**: 200 OK（curl 直接验证；WebFetch 首次 404 系其 15min 缓存假象，非部署未完成）
- **海报**: 528.8KB, 1440×1920（3:4），副标题 lead 正常提取
- **推送**: 群 A + 群 B 成功（一条龙 publish-ai-daily-poster.js，markdown_v2 单条 209 字节）
- **git push**: token URL 直推一次通过（b214ab8 MD+H5+index / f017a63 poster）
- **踩坑**: ① Pages 已改 workflow 部署（build_type=workflow），push 后需 `gh run watch` 等构建完成，别依赖旧 branch 部署时序 ② WebFetch 自带 15min 缓存，H5 校验以 curl 实测为准，避免缓存 404 误判

## 2026-08-15 (Sat)
- **状态**: ✅ 五阶段全流程成功（第 28 期）
- **8 条日报标题**: Qwen3.8-27B 开源 / Claude Code v2.1.233 / Anthropic 水印 API / OpenAI 营收 400 亿+关停 Atlas / 英伟达削减 OpenAI 担保+持股 SpaceX 210 亿 / Databricks 50 亿融资 1900 亿估值 / X 开源 For You 算法 / 可灵 2.1 首尾帧
- **H5**: 200 OK（curl 验证 26372 字节含编辑手记；WebFetch 首次 404 系 Pages 未部署完，watch 后 curl 确认）
- **海报**: 551.5KB, 1440×1920，副标题 lead 正常提取
- **推送**: 群 A + 群 B 成功（一条龙 publish-ai-daily-poster.js，markdown_v2 单条 209 字节）
- **git push**: token URL 直推一次通过（8e99ef9 MD+H5+index / f43bb0e poster / 4ecac01 log）
- **踩坑**: ① WebFetch 404 需先 gh run watch 等部署完再 curl 验证（非 WebFetch 缓存，本次是部署未完成）② 海报 Tagline 未提取（MD 无「一句话」模式，历史既有，未重推避免污染群）③ 海报评分 0.0（概览表第 5 列为「重要性」非分数，历史既有）

## 2026-08-14 (Fri)
- **状态**: ✅ 五阶段全流程成功（第 27 期）
- **8 条日报告标题**: DeepSeek Harness v0.1 开源 / 智谱 GLM-5.3 / GPT-5.6 Sol Ultrafast / Gemini 3.7 Flash / Anthropic 估值 2 万亿 IPO / 苹果×阿里 / MiniMax Music 3.0+H3 / Meta 开源回归
- **H5**: 200 OK（WebFetch 验证完整加载，含编辑手记）
- **海报**: 535.2KB, 1440×1920
- **推送**: 群 A + 群 B 成功（一条龙 publish-ai-daily-poster.js，markdown_v2 单条 209 字节）
- **git push**: token URL 直推一次通过（e66be67 MD+H5+index / b07fb6e poster）
- **踩坑**: 无新增——海报评分/tagline 历史既有（同 8/13），未重推避免污染群

## 2026-08-12 (Wed)
- **状态**: ✅ 五阶段全流程成功
- **8 条日报告标题**: 英伟达Nemotron开源 / 思维链加密破解 / Gemini月活10亿 / OpenAI估值8520亿 / Anthropic 600亿算力 / DeepSeek涨价 / Qwen-Image-3.0 / Seedance 2.5
- **H5**: 200 OK（编辑手记补全后重新部署）
- **海报**: 567.3KB, 1440×1920
- **推送**: 群 A + 群 B 成功
- **踩坑**: ① TOC HTML 缺编辑手记（8/09-12 连续漏），补全后重新 push ② git push 幂等 credential helper exit 128，改用 token URL 直推成功 ③ poster 无变更跳过重生成

## 2026-08-13 (Thu)
- **状态**: ✅ 五阶段全流程成功（第 26 期）
- **8 条日报告标题**: DeepSeek V4 Pro / Grok 4.6 / 微信 WeLM / LiteLLM 供应链攻击 / 腾讯 Q2 528亿 / Cerebras Q2 +287% / Claude Cowork 侧边栏 / 白宫开源监管
- **H5**: 200 OK（WebFetch 验证完整加载，含编辑手记）
- **海报**: 547.9KB, 1440×1920，一条龙 publish-ai-daily-poster.js 47s 跑通
- **推送**: 群 A + 群 B 成功（Pages 5 次检测后 200，markdown_v2 单条 209 字节）
- **亮点**: AI HOT `/feed/all.xml` 恢复（50 条，50KB），不再走 WebSearch 兜底
- **踩坑**: ① 海报评分显示 0.0：generate-poster.js L75 从概览表第 5 列 parseFloat 取分数，但规范是「重要性」列——历史既有（昨天同样），未重推以避免污染群 ② 海报 tagline 未渲染：MD 无「一句话：xxx」模式，同样历史既有
- **下一步优化**: 修复海报评分解析（待用户拍板：从 MD 正文提取 vs 改概览表第 5 列为分数列）

## 2026-08-11 (Tue)
- **状态**: ✅ 全流程成功
- **8 条日报告标题**: 桑德斯逼停AI / Meta Muse Glimmer / GPT-6倒计时 / MAI-Image-2.6 / Sonnet 5.5泄露 / 中国模型15周称霸 / 千问付费 / Kimi IPO+黎曼突破
- **H5**: 200 OK (curl 验证，WebFetch 缓存 404)
- **海报**: 548.1KB, 1440×1920
- **推送**: 群 A + 群 B 成功
- **踩坑**: git push HTTPS token 失败，改用 credential.helper=!gh auth git-credential
