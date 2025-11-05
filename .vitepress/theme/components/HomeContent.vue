// .vitepress/theme/components/HomeContent.vue
// 首页内容组件
// 功能：整合 ImageGallery 和 FeatureModules 组件

<script setup>
import ImageGallery from './ImageGallery.vue'
import FeatureModules from './FeatureModules.vue'
</script>

<template>
  <div class="home-content vp-doc">
    <ImageGallery />
    <FeatureModules />
  </div>
</template>

<style scoped>
.home-content {
  margin-top: 2rem;
  padding: 0 1.5rem;
  max-width: 1152px;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 768px) {
  .home-content {
    padding: 0 1rem;
  }
}
</style>

