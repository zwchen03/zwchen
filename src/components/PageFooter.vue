<template>
  <footer>
    <div class="footer-content">
      <div class="footer-logo">
        <h2>forever</h2>
        <p>爱自己是终身浪漫的开始</p>
        <div class="footer-social footer-social-main">
          <a v-for="(link, index) in socialLinks"
             :key="index"
             :href="link.url"
             :title="link.title">
            <i :class="link.icon"></i>
          </a>
        </div>
      </div>
      <div class="footer-links">
        <div class="footer-column">
          <h3>导航</h3>
          <ul>
            <li v-for="(link, index) in navLinks"
                :key="index">
              <a :href="link.url">
                <i :class="link.icon"></i> {{ link.text }}
              </a>
            </li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>分类</h3>
          <ul>
            <li v-for="(category, index) in categories"
                :key="index">
              <a :href="category.url">
                <i :class="category.icon"></i> {{ category.text }}
              </a>
            </li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>学习笔记</h3>
          <ul class="footer-contact">
            <li v-for="(note, index) in studyNotes"
                :key="index">
              <i :class="note.icon"></i> {{ note.text }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'PageFooter',
  data() {
    return {
      socialLinks: [
        { title: 'GitHub', url: '#', icon: 'fab fa-github' },
        { title: '微博', url: '#', icon: 'fab fa-weibo' },
        { title: '微信', url: '#', icon: 'fab fa-weixin' },
        { title: 'QQ', url: '#', icon: 'fab fa-qq' }
      ],
      navLinks: [
        { text: '首页', url: '/', icon: 'fas fa-home' },
        { text: '关于', url: '#about', icon: 'fas fa-user' },
        { text: '文章', url: '#blog', icon: 'fas fa-pen' },
        { text: '相册', url: '#gallery', icon: 'fas fa-images' }
      ],
      categories: [
        { text: '记录点滴', url: '#', icon: 'fas fa-bookmark' },
        { text: '灵感相关', url: '#', icon: 'fas fa-lightbulb' },
        { text: '闲言碎语', url: '#', icon: 'fas fa-comment' },
        { text: '实用分享', url: '#', icon: 'fas fa-share-alt' }
      ],
      studyNotes: [
        { text: '西瓜书', icon: 'fas fa-book' },
        { text: '高等数学', icon: 'fas fa-calculator' },
        { text: '线性代数', icon: 'fas fa-sitemap' }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
footer {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  padding: 50px 0;
  margin-top: 60px;
  border-radius: var(--border-radius) var(--border-radius) 0 0;
}

.footer {
  &-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 30px;
    display: flex;
    gap: 60px;
  }

  &-logo {
    flex: 1;
    
    h2 {
      font-size: 2.2em;
      color: var(--primary-color);
      margin-bottom: 24px;
      font-weight: 700;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 0;
        width: 80px;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), transparent);
        border-radius: 2px;
      }
    }
    
    p {
      color: var(--light-text);
      margin-bottom: 45px;
      font-size: 15px;
      line-height: 1.6;
      color: var(--light-text);
      font-size: 0.95rem;
      font-style: italic;
    }
  }

  &-social {
    display: flex;
    gap: 15px;
    
    a {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: white;
      color: var(--primary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      
      &:hover {
        background: var(--primary-color);
        color: white;
        transform: translateY(-3px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
    }
  }

  &-links {
    flex: 2;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
  }

  &-column {
    h3 {
      // color: var(--primary-color);
      margin-bottom: 20px;
      font-size: 1.2em;
      font-weight: 600;
      position: relative;
      padding-bottom: 10px;
      color: var(--text-color);
      text-shadow: var(--text-shadow);
      font-weight: 600;
      width: fit-content;
      &::after {
        content: '';
        position: absolute;
        bottom: 0px;
        left: 0;
        width: 100%;
        height: 3px;
        background: var(--primary-color);
        border-radius: 2px;
      }
    }
    
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      
      li {
        margin-bottom: 12px;
        
        a, span {
          color: var(--light-text);
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          font-size: 14px;
          
          i {
            width: 16px;
            text-align: center;
            color: var(--primary-color);
          }
          
          &:hover {
            color: var(--primary-color);
            transform: translateX(5px);
          }
        }
      }
    }
  }

  &-contact li {
    color: var(--light-text);
    display: flex;
    align-items: center;
    gap: 8px;
    transition: color 0.3s ease;
    font-size: 14px;
    
    i {
      color: var(--primary-color);
      width: 16px;
      text-align: center;
    }
  }
}

/* 响应式设计 */
@media (max-width: 992px) {
  .footer {
    &-content {
      gap: 40px;
      padding: 0 20px;
    }
    
    &-links {
      gap: 30px;
    }
  }
}

@media (max-width: 768px) {
  .footer {
    &-content {
      flex-direction: column;
      gap: 40px;
    }

    &-logo {
      text-align: center;
      
      h2 {
        font-size: 2em;
        margin: 0 auto 24px;
        text-align: center;
        width: fit-content;
        
        &::after {
          left: 0;
          right: 0;
          margin: 0 auto;
        }
      }
    }
    
    &-social {
      justify-content: center;
    }

    &-links {
      grid-template-columns: repeat(2, 1fr);
      gap: 30px;
    }
    
    &-column h3 {
      margin: 0 auto 20px;
      text-align: center;
      
      &::after {
        left: 0;
        right: 0;
        margin: 0 auto;
      }
    }
    
    /* 添加学习笔记列表项的居中样式 */
    &-column .footer-contact li {
      justify-content: center;
      text-align: center;
    }
  }
}

@media (max-width: 480px) {
  .footer {
    &-links {
      grid-template-columns: 1fr;
      text-align: center;
    }
    
    &-column {
      h3 {
        text-align: center;
        margin: 0 auto 20px;
      }
      
      ul li a {
        justify-content: center;
      }
      
      /* 添加学习笔记列表项的居中样式 */
      .footer-contact li {
        justify-content: center;
      }
    }
  }
}
</style> 