// .vitepress/theme/components/HomeContent.vue
// 首页内容组件
// 功能：整合所有首页自定义 Vue 组件

<script setup>
import FeatureModules from './FeatureModules.vue'
import QuickStart from './QuickStart.vue'
</script>

<template>
  <div class="home-content vp-doc">
    <FeatureModules />
    <QuickStart />
  </div>
</template>

<style scoped>
.home-content {
  margin-top: 2rem;
  padding: 0 2rem;
  width: 100%;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 768px) {
  .home-content {
    padding: 0 1rem;
  }
}
</style>

