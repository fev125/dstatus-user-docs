// .vitepress/theme/components/FeatureModules.vue
// 功能模块全屏展示组件
// 功能：4个核心功能模块，每个独立全屏区块，配备动态背景

<script setup>
import { Icon } from '@iconify/vue'
import { useData } from 'vitepress'
import { computed } from 'vue'

const { isDark } = useData()

const modules = [
  {
    id: 'monitor',
    icon: 'mdi:chart-line',
    title: '监控与数据采集',
    subtitle: '实时洞察，全面掌控',
    color: '#3b82f6',
    bgLight: '#f0f9ff',
    bgDark: '#0f172a',
    features: [
      { icon: 'mdi:clock-fast', text: '实时性能监控', desc: 'CPU/内存/磁盘/网络' },
      { icon: 'mdi:network', text: '网络质量监控', desc: '延迟/丢包/连通性' },
      { icon: 'mdi:chart-box', text: '流量统计分析', desc: '上传/下载/总量' }
    ],
    scenario: '服务器状态一目了然，及时发现性能瓶颈',
    getParticlesConfig: (dark) => ({
      fullScreen: { enable: false },
      particles: {
        number: { value: 80, density: { enable: true, area: 800 } },
        color: { value: dark ? '#60a5fa' : '#3b82f6' },
        links: {
          enable: true,
          distance: 150,
          color: dark ? '#60a5fa' : '#3b82f6',
          opacity: dark ? 0.4 : 0.3,
          width: 1
        },
        move: { enable: true, speed: 1 },
        size: { value: 3 },
        opacity: { value: dark ? 0.6 : 0.5 }
      }
    })
  },
  {
    id: 'server',
    icon: 'mdi:server-network',
    title: '服务器管理',
    subtitle: '统一管理，高效运维',
    color: '#f59e0b',
    bgLight: '#fffbeb',
    bgDark: '#1e1410',
    features: [
      { icon: 'mdi:database', text: '集中管理节点', desc: '统一控制面板' },
      { icon: 'mdi:label-multiple', text: '分组与标签', desc: '灵活分类管理' },
      { icon: 'mdi:radar', text: '自动发现', desc: '新服务器自动接入' },
      { icon: 'mdi:console', text: 'WebSSH 终端', desc: '浏览器内远程操作' },
      { icon: 'mdi:script-text', text: 'SSH 脚本管理', desc: '批量执行命令' }
    ],
    scenario: '统一管理多台服务器，提升运维效率',
    getParticlesConfig: (dark) => ({
      fullScreen: { enable: false },
      particles: {
        number: { value: 60, density: { enable: true, area: 800 } },
        color: { value: dark ? '#fbbf24' : '#f59e0b' },
        shape: { type: 'circle' },
        move: { enable: true, speed: 2, direction: 'none', outModes: 'bounce' },
        size: { value: 4, random: true },
        opacity: { value: dark ? 0.5 : 0.4, random: true }
      }
    })
  },
  {
    id: 'notification',
    icon: 'mdi:bell-ring',
    title: '告警与通知',
    subtitle: '及时响应，快速处理',
    color: '#a855f7',
    bgLight: '#faf5ff',
    bgDark: '#1e1b29',
    features: [
      { icon: 'mdi:send', text: '多通道告警', desc: '邮件/Telegram/Webhook' },
      { icon: 'mdi:tune', text: '自定义规则', desc: '灵活配置阈值' },
      { icon: 'mdi:bell-off', text: '告警静默', desc: '设置免打扰时段' }
    ],
    scenario: '第一时间收到异常通知，快速响应故障',
    getParticlesConfig: (dark) => ({
      fullScreen: { enable: false },
      particles: {
        number: { value: 50, density: { enable: true, area: 800 } },
        color: { value: dark ? '#c084fc' : '#a855f7' },
        move: { 
          enable: true, 
          speed: 3,
          direction: 'top',
          outModes: { default: 'out', top: 'out', bottom: 'bounce' }
        },
        size: { value: 3, random: true },
        opacity: { value: dark ? 0.6 : 0.5, random: true, animation: { enable: true, speed: 1 } }
      }
    })
  },
  {
    id: 'ai',
    icon: 'mdi:brain',
    title: '智能分析',
    subtitle: 'AI 驱动，智能优化',
    color: '#10b981',
    bgLight: '#ecfdf5',
    bgDark: '#0f1f1a',
    features: [
      { icon: 'mdi:robot', text: 'AI 性能分析', desc: 'Google Gemini 智能分析' },
      { icon: 'mdi:alert-octagon', text: '异常检测', desc: '自动识别异常模式' },
      { icon: 'mdi:trending-up', text: '趋势预测', desc: '提前发现潜在问题' }
    ],
    scenario: '智能发现潜在问题，提前优化系统',
    getParticlesConfig: (dark) => ({
      fullScreen: { enable: false },
      particles: {
        number: { value: 100, density: { enable: true, area: 800 } },
        color: { value: dark ? '#34d399' : '#10b981' },
        move: { enable: true, speed: 0.5 },
        size: { value: 2, random: true },
        opacity: { 
          value: dark ? 0.7 : 0.6, 
          random: true,
          animation: { enable: true, speed: 0.5, minimumValue: 0.1 }
        }
      }
    })
  }
]

// 计算当前主题下的模块配置
const computedModules = computed(() => 
  modules.map(module => ({
    ...module,
    bgColor: isDark.value ? module.bgDark : module.bgLight,
    particlesConfig: module.getParticlesConfig(isDark.value)
  }))
)
</script>

<template>
  <div class="feature-modules-container">
    <div
      v-for="(module, index) in computedModules"
      :key="module.id"
      :id="module.id"
      class="module-section"
      :style="{ backgroundColor: module.bgColor }"
    >
      <!-- 动态背景 -->
      <vue-particles
        :id="`particles-${module.id}`"
        :options="module.particlesConfig"
        class="particles-bg"
      />
      
      <!-- 内容区域 -->
      <div class="module-content">
        <!-- 标题区域 -->
        <div class="module-header">
          <div class="module-icon-wrapper" :style="{ backgroundColor: module.color + '15' }">
            <Icon :icon="module.icon" width="64" height="64" :style="{ color: module.color }" />
          </div>
          <h2 class="module-title" :style="{ color: module.color }">{{ module.title }}</h2>
          <p class="module-subtitle">{{ module.subtitle }}</p>
        </div>

        <!-- 功能列表 -->
        <div class="features-grid">
          <div
            v-for="(feature, fIndex) in module.features"
            :key="fIndex"
            class="feature-card"
          >
            <div class="feature-icon-box" :style="{ backgroundColor: module.color + '10' }">
              <Icon :icon="feature.icon" width="28" height="28" :style="{ color: module.color }" />
            </div>
            <div class="feature-info">
              <h4 class="feature-title">{{ feature.text }}</h4>
              <p class="feature-desc">{{ feature.desc }}</p>
            </div>
          </div>
        </div>

        <!-- 使用场景 -->
        <div class="scenario-box">
          <Icon icon="mdi:lightbulb-on" width="20" height="20" :style="{ color: module.color }" />
          <span>{{ module.scenario }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ============= 容器样式 ============= */
.feature-modules-container {
  width: 100%;
  margin: 0;
  padding: 0;
}

/* ============= 全屏区块 ============= */
.module-section {
  position: relative;
  min-height: 100vh;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  padding: 6rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: background-color 0.3s ease;
}

/* ============= 粒子背景 ============= */
.particles-bg {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  z-index: 0;
  opacity: 0.6;
  pointer-events: none;
}

/* 强制限制 vue-particles 内部的 canvas */
.particles-bg :deep(canvas) {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
}

/* ============= 内容容器 ============= */
.module-content {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

/* ============= 标题区域 ============= */
.module-header {
  text-align: center;
  margin-bottom: 4rem;
}

.module-icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  border-radius: 24px;
  margin-bottom: 2rem;
  transition: transform 0.3s ease;
}

.module-icon-wrapper:hover {
  transform: scale(1.05);
}

.module-title {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 1rem 0;
  letter-spacing: -0.02em;
}

.module-subtitle {
  font-size: 1.25rem;
  color: #64748b;
  margin: 0;
  font-weight: 400;
  transition: color 0.3s ease;
}

.dark .module-subtitle {
  color: #94a3b8;
}

/* ============= 功能网格 ============= */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.feature-card {
  display: flex;
  gap: 1.25rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.feature-icon-box {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.feature-card:hover .feature-icon-box {
  transform: scale(1.1);
}

.feature-info {
  flex: 1;
}

.feature-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #1e293b;
  line-height: 1.4;
}

.feature-desc {
  font-size: 0.9375rem;
  color: #64748b;
  margin: 0;
  line-height: 1.6;
}

/* ============= 使用场景 ============= */
.scenario-box {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem 2rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  font-size: 1.0625rem;
  color: #475569;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
}

/* ============= 响应式设计 ============= */
@media (max-width: 960px) {
  .module-section {
    padding: 4rem 1.5rem;
  }

  .module-header {
    margin-bottom: 3rem;
  }

  .module-title {
    font-size: 2rem;
  }

  .module-subtitle {
    font-size: 1.125rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 640px) {
  .module-section {
    padding: 3rem 1rem;
    min-height: auto;
  }

  .module-icon-wrapper {
    width: 96px;
    height: 96px;
    margin-bottom: 1.5rem;
  }

  .module-title {
    font-size: 1.75rem;
  }

  .module-subtitle {
    font-size: 1rem;
  }

  .module-header {
    margin-bottom: 2.5rem;
  }

  .feature-card {
    padding: 1.5rem;
    gap: 1rem;
  }

  .feature-icon-box {
    width: 48px;
    height: 48px;
  }

  .feature-title {
    font-size: 1rem;
  }

  .feature-desc {
    font-size: 0.875rem;
  }

  .scenario-box {
    padding: 1.25rem 1.5rem;
    font-size: 1rem;
  }
}

/* ============= 暗色模式适配 ============= */
.dark .feature-card {
  background: rgba(30, 41, 59, 0.85);
  border-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(12px);
}

.dark .feature-card:hover {
  background: rgba(30, 41, 59, 0.9);
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
}

.dark .feature-title {
  color: #f1f5f9;
}

.dark .feature-desc {
  color: #94a3b8;
}

.dark .scenario-box {
  background: rgba(30, 41, 59, 0.9);
  border-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
  color: #cbd5e1;
  backdrop-filter: blur(12px);
}

/* 暗色模式过渡动画 */
.scenario-box,
.feature-card,
.module-subtitle {
  transition: all 0.3s ease;
}
</style>
