import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Quasar
import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'


// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'

const vuetify = createVuetify({
  components,
  directives
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Vue3Toastify, {
  autoClose: 3000,
  position: 'top-right'
} as ToastContainerOptions)
app.use(vuetify)
app.use(Quasar, {
  plugins: {},
})

app.mount('#app')
