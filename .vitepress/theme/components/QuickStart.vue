// .vitepress/theme/components/QuickStart.vue
// 快速开始组件
// 功能：引导用户查看文档

<script setup>
import { Icon } from '@iconify/vue'
</script>

<template>
  <section class="quick-start">
    <h2 class="section-title">
      <Icon icon="mdi:school" width="28" height="28" class="title-icon" />
      快速开始
    </h2>
    
    <p class="section-intro">
      准备好开始使用 DStatus 了吗？查看完整文档了解详细信息
    </p>
    
    <div class="cta-container">
      <a href="/quick-start" class="docs-button">
        <Icon icon="mdi:book-open-variant" width="24" height="24" />
        <span>查看文档</span>
        <Icon icon="mdi:arrow-right" width="20" height="20" />
      </a>
    </div>
  </section>
</template>

<style scoped>
.quick-start {
  margin-top: 4rem;
  margin-bottom: 4rem;
  text-align: center;
}

.section-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.875rem;
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  padding: 0.5rem 0;
  color: var(--vp-c-text-1);
}

.title-icon {
  color: var(--vp-c-brand-1);
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.section-title:hover .title-icon {
  transform: scale(1.1);
}

.section-intro {
  font-size: 1.125rem;
  color: var(--vp-c-text-2);
  margin-bottom: 2.5rem;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-container {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.docs-button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  color: white;
  border-radius: 12px;
  font-size: 1.125rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(30, 64, 175, 0.3);
}

.docs-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(30, 64, 175, 0.4);
  background: linear-gradient(135deg, var(--vp-c-brand-2), var(--vp-c-brand-3));
}

.docs-button:active {
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .quick-start {
    margin-top: 3rem;
    margin-bottom: 3rem;
  }

  .section-title {
    font-size: 1.5rem;
    gap: 0.625rem;
    margin-bottom: 1.25rem;
  }
  
  .section-intro {
    font-size: 1rem;
    margin-bottom: 2rem;
    padding: 0 1rem;
  }
  
  .docs-button {
    padding: 0.875rem 1.75rem;
    font-size: 1rem;
  }
}
</style>

