<template>
  <div class="lazy-loading-demo">
    <h2 class="section-title">懒加载演示</h2>
    <div class="section-divider"></div>
    
    <div class="demo-container">
      <h3>图片懒加载</h3>
      <div class="image-grid">
        <div v-for="(image, index) in images" :key="index" class="image-wrapper">
          <div class="lazy-placeholder" :style="{ height: '200px' }"></div>
          <img 
            v-lazy-image="image.src" 
            :alt="image.alt"
            class="lazy-image"
          />
        </div>
      </div>
      
      <h3>音频懒加载</h3>
      <div class="audio-list">
        <div v-for="(audio, index) in audioFiles" :key="index" class="audio-item">
          <div class="audio-info">
            <h4>{{ audio.title }}</h4>
            <p>{{ audio.artist }}</p>
          </div>
          <audio 
            v-lazy-audio="audio.src" 
            controls 
            class="lazy-audio"
          ></audio>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 示例数据
const images = [
  { 
    src: '/images/sample1.jpg', 
    alt: '示例图片1' 
  },
  { 
    src: '/images/sample2.jpg', 
    alt: '示例图片2' 
  },
  { 
    src: '/images/sample3.jpg', 
    alt: '示例图片3' 
  },
  { 
    src: '/images/sample4.jpg', 
    alt: '示例图片4' 
  },
  { 
    src: '/images/sample5.jpg', 
    alt: '示例图片5' 
  },
  { 
    src: '/images/sample6.jpg', 
    alt: '示例图片6' 
  }
];

const audioFiles = [
  {
    title: '示例音频1',
    artist: '艺术家1',
    src: '/audio/sample1.mp3'
  },
  {
    title: '示例音频2',
    artist: '艺术家2',
    src: '/audio/sample2.mp3'
  },
  {
    title: '示例音频3',
    artist: '艺术家3',
    src: '/audio/sample3.mp3'
  }
];
</script>

<style lang="less" scoped>
.lazy-loading-demo {
  padding: 60px 0;
  
  .demo-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h3 {
    margin: 40px 0 20px;
    color: var(--primary-color);
    font-size: 1.5em;
  }
  
  .image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
    
    .image-wrapper {
      position: relative;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: var(--card-shadow);
      
      .lazy-placeholder {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
      }
      
      img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        position: relative;
        z-index: 2;
      }
    }
  }
  
  .audio-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
    
    .audio-item {
      display: flex;
      align-items: center;
      padding: 15px;
      background: var(--glass-bg);
      border-radius: var(--border-radius);
      box-shadow: var(--glass-shadow);
      backdrop-filter: blur(8px);
      border: var(--glass-border);
      
      .audio-info {
        flex: 1;
        margin-right: 15px;
        
        h4 {
          margin: 0 0 5px;
          font-size: 1.1em;
          color: var(--text-color);
        }
        
        p {
          margin: 0;
          color: var(--light-text);
          font-size: 0.9em;
        }
      }
      
      audio {
        width: 250px;
      }
    }
  }
}

@media (max-width: 768px) {
  .lazy-loading-demo {
    .image-grid {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
    
    .audio-list {
      .audio-item {
        flex-direction: column;
        align-items: flex-start;
        
        .audio-info {
          margin-right: 0;
          margin-bottom: 10px;
        }
        
        audio {
          width: 100%;
        }
      }
    }
  }
}
</style> 