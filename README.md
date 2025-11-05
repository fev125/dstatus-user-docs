# DStatus 用户文档

基于 VitePress 构建的 DStatus 分布式监控系统用户文档。

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建静态文件
npm run build
```

## 部署到 Cloudflare Pages

### 方式一：通过 Cloudflare Pages 控制台

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Pages** → **Create a project**
3. 连接你的 Git 仓库
4. 配置构建设置：
   - **Framework preset**: VitePress
   - **Build command**: `npm run build`
   - **Build output directory**: `.vitepress/dist`
   - **Root directory**: `工作区/user-docs` (如果文档在子目录)
5. 点击 **Save and Deploy**

### 方式二：使用 Wrangler CLI

```bash
# 安装 Wrangler
npm install -g wrangler

# 登录 Cloudflare
wrangler login

# 构建并部署
npm run build
wrangler pages deploy .vitepress/dist --project-name=dstatus-docs
```

### 方式三：直接上传静态文件

1. 运行 `npm run build` 生成静态文件
2. 静态文件位于 `.vitepress/dist` 目录
3. 在 Cloudflare Pages 控制台选择 **Direct Upload**
4. 上传 `.vitepress/dist` 目录中的所有文件

## 自动部署配置

如果使用 GitHub Actions 自动部署，参考以下配置：

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches:
      - main
    paths:
      - '工作区/user-docs/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Install dependencies
        working-directory: 工作区/user-docs
        run: npm ci
        
      - name: Build
        working-directory: 工作区/user-docs
        run: npm run build
        
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: dstatus-docs
          directory: 工作区/user-docs/.vitepress/dist
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

## 目录结构

```
user-docs/
├── .vitepress/
│   ├── config.mjs          # VitePress 配置
│   ├── plugins/            # 自定义插件
│   └── dist/              # 构建输出（自动生成）
├── public/                # 静态资源（图片等）
├── *.md                   # Markdown 文档
└── package.json
```

## 文档编写

- 遵循 Markdown 语法
- 图片放在 `public/` 目录
- 引用图片使用 `/filename.png`
- 支持 Vue 组件和自定义容器

## 更多信息

- [VitePress 官方文档](https://vitepress.dev/)
- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
