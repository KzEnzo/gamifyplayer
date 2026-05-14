# GamifyPlayer · 部署到 GitHub Pages（完整步骤）

本文假设：你的 GitHub 用户名是 **`YOURNAME`**（请自行替换），仓库名是 **`gamifyplayer`**（全小写，与站点子路径一致）。

线上访问地址将是：

```text
https://YOURNAME.github.io/gamifyplayer/
```

---

## 一、你需要准备的东西

1. 已安装 **Node.js 18+**（推荐 20 或 22）。
2. 一个 **GitHub 账号**。
3. 本仓库在电脑上的文件夹（例如桌面上的 `Gamifyplayer`）。

---

## 二、在 GitHub 上创建仓库

1. 打开 [https://github.com/new](https://github.com/new)。
2. **Repository name** 填写：`gamifyplayer`（建议全小写，与本文一致）。
3. 选 **Public**（公开）。
4. **不要**勾选 “Add a README” 等初始化文件（避免第一次推送冲突）。
5. 点 **Create repository**。

记下页面上的仓库地址，例如：

```text
https://github.com/YOURNAME/gamifyplayer.git
```

---

## 三、把本地项目推送到 GitHub

在本机打开终端（PowerShell 或 CMD），进入项目根目录（包含 `package.json` 的那一层），执行：

```powershell
git init
git add .
git commit -m "GamifyPlayer: initial site"
git branch -M main
git remote add origin https://github.com/YOURNAME/gamifyplayer.git
git push -u origin main
```

若 `git remote` 已存在，可改用：

```powershell
git remote set-url origin https://github.com/YOURNAME/gamifyplayer.git
git push -u origin main
```

---

## 四、打开 GitHub Pages（必须选 Actions）

1. 打开仓库 → **Settings**（设置）。
2. 左侧点 **Pages**。
3. **Build and deployment** → **Source** 选择 **GitHub Actions**（不要选 “Deploy from a branch”）。
4. 保存后返回仓库首页 → **Actions**。
5. 若第一次提示启用工作流，点 **I understand my workflows, go ahead and enable them**。

之后每次你向 **`main`** 分支 `git push`，工作流 **Deploy to GitHub Pages** 会自动：

- 安装依赖（`npm ci`）
- 设置 `PUBLIC_SITE_URL` 与 `BASE_PATH`（与 GitHub Pages 子路径一致）
- 执行 `npm run build`，生成 **`dist/`**
- 把 `dist/` 发布到 Pages

首次部署大约 **1～3 分钟**。完成后在 **Settings → Pages** 里会显示 **Visit site** 链接。

---

## 五、本地构建与预览（重要）

### 1）日常开发（无子路径，适合改文案）

不要在 Windows「系统环境变量」里长期设置 `BASE_PATH` 或 `PUBLIC_SITE_URL`，否则本地预览容易样式丢失。

```powershell
npm install
npm run dev
```

浏览器打开终端里提示的地址（一般是 `http://localhost:4321/`）。

### 2）模拟线上（带子路径 `/gamifyplayer/`）

与 GitHub Actions 一致构建：

```powershell
$env:PUBLIC_SITE_URL="https://YOURNAME.github.io"
$env:BASE_PATH="/gamifyplayer"
npm run build
npm run preview
```

然后浏览器打开：

```text
http://127.0.0.1:4321/gamifyplayer/
```

注意地址末尾要带 **`/gamifyplayer/`**；若只打开根路径 `/`，样式表路径会对不上。

也可用一条命令（先构建再预览）：

```powershell
npm run preview:fresh
```

（默认 **无** `BASE_PATH`，用于快速看效果；要测子路径请用上一段带环境变量的命令。）

---

## 六、`dist/` 与路径说明

- 运行 **`npm run build`** 后，所有可部署的静态文件在 **`dist/`** 目录。
- 在 **GitHub Actions** 里构建时，会为项目站生成带前缀的 URL（例如 `/gamifyplayer/_astro/...`）。  
  GitHub Pages 会把 **`https://YOURNAME.github.io/gamifyplayer/`** 映射到 **`dist/` 根目录**，因此磁盘上的 **`dist/_astro/`** 对应网上的 **`/gamifyplayer/_astro/`**，这是预期行为，不是错误。
- 仓库里的 **`public/.nojekyll`** 会复制进 `dist/`，避免部分环境下对 `_` 目录的误处理。

---

## 七、网站图标（favicon）

当前使用 **`public/favicon.png`**（你提供的红色手柄图）。更换图标时：覆盖 **`public/favicon.png`** 即可，然后重新 `git push`。

---

## 八、常见问题

**Q：Actions 失败，提示 `npm ci` 错误**  
A：确认已提交 **`package-lock.json`**，且本机执行过 `npm install` 后再推送。

**Q：页面能打开但没有深色样式**  
A：多半是本机曾设置 `BASE_PATH` 却用根路径预览。请清空环境变量后重新 `npm run build`，或按第五节用 **`/gamifyplayer/`** 打开预览。

**Q：想换成自定义域名**  
A：在仓库根目录添加 `public/CNAME` 文件，内容一行你的域名；并在域名 DNS 按 GitHub 文档配置。然后在 `astro.config.mjs` 里把 `site` 改成你的 https 域名（或通过 CI 环境变量注入）。

---

## 九、更新网站内容

1. 在本地修改 `src/`、`public/`、`src/content/` 等。
2. `git add` → `git commit` → `git push` 到 **`main`**。
3. 等待 Actions 绿勾后刷新线上页面（必要时 **Ctrl+F5**）。

在 Cursor 里改代码不会自动更新线上站点；**只有 push 之后** GitHub 才会重新构建并发布。
