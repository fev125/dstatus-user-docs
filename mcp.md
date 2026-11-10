# 远程 MCP

用 MCP（AI 协议）接入 Claude、Codex。在对话里查节点、跑命令和改配置，内置助手见 [AI 功能](/ai)。

## 在哪打开

登录后台点左侧「安全访问」，在「AI 与远程操作」点「远程 MCP」。

<figure><img src="/mcp-entry.webp" alt="「安全访问」的「AI 与远程操作 → 远程 MCP」入口"><figcaption>「安全访问」的「AI 与远程操作 → 远程 MCP」入口</figcaption></figure>

## 怎么用

### 接入客户端

面板需开启 HTTPS，地址取「基础设置」里的「站点网址」。开启 [前后台域名分离](/domain-split-manual) 时使用后台域名。

<figure><img src="/mcp-panel.webp" alt="「远程 MCP」抽屉顶部的连接状态与开关按钮"><figcaption>「远程 MCP」抽屉顶部的连接状态与开关按钮</figcaption></figure>

<DocTabs :tabs="['交给 AI 接入', '手动命令接入', 'Token 备用连接']">
<template #tab-0>

客户端电脑需装好 Node.js（接入时会运行 `npx`）。

1. 在抽屉顶部点「启用远程 MCP」。
2. 在「交给 AI 接入」点「复制」，把这句话发给客户端。
3. 浏览器打开授权页后登录后台，点「允许连接」。
4. 让 AI 查一次节点状态，返回真实数据即完成接入。

未见新工具时，新建对话或重新加载即可。

</template>
<template #tab-1>

点「复制」取地址，添加 Streamable HTTP 连接。

```bash
# Claude Code
claude mcp add --scope user --transport http dstatus https://面板域名/mcp

# Codex
codex mcp add dstatus --url https://面板域名/mcp
codex mcp login dstatus
```

首次调用时按提示打开浏览器，登录后台点「允许连接」。

</template>
<template #tab-2>

客户端无法打开浏览器登录时，改用 Token 连接。

1. 点「启用远程 MCP」，再点「复制」拿到连接地址。
2. 展开「Token 备用连接」，填名称后点「生成 Token」。
3. 在「仅显示一次，离开后无法查看」旁点「复制」，填入客户端。

Token 离开页面无法再看，建议一机一枚。请勿把 Token 写进代码或公开仓库。

</template>
</DocTabs>

### 能做什么

接入后可读写面板数据并操作节点，不消耗「内置AI」额度。

<figure><svg viewBox="0 0 680 204" width="680" height="204" role="img" aria-label="远程 MCP 浏览器授权与安全输入流程" style="display:block;width:100%;max-width:680px;height:auto"><rect x="1" y="1" width="678" height="202" rx="8" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/><line x1="20" y1="102" x2="660" y2="102" stroke="var(--vp-c-divider)" stroke-dasharray="4 4"/><text x="24" y="42" fill="var(--vp-c-text-1)" font-size="14" font-weight="600">浏览器授权</text><text x="24" y="64" fill="var(--vp-c-text-2)" font-size="12">免填长期密钥</text><rect x="156" y="22" width="144" height="58" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="228" y="46" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="13" font-weight="600">AI 客户端</text><text x="228" y="66" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">Claude / Codex</text><text x="352" y="40" text-anchor="middle" fill="var(--vp-c-brand-1)" font-size="11" font-weight="500">1. 打开授权页</text><line x1="306" y1="51" x2="398" y2="51" stroke="var(--vp-c-brand-1)" stroke-width="2"/><polygon points="396,46 406,51 396,56" fill="var(--vp-c-brand-1)"/><rect x="412" y="22" width="244" height="58" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="534" y="46" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="13" font-weight="600">DStatus 面板（HTTPS）</text><text x="534" y="66" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">2. 登录点「允许连接」即生效</text><text x="24" y="144" fill="var(--vp-c-text-1)" font-size="14" font-weight="600">安全输入</text><text x="24" y="166" fill="var(--vp-c-text-2)" font-size="12">密码不进 AI 对话</text><rect x="156" y="124" width="144" height="58" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="228" y="148" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="13" font-weight="600">浏览器填写页</text><text x="228" y="168" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">填 SSH 密码 / 私钥</text><text x="352" y="142" text-anchor="middle" fill="var(--vp-c-brand-1)" font-size="11" font-weight="500">AI 只拿临时代号</text><line x1="306" y1="153" x2="398" y2="153" stroke="var(--vp-c-brand-1)" stroke-width="2"/><polygon points="396,148 406,153 396,158" fill="var(--vp-c-brand-1)"/><rect x="412" y="124" width="244" height="58" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="534" y="148" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="13" font-weight="600">面板内存替换并执行</text><text x="534" y="168" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">执行结果自动遮回真实密码</text></svg><figcaption>通过浏览器授权连接面板，用「安全输入」传递密码而不经过模型服务商</figcaption></figure>

| 操作 | 作用 |
|---|---|
| 节点与探针 | 查节点状态、硬件配置、标签、流量与负载曲线、全部节点负载排行、硬盘历史与写满预测；新建、修改、批量修改节点，审批自动发现，安装或批量升级探针 |
| 网络与解锁 | 管理监控目标、地区与设置，查 TCPing 和 HTTP 数据；管理路由检测（MTR），发起网络诊断与流媒体解锁检测 |
| 终端与文件 | 在单台或多台节点并行执行非交互命令、读输出或取消；读、改、上传、下载节点文件 |
| 告警与通知 | 查告警与通知记录；新建、修改、启停、删除、测试告警规则；修改通知渠道与 Webhook |
| 账单与系统 | 管理分组与商家，查账单、续费或改到期日；管理定时任务，查日志、分析与存储策略，改个性化与启停插件 |

::: warning 注意
授权凭据拥有完整管理员能力。只连接可信设备，执行命令或改文件前先核对目标节点。
:::

::: details 安全输入传递密码、文件自动备份与更新技能
需要 SSH 密码、私钥或密钥时，让 AI 生成「安全输入」链接。打开链接在浏览器填写（30 分钟有效），AI 只拿临时代号。

勾选「保存到主控」会加密存进面板里这台节点的 SSH 配置，不勾仅存主控内存（最长 2 小时）。

改写已有文件前会自动备份，每个文件留最近 3 份。备份存在 SFTP 登录后的起始目录（一般是家目录）下的 `.dstatus/file-backups/`。

升级本机技能不影响已有连接，无需重新授权：

```bash
npx --yes dstatus@latest skill install
```
:::

### 管理授权与调用记录

列表每行显示最近使用、来源 IP 与失效天数。7 天内首次从新网段调用时，行内标出「新网段」。

| 操作 | 作用 |
|---|---|
| 「调用记录」 | 展开最近 20 条写操作、命令与文件读写记录；保留 30 天，每个凭据最多留 200 条，可按服务器筛选 |
| 「撤销」 | 弹窗确认后立即作废该授权或 Token，并取消排队和运行中的任务 |
| 「停用 MCP」 | 关闭远程 MCP 入口，所有外部客户端立即停止访问 |

新建凭据、新网段首次调用或凭证重放时，面板会发安全通知。开关在「通知管理 → 规则」的「登录与安全」里，见 [配置通知](/notification-settings)。

::: details 调整「限额与失效」参数
展开底部的「限额与失效」，修改参数后点「保存」。凭据连续闲置超期会自动失效，再用时重新授权即可。

| 选项 | 作用 | 默认 |
|---|---|---|
| 「闲置失效 天」 | 授权和 Token 连续未用的自动失效天数（1–365） | `30` |
| 「读请求/分」 | 单个凭据每分钟可调用的只读查询次数 | `120` |
| 「终端并发」 | 面板同时运行的终端命令总数上限 | `12` |
| 「凭据并发」 | 单个凭据同时运行的终端命令上限 | `8` |
| 「终端队列」 | 面板排队等待的终端命令总数上限 | `20` |
| 「凭据队列」 | 单个凭据排队等待的终端命令上限 | `10` |
| 「默认超时 ms」 | 单条终端命令的默认超时毫秒数（最高 3600000） | `600000` |
| 「单次输出上限」 | 单次读取命令输出的最大字节数 | `262144` |
| 「产物保留 h」 | 命令输出临时文件的保留小时数（1–168） | `24` |
:::

## 常见问题

::: details 提示「请先配置可用的管理面地址」或地址不是 HTTPS
把「基础设置 → 站点网址」改为 `https://` 地址并保存。开启 [前后台域名分离](/domain-split-manual) 时用后台域名，前台返回 404。
:::

::: details 以前能用，现在提示凭据失效或要重新授权
连续闲置超 30 天，或触发「凭证重复使用」保护都会失效。在客户端重新发起浏览器授权即可恢复连接。
:::

::: details 浏览器已点「允许连接」，客户端仍看不到工具
回到客户端新建对话或重新加载连接，再让 AI 查一次节点状态。仍看不到时，在「已授权客户端」点「撤销」后重新接入。
:::

::: details 终端命令和文件读写工具用不了
去 [安全访问](/security-settings) 打开「网页终端与命令执行」，并在 [管理服务器](/server-management) 配好节点 SSH。关闭该开关后，远程 MCP 也不能跑命令或读写文件。
:::

::: details 终端命令超过 30 秒没有马上返回结果
前台最多等 30 秒，更长的命令会转后台运行并返回执行编号。让 AI 用该编号查状态和输出，不要重复提交同一条命令。
:::

::: details 调用功能提示「当前套餐不包含此功能」
远程 MCP 不占「内置AI」额度，功能权限仍随面板套餐。去「授权管理」核对权益，见 [获取与激活授权](/license-management)。
:::
