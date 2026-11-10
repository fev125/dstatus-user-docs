# 在节点上管理 Agent（dsa 命令）

在节点的终端里输入 `dsa`，就能查看状态、开关功能、重启、升级和卸载 Agent。管理面板服务器上的面板本身请用 [`ds` 命令](/panel-ds)。

目前只支持 Linux。Agent 安装或升级到新版后自带这个命令。

## 在哪打开

登录节点，用 root 执行：

```bash
sudo dsa
```

会打开下面这个菜单，输入数字回车即可：

```text
DStatus Agent · 运行中 · 主动模式 · 面板 https://panel.example.com · agent-v2.3.6
 1. 查看状态和最近日志
 2. 允许面板在这台机器上运行脚本（当前：不允许）
 3. 打开自动升级（当前：关）
 4. 重启 Agent
 5. 升级到最新版
 6. 卸载 Agent
 0. 退出
选择 [0-6]：
```

第一行是当前状态：是否在运行、[接入方式](/agent-guide#主动模式与被动模式)、连着哪个面板、版本。

## 怎么用

不想进菜单时，直接带上命令：

| 命令 | 作用 |
|---|---|
| `dsa status` | 看运行状态、面板地址和各项开关 |
| `sudo dsa exec on` 或 `off` | 允许或禁止面板在这台机器上运行脚本 |
| `sudo dsa auto-upgrade on` 或 `off` | 打开或关闭自动升级，面板上的设置随之更新 |
| `sudo dsa public-ip on` 或 `off` | 打开或关闭查询本机公网 IP；机器禁止访问 443 时可关，关后面板上的公网 IP 显示为未知 |
| `sudo dsa restart` | 重启 Agent，确认重新运行 |
| `sudo dsa upgrade` | 升级到最新正式版，已是最新就不动 |
| `sudo dsa logs` | 看最近 200 行日志，加 `-f` 持续输出 |
| `sudo dsa uninstall --yes` | 卸载 Agent，删除程序、服务和配置 |
| `dsa help` | 看全部命令 |

「运行脚本」开关的含义见 [让面板在这台机器上运行脚本](/agent-allow-exec)。

::: details 给脚本和 AI 用的写法
`dsa status --json` 输出固定字段的 JSON，例如 `allowRemoteExec` 是运行脚本开关，`service.running` 表示是否在运行。

退出码：`0` 成功，已经是目标状态也算成功；`1` 失败；`2` 命令写错。不在终端里运行时，`dsa` 不会停下来等输入。
:::

::: details 升级只装官方签名的版本
`dsa upgrade` 和面板发起的升级，都会先核对官方签名。签名对不上就不安装，当前版本保持不动。
:::

## 常见问题

::: details 面板显示节点离线，在节点上怎么查
1. 执行 `sudo dsa status`，看「运行状态」是不是「运行中」，「面板地址」对不对。
2. 执行 `sudo dsa logs`，看最后几行有没有报错，例如连不上面板地址。
3. 执行 `sudo dsa restart`，看到「已重启 Agent」后，回面板等节点上线。

更多排查见 [节点显示离线](/troubleshooting#节点显示离线)。
:::

::: details 提示「需要 root 权限」
在命令前加 `sudo`，或切到 root 再执行。不加 `sudo` 时只能用 `dsa status` 看运行状态。
:::

::: details 提示「dsa: command not found」
这台机器的 Agent 还是旧版。先 [升级 Agent](/agent-upgrade)，升级后就有 `dsa`。
:::

::: details Alpine 上 `dsa logs` 提示没有日志文件
较早装的 Alpine 节点不记日志。在编辑页「连接方式」点「复制安装命令」重装一次，之后开始记录。
:::

::: details 用 `sudo dsa auto-upgrade on` 打开了，还是没有自动升级
自动升级只对主动模式的节点生效。被动模式的节点在面板里手动 [升级 Agent](/agent-upgrade)。
:::

::: details 提示「面板没有采纳这项修改」
面板版本较旧，不支持在节点上改自动升级，这台机器继续按面板上的设置。到面板该节点的编辑页「连接方式」里改「自动升级」，或先升级面板。
:::
