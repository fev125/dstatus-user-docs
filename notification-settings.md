# 配置通知

节点离线、流量将尽或到期前自动提醒。支持 Telegram、邮件，以及 Webhook、App。

## 在哪打开

登录后台，点左侧「通知管理 → 通知规则」。

<figure><img src="/notification-settings-overview.webp" alt="左侧菜单「通知管理 → 通知规则」、上方「通知渠道」与下方「通知规则」"><figcaption>左侧菜单「通知管理 → 通知规则」、上方「通知渠道」与下方「通知规则」</figcaption></figure>

| 操作 | 作用 |
|---|---|
| 「规则」 | 配置上方四个「通知渠道」，管理下方全部「通知规则」 |
| 「接收」 | 接收外部消息或定时任务心跳，见 [接收外部消息](/notification-inbound) |
| 「记录」 | 查看发过的通知与各渠道结果，同一次故障合并为一行 |

## 怎么用

### 接入通知渠道

先配通至少一个渠道，发测试确认能收到。

<DocTabs :tabs="['Telegram', '邮件', 'Webhook', 'App 推送']">
<template #tab-0>

1. 在 Telegram 卡片点「配置」。
2. 填「Bot Token」，多个 Chat ID 用逗号隔开。
3. 有公网选「Webhook方式」，否则选「Polling方式」。
4. 开「启用通知」，点「保存设置」再点「发送测试」。

接好后可在私聊问 AI，见 [AI 功能](/ai)。

</template>
<template #tab-1>

1. 在邮件卡片点「配置」，开「启用邮件通知」。
2. 填「SMTP 主机」、「端口」，及「用户名」和密码。
3. 填发件人信息，填「收件人（逗号分隔）」。
4. 点「保存设置」，再点「发送测试」。

</template>
<template #tab-2>

1. 在 Webhook 卡片点「管理」，点「添加端点」。
2. 选钉钉、企业微信、Server酱等预设，或选「通用」。
3. 填「名称」，再填对应 Key 或「Webhook 地址」。
4. 点「发送测试消息」，通过后点「保存」。

</template>
<template #tab-3>

1. 登录 [DStatus App](/apple-app)，设备会自动登记。
2. 在 App 推送卡片点「配置」，开「启用 App 推送」。
3. 在「已登记设备」点「测试」，确认收到推送。

</template>
</DocTabs>

<figure><img src="/notification-settings-telegram-drawer.webp" alt="在「Telegram 通知设置」填写信息，点「保存设置」后点「发送测试」"><figcaption>在「Telegram 通知设置」填写信息，点「保存设置」后点「发送测试」</figcaption></figure>

### 设置默认渠道与免打扰

点右上角「通知设置」，改完点底部「保存策略」。

<figure><img src="/notification-settings-policy-drawer.webp" alt="点右上角「通知设置」，修改「默认发到」与「免打扰时段」后点「保存策略」"><figcaption>点右上角「通知设置」，修改「默认发到」与「免打扰时段」后点「保存策略」</figcaption></figure>

| 选项 | 作用 | 默认 |
|---|---|---|
| 「默认发到」 | 规则选「跟随默认」时发往的渠道，卡片旁会标「默认」 | 四个渠道全选 |
| 「免打扰时段」 | 期间暂存告警并在结束时汇总发出；掉线与安全提醒照发 | 关闭（23:00–08:00，UTC+8） |
| 「末尾显示来源」 | 通知末行附上站点名称或网址（在 [设置中心](/system-settings) 填写） | 「名称和网址」 |

### 管理内置规则

列表自带内置规则，可停用、改渠道和参数，不能删除。

| 选项 | 作用 | 默认 |
|---|---|---|
| 「掉线与恢复」 | 离线满设定时长通知，连续在线 60 秒后发恢复，可排除节点 | 启用，2 分钟 |
| 「新服务器接入」 | 发现新服务器、服务器通过审批时通知 | 启用 |
| 「服务异常」 | HTTP 服务连续失败满时长通知，恢复成对发送，可排除服务 | 启用，5 分钟 |
| 「流量提醒」 | 达节点「流量预警阈值」或用完时提醒，含 3 天预测与新周期通知 | 启用 |
| 「续费提醒」 | 到期前提醒，及自动续期的顺延确认、失败与宽限提醒，见 [账单与商家](/billing-report) | 启用，提前 7、3、1 天 |
| 「状态汇总」 | 每天按设定时间（UTC+8）发在线概况，多个时间用逗号隔开 | 禁用，09:00 |
| 「登录与安全」 | 登录成功抽样、失败、锁定、入口变更、MCP 授权、2FA 与敏感导出 | 启用 |
| 「系统提醒」 | 数据库容量与增长、日志空间、保护副本、主机地址更新、后台与插件故障 | 启用，500 MB / 日增 50 MB |
| 「接收消息」/「心跳超时」 | 控制 [接收外部消息](/notification-inbound) 与心跳入口的通知渠道 | 启用 |

### 新建与自定义规则

按指标新建规则，限定范围并选渠道方式。

<figure><svg viewBox="0 0 680 116" width="680" height="116" role="img" aria-label="通知从事件触发到送达渠道的判定流程" style="display:block;width:100%;max-width:680px;height:auto"><rect x="1" y="1" width="678" height="114" rx="8" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/><rect x="16" y="20" width="136" height="76" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="84" y="50" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="13" font-weight="600">1. 事件产生</text><text x="84" y="72" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">离线 / 超标 / 到期</text><line x1="156" y1="58" x2="176" y2="58" stroke="var(--vp-c-brand-1)" stroke-width="2"/><polygon points="174,53 182,58 174,63" fill="var(--vp-c-brand-1)"/><rect x="186" y="20" width="146" height="76" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="259" y="50" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="13" font-weight="600">2. 匹配规则</text><text x="259" y="72" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">指定对象规则优先接管</text><line x1="336" y1="58" x2="356" y2="58" stroke="var(--vp-c-brand-1)" stroke-width="2"/><polygon points="354,53 362,58 354,63" fill="var(--vp-c-brand-1)"/><rect x="366" y="20" width="146" height="76" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="439" y="50" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="13" font-weight="600">3. 静默与免打扰</text><text x="439" y="72" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">静默跳过 · 免打扰暂存</text><line x1="516" y1="58" x2="536" y2="58" stroke="var(--vp-c-brand-1)" stroke-width="2"/><polygon points="534,53 542,58 534,63" fill="var(--vp-c-brand-1)"/><rect x="546" y="20" width="118" height="76" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="605" y="50" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="13" font-weight="600">4. 送达渠道</text><text x="605" y="72" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">默认 / 加发 / 指定</text></svg><figcaption>指定对象的规则优先接管，未静默且不在免打扰时段时按渠道发出</figcaption></figure>

1. 点「新建规则」，在「监控什么」选指标。

   <figure><img src="/notification-settings-create-picker.webp" alt="点「新建规则」，在「监控什么」面板选择要监控的指标"><figcaption>点「新建规则」，在「监控什么」面板选择要监控的指标</figcaption></figure>

2. 填条件，选全部、分组或指定服务器。
3. 选跟随默认、加发或只发指定，点「创建规则」。

   <figure><img src="/notification-settings-create-form.webp" alt="设置条件、范围与「通知渠道」，核对摘要后点「创建规则」"><figcaption>设置条件、范围与「通知渠道」，核对摘要后点「创建规则」</figcaption></figure>

| 选项 | 作用 | 默认 |
|---|---|---|
| 「CPU」/「内存」 | 使用率持续超阈值时通知，回落到恢复线以下发恢复 | 阈值 90%，持续 5 分钟 |
| 「硬盘」 | 系统盘（Linux `/`、Windows `C:`）使用率持续超标时通知 | 阈值 90%，持续 10 分钟 |
| 「连接数」 | 连接总数持续超过阈值时通知 | 持续 5 分钟 |
| 「网络带宽」 | 入站、出站或任一方向平均带宽超标时通知 | 5 分钟平均 800 Mbps |
| 「组合条件」 | CPU、内存、硬盘、连接数、带宽最多 4 项按全部或任一判断 | 持续 5 分钟 |
| 「流量」 | 已用流量达比例或用完时提醒，可选预测预警与新周期通知 | 阈值 80% |
| 「服务状态」 | 为指定 HTTP 服务单设异常时长与渠道，「服务异常」不再重发 | 5 分钟 |
| 「TCPing」 | 指定监控目标 ID（逗号分隔）的延迟或失败率持续超标 | 延迟 200 ms，持续 5 分钟 |
| 「MTR 路由」 | 指定目标主机（可选填计划 ID）的路由或运营商变化 | — |
| 「续费」 | 为部分节点单设到期前提醒天数、顺延确认、失败或宽限提醒 | 提前 7、3、1 天 |

::: details 规则接管、自定义通知内容与规则静默时段
同指标下「指定服务器」规则优先接管，全部或分组规则不再重判。HTTP 服务同理，一个服务最多归属一条「服务状态」规则。

点自建规则的「自定义内容」，可改图标、标题和正文并插变量。底部「预览（示例数据）」实时显示，点「恢复默认」可还原。

内置规则和合并告警固定用系统内容，不支持自定义。「网络带宽」和「流量」规则，可在「高级设置」加「静默时段」。

静默按 UTC+8 算，期间不发，结束仍超标照常提醒。带宽还可开「未恢复时」重复提醒，并勾选「加发到」其他渠道。
:::

::: details 临时静默服务器与查看通知记录
维护节点时，打开服务器编辑页「高级 → 通知」。在「静默」选 1 小时、24 小时，或一直、自定义。

在 [管理服务器](/server-management) 的「批量编辑」里，也能一次静默多台节点。静默期间该节点不发通知，续费提醒除外。

切到顶部「记录」标签，同一次故障的多条通知会合并为一行。点开记录看各渠道耗时与原因，点「记录设置」可开限时全文日志。

<figure><img src="/notification-settings-events.webp" alt="切到「记录」标签查看合并后的故障记录与「记录设置」入口"><figcaption>切到「记录」标签查看合并后的故障记录与「记录设置」入口</figcaption></figure>
:::

## 常见问题

::: details 点「发送测试」提示失败
核对 Token 与 Chat ID，或邮件 SMTP 配置。选「Webhook方式」，需在 [设置中心](/system-settings) 填 HTTPS 网址。

连不上接口时，改「API基础URL (网络问题时修改)」。
:::

::: details 提示 Telegram 机器人被其他程序同时使用
同一 Token 多处收消息会冲突暂停。停用另一处或换新 Token，再点「保存设置」恢复。
:::

::: details 测试能收到，实际告警却没发出来
确认规则显示「已启用」，且「发到」列含该渠道。再查是否在免打扰或静默时段，或节点已被排除、静默。
:::

::: details 节点刚掉线为什么没立刻收到通知
「掉线与恢复」默认满 2 分钟才通知，用来过滤短暂抖动。编辑该规则，可把「离线通知延迟」改为「30 秒」或「自定义」。
:::

::: details 在哪查看某条通知为什么发送失败
打开「通知管理 → 记录」，点「发送失败」后点开记录看原因。也可点规则行尾菜单的「测试发送」，单独验证投递结果。
:::
