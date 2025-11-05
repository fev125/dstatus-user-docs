// .vitepress/theme/components/HomeContent.vue
// 首页内容组件
// 功能：整合 ImageGallery 和 FeatureModules 组件

<script setup>
import ImageGallery from './ImageGallery.vue'
import FeatureModules from './FeatureModules.vue'
</script>

<template>
  <div class="home-content">
    <ImageGallery />
    <FeatureModules />
  </div>
</template>

<style scoped>
.home-content {
  margin-top: 2rem;
}
</style>

