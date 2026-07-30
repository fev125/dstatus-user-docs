# 远程 MCP：让 AI Agent 使用 DStatus

远程 MCP 可以把 DStatus 接入 Codex、Claude 等 AI Agent。连接后，Agent 可以读取已授权的运维数据，并在你指定的单台服务器上执行非交互式命令。

它适合用来排查节点状态、整理告警和执行明确的运维操作；不是面向游客的公开接口。

**支持版本：DStatus 2.26.07.010 及以后版本。** 使用更早版本时，请先升级面板。

## 连接前确认

- 使用可从 Agent 所在设备访问的实例域名，并已配置 HTTPS。
- 你拥有 DStatus 管理员账号。
- 你了解：完成授权的 Agent 将获得完整的管理员 MCP 能力。请只连接自己信任的客户端。

## 最快方式（推荐）

1. **启用** 远程 MCP。  
2. **复制** 提示词，发给 AI。  
3. 浏览器点 **允许**。

提示词（页面会自动带上你的地址）：

```text
请使用 dstatus-mcp-connect 技能，把我的 DStatus 远程 MCP 接上：https://你的实例域名/mcp。打开浏览器让我点允许即可。
```

> 这句话会点名技能；没有该技能时，让 AI 先读取本页下方的「给 AI」小节再执行。

接不上时，再用下面的手动方式。

## 给 AI（用户可忽略）

1. 加载技能 `dstatus-mcp-connect`（若无：按本页完成 Streamable HTTP + OAuth）。  
2. MCP 地址用用户给的 `/mcp` URL。  
3. 随机本地端口做 OAuth 回调，**先监听再打开浏览器**，用户点允许后写入本机 credentials。  
4. 验收：MCP 握手成功并能列出工具；不要复述 token。

## 手动接入

### 1. 启用远程 MCP

进入管理后台 → **设置中心** → **连接与授权** → **远程 MCP**。

点击“启用”，然后复制页面上显示的 MCP 地址。它通常是：

```text
https://你的实例域名/mcp
```

### 2. 选择认证方式

优先使用 **OAuth**：客户端会打开浏览器，你登录 DStatus 后点击“允许”即可。它不需要手动保存 Token，日后也能在同一页面撤销授权。

如果你的客户端不支持 OAuth，可以在“访问凭据”中填写用途名称并生成 Token。Token 只显示一次，复制后立即保存；离开页面后不能再次查看。

建议按设备或客户端分别创建凭据，例如“Codex 本机”和“自动化服务器”。不再使用时，直接在此页面吊销。

### 3. 在 Agent 中添加 MCP

客户端类型请选择 **Streamable HTTP**，地址填刚才复制的 MCP 地址。

#### Codex

使用 OAuth 时：

```bash
codex mcp add dstatus --url https://你的实例域名/mcp
codex mcp login dstatus
```

第二条命令会打开浏览器。登录 DStatus 并点击“允许”后，返回 Codex 即可使用。

使用 Token 时，先把 Token 放进本机环境变量，再添加连接：

```bash
export DSTATUS_MCP_TOKEN='你的 Token'
codex mcp add dstatus --url https://你的实例域名/mcp \
  --bearer-token-env-var DSTATUS_MCP_TOKEN
```

不要把 Token 写进项目代码、共享脚本或提交记录。

#### Claude Code

```bash
claude mcp add --scope user --transport http dstatus https://你的实例域名/mcp
```

首次使用时，按客户端提示在浏览器中登录并允许授权。若客户端要求手动填写认证方式，优先选择 OAuth；不支持时再使用 Bearer Token。

#### 其他 MCP 客户端

在客户端的 MCP 配置中选择 **Streamable HTTP**，填入 MCP 地址。

- 支持 OAuth：连接后完成浏览器登录和授权。
- 只支持 Token：把 Token 作为 `Authorization: Bearer <Token>` 请求头发送。

## Agent 能做什么

完成授权后，Agent 可以读取节点、告警、通知状态、分组和运行状态等结构化运维数据。

它也可以对你指定的单个节点执行一条非交互式终端命令。长命令会返回执行编号，Agent 可继续读取状态和输出；这不是交互式 Shell，也不支持一次操作多台节点。

远程 MCP 不提供 DStatus 配置写入工具、文件浏览或批量节点执行。它和前台的公开/私有访问模式相互独立。

## 安全使用建议

1. 只授权你信任的 Agent 和设备。
2. 每台设备或每个自动化任务使用独立 Token，便于单独撤销。
3. 发起终端命令前，先确认 Agent 选择的是正确节点；命令会真实影响目标服务器。
4. 不要让 Agent 执行会输出密码、私钥、Token 或其他敏感内容的命令。
5. 不再使用某个客户端时，在“远程 MCP”页面吊销对应 Token 或 OAuth 授权。

## 常见问题

### 客户端提示找不到 MCP 地址

先确认远程 MCP 已启用，并重新复制设置页上的地址。远程连接需要 HTTPS；请使用已配置证书的实例域名。

### 浏览器已登录，但客户端仍未连接

回到发起连接的客户端，等待它完成授权。仍无效时，在 DStatus 的“远程 MCP”页面撤销该 OAuth 授权，再重新连接。

### Token 丢失了

Token 无法找回。吊销旧 Token 后生成新的即可。

### 终端命令没有立即完成

终端任务可能正在排队或运行中。让 Agent 使用返回的执行编号继续查询状态和输出；不要反复提交同一条命令。
