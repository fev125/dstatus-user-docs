<script setup>
// 文档首页：开头 → 轮播海报 → 快速开始 → AI 运维 → 日常管理 → 帮助。
// 文案规则：标题用短语，描述用陈述句，只写已上线、用户能用到的能力。
import HomePosters from './HomePosters.vue'

const STEPS = [
  ['01', '获取授权', '购买或兑换许可证。', '/license-management'],
  ['02', '安装面板', '复制部署命令，在服务器上执行。', '/quick-start'],
  ['03', '接入节点', '通过自动发现批量接入服务器。', '/agent-guide'],
  ['04', '配置通知', '接入 Telegram 等渠道，配置告警规则。', '/notification-settings']
]
const DAILY = [
  ['网络质量', 'Ping、TCPing、HTTP 与路由监控，流媒体与 AI 平台解锁检测。', '/monitor'],
  ['告警与通知', '离线、流量、资源与到期告警，支持 Telegram、邮件、Webhook 与 Apple Push。', '/notification-settings'],
  ['账单与流量', '价格、到期与流量上限管理，支持周期流量校准。', '/billing-report'],
  ['访问控制与分享', '公开、口令、私有三种访问方式，支持节点临时分享链接。', '/access-control'],
  ['外观与个性化', '配色、壁纸、首页布局与大屏主题。', '/personalization'],
  ['升级、备份与迁移', '在线更新、数据库备份与整机迁移。', '/panel-migration']
]
</script>

<template>
  <div class="landing">
    <section class="wrap hero">
      <span class="eyebrow"><span class="dot" />DStatus 用户文档</span>
      <h1>服务器监控与 AI 运维</h1>
      <p class="lead">实时监控服务器状态、网络质量与续费到期。AI 登录节点排查故障、执行修复。</p>
      <div class="actions">
        <a class="btn primary" href="/quick-start">安装面板 →</a>
        <a class="btn ghost" href="https://demo.vps.mom" target="_blank" rel="noreferrer">在线演示 ↗</a>
        <a class="link" href="/agent-guide">已有面板？接入节点</a>
      </div>
      <div class="meta"><span>私有化部署</span><span>一条命令安装</span><span>iOS / macOS 客户端</span></div>
    </section>

    <HomePosters />

    <section class="wrap sec">
      <div class="kicker">快速开始</div>
      <h2>四步完成部署</h2>
      <div class="steps">
        <a v-for="[n, t, d, href] in STEPS" :key="n" class="step" :href="href">
          <div class="num">{{ n }}</div><h3>{{ t }}</h3><p>{{ d }}</p><span class="more">查看文档 →</span>
        </a>
      </div>
    </section>

    <section class="wrap sec">
      <div class="kicker">核心能力</div>
      <h2>AI 运维</h2>
      <p class="sub">AI 读取面板的实时数据，可直接在节点上执行命令。</p>
      <div class="bento">
        <a class="card wide" href="/ai">
          <span class="tag">高级分析</span><h3>AI 解读</h3>
          <p>汇总 24 小时内的节点状态、资源、网络与流量，按优先级列出待处理项。</p>
          <span class="more">查看 AI 功能 →</span>
          <div class="img"><img src="/home-ai.jpg" alt="AI 解读结果" loading="lazy"></div>
        </a>
        <a class="card mcp" href="/mcp">
          <span class="tag">Claude · Codex</span><h3>远程 MCP</h3>
          <p>在 Claude、Codex 中查看节点与告警，执行终端命令、编辑文件。</p>
          <span class="more">查看接入方式 →</span>
          <div class="img"><img src="/home-mcp.jpg" alt="远程 MCP 设置" loading="lazy"></div>
        </a>
        <a class="card text" href="/ai">
          <span class="tag">节点终端</span><h3>终端 AI 助手</h3>
          <p>描述问题，AI 在节点上执行命令、定位原因并完成修复。支持全自动与逐条确认两种模式。</p>
        </a>
        <a class="card text" href="/ai">
          <span class="tag">Telegram</span><h3>Telegram AI</h3>
          <p>在 Telegram 中查询面板数据，或让 AI 在节点上执行命令。</p>
        </a>
        <a class="card text" href="/apple-app">
          <span class="tag">TestFlight 公测</span><h3>iOS / macOS App</h3>
          <p>扫码连接面板，在 iPhone 与 Mac 上查看节点、接收告警。</p>
        </a>
      </div>
    </section>

    <section class="wrap sec">
      <div class="kicker">更多功能</div>
      <h2>日常管理</h2>
      <div class="list">
        <a v-for="[t, d, href] in DAILY" :key="t" class="item" :href="href"><h3>{{ t }}</h3><p>{{ d }}</p></a>
      </div>
    </section>

    <section class="wrap foot">
      <div><strong>帮助与支持</strong><p>常见问题、版本更新与账号管理。</p></div>
      <nav>
        <a class="btn ghost" href="/troubleshooting">常见问题</a>
        <a class="btn ghost" href="/changelog">更新日志</a>
        <a class="btn ghost" href="https://client.vps.mom" target="_blank" rel="noreferrer">用户中心 ↗</a>
      </nav>
    </section>
  </div>
</template>

<style scoped>
.landing { --ok: #10b981; color: var(--vp-c-text-1); padding-bottom: 96px; }
.landing a { text-decoration: none; color: inherit; }
.wrap { max-width: 1152px; margin: 0 auto; padding: 0 24px; }
.hero { padding: 72px 24px 56px; }
.eyebrow { display: inline-flex; align-items: center; gap: 8px; font-size: 13px; color: var(--vp-c-text-2); border: 1px solid var(--vp-c-divider); border-radius: 999px; padding: 4px 12px 4px 10px; background: var(--vp-c-bg); }
.dot { width: 7px; height: 7px; border-radius: 50%; background: var(--ok); box-shadow: 0 0 0 3px color-mix(in srgb, var(--ok) 22%, transparent); }
h1 { font-size: clamp(36px, 5vw, 56px); line-height: 1.08; font-weight: 700; letter-spacing: -.03em; margin: 20px 0 0; text-wrap: balance; }
.lead { font-size: 18px; line-height: 1.7; color: var(--vp-c-text-2); margin: 18px 0 0; max-width: 720px; }
.actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin-top: 30px; }
.btn { display: inline-flex; align-items: center; gap: 6px; height: 42px; padding: 0 18px; border-radius: 10px; font-size: 15px; font-weight: 600; transition: opacity .15s, border-color .15s; }
.btn.primary { background: #111214; color: #fff !important; }
.dark .btn.primary { background: #f5f5f4; color: #111214 !important; }
.btn.primary:hover { opacity: .86; }
.btn.ghost { border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); }
.btn.ghost:hover { border-color: var(--vp-c-text-3); }
.link { font-size: 15px; color: var(--vp-c-text-2) !important; padding: 0 6px; }
.link:hover { color: var(--vp-c-text-1) !important; }
.meta { margin-top: 22px; font-size: 13px; color: var(--vp-c-text-3); display: flex; flex-wrap: wrap; gap: 6px 18px; }
.meta span::before { content: ""; display: inline-block; width: 4px; height: 4px; border-radius: 50%; background: var(--vp-c-text-3); margin-right: 8px; vertical-align: middle; opacity: .6; }

.sec { margin-top: 104px; }
.kicker { font-size: 13px; font-weight: 600; color: var(--vp-c-text-3); letter-spacing: .04em; }
h2 { font-size: 30px; line-height: 1.25; font-weight: 700; letter-spacing: -.015em; margin: 8px 0 0; border: 0; padding: 0; }
.sub { font-size: 16px; color: var(--vp-c-text-2); margin: 10px 0 0; max-width: 620px; line-height: 1.7; }
h3 { margin: 0; }

.steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-top: 28px; }
.step { border: 1px solid var(--vp-c-divider); border-radius: 12px; padding: 18px 18px 16px; background: var(--vp-c-bg); transition: border-color .15s, transform .15s; }
.step:hover { border-color: var(--vp-c-text-3); transform: translateY(-1px); }
.num { font-family: var(--vp-font-family-mono); font-size: 12px; color: var(--vp-c-text-3); }
.step h3 { font-size: 16px; font-weight: 600; margin-top: 10px; }
.step p { font-size: 14px; line-height: 1.6; color: var(--vp-c-text-2); margin: 6px 0 0; }
.step .more { display: block; margin-top: 14px; font-size: 13px; color: var(--vp-c-text-3); }
.step:hover .more { color: var(--vp-c-text-1); }

.bento { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 28px; }
.card { border: 1px solid var(--vp-c-divider); border-radius: 14px; background: var(--vp-c-bg-soft); padding: 22px 22px 0; display: flex; flex-direction: column; overflow: hidden; transition: border-color .15s; }
.card:hover { border-color: var(--vp-c-text-3); }
.card.text { padding-bottom: 22px; }
.card.wide { grid-column: span 2; }
.tag { align-self: flex-start; font-size: 12px; color: var(--vp-c-text-2); border: 1px solid var(--vp-c-divider); border-radius: 999px; padding: 1px 9px; background: var(--vp-c-bg); }
.card h3 { font-size: 18px; font-weight: 600; margin-top: 12px; }
.card p { font-size: 14px; line-height: 1.65; color: var(--vp-c-text-2); margin: 8px 0 0; max-width: 520px; }
.card .more { margin-top: 12px; font-size: 13px; font-weight: 500; }
.card .img { margin-top: 20px; border: 1px solid var(--vp-c-divider); border-bottom: 0; border-radius: 10px 10px 0 0; overflow: hidden; background: #0b0c0e; max-height: 300px; }
.card .img img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: top left; }

.list { display: grid; grid-template-columns: repeat(3, 1fr); margin-top: 28px; border-top: 1px solid var(--vp-c-divider); }
.item { padding: 20px 22px 20px 0; border-bottom: 1px solid var(--vp-c-divider); display: block; }
.item h3 { font-size: 15px; font-weight: 600; display: flex; align-items: center; gap: 6px; }
.item h3::after { content: "→"; color: var(--vp-c-text-3); font-weight: 400; transition: transform .15s; }
.item:hover h3::after { transform: translateX(3px); color: var(--vp-c-text-1); }
.item p { font-size: 14px; line-height: 1.6; color: var(--vp-c-text-2); margin: 6px 0 0; }

.foot { margin-top: 80px; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; border: 1px solid var(--vp-c-divider); border-radius: 14px; padding: 22px 24px; max-width: 1104px; }
.foot strong { font-size: 16px; }
.foot p { margin: 4px 0 0; font-size: 14px; color: var(--vp-c-text-2); }
.foot nav { display: flex; flex-wrap: wrap; gap: 8px; }

@media (max-width: 960px) {
  .steps { grid-template-columns: repeat(2, 1fr); }
  .bento { grid-template-columns: 1fr; } .card.wide { grid-column: auto; }
  .list { grid-template-columns: 1fr 1fr; }
  .foot { margin-left: 24px; margin-right: 24px; }
}
@media (max-width: 640px) {
  .hero { padding-top: 44px; }
  .steps, .list { grid-template-columns: 1fr; }
}
</style>
