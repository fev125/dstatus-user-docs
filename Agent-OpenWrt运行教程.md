# Agent OpenWrt 运行教程

面板能安装的优先用面板生成的一键命令。本教程为无法用面板安装时的备用方案。

**确定架构**：
```bash
uname -m
```

**常见架构对应文件名**：
- `mips` → `dstatus-agent_linux_mipsle`
- `armv7l` → `dstatus-agent_linux_arm7`
- `aarch64` → `dstatus-agent_linux_arm64`
- `x86_64` → `dstatus-agent_linux_amd64`

兼容说明：
- 旧版本发布包里你可能还会看到 `dstatus_linux_*` 或 `neko-status_*`。
- 本文档统一以 `dstatus-agent_*` 作为主口径。

---

## 1. 下载二进制

Release 地址：
- `https://github.com/fev125/dstatus/releases`

下载示例（按你的架构替换文件名）：

```bash
wget -O dstatus-agent_linux_mipsle \
  "https://github.com/fev125/dstatus/releases/download/agent-latest/dstatus-agent_linux_mipsle"
```

如果你要固定版本，把上面 URL 里的 `agent-latest` 改成 `agent-vX.Y.Z`。

---

## 2. 上传文件

```bash
scp dstatus-agent_linux_mipsle root@openwrt-host:/opt/
chmod +x /opt/dstatus-agent_linux_mipsle
```

---

## 两种启动方式（选一种就够）

- 方式 A：用配置文件（适合长期运行）
- 方式 B：用启动参数（适合临时测试/排障）

---

## 方式 A：配置文件启动（推荐）

1) 新建配置文件（建议放在 `/etc/dstatus-agent/config.yaml`）：

```bash
mkdir -p /etc/dstatus-agent
cat > /etc/dstatus-agent/config.yaml << 'EOF'
key: "<通信密钥>"
port: 9999

# 可选：主动上报（面板无法直连 Agent 时才需要）
report_enabled: true
report_server: "http://panel.example.com:5555"
report_server_key: "<通信密钥>"
server_id: "<节点SID>"
report_interval: 60

# 高级可选：任务轮询（主动模式常用）
task_poll_enabled: true
task_poll_interval: 10
task_poll_mock: false
task_poll_max_batch: 5

# 高级可选：自动升级（仅影响 trigger=auto 的升级任务）
auto_upgrade_enabled: false
EOF
chmod 600 /etc/dstatus-agent/config.yaml
```

说明：
- `port` 建议以面板生成的安装命令/配置为准（常见是 9999）。
- 如果你直接运行二进制且不指定端口，程序默认会监听 `8080`。
- `task_poll_*` 与 `auto_upgrade_enabled` 已合并在上面的模板里，按需保留或修改即可。
- `report_server_key` 与 `key` 使用同一个通信密钥。
- `task_poll_*`：控制任务轮询开关、频率和每次处理数量。
- `auto_upgrade_enabled`：只控制自动触发升级；手动升级不受影响。

2) 运行：

```bash
/opt/dstatus-agent_linux_mipsle -c /etc/dstatus-agent/config.yaml
```

---

## 方式 B：启动参数（临时测试）

被动模式（默认）：

```bash
/opt/dstatus-agent_linux_mipsle -key "<通信密钥>" -port 9999
```

主动上报（可选）：

```bash
/opt/dstatus-agent_linux_mipsle -key "<通信密钥>" -port 9999 -report -report-server "http://panel.example.com:5555" -report-key "<通信密钥>" -server-id "<节点SID>" &
```

---

## 5. 验证

```bash
curl "http://localhost:9999/stat?key=<通信密钥>"
```

---

## 6. 开机自启

```bash
cat > /etc/init.d/dstatus << 'EOF'
#!/bin/sh /etc/rc.common
START=99

start() {
    /opt/dstatus-agent_linux_mipsle -c /etc/dstatus-agent/config.yaml &
}

stop() {
    killall dstatus-agent_linux_mipsle
}
EOF

chmod +x /etc/init.d/dstatus
/etc/init.d/dstatus enable
/etc/init.d/dstatus start
```

**管理命令**：
```bash
/etc/init.d/dstatus start   # 启动
/etc/init.d/dstatus stop    # 停止
/etc/init.d/dstatus restart # 重启
```
