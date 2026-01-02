# Agent Windows 运行教程

本教程只讲“拿到二进制后怎么运行”。如果你能通过面板安装，优先使用面板生成的一键命令。

---

## 两种启动方式（选一种就够）

你可以用下面两种方式启动 Agent：

- 方式 A：用配置文件（适合长期运行）
- 方式 B：用启动参数（适合临时测试/排障）

---

## 方式 A：配置文件启动（推荐）

1) 新建 `config.yaml`（和 `dstatus_windows_amd64.exe` 放同一目录即可）：

```yaml
key: "<通信密钥>"
port: 9999

# 可选：主动上报（面板无法直连 Agent 时才需要）
report_enabled: true
report_server: "http://panel.example.com:5555"
report_server_key: "<上报密钥>"
server_id: "<节点SID>"
report_interval: 60
```

说明：
- `port` 建议以面板生成的安装命令/配置为准（常见是 9999）。
- 如果你直接运行二进制且不指定端口，程序默认会监听 `8080`。

2) 运行：

```cmd
dstatus_windows_amd64.exe -c config.yaml
```

---

## 方式 B：启动参数（临时测试）

被动模式（默认）：

```cmd
dstatus_windows_amd64.exe -key "<通信密钥>" -port 9999
```

主动上报（可选）：

```cmd
dstatus_windows_amd64.exe -key "<通信密钥>" -port 9999 -report -report-server "http://panel.example.com:5555" -report-key "<上报密钥>" -server-id "<节点SID>"
```

---

## 验证

```powershell
curl "http://localhost:9999/stat?key=<通信密钥>"
```

---

## 后台运行

使用 PowerShell：

```powershell
Start-Process -NoNewWindow -FilePath "dstatus_windows_amd64.exe" -ArgumentList "-c", "config.yaml"
```

---

## 开机自启

1. Win + R → `taskschd.msc`
2. 创建基本任务
3. 触发器：计算机启动时
4. 操作：启动程序 → 选择 `dstatus_windows_amd64.exe`
5. 参数示例：`-c C:\path\to\config.yaml`
