**Type**: summary
**Title**: CODM 写实特效分类与 CG 特效体系全面分析
**Created**: 2026-04-11
**Updated**: 2026-05-09
**Sources**: [[raw/articles/codm-vfx-analysis-complete.md]], [[raw/articles/call-of-duty-cg-vfx-classification.md]]
**Related**: [[wiki/codm-vfx-system]], [[wiki/pbr-rendering]], [[wiki/iw-engine]], [[wiki/cod-cg-production]]
**Tags**: #codm #ai-video #design-system #technique

---

# CODM 写实特效分类与 CG 特效体系全面分析

## 一句话总结

使命召唤 CG 特效体系涵盖 7 大类 110+ 项细分类别，从枪口焰到爆炸六层系统，构成写实射击游戏宣发的视觉技术基石。

## 关键要点

- [[wiki/codm-vfx-system|CODM 特效分类]]分 7 大系统：战斗交互/破坏物理/烟火爆破/角色群集/环境天气/光照渲染/后处理镜头
- 爆炸特效采用 **6 层生命周期模型**：闪光核心→火球→冲击波→碎片→烟柱→余烬
- 枪口焰按枪型差异化设计（突击步枪紧凑锥形 vs 霰弹枪大面积扇形）
- 命中反馈形成完整链条：枪口焰→弹道轨迹→命中点特效→受击动画→伤害标识
- 破碎特效通过 Voronoi 碎片预处理 + 运行时刚体物理模拟实现
- [[wiki/pbr-rendering|PBR 渲染]]支持金属/非金属/多层/薄膜干涉/SSS 五大材质类型
- 拉片分析维度：镜头语言/光照氛围/粒子特效/材质表现/动画节奏/音效同步/后处理
- CG 八大特效类别总计 110+ 子项：粒子流体（25+项）最丰富
- 光照系统含 SDF-GI、光探针、光追阴影/反射/AO、体积光效四个层次
- 后处理涵盖 DOF/运动模糊/Bloom/色差/暗角/调色/特殊状态效果

## 详细摘要

### 战斗交互特效体系

枪口焰、命中反馈、弹道是三大核心子系统。枪口焰按枪型分 7 类差异化设计，含动态光照交互（面部照亮/环境照亮/阴影投射/反射贡献/色温变化）。命中反馈按材质分 7 种（水泥/金属/木材/泥土/雪地/玻璃/水面/人体），每种有 3-4 个时间阶段。[[raw/articles/codm-vfx-analysis-complete.md]]

### 爆炸六层系统

完整爆炸由 6 层子系统叠加：Layer1 闪光核心（1-3帧 HDR Bloom）→ Layer2 火球（0.3-1s 翻滚体积纹理）→ Layer3 冲击波（屏幕空间扭曲）→ Layer4 碎片（GPU 刚体粒子）→ Layer5 烟柱（体积粒子+噪声形变 3-15s）→ Layer6 余烬（5-20s 风场响应）。[[raw/articles/codm-vfx-analysis-complete.md]]

### 破坏物理系统

采用离线 Voronoi 碎片预处理 + 运行时触发模式。按材质分 7 类（混凝土/砖墙/玻璃/木材/金属/石材/泥沙），大规模场景含建筑坍塌、桥梁断裂、载具爆炸、地面塌陷四类。SIGGRAPH 2014 论文（COD: Ghosts）详细描述了该技术体系。[[raw/articles/codm-vfx-analysis-complete.md]]

### 角色与渲染技术

角色特效含面部动画（DI4D PURE4D 面捕）、毛发（Kajiya-Kay 各向异性高光）、布料模拟（Navier-Stokes 解算）、动态特效（呼吸白雾/脚步尘土/涉水/雪地脚印）。PBR 渲染支持金属/非金属/多层/薄膜干涉/SSS 五大材质类型。[[raw/articles/call-of-duty-cg-vfx-classification.md]]

### CG 八大类别体系

另一套分类将特效划分为八大类：光照与阴影（15项）、粒子与流体（25+项）、材质与表面（12项）、破坏与物理（11项）、后处理（15项）、角色（13项）、镜头语言（12项）、动态图形与合成（10+项）。其中粒子与流体数量最多、光照是画面质感基石。[[raw/articles/call-of-duty-cg-vfx-classification.md]]

## 重要引用

> "总计：110+ 项细分特效类别" — [[raw/articles/codm-vfx-analysis-complete.md]]
> "粒子系统是使命召唤 CG 中占比最大、类别最丰富的特效类型" — [[raw/articles/call-of-duty-cg-vfx-classification.md]]
> "一次完整的 CG 爆炸由 5+ 层粒子子系统叠加而成" — [[raw/articles/call-of-duty-cg-vfx-classification.md]]
> "《使命召唤：幽灵》发表了破坏模拟技术论文" — [[raw/articles/call-of-duty-cg-vfx-classification.md]]

## Related

- [[wiki/codm-vfx-system]]
- [[wiki/pbr-rendering]]
- [[wiki/iw-engine]]
- [[wiki/cod-cg-production]]
- [[wiki/people/territory-studio]]
- [[wiki/people/platige-image]]
