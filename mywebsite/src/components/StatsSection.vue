<template>
  <section id="stats" class="stats-section">
    <div v-for="(stat, index) in stats" 
         :key="index" 
         class="stat-item">
      <div class="stat-number" :data-count="stat.count">{{ stat.count }}</div>
      <div class="stat-label">{{ stat.label }}</div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'StatsSection',
  data() {
    return {
      stats: [
        { count: 1, label: '天数' },
        { count: 0, label: '文章数量' },
        { count: 0, label: '评论数量' },
        { count: 0, label: '标签数量' }
      ]
    }
  },
  mounted() {
    this.animateStats();
  },
  methods: {
    animateStats() {
      const statItems = document.querySelectorAll('.stat-number');
      statItems.forEach(item => {
        const finalValue = parseInt(item.getAttribute('data-count'));
        let currentValue = 0;
        const increment = Math.ceil(finalValue / 50); // 将动画分成50步
        const duration = 1500; // 动画持续1.5秒
        const interval = duration / 50;
        
        const counter = setInterval(() => {
          currentValue += increment;
          if (currentValue >= finalValue) {
            clearInterval(counter);
            item.textContent = finalValue;
          } else {
            item.textContent = currentValue;
          }
        }, interval);
      });
    }
  }
}
</script>

<style lang="less" scoped>
.stats-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  padding: 40px 20px;
  background: var(--glass-bg);
  border-radius: var(--border-radius);
  margin: 30px 0;
  text-align: center;
}

.stat {
  &-item {
    padding: 20px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: var(--border-radius);
    transition: transform 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
    }
  }
  
  &-number {
    font-size: 2.5em;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 10px;
  }
  
  &-label {
    color: var(--light-text);
    font-size: 1.1em;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .stats-section {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .stats-section {
    grid-template-columns: 1fr;
  }
}

// 标题和滑块样式
.section-title {
  color: #222;
  font-weight: 700;
}

.section-divider {
  background: rgb(108, 99,255) !important; 
  height: 4px;
  width: 60px;
  margin: 10px auto;
}
</style> 