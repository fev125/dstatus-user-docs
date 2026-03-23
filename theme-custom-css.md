---
title: 主题 CSS 自定义
description: 前台自定义 CSS：入口与附录示例（细节见附录代码顶部注释）
---

# 主题 CSS 自定义

在 **管理后台 → 个性化设置 → 主题设置 → 前台自定义 CSS** 粘贴样式，只对**前台**（非 `/admin`）生效；管理后台不注入。

**注意**：不要用 `@import` 或 `url(http...)` 拉外部资源；访客同步接口**不返回** CSS 正文。  
**选择器、分段、常用 id** 一律在下方附录 **代码最上方注释**里，按顺序读即可。

---

## 提示词（可选）

将下面整段（含链接）发给能打开网页的工具，在「我的需求」里写清风格；把返回的 CSS 粘贴到「前台自定义 CSS」并保存。

```
请阅读并遵守（完整规范在本页附录 CSS 顶部注释）：
https://docs.vps.mom/theme-custom-css

我的需求：（描述想要的风格）

请只输出可粘贴的 CSS，不要其它解释。
```

---

## 附录：赛博朋克示例（全文）

复制下方代码框中的**全部内容**到「前台自定义 CSS」保存。

```css
/*
 * DStatus 前台自定义 CSS · 赛博朋克示例
 * 线上文档: https://docs.vps.mom/theme-custom-css
 *
 * 【怎么用】复制全文 → 管理后台 → 个性化设置 → 主题设置 → 前台自定义 CSS → 保存。
 *          仅前台生效（非 /admin）；勿 @import 或 url(http...) 外链；公开接口不返回 CSS 正文。
 *
 * 【配色】日间改 --light-* 写在 :root:not(.dark)；夜间改 --dark-* 写在 :root.dark。
 *        勿指望只写 :root { --text-color } 改日间，易被主题映射覆盖。
 *
 * 【只改首页「卡片视图」服务器卡】每条选择器必须以
 *   [data-home-shell="1"][data-home-view="card"] 开头；勿滥用 !important；勿大范围改布局属性。
 *
 * 【常用锚点 · 勿误伤 /admin】
 *   首页 Card: [data-home-shell="1"][data-home-view="card"], #card-grid-container, .server-card
 *   首页 List: [data-home-shell="1"][data-home-view="list"], #list-grid-container
 *   单节点: .card.glass-card.surface-card, .stat-chip
 *   网络质量: .network-quality-page, #nq-dashboard-hero-card
 *
 * 【仪表盘下载/上传网速条】与卡内 .progress-fill-* 不同。桌面:
 *   #download-progress-container / #download-speed-progress（绿）, #upload-progress-container / #upload-speed-progress
 *   移动: #mobile-download-progress-container, #mobile-upload-progress-container 等同理。
 *
 * 【顶栏/下拉】少给整页加极高 z-index；避免父级 overflow:hidden 挡住 .dropdown-menu
 *
 * 【下行 1～13 块】1～2 日间夜间变量 3 页背景 4 顶栏 5 页脚 6 下拉 7 表单 8 仪表盘大卡
 *              9 服务器卡异形 10 网络质量 11 单节点 12 账单 13 标签
 * ============================================================================= */

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
