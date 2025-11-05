# Agent Windows 运行教程

## 1. 下载二进制 agent 文件

```bash
访问下载对于构架的二进制文件
https://github.com/fev125/dstatus/releases/tag/dev1.0.2
```

例如：`dstatus_windows_amd64.exe`（64位系统）

---

## 2. 配置

创建 `config.yaml`：

```yaml
key: "your_secure_key_123"
port: 8080

# 主动上报模式（可选）
report_enabled: true
report_server: "http://your-server-ip:5555"
report_server_key: "your_secure_key_123"  # 与 key 相同 你添加节点时的通信密钥
server_id: "your server sid" 添加后的节点ID sid 
report_interval: 5    # 上报间隔，单位为秒
```

**重要**：`key` 和 `report_server_key` 必须相同。

---

## 3. 运行

```cmd
dstatus_windows_amd64.exe -c config.yaml
```
如提示权限问题，按照提示加上./ 即可
---

## 4. 验证

```powershell
curl http://localhost:8080/stat?key=your_secure_key_123
```

---

## 5. 后台运行

使用 PowerShell：

```powershell
Start-Process -NoNewWindow -FilePath "dstatus_windows_amd64.exe" -ArgumentList "-c", "config.yaml"
```

---

## 6. 开机自启

1. Win + R → `taskschd.msc`
2. 创建基本任务
3. 触发器：计算机启动时
4. 操作：启动程序 → 选择 `dstatus_windows_amd64.exe`
5. 参数：`-c C:\path\to\config.yaml`
