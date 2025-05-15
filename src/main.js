// import './assets/main.css'
// 导入Less样式文件
import './assets/variables.less'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// 导入懒加载插件
import LazyLoadingPlugin from './plugins/lazyLoading'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// 使用懒加载插件
app.use(LazyLoadingPlugin)

app.mount('#app')
