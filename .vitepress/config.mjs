// 工作区/user-docs/.vitepress/config.mjs
// VitePress 配置文件
// 用途：配置文档站点结构、导航和主题设置
// 相关文件：index.md, 各功能页面文档

import { defineConfig } from 'vitepress'
import { lastUpdated } from './plugins/last-updated.js'

export default defineConfig({
  title: 'DStatus 用户文档',
  description: 'DStatus 用户使用文档',
  lang: 'zh-CN',

  // 站点基础配置
  base: '/',
  cleanUrls: true,

  // 生成 sitemap.xml，方便搜索引擎和 AI 抓取发现全部页面
  sitemap: { hostname: 'https://docs.dstatus.sh' },

  // 插件配置
  plugins: [lastUpdated()],

  // Vite 配置 - 解决 SSR 兼容性问题
  vite: {
    ssr: {
      noExternal: ['@iconify/vue'],
      external: ['@tsparticles/vue3', '@tsparticles/slim', '@tsparticles/engine']
    }
  },
  
  // 主题配置
  themeConfig: {
    // 站点 Logo（可选）
    logo: undefined,
    
    // 顶部导航栏
    nav: [
      { text: '开始使用', link: '/quick-start' },
      { text: 'AI 与 MCP', link: '/ai' },
      { text: 'App', link: '/apple-app' },
      { text: '常见问题', link: '/troubleshooting' },
      {
        text: '更新日志',
        items: [
          { text: '面板', link: '/changelog' },
          { text: '被控', link: '/agent-changelog' }
        ]
      },
      { text: '官网', link: 'https://dstatus.sh/', target: '_blank', rel: 'noopener noreferrer' },
    ],

    // 侧边栏：按用户路线排列（开始 → AI → 日常 → 维护 → 进阶 → 排障）
    sidebar: {
      '/': [
        {
          text: '开始使用',
          items: [
            { text: 'DStatus 是什么', link: '/' },
            { text: '获取与激活授权', link: '/license-management' },
            { text: '安装面板', link: '/quick-start' },
            { text: '接入节点', link: '/agent-guide' },
            { text: '配置通知', link: '/notification-settings' },
          ]
        },
        {
          text: 'AI 与自动化',
          items: [
            { text: 'AI 功能', link: '/ai' },
            { text: '远程 MCP', link: '/mcp' },
            { text: 'iOS / macOS App', link: '/apple-app' },
          ]
        },
        {
          text: '日常使用',
          items: [
            { text: '首页与节点详情', link: '/pages-overview' },
            { text: '网络质量', link: '/monitor' },
            { text: '管理服务器', link: '/server-management' },
            { text: '分组', link: '/groups' },
            { text: '账单与商家', link: '/billing-report' },
            { text: '外观与个性化', link: '/personalization' },
            { text: '访问控制与分享', link: '/access-control' },
          ]
        },
        {
          text: '管理与维护',
          items: [
            { text: '设置中心', link: '/system-settings' },
            { text: '升级、备份与迁移', link: '/panel-migration' },
            { text: '升级 Agent', link: '/agent-upgrade' },
            { text: '安全设置', link: '/security-settings' },
            { text: '进不去后台怎么办', link: '/login-management' },
            { text: '工具', link: '/tools' },
          ]
        },
        {
          text: '进阶',
          collapsed: true,
          items: [
            { text: '前后台域名分离', link: '/domain-split-manual' },
            { text: '自定义 CSS', link: '/theme-custom-css' },
            { text: '公开 API', link: '/public-api' },
          ]
        },
        {
          text: '排障',
          items: [
            { text: '常见问题', link: '/troubleshooting' },
          ]
        },
        {
          text: '更新日志',
          collapsed: true,
          items: [
            { text: '面板', link: '/changelog' },
            { text: '被控', link: '/agent-changelog' },
          ]
        }
      ]
    },
    
    // 页面内导航（右侧大纲）
    outline: {
      level: [2, 4],
      label: '页面导航',
      copyToClipboard: true
    },
    
    // 本地搜索配置
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },
    
    // 编辑链接（可选）
    editLink: undefined,
    
    // 最后更新时间（由插件自动设置）
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },
    
    // 页脚
    footer: {
      message: 'DStatus 文档',
      copyright: 'Copyright © DStatus'
    },
    
    // 社交链接（可选）
    socialLinks: []
  }
})
