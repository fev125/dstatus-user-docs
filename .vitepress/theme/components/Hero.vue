// .vitepress/theme/components/Hero.vue
// 自定义 Hero 组件 - 左右布局，hover 切换日夜效果

<script setup>
import { ref } from 'vue'

const isHovered = ref(false)
</script>

<template>
  <section class="VPHero">
    <div class="hero-content">
      <div class="hero-text">
        <h1 class="name">DStatus</h1>
        <p class="text">企业级分布式监控系统</p>
        <p class="tagline">实时性能监控 · 网络质量分析 · AI 智能告警 · 全球节点可视化</p>
        <div class="actions">
          <a class="action brand" href="/quick-start">
            快速开始 →
          </a>
          <a class="action alt" href="/pages-overview">
            查看演示
          </a>
          <a class="action alt" href="https://github.com/fev125/dstatus-user-docs">
            GitHub
          </a>
        </div>
      </div>
      <div 
        class="hero-images" 
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
      >
        <div class="image-wrapper">
          <img 
            :src="isHovered ? '/homepage-dark-mode.png' : '/homepage-light-mode.png'"
            :alt="isHovered ? '夜间模式' : '日间模式'"
            class="hero-image"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.VPHero {
  position: relative;
  padding: 4rem 2rem;
  margin: 0;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  background: var(--vp-c-bg);
}

.hero-content {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-text {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.name {
  color: var(--vp-c-brand-1);
  font-size: 4.5rem;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin: 0;
}

.text {
  font-size: 2.2rem;
  font-weight: 600;
  opacity: 0.95;
  color: var(--vp-c-text-1);
  margin: 0;
}

.tagline {
  font-size: 1.3rem;
  opacity: 0.85;
  color: var(--vp-c-text-2);
  margin: 0;
}

.actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.action {
  display: inline-block;
  padding: 0.875rem 1.75rem;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 10px;
  text-decoration: none;
  transition: all 0.2s ease;
  border: none;
}

.action.brand {
  background: var(--vp-c-brand-1);
  color: white;
  box-shadow: 0 4px 12px rgba(124, 58, 237, 0.4);
}

.action.brand:hover {
  background: var(--vp-c-brand-2);
  box-shadow: 0 8px 20px rgba(124, 58, 237, 0.5);
}

.action.alt {
  background: rgba(124, 58, 237, 0.1);
  color: var(--vp-c-brand-1);
  border: 1px solid rgba(124, 58, 237, 0.2);
}

.action.alt:hover {
  background: rgba(124, 58, 237, 0.15);
  border-color: rgba(124, 58, 237, 0.4);
}

.hero-images {
  position: relative;
  width: 100%;
}

.image-wrapper {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
}

.hero-image {
  width: 100%;
  height: auto;
  display: block;
  transition: opacity 0.3s ease;
}

@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .hero-images {
    order: -1;
  }
  
  .name {
    font-size: 3rem;
  }
  
  .text {
    font-size: 1.8rem;
  }
}

@media (max-width: 768px) {
  .VPHero {
    padding: 3rem 1rem;
  }
  
  .name {
    font-size: 2.5rem;
  }
  
  .text {
    font-size: 1.5rem;
  }
  
  .tagline {
    font-size: 1.1rem;
  }
}
</style>
