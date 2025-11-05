// .vitepress/theme/index.js
// 自定义主题入口
// 扩展默认主题并添加自定义样式和图标组件

import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { Icon } from '@iconify/vue'
import Hero from './components/Hero.vue'
import Features from './components/Features.vue'
import HomeContent from './components/HomeContent.vue'
import './custom.css'

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'home-hero-before': () => {
        const { frontmatter } = useData()
        // 如果是首页，使用自定义 Hero
        if (frontmatter.value?.layout === 'home') {
          return h('div', { class: 'custom-hero-wrapper' }, [h(Hero)])
        }
        return null
      },
      'home-features-after': () => {
        const { frontmatter } = useData()
        const features = frontmatter.value?.features || []
        if (features.length === 0) return null
        return h('div', [
          h(Features, { features }),
          h(HomeContent)
        ])
      }
    })
  },
  enhanceApp({ app }) {
    // 注册全局图标组件
    app.component('Icon', Icon)
  }
}
