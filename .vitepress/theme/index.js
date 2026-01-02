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

function syncSidebarGroups({ defaultOpenGroupText } = {}) {
  if (typeof document === 'undefined') return

  const sidebar = document.querySelector('.VPSidebar')
  if (!sidebar) return

  const groups = Array.from(sidebar.querySelectorAll('.VPSidebarItem.level-0.collapsible'))
  if (groups.length === 0) return

  const activeGroup = groups.find((g) => g.classList.contains('has-active'))
  const fallbackGroup = defaultOpenGroupText
    ? groups.find((g) => g.textContent?.includes(defaultOpenGroupText))
    : groups[0]

  const shouldOpen = activeGroup || fallbackGroup
  if (!shouldOpen) return

  for (const g of groups) {
    const wantOpen = g === shouldOpen
    const isCollapsed = g.classList.contains('collapsed')
    if (wantOpen && isCollapsed) {
      g.querySelector('.item')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    } else if (!wantOpen && !isCollapsed) {
      g.querySelector('.item')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    }
  }
}

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
        return h('div', [h(Features, { features }), h(HomeContent)])
      },
    })
  },
  enhanceApp({ app, router }) {
    // 注册全局图标组件
    app.component('Icon', Icon)

    // 只在客户端注册粒子背景插件
    if (typeof window !== 'undefined') {
      import('@tsparticles/vue3').then(({ default: Particles }) => {
        import('@tsparticles/slim').then(({ loadSlim }) => {
          app.use(Particles, {
            init: async (engine) => {
              await loadSlim(engine)
            },
          })
        })
      })
    }

    // 侧边栏：默认折叠，只展开当前页面所属分组；若无激活分组则默认展开“开始使用”
    if (typeof window !== 'undefined' && router) {
      const run = () => {
        window.requestAnimationFrame(() => syncSidebarGroups({ defaultOpenGroupText: '开始使用' }))
      }

      run()
      router.onAfterRouteChanged = run
    }
  },
}
