# 被控升级教程：v1.1 → 最新版

## 升级方式

| 入口 | 方式 | 说明 |
| --- | --- | --- |
| 服务器列表 → 节点探针 → 升级探针 | SSH 安装/升级 | 节点在线时使用 |
| 服务器列表 → 节点探针 → 下发升级任务 | 下发升级任务 | 实验功能，主动模式可用 |
| 服务器列表 → 节点探针 → 复制重装命令 | 脚本升级 | 节点离线或手动操作 |

   <img src="/install-agent.png" alt="服务器列表安装/升级入口" style="max-width:720px;width:100%;display:block;margin-bottom:16px;" />
   <p style="color:#666;font-size:14px;margin-bottom:16px;">图1：服务器列表 → 节点探针</p>
   <img src="/edit-install.png" alt="编辑页面安装/升级入口" style="max-width:720px;width:100%;display:block;" />
   <p style="color:#666;font-size:14px;">图2：节点详情 → 编辑页面</p>

  

## 升级前确认

1. 主控面板版本 ≥ `v2.26.02.003`
2. 设置中心 → 基础设置 → 版本选择 `agent-latest`

   <img src="/settings-agent-version.png" alt="设置中心 - 版本选择" style="max-width:720px;width:100%;" />
3. 被控机能访问 `down.vps.mom` 或 GitHub
4. 主动模式还需能访问面板地址

## 升级后确认

- [ ] 节点重新上线
- [ ] 数据正常刷新
- [ ] 版本确认：主动探针状态页面查看版本号
