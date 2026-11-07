# 前后台域名分离

访客用前台域名看状态页，管理只走后台域名，前台打不开后台。不想自备反代并想隐藏主控 IP 时，可用 [托管展示页](/showcase)。

## 在哪打开

登录后台，点左侧「安全访问 → 安全设置」。切到顶部「网络与访问」标签，找到「前后台域名分离」。

<figure><img src="/domain-split-manual-entry.webp" alt="左侧菜单「安全访问 → 安全设置」与顶部「网络与访问」标签"><figcaption>左侧菜单「安全访问 → 安全设置」与顶部「网络与访问」标签</figcaption></figure>

<figure><svg viewBox="0 0 680 204" width="680" height="204" role="img" aria-label="前后台域名分流与源站隔离关系示意" style="display:block;width:100%;max-width:680px;height:auto"><rect x="1" y="1" width="678" height="202" rx="8" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/><line x1="20" y1="102" x2="452" y2="102" stroke="var(--vp-c-divider)" stroke-dasharray="4 4"/><rect x="20" y="22" width="192" height="60" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="116" y="46" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="13" font-weight="600">前台域名（访客）</text><text x="116" y="66" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">status.example.com（示例）</text><line x1="218" y1="52" x2="258" y2="52" stroke="var(--vp-c-brand-1)" stroke-width="2"/><polygon points="256,47 264,52 256,57" fill="var(--vp-c-brand-1)"/><rect x="268" y="22" width="184" height="60" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="360" y="45" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="12" font-weight="600">前台反代片段</text><text x="360" y="65" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">放行状态页，后台与探针回 404</text><rect x="20" y="122" width="192" height="60" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="116" y="146" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="13" font-weight="600">后台域名（管理）</text><text x="116" y="166" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">admin.example.com（示例）</text><line x1="218" y1="152" x2="258" y2="152" stroke="var(--vp-c-brand-1)" stroke-width="2"/><polygon points="256,147 264,152 256,157" fill="var(--vp-c-brand-1)"/><rect x="268" y="122" width="184" height="60" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="360" y="145" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="12" font-weight="600">后台反代片段</text><text x="360" y="165" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">登录、主动探针、MCP、App</text><path d="M456 52 H480 V84 H496" fill="none" stroke="var(--vp-c-brand-1)" stroke-width="2"/><polygon points="494,79 502,84 494,89" fill="var(--vp-c-brand-1)"/><path d="M456 152 H480 V120 H496" fill="none" stroke="var(--vp-c-brand-1)" stroke-width="2"/><polygon points="494,115 502,120 494,125" fill="var(--vp-c-brand-1)"/><rect x="504" y="52" width="156" height="100" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="582" y="82" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="13" font-weight="600">源站面板</text><text x="582" y="105" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">127.0.0.1:5555（示例）</text><text x="582" y="126" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">关闭源站端口公网入站</text></svg><figcaption>前后台域名流量分流与源站隔离关系（示意）</figcaption></figure>

## 怎么用

### 准备两个 HTTPS 站点

准备两个不同域名解析到反代服务器，并配好 HTTPS 证书。预检固定走 `https://` 检测，未配好证书无法启用。

若把原单域名改作前台域名，已有主动节点切反代后会掉线。先按下方折叠说明迁移上报地址，再替换前台反代。

::: details 已有主动模式节点时，先迁移上报地址再切反代
前台反代会拦截探针上报，连向原单域名的主动节点会离线。

1. 先建好后台域名站点，按下一节粘贴后台片段并开启 HTTPS。
2. 在 [管理服务器](/server-management) 点主动节点「编辑 → 连接方式」。
3. 把「上报地址」改为 `https://后台域名` 并保存，等待切换完成。
4. 若在「主动探针」或 [接入节点](/agent-guide) 手填过旧域名，改为后台域名或清空。
:::

### 生成并替换反代片段

由面板按域名生成反代规则，不要手写或照搬旧配置。

<figure><img src="/domain-split-manual-snippets.webp" alt="在「前后台域名分离」点「生成反代片段」，再点对应卡片的「复制」"><figcaption>在「前后台域名分离」点「生成反代片段」，再点对应卡片的「复制」</figcaption></figure>

1. 填好「前台域名」「后台域名」和「源站地址:端口」，点「保存草稿」。
2. 点「生成反代片段」，在下方对应卡片右上角点「复制」。
3. 按下方标签页把前台、后台片段填入两个站点并重载反代。

| 选项 | 作用 | 默认 |
|---|---|---|
| 「前台域名」 | 访客看状态页与打开分享链接的域名，不能与后台域名相同 | 空 |
| 「后台域名」 | 登录后台、主动探针上报、[远程 MCP](/mcp) 与 [iOS / macOS App](/apple-app) 连接的域名 | 空 |
| 「源站地址:端口」 | 反代转发到面板监听的内网或本机地址，必须带端口 | `127.0.0.1:5555` |

<DocTabs :tabs="['宝塔面板', '1Panel', '原生 Nginx', 'Caddy']">
<template #tab-0>

1. 在宝塔「网站」为前台、后台域名各建站点并配好 SSL。
2. 在两个站点打开「反向代理」，各建一条指向源站的反代。
3. 在前台站点点右侧「配置文件」，换入「宝塔 / 1Panel 前台片段」并保存。
4. 在后台站点点右侧「配置文件」，换入「宝塔 / 1Panel 后台片段」并保存。

<figure><img src="/bt-proxy-config-entry.png" alt="在宝塔站点「反向代理」列表点右侧「配置文件」替换片段"><figcaption>在宝塔站点「反向代理」列表点右侧「配置文件」替换片段</figcaption></figure>

只替换反向代理规则，不改站点的 `server {}`。同一个站点不要保留两条反代。

</template>
<template #tab-1>

1. 在 1Panel「网站」为前台、后台域名各建反向代理站点并开启 HTTPS。
2. 在前台站点打开「反向代理」点「源文」，换入「宝塔 / 1Panel 前台片段」并保存。
3. 在后台站点打开「反向代理」点「源文」，换入「宝塔 / 1Panel 后台片段」并保存。

<figure><img src="/1panel-proxy-config-entry.png" alt="在 1Panel「网站 → 反向代理」点右侧「源文」替换片段"><figcaption>在 1Panel「网站 → 反向代理」点右侧「源文」替换片段</figcaption></figure>

只替换反代片段，不改外层 `server {}`。同一个站点不要保留两条反代。

</template>
<template #tab-2>

1. 复制「原生 Nginx 前台片段」与「原生 Nginx 后台片段」，存为两个 `.conf` 文件。
2. 在两份 `server {}` 内，按证书路径补上 `443 ssl` 监听与 SSL 配置。
3. 执行 `nginx -t` 校验通过后重载 Nginx。

原生片段已是完整的 `server {}` 配置。不要把它塞进其他已有的 `server {}` 里。

</template>
<template #tab-3>

1. 复制面板生成的「Caddy」片段，粘贴到 `Caddyfile`。
2. 保留前台块顶部的 `@blocked` 两行，把下半段改成下方写法：

   ```caddyfile
   status.example.com {
     @blocked path ...（保留面板生成的这一整行）
     respond @blocked 404

     reverse_proxy 127.0.0.1:5555 {
       header_up Host status.example.com
       header_up X-Forwarded-Host status.example.com
       header_up X-Forwarded-Proto {scheme}
     }
   }
   ```

3. 把域名与源站地址换成面板填的值，重载 Caddy 等证书生效。

</template>
</DocTabs>

### 预检、启用与封禁源站端口

反代生效后回面板执行预检，10 项全过才会启用分离。

<figure><img src="/domain-split-manual-enable.webp" alt="点「预检并启用」核对「预检结果」全部通过"><figcaption>点「预检并启用」核对「预检结果」全部通过</figcaption></figure>

1. 点「预检」，确认下方「预检结果」10 项全部显示「通过」。
2. 点「预检并启用」，「当前模式」变为「分离模式」，「当前状态」变为「已启用」。
3. 在防火墙与安全组关闭源站端口（如 `5555`）公网入站，只留 `80` 和 `443`。
4. 用 `https://后台域名` 登录后台，确认前台能看状态页、开 `/admin` 报 `404`。

| 操作 | 作用 |
|---|---|
| 「保存草稿」 | 保存域名与源站地址，同时把状态置为「未启用」 |
| 「生成反代片段」 | 按所填域名与源站地址生成宝塔 / 1Panel、原生 Nginx 和 Caddy 片段 |
| 「预检」 | 检测域名解析、源站连通、前台拦截与后台可达，不改启用状态 |
| 「预检并启用」 | 重新跑完 10 项预检，全部通过后切为「分离模式」 |
| 「关闭分离」 | 立即停用分离恢复「兼容单域名」，保留已填域名配置 |

::: warning 注意
必须关闭源站端口公网入站，否则外部能绕过反代直连面板。请勿删改反代片段里的 `Host`、`X-Forwarded-Host` 与 `X-Forwarded-Proto` 请求头。
:::

::: details 启用后的联动变化与关闭回退
前台域名隐藏顶栏与口令页登录入口。即使浏览器已登录，打开前台域名也按访客视角展示。

[访问控制与分享](/access-control) 新建的链接，会自动用前台域名。[托管展示页](/showcase) 也按前台访客视图同步。

要回退单域名时，从后台域名登录点「关闭分离」。随后把两个站点的反代改回原来的单域名配置。
:::

## 常见问题

::: details 「预检」提示请求失败或状态码不符合预期
预检固定走 `https://` 探测，先确认两域名 DNS 已生效且证书正常。

拦截项未通过时，确认前台已换前台片段并重载反代，且无残留旧反代。域名开了 Cloudflare 质询拦截时，先放行面板服务器 IP 或暂切「仅 DNS」。
:::

::: details 启用分离后，主动模式节点变成离线
前台反代会拦截探针上报，仍连向前台域名的主动探针会收到 `404`。

从后台域名进 [管理服务器](/server-management)，在节点「编辑 → 连接方式」重装探针即可恢复。后台生成的命令默认连向后台域名。
:::

::: details 用 Caddy 反代时，预检通过但打开前台首页报 404
默认「Caddy」片段末尾单独的 `respond 404` 优先级更高，会拦截整个前台。

按上文「Caddy」标签页删掉末尾 `respond 404`，合并成一条 `reverse_proxy` 后重载。
:::

::: details 前台打开登录页报 404，或后台域名故障进不去后台
分离模式下前台固定屏蔽 `/login` 与 `/admin`，请用 `https://后台域名` 登录。

后台故障时放行面板端口，打开 `http://服务器地址:端口/login` 直连点「关闭分离」。忘记密码或登录入口见 [进不去后台怎么办](/login-management)。
:::

::: details 启用分离后，远程 MCP 或 App 无法连接
开启分离后，前台域名会拒绝 MCP 与 App 请求。

从后台域名打开「设置中心」，在 [远程 MCP](/mcp) 重复制地址，或在 [iOS / macOS App](/apple-app) 重扫码。
:::
