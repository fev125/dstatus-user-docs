// .vitepress/theme/components/Features.vue
// Features 组件 - 使用图标库替换 emoji

<script setup>
import { Icon } from '@iconify/vue'

const props = defineProps({
  features: {
    type: Array,
    default: () => []
  }
})

// 图标映射表：emoji → Iconify 图标
const iconMap = {
  '🎨': 'mdi:palette',
  '🏠': 'mdi:home-variant',
  '🌍': 'mdi:earth',
  '📊': 'mdi:chart-box',
  '📈': 'mdi:chart-line',
  '🔍': 'mdi:magnify',
  '🖥️': 'mdi:server',
  '🔔': 'mdi:bell',
  '🤖': 'mdi:robot',
  '🔐': 'mdi:lock',
  '⚙️': 'mdi:cog',
  '🗄️': 'mdi:database'
}

function getIcon(emoji) {
  return iconMap[emoji] || 'mdi:circle'
}
</script>

<template>
  <section v-if="features.length" class="VPFeatures">
    <div class="container">
      <div class="items">
        <article
          v-for="(feature, index) in features"
          :key="index"
          class="VPFeature"
        >
          <div class="icon">
            <Icon :icon="getIcon(feature.icon)" width="48" height="48" />
          </div>
          <h2 class="title">{{ feature.title }}</h2>
          <p class="details">{{ feature.details }}</p>
          <a v-if="feature.link" :href="feature.link" class="link">
            了解更多 →
          </a>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.VPFeatures {
  padding: 3rem 1.5rem;
}

.container {
  max-width: 1152px;
  margin: 0 auto;
}

.items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.VPFeature {
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  padding: 1.5rem;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.VPFeature:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 8px 24px rgba(124, 58, 237, 0.12);
  transform: translateY(-4px);
}

.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  margin-bottom: 1rem;
  color: var(--vp-c-brand-1);
}

.title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--vp-c-text-1);
}

.details {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  flex: 1;
}

.link {
  display: inline-block;
  margin-top: 1rem;
  color: var(--vp-c-brand-1);
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s ease;
}

.link:hover {
  color: var(--vp-c-brand-2);
}

@media (max-width: 768px) {
  .items {
    grid-template-columns: 1fr;
  }
}
</style>
