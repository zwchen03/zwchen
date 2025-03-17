<template>
  <section id="about" class="about-section">
    <div class="section-header">
      <h2 class="section-title">关于我</h2>
      <div class="section-divider"></div>
    </div>
    <div class="about-content">
      <div class="about-image">
        <div class="image-wrapper">
          <img src="../assets/img/avatar.jpg" alt="Profile Image">
        </div>
      </div>
      <div class="about-text">
        <h3>你好，这里是<span class="highlight">cww</span></h3>
        <p>吾尝终日而思矣，不如须臾之所学也</p>
        <p>一名热爱生活，热爱计算机科学，人工智能与前端开发等技术的CS本科生</p>
        <div class="skills">
          <div v-for="(skill, index) in skills" 
               :key="index" 
               class="skill-item" 
               :data-skill="skill.level">
            <span class="skill-name">{{ skill.name }}</span>
            <div class="skill-progress">
              <div class="skill-bar" :style="{ width: skill.level + '%' }"></div>
            </div>
          </div>
        </div>
        <div class="social-links">
          <a v-for="(link, index) in socialLinks"
             :key="index"
             :href="link.url"
             class="social-link"
             :title="link.title">
            <i :class="link.icon"></i>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AboutSection',
  data() {
    return {
      skills: [
        { name: 'HTML/CSS', level: 90 },
        { name: 'JavaScript', level: 85 },
        { name: 'Vue.js', level: 75 },
        { name: 'Python', level: 95 }
      ],
      socialLinks: [
        { title: 'GitHub', url: '#', icon: 'fab fa-github' },
        { title: '微博', url: '#', icon: 'fab fa-weibo' },
        { title: '知乎', url: '#', icon: 'fab fa-zhihu' },
        { title: 'CSDN', url: '#', icon: 'fas fa-code' }
      ]
    }
  },
  mounted() {
    // 技能条动画
    this.animateSkills();
  },
  methods: {
    animateSkills() {
      const skillBars = document.querySelectorAll('.skill-bar');
      skillBars.forEach(bar => {
        const level = bar.parentElement.parentElement.getAttribute('data-skill');
        bar.style.width = level + '%';
      });
    }
  }
}
</script>

<style lang="less" scoped>
.about-section {
  padding: 40px 0;
  background: var(--glass-bg);
  border-radius: var(--border-radius);
  margin: 20px 0;
}

.about-content {
  padding: 15px;
  display: flex;
  align-items: flex-start;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  
  .about-image {
    flex: 0 0 400px;
    
    .image-wrapper {
      width: 260px;
      height: 260px;
      border-radius: 50%;
      overflow: hidden;
      box-shadow: var(--card-shadow);
      border: 8px solid rgba(88,140,254,0.8);
      margin: auto;
      position: relative;
      line-height: 100%;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 20px;
        // background: linear-gradient(45deg, rgba(88,140,254,0.2), rgba(255,255,255,0.1));
        z-index: 1;
      }
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transform: scale(1.02);
        transition: transform 0.3s ease;
        
        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }
}

.about-text {
  flex: 1;
  max-width: 800px;
  // background-color: red;
  h3 {
    font-size: 1.8em;
    margin-bottom: 15px;
    color: var(--text-color);
  }
  
  p {
    color: var(--light-text);
    line-height: 1.5;
    margin-bottom: 12px;
  }
}

.highlight {
  color: var(--primary-color);
}

.skills {
  margin: 25px 0;
}

.skill {
  &-item {
    margin-bottom: 15px;
  }
  
  &-name {
    display: block;
    margin-bottom: 6px;
    color: var(--text-color);
    font-weight: 500;
  }
  
  &-progress {
    height: 8px;
    background: rgba(88,140,254,0.1);
    border-radius: 5px;
    overflow: hidden;
  }
  
  &-bar {
    height: 100%;
    background: linear-gradient(90deg, rgb(88,140,254), rgb(108,99,255));
    width: 0;
    transition: width 1s ease;
    border-radius: 5px;
  }
}

.social {
  &-links {
    display: flex;
    gap: 15px;
    margin-top: 20px;
    justify-content: flex-start;
  }
  
  &-link {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: white;
    color: rgb(88,140,254);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    font-size: 1.2em;
    
    &:hover {
      background: rgb(88,140,254);
      color: white;
      transform: translateY(-3px);
      box-shadow: 0 6px 12px rgba(88,140,254,0.2);
    }
  }
}

/* 响应式设计 */
@media (max-width: 992px) {
  .about-content {
    padding: 20px;
    gap: 40px;
  }
}

@media (max-width: 768px) {
  .about-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
    
    .about-image {
      margin-bottom: 30px;
    }
    
    .social-links {
      justify-content: center;
    }
  }
  
  .about-text {
    h3 {
      font-size: 1.8em;
    }
  }
}

// 标题和滑块样式
.section-title {
  color: #222;
  font-weight: 700;
}

.section-divider {
  background-color: var(--primary-color) !important;
  height: 4px;
  width: 60px;
  margin: 10px auto;
  border-radius: 2px;
}
</style> 