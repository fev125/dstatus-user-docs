// .vitepress/theme/components/HomeContent.vue
// 首页内容组件
// 功能：整合所有首页自定义 Vue 组件

<script setup>
import ImageGallery from './ImageGallery.vue'
import FeatureModules from './FeatureModules.vue'
import WhyChoose from './WhyChoose.vue'
import QuickStart from './QuickStart.vue'
import DocsNavigation from './DocsNavigation.vue'
import HelpSection from './HelpSection.vue'
</script>

<template>
  <div class="home-content vp-doc">
    <ImageGallery />
    <FeatureModules />
    <WhyChoose />
    <QuickStart />
    <DocsNavigation />
    <HelpSection />
  </div>
</template>

<style scoped>
.home-content {
  margin-top: 2rem;
  padding: 0 2rem;
  width: 100%;
  max-width: 100%;
}

@media (max-width: 768px) {
  .home-content {
    padding: 0 1rem;
  }
}
</style>

