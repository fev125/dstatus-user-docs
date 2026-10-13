# 常见问题

按现象查找。每项按顺序排查，解决不了带上截图或终端输出到 Telegram 群反馈。面板自身出错时，先到「工具 → 日志管理」看问题列表，点「让 AI 解释」；还是不行，点「打包发给作者」把文件一起发来，见 [工具](/tools#日志管理)。

## 面板无法访问

1. 在面板服务器执行 `docker ps`，确认 `dstatus` 容器在运行；没有运行，进入安装目录执行 `docker compose up -d`。
2. 容器反复重启时，执行 `docker logs dstatus` 查看报错。
3. 确认安全组和防火墙放行了面板端口（默认 5555）。
4. 用了反向代理时，先用 `http://服务器IP:端口` 直连，排除代理配置问题。

## 节点显示离线

1. 服务器列表该节点「更多」，在操作面板点「探针检测」，看检测结果和原因。
2. 主动模式：被控要能访问上报地址。在被控上用 `curl` 访问该地址测试；地址在节点编辑页「主动上报」里查看。
3. 被动模式：面板要能访问被控的 Agent 端口（默认 9999），检查被控的防火墙和安全组。
4. 在被控上执行 `systemctl status dstatus-agent` 查看进程；未运行时执行 `systemctl restart dstatus-agent`。

## 流量统计不符

1. 节点编辑页 →「账单与流量」，核对周期：月付看「流量重置日（月付）」；打开「跟随账单周期」时，周期由账单周期和到期日决定。
2. 核对「流量统计方向」：双向、仅入站、仅出站或单向最大，与商家计费方式一致。
3. 单位差异：面板的 GB 按 1024 进位；商家按 1000 进位时，面板数字会小约 7%。
4. 已用量对不上时，在「校准时已用流量 (GB)」填入商家后台的已用量。校准只影响展示。

## 收不到通知

1. 通知管理 → 规则，在上方通知渠道里打开对应渠道的「配置」，点「测试」确认能收到。
2. 在规则列表里确认对应规则已启用，「发到」列里有这个渠道；可在规则菜单里点「测试发送」。
3. 「通知管理 → 记录」里打开这条通知，查看每个渠道的发送结果和失败原因。
4. 看是否在「免打扰时段」或规则的静默时段内，服务器是否被排除或静默。
5. 离线通知要等节点离线持续一段时间才发，时长在内置规则「掉线与恢复」的「离线多久通知」里调整。

### 提示 Telegram 机器人被同时使用

测试 Telegram 时提示「该 Telegram 机器人正被其他程序同时使用」或「检测到外部同 Token 实例」，投递记录显示「通道未就绪」或「机器人被其他程序同时使用，已暂停」：同一个机器人只能由一处接收消息，另一套面板或其他程序也在用它时，面板会暂停 Telegram 通知。

停用另一处，或在 BotFather 新建一个机器人并换上新的 Token，然后在 Telegram 渠道点「保存设置」恢复。

## 忘记密码或登录入口

见 [进不去后台怎么办](/login-management)。

## 网络质量无数据

1. 网络监控 → 监控目标里至少有一个目标，并且有在线的执行节点。
2. 页面提示升级套餐时，当前授权不包含网络质量功能，见 [获取与激活授权](/license-management)。
3. Ping 一直失败时，目标可能屏蔽 ICMP，改用 TCP 并填端口。
4. 节点在线但没有数据，先 [升级 Agent](/agent-upgrade)。

## 安装命令报错

1. 提示下载失败：确认服务器能访问 `down.vps.mom`；安装 Agent 时还要能访问 GitHub，或在 设置中心 → Agent 安装源 选下载代理。
2. 其他报错：保留完整终端输出，到 Telegram 群反馈。

### 安装命令没有反应，或提示 unexpected EOF

执行安装命令后一直没有输出，按 Ctrl+C 后提示 `unexpected EOF while looking for matching`：服务器所在网络限制了安装脚本的下载线路，脚本只下载了一部分。服务器能 `ping` 通下载地址，不代表能完整下载。

换一台能正常下载的机器（例如面板服务器或自己的电脑）执行安装命令，把命令里 `|` 后面的 `bash -s -- …` 整段放进 `ssh` 的双引号里。脚本在这台机器上下载，再通过 SSH 交给目标服务器运行：

```bash
curl -fsSL https://down.vps.mom/scripts/install-dstatus-agent.sh | ssh root@服务器地址 "bash -s -- '通讯密钥' '面板地址' 'active-report'"
```

引号里的参数以面板复制的安装命令为准。SSH 端口不是 22 时，在 `ssh` 后加 `-p 端口`。也可以让面板通过 SSH 直接安装，见 [通过 SSH 安装](/agent-guide#通过-ssh-安装)。

脚本运行后还要下载 Agent 文件，这一步失败时终端会给出手动上传的步骤。

## 切换到 PostgreSQL 失败

切换失败不影响原有数据，面板会继续使用 SQLite。处理后在 设置中心 → 数据库与存储 → 「切换数据库」里重新点「开始切换」，无需重启面板。

### 提示 permission denied for schema public

PostgreSQL 15 及以上版本，普通用户默认不能在其他用户所有的库里建表。把数据库的所有者改为面板填写的用户名：在数据库服务器上用 PostgreSQL 管理员账号执行（库名、用户名按实际填写）：

```bash
sudo -u postgres psql -c "ALTER DATABASE dstatus OWNER TO dstatus;"
```

PostgreSQL 运行在 Docker 中时，把 `postgres` 换成容器的管理员用户名：

```bash
docker exec -it PostgreSQL容器名 psql -U postgres -c "ALTER DATABASE dstatus OWNER TO dstatus;"
```

新建数据库时直接指定所有者，可避免该问题：

```sql
CREATE USER dstatus WITH PASSWORD '你的密码';
CREATE DATABASE dstatus OWNER dstatus;
```

每次切换前面板都会在 `data` 目录生成一份 `switch-backup-sqlite-时间.db` 备份。切换成功后，失败时留下的备份可以删除。

## 相关

- [安装面板](/quick-start)
- [升级 Agent](/agent-upgrade)
- [配置通知](/notification-settings)
- [网络质量](/monitor)
