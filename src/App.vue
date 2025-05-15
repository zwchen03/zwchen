<script setup>
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'

// 添加视差滚动效果
onMounted(() => {
  // 视差滚动效果
  const parallaxEffect = () => {
    const heroContent = document.querySelector('.hero-content')
    const aboutSection = document.querySelector('.about-section')
    
    // 防抖动变量
    let ticking = false
    let lastScrollY = window.scrollY
    
    // 预先设置过渡效果，使变化更平滑
    document.body.style.transition = 'background-position 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)'
    if (heroContent) {
      heroContent.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)'
    }
    if (aboutSection) {
      aboutSection.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)'
    }
    
    // 使用 requestAnimationFrame 优化滚动性能
    window.addEventListener('scroll', () => {
      lastScrollY = window.scrollY
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // 给背景图添加视差效果
          document.body.style.backgroundPosition = `center ${lastScrollY * 0.05}px`
          
          // 给英雄区域内容添加视差效果
          if (heroContent) {
            heroContent.style.transform = `translateY(${lastScrollY * 0.1}px)`
          }
          
          // 微妙的卡片旋转效果
          if (aboutSection) {
            aboutSection.style.transform = `perspective(1000px) rotateX(${lastScrollY * 0.001}deg)`
          }
          
          ticking = false
        })
        
        ticking = true
      }
    })
  }
  
  // 初始化视差效果
  parallaxEffect()
})
</script>

<template>
  <RouterView />
</template>

<style lang="less">
@import './assets/variables.less';

/* 全局样式 */
:root {
  --primary-color: #6c63ff;
  --secondary-color: #45b6fe;
  --text-color: #222;
  --light-text: #444;
  --lightest-text: #666;
  --bg-color: #f5f7fa;
  --card-bg: rgba(255, 255, 255, 0.9);
  --card-shadow: 0 8px 24px rgba(149, 157, 165, 0.1);
  --glass-bg: rgba(255, 255, 255, 0.85);
  --glass-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
  --glass-border: 1px solid rgba(255, 255, 255, 0.18);
  --transition: all 0.3s ease;
  --border-radius: 12px;
  --text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Noto Sans SC', sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--bg-color);
  background-image: url('./assets/img/bg.png');
  background-size: contain;
  background-attachment: fixed;
  background-position: center;
  position: relative;
  /* 确保背景图片没有过渡效果 */
  transition: none !important;
  animation: none !important;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: -1;
    /* 确保遮罩层也没有过渡效果 */
    transition: none !important;
    animation: none !important;
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

a {
  text-decoration: none;
  color: var(--primary-color);
  transition: var(--transition);
  
  &:hover {
    color: var(--secondary-color);
  }
}

img {
  max-width: 100%;
  height: auto;
  transition: var(--transition);
}

/* 懒加载图片样式 */
[v-lazy-image] {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
  
  &.loaded {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 懒加载音频样式 */
[v-lazy-audio] {
  opacity: 0;
  transition: opacity 0.5s ease;
  
  &.loaded {
    opacity: 1;
  }
}

/* 懒加载占位符样式 */
.lazy-placeholder {
  background: linear-gradient(90deg, #f0f0f0 0%, #f8f8f8 50%, #f0f0f0 100%);
  background-size: 200% 100%;
  animation: placeholderShimmer 1.5s infinite;
  border-radius: var(--border-radius);
}

@keyframes placeholderShimmer {
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 100% 0;
  }
}

/* 为交互元素添加过渡效果 */
button, 
input, 
textarea,
.btn,
.card,
.item {
  transition: var(--transition);
}

ul {
  list-style: none;
}

.section {
  &-header {
    text-align: center;
    margin-bottom: 40px;
  }
  
  &-title {
    font-size: 2em;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 10px;
    text-shadow: var(--text-shadow);
  }
  
  &-divider {
    width: 60px;
    height: 4px;
    background: var(--secondary-color);
    margin: 0 auto;
  }
  
  &-desc {
    font-size: 1.1em;
    color: var(--light-text);
    margin-top: 15px;
  }
}

/* 添加全局动画类 */
.fade-in {
  opacity: 1;
  transform: none;
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: none;
  }
}

.delay-1 {
  animation-delay: 0s;
}

.delay-2 {
  animation-delay: 0s;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .section-title {
    font-size: 1.8em;
  }
}

@media (max-width: 576px) {
  .section-title {
    font-size: 1.8rem;
    color: black;
  }
}

/* 覆盖所有组件的标题和滑块样式 */
.section-title {
  color: #222 !important;
  font-weight: 700 !important;
}

.section-divider {
  background: #45b6fe !important;
  height: 4px !important;
  width: 60px !important;
  margin: 10px auto !important;
}

/* 在这里导入动画混合 */
.fadeIn();
</style>
