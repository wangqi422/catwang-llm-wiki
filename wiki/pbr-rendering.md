**Type**: concept
**Title**: PBR 物理渲染
**Created**: 2026-04-11
**Updated**: 2026-05-09
**Sources**: [[raw/articles/call-of-duty-cg-vfx-analysis.md]], [[raw/articles/call-of-duty-cg-vfx-classification.md]]
**Tags**: #technique #codm #design-system
**Aliases**: Physically Based Rendering, 物理渲染, 基于物理的渲染

---

# PBR 物理渲染

> PBR 是基于物理光学原理的材质渲染方法，通过金属度/粗糙度参数控制光线与表面的交互，COD 系列是游戏行业 PBR 标准化的先驱。

## Definition

PBR（Physically Based Rendering）是一套基于物理光学原理的材质描述和渲染方法，通过能量守恒、菲涅尔效应、微表面理论等物理模型，实现接近真实世界光照表现的材质效果。

## Core Content

### COD 推动 PBR 行业标准化历程

| 时间 | 里程碑 |
|------|--------|
| 2011 | 《黑色行动》SIGGRAPH 分享，为行业 PBR 采用提供信心背书 |
| 2014 | IW6 引擎（幽灵）全面支持 DX11 PBR 管线 |
| 2018 | Sledgehammer SIGGRAPH 发表《COD:WWII》PBR 深度论文 |
| 2019 | IW 8.0 引擎实现照片级 PBR |
| 2025+ | IW 9.0 支持 PBR 2.0 + SDF-GI |

### 五大材质类型

| 类型 | 说明 | CG 表现 |
|------|------|---------|
| 金属 | 金属度+粗糙度 | 枪械磨损金属/弹壳黄铜光泽 |
| 非金属 | 介电质 BRDF | 混凝土/木材/布料真实质感 |
| 多层材质 | 表面层+基底层 | 磨损油漆下露出金属 |
| 薄膜干涉 | 薄膜光波干涉 | 油渍彩虹色/枪管发蓝 |
| SSS | 次表面散射 | 人耳透光红/树叶透光 |

### SIGGRAPH 2018 五大技术突破

1. **Normal & Gloss Mipmapping**：法线细节丢失时转移到光泽度 Mipmap
2. **Material Surface Occlusion**：利用法线生成 AO + 邻近间接反射
3. **Multiscattering Diffuse BRDF**：解决能量不守恒 + 微表面多重散射
4. **Thin Film Layer**：油膜/涂层薄膜干涉效应
5. **Unified Shading Model**：向电影 CG 靠拢，支持多层材质光吸收散射

## Key Points

- 2011 年 COD 的 SIGGRAPH 分享是 PBR 在游戏行业大规模采用的关键转折
- 薄膜干涉极大增强了枪械/车辆漆面的真实感
- 统一着色模型推动渲染管线从延迟渲染向前向渲染演进
- PBR 2.0 + SDF-GI 是当前最新标准

## Related

- [[wiki/iw-engine]]
- [[wiki/codm-vfx-system]]
- [[wiki/cod-cg-production]]
- [[wiki/summaries/2026-04-11-codm-vfx-analysis]]
- [[wiki/summaries/2026-04-11-cod-cg-technology]]

## Sources

- [[raw/articles/call-of-duty-cg-vfx-analysis.md]]
- [[raw/articles/call-of-duty-cg-vfx-classification.md]]
