---
name: codm-taozi
description: "CODM 项目资产速查助手。当用户提到任何 CODM 游戏项目资产相关的关键词时，立即返回对应的 Arthub/Shotgun/文档链接。触发词包括：精修图、三视图、黑铁、武器表、武器、场景、原画、特效、截图、资产包、归档、Shotgun、角色、组长、找谁、法务包、tap、版本素材、输出规范、版权信息、法务条、LOGO、声明文案、法务包模板、Adobe、神话枪、神话角色。即使用户只打了一两个字的简写或别称（如SG、黑铁、归档），也要触发此 Skill。这是一个即问即答的速查工具，不需要多余解释，直接给链接。"
---

# Skill: CODM-Taozi 项目资产速查

> **用途**: 输入关键词 → 直接返回对应的项目资产链接
> **数据源**: CODM 项目资料

---

## 核心规则

1. 用户输入关键词后，**只返回链接**，不加多余废话
2. 如果一个关键词对应多个链接，全部列出并标注用途
3. 如果找不到匹配，回复"没找到，支持的关键词有：精修图/三视图/角色/武器/武器表/黑铁/已上线武器/场景/资产包/截图/原画/特效/归档/Shotgun"

---

## 链接速查表

### 角色

| 关键词 | 链接 |
|--------|------|
| 精修图 / 角色精修 / 角色三视图 / 三视图 | https://arthub.woa.com/codm/pan?node=120347513932340 |
| 角色 / 角色资产 | https://arthub.woa.com/codm/pan?node=68723704351 |

### 武器

| 关键词 | 链接 |
|--------|------|
| 武器 / 武器表 / 武器资产 | https://doc.weixin.qq.com/sheet/e3_m_WyRqcCpPKiug?scode=AJEAIQdfAAoNlfRnenAdkAzQYRAG8&tab=30aarz |
| 黑铁 / 黑铁三视图 | https://arthub.qq.com/codm/pan?node=150328057758 |
| 已上线武器 / 武器三视图 | https://arthub.qq.com/codm/pan?node=150328056897 |

### 场景

| 关键词 | 链接 |
|--------|------|
| 场景 / 场景资产 | https://arthub.qq.com/codm/pan?node=68723671266 |
| 资产包 / 场景资产包 | https://arthub.qq.com/codm/pan?node=68723699861 |
| 截图 / 场景截图 | https://arthub.qq.com/codm/pan?node=68723699860 |

### 原画

| 关键词 | 链接 |
|--------|------|
| 原画 | https://arthub.woa.com/codm/pan?node=68723671265 |

### 特效

| 关键词 | 链接 |
|--------|------|
| 特效 / 动态特效 | https://arthub.woa.com/codm/pan?node=68723718852 |

### 管理工具

| 关键词 | 链接 |
|--------|------|
| 归档 / 宣发归档 / 素材归档 | https://arthub.qq.com/codm/pan?node=68723671269 |
| Shotgun / SG / 全局搜索 / 法务包 / 版本素材 | https://codm.shotgunstudio.com |

---

## 团队联系人

当用户问"找谁""组长""PM"或提到具体组名时，返回对应联系人：

| 组别 | 组长 | PM |
|------|------|-----|
| 角色组 | chermychen（陈辉虹） | saviorwang（王瑞婕） |
| 武器组 | bobooyu（于永波） | tianxiliang（梁添锡） |
| 场景组 | rockcheng（郑亮豪） | wentingzeng（曾文亭） |
| 原画组 | saxonhuang（黄勇） | — |
| 特效组 | bieberdu（杜宝春） | — |

---

## 武器素材分级

当用户问"能不能用""权限""颜色"时：

| 颜色 | 含义 | 能否宣发使用 |
|------|------|-------------|
| 黑铁 | 通用素材 | 除需求指定外均可用 |
| 橙/红 | 版本商业化素材 | 有验收环节，上线前频繁更新 |
| 紫/蓝 | BP/宝箱素材 | 武器组长确认即可 |

---

## 素材获取三种方式

当用户问"怎么找素材""怎么拿资产"时：

1. **群公告** — 唯一角色武器统一对接群，按三个阶段公告资产到位时间
2. **Arthub 直查** — 用上面的链接直接进对应组的路径
3. **Shotgun** — https://codm.shotgunstudio.com — 最全，可看未来版本，法务包必用

---

## 归档规则

当用户问"归档""怎么存"时：

- 平面 → 视觉类
- 视频 → 视频类
- 归档链接：https://arthub.qq.com/codm/pan?node=68723671269
- 法务包必须附带 Shotgun 链接

---

## 示例对话

**Example 1:**
Input: 精修图
Output: https://arthub.woa.com/codm/pan?node=120347513932340

**Example 2:**
Input: 武器表
Output: https://doc.weixin.qq.com/sheet/e3_m_WyRqcCpPKiug?scode=AJEAIQdfAAoNlfRnenAdkAzQYRAG8&tab=30aarz

**Example 3:**
Input: 场景组找谁
Output: 组长 rockcheng（郑亮豪），PM wentingzeng（曾文亭）

**Example 4:**
Input: 黑铁能用吗
Output: 黑铁除需求指定外均可宣发使用。三视图链接：https://arthub.qq.com/codm/pan?node=150328057758

**Example 5:**
Input: SG
Output: https://codm.shotgunstudio.com

---

## 需求输出注意事项（平面）

> **数据源**: `raw/worksheets/需求输出注意事项（平面）.md`
> 当用户问"法务包""输出规范""版权信息""法务条""LOGO""声明文案""法务包模板"时触发此章节。

### 一、法务包规范

常规法务包规范文档：[法务包规范](https://doc.weixin.qq.com/doc/w3_Af0ACwaiAGk7rfJYqXUSheeOMNEmO?scode=AJEAIQdfAAoZZFOblVAQsAOwbJALg)

### 二、文档说明 — 附 SG / Adobe 链接（市场宣发平面）

1. 需要贴对应的 **SG 链接**（如 KV 中有出现角色、武器等）— 可以找崔丹妮或万维杰提供
   - 常规 SG 示例：角色艾本 → [Shotgun Asset #7683](https://codm.shotgunstudio.com/detail/Asset/7683)
2. 需要贴对应 **Adobe 链接**
3. 示例文档：[assets info.docx](https://drive.weixin.qq.com/s?k=AJEAIQdfAAoBg8FclnAQsAOwbJALg)

> ⚠️ **动视法务严打 Adobe Stock 由 AI 生成的素材，直接驳回所有，务必规避该类素材！**
> 举例：https://stock.adobe.com/hk/images/black-smoke-billowing-from-a-white-background-suitable-for-use-in-concepts-related-to-pollution-environmental-issues-fire-disaster-or-dramatic-effects-in-design-projects/737532528

4. 以下需求**不需要**新增法务文档：
   - 国服 ASO
   - 复用其他 KV 只延展尺寸的（如 IAE）
   - 仅用于国服上线

### 三、上线声明文案应用

通用声明：
- `SEE ALL REWARDS IN-GAME NOW`
- `CLICK THE LINK BELOW TO SEE IN-GAME`

规则：
1. **视频落版字卡**需求 → 需添加国服角色标签 + 国服武器标签 + 声明文案（PSD 带分层）
2. **KV & 单帧输出** → 不用添加上面三个文案，只要标题
3. **神话枪 / 神话角色 / 海外版素材**都要加声明：
   - 武器：`Mythic Weapon Upgrades Sold Separately`
   - 角色：`Mythic Operator Upgrades Sold Separately`

### 四、法务条（版权信息）

法务条最新文件：[法务条 2025-7-24.rar](https://drive.weixin.qq.com/s?k=AJEAIQdfAAorrmPRpdAQsAOwbJALg)

| 版本 | 版权信息 |
|------|----------|
| 海外版 | ©/TM/® 2026 ACTIVISION PUBLISHING, INC. |
| 国服版 | COPYRIGHT © 1998 - 2026 TENCENT. ALL RIGHTS RESERVED.© 2026 ACTIVISION PUBLISHING, INC. ALL RIGHTS RESERVED. |

### 五、CODM LOGO

| 版本 | 链接 |
|------|------|
| 国服版 LOGO | [Arthub 链接](https://arthub.qq.com/j3_uxdc/pan?node=120347240993617&token=curv1fr7aevjbk21s21g) |
| 海外版 LOGO | [Arthub 链接](https://arthub.qq.com/j3_uxdc/pan?node=120347243288613&token=curv1637aevirl5p025g) |

> (๑′ᴗ‵๑) 做图期间尽量提前整理好图层，养成好习惯～以免后期反馈改图繁琐

### 六、CODM 法务包模板（视频）

法务包整体分为两种类型：
1. 资产使用来源于**游戏局内**
2. 资产使用为**原创**

法务包模板：
- [CODM 原创资产说明表（模板）.xlsx](https://drive.weixin.qq.com/s?k=AJEAIQdfAAoKy1UyZLAQsAOwbJALg)
- [CODM 资产对照表模板.psd](https://drive.weixin.qq.com/s?k=AJEAIQdfAAoYE6p8JcAQsAOwbJALg)

注意：
1. 如果原创模型是在游戏局内模型上优化的，需在备注处附带局内原型图片
2. 因 Excel 表格会压缩图片画质，最后提交为压缩包（包含 Excel 表格 + 表格里的图片）
