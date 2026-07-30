# 远程 MCP：让 AI Agent 使用 DStatus

远程 MCP 可以把 DStatus 接入 Codex、Claude 等 AI Agent。连接后，Agent 可以读取已授权的运维数据，并在你指定的单台服务器上执行非交互式命令。

它适合用来排查节点状态、整理告警和执行明确的运维操作；不是面向游客的公开接口。

**支持版本：DStatus 2.26.07.010 及以后版本。** 使用更早版本时，请先升级面板。

## 连接前确认

- 使用可从 Agent 所在设备访问的实例域名，并已配置 HTTPS。
- 你拥有 DStatus 管理员账号。
- 你了解：完成授权的 Agent 将获得完整的管理员 MCP 能力。请只连接自己信任的客户端。

## 最快方式：复制一句话给 AI Agent（推荐）

适合会自己改本机配置、能打开浏览器的 AI Agent。你不需要懂 OAuth 或命令行。

1. 在管理后台 **设置中心 → 连接与授权 → 远程 MCP** 先点 **启用**。
2. 在同一页点击 **复制提示词**（或从下方复制模板，把地址换成你的）。
3. 粘贴到 Agent 对话框发送。
4. 浏览器弹出授权页时，用 **管理员账号** 登录并点 **允许**。
5. 看到 Agent 提示连接成功即可。

**一句话提示词模板**（把地址换成你的 MCP 地址）：

```text
请按 https://docs.vps.mom/mcp 的「Agent 接入步骤」把本机 AI Agent 接到我的 DStatus 远程 MCP。我的 MCP 地址是：https://你的实例域名/mcp 。请自动完成配置与 OAuth（打开浏览器让我点允许），最后验收连接成功并列出可用工具；不要向我展示任何 token。
```

管理后台「远程 MCP」卡片里的提示词会自动填入当前实例地址，直接复制即可。

### Agent 接入步骤（给 Agent 执行，用户只需点「允许」）

以下步骤面向 **本机 AI Agent**。用户侧只做：管理员登录 + 点允许。

1. **确认地址**：用户给出的 MCP 地址形如 `https://实例域名/mcp`，记为 `MCP_URL`，根地址记为 `BASE`（去掉末尾 `/mcp`）。
2. **探测 OAuth 元数据**（失败则请用户先在面板启用远程 MCP）：
   - `GET {BASE}/.well-known/oauth-authorization-server`
3. **写入本机 MCP 配置**（无密钥）：
   - 将 `MCP_URL` 以 **Streamable HTTP** 方式加入当前 Agent 的 MCP 列表（名称可用 `dstatus`）。
   - 确保该连接处于启用状态。
4. **Agent 内联 OAuth（禁止写死端口）**：
   - 用 `bind(127.0.0.1, 0)` 申请空闲端口，回调地址为 `http://127.0.0.1:{PORT}/callback`。
   - `POST {BASE}/mcp/oauth/register`，`redirect_uris` 只含上述回调。
   - 生成 PKCE（S256）与 state；**先启动本地回调监听，再**用系统浏览器打开授权 URL。
   - 用户点「允许」后用 code 换 token；写入当前 Agent 的本机 MCP credentials 存储（权限限本人可读），键名与服务名、`MCP_URL` 对齐。
   - register/token 若遇 Cloudflare 拦截，改用 `curl` 发送。
5. **验收**：确认 MCP 握手成功，并能列出可用工具。
6. **安全**：聊天中不要复述 access_token / refresh_token。

**硬规则：** 随机端口；先 listen 再打开授权页；register / authorize / token 的 `redirect_uri` 必须完全一致。

若客户端不支持上述自动流程，再使用下文「手动接入」。
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
