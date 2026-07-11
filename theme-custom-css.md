---
title: 自定义 CSS
description: 把这一页发给 AI，描述你想要的效果，它就能帮你写出能用的自定义样式；懂 CSS 的你也可以照着表自己改
---

# 自定义 CSS

把这一页（或本页链接）发给任何一个 AI（比如 ChatGPT、Claude、豆包），告诉它你想要什么效果，它就能帮你生成一份能直接贴进去用的样式代码。懂 CSS 的站长也可以不用 AI，直接照着下面的表自己改。

这个功能能改的范围很广：颜色、边框、圆角、阴影、卡片形状都能改，几乎没有阉割。前提是——你得先按下面第 1 节的步骤把开关打开。

---

## 1. 它是什么、怎么打开

"自定义 CSS" 是一个文本框，你贴进去的样式代码会被加到访客看到的前台页面里（首页、监控详情页等），用来改颜色、间距、圆角、阴影这些外观效果。**注意：只影响访客能看到的前台，不影响你自己登录后看到的管理后台。**

打开步骤（四步）：

1. 登录管理后台，进入 **个性化 → 高级设置**（不是"主题设置"，那是另一个 Tab）。
2. 找到 **「启用站方自定义样式」** 开关，把它**打开**。**这一步很多人会漏掉**——开关是关闭的，就算你在文本框里贴了代码，前台也不会有任何变化。
3. 把 CSS 代码贴进下面的文本框。
4. 不用点保存按钮——**这里没有保存按钮**。你停止输入大约 1.5 秒后，系统会自动帮你保存。保存后刷新一下前台页面，就能看到效果。

会自动拦截的内容：系统会检查你贴的代码，如果里面含有 `@import`、外部网址的 `url(...)`（比如引用别的网站的图片或字体）、`expression` 这类内容，**会直接保存失败**，不是"贴了但悄悄没生效"，是弹窗告诉你保存不了。所以如果贴了没反应，先看有没有报错提示。

想恢复原样怎么办：

- **方法一（推荐）**：把「启用站方自定义样式」开关关掉。你贴的代码还留着，随时可以再打开。
- **方法二**：把文本框内容清空。清空之后不会往前台注入任何东西。

---

## 2. 颜色怎么改：三层 + 两条纪律

颜色系统分三层，日常改颜色基本只会用到这三层：

```markdown
| 层级 | 变量前缀 | 管什么 | 举例 |
|------|---------|--------|------|
| 白天配色 | `--light-*` | 亮色模式下的颜色 | `--light-bg-color`（白天页面底色）、`--light-text-color`（白天正文字色） |
| 夜间配色 | `--dark-*` | 深色模式下的颜色 | `--dark-bg-color`（夜间页面底色）、`--dark-text-color`（夜间正文字色） |
| 强调色 | `--accent-base-color` | 全站的主题色，比如按钮、选中状态、链接高亮用的颜色 | `--accent-base-color: #00b8d9;` |
```

**纪律一：改日夜颜色，必须把变量写在对应的选择器里面**，不能直接写在最外层。正确写法：

```css
/* 白天用这个 */
:root:not(.dark) {
  --light-text-color: #1a1a2e;
}
/* 夜间用这个 */
:root.dark {
  --dark-text-color: #e0f2fe;
}
```

错误写法：`:root { --text-color: #1a1a2e; }`——`--text-color` 是系统内部用来"自动判断当前该显示白天还是夜间颜色"的中间变量，你直接改它会被系统的日夜切换逻辑重新盖掉，等于白改，颜色不会变。所以：**只改 `--light-*` 和 `--dark-*` 这两组，不要直接改 `--text-color`、`--bg-color` 这种不带 light/dark 前缀的变量。**

**纪律二：想改卡片的底色，改 `--light-card-bg-color`（白天）和 `--dark-card-bg-color`（夜间）**，不要改一个长得很像的变量叫 `--card-surface-bg`——这个变量确实存在，但首页卡片这些地方的样式代码根本没有读它，改了不会有任何效果，纯属白忙活。

状态色（在线绿、离线红这类）也遵循同样的规则：`--success-color`（成功/正常，一般是绿色系）、`--warning-color`（警告，黄橙色系）、`--error-color`（错误/离线，红色系）、`--info-color`（提示信息，蓝紫色系），这几个不分日夜，直接改一份就行。

---

## 3. 稳定可改清单

下面这张表列出了**你真正会用到的约 40 个变量/类名**，按"你想改什么"分了 7 组。这不是全部能改的东西（系统里其实有大几十个），但覆盖了 95% 的日常需求。表外的变量改了会怎样没人保证，风险自己担。

```markdown
| 变量或类名 | 管什么 | 改了影响哪里 |
|-----------|--------|-------------|
| `--light-bg-color` / `--dark-bg-color` | 整个网站的背景色（日/夜分开） | 所有前台页面的底色 |
| `--light-card-bg-color` / `--dark-card-bg-color` | 卡片（首页服务器卡、各种信息面板）的底色 | 首页卡片、详情页面板 |
| `.glass-card` / `.surface-card` | 给某张卡片加"磨砂玻璃"质感或"实色面板"质感 | 该元素外观，不影响功能 |
| `--light-text-color` / `--dark-text-color` | 正文文字颜色 | 全站正文 |
| `--light-secondary-text-color` / `--dark-secondary-text-color` | 次要文字颜色（说明文字、小字） | 全站小字、辅助说明 |
| `.text-theme-main` / `.text-theme-secondary` | 同上两个变量的"类名版"，效果一样，直接加在元素上用 | 用了这个类的文字 |
| `--light-border-color` / `--dark-border-color` | 卡片、输入框这些元素的边框颜色 | 全站边框 |
| `--border-accent-color` | 强调色边框，比如选中/聚焦状态的高亮边框 | 输入框聚焦、选中态 |
| `--success-color` | 成功/在线状态用的颜色（通常是绿色） | 在线圆点、成功提示 |
| `--warning-color` | 警告状态用的颜色（通常是黄橙色） | 警告提示、告警状态 |
| `--error-color` | 错误/离线状态用的颜色（通常是红色） | 离线圆点、错误提示 |
| `--info-color` | 普通提示信息用的颜色 | 提示气泡、说明标签 |
| `--status-online-color` / `--status-offline-color` | 服务器"在线/离线"小圆点的颜色 | 首页卡片状态点 |
| `--progress-bg-color` | 进度条（CPU/内存/硬盘用量条）的底色（没用完的那部分） | 首页和详情页的用量进度条 |
| `--progress-fill-color` | 进度条填充色的通用默认值 | 未单独设置颜色的进度条 |
| `--light-progress-cpu-color` / `--dark-progress-cpu-color` | CPU 用量进度条的颜色 | 首页/详情页 CPU 条 |
| `--light-progress-memory-color` / `--dark-progress-memory-color` | 内存用量进度条的颜色 | 同上，内存条 |
| （同理还有 `disk`、`network`、`swap` 三个，把上面变量名里的 `cpu` 换成对应词尾即可） | 硬盘/网络/虚拟内存进度条颜色 | 对应的进度条 |
| `--shadow-sm` / `--shadow-md` / `--shadow-lg` | 阴影的深浅（小/中/大三档） | 卡片、面板、弹层的投影 |
| `.shadow-theme-sm` / `.shadow-theme-md` / `.shadow-theme-lg` | 同上三个变量的"类名版" | 用了这个类的元素 |
| `--theme-transition-duration` | 日夜切换、hover 这类过渡动画的时长 | 全站切换动画快慢 |
| `border-radius`（普通 CSS 属性，不是变量） | 卡片、按钮的圆角大小 | 你选中的元素 |
```

系统里还有更多变量，但这张表覆盖了绝大部分用户真正会改的需求；表外的变量没人保证效果，改了后果自负。

---

## 4. 区域定点改

如果你不想全站统一改，只想改"首页卡片"或者"网络质量页"这一小块，可以用下面这几个**前缀选择器**，把改动范围锁定在对应区域，不会影响到别的页面。

**首页 · 卡片视图**

前缀：`[data-home-shell="1"][data-home-view="card"]`，再配合 `.server-card`（每张服务器卡片本身的类名）。

```css
/* 例1：卡片圆角改大一点 */
[data-home-shell="1"][data-home-view="card"] .server-card {
  border-radius: 1rem;
}
/* 例2：鼠标悬停时加个发光阴影 */
[data-home-shell="1"][data-home-view="card"] .server-card:hover {
  box-shadow: 0 0 20px rgba(0, 184, 217, 0.3);
}
```

> 提示：`data-home-shell`、`data-home-view` 这两个属性和 `.server-card` 这个类名，是页面代码用来"识别现在显示的是哪种视图、这是不是一张服务器卡"的标识，**别改它们的名字，也别用 `display:none` 这类方式把它们藏起来**——只改颜色、圆角、阴影、边框这类纯外观的属性就好。

**首页 · 列表视图**

前缀：`[data-home-shell="1"][data-home-view="list"]`，容器是 `#list-grid-container`。

```css
/* 例1：列表行之间的分隔线颜色 */
[data-home-shell="1"][data-home-view="list"] .server-card {
  border-bottom-color: rgba(0, 184, 217, 0.3);
}
/* 例2：列表行 hover 高亮 */
[data-home-shell="1"][data-home-view="list"] .server-card:hover {
  background: var(--hover-bg-color);
}
```

> 提示：`#list-grid-container` 是页面代码用来定位"列表容器在哪里"的标识，**别改名、别删除**，只改这个容器内部元素的外观属性。

**详情页（含标签页 Tab）**

前缀：`.stat-hero-surface`（详情页顶部大卡片）、`.glass-card.surface-card`（详情页内的小面板）。标签页切换用的类名是 `.nav-tab`（标签按钮）和 `.tab-panel`（标签对应的内容区）。

```css
/* 例1：详情页顶部大卡片圆角和边框 */
.stat-hero-surface {
  border-radius: 0.5rem 1.5rem;
  border-color: rgba(124, 58, 237, 0.3);
}
/* 例2：当前选中的标签页按钮颜色 */
.nav-tab.active {
  color: var(--accent-base-color);
}
```

> 提示：`.nav-tab` 和 `.tab-panel` 是页面代码用来"记住你点了哪个标签、该显示哪块内容"的标识，**别改名字**，只改这两个类上的颜色、字重、边框这类外观。

**网络质量页**

前缀：`.network-quality-page`，页面顶部大卡片是 `#nq-dashboard-hero-card`。

```css
/* 例1：整页背景卡片圆角 */
.network-quality-page .dashboard-card {
  border-radius: 0.25rem 1.25rem;
}
/* 例2：顶部大卡片边框颜色 */
#nq-dashboard-hero-card {
  border-color: rgba(0, 184, 217, 0.35);
}
```

> 提示：`#nq-dashboard-hero-card` 是页面代码用来定位"这是网络质量页顶部那张卡"的标识，**别改名、别删除**，只改外观属性。

---

## 5. 这些不要碰

下面这份是**闭合清单**——也就是"就这些，不会再多"。这些变量或选择器背后是页面的 JavaScript 代码在实时读写、或者拿来识别"这是哪个元素、该干什么"的，你在自定义 CSS 里覆盖了它们，轻则设置项失灵，重则页面功能直接坏掉。

```markdown
| 名称 | 属于哪类功能 | 覆盖后果 |
|------|-------------|---------|
| `--glass-blur` `--glass-saturation` `--glass-border-opacity` `--glass-contrast` `--glass-light-opacity` `--glass-dark-opacity` `--glass-bg-alpha-dark` `--glass-opacity` `--glass-hover-bg-alpha-light` `--glass-hover-bg-alpha-dark` | 毛玻璃效果的强度参数 | 后台"毛玻璃"设置里的滑杆会失灵，拖动滑杆没反应 |
| `--accent-runtime-color` `--surface-runtime-color` `--surface-runtime-color-rgb` `--surface-runtime-dark-color` `--surface-runtime-dark-rgb` `--dark-bg-runtime-color` `--dark-bg-runtime-rgb` | 个性化设置里"强调色/卡片底色"实时生效用的变量 | 你在后台改强调色或卡片底色，改了也不生效 |
| `--hs-glass-blur` `--hs-glass-saturation` `--hs-glass-contrast` `--hs-accent` `--hs-accent-rgb` `--hs-accent-soft` `--hs-accent-soft-rgb` `--hs-border` `--hs-border-strong` `--hs-border-hover` `--hs-glow-sm` `--hs-glow-md` `--hs-glow-lg` `--hs-surface` `--hs-surface-strong` | Tron 展示主题专属的一套变量 | 该主题的展示效果会乱 |
| `--wallpaper-image` `--wallpaper-brightness` `--wallpaper-blur` | 首页背景壁纸的图片/亮度/模糊参数 | 后台的壁纸设置不生效，首屏还可能闪一下 |
| `--nq-cols` | 网络质量页表格的响应式列数 | 表格在不同屏幕宽度下的排列会错乱 |
| `--agent-sidebar-width` | 终端/Agent 侧边栏的宽度 | 侧边栏布局错位 |
| `data-home-shell` `data-home-view` `data-home-view-slot` `data-glass` | 首页视图切换、毛玻璃开关状态的识别标识 | 首页卡片/列表视图切换或毛玻璃开关失效 |
| `.nav-tab`（含 `.active`）`.tab-panel` `.tab-content-container` | 详情页标签页切换 | 点标签页切换不了内容 |
| `#card-grid-container` `#list-grid-container` | 首页卡片/列表容器定位 | 首页布局错乱或渲染异常 |
| `.server-card` | 服务器卡片的核心标识（很多脚本靠它定位卡片） | 排序、拖拽、刷新这些卡片相关功能可能坏 |
| `#nq-dashboard-hero-card`（含 `.filter-active`） | 网络质量页顶部卡片的筛选状态标识 | 筛选功能失效 |
| `#download-speed-progress` `#upload-speed-progress` | 首页下载/上传网速进度条（脚本每秒都在重画它的位置） | 你写的位移/过渡样式会跟脚本打架，进度条卡死或抖动 |
```

**这些变量/类名后面写的"名字"本身不要动**（比如别把 `.server-card` 改名成别的），只是"不要在自定义 CSS 里给它们设置新的值或者覆盖它们的行为"。如果你只是想改这些元素的颜色、圆角这类纯外观，用上面第 4 节里给的前缀选择器去改，不要直接改这份清单里列出的这些名字本身管的属性（比如别去写 `--glass-blur: 0` 这种）。

---

## 6. 常用片段库 + AI 提示词模板

下面每段代码都可以单独复制使用，用到的锚点全部经过核实、安全可改（个别是第 3、4 节表之外的补充锚点，如顶栏和下拉菜单），贴进「自定义 CSS」文本框直接可用。

**顶栏**

```css
/* 顶部导航栏底色和边框 */
#main-navbar {
  border-bottom: 1px solid var(--border-accent-color);
}
/* 当前选中的导航项颜色 */
.nav-link-active {
  color: var(--accent-base-color);
}
```

**下拉菜单**

```css
/* 下拉菜单面板样式 */
.dropdown-menu {
  border: 1px solid var(--border-accent-color);
  border-radius: 0.5rem;
}
/* 下拉菜单选项 hover 高亮 */
.dropdown-menu__item:hover {
  background: var(--hover-bg-color);
}
```

**表单控件**

```css
/* 输入框圆角和边框 */
input[type="text"], input[type="search"], textarea {
  border-radius: 0.5rem;
  border: 1px solid var(--light-border-color);
}
:root.dark input[type="text"], :root.dark input[type="search"], :root.dark textarea {
  border-color: var(--dark-border-color);
}
```

**玻璃卡（磨砂质感卡片）**

```css
/* 给首页卡片开启磨砂玻璃质感（需配合后台"毛玻璃"开关一起开） */
[data-home-shell="1"] .server-card.glass-card {
  border-radius: 0.75rem;
}
```

**异形卡（切角卡片）**

```css
/* 卡片切成八边形的斜切角效果 */
[data-home-shell="1"] .server-card {
  clip-path: polygon(
    0% 10px, 10px 0%, calc(100% - 10px) 0%, 100% 10px,
    100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0% calc(100% - 10px)
  );
}
```

**整站小主题（深海蓝，日夜都改）**

```css
:root:not(.dark) {
  --light-bg-color: #0a1929;
  --light-card-bg-color: rgba(255, 255, 255, 0.9);
  --light-text-color: #0c1220;
}
:root.dark {
  --dark-bg-color: #030712;
  --dark-card-bg-color: rgba(15, 23, 42, 0.72);
  --dark-text-color: #e0f2fe;
}
:root { --accent-base-color: #22d3ee; }
```

### AI 提示词模板

如果你不想自己写 CSS，把下面这段话连同"我的需求"一起发给能联网的 AI（比如让它先打开本页链接，或者你直接把本页内容复制粘贴给它）：

**路径一（AI 能打开网页）：**

```
请打开并阅读这个页面，按照它的规则帮我写自定义 CSS：
（把你浏览器地址栏里本页的网址粘贴到这里）

我的需求：（这里描述你想要的风格，比如"整体偏暗紫色，卡片圆角大一点"）

请只输出可以直接粘贴使用的 CSS 代码，不要输出其它解释文字。
```

**路径二（AI 不能打开网页 / 对话有字数限制，用短粘贴版）：**

```
请按照以下四条硬性规则帮我写自定义 CSS：
1. 只能使用下面【可改清单】里出现过的变量名和选择器，不能用清单以外的。
2. 不允许发明和已有变量长得很像的"新变量名"（比如看到 --card-bg-color 就编一个 --card-surface-bg）。
3. 凡是改日间/夜间颜色的变量，必须分别写在 `:root:not(.dark) { }` 和 `:root.dark { }` 里面，不能写在外层的 `:root { }` 里。
4. 下面【禁止清单】里列出的任何名字，都不允许出现在你生成的代码里。

【可改清单】（把第 3、5 节两张表贴在这里）

我的需求：（描述你想要的风格）

请只输出可以直接粘贴使用的 CSS 代码，不要输出其它解释文字。
```

改坏了怎么办：不用担心，随时可以在 **个性化 → 高级设置** 里把「启用站方自定义样式」开关关掉，前台立刻恢复原样，你贴的代码还留着，改好了再打开；或者直接把文本框内容清空。
