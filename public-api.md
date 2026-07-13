# 公开 API

DStatus 提供一组**匿名只读**的 HTTP 接口，用于读取节点状态与监控数据。你可以用它构建自定义监控面板、状态页，或将数据集成到其他系统。

## 基础信息

| 项 | 说明 |
| --- | --- |
| Base URL | `https://你的实例域名`（下文示例统一用 `https://status.example.com`，请替换为你的实例地址） |
| 认证 | 无需认证，匿名即可访问 |
| 数据范围 | 仅返回**公开节点**；私有与禁用节点不会出现在响应中 |
| 数据格式 | JSON |

## 通用约定

- **稳定性**：本文列出的接口与字段构成稳定契约，只会新增、不会删除或改变已有字段的含义。客户端请对未知字段保持宽容（忽略而非报错）。
- **单位**：流量、容量相关字段一律为**字节**。
- **时间戳**：部分接口为 Unix **秒**，部分为**毫秒**，已在各接口标注。
- **响应结构**：成功响应多为 `{ "success": true, "data": ... }`；少数历史接口为 `{ "status": "success", "data": ... }` 或直接返回 `{ "data": ... }`，已在各接口标注。
- **错误**：以标准 HTTP 状态码表示，响应体为 JSON。常见码：`400` 参数错误、`404` 节点不存在或不可见、`403` 功能未开启、`500` 服务端错误、`503` 服务未就绪。
- **速率限制**：除硬盘历史接口外，服务端未强制限流。请客户端自我节制（如状态轮询间隔不低于 3 秒）。

---

## 节点

### 获取全部节点实时状态

```
GET /api/allnode_status
```

返回所有公开节点的最新实时状态。适合作为监控面板的主数据源。

**响应**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `order` | string[] | 节点 ID 的推荐渲染顺序 |
| `data` | object | 以节点 ID 为键的状态字典 |
| `data[id].name` | string | 节点名称 |
| `data[id].status` | number | 节点状态（公开节点为 `1`） |
| `data[id].stat` | object | 实时指标：CPU、内存、SWAP、网络速率等 |
| `data[id].traffic_stats` | object | 流量用量（字节）与配额信息 |
| `data[id].protocolBadge` | string | 网络协议：`ipv4` / `ipv6` / `dual` / `none` |

```json
{
  "success": true,
  "timestamp": 1752345600,
  "order": ["node-a"],
  "data": {
    "node-a": {
      "name": "香港-01",
      "status": 1,
      "stat": {
        "cpu": { "multi": 0.12, "cores": 2 },
        "mem": { "virtual": { "used": 512000000, "total": 2048000000, "usedPercent": 25 } },
        "net": { "delta": { "in": 1200, "out": 800 }, "total": { "in": 900000000, "out": 400000000 } },
        "offline": false
      },
      "traffic_stats": { "used": 12300000000, "limit": 0, "unlimited": true },
      "protocolBadge": "dual"
    }
  }
}
```

### 获取节点列表

```
GET /api/servers
```

返回公开节点的基础信息。

**查询参数**

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `groupIds` | string | 否 | 逗号分隔的分组 ID，按 OR 过滤（最多 50 个） |

**响应**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `data[].id` | string | 节点 ID |
| `data[].name` | string | 节点名称 |
| `data[].group_ids` | string[] | 所属分组 ID 列表 |
| `data[].data.metadata.region` | string | 地区代码 |
| `data[].data.location.code` | string | 国家/地区代码 |

```json
{
  "success": true,
  "data": [
    { "id": "node-a", "name": "香港-01", "group_ids": ["default"],
      "data": { "metadata": { "region": "HK" }, "location": { "code": "HK" } } }
  ]
}
```

### 获取分组

```
GET /api/groups
```

返回全部分组。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `data[].id` | string | 分组 ID |
| `data[].name` | string | 分组名称（用于显示） |
| `data[].top` | number | 排序权重（降序） |

```json
{ "success": true, "data": [ { "id": "default", "name": "默认分组", "top": 0 } ] }
```

### 获取分组统计

```
GET /api/groups/stats
```

按分组与地区维度统计公开节点数量。

```json
{
  "success": true,
  "data": {
    "totalCount": 12,
    "groups": [ { "id": "default", "name": "默认分组", "count": 5 } ],
    "regions": [ { "code": "HK", "name": "HK", "count": 3 } ]
  }
}
```

---

## 历史指标

> 下列接口的路径参数为节点 ID。访问不可见节点将返回 `404`。

### 最近负载

```
GET /api/stats/{id}/load/recent
```

返回一段时间内的 CPU / 内存 / SWAP 采样序列。

**查询参数**

| 参数 | 类型 | 必填 | 默认 | 说明 |
| --- | --- | --- | --- | --- |
| `duration` | number | 否 | 60 | 时间范围（分钟） |
| `interval` | number | 否 | 2 | 采样间隔（秒） |

**响应**（时间戳为**毫秒**）

```json
{
  "status": "success",
  "data": { "cpu": [0.12, 0.15], "mem": [25.1, 26.0], "swap": [0, 0], "timestamps": [1752345600000, 1752345660000] }
}
```

### 分钟级 / 小时级负载

```
GET /api/stats/{id}/load_m
GET /api/stats/{id}/load_h
```

返回归档的负载记录数组（时间戳为 Unix **秒**）。

```json
{ "status": "success", "data": [ { "cpu": 0.12, "mem": 25.1, "swap": 0, "ibw": 1200, "obw": 800, "created_at": 1752345600 } ] }
```

### 带宽历史

```
GET /api/stats/{id}/bandwidth/history
```

**查询参数**

| 参数 | 类型 | 必填 | 默认 | 说明 |
| --- | --- | --- | --- | --- |
| `range` | string | 否 | `10min` | `10min` / `1h` / `24h` / `7d` / `30d` / `60d` |
| `fields` | string | 否 | `ibw,obw` | 逗号分隔，可选 `cpu,mem,swap,ibw,obw` |

**响应**（时间戳为**毫秒**）

```json
{ "status": "success", "data": { "timestamps": [1752345600000], "ibw": [1200], "obw": [800] } }
```

### 流量统计

```
GET /stats/{id}/traffic
```

返回节点的天 / 小时 / 月流量序列及汇总（字节）。

**查询参数**

| 参数 | 类型 | 必填 | 默认 | 说明 |
| --- | --- | --- | --- | --- |
| `view` | string | 否 | `monthly` | `period`（按账单周期）或 `monthly` |
| `includeToday` | string | 否 | — | `1` 时附带当日用量 |

```json
{
  "data": {
    "ds": [], "hs": [], "ms": [],
    "monthly": { "used": 12300000000, "limit": 0, "status": "normal", "period_label": "每月 1 号" }
  }
}
```

### 硬盘容量历史

```
GET /stats/{id}/disk-history
```

按挂载点返回硬盘容量的时间序列（字节）。

**查询参数**

| 参数 | 类型 | 必填 | 默认 | 说明 |
| --- | --- | --- | --- | --- |
| `range` | string | 否 | `7d` | `7d` / `30d`（小时粒度）、`90d` / `all`（天粒度） |

**速率限制**：120 次 / 分钟 / IP。

```json
{
  "success": true,
  "data": {
    "sid": "node-a", "range": "7d", "granularity": "hourly", "state": "ready",
    "series": [ { "mount": "/", "points": [ { "t": 1752345600, "usedBytes": 5000000000, "totalBytes": 20000000000, "usedPct": 25 } ] } ]
  }
}
```

---

## 网络质量

> 需实例开启「网络质量」功能，否则返回 `403`。

### 网络质量概览

```
GET /api/network-quality/overview
```

返回各监控目标的网络质量指标与图表序列。

**查询参数**

| 参数 | 类型 | 必填 | 默认 | 说明 |
| --- | --- | --- | --- | --- |
| `timeRange` | string | 否 | `24h` | `1h` / `6h` / `24h` / `7d` / `30d` |
| `series` | string | 否 | — | 含 `packetloss` 时附丢包序列 |

```json
{
  "success": true,
  "data": {
    "timeRange": "24h",
    "totalTargets": 3,
    "summary": { "avgLatency": 42, "avgPacketLoss": 0.15, "avgAvailability": 99.85 },
    "targets": [
      { "id": 7, "region": "HK", "test_type": "tcping",
        "metrics": { "avgLatency": 42, "packetLoss": 0.1, "availability": 99.9 },
        "chartData": { "times": [1752345600000], "latencies": [42], "packetLoss": [0.1] } }
    ]
  }
}
```

### 网络质量统计

```
GET /api/network-quality/stats
```

返回跨节点/目标聚合的统计概要。

**查询参数**

| 参数 | 类型 | 必填 | 默认 | 说明 |
| --- | --- | --- | --- | --- |
| `timeRange` | string | 否 | `1h` | `1h` / `6h` / `24h` / `7d` / `30d` |
| `groupIds` | string | 否 | — | 逗号分隔分组过滤 |

```json
{
  "success": true,
  "data": { "totalTargets": 12, "nodesCount": 5, "avgLatency": 45, "avgPacketLoss": 0.2, "avgAvailability": 99.8, "healthScore": 98 }
}
```

---

## 站点信息

### 站点配置

```
GET /api/site-config
```

```json
{ "success": true, "data": { "name": "DStatus", "logo": "", "url": "/", "version": "x.y.z" } }
```

### 版本

```
GET /api/version
```

```json
{ "success": true, "version": "x.y.z", "buildDate": "2026-01-01" }
```

---

## 批量查询

### 批量流量

```
POST /api/stats/batch-traffic
```

一次查询多个节点的流量汇总。

**请求体**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `serverIds` | string[] | 是 | 节点 ID 数组 |
| `includeToday` | boolean | 否 | `true` 时每节点附当日用量 |

**响应**：`data` 中按节点 ID 返回流量汇总，不可见或不存在的节点为 `null`。

```json
{
  "success": true,
  "data": {
    "node-a": { "monthly": { "used": 12300000000, "limit": 0, "status": "normal" } },
    "node-x": null
  },
  "summary": { "requestedServers": 2, "serversWithData": 1 }
}
```
