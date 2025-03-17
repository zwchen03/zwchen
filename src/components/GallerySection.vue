<template>
  <section id="gallery" class="gallery-section">
    <div class="section-header">
      <h2 class="section-title">相册</h2>
      <div class="section-divider"></div>
      <p class="section-desc">记录生活中的美好瞬间</p>
    </div>
    <div class="gallery-grid">
      <div v-for="(item, index) in galleryItems" :key="index" class="gallery-item">
        <div class="image-placeholder" v-if="!item.loaded"></div>
        <img 
          :src="item.image" 
          :alt="item.title" 
          @error="handleImageError($event, index)" 
          @load="handleImageLoaded(index)"
          :style="{ display: item.loaded ? 'block' : 'none' }"
        >
        <div class="gallery-overlay" v-if="item.loaded">
          <div class="gallery-info">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import pic6 from '../assets/img/pic6.png'
import pic7 from '../assets/img/pic7.png'
import pic8 from '../assets/img/pic8.png'
import pic9 from '../assets/img/pic9.png'
import pic10 from '../assets/img/pic10.png'
import defaultImg from '../assets/img/default.png'

export default {
  name: 'GallerySection',
  data() {
    return {
      galleryItems: [
        {
          image: pic6,
          title: '校园风景',
          description: '2024年春季',
          loaded: false
        },
        {
          image: pic7,
          title: '旅行日记',
          description: '暂无',
          loaded: false
        },
        {
          image: pic8,
          title: '编程时光',
          description: '深夜Coding',
          loaded: false
        },
        {
          image: pic9,
          title: '读书笔记',
          description: '最近阅读',
          loaded: false
        },
        {
          image: pic10,
          title: '生活日常',
          description: '点滴记录',
          loaded: false
        }
      ]
    }
  },
  methods: {
    handleImageError(e, index) {
      e.target.src = defaultImg;
      this.$nextTick(() => {
        this.galleryItems[index].loaded = true;
      });
    },
    handleImageLoaded(index) {
      this.galleryItems[index].loaded = true;
    }
  }
}
</script>

<style lang="less" scoped>
.gallery-section {
  padding: 60px 0;
  margin: 30px 0;
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
    z-index: -1;
  }
}

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

.gallery {
  &-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
  }

  &-item {
    position: relative;
    border-radius: var(--border-radius);
    overflow: hidden;
    cursor: pointer;
    height: 200px;
    box-shadow: var(--card-shadow);
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
    
    &:hover {
      .gallery-overlay {
        opacity: 1;
      }
      
      img {
        transform: scale(1.1);
      }
      
      .gallery-info {
        transform: translateY(0);
      }
    }
  }

  &-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &-info {
    color: white;
    text-align: center;
    transform: translateY(20px);
    transition: var(--transition);
    
    h3 {
      font-size: 1.2rem;
      margin-bottom: 5px;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    }
    
    p {
      font-size: 0.9rem;
      opacity: 0.9;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    }
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

.section-desc {
  text-align: center;
  color: var(--text-color);
  font-size: 1.1rem;
  margin-top: 15px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  text-shadow: var(--text-shadow);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

@media (max-width: 576px) {
  .gallery-section {
    padding: 40px 20px;
  }
}
</style> 