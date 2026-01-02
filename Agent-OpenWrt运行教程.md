# Agent OpenWrt 运行教程

本教程只讲“拿到二进制后怎么运行”。如果你能通过面板安装，优先使用面板生成的一键命令。

**确定架构**：
```bash
uname -m
```

**常见架构对应文件名**：
- `mips` → `dstatus_linux_mipsle`
- `armv7l` → `dstatus_linux_arm7`
- `aarch64` → `dstatus_linux_arm64`
- `x86_64` → `dstatus_linux_amd64`

---

## 2. 上传文件

```bash
scp dstatus_linux_mipsle root@openwrt-host:/opt/
chmod +x /opt/dstatus_linux_mipsle
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
report_server_key: "<上报密钥>"
server_id: "<节点SID>"
report_interval: 60
EOF
chmod 600 /etc/dstatus-agent/config.yaml
```

说明：
- `port` 建议以面板生成的安装命令/配置为准（常见是 9999）。
- 如果你直接运行二进制且不指定端口，程序默认会监听 `8080`。

2) 运行：

```bash
/opt/dstatus_linux_mipsle -c /etc/dstatus-agent/config.yaml
```

---

## 方式 B：启动参数（临时测试）

被动模式（默认）：

```bash
/opt/dstatus_linux_mipsle -key "<通信密钥>" -port 9999
```

主动上报（可选）：

```bash
/opt/dstatus_linux_mipsle -key "<通信密钥>" -port 9999 -report -report-server "http://panel.example.com:5555" -report-key "<上报密钥>" -server-id "<节点SID>" &
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
    /opt/dstatus_linux_mipsle -c /etc/dstatus-agent/config.yaml &
}

stop() {
    killall dstatus_linux_mipsle
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
