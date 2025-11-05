// .vitepress/theme/components/Hero.vue
// 自定义 Hero 组件 - 上下布局，集成图片轮播，根据主题自动选择初始图片

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { Icon } from '@iconify/vue'
import ImagePreview from './ImagePreview.vue'

const isDark = ref(false)
const currentIndex = ref(0)
const previewImage = ref(null)
const previewAlt = ref('')
const showPreview = ref(false)

const images = [
  {
    src: '/homepage-light-mode.png',
    alt: '日间模式 - 清爽简洁',
    title: '日间模式',
    theme: 'light'
  },
  {
    src: '/homepage-dark-mode.png',
    alt: '夜间模式 - 护眼舒适',
    title: '夜间模式',
    theme: 'dark'
  },
  {
    src: '/homepage-light-glassmorphism.png',
    alt: '玻璃拟态 + 自定义背景',
    title: '玻璃拟态',
    theme: 'light'
  },
  {
    src: '/homepage-glassmorphism-dark-video.png',
    alt: '夜间模式 + 视频背景',
    title: '视频背景',
    theme: 'dark'
  },
  {
    src: '/homepage-list-view.png',
    alt: '列表模式 - 紧凑高效',
    title: '列表模式',
    theme: 'light'
  },
  {
    src: '/globe-3d-preview.png',
    alt: '3D 地球 - 全球节点可视化',
    title: '3D 地球',
    theme: 'dark'
  }
]

const updateTheme = () => {
  isDark.value = document.documentElement.classList.contains('dark')
}

const setInitialImage = () => {
  // 根据主题选择初始图片
  if (isDark.value) {
    // 夜间模式：优先显示夜间模式图片（索引1）
    currentIndex.value = 1
  } else {
    // 日间模式：优先显示日间模式图片（索引0）
    currentIndex.value = 0
  }
}

onMounted(() => {
  updateTheme()
  setInitialImage()
  
  // 监听主题变化
  const observer = new MutationObserver(() => {
    updateTheme()
    setInitialImage()
  })
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
  
  // 键盘事件
  window.addEventListener('keydown', handleKeydown)
  
  onUnmounted(() => {
    observer.disconnect()
    window.removeEventListener('keydown', handleKeydown)
  })
})

function prevImage() {
  currentIndex.value = (currentIndex.value - 1 + images.length) % images.length
}

function nextImage() {
  currentIndex.value = (currentIndex.value + 1) % images.length
}

function goToImage(index) {
  currentIndex.value = index
}

function openPreview() {
  const image = images[currentIndex.value]
  previewImage.value = image.src
  previewAlt.value = image.alt
  showPreview.value = true
}

function closePreview() {
  showPreview.value = false
}

function handleKeydown(e) {
  if (showPreview.value) return
  if (e.key === 'ArrowLeft') {
    prevImage()
  } else if (e.key === 'ArrowRight') {
    nextImage()
  }
}
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
      
      <div class="hero-carousel">
        <div class="carousel-container">
          <button 
            class="carousel-btn prev" 
            @click="prevImage"
            aria-label="上一张"
          >
            <Icon icon="mdi:chevron-left" width="32" height="32" />
          </button>
          
          <div class="carousel-main" @click="openPreview">
            <div class="image-wrapper">
              <img 
                :src="images[currentIndex].src"
                :alt="images[currentIndex].alt"
                class="carousel-image"
              />
              <div class="image-overlay">
                <Icon icon="mdi:magnify" width="48" height="48" class="zoom-icon" />
                <p class="overlay-text">点击放大查看</p>
              </div>
            </div>
          </div>
          
          <button 
            class="carousel-btn next" 
            @click="nextImage"
            aria-label="下一张"
          >
            <Icon icon="mdi:chevron-right" width="32" height="32" />
          </button>
        </div>
        
        <div class="carousel-info">
          <h4 class="image-title">{{ images[currentIndex].title }}</h4>
          <p class="image-description">{{ images[currentIndex].alt }}</p>
        </div>
        
        <div class="carousel-indicators">
          <button
            v-for="(image, index) in images"
            :key="index"
            :class="['indicator', { active: index === currentIndex }]"
            @click="goToImage(index)"
            :aria-label="`切换到 ${image.title}`"
            :title="image.title"
          >
            <span class="indicator-dot"></span>
          </button>
        </div>
      </div>
    </div>
    
    <ImagePreview
      :image-src="previewImage"
      :image-alt="previewAlt"
      :visible="showPreview"
      @close="closePreview"
    />
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

/* 轮播图样式 */
.hero-carousel {
  width: 100%;
  max-width: 1400px;
  padding: 0 2rem;
}

.carousel-container {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.carousel-main {
  flex: 1;
  cursor: pointer;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.carousel-main:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.12);
}

.image-wrapper {
  position: relative;
  width: 100%;
  background: var(--vp-c-bg-soft);
}

.carousel-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.carousel-main:hover .carousel-image {
  transform: scale(1.02);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.carousel-main:hover .image-overlay {
  opacity: 1;
}

.zoom-icon {
  color: white;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5));
}

.overlay-text {
  color: white;
  font-size: 1rem;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  margin: 0;
}

.carousel-btn {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.carousel-btn:hover {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: white;
  transform: scale(1.1);
}

.carousel-btn:active {
  transform: scale(0.95);
}

.carousel-info {
  text-align: center;
  padding: 1rem;
  margin-bottom: 1rem;
}

.image-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 0.5rem 0;
}

.image-description {
  font-size: 0.9375rem;
  color: var(--vp-c-text-2);
  margin: 0;
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.indicator {
  padding: 0.5rem;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.indicator:hover {
  transform: scale(1.2);
}

.indicator-dot {
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--vp-c-divider);
  transition: all 0.3s ease;
}

.indicator.active .indicator-dot {
  background: var(--vp-c-brand-1);
  width: 24px;
  border-radius: 5px;
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
  
  .hero-carousel {
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
  
  .hero-carousel {
    padding: 0 1rem;
  }
  
  .carousel-container {
    gap: 0.5rem;
  }
  
  .carousel-btn {
    width: 40px;
    height: 40px;
  }
  
  .carousel-info {
    padding: 0.75rem;
  }
}
</style>
