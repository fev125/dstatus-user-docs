// .vitepress/theme/components/ImageGallery.vue
// 图片展示网格组件
// 功能：图片展示网格，集成预览功能，支持懒加载和 hover 效果

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import ImagePreview from './ImagePreview.vue'

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

function openPreview(image) {
  previewImage.value = image.src
  previewAlt.value = image.alt
  showPreview.value = true
}

function closePreview() {
  showPreview.value = false
}
</script>

<template>
  <div class="image-gallery">
    <h3 class="section-title">
      <Icon icon="mdi:image-multiple" width="24" height="24" class="title-icon" />
      界面展示
    </h3>
    <div class="gallery-grid">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="gallery-item"
        @click="openPreview(image)"
      >
        <div class="image-wrapper">
          <img
            :src="image.src"
            :alt="image.alt"
            :loading="index < 2 ? 'eager' : 'lazy'"
            class="gallery-image"
          />
          <div class="image-overlay">
            <Icon icon="mdi:magnify" width="32" height="32" class="zoom-icon" />
          </div>
        </div>
        <p class="image-caption">{{ image.title }}</p>
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
  margin: 2rem 0;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--vp-c-text-1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.title-icon {
  color: var(--vp-c-brand-1);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.gallery-item {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.gallery-item:hover {
  transform: translateY(-4px);
}

.image-wrapper {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.image-wrapper:hover {
  box-shadow: 0 8px 16px rgba(59, 130, 246, 0.2);
}

.image-wrapper:hover .image-overlay {
  opacity: 1;
}

.gallery-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.gallery-item:hover .gallery-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  backdrop-filter: blur(2px);
}

.zoom-icon {
  color: white;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.image-caption {
  text-align: center;
  margin-top: 0.5rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: 1fr;
  }
}
</style>

