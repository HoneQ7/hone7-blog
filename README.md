# Hone7 Blog

Hone7 Blog 是一个基于 Astro 的中文静态个人技术博客，内容方向包括算法竞赛、408 考研笔记、AI 专业学习和个人项目开发记录。项目不依赖数据库、后端、登录系统或 CMS，可直接部署到 Vercel。

## 技术栈

- Astro + TypeScript
- Astro Content Collections
- Markdown 写作
- 原生 CSS / CSS variables
- RSS、Sitemap、Robots、404 页面

## 本地运行

请使用 Node.js `>=22.12.0` 和 npm `>=10.8.2`。如果使用 nvm，可以先执行：

```bash
nvm use
```

```bash
npm install
npm run dev
```

开发服务器默认运行在 `http://localhost:4321`。

## 构建与预览

```bash
npm run build
npm run preview
```

静态产物会输出到 `dist/`，这是 Vercel 的部署输出目录。

## 部署到 Vercel

1. 将仓库导入 Vercel。
2. Framework Preset 选择 `Astro`。
3. Build Command 使用 `npm run build`。
4. Output Directory 使用 `dist`。
5. 域名绑定到 `https://www.hone7.one`。

## 新增文章

在 `src/content/blog/` 下新增 Markdown 文件，例如 `my-note.md`：

```md
---
title: "文章标题"
description: "文章摘要"
pubDate: 2026-06-13
tags: ["算法竞赛", "学习笔记"]
featured: false
---

这里开始写正文。
```

文件名会成为文章路径，例如 `src/content/blog/my-note.md` 对应 `/blog/my-note/`。
