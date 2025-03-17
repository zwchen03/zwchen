<template>
  <div class="home-container">
    <HeaderNav />
    <MusicPlayer />
    <HeroSection />
    <AboutSection />
    <StatsSection />
    <BlogSection />
    <GallerySection />
    <TagsSection />
    <PageFooter />
    <BackToTop />
  </div>
</template>

<script>
import HeaderNav from './HeaderNav.vue'
import MusicPlayer from './MusicPlayer.vue'
import HeroSection from './HeroSection.vue'
import AboutSection from './AboutSection.vue'
import StatsSection from './StatsSection.vue'
import BlogSection from './BlogSection.vue'
import GallerySection from './GallerySection.vue'
import TagsSection from './TagsSection.vue'
import PageFooter from './PageFooter.vue'
import BackToTop from './BackToTop.vue'

export default {
  name: 'HomePage',
  components: {
    HeaderNav,
    MusicPlayer,
    HeroSection,
    AboutSection,
    StatsSection,
    BlogSection,
    GallerySection,
    TagsSection,
    PageFooter,
    BackToTop
  }
}
</script>

<style lang="less" scoped>
.home-container {
  width: 100%;
  max-width: 1150px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .home-container {
    width: 95%;
  }
}
</style>