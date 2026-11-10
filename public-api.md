# 公开 API

免登录读取公开节点状态、历史趋势，以及网络与服务可用率。你可用它自建状态页、小组件，或把监控数据接入自有系统。

## 基础信息与约定

把接口路径拼在你的面板地址后即可调用。状态类接口建议轮询间隔不少于 3 秒。

| 项目 | 说明 |
|---|---|
| 根地址 | `https://你的面板域名`（开启 [前后台域名分离](/domain-split-manual) 时用公开前端域名） |
| 认证方式 | 无需认证，匿名直接请求 |
| 数据范围 | 仅返回「公开」节点；[管理服务器](/server-management) 中设为「私有」或「停用」的节点不返回 |
| 数据格式 | 请求与响应均为 `JSON`；`POST` 请求需带 `Content-Type: application/json` |
| 容量与速率 | 容量与流量统一为字节（`B`），实时网速与历史带宽统一为字节每秒（`B/s`） |
| 百分比口径 | 实时状态 `stat.cpu.multi` 为 `0–1` 比例；其余使用率与历史负载 `cpu` 均为 `0–100` |
| 时间戳单位 | 各接口分 Unix 秒与毫秒两种，见下方速查表及各节说明 |
| 状态码 | `400` 参数错误、`401` 需访问口令、`403` 无权或未开通、`404` 不存在或不可见、`429` 请求过快、`500` 服务端错误、`503` 未就绪 |
| 向前兼容 | 客户端解析时请忽略未知新增字段，不要对未知字段报错 |

## 什么情况下取不到数据

访问模式、导航权限与套餐范围，都会同步限制公开接口。

| 面板设置或请求情况 | 接口返回结果 |
|---|---|
| [访问控制与分享](/access-control) 设为「口令模式」或「严格私有」 | 除 `/api/version` 外均拒绝匿名请求：「口令模式」返回 `401`，「严格私有」返回 `403`；请求 `/stats/…` 需带 `Accept: application/json`，否则 `302` 跳往验证页或登录页 |
| [安全访问](/security-settings)「访客能看到什么」关闭「节点详情」 | 单节点 `/api/stats/{id}/…` 返回 `404`；单节点 `/stats/{id}/…` 返回 `403`；批量流量接口不受影响 |
| [外观与个性化](/personalization)「前台导航」设为「仅管理员」 | 「网络质量」设为「仅管理员」时，`overview`、`nodes-overview`、`target/{id}` 返回 `403`；「服务状态」设为「仅管理员」时，`/api/service-status` 系列返回 `403` |
| 套餐不含网络质量，或 `timeRange` 超出套餐历史上限 | `/api/network-quality/…` 返回 `403`，超上限时响应体附带当前套餐允许的最大范围 |
| 节点不存在，或设为「私有」「停用」 | 不出现在列表中；单节点 `/api/stats/{id}/…` 返回 `404`，单节点 `/stats/{id}/…` 返回 `403`，批量流量对应项为 `null` |
| 通过 [托管展示页](/showcase) 域名请求 | 仅转发前台自用接口；`/api/servers`、`/api/groups/stats`、`load/recent`、`load_m`、`load_h`、`network-quality/stats`、`/api/site-config` 返回 `404` |

## 接口速查

路径中的 `{id}` 为节点 ID（`sid`）。

| 方法与路径 | 用途 | 成功外层结构 | 时间单位 |
|---|---|---|---|
| `GET /api/allnode_status` | 全部公开节点实时状态与周期流量 | `{ success, timestamp, order, data }` | 秒（`sampleUpdatedAt` 为毫秒） |
| `GET /api/servers` | 公开节点基础列表（可按分组过滤） | `{ success, data }` | — |
| `GET /api/groups` | 全部分组列表 | `{ success, data }` | — |
| `GET /api/groups/stats` | 按分组与地区统计公开节点数 | `{ success, data }` | — |
| `GET /api/stats/{id}/load/recent` | 单节点近期 CPU、内存、SWAP 序列 | `{ status: "success", data }` | 毫秒 |
| `GET /api/stats/{id}/load_m` | 单节点分钟级负载与带宽归档 | `{ status: "success", data }` | 秒 |
| `GET /api/stats/{id}/load_h` | 单节点小时级负载与带宽归档 | `{ status: "success", data }` | 秒 |
| `GET /api/stats/{id}/bandwidth/history` | 单节点指定范围带宽与负载曲线 | `{ status: "success", data }` | 毫秒 |
| `GET /stats/{id}/traffic` | 单节点时、日、月流量序列与周期汇总 | `{ data }` | 秒（重置时间） |
| `POST /api/stats/batch-traffic` | 批量查询多节点月度、账期与当日流量 | `{ success, data, summary }` | 秒（`summary.timestamp` 为毫秒） |
| `GET /stats/{id}/disk-history` | 单节点各挂载点硬盘容量历史 | `{ success, data, timestamp }` | 秒（顶层 `timestamp` 为 ISO 字符串） |
| `GET /api/network-quality/overview` | 按监控目标汇总网络质量与曲线 | `{ success, data }` | 毫秒 |
| `GET /api/network-quality/nodes-overview` | 按节点汇总各目标网络质量与曲线 | `{ success, data }` | 毫秒 |
| `GET /api/network-quality/target/{id}` | 单监控目标详情与曲线（可按节点过滤） | `{ success, data }` | 毫秒 |
| `GET /api/network-quality/stats` | 跨节点网络质量聚合概要与健康分 | `{ success, data }` | 毫秒 |
| `GET /api/service-status` | 公开 HTTP 服务状态总览与 90 天日轨 | `{ success, data }` | 秒 |
| `GET /api/service-status/services/{publicKey}` | 单个公开 HTTP 服务详情与事件记录 | `{ success, data }` | 秒 |
| `GET /api/site-config` | 站点名称、Logo、版本与页脚配置 | `{ success, data }` | — |
| `GET /api/version` | 面板版本号与构建时间 | `{ success, version, ... }` | ISO 字符串 |

## 节点与分组

### 获取全部节点实时状态

```http
GET /api/allnode_status
```

返回全部公开节点的实时指标、分组与流量，适合做面板主数据源。

| 查询参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `view` | string | 否 | 全量 | 可选 `home`（首页精简字段，附公开购买参考价）、`resource`（资源、流量与到期）或 `minimal`（仅名称、分组、在线状态与探针版本） |

| 返回字段 | 类型 | 说明 |
|---|---|---|
| `timestamp` | number | 响应生成时间（Unix 秒） |
| `order` | string[] | 节点 ID 推荐顺序；后台开启「离线节点排到最后」时自动将离线节点置后 |
| `data` | object | 以节点 ID 为键的状态字典 |
| `data[id].name` | string | 节点名称 |
| `data[id].status` | number | 节点权限状态，公开节点固定为 `1` |
| `data[id].group_id` / `group_ids` | string / string[] | 主分组 ID 与所属分组 ID 列表 |
| `data[id].group_name` / `groups` | string / object[] | 主分组名称，以及 `{ id, name }` 分组列表 |
| `data[id].last_online` | number \| null | 最后在线时间（Unix 秒）；主控启动后首次观测前为 `null` |
| `data[id].sampleUpdatedAt` | number \| null | 主控收到本次采样的时间（Unix 毫秒）；离线时为 `null` |
| `data[id].expire_time` / `expire` / `days_until_expiry` | number / string / number | 到期时间戳（Unix 秒）、展示文案（如 `30 天`、`永久`）与剩余天数（已过期 `-1`，永久 `999`） |
| `data[id].protocolBadge` | string | 网络协议：`ipv4`、`ipv6`、`dual` 或 `none` |
| `data[id].data` | object | `{ location: { code } \| null, tags: [] }`；普通标签受「安全访问 → 访客能看到什么 → 服务器标签」控制 |
| `data[id].stat` | object | 实时指标：`offline` 是否离线；`cpu.multi`（`0–1` 比例）与 `cpu.cores`；`mem.virtual`、`mem.swap` 与 `diskSummary`（字节及 `usedPercent` `0–100`）；`net.delta`（`in`、`out` 速率 `B/s`）与 `net.total`（累计字节） |
| `data[id].traffic_stats` | object | 当期流量：`used`、`used_in`、`used_out`、`today_used`、`limit`、`remaining`（字节），`ratio`（`0–100`），`unlimited`（布尔），`next_reset`（Unix 秒），`status`（`normal` / `warning` / `critical`），`readState`（`ok` / `no_data` / `error`） |

::: details 查看响应示例
```json
{
  "success": true,
  "timestamp": 1752345600,
  "order": ["node-a"],
  "data": {
    "node-a": {
      "name": "香港-01",
      "status": 1,
      "group_id": "default",
      "group_ids": ["default"],
      "group_name": "默认分组",
      "groups": [{ "id": "default", "name": "默认分组" }],
      "last_online": 1752345598,
      "sampleUpdatedAt": 1752345598420,
      "expire_time": 0,
      "expire": "永久",
      "days_until_expiry": 999,
      "protocolBadge": "dual",
      "data": { "location": { "code": "HK" }, "tags": [] },
      "stat": {
        "cpu": { "multi": 0.12, "cores": 2 },
        "mem": { "virtual": { "used": 512000000, "total": 2048000000, "available": 1536000000, "usedPercent": 25 } },
        "diskSummary": { "used": 8000000000, "total": 40000000000, "free": 32000000000, "usedPercent": 20 },
        "net": { "delta": { "in": 1200, "out": 800 }, "total": { "in": 900000000, "out": 400000000 } },
        "offline": false
      },
      "traffic_stats": { "readState": "ok", "used": 12300000000, "today_used": 350000000, "limit": 0, "unlimited": true, "status": "normal" }
    }
  }
}
```
:::

### 获取节点列表

```http
GET /api/servers
```

返回公开节点的基础信息，支持按分组过滤。

| 查询参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `groupIds` | string | 否 | — | 逗号分隔的分组 ID，命中任一分组即返回（最多 50 个，兼容 `groupId`） |

| 返回字段 | 类型 | 说明 |
|---|---|---|
| `data[].id` / `data[].sid` | string | 节点 ID（两字段值相同） |
| `data[].name` | string | 节点名称 |
| `data[].disabled` | boolean | 是否停用，公开列表固定为 `false` |
| `data[].group_id` / `group_ids` | string / string[] | 主分组 ID（缺省 `default`）与所属分组 ID 列表 |
| `data[].data.location.code` | string | 国家或地区代码，未知为 `UNKNOWN` |
| `data[].data.metadata` | object \| null | 存在时含 `{ region }` 地区代码，未设置时为 `null` |
| `data[].data.api` | object | `{ mode, hasKey }`，`mode` 为 `true` 表示主动上报模式 |

::: details 查看响应示例
```json
{
  "success": true,
  "data": [
    {
      "id": "node-a",
      "sid": "node-a",
      "name": "香港-01",
      "disabled": false,
      "group_id": "default",
      "group_ids": ["default"],
      "data": {
        "api": { "mode": true, "hasKey": true },
        "metadata": { "region": "HK" },
        "location": { "code": "HK" }
      }
    }
  ]
}
```
:::

### 获取分组与分组统计

```http
GET /api/groups
GET /api/groups/stats
```

分别返回全部分组定义，以及按分组与地区的公开节点计数。

| 接口 | 返回字段 | 类型 | 说明 |
|---|---|---|---|
| `GET /api/groups` | `data[].id` | string | 分组 ID |
| `GET /api/groups` | `data[].name` | string | 分组显示名称 |
| `GET /api/groups` | `data[].top` | number | 排序权重，按降序排列 |
| `GET /api/groups/stats` | `data.totalCount` | number | 公开且未停用的节点总数 |
| `GET /api/groups/stats` | `data.groups[]` | object[] | `{ id, name, count }`；多分组节点在各组分别计数，`default` 为 0 也保留 |
| `GET /api/groups/stats` | `data.regions[]` | object[] | `{ code, name, count }`，按国家或地区代码汇总 |

::: details 查看响应示例
```json
{
  "success": true,
  "data": {
    "totalCount": 12,
    "groups": [{ "id": "default", "name": "默认分组", "count": 5 }],
    "regions": [{ "code": "HK", "name": "HK", "count": 3 }]
  }
}
```
:::

## 历史指标与流量

单节点不可见或关闭了游客「节点详情」时，`/api/stats/{id}/…` 返回 `404`。同一情况下，`/stats/{id}/…` 返回 `403`。

### 最近负载与归档负载

```http
GET /api/stats/{id}/load/recent
GET /api/stats/{id}/load_m
GET /api/stats/{id}/load_h
```

分别返回近期采样序列，以及分钟级、小时级归档数组。三个接口的 `cpu`、`mem`、`swap` 均为 `0–100` 百分比。

| 接口与参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `load/recent` 查询参数 `duration` | number | 否 | `60` | 时间范围（分钟） |
| `load/recent` 查询参数 `interval` | number | 否 | `2` | 期望采样间隔（秒）；点数过多时自动分桶降采样（上限 `1200`–`3000` 点） |

| 接口 | 返回字段 | 类型 | 说明 |
|---|---|---|---|
| `load/recent` | `data.cpu` / `mem` / `swap` | number[] | CPU、内存、SWAP 使用率序列（`0–100`） |
| `load/recent` | `data.timestamps` | number[] | 对应时间点（Unix 毫秒） |
| `load_m`、`load_h` | `data[].cpu` / `mem` / `swap` | number | 归档点的 CPU、内存、SWAP 使用率（`0–100`） |
| `load_m`、`load_h` | `data[].ibw` / `obw` | number | 入站与出站速率（`B/s`） |
| `load_m`、`load_h` | `data[].created_at` | number | 归档时间（Unix 秒） |

::: details 查看响应示例
```json
{
  "status": "success",
  "data": {
    "cpu": [12.0, 15.2],
    "mem": [25.1, 26.0],
    "swap": [0, 0],
    "timestamps": [1752345600000, 1752345660000]
  }
}
```

```json
{
  "status": "success",
  "data": [
    { "cpu": 12.0, "mem": 25.1, "swap": 0, "ibw": 1200, "obw": 800, "created_at": 1752345600 }
  ]
}
```
:::

### 带宽与负载历史曲线

```http
GET /api/stats/{id}/bandwidth/history
```

按时间窗返回带宽或负载序列，`timestamps` 为 Unix 毫秒。

| 查询参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `range` | string | 否 | `10min` | 可选 `10min`、`1h`、`60min`、`24h`、`7d`、`30d`、`60d`、`1month`；其他值返回 `400` |
| `fields` | string | 否 | `ibw,obw` | 逗号分隔，可选 `cpu,mem,swap,ibw,obw`（`ibw`、`obw` 为 `B/s`，其余为 `0–100`） |

::: details 查看响应示例
```json
{
  "status": "success",
  "data": {
    "timestamps": [1752345600000],
    "ibw": [1200],
    "obw": [800]
  }
}
```
:::

### 单节点流量与批量流量

```http
GET /stats/{id}/traffic
POST /api/stats/batch-traffic
```

单节点接口返回流量滑窗与汇总，批量接口一次查询多台汇总。两接口均同时返回月度 `monthly` 与节点周期 `period`。

| 接口与参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `GET /stats/{id}/traffic` 查询参数 `includeToday` | string | 否 | — | 传 `1` 或 `true` 时附带 `data.today.used` 当日自然日流量（字节） |
| `POST /api/stats/batch-traffic` 请求体 `serverIds` | string[] | 是 | — | 非空节点 ID 数组（为空或未传时返回 HTTP `200` 且 `success: false`） |
| `POST /api/stats/batch-traffic` 请求体 `includeToday` | boolean | 否 | `false` | 为 `true` 时每台可见节点附带 `today: { used }`（字节） |

| 返回字段 | 类型 | 说明 |
|---|---|---|
| 单节点 `data.hs` / `ds` / `ms` | number[][] | 近 24 小时、31 天、12 个月的 `[入站字节, 出站字节]` 序列；`data.history` 为各桶起止时间元数据 |
| `monthly`、`period` | object | 月度与当期流量汇总：`used`、`used_in`、`used_out`、`limit`、`remaining`（字节，不限量时 `-1`），`ratio`（`0–100`），`status`（`normal` / `warning` / `critical`），`period_type`，`period_label`，`next_reset`（Unix 秒） |
| 批量 `data[id]` | object \| null | 可见节点返回 `{ monthly, period, today? }`；不可见或不存在节点为 `null`（顶层附 `warning`） |
| 批量 `summary` | object | `{ requestedServers, serversWithData, invalidServers, timestamp }`（`timestamp` 为 Unix 毫秒） |

::: details 查看响应示例
```json
{
  "data": {
    "hs": [[60000000, 40000000]],
    "ds": [[500000000, 300000000]],
    "ms": [[8000000000, 4300000000]],
    "history": { "hs": [], "ds": [], "ms": [] },
    "monthly": { "used": 12300000000, "limit": 0, "remaining": -1, "ratio": 0, "status": "normal", "next_reset": 1754006400 },
    "period": { "used": 12300000000, "limit": 0, "remaining": -1, "ratio": 0, "status": "normal", "period_type": "monthly", "period_label": "每月 1 号", "next_reset": 1754006400 },
    "today": { "used": 800000000 }
  }
}
```

```json
{
  "success": true,
  "data": {
    "node-a": {
      "monthly": { "used": 12300000000, "limit": 0, "status": "normal" },
      "period": { "used": 12300000000, "limit": 0, "status": "normal", "period_type": "monthly" },
      "today": { "used": 800000000 }
    },
    "node-x": null
  },
  "summary": { "requestedServers": 2, "serversWithData": 1, "invalidServers": 1, "timestamp": 1752345600000 },
  "warning": "部分服务器ID不存在，可能是浏览器缓存过期导致，请刷新页面"
}
```
:::

### 硬盘容量历史

```http
GET /stats/{id}/disk-history
```

按挂载点返回硬盘容量时间序列（字节）。每 IP 每分钟限请求 120 次，超限返回 `429`。

| 查询参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `range` | string | 否 | `7d` | `7d`、`30d`（小时粒度 `hourly`），或 `90d`、`all`（天粒度 `daily`）；其他值返回 `400` |

| 返回字段 | 类型 | 说明 |
|---|---|---|
| `data.sid` / `range` / `granularity` | string | 节点 ID、查询范围与实际粒度（`hourly` 或 `daily`） |
| `data.state` / `availableSince` | string / number \| null | 有数据为 `ready`、无数据为 `empty`；最早记录时间（Unix 秒） |
| `data.series[]` | object[] | 每项含 `mount` 挂载点与 `points[]`（`t` 为 Unix 秒，`usedBytes`、`totalBytes` 为字节，`usedPct` 为 `0–100`，`gapAfter` 标记后续是否断档；`daily` 另含 `dayStart` 与 `observedAt`） |

::: details 查看响应示例
```json
{
  "success": true,
  "message": "",
  "data": {
    "sid": "node-a",
    "range": "7d",
    "granularity": "hourly",
    "state": "ready",
    "availableSince": 1751740800,
    "series": [
      {
        "mount": "/",
        "points": [
          { "t": 1752345600, "usedBytes": 5000000000, "totalBytes": 20000000000, "usedPct": 25, "gapAfter": false }
        ]
      }
    ]
  },
  "timestamp": "2026-07-12T18:40:00.000Z"
}
```
:::

## 网络质量

套餐不含网络质量，或 `timeRange` 超出套餐上限时返回 `403`。导航将「网络质量」设为「仅管理员」时，前三个接口也返回 `403`。

### 按监控目标概览与单目标详情

```http
GET /api/network-quality/overview
GET /api/network-quality/target/{id}
```

分别返回各适用目标的指标曲线，以及单监控目标详情。

| 查询参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `timeRange` | string | 否 | `24h` | 可选 `1h`、`6h`、`24h`、`7d`、`30d`、`31d`、`12m` |
| `granularity` | string | 否 | 自动 | `1h`/`6h`/`24h` 可选 `m`、`5m`；`7d` 可选 `h`（`target/{id}` 另可选 `5m`）；`30d` 可选 `d`（`target/{id}` 另可选 `h`）；`12m` 为 `month`；不匹配返回 `400` |
| `series` | string | 否 | — | 含 `packetloss` 附丢包序列，含 `range`（或传 `band=1`）附延迟波动区间 |
| `charts` | string | 否 | `all` | 仅 `overview` 支持：`all`、`none`，或 `top:N`（只生成平均延迟最高的 `N` 个目标曲线） |
| `maxPoints` | number | 否 | `100` | 仅 `overview` 支持：单目标图表最大点数（`20–300`） |
| `sid` | string | 否 | — | 仅 `target/{id}` 支持（兼容 `nodeId`）：只统计指定公开节点对该目标的数据，不可见返回 `403` |

| 接口 | 返回字段 | 类型 | 说明 |
|---|---|---|---|
| `overview` | `data.summary` | object | `{ avgLatency, avgPacketLoss, avgAvailability }`（延迟 `ms`，其余 `0–100`） |
| `overview` | `data.targets[]` | object[] | `{ id, name, region, test_type, metrics, chartData }`（名称自动脱敏，`chartData.times` 为 Unix 毫秒） |
| `target/{id}` | `data.target` / `metrics` / `chartData` | object | 单目标信息、汇总指标与图表序列（目标不存在返回 `404`） |

::: details 查看响应示例
```json
{
  "success": true,
  "data": {
    "timeRange": "24h",
    "totalTargets": 3,
    "summary": { "avgLatency": 42, "avgPacketLoss": 0.15, "avgAvailability": 99.85 },
    "targets": [
      {
        "id": 7,
        "name": "香港电信",
        "region": "HK",
        "test_type": "tcping",
        "metrics": { "avgLatency": 42, "packetLoss": 0.1, "availability": 99.9 },
        "chartData": { "times": [1752345600000], "latencies": [42], "packetLoss": [0.1] }
      }
    ]
  }
}
```
:::

### 按节点概览与全局统计

```http
GET /api/network-quality/nodes-overview
GET /api/network-quality/stats
```

分别按节点分组返回各目标指标，以及跨节点聚合健康分。

| 查询参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `timeRange` | string | 否 | `24h` / `1h` | `nodes-overview` 默认 `24h`，`stats` 默认 `1h`；可选值同 `overview` |
| `groupIds` | string | 否 | — | 逗号分隔的分组 ID（最多 8 个，兼容 `groupId`） |
| `regions` | string | 否 | — | 逗号分隔的地区代码或中文名（最多 8 个，兼容 `region`） |
| `status` | string | 否 | — | 按节点实时状态筛选：`online`、`offline` 或 `all` |
| `q` | string | 否 | — | 按节点名称模糊搜索（最多 64 个字符） |
| `charts` / `series` / `granularity` | string | 否 | — | 仅 `nodes-overview` 支持，含义同 `overview`（`maxPoints` 范围 `20–500`） |

| 接口 | 返回字段 | 类型 | 说明 |
|---|---|---|---|
| `nodes-overview` | `data.nodes[]` | object[] | 每项含 `nodeId`、`nodeName`、`realtimeOnline`、`groupId`、`groupName`、`location`、`nodeMetrics` 及脱敏后的 `targets[]` |
| `nodes-overview` | `data.summary` / `lastUpdated` | object / number | 节点与目标汇总指标，以及更新时间戳（Unix 毫秒） |
| `stats` | `data` | object | `totalTargets`、`nodesCount`、`activeTargets`、`avgLatency`（`ms`）、`avgPacketLoss`、`avgAvailability`、`healthScore`（`0–100`）、`lastUpdated`（Unix 毫秒） |

::: details 查看响应示例
```json
{
  "success": true,
  "data": {
    "totalTargets": 12,
    "nodesCount": 5,
    "activeTargets": 10,
    "avgLatency": 45,
    "avgPacketLoss": 0.2,
    "avgAvailability": 99.8,
    "healthScore": 98,
    "lastUpdated": 1752345600000,
    "timeRange": "1h"
  }
}
```
:::

## 公开服务状态与站点信息

### 公开服务状态

```http
GET /api/service-status
GET /api/service-status/services/{publicKey}
```

读取在 [网络质量](/monitor) 开启「显示在公开状态页」的目标，返回可用率与事件。

| 接口与参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `GET /api/service-status` | — | — | — | 返回全部已公开 HTTP 服务的总览、90 天日轨与近期事件 |
| `GET /api/service-status/services/{publicKey}` 查询参数 `range` | string | 否 | `7d` | `{publicKey}` 取总览返回的 `public_key`；可选 `24h`、`7d`（小时桶）或 `90d`（日桶），未公开或不存在返回 `404` |

| 接口 | 返回字段 | 类型 | 说明 |
|---|---|---|---|
| 总览 | `data.overall` / `summary` | object | 全站状态（`operational` / `degraded` / `outage` / `unknown`）、各状态服务数与 `availability_90d` |
| 总览 | `data.services[]` | object[] | 每项含 `public_key`、`name`、`state`、`latency_ms`、`availability_90d` 及 90 天 `history[]`（`start_at` 为 Unix 秒） |
| 总览 | `data.current_incident` / `recent_incidents[]` | object / object[] | 当前进行中的事件与近 30 天内持续满 5 分钟的恢复事件 |
| 单服务 | `data.service` / `summary` / `history[]` / `incidents[]` | object | 单服务当前状态、区间可用率汇总、按小时或按天的状态桶及事件列表 |

::: details 查看响应示例
```json
{
  "success": true,
  "data": {
    "generated_at": 1752345600,
    "interval_sec": 60,
    "overall": { "state": "operational", "title": "所有服务运行正常", "message": "最近一轮可靠观测正常" },
    "summary": { "total_services": 1, "operational_services": 1, "availability_90d": 99.98 },
    "services": [
      {
        "public_key": "<64位十六进制公开标识>",
        "name": "主站",
        "state": "operational",
        "latency_ms": 86,
        "availability_90d": 99.98,
        "history": [{ "start_at": 1752249600, "state": "operational", "quality": "stable", "availability": 100, "avg_latency_ms": 84 }]
      }
    ],
    "current_incident": null,
    "recent_incidents": []
  }
}
```
:::

### 站点配置与版本

```http
GET /api/site-config
GET /api/version
```

分别返回站点品牌页脚配置，以及面板版本与构建时间。`/api/version` 不受访问模式拦截。

| 接口 | 返回字段 | 类型 | 说明 |
|---|---|---|---|
| `GET /api/site-config` | `data.name` / `logo` | string | 站点名称与 Logo 地址 |
| `GET /api/site-config` | `data.url` | string | 匿名请求固定返回 `"/"`，不暴露后台配置的站点网址 |
| `GET /api/site-config` | `data.version` / `footerView` | string / object | 基础版本号与页脚开关配置 |
| `GET /api/version` | `version` | string | 当前运行版本号（含构建后缀） |
| `GET /api/version` | `buildDate` / `buildTime` | string | 构建日期（如 `2026/10/17`）与 ISO 构建时间 |

::: details 查看响应示例
```json
{
  "success": true,
  "data": { "name": "DStatus", "logo": "", "url": "/", "version": "x.y.z" }
}
```

```json
{
  "success": true,
  "version": "x.y.z",
  "buildDate": "2026/10/17",
  "buildTime": "2026-10-17T11:23:58.986Z",
  "format": "YY.MM.BUILD_NUMBER"
}
```
:::

## 常见问题

::: details 请求接口没返回 JSON，而是跳到了登录页或验证页
站点开启了「口令模式」或「严格私有」，且请求 `/stats/…` 未带 `Accept: application/json`。

加上该请求头返回 `401` 或 `403`。要免密读取，去 [访问控制与分享](/access-control) 切回「公开模式」。
:::

::: details 为什么实时状态的 CPU 是 0.12，历史负载接口却是 12
`GET /api/allnode_status` 的 `stat.cpu.multi` 沿用探针上报的 `0–1` 比例，乘以 `100` 即为百分比。`load/recent`、`load_m`、`load_h` 与 `bandwidth/history` 在入库归档时已换算为 `0–100` 百分比。
:::

::: details 在已登录的浏览器控制台调用 POST /api/stats/batch-traffic 返回 403
同源浏览器自动附带登录 Cookie，触发了面板跨站请求保护。在脚本、服务端或无痕窗口中直接调用，不带 Cookie 即可正常返回。
:::

::: details 用托管展示页的域名请求部分接口返回 404
[托管展示页](/showcase) 连接器只放行前台页面用到的接口。请求 `/api/servers`、`/api/groups/stats`、`load/recent`、`load_m`、`load_h`、`network-quality/stats` 或 `/api/site-config` 时，请改用面板源站或公开前端域名。
:::
