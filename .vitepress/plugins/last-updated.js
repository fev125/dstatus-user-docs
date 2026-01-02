// 工作区/user-docs/.vitepress/plugins/last-updated.js
// VitePress 插件：使用文件修改时间作为最后更新时间
// 用途：因为工作区目录被 Git 忽略，无法从 Git 获取提交时间，改用文件系统 mtime
// 相关文件：.vitepress/config.mjs

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export function lastUpdated() {
  return {
    name: 'last-updated',
    transformPageData(pageData) {
      // 获取文件路径
      const filePath = pageData.filePath
      if (!filePath) return

      try {
        // 构建完整路径（相对于项目根目录）
        const fullPath = path.resolve(__dirname, '../../', filePath)
        
        // 获取文件统计信息
        const stats = fs.statSync(fullPath)
        
        // 使用文件的修改时间（mtime）
        pageData.lastUpdated = stats.mtime
      } catch (error) {
        // 如果文件不存在或无法读取，使用当前时间
        console.warn(`[last-updated] 无法获取文件时间: ${filePath}`, error.message)
        pageData.lastUpdated = new Date()
      }
    }
  }
}



