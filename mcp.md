# 远程 MCP：让 AI Agent 使用 DStatus

把 DStatus 接到 Codex、Claude 等 AI 后，它可以帮你看节点状态、告警，并在**你指定的一台服务器**上执行明确的运维命令。

需要 **DStatus 2.26.07.010 及以上**、管理员账号，以及 Agent 能访问的 **HTTPS** 实例地址。  
授权后的 Agent 拥有**完整管理员 MCP 能力**——只连接你信任的客户端。

## 三步接入（推荐）

1. 管理后台 → **设置中心** → **连接与授权** → **远程 MCP** → **启用**  
2. 点 **复制**，把提示词发给 AI  
3. 浏览器里用管理员账号点 **允许**

提示词会自动带上你的地址，形如：

```text
请先查看 https://docs.vps.mom/mcp-agent-install，再按说明把我的 DStatus 远程 MCP 接上：https://你的实例域名/mcp
```

你只负责：复制 → 发送 → 点允许。其余由 AI 按安装说明完成。

---

## 它能做什么 / 不能做什么

| 能 | 不能 |
|----|------|
| 读节点、告警、通知、分组、运行状态 | 改 DStatus 配置 |
| 对**单台**节点执行一条非交互命令 | 交互式 Shell、一次操作多台、浏览文件 |

长命令会返回执行编号，可继续查状态和输出。与前台公开/私有访问模式无关。

## 安全要点

1. 只授权信任的 Agent 和设备。  
2. 命令会真实打到目标机：先确认节点选对；不要让它打印密码、私钥、Token。  
3. 不用时在「远程 MCP」页吊销对应授权或 Token。  
4. 若用 Token：一设备/一任务一枚，便于单独撤销。

## 常见问题

**找不到 MCP 地址**  
先确认已启用，再复制设置页上的地址。远程连接需要 HTTPS 域名。

**浏览器已登录，客户端仍未连上**  
回到发起连接的客户端等它收尾。仍无效：在「远程 MCP」页撤销该授权后重连。

**Token 丢了**  
无法找回。吊销旧的，再生成新的。

**终端命令没有马上结束**  
可能还在排队或运行。让 AI 用返回的执行编号继续查，不要反复提交同一条。

---

## 高级：手动配置客户端

适合不走「复制提示词」、自己在 MCP 客户端里加连接的情况。

### 1. 启用并复制地址

**设置中心** → **连接与授权** → **远程 MCP** → 启用，复制：

```text
https://你的实例域名/mcp
```

### 2. 认证

- **优先浏览器授权（OAuth）**：客户端打开浏览器 → 登录 → 点允许；可在同一页撤销，无需长期保存密钥。  
- **客户端不支持时用 Token**：在「访问凭据」填用途名并生成。只显示一次，立刻保存；按设备/客户端分建，用完吊销。

### 3. 写入客户端

连接类型选 **Streamable HTTP**，地址用上面的 MCP 地址。

**Codex（浏览器授权）**

```bash
codex mcp add dstatus --url https://你的实例域名/mcp
codex mcp login dstatus
```

**Codex（Token）**

```bash
export DSTATUS_MCP_TOKEN='你的 Token'
codex mcp add dstatus --url https://你的实例域名/mcp \
  --bearer-token-env-var DSTATUS_MCP_TOKEN
```

**Claude Code**

```bash
claude mcp add --scope user --transport http dstatus https://你的实例域名/mcp
```

首次按客户端提示完成浏览器授权；不支持时再填 Bearer Token。

**其他客户端**  
Streamable HTTP + MCP 地址；有 OAuth 就走浏览器，否则请求头：`Authorization: Bearer <Token>`。

不要把 Token 写进代码、共享脚本或 Git。
