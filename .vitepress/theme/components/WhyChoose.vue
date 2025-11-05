// .vitepress/theme/components/WhyChoose.vue
// 为什么选择 DStatus 组件
// 功能：展示 DStatus 的核心优势和快速部署特性

<script setup>
import { Icon } from '@iconify/vue'

const advantages = [
  {
    icon: 'mdi:rocket-launch',
    title: '5分钟快速部署',
    description: '一键脚本安装，自动配置 Docker 环境'
  },
  {
    icon: 'mdi:cog-outline',
    title: '零配置依赖',
    description: '无需手动安装 Node.js、数据库等依赖'
  },
  {
    icon: 'mdi:radar',
    title: 'Agent 自动发现',
    description: '支持自动注册和批量部署'
  },
  {
    icon: 'mdi:book-open-page-variant',
    title: '完善的文档',
    description: '详细的部署和使用指南'
  }
]
</script>

<template>
  <section class="why-choose">
    <h2 class="section-title">
      <Icon icon="mdi:target" width="28" height="28" class="title-icon" />
      为什么选择 DStatus？
    </h2>
    
    <div class="subtitle">
      <Icon icon="mdi:rocket-launch" width="24" height="24" class="subtitle-icon" />
      快速部署，开箱即用
    </div>
    
    <div class="advantages-grid">
      <div
        v-for="(advantage, index) in advantages"
        :key="index"
        class="advantage-card"
      >
        <div class="icon-wrapper">
          <Icon :icon="advantage.icon" width="32" height="32" />
        </div>
        <h3 class="advantage-title">{{ advantage.title }}</h3>
        <p class="advantage-description">{{ advantage.description }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.why-choose {
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

.subtitle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: var(--vp-c-text-2);
}

.subtitle-icon {
  color: var(--vp-c-brand-2);
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.advantage-card {
  position: relative;
  padding: 2rem 1.5rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  transition: all 0.3s ease;
  overflow: hidden;
}

.advantage-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.advantage-card:hover::before {
  transform: scaleX(1);
}

.advantage-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.15);
  border-color: var(--vp-c-brand-1);
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.05));
  border-radius: 12px;
  color: var(--vp-c-brand-1);
  transition: all 0.3s ease;
}

.advantage-card:hover .icon-wrapper {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.1));
  transform: scale(1.1) rotate(5deg);
}

.advantage-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.advantage-description {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin: 0;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 1.5rem;
  }
  
  .subtitle {
    font-size: 1.25rem;
  }
  
  .advantages-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .advantage-card {
    padding: 1.5rem 1rem;
  }
}
</style>

