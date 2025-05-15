/**
 * 图片和音频懒加载插件
 * 使用 IntersectionObserver API 实现懒加载功能
 */

// 图片懒加载指令
const lazyImage = {
  mounted(el, binding) {
    function loadImage() {
      const imageElement = el
      
      // 如果已经设置了src属性，则不再加载
      if (imageElement.src === binding.value) return
      
      imageElement.addEventListener('load', () => {
        setTimeout(() => {
          imageElement.classList.add('loaded')
        }, 100)
      })
      
      imageElement.addEventListener('error', () => {
        console.log('图片加载失败:', binding.value)
        // 可以在这里添加加载失败后的处理逻辑，例如显示默认图片
        // imageElement.src = '/path/to/fallback-image.jpg'
      })
      
      imageElement.src = binding.value
    }

    function handleIntersect(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadImage()
          observer.unobserve(el)
        }
      })
    }

    function createObserver() {
      const options = {
        root: null,
        threshold: 0,
        rootMargin: '0px 0px 200px 0px'  // 预加载范围，可以根据需要调整
      }
      const observer = new IntersectionObserver(handleIntersect, options)
      observer.observe(el)
    }

    // 如果浏览器支持 IntersectionObserver
    if (window.IntersectionObserver) {
      createObserver()
    } else {
      // 降级处理，直接加载图片
      loadImage()
    }
  }
}

// 音频懒加载指令
const lazyAudio = {
  mounted(el, binding) {
    // 保存原始src
    const originalSrc = binding.value
    
    // 清空src，防止预加载
    el.removeAttribute('src')
    
    function loadAudio() {
      const audioElement = el
      audioElement.src = originalSrc
      audioElement.classList.add('loaded')
      audioElement.load() // 加载音频
    }

    function handleIntersect(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadAudio()
          observer.unobserve(el)
        }
      })
    }

    function createObserver() {
      const options = {
        root: null,
        threshold: 0,
        rootMargin: '0px 0px 400px 0px'  // 音频预加载范围可以设置得更大一些
      }
      const observer = new IntersectionObserver(handleIntersect, options)
      observer.observe(el)
    }

    // 如果浏览器支持 IntersectionObserver
    if (window.IntersectionObserver) {
      createObserver()
    } else {
      // 降级处理
      loadAudio()
    }
  }
}

// 视频懒加载指令（额外提供）
const lazyVideo = {
  mounted(el, binding) {
    // 保存原始src
    const originalSrc = binding.value
    
    // 清空src，防止预加载
    el.removeAttribute('src')
    
    function loadVideo() {
      const videoElement = el
      videoElement.src = originalSrc
      videoElement.classList.add('loaded')
      
      // 如果视频设置了自动播放，则加载后播放
      if (videoElement.hasAttribute('autoplay')) {
        videoElement.load()
        videoElement.play().catch(error => {
          console.warn('自动播放失败:', error)
        })
      } else {
        videoElement.load()
      }
    }

    function handleIntersect(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadVideo()
          observer.unobserve(el)
        }
      })
    }

    function createObserver() {
      const options = {
        root: null,
        threshold: 0,
        rootMargin: '0px 0px 400px 0px'
      }
      const observer = new IntersectionObserver(handleIntersect, options)
      observer.observe(el)
    }

    // 如果浏览器支持 IntersectionObserver
    if (window.IntersectionObserver) {
      createObserver()
    } else {
      // 降级处理
      loadVideo()
    }
  }
}

// 懒加载背景图片指令
const lazyBackground = {
  mounted(el, binding) {
    function loadBackground() {
      // 创建一个临时图片对象加载图片
      const img = new Image()
      
      img.onload = () => {
        // 图片加载完成后设置为背景
        el.style.backgroundImage = `url(${binding.value})`
        el.classList.add('loaded')
      }
      
      img.onerror = () => {
        console.log('背景图片加载失败:', binding.value)
      }
      
      img.src = binding.value
    }

    function handleIntersect(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadBackground()
          observer.unobserve(el)
        }
      })
    }

    function createObserver() {
      const options = {
        root: null,
        threshold: 0,
        rootMargin: '0px 0px 200px 0px'
      }
      const observer = new IntersectionObserver(handleIntersect, options)
      observer.observe(el)
    }

    // 如果浏览器支持 IntersectionObserver
    if (window.IntersectionObserver) {
      createObserver()
    } else {
      // 降级处理
      loadBackground()
    }
  }
}

// 导出插件
export default {
  install(app) {
    // 注册全局指令
    app.directive('lazy-image', lazyImage)
    app.directive('lazy-audio', lazyAudio)
    app.directive('lazy-video', lazyVideo)
    app.directive('lazy-background', lazyBackground)
  }
}

// 也可以单独导出各个指令，以便按需导入
export {
  lazyImage,
  lazyAudio,
  lazyVideo,
  lazyBackground
} 