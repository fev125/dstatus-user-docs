---
layout: home

hero:
  name: DStatus
  text: 企业级分布式监控系统
  tagline: 实时性能监控 · 网络质量分析 · AI 智能告警 · 全球节点可视化

features:
  - icon: 🎨
    title: 界面优美，沉浸式体验
    details: 基于 TailwindCSS 构建现代化 UI，支持玻璃拟态效果（3档可调）、视频动态背景、深色模式，完美适配各种设备
    link: /usage-guide
    
  - icon: 🏠
    title: 首页功能强大，交互灵活
    details: 双视图模式（卡片/列表）、强大筛选（状态/到期/地区/标签）、多维排序、拖拽排序、隐私模式、懒加载优化
    link: /usage
    
  - icon: 🌍
    title: 3D 地球全局可视化
    details: 炫酷的 3D 地球展示节点全球分布，支持国旗显示和交互，节点信息一目了然
    
  - icon: 📊
    title: 卡片信息丰富
    details: 实时性能（CPU/内存/磁盘/网络）、网络质量（延迟/丢包）、流量统计、到期管理、自定义标签、在线时长
    
  - icon: 📈
    title: 专业图表，灵活多维
    details: 基于 ECharts 企业级图表库，支持多时间范围（1小时~30天）、多层级颗粒度（分钟/小时/天/月）、实时与历史无缝切换
    link: /monitor
    
  - icon: 🔍
    title: 网络质量精准洞察
    details: 多节点监控、TCPing 延迟曲线、丢包率统计、范围带可视化，快速识别网络不稳定时段
    
  - icon: 🖥️
    title: 服务器管理全面
    details: 集中管理、分组筛选、自动发现、WebSSH 终端、SSH 脚本管理，支持批量操作和标签分类
    link: /server-management
    
  - icon: 🔔
    title: 多通道智能告警
    details: 支持邮件、Telegram、Webhook 等多种通知方式，自定义告警规则、阈值和静默时段
    link: /notification-settings
    
  - icon: 🤖
    title: AI 驱动性能优化
    details: Google Gemini 智能分析、异常检测、趋势预测，自动识别性能瓶颈和潜在风险
    
  - icon: 🔐
    title: 安全与权限
    details: 双因素认证（TOTP）、GitHub OAuth、登录通知、HTTP 安全策略（CSP/HSTS/XSS 防护）
    link: /security-settings
    
  - icon: ⚙️
    title: 灵活的系统配置
    details: 许可证管理、站点配置、性能优化、PostgreSQL 支持、存储管理、数据清理、主题定制
    link: /advanced-settings
    
  - icon: 🗄️
    title: 双数据库架构
    details: SQLite（开箱即用）/ PostgreSQL（生产级扩展），灵活的数据保留策略、自动归档和清理
---

<!-- 自定义内容区域 -->

## 🎯 为什么选择 DStatus？

<div class="vp-doc" style="margin-top: 2rem;">

### 🚀 快速部署，开箱即用

- ✅ **5分钟快速部署** - 一键脚本安装，自动配置 Docker 环境
- ✅ **零配置依赖** - 无需手动安装 Node.js、数据库等依赖
- ✅ **Agent 自动发现** - 支持自动注册和批量部署
- ✅ **完善的文档** - 详细的部署和使用指南

### 💎 界面展示

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin: 2rem 0;">

<div>
<img src="/homepage-light-mode.png" alt="日间模式" style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
<p style="text-align: center; margin-top: 0.5rem; color: #666;">日间模式 - 清爽简洁</p>
</div>

<div>
<img src="/homepage-dark-mode.png" alt="夜间模式" style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
<p style="text-align: center; margin-top: 0.5rem; color: #666;">夜间模式 - 护眼舒适</p>
</div>

<div>
<img src="/homepage-light-glassmorphism.png" alt="玻璃拟态" style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
<p style="text-align: center; margin-top: 0.5rem; color: #666;">玻璃拟态 + 自定义背景</p>
</div>

<div>
<img src="/homepage-glassmorphism-dark-video.png" alt="视频背景" style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
<p style="text-align: center; margin-top: 0.5rem; color: #666;">夜间模式 + 视频背景</p>
</div>

<div>
<img src="/homepage-list-view.png" alt="列表模式" style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
<p style="text-align: center; margin-top: 0.5rem; color: #666;">列表模式 - 紧凑高效</p>
</div>

<div>
<img src="/globe-3d-preview.png" alt="3D地球" style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
<p style="text-align: center; margin-top: 0.5rem; color: #666;">3D 地球 - 全球节点可视化</p>
</div>

</div>

### 📊 核心功能模块

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin: 2rem 0;">

<div style="padding: 1.5rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft);">
<h4 style="margin-top: 0;">📊 监控与数据采集</h4>
<ul style="margin: 0.5rem 0; padding-left: 1.2rem;">
<li>实时性能监控</li>
<li>网络质量监控</li>
<li>流量统计分析</li>
</ul>
</div>

<div style="padding: 1.5rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft);">
<h4 style="margin-top: 0;">🖥️ 服务器管理</h4>
<ul style="margin: 0.5rem 0; padding-left: 1.2rem;">
<li>集中管理节点</li>
<li>分组与标签</li>
<li>自动发现</li>
<li>WebSSH 终端</li>
<li>SSH 脚本管理</li>
</ul>
</div>

<div style="padding: 1.5rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft);">
<h4 style="margin-top: 0;">🔔 告警与通知</h4>
<ul style="margin: 0.5rem 0; padding-left: 1.2rem;">
<li>多通道告警</li>
<li>自定义规则</li>
<li>告警静默</li>
</ul>
</div>

<div style="padding: 1.5rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft);">
<h4 style="margin-top: 0;">🤖 智能分析</h4>
<ul style="margin: 0.5rem 0; padding-left: 1.2rem;">
<li>AI 性能分析</li>
<li>异常检测</li>
<li>趋势预测</li>
</ul>
</div>

</div>

### 🎓 快速开始

准备好开始使用 DStatus 了吗？按照以下步骤快速部署：

1. **查看系统要求** - [快速开始指南](./quick-start.md)
2. **部署 Agent** - [Windows](./Agent-Windows运行教程.md) / [OpenWrt](./Agent-OpenWrt运行教程.md)
3. **配置监控** - [操作指南](./usage-guide.md)

### 📚 文档导航

| 分类 | 文档 |
|------|------|
| **基础教程** | [快速开始](./quick-start.md) · [使用教程](./usage.md) · [操作指南](./usage-guide.md) |
| **Agent 部署** | [Windows](./Agent-Windows运行教程.md) · [OpenWrt](./Agent-OpenWrt运行教程.md) |
| **监控管理** | [网络监控配置](./monitor.md) · [服务器管理](./server-management.md) · [分组管理](./groups.md) · [自动发现](./autodiscovery.md) |
| **系统管理** | [SSH脚本](./ssh-scripts.md) · [安全设置](./security-settings.md) · [系统设置](./system-settings.md) · [通知设置](./notification-settings.md) · [高级设置](./advanced-settings.md) · [许可证管理](./license-management.md) |

### 💡 需要帮助？

如果在使用过程中遇到问题，可以：

- 📖 查看 [功能页面总览](./pages-overview.md) 了解所有页面功能
- 🔍 使用顶部搜索框查找相关文档
- 💬 在 GitHub 上提交 Issue

---

<div style="text-align: center; padding: 2rem 0; border-top: 1px solid var(--vp-c-divider); margin-top: 3rem;">
  <p style="font-size: 0.9rem; color: var(--vp-c-text-2);">
    DStatus - 让服务器监控更简单、更高效、更美观
  </p>
</div>

</div>
