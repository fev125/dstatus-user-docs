// 工作区/user-docs/.vitepress/config.mjs
// VitePress 配置文件
// 用途：配置文档站点结构、导航和主题设置
// 相关文件：index.md, 各功能页面文档

import { defineConfig } from 'vitepress'
import { lastUpdated } from './plugins/last-updated.js'

export default defineConfig({
  title: 'DStatus 用户文档',
  description: 'DStatus 使用文档（只讲要点）',
  lang: 'zh-CN',

  // 站点基础配置
  base: '/',
  cleanUrls: true,

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
      { text: '首页', link: '/' },
      { text: '快速开始', link: '/quick-start' },
      { text: '使用指南', link: '/usage' },
      { text: '官网', link: 'https://client.vps.mom/', target: '_blank', rel: 'noopener noreferrer' },
    ],
    
    // 侧边栏配置
    sidebar: {
      '/': [
        {
          text: '开始使用',
          collapsible: true,
          collapsed: false,
          items: [
            { text: '首页', link: '/' },
            { text: '快速开始', link: '/quick-start' },
            { text: '使用指南', link: '/usage' },
            { text: '页面总览', link: '/pages-overview' },
          ]
        },
        {
          text: '面板管理',
          collapsible: true,
          collapsed: true,
          items: [
            { text: '网络监控配置', link: '/monitor' },
            { text: '服务器管理', link: '/server-management' },
            { text: '分组管理', link: '/groups' },
            { text: '自动发现', link: '/autodiscovery' },
            { text: '账单报告', link: '/billing-report' },
          ]
        },
        {
          text: '系统设置',
          collapsible: true,
          collapsed: true,
          items: [
            { text: '系统设置', link: '/system-settings' },
            { text: '个性化设置', link: '/personalization' },
            { text: '高级设置', link: '/advanced-settings' },
            { text: '通知设置', link: '/notification-settings' },
            { text: '安全设置', link: '/security-settings' },
            { text: '登录管理', link: '/login-management' },
            { text: '日志管理', link: '/log-management' },
            { text: '许可证管理', link: '/license-management' },
            { text: 'SSH脚本', link: '/ssh-scripts' },
          ]
        },
        {
          text: 'Agent',
          collapsible: true,
          collapsed: true,
          items: [
            { text: 'Agent使用指南', link: '/agent-guide' },
            { text: 'Windows运行教程', link: '/Agent-Windows运行教程' },
            { text: 'OpenWrt运行教程', link: '/Agent-OpenWrt运行教程' },
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
