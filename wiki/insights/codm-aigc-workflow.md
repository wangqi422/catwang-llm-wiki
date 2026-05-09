---
title: "CODM AIGC Workflow — 2026 Integrated Strategy"
type: insight
created: "2026-04-10"
updated: "2026-04-15"
frozen_from: "codm-aigc-workflow-snapshot-20260413.md"
sources:
  - "[[raw/daily-reports/AIGC_Daily_Report_20260409.md]]"
  - "[[raw/daily-reports/AIGC_Daily_Report_20260411.md]]"
  - "[[raw/daily-reports/AIGC_Daily_Report_20260412.md]]"
  - "[[raw/daily-reports/AIGC_Daily_Report_20260413.md]]"
  - "[[raw/daily-reports/AIGC_Daily_Report_20260414.md]]"
  - "[[raw/daily-reports/AIGC_Daily_Report_20260415.md]]"
  - "[[raw/work-docs/codm-visual-style-text.md]]"
  - "[[raw/daily-reports/CODM_Competitive_Daily_20260413.md]]"
  - "[[raw/daily-reports/CODM_Competitive_Daily_20260414.md]]"
  - "[[raw/daily-reports/CODM_Competitive_Daily_20260416.md]]"
tags:
  - codm
  - aigc
  - game-art

---

# CODM AIGC Workflow — 2026 Integrated Strategy

> CODM宣发设计团队应建立"三层AIGC生产体系"：品牌基础设施 → 内容分级生产 → Agent自动化分发。

## Core Insight（一句话）

2026年4月AIGC工具链在多维度同时成熟，构建CODM完整AIGC宣发管线的条件**首次成熟**——从"人工为主AI辅助"转向"AI为主人工精修"。

## 三层生产体系

### Layer 1: 品牌基础设施
- [[adobe-firefly]] 自定义模型继承品牌DNA + [[brand-color-control-aigc|品牌色API]] 锁定色板
- [[design-md-pattern|DESIGN.md]] 将品牌视觉DNA编码为AI可读格式
- 角色AI资产标准：每角色一套参考图+Face-Lock+LoRA

### Layer 2: 内容分级生产
| 内容类型 | 主力工具 | 预期提速 |
|----------|----------|----------|
| 赛季主KV | [[reallusion-ai-studio]] 3D+AI | 3-5x |
| 品牌CG预告 | [[runway-gen4]] 品牌级 | 2-3x |
| 社媒短视频 | [[kling-3]] 铺量级 | 10x+ |
| 品牌LOGO/图标 | [[recraft-v4]] SVG矢量 | 10x+ |
| 全套物料批量 | [[lovart-design-agent]] Agent | 5-10x |
| 宣传片后期编辑 | [[wan27-video]] 导演级 | 5-10x |

### Layer 3: Agent自动化分发
- [[mcp-protocol]] 标准下的多平台适配Agent
- [[claude-managed-agents]] 全托管品牌审核Agent（零基建）
- [[gpt-6]] 超级Agent引擎（ChatGPT+Codex+Atlas三合一）— 04-14新增

## Supporting Evidence（Top 5）

1. [[gpt-6]]: 首日实测验证——15分钟完整Campaign+60秒多镜头一致视频+$2.5/$12定价，SuperApp三合一桌面化
2. [[adobe-firefly]]: PS v27.5 Firefly Boards打通AI探索→PS精修最后一公里，2K GenerativeFill印刷级+Reference Image风格匹配
3. [[ai-video-landscape-2026]]: Sora正式关停+替代共识定型+中国三强(Wan 2.7/Seedance 2.0/Kling 3.0)API精确选型
4. [[agent-framework-landscape-2026]]: 8框架+3协议(MCP/A2A/ACP)全面对比，进入实战选型决策期
5. [[comfyui-game-asset-pipeline]]: ComfyUI节点式工作流=可复用+精确控制+批量生产+本地零泄露

## Current Action Items（Top 3）

1. **GPT-6品牌全量实测**：申请API，200万Token加载CODM全部品牌资产+设计mini Campaign端到端测试
2. **PS v27.5全组升级**：启用Firefly Boards+AI Assistant+建立CODM品牌参考图库供Reference Image使用
3. **ComfyUI本地管线搭建**：设计师工作站部署ComfyUI+FLUX.2/SD4，建立首个CODM标准化海报背景工作流

## To Verify（Top 5）

- [ ] GPT-6 15分钟Campaign在CODM赛季发布brief上的实际质量和可用性
- [ ] PS v27.5 Reference Image用CODM历史KV时的品牌风格匹配准确度
- [ ] ComfyUI+FLUX.2 ControlNet精确控制CODM角色姿态的效果
- [ ] HappyHorse开源代码是否在4月下旬兑现（影响自部署层选型）
- [ ] Wan 2.7"导演级编辑"在已生成CODM宣传片上的局部修改效果

## Related

- [[ai-video-production-strategy]]
- [[ai-video-landscape-2026]]
- [[character-consistency-aigc]]
- [[brand-color-control-aigc]]
- [[design-md-pattern]]
- [[mcp-protocol]]
- [[agent-stack-mcp-a2a]]
- [[lovart-design-agent]]
- [[recraft-v4]]
- [[claude-managed-agents]]
- [[ai-capability-growth-framework]] — 团队AI成熟度对标框架
- [[codm-cg-vfx-ai-sop]] — CG特效AI落地SOP（3阶段×13节点）

<details><summary>See Also</summary>

- [[gpt-6]]
- [[glm-51]]
- [[gemma-4]]
- [[deepseek-v4]]
- [[claude-mythos]]
- [[gemini-31]]
- [[google-veo-3]]
- [[microsoft-agent-framework]]
- [[comfyui-game-asset-pipeline]]
- [[happyhorse-1]]
- [[sora-2]]

</details>

## Sources

- [[raw/daily-reports/AIGC_Daily_Report_20260409.md]]
- [[raw/daily-reports/AIGC_Daily_Report_20260411.md]]
- [[raw/daily-reports/AIGC_Daily_Report_20260412.md]]
- [[raw/daily-reports/AIGC_Daily_Report_20260413.md]]
- [[raw/daily-reports/AIGC_Daily_Report_20260414.md]]
- [[raw/daily-reports/AIGC_Daily_Report_20260415.md]]
- [[raw/daily-reports/CODM_Competitive_Daily_20260413.md]]
