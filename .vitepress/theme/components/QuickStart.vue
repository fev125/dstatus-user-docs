// .vitepress/theme/components/QuickStart.vue
// 快速开始组件
// 功能：展示快速部署步骤和入门指南

<script setup>
import { Icon } from '@iconify/vue'

const steps = [
  {
    icon: 'mdi:file-document-check',
    title: '查看系统要求',
    link: '/quick-start',
    description: '了解部署前的准备工作'
  },
  {
    icon: 'mdi:cloud-download',
    title: '部署 Agent',
    links: [
      { text: 'Windows', url: '/Agent-Windows运行教程' },
      { text: 'OpenWrt', url: '/Agent-OpenWrt运行教程' }
    ],
    description: '在目标服务器上安装监控 Agent'
  },
  {
    icon: 'mdi:cog-play',
    title: '配置监控',
    link: '/usage-guide',
    description: '开始配置和使用监控系统'
  }
]
</script>

<template>
  <section class="quick-start">
    <h2 class="section-title">
      <Icon icon="mdi:school" width="28" height="28" class="title-icon" />
      快速开始
    </h2>
    
    <p class="section-intro">准备好开始使用 DStatus 了吗？按照以下步骤快速部署：</p>
    
    <div class="steps-container">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="step-card"
      >
        <div class="step-number">{{ index + 1 }}</div>
        <div class="step-icon">
          <Icon :icon="step.icon" width="36" height="36" />
        </div>
        <h3 class="step-title">{{ step.title }}</h3>
        <p class="step-description">{{ step.description }}</p>
        <div class="step-links">
          <a
            v-if="step.link"
            :href="step.link"
            class="step-link primary"
          >
            <span>查看指南</span>
            <Icon icon="mdi:arrow-right" width="18" height="18" />
          </a>
          <div v-if="step.links" class="multi-links">
            <a
              v-for="(link, idx) in step.links"
              :key="idx"
              :href="link.url"
              class="step-link secondary"
            >
              <Icon icon="mdi:package-variant" width="16" height="16" />
              <span>{{ link.text }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.quick-start {
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

.steps-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.step-card {
  position: relative;
  padding: 2rem 1.5rem;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 16px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.step-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(59, 130, 246, 0.2);
  border-color: var(--vp-c-brand-1);
}

.step-number {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  color: white;
  font-weight: 700;
  font-size: 1rem;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.step-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(37, 99, 235, 0.05));
  border-radius: 16px;
  color: var(--vp-c-brand-1);
  transition: all 0.3s ease;
}

.step-card:hover .step-icon {
  transform: scale(1.1);
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.25), rgba(37, 99, 235, 0.1));
}

.step-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0;
}

.step-description {
  font-size: 0.9375rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0;
  flex-grow: 1;
}

.step-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: auto;
}

.step-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  justify-content: center;
}

.step-link.primary {
  background: var(--vp-c-brand-1);
  color: white;
}

.step-link.primary:hover {
  background: var(--vp-c-brand-2);
  transform: translateX(4px);
}

.step-link.secondary {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.step-link.secondary:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: rgba(59, 130, 246, 0.05);
}

.multi-links {
  display: flex;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 1.5rem;
  }
  
  .steps-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .multi-links {
    flex-direction: column;
  }
}
</style>

