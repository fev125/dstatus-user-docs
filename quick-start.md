# 快速开始

## 准备工作

- 一台 Linux 服务器
- 可使用 root 或 sudo 执行命令
- 服务器可以访问 `down.vps.mom`
- 默认端口是 `5555`；如果你安装时改过端口，请以实际端口为准

DStatus 面板通过 Docker 部署。服务器没有 Docker 时，部署脚本会尝试自动安装。

## 安装面板

1. 打开 `https://client.vps.mom`，登录后点击“部署”。
2. 复制页面生成的安装命令，在面板服务器上执行。
3. 安装完成后，访问 `http://<服务器 IP 或域名>:5555`。

![部署](/deployment.png)

如果安装时改过端口，请把访问地址里的 `5555` 换成你的实际端口。

## 更新面板

更新使用同一个部署脚本。安装完成后的终端输出里也会显示更新命令；找不到时可以直接执行：

```bash
curl -fsSL https://down.vps.mom/downloads/docker-image/install.sh | bash -s -- --update
```

如果面板不是安装在默认目录 `/opt/dstatus`，请在命令末尾加上你的实际安装目录：

```bash
--install-dir=/你的实际安装目录
```

更新后如果突然找不到登录入口，或密码对不上，到服务器跑救援脚本（可恢复 `/login`、可重置密码）：见 [无法登录时的服务器救援](./system-settings.md#忘记管理员密码)。

## 卸载面板

卸载也使用同一个部署脚本：

```bash
curl -fsSL https://down.vps.mom/downloads/docker-image/install.sh | bash -s -- --uninstall
```

默认卸载会移除面板程序和容器，但会保留 `data`、`logs`、`backups`，方便以后恢复或重新安装。

如果面板不是安装在默认目录 `/opt/dstatus`，同样请在命令末尾加上：

```bash
--install-dir=/你的实际安装目录
```

## 常见问题

### 访问不了安装资源

现象：安装或更新时提示下载失败。

处理：先确认服务器可以访问 `down.vps.mom`，再重新执行命令。

### 装完访问不了面板

现象：浏览器打不开 `:5555`。

处理：
1. 确认你使用的端口（默认 5555）在服务器安全组/防火墙里已放行
2. 确认端口没有被其他程序占用（换一个端口再试）

### 卸载时想同时删除数据

默认卸载会保留数据。如果确认不再需要历史数据，请先自行确认备份，再执行：

```bash
curl -fsSL https://down.vps.mom/downloads/docker-image/install.sh | bash -s -- --uninstall --purge-data
```

执行后脚本会再次确认是否删除 `data`、`logs`、`backups`。

## 下一步

- [使用教程](usage.md)
- [面板迁移教程](panel-migration.md)
- [进阶：前后台域名分离](./domain-split-manual.md)
