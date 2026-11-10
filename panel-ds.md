# 在服务器上管理面板（ds 命令）

在面板服务器的终端里输入 `ds`，即可查看面板状态、更新、重启、看日志、重置密码和卸载。管理被监控节点上的探针请用 [`dsa` 命令](/agent-dsa)。

用一键脚本新装或更新一次面板后，Linux 服务器会自动装上 `ds`。`ds` 已被其他程序占用时，命令改叫 `dstatus`。

## 在哪打开

登录面板服务器，以 root 身份执行（非 root 账号在命令前加 `sudo`）：

```bash
sudo ds status
```

终端会输出面板当前的运行状态、版本、端口、硬盘剩余空间与网页更新状态：

```text
面板：正常（容器 running）
版本：2.26.11.018.dev-54
端口：5555
安装目录：/opt/dstatus
硬盘剩余：18G
网页更新：已开启
最近一次更新：2026-11-10 18:30 已更新
```

## 怎么用

按要做的事执行对应命令，不带参数运行 `ds` 可查看命令列表。

| 命令 | 作用 |
|---|---|
| `sudo ds status` | 看面板运行状态、版本、端口、安装目录、硬盘剩余与最近更新结果 |
| `sudo ds update` | 更新面板；先备份数据库，备份没完成不更新并恢复原版本 |
| `sudo ds restart` | 重启面板 |
| `sudo ds stop` | 停止面板 |
| `sudo ds start` | 启动面板 |
| `sudo ds logs` | 看最近 100 行日志；加数字指定行数（如 `sudo ds logs 200`），加 `-f` 持续输出 |
| `sudo ds reset-password` | 打开救援菜单，重置管理员密码、恢复 `/login` 入口或关闭两步验证 |
| `sudo ds uninstall` | 卸载面板，默认保留 `data`、`logs`、`backups` 数据目录 |
| `sudo ds uninstall --purge-data` | 卸载面板并删除全部数据（会提示确认，加 `--yes` 跳过确认） |
| `ds version` | 看 `ds` 命令版本 |
| `ds help` | 看全部命令与面板安装目录 |

在后台网页直接更新、备份数据与换服务器，见 [升级、备份与迁移](/panel-migration)。救援菜单各选项的说明，见 [进不去后台怎么办](/login-management#运行救援脚本)。

## 常见问题

::: details 提示「ds: command not found」
面板还是旧版脚本部署的，先按 [升级、备份与迁移](/panel-migration#升级与卸载) 执行一次更新命令，更新后即装上 `ds`。

机器上其他程序已占用 `ds` 时，改输 `dstatus`。两个名字都被占用时，直接运行 `/opt/dstatus/ds`（改过安装目录就换成实际目录）。
:::

::: details ds 和 dsa 有什么区别
`ds` 装在面板服务器上，用来管理面板本身。`dsa` 装在被监控的节点上，用来管理节点探针，见 [在节点上管理 Agent](/agent-dsa)。
:::

::: details 提示「需要 root 权限」
ds 的命令要操作 Docker，需要 root 权限。在命令前加 `sudo`，或先执行 `sudo -i` 切到 root。
:::

::: details `sudo ds status` 的「面板」一行显示「升级已暂停」
说明升级前的数据库备份没完成，面板没有升级，数据没有改动。最常见的原因是硬盘空间不够。

用 `df -h` 看剩余空间，删掉不用的文件腾出空间，再执行 `sudo ds restart`。面板重启时会重新备份，备份成功就继续升级。
:::
