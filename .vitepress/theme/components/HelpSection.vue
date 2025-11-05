// .vitepress/theme/components/HelpSection.vue
// 帮助区域组件
// 功能：展示帮助资源和联系方式

<script setup>
import { Icon } from '@iconify/vue'

const helpItems = [
  {
    icon: 'mdi:view-dashboard',
    title: '功能页面总览',
    description: '了解所有页面功能',
    link: '/pages-overview'
  },
  {
    icon: 'mdi:magnify',
    title: '搜索文档',
    description: '使用顶部搜索框查找相关文档',
    action: 'search'
  },
  {
    icon: 'mdi:github',
    title: 'GitHub Issue',
    description: '在 GitHub 上提交问题或建议',
    link: 'https://github.com/fev125/dstatus/issues',
    external: true
  }
]
</script>

<template>
  <section class="help-section">
    <h2 class="section-title">
      <Icon icon="mdi:help-circle" width="28" height="28" class="title-icon" />
      需要帮助？
    </h2>
    
    <p class="section-intro">如果在使用过程中遇到问题，可以：</p>
    
    <div class="help-grid">
      <div
        v-for="(item, index) in helpItems"
        :key="index"
        class="help-card"
      >
        <div class="help-icon">
          <Icon :icon="item.icon" width="32" height="32" />
        </div>
        <h3 class="help-title">{{ item.title }}</h3>
        <p class="help-description">{{ item.description }}</p>
        <a
          v-if="item.link"
          :href="item.link"
          :target="item.external ? '_blank' : '_self'"
          :rel="item.external ? 'noopener noreferrer' : ''"
          class="help-link"
        >
          <span>{{ item.external ? '访问 GitHub' : '查看详情' }}</span>
          <Icon
            :icon="item.external ? 'mdi:open-in-new' : 'mdi:arrow-right'"
            width="18"
            height="18"
          />
        </a>
        <div v-else class="help-hint">
          <Icon icon="mdi:information" width="16" height="16" />
          <span>按 <kbd>/</kbd> 或 <kbd>Ctrl+K</kbd> 打开搜索</span>
        </div>
      </div>
    </div>
    
    <div class="footer-message">
      <Icon icon="mdi:heart" width="20" height="20" class="heart-icon" />
      <p>DStatus - 让服务器监控更简单、更高效、更美观</p>
    </div>
  </section>
</template>

<style scoped>
.help-section {
  margin-top: 4rem;
  margin-bottom: 3rem;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.title-icon {
  color: var(--vp-c-brand-1);
}

.section-intro {
  font-size: 1.125rem;
  color: var(--vp-c-text-2);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.help-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.help-card {
  position: relative;
  padding: 2rem 1.5rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.help-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.15);
  border-color: var(--vp-c-brand-1);
}

.help-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.05));
  border-radius: 12px;
  color: var(--vp-c-brand-1);
  transition: all 0.3s ease;
}

.help-card:hover .help-icon {
  transform: scale(1.1);
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.1));
}

.help-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0;
}

.help-description {
  font-size: 0.9375rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0;
  flex-grow: 1;
}

.help-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background: var(--vp-c-brand-1);
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9375rem;
  transition: all 0.2s ease;
  justify-content: center;
}

.help-link:hover {
  background: var(--vp-c-brand-2);
  transform: translateX(4px);
}

.help-hint {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background: rgba(59, 130, 246, 0.05);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 8px;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.help-hint kbd {
  display: inline-block;
  padding: 0.125rem 0.375rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.8125rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.footer-message {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 2rem 1rem;
  border-top: 1px solid var(--vp-c-divider);
  margin-top: 3rem;
}

.footer-message p {
  font-size: 0.9375rem;
  color: var(--vp-c-text-2);
  margin: 0;
}

.heart-icon {
  color: #ef4444;
  animation: heartbeat 1.5s ease-in-out infinite;
}

@keyframes heartbeat {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 1.5rem;
  }
  
  .help-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .help-card {
    padding: 1.5rem 1rem;
  }
}
</style>

