// .vitepress/theme/components/StatsSection.vue
// 数据统计区域 - 展示关键指标
// 功能：动态展示系统核心数据，增强可信度
// 相关文件：HomeContent.vue, custom.css

<script setup>
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'

const stats = [
  {
    icon: 'mdi:server-network',
    value: 0,
    target: 1000,
    suffix: '+',
    label: '支持节点数',
    color: '#3b82f6'
  },
  {
    icon: 'mdi:chart-timeline-variant',
    value: 0,
    target: 50,
    suffix: '+',
    label: '监控指标',
    color: '#10b981'
  },
  {
    icon: 'mdi:clock-fast',
    value: 0,
    target: 30,
    suffix: '秒',
    label: '数据刷新',
    color: '#f59e0b'
  },
  {
    icon: 'mdi:shield-check',
    value: 0,
    target: 99.9,
    suffix: '%',
    label: '服务可用性',
    color: '#ef4444',
    decimals: 1
  }
]

// 数字动画
const animateValue = (stat) => {
  const duration = 2000
  const start = 0
  const end = stat.target
  const startTime = performance.now()
  
  const updateValue = (currentTime) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    // 使用缓动函数
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    
    if (stat.decimals) {
      stat.value = (start + (end - start) * easeOutQuart).toFixed(stat.decimals)
    } else {
      stat.value = Math.floor(start + (end - start) * easeOutQuart)
    }
    
    if (progress < 1) {
      requestAnimationFrame(updateValue)
    }
  }
  
  requestAnimationFrame(updateValue)
}

onMounted(() => {
  // 延迟启动动画
  setTimeout(() => {
    stats.forEach(stat => animateValue(stat))
  }, 300)
})
</script>

<template>
  <section class="stats-section">
    <div class="stats-container">
      <div 
        v-for="(stat, index) in stats" 
        :key="index"
        class="stat-card"
        :style="{ '--accent-color': stat.color }"
      >
        <div class="stat-icon">
          <Icon :icon="stat.icon" class="icon" />
        </div>
        <div class="stat-content">
          <div class="stat-value">
            {{ stat.value }}<span class="stat-suffix">{{ stat.suffix }}</span>
          </div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stats-section {
  margin: 4rem 0;
  padding: 3rem 0;
  background: linear-gradient(
    135deg, 
    var(--vp-c-bg-soft) 0%, 
    var(--vp-c-bg) 100%
  );
}

.stats-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 16px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--accent-color);
  transform: scaleY(0);
  transition: transform 0.3s ease;
  transform-origin: bottom;
}

.stat-card:hover {
  border-color: var(--accent-color);
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
}

.stat-card:hover::before {
  transform: scaleY(1);
  transform-origin: top;
}

.stat-icon {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--accent-color), var(--accent-color));
  border-radius: 12px;
  opacity: 0.1;
  transition: all 0.3s ease;
}

.stat-card:hover .stat-icon {
  opacity: 0.2;
  transform: rotate(5deg) scale(1.1);
}

.stat-icon .icon {
  width: 32px;
  height: 32px;
  color: var(--accent-color);
  opacity: 10;
}

.stat-content {
  flex: 1;
  min-width: 0;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
  font-variant-numeric: tabular-nums;
}

.stat-suffix {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-left: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

@media (max-width: 768px) {
  .stats-section {
    margin: 3rem 0;
    padding: 2rem 0;
  }
  
  .stats-container {
    padding: 0 1rem;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
  
  .stat-card {
    padding: 1.5rem;
    gap: 1rem;
  }
  
  .stat-icon {
    width: 48px;
    height: 48px;
  }
  
  .stat-icon .icon {
    width: 28px;
    height: 28px;
  }
  
  .stat-value {
    font-size: 1.75rem;
  }
  
  .stat-suffix {
    font-size: 1.125rem;
  }
}

@media (max-width: 480px) {
  .stats-container {
    grid-template-columns: 1fr;
  }
  
  .stat-card {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
}
</style>

