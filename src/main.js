import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import AppearView from './components/AppearView.vue'


const app = createApp(App)
app.component('appear-view', AppearView)

app.use(store)
app.mount('#app')
