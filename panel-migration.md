# 升级、备份与迁移

升级或卸载面板、备份数据、把面板搬到新服务器。

## 升级与卸载

推荐从用户中心生成命令：

1. 打开 [用户中心](https://client.vps.mom)，在许可证卡片上点「部署」。
2. 「模式」选「更新」或「卸载」；面板不在默认目录 `/opt/dstatus` 时，填写「安装目录」。
3. 复制「终端命令」，在面板服务器上执行。

也可以直接执行：

```bash
# 升级
curl -fsSL https://down.vps.mom/downloads/docker-image/install.sh | bash -s -- --update

# 卸载（保留 data、logs、backups）
curl -fsSL https://down.vps.mom/downloads/docker-image/install.sh | bash -s -- --uninstall

# 卸载并删除全部数据（会再次确认）
curl -fsSL https://down.vps.mom/downloads/docker-image/install.sh | bash -s -- --uninstall --purge-data
```

不在默认目录时，在命令末尾加 `--install-dir=/你的安装目录`。

### 升级后出问题，退回到升级前

每次升级前，面板会自动留一份升级前的数据库副本（最近两次升级各一份），在 设置中心 → 数据库与存储 → 备份管理 的「升级与操作前的保护副本」里可以看到和下载。升级后数据异常、或新版本起不来时，可以按下面步骤退回（以默认目录 `/opt/dstatus`、SQLite 为例）：

1. 进入安装目录：`cd /opt/dstatus`。
2. 开了自动更新的，先暂停：`docker stop watchtower`，免得退回后又被更新上去。
3. 停止面板：`docker compose down`（旧版 Docker 用 `docker-compose down`）。
4. 找到要退回的副本：`ls data/backups/auto/`，文件名以 `auto-pre-upgrade-` 开头；同名的 `.json` 里 `fromVersion` 就是升级前的版本。
5. 先把当前数据库挪开留着：`mv data/db.db data/db.db.broken`，有 `data/db.db-wal`、`data/db.db-shm` 时一起挪开。
6. 放回升级前的数据库：`.db.gz` 用 `gunzip -c data/backups/auto/文件名 > data/db.db`；`.tar.gz` 用 `tar -xzf data/backups/auto/文件名 -C data`。
7. 打开 `docker-compose.yml`，把面板镜像的标签改成升级前的版本：版本号最后一段（如 `2.26.10.021.dev-46` 里的 `dev-46`）就是标签。
8. 启动：`docker compose up -d`，登录检查数据。问题版本修复后再 `docker start watchtower` 恢复自动更新。

使用 PostgreSQL 的面板，升级前副本是 `.sql.gz`，只在有数据库结构升级时生成；退回时用 `gunzip -c 文件名 | psql 连接参数` 导入，或联系我们协助。

## 备份

入口：设置中心 → 数据与维护 → 数据维护。

| 按钮 | 内容 | 用途 |
|---|---|---|
| 压缩备份 | 全部数据，压缩 | 迁移、日常备份首选 |
| 完整备份 | 全部数据，不压缩 | 需要原始文件时 |
| 轻量备份 | 只保留业务配置，清空监控数据 | 只迁移配置和节点列表（PostgreSQL 无此项） |
| 恢复数据库 | 上传备份文件恢复 | 新面板导入数据 |

上面几个按钮直接下载到浏览器。要在服务器上留副本，用下方「备份文件」的「创建备份」；要自动备份，点「定时备份」。

另外，面板会在每次升级前，以及恢复数据库、切换数据库、重装、重置密码之前，自动留一份保护副本（最多 3 份，压缩保存，硬盘不够时自动少留并提醒），用于出问题时退回。它们只存在本机，异地保存仍请用定时备份 + WebDAV。

异地保存：在「备份 WebDAV」填写地址、用户名、密码和远程根目录，打开「启用 WebDAV 备份同步」并点「保存 WebDAV」。之后创建的备份会自动上传。

![数据维护里的数据库管理按钮](/settings-backup.jpg)

## 迁移到新服务器

迁移会把旧面板的管理密码、登录入口等设置一起带过去。新面板提示授权已绑定到其他实例时，按 [换服务器](/license-management#换服务器) 处理。

### 方案 A：面板内备份恢复（推荐）

1. 旧面板：数据维护 → 「压缩备份」，保存到本地。
2. 新服务器：按用户中心的部署命令安装面板。
3. 新面板：数据维护 → 「恢复数据库」，上传刚才的备份文件。
4. 等待恢复完成，面板会自动重启。刷新后用旧面板的密码登录，检查节点、分组、通知。

SQLite 面板的备份是 `.db` / `.db.gz`，PostgreSQL 面板的备份是 `.sql` / `.sql.gz`，只能恢复到同类型数据库。旧面板用 PostgreSQL 时，新面板先在「数据库」里切到 PostgreSQL，再「恢复 PostgreSQL 备份」。

### 方案 B：拷贝 data 目录

只适用于 SQLite。使用 PostgreSQL 的面板数据不在 data 目录里，只能用方案 A。

1. 新服务器先按部署命令安装面板，安装目录与旧面板保持一致（默认 `/opt/dstatus`）。
2. 两台服务器都进入安装目录，执行 `docker compose down`（旧版 Docker 用 `docker-compose down`）。
3. 把旧服务器的 `data` 目录完整复制到新服务器安装目录下，覆盖原有 `data`。
4. 新服务器执行 `docker compose up -d`，登录检查数据。

确认新面板正常后，再卸载旧面板。

## 常见情况

- **迁移后 Agent 不上线** → 主动模式的被控按安装时的上报地址上报。面板地址变了时，把原域名解析到新服务器；没有用域名的，在新面板服务器列表该节点的「更多」里复制「安装/更新脚本」，到被控上执行。
- **迁移后 SSH 连不上节点** → 到 安全访问 → 安全设置 → 认证与登录 → 「SSH 凭据加密」，填入迁移前的主机名后点「预览影响」，再点「轮转到稳定密钥」；仍有无法解开的，到对应服务器编辑页重新填写 SSH 密码。
- **迁移后进不去后台** → 见 [进不去后台怎么办](/login-management)。

## 相关

- [设置中心](/system-settings)
- [获取与激活授权](/license-management)
- [安装面板](/quick-start)
