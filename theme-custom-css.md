---
title: 自定义 CSS
description: 把这一页发给 AI，描述你想要的效果，它就能帮你写出能用的自定义样式；懂 CSS 的你也可以照着表自己改
---

# 自定义 CSS

把这一页（或本页链接）发给任何 AI，告诉它你想要的效果，它就能生成一份能直接贴进去用的样式代码；懂 CSS 的站长也可以照下面的表自己改。颜色、边框、圆角、阴影、卡片形状都能改。

## 1. 怎么打开

1. 管理后台 → **个性化 → 高级设置**（不是"主题设置"）。
2. 打开 **「启用站方自定义样式」** 开关——**这步最容易漏**，不开的话贴了代码也没效果。
3. 把 CSS 贴进文本框。**没有保存按钮**：停止输入约 1.5 秒自动保存，然后刷新前台看效果。

只影响访客看到的前台，不影响管理后台。代码里含 `@import`、外部网址 `url(...)`、`expression` 会**保存失败并提示**（不是静默忽略）。

**改坏了**：关掉启用开关立即恢复（代码还留着），或清空文本框。

## 2. 颜色怎么改：三层 + 三条纪律

```markdown
| 层级 | 变量前缀 | 管什么 |
|------|---------|--------|
| 白天配色 | `--light-*` | 亮色模式的底色、文字、卡片、边框 |
| 夜间配色 | `--dark-*` | 深色模式的同类颜色 |
| 强调色 | `--accent-base-color` | 全站主题色：按钮、选中、链接高亮 |
```

**纪律一**：日夜颜色必须写在对应选择器里，否则会被系统的日夜切换逻辑盖掉：

```css
:root:not(.dark) { --light-text-color: #1a1a2e; }  /* 白天 */
:root.dark       { --dark-text-color: #e0f2fe; }   /* 夜间 */
```

不要直接改 `--text-color`、`--bg-color` 这类不带 light/dark 前缀的中间变量——白改。

**纪律二**：改卡片底色用 `--light-card-bg-color` / `--dark-card-bg-color`。有个长得很像的 `--card-surface-bg`，前台卡片不读它，改了没效果。

**纪律三**：想要**整站暗黑风格**，只改 `--dark-*` 一侧，然后把站点默认主题切到夜间模式用。不要把 `--light-*` 写成深色——图表坐标轴等组件按"当前模式"选色，日间模式刷黑后它们照常输出深色文字，会花。另外强调色别用纯白/纯黑，按钮文字会看不见。

状态色默认改一份就行（日夜共用）：`--success-color`（绿）、`--warning-color`（黄橙）、`--error-color`（红）、`--info-color`（蓝紫）。改它们会连带徽章、提示框一起变——这是设计如此，不要再单独改徽章。**例外：高饱和/霓虹色系必须日夜分写**——霓虹色在黑底上漂亮，在白底上几乎看不见；把霓虹版写进 `:root.dark { }`，亮色侧在 `:root:not(.dark) { }` 里用同色相的加深版本（强调色 `--accent-base-color` 同理）。

## 3. 稳定可改清单

约 40 个最常用项，按用途分组，覆盖 95% 需求。表外的变量改了效果没保证。

```markdown
| 变量或类名 | 管什么 | 影响哪里 |
|-----------|--------|---------|
| `--light-bg-color` / `--dark-bg-color` | 网站背景色 | 所有前台页面底色 |
| `--light-card-bg-color` / `--dark-card-bg-color` | 卡片底色 | 首页卡片、详情页面板 |
| `--light-text-color` / `--dark-text-color` | 正文文字色 | 全站正文 |
| `--light-secondary-text-color` / `--dark-secondary-text-color` | 次要文字色 | 小字、辅助说明 |
| `--light-border-color` / `--dark-border-color` | 边框色 | 卡片、输入框边框 |
| `--border-accent-color` | 强调色边框 | 输入框聚焦、选中态 |
| `--accent-base-color` | 全站强调色 | 按钮、链接、高亮 |
| `--success-color` / `--warning-color` / `--error-color` / `--info-color` | 四类状态色 | 提示、徽章、状态点 |
| `--status-online-color` / `--status-offline-color` | 在线/离线圆点 | 首页卡片状态点 |
| `--progress-bg-color` | 进度条底色 | 用量条未填充部分 |
| `--light-progress-cpu-color` / `--dark-progress-cpu-color` | CPU 用量条颜色 | 首页/详情页 CPU 条 |
| （同理 `memory` / `disk` / `network` / `swap`，换词尾即可） | 其他用量条颜色 | 对应进度条 |
| `--shadow-sm` / `--shadow-md` / `--shadow-lg` | 阴影三档 | 卡片、弹层投影 |
| `--theme-transition-duration` | 过渡动画时长 | 日夜切换、悬停动画 |
| `.text-theme-main` / `.text-theme-secondary` | 正文/次要文字（类名版） | 加在元素上直接用 |
| `.glass-card` / `.surface-card` | 磨砂/实色卡片质感 | 该元素外观 |
| `border-radius`（普通 CSS 属性） | 圆角大小 | 你选中的元素 |
```

## 4. 区域定点改

只想改某一块时，用前缀选择器锁定范围。**通用规则：这些类名和属性名是程序用来识别元素的，别改名、别用 `display:none` 藏结构，只改颜色、圆角、阴影、字体这类外观。**

```css
/* 首页·卡片视图：圆角 + 悬停发光 */
[data-home-shell="1"][data-home-view="card"] .server-card { border-radius: 1rem; }
[data-home-shell="1"][data-home-view="card"] .server-card:hover { box-shadow: 0 0 20px rgba(0,184,217,.3); }

/* 首页·列表视图：行分隔线 + 悬停高亮 */
[data-home-shell="1"][data-home-view="list"] .server-card { border-bottom-color: rgba(0,184,217,.3); }
[data-home-shell="1"][data-home-view="list"] .server-card:hover { background: var(--hover-bg-color); }

/* 详情页：顶部大卡 + 标签页 */
.stat-hero-surface { border-radius: .5rem 1.5rem; }
.nav-tab.active { color: var(--accent-base-color); }   /* 标签按钮=.nav-tab，内容区=.tab-panel */

/* 网络质量页 */
.network-quality-page .dashboard-card { border-radius: .25rem 1.25rem; }
#nq-dashboard-hero-card { border-color: rgba(0,184,217,.35); }
```

## 5. 这些不要碰

闭合清单（就这些，不会再多）。它们由页面脚本实时读写或用作定位标识，覆盖后轻则设置失灵、重则功能坏掉。

```markdown
| 名称 | 覆盖后果 |
|------|---------|
| `--glass-blur` `--glass-saturation` `--glass-border-opacity` `--glass-contrast` `--glass-light-opacity` `--glass-dark-opacity` `--glass-bg-alpha-dark` `--glass-opacity` `--glass-hover-bg-alpha-light` `--glass-hover-bg-alpha-dark` | 后台毛玻璃滑杆失灵 |
| `--accent-runtime-color` `--surface-runtime-color` `--surface-runtime-color-rgb` `--surface-runtime-dark-color` `--surface-runtime-dark-rgb` `--dark-bg-runtime-color` `--dark-bg-runtime-rgb` | 后台改强调色/卡片底色不生效 |
| `--hs-glass-blur` `--hs-glass-saturation` `--hs-glass-contrast` `--hs-accent` `--hs-accent-rgb` `--hs-accent-soft` `--hs-accent-soft-rgb` `--hs-border` `--hs-border-strong` `--hs-border-hover` `--hs-glow-sm` `--hs-glow-md` `--hs-glow-lg` `--hs-surface` `--hs-surface-strong` | Tron 展示主题效果乱掉 |
| `--wallpaper-image` `--wallpaper-brightness` `--wallpaper-blur` | 壁纸设置失效、首屏闪烁 |
| `--nq-cols` / `--agent-sidebar-width` | 响应式布局错乱 |
| `data-home-shell` `data-home-view` `data-home-view-slot` `data-glass`（属性名） | 视图切换、毛玻璃开关失效 |
| `.nav-tab`(.active) `.tab-panel` `.tab-content-container`（类名） | 标签页切换坏掉 |
| `#card-grid-container` `#list-grid-container` `.server-card`（标识） | 首页排序、拖拽、刷新功能坏掉 |
| `#nq-dashboard-hero-card`(.filter-active) | 网络质量筛选失效 |
| `#download-speed-progress` `#upload-speed-progress` 的位移/过渡样式 | 网速条卡死抖动（脚本每秒重画） |
```

改这些元素的**外观**（颜色圆角）没问题——用第 4 节的前缀选择器；禁的是覆盖这些**名字本身管的值**（比如写 `--glass-blur: 0`）和改名。

## 6. 片段库 + AI 提示词模板

以下片段可单独复制使用（含少量表外但已核实的安全锚点，如顶栏 `#main-navbar`、下拉 `.dropdown-menu__item`）：

```css
/* 顶栏细线 + 选中导航变色 */
#main-navbar { border-bottom: 1px solid var(--border-accent-color); }
.nav-link-active { color: var(--accent-base-color); }

/* 下拉菜单 */
.dropdown-menu { border: 1px solid var(--border-accent-color); border-radius: .5rem; }
.dropdown-menu__item:hover { background: var(--hover-bg-color); }

/* 输入框（日夜各写一份） */
input[type="text"], input[type="search"], textarea { border-radius: .5rem; border: 1px solid var(--light-border-color); }
:root.dark input[type="text"], :root.dark input[type="search"], :root.dark textarea { border-color: var(--dark-border-color); }

/* 异形卡：八边形切角 */
[data-home-shell="1"] .server-card {
  clip-path: polygon(0% 10px, 10px 0%, calc(100% - 10px) 0%, 100% 10px,
    100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0% calc(100% - 10px));
}

/* 整站小主题（深海蓝） */
:root:not(.dark) { --light-bg-color: #0a1929; --light-card-bg-color: rgba(255,255,255,.9); --light-text-color: #0c1220; }
:root.dark { --dark-bg-color: #030712; --dark-card-bg-color: rgba(15,23,42,.72); --dark-text-color: #e0f2fe; }
:root { --accent-base-color: #22d3ee; }
```

### AI 万能提示词（复制整块，最后一行填上你要的风格，直接发给 AI）

```
你是 CSS 主题师。请为我的服务器监控面板写一份自定义 CSS，严格遵守以下规则和清单。

【七条硬性规则】
1. 只用下面【可改清单】里的变量名和【区域选择器】，不用清单以外的。
2. 不许发明和已有变量相似的新变量名。
3. 日/夜颜色分别写在 :root:not(.dark) { } 和 :root.dark { } 里，不写在外层 :root。
4.【禁止名单】里的任何名字不许出现在生成的代码里。
5. 若要整体深色风格：只改 --dark-* 一侧，不把 --light-* 写成深色；强调色不用纯白或纯黑。
6. 若用高饱和/霓虹色系：强调色和状态色必须日夜分写——霓虹版写进 :root.dark { }，
   :root:not(.dark) { } 里用同色相的加深版本（霓虹色在白底上看不清）。
7. 底色、卡片色、正文、次要文字、边框是一组配套关系：同一模式内，正文对卡片底色的
   对比度要足够阅读（参考 4.5:1），边框要在卡片和页面底色上都可见。没改的项会保持
   下面【当前默认值】，新值要和它们协调。

【当前默认值】（你没改的项就是这些值；"微调"以此为基准做相对调整）
- 亮色：页面底 #f8fafc；卡片 #ffffff；正文 #1e293b；次要文字 #475569；边框 rgba(148,163,184,.15)
- 夜间：页面底 #000000；卡片 #0a0a0a；正文 #ededed；次要文字 #a0a0a0；边框 rgba(255,255,255,.09)
- 强调色 #3b82f6；状态色：成功 #10b981(夜 #34d399)、警告 #f59e0b(夜 #fbbf24)、错误 #ef4444(夜 #f87171)

【可改清单】（成对变量 = 日/夜各一个）
- 页面背景：--light-bg-color / --dark-bg-color
- 卡片底色：--light-card-bg-color / --dark-card-bg-color
- 正文文字：--light-text-color / --dark-text-color
- 次要文字：--light-secondary-text-color / --dark-secondary-text-color
- 边框：--light-border-color / --dark-border-color；强调边框：--border-accent-color
- 全站强调色：--accent-base-color（常规色写一份在 :root 即可）
- 状态色：--success-color / --warning-color / --error-color / --info-color（常规色写一份即可）
- 在线/离线圆点：--status-online-color / --status-offline-color
- 进度条：--progress-bg-color（底）；--light-progress-cpu-color / --dark-progress-cpu-color
  （同理 memory / disk / network / swap 换词尾）
- 阴影：--shadow-sm / --shadow-md / --shadow-lg；动画时长：--theme-transition-duration
- 悬停底色可引用：var(--hover-bg-color)

【区域选择器】（只改颜色/圆角/阴影/字体等外观，别改名、别 display:none）
- 首页卡片视图：[data-home-shell="1"][data-home-view="card"] .server-card
- 首页列表视图：[data-home-shell="1"][data-home-view="list"] .server-card
- 详情页大卡：.stat-hero-surface；标签按钮：.nav-tab（选中态 .nav-tab.active）
- 网络质量页：.network-quality-page .dashboard-card；顶卡：#nq-dashboard-hero-card
- 顶栏：#main-navbar；选中导航：.nav-link-active
- 下拉菜单：.dropdown-menu；菜单项：.dropdown-menu__item
- 输入框：input[type="text"], input[type="search"], textarea
- 磨砂/实色卡：.glass-card / .surface-card

【禁止名单】（这些名字不许出现在代码里）
--glass-blur --glass-saturation --glass-border-opacity --glass-contrast
--glass-light-opacity --glass-dark-opacity --glass-bg-alpha-dark --glass-opacity
--glass-hover-bg-alpha-light --glass-hover-bg-alpha-dark
--accent-runtime-color --surface-runtime-color --surface-runtime-color-rgb
--surface-runtime-dark-color --surface-runtime-dark-rgb --dark-bg-runtime-color --dark-bg-runtime-rgb
--hs-glass-blur --hs-glass-saturation --hs-glass-contrast --hs-accent --hs-accent-rgb
--hs-accent-soft --hs-accent-soft-rgb --hs-border --hs-border-strong --hs-border-hover
--hs-glow-sm --hs-glow-md --hs-glow-lg --hs-surface --hs-surface-strong
--wallpaper-image --wallpaper-brightness --wallpaper-blur --nq-cols --agent-sidebar-width
--text-color --bg-color --card-bg-color --card-surface-bg
另外：不许对 #download-speed-progress、#upload-speed-progress 写位移/过渡样式；
不许修改任何 data-* 属性值或删除/改名清单里的选择器。

【输出要求】只输出可直接粘贴使用的 CSS 代码，不要解释文字。

我的需求：（在这里描述你想要的风格，例如"整体偏暗紫色，卡片圆角大一点"）
```

> 备选：如果你的 AI 能联网，也可以只发一句"请打开这个网页并按它的规则帮我写自定义 CSS：（贴本页网址）+ 我的需求"。

**改坏了**：个性化 → 高级设置 → 关掉「启用站方自定义样式」，前台立即恢复，代码还留着。
