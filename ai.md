# AI 功能

一句话替你排查节点异常并改好面板设置，每一步操作都可控。服务器卡了问一句就找出高占用进程，月底问一句就列出待续费机器。

本页功能需付费版（各档仅差节点数，见 [价格说明](https://dstatus.sh/pricing)）。外部客户端接入见 [远程 MCP](/mcp)。

## 在哪打开

共用「设置中心 → AI 服务」的配置。测平台解锁无需配 AI，见 [流媒体检测](/monitor#流媒体检测)。

| 想做什么 | 用哪个入口 |
|---|---|
| 查全站状态、加改节点、改面板设置或在节点跑命令 | 页面右侧「AI 助手」（`⌘J` / `Ctrl + J`）或 [App](/apple-app) |
| 对着单台服务器跑命令、改配置文件、看输出排障 | 节点详情「终端」标签右侧「AI 助手」 |
| 不开电脑，在手机上查状态、收建议并确认执行 | Telegram 机器人私聊 |
| 一键汇总全站近 24 小时异常与处理顺序 | 后台「工具 → 高级分析」的「AI 解读」 |
| 看不懂面板运行报错，查原因与处理步骤 | 后台「工具 → 日志管理」问题详情的「让 AI 解释」，见 [工具](/tools#日志管理) |

## 怎么用

### 先配置 AI 服务

用授权附带的「内置AI」，或接入自有接口。

1. 打开「设置中心」，点「AI 服务」。
2. 点「内置AI」的「编辑」，或点「添加配置」。
3. 打开「启用该配置用于 AI 分析」，点「保存配置」。
4. 回列表点「设为当前」，点「测试」确认连通。

| 选项 | 作用 | 默认 |
|---|---|---|
| 「内置AI」 | 用授权附带的额度，免填密钥；可在用户中心看「AI 用量」 | 已内置，需启用 |
| 「由许可证管理端统一设置默认模型」 | 内置 AI 跟随官方默认模型；取消勾选后可手填模型名 | 勾选 |
| 「提供商预设」 | 自有接口选 OpenAI、Gemini、Azure OpenAI 或「自定义」 | OpenAI |
| 「Base URL」/「Model / Deployment」/「API Key」 | 填写自有服务商的接口地址、模型名与密钥 | — |

### 两个对话入口的执行档位

默认用「确认后执行」，每一步都看得到。

| 档位与按钮 | 右侧「AI 助手」 | 终端「AI 助手」 |
|---|---|---|
| 「确认后执行」（默认） | 查数据直接查；跑命令、测解锁、改设置前先出确认卡 | 每条命令和改文件前都先出确认卡，写明作用与影响 |
| 「自动执行」 | 常规命令与检测直接跑；改节点、写文件与高危命令仍需确认 | 查看类命令与你明确要求的操作直接跑；高危命令仍需确认 |
| 确认卡按钮 | 点「执行」或「不执行」 | 点「运行」或「不运行」，运行中随时可点「停止」 |

### AI 助手

在任意页面打开侧边栏。可问「即将到期的服务器」或「把香港的节点都加进『亚太』分组」。

服务器卡了，在节点详情「负载详情」旁点「问 AI」，会带上当前负载一起问，再说「这台为什么卡」。要在服务器上查进程，先给节点配好 SSH。

1. 点右侧「AI 助手」，或按 `⌘J`、`Ctrl + J` 打开。
2. 输入问题，或点输入框上方的示例提问。
3. 出确认卡时点「执行」或「不执行」。

改完后当前页自动刷新，历史对话与 [App](/apple-app) 同步。

::: details 带上当前页面、密码安全输入与额度提示
输入框默认带上当前页面或节点，点「×」可取消。负载图、节点抽屉、通知事件和网络详情里，也可点「问 AI」。

要填服务器密码或私钥时，会弹出「安全输入」卡。密码只存主控内存，AI 只拿到临时代号。

在输入框粘贴密码或密钥时，发送前也会弹窗提醒。点「改用安全方式发送」，密码会换成临时代号发出。

改服务器文件前会自动备份原文件，用「内置AI」时显示剩余额度。右侧悬浮按钮可拖动贴边，右上角可开「新对话」或看「历史对话」。
:::

### 终端 AI 助手

针对单台节点排障。可问「这台机器为什么卡，找出占用最高的进程」或「查看最近的报错日志」。

1. 在 [管理服务器](/server-management) 配好 SSH，或点终端「连接设置」填临时连接。
2. 打开节点「终端」标签，在右侧「AI 助手」提问。
3. 出确认卡时点「运行」或「不运行」，随时可点「停止」。

::: details 历史对话、替换处理方式与终端全局设置
不想运行确认卡里的命令时，可直接输入其他做法跳过。右上角可开「新对话」或看「历史对话」，回答下可点「重新回答」。

在「设置中心 → AI 服务」底部的「终端 Agent 全局设置」改好后，点「保存终端设置」：

| 选项 | 作用 | 默认 |
|---|---|---|
| 「启用联网搜索」 | 允许终端 AI 调用搜索（需自有兼容接口） | 关闭 |
| 「搜索次数上限」/「工具调用次数上限」 | 限制每轮提问的搜索与工具调用总次数 | 5 / 30 |
| 「专用 Model（可选）」 | 给终端单独指定模型，留空跟随当前配置 | 留空 |
:::

### Telegram

在私聊里提问，能力同网页「AI 助手」。可发「哪些节点离线了」或「最近 24 小时有哪些告警」。

1. 去 [配置通知](/notification-settings) 开启 Telegram，填好私聊 Chat ID。
2. 在机器人私聊发问题，确认时点「执行」或「不执行」。

| 操作 | 作用 |
|---|---|
| 菜单「开始新对话」（或发 `/new`） | 清空当前上下文，开始新对话 |
| 菜单「使用说明」（或发 `/help`） | 查看用法说明与提问示例 |
| 发 `/summary` | 查看长对话自动整理的会话摘要 |

### AI 解读

一键回答「最近 24 小时有哪些异常要先处理」，列出待处理项与建议。

<figure><img src="/ai-analytics-card.webp" alt="「工具 → 高级分析」页中的「AI 解读」卡片与「开始解读」按钮"><figcaption>「工具 → 高级分析」页中的「AI 解读」卡片与「开始解读」按钮</figcaption></figure>

1. 打开「工具 → 高级分析」，点「开始解读」。
2. 等 20 至 60 秒生成结果，需要时点「重新解读」。

::: details 解读结果包含哪些部分
顶部展示「AI 结论」，下方列出「需要处理」和「值得关注」。中间给出「建议处理顺序」，展开单条可看建议与依据。
:::

## AI 是怎么工作的

各入口共用同一套能力清单与权限护栏。命令经面板 SSH 在节点运行，结果脱敏后回到对话。

<figure><svg viewBox="0 0 680 148" width="680" height="148" role="img" aria-label="AI 请求从入口经能力清单、权限确认到 SSH 执行的流程示意" style="display:block;width:100%;max-width:680px;height:auto"><rect x="1" y="1" width="678" height="146" rx="8" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)"/><rect x="16" y="20" width="136" height="84" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="84" y="44" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="13" font-weight="600">对话入口</text><text x="84" y="64" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">网页 / 终端 AI / App</text><text x="84" y="82" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">Telegram / 远程 MCP</text><line x1="154" y1="62" x2="180" y2="62" stroke="var(--vp-c-brand-1)" stroke-width="2"/><polygon points="178,57 186,62 178,67" fill="var(--vp-c-brand-1)"/><rect x="188" y="20" width="144" height="84" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="260" y="44" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="13" font-weight="600">同一套能力清单</text><text x="260" y="64" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">查数据 / 跑命令</text><text x="260" y="82" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">读写文件 / 改设置</text><line x1="334" y1="62" x2="360" y2="62" stroke="var(--vp-c-brand-1)" stroke-width="2"/><polygon points="358,57 366,62 358,67" fill="var(--vp-c-brand-1)"/><rect x="368" y="20" width="140" height="84" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="438" y="44" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="13" font-weight="600">权限与确认</text><text x="438" y="64" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">代码判定风险档位</text><text x="438" y="82" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">密码走安全输入代号</text><line x1="510" y1="62" x2="536" y2="62" stroke="var(--vp-c-brand-1)" stroke-width="2"/><polygon points="534,57 542,62 534,67" fill="var(--vp-c-brand-1)"/><rect x="544" y="20" width="120" height="84" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)"/><text x="604" y="44" text-anchor="middle" fill="var(--vp-c-text-1)" font-size="13" font-weight="600">服务器执行</text><text x="604" y="64" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">面板 SSH 连接</text><text x="604" y="82" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">写文件前自动备份</text><path d="M 604 106 L 604 128 L 84 128 L 84 108" fill="none" stroke="var(--vp-c-divider)" stroke-width="1.5" stroke-dasharray="4 4"/><polygon points="80,110 84,102 88,110" fill="var(--vp-c-text-2)"/><text x="344" y="123" text-anchor="middle" fill="var(--vp-c-text-2)" font-size="11">执行结果与输出脱敏后回到对话</text></svg><figcaption>AI 从提问、确认到在服务器执行命令的流程（示意）</figcaption></figure>

| 你关心的事 | 面板怎么做 |
|---|---|
| 模型与接口 | 可用授权附带的「内置AI」，或自填 OpenAI、Gemini、Azure OpenAI 与兼容接口；模型接入基于开源的 Vercel AI SDK |
| 防误操作与安全输入 | 命令风险由面板代码判定，格式化磁盘、删系统目录、关机等高危命令一律先确认；密码和私钥走「安全输入」，只存主控内存、AI 只拿临时代号 |
| 备份、时效与记录 | 改写节点文件前自动在 `.dstatus/file-backups/` 留最近 3 份备份；全局与 Telegram 确认卡 5 分钟内单次有效（终端运行上下文 30 分钟有效）；终端命令与确认记入审计日志，远程 MCP 写操作记入「调用记录」 |
| 数据发给谁 | 只发你的问题、相关面板白名单数据和命令输出，后台密码、SSH 私钥、API Key 与探针通信密钥绝不发给模型；「内置AI」经官方授权服务转发，自填接口由你的主控直连所填地址 |
| 能做与不能做 | 没配 SSH 或关了「网页终端」的节点不能跑命令和改文件；Telegram 只在私聊响应，群聊不启用；「内置AI」额度用完后按提示时间恢复，或切到自有接口 |

::: details 安全输入时效、自动执行限制与本地调用统计
「安全输入」链接 30 分钟内待填有效。填好后 30 分钟内可用，每次使用顺延 30 分钟（最长 2 小时）。

右侧「AI 助手」在对话里读过外部网页后，后续改动仍会弹窗确认。参数带有安全输入代号时，在「自动执行」下也必须先确认。

「AI 解读」只向模型发送节点状态、负载、流量和告警的白名单摘要。摘要不含节点 IP、主机名和配置原文。

主控本地日志只记录每次 AI 调用的场景、轮数、用量与耗时统计。日志不记录提问和回答正文。
:::

## 常见问题

::: details 提示「当前套餐不包含 AI 分析」或无法用自有接口
去「授权管理」核对当前套餐。免费版不含 AI 功能，现在售卖的付费版都包含。
:::

::: details 节点详情里没有「终端」标签或右侧「AI 助手」
未登录管理员时不会显示，请先登录后台。仍不显示时，去「设置中心」打开「网页终端」。
:::

::: details 在网页终端里按快捷键打不开「AI 助手」侧边栏
光标在终端画面内时，按键会发给远程服务器。先点终端外空白处，再按 `⌘J` 或 `Ctrl + J`。
:::

::: details Telegram 私聊机器人提示「未授权」或没反应
在「通知管理」打开 Telegram，确认渠道已启用。填进「Chat ID 列表」保存，群聊 ID 不生效。
:::

::: details 「内置AI」额度用完了怎么办
等提示时间自动恢复，或去用户中心看「AI 用量」。套餐支持时，可在「AI 服务」添加自有接口并设为当前。
:::
