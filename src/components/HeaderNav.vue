<template>
  <header>
    <div class="logo">
      <h1 class="site-title">CZW's home</h1>
      <p class="site-description">宇宙山河浪漫，人间点滴温暖，都值得我们前进</p>
    </div>
    <nav class="main-nav">
      <ul>
        <li><a href="#" :class="{ active: activeSection === 'home' }">首页</a></li>
        <li><a href="#blog" :class="{ active: activeSection === 'blog' }">文章</a></li>
        <li><a href="#gallery" :class="{ active: activeSection === 'gallery' }">相册</a></li>
        <li><a href="#about" :class="{ active: activeSection === 'about' }">关于</a></li>
        <div class="search-icon">
          <i class="fas fa-search"></i>
        </div>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'HeaderNav',
  data() {
    return {
      activeSection: 'home',
      sections: [],
      navLinks: [],
      observer: null
    }
  },
  mounted() {
    // 在DOM完全加载后执行初始化
    this.$nextTick(() => {
      this.initNavigation()
    })
  },
  methods: {
    initNavigation() {
      // 获取所有带ID的section和home元素
      this.sections = Array.from(document.querySelectorAll('#home, section[id]'))
      this.navLinks = document.querySelectorAll('.main-nav a')
      
      // 尝试使用IntersectionObserver
      if ('IntersectionObserver' in window) {
        this.setupIntersectionObserver()
      } else {
        // 降级到传统滚动监听
        this.setupScrollListener()
      }
      
      // 同时也用传统滚动监听作为备份
      this.setupScrollListener()
      
      // 初始化时检查一次当前位置
      this.checkCurrentPosition()
      
      // 添加平滑滚动
      this.setupSmoothScroll()
    },
    
    setupIntersectionObserver() {
      const options = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0.1
      }
      
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id')
            if (id) {
              this.activeSection = id
              // console.log('激活部分:', id) // 调试用
            }
          }
        })
      }, options)
      
      // 开始观察所有部分
      this.sections.forEach(section => {
        this.observer.observe(section)
      })
    },
    
    setupScrollListener() {
      window.addEventListener('scroll', this.checkCurrentPosition)
    },
    
    checkCurrentPosition() {
      // 获取当前滚动位置
      const scrollPosition = window.scrollY + window.innerHeight / 3
      
      // 找到当前可见的部分
      for (let i = this.sections.length - 1; i >= 0; i--) {
        const section = this.sections[i]
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight
        
        if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
          const id = section.getAttribute('id')
          if (id && this.activeSection !== id) {
            this.activeSection = id
            // console.log('滚动激活:', id) // 调试用
          }
          break
        }
      }
      
      // 如果滚动到顶部，激活首页
      if (window.scrollY < 100) {
        this.activeSection = 'home'
      }
    },
    
    setupSmoothScroll() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          e.preventDefault()
          
          const targetId = anchor.getAttribute('href')
          if (targetId === '#') {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            })
            return
          }
          
          const targetElement = document.querySelector(targetId)
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth'
            })
          }
        })
      })
    }
  },
  beforeUnmount() {
    // 清理监听器
    if (this.observer) {
      this.observer.disconnect()
    }
    window.removeEventListener('scroll', this.checkCurrentPosition)
  }
}
</script>

<style lang="less" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-radius: 0 0 var(--border-radius) var(--border-radius);
  padding: 15px 30px;
}

.logo {
  display: flex;
  flex-direction: column;
}

.site-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-color);
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.site-description {
  font-size: 14px;
  color: var(--light-text);
  margin-top: 5px;
}

.main-nav {
  ul {
    display: flex;
    gap: 80px;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  a {
    position: relative;
    color: var(--text-color);
    font-weight: 500;
    font-size: 18px;
    padding: 8px 0;
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover, &.active {
      color: var(--primary-color);
    }

    &::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: var(--primary-color);
      transition: width 0.3s ease;
    }

    &:hover::after,
    &.active::after {
      width: 100%;
    }
  }
}

.search-icon {
  color: var(--text-color);
  font-size: 16px;
  cursor: pointer;
  padding: 8px;
  transition: all 0.3s ease;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  
  &:hover {
    color: var(--primary-color);
    transform: scale(1.1);
    background: rgba(255, 255, 255, 0.2);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  header {
    flex-direction: column;
    padding: 15px;
    gap: 15px;
  }
  
  .logo {
    margin-bottom: 5px;
    align-items: center;
    text-align: center;
  }
  
  .main-nav ul {
    gap: 25px;
    justify-content: center;
  }

  .site-description {
    display: none;
  }
}

@media (max-width: 576px) {
  .main-nav ul {
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
  }

  .site-title {
    font-size: 20px;
  }
}
</style> 