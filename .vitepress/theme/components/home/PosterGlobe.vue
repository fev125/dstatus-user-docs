<script setup>
// 网络质量海报：点阵地球 + 从节点到检测目标的延迟弧线。纯 Canvas，无第三方依赖。
// 弧线颜色按真实检测结果：绿 < 120ms，黄 < 300ms，红为高延迟或丢包。
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { LAND_W, LAND_H, LAND_B64 } from './land.js'

const props = defineProps({ active: { type: Boolean, default: true } })
const canvas = ref(null)
let ctx, raf, ro, points = [], w = 0, h = 0, dpr = 1, t0 = 0, running = false

const RAD = Math.PI / 180
const CITY = {
  tokyo: [35.68, 139.69], hk: [22.32, 114.17], sg: [1.35, 103.82], la: [34.05, -118.24], seoul: [37.57, 126.98], sydney: [-33.87, 151.21],
  guangzhou: [23.13, 113.26], shanghai: [31.23, 121.47], beijing: [39.9, 116.4], chengdu: [30.57, 104.07]
}
const ARCS = [
  { from: 'tokyo', to: 'guangzhou', color: '#4ade80', speed: 1.4 },
  { from: 'seoul', to: 'beijing', color: '#4ade80', speed: 1.5 },
  { from: 'sg', to: 'chengdu', color: '#fbbf24', speed: 0.8 },
  { from: 'la', to: 'shanghai', color: '#f87171', speed: 0.4 },
  { from: 'sydney', to: 'shanghai', color: '#fbbf24', speed: 0.7 },
  { from: 'hk', to: 'beijing', color: '#4ade80', speed: 1.2 }
]
const NODES = ['tokyo', 'hk', 'sg', 'seoul', 'la', 'sydney']

function landAt(lat, lon) {
  const x = Math.floor(((lon + 180) / 360) * LAND_W) % LAND_W
  const y = Math.min(LAND_H - 1, Math.floor(((90 - lat) / 180) * LAND_H))
  const i = y * LAND_W + x
  return (landBytes[i >> 3] >> (7 - (i & 7))) & 1
}
let landBytes
function build() {
  landBytes = Uint8Array.from(atob(LAND_B64), c => c.charCodeAt(0))
  const N = 9000, golden = Math.PI * (3 - Math.sqrt(5))
  points = []
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = golden * i
    const lat = Math.asin(y) / RAD, lon = (Math.atan2(Math.sin(th) * r, Math.cos(th) * r)) / RAD
    if (lat < -60) continue
    if (landAt(lat, lon)) points.push(vec(lat, lon))
  }
}
const vec = (lat, lon) => [Math.cos(lat * RAD) * Math.sin(lon * RAD), Math.sin(lat * RAD), Math.cos(lat * RAD) * Math.cos(lon * RAD)]

function project(v, rot, tilt) {
  const c = Math.cos(rot), s = Math.sin(rot)
  const x = v[0] * c - v[2] * s, z0 = v[0] * s + v[2] * c
  const ct = Math.cos(tilt), st = Math.sin(tilt)
  const y = v[1] * ct - z0 * st, z = v[1] * st + z0 * ct
  return [x, y, z]
}
function slerp(a, b, t) {
  const d = Math.acos(Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]))
  if (d < 1e-6) return a
  const sa = Math.sin((1 - t) * d) / Math.sin(d), sb = Math.sin(t * d) / Math.sin(d)
  const lift = 1 + Math.sin(Math.PI * t) * Math.min(0.28, d * 0.55)
  return [(a[0] * sa + b[0] * sb) * lift, (a[1] * sa + b[1] * sb) * lift, (a[2] * sa + b[2] * sb) * lift]
}

function resize() {
  const el = canvas.value
  if (!el) return
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  w = el.clientWidth; h = el.clientHeight
  el.width = w * dpr; el.height = h * dpr
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

function frame(now) {
  if (!running) return
  const t = (now - t0) / 1000
  const narrow = w < 700, area = narrow ? w : w - 330 // 宽屏右侧留给延迟卡片
  const R = Math.min(area / 2, h / 2) * 0.86, cx = area / 2, cy = h / 2
  const rot = (158 + Math.sin(t * 0.06) * 14) * RAD, tilt = 0.5
  ctx.clearRect(0, 0, w, h)
  // 大气光晕
  const g = ctx.createRadialGradient(cx, cy, R * 0.7, cx, cy, R * 1.16)
  g.addColorStop(0, 'rgba(56,189,248,0.10)'); g.addColorStop(0.55, 'rgba(16,185,129,0.06)'); g.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R * 1.16, 0, Math.PI * 2); ctx.fill()
  ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = 1
  ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke()
  // 陆地点阵
  for (const p of points) {
    const [x, y, z] = project(p, rot, tilt)
    if (z <= 0) continue
    const a = 0.12 + z * 0.62
    ctx.fillStyle = `rgba(214,226,240,${a})`
    const s = 0.7 + z * 0.9
    ctx.fillRect(cx + x * R - s / 2, cy - y * R - s / 2, s, s)
  }
  // 弧线与数据包
  for (const arc of ARCS) {
    const a = vec(...CITY[arc.from]), b = vec(...CITY[arc.to])
    ctx.beginPath()
    let started = false
    for (let i = 0; i <= 48; i++) {
      const [x, y, z] = project(slerp(a, b, i / 48), rot, tilt)
      if (z < -0.05) { started = false; continue }
      const X = cx + x * R, Y = cy - y * R
      started ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); started = true
    }
    ctx.strokeStyle = arc.color + '88'; ctx.lineWidth = 1.4; ctx.stroke()
    for (let k = 0; k < 2; k++) {
      const u = ((t * arc.speed * 0.32) + k * 0.5) % 1
      const [x, y, z] = project(slerp(a, b, u), rot, tilt)
      if (z < 0) continue
      const X = cx + x * R, Y = cy - y * R
      const pg = ctx.createRadialGradient(X, Y, 0, X, Y, 9)
      pg.addColorStop(0, arc.color); pg.addColorStop(1, arc.color + '00')
      ctx.fillStyle = pg; ctx.beginPath(); ctx.arc(X, Y, 9, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(X, Y, 1.6, 0, Math.PI * 2); ctx.fill()
    }
  }
  // 节点与目标
  const pulse = (Math.sin(t * 2.2) + 1) / 2
  for (const key of Object.keys(CITY)) {
    const [x, y, z] = project(vec(...CITY[key]), rot, tilt)
    if (z <= 0) continue
    const X = cx + x * R, Y = cy - y * R, isNode = NODES.includes(key)
    ctx.strokeStyle = isNode ? `rgba(255,255,255,${0.25 + pulse * 0.35})` : 'rgba(255,255,255,0.18)'
    ctx.beginPath(); ctx.arc(X, Y, isNode ? 6 + pulse * 5 : 4, 0, Math.PI * 2); ctx.stroke()
    ctx.fillStyle = isNode ? '#fff' : 'rgba(255,255,255,0.75)'
    ctx.beginPath(); ctx.arc(X, Y, isNode ? 2.6 : 1.8, 0, Math.PI * 2); ctx.fill()
  }
  raf = requestAnimationFrame(frame)
}

function start() {
  if (running || !ctx) return
  running = true; t0 = performance.now() - 4000; raf = requestAnimationFrame(frame)
}
function stop() { running = false; cancelAnimationFrame(raf) }

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  build(); resize()
  ro = new ResizeObserver(resize); ro.observe(canvas.value)
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (still) { running = true; frame(performance.now()); running = false } else if (props.active) start()
})
watch(() => props.active, on => (on ? start() : stop()))
onBeforeUnmount(() => { stop(); ro && ro.disconnect() })
</script>

<template>
  <canvas ref="canvas" class="poster-globe" aria-hidden="true" />
</template>

<style scoped>
.poster-globe { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
</style>
