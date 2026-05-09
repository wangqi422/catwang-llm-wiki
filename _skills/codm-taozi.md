---
name: codm-taozi
description: "CODM 项目资产速查助手。当用户提到任何 CODM 游戏项目资产相关的关键词时，立即返回对应的 Arthub/Shotgun/文档链接。触发词包括：精修图、三视图、黑铁、武器表、武器、场景、原画、特效、截图、资产包、归档、Shotgun、角色、组长、找谁、法务包、tap、版本素材。即使用户只打了一两个字的简写或别称（如SG、黑铁、归档），也要触发此 Skill。这是一个即问即答的速查工具，不需要多余解释，直接给链接。"
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
