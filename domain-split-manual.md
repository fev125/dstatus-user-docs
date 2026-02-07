# 前后台域名分离（简版）

## 你要做的事

- 前台域名：`status.example.com`
- 后台域名：`admin.example.com`
- 源站：`<DSTATUS_ORIGIN_HOST>:5555`

前台和后台域名可以完全不同，不要求同主域。
例如：`status.example.com` + `admin.example.net`。

## 后台一键生成片段

在后台 `安全设置` 页面（`/admin/security-settings`）填写前台域名、后台域名、源站地址后，点击“一键生成片段”。

系统会同时给出前台/后台的 Nginx 与 Caddy 片段。Nginx 片段可用于 宝塔 / 1Panel / 原生 Nginx。

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

## Nginx 片段（宝塔 / 1Panel / 原生 Nginx 通用）

### 宝塔放置位置

在站点「反向代理」里，点当前代理右侧的「配置文件」。

![宝塔反向代理入口（点击配置文件）](/bt-proxy-config-entry.png)

只改这里生成的反代子文件。  
不要改主站点 `server {}`。

### 1Panel 放置位置

在网站的反向代理配置里，找到当前站点转发到 DStatus 的那段配置。

把该段中的转发规则替换为下方对应片段（前台站点用“前台片段”，后台站点用“后台片段”）。

### 原生 Nginx 放置位置

把下方 `location` 规则放到对应域名的 `server {}` 内。

`#PROXY-START/` 和 `#PROXY-END/` 仅用于宝塔标记，原生 Nginx 不需要这两行。

### 前台站点（`status.example.com`）

把该文件里 `#PROXY-START/` 到 `#PROXY-END/` 整段替换为下面内容。

```nginx
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

### 后台站点（`admin.example.com`）

```nginx
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
