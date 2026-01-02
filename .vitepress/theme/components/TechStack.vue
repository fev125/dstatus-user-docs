// .vitepress/theme/components/TechStack.vue
// 技术栈展示 - 展示项目使用的核心技术
// 功能：增强技术可信度，吸引技术用户
// 相关文件：HomeContent.vue, custom.css

<script setup>
import { Icon } from '@iconify/vue'

const techCategories = [
  {
    title: '后端技术',
    icon: 'mdi:server',
    color: '#10b981',
    techs: [
      { name: 'Node.js', icon: 'mdi:nodejs', color: '#339933' },
      { name: 'Express', icon: 'simple-icons:express', color: '#000000' },
      { name: 'SQLite', icon: 'simple-icons:sqlite', color: '#003B57' },
      { name: 'PostgreSQL', icon: 'simple-icons:postgresql', color: '#4169E1' }
    ]
  },
  {
    title: '前端技术',
    icon: 'mdi:monitor',
    color: '#3b82f6',
    techs: [
      { name: 'TailwindCSS', icon: 'simple-icons:tailwindcss', color: '#06B6D4' },
      { name: 'ECharts', icon: 'simple-icons:apacheecharts', color: '#AA344D' },
      { name: 'Nunjucks', icon: 'mdi:code-braces', color: '#1C4913' },
      { name: 'Three.js', icon: 'simple-icons:threedotjs', color: '#000000' }
    ]
  },
  {
    title: '监控 Agent',
    icon: 'mdi:robot',
    color: '#f59e0b',
    techs: [
      { name: 'Golang', icon: 'simple-icons:go', color: '#00ADD8' },
      { name: 'MTR', icon: 'mdi:network', color: '#6366f1' },
      { name: 'Ping', icon: 'mdi:radar', color: '#8b5cf6' },
      { name: 'iPerf3', icon: 'mdi:speedometer', color: '#ec4899' }
    ]
  },
  {
    title: '智能分析',
    icon: 'mdi:brain',
    color: '#ef4444',
    techs: [
      { name: 'Google Gemini', icon: 'simple-icons:google', color: '#4285F4' },
      { name: 'AI 分析', icon: 'mdi:robot-outline', color: '#7c3aed' },
      { name: '异常检测', icon: 'mdi:alert-circle', color: '#dc2626' },
      { name: '趋势预测', icon: 'mdi:chart-line', color: '#059669' }
    ]
  }
]
</script>

<template>
  <section class="tech-stack-section">
    <div class="section-header">
      <div class="text-center max-w-3xl mx-auto px-4">
        <h2 class="text-3xl sm:text-4xl font-bold mb-3 text-[var(--vp-c-text-1)] tracking-tight">
          技术栈
        </h2>
        <p class="text-sm sm:text-base text-[var(--vp-c-text-2)]">
          基于现代化技术栈构建，性能卓越，扩展性强
        </p>
      </div>
    </div>
    
    <div class="tech-grid">
      <div
        v-for="(category, index) in techCategories"
        :key="index"
        class="tech-category"
      >
        <div class="category-header">
          <div class="category-icon" :style="{ '--category-color': category.color }">
            <Icon :icon="category.icon" class="icon" />
          </div>
          <h3 class="category-title">{{ category.title }}</h3>
        </div>
        
        <div class="tech-list">
          <div
            v-for="(tech, techIndex) in category.techs"
            :key="techIndex"
            class="tech-item"
            :style="{ '--tech-color': tech.color }"
          >
            <Icon :icon="tech.icon" class="tech-icon" />
            <span class="tech-name">{{ tech.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tech-stack-section {
  margin: 4rem 0;
  padding: 3rem 0;
}

.section-header {
  margin-bottom: 3rem;
}

.tech-grid {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.tech-category {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;
}

.tech-category:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.12);
  transform: translateY(-4px);
}

.category-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
}

.category-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--category-color);
  border-radius: 12px;
  opacity: 0.15;
}

.category-icon .icon {
  width: 28px;
  height: 28px;
  color: var(--category-color);
  opacity: 10;
}

.category-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.tech-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  transition: all 0.2s ease;
  cursor: default;
}

.tech-item:hover {
  border-color: var(--tech-color);
  background: var(--vp-c-bg-soft);
  transform: translateX(4px);
}

.tech-icon {
  width: 24px;
  height: 24px;
  color: var(--tech-color);
  flex-shrink: 0;
}

.dark .tech-icon {
  filter: brightness(1.2);
}

.tech-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tech-item:hover .tech-name {
  color: var(--vp-c-text-1);
}

@media (max-width: 768px) {
  .tech-stack-section {
    margin: 3rem 0;
    padding: 2rem 0;
  }
  
  .section-header {
    margin-bottom: 2rem;
  }
  
  .tech-grid {
    padding: 0 1rem;
    gap: 1.5rem;
    grid-template-columns: 1fr;
  }
  
  .tech-category {
    padding: 1.5rem;
  }
  
  .tech-list {
    gap: 0.5rem;
  }
  
  .tech-item {
    padding: 0.75rem 0.875rem;
  }
}

@media (max-width: 480px) {
  .tech-list {
    grid-template-columns: 1fr;
  }
}
</style>



