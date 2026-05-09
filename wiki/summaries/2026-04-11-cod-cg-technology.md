**Type**: summary
**Title**: 使命召唤 CG 制作体系——技术演进与制作公司分工
**Created**: 2026-04-11
**Updated**: 2026-05-09
**Sources**: [[raw/articles/call-of-duty-cg-vfx-analysis.md]], [[raw/articles/call-of-duty-cg-links-collection.md]]
**Related**: [[wiki/cod-cg-production]], [[wiki/iw-engine]], [[wiki/pbr-rendering]], [[wiki/people/territory-studio]], [[wiki/people/platige-image]]
**Tags**: #codm #ai-video #technique #design-system

---

# 使命召唤 CG 制作体系——技术演进与制作公司分工

## 一句话总结

COD 系列 CG 由 Infinity Ward 等工作室 + Blur/Platige/Territory 等顶级外包公司协作，经历了从预渲染 FMV 到实时引擎过场再到混合媒介 CG 的完整演进。

## 关键要点

- [[wiki/cod-cg-production|COD CG 制作]]分四种类型：预渲染预告片/引擎内过场/混合媒介叙事/引擎内增强版
- [[wiki/iw-engine|IW Engine]] 从 id Tech 3(2003) 演进到 IW 9.0(2025+)，经历 8 代重大升级
- DI4D PURE4D 面部捕捉：8 台 HMC × 9 个 1200 万像素摄像头，ML 将处理从 2 周压缩至 3 天
- 摄影测量达 64px/in 纹理密度，含无人机航拍扫描和"肉袋"尸体扫描技术
- [[wiki/pbr-rendering|PBR]] 从 2011 年 SIGGRAPH 分享推动行业标准化
- [[wiki/people/territory-studio|Territory Studio]] 为 BO6 创造解构主义混合媒介叙事，14+ 分钟定制动画
- [[wiki/people/platige-image|Platige Image]] 为黑色行动冷战制作全 CG 预告片，2D/3D 混合"照片拼贴"技术
- Blur Studio 负责 BO6 面部建模（超写实数百万面高模）
- CG 制作流程：概念→分镜→动捕/面捕/语音同步→环境/角色/特效→灯光渲染→合成调色
- B站有 COD 1-21 全系列战役 CG 合集，Shotgun/SIGGRAPH 论文为核心技术参考

## 详细摘要

### CG 类型与制作公司分工

COD 的 CG 视频分四类：外部公司预渲染预告片、游戏引擎实时过场、混合媒介叙事 CG、引擎增强版过场。核心工作室包括 Infinity Ward（MW 系列/IW Engine）、Treyarch（BO 系列）、Sledgehammer（WWII/PBR 论文）。外包方含 Blur Studio（超写实面部）、Platige Image（电影级全 CG）、Territory Studio（混合媒介）、Mill+（幽灵 CG）、DI4D（面捕技术）。[[raw/articles/call-of-duty-cg-vfx-analysis.md]]

### 核心技术突破

面部捕捉采用 DI4D PURE4D 系统（MW2），14 位主演 100+ 种姿势，日数据量 >1TB，ML 算法将处理时间从 2 周压至 3 天。摄影测量（MW2019）达 64px/in 极致密度，含无人机航拍、载具全扫描、"肉袋"扫描、服装实际做旧后扫描。PBR 体系从 2011 年 BO SIGGRAPH 分享开始推动行业标准化，2018 年 Sledgehammer 发表深度论文（法线光泽 Mipmapping/材质表面遮挡/多重散射/薄膜层/统一着色模型）。[[raw/articles/call-of-duty-cg-vfx-analysis.md]]

### 引擎演进时间线

id Tech 3(2003) → IW 3.0(COD4/2007) → IW 4.0(MW2/2009) → IW 5.0(MW3/2011) → IW 6.0(Ghosts/2013 首个 DX11) → IW 7.0(IW/2016) → IW 8.0(MW2019/**革命性**：摄影测量+混合光追+全实时过场) → IW 9.0(2025+ SDF-GI+PBR 2.0)。[[raw/articles/call-of-duty-cg-vfx-analysis.md]]

### 代表作品与参考链接

重点关注四部作品：MW2019（全实时过场/摄影测量）、MWII（DI4D 面捕突破）、BO Cold War（Platige 全 CG）、BO6（Territory 混合媒介）。CG 链接合集覆盖 COD1-BO7 全系列，含 B站4K合集、各公司官网制作详解、SIGGRAPH 论文、ActionVFX 素材参考站。[[raw/articles/call-of-duty-cg-links-collection.md]]

## 重要引用

> "系列迄今最先进的视觉效果，展示了 COD 渲染技术的根本性革新" — Digital Foundry，引自 [[raw/articles/call-of-duty-cg-vfx-analysis.md]]
> "使用 PURE4D 机器学习算法后仅需 3 天（传统手动清理需 2 周）" — [[raw/articles/call-of-duty-cg-vfx-analysis.md]]
> "Territory Studio 为 BO6 创造了全新的 CG 叙事形式——解构主义设计语言" — [[raw/articles/call-of-duty-cg-vfx-analysis.md]]
> "打破整体再重组，制造视觉的'强烈感'和'混乱感'" — [[raw/articles/call-of-duty-cg-vfx-analysis.md]]

## Related

- [[wiki/cod-cg-production]]
- [[wiki/iw-engine]]
- [[wiki/pbr-rendering]]
- [[wiki/codm-vfx-system]]
- [[wiki/people/territory-studio]]
- [[wiki/people/platige-image]]
- [[wiki/codm-asset-pipeline]]
