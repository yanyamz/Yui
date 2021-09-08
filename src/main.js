import { createApp } from 'vue'

import scss from '@/assets/scss/main.scss'
import App from './App.vue'
import router from './router'
import store from './store'

import Logo from '@/components/UI/Logo'

createApp(App)
    .use(store)
    .use(router)
    .use(scss)
    .component('Logo', Logo)
    .mount('#app')
