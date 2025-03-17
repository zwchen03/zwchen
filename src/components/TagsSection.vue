<template>
  <section id="tags" class="tags-section">
    <div class="section-header">
      <h2 class="section-title">标签云</h2>
      <div class="section-divider"></div>
    </div>
    <div class="tags-cloud">
      <a v-for="(tag, index) in tags" 
         :key="index" 
         :href="tag.link" 
         class="tag-item"
         :style="{ fontSize: tag.size + 'em' }">
        {{ tag.name }}
      </a>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TagsSection',
  data() {
    return {
      tags: [
        { name: 'CS', size: 1.5, link: '#' },
        { name: 'HTML', size: 1.2, link: '#' },
        { name: 'CSS', size: 1.7, link: '#' },
        { name: 'JavaScript', size: 1.3, link: '#' },
        { name: 'Vue.js', size: 1.1, link: '#' },
        { name: '编程', size: 1.6, link: '#' },
        { name: '学习', size: 1.2, link: '#' },
        { name: '生活', size: 1.5, link: '#' },
        { name: '阅读', size: 1.3, link: '#' },
        { name: 'Python', size: 1.5, link: '#' },
        { name: 'Continual Learning', size: 1.2, link: '#' },
        { name: 'Machine Learning', size: 1.1, link: '#' },
        { name: 'Deep Learning', size: 1.1, link: '#' }
      ],
      colors: [
        '#FF6B6B', // 红色
        '#4ECDC4', // 青色
        '#45B7D1', // 蓝色
        '#96CEB4', // 绿色
        '#FFEEAD', // 黄色
        '#D4A5A5', // 粉色
        '#9B59B6', // 紫色
        '#3498DB', // 深蓝
        '#E67E22', // 橙色
        '#2ECC71'  // 翠绿
      ]
    }
  },
  mounted() {
    this.initializeRandomColors();
  },
  methods: {
    initializeRandomColors() {
      const tags = document.querySelectorAll('.tag-item');
      tags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
          const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
          tag.style.backgroundColor = randomColor;
        });
        
        tag.addEventListener('mouseleave', () => {
          tag.style.backgroundColor = '';
        });
      });
    }
  }
}
</script>

<style lang="less" scoped>
.tags-section {
  padding: 20px 0;
  background: rgba(255, 255, 255, 0.8);
  border-radius: var(--border-radius);
  margin: 30px 0;
  backdrop-filter: blur(10px);
}

.tags {
  &-cloud {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px 25px;
    padding: 10px;
    max-width: 1200px;
    margin: 0 auto;
  }
}

.tag-item {
  color: var(--dark-text);
  text-decoration: none;
  padding: 8px 20px;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  
  &:hover {
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
}

.section-title {
  color: #222;
  font-weight: 700;
}

.section-divider {
  background: var(--primary-color) !important;
  height: 4px;
  width: 60px;
  margin: 10px auto;
}
</style> 