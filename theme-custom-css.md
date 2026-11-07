# 自定义 CSS

用样式代码定制前台的配色、圆角、边框和阴影，不影响管理后台。也可以把本页发给 AI，让它按你的描述直接生成代码。

## 在哪打开

登录后台，点左侧「个性化」，在底部「高级」组找到「自定义 CSS」。常规配色、壁纸与毛玻璃设置见 [外观与个性化](/personalization)。

<figure><img src="/theme-custom-css-card.webp" alt="「个性化」底部「高级」组中的「自定义 CSS」卡片、「更多」按钮与开关"><figcaption>「个性化」底部「高级」组中的「自定义 CSS」卡片、「更多」按钮与开关</figcaption></figure>

## 怎么用

### 粘贴并启用样式

粘贴代码后会自动保存，打开卡片右侧开关即可在前台生效。

1. 让 AI 按下方提示词生成代码，或对照变量表自己编写。
2. 点「自定义 CSS」行的「更多」，把代码贴进「CSS 内容」。
3. 打开「自定义 CSS」右侧开关，刷新前台页面查看效果。

<figure><img src="/theme-custom-css-drawer.webp" alt="点「更多」打开「自定义 CSS」抽屉并在「CSS 内容」中输入代码"><figcaption>点「更多」打开「自定义 CSS」抽屉并在「CSS 内容」中输入代码</figcaption></figure>

| 选项 | 作用 | 默认 |
|---|---|---|
| 卡片右侧开关 | 开启或停用全站前台自定义样式；关闭后代码保留 | 关闭 |
| 「更多 → CSS 内容」 | 编辑样式代码（上限 128 KB），停手约 1.4 秒自动保存 | 空 |
| 前台「主题 → 自定义样式」 | 站方开启且有代码时出现；访客改本机显示，管理员改全站开关 | 开启 |

::: warning 注意
暂时停用时关掉「自定义 CSS」右侧开关，代码会保留。点「恢复默认外观」里的「恢复默认」，会一并清空已写的样式。

管理员在前台「主题」菜单关掉「自定义样式」，等同关闭全站开关。关闭后菜单不再显示这一项，需回后台重新打开。
:::

### 颜色变量与日夜写法

前台日间与夜间共用同一套变量名，按模式写在对应的根选择器里。

| 选择器 | 作用 |
|---|---|
| `:root:not(.dark) { }` | 日间（浅色模式）的颜色 |
| `:root.dark { }` | 夜间（深色模式）的颜色 |
| `:root { --accent-color: … }` | 全站强调色；日夜用不同颜色时按上面两项分写 |
| `:root[data-glass="on"]:not(.dark)` / `:root.dark[data-glass="on"]` | 开启毛玻璃且有壁纸时的卡片底色覆盖 |

写颜色时遵守下面三条规则，避免切换模式或开启毛玻璃时失效。

1. 日夜颜色分开写，只写 `:root` 会在夜间被系统默认色盖掉。
2. 改卡片底色 `--card-surface-bg` 时，把毛玻璃选择器一起写上。
3. 做整站暗色只改 `:root.dark` 并设默认「夜间」，日间刷黑会让图表深色字看不清。

```css
/* 日夜文字与卡片底色（同时覆盖实色与毛玻璃状态） */
:root:not(.dark), :root[data-glass="on"]:not(.dark) {
  --text-color: #1a1a2e;
  --card-surface-bg: rgba(255, 255, 255, 0.85);
}
:root.dark, :root.dark[data-glass="on"] {
  --text-color: #e0f2fe;
  --card-surface-bg: rgba(15, 23, 42, 0.72);
}
```

状态色 `--success-color`、`--warning-color`、`--error-color` 与在线色须日夜分写，改后联动徽章和提示框。强调色不用纯白或纯黑，亮霓虹色在日间需加深，按钮字色用 `--on-accent-color`。

### 稳定变量与区域选择器

优先使用下表中的变量和类名，未列出的内部名称不保证后续兼容。

| 变量或类名 | 作用 | 影响范围 |
|---|---|---|
| `--bg-color` | 页面背景色（日夜分写） | 所有前台页面底色；开启壁纸时被壁纸盖住 |
| `--card-surface-bg` | 卡片底色（日夜及毛玻璃分写） | 首页卡片、节点详情与网络质量卡片 |
| `--fill-1` | 卡内色块底色（日夜分写） | 概况数字小块、网卡卡片、一体列表隔行底色、次要按钮 |
| `--hover-bg-color` | 悬停叠加底色（日夜分写） | 列表行、菜单项、次要按钮悬停 |
| `--text-color` / `--secondary-text-color` | 正文与次要文字色（日夜分写） | 全站主文字、辅助说明文字 |
| `--border-color` / `--border-hover-color` | 外沿边框与悬停边框色（日夜分写） | 卡片、浮层、顶栏下沿、页脚上沿、输入框 |
| `--divider-color` | 内部分隔线色（日夜分写） | 卡片内部分区、下拉菜单分隔线 |
| `--accent-color` / `--on-accent-color` | 强调色与实心强调按钮文字色 | 主按钮、链接、选中高亮（亮色强调色需配深色按钮字） |
| `--success-color` / `--warning-color` / `--error-color` | 成功、警告、错误状态色（日夜分写） | 提示、徽章、超过阈值的用量条 |
| `--info-color` | 信息色，默认跟随 `--accent-color` | 信息类提示与徽章 |
| `--status-online-color` / `--status-offline-color` | 在线与离线状态色（日夜分写） | 节点状态圆点与汇总文字 |
| `--progress-bg-color` | 进度条底色（日夜分写） | 用量条未填充部分与关闭态开关 |
| `--progress-cpu-color` / `--progress-memory-color` | CPU 与内存条颜色（日夜分写） | 首页卡片正常态用量条；高负载自动切状态色 |
| `--card-shadow` / `--shadow-md` / `--shadow-lg` | 卡片、浮层、弹窗三档阴影（日夜分写） | 卡片外框、菜单与提示浮层、弹窗（`--shadow-sm` 默认无阴影） |
| `--navbar-bg` / `--footer-bg` | 顶栏与页脚底色（日夜及毛玻璃分写） | 顶部导航栏背景、底部页脚 |
| `--font-sans` / `--font-mono` | 正文字体与等宽字体 | 全站文字与数字；只填字体名，不自动下载字体 |
| `.text-theme-main` / `.text-theme-secondary` | 正文与次要文字颜色类 | 挂了对应类名的文字元素 |
| `.glass-card` / `.surface-block` / `.surface-tile` | 卡片区块、实色区块与卡内小块 | 各页外层卡片（毛玻璃画在 `.glass-card::before`）、独立页实色块、卡内小块 |
| `border-radius`（CSS 属性） | 圆角大小 | 选中的元素；节点卡片默认 `1.125rem`，其余卡片 `0.75rem` |

只改某一块区域时用前缀选择器，只改外观，不用 `display: none` 隐藏结构。

```css
/* 首页·卡片视图：节点卡片圆角、悬停发光、标题与标签 */
[data-home-shell="1"][data-home-view="card"] .server-card { border-radius: 1rem; }
[data-home-shell="1"][data-home-view="card"] .server-card:hover { box-shadow: 0 0 20px rgba(0, 184, 217, 0.3); }
[data-home-shell="1"] .card-title-link { font-weight: 600; }
[data-home-shell="1"] .dstatus-tag-chip { border-radius: 0.375rem; }

/* 首页·列表视图：表格 .ds-list（framed 一体 / split 分行），列表行 .ds-list-row */
[data-home-shell="1"][data-home-view="list"] .ds-list-row { border-bottom-color: rgba(0, 184, 217, 0.3); }
[data-home-shell="1"][data-home-view="list"] .ds-list-row:hover {
  background-image: linear-gradient(var(--hover-bg-color), var(--hover-bg-color));
}

/* 首页顶部概况卡片、地区标签行与工具栏 */
.dashboard-card { border-radius: 1rem; }
.region-container, #dashboard-toolbar { border-radius: 1rem; }

/* 节点详情页：页签（.stat-tabs > .stat-tab）与外层卡片（.glass-card） */
.stat-tab[aria-selected="true"] { color: var(--accent-color); }
.stat-page .glass-card { border-radius: 1rem; }

/* 网络质量页卡片与服务状态页面板 */
.nqb .nqb-card { border-radius: 0.25rem 1.25rem; }
.service-status-page .service-status-panel { border-radius: 1rem; }

/* 顶栏背景与页脚 */
.ds-nav-bg { background-color: rgba(10, 25, 41, 0.8); }
.ds-footer { border-top: 1px solid color-mix(in srgb, var(--accent-color) 20%, var(--border-color)); }

/* 图片壁纸滤镜（壁纸图片本身在后台设置里更换） */
html[data-wallpaper="image"] body::before { filter: saturate(0.8) brightness(0.9); }
```

::: details 禁止覆盖的内部变量与标识
详情页签常态为 `.stat-tab`，悬停为 `:hover`，选中为 `[aria-selected="true"]`。窄屏收进「更多」或「工具」下拉时，选中项为 `.ds-menu-item[aria-checked="true"]`。

下表名称由脚本读写或定位元素，请勿覆盖变量值或隐藏结构。

| 名称 | 覆盖后果 |
|---|---|
| `--glass-blur` `--glass-saturation` `--glass-contrast` `--glass-light-opacity` `--glass-dark-opacity` `--glass-brightness` | 后台毛玻璃参数与日间自动提亮失效 |
| `--ds-accent` `--ds-surface` `--ds-surface-rgb` `--ds-surface-dark` `--ds-surface-dark-rgb` `--ds-bg-light` `--ds-bg-dark` `--ds-bg-dark-rgb` | 后台改强调色与卡片底色不生效（改强调色请用 `--accent-color`） |
| `--wallpaper-image` `--wallpaper-filter` `--wallpaper-dominant` `--wallpaper-size` `--wallpaper-repeat` `--wallpaper-position` `--wallpaper-height` | 壁纸显示、亮度模糊与固定定位失效 |
| `--terminal-sidebar-width` `--app-inset-right` `--card-estimate` `--row-estimate` `--shell-height` | 终端分栏、AI 侧栏让位与列表滚动高度错乱 |
| `data-home-shell` `data-home-view` `data-home-view-slot` `data-glass` `data-wallpaper` | 视图切换、毛玻璃与壁纸根状态失效 |
| `#card-grid-container` `#list-grid-container` `.server-card` `.ds-list-row` | 首页筛选、排序与实时刷新异常（只改圆角等外观不影响） |
| `#download-speed-progress` `#upload-speed-progress` 的位移或过渡样式 | 实时网速条卡顿抖动 |
:::

::: details 常用样式片段库
下面的片段可单独复制，贴入「CSS 内容」即可生效。

```css
/* 顶栏下沿细线与当前页导航变色 */
.ds-nav-bg { box-shadow: inset 0 -1px 0 color-mix(in srgb, var(--accent-color) 25%, var(--border-color)); }
.ds-nav-link[aria-current="page"] { color: var(--accent-color); }

/* 顶栏下拉菜单 */
.ds-menu { border-radius: 0.5rem; }
.ds-menu-item:hover { background-color: var(--hover-bg-color); }

/* 输入框 */
input[type="text"], input[type="search"], textarea { border-radius: 0.5rem; border: 1px solid var(--border-color); }

/* 卡片背景装饰：右上角柔和光晕 */
[data-home-shell="1"] .server-card {
  background-image: radial-gradient(circle at 85% 15%, rgba(0, 184, 217, 0.08), transparent 50%);
}

/* 异形卡：首页节点卡与概况卡八边形切角 */
[data-home-shell="1"] :is(.server-card, .dashboard-card) {
  clip-path: polygon(0% 10px, 10px 0%, calc(100% - 10px) 0%, 100% 10px,
    100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0% calc(100% - 10px));
}

/* 整站小主题（深海蓝） */
:root:not(.dark), :root[data-glass="on"]:not(.dark) {
  --bg-color: #e8f1fa;
  --card-surface-bg: rgba(255, 255, 255, 0.9);
  --text-color: #0c1220;
}
:root.dark, :root.dark[data-glass="on"] {
  --bg-color: #030712;
  --card-surface-bg: rgba(15, 23, 42, 0.72);
  --text-color: #e0f2fe;
}
:root:not(.dark) { --accent-color: #0891b2; }
:root.dark { --accent-color: #22d3ee; --on-accent-color: #082f49; }
```
:::

### 用 AI 生成自定义样式

复制下方提示词，在末行写上风格发给 AI 生成代码。支持联网读取网页的 AI，也可直接发本页网址加你的需求。

```text
你是 CSS 主题师。请为我的服务器监控面板写一份自定义 CSS，严格遵守下面规则和清单。

【九条硬性规则】
1. 只用下面【可改清单】里的变量名和【区域选择器】，不用清单以外的。
2. 不许发明和已有变量相似的新变量名。
3. 日间颜色写在 :root:not(.dark) { } 里，夜间颜色写在 :root.dark { } 里；变量名日夜相同。
   只有 --accent-color 与 --on-accent-color 在日夜相同时可写在 :root { } 里共用一份。
   卡片底色 --card-surface-bg（及 --navbar-bg / --footer-bg）还要写进 :root[data-glass="on"]:not(.dark)
   和 :root.dark[data-glass="on"]（可与前两个选择器用逗号合并），否则开启毛玻璃时会被盖掉。
4.【禁止名单】里的任何名字不许出现在生成的代码里，也不许写 @import 或外部 http(s):// 网址的 url(...)。
5. 若要整体深色风格：只改 :root.dark 一侧，日间一侧不写成深色；强调色不用纯白或纯黑。
6. 状态色（--success-color / --warning-color / --error-color）和在线/离线色必须日夜分写；
   高饱和或霓虹色系尤其如此：霓虹版写进 :root.dark { }，日间一侧用同色相的加深版本。
7. 底色、卡片色、卡内色块、正文、次要文字、边框是一组配套关系。对比度参考（日夜同标准）：
   正文对其所在底色 >=7:1；次要文字、按钮与标签文字 >=4.5:1；边框在卡片和页面底色上都可见。
   没改的项会保持下面【当前默认值】，新值要和它们协调。
8. 放在实心强调色底上的按钮文字由 --on-accent-color 控制（默认 #ffffff）：
   强调色偏亮（金色、亮青、亮绿等）时必须设深色 --on-accent-color，偏深时配白色；日间和夜间分别核对对比度 >=4.5:1。
9. 不许隐藏或移除任何元素：display:none、visibility:hidden、把元素挪出屏幕都不行。
   如果需求里有做不到的部分（隐藏元素、换壁纸图、调毛玻璃参数、日间刷黑等），
   在 CSS 最顶部用注释说明：/* 无法实现：xxx，原因 */，再正常完成其余部分。

【当前默认值】（未改项保持这些值）
- 日间：页面底 #f8f8f9；卡片 #ffffff；卡内色块 rgba(15, 23, 42, 0.04)；正文 #1e293b；次要文字 #475569；外沿边框 rgba(15, 23, 42, 0.1)；内部分隔线 rgba(15, 23, 42, 0.06)；悬停底色 rgba(15, 23, 42, 0.07)
- 夜间：页面底 #000000；卡片 #0a0a0a；卡内色块 rgba(255, 255, 255, 0.05)；正文 #ededed；次要文字 #a0a0a0；外沿边框 rgba(255, 255, 255, 0.11)；内部分隔线 rgba(255, 255, 255, 0.08)；悬停底色 rgba(255, 255, 255, 0.08)
- 强调色默认 #3b82f6，实心强调按钮文字 --on-accent-color 默认 #ffffff
- 状态色：成功 #10b981（夜 #34d399）、警告 #f59e0b（夜 #fbbf24）、错误 #ef4444（夜 #f87171）

【可改清单】（日夜分写的变量，名字相同、分别写在两个选择器里）
- 页面背景：--bg-color；卡片底色：--card-surface-bg（见规则 3）；卡内色块：--fill-1
- 顶栏与页脚底色：--navbar-bg / --footer-bg（见规则 3）
- 正文文字：--text-color；次要文字：--secondary-text-color
- 外沿边框：--border-color；悬停边框：--border-hover-color；内部分隔线：--divider-color
- 全站强调色：--accent-color；实心强调按钮文字：--on-accent-color
- 状态色：--success-color / --warning-color / --error-color；信息色：--info-color（默认跟随强调色）
- 在线与离线色：--status-online-color / --status-offline-color
- 进度条：--progress-bg-color（轨道）；--progress-cpu-color / --progress-memory-color（首页卡片正常态）
- 阴影：--card-shadow（卡片）/ --shadow-md（浮层）/ --shadow-lg（弹窗）
- 字体：--font-sans / --font-mono（只写字体名，不引入外部字体）
- 悬停底色：--hover-bg-color（区块级元素悬停用 background-image: linear-gradient(var(--hover-bg-color), var(--hover-bg-color)) 叠加，不替换原底色）
- 强调色边框用 color-mix(in srgb, var(--accent-color) 20%, var(--border-color))

【区域选择器】（只改颜色/圆角/阴影/字体等外观，别改名、别隐藏）
- 首页卡片视图：[data-home-shell="1"][data-home-view="card"] .server-card（标题 .card-title-link，标签 .dstatus-tag-chip）
- 首页列表视图：表格 .ds-list[data-list-style="framed|split"]，行 [data-home-shell="1"][data-home-view="list"] .ds-list-row
- 首页概况区、地区标签行与工具栏：.dashboard-card、.region-container、#dashboard-toolbar
- 卡片风格一致性：改 .server-card 的形状（切角/异形）或背景装饰时，同步应用到 .dashboard-card；
  详情页外层卡片（.stat-page .glass-card）不做背景装饰，只动圆角、边框或阴影，保持信息页面干净
- 详情页页签：容器 .stat-tabs，按钮 .stat-tab / .stat-tab:hover / .stat-tab[aria-selected="true"]（下拉溢出项为 .ds-menu-item[aria-checked="true"]）；
  改主题时核对页签文字与容器底的对比（常态与选中态均 >=4.5:1）
- 网络质量页卡片：.nqb .nqb-card；服务状态页面板：.service-status-page .service-status-panel
- 顶栏：.ds-nav（外框）、.ds-nav-bg（背景，底线用 box-shadow: inset 0 -1px 0 ...）；当前页导航：.ds-nav-link[aria-current="page"]
- 页脚：.ds-footer（顶栏与页脚可加 CSS 渐变或内联 url("data:image/svg+xml,...")，禁用外部图片网址）
- 图片壁纸滤镜：html[data-wallpaper="image"] body::before（仅可改 filter / opacity）
- 下拉菜单：.ds-menu；菜单项：.ds-menu-item
- 输入框：input[type="text"], input[type="search"], textarea
- 表面外壳：.glass-card（卡片区块）/ .surface-block（独立页实色块）/ .surface-tile（卡内小块）

【禁止名单】（这些名字不许出现在代码里）
--glass-blur --glass-saturation --glass-contrast --glass-light-opacity --glass-dark-opacity --glass-brightness
--ds-accent --ds-surface --ds-surface-rgb --ds-surface-dark --ds-surface-dark-rgb --ds-bg-light --ds-bg-dark --ds-bg-dark-rgb
--wallpaper-image --wallpaper-filter --wallpaper-dominant --wallpaper-size --wallpaper-repeat --wallpaper-position --wallpaper-height
--terminal-sidebar-width --app-inset-right --card-estimate --row-estimate --shell-height
另外：不许对 #download-speed-progress、#upload-speed-progress 写位移或过渡样式；
不许修改任何 data-* 属性值或隐藏清单里的结构元素，总大小不超过 128 KB。

【输出要求】只输出可直接粘贴使用的 CSS 代码，不要解释文字；做不到的需求按规则 9 用顶部 CSS 注释说明。

我的需求：（在这里描述你想要的风格，例如“整体偏暗紫色，卡片圆角大一点”）
```

## 常见问题

::: details 保存失败并提示不允许的内容或超出限制
自定义 CSS 上限为 128 KB，且禁止 `@import`、`expression(...)`、`-moz-binding`、`javascript:`。

`url(...)` 不支持 `http(s)://` 等外部网址。背景图案请改用 CSS 渐变或内联 SVG（`data:image/svg+xml`）。
:::

::: details 打开了开关但前台没有变化
先看后台「首页内容」右上角是否显示「保存失败，可重试」。再点前台顶栏「主题」，确认未关掉「自定义样式」，或点「恢复站点默认」。

在后台「插件」启用访客主题包时，自定义 CSS 由该主题决定。针对官方页面写的选择器在主题包下不会生效。
:::

::: details 样式改乱了怎么恢复
在后台关掉「自定义 CSS」右侧开关，刷新前台即恢复且代码保留。访客也可在前台「主题」菜单关掉「自定义样式」，仅在当前浏览器停用。
:::
