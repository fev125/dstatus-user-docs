# 站点发布说明（不对用户公开）

以下内容仅给文档维护者使用：如何把 `dstatus-user-docs` 发布成可访问的文档站点。

## 部署到 Cloudflare Pages

## 快速部署

### 方式一：通过 GitHub 集成（推荐）

1. 访问 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Pages** → **Create a project**
3. 点击 **Connect to Git**
4. 选择 **GitHub** 并授权
5. 选择 `dstatus-user-docs` 仓库
6. 配置构建设置：
   - **Production branch**: `main`
   - **Framework preset**: `VitePress`
   - **Build command**: `npm run build`
   - **Build output directory**: `.vitepress/dist`
   - **Node version**: `20`
7. 点击 **Save and Deploy**

构建完成后，Cloudflare 会提供一个 `*.pages.dev` 域名。

### 方式二：Wrangler CLI

```bash
# 安装 Wrangler
npm install -g wrangler

# 登录 Cloudflare
wrangler login

# 构建并部署
npm run build
wrangler pages deploy .vitepress/dist --project-name=dstatus-docs
```

## 自定义域名

1. 在 Cloudflare Pages 项目设置中
2. 进入 **Custom domains**
3. 添加你的域名（如 `docs.yourdomain.com`）
4. Cloudflare 会自动配置 DNS

## 自动部署

每次推送到 `main` 分支，Cloudflare Pages 会自动构建和部署。

## 预览部署

- 每个 Pull Request 都会生成独立的预览 URL
- 方便在合并前查看更改效果

## 环境变量

当前项目不需要额外的环境变量。

## 故障排查

### 构建失败

1. 检查 Node.js 版本是否为 20.x
2. 确保 `package.json` 中的依赖版本正确
3. 查看 Cloudflare Pages 构建日志

### 图片加载失败

确保图片文件在 `public/` 目录下，并且路径以 `/` 开头。

## 性能优化

建议压缩大尺寸图片：

```bash
# 使用 sharp-cli 压缩
npm install -g sharp-cli
sharp -i input.png -o output.png --jpeg --quality 80
```

## 更多资源

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [VitePress 部署指南](https://vitepress.dev/guide/deploy)
