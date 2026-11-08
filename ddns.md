# 域名解析（DDNS）

节点换了公网 IP（如家宽重拨），面板自动更新 Cloudflare 的 A / AAAA 记录。免费版可用，Token 只加密存在面板，不用每台机器另装工具。

## 在哪打开

登录后台点左侧「插件」，在「插件市场」找到「域名解析（DDNS）」安装。

<figure><img src="/ddns-plugin-entry.webp" alt="左侧菜单「插件」与「插件市场」中的「域名解析（DDNS）」卡片"><figcaption>左侧菜单「插件」与「插件市场」中的「域名解析（DDNS）」卡片</figcaption></figure>

| 操作 | 作用 |
|---|---|
| 「插件」卡片点「安装」→「批准并安装」 | 安装并自动启动插件，随主控附带无需联网 |
| 「插件」卡片或「已安装」点「打开」 | 进入「域名解析（DDNS）」管理 Token 与绑定 |
| 节点编辑页「连接方式 → 前往 DDNS 管理」 | 插件运行中，从单台节点编辑页跳到 DDNS 页面 |
| 「个性化 → 后台菜单」开启「域名解析（DDNS）」 | 把入口固定到左侧「服务器管理 → 域名解析（DDNS）」，见 [外观与个性化](/personalization) |

<figure><img src="/ddns-plugin-install.webp" alt="在「扩展详情」抽屉查看权限后点右下角「批准并安装」"><figcaption>在「扩展详情」抽屉查看权限后点右下角「批准并安装」</figcaption></figure>

## 怎么用

### 创建并保存 Cloudflare Token

域名须托管在 Cloudflare，先创建 API Token 并存入面板。

1. 打开 [Cloudflare 控制台](https://dash.cloudflare.com) 右上角头像「我的个人资料 → API 令牌」，点「创建令牌」。

   <figure><img src="/ddns-cf-create.jpg" alt="在 Cloudflare「API 令牌」页右上角点「创建令牌」"><figcaption>在 Cloudflare「API 令牌」页右上角点「创建令牌」</figcaption></figure>

2. 在「编辑区域 DNS」模板右侧点「使用模板」。

   <figure><img src="/ddns-cf-template.jpg" alt="在「编辑区域 DNS」模板行点「使用模板」"><figcaption>在「编辑区域 DNS」模板行点「使用模板」</figcaption></figure>

3. 点「添加更多」补上「区域 · 区域 · 读取」，区域资源选指定域名。

   <figure><img src="/ddns-cf-permissions.jpg" alt="添加「区域 · 区域 · 读取」权限，并在「区域资源」选特定域名"><figcaption>添加「区域 · 区域 · 读取」权限，并在「区域资源」选特定域名</figcaption></figure>

4. 点「继续以显示摘要」，核对权限后点「创建令牌」。

   <figure><img src="/ddns-cf-summary.jpg" alt="核对令牌权限摘要后点右下角「创建令牌」"><figcaption>核对令牌权限摘要后点右下角「创建令牌」</figcaption></figure>

5. 点复制按钮保存 Token（关闭页面后不再显示）。

   <figure><img src="/ddns-cf-created.jpg" alt="点右侧复制按钮保存生成的 Token"><figcaption>点右侧复制按钮保存生成的 Token</figcaption></figure>

6. 回面板 DDNS 页面点「设置 Token」，粘贴后点「验证并保存」。

面板验证通过后加密保存，卡片显示末 4 位。点「测试」可查看该 Token 能管理的域名数量。

::: details 更换或清除 Token
Token 过期或缺权限时，点「更换」填入新 Token 并点「验证并保存」。因 Token 或域名权限暂停的记录会自动恢复。

还有绑定在用时，「清除 Token」按钮会置灰。需先解绑全部记录，才能点「清除 Token」移除凭据。
:::

### 绑定域名记录

节点接入并在线后（见 [接入节点](/agent-guide)），将子域名绑定到节点。

<figure><svg viewBox="0 0 680 236" width="680" height="236" role="img" aria-label="DDNS 页面的 Token 状态卡、绑定列表与行内操作示意" style="display:block;width:100%;max-width:680px;height:auto"><rect x="1" y="1" width="678" height="234" rx="8" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/><rect x="18" y="16" width="644" height="44" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="34" y="43" fill="var(--vp-c-text-1)" font-size="14" font-weight="600">域名解析（DDNS）</text><rect x="572" y="24" width="76" height="28" rx="6" fill="var(--vp-c-brand-1)"/><text x="610" y="42" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="500">新增绑定</text><rect x="18" y="70" width="644" height="54" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="34" y="93" fill="var(--vp-c-text-1)" font-size="13" font-weight="600">Cloudflare API Token</text><rect x="176" y="79" width="118" height="20" rx="10" fill="rgba(16,185,129,0.14)"/><text x="235" y="93" text-anchor="middle" fill="var(--vp-c-green-1)" font-size="11" font-weight="600">已设置 · 末 4 位 a1b2</text><text x="34" y="112" fill="var(--vp-c-text-2)" font-size="11">加密保存在主控，页面与接口不显示明文</text><rect x="550" y="83" width="44" height="26" rx="6" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/><text x="572" y="100" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="11">测试</text><rect x="602" y="83" width="46" height="26" rx="6" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/><text x="625" y="100" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="11">更换</text><rect x="18" y="134" width="644" height="86" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="34" y="156" fill="var(--vp-c-text-2)" font-size="11">记录</text><text x="172" y="156" fill="var(--vp-c-text-2)" font-size="11">节点</text><text x="304" y="156" fill="var(--vp-c-text-2)" font-size="11">已确认内容 / 节点地址</text><text x="462" y="156" fill="var(--vp-c-text-2)" font-size="11">状态</text><line x1="28" y1="165" x2="652" y2="165" stroke="var(--vp-c-divider)"/><text x="34" y="188" fill="var(--vp-c-text-1)" font-size="12" font-weight="600">home.example.com</text><rect x="142" y="175" width="20" height="18" rx="4" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/><text x="152" y="188" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="10">AAAA</text><circle cx="176" cy="184" r="3.5" fill="var(--vp-c-green-1)"/><text x="185" y="188" fill="var(--vp-c-text-1)" font-size="12">香港节点</text><text x="185" y="206" fill="var(--vp-c-text-2)" font-size="10">备用：新加坡节点</text><text x="304" y="188" fill="var(--vp-c-text-1)" font-size="11">2001:db8::10（示例）</text><text x="304" y="206" fill="var(--vp-c-text-2)" font-size="10">2 分钟前查询</text><rect x="462" y="175" width="38" height="20" rx="10" fill="rgba(16,185,129,0.14)"/><text x="481" y="189" text-anchor="middle" fill="var(--vp-c-green-1)" font-size="11" font-weight="600">正常</text><rect x="514" y="173" width="56" height="24" rx="5" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/><text x="542" y="189" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="11">立即同步</text><rect x="574" y="173" width="56" height="24" rx="5" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/><text x="602" y="189" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="11">修改节点</text><rect x="634" y="173" width="20" height="24" rx="5" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/><text x="644" y="189" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="12">⋮</text></svg><figcaption>DDNS 页面的 Token 状态卡、绑定列表与行内操作（示意）</figcaption></figure>

1. 点右上角「新增绑定」，选「节点」，按需选「备用节点（可选）」。
2. 填完整「记录名」（如 `home.example.com`），选 `A` 或 `AAAA`。
3. 核对下方「绑定预览」；记录不存在时勾选「新建这条记录」。
4. 点「绑定」（新建记录时点「新建并绑定」）。

| 选项 | 作用 | 默认 |
|---|---|---|
| 「节点」 | 记录跟随的在线主节点，只写入合法公网地址 | — |
| 「备用节点（可选）」 | 主节点不可用满 3 分钟切到备用，恢复稳定 10 分钟切回 | 「不设置」 |
| 「记录名」 | 完整域名（如 `home.example.com`），自动匹配所属域名 | — |
| 「记录类型」 | 「A（跟随 IPv4）」或「AAAA（跟随 IPv6）」 | `A` |
| 「新建这条记录」 | Cloudflare 无此记录时新建（关闭代理、TTL 自动） | 未勾选 |
| 「手动填写 zone ID（Token 没有区域读取权限时）」 | 展开后填写「zone ID（32 位十六进制）」 | 折叠 |

同步只改记录内容，不改代理（橙色云朵）、TTL 和备注，不删记录。

### 备用节点与日常管理

主节点故障时可自动切到备用节点，列表支持按状态筛选与同步。

<figure><svg viewBox="0 0 680 120" width="680" height="120" role="img" aria-label="主节点与备用节点自动切换与切回流程示意" style="display:block;width:100%;max-width:680px;height:auto"><rect x="1" y="1" width="678" height="118" rx="8" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/><rect x="18" y="22" width="144" height="76" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="90" y="50" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="13" font-weight="600">主节点生效</text><text x="90" y="72" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">状态显示「正常」</text><text x="206" y="48" text-anchor="middle" fill="var(--vp-c-brand-1)" font-size="10">不可用满 3 分钟</text><line x1="168" y1="60" x2="244" y2="60" stroke="var(--vp-c-brand-1)" stroke-width="2"/><polygon points="242,55 250,60 242,65" fill="var(--vp-c-brand-1)"/><rect x="254" y="22" width="168" height="76" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="338" y="50" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="13" font-weight="600">切到备用节点</text><text x="338" y="72" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">显示「备用中」并发通知</text><text x="468" y="48" text-anchor="middle" fill="var(--vp-c-brand-1)" font-size="10">主节点稳定 10 分钟</text><line x1="428" y1="60" x2="508" y2="60" stroke="var(--vp-c-brand-1)" stroke-width="2"/><polygon points="506,55 514,60 506,65" fill="var(--vp-c-brand-1)"/><rect x="518" y="22" width="144" height="76" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="590" y="50" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="13" font-weight="600">自动切回主节点</text><text x="590" y="72" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">备用挂了且主可用则立回</text></svg><figcaption>主节点与备用节点自动切换与切回流程（示意）</figcaption></figure>

| 操作 | 作用 |
|---|---|
| 「立即同步」 | 立即向 Cloudflare 核对远端内容，并按需写入节点当前地址 |
| 「修改节点」 | 更换主节点、设置或清除备用节点，或将主备节点对调 |
| 「⋮ → 暂停自动更新」 | 手动暂停同步；暂停后行尾按钮变为「恢复」 |
| 「恢复」 | 预览远端现值与将写入地址，确认后覆盖外部改动并恢复更新 |
| 「⋮ → 解绑（Cloudflare 记录保留）」 | 停止同步并移除绑定，Cloudflare 上的 DNS 记录保留 |

::: details 记录状态说明、通知规则、停用卸载与 AI 管理
| 状态 | 含义 | 处理方式 |
|---|---|---|
| 「正常」 | Cloudflare 记录已是当前生效节点的地址 | 无需操作 |
| 「备用中」 | 主节点不可用，记录已切到备用节点 | 主节点稳定 10 分钟自动切回 |
| 「同步中」 | 节点地址已变，正在排队写入 Cloudflare | 稍候自动完成 |
| 「等待节点上报」 | 节点离线，或尚未上报合法的公网地址 | 检查节点在线状态与公网地址 |
| 「写入失败，重试中」 | 网络波动或限流，按 1、5、15、60 分钟退避重试 | 连续失败 4 次会发通知 |
| 「需处理」 | 记录被外部改删、域名无权限、Token 失效，或 30 分钟地址变 4 次 | 排查原因后点「恢复」或「更换」 |
| 「已暂停」 | 已手动暂停这条绑定的自动更新 | 需要时点「恢复」 |

需处理、恢复和主备切换会发通知。去 [配置通知](/notification-settings) 打开「插件：域名解析（DDNS）」，修改开关与渠道。

在「插件 → 已安装」停用插件会停止同步，Token 与绑定保留。卸载默认选「仅卸载」，重装后即可恢复原有绑定。

在 [AI 功能](/ai) 或 [远程 MCP](/mcp) 中，可读取、绑定、解绑、暂停恢复和同步记录。Token 只能在页面上填写。
:::

## 常见问题

::: details 公网 IP 变了，多久会写入 Cloudflare
探针在启动、每小时，以及重连面板或网卡地址变化时查公网 IP。面板每 60 秒扫描一次，2.3.5 及以上探针几分钟内写入（见 [升级 Agent](/agent-upgrade)）。

旧探针或 NAT 后的被动节点，最长约 1 小时发现变化。各地访客生效时间还受记录 TTL 影响。
:::

::: details 提示缺少「区域 › 区域 › 读取」权限
去 Cloudflare 给 Token 加上「区域 · 区域 · 读取」权限，回面板点「更换」保存。

不改权限时，展开「手动填写 zone ID（Token 没有区域读取权限时）」。填入域名概述页右侧的 32 位区域 ID 即可。
:::

::: details 绑定时提示已有 CNAME 或有多条同名记录
同名已有 CNAME 记录，或存在多条同类型记录时，面板会拒绝绑定。先在 Cloudflare 删掉冲突或多余记录，只留唯一一条再绑定。
:::

::: details 换服务器迁移节点时，记录为什么变成「需处理」
两台机器共用同一节点上报，30 分钟地址变满 4 次会自动暂停。先停掉旧服务器上的探针，装好新服务器后再点「恢复」。
:::

::: details 节点走代理出网、有多个公网 IP，或线路被封能切换吗
解析地址取探针上报的出口地址。

主节点离线或没有可用地址时，由备用节点接管；主节点在线时一直用主节点的地址。
:::

::: details 删除服务器节点后，Cloudflare 上的记录会被删吗
不会，Cloudflare 上的 DNS 记录始终保留。删除主节点会移除面板里的绑定，删除备用节点只清除备用设置。
:::
