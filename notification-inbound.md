# 接收外部消息

把宝塔、备份脚本等外部消息推到面板，经通知渠道发出。免费版也能用，渠道设置见 [配置通知](/notification-settings)。

<figure><svg viewBox="0 0 680 204" width="680" height="204" role="img" aria-label="Webhook 入口与心跳入口的工作方式对比" style="display:block;width:100%;max-width:680px;height:auto"><rect x="1" y="1" width="678" height="202" rx="8" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/><line x1="20" y1="102" x2="660" y2="102" stroke="var(--vp-c-divider)" stroke-dasharray="4 4"/><text x="24" y="42" fill="var(--vp-c-text-1)" font-size="14" font-weight="600">Webhook 入口</text><text x="24" y="64" fill="var(--vp-c-text-2)" font-size="12">对方系统有事推一条</text><rect x="176" y="22" width="154" height="58" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="253" y="46" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="13" font-weight="600">宝塔 / 自建脚本</text><text x="253" y="66" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">发 HTTP POST 请求</text><text x="412" y="40" text-anchor="middle" fill="var(--vp-c-brand-1)" font-size="11" font-weight="500">推送消息 / 告警</text><line x1="338" y1="51" x2="478" y2="51" stroke="var(--vp-c-brand-1)" stroke-width="2"/><polygon points="476,46 486,51 476,56" fill="var(--vp-c-brand-1)"/><rect x="494" y="22" width="162" height="58" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="575" y="46" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="13" font-weight="600">DStatus 面板</text><text x="575" y="66" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">按「接收消息」规则发出</text><text x="24" y="144" fill="var(--vp-c-text-1)" font-size="14" font-weight="600">心跳入口</text><text x="24" y="166" fill="var(--vp-c-text-2)" font-size="12">到点没报到就告警</text><rect x="176" y="124" width="154" height="58" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="253" y="148" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="13" font-weight="600">定时备份 / 同步任务</text><text x="253" y="168" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">跑完访问一次地址</text><text x="412" y="142" text-anchor="middle" fill="var(--vp-c-brand-1)" font-size="11" font-weight="500">按期上报心跳</text><line x1="338" y1="153" x2="478" y2="153" stroke="var(--vp-c-brand-1)" stroke-width="2"/><polygon points="476,148 486,153 476,158" fill="var(--vp-c-brand-1)"/><rect x="494" y="124" width="162" height="58" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="575" y="148" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="13" font-weight="600">DStatus 面板</text><text x="575" y="168" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">超时按「心跳超时」告警</text></svg><figcaption>Webhook 接收外部主动推送的消息，心跳在定时任务超时未报到时告警</figcaption></figure>

## 在哪打开

登录后台，点左侧「通知管理」，切到顶部「接收」标签。

<figure><img src="/notification-inbound-list.webp" alt="「通知管理」顶部的「接收」标签与右上角「新建入口」按钮"><figcaption>「通知管理」顶部的「接收」标签与右上角「新建入口」按钮</figcaption></figure>

## 怎么用

### 新建入口

每个入口有独立专属地址，收到请求后自动归入该入口。

1. 点右上角「新建入口」，在「接收类型」选一种卡片。
2. 填「名称」；选「定时任务」时再设「截止」与「宽限」。
3. 点「创建」，复制专属地址（心跳可复制「上报命令」）。
4. 在对方系统发一条测试，变「已接收」后点「完成」。

<figure><img src="/notification-inbound-create.webp" alt="在「新建接收入口」抽屉选择「接收类型」并点底部「创建」"><figcaption>在「新建接收入口」抽屉选择「接收类型」并点底部「创建」</figcaption></figure>

| 选项 | 作用 | 默认 |
|---|---|---|
| 「通用 JSON」 | 接收 JSON 或 `x-www-form-urlencoded` 表单请求 | 默认选中 |
| 「宝塔面板」 | 接收宝塔告警通知，自动清理排版符号并识别级别 | — |
| 「定时任务」 | 心跳入口（任务跑完访问一次，过点未收到即告警） | — |
| 「关联服务器」 | 仅心跳可用；该服务器离线期间暂停超时判定，防重复告警 | 「不关联」 |
| 「截止」 | 仅心跳可用；设「每天」几点前（UTC+8）或「每隔」多久上报 | 「每天」`02:30` |
| 「宽限」 | 仅心跳可用；过截止后再等多久仍没收到才发超时告警 | 「15 分钟」 |

<figure><img src="/notification-inbound-heartbeat.webp" alt="选择「定时任务」后设置「关联服务器」、「截止」与「宽限」"><figcaption>选择「定时任务」后设置「关联服务器」、「截止」与「宽限」</figcaption></figure>

::: warning 注意
凭专属地址即可推消息，请只填进可信系统。地址泄露后，进详情点「重新生成地址」作废旧地址。
:::

### 发送自定义消息

向专属地址发 `POST` 请求，单条请求体上限 64 KB。

<DocTabs :tabs="['curl', 'Python']">
<template #tab-0>

```bash
curl -X POST '<你的入口地址>' \
  -H 'Content-Type: application/json' \
  -d '{"title":"数据库备份失败","content":"上传对象存储失败","level":"critical","key":"backup-db"}'
```

</template>
<template #tab-1>

```python
import requests

requests.post(
    "<你的入口地址>",
    json={"title": "数据库备份失败", "content": "上传对象存储失败", "level": "critical", "key": "backup-db"},
)
```

</template>
</DocTabs>

| 选项 | 作用 | 默认 |
|---|---|---|
| `title` | 通知标题，最多保留 200 字 | 「消息」 |
| `content` | 正文，最多 1000 字；也认 `message`、`msg`、`text`、`body`、`description` | 空 |
| `level` | 级别：`info`、`warning`、`critical`；也认 `warn`、`error` 等常见写法 | `info` |
| `key` | 故障标识（可选）；带同一 `key` 可合并重复告警并配对恢复 | 空（单条通知） |
| `status` | 仅带 `key` 时生效：填 `resolved` 发恢复通知，其余按告警触发 | `firing` |

故障恢复时，带同一个 `key` 再发一次请求。请求里把 `status` 写成 `resolved` 即可。

::: details 表单格式、其余字段、去重合并与返回状态码
表单编码请求同样支持，可直接解析上表同名字段。除上表外的顶层字段存入详情「其余字段」（最多 2 KB）。

不带 `key` 时，60 秒内同标题同内容的消息只发一次。

带 `key` 未恢复前重复发只记次数，不重复通知。恢复通知只发给收到过那条告警的渠道。

| 状态码 | 含义 |
|---|---|
| `200` | 已接收并返回消息编号 |
| `400` | 不是合法 JSON / 表单，或请求内容为空 |
| `404` | 地址有误，或入口已停用 |
| `405` | 请求方法不对（Webhook 仅收 `POST`） |
| `413` | 请求体超过 64 KB |
| `429` | 超过上限（单入口 60 次/分、2000 次/天，全站 600 次/分） |
:::

### 接入宝塔面板

新建入口选「宝塔面板」，复制地址后到宝塔添加通道。

1. 打开宝塔「设置 → 告警通知 → 告警设置」。
2. 在「自定义消息通道」点「配置」，再点「添加」。
3. 填名称与地址，请求选 `POST`，开启证书校验。
4. 参数格式选 `application/json`，点「确定」。

<figure><img src="/inbound-bt-channel.jpg" alt="在宝塔「自定义消息通道配置」填入入口地址并选 POST 与 application/json"><figcaption>在宝塔「自定义消息通道配置」填入入口地址并选 POST 与 application/json</figcaption></figure>

5. 切到「告警列表」点「添加任务」，选该自定义通道。

<figure><img src="/inbound-bt-alarm.jpg" alt="在宝塔「添加告警任务」中将「告警方式」选为自定义消息通道"><figcaption>在宝塔「添加告警任务」中将「告警方式」选为自定义消息通道</figcaption></figure>

::: details 测试消息合并与告警级别规则
保存通道时宝塔会连发测试，面板自动合并为 1 条发出。

标题含「失败」「异常」「告警」「到期」等词按警告发送。其余消息按普通级别发送。
:::

### 监控定时任务心跳

定时任务跑完后访问一次地址，`GET` 或 `POST` 均可。

```bash
# 放在备份脚本末尾，前一步成功才上报
backup.sh && curl -fsS '<你的入口地址>'
```

过「截止 + 宽限」未上报发 1 条告警，下次上报发恢复。

::: details 周期起算、离线暂停与恢复宽限
新建、启用或改计划后，从下一个截止时间开始判定。

关联服务器离线时显示「暂停判定」，不发超时告警。

恢复在线后再给一次宽限（最长 1 小时）。宽限后仍未上报才告警。
:::

### 设置渠道与管理入口

消息发往哪些渠道，统一在「通知管理 → 规则」里设置。

1. 打开「通知管理 → 规则」，切到「系统」分类。
2. 点「接收消息」或「心跳超时」改渠道，见 [配置通知](/notification-settings)。

在「接收」列表点任意入口行，可查记录、改设置或换地址。

| 操作 | 作用 |
|---|---|
| 行内「复制地址」 | 复制该入口的专属接收地址，不会更换原地址 |
| 行尾「⋮ → 停用 / 启用」 | 停用后该地址返回 `404` 不再接收，历史记录保留 |
| 行尾「⋮ → 删除入口」 | 删除入口并立即作废地址，已收到的消息记录一并删除 |
| 详情「最近消息」/「最近 7 次」 | 查投递状态；Webhook 点开单条可看解析结果与最近 1 条原文样本（8 KB 内） |
| 详情「重新生成地址」 | 换用新令牌生成新地址，原地址立即失效 |

::: details 反向代理日志与记录保留
面板日志会自动遮蔽地址里的随机令牌。若前面挂了反向代理，访问日志会记下路径，请妥善保管。

单入口保留最近 500 条记录（全站 20,000 条）。超出自动淘汰旧记录，也会随通知保留期定期清理。
:::

## 常见问题

::: details 对方测试成功（返回 200），我却没收到通知
去「通知管理 → 规则」的「系统」分类，检查对应内置规则。确认「接收消息」或「心跳超时」已启用且配好通知渠道。

入口里标「勿扰暂存」的，会在免打扰结束后发出。标「已合并」是同一 `key` 未恢复，或 60 秒内重复推送。
:::

::: details 生成的专属地址域名不对，或显示内网地址
专属地址优先读取「设置中心 → 基础设置 → 站点网址」。去那里填好对外访问的域名并保存，再回入口复制即可。
:::

::: details 推送返回 `400`、`404` 或 `405`
返回 `400` 多为格式不对，点开「已拒收」记录可看原文样本。返回 `404` 请核对地址是否完整，以及入口是否已停用。

开启「强制 HTTPS」时，请直接填 `https` 地址。否则重定向会把 `POST` 变成 `GET`，导致返回 `405`。
:::

::: details 心跳入口刚建好，为什么没立刻告警
新建、重新启用或改计划后，从下一个截止时间才开始判定。首个截止加宽限走完前不会判超时，未上报时显示「等待首条」。
:::
