---
title: 自定义 CSS
description: 把这一页发给 AI，描述你想要的效果，它就能帮你写出能用的自定义样式；懂 CSS 的你也可以照着表自己改
---

# 自定义 CSS

把这一页（或本页链接）发给任何 AI，告诉它你想要的效果，它就能生成一份能直接贴进去用的样式代码；懂 CSS 的站长也可以照下面的表自己改。颜色、边框、圆角、阴影、卡片形状都能改。

## 怎么用

1. 把本页链接和想要的效果发给 AI，或复制第 6 节的提示词填上需求。
2. 把生成的 CSS 贴进 个性化 → 高级 →「自定义 CSS」，打开卡片上的开关。
3. 刷新前台看效果；不满意就关掉开关，前台立即恢复。

## 1. 怎么打开

1. 管理后台 → **个性化 → 高级 → 自定义 CSS**。
2. 打开卡片右侧的**开关**——**这步最容易漏**，不开的话贴了代码也没效果。
3. 点「更多 ›」，在「CSS 内容」里粘贴。**没有保存按钮**，改动自动保存，然后刷新前台看效果。

只影响访客看到的前台（首页、节点详情、网络质量、服务状态等），不影响管理后台。代码里含 `@import`、外部网址 `url(...)`、`expression` 会**保存失败并提示**（不是静默忽略）。

**改坏了**：关掉开关立即恢复（代码还留着），或清空内容。

**顶栏「主题」菜单里的「自定义样式」开关**：游客点它只影响自己的浏览器（偏好存在本机，刷新后仍然生效）；管理员点它等于改全站启用状态——关闭后菜单里不再出现这一项，需要回到这里重新打开。

## 2. 颜色怎么改：一套变量 + 三条纪律

前台用一套语义变量，白天和夜间用同一个名字，分别写在两个选择器里：

```markdown
| 写在哪 | 管什么 |
|------|--------|
| `:root:not(.dark) { }` | 白天（亮色模式）的颜色 |
| `:root.dark { }` | 夜间（深色模式）的颜色 |
| `:root { --accent-color: … }` | 全站强调色：按钮、选中、链接高亮；日夜要不同时再分写 |
```

**纪律一**：日夜颜色必须写在对应选择器里。系统自带的夜间配色写在 `:root.dark` 里，只写在 `:root { }` 的话，到了夜间会被盖掉：

```css
:root:not(.dark) { --text-color: #1a1a2e; }  /* 白天 */
:root.dark       { --text-color: #e0f2fe; }  /* 夜间 */
```

**纪律二**：卡片底色用 `--card-surface-bg`。打开毛玻璃时它由毛玻璃规则单独定义，要连毛玻璃一起覆盖，就把两种情况都写上；想继续透出壁纸，填半透明颜色：

```css
:root:not(.dark), :root[data-glass="on"]:not(.dark) { --card-surface-bg: rgba(255,255,255,.85); }
:root.dark, :root.dark[data-glass="on"]             { --card-surface-bg: rgba(15,23,42,.72); }
```

**纪律三**：想要**整站暗黑风格**，只改 `:root.dark` 一侧，然后把站点默认主题切到夜间模式用。不要在白天一侧写深色——图表坐标轴等组件按"当前模式"选色，白天刷黑后它们照常输出深色文字，会花。另外强调色别用纯白/纯黑，按钮文字会看不见。

状态色 `--success-color`（绿）、`--warning-color`（黄橙）、`--error-color`（红）系统已经日夜各定义一份，**要改就日夜分写**，只写一份到了另一种模式会被系统值盖掉。`--info-color` 默认跟随强调色。改它们会连带徽章、提示框一起变——这是设计如此，不要再单独改徽章。高饱和/霓虹色系尤其要分写：霓虹色在黑底上漂亮，在白底上几乎看不见，白天一侧用同色相的加深版本。

## 3. 稳定可改清单

按用途分组的常用项。表外的变量改了效果没保证。标"日夜分写"的，按第 2 节写在两个选择器里。

```markdown
| 变量或类名 | 管什么 | 影响哪里 |
|-----------|--------|---------|
| `--bg-color` | 网站背景色（日夜分写） | 所有前台页面底色；开了壁纸时被壁纸盖住 |
| `--card-surface-bg` | 卡片底色（日夜分写，见纪律二） | 首页卡片、详情页面板 |
| `--text-color` | 正文文字色（日夜分写） | 全站正文 |
| `--secondary-text-color` | 次要文字色（日夜分写） | 小字、辅助说明 |
| `--border-color` | 边框色（日夜分写） | 卡片、输入框边框 |
| `--accent-color` | 全站强调色 | 按钮、链接、高亮 |
| `--success-color` / `--warning-color` / `--error-color` | 三类状态色（日夜分写） | 提示、徽章、硬盘用量条 |
| `--info-color` | 信息色，默认跟随强调色 | 提示、徽章 |
| `--status-online-color` / `--status-offline-color` | 在线/离线色（日夜分写） | 状态点、部分汇总文字和用量条 |
| `--progress-bg-color` | 进度条底色（日夜分写） | 用量条未填充部分 |
| `--progress-cpu-color` / `--progress-memory-color` | CPU、内存用量条颜色（日夜分写） | 首页卡片的 CPU、内存条 |
| `--hover-bg-color` | 悬停底色 | 列表行、菜单项悬停 |
| `--shadow-sm` / `--shadow-md` / `--shadow-lg` | 阴影三档 | 读取这几个变量的弹层和组件，不是所有卡片阴影的总开关 |
| `--font-sans` / `--font-mono` | 正文字体 / 等宽字体 | 全站文字；只写字体名，不会自动下载字体 |
| `.text-theme-main` / `.text-theme-secondary` | 正文/次要文字（类名版） | 加在元素上直接用 |
| `.glass-card` / `.surface-card` | 磨砂/实色卡片质感 | 该元素外观；毛玻璃背景画在 `.glass-card::before` 上 |
| `border-radius`（普通 CSS 属性） | 圆角大小 | 你选中的元素；没有统一的圆角变量 |
```

## 4. 区域定点改

只想改某一块时，用前缀选择器锁定范围。**通用规则：这些类名和属性名是程序用来识别元素的，别改名、别用 `display:none` 藏结构，只改颜色、圆角、阴影、字体这类外观。**

```css
/* 首页·卡片视图：圆角 + 悬停发光 */
[data-home-shell="1"][data-home-view="card"] .server-card { border-radius: 1rem; }
[data-home-shell="1"][data-home-view="card"] .server-card:hover { box-shadow: 0 0 20px rgba(0,184,217,.3); }

/* 首页·列表视图：行分隔线 + 悬停高亮（列表行是 .ds-list-row） */
[data-home-view="list"] .ds-list-row { border-bottom-color: rgba(0,184,217,.3); }
[data-home-view="list"] .ds-list-row:hover { background: var(--hover-bg-color); }

/* 首页顶部概况卡片 */
.dashboard-card { border-radius: 1rem; }

/* 详情页：标签和卡片 */
.stat-tab[aria-selected="true"] { color: var(--accent-color); }   /* 容器 .stat-tabs，按钮 .stat-tab */
.stat-page .surface-card { border-radius: 1rem; }

/* 网络质量页卡片 */
.nqb .nqb-card { border-radius: .25rem 1.25rem; }

/* 顶栏和页脚 */
.ds-nav-bg { background-color: rgba(10,25,41,.8); }
.ds-footer { border-top: 1px solid color-mix(in srgb, var(--accent-color) 20%, var(--border-color)); }

/* 壁纸滤镜（图片壁纸；壁纸本身在后台设置里换） */
html[data-wallpaper="image"] body::before { filter: saturate(.8) brightness(.9); }
```

> 标签按钮的三态：`.stat-tab`（常态）、`.stat-tab:hover`（悬停）、`.stat-tab[aria-selected="true"]`（选中）。窄屏时额外标签收进「工具」菜单，里面按钮的选中态是 `[aria-pressed="true"]`。

## 5. 这些不要碰

它们由页面脚本实时读写或用作定位标识，覆盖后轻则设置失灵、重则功能坏掉。

```markdown
| 名称 | 覆盖后果 |
|------|---------|
| `--glass-blur` `--glass-saturation` `--glass-contrast` `--glass-light-opacity` `--glass-dark-opacity` | 后台毛玻璃设置失灵 |
| `--ds-accent` `--ds-surface` `--ds-surface-rgb` `--ds-surface-dark` `--ds-surface-dark-rgb` `--ds-bg-dark` `--ds-bg-dark-rgb` | 后台改强调色/卡片底色不生效（要改强调色用 `--accent-color`） |
| `--wallpaper-image` `--wallpaper-filter` | 壁纸设置失效、首屏闪烁 |
| `--terminal-sidebar-width` | 终端和 AI 助手的分栏拖动错乱 |
| `data-home-shell` `data-home-view` `data-home-view-slot` `data-glass`（属性名） | 视图切换、毛玻璃开关失效 |
| `#card-grid-container` `#list-grid-container` `.server-card`（标识） | 首页排序、刷新功能坏掉 |
| `#download-speed-progress` `#upload-speed-progress` 的位移/过渡样式 | 网速条卡死抖动（脚本每秒重画） |
```

改这些元素的**外观**（颜色圆角）没问题——用第 4 节的前缀选择器；禁的是覆盖这些**名字本身管的值**（比如写 `--glass-blur: 0`）和改名。

## 6. 片段库 + AI 提示词模板

以下片段可单独复制使用：

```css
/* 顶栏细线 + 当前页导航变色 */
.ds-nav { border-bottom: 1px solid color-mix(in srgb, var(--accent-color) 20%, var(--border-color)); }
.ds-nav-link[aria-current="page"] { color: var(--accent-color); }

/* 主题菜单 */
.ds-menu { border-radius: .5rem; }
.ds-menu-item:hover { background: var(--hover-bg-color); }

/* 输入框 */
input[type="text"], input[type="search"], textarea { border-radius: .5rem; border: 1px solid var(--border-color); }

/* 卡片背景装饰：柔和光晕 */
[data-home-shell="1"] .server-card {
  background-image: radial-gradient(circle at 85% 15%, rgba(0,184,217,.08), transparent 50%);
}

/* 异形卡：八边形切角 */
[data-home-shell="1"] .server-card {
  clip-path: polygon(0% 10px, 10px 0%, calc(100% - 10px) 0%, 100% 10px,
    100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0% calc(100% - 10px));
}

/* 整站小主题（深海蓝） */
:root:not(.dark), :root[data-glass="on"]:not(.dark) { --bg-color: #e8f1fa; --card-surface-bg: rgba(255,255,255,.9); --text-color: #0c1220; }
:root.dark, :root.dark[data-glass="on"] { --bg-color: #030712; --card-surface-bg: rgba(15,23,42,.72); --text-color: #e0f2fe; }
:root { --accent-color: #22d3ee; }
```

### AI 万能提示词（复制整块，最后一行填上你要的风格，直接发给 AI）

```
你是 CSS 主题师。请为我的服务器监控面板写一份自定义 CSS，严格遵守以下规则和清单。

【九条硬性规则】
1. 只用下面【可改清单】里的变量名和【区域选择器】，不用清单以外的。
2. 不许发明和已有变量相似的新变量名。
3. 白天颜色写在 :root:not(.dark) { } 里，夜间颜色写在 :root.dark { } 里；变量名日夜相同。
   只有 --accent-color 可以写在 :root { } 里共用一份。
   卡片底色 --card-surface-bg 还要写进 :root[data-glass="on"]:not(.dark) 和 :root.dark[data-glass="on"]
   （可以和前两个选择器用逗号合并），否则开了毛玻璃会被盖掉。
4.【禁止名单】里的任何名字不许出现在生成的代码里。
5. 若要整体深色风格：只改 :root.dark 一侧，白天一侧不写成深色；强调色不用纯白或纯黑。
6. 状态色（--success-color / --warning-color / --error-color）和在线/离线色必须日夜分写；
   高饱和/霓虹色系尤其如此：霓虹版写进 :root.dark { }，白天一侧用同色相的加深版本。
7. 底色、卡片色、正文、次要文字、边框是一组配套关系。对比度参考（日夜同标准）：
   正文对其所在底色 ≥7:1；次要文字、按钮/标签文字 ≥4.5:1；边框在卡片和页面底色上都可见。
   没改的项会保持下面【当前默认值】，新值要和它们协调。
8. 放在强调色底上的文字（选中标签、按钮、悬停高亮）：按强调色的明暗选字色——
   强调色偏亮（金色、亮青、亮绿等）配深字，偏深配白字；白天和夜间要**分别**核对，
   两侧都 ≥4.5:1。
9. 不许隐藏或移除任何元素：display:none、visibility:hidden、把元素挪出屏幕都不行。
   如果需求里有做不到的部分（隐藏元素、换壁纸图、调毛玻璃参数、白天刷黑等），
   在 CSS 最顶部用注释说明：/* 无法实现：xxx，原因 */，然后正常完成其余部分。

【当前默认值】（你没改的项就是这些值；"微调"以此为基准做相对调整）
- 白天：页面底 #f8fafc；正文 #1e293b；次要文字 #475569；边框 rgba(148,163,184,.15)
- 夜间：正文 #ededed；次要文字 #a0a0a0；边框 rgba(255,255,255,.09)
- 状态色：成功 #10b981(夜 #34d399)、警告 #f59e0b(夜 #fbbf24)、错误 #ef4444(夜 #f87171)
- 页面底色（夜间）、卡片底色、强调色由站长在后台设置，未知时按常见深色与蓝色系协调

【可改清单】（日夜分写的变量，名字相同、分别写在两个选择器里）
- 页面背景：--bg-color
- 卡片底色：--card-surface-bg（见规则 3）
- 正文文字：--text-color；次要文字：--secondary-text-color
- 边框：--border-color
- 全站强调色：--accent-color
- 状态色：--success-color / --warning-color / --error-color；信息色 --info-color（默认跟随强调色）
- 在线/离线：--status-online-color / --status-offline-color
- 进度条：--progress-bg-color（底）；--progress-cpu-color / --progress-memory-color
- 阴影：--shadow-sm / --shadow-md / --shadow-lg
- 字体：--font-sans / --font-mono（只写字体名，不引入外部字体）
- 悬停底色可引用：var(--hover-bg-color)
- 强调色边框没有现成变量，用 color-mix(in srgb, var(--accent-color) 20%, var(--border-color))

【区域选择器】（只改颜色/圆角/阴影/字体等外观，别改名、别 display:none）
- 首页卡片视图：[data-home-shell="1"][data-home-view="card"] .server-card
- 首页列表视图：[data-home-view="list"] .ds-list-row
- 首页顶部概况卡片：.dashboard-card
- 卡片风格一致性：改 .server-card 的形状（切角/异形）或背景装饰时，同步应用到 .dashboard-card；
  **详情页卡片（.stat-page .surface-card）不做背景装饰**，只动圆角/边框/阴影，保持信息页面干净
- 详情页标签：容器 .stat-tabs，按钮 .stat-tab；三态 .stat-tab / .stat-tab:hover / .stat-tab[aria-selected="true"]；
  ⚠ 改主题时核对标签文字和容器底的对比（常态与选中态都 ≥4.5:1）
- 网络质量页卡片：.nqb .nqb-card
- 顶栏：.ds-nav（外框）、.ds-nav-bg（背景）；当前页导航：.ds-nav-link[aria-current="page"]
- 页脚：.ds-footer
  顶栏和页脚是装饰安全区，可加边框、CSS 渐变背景、内联 SVG 背景
  （url("data:image/svg+xml,...") 属于内联不会被拦，外部图片网址才会被拒收）
- 壁纸：html[data-wallpaper="image"] body::before 只可改 filter / opacity 这类静态外观
- 主题菜单：.ds-menu；菜单项：.ds-menu-item
- 输入框：input[type="text"], input[type="search"], textarea
- 磨砂/实色卡：.glass-card / .surface-card

【禁止名单】（这些名字不许出现在代码里）
--glass-blur --glass-saturation --glass-contrast --glass-light-opacity --glass-dark-opacity
--ds-accent --ds-surface --ds-surface-rgb --ds-surface-dark --ds-surface-dark-rgb --ds-bg-dark --ds-bg-dark-rgb
--wallpaper-image --wallpaper-filter --terminal-sidebar-width
另外：不许对 #download-speed-progress、#upload-speed-progress 写位移/过渡样式；
不许修改任何 data-* 属性值或删除/改名清单里的选择器。

【输出要求】只输出可直接粘贴使用的 CSS 代码，不要解释文字；做不到的需求按规则 9 用顶部 CSS 注释说明。

我的需求：（在这里描述你想要的风格，例如"整体偏暗紫色，卡片圆角大一点"）
```

> 备选：如果你的 AI 能联网，也可以只发一句"请打开这个网页并按它的规则帮我写自定义 CSS：（贴本页网址）+ 我的需求"。

**改坏了**：个性化 → 高级 → 自定义 CSS → 关掉开关，前台立即恢复，代码还留着。
