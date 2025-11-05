// .vitepress/theme/components/ImagePreview.vue
// 图片预览模态框组件
// 功能：图片放大预览，支持 ESC 关闭和背景遮罩

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
  imageSrc: {
    type: String,
    required: true
  },
  imageAlt: {
    type: String,
    default: ''
  },
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

function handleClose() {
  emit('close')
}

function handleKeydown(e) {
  if (e.key === 'Escape' && props.visible) {
    handleClose()
  }
}

function handleBackdropClick(e) {
  if (e.target === e.currentTarget) {
    handleClose()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="visible"
        class="image-preview-overlay"
        @click="handleBackdropClick"
      >
        <div class="image-preview-container">
          <button class="close-button" @click="handleClose" aria-label="关闭">
            <Icon icon="mdi:close" width="24" height="24" />
          </button>
          <img
            :src="imageSrc"
            :alt="imageAlt"
            class="preview-image"
            @click.stop
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.image-preview-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  cursor: pointer;
}

.image-preview-container {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-image {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  cursor: default;
}

.close-button {
  position: absolute;
  top: -50px;
  right: 0;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  transition: all 0.3s ease;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
  transform: scale(1.1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .close-button {
    top: 10px;
    right: 10px;
    width: 36px;
    height: 36px;
  }

  .image-preview-container {
    max-width: 100vw;
    padding: 20px;
  }
}
</style>

