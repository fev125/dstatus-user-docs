---
title: 远程 MCP · Agent 安装说明
search: false
prev: false
next: false
---

# 远程 MCP · Agent 安装说明

**读者：AI Agent。** 本文不进站点主导航；由用户提示词或直链打开。  
人类用户请看：[远程 MCP](/mcp)。

目标：把用户的 DStatus 远程 MCP 接到**当前本机 Agent**。用户只需在浏览器点「允许」。

---

## 输入

用户会提供（或面板提示词里带有）：

```text
MCP_URL = https://<实例域名>/mcp
BASE    = https://<实例域名>   # 去掉末尾 /mcp
```

若只有域名，补成 `https://域名/mcp`。必须是用户可达的 **HTTPS** 地址。

---

## 前置（失败则停，用人话告诉用户）

1. 用户已在面板 **设置中心 → 连接与授权 → 远程 MCP** 点过 **启用**。  
2. 探测：

```bash
curl -sS "{BASE}/.well-known/oauth-authorization-server"
```

应返回 JSON，含 `authorization_endpoint` / `token_endpoint` / `registration_endpoint`。  
404 或 MCP 未启用 → 请用户先启用远程 MCP。

---

## 步骤

### 1. 注册本机 MCP 连接（无密钥）

以 **Streamable HTTP** 把 `MCP_URL` 加入当前 Agent 的 MCP 列表，名称可用 `dstatus`，保持启用。  
**不要** 在这一步写死 `Authorization: Bearer`（优先 OAuth）。

使用你所在环境的 MCP 管理命令（若有 `mcp add --transport http` 一类接口则用之）。

### 2. 拉起 OAuth（主会话即可，不必 Subagent）

**不要**依赖「交互 TUI 里按键授权」；在**当前能跑工具的会话**里自建 OAuth 客户端：

1. `bind(127.0.0.1, 0)` 申请**空闲端口**（禁止写死 8765 等）。  
2. `REDIRECT = http://127.0.0.1:{PORT}/callback`  
3. `POST {BASE}/mcp/oauth/register`  
   body: `{"client_name":"…","redirect_uris":["{REDIRECT}"]}`  
4. 生成 PKCE（S256）与 `state`。  
5. **先**在本地监听 `REDIRECT`，**再**用系统浏览器打开：

```text
{BASE}/mcp/oauth/authorize?response_type=code&client_id=…&redirect_uri=…&code_challenge=…&code_challenge_method=S256&state=…
```

6. 对用户说：请用**管理员**账号登录（如需要），点击 **允许**。  
7. 收到 `code` 后 `POST {BASE}/mcp/oauth/token`（`authorization_code` + `code_verifier` + 同一 `redirect_uri`）。  
8. 将 token 写入**当前 Agent 的本机 MCP credentials**（限本人可读），键名与服务名、`MCP_URL` 对齐。  
9. register/token 若被 Cloudflare 拦，改用 `curl`。

**说明：**

- 主会话能跑 shell 即可，**不需要** Subagent。  
- 仍需用户在浏览器点「允许」，不是无人值守。  
- `redirect_uri` 在 register / authorize / token **三处必须完全一致**。

### 3. 验收

- MCP 握手成功  
- 能列出工具（≥1）  
- 聊天中**不要**复述 access_token / refresh_token  

若环境有 MCP 诊断命令，跑一遍确认健康。

### 4. 回退

客户端无法完成 OAuth 时：引导用户在面板 **生成 Token**，再以 `Authorization: Bearer <Token>` 配置（Token 只显示一次）。

---

## 对用户只说这些

- 「请在浏览器用管理员点允许。」  
- 「已经接上 / 失败原因（人话）。」  

不要甩 PKCE、端口、credentials 路径等术语，除非用户追问。

---

## 明确不做

- 不修改用户 DStatus 服务端代码  
- 不把 Token 写进 git、文档、截图  
- 不要求用户自己改配置文件  
- 不为「拉授权」强行再开一层无必要的 Subagent（主会话可跑工具时直接做）
