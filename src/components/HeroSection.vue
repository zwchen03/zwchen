<template>
  <div id="home" class="hero">  
    <div class="hero-content">
      <h2 ref="heroTitle" :class="['typewriter-title', {'cursor-hidden': titleFinished}]"></h2>
      <p ref="heroDesc" :class="['typewriter-desc', {'cursor-hidden': descFinished}]"></p>
      <div class="hero-buttons fade-in delay-2">
        <a href="#about" class="btn primary-btn"><i class="fas fa-user-alt"></i> 了解更多</a>
        <a href="#blog" class="btn secondary-btn"><i class="fas fa-book"></i> 阅读博客</a>
      </div>
    </div>
    <div class="hero-image fade-in">
      <img src="../assets/img/pic1.png" alt="Hero Image">
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeroSection',
  data() {
    return {
      titleText: 'Welcome!',
      descText: 'May everything you work for have a romantic outcome in the future.',
      titleFinished: false,
      descFinished: false
    }
  },
  mounted() {
    // 给标题添加打字机效果
    this.typeWriter(this.$refs.heroTitle, this.titleText, 100, () => {
      this.titleFinished = true;
      // 标题完成后再开始打描述
      this.typeWriter(this.$refs.heroDesc, this.descText, 50, () => {
        this.descFinished = true;
      });
    });
  },
  methods: {
    typeWriter(element, text, speed, callback) {
      let i = 0;
      element.textContent = '';
      const timer = setInterval(() => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(timer);
          if (callback) callback();
        }
      }, speed);
    }
  }
}
</script>

<style lang="less" scoped>
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 60px 0;
  gap: 40px;
  
  &-content {
    width: 550px;
    text-align: center;
    // max-width: 550px;
    height:320px;
    background: var(--glass-bg);
    backdrop-filter: blur(10px);
    border-radius: var(--border-radius);
    box-shadow: var(--glass-shadow);
    border: var(--glass-border);
    padding: 40px;
    position: relative;
    z-index: 1;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%);
      z-index: -1;
    }
    
    h2 {
      font-size: 3em;
      margin-bottom: 20px;
      color: var(--primary-color);
      min-height: 1.2em; /* 确保空元素也有高度 */
      position: relative;
      width: 100%; /* 防止宽度坍缩 */
    }
    
    p {
      font-size: 1.2em;
      color: var(--light-text);
      margin-bottom: 30px;
      min-height: 1.5em; /* 确保空元素也有高度 */
      position: relative;
      width: 100%; /* 防止宽度坍缩 */
    }
  }
  
  &-buttons {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 100%;
    height: 80px;
    left: 0px;
    bottom: 15px;
    
    .primary-btn {
        background: var(--primary-color);
        color: white;
        box-shadow: 0 10px 15px -3px rgba(108, 99, 255, 0.3);
        
        &:hover {
            background: var(--secondary-color);
            transform: translateY(-2px);
            box-shadow: 0 15px 20px -3px rgba(108, 99, 255, 0.4);
        }
    }

    .secondary-btn {
        background: transparent;
        border: 2px solid var(--primary-color);
        color: var(--primary-color);
        
        &:hover {
            background: var(--primary-color);
            color: white;
            transform: translateY(-2px);
        }
    }
  }
  
  &-image {
    flex: 1;
    max-width: 500px;
    overflow: hidden;
    border-radius: var(--border-radius);
    
    img {
      width: 100%;
      border-radius: var(--border-radius);
      box-shadow: var(--card-shadow);
      transition: transform 0.3s ease;
      
      &:hover {
        transform: scale(1.05);
      }
    }
  }
}

.typewriter-title::after,
.typewriter-desc::after {
  content: '|';
  position: absolute;
  color: var(--primary-color);
  animation: blink-caret 0.75s step-end infinite;
}

.cursor-hidden::after {
  display: none;
}



@keyframes blink-caret {
  from, to { opacity: 0; }
  50% { opacity: 1; }
}

.btn {
  padding: 12px 24px;
  border-radius: var(--border-radius);
  font-weight: 500;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

/* 动画类 */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.6s ease forwards;
}

.delay-1 {
  animation-delay: 0.2s;
}

.delay-2 {
  animation-delay: 0.4s;
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 992px) {
  .hero {
    flex-direction: column;
    
    &-content {
      width: 100%;
      max-width: 550px;
      margin-bottom: 40px;
    }
    
    &-image {
      max-width: 100%;
    }
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 40px 20px;
    
    &-content {
      padding: 30px;
      height: auto;
      min-height: 320px;
      padding-bottom: 100px;
      
      h2 {
        font-size: 2.5em;
      }
    }
    
    &-buttons {
      flex-direction: column;
      align-items: center;
      height: auto;
      padding: 10px 20px 20px;
      gap: 15px;
      bottom: 10px;
      
      .primary-btn, .secondary-btn {
        width: 80%;
        justify-content: center;
      }
    }
  }
}

@media (max-width: 480px) {
  .hero {
    &-content {
      padding: 20px;
      padding-bottom: 120px;
      
      h2 {
        font-size: 2em;
      }
      
      p {
        font-size: 1em;
      }
    }
    
    &-buttons {
      flex-direction: column;
      align-items: stretch;
      gap: 10px;
      
      .primary-btn, .secondary-btn {
        width: 90%;
        padding: 10px 15px;
        font-size: 0.9em;
      }
    }
  }
}
</style> 