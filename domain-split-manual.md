# 前后台域名分离（简版）

## 你要做的事

- 前台域名：`status.example.com`
- 后台域名：`admin.example.com`
- 源站：`<DSTATUS_ORIGIN_HOST>:5555`

前台和后台域名可以完全不同，不要求同主域。
例如：`status.example.com` + `admin.example.net`。

## 后台一键生成片段

在后台 `安全设置` 页面（`/admin/security-settings`）填写前台域名、后台域名、源站地址后，点击“一键生成片段”。

系统会同时给出前台/后台的 Nginx 与 Caddy 片段。原生 Nginx 在安全设置页直接生成“完整 server 片段”。

## 核心规则

前台域名只放行：

- `/`
- `/stats/*`
- `/network-quality`
- `/api/allnode_status`
- `/ws/stats`、`/ws/stats/*`

前台域名必须拦截：

- `/admin*`
- `/admin-login`
- `/login`
- `/logout`
- `/stats/update`
- `/api/agent`、`/api/agent/*`
- `/api/admin`、`/api/admin/*`

## 宝塔 / 1Panel Nginx 片段

适用：宝塔、1Panel 的反向代理配置。

- 只替换反代规则片段。
- 不改主站点 `server {}`。
- 已经手动配置过反代时，不要新建第二条反代，只替换原有规则段。

### 宝塔放置位置

在站点「反向代理」里，点当前代理右侧的「配置文件」。

![宝塔反向代理入口（点击配置文件）](/bt-proxy-config-entry.png)

### 1Panel 放置位置

在网站的反向代理配置里，找到当前站点转发到 DStatus 的那段配置。

### 前台站点（宝塔 / 1Panel）

```nginx
# 宝塔 / 1Panel：替换反代片段使用
# 原生 Nginx 请使用“原生 Nginx 片段”
#PROXY-START/

location ^~ /admin { return 404; }
location = /admin-login { return 404; }
location = /login { return 404; }
location = /logout { return 404; }
location = /stats/update { return 404; }
location = /api/agent { return 404; }
location ^~ /api/agent/ { return 404; }
location = /api/admin { return 404; }
location ^~ /api/admin/ { return 404; }

location ^~ /ws/stats {
    proxy_pass http://127.0.0.1:5555;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_read_timeout 300s;
}

location / {
    proxy_pass http://127.0.0.1:5555;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

#PROXY-END/
```

### 后台站点（宝塔 / 1Panel）

```nginx
# 宝塔 / 1Panel：替换反代片段使用
# 原生 Nginx 请使用“原生 Nginx 片段”
#PROXY-START/

location / {
    proxy_pass http://127.0.0.1:5555;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_read_timeout 300s;
}

#PROXY-END/
```

## 原生 Nginx 片段

适用：自己维护 `nginx.conf` / 站点 `server {}` 的场景。

- 直接使用下面完整 `server` 片段（前台一个、后台一个）。
- 域名与源站地址优先以 `/admin/security-settings` 生成结果为准。

### 前台站点（原生 Nginx）

```nginx
# 原生 Nginx：完整 server 配置（前台）
server {
    listen 80;
    server_name status.example.com;

    location ^~ /admin { return 404; }
    location = /admin-login { return 404; }
    location = /login { return 404; }
    location = /logout { return 404; }
    location = /stats/update { return 404; }
    location = /api/agent { return 404; }
    location ^~ /api/agent/ { return 404; }
    location = /api/admin { return 404; }
    location ^~ /api/admin/ { return 404; }

    location ^~ /ws/stats {
        proxy_pass http://127.0.0.1:5555;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 300s;
    }

    location / {
        proxy_pass http://127.0.0.1:5555;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 后台站点（原生 Nginx）

```nginx
# 原生 Nginx：完整 server 配置（后台）
server {
    listen 80;
    server_name admin.example.com;

    location / {
        proxy_pass http://127.0.0.1:5555;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 300s;
    }
}
```

## Caddy 完整示例

改文件：`/etc/caddy/Caddyfile`

```txt
status.example.com {
  @blocked path /admin* /admin-login /login /logout /stats/update /api/agent /api/agent/* /api/admin /api/admin/*
  respond @blocked 404

  @realtime path /ws/stats /ws/stats/*
  reverse_proxy @realtime <DSTATUS_ORIGIN_HOST>:5555

  @public path / /stats* /network-quality /api/allnode_status /stats/*/latest /js/* /css/* /img/* /libs/* /manifest.json /favicon.ico
  reverse_proxy @public <DSTATUS_ORIGIN_HOST>:5555

  respond 404
}

admin.example.com {
  reverse_proxy <DSTATUS_ORIGIN_HOST>:5555
}
```

应用：

```bash
caddy validate --config /etc/caddy/Caddyfile
systemctl reload caddy
```

## 安全建议（必须做）

关闭源站 `5555` 的公网访问，只保留 `80/443` 对外。

root 可直接执行：

- `ufw`：`ufw deny 5555/tcp`
- `firewalld`：`firewall-cmd --permanent --remove-port=5555/tcp && firewall-cmd --reload`
- `iptables`：`iptables -I INPUT -p tcp --dport 5555 -j DROP`

## 验证

1. `https://前台域名/` 可访问
2. `https://前台域名/stats/<sid>` 可访问
3. `https://前台域名/admin/` 返回 404
4. `https://后台域名/admin-login` 可访问

一句话流程：先按上面 4 步验证，若有异常就把前后台域名都临时回指到原单域名站点并恢复旧反代配置。


## 最容易踩坑的 3 件事

1. 把片段粘到主站点配置，导致面板生成配置被覆盖。
2. 同一个站点配了两条反代，规则互相打架。
3. 忘了替换旧规则，页面看起来能打开但后台接口未被拦截。
