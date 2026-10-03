<script setup>
// MTR 海报：一次真实路由（日本节点 → 119.121.*.*，2026-10-03）的逐跳动画。
// 第 7、10 跳不回应（显示 *、丢包 100%），第 9 跳丢包 20%；59.43.* 起进入 CN2 GIA（AS4809）。
const HOPS = [
  { ip: '142.91.*.*', where: 'AS134351 东京', ms: 1 },
  { ip: '23.106.*.*', where: 'AS134351 东京', ms: 1 },
  { ip: '23.106.*.*', where: 'AS134351 东京', ms: 6 },
  { ip: '61.200.*.*', where: 'AS2914 东京', ms: 6 },
  { ip: '117.103.*.*', where: 'AS2914 东京', ms: 3 },
  { ip: '59.43.*.*', where: '上海', ms: 53, cn2: true },
  { ip: '*', where: '不回应', ms: null, loss: 100, cn2: true },
  { ip: '59.43.*.*', where: '广州', ms: 57, cn2: true },
  { ip: '59.43.*.*', where: '上海', ms: 54, loss: 20, cn2: true },
  { ip: '*', where: '不回应', ms: null, loss: 100, cn2: true },
  { ip: '59.43.*.*', where: '上海', ms: 65, cn2: true },
  { ip: '119.121.*.*', where: '目标', ms: 62, cn2: true, end: true }
]
const W = 1000, H = 560
// 两行蛇形排布：上行 6 跳从左到右，下行 6 跳从右到左
const pos = HOPS.map((_, i) => {
  const row = i < 6 ? 0 : 1, k = row === 0 ? i : 11 - i
  return { x: 90 + k * 164, y: row === 0 ? 150 : 400 }
})
const d = (() => {
  let s = `M ${pos[0].x} ${pos[0].y}`
  for (let i = 1; i < pos.length; i++) {
    const a = pos[i - 1], b = pos[i]
    if (i === 6) s += ` C ${a.x + 150} ${a.y}, ${b.x + 150} ${b.y}, ${b.x} ${b.y}`
    else s += ` L ${b.x} ${b.y}`
  }
  return s
})()
const tone = h => (h.loss >= 100 ? 'dead' : h.loss ? 'warn' : h.cn2 ? 'gold' : 'ok')
const days = Array.from({ length: 30 }, (_, i) => i !== 12) // 缺的一天位置按历史曲线的断点
</script>

<template>
  <svg class="route" :viewBox="`0 0 ${W} ${H}`" role="img" aria-label="MTR 路由逐跳延迟示意">
    <defs>
      <linearGradient id="rt-line" x1="0" x2="1">
        <stop offset="0" stop-color="#34d399" />
        <stop offset="0.45" stop-color="#34d399" />
        <stop offset="0.55" stop-color="#fbbf24" />
        <stop offset="1" stop-color="#fbbf24" />
      </linearGradient>
      <filter id="rt-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" /></filter>
    </defs>
    <path :d="d" class="rail" />
    <path id="rt-path" :d="d" class="line" />
    <path :d="d" class="flow" />
    <g v-for="(h, i) in HOPS" :key="i" :class="['hop', tone(h)]" :style="{ '--i': i }">
      <circle :cx="pos[i].x" :cy="pos[i].y" r="30" class="halo" />
      <circle :cx="pos[i].x" :cy="pos[i].y" r="21" class="ring" />
      <text :x="pos[i].x" :y="pos[i].y + 6" class="num">{{ h.end ? '◎' : i + 1 }}</text>
      <text :x="pos[i].x" :y="pos[i].y - 46" class="ms">{{ h.ms == null ? '—' : h.ms + 'ms' }}</text>
      <text :x="pos[i].x" :y="pos[i].y + 56" class="ip">{{ h.ip }}</text>
      <text :x="pos[i].x" :y="pos[i].y + 74" class="where">{{ h.loss ? `${h.where} · 丢包 ${h.loss}%` : h.where }}</text>
    </g>
    <g class="badge" transform="translate(746 44)">
      <rect x="-78" y="-22" width="156" height="44" rx="10" />
      <text x="0" y="-2" class="b1">CN2 GIA</text>
      <text x="0" y="14" class="b2">AS4809 · 从第 6 跳起</text>
    </g>
    <circle r="5" class="pkt" filter="url(#rt-glow)"><animateMotion dur="5s" repeatCount="indefinite"><mpath href="#rt-path" /></animateMotion></circle>
    <circle r="3" class="pkt-core"><animateMotion dur="5s" repeatCount="indefinite"><mpath href="#rt-path" /></animateMotion></circle>
    <circle r="3" class="pkt-core"><animateMotion dur="5s" begin="-1.7s" repeatCount="indefinite"><mpath href="#rt-path" /></animateMotion></circle>
    <circle r="3" class="pkt-core"><animateMotion dur="5s" begin="-3.4s" repeatCount="indefinite"><mpath href="#rt-path" /></animateMotion></circle>
    <g class="days" transform="translate(90 520)">
      <text x="0" y="-14" class="cap">近 30 天路由快照 · 29 天有记录</text>
      <rect v-for="(on, i) in days" :key="i" :x="i * 28" y="0" width="20" height="8" rx="2" :class="on ? 'd-on' : 'd-off'" />
    </g>
  </svg>
</template>

<style scoped>
.route { width: 100%; height: 100%; overflow: visible; }
.rail { fill: none; stroke: rgba(255,255,255,.08); stroke-width: 10; stroke-linecap: round; }
.line { fill: none; stroke: url(#rt-line); stroke-width: 2.5; stroke-linecap: round; opacity: .85; }
.flow { fill: none; stroke: rgba(255,255,255,.55); stroke-width: 2; stroke-dasharray: 2 18; animation: rt-flow 1.2s linear infinite; }
@keyframes rt-flow { to { stroke-dashoffset: -40; } }
.hop .halo { fill: currentColor; opacity: .10; }
.hop .ring { fill: #0b0c0f; stroke: currentColor; stroke-width: 2.5; }
.hop.ok { color: #34d399; } .hop.gold { color: #fbbf24; } .hop.warn { color: #fb923c; } .hop.dead { color: #f87171; }
.hop.dead .halo, .hop.warn .halo { animation: rt-pulse 1.8s ease-in-out infinite; }
@keyframes rt-pulse { 50% { opacity: .32; } }
.hop text { text-anchor: middle; font-family: var(--vp-font-family-base); }
.num { fill: #fff; font-size: 15px; font-weight: 700; }
.ms { fill: #fff; font-size: 19px; font-weight: 700; font-variant-numeric: tabular-nums; }
.hop.dead .ms { fill: #f87171; }
.ip { fill: rgba(255,255,255,.72); font-size: 12.5px; font-family: var(--vp-font-family-mono) !important; }
.where { fill: rgba(255,255,255,.45); font-size: 12px; }
.badge rect { fill: #fbbf24; }
.badge .b1 { fill: #3b2205; font-size: 15px; font-weight: 800; text-anchor: middle; }
.badge .b2 { fill: #5b3a0c; font-size: 11px; font-weight: 600; text-anchor: middle; }
.pkt { fill: #fde68a; }
.pkt-core { fill: #fff; }
.cap { fill: rgba(255,255,255,.5); font-size: 12px; }
.d-on { fill: rgba(52,211,153,.75); } .d-off { fill: rgba(255,255,255,.12); }
</style>
