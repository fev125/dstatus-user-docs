# 获取与激活授权

购买或兑换许可证，在面板激活以解锁更多节点与套餐功能。未激活时按免费版运行，最多接入 3 台节点。

## 在哪打开

按要办理的操作打开对应入口。

| 操作 | 作用 |
|---|---|
| [dstatus.sh/pricing](https://dstatus.sh/pricing) | 看价格、各版本节点数与当前优惠 |
| [用户中心](https://client.vps.mom)「套餐商店」 | 购买新许可证 |
| [用户中心](https://client.vps.mom)「仪表盘」 | 兑换激活码、复制密钥、生成部署命令、续费、升级或解绑 |
| 面板后台左侧「授权管理」 | 激活、校验、更换或解绑许可证，开通 [托管展示页](/showcase) |

<figure><svg viewBox="0 0 680 120" width="680" height="120" role="img" aria-label="从获取密钥、面板激活到换机解绑的完整流程" style="display:block;width:100%;max-width:680px;height:auto"><rect x="1" y="1" width="678" height="118" rx="8" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/><rect x="16" y="20" width="142" height="80" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="87" y="46" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="13" font-weight="600">1. 获取密钥</text><text x="87" y="68" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">用户中心购买或兑换</text><text x="87" y="86" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">点卡片密钥条复制</text><line x1="163" y1="60" x2="180" y2="60" stroke="var(--vp-c-brand-1)" stroke-width="2"/><polygon points="178,55 186,60 178,65" fill="var(--vp-c-brand-1)"/><rect x="188" y="20" width="142" height="80" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="259" y="46" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="13" font-weight="600">2. 绑定激活</text><text x="259" y="68" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">后台「授权管理」激活</text><text x="259" y="86" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">或部署开「带上密钥」</text><line x1="335" y1="60" x2="352" y2="60" stroke="var(--vp-c-brand-1)" stroke-width="2"/><polygon points="350,55 358,60 350,65" fill="var(--vp-c-brand-1)"/><rect x="360" y="20" width="142" height="80" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="431" y="46" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="13" font-weight="600">3. 续费升级</text><text x="431" y="68" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">用户中心原证办理</text><text x="431" y="86" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">保留原密钥与绑定</text><line x1="507" y1="60" x2="524" y2="60" stroke="var(--vp-c-brand-1)" stroke-width="2"/><polygon points="522,55 530,60 522,65" fill="var(--vp-c-brand-1)"/><rect x="532" y="20" width="132" height="80" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="598" y="46" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="13" font-weight="600">4. 换机迁移</text><text x="598" y="68" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">先解绑旧面板实例</text><text x="598" y="86" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">再去新面板激活</text></svg><figcaption>从获取密钥、面板激活到换机解绑的完整流程</figcaption></figure>

未激活时自动按免费版运行，激活许可证后按所购版本生效。现在售卖的付费版功能都一样，只差节点数和计费方式。

| 版本 | 节点上限 | 可用功能 |
|---|---|---|
| 免费版 | 3 台 | 基础监控、自动发现、[网络质量](/monitor)、路由与解锁检测、[账单与商家](/billing-report)、App 推送、大屏、[远程 MCP](/mcp) |
| 付费版 | 按版本，最多不限 | 免费版全部功能，另含网页终端、[AI 功能](/ai)、高级分析、自定义告警、API 访问、去掉品牌标识、[托管展示页](/showcase) |

## 怎么用

### 获取许可证

在 [用户中心](https://client.vps.mom) 购买套餐或兑换激活码，拿到许可证密钥。

1. 登录 [用户中心](https://client.vps.mom)。
2. 去「套餐商店」购买，或在「仪表盘」点「激活码」兑换。
3. 在「仪表盘」点许可证卡片上的密钥条，复制完整密钥。

### 激活许可证

新装面板可在部署时自动激活，已装好的面板在后台粘贴密钥激活。

<DocTabs :tabs="['在面板里激活', '新装时自动激活']">
<template #tab-0>

1. 登录面板后台，点左侧「授权管理」。
2. 在「当前套餐」卡的「许可证密钥」粘贴密钥，点「激活」。
3. 卡片显示套餐名称且「授权校验」为「正常」，即激活成功。

</template>
<template #tab-1>

1. 在用户中心「仪表盘」，点许可证卡片上的「部署」。
2. 在抽屉「带上密钥」行，开启「安装后自动激活本许可证」。
3. 点「复制命令」到服务器执行，装好即自动激活，见 [安装面板](/quick-start)。

</template>
</DocTabs>

### 查看状态与管理套餐

在「授权管理」的「当前套餐」卡，查看用量、续费升级或更换密钥。

<figure><svg viewBox="0 0 680 212" width="680" height="212" role="img" aria-label="授权管理页当前套餐卡片的指标与操作位置" style="display:block;width:100%;max-width:680px;height:auto"><rect x="1" y="1" width="678" height="210" rx="8" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/><text x="24" y="30" fill="var(--vp-c-text-2)" font-size="11">当前套餐</text><text x="24" y="50" fill="var(--vp-c-text-1)" font-size="15" font-weight="600">专业版套餐（示意）</text><rect x="332" y="24" width="92" height="28" rx="6" fill="var(--vp-c-brand-1)"/><text x="378" y="42" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="500">升级或续费</text><rect x="432" y="24" width="80" height="28" rx="6" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="472" y="42" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="12">重新校验</text><rect x="520" y="24" width="92" height="28" rx="6" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="566" y="42" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="12">更换许可证</text><rect x="620" y="24" width="36" height="28" rx="6" fill="var(--vp-c-bg)" stroke="var(--vp-c-brand-1)" stroke-width="1.5"/><text x="638" y="42" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="14" font-weight="600">⋯</text><rect x="24" y="68" width="200" height="68" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="38" y="88" fill="var(--vp-c-text-2)" font-size="11">节点</text><text x="210" y="88" text-anchor="end" fill="var(--vp-c-text-2)" font-size="11">剩余 38 台</text><text x="38" y="112" fill="var(--vp-c-text-1)" font-size="14" font-weight="600">12 / 50</text><rect x="38" y="122" width="172" height="5" rx="2.5" fill="var(--vp-c-bg-soft)"/><rect x="38" y="122" width="42" height="5" rx="2.5" fill="var(--vp-c-brand-1)"/><rect x="240" y="68" width="200" height="68" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="254" y="88" fill="var(--vp-c-text-2)" font-size="11">有效期</text><text x="254" y="112" fill="var(--vp-c-text-1)" font-size="14" font-weight="600">永久 / 到期日期</text><text x="254" y="127" fill="var(--vp-c-text-2)" font-size="11">剩余 30 天内提示续费</text><rect x="456" y="68" width="200" height="68" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="470" y="88" fill="var(--vp-c-text-2)" font-size="11">授权校验</text><text x="470" y="112" fill="var(--vp-c-text-1)" font-size="14" font-weight="600">正常</text><text x="470" y="127" fill="var(--vp-c-text-2)" font-size="11">断网 7 天内照常生效</text><text x="24" y="160" fill="var(--vp-c-text-2)" font-size="11">包含功能：基础监控 · 自动发现 · 网络质量监控 · WebSSH终端 · AI分析 …</text><line x1="24" y1="173" x2="656" y2="173" stroke="var(--vp-c-divider)"/><text x="24" y="194" fill="var(--vp-c-text-1)" font-size="12">▸ 许可证信息（展开复制密钥与实例 ID）</text><text x="656" y="194" text-anchor="end" fill="var(--vp-c-brand-1)" font-size="11">右上角「⋯」内含「解绑许可证」</text></svg><figcaption>「授权管理」页「当前套餐」卡片的指标与操作位置示意</figcaption></figure>

| 操作 | 作用 |
|---|---|
| 「升级或续费」 | 跳转用户中心办理原证续费或补差价升级，原密钥和绑定保持不变 |
| 「重新校验」 | 立即连接授权服务器同步最新套餐、节点上限与到期时间 |
| 「更换许可证」 | 打开抽屉填入「新的许可证密钥」，点「解绑并激活」直接替换 |
| 「更多操作」→「解绑许可证」 | 解绑当前面板并回到免费版，密钥可在新面板重新激活 |
| 「许可证信息」 | 点开查看脱敏密钥与「实例 ID」，点「复制」可复制完整内容 |

快到期或节点快满时，卡片顶部会出现「续费」或「升级套餐」入口。下方「托管展示页」卡片可一键开通公开状态页，见 [托管展示页](/showcase)。

::: details 「授权校验」状态与离线运行说明
续费或升级套餐后，点右上角「重新校验」即可立即同步最新权益。

| 页面显示 | 含义与处理 |
|---|---|
| 「正常」 | 已完成在线校验，套餐功能与节点上限正常生效 |
| 「离线运行」 | 暂连不上授权服务器，上次校验起 7 天内照常使用，超 7 天暂按免费版运行 |
| 「授权状态未知」 | 连不上授权服务器且本地无可用缓存，暂按免费版运行，网络恢复后点「重新校验」 |
:::

### 换服务器

一份许可证同一时间只绑定一个面板实例，换机前先解绑旧实例。

<DocTabs :tabs="['旧面板还能登录', '旧服务器无法登录']">
<template #tab-0>

1. 打开旧面板「授权管理」，点「当前套餐」卡右上角「更多操作」（「⋯」）。
2. 点「解绑许可证」，在弹窗点「解绑」。
3. 在新服务器安装面板，按上文粘贴密钥激活。

</template>
<template #tab-1>

1. 打开 [用户中心](https://client.vps.mom)「仪表盘」，找到对应许可证卡片。
2. 点卡片右上角「更多」（「⋯」）选「解绑」，在弹窗点「确认解绑」。
3. 在新服务器安装面板，按上文粘贴密钥激活。

</template>
</DocTabs>

连同节点和历史数据一起搬家，见 [升级、备份与迁移](/panel-migration)。

::: details 把许可证转移给其他账号
在用户中心「仪表盘」点卡片右上角「更多」，选「转移」并选「跨账户转移」。填目标邮箱与转移原因（至少 10 个字），点「提交申请」。

在左侧「我的申请」查进度，通过后自动解绑并生成新密钥。每个账号最多提交 5 次转移申请，已取消的不计入。
:::

## 常见问题

::: details 激活失败，提示「许可证密钥不完整」或「未找到该许可证」
回用户中心「仪表盘」，直接点许可证卡片上的密钥条重新复制。粘贴时确认密钥首尾完整，前后没有漏掉字符。
:::

::: details 提示「该许可证正在另一台主控上使用」
同一份密钥不能同时绑定两台面板。先按 [换服务器](#换服务器) 解绑旧实例，再回当前面板点「激活」。
:::

::: details 卡片顶部提示「实例凭据已失效」
恢复备份或实例信息变化后会出现此提示。直接点提示右侧的「重新激活」，即可用当前密钥恢复绑定。
:::

::: details 显示「授权状态未知」「离线运行」，或提示「激活结果未确认」
检查面板服务器能否访问外网，确认 DNS 解析与出站连接正常。稍等片刻或网络恢复后，点「当前套餐」卡右上角的「重新校验」。
:::

::: details 已激活许可证，却按免费版限制节点数和功能
先核对「有效期」是否已过期，以及「离线运行」是否已满 7 天。

再核对面板服务器系统时间，慢 1 小时以上会暂按免费版运行。开启系统时间同步校准后，点右上角「重新校验」即可恢复。
:::
