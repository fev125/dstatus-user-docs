<script setup>
// AI 运维海报：一眼看懂「发现 → 排序 → 修复」。
// 一片节点里冒出几台有问题的（红/黄），标上处理顺序；AI 光点按顺序过去，逐台变绿。
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps({ active: { type: Boolean, default: true } })
const COLS = 10, ROWS = 6, SIZE = 52, GAP = 14
// 有问题的节点：[格子序号, 严重程度]，按处理顺序排列
const ISSUES = [[23, 'red'], [47, 'red'], [8, 'amber'], [36, 'amber']]
// 修好后打勾覆盖在机箱上，插槽变淡
const tiles = Array.from({ length: COLS * ROWS }, (_, i) => ({ i, x: (i % COLS) * (SIZE + GAP), y: Math.floor(i / COLS) * (SIZE + GAP) }))
const W = COLS * (SIZE + GAP) - GAP, H = ROWS * (SIZE + GAP) - GAP

const phase = ref(0) // 0 待机 1 发现 2 排序 3 修复中 4 完成
const flagged = ref(new Map()) // 序号 → 严重程度
const fixed = ref(new Set())
const orb = ref({ x: W + 60, y: H / 2, on: false })
const scanX = ref(-80)
let timers = [], io, seen = false
const later = (ms, fn) => timers.push(setTimeout(fn, ms))
const center = idx => ({ x: tiles[idx].x + SIZE / 2, y: tiles[idx].y + SIZE / 2 })

function run() {
  timers.forEach(clearTimeout); timers = []
  flagged.value = new Map(); fixed.value = new Set(); phase.value = 1
  orb.value = { x: W + 60, y: H / 2, on: false }; scanX.value = -80
  later(50, () => { scanX.value = W + 80 })
  ISSUES.forEach(([idx, sev], k) => later(300 + (tiles[idx].x / W) * 1100, () => { flagged.value = new Map(flagged.value).set(idx, sev) }))
  later(1700, () => { phase.value = 2 })
  ISSUES.forEach(([idx], k) => {
    const t = 2600 + k * 1050
    later(t, () => { phase.value = 3; orb.value = { ...center(idx), on: true } })
    later(t + 650, () => { fixed.value = new Set(fixed.value).add(idx) })
  })
  const end = 2600 + ISSUES.length * 1050 + 200
  later(end, () => { phase.value = 4; orb.value = { x: W + 60, y: H / 2, on: false } })
  later(end + 1600, () => { if (props.active && seen) run() })
}
const root = ref(null)
const order = idx => ISSUES.findIndex(([i]) => i === idx) + 1
const tileClass = t => {
  if (fixed.value.has(t.i)) return 'fixed'
  return flagged.value.get(t.i) || ''
}
watch(() => props.active, on => { if (on && seen) run(); else timers.forEach(clearTimeout) })
onMounted(() => {
  // 进入视野才开始播，避免用户滚到这里时动画早已播完、只剩一片绿
  io = new IntersectionObserver(([e]) => {
    const was = seen
    seen = e.isIntersecting && e.intersectionRatio >= 0.6
    if (seen && !was && props.active) run()
    if (!seen) timers.forEach(clearTimeout)
  }, { threshold: [0, 0.6, 0.85] })
  io.observe(root.value)
})
onBeforeUnmount(() => { timers.forEach(clearTimeout); io && io.disconnect() })
</script>

<template>
  <div ref="root" class="ai-vis">
    <svg :viewBox="`-40 -40 ${W + 80} ${H + 80}`" class="field" role="img" aria-label="AI 找出有问题的节点并按顺序修复">
      <defs>
        <linearGradient id="ai-beam" x1="0" x2="1">
          <stop offset="0" stop-color="#a78bfa" stop-opacity="0" />
          <stop offset=".5" stop-color="#a78bfa" stop-opacity=".55" />
          <stop offset="1" stop-color="#a78bfa" stop-opacity="0" />
        </linearGradient>
        <radialGradient id="ai-orb"><stop offset="0" stop-color="#fff" /><stop offset=".35" stop-color="#c4b5fd" /><stop offset="1" stop-color="#8b5cf6" stop-opacity="0" /></radialGradient>
      </defs>
      <rect class="beam" x="0" y="-30" width="90" :height="H + 60" :style="{ transform: `translateX(${scanX}px)`, opacity: phase === 1 ? 1 : 0 }" />
      <g v-for="t in tiles" :key="t.i" :class="['tile', tileClass(t)]">
        <rect :x="t.x" :y="t.y" :width="SIZE" :height="SIZE" rx="10" class="box" />
        <rect :x="t.x + 9" :y="t.y + 14" :width="SIZE - 18" height="9" rx="2.5" class="slot" />
        <rect :x="t.x + 9" :y="t.y + 29" :width="SIZE - 18" height="9" rx="2.5" class="slot" />
        <circle :cx="t.x + SIZE - 15" :cy="t.y + 18.5" r="2.6" class="led" />
        <circle :cx="t.x + SIZE - 15" :cy="t.y + 33.5" r="2.6" class="led" />
        <g v-if="fixed.has(t.i)" class="check">
          <circle :cx="t.x + SIZE / 2" :cy="t.y + SIZE / 2" r="17" class="burst" />
          <path :d="`M ${t.x + 18} ${t.y + 27} l 6 6 l 11 -12`" class="tick" />
        </g>
        <g v-if="flagged.has(t.i) && phase >= 2 && !fixed.has(t.i)" class="badge">
          <circle :cx="t.x + SIZE - 2" :cy="t.y + 2" r="13" />
          <text :x="t.x + SIZE - 2" :y="t.y + 7">{{ order(t.i) }}</text>
        </g>
      </g>
      <g class="orb" :class="{ on: orb.on }" :style="{ transform: `translate(${orb.x}px, ${orb.y}px)` }">
        <circle r="34" fill="url(#ai-orb)" opacity=".55" />
        <circle r="7" fill="#fff" />
      </g>
    </svg>
    <ol class="steps">
      <li :class="{ on: phase >= 1 }"><i>1</i>发现</li>
      <li :class="{ on: phase >= 2 }"><i>2</i>排序</li>
      <li :class="{ on: phase >= 3 }"><i>3</i>修复</li>
    </ol>
  </div>
</template>

<style scoped>
.ai-vis { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; gap: 26px; padding: 10px 56px 30px 0; }
.field { width: 100%; max-height: 470px; overflow: visible; }
.beam { fill: url(#ai-beam); transition: transform 1.5s cubic-bezier(.4,0,.2,1), opacity .4s; }
.box { fill: rgba(255,255,255,.035); stroke: rgba(255,255,255,.08); transition: fill .4s, stroke .4s; }
.slot { fill: none; stroke: rgba(255,255,255,.14); stroke-width: 1.2; transition: stroke .3s; }
.led { fill: #34d399; opacity: .7; transition: fill .3s, opacity .3s; }
.tile.red .slot { stroke: rgba(248,113,113,.55); } .tile.amber .slot { stroke: rgba(251,191,36,.5); }
.tile.fixed .slot { stroke: rgba(52,211,153,.18); }
.tile.red .box { fill: rgba(248,113,113,.14); stroke: rgba(248,113,113,.7); }
.tile.red .led { fill: #f87171; opacity: 1; filter: drop-shadow(0 0 8px #f87171); animation: blink 1s ease-in-out infinite; }
.tile.amber .box { fill: rgba(251,191,36,.12); stroke: rgba(251,191,36,.65); }
.tile.amber .led { fill: #fbbf24; opacity: 1; filter: drop-shadow(0 0 8px #fbbf24); animation: blink 1.4s ease-in-out infinite; }
.tile.fixed .box { fill: rgba(52,211,153,.14); stroke: rgba(52,211,153,.7); }
.tile.fixed .led { opacity: 0; }
@keyframes blink { 50% { opacity: .35; } }
.burst { fill: none; stroke: #34d399; stroke-width: 2; transform-box: fill-box; transform-origin: center; animation: burst .7s ease-out forwards; }
@keyframes burst { from { opacity: 1; transform: scale(.4); } to { opacity: 0; transform: scale(1.8); } }
.tick { fill: none; stroke: #34d399; stroke-width: 3.5; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 30; stroke-dashoffset: 30; animation: draw .35s ease-out .1s forwards; }
@keyframes draw { to { stroke-dashoffset: 0; } }
.badge circle { fill: #fff; }
.badge text { fill: #111214; font-size: 15px; font-weight: 800; text-anchor: middle; }
.orb { opacity: 0; transition: transform .6s cubic-bezier(.5,0,.2,1), opacity .3s; }
.orb.on { opacity: 1; }
.steps { display: flex; gap: 36px; margin: 0; padding: 0 0 0 4px; list-style: none; }
.steps li { display: flex; align-items: center; gap: 10px; font-size: 15px; font-weight: 600; color: rgba(255,255,255,.35); transition: color .4s; }
.steps i { display: grid; place-items: center; width: 24px; height: 24px; border-radius: 50%; font-style: normal; font-size: 12px; background: rgba(255,255,255,.08); transition: background .4s, color .4s; }
.steps li.on { color: #fff; }
.steps li.on i { background: #a78bfa; color: #111214; }
@media (max-width: 1080px) { .ai-vis { padding: 0 24px 20px 0; } }
@media (prefers-reduced-motion: reduce) { .beam, .orb, .led { transition: none; animation: none !important; } }
</style>
