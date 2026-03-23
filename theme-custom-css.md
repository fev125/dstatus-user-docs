---
title: 主题 CSS 自定义
description: 前台组件与选择器对照、首页 Card 前缀与区块、整站示例 CSS
---

# 主题 CSS 自定义

**入口**：**管理后台 → 个性化设置 → 主题设置 → 前台自定义 CSS**。仅作用于**前台**（非 `/admin`）；**管理后台**不应用这段 CSS。保存时**不要**使用 `@import` 或 `url(http...)` 拉外部资源；公开同步接口**不返回** CSS 正文。

---

## 提示词（可选）

将下面整段复制到能打开链接、阅读本页内容的工具；在「我的需求」里写清风格。将得到的 **CSS** 粘贴到 **个性化设置 → 主题设置 → 前台自定义 CSS**，保存即可。

```
请阅读并遵守此页的约束与章节说明（页面内表格与示例即规范）：
https://docs.vps.mom/theme-custom-css

我的需求：（在此描述风格，例如：整站偏赛博朋克冷色；或只改首页卡片视图，卡片更圆、阴影更轻）

请只输出可直接粘贴到「前台自定义 CSS」的 CSS 代码，不要其它解释。
```

---

## 章节速览

| 需求 | 见 |
|------|-----|
| 各页常用类名 / 锚点 | **§二** |
| 只改首页「卡片视图」里每张服务器卡 | **§三**（固定前缀 + 禁止项） |
| 整站变量、顶栏 / 下拉 | **§四** |
| 一整段示例（赛博朋克风） | **§五** |

---

## 目录

1. [各节对照什么](#一各节对照什么)
2. [页面与锚点](#二手动验证与页面锚点)
3. [首页 Card：前缀与可改区块](#三首页-card前缀与可改区块)
4. [整站：变量名与顶栏下拉](#四整站变量名与顶栏下拉)
5. [附录：赛博朋克整段示例 CSS](#五附录赛博朋克整站示例-css-全文)

---

## 一、各节对照什么 {#一各节对照什么}

| 章节 | 对照内容 |
|------|----------|
| **§二** | 首页 Card/List、单节点、网络质量等 **页面 → 常用选择器**；附短样例 |
| **§三** | 首页 **卡片视图** 内：服务器卡各区块类名、**必选前缀**、禁止项 |
| **§四** | **整站** 日间/夜间变量名（`--light-*` / `--dark-*`）、顶栏 `#main-navbar`、下拉 `.dropdown-menu` 等 |
| **§五** | **一整段** 示例 CSS，注释按块标了顶栏、首页卡、网络质量、单节点等 |

---

## 二、页面与锚点 {#二手动验证与页面锚点}

下表为**前台**常见路由；**不要**用它们去改 `/admin/*`。

可选：写入后台前用浏览器插件或 DevTools 临时注入试效果，并确认后台页未被误伤。

### 2.1 页面 → 锚点

| 页面 | 锚点 |
|------|------|
| 首页 Card | `[data-home-shell="1"][data-home-view="card"]`、`#card-grid-container`、`.server-card` |
| 首页 List | `[data-home-shell="1"][data-home-view="list"]`、`#list-grid-container`、`.server-card.list-row-card` |
| 单节点 | `.card.glass-card.surface-card`、`#main-system-icon-container`、`.stat-chip` |
| 网络质量 | `.network-quality-page`、`#nq-dashboard-hero-card`、`.nq-search-input` |

### 2.2 常用变量名

`--accent-color`、`--bg-color`、`--card-bg-color`、`--text-color`、`--border-color` 等（**§五** 示例里有成块写法）。

### 2.3 样例 CSS（仅前台）

```css
/* 前台验证样例：青绿主色 + 卡片圆角 */
body:not(.admin) {
  --accent-color: #0f766e;
  --border-color: rgba(15, 118, 110, 0.18);
  --card-shadow: 0 10px 30px rgba(15, 23, 42, 0.1);
  --card-hover-shadow: 0 18px 42px rgba(15, 23, 42, 0.16);
}
[data-home-shell="1"] .server-card {
  border-radius: 20px;
  border: 1px solid var(--border-color);
  box-shadow: var(--card-shadow);
}
[data-home-shell="1"] .server-card:hover {
  box-shadow: var(--card-hover-shadow);
  transform: translateY(-2px);
}
[data-home-shell="1"] .card-title-link {
  color: var(--accent-color);
  font-weight: 700;
}
body .space-y-4 > .card.glass-card.surface-card:first-child {
  border-radius: 24px;
}
.network-quality-page #nq-dashboard-hero-card {
  border-radius: 24px;
}
```

### 2.4 验收

首页 card/list、单节点主卡、NQ 搜索框有变化，且 **`/admin/*` 未被误伤**。勿使用 `@import` 或外域资源。

---

## 三、首页 Card：前缀与可改区块 {#三首页-card前缀与可改区块}

首页 **卡片视图**（常带 `theme=card`）。下面表格即 **类名 → 能改什么**；生成或手写 CSS 时须遵守 **§3.1 前缀** 与 **§3.3 禁止项**。

### 3.1 硬约束：作用域前缀

每条规则选择器必须以 **`[data-home-shell="1"][data-home-view="card"]`** 开头。

### 3.2 区块对照表

| 区块 | 职责 | 建议 DIY |
|------|------|----------|
| `.server-card` | 整卡外框 | 圆角、边框、背景、阴影、hover |
| `.offline-badge` 等 | 离线徽标 | 色、圆角；勿拆遮罩语义 |
| `.card-title-link`、`[id$="_status_indicator"]` | 标题、状态点 | 色、字重、发光 |
| `.progress-fill-*`、`.traffic-bar` | 进度与流量条 | 填充色、渐变 |
| `.dstatus-tag-chip` 等 | 标签 | 胶囊样式 |

**不建议**：改 `.metric-item` / `.server-card-metrics-stack` 的 `display`、`grid`、`flex-direction` 及离线遮罩定位链。

### 3.3 禁止项

**属性**：大范围 `display`/`position`/`grid`/`flex-direction`/`overflow`/`z-index`、`pointer-events`、`!important`、长时无限 `animation` 等。  
**选择器**：勿以 `body`/`html`/`:root`（单独）、`.dashboard-card`、`.list-row-card`、`.network-quality-page` 等为**唯一**定位误伤其它页。

### 3.4 输出约定（便于粘贴）

1. 只输出 CSS  
2. 每条选择器必须以 `[data-home-shell="1"][data-home-view="card"]` 开头  
3. 不用 `!important`  
4. 不要 markdown 代码块标记（便于粘贴）  

### 3.5 示例

```css
[data-home-shell="1"][data-home-view="card"] .server-card {
  border-radius: 22px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.1);
}
[data-home-shell="1"][data-home-view="card"] .card-title-link {
  color: #0f172a;
  font-weight: 700;
}
```

写入后台时会有安全校验（前缀、禁外链等）。

---

## 四、整站：变量名与顶栏 / 下拉 {#四整站变量名与顶栏下拉}

与 **§五** 示例对照阅读即可。整站换肤主要改 **`--light-*`（日间）**、**`--dark-*`（夜间）**，写在 **`:root:not(.dark)`** 与 **`:root.dark`** 下，见 **§五** 第 1、2 大段。

**常用选择器**：顶栏 `#main-navbar`，下拉 **`.glass-dropdown`、`.dropdown-menu`**，首页壳 **`[data-home-shell="1"]`**，网络质量 **`.network-quality-page`**。颜色多用 `var(--text-color)` 等。

**顶栏 / 下拉异常时**：少给整页或大容器加极高 **`z-index`**；少加 **`transform` / `filter` / 过低 `opacity`**；避免父级 **`overflow: hidden`** 挡住下拉；优先改下拉自身样式。卡片 **`z-index` 过高** 可能盖住下拉。

**毛玻璃 / 壁纸**：示例里用 **`html[data-glass="on"]`**、`body.has-background-image` 等选择器，与 **§五** 注释块一致即可。

---

## 五、附录：赛博朋克整站示例（CSS 全文） {#五附录赛博朋克整站示例-css-全文}

复制到 **前台自定义 CSS** 即可。下文按 **注释块** 对应界面：**日间/夜间变量** → **页面底** → **顶栏** → **Footer** → **下拉** → **输入框** → **首页大卡/服务器卡** → **网络质量** → **单节点** → **账单** → **标签**。

**§三** 只管首页卡片「前缀」；**§五** 是整站示例。若只改卡片区域，仍以 §三 为准。

### 5.1 设计对照（与下文 CSS 块序号一致）

| 块 | 主要控制 |
|----|----------|
| 1–2 | 日间 / 夜间 `--light-*`、`--dark-*`、强调色 |
| 3 | 前台页背景（无侧栏后台壳时） |
| 4–5 | 顶栏 `#main-navbar`、页脚 `footer` |
| 6–7 | 下拉、表单输入 |
| 8–9 | 首页仪表盘大卡、服务器卡异形 |
| 10–13 | 网络质量、单节点、账单、标签 |

### 5.2 赛博朋克示例 CSS 全文（可直接复制）

```css
/* =============================================================================
   DStatus 前台赛博朋克 · 示例（按块对应 §5.1 表）
   ============================================================================= */

/* ----- 1) 日间：--light-* 与强调色 ----- */
:root:not(.dark) {
  --light-bg-color: #dbeafe;
  --light-bg-color-rgb: 219, 234, 254;
  --light-text-color: #0c1220;
  --light-secondary-text-color: #475569;
  --light-border-color: rgba(6, 182, 212, 0.38);
  --light-border-color-rgb: 6, 182, 212;
  --light-card-bg-color: rgba(255, 255, 255, 0.9);
  --light-card-bg-color-rgb: 255, 255, 255;
  --light-hover-bg-color: rgba(6, 182, 212, 0.14);
  --light-highlight-color: rgba(124, 58, 237, 0.12);
  --light-progress-bg-color: rgba(226, 232, 240, 0.85);
  --light-progress-cpu-color: #0891b2;
  --light-progress-memory-color: #7c3aed;
  --light-progress-swap-color: #6366f1;
  --light-progress-disk-color: #db2777;
  --light-progress-network-color: #059669;
  --accent-base-color: #00b8d9;
  --accent-runtime-color: #00b8d9;
  --accent-ssr-color: #00b8d9;
  --accent-color-rgb: 0, 184, 217;
  --success-color: #059669;
  --warning-color: #d97706;
  --error-color: #e11d48;
  --info-color: #7c3aed;
  --card-shadow-base-light: 0 2px 8px rgba(8, 51, 68, 0.08), 0 0 0 1px rgba(6, 182, 212, 0.15);
  --card-shadow-hover-light: 0 8px 28px rgba(8, 51, 68, 0.12), 0 0 0 1px rgba(124, 58, 237, 0.12);
  --shadow-md: 0 8px 28px rgba(10, 15, 26, 0.12), 0 0 0 1px rgba(0, 229, 255, 0.12);
  --shadow-lg: 0 18px 48px rgba(10, 15, 26, 0.16), 0 0 0 1px rgba(124, 77, 255, 0.15);
  --cyber-edge: linear-gradient(135deg, rgba(0, 229, 255, 0.55), rgba(255, 45, 106, 0.45));
}

/* ----- 2) 夜间：--dark-* ----- */
:root.dark {
  --dark-bg-color: #030712;
  --dark-bg-color-rgb: 3, 7, 18;
  --dark-text-color: #e0f2fe;
  --dark-secondary-text-color: #94a3b8;
  --dark-border-color: rgba(34, 211, 238, 0.28);
  --dark-border-color-rgb: 34, 211, 238;
  --dark-card-bg-color: rgba(15, 23, 42, 0.72);
  --dark-card-bg-color-rgb: 15, 23, 42;
  --dark-hover-bg-color: rgba(34, 211, 238, 0.12);
  --dark-highlight-color: rgba(167, 139, 250, 0.15);
  --dark-progress-bg-color: rgba(51, 65, 85, 0.55);
  --dark-progress-cpu-color: #22d3ee;
  --dark-progress-memory-color: #c084fc;
  --dark-progress-swap-color: #818cf8;
  --dark-progress-disk-color: #f472b6;
  --dark-progress-network-color: #4ade80;
  --accent-base-color: #22d3ee;
  --accent-runtime-color: #22d3ee;
  --accent-ssr-color: #22d3ee;
  --accent-color-rgb: 34, 211, 238;
  --success-color: #34d399;
  --warning-color: #fbbf24;
  --error-color: #fb7185;
  --info-color: #c4b5fd;
  --card-shadow-base-dark: 0 2px 10px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(34, 211, 238, 0.12);
  --card-shadow-hover-dark: 0 10px 36px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(167, 139, 250, 0.18);
  --shadow-md: 0 10px 36px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(0, 245, 255, 0.18);
  --shadow-lg: 0 22px 56px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(179, 136, 255, 0.2);
}

/* ----- 3) 前台页背景 / 主容器 ----- */
body:not(:has(.admin-layout-container)).bg-theme-body {
  background-image:
    radial-gradient(ellipse 120% 80% at 10% -10%, rgba(0, 229, 255, 0.14), transparent 50%),
    radial-gradient(ellipse 100% 60% at 100% 20%, rgba(124, 77, 255, 0.12), transparent 45%),
    linear-gradient(180deg, var(--bg-color), color-mix(in srgb, var(--bg-color) 88%, #000));
}

:root.dark body:not(:has(.admin-layout-container)).bg-theme-body {
  background-image:
    radial-gradient(ellipse 100% 70% at 20% 0%, rgba(0, 245, 255, 0.08), transparent 55%),
    radial-gradient(ellipse 80% 50% at 100% 30%, rgba(179, 136, 255, 0.1), transparent 50%),
    linear-gradient(185deg, #070b14, #020308);
}

body.has-background-image:not(:has(.admin-layout-container)) #container {
  position: relative;
  z-index: 1;
}

/* ----- 4) 顶栏 ----- */
body:not(:has(.admin-layout-container)) #main-navbar .bg-white\/95,
body:not(:has(.admin-layout-container)) #main-navbar .dark\:bg-slate-900\/95 {
  background: color-mix(in srgb, var(--card-bg-color) 78%, transparent) !important;
  border-bottom: 1px solid color-mix(in srgb, var(--accent-color) 25%, var(--border-color));
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
}

body:not(:has(.admin-layout-container)) #main-navbar .nav-link {
  border-radius: 0.375rem;
  transition: color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
}

body:not(:has(.admin-layout-container)) #main-navbar .nav-link-active {
  color: var(--accent-color);
  box-shadow: inset 0 -2px 0 0 var(--accent-color);
}

body:not(:has(.admin-layout-container)) #main-navbar .nav-link:hover {
  background: var(--hover-bg-color);
}

body:not(:has(.admin-layout-container)) #main-navbar span.bg-gradient-to-r {
  background-image: linear-gradient(90deg, #00e5ff, #7c4dff, #ff2d6a);
}

:root.dark body:not(:has(.admin-layout-container)) #main-navbar span.bg-gradient-to-r {
  background-image: linear-gradient(90deg, #5ffcfc, #b388ff, #ff5c9a);
}

/* ----- 5) Footer ----- */
body:not(:has(.admin-layout-container)) footer {
  border-top-color: color-mix(in srgb, var(--accent-color) 28%, var(--border-color));
  background: color-mix(in srgb, var(--card-bg-color) 75%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

body:not(:has(.admin-layout-container)) footer .border-theme-light {
  border-color: var(--border-color);
}

/* ----- 6) 下拉与玻璃面板 ----- */
body:not(:has(.admin-layout-container)) .glass-dropdown,
body:not(:has(.admin-layout-container)) .dropdown-menu {
  border: 1px solid color-mix(in srgb, var(--accent-color) 35%, var(--border-color));
  background: color-mix(in srgb, var(--card-bg-color) 92%, transparent);
  box-shadow: var(--shadow-lg);
}

body:not(:has(.admin-layout-container)) .dropdown-menu__item:hover,
body:not(:has(.admin-layout-container)) .dropdown-menu__item:focus-visible {
  background: var(--hover-bg-color);
}

body:not(:has(.admin-layout-container)) .dropdown-divider,
body:not(:has(.admin-layout-container)) .border-theme,
body:not(:has(.admin-layout-container)) .border-theme-light {
  border-color: color-mix(in srgb, var(--accent-color) 18%, var(--border-color));
}

/* ----- 7) 通用输入、选择 ----- */
body:not(:has(.admin-layout-container)) .bg-theme-input,
body:not(:has(.admin-layout-container)) input[type="text"],
body:not(:has(.admin-layout-container)) input[type="search"],
body:not(:has(.admin-layout-container)) input[type="number"],
body:not(:has(.admin-layout-container)) textarea {
  border-radius: 0.5rem;
  border: 1px solid color-mix(in srgb, var(--accent-color) 22%, var(--border-color));
  background: color-mix(in srgb, var(--card-bg-color) 88%, transparent);
  color: var(--text-color);
}

body:not(:has(.admin-layout-container)) .bg-theme-input:focus,
body:not(:has(.admin-layout-container)) input:focus,
body:not(:has(.admin-layout-container)) textarea:focus {
  outline: none;
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent-color) 35%, transparent);
  border-color: color-mix(in srgb, var(--accent-color) 50%, var(--border-color));
}

body:not(:has(.admin-layout-container)) .form-select,
body:not(:has(.admin-layout-container)) select {
  border-radius: 0.5rem;
  border: 1px solid color-mix(in srgb, var(--accent-color) 25%, var(--border-color));
  background: color-mix(in srgb, var(--card-bg-color) 90%, transparent);
  color: var(--text-color);
}

/* ----- 8) 首页 Dashboard 卡 ----- */
[data-home-shell="1"] .dashboard-card,
[data-home-shell="1"] .region-container.dashboard-card {
  border-radius: 0.25rem 1rem 0.25rem 1rem;
  border: 1px solid color-mix(in srgb, var(--accent-color) 35%, var(--border-color));
  background: color-mix(in srgb, var(--card-bg-color) 88%, transparent);
  box-shadow: var(--shadow-md);
}

html[data-glass="on"] [data-home-shell="1"] .dashboard-card.glass-card {
  backdrop-filter: blur(14px) saturate(1.15);
  -webkit-backdrop-filter: blur(14px) saturate(1.15);
}

/* ----- 9) 首页 Card / List 异形卡 ----- */
[data-home-shell="1"] .server-card {
  border-radius: 0.35rem;
  clip-path: polygon(
    0% 10px,
    10px 0%,
    calc(100% - 14px) 0%,
    100% 14px,
    100% calc(100% - 10px),
    calc(100% - 10px) 100%,
    14px 100%,
    0% calc(100% - 14px)
  );
  border: 1px solid color-mix(in srgb, var(--accent-color) 40%, var(--border-color));
  background: color-mix(in srgb, var(--card-bg-color) 90%, transparent);
  box-shadow:
    0 0 0 1px color-mix(in srgb, var(--accent-color) 15%, transparent),
    var(--shadow-md);
}

[data-home-shell="1"] .server-card:hover {
  box-shadow:
    0 0 24px color-mix(in srgb, var(--accent-color) 22%, transparent),
    var(--shadow-lg);
}

html[data-glass="on"] [data-home-shell="1"] .server-card.glass-card {
  backdrop-filter: blur(16px) saturate(1.2);
  -webkit-backdrop-filter: blur(16px) saturate(1.2);
}

#card-grid-container .server-card .server-card-handle,
#list-grid-container .server-card .server-card-handle {
  border-bottom-color: color-mix(in srgb, var(--accent-color) 22%, var(--border-color));
}

/* ----- 10) 网络质量页 ----- */
.network-quality-page .dashboard-card,
.network-quality-page .glass-card,
.network-quality-page #nq-dashboard-hero-card {
  border-radius: 0.25rem 1.25rem 0.25rem 1rem;
  border: 1px solid color-mix(in srgb, var(--accent-color) 32%, var(--border-color));
  background: color-mix(in srgb, var(--card-bg-color) 85%, transparent);
  box-shadow: var(--shadow-md);
}

html[data-glass="on"] .network-quality-page .glass-card {
  backdrop-filter: blur(14px) saturate(1.15);
  -webkit-backdrop-filter: blur(14px) saturate(1.15);
}

.network-quality-page .border-theme-light,
.network-quality-page .border-theme {
  border-color: color-mix(in srgb, var(--accent-color) 22%, var(--border-color));
}

/* ----- 11) 单节点详情 ----- */
body:not(:has(.admin-layout-container)) .stat-hero-surface {
  border-radius: 0.5rem 1.5rem 0.5rem 0.75rem;
  border: 1px solid color-mix(in srgb, var(--accent-color) 28%, var(--border-color));
  background: color-mix(in srgb, var(--card-bg-color) 82%, transparent);
}

body:not(:has(.admin-layout-container)) .glass-card.surface-card.card-hover {
  border: 1px solid color-mix(in srgb, var(--accent-color) 30%, var(--border-color));
  border-radius: 0.35rem 1rem 0.75rem 0.35rem;
  box-shadow: var(--shadow-md);
}

html[data-glass="on"] body:not(:has(.admin-layout-container)) .blur-enabled.glass-card {
  backdrop-filter: blur(16px) saturate(1.15);
  -webkit-backdrop-filter: blur(16px) saturate(1.15);
}

body:not(:has(.admin-layout-container)) .stat-chip {
  border: 1px solid color-mix(in srgb, var(--accent-color) 25%, var(--border-color));
}

/* ----- 12) 账单报告 ----- */
[data-billing-report-root="1"] .admin-card,
[data-billing-report-root="1"] .glass-card {
  border-radius: 0.25rem 1rem;
  border: 1px solid color-mix(in srgb, var(--accent-color) 32%, var(--border-color));
  background: color-mix(in srgb, var(--card-bg-color) 88%, transparent);
  box-shadow: var(--shadow-md);
}

html[data-glass="on"] [data-billing-report-root="1"] .glass-card {
  backdrop-filter: blur(14px) saturate(1.1);
  -webkit-backdrop-filter: blur(14px) saturate(1.1);
}

[data-billing-report-root="1"] .border-theme-light,
[data-billing-report-root="1"] .border-theme {
  border-color: color-mix(in srgb, var(--accent-color) 22%, var(--border-color));
}

/* ----- 13) 首页标签 ----- */
[data-home-shell="1"] .dstatus-custom-tags-row {
  border-top-color: color-mix(in srgb, var(--accent-color) 30%, var(--border-color));
}

[data-home-shell="1"] .dstatus-tag-chip {
  border: 1px solid color-mix(in srgb, var(--accent-color) 35%, var(--border-color));
  background: color-mix(in srgb, var(--card-bg-color) 70%, transparent);
}
```
