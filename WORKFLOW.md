# GamifyPlayer · 文章写作与发布工作流（长期可用）

面向：**只用命令行 + Git + GitHub**，在 Cursor 里改内容、稳定上线。

---

## 0. 一次性准备

1. 本机安装 **Node.js 22**（或 20+）。
2. 仓库已按 `DEPLOY.md` 接好 **GitHub Actions → GitHub Pages**。
3. 以后日常开发：**不要**在 Windows 系统环境变量里长期设置 `BASE_PATH` / `PUBLIC_SITE_URL`（避免本地样式错乱）。

---

## 1. 内容放哪里（路径）

| 类型 | 文件夹 | 线上路径 |
|------|----------|----------|
| Briefings（短文 / 资讯解读） | `src/content/briefings/` | `/briefings/文章名/` |
| Guides（单题攻略） | `src/content/guides/` | `/guides/文章名/` |

- 文件名用 **小写 + 连字符**，例如 `gta6-launch-night-download-queue.md`。
- **不要**用空格或中文文件名（避免 URL 与跨平台问题）。

---

## 2. 文章格式（Frontmatter + 正文）

### Briefings（`src/content/briefings/*.md`）

```yaml
---
title: "英文标题"
date: 2026-05-21
tags:
  - gta-6
  - launch
summary: "一句话摘要，会进列表和 meta description"
game: "gta-6"
kind: "preview"
freshness: "时效说明（可选）"
publish: true
---

正文用 Markdown 写在这里。
```

- `content` 不是 frontmatter 字段：**`---` 下面的全部是正文**。
- `publish: false` 的文件**不会生成页面**（适合做 `BRIEFING-TEMPLATE.md` 模板）。

### Guides（`src/content/guides/*.md`）

```yaml
---
title: "英文标题"
description: "列表与 SEO 用的一句话"
game: "once-human"
gameVersion: "版本号 / 赛季说明"
lastVerified: 2026-05-21
platforms:
  - PC (Steam)
hasAnimatedMedia: false
publish: true
tags:
  - inventory
difficulty: "Beginner"
---

正文 Markdown。
```

- 你习惯的 **version** → 填 **`gameVersion`**；**verified** → 填 **`lastVerified`**（日期）。
- 动图：`hasAnimatedMedia: true` 且设置 `animatedMediaSrc: "/media/guides/xxx.gif"`（文件放 `public/media/guides/`）。

模板文件（不参与发布）：

- `src/content/briefings/BRIEFING-TEMPLATE.md` → `publish: false`
- `src/content/guides/GUIDE-TEMPLATE.md` → `publish: false`

---

## 3. 本地预览（推荐流程）

在项目根目录：

```powershell
npm install
npm run dev
```

浏览器打开终端里提示的地址（一般是 `http://localhost:4321/`）。  
保存 Markdown 后页面会热更新。

**模拟 GitHub Pages 子路径**（与线上完全一致时）：

```powershell
$env:PUBLIC_SITE_URL="https://你的用户名.github.io"
$env:BASE_PATH="/gamifyplayer"
npm run build
npm run preview
```

浏览器打开：`http://127.0.0.1:4321/gamifyplayer/`（注意带仓库名路径）。

---

## 4. 提交到 GitHub（每次发布都做）

```powershell
git status
git add src/content/briefings/ src/content/guides/
git commit -m "content: add briefings and guides"
git push origin main
```

- 一次写 **10 篇、100 篇** 也一样：批量 `git add` 对应目录 → 一条有意义的 `commit` → `push`。
- `commit` 信息建议带前缀：`content:`、`fix:`，方便以后查历史。

---

## 5. 自动上线（你不需要手动传 dist）

推送到 **`main`** 后，GitHub Actions 会：

1. `npm ci`
2. 设置 `PUBLIC_SITE_URL` 与 `BASE_PATH`
3. `npm run build` → 生成 **`dist/`**
4. 发布到 Pages

在仓库 **Actions** 里看绿勾；线上地址：

`https://你的用户名.github.io/gamifyplayer/`

---

## 6. 规模化写作（10 / 100 篇的标准节奏）

1. **在 Cursor 里**复制 `BRIEFING-TEMPLATE.md` 或 `GUIDE-TEMPLATE.md`，改名、`publish: true`、填 frontmatter、写正文。
2. **`npm run dev`** 自检排版与链接。
3. **按批次提交**：例如每周 `git commit -m "content: week 12 briefings"`，不要一百篇一个巨型提交（回滚困难）。
4. **推 `main`**，等 Actions 完成后再对外分享链接。

---

## 7. 旧链接说明

本站 Briefings 已从 **`/news/`** 改为 **`/briefings/`**。已收藏旧链接的用户需要更新书签。
