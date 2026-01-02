# 文档站点维护说明（不对用户公开）

这份文件只给维护者看：如何本地预览、如何构建发布。

## 本地开发

1. 安装依赖：`npm install`
2. 启动开发服务器：`npm run dev`

## 构建与预览

- 构建：`npm run build`
- 本地预览：`npm run preview`

## Cloudflare Pages（如使用）

建议在 Cloudflare Pages 控制台配置：

- Framework preset：VitePress
- Build command：`npm run build`
- Build output directory：`.vitepress/dist`
- Root directory：如果文档在子目录（如 `dstatus-user-docs`），需要在这里填写子目录名

