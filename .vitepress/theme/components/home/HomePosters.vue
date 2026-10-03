<script setup>
// 首页轮播海报：全宽深色画布，左文右图互不遮挡。截图来自真实面板（节点名、IP 已换成演示数据）。
import { onMounted, onBeforeUnmount, ref } from 'vue'
import PosterGlobe from './PosterGlobe.vue'
import PosterRoute from './PosterRoute.vue'
import PosterAI from './PosterAI.vue'

const DURATION = 8000
const SLIDES = [
  { key: 'ai', label: 'AI 运维', acc: '#a78bfa' },
  { key: 'net', label: '网络质量', acc: '#34d399' },
  { key: 'mtr', label: 'MTR 路由', acc: '#fbbf24' },
  { key: 'unlock', label: '流媒体解锁', acc: '#f472b6' },
  { key: 'app', label: '客户端', acc: '#60a5fa' }
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
  left = DURATION
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
  io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; if (inView) last = Date.now() - (DURATION - left) })
  io.observe(root.value)
})
onBeforeUnmount(() => { clearInterval(timer); io && io.disconnect() })
</script>

<template>
  <section ref="root" class="posters" @mouseenter="pause(true)" @mouseleave="pause(false)">
    <div class="stage">
      <!-- 1 AI 运维 -->
      <article :class="['slide', { on: cur === 0 }]" :style="{ '--acc': SLIDES[0].acc }">
        <div class="glow g-ai" />
        <div class="copy">
          <div class="tag"><i />AI 解读 · 终端 · MCP</div>
          <h2>AI 运维</h2>
          <p>按优先级列出需要处理的节点。在终端、Telegram、客户端，以及 Claude、Codex 中直接排查和修复。</p>
          <div class="facts"><div><b>24 小时</b><span>节点数据解读</span></div><div><b>4 类入口</b><span>终端 · TG · App · MCP</span></div></div>
          <a class="go" href="/ai">了解 AI 功能 →</a>
        </div>
        <div class="visual"><PosterAI :active="cur === 0" /></div>
      </article>

      <!-- 2 网络质量 -->
      <article :class="['slide', { on: cur === 1 }]" :style="{ '--acc': SLIDES[1].acc }">
        <div class="glow g-net" />
        <div class="copy">
          <div class="tag"><i />网络质量</div>
          <h2>网络质量监控</h2>
          <p>Ping、TCPing 与 HTTP 多目标持续检测。延迟、抖动与丢包按节点和时间回看，异常线路自动标出。</p>
          <div class="facts"><div><b>3 种协议</b><span>Ping · TCPing · HTTP</span></div><div><b>30 天</b><span>历史回看</span></div></div>
          <a class="go" href="/monitor">查看网络质量 →</a>
        </div>
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

      <!-- 3 MTR 路由 -->
      <article :class="['slide', { on: cur === 2 }]" :style="{ '--acc': SLIDES[2].acc }">
        <div class="glow g-mtr" />
        <div class="copy">
          <div class="tag"><i />路由监控</div>
          <h2>MTR 路由监控</h2>
          <p>定时追踪到目标的完整路由，自动识别 CN2 GIA 等线路类型。逐跳延迟与丢包按天回放，丢包节点一眼可见。</p>
          <div class="facts"><div><b>90 天</b><span>路由历史</span></div><div><b>逐跳</b><span>延迟 · 丢包 · ASN</span></div></div>
          <a class="go" href="/monitor">查看路由监控 →</a>
        </div>
        <div class="visual route-box"><PosterRoute v-if="cur === 2" /></div>
      </article>

      <!-- 4 流媒体解锁 -->
      <article :class="['slide', { on: cur === 3 }]" :style="{ '--acc': SLIDES[3].acc }">
        <div class="glow g-unlock" />
        <div class="copy">
          <div class="tag"><i />解锁检测</div>
          <h2>流媒体解锁检测</h2>
          <p>定时检测 Netflix、YouTube Premium、Disney+ 等平台的解锁状态与地区，结果按次保存，变化可追溯。</p>
          <div class="facts"><div><b>15 / 21</b><span>本次解锁</span></div><div><b>定时</b><span>按计划自动检测</span></div></div>
          <a class="go" href="/monitor">查看解锁检测 →</a>
        </div>
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

      <!-- 5 客户端 -->
      <article :class="['slide', { on: cur === 4 }]" :style="{ '--acc': SLIDES[4].acc }">
        <div class="glow g-app" />
        <div class="copy">
          <div class="tag"><i />TestFlight 公测</div>
          <h2>iOS 与 macOS 客户端</h2>
          <p>扫码连接自己的面板。节点监控、终端、AI 与告警推送，覆盖 iPhone 与 Mac。</p>
          <div class="facts"><div><b>2 个平台</b><span>iPhone · Mac</span></div><div><b>Apple Push</b><span>告警实时推送</span></div></div>
          <a class="go" href="/apple-app">了解客户端 →</a>
        </div>
        <div class="visual">
          <div class="mac"><img src="/home-mac.webp" alt="macOS 客户端" loading="lazy"></div>
          <div class="phone app-phone"><div class="scr"><span class="isl" /><img src="/home-ios.webp" alt="iOS 客户端" loading="lazy"></div></div>
        </div>
      </article>
    </div>

    <nav class="tabs" aria-label="切换海报">
      <button v-for="(s, i) in SLIDES" :key="s.key" :class="['tab', { on: cur === i, done: i < cur }]" :aria-current="cur === i" @click="go(i)">
        <span class="ln"><b :key="`${round}-${i}`" :class="{ run: cur === i, hold: paused }" /></span>
        <span class="lb">{{ s.label }}</span>
      </button>
    </nav>
  </section>
</template>

<style scoped>
.posters { position: relative; background: #06070a; color: #f5f5f4; overflow: hidden; isolation: isolate; }
.posters::before { content: ""; position: absolute; inset: 0; z-index: -1; opacity: .5; background-image: radial-gradient(rgba(255,255,255,.14) 1px, transparent 1px); background-size: 24px 24px; -webkit-mask-image: radial-gradient(80% 70% at 65% 45%, #000, transparent 78%); mask-image: radial-gradient(80% 70% at 65% 45%, #000, transparent 78%); }
.stage { position: relative; height: clamp(600px, 68vh, 720px); overflow: hidden; }
.slide { position: absolute; inset: 0; display: grid; grid-template-columns: minmax(340px, 420px) 1fr; gap: 56px; max-width: 1440px; margin: 0 auto; padding: 72px 56px 24px; opacity: 0; visibility: hidden; transition: opacity .8s ease, visibility .8s; }
.slide.on { opacity: 1; visibility: visible; }
.glow { position: absolute; inset: -10% -20%; z-index: -1; pointer-events: none; transition: opacity 1s; }
.g-ai { background: radial-gradient(40% 55% at 70% 35%, rgba(139,92,246,.32), transparent 70%), radial-gradient(30% 40% at 95% 85%, rgba(16,185,129,.14), transparent 70%); }
.g-net { background: radial-gradient(40% 60% at 68% 45%, rgba(16,185,129,.24), transparent 70%), radial-gradient(30% 40% at 95% 20%, rgba(56,189,248,.16), transparent 70%); }
.g-mtr { background: radial-gradient(40% 55% at 72% 50%, rgba(245,158,11,.20), transparent 70%), radial-gradient(30% 40% at 45% 90%, rgba(16,185,129,.12), transparent 70%); }
.g-unlock { background: radial-gradient(40% 55% at 70% 45%, rgba(236,72,153,.20), transparent 70%), radial-gradient(30% 40% at 95% 90%, rgba(99,102,241,.16), transparent 70%); }
.g-app { background: radial-gradient(40% 55% at 70% 40%, rgba(59,130,246,.28), transparent 70%), radial-gradient(30% 40% at 95% 90%, rgba(16,185,129,.10), transparent 70%); }

.copy { align-self: center; padding-bottom: 40px; }
.copy > * { opacity: 0; transform: translateY(12px); transition: opacity .7s ease, transform .7s ease; }
.slide.on .copy > * { opacity: 1; transform: none; }
.slide.on .copy > :nth-child(2) { transition-delay: .08s; } .slide.on .copy > :nth-child(3) { transition-delay: .16s; }
.slide.on .copy > :nth-child(4) { transition-delay: .24s; } .slide.on .copy > :nth-child(5) { transition-delay: .3s; }
.tag { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; letter-spacing: .08em; color: rgba(255,255,255,.6); }
.tag i { width: 6px; height: 6px; border-radius: 50%; background: var(--acc); box-shadow: 0 0 14px var(--acc); }
h2 { margin: 18px 0 0; padding: 0; border: 0; font-size: clamp(38px, 4.2vw, 56px); line-height: 1.06; font-weight: 700; letter-spacing: -.035em; color: #fafaf9; text-wrap: balance; }
.copy p { margin: 20px 0 0; font-size: 16px; line-height: 1.8; color: rgba(255,255,255,.6); }
.facts { display: flex; gap: 32px; margin-top: 32px; }
.facts b { display: block; font-size: 26px; font-weight: 650; letter-spacing: -.02em; color: #fff; font-variant-numeric: tabular-nums; }
.facts span { font-size: 12px; color: rgba(255,255,255,.48); }
.go { display: inline-block; margin-top: 32px; font-size: 14px; font-weight: 600; color: #fff !important; text-decoration: none !important; border-bottom: 1px solid rgba(255,255,255,.35); padding-bottom: 3px; transition: border-color .2s; }
.go:hover { border-color: var(--acc); }

.visual { position: relative; min-width: 0; margin-right: -56px; }


.lat { position: absolute; right: 56px; top: 50%; transform: translateY(-50%); z-index: 3; width: 260px; padding: 16px 18px; border-radius: 16px; background: rgba(14,15,18,.72); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); box-shadow: 0 0 0 1px rgba(255,255,255,.1), 0 30px 60px -20px rgba(0,0,0,.7); }
.lat-head { font-size: 12px; color: rgba(255,255,255,.5); margin-bottom: 8px; }
.lat-row { display: grid; grid-template-columns: 12px 1fr auto; align-items: center; column-gap: 8px; row-gap: 0; padding: 7px 0; font-size: 13px; color: rgba(255,255,255,.82); border-top: 1px solid rgba(255,255,255,.06); }
.lat-row i { width: 7px; height: 7px; border-radius: 50%; background: var(--c); box-shadow: 0 0 10px var(--c); }
.lat-row b { font-variant-numeric: tabular-nums; color: #fff; font-weight: 650; }
.lat-row em { grid-column: 2 / 4; font-style: normal; font-size: 11px; color: rgba(255,255,255,.42); }
.lat-row.bad b { color: #fca5a5; }

.route-box { display: flex; align-items: center; padding: 10px 40px 30px 0; }

.unlock { padding: 8px 56px 40px 0; display: flex; flex-direction: column; }
.radar { position: absolute; width: 560px; height: 560px; left: 50%; top: 48%; transform: translate(-50%, -50%); z-index: -1; opacity: .5; }
.radar circle { fill: none; stroke: rgba(244,114,182,.18); }
.radar .sweep { fill: rgba(244,114,182,.14); transform-origin: 300px 300px; animation: sweep 6s linear infinite; }
@keyframes sweep { to { transform: rotate(360deg); } }
.u-head { display: flex; justify-content: space-between; align-items: baseline; font-size: 12px; color: rgba(255,255,255,.5); margin-bottom: 12px; }
.u-head b { color: #fff; font-size: 15px; font-weight: 650; margin-right: 10px; }
.u-grid { flex: 1; display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: 1fr; gap: 10px; }
.u { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 0 16px; border-radius: 12px; background: rgba(255,255,255,.04); box-shadow: inset 0 0 0 1px rgba(255,255,255,.07); backdrop-filter: blur(6px); opacity: 0; transform: translateY(10px) scale(.98); transition: opacity .5s ease calc(var(--i) * 35ms + .2s), transform .5s ease calc(var(--i) * 35ms + .2s); }
.slide.on .u { opacity: 1; transform: none; }
.u .nm { font-size: 14px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.u .st { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; white-space: nowrap; }
.u .st::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: currentColor; box-shadow: 0 0 8px currentColor; }
.u.ok .st { color: #34d399; } .u.no .st { color: #f87171; } .u.ban .st { color: #fbbf24; }
.u.no, .u.ban { background: rgba(248,113,113,.05); }

.mac { position: absolute; left: 0; top: 40px; width: calc(100% - 300px); border-radius: 12px; overflow: hidden; box-shadow: 0 0 0 1px rgba(255,255,255,.14), 0 60px 120px -30px rgba(0,0,0,.85); transform: translateY(16px); transition: transform 1.2s cubic-bezier(.2,.7,.2,1); }
.slide.on .mac { transform: none; }
.mac img { display: block; width: 100%; }
.app-phone { right: 56px; top: 40px; }

.phone { position: absolute; z-index: 4; width: 210px; padding: 8px; border-radius: 44px; background: linear-gradient(145deg, #4a4b50, #18191c 38%, #303136); box-shadow: 0 0 0 1px #0a0a0b, inset 0 0 0 1px rgba(255,255,255,.16), 0 50px 90px -24px rgba(0,0,0,.9); transform: translateY(30px); opacity: 0; transition: transform 1.1s cubic-bezier(.2,.7,.2,1) .25s, opacity .9s ease .25s; animation: float 7s ease-in-out infinite; }
.slide.on .phone { transform: none; opacity: 1; }
.phone::before, .phone::after { content: ""; position: absolute; left: -3px; width: 3px; border-radius: 2px; background: #3a3b40; }
.phone::before { top: 104px; height: 46px; } .phone::after { top: 160px; height: 46px; }
.scr { position: relative; border-radius: 37px; overflow: hidden; background: #000; }
.scr img { display: block; width: 100%; }
.isl { position: absolute; top: 9px; left: 50%; transform: translateX(-50%); width: 70px; height: 20px; border-radius: 11px; background: #000; z-index: 2; }
@keyframes float { 50% { translate: 0 -8px; } }


.tabs { position: relative; display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px; max-width: 1440px; margin: 0 auto; padding: 8px 56px 34px; }
.tab { appearance: none; border: 0; background: none; padding: 0; text-align: left; cursor: pointer; font: inherit; color: rgba(255,255,255,.42); }
.ln { display: block; height: 2px; border-radius: 2px; background: rgba(255,255,255,.12); overflow: hidden; }
.ln b { display: block; height: 100%; width: 0; background: #fff; }
.ln b.run { animation: fill 8s linear forwards; }
.ln b.hold { animation-play-state: paused; }
.tab.done .ln b { width: 100%; }
.lb { display: block; margin-top: 12px; font-size: 13px; font-weight: 600; transition: color .3s; }
.tab.on .lb, .tab:hover .lb { color: #fff; }
@keyframes fill { from { width: 0; } to { width: 100%; } }

@media (max-width: 1080px) {
  .stage { height: auto; min-height: 860px; }
  .slide { grid-template-columns: 1fr; grid-template-rows: auto 1fr; gap: 24px; padding: 48px 24px 16px; }
  .copy { padding-bottom: 0; }
  .visual { margin-right: -24px; min-height: 440px; }
  .facts { margin-top: 22px; } .go { margin-top: 22px; }
  .phone { width: 150px; padding: 6px; border-radius: 32px; } .scr { border-radius: 27px; }
  .lat { width: 220px; }
  .u-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); grid-auto-rows: 48px; }
  .unlock { margin-right: 0; padding-right: 0; }
  .u { padding: 0 12px; } .u .nm { font-size: 13px; } .u .st { font-size: 11px; }
  .u:nth-child(n + 13) { display: none; } /* 窄屏只放前 12 个平台 */
  .mac { width: 100%; } .app-phone { right: 0; top: 120px; }
  .lat { display: none; }
  .tabs { padding: 8px 24px 28px; gap: 10px; } .lb { font-size: 11px; }
}
@media (prefers-reduced-motion: reduce) {
  .sweep, .phone { animation: none !important; }
}
</style>
