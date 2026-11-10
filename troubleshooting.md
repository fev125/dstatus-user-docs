# 常见问题

按故障现象排查面板、探针与数据库连接问题。

面板自身报错时，打开「工具 → 日志管理」点「让 AI 解释」。仍未解决可点「下载排障文件」反馈，见 [日志管理](/tools#日志管理)。

## 面板无法访问

在面板服务器用 [`ds` 命令](/panel-ds)检查运行状态与日志，再核对端口放行和域名转发。

1. 执行 `sudo ds status` 看状态，未运行时执行 `sudo ds start`（无 `ds` 时进 `/opt/dstatus` 执行 `docker compose up -d`）。
2. 启动异常时，执行 `sudo ds logs`（或 `docker logs --tail 100 dstatus`）查看报错日志。
3. 检查安全组和服务器防火墙，放行面板端口（默认 `5555`）。
4. 套了反向代理（域名转发）时，先用 `http://服务器地址:5555` 直连测试。

::: details 升级后网页显示「面板升级已暂停」或短暂打不开
打开面板地址，看到「面板升级已暂停」页面，说明升级前的数据库备份没完成，面板没有升级，数据没有改动。最常见的原因是硬盘空间不够。

用 `df -h` 看剩余空间，删掉不用的文件腾出空间，再执行 `sudo ds restart`。面板重启时会重新备份，备份成功就继续升级。

旧版 SQLite 升级后首次启动会整理一次数据库（约 600 MB 库在 SSD 约 3 秒、机械盘约 45 秒）。`sudo ds logs` 显示「正在整理数据库文件」时请等待完成；新版本报错需回退见 [升级、备份与迁移](/panel-migration#升级与卸载)。
:::

## 忘记密码或登录入口

在面板服务器执行 `sudo ds reset-password` 或运行救援脚本，可重置密码、恢复入口或关闭两步验证，见 [进不去后台怎么办](/login-management#运行救援脚本)。

## 安装命令报错

确认下载地址连通性，或切换下载代理与手动上传安装包。

<figure><img src="/troubleshooting-install-proxy.webp" alt="在「设置中心 → Agent 安装源」切换「下载代理 / GitHub 加速」并点「保存」"><figcaption>在「设置中心 → Agent 安装源」切换「下载代理 / GitHub 加速」并点「保存」</figcaption></figure>

1. 安装面板需能访问 `down.vps.mom` 和 `ghcr.io`，请确认出站网络正常。
2. 安装探针报下载失败时，打开「设置中心 → Agent 安装源」切换下载代理并点「保存」。
3. 命令卡住无输出或代理均不可用时，展开下方对应方案处理。

::: details 安装命令没有反应，或提示 unexpected EOF
目标机器下载脚本被截断时，按 Ctrl + C 会提示 `unexpected EOF`。能 `ping` 通下载地址，不代表能完整下载脚本。

在能正常下载的机器拉取脚本，经 SSH 传给目标服务器运行：

```bash
curl -fsSL https://down.vps.mom/scripts/install-dstatus-agent.sh | ssh root@服务器地址 "bash -s -- '安装授权' '面板地址' 'active-report'"
```

双引号内保留原命令 `bash -s --` 后的参数，改过端口在 `ssh` 后加 `-p 端口`。也可改用 [通过 SSH 安装](/agent-guide#通过-ssh-安装) 代装。
:::

::: details 国内服务器下载探针很慢或失败（手动上传安装）
脚本直连 GitHub 过慢会自动换加速源，全部失败时可手动上传探针文件安装。

1. 在节点执行 `uname -m` 看架构：`x86_64` 用 `dstatus-agent_linux_amd64`，`aarch64` 用 `dstatus-agent_linux_arm64`。
2. 在能开 GitHub 的电脑下载对应文件，同目录放 `SHA256SUMS` 可自动校验：

   ```text
   https://github.com/fev125/dstatus/releases/download/agent-latest/文件名
   ```

3. 把文件上传到节点目录（如 `/root/`）。
4. 先指定本机文件路径，再在同一终端粘贴执行安装或重装命令：

   ```bash
   export DSTATUS_AGENT_FILE=/root/dstatus-agent_linux_amd64
   ```

用 `sudo` 时把变量放在 `sudo` 后面，如 `curl ... | sudo DSTATUS_AGENT_FILE=/root/文件名 bash -s ...`。macOS 同样用 `export` 指定路径；Windows 在同一 PowerShell 窗口先运行 `$env:DSTATUS_AGENT_FILE = 'C:\路径\文件名'`。
:::

## 节点显示离线

先用「探针检测」定位断开环节，再核对网络方向与探针服务。

<figure><img src="/troubleshooting-probe-test.webp" alt="在「服务器列表」点节点行右侧「⋯」，再点「探针检测」"><figcaption>在「服务器列表」点节点行右侧「⋯」，再点「探针检测」</figcaption></figure>

1. 新命令接入的节点，先去「服务器管理 → 自动发现」的「待审核」点「批准」。
2. 打开「服务器列表」，点节点右侧「⋯ → 探针检测」查看断开原因。
3. 主动模式：在编辑页「高级」看「上报地址」，到节点用 `curl -I` 测连通。
4. 被动模式：在节点防火墙和安全组，对面板放行「API 端口」（默认 `9999`）。
5. 在 Linux 节点执行 `sudo dsa status`，未运行时执行 `sudo dsa restart`，用 `sudo dsa logs` 看原因。

::: details 没有 dsa 命令的节点、Windows 与重装修复
旧版 Agent 没有 `dsa`：systemd 执行 `systemctl restart dstatus-agent`，Alpine 执行 `rc-service dstatus-agent restart`。`dsa` 的用法见 [在被控机上管理 Agent](/agent-dsa)。

OpenWrt 执行 `/etc/init.d/dstatus-agent restart`。Windows 在 PowerShell 执行 `Start-ScheduledTask -TaskName DStatusAgent`。

macOS 或改过密钥时，在编辑页「连接方式」点「复制安装命令」重装。关过「设置中心」的「探针长连接」时，重开可恢复被动节点连接。
:::

## 流量统计不符

核对统计方向与重置日，或在「与商家对账」校准读数，见 [账单与商家](/billing-report#设置流量套餐与对账校准)。

## 收不到通知

核对渠道测试、免打扰时段与 Telegram 机器人冲突，见 [配置通知](/notification-settings#常见问题)。

## 网络质量无数据

核对监控目标、在线节点与探针版本，Ping 不通改测 TCP，见 [网络质量](/monitor#常见问题)。

## 切换到 PostgreSQL 失败

切换失败不影响原数据，面板会自动恢复并继续使用 SQLite。

<figure><img src="/troubleshooting-pg-switch.webp" alt="在「数据库与存储」点「切换数据库」，排障后点「开始切换」重试"><figcaption>在「数据库与存储」点「切换数据库」，排障后点「开始切换」重试</figcaption></figure>

1. 按页面报错处理问题，权限报错见下方折叠说明。
2. 在「设置中心 → 数据库与存储」点「切换数据库」，再点「开始切换」重试。

::: details 提示没有建表权限或 permission denied for schema public
PostgreSQL 15 及以上版本，默认不允许普通用户在他人所有的库里建表。

用管理员账号改数据库所有者，库名与用户名按实际填写：

```bash
# 本机安装的 PostgreSQL
sudo -u postgres psql -c "ALTER DATABASE dstatus OWNER TO dstatus;"

# Docker 容器中的 PostgreSQL
docker exec -it PostgreSQL容器名 psql -U postgres -c "ALTER DATABASE dstatus OWNER TO dstatus;"
```

新建数据库时直接指定所有者，可避免该报错：

```sql
CREATE USER dstatus WITH PASSWORD '你的密码';
CREATE DATABASE dstatus OWNER dstatus;
```

重试无需重启面板。切换前会在 `data` 目录留存 `switch-backup-sqlite-时间.db`，切换成功后可删掉失败备份。
:::
