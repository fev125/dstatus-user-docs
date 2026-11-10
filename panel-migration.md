# 升级、备份与迁移

在线升级或卸载面板，把数据备份到本机或 WebDAV，或搬到新服务器。

## 在哪打开

按要做的事打开对应入口。

| 操作 | 作用 |
|---|---|
| [用户中心](https://client.vps.mom)「仪表盘 → 部署」 | 生成面板的更新或卸载命令 |
| 面板后台「设置中心 → 数据库与存储」 | 备份、恢复、配置 WebDAV 与切换数据库 |
| 面板后台「授权管理」 | 换服务器前解绑旧面板许可证 |

<figure><img src="/panel-migration-backup-card.webp" alt="左侧菜单「设置中心 → 数据库与存储」与「最近备份」卡片"><figcaption>左侧菜单「设置中心 → 数据库与存储」与「最近备份」卡片</figcaption></figure>

## 怎么用

### 升级与卸载

在面板服务器上以 root 身份运行命令，非 root 账号先执行 `sudo -i`。

<DocTabs :tabs="['用户中心生成', '直接执行命令']">
<template #tab-0>

1. 打开 [用户中心](https://client.vps.mom)，在「仪表盘」点许可证卡片上的「部署」。
2. 在右侧抽屉把「操作」切到「更新」或「卸载」。
3. 面板不在 `/opt/dstatus` 时，修改「安装目录」。
4. 点「复制命令」，粘贴到面板服务器终端执行。

卸载默认保留数据目录。要一并删除数据，在命令末尾加 `--purge-data` 并按提示确认，或加 `--purge-data --yes`。

</template>
<template #tab-1>

1. 按需要复制下方命令，粘贴到面板服务器终端执行。

   ```bash
   # 升级面板
   curl -fsSL https://down.vps.mom/downloads/docker-image/install.sh | bash -s -- --update

   # 卸载面板（保留 data、logs、backups 目录）
   curl -fsSL https://down.vps.mom/downloads/docker-image/install.sh | bash -s -- --uninstall

   # 卸载并删除全部数据（会提示确认；跳过确认再加 --yes）
   curl -fsSL https://down.vps.mom/downloads/docker-image/install.sh | bash -s -- --uninstall --purge-data
   ```

2. 面板不在 `/opt/dstatus` 时，在命令末尾加 `--install-dir=/你的安装目录`。

</template>
</DocTabs>

::: details 升级后退回旧数据或旧版本
每次升级前，面板自动在本机留存一份保护副本。面板还能打开时，打开「备份管理」，在保护副本旁点「恢复」即可只退回数据。

新版本无法启动时，按以下步骤连版本一起退回（以 `/opt/dstatus`、SQLite 为例）：

1. 执行 `cd /opt/dstatus` 进入目录，开过自动更新先执行 `docker compose stop watchtower`。
2. 执行 `docker compose down` 停止面板（旧版用 `docker-compose down`）。
3. 执行 `ls data/backups/auto/` 找 `auto-pre-upgrade-` 副本，在同名 `.json` 看 `fromVersion`。
4. 执行 `mv data/db.db data/db.db.broken` 挪开现库，`db.db-wal`、`db.db-shm` 与 `mastra.db*` 一并挪开。
5. 按副本后缀解回升级前的数据库文件：

   ```bash
   # .db.gz 副本
   gunzip -c data/backups/auto/文件名 > data/db.db
   # .dsbak 或 .tar.gz 副本
   tar -xzf data/backups/auto/文件名 -C data
   ```

6. 编辑 `docker-compose.yml`，把镜像标签改成原版本号末段（如 `dev-46`）。
7. 执行 `docker compose up -d` 启动面板，问题修复后再执行 `docker compose start watchtower`。

PostgreSQL 仅在升级库结构前生成 `.dsbak` 或 `.sql.gz` 副本。停面板后解出 SQL，再用 `psql` 导入。
:::

### 备份与恢复

在「设置中心 → 数据库与存储」，用「最近备份」卡片创建、下载或恢复备份。

| 操作 | 作用 |
|---|---|
| 「立即备份」 | 在面板生成压缩备份；已启用 WebDAV 时自动上传 |
| 「修改计划」 | 设置定时备份周期、保留份数与 WebDAV 同步 |
| 「设置」 | 打开「备份管理」配置「远程副本（WebDAV）」 |
| 「备份管理 → 备份文件」 | 查看本地与 WebDAV 备份，点「恢复」直接恢复（无需先下载） |
| 「备份管理 → 升级与操作前的保护副本」 | 查看升级、恢复、切换数据库、重装或重置密码前的本机副本（最多 3 份） |
| 「备份管理 → 下载当前数据库」 | 下载到电脑：「压缩备份」（首选）、「完整备份」或「轻量备份」（不含监控与 AI 对话，仅 SQLite） |
| 「恢复」 | 上传本地备份恢复（SQLite 支持 `.dsbak`、`.db`、`.db.gz`、`.zip`、`.tar.gz`；PostgreSQL 支持 `.dsbak`、`.sql`、`.sql.gz`、`.zip`） |

备份、恢复与切换数据库会一并带上 AI 对话记录（生成 `.dsbak` 备份包）。恢复前自动留存当前数据库，完成后面板自动重启刷新；超 2 小时未验证时，下载备份需先验证身份。

::: details 设置自动备份与 WebDAV 异地同步
保护副本只存在本机，防服务器损坏请开启定时备份与 WebDAV 同步。

<figure><img src="/panel-migration-backup-schedule.webp" alt="在「数据库定时备份」弹窗设置执行时间、WebDAV 同步与保留份数"><figcaption>在「数据库定时备份」弹窗设置执行时间、WebDAV 同步与保留份数</figcaption></figure>

1. 在「最近备份」卡片点「远程副本（WebDAV）」旁的「设置」，展开「连接设置」。
2. 勾选「启用 WebDAV 备份同步」，填地址、账号密码与目录，点「保存 WebDAV」。
3. 回「最近备份」卡片点「修改计划」，设时间与「保留份数」（默认 7），点「保存任务」。

定时任务只清理计划内生成的备份。本机备份超额时，在「备份文件」点「仅保留最近 N 份」，不影响 WebDAV。
:::

### 迁移到新服务器

迁移保留密码、2FA（两步验证）与登录入口，节点和通知规则也一并带走。换机前先在旧面板「授权管理」解绑，见 [获取与激活授权](/license-management#换服务器)。

<DocTabs :tabs="['备份恢复（推荐）', '复制 data 目录（仅 SQLite）']">
<template #tab-0>

1. 在旧面板打开「数据库与存储 → 备份管理」，点「压缩备份」下载到本地。
2. 在新服务器按 [安装面板](/quick-start) 部署，PostgreSQL 需先点「切换数据库」。
3. 在新面板打开「设置中心 → 数据库与存储」，点「恢复」上传备份并确认。
4. 等面板自动重启刷新后，用旧面板密码登录，到「授权管理」激活许可证。

</template>
<template #tab-1>

PostgreSQL 数据不在 `data` 目录，请用「备份恢复（推荐）」。

1. 在新服务器按 [安装面板](/quick-start) 部署，安装目录与旧面板一致（默认 `/opt/dstatus`）。
2. 在新旧两台服务器进入安装目录，分别执行 `docker compose down` 停止面板。
3. 把旧服务器 `data` 目录复制到新服务器安装目录，覆盖原 `data` 目录。
4. 在新服务器执行 `docker compose up -d`，用旧密码登录并到「授权管理」激活许可证。

</template>
</DocTabs>

::: warning 注意
确认新面板监控与通知正常后，再停止或卸载旧面板。两套面板共用一个 Telegram 机器人，会导致通知暂停。
:::

## 常见问题

::: details 下载备份时弹出「数据库导出前预检」
导出前会检查登录设置与 SSH 加密，防止迁移后无法登录或解不开凭据。按弹窗按钮一键处理后即自动下载。
:::

::: details 迁移后节点显示离线
主动模式探针按原地址上报，用域名请把解析改到新服务器 IP。用 IP 请在新面板服务器列表点节点行尾「⋯」，重装或复制更新命令。

被动模式节点需检查防火墙，对新面板 IP 放行「API 端口」（默认 9999）。更多排查见 [节点显示离线](/troubleshooting#节点显示离线)。
:::

::: details 迁移后提示「许可证已绑定到其他实例」
一份许可证只绑定一套面板。先到旧面板「授权管理 → 更多操作」点「解绑许可证」，再回新面板激活。

旧服务器已无法访问时，在 [用户中心](https://client.vps.mom) 许可证卡片右上角「…」点「解绑」。
:::

::: details 迁移后 SSH 连不上节点
1. 打开「安全访问 → 网络与数据保护」，点「SSH 凭据加密」。
2. 填入「迁移前的主机名」，点「预览影响」。
3. 先在服务器备份数据库，填好「数据库备份文件路径」，点「轮转到稳定密钥」。

仍显示无法解密的密码或私钥，到对应节点「编辑」页重新填写。
:::

::: details 迁移后进不去后台
新面板沿用备份时的密码、2FA 与登录入口。忘记密码或入口时，按 [进不去后台怎么办](/login-management) 运行救援脚本。
:::
