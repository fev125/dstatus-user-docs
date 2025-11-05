// .vitepress/theme/components/FeatureModules.vue
// 功能模块卡片组件
// 功能：核心功能模块卡片，现代化设计

<script setup>
import { Icon } from '@iconify/vue'

const modules = [
  {
    icon: 'mdi:chart-line',
    title: '监控与数据采集',
    color: '#1e40af',
    features: [
      { icon: 'mdi:clock-fast', text: '实时性能监控' },
      { icon: 'mdi:network', text: '网络质量监控' },
      { icon: 'mdi:chart-box', text: '流量统计分析' }
    ]
  },
  {
    icon: 'mdi:server-network',
    title: '服务器管理',
    color: '#0ea5e9',
    features: [
      { icon: 'mdi:database', text: '集中管理节点' },
      { icon: 'mdi:label-multiple', text: '分组与标签' },
      { icon: 'mdi:radar', text: '自动发现' },
      { icon: 'mdi:console', text: 'WebSSH 终端' },
      { icon: 'mdi:script-text', text: 'SSH 脚本管理' }
    ]
  },
  {
    icon: 'mdi:bell-ring',
    title: '告警与通知',
    color: '#8b5cf6',
    features: [
      { icon: 'mdi:send', text: '多通道告警' },
      { icon: 'mdi:tune', text: '自定义规则' },
      { icon: 'mdi:bell-off', text: '告警静默' }
    ]
  },
  {
    icon: 'mdi:brain',
    title: '智能分析',
    color: '#10b981',
    features: [
      { icon: 'mdi:robot', text: 'AI 性能分析' },
      { icon: 'mdi:alert-octagon', text: '异常检测' },
      { icon: 'mdi:trending-up', text: '趋势预测' }
    ]
  }
]
</script>

<template>
  <div class="feature-modules">
    <h3 class="section-title">
      <Icon icon="mdi:view-grid" width="28" height="28" class="title-icon" />
      核心功能模块
    </h3>
    <div class="modules-grid">
      <div
        v-for="(module, index) in modules"
        :key="index"
        class="module-card"
      >
        <div class="card-header">
          <div class="module-icon-wrapper" :style="{ '--module-color': module.color }">
            <Icon :icon="module.icon" width="40" height="40" class="module-icon" />
          </div>
          <h4 class="module-title">{{ module.title }}</h4>
        </div>
        <ul class="module-features">
          <li 
            v-for="(feature, featureIndex) in module.features" 
            :key="featureIndex"
            class="feature-item"
          >
            <Icon :icon="feature.icon" width="18" height="18" class="feature-icon" />
            <span class="feature-text">{{ feature.text }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.feature-modules {
  margin: 4rem 0;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: var(--vp-c-text-1);
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.title-icon {
  color: var(--vp-c-brand-1);
}

.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.module-card {
  position: relative;
  padding: 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  transition: all 0.3s ease;
  overflow: hidden;
}

.module-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--module-color, var(--vp-c-brand-1));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.module-card:hover::before {
  opacity: 1;
}

.module-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 6px 20px rgba(30, 64, 175, 0.08);
  transform: translateY(-4px);
}

.card-header {
  padding: 1.5rem 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
}

.module-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(30, 64, 175, 0.08), rgba(14, 165, 233, 0.08));
  transition: all 0.3s ease;
}

.module-card:hover .module-icon-wrapper {
  background: linear-gradient(135deg, rgba(30, 64, 175, 0.15), rgba(14, 165, 233, 0.15));
  transform: scale(1.05);
}

.module-icon {
  color: var(--vp-c-brand-1);
  transition: all 0.3s ease;
}

.module-card:hover .module-icon {
  transform: rotate(5deg);
}

.module-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  color: var(--vp-c-text-1);
  line-height: 1.4;
}

.module-features {
  margin: 0;
  padding: 0 1.5rem 1.5rem;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  color: var(--vp-c-text-2);
  font-size: 0.9375rem;
  line-height: 1.5;
}

.feature-item:hover {
  background: rgba(30, 64, 175, 0.05);
  color: var(--vp-c-text-1);
  padding-left: 1rem;
}

.feature-icon {
  flex-shrink: 0;
  color: var(--vp-c-brand-1);
  opacity: 0.7;
  transition: all 0.2s ease;
}

.feature-item:hover .feature-icon {
  opacity: 1;
  transform: scale(1.1);
}

.feature-text {
  flex: 1;
}

@media (max-width: 960px) {
  .modules-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .section-title {
    font-size: 1.5rem;
  }
  
  .modules-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .card-header {
    padding: 1.25rem 1.25rem 0.75rem;
  }
  
  .module-icon-wrapper {
    width: 64px;
    height: 64px;
  }
  
  .module-icon {
    width: 32px;
    height: 32px;
  }
  
  .module-features {
    padding: 0 1.25rem 1.25rem;
  }
}
</style>
