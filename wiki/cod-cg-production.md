**Type**: concept
**Title**: COD CG 制作体系
**Created**: 2026-04-11
**Updated**: 2026-05-09
**Sources**: [[raw/articles/call-of-duty-cg-vfx-analysis.md]], [[raw/articles/call-of-duty-cg-links-collection.md]]
**Tags**: #codm #ai-video #technique
**Aliases**: Call of Duty CG Pipeline, 使命召唤CG制作

---

# COD CG 制作体系

> 使命召唤 CG 由内部工作室 + 顶级外包公司协作，覆盖预渲染/实时引擎/混合媒介三种模式，代表游戏 CG 行业最高水平。

## Definition

COD CG 制作体系指使命召唤系列从概念到最终交付的完整 CG 视频制作流程，包含动捕、面捕、摄影测量、渲染、合成等环节，涉及内部工作室和多家外部 VFX 公司协作。

## Core Content

### CG 视频四种类型

| 类型 | 说明 | 典型案例 |
|------|------|---------|
| 预渲染 CG | 外部公司制作，宣发用 | Blur/Platige 预告片 |
| 引擎内过场 | 游戏引擎实时渲染 | MW2019 全程实时过场 |
| 混合媒介 | 3D CG + 档案影像 + 动态图形 | Territory 为 BO6 制作 |
| 引擎增强版 | 高规格模型/光照 | COD:WWII 诺曼底 |

### 制作公司分工

**内部工作室**：
- Infinity Ward — MW 系列 / IW Engine
- Treyarch — BO 系列 / NGL Engine
- Sledgehammer — WWII / PBR 论文

**外部 VFX**：
- [[wiki/people/territory-studio|Territory Studio]] — BO6 混合媒介（14+ 分钟）
- [[wiki/people/platige-image|Platige Image]] — BO Cold War 全 CG
- Blur Studio — BO6 超写实面部建模
- Mill+ — COD Ghosts 电影级 CG
- DI4D — MWII 面部捕捉技术

### 核心技术栈

| 技术 | 突破点 | 作品 |
|------|--------|------|
| 面部捕捉 | PURE4D ML：2周→3天 | MW II |
| 摄影测量 | 64px/in 纹理密度 | MW 2019 |
| [[wiki/pbr-rendering|PBR]] | 多重散射/薄膜层 | SIGGRAPH 2018 |
| 光线追踪 | 混合光追实时 | MW 2019 |
| [[wiki/iw-engine|IW Engine]] | SDF-GI + PBR 2.0 | IW 9.0 |

### 制作流程全景

```
前期：概念设计 → 分镜脚本 → 动态预览 → 预可视化
制作：动捕/面捕/语音同步 → 数据处理/绑定 → 环境/角色/特效 → 灯光渲染
后期：合成 → 调色 → 音效混合 → 最终输出
```

### 代表作品参考价值

| 作品 | 看点 | 适合参考 |
|------|------|---------|
| MW 2019 | 全实时过场/摄影测量 | 引擎内 CG 质量标杆 |
| MW II | DI4D 面部动画 | 面部表演捕捉 |
| BO Cold War | Platige 全 CG | 电影级预告片 |
| BO6 | Territory 解构主义 | 混合媒介叙事创新 |
| Ghosts | Mill+ 破坏系统 | 大规模破坏特效 |

## Key Points

- MW2019 是从预渲染到实时引擎过场的转折点
- BO6 Territory 的解构主义是混合媒介叙事的新方向
- 面捕 ML 加速是角色动画工业化的关键突破
- COD 推动了 PBR 在游戏行业的标准化采用

## Related

- [[wiki/iw-engine]]
- [[wiki/pbr-rendering]]
- [[wiki/codm-vfx-system]]
- [[wiki/codm-asset-pipeline]]
- [[wiki/people/territory-studio]]
- [[wiki/people/platige-image]]
- [[wiki/summaries/2026-04-11-cod-cg-technology]]

## Sources

- [[raw/articles/call-of-duty-cg-vfx-analysis.md]]
- [[raw/articles/call-of-duty-cg-links-collection.md]]
