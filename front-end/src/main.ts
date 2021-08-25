import axios from 'axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
axios.defaults.baseURL = window.location.origin.replace("8080", "3000");

createApp(App).use(router).mount('#app')
