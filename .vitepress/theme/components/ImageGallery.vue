// .vitepress/theme/components/ImageGallery.vue
// 图片轮播组件
// 功能：图片轮播展示，支持左右切换、指示器、键盘操作和点击预览

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'
import ImagePreview from './ImagePreview.vue'

const currentIndex = ref(0)
const previewImage = ref(null)
const previewAlt = ref('')
const showPreview = ref(false)

const images = [
  {
    src: '/homepage-light-mode.png',
    alt: '日间模式 - 清爽简洁',
    title: '日间模式'
  },
  {
    src: '/homepage-dark-mode.png',
    alt: '夜间模式 - 护眼舒适',
    title: '夜间模式'
  },
  {
    src: '/homepage-light-glassmorphism.png',
    alt: '玻璃拟态 + 自定义背景',
    title: '玻璃拟态'
  },
  {
    src: '/homepage-glassmorphism-dark-video.png',
    alt: '夜间模式 + 视频背景',
    title: '视频背景'
  },
  {
    src: '/homepage-list-view.png',
    alt: '列表模式 - 紧凑高效',
    title: '列表模式'
  },
  {
    src: '/globe-3d-preview.png',
    alt: '3D 地球 - 全球节点可视化',
    title: '3D 地球'
  }
]

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
  if (e.key === 'ArrowLeft') {
    prevImage()
  } else if (e.key === 'ArrowRight') {
    nextImage()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="image-gallery">
    <h3 class="section-title">
      <Icon icon="mdi:image-multiple" width="24" height="24" class="title-icon" />
      界面展示
    </h3>
    
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
        <div class="image-info">
          <h4 class="image-title">{{ images[currentIndex].title }}</h4>
          <p class="image-description">{{ images[currentIndex].alt }}</p>
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
    
    <div class="carousel-indicators">
      <button
        v-for="(image, index) in images"
        :key="index"
        :class="['indicator', { active: index === currentIndex }]"
        @click="goToImage(index)"
        :aria-label="`切换到第 ${index + 1} 张图片`"
      >
        <span class="indicator-dot"></span>
      </button>
    </div>
    
    <div class="carousel-thumbnails">
      <div
        v-for="(image, index) in images"
        :key="index"
        :class="['thumbnail', { active: index === currentIndex }]"
        @click="goToImage(index)"
      >
        <img :src="image.src" :alt="image.title" />
        <span class="thumbnail-label">{{ image.title }}</span>
      </div>
    </div>
    
    <ImagePreview
      :image-src="previewImage"
      :image-alt="previewAlt"
      :visible="showPreview"
      @close="closePreview"
    />
  </div>
</template>

<style scoped>
.image-gallery {
  margin: 3rem 0;
}

.section-title {
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin-top: 0.5rem;
  margin-bottom: 2rem;
  padding: 0.5rem 0;
  color: var(--vp-c-text-1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.title-icon {
  color: var(--vp-c-brand-1);
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.section-title:hover .title-icon {
  transform: scale(1.1);
}

.carousel-container {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
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
  transform: translateY(-4px);
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

.image-info {
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
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

.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
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

.carousel-thumbnails {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.thumbnail {
  position: relative;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid transparent;
  transition: all 0.2s ease;
}

.thumbnail:hover {
  transform: translateY(-2px);
  border-color: var(--vp-c-brand-1);
}

.thumbnail.active {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 12px rgba(30, 64, 175, 0.2);
}

.thumbnail img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.2s ease;
}

.thumbnail:hover img {
  transform: scale(1.05);
}

.thumbnail-label {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.5rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
  font-size: 0.8125rem;
  text-align: center;
  font-weight: 500;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 1.5rem;
    gap: 0.625rem;
    margin-bottom: 1.5rem;
  }
  
  .carousel-btn {
    width: 40px;
    height: 40px;
  }
  
  .carousel-btn Icon {
    width: 24px;
    height: 24px;
  }
  
  .carousel-thumbnails {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .image-info {
    padding: 1rem;
  }
}

@media (max-width: 640px) {
  .carousel-container {
    gap: 0.5rem;
  }
  
  .carousel-btn {
    width: 36px;
    height: 36px;
  }
  
  .carousel-thumbnails {
    display: none;
  }
}
</style>
