---
title: "零成本部署Firefly博客至Cloudflare"
published: 2026-07-27
description: "手把手教你把 Firefly 静态博客免费托管到 Cloudflare 边缘网络，无需服务器、无需备案，推送即自动部署。"
category: 教程
tags: [Firefly, 博客]
author: "xiaoH"
---

# 🚀 零成本上线：将 Firefly 博客部署至 Cloudflare Workers / Pages

对于个人博客而言，最理想的状态莫过于"写完即发布"。Firefly 作为基于 Astro 构建的静态博客主题，天然适合托管在各类边缘计算平台上。而在众多选择中，Cloudflare 的 Workers 与 Pages 服务因其**零费用**、**全球加速**、**自动 HTTPS** 等特性，成为性价比极高的部署方案。

本文将带你完成从项目配置到线上发布的完整流程，全程无需购买服务器，也无需繁琐的备案流程。

---

## 🌐 一、为什么选择 Cloudflare？

在动手之前，先明确这套方案的优势所在：

- 🆓 **零成本起步**：Workers 与 Pages 均提供免费额度，足以支撑个人博客的日常访问
- 🌍 **全球边缘节点**：Cloudflare 在全球拥有大量数据中心，访客无论身处何地都能获得较快的加载速度
- 🔄 **Git 驱动自动部署**：只需将代码推送到 GitHub，Cloudflare 便会自动拉取、构建并发布，真正实现"推送即上线"
- 🔒 **原生 HTTPS 支持**：无需手动申请证书，绑定域名后自动签发并续期 SSL 证书

---

## 📋 二、前置准备工作

在开始部署前，请确保完成以下环境安装与账号注册。

### 2.1 🐙 安装 Git

Git 是版本控制工具，也是连接 GitHub 与 Cloudflare 的基础。

**Windows：**

前往 [Git 官网](https://git-scm.com/downloads) 下载安装包，双击运行安装向导，保持默认选项即可。

**macOS：**

```bash
# 方式一：使用 Homebrew 安装
brew install git

# 方式二：安装 Xcode Command Line Tools
xcode-select --install
```

**Linux（Ubuntu/Debian）：**

```bash
sudo apt update && sudo apt install git -y
```

安装完成后验证：

```bash
git --version
# 输出示例：git version 2.45.0
```

### 2.2 🟢 安装 Node.js

Firefly 要求 Node.js 版本 **≥ 22**。

**推荐方式：使用 nvm 管理多版本**

```bash
# Windows（需先在 GitHub 下载 nvm-windows 安装包）
# 下载地址：https://github.com/coreybutler/nvm-windows/releases

# macOS / Linux
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

安装 `nvm` 后：

```bash
# 安装 Node.js 22
nvm install 22

# 切换到 22 版本
nvm use 22

# 验证版本
node -v
# 输出示例：v22.16.0
```

**其他方式：直接下载安装包**

前往 [Node.js 官网](https://nodejs.org/)，下载 **v22 LTS** 版本安装包，双击运行即可。

| 平台      | 下载地址                                                  |
|:------- |:----------------------------------------------------- |
| Windows | [nodejs.org](https://nodejs.org/)                     |
| macOS   | [nodejs.org](https://nodejs.org/)                     |
| Linux   | 使用 `apt`、`dnf` 或 [nvm](https://github.com/nvm-sh/nvm) |

### 2.3 📦 安装 pnpm

Firefly 使用 `pnpm` 作为包管理器，安装速度比 `npm` 更快、磁盘占用更少。

```bash
# 通过 npm 全局安装 pnpm
npm install -g pnpm

# 验证安装
pnpm -v
# 输出示例：10.8.1
```

> [!TIP]
> 如果你使用的是 Node.js ≥ 22.12.0，也可以直接通过 Corepack 启用 pnpm：
> 
> ```bash
> corepack enable
> corepack prepare pnpm@latest --activate
> ```

### 2.4 🔗 注册 GitHub 账号并 Fork 仓库

如果还没有 GitHub 账号，前往 [github.com](https://github.com/) 注册。

注册完成后：

1. 前往 [CuteLeaf/Firefly](https://github.com/CuteLeaf/Firefly) 仓库
2. 点击右上角的 **Fork** 按钮，将项目复制到自己的账号下
3. 勾选 **Copy the main branch only**，点击 **Create fork**

### 2.5 ☁️ 注册 Cloudflare 账号

前往 [Cloudflare 官网](https://www.cloudflare.com/) 点击右上角 **Sign Up** 注册账号。

| 项目           | 说明                                                           |
|:------------ |:------------------------------------------------------------ |
| 官网地址         | [https://www.cloudflare.com/](https://www.cloudflare.com/)   |
| Dashboard    | [https://dash.cloudflare.com/](https://dash.cloudflare.com/) |
| Workers 免费额度 | 100,000 次/天                                                  |
| Pages 免费额度   | 无限次部署，500 次构建/月                                              |

注册并登录后，在 Dashboard 左侧可以看到 **Workers 和 Pages** 选项，后续部署将在这里操作。

### 2.6 ✅ 环境检查清单

在进入下一步之前，依次执行以下命令，确认输出正常：

```bash
git --version        # ✅ 需要 git version 2.x
node -v              # ✅ 需要 v22.x 或更高
pnpm -v              # ✅ 需要正常输出版本号
```

| 检查项              | 状态  |
|:---------------- |:---:|
| Git 已安装          | ✅   |
| Node.js ≥ 22 已安装 | ✅   |
| pnpm 已安装         | ✅   |
| GitHub 账号已注册     | ✅   |
| Firefly 仓库已 Fork | ✅   |
| Cloudflare 账号已注册 | ✅   |

---

## ⚙️ 三、配置项目构建参数

Firefly 项目根目录已内置 `wrangler.jsonc` 配置文件，这是 Cloudflare 部署的核心依据。你需要对其进行**两项关键修改**：

打开 `wrangler.jsonc`，找到以下内容并替换：

```jsonc
{
  "name": "your-project-name",        // 替换为你喜欢的项目名称
  "compatibility_date": "2026-07-27", // 修改为当前日期
  "compatibility_flags": ["nodejs_compat"],

  "assets": {
    "directory": "./dist"
  }
}
```

---

## 📦 四、部署方式一：Cloudflare Pages

Pages 是 Cloudflare 专为静态站点设计的托管服务，部署流程最为简洁。

### 📝 步骤 1：关联 Git 仓库

1. 登录 Cloudflare Dashboard，左侧菜单进入 **Workers 和 Pages**
2. 点击 **创建应用程序**，选择 **Pages** 标签页下的 **导入现有 Git 仓库**
3. 授权 Cloudflare 访问你的 GitHub 账号，在仓库列表中选择你 Fork 的 Firefly 项目

### 🔧 步骤 2：配置构建设置

在构建设置页面，按如下参数填写：

| 配置项    | 填写内容           |
|:------ |:-------------- |
| 构建命令   | `pnpm build`   |
| 构建输出目录 | `dist`         |
| 安装命令   | `pnpm install` |

完成后点击 **保存并部署**，Cloudflare 会自动执行依赖安装与静态构建。

### 📌 步骤 3：设置 Node.js 版本

进入项目的 **设置 → 环境变量**，添加一条变量：

| 变量名            | 值    |
|:-------------- |:---- |
| `NODE_VERSION` | `22` |

这一步确保构建环境使用正确的 Node.js 版本，避免因版本过低导致 Astro 构建失败。

> [!WARNING]
> 如果不设置 `NODE_VERSION` 环境变量，Cloudflare 可能会使用默认的旧版本 Node.js，导致构建失败。

---

## 🔧 五、部署方式二：Cloudflare Workers（⭐）

如果你希望利用 Workers 的边缘计算能力，或未来有扩展动态接口的需求，可以选择 Workers 部署。

### 📝 步骤 1：创建 Worker 应用

1. 在 **Workers 和 Pages** 页面点击 **创建应用程序**
2. 选择 **Workers** 标签页，点击 **Connect GitHub**
3. 同样选择你的 Firefly 仓库并完成授权

### 🔧 步骤 2：配置构建与部署命令

Workers 的部署需要额外执行 wrangler 命令，配置如下：

| 配置项  | 填写内容                  |
|:---- |:--------------------- |
| 构建命令 | `pnpm build`          |
| 部署命令 | `npx wrangler deploy` |

### 🤔 步骤 3：关于 SSR 适配器

Firefly 项目内部通过 `process.env.CF_WORKERS` 环境变量自动判断是否启用 Astro 的 SSR 适配器。当你使用 Workers 部署时，系统会自动处理服务端渲染逻辑；而 Pages 部署则直接使用静态文件，无需额外配置。

> [!TIP]
> 纯静态博客选择 Pages 即可，无需关心 SSR 适配器的配置。只有在需要动态功能时才考虑 Workers 部署。

---

## ✅ 六、验证部署结果

无论选择 Pages 还是 Workers，首次部署完成后，Cloudflare 都会分配一个**临时域名**：

- Pages 部署：格式为 `xxx.pages.dev`
- Workers 部署：格式为 `xxx.workers.dev`

点击该域名访问，若能看到 Firefly 默认的博客首页，说明部署成功 🎉

此后，每当你向 GitHub 仓库推送新的提交，Cloudflare 都会自动触发重新构建与发布，整个过程通常在 **5 分钟内**完成。

---

## 🌍 七、绑定自定义域名

临时域名虽然可用，但不够正式。若你已有域名，可按以下步骤绑定：

1. 在 Cloudflare 项目设置中找到 **自定义域** 或 **触发器**，添加你的域名
2. Cloudflare 会自动生成一条 CNAME 记录目标值
3. 前往你的域名注册商控制台，添加对应的 CNAME 解析记录，指向该目标值
4. 等待 DNS 生效（通常几分钟到数小时），Cloudflare 会自动完成 SSL 证书签发

> [!NOTE]
> 若你的域名托管在 Cloudflare 上，解析生效速度会更快；若使用第三方注册商，只需确保 DNS 记录填写正确即可。

---

## ❓ 八、常见问题速查

### Q：构建失败，提示 Node.js 版本过低？

**A**：检查环境变量中 `NODE_VERSION` 是否设置为 `22`，或在项目设置中手动指定 Node 版本。

### Q：部署后页面样式丢失或 404？

**A**：确认 `astro.config.mjs` 中的 `site` 字段是否已修改为你的实际域名。若使用子路径部署，还需正确设置 `base` 字段。

### Q：Workers 与 Pages 该如何选择？

**A**：纯静态博客首选 **Pages**，配置更简单；若有后续扩展 API 接口的计划，可选择 **Workers**。

---

## 🎯 结语

通过 Cloudflare 部署 Firefly 博客，本质上就是把"写代码"和"发文章"这两件事彻底解耦。你只需专注于在 `src/content/posts/` 目录下撰写 Markdown 文章，剩下的构建、打包、上线全部交给 Git 与 Cloudflare 的自动化流水线。

这种"无服务器"的部署方式，不仅降低了个人博客的运维门槛，也让内容创作回归本质。

> [!TIP]
> 现在就去写你的第一篇文章吧！只需在 `src/content/posts/` 目录下创建 `.md` 文件，添加 Front-matter 元数据，推送到 GitHub，你的文章就会自动上线 🚀

---

**📚 参考链接**

- 🔗 [Firefly 官方文档](https://docs-firefly.cuteleaf.cn/zh/guide/deploy.html)
- 🔗 [Firefly GitHub 仓库](https://github.com/CuteLeaf/Firefly)
