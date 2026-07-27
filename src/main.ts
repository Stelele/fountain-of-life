import './style.css'
import { createApp } from 'vue'
import ui from '@nuxt/ui/vue-plugin'
import { addCollection } from '@iconify/vue'
import lucide from '@iconify-json/lucide/icons.json'
import App from './App.vue'
import router from './router'

addCollection(lucide)

const app = createApp(App)
app.use(router)
app.use(ui)
app.mount('#app')
