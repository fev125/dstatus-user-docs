# 快速开始

## 系统要求

- **操作系统**：Linux（优先支持 Ubuntu/Debian、CentOS/RHEL/Fedora，其他发行版也可尝试）
- **架构**：x86_64 (AMD64) 仅支持
- **内存**：最低 512MB RAM，推荐 1GB+
- **磁盘**：最低 1GB 可用空间
- **权限**：需要 root 权限运行安装脚本

> 💡 系统提供 Docker 运行方式，脚本会自动检测并安装 Docker（如未安装）。无需单独安装 Node.js、NPM 或数据库。

## 安装步骤

1. 登录并部署：
登录客户端网页，点击部署，复制部署脚本，粘贴到 ssh 一键安装
``` 
https://client.vps.mom
```
![部署](/deployment.png)

提示：部署脚本会从 `down.vps.mom` 拉取安装资源，请确保你的服务器能访问该域名。

2. 访问系统：
打开浏览器访问 `http://ip:5555`，默认登录密码 `dstatus`，首次登录请务必修改为强密码，并记住密码。

## 下一步

- [使用教程](usage.md)
- [面板迁移教程](panel-migration.md)
