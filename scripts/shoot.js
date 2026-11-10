"use strict";

// 从官方 Demo 拍文档截图（规范：主仓 docs/用户文档/文档更新规范.md「图文并茂」）：
// 浅色黑白灰、不显示壁纸和 Demo 横幅、关掉提醒，给要点的元素加红框，输出 webp。
// 用法（在文档仓根目录）：node scripts/shoot.js <清单.json> public
// 依赖 Playwright 和本机 Chrome：本仓放在主仓目录里时，直接用主仓 node_modules 里的 Playwright。
// 只点开界面、不提交：清单里的 before 不要写「保存」「确认删除」这类会真的改数据的按钮，共用 Demo 上不做真实修改。
// 清单每项：{ file, path, clip: CSS 选择器（裁这个元素的区域，可选，缺省整屏）, pad: 裁剪留白像素,
//            highlight: [按钮文字，或 css:选择器], before: [先点击的文字或 css:选择器，或 fill:选择器=示例值 往输入框填值] }
// 按钮文字要和界面完全一致；文字后面带数字的（如「选中全部筛选结果（15）」）用 css:button:has-text('选中全部筛选结果')。
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { chromium } = require("playwright");

const BASE = "https://demo.vps.mom";

async function dismiss(page) {
  for (const text of ["7 天内不再提醒", "30 天内不再提醒"]) {
    const button = page.getByText(text, { exact: true });
    try { await button.first().waitFor({ timeout: 2500 }); await button.first().click(); await page.waitForTimeout(300); } catch (_) {}
  }
}

async function clean(page) {
  // 后台壁纸是 #wallpaper-layer；前台（新访客前端）壁纸走根节点的 --wallpaper-image 变量和 .ds-wallpaper-video
  await page.addStyleTag({ content: "#wallpaper-layer,.ds-wallpaper-video{display:none!important} html{--wallpaper-image:none!important}" });
  await page.evaluate(() => {
    for (const el of document.querySelectorAll("div,p,section")) {
      if (el.childElementCount <= 2 && /官方共享演示环境/.test(el.textContent || "") && el.getBoundingClientRect().height < 80) el.style.display = "none";
    }
  });
}

// 找看得见的那一个：同名元素常有隐藏的副本（模板、折叠区），先按控件角色找，再按文字找
async function firstVisible(locator) {
  const n = await locator.count();
  for (let i = 0; i < n; i++) { const one = locator.nth(i); if (await one.isVisible()) return one; }
  return null;
}
async function locate(page, target) {
  if (target.startsWith("css:")) return (await firstVisible(page.locator(target.slice(4)))) || page.locator(target.slice(4)).first();
  for (const role of ["button", "tab", "link", "menuitem", "radio", "checkbox"]) {
    const hit = await firstVisible(page.getByRole(role, { name: target, exact: true }));
    if (hit) return hit;
  }
  const text = await firstVisible(page.getByText(target, { exact: true }));
  if (!text) return page.getByText(target, { exact: true }).first();
  const wrapped = text.locator("xpath=ancestor-or-self::*[self::button or self::a or @role='button' or @role='tab'][1]");
  return (await wrapped.count()) && (await wrapped.first().isVisible()) ? wrapped.first() : text;
}

(async () => {
  const [listFile, outDir] = process.argv.slice(2);
  const shots = JSON.parse(fs.readFileSync(listFile, "utf8"));
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 2, locale: "zh-CN", colorScheme: "light" });
  await ctx.addInitScript(() => { try { localStorage.setItem("theme_mode", "light"); localStorage.setItem("theme", "light"); } catch (_) {} });
  const login = await ctx.newPage();
  await login.goto(`${BASE}/login`, { waitUntil: "domcontentloaded", timeout: 45000 });
  await login.waitForURL(/admin/, { timeout: 30000 });
  await login.close();
  for (const shot of shots) {
    // 每张图开一个新页面：登录状态在同一个浏览器里共用，上一张留下的页面状态（如展开的 AI 侧边栏，存在 sessionStorage）不带到下一张
    const page = await ctx.newPage();
    await page.goto(`${BASE}${shot.path}`, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(2500);
    await dismiss(page);
    await clean(page);
    let skipped = false;
    for (const text of shot.before || []) {
      try {
        // fill:选择器=值 只往输入框里填示例值（不提交），用于要先填内容界面才出来的画面
        const fill = text.startsWith("fill:") ? text.slice(5).match(/^(.*?)=(.*)$/s) : null;
        if (fill) await page.locator(fill[1]).first().fill(fill[2], { timeout: 8000 });
        else await (await locate(page, text)).click({ timeout: 8000 });
        await page.waitForTimeout(1200);
      }
      catch (_) { console.log(`  点不到：${text}，这张跳过`); skipped = true; break; }
    }
    if (skipped) { await page.close(); continue; }
    // 先找到所有要标的元素，只滚到第一个，再一次性取位置：逐个滚动会让前面算好的框错位
    const targets = [];
    for (const target of shot.highlight || []) {
      try { targets.push({ target, el: await locate(page, target) }); } catch (_) { console.log(`  未找到要标的元素：${target}`); }
    }
    if (targets.length) await targets[0].el.scrollIntoViewIfNeeded({ timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(300);
    const boxes = [];
    for (const { target, el } of targets) {
      const box = await el.boundingBox({ timeout: 5000 }).catch(() => null);
      if (box) boxes.push(box); else console.log(`  未找到要标的元素：${target}`);
    }
    await page.evaluate((list) => {
      document.querySelectorAll(".doc-shot-mark").forEach((e) => e.remove());
      for (const b of list) {
        const mark = document.createElement("div");
        mark.className = "doc-shot-mark";
        Object.assign(mark.style, { position: "fixed", left: `${b.x - 4}px`, top: `${b.y - 4}px`, width: `${b.width + 8}px`, height: `${b.height + 8}px`,
          border: "2px solid #e5484d", borderRadius: "6px", zIndex: 2147483647, pointerEvents: "none" });
        document.body.appendChild(mark);
      }
    }, boxes);
    // 鼠标移到角落，免得带出悬停提示
    await page.mouse.move(1279, 799);
    await page.waitForTimeout(300);
    let clip;
    if (shot.clip) {
      const region = await (await locate(page, shot.clip)).boundingBox({ timeout: 5000 }).catch(() => null);
      if (region) { const pad = shot.pad ?? 12; clip = { x: Math.max(0, region.x - pad), y: Math.max(0, region.y - pad), width: Math.min(1280, region.width + pad * 2), height: region.height + pad * 2 }; }
      else console.log(`  未找到裁剪区域：${shot.clip}，改拍整屏`);
    }
    const png = path.join(outDir, shot.file.replace(/\.webp$/, ".png"));
    await page.screenshot({ path: png, clip });
    // 转成 webp（质量 80）；比 1600 宽的缩到 1600，窄的裁剪图保持原尺寸不放大；本机没有 cwebp 就保留 png
    const out = path.join(outDir, shot.file.replace(/\.png$/, ".webp"));
    const width = fs.readFileSync(png).readUInt32BE(16);
    const resize = width > 1600 ? ["-resize", "1600", "0"] : [];
    try { execFileSync("cwebp", ["-quiet", "-q", "80", ...resize, png, "-o", out]); fs.unlinkSync(png); console.log(`拍好：${out}`); }
    catch (_) { console.log(`拍好（未转 webp）：${png}`); }
    await page.close();
  }
  await browser.close();
})().catch((e) => { console.error("截图失败：", e.message); process.exit(1); });
