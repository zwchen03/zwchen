<template>
  <div class="back-to-top" :class="{ show: isVisible }" @click="scrollToTop">
    <i class="fas fa-arrow-up"></i>
  </div>
</template>

<script>
export default {
  name: 'BackToTop',
  data() {
    return {
      isVisible: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.toggleVisibility)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.toggleVisibility)
  },
  methods: {
    toggleVisibility() {
      if (window.pageYOffset > 300) {
        this.isVisible = true
      } else {
        this.isVisible = false
      }
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  opacity: 0;
  visibility: hidden;
  z-index: 1000;
  
  &.show {
    opacity: 1;
    visibility: visible;
  }
  
  &:hover {
    background: var(--secondary-color);
    transform: translateY(-3px);
  }
  
  i {
    font-size: 20px;
  }
}
</style> 