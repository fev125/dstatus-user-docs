# iOS / macOS App

在 iPhone 与 Mac 上看节点、开终端、问 AI 并收告警推送。iOS 与 macOS 原生客户端，目前公测中。

## 在哪打开

按要做的事打开客户端下载页或面板后台。

| 操作 | 作用 |
|---|---|
| [dstatus.sh/client](https://dstatus.sh/client) | 直接下载安装 macOS 版，或加入 iOS 版 TestFlight 公测（暂未上架 App Store） |
| [dstatus.sh/pricing](https://dstatus.sh/pricing) | 查看客户端首发权益与套餐范围 |
| 后台左侧「设置中心」的「服务与连接 → App 授权」 | 查看授权二维码与「配对文本」，改设备档位或撤销授权 |
| 后台左侧「通知管理 → 通知规则」的「App 推送 → 配置」 | 启停 App 推送、查看「推送服务」状态并逐台发测试推送 |

## 怎么用

### 连接面板

通过「扫码配对」或「账号登录」连接面板，也可先免部署试用。

<figure><img src="/apple-app-entry.webp" alt="「设置中心」的「服务与连接 → App 授权」入口"><figcaption>「设置中心」的「服务与连接 → App 授权」入口</figcaption></figure>

<DocTabs :tabs="['扫码或配对文本', '面板账号登录', '体验模式']">
<template #tab-0>

1. 在后台「设置中心」点「服务与连接 → App 授权」。
2. iPhone 打开 App 点「扫码配对 → 扫描二维码」，扫当前二维码。
3. Mac 或无法扫码时，在抽屉展开「配对文本」点「复制」。
4. 回 App 点「扫码配对」，填进「粘贴配对文本」后点「连接」。

<figure><img src="/apple-app-drawer.webp" alt="「App 授权」抽屉的「扫码授权」二维码与「配对文本」折叠栏"><figcaption>「App 授权」抽屉的「扫码授权」二维码与「配对文本」折叠栏</figcaption></figure>

二维码与「授权码」定时自动轮换，在「有效至」前使用即可。连接后设备会出现在下方「已授权设备」列表。

</template>
<template #tab-1>

1. 打开 App 点「账号登录」，填「面板地址」、「账号」与「面板登录密码」。
2. 自签 HTTPS 证书可打开「允许不受信任证书」，点「连接」。
3. 若面板开了两步验证，填「动态码或验证码」后点「验证并连接」。

账号登录拥有完整管理员权限，不计入后台「已授权设备」列表。两步验证配置见 [安全设置](/security-settings)。

</template>
<template #tab-2>

还没部署面板时，可在连接页直接试用（目前 iOS 版提供）。

1. 打开 App 点「进入体验模式」，用内置示例数据浏览功能。
2. 试用完毕点顶部横幅「退出」，或在「设置」点「退出体验模式」。

</template>
</DocTabs>

扫码配对的设备可在「已授权设备」改档位或撤销，立即生效：

| 选项 | 作用 | 默认 |
|---|---|---|
| 「完整代理」 | 可使用监控、节点终端与 SFTP、AI、通知收件箱和账单分析 | 默认 |
| 「只读」 | 仅看节点监控与普通通知，隐藏「终端」「AI」与「账单」入口 | — |
| 「撤销」 | 弹窗确认后立即作废设备凭证并断开连接，重连需重新配对 | — |

### 查看与管理节点

连接后可看节点状态，也能传文件和用 AI 排障。

<figure><svg viewBox="0 0 680 148" width="680" height="148" role="img" aria-label="DStatus App 连接面板、权限分档与能力示意" style="display:block;width:100%;max-width:680px;height:auto"><rect x="1" y="1" width="678" height="146" rx="8" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/><rect x="20" y="24" width="168" height="100" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="104" y="50" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="13" font-weight="600">DStatus 面板</text><text x="104" y="72" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">「App 授权」扫码 / 配对文本</text><text x="104" y="92" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">或面板账号密码登录</text><text x="104" y="110" text-anchor="middle" fill="var(--vp-c-text-3)" font-size="10">后台随时切换档位或「撤销」</text><line x1="194" y1="54" x2="246" y2="54" stroke="var(--vp-c-brand-1)" stroke-width="2"/><polygon points="244,49 252,54 244,59" fill="var(--vp-c-brand-1)"/><line x1="194" y1="98" x2="246" y2="98" stroke="var(--vp-c-divider)" stroke-width="2"/><polygon points="244,93 252,98 244,103" fill="var(--vp-c-text-3)"/><rect x="256" y="20" width="404" height="52" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="272" y="42" fill="var(--vp-c-text-1)" font-size="12" font-weight="600">「完整代理」/ 账号登录</text><text x="272" y="60" fill="var(--vp-c-text-2)" font-size="11">监控（状态 · IP · 网络） · 账单 · SSH 终端与 SFTP · 全局 AI 与通知</text><rect x="256" y="82" width="404" height="46" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="272" y="103" fill="var(--vp-c-text-1)" font-size="12" font-weight="600">「只读」设备</text><text x="272" y="119" fill="var(--vp-c-text-2)" font-size="11">仅查看节点监控与普通通知，不开放终端、AI 与账单分析</text></svg><figcaption>DStatus App 连接方式与设备授权档位关系（示意）</figcaption></figure>

| 操作 | 作用 |
|---|---|
| 「监控」 | 搜索或按组筛选节点，点进单台看「状态」「IP」「网络」三栏数据 |
| 监控页右上角账单图标 | 打开「账单」，按「概览」「分析」「节点」查到期与花费，见 [账单与商家](/billing-report) |
| 「终端」 | 连入节点 SSH（有 tmux 自动复用），底栏可点「重连」「SFTP」或「AI 协助」 |
| 「AI」 | 与网页端共用 [AI 功能](/ai) 会话查全站数据，执行命令或改设置前先出确认卡 |
| 「通知」 | 按「仅未读」「告警」「流量」「续费」等筛选通知，或点「全部已读」 |
| 「设置」 | 查连接与授权档位，开关「实时排序」与「接收当前面板推送」，退出或重连 |

::: details 节点收藏、SFTP 与 macOS 软件更新
iOS 版在节点列表长按点「收藏节点」，可把机器加入常用列表。

SFTP 支持浏览目录、「新建目录」、删除文件及导出分享。macOS 版可在「设置 → 软件更新」点「检查更新」在线升级。
:::

### 接收 App 推送告警

连接面板并授权系统通知后，开启渠道即可把告警推到锁屏。

<figure><img src="/apple-app-push-channel.webp" alt="「通知管理 → 通知规则」顶部的「App 推送 → 配置」与「通知设置」按钮"><figcaption>「通知管理 → 通知规则」顶部的「App 推送 → 配置」与「通知设置」按钮</figcaption></figure>

1. 在 App「设置」的「通知」一栏点「开启」，允许系统通知。
2. 打开后台「通知管理 → 通知规则」，在「App 推送」卡片点「配置」。
3. 打开「启用 App 推送」，在「已登记设备」对目标设备点「测试」。

<figure><img src="/apple-app-push-drawer.webp" alt="「App 推送」抽屉的「启用 App 推送」开关与下方「已登记设备」列表"><figcaption>「App 推送」抽屉的「启用 App 推送」开关与下方「已登记设备」列表</figcaption></figure>

4. 点右上角「通知设置」，在「默认发到」勾「App 推送」后点「保存策略」。

只想收部分告警时，在对应规则里单独加上「App 推送」，见 [配置通知](/notification-settings)。

::: details 推送状态核对、单面板开关与隐私保护
App「设置」的「通知」一栏显示权限状态。之前拒绝过时点「去设置」，到系统设置里打开。

切换不同面板时，可在 App「设置」关闭「接收当前面板推送」。关闭后只停收当前面板的锁屏推送。

安全通知在锁屏只显示通用提醒，点进收件箱可看正文。面板开启免打扰时，掉线与安全提醒仍照常推送。
:::

## 常见问题

::: details 「App 授权」提示「授权二维码暂不可用」或要求配置管理面地址
非本机访问时，配对码要求面板具备 HTTPS 地址。去 [设置中心](/system-settings) 把「站点网址」填成 `https://` 面板地址并保存，或用 HTTPS 访问后台。

开启了 [前后台域名分离](/domain-split-manual) 时，核对后台域名配置。
:::

::: details App 里看不到「终端」「AI」或「账单」入口
在后台「App 授权」查看设备档位，「只读」改为「完整代理」即可。
:::

::: details 「推送服务」显示「未就绪」或收不到推送
先去 [获取与激活授权](/license-management) 确认许可证已激活，锁屏推送依赖实例凭据。再核对 App「设置」里通知已开启，且规则已勾「App 推送」。
:::

::: details 提示配对二维码已过期或设备授权已失效
二维码与「配对文本」定时轮换且一次有效。回后台「App 授权」扫新码或重复制文本，被「撤销」的设备同样需重配。
:::
