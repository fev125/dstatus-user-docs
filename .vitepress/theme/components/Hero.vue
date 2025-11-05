// .vitepress/theme/components/Hero.vue
// 自定义 Hero 组件 - 上下布局，图片根据主题自动切换

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const isDark = ref(false)

const updateTheme = () => {
  isDark.value = document.documentElement.classList.contains('dark')
}

onMounted(() => {
  updateTheme()
  // 监听主题变化
  const observer = new MutationObserver(updateTheme)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
  onUnmounted(() => observer.disconnect())
})

const currentImage = computed(() => {
  return isDark.value ? '/homepage-dark-mode.png' : '/homepage-light-mode.png'
})

const currentAlt = computed(() => {
  return isDark.value ? '夜间模式' : '日间模式'
})
</script>

<template>
  <section class="VPHero custom-hero">
    <div class="hero-content">
      <div class="hero-text">
        <h1 class="name">DStatus</h1>
        <p class="text">企业级分布式监控系统</p>
        <p class="tagline">实时性能监控 · 网络质量分析 · AI 智能告警 · 全球节点可视化</p>
        <div class="actions">
          <a class="action brand" href="/quick-start">
            快速开始 →
          </a>
          <a class="action alt" href="https://demo.vps.mom" target="_blank" rel="noopener noreferrer">
            查看演示
          </a>
        </div>
      </div>
      <div class="hero-images">
        <div class="image-wrapper">
          <img 
            :src="currentImage"
            :alt="currentAlt"
            class="hero-image"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.VPHero.custom-hero {
  padding: 3rem 0;
  margin: 0;
  width: 100%;
}

.hero-content {
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  text-align: center;
}

.hero-text {
  width: 100%;
  max-width: 900px;
  padding: 0 1.5rem;
}

.name {
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.2;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
}

.text {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.75rem;
}

.tagline {
  font-size: 1.25rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 2.5rem;
  font-size: 1.0625rem;
  font-weight: 600;
  border-radius: 10px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.action.brand {
  background: var(--vp-c-brand-1);
  color: white;
}

.action.brand:hover {
  background: var(--vp-c-brand-2);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(30, 64, 175, 0.25);
}

.action.alt {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.action.alt:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(30, 64, 175, 0.15);
}

.hero-images {
  width: 100%;
  max-width: 1400px;
  padding: 0 2rem;
}

.image-wrapper {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.image-wrapper:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.12);
}

.hero-image {
  width: 100%;
  height: auto;
  display: block;
  transition: opacity 0.3s ease;
}

@media (max-width: 960px) {
  .name {
    font-size: 3rem;
  }
  
  .text {
    font-size: 1.5rem;
  }
  
  .tagline {
    font-size: 1.125rem;
  }
  
  .hero-images {
    max-width: 100%;
    padding: 0 1.5rem;
  }
}

@media (max-width: 640px) {
  .VPHero.custom-hero {
    padding: 2rem 0;
  }
  
  .hero-content {
    gap: 2rem;
  }
  
  .hero-text {
    padding: 0 1rem;
  }
  
  .name {
    font-size: 2.25rem;
  }
  
  .text {
    font-size: 1.25rem;
  }
  
  .tagline {
    font-size: 1rem;
  }
  
  .actions {
    flex-direction: column;
    width: 100%;
    padding: 0 1rem;
  }
  
  .action {
    width: 100%;
  }
  
  .hero-images {
    padding: 0 1rem;
  }
}
</style>
