# 托管展示页

由 DStatus 托管公开状态页，访客经托管域名查看节点，不暴露主控地址。开通后可关闭主控公网入站，访客请求由托管服务承载。

## 在哪打开

包含该功能的许可证可免费使用一年，在面板后台或用户中心均可管理。

| 操作 | 作用 |
|---|---|
| 面板后台左侧「授权管理」→「托管展示页」 | 开通展示页、看实时连接与在线访客、绑定自定义域名、开关访问 |
| [用户中心](https://client.vps.mom)「仪表盘」→「详情」→「托管展示页」 | 远程开通、复制访问地址、绑定自定义域名、开关展示页 |

<figure><svg viewBox="0 0 680 124" width="680" height="124" role="img" aria-label="访客只连接托管服务，主控单向连出推送数据示意" style="display:block;width:100%;max-width:680px;height:auto"><rect x="1" y="1" width="678" height="122" rx="8" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/><rect x="20" y="20" width="176" height="84" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="108" y="46" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="13" font-weight="600">访客浏览器</text><text x="108" y="68" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">打开托管地址或自定义域名</text><text x="108" y="86" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">看不到主控 IP 与域名</text><text x="224" y="52" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="10">HTTPS</text><line x1="202" y1="62" x2="242" y2="62" stroke="var(--vp-c-brand-1)" stroke-width="2"/><polygon points="240,57 248,62 240,67" fill="var(--vp-c-brand-1)"/><rect x="252" y="20" width="180" height="84" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="342" y="46" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="13" font-weight="600">DStatus 托管服务</text><text x="342" y="68" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">demo-site.example.net（示例）</text><text x="342" y="86" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">承载全部访客请求与实时推送</text><text x="460" y="52" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="10">单向连出</text><line x1="482" y1="62" x2="442" y2="62" stroke="var(--vp-c-brand-1)" stroke-width="2"/><polygon points="444,57 436,62 444,67" fill="var(--vp-c-brand-1)"/><rect x="488" y="20" width="172" height="84" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="574" y="46" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="13" font-weight="600">你的主控面板</text><text x="574" y="68" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">仅推送 1 份公开游客数据</text><text x="574" y="86" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">可关闭公网入站端口</text></svg><figcaption>访客只连接托管服务，主控单向连出推送数据（示意）</figcaption></figure>

## 怎么用

### 开通展示页

在面板后台或用户中心填写可选子域名，一键生成托管访问地址。

<DocTabs :tabs="['在面板里开通', '在用户中心开通']">
<template #tab-0>

1. 登录面板后台，点左侧「授权管理」，找到「托管展示页」卡片。
2. 「子域名（可选）」留空自动分配，或填 1–32 位小写字母、数字和连字符。
3. 点「开通」，数秒后卡片显示「在线」，「同步状态」变为「已连接」。
4. 点「打开展示页」核对页面，再点「复制地址」发给访客。

</template>
<template #tab-1>

1. 登录 [用户中心](https://client.vps.mom)，在「仪表盘」点许可证卡片上的「详情」。
2. 切到右侧抽屉「托管展示页」页签，按需填子域名，点「开通」。
3. 主控 5 分钟内自动连上，或回面板点「更多操作 → 刷新状态」。
4. 在「访问地址」点「打开」核对页面，再点「复制」发给访客。

</template>
</DocTabs>

自定义子域名首尾不用连字符。卡片显示「未包含」时点「查看套餐」，见 [获取与激活授权](/license-management)。

### 绑定自定义域名

把你自己的子域名解析到托管服务，HTTPS 证书由系统自动签发。

1. 选未解析过主控的子域名（如 `status.example.com`），且与主控不同主域。
2. 按卡片提示的目标地址添加 CNAME 解析，Cloudflare 设为「仅 DNS」。
3. 在「自定义域名」填入完整子域名，点「绑定」。
4. 状态从「等待生效」变为「已生效」后，「访问地址」自动换成该域名。

::: details 解绑域名与同主域安全提醒
超过 7 天未完成解析验证会自动解除。点右侧「解绑」并确认即切回默认托管地址，连接不中断。

域名与主控同属一个主域时，公开证书记录可查出同域子域名。主控未套 CDN 隐藏真实 IP 时建议换域名，仍要使用可点「仍要绑定」。

自定义域名有效期跟随展示页，不单独计时。
:::

### 控制公开内容与保护主控

托管页只展示公开首页的游客内容，开通后可收紧主控入站访问。

| 操作 | 作用 |
|---|---|
| 节点编辑页「基本信息 → 节点权限」 | 设为「私有」或「停用」后不在托管页显示，见 [管理服务器](/server-management) |
| 「个性化 → 游客可见范围」 | 控制访客能否看「节点详情」「服务器标签」和「资产金额」，见 [外观与个性化](/personalization) |
| 「个性化 → 导航与页脚」 | 设为「仅管理员」或「不显示」的页面与节点标签，在托管页同样隐藏 |
| 服务器防火墙与安全组 | 主控主动连出推送数据，可关闭主控公网端口，只放行自己和节点的 IP |

「个性化」的配色、壁纸与模块开关自动同步。托管页固定使用官方页面，不套用「插件」里启用的访客页主题。

::: warning 注意
「安全访问 → 访问控制」须保持「公开模式」，见 [访问控制与分享](/access-control)。改设「口令模式」或「严格私有」后，托管页将无法读取数据。

自动发现节点默认用主机名，请先在 [管理服务器](/server-management) 改名。勿在节点名或链接里手写主控 IP 与域名。
:::

### 日常管理

在「托管展示页」卡片查看运行状态，或随时暂停与恢复对外访问。

<figure><svg viewBox="0 0 680 278" width="680" height="278" role="img" aria-label="授权管理页托管展示页卡片的指标与操作位置示意" style="display:block;width:100%;max-width:680px;height:auto"><rect x="1" y="1" width="678" height="276" rx="8" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/><text x="24" y="38" fill="var(--vp-c-text-1)" font-size="15" font-weight="600">托管展示页</text><rect x="110" y="22" width="42" height="22" rx="11" fill="rgba(16,185,129,0.14)"/><text x="131" y="37" text-anchor="middle" fill="var(--vp-c-green-1)" font-size="11" font-weight="600">在线</text><rect x="516" y="20" width="96" height="28" rx="6" fill="var(--vp-c-brand-1)"/><text x="564" y="38" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="500">打开展示页</text><rect x="620" y="20" width="36" height="28" rx="6" fill="var(--vp-c-bg)" stroke="var(--vp-c-brand-1)" stroke-width="1.5"/><text x="638" y="38" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="14" font-weight="600">⋯</text><rect x="24" y="60" width="632" height="52" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="38" y="80" fill="var(--vp-c-text-2)" font-size="11">访问地址</text><text x="38" y="100" fill="var(--vp-c-text-1)" font-size="13" font-weight="600">demo-site.example.net（示例）</text><rect x="560" y="72" width="82" height="28" rx="6" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/><text x="601" y="90" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="12">复制地址</text><rect x="24" y="122" width="632" height="60" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="38" y="140" fill="var(--vp-c-text-2)" font-size="11">自定义域名</text><rect x="38" y="146" width="536" height="28" rx="6" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/><text x="50" y="164" fill="var(--vp-c-text-2)" font-size="12">status.example.com（示例）</text><rect x="584" y="146" width="58" height="28" rx="6" fill="var(--vp-c-brand-1)"/><text x="613" y="164" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="500">绑定</text><rect x="24" y="194" width="200" height="66" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="38" y="214" fill="var(--vp-c-text-2)" font-size="11">同步状态</text><circle cx="43" cy="233" r="4" fill="var(--vp-c-green-1)"/><text x="53" y="238" fill="var(--vp-c-text-1)" font-size="14" font-weight="600">已连接</text><text x="38" y="253" fill="var(--vp-c-text-2)" font-size="11">实时同步</text><rect x="240" y="194" width="200" height="66" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="254" y="214" fill="var(--vp-c-text-2)" font-size="11">在线访客</text><text x="254" y="238" fill="var(--vp-c-text-1)" font-size="14" font-weight="600">3 人（示例）</text><text x="254" y="253" fill="var(--vp-c-text-2)" font-size="11">当前正在访问展示页</text><rect x="456" y="194" width="200" height="66" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="470" y="214" fill="var(--vp-c-text-2)" font-size="11">免费期至</text><text x="470" y="238" fill="var(--vp-c-text-1)" font-size="14" font-weight="600">2027-10-01（示例）</text><text x="470" y="253" fill="var(--vp-c-text-2)" font-size="11">剩余 30 天内标黄提醒</text></svg><figcaption>「授权管理」页「托管展示页」卡片的指标与操作位置（示意）</figcaption></figure>

| 操作 | 作用 |
|---|---|
| 「打开展示页」/「复制地址」 | 新窗口预览托管页面，或复制当前对外访问地址 |
| 「同步状态」 | 「已连接」为实时同步；「连接中断」时显示上次数据，可点「重新连接」 |
| 「在线访客」/「免费期至」 | 查看当前浏览人数与免费截止日，剩余 30 天内标黄提醒 |
| 「更多操作」→「刷新状态」 | 立即向授权服务器同步最新状态、到期时间与域名进度 |
| 「更多操作」→「关闭展示页」 | 暂停访问并向访客显示关闭提示；点「重新开启」立即恢复，地址不变 |

用户中心「托管展示页」底部，也可点「关闭展示页」或「重新开启」。

## 常见问题

::: details 「同步状态」一直显示「连接中断」或「未连接」
点卡片「重新连接」或「更多操作 → 刷新状态」，确认主控能访问外网。再去上方「当前套餐」卡核对许可证未过期，且「授权校验」为「正常」。
:::

::: details 打开托管地址无法浏览，或节点数据不更新
打开后台「安全访问 → 访问控制」，确认站点为「公开模式」。

若开了 [前后台域名分离](/domain-split-manual)，先确认前台域名预检通过。修好后回「授权管理」，点「更多操作 → 刷新状态」同步。
:::

::: details 自定义域名一直显示「等待生效」或自动解除
核对子域名已按卡片提示添加 CNAME 记录，Cloudflare 须设为「仅 DNS」。

解析生效后系统每分钟自动查验并签发证书。超过 7 天未通过会自动解除，修好解析后重新点「绑定」即可。
:::

::: details 托管页出现了不想公开的节点或机器主机名
在 [管理服务器](/server-management) 编辑该节点，把「基本信息 → 节点权限」改为「私有」。只想隐去机器主机名时，直接修改节点名称保存即可。
:::

::: details 卡片显示「已过期」或「已停用」
显示「已过期」说明免费期已结束，展示页暂停对外访问。显示「已停用」说明站点被限制，无法自行开启，请联系客服。
:::
