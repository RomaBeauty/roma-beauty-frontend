import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(vuetify) // <-- MUITO IMPORTANTE
app.mount('#app')


// 🔹 importa o Vuetify configurado
import vuetify from './plugins/vuetify'

// 🔹 opcional: importa seu CSS
import './assets/main.css'


