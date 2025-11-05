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
    bgLight: '#f8fafc',
    bgDark: '#0f172a',
    features: [
      { icon: 'mdi:clock-fast', text: '实时性能监控', desc: 'CPU/内存/磁盘/网络' },
      { icon: 'mdi:network', text: '网络质量监控', desc: '延迟/丢包/连通性' },
      { icon: 'mdi:chart-box', text: '流量统计分析', desc: '上传/下载/总量' }
    ],
    scenario: '服务器状态一目了然，及时发现性能瓶颈'
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
    scenario: '统一管理多台服务器，提升运维效率'
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
    scenario: '第一时间收到异常通知，快速响应故障'
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
    scenario: '智能发现潜在问题，提前优化系统'
  }
]

// 计算当前主题下的模块配置
const computedModules = computed(() =>
  modules.map(module => ({
    ...module,
    bgColor: isDark.value ? module.bgDark : module.bgLight
  }))
)
</script>

<template>
  <div class="feature-modules-wrapper">
    <div class="feature-modules-container">
      <!-- 标题区域 -->
      <div class="section-header">
        <h2 class="section-title">核心功能模块</h2>
        <p class="section-subtitle">全面的服务器管理和监控解决方案</p>
      </div>

      <!-- 模块网格 -->
      <div class="modules-grid">
        <div
          v-for="module in computedModules"
          :key="module.id"
          :id="module.id"
          class="module-card"
          :style="{ '--module-color': module.color }"
        >
          <!-- 卡片头部 -->
          <div class="card-header">
            <div class="header-content">
              <div class="module-icon-wrapper" :style="{ backgroundColor: module.color + '15' }">
                <Icon :icon="module.icon" width="40" height="40" :style="{ color: module.color }" />
              </div>
              <div class="header-text">
                <h3 class="module-title">{{ module.title }}</h3>
                <p class="module-subtitle">{{ module.subtitle }}</p>
              </div>
            </div>
          </div>

          <!-- 功能列表 -->
          <div class="features-list">
            <div
              v-for="(feature, fIndex) in module.features"
              :key="fIndex"
              class="feature-item"
            >
              <div class="feature-badge" :style="{ backgroundColor: module.color + '15' }">
                <Icon :icon="feature.icon" width="18" height="18" :style="{ color: module.color }" />
              </div>
              <div class="feature-content">
                <div class="feature-name">{{ feature.text }}</div>
                <div class="feature-desc">{{ feature.desc }}</div>
              </div>
            </div>
          </div>

          <!-- 场景描述 -->
          <div class="scenario-section">
            <Icon icon="mdi:lightbulb-on" width="16" height="16" :style="{ color: module.color }" />
            <span>{{ module.scenario }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ============= 外层包装 ============= */
.feature-modules-wrapper {
  width: 100%;
  background: var(--vp-c-bg);
  padding: 3rem 0;
  transition: background 0.3s ease;
}

/* ============= 容器样式 ============= */
.feature-modules-container {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* ============= 区域标题 ============= */
.section-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-text-1);
}

.section-subtitle {
  font-size: 1rem;
  color: var(--vp-c-text-2);
  margin: 0;
  font-weight: 400;
}

/* ============= 模块网格 ============= */
.modules-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

/* ============= 模块卡片 ============= */
.module-card {
  display: flex;
  flex-direction: column;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
  transition: all 0.2s ease;
  position: relative;
  min-height: 400px;
}

.module-card:hover {
  border-color: var(--vp-c-divider);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* ============= 卡片头部 ============= */
.card-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 1.25rem 1.25rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.header-content {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  text-align: center;
  width: 100%;
}

.module-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  flex-shrink: 0;
  background: var(--vp-c-bg);
  transition: transform 0.2s ease;
}

.module-card:hover .module-icon-wrapper {
  transform: scale(1.05);
}

.header-text {
  flex: 1;
}

.module-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
  color: var(--vp-c-text-1);
  line-height: 1.3;
}

.module-subtitle {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  margin: 0;
  font-weight: 400;
  line-height: 1.3;
}

/* ============= 功能列表 ============= */
.features-list {
  flex: 1;
  padding: 1.25rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  align-content: start;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  transition: all 0.15s ease;
}

.feature-item:hover {
  background: var(--vp-c-bg);
  border-color: var(--vp-c-divider);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
}

.feature-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  flex-shrink: 0;
  transition: transform 0.15s ease;
}

.feature-item:hover .feature-badge {
  transform: scale(1.08);
}

.feature-content {
  flex: 1;
  min-width: 0;
}

.feature-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 0.125rem 0;
  line-height: 1.2;
}

.feature-desc {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.3;
}

/* ============= 场景描述 ============= */
.scenario-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 1rem 1.25rem;
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
  text-align: center;
}

/* ============= 响应式设计 ============= */
@media (max-width: 768px) {
  .modules-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .section-subtitle {
    font-size: 0.9375rem;
  }

  .section-header {
    margin-bottom: 2rem;
  }

  .card-header {
    padding: 1rem;
    gap: 0.75rem;
  }

  .module-icon-wrapper {
    width: 40px;
    height: 40px;
  }

  .module-title {
    font-size: 1rem;
  }

  .module-subtitle {
    font-size: 0.8125rem;
  }

  .features-list {
    padding: 1rem;
    gap: 0.75rem;
    grid-template-columns: 1fr;
  }

  .feature-item {
    padding: 0.5rem;
    gap: 0.5rem;
  }

  .feature-badge {
    width: 28px;
    height: 28px;
  }

  .feature-name {
    font-size: 0.8125rem;
  }

  .feature-desc {
    font-size: 0.6875rem;
  }

  .scenario-section {
    padding: 0.875rem 1rem;
    font-size: 0.8125rem;
  }
}
</style>
