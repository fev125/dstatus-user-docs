// .vitepress/theme/components/Community.vue
// 社区支持区域 - 提供多种帮助渠道
// 功能：引导用户获取帮助和参与社区
// 相关文件：HomeContent.vue, HelpSection.vue

<script setup>
import { Icon } from '@iconify/vue'

const resources = [
  {
    icon: 'mdi:book-open-variant',
    title: '完整文档',
    description: '详细的使用指南和功能说明',
    link: '/pages-overview',
    color: '#3b82f6',
    external: false
  },
  {
    icon: 'mdi:rocket-launch',
    title: '快速开始',
    description: '5分钟快速部署指南',
    link: '/quick-start',
    color: '#10b981',
    external: false
  },
  {
    icon: 'mdi:frequently-asked-questions',
    title: '常见问题',
    description: '快速解决常见问题',
    link: '/pages-overview',
    color: '#f59e0b',
    external: false
  },
  {
    icon: 'mdi:email-outline',
    title: '技术支持',
    description: '获取专业技术支持',
    link: 'https://github.com/fev125/dstatus/issues',
    color: '#8b5cf6',
    external: true
  }
]

const stats = [
  {
    icon: 'mdi:shield-check',
    value: '生产可用',
    label: '稳定可靠'
  },
  {
    icon: 'mdi:update',
    value: '持续更新',
    label: '活跃开发'
  },
  {
    icon: 'mdi:chart-line',
    value: '性能优化',
    label: '高效运行'
  }
]
</script>

<template>
  <section class="community-section">
    <div class="text-center mb-12">
      <h2 class="text-3xl sm:text-4xl font-bold mb-3 text-[var(--vp-c-text-1)] tracking-tight">
        获取帮助
      </h2>
      <p class="text-sm sm:text-base text-[var(--vp-c-text-2)]">
        多种方式获取支持，快速解决问题
      </p>
    </div>
    
    <!-- 资源卡片 -->
    <div class="resources-grid">
      <a
        v-for="(resource, index) in resources"
        :key="index"
        :href="resource.link"
        :target="resource.external ? '_blank' : '_self'"
        :rel="resource.external ? 'noopener noreferrer' : ''"
        class="resource-card"
        :style="{ '--resource-color': resource.color }"
      >
        <div class="resource-icon">
          <Icon :icon="resource.icon" class="icon" />
        </div>
        <div class="resource-content">
          <h3 class="resource-title">
            {{ resource.title }}
            <Icon 
              v-if="resource.external"
              icon="mdi:open-in-new" 
              class="external-icon"
            />
          </h3>
          <p class="resource-description">{{ resource.description }}</p>
        </div>
        <div class="resource-arrow">
          <Icon icon="mdi:arrow-right" class="arrow-icon" />
        </div>
      </a>
    </div>
    
    <!-- 项目统计 -->
    <div class="project-stats">
      <div
        v-for="(stat, index) in stats"
        :key="index"
        class="stat-item"
      >
        <Icon :icon="stat.icon" class="stat-icon" />
        <div class="stat-content">
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </div>
    
    <!-- 底部标语 -->
    <div class="footer-tagline">
      <div class="tagline-divider"></div>
      <p class="tagline-text">
        DStatus - 让服务器监控更简单、更高效、更美观
      </p>
      <div class="tagline-divider"></div>
    </div>
  </section>
</template>

<style scoped>
.community-section {
  margin: 4rem 0;
  padding: 3rem 0;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

/* 资源卡片网格 */
.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.resource-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.75rem;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 14px;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.resource-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--resource-color);
  transform: scaleX(0);
  transition: transform 0.3s ease;
  transform-origin: left;
}

.resource-card:hover {
  border-color: var(--resource-color);
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
}

.resource-card:hover::before {
  transform: scaleX(1);
}

.resource-icon {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--resource-color);
  border-radius: 12px;
  opacity: 0.12;
  transition: all 0.3s ease;
  position: relative;
}

.resource-card:hover .resource-icon {
  opacity: 0.18;
  transform: rotate(-5deg) scale(1.05);
}

.resource-icon :deep(.icon),
.resource-icon :deep(svg) {
  width: 32px !important;
  height: 32px !important;
  color: var(--resource-color) !important;
  opacity: 1 !important;
  display: block;
}

.resource-content {
  flex: 1;
  min-width: 0;
}

.resource-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.375rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.external-icon,
.external-icon :deep(svg) {
  width: 16px !important;
  height: 16px !important;
  color: var(--vp-c-text-3) !important;
  display: inline-block;
}

.resource-description {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin: 0;
}

.resource-arrow {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.resource-card:hover .resource-arrow {
  background: var(--resource-color);
}

.arrow-icon,
.arrow-icon :deep(svg) {
  width: 20px !important;
  height: 20px !important;
  color: var(--vp-c-text-3);
  transition: all 0.3s ease;
  display: block;
}

.resource-card:hover .arrow-icon,
.resource-card:hover .arrow-icon :deep(svg) {
  color: white !important;
  transform: translateX(4px);
}

/* 项目统计 */
.project-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 3rem;
  padding: 2rem;
  background: var(--vp-c-bg-soft);
  border-radius: 14px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.stat-icon,
.stat-icon :deep(svg) {
  width: 32px !important;
  height: 32px !important;
  color: var(--vp-c-brand-1) !important;
  flex-shrink: 0;
  display: block;
}

.stat-content {
  text-align: left;
}

.stat-value {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.2;
}

.stat-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* 底部标语 */
.footer-tagline {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
  padding-top: 3rem;
}

.tagline-divider {
  flex: 1;
  max-width: 200px;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    var(--vp-c-divider),
    transparent
  );
}

.tagline-text {
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
  text-align: center;
  margin: 0;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .community-section {
    margin: 3rem 0;
    padding: 2rem 1rem;
  }
  
  .resources-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .resource-card {
    padding: 1.5rem;
  }
  
  .project-stats {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem;
  }
  
  .stat-item {
    justify-content: center;
  }
  
  .footer-tagline {
    flex-direction: column;
    gap: 1rem;
  }
  
  .tagline-divider {
    display: none;
  }
  
  .tagline-text {
    white-space: normal;
  }
}

@media (max-width: 480px) {
  .resource-card {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .resource-arrow {
    display: none;
  }
}
</style>

