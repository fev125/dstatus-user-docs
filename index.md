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
