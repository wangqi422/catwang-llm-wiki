# LLM Wiki 云端同步指南

> 方案：GitHub 私有仓库 + Obsidian Git 插件，实现家里/公司电脑无缝同步。

---

## 第一步：创建 GitHub 私有仓库

1. 登录 https://github.com （没账号就注册一个）
2. 点右上角 **+** → **New repository**
3. 填写：
   - Repository name: `my-llm-wiki`
   - **Private** ← 一定选私有！
   - 不要勾选 "Add a README"（我们本地已有内容）
4. 点 **Create repository**
5. 复制仓库地址（形如 `https://github.com/你的用户名/my-llm-wiki.git`）

## 第二步：公司电脑首次推送（当前电脑）

在项目目录执行：

```powershell
cd e:\my-llm-wiki

# 添加所有文件
git add .

# 首次提交
git commit -m "init: LLM Wiki 知识库初始化"

# 关联远程仓库（替换为你的地址）
git remote add origin https://github.com/你的用户名/my-llm-wiki.git

# 推送
git push -u origin main
```

> 如果提示认证，按提示登录 GitHub 即可（推荐使用 GitHub CLI 或 Personal Access Token）。

## 第三步：家里电脑克隆

```powershell
# 克隆到你想要的位置
git clone https://github.com/你的用户名/my-llm-wiki.git

# 安装依赖（如需运行卡片生成脚本）
cd my-llm-wiki
npm install
```

然后用 Obsidian 打开这个文件夹作为 Vault 即可。

## 第四步：安装 Obsidian Git 插件（自动同步）

> 这一步在**两台电脑**都要做。

1. Obsidian → 设置 → 第三方插件 → 关闭安全模式
2. 浏览社区插件 → 搜索 **Obsidian Git** → 安装 → 启用
3. 插件设置推荐：
   - **Auto pull interval**: `5` (每 5 分钟自动拉取)
   - **Auto push interval**: `5` (每 5 分钟自动推送)
   - **Pull on startup**: ✅ (启动时拉取最新)
   - **Auto commit**: ✅
   - **Commit message**: `vault backup: {{date}}`

这样配置后，你在任意一台电脑的改动会在 5 分钟内自动同步到另一台。

## 日常使用

配好 Obsidian Git 后，**你不需要手动操作 Git**。插件会自动：
- 启动 Obsidian 时拉取最新内容
- 每隔几分钟自动提交 + 推送你的改动
- 如果有冲突（极少发生），会弹窗提醒你手动解决

如果你想手动同步，可以：
- `Ctrl+P` → 输入 `Obsidian Git: Pull` 拉取
- `Ctrl+P` → 输入 `Obsidian Git: Push` 推送

## 注意事项

1. **不要同时在两台电脑编辑同一个文件**（虽然 Git 能处理冲突，但 Markdown 合并冲突不美观）
2. `.gitignore` 已排除 `node_modules/`、临时文件等，仓库体积不会膨胀
3. Obsidian 的 workspace 配置已排除同步（每台电脑的窗口布局独立）
4. 如果你还想同步 Obsidian 插件/主题配置，`.obsidian/` 文件夹已被包含在 Git 中
5. 仓库是 **Private** 的，你的知识库内容不会公开

## 备选方案

如果你不想用 Git，也可以考虑：
- **坚果云 + WebDAV**：Obsidian 原生支持，但无版本历史
- **Obsidian Sync**：官方方案，$4/月，最省心
- **OneDrive**：你可能已有，但大量小文件同步可能有延迟

推荐还是 GitHub + Obsidian Git，免费且可靠。
