<script setup>
// AI 运维海报：用产品里真实存在的两个窗口讲一个故事。
// 「AI 解读」先给出结论、把要处理的节点按顺序列好；「终端 Agent」随即登上第一台，
// 查出原因、直接清理；解读卡片上这一项同步从「紧急」变成「已处理」。
import { nextTick, onMounted, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps({ active: { type: Boolean, default: true } })

const CONCLUSION = '14 个节点整体稳定，2 台需要尽快处理，1 台值得关注。'
const ISSUES = [
  { node: '香港-02', what: '根分区 95%，日志涨得快', tag: '紧急', sev: 'red', done: '已清理，磁盘 95% → 68%' },
  { node: '日本-03', what: '广东联通丢包 7.7%', tag: '尽快', sev: 'amber' },
  { node: '新加坡-01', what: '3 天后到期', tag: '提醒', sev: 'blue' }
]
const GOAL = '根分区快满了，找出原因并清理'
// 终端 Agent 的执行脚本：cmd 由 AI 敲出并自动执行，out 是节点返回
const SCRIPT = [
  { k: 'cmd', text: 'df -h /' },
  { k: 'out', rows: ['/dev/vda1    40G   38G  1.9G   95%  /'] },
  { k: 'cmd', text: 'du -sh /var/log/* | sort -rh | head -3' },
  { k: 'out', rows: ['11G    /var/log/journal', '1.2G   /var/log/nginx'] },
  { k: 'cmd', text: 'journalctl --vacuum-size=200M' },
  { k: 'out', rows: ['Vacuuming done, freed 10.8G of archived journals'] },
  { k: 'ok', text: 'systemd 日志占了 11G，已清理到 200M，磁盘 95% → 68%' }
]

const stage = ref('idle') // idle 待机 analyzing 解读中 ranked 已排好 fixing 修复中 fixed 已修好
const conclusion = ref('')
const shown = ref(0) // 已列出的节点数
const termOpen = ref(false)
const recap = ref(false) // 修好后窄屏切回解读卡片，看「已处理」
const lines = ref([])
const root = ref(null)
const body = ref(null)

let timers = [], io, seen = false
const at = (ms, fn) => timers.push(setTimeout(fn, ms))
const clear = () => { timers.forEach(clearTimeout); timers = [] }

function reset() {
  clear()
  stage.value = 'idle'; conclusion.value = ''; shown.value = 0; termOpen.value = false; lines.value = []; recap.value = false
}
function run() {
  reset()
  let t = 40, n = 0
  const push = (when, line) => { const idx = n++; at(when, () => { lines.value.push({ ...line }) }); return idx }
  const typeLine = (when, idx, text, ms) => {
    for (let i = 1; i <= text.length; i++) at(when + i * ms, () => { lines.value[idx].text = text.slice(0, i) })
    return when + text.length * ms
  }

  at(t, () => { stage.value = 'analyzing' })
  t += 420
  for (let i = 1; i <= CONCLUSION.length; i++) at(t + i * 28, () => { conclusion.value = CONCLUSION.slice(0, i) })
  t += CONCLUSION.length * 28 + 260
  at(t, () => { stage.value = 'ranked' })
  ISSUES.forEach((_, i) => at(t + 120 + i * 220, () => { shown.value = i + 1 }))
  t += 120 + ISSUES.length * 220 + 520

  at(t, () => { stage.value = 'fixing'; termOpen.value = true })
  t += 620
  const goal = push(t, { k: 'user', text: '', typing: true })
  t = typeLine(t + 80, goal, GOAL, 40)
  at(t + 120, () => { lines.value[goal].typing = false })
  t += 420

  for (const s of SCRIPT) {
    if (s.k === 'cmd') {
      const idx = push(t, { k: 'cmd', text: '', typing: true })
      t = typeLine(t + 60, idx, s.text, 17); at(t + 60, () => { lines.value[idx].typing = false })
      t += 300
    } else if (s.k === 'out') {
      s.rows.forEach((r, i) => push(t + i * 60, { k: 'out', text: r }))
      t += s.rows.length * 60 + 320
    } else if (s.k === 'ok') {
      push(t, { k: 'ok', text: s.text })
      at(t + 160, () => { stage.value = 'fixed' })
      at(t + 1500, () => { recap.value = true })
      t += 160
    }
  }
  at(t + 3200, () => { stage.value = 'out' })
  at(t + 3650, () => { if (props.active && seen) run() })
}
// 不想看动画的用户直接看到结局
function finale() {
  reset()
  stage.value = 'fixed'; recap.value = true; conclusion.value = CONCLUSION; shown.value = ISSUES.length; termOpen.value = true
  lines.value = [{ k: 'user', text: GOAL }]
  for (const s of SCRIPT) {
    if (s.k === 'out') s.rows.forEach(r => lines.value.push({ k: 'out', text: r }))
    else lines.value.push({ k: s.k, text: s.text, ok: true })
  }
}

// 淡出重播的 out 阶段沿用结局的文案，免得淡出时字先跳回去
const isDone = () => stage.value === 'fixed' || stage.value === 'out'
const tagOf = i => (i === 0 && isDone() ? '已处理' : i === 0 && stage.value === 'fixing' ? '处理中' : ISSUES[i].tag)
const stateOf = i => (i === 0 && isDone() ? 'done' : i === 0 && stage.value === 'fixing' ? 'busy' : ISSUES[i].sev)
const headline = () => (isDone() ? '1 / 2 已处理' : stage.value === 'ranked' || stage.value === 'fixing' ? '2 台需要处理' : '解读中')

// 窄屏终端高度有限，新行出来时滚到底，最后的结果始终露着
watch(() => lines.value.length, () => nextTick(() => { if (body.value) body.value.scrollTop = body.value.scrollHeight }))

let reduced = false
// 轮播切走时立刻清场，切回来不会先闪一下上次的结局
// 切走时等海报淡出后再清场，淡出过程中保持原样，不闪回「解读中」
watch(() => props.active, on => { if (reduced) return; if (on && seen) run(); else { clear(); at(900, reset) } })
onMounted(() => {
  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) { finale(); return }
  // 进入视野才开始播，避免用户滚到这里时动画早已播完
  io = new IntersectionObserver(([e]) => {
    const was = seen
    seen = e.isIntersecting && e.intersectionRatio >= 0.6
    if (seen && !was && props.active) run()
    if (!seen) clear()
  }, { threshold: [0, 0.6, 0.85] })
  io.observe(root.value)
})
onBeforeUnmount(() => { clear(); io && io.disconnect() })
</script>

<template>
  <div ref="root" class="ai-vis" :class="[stage, { recap }]">
    <!-- AI 解读：高级分析页里的那张卡片 -->
    <div class="win card" :class="{ in: stage !== 'idle' }">
      <header>
        <span class="ttl"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.5 9.6 6.4 14.5 8 9.6 9.6 8 14.5 6.4 9.6 1.5 8l4.9-1.6z" /></svg>AI 解读</span>
        <span class="meta">最近 24 小时 · 14 个节点</span>
        <span class="st" :class="stage"><i />{{ headline() }}</span>
      </header>
      <section class="concl">
        <label>AI 结论</label>
        <p>{{ conclusion }}<i v-if="stage === 'analyzing'" class="caret" /></p>
      </section>
      <section class="list">
        <label :class="{ in: shown > 0 }">建议处理顺序</label>
        <div v-for="(it, i) in ISSUES" :key="it.node" :class="['it', stateOf(i), { in: i < shown }]">
          <b class="n">{{ i + 1 }}</b>
          <span class="node">{{ it.node }}</span>
          <span class="tag"><i />{{ tagOf(i) }}</span>
          <span class="what">{{ i === 0 && isDone() ? it.done : it.what }}</span>
        </div>
      </section>
    </div>

    <!-- 终端 Agent：节点详情页终端旁的 Agent 窗格 -->
    <div class="win term" :class="{ in: termOpen }">
      <header>
        <span class="dots"><i /><i /><i /></span>
        <span class="ttl">香港-02 · 终端 Agent</span>
        <span class="mode">自动执行</span>
        <span class="st" :class="{ done: isDone() }"><i />{{ isDone() ? '已完成' : '执行中' }}</span>
      </header>
      <div ref="body" class="body">
        <div v-for="(l, i) in lines" :key="i" :class="['ln', l.k]">
          <template v-if="l.k === 'user'"><span class="pr">›</span><span class="tx">{{ l.text }}<i v-if="l.typing" class="caret" /></span></template>
          <template v-else-if="l.k === 'cmd'"><span class="pr">$</span><span class="tx">{{ l.text }}<i v-if="l.typing" class="caret" /></span></template>
          <template v-else-if="l.k === 'out'"><span class="pr" /><span class="tx">{{ l.text }}</span></template>
          <template v-else><span class="pr">✓</span><span class="tx">{{ l.text }}</span></template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 宽屏：两个窗口并排居中，互不遮挡 */
.ai-vis { position: absolute; inset: 0; max-width: 1040px; margin: 0 auto; display: flex; align-items: center; gap: 28px; font-family: var(--vp-font-family-base); }
.ai-vis.out .win { opacity: 0; transition: opacity .4s ease; }

/* 窗口通用 */
.win { position: relative; min-width: 0; border-radius: 16px; background: rgba(16, 17, 21, .78); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); box-shadow: 0 0 0 1px rgba(255,255,255,.1), inset 0 1px 0 rgba(255,255,255,.06), 0 40px 80px -30px rgba(0,0,0,.85); opacity: 0; transition: opacity .6s ease, transform .75s cubic-bezier(.2,.7,.2,1); }
.win.in { opacity: 1; transform: none; }
.win header { display: flex; align-items: center; gap: 10px; padding: 14px 18px 12px; border-bottom: 1px solid rgba(255,255,255,.07); font-size: 12px; color: rgba(255,255,255,.5); }
.win .ttl { display: inline-flex; align-items: center; gap: 7px; font-size: 13px; font-weight: 650; color: #fff; }
.win .st { display: inline-flex; align-items: center; gap: 6px; margin-left: auto; font-size: 11.5px; font-weight: 600; color: rgba(255,255,255,.55); white-space: nowrap; }
.win .st i { width: 6px; height: 6px; border-radius: 50%; background: #a78bfa; box-shadow: 0 0 10px #a78bfa; animation: pulse 1.2s ease-in-out infinite; }
.caret { display: inline-block; width: 2px; height: 1em; margin-left: 2px; vertical-align: -2px; background: #a78bfa; animation: blink 1s steps(2, start) infinite; }
@keyframes pulse { 50% { opacity: .35; } }
@keyframes blink { 50% { opacity: 0; } }

/* AI 解读卡片 */
.card { flex: 0 0 42%; align-self: center; transform: translateY(16px); }
.card .ttl svg { width: 14px; height: 14px; fill: #c4b5fd; filter: drop-shadow(0 0 6px rgba(167,139,250,.8)); }
.card .meta { white-space: nowrap; }
.card .st.ranked, .card .st.fixing { color: #fde68a; } .card .st.ranked i, .card .st.fixing i { background: #fbbf24; box-shadow: 0 0 10px #fbbf24; animation: none; }
.card .st.fixed { color: #6ee7b7; } .card .st.fixed i { background: #34d399; box-shadow: 0 0 10px #34d399; animation: none; }
.card section { padding: 14px 18px 0; }
.card label { display: block; font-size: 11px; letter-spacing: .06em; color: rgba(255,255,255,.38); margin-bottom: 7px; }
.list label { opacity: 0; transition: opacity .4s; } .list label.in { opacity: 1; }
.concl p { margin: 0; min-height: 2.9em; font-size: 14px; line-height: 1.6; color: #f5f5f4; }
.list { padding-bottom: 10px; }
.it { display: grid; grid-template-columns: 22px auto auto 1fr; align-items: center; column-gap: 10px; padding: 9px 10px; margin: 0 -10px; border-radius: 10px; font-size: 13px; opacity: 0; transform: translateY(8px); transition: opacity .45s ease, transform .55s cubic-bezier(.2,.7,.2,1), background .4s, box-shadow .4s; }
.it.in { opacity: 1; transform: none; }
.it .n { display: grid; place-items: center; width: 22px; height: 22px; border-radius: 7px; font-size: 11.5px; font-weight: 700; color: #fff; background: rgba(255,255,255,.1); }
.it .node { font-weight: 650; color: #fff; white-space: nowrap; }
.it .what { color: rgba(255,255,255,.6); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: color .4s; }
.it .tag { display: inline-flex; align-items: center; gap: 5px; padding: 3px 8px; border-radius: 999px; font-size: 11px; font-weight: 650; white-space: nowrap; color: var(--c); background: color-mix(in srgb, var(--c) 14%, transparent); transition: color .4s, background .4s; }
.it .tag i { width: 5px; height: 5px; border-radius: 50%; background: var(--c); box-shadow: 0 0 8px var(--c); }
.it.red { --c: #f87171; } .it.amber { --c: #fbbf24; } .it.blue { --c: #60a5fa; }
.it.busy { --c: #c4b5fd; background: rgba(167,139,250,.09); box-shadow: inset 0 0 0 1px rgba(167,139,250,.45); }
.it.busy .tag i { animation: pulse 1s ease-in-out infinite; }
.it.done { --c: #34d399; background: rgba(52,211,153,.08); box-shadow: inset 0 0 0 1px rgba(52,211,153,.35); }
.it.done .what { color: #a7f3d0; }
.it.done .n { background: #34d399; color: #052e22; }

/* 终端 Agent 窗口 */
.term { flex: 1 1 0; margin-top: 70px; background: rgba(9, 10, 13, .9); transform: translateY(24px); }
.term .dots { display: inline-flex; gap: 6px; margin-right: 4px; }
.term .dots i { width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,.14); }
.term .mode { padding: 2px 7px; border-radius: 6px; font-size: 10.5px; font-weight: 700; letter-spacing: .04em; color: #fde68a; background: rgba(251,191,36,.14); }
.term .st.done { color: #6ee7b7; } .term .st.done i { background: #34d399; box-shadow: 0 0 10px #34d399; animation: none; }
.term .body { padding: 12px 18px 14px; min-height: 236px; font-family: var(--vp-font-family-mono); font-size: 12.5px; line-height: 1.6; }
.ln { display: grid; grid-template-columns: 16px 1fr; column-gap: 6px; padding: 1px 0; animation: lnin .26s ease-out both; }
@keyframes lnin { from { opacity: 0; transform: translateY(4px); } }
.ln .pr { font-weight: 700; text-align: center; }
.ln .tx { white-space: pre-wrap; word-break: break-all; min-width: 0; }
.ln.user { color: #fff; font-family: var(--vp-font-family-base); font-size: 13px; margin-bottom: 4px; }
.ln.user .pr { color: #c4b5fd; }
.ln.cmd { color: rgba(255,255,255,.9); margin-top: 3px; }
.ln.cmd .pr { color: #34d399; }
.ln.out { color: rgba(255,255,255,.48); }
.ln.ok { margin-top: 6px; color: #a7f3d0; font-family: var(--vp-font-family-base); font-size: 13px; }
.ln.ok .pr { color: #34d399; }

@media (max-width: 1080px) {
  /* 窄屏一次只放一个窗口：解读卡片 → 终端修复 → 回到卡片看「已处理」，不叠在一起 */
  .ai-vis { display: grid; grid-template: 100% / 100%; align-items: center; max-width: 560px; gap: 0; }
  .win { grid-area: 1 / 1; max-height: 100%; }
  .card { transform: translateY(12px); }
  .term { margin-top: 0; height: min(100%, 300px); display: flex; flex-direction: column; transform: translateY(12px); }
  .term .body { flex: 1 1 auto; min-height: 0; overflow: hidden; line-height: 1.5; }
  .ai-vis.fixing .card, .ai-vis.fixed:not(.recap) .card { opacity: 0; transform: translateY(-12px); pointer-events: none; }
  .ai-vis:not(.fixing):not(.fixed) .term, .ai-vis.recap .term { opacity: 0; transform: translateY(12px); }
}
@media (max-width: 640px) {
  .term .mode, .card .meta { display: none; }
  .win .ttl { white-space: nowrap; }
  .win header { padding: 12px 14px 10px; }
  .card section { padding: 12px 14px 0; }
  .concl p { font-size: 13.5px; min-height: 0; }
  .it { padding: 8px 10px; font-size: 12.5px; }
  .term .body { padding: 10px 14px 12px; font-size: 11.5px; }
  .ln.user, .ln.ok { font-size: 12.5px; }
}
@media (prefers-reduced-motion: reduce) {
  .win, .it, .ln, .caret, .win .st i, .it .tag i { transition: none; animation: none !important; }
}
</style>
