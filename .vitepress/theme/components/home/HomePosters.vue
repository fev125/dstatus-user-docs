<script setup>
// 首页第一屏：开头文案 + 全宽轮播海报 + 底部带说明的标签条。
// 三块各管一件事：开头文案回答「这是什么、怎么开始」，不随海报切换；
// 海报用整个宽度放画面；每张海报自己的一句话说明和入口放在底部对应标签下。
// 截图来自真实面板（节点名、IP 已换成演示数据）。
import { onMounted, onBeforeUnmount, ref } from 'vue'
import PosterGlobe from './PosterGlobe.vue'
import PosterRoute from './PosterRoute.vue'
import PosterAI from './PosterAI.vue'

const DURATION = 8000
const SLIDES = [
  { key: 'ai', label: 'AI 运维', acc: '#a78bfa', dur: 11500, desc: '按优先级列出要处理的节点，AI 直接登上节点排查和修复。', href: '/ai', cta: '了解 AI 功能' }, // 这张要讲完一个修复故事，多留几秒
  { key: 'net', label: '网络质量', acc: '#34d399', desc: 'Ping、TCPing 与 HTTP 持续检测，延迟、抖动与丢包按节点回看。', href: '/monitor', cta: '查看网络质量' },
  { key: 'mtr', label: 'MTR 路由', acc: '#fbbf24', desc: '逐跳延迟与丢包按天回放，自动识别 CN2 GIA 等线路。', href: '/monitor', cta: '查看路由监控' },
  { key: 'unlock', label: '流媒体解锁', acc: '#f472b6', desc: '定时检测 Netflix、Disney+ 等平台的解锁状态与地区。', href: '/monitor', cta: '查看解锁检测' },
  { key: 'app', label: 'iOS / macOS 客户端', short: '客户端', acc: '#60a5fa', desc: '在 iPhone 与 Mac 上查看节点、使用终端与 AI，接收告警推送。', href: '/apple-app', cta: '了解客户端' }
]
// 2026-10-03 12:00 一台香港节点的真实检测结果（21 个平台）
const UNLOCK = [
  ['Netflix', 'ok', 'HK'], ['YouTube Premium', 'ok', 'HK'], ['Disney+', 'no'], ['Amazon Prime Video', 'ok', 'HK'],
  ['TikTok', 'no'], ['Spotify', 'no'], ['Bilibili', 'ok', 'HK'], ['iQiYi', 'ok', 'HK'], ['TVBAnywhere+', 'ok', 'HK'],
  ['Viu', 'ok', 'HK'], ['WeTV', 'ok', 'HK'], ['Steam', 'ok', 'HK'], ['Apple', 'ok', 'HK'], ['Google Play', 'ok', 'HK'],
  ['X', 'ok', 'HK'], ['Reddit', 'no'], ['Bing', 'ok', '全球'], ['Wikipedia 编辑', 'no'], ['Dazn', 'ban'],
  ['Netflix CDN', 'ok', 'HK'], ['YouTube CDN', 'ok', 'HK']
]
const unlockText = (s, r) => (s === 'ok' ? `解锁 · ${r}` : s === 'ban' ? '封禁' : '不可用')

const cur = ref(0)
const round = ref(0) // 每次切换 +1，让进度条动画重新开始
const paused = ref(false)
const root = ref(null)
let timer, left = DURATION, last = 0, inView = true, io

function go(i) {
  cur.value = (i + SLIDES.length) % SLIDES.length
  round.value++
  left = SLIDES[cur.value].dur || DURATION
  last = Date.now()
}
function pause(on) {
  if (on && !paused.value) left -= Date.now() - last
  if (!on) last = Date.now()
  paused.value = on
}
onMounted(() => {
  last = Date.now()
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = setInterval(() => {
    if (!paused.value && inView && Date.now() - last >= left) go(cur.value + 1)
  }, 200)
  // 海报大半进入视野才计时，免得用户还在看开头时轮播已经悄悄翻过几张
  inView = false
  io = new IntersectionObserver(([e]) => { const was = inView; inView = e.isIntersecting && e.intersectionRatio >= 0.55; if (inView && !was) go(cur.value) }, { threshold: [0, 0.55, 0.8] })
  io.observe(root.value)
})
onBeforeUnmount(() => { clearInterval(timer); io && io.disconnect() })
</script>

<template>
  <section ref="root" class="posters" @mouseenter="pause(true)" @mouseleave="pause(false)">
    <!-- 开头：这是什么、怎么开始。不随海报切换 -->
    <div class="top">
      <div class="row">
        <span class="eyebrow"><span class="dot" />DStatus 用户文档</span>
        <div class="actions">
          <a class="btn primary" href="/quick-start">安装面板 →</a>
          <a class="btn ghost" href="https://demo.vps.mom" target="_blank" rel="noreferrer">在线演示 ↗</a>
          <a class="link" href="/agent-guide">已有面板？接入节点</a>
        </div>
      </div>
      <h1>服务器监控与 AI 运维</h1>
      <p class="lead">私有化部署，一条命令安装。实时监控服务器状态、网络质量与续费到期，AI 登录节点排查故障、执行修复。</p>
    </div>

    <!-- 海报：整个宽度都是画面 -->
    <div class="stage">
      <article :class="['slide', { on: cur === 0 }]"><div class="glow g-ai" /><div class="visual"><PosterAI :active="cur === 0" /></div></article>

      <article :class="['slide', { on: cur === 1 }]">
        <div class="glow g-net" />
        <div class="visual">
          <PosterGlobe :active="cur === 1" />
          <div class="lat">
            <div class="lat-head">日本-03 → 国内目标 · 24 小时</div>
            <div class="lat-row"><i style="--c:#4ade80" />广州 CN2<b>70 ms</b><em>丢包 0%</em></div>
            <div class="lat-row"><i style="--c:#4ade80" />国内-05<b>115 ms</b><em>丢包 0.1%</em></div>
            <div class="lat-row"><i style="--c:#fbbf24" />广东电信<b>192 ms</b><em>丢包 0.3%</em></div>
            <div class="lat-row bad"><i style="--c:#f87171" />广东联通<b>533 ms</b><em>丢包 7.7%</em></div>
          </div>
        </div>
      </article>

      <article :class="['slide', { on: cur === 2 }]"><div class="glow g-mtr" /><div class="visual route-box"><PosterRoute v-if="cur === 2" /></div></article>

      <article :class="['slide', { on: cur === 3 }]">
        <div class="glow g-unlock" />
        <div class="visual unlock">
          <svg class="radar" viewBox="0 0 600 600" aria-hidden="true">
            <circle v-for="r in [80, 160, 240, 300]" :key="r" cx="300" cy="300" :r="r" />
            <path class="sweep" d="M300 300 L300 0 A300 300 0 0 1 512 88 Z" />
          </svg>
          <div class="u-head"><span><b>香港-01</b>IPv4 · 21 个平台</span><span>检测于 10-03 12:00</span></div>
          <div class="u-grid">
            <div v-for="([n, s, r], i) in UNLOCK" :key="n" :class="['u', s]" :style="{ '--i': i }">
              <span class="nm">{{ n }}</span><span class="st">{{ unlockText(s, r) }}</span>
            </div>
          </div>
        </div>
      </article>

      <article :class="['slide', { on: cur === 4 }]">
        <div class="glow g-app" />
        <div class="visual app">
          <div class="mac"><img src="/home-mac.webp" alt="macOS 客户端" loading="lazy"></div>
          <div class="phone"><div class="scr"><span class="isl" /><img src="/home-ios.webp" alt="iOS 客户端" loading="lazy"></div></div>
        </div>
      </article>
    </div>

    <!-- 标签条：每张海报一句话说明 + 入口 -->
    <nav class="tabs" aria-label="切换海报">
      <div v-for="(s, i) in SLIDES" :key="s.key" :class="['tab', { on: cur === i, done: i < cur }]" :style="{ '--acc': s.acc }" role="button" tabindex="0" :aria-current="cur === i" @click="go(i)" @keydown.enter="go(i)">
        <span class="ln"><b :key="`${round}-${i}`" :class="{ run: cur === i, hold: paused }" :style="{ '--dur': `${s.dur || DURATION}ms` }" /></span>
        <span class="lb"><span class="lb-long">{{ s.label }}</span><span class="lb-short">{{ s.short || s.label }}</span></span>
        <span class="ds">{{ s.desc }}</span>
        <a class="go" :href="s.href" :tabindex="cur === i ? 0 : -1" @click.stop>{{ s.cta }} →</a>
      </div>
    </nav>
    <!-- 窄屏：标签只留名字，当前这张的说明单独放一行 -->
    <div class="now">
      <p>{{ SLIDES[cur].desc }}</p>
      <a class="go" :href="SLIDES[cur].href">{{ SLIDES[cur].cta }} →</a>
    </div>
  </section>
</template>

<style scoped>
.posters { position: relative; background: #06070a; color: #f5f5f4; overflow: hidden; isolation: isolate; padding: 36px 0 20px; }
.posters::before { content: ""; position: absolute; inset: 0; z-index: -1; opacity: .5; background-image: radial-gradient(rgba(255,255,255,.14) 1px, transparent 1px); background-size: 24px 24px; -webkit-mask-image: radial-gradient(70% 60% at 50% 55%, #000, transparent 78%); mask-image: radial-gradient(70% 60% at 50% 55%, #000, transparent 78%); }
.posters a { text-decoration: none !important; }

/* 开头 */
.top { max-width: 1440px; margin: 0 auto; padding: 0 56px; animation: top-in .9s cubic-bezier(.2,.7,.2,1) both; }
@keyframes top-in { from { opacity: 0; transform: translateY(12px); } }
.row { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px 24px; }
.eyebrow { display: inline-flex; align-items: center; gap: 8px; font-size: 13px; color: rgba(255,255,255,.62); border: 1px solid rgba(255,255,255,.14); border-radius: 999px; padding: 4px 12px 4px 10px; background: rgba(255,255,255,.04); }
.dot { width: 7px; height: 7px; border-radius: 50%; background: #10b981; box-shadow: 0 0 0 3px rgba(16,185,129,.22); }
.actions { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
.btn { display: inline-flex; align-items: center; gap: 6px; height: 40px; padding: 0 16px; border-radius: 10px; font-size: 14px; font-weight: 600; transition: opacity .15s, border-color .15s; }
.btn.primary { background: #f5f5f4; color: #111214 !important; }
.btn.primary:hover { opacity: .88; }
.btn.ghost { border: 1px solid rgba(255,255,255,.18); color: #fff !important; }
.btn.ghost:hover { border-color: rgba(255,255,255,.45); }
.link { font-size: 14px; color: rgba(255,255,255,.6) !important; padding: 0 4px; }
.link:hover { color: #fff !important; }
h1 { margin: 22px 0 0; font-size: clamp(34px, 3.4vw, 48px); line-height: 1.1; font-weight: 700; letter-spacing: -.03em; color: #fafaf9; text-wrap: balance; }
.lead { margin: 12px 0 0; max-width: 820px; font-size: 16px; line-height: 1.7; color: rgba(255,255,255,.62); }

/* 舞台：高度 = 视口 − 导航 − 开头 − 标签条，整屏刚好放下 */
.stage { position: relative; max-width: 1440px; margin: 26px auto 0; padding: 0 56px; height: clamp(400px, calc(100vh - var(--vp-nav-height, 64px) - 382px), 640px); }
.slide { position: absolute; inset: 0; padding: 0 56px; opacity: 0; visibility: hidden; transition: opacity .8s ease, visibility .8s; }
.slide.on { opacity: 1; visibility: visible; }
.glow { position: absolute; inset: -30% -10%; z-index: -1; pointer-events: none; }
.g-ai { background: radial-gradient(34% 55% at 60% 40%, rgba(139,92,246,.30), transparent 70%), radial-gradient(26% 40% at 92% 85%, rgba(16,185,129,.14), transparent 70%); }
.g-net { background: radial-gradient(34% 60% at 40% 50%, rgba(16,185,129,.22), transparent 70%), radial-gradient(26% 40% at 90% 20%, rgba(56,189,248,.16), transparent 70%); }
.g-mtr { background: radial-gradient(40% 55% at 50% 50%, rgba(245,158,11,.18), transparent 70%), radial-gradient(26% 40% at 20% 90%, rgba(16,185,129,.12), transparent 70%); }
.g-unlock { background: radial-gradient(36% 55% at 50% 45%, rgba(236,72,153,.18), transparent 70%), radial-gradient(26% 40% at 92% 90%, rgba(99,102,241,.16), transparent 70%); }
.g-app { background: radial-gradient(36% 55% at 50% 40%, rgba(59,130,246,.26), transparent 70%), radial-gradient(26% 40% at 92% 90%, rgba(16,185,129,.10), transparent 70%); }
.visual { position: relative; height: 100%; min-width: 0; }

/* 网络质量：地球在左，延迟卡片在右 */
.lat { position: absolute; right: 0; top: 50%; transform: translateY(-50%); z-index: 3; width: 270px; padding: 16px 18px; border-radius: 16px; background: rgba(14,15,18,.72); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); box-shadow: 0 0 0 1px rgba(255,255,255,.1), 0 30px 60px -20px rgba(0,0,0,.7); }
.lat-head { font-size: 12px; color: rgba(255,255,255,.5); margin-bottom: 8px; }
.lat-row { display: grid; grid-template-columns: 12px 1fr auto; align-items: center; column-gap: 8px; row-gap: 0; padding: 7px 0; font-size: 13px; color: rgba(255,255,255,.82); border-top: 1px solid rgba(255,255,255,.06); }
.lat-row i { width: 7px; height: 7px; border-radius: 50%; background: var(--c); box-shadow: 0 0 10px var(--c); }
.lat-row b { font-variant-numeric: tabular-nums; color: #fff; font-weight: 650; }
.lat-row em { grid-column: 2 / 4; font-style: normal; font-size: 11px; color: rgba(255,255,255,.42); }
.lat-row.bad b { color: #fca5a5; }

.route-box { display: flex; align-items: center; justify-content: center; padding: 8px 0 12px; }

/* 流媒体解锁：平台按宽度自动分列 */
.unlock { display: flex; flex-direction: column; justify-content: center; }
.radar { position: absolute; width: 560px; height: 560px; left: 50%; top: 50%; transform: translate(-50%, -50%); z-index: -1; opacity: .5; }
.radar circle { fill: none; stroke: rgba(244,114,182,.18); }
.radar .sweep { fill: rgba(244,114,182,.14); transform-origin: 300px 300px; animation: sweep 6s linear infinite; }
@keyframes sweep { to { transform: rotate(360deg); } }
.u-head { display: flex; justify-content: space-between; align-items: baseline; font-size: 12px; color: rgba(255,255,255,.5); margin-bottom: 12px; }
.u-head b { color: #fff; font-size: 15px; font-weight: 650; margin-right: 10px; }
.u-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); grid-auto-rows: 52px; gap: 10px; }
.u { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 0 16px; border-radius: 12px; background: rgba(255,255,255,.04); box-shadow: inset 0 0 0 1px rgba(255,255,255,.07); backdrop-filter: blur(6px); opacity: 0; transform: translateY(10px) scale(.98); transition: opacity .5s ease calc(var(--i) * 35ms + .2s), transform .5s ease calc(var(--i) * 35ms + .2s); }
.slide.on .u { opacity: 1; transform: none; }
.u .nm { font-size: 14px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.u .st { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; white-space: nowrap; }
.u .st::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: currentColor; box-shadow: 0 0 8px currentColor; }
.u.ok .st { color: #34d399; } .u.no .st { color: #f87171; } .u.ban .st { color: #fbbf24; }
.u.no, .u.ban { background: rgba(248,113,113,.05); }

/* 客户端：Mac 截图 + iPhone，居中放 */
.app { max-width: 980px; margin: 0 auto; }
.mac { position: absolute; left: 0; top: 50%; width: calc(100% - 250px); max-height: 100%; border-radius: 12px; overflow: hidden; box-shadow: 0 0 0 1px rgba(255,255,255,.14), 0 60px 120px -30px rgba(0,0,0,.85); transform: translateY(calc(-50% + 16px)); opacity: 0; transition: transform 1.2s cubic-bezier(.2,.7,.2,1), opacity .8s; }
.slide.on .mac { transform: translateY(-50%); opacity: 1; }
.mac img { display: block; width: 100%; max-height: 100%; object-fit: cover; object-position: top left; }
.phone { position: absolute; right: 0; top: 50%; z-index: 4; width: 210px; padding: 8px; border-radius: 44px; background: linear-gradient(145deg, #4a4b50, #18191c 38%, #303136); box-shadow: 0 0 0 1px #0a0a0b, inset 0 0 0 1px rgba(255,255,255,.16), 0 50px 90px -24px rgba(0,0,0,.9); transform: translateY(calc(-50% + 30px)); opacity: 0; transition: transform 1.1s cubic-bezier(.2,.7,.2,1) .25s, opacity .9s ease .25s; }
.slide.on .phone { transform: translateY(-50%); opacity: 1; }
.phone::before, .phone::after { content: ""; position: absolute; left: -3px; width: 3px; border-radius: 2px; background: #3a3b40; }
.phone::before { top: 104px; height: 46px; } .phone::after { top: 160px; height: 46px; }
.scr { position: relative; border-radius: 37px; overflow: hidden; background: #000; }
.scr img { display: block; width: 100%; }
.isl { position: absolute; top: 9px; left: 50%; transform: translateX(-50%); width: 70px; height: 20px; border-radius: 11px; background: #000; z-index: 2; }

/* 标签条 */
.tabs { position: relative; display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px; max-width: 1440px; margin: 22px auto 0; padding: 0 56px; }
.tab { cursor: pointer; color: rgba(255,255,255,.42); outline: none; }
.tab:focus-visible .lb { color: #fff; text-decoration: underline; }
.ln { display: block; height: 2px; border-radius: 2px; background: rgba(255,255,255,.12); overflow: hidden; }
.ln b { display: block; height: 100%; width: 0; background: #fff; }
.ln b.run { animation: fill var(--dur, 8s) linear forwards; }
.ln b.hold { animation-play-state: paused; }
.tab.done .ln b { width: 100%; }
.lb { display: block; margin-top: 12px; font-size: 13.5px; font-weight: 650; transition: color .3s; }
.lb-short { display: none; }
.tab.on .lb, .tab:hover .lb { color: #fff; }
.ds { display: block; margin-top: 6px; font-size: 12.5px; line-height: 1.55; color: rgba(255,255,255,.42); min-height: 2.9em; transition: color .3s; }
.tab.on .ds { color: rgba(255,255,255,.66); }
.tab .go { display: inline-block; margin-top: 8px; font-size: 12.5px; font-weight: 600; color: #fff !important; border-bottom: 1px solid rgba(255,255,255,.35); padding-bottom: 1px; opacity: 0; transition: opacity .3s, border-color .2s; }
.tab.on .go { opacity: 1; }
.tab .go:hover { border-color: var(--acc); }
@keyframes fill { from { width: 0; } to { width: 100%; } }
.now { display: none; }

@media (max-width: 1080px) {
  .posters { padding: 28px 0 18px; }
  .top, .stage, .tabs { padding-left: 24px; padding-right: 24px; }
  .row { flex-direction: column; align-items: flex-start; }
  .stage { height: 600px; margin-top: 20px; }
  .slide { padding: 0 24px; }
  .lat { display: none; }
  .u-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); grid-auto-rows: 48px; }
  .u { padding: 0 12px; } .u .nm { font-size: 13px; } .u .st { font-size: 11px; }
  .u:nth-child(n + 13) { display: none; } /* 窄屏只放前 12 个平台 */
  .mac { width: 100%; } .phone { width: 150px; padding: 6px; border-radius: 32px; right: 0; } .scr { border-radius: 27px; }
  .tabs { gap: 10px; margin-top: 18px; } .lb { font-size: 11.5px; }
  .ds, .tab .go { display: none; }
  .now { display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 16px; max-width: 1440px; margin: 14px auto 0; padding: 0 24px; }
  .now p { margin: 0; font-size: 14px; line-height: 1.6; color: rgba(255,255,255,.66); }
  .now .go { font-size: 13.5px; font-weight: 600; color: #fff !important; border-bottom: 1px solid rgba(255,255,255,.35); padding-bottom: 1px; }
}
@media (max-width: 640px) {
  .stage { height: 620px; }
  .lb-long { display: none; } .lb-short { display: inline; }
  .actions .link { width: 100%; padding: 2px 0 0; }
  h1 { font-size: 32px; }
}
@media (prefers-reduced-motion: reduce) {
  .sweep, .phone, .top { animation: none !important; }
}
</style>
