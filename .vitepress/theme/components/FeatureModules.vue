// .vitepress/theme/components/FeatureModules.vue
// 功能模块卡片组件
// 功能：核心功能模块卡片，使用图标库替换 emoji

<script setup>
import { Icon } from '@iconify/vue'

const modules = [
  {
    icon: 'mdi:chart-line',
    title: '监控与数据采集',
    items: [
      '实时性能监控',
      '网络质量监控',
      '流量统计分析'
    ]
  },
  {
    icon: 'mdi:server',
    title: '服务器管理',
    items: [
      '集中管理节点',
      '分组与标签',
      '自动发现',
      'WebSSH 终端',
      'SSH 脚本管理'
    ]
  },
  {
    icon: 'mdi:bell',
    title: '告警与通知',
    items: [
      '多通道告警',
      '自定义规则',
      '告警静默'
    ]
  },
  {
    icon: 'mdi:robot',
    title: '智能分析',
    items: [
      'AI 性能分析',
      '异常检测',
      '趋势预测'
    ]
  }
]
</script>

<template>
  <div class="feature-modules">
    <h3 class="section-title">
      <Icon icon="mdi:apps" width="24" height="24" class="title-icon" />
      核心功能模块
    </h3>
    <div class="modules-grid">
      <div
        v-for="(module, index) in modules"
        :key="index"
        class="module-card"
      >
        <div class="module-icon">
          <Icon :icon="module.icon" width="32" height="32" />
        </div>
        <h4 class="module-title">{{ module.title }}</h4>
        <ul class="module-items">
          <li v-for="(item, itemIndex) in module.items" :key="itemIndex">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.feature-modules {
  margin: 2rem 0;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--vp-c-text-1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.title-icon {
  color: var(--vp-c-brand-1);
}

.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.module-card {
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  transition: all 0.3s ease;
  height: 100%;
}

.module-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 8px 16px rgba(59, 130, 246, 0.1);
  transform: translateY(-3px);
}

.module-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: rgba(59, 130, 246, 0.1);
  color: var(--vp-c-brand-1);
  margin-bottom: 1rem;
}

.module-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  color: var(--vp-c-text-1);
}

.module-items {
  margin: 0.5rem 0;
  padding-left: 1.2rem;
  list-style: disc;
  color: var(--vp-c-text-2);
}

.module-items li {
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .modules-grid {
    grid-template-columns: 1fr;
  }
}
</style>

