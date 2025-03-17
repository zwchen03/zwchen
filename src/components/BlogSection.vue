<template>
  <section id="blog" class="blog-section">
    <div class="section-header">
      <h2 class="section-title">最新文章</h2>
      <div class="section-divider"></div>
    </div>
    <div class="blog-grid">
      <article v-for="(post, index) in blogPosts" 
               :key="index" 
               class="blog-card">
        <div class="blog-img">
          <div class="image-placeholder" v-if="!post.loaded"></div>
          <img 
            :src="post.image" 
            alt="Blog Image" 
            @error="handleImageError($event, index)" 
            @load="handleImageLoaded(index)"
            :style="{ display: post.loaded ? 'block' : 'none' }"
          >
        </div>
        <div class="blog-content">
          <h3 class="blog-title">{{ post.title }}</h3>
          <div class="blog-meta">
            <span class="blog-date"><i class="far fa-calendar"></i> {{ post.date }}</span>
            <span class="blog-category"><i class="far fa-folder"></i> {{ post.category }}</span>
          </div>
          <p class="blog-excerpt">{{ post.excerpt }}</p>
          <a :href="post.link" class="read-more">阅读更多 <i class="fas fa-arrow-right"></i></a>
        </div>
      </article>
    </div>
    <div class="more-posts">
      <a href="/blog/" class="more-btn">查看更多文章 <i class="fas fa-chevron-right"></i></a>
    </div>
  </section>
</template>

<script>
import pic2 from '../assets/img/pic2.png'
import pic3 from '../assets/img/pic3.png'
import pic4 from '../assets/img/pic4.png'
import pic5 from '../assets/img/pic5.png'
import defaultImg from '../assets/img/default.png'

export default {
  name: 'BlogSection',
  data() {
    return {
      blogPosts: [
        {
          title: 'Vue3开发学习历程',
          date: '2024-02-02',
          category: '实用分享',
          excerpt: '记录我在学习Vue3框架的一些心理历程',
          link: '/blog/vue3-learning.html',
          image: pic2,
          loaded: false
        },
        {
          title: '关于CS专业的学习体会',
          date: '2024-01-05',
          category: '灵感相关',
          excerpt: '分享我在计算机科学与技术专业学习过程中的心得体会，包括课程学习方法、实践项目经验以及职业规划等方面的思考。',
          link: '/blog/cs-study.html',
          image: pic3,
          loaded: false
        },
        {
          title: '对于大学四年的思考',
          date: '2023-12-23',
          category: '生活感悟',
          excerpt: '回顾大学四年的学习生活，分享个人成长、专业发展和未来规划等方面的深度思考与感悟。',
          link: '/blog/university-thoughts.html',
          image: pic4,
          loaded: false
        },
        {
          title: '持续学习(Continual Learning)的学习路线',
          date: '2023-12-16',
          category: '记录点滴',
          excerpt: '分享我在学习持续学习的一些心得体会',
          link: '/blog/continual-learning.html',
          image: pic5,
          loaded: false
        }
      ]
    }
  },
  methods: {
    handleImageError(e, index) {
      e.target.src = defaultImg;
      this.$nextTick(() => {
        this.blogPosts[index].loaded = true;
      });
    },
    handleImageLoaded(index) {
      this.blogPosts[index].loaded = true;
    }
  }
}
</script>

<style lang="less" scoped>
.blog-section {
  padding: 30px 0;
  // background: var(--glass-bg);
  // border-radius: var(--border-radius);
  margin: 10px 0;
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
    // background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
    z-index: -1;
  }
}

// 标题和滑块样式
.section-title {
  color: #222;
  font-weight: 700;
}

.section-divider {
  background: rgb(108, 99,255) !important;
  width: 60px;
  margin: 10px auto;
}

.blog {
  &-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    gap: 30px;
    padding: 20px;
  }

  &-card {
    background: var(--glass-bg);
    backdrop-filter: blur(10px);
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--card-hover-shadow);
    transition: var(--transition);
    position: relative;
    z-index: 1;
    
    &::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
      z-index: -1;
    }
    
    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
      
      .blog-img img {
        transform: scale(1.05);
      }
    }
  }
  
  &-img {
    height: 200px;
    position: relative;
    background-color: rgba(0, 0, 0, 0.1);
    
    .image-placeholder {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.1) 0%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0.1) 100%
      );
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: var(--transition);
    }
  }

  &-content {
    padding: 20px;
  }

  &-title {
    font-size: 1.2rem;
    margin-bottom: 10px;
    font-weight: 600;
    text-shadow: var(--text-shadow);
    color: var(--text-color);
  }

  &-meta {
    display: flex;
    gap: 15px;
    font-size: 0.9rem;
    color: var(--light-text);
    margin-bottom: 15px;
    
    i {
      margin-right: 5px;
    }
  }

  &-excerpt {
    font-size: 0.95rem;
    color: var(--text-color);
    margin-bottom: 15px;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: var(--primary-color);
  font-weight: 600;
  font-size: 0.9rem;
  
  i {
    transition: transform 0.3s ease;
    margin-left: 5px;
  }
  
  &:hover i {
    transform: translateX(3px);
  }
}

.more {
  &-posts {
    text-align: center;
    margin-top: 40px;
  }

  &-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    background: rgba(255, 255, 255, 0.8);
    color: var(--primary-color);
    border-radius: 50px;
    font-weight: 600;
    box-shadow: var(--glass-shadow);
    border: 2px solid var(--primary-color);
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
    
    &:hover {
      background: var(--primary-color);
      color: white;
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(108, 99, 255, 0.3);
      
      i {
        transform: translateX(5px);
      }
    }
    
    i {
      transition: transform 0.3s ease;
    }
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .blog-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .footer-links {
    grid-template-columns: 1fr;
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style> 