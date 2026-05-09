**Type**: concept
**Title**: IW Engine
**Created**: 2026-04-11
**Updated**: 2026-05-09
**Sources**: [[raw/articles/call-of-duty-cg-vfx-analysis.md]]
**Tags**: #codm #technique
**Aliases**: Infinity Ward Engine, IW引擎

---

# IW Engine

> IW Engine 是 Infinity Ward 自研的游戏引擎，从 2003 年 id Tech 3 改版演进至 IW 9.0，每一代都代表同时期 FPS 游戏渲染技术的最高水平。

## Definition

IW Engine 是 Activision 旗下 Infinity Ward 工作室开发的自研游戏引擎，源自 id Software 的 id Tech 3，经过 20 余年 8 代重大升级，是使命召唤现代战争系列的技术基座。

## Core Content

### 版本演进时间线

| 版本 | 首发游戏 | 年份 | 核心升级 |
|------|---------|------|---------|
| id Tech 3 改 | COD 初代 | 2003 | 基础 OpenGL 渲染 |
| IW 3.0 | COD4: 现代战争 | 2007 | 首个自研引擎，光照/特效大幅提升 |
| IW 4.0 | 现代战争 2 | 2009 | 改进流式技术/光照 |
| IW 5.0 | 现代战争 3 | 2011 | 流式技术与音频提升 |
| IW 6.0 | 幽灵 | 2013 | 完整 DX11/破坏系统/Sub-D |
| IW 7.0 | 无限战争 | 2016 | 改进粒子系统 |
| **IW 8.0** | **现代战争 (2019)** | 2019 | **革命性**：摄影测量/混合光追/PBR升级/全实时过场 |
| **IW 9.0** | 最新系列 | 2025+ | SDF-GI/PBR 2.0/AI 行为树 |

### IW 8.0 革命性升级（2019）

- **全程实时过场动画**：取消预渲染 CG
- **摄影测量管线**：64px/in 纹理密度
- **混合光线追踪**：首次引入 RT Shadows/Reflections/AO
- **[[wiki/pbr-rendering|PBR]] 全面升级**：照片级材质
- Digital Foundry 评价：系列迄今最先进的视觉效果

### IW 9.0 最新特性

- **SDF-GI**：有符号距离场全局光照，室内柔和间接光
- **PBR 2.0**：新一代材质系统
- **AI 行为树**：智能 NPC 行为

### 光照技术栈

| 技术 | 说明 |
|------|------|
| SDF-GI | 实时间接光反弹 |
| 光探针 | 球谐函数间接光采样 |
| 光追阴影 | 像素级柔和阴影 |
| 光追反射 | 物理正确镜面反射 |
| 光追 AO | 高精度环境遮蔽 |
| 体积雾光 | 丁达尔效应/God Rays |
| CSM | 级联阴影贴图 |

## Key Points

- IW 8.0 是 COD 系列从"好看"到"照片级"的分水岭
- SDF-GI 是当前最先进的实时全局光照方案之一
- 引擎同时服务游戏实时渲染和 CG 过场制作
- 每一代引擎升级都直接推动宣发素材的视觉质量

## Related

- [[wiki/pbr-rendering]]
- [[wiki/codm-vfx-system]]
- [[wiki/cod-cg-production]]
- [[wiki/summaries/2026-04-11-cod-cg-technology]]

## Sources

- [[raw/articles/call-of-duty-cg-vfx-analysis.md]]
