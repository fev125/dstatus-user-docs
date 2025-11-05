// .vitepress/theme/components/DocsNavigation.vue
// 文档导航组件
// 功能：展示分类文档导航，使用卡片式布局

<script setup>
import { Icon } from '@iconify/vue'

const docCategories = [
  {
    icon: 'mdi:school',
    title: '基础教程',
    docs: [
      { text: '快速开始', link: '/quick-start' },
      { text: '使用教程', link: '/usage' },
      { text: '操作指南', link: '/usage-guide' }
    ]
  },
  {
    icon: 'mdi:robot',
    title: 'Agent 部署',
    docs: [
      { text: 'Windows', link: '/Agent-Windows运行教程' },
      { text: 'OpenWrt', link: '/Agent-OpenWrt运行教程' }
    ]
  },
  {
    icon: 'mdi:monitor-dashboard',
    title: '监控管理',
    docs: [
      { text: '网络监控配置', link: '/monitor' },
      { text: '服务器管理', link: '/server-management' },
      { text: '分组管理', link: '/groups' },
      { text: '自动发现', link: '/autodiscovery' }
    ]
  },
  {
    icon: 'mdi:cog',
    title: '系统管理',
    docs: [
      { text: 'SSH脚本', link: '/ssh-scripts' },
      { text: '安全设置', link: '/security-settings' },
      { text: '系统设置', link: '/system-settings' },
      { text: '通知设置', link: '/notification-settings' },
      { text: '高级设置', link: '/advanced-settings' },
      { text: '许可证管理', link: '/license-management' }
    ]
  }
]
</script>

<template>
  <section class="docs-navigation">
    <h2 class="section-title">
      <Icon icon="mdi:book-open-variant" width="28" height="28" class="title-icon" />
      文档导航
    </h2>
    
    <div class="categories-grid">
      <div
        v-for="(category, index) in docCategories"
        :key="index"
        class="category-card"
      >
        <div class="category-header">
          <div class="category-icon">
            <Icon :icon="category.icon" width="28" height="28" />
          </div>
          <h3 class="category-title">{{ category.title }}</h3>
        </div>
        <ul class="docs-list">
          <li
            v-for="(doc, docIndex) in category.docs"
            :key="docIndex"
            class="doc-item"
          >
            <a :href="doc.link" class="doc-link">
              <Icon icon="mdi:file-document" width="16" height="16" class="doc-icon" />
              <span>{{ doc.text }}</span>
              <Icon icon="mdi:chevron-right" width="16" height="16" class="arrow-icon" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.docs-navigation {
  margin-top: 4rem;
  margin-bottom: 3rem;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: var(--vp-c-text-1);
}

.title-icon {
  color: var(--vp-c-brand-1);
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.category-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.category-card:hover {
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.12);
  border-color: var(--vp-c-brand-1);
}

.category-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--vp-c-divider);
}

.category-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.05));
  border-radius: 10px;
  color: var(--vp-c-brand-1);
}

.category-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0;
}

.docs-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.doc-item {
  margin: 0;
}

.doc-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 0.75rem;
  border-radius: 8px;
  text-decoration: none;
  color: var(--vp-c-text-2);
  transition: all 0.2s ease;
  position: relative;
}

.doc-link:hover {
  background: rgba(59, 130, 246, 0.08);
  color: var(--vp-c-brand-1);
  padding-left: 1rem;
}

.doc-icon {
  flex-shrink: 0;
  color: var(--vp-c-text-3);
  transition: color 0.2s ease;
}

.doc-link:hover .doc-icon {
  color: var(--vp-c-brand-1);
}

.doc-link span {
  flex-grow: 1;
  font-size: 0.9375rem;
}

.arrow-icon {
  flex-shrink: 0;
  opacity: 0;
  transform: translateX(-4px);
  transition: all 0.2s ease;
  color: var(--vp-c-brand-1);
}

.doc-link:hover .arrow-icon {
  opacity: 1;
  transform: translateX(0);
}

@media (max-width: 768px) {
  .section-title {
    font-size: 1.5rem;
  }
  
  .categories-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .category-card {
    padding: 1.25rem;
  }
}
</style>

