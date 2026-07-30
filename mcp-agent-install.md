---
title: 远程 MCP · Agent 安装说明
search: false
prev: false
next: false
---

# 远程 MCP · Agent 安装说明

**读者：AI Agent。** 本文不进站点主导航；由用户提示词或直链打开。  
人类用户请看：[远程 MCP](/mcp)。

目标：把用户的 DStatus 远程 MCP 接到**当前本机 Agent**。用户只需在浏览器点“允许连接”。

## 唯一接入真源

用户会提供：

```text
MCP_URL = https://<实例域名>/mcp
```

先以普通 HTTP GET 读取 `MCP_URL`：

```bash
curl -sS -H 'Accept: application/json' "$MCP_URL"
```

响应中的 `setup` 是当前实例的**完整机器可读安装真源**，包含：

- HTTPS 与启用状态检查
- Streamable HTTP 连接参数
- OAuth 动态注册、随机回调端口、PKCE 与 `state`
- 浏览器授权、授权码交换与凭据安全保存
- MCP 握手、工具发现验收与 Token 回退

不要维护或猜测另一套固定步骤；始终以该实例当前返回的 `setup.version` 和 `setup` 内容为准。

## 执行要求

1. 先检查 `setup.requirements`；未满足时停下，用人话告诉用户。
2. 优先按 `setup.preferredFlow` 使用 OAuth；当前 MCP 客户端能自动授权时，使用客户端自带流程。
3. 客户端不能自动 OAuth 时，逐项执行 `preferredFlow.steps`，不得跳过 PKCE、`state` 校验或随机回调端口。
4. OAuth 无法完成时，才按 `setup.fallback` 使用管理员生成的专用 MCP Token。
5. 使用当前 Agent 的配置命令或 API；不要让用户手动编辑配置文件。
6. 不得在对话、日志、截图、文档或 Git 中复述 access token、refresh token 或手动 Token。

## 协议说明

MCP 客户端带 `Accept: text/event-stream` 请求 `GET /mcp` 时，服务端会按 Streamable HTTP 协议返回 `405 Method Not Allowed`；这表示当前无独立 SSE 流，不是安装说明丢失。

读取机器安装说明时，使用普通 GET 或 `Accept: application/json`。

## 对用户只说这些

- “请在浏览器用管理员账号登录并点允许。”
- “已经接上”或人话说明失败原因。

不要向用户展开 PKCE、端口、凭据路径等术语，除非用户追问。
