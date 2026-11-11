# 接入节点

在目标设备上安装探针（监控程序），采集指标连回面板。探针常驻内存约 30 MB，小内存的机器也装得下。

## 在哪打开

登录后台，点左侧「服务器管理 → 自动发现」。也可在「服务器列表」点「添加服务器」。

<figure><img src="/agent-guide-workbench.webp" alt="左侧菜单「服务器管理 → 自动发现」与「安装探针」区域"><figcaption>左侧菜单「服务器管理 → 自动发现」与「安装探针」区域</figcaption></figure>

## 怎么用

### 开始前

| 项目 | 最低准入 | 依据 |
|---|---|---|
| 内存 | 空闲 64M 以上 | 3 台 Linux 节点实测常驻 28–42 MB |
| 硬盘可用空间 | 100M 以上 | 程序约 26–28 MB，升级时新旧两份与备份同时存在 |
| CPU | 不设门槛 | 容器多的机器上实测约 0.86% |
| 流量 | 有人看页面时约 80 MB/天（约 2.4G/月） | 没人看时上报降为每 60 秒一次，流量随之大降 |

默认的主动模式下，设备要能访问面板的端口（默认 `5555`）或域名。

### 一条命令接入

复制安装命令到目标设备执行，即可接入面板开始监控。

1. 在「安装探针」选系统：Linux、macOS、群晖选「Linux / macOS」，Windows 选「Windows」，点「复制」。
2. 打开设备的终端或 PowerShell，粘贴命令执行。
3. 回到面板，在「待审核」点「批准」，或点页面下方「批准接入」。

命令跑完后节点不会马上上线：「接入审核」默认开启，批准后才出现在服务器列表。

<figure><img src="/agent-guide-pending-list.webp" alt="在「接入节点」的「待审核」列表批准新设备上线"><figcaption>在「接入节点」的「待审核」列表批准新设备上线</figcaption></figure>

安装授权默认 30 分钟有效，可装多台，每台获独立密钥。

::: details 批量审核、已发现列表与撤销授权
装多台时，勾选设备点「批准所选」或「拒绝所选」。也可直接点「全部批准」或「全部拒绝」。

点设备行打开「设备详情」，改分组或端口后点「批准」。切到「已发现」可搜索设备，或点「删除离线节点」清理离线记录。

点「复制」旁图标可「重新生成安装授权」，旧授权随即替换。点「撤销安装授权」可停用未执行的命令，已接入节点不受影响。
:::

### 支持的系统

| 系统 | 架构 | 实测情况 | 和完整功能相比 |
|---|---|---|---|
| Linux（含群晖 DSM、OpenWrt、Alpine） | x86_64 | 多台 VPS 长期运行；群晖 DS918+（DSM 7.0）实测 | 完整 |
| Linux | ARM64 | Debian 13 真机长期运行；Debian 12、Alpine 3.22 安装与回滚实测 | 完整 |
| Linux | ARMv7、ARMv6、MIPS 小端（MIPSle） | 提供安装包，尚未真机验证 | 没有流媒体解锁检测；不能在面板一键升级 |
| macOS | Intel、Apple 芯片 | Apple 芯片（macOS 26）、Intel（macOS 15）真机在运行 | 没有流媒体解锁检测，不能跑定时任务的「节点脚本」 |
| Windows | x86_64 | Windows 机器在运行 | 没有流媒体解锁检测，不能跑定时任务的「节点脚本」 |

32 位 x86（i386、i686）、MIPS 大端、MIPS64、RISC-V 等架构没有安装包。安装命令检测到程序跑不起来会直接报错退出，不会装上半截。

不能一键升级的设备，升级方法见 [升级 Agent](/agent-upgrade)。

切换下方系统标签，查看对应设备的执行方式。

<DocTabs :tabs="['Linux / OpenWrt', '群晖 DSM', 'macOS', 'Windows']">
<template #tab-0>

选「Linux / macOS」，用 `root` 在终端执行。自动识别 OpenWrt、Alpine，设开机自启。

</template>
<template #tab-1>

选「Linux / macOS」，无需装 Docker。已在 DSM 7.0（x86_64）验证。

1. 打开「控制面板 → 终端机和 SNMP → 终端机」。
2. 勾选「启动 SSH 功能」，点「应用」。
3. 用 `ssh 账号@群晖地址` 登录（改端口加 `-p`）。
4. 执行 `sudo -i` 切到 `root`，粘贴命令运行。

不用网页终端时，装好后可关掉 SSH，探针照常运行。

</template>
<template #tab-2>

选「Linux / macOS」，直接在当前用户终端执行。请勿加 `sudo`，支持 Intel 与 Apple 芯片。

需重启未登录也运行，先执行下面这行，再运行安装命令：

```bash
export DSTATUS_INSTALL_SCOPE=system
```

</template>
<template #tab-3>

选「Windows」，在 PowerShell 粘贴执行。默认无需管理员权限，支持 x86_64，登录后自启。

需重启未登录也上线，以管理员打开 PowerShell。先执行下面这行，再粘贴安装命令运行：

```powershell
$env:DSTATUS_INSTALL_SCOPE = 'System'
```

</template>
</DocTabs>

### 主动模式与被动模式

命令接入默认用「主动模式」，大多数情况保持默认即可。要改，点右上角「接入设置」。

<figure><svg viewBox="0 0 680 204" width="680" height="204" role="img" aria-label="主动模式与被动模式的连接方向对比" style="display:block;width:100%;max-width:680px;height:auto"><rect x="1" y="1" width="678" height="202" rx="8" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/><line x1="20" y1="102" x2="660" y2="102" stroke="var(--vp-c-divider)" stroke-dasharray="4 4"/><text x="24" y="42" fill="var(--vp-c-text-1)" font-size="14" font-weight="600">主动模式（默认）</text><text x="24" y="64" fill="var(--vp-c-text-2)" font-size="12">适合 NAT / 防火墙后设备</text><rect x="184" y="22" width="152" height="58" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="260" y="46" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="13" font-weight="600">目标设备（探针）</text><text x="260" y="66" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">无需开放入站端口</text><text x="418" y="40" text-anchor="middle" fill="var(--vp-c-brand-1)" font-size="11" font-weight="500">主动上报 + 领任务</text><line x1="344" y1="51" x2="484" y2="51" stroke="var(--vp-c-brand-1)" stroke-width="2"/><polygon points="482,46 492,51 482,56" fill="var(--vp-c-brand-1)"/><rect x="500" y="22" width="156" height="58" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="578" y="46" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="13" font-weight="600">DStatus 面板</text><text x="578" y="66" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">节点能访问上报地址</text><text x="24" y="144" fill="var(--vp-c-text-1)" font-size="14" font-weight="600">被动模式</text><text x="24" y="166" fill="var(--vp-c-text-2)" font-size="12">适合公网或同内网设备</text><rect x="184" y="124" width="152" height="58" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="260" y="148" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="13" font-weight="600">目标设备（探针）</text><text x="260" y="168" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">放行 API 端口（9999）</text><text x="418" y="136" text-anchor="middle" fill="var(--vp-c-brand-1)" font-size="11" font-weight="500">拉取监控数据</text><line x1="492" y1="145" x2="352" y2="145" stroke="var(--vp-c-brand-1)" stroke-width="2"/><polygon points="354,140 344,145 354,150" fill="var(--vp-c-brand-1)"/><line x1="344" y1="165" x2="484" y2="165" stroke="var(--vp-c-text-2)" stroke-width="1" stroke-dasharray="4 3"/><polygon points="482,161 490,165 482,169" fill="var(--vp-c-text-2)"/><text x="418" y="180" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="10">默认仍连面板领任务</text><rect x="500" y="124" width="156" height="58" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="578" y="148" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="13" font-weight="600">DStatus 面板</text><text x="578" y="168" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">能访问节点地址与端口</text></svg><figcaption>主动模式由探针主动连面板，被动模式由面板连探针端口</figcaption></figure>

<figure><img src="/agent-guide-settings-drawer.webp" alt="点右上角「接入设置」修改默认通讯方式、有效期和分组"><figcaption>点右上角「接入设置」修改默认通讯方式、有效期和分组</figcaption></figure>

修改后自动保存（也可点「保存」），新设置用于之后生成的命令。

| 选项 | 作用 | 默认 |
|---|---|---|
| 「通讯方式」 | 选「主动模式」或「被动模式」 | 「主动模式」 |
| 「授权有效期」 | 安装授权可用时长，可改分钟数或勾选「永久」 | 30 分钟 |
| 「API 端口」 | 被动模式下面板连接的探针端口 | 9999 |
| 「上报地址」 | 探针连面板的地址。没有域名就留空；面板放在 CDN 或域名转发后面时，填对外域名 | 留空：用设置中心的「站点网址」，没填就用你打开面板的地址 |
| 「默认分组」 | 新节点接入后自动归入的 [分组](/groups) | 「默认」 |
| 「接入审核」 | 勾选「需要审核」后，新节点先进入「待审核」 | 开启 |

### 特殊网络安装

不能访问面板和外网的 Linux 机器，可经内网反代面板来安装和上报。

<figure><img src="/agent-guide-special-network.webp" alt="「特殊网络安装」抽屉：填好反代地址后，按三步复制反代配置和安装命令"><figcaption>「特殊网络安装」抽屉：填好反代地址后，按三步复制反代配置和安装命令</figcaption></figure>

开始前，准备一台同内网且能访问面板的机器，先装好 Nginx 或 Caddy。在「安装探针」选「Linux / macOS」点「特殊网络安装」，未开「经面板下载 Agent」时点「开启」，被动模式时去「接入设置」改为主动模式（只影响之后生成的命令，复制完可改回）。

1. 填写反代地址：填入能上网的机器在内网的地址和空闲端口（如 `http://192.0.2.2:8080`）。
2. 在能上网的机器上反代面板：Nginx 或 Caddy 选一份点「复制」，让配置生效并向内网放行端口（命令见下方折叠说明）。
3. 在要安装的机器上以 root 执行：点「复制」到目标机器以 `root` 执行，再回面板在「待审核」点「批准」（或点「批准接入」）。

装好后节点一直经该地址上报和升级，反代需长期保留。特殊网络节点只报内网 IP、不查公网 IP；要显示地区和国旗，在编辑页「基本信息」填「出口 IP (可选)」（如上网机公网 IP）或手动选国家。

::: details 反代生效、防火墙放行与注意事项
Nginx 与 Caddy 二选一即可：Nginx 存为 `/etc/nginx/conf.d/dstatus-proxy.conf` 后执行 `nginx -t && systemctl reload nginx`；Caddy 写进 `/etc/caddy/Caddyfile` 后执行 `systemctl reload caddy`。

在能上网的机器上对内网放行端口：ufw 执行 `ufw allow from 192.0.2.0/24 to any port 8080 proto tcp`；firewalld 执行 `firewall-cmd --permanent --add-port=8080/tcp && firewall-cmd --reload`。

仅支持 Linux 主动模式：切到「Windows」或「卸载命令」时入口隐藏，在 macOS 上执行会直接报错退出。

复制来的配置原样使用，不要修改，也不要配成跳转：改了或遇到 301/302 跳转会装不上或装好后掉线。

反代地址为 `http://` 时密钥在内网明文传输，纯内网可直接使用；要更安全，可在能上网的机器上为反代配 `https://` 证书。
:::

### 通过 SSH 安装

已有服务器的 `root` SSH 信息时，可由面板代装。

1. 打开「服务器列表」，点右上角「添加服务器」。
2. 点底部「通过 SSH 由面板代装」，填名称与 SSH 信息。
3. 点底部「添加服务器」，在弹窗点「立即安装」。

<figure><img src="/agent-guide-add-ssh.webp" alt="在「通过 SSH 由面板代装」页面填写信息并点「添加服务器」"><figcaption>在「通过 SSH 由面板代装」页面填写信息并点「添加服务器」</figcaption></figure>

SSH 代装默认为「被动模式」，可在「通讯模式」切到主动。密码与保险箱见 [管理服务器](/server-management)。

::: details 卸载探针与升级版本
切到「卸载命令」，选系统点「复制」，到目标设备执行。也可在节点编辑页「连接方式」点「卸载探针」。

卸载只移除探针程序，面板里的节点和数据会保留。移除记录见 [管理服务器](/server-management)，更新见 [升级 Agent](/agent-upgrade)。

两种模式都可开启「动态 IP 自动改写主机地址」和「自动更新 IPv6」。被动模式下开启这两项，需探针保持长连接。
:::

## 常见问题

::: details 执行命令后节点没出现
「接入审核」默认开启，先看「自动发现」的「待审核」列表。点「批准」或「添加服务器」页的「批准接入」后即上线。
:::

::: details 命令提示安装授权已过期或已撤销
回到面板点「复制」或右侧图标重新生成授权，再复制新命令执行。重装已有节点，可在编辑页「连接方式」点「复制安装命令」。
:::

::: details 安装命令卡住、提示下载失败或 unexpected EOF
设备访问下载地址或 GitHub 受限时会出现。

在「设置中心」打开「Agent 安装源」，换代理或开启「经面板下载 Agent」。不能访问外网的机器见「特殊网络安装」，其余见 [安装命令报错](/troubleshooting#安装命令报错)。
:::

::: details 节点已接入但显示离线
主动模式查能否访问「上报地址」（勿填带跳转的地址）。被动模式查防火墙是否放行「API 端口」。

完整排查步骤见 [节点显示离线](/troubleshooting#节点显示离线)。
:::

::: details 特殊网络安装失败或装好后离线
先查能上网的机器上 Nginx 或 Caddy 反代是否在运行，以及防火墙是否已对内网放行反代端口。

在目标机器执行 `curl -fsSL http://192.0.2.2:8080/api/version`（换成反代地址）测连通；下载失败时到「设置中心 → Agent 安装源」确认「经面板下载 Agent」已开启。
:::

::: details 群晖或普通账号使用「通过 SSH 由面板代装」提示权限不足
面板不执行 `sudo`，SSH 代装需用 `root` 账号。群晖请按上文「支持的系统」复制命令安装。
:::

::: details macOS 执行安装命令提示不要使用 sudo
macOS 默认装在当前用户下，去掉 `sudo` 直接执行。需开机未登录也运行，按上文「macOS」设系统级变量。
:::
