# Agent OpenWrt 运行教程

## 1. 下载二进制 agent 文件

```bash
访问下载对应架构的二进制文件
https://github.com/fev125/dstatus/releases/tag/dev1.0.2
```

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
scp dstatus_linux_mipsle root@192.168.1.1:/opt/
chmod +x /opt/dstatus_linux_mipsle
```

---

## 3. 配置

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

## 4. 运行

```bash
# 前台测试
./dstatus_linux_mipsle -c config.yaml

# 后台运行
./dstatus_linux_mipsle -c config.yaml &
```

---

## 5. 验证

```bash
curl "http://localhost:8080/stat?key=your_secure_key_123"
```

---

## 6. 开机自启

```bash
cat > /etc/init.d/dstatus << 'EOF'
#!/bin/sh /etc/rc.common
START=99

start() {
    /opt/dstatus_linux_mipsle -c /opt/config.yaml &
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
