import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import { InstallCodeMirror } from "codemirror-editor-vue3";

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(InstallCodeMirror);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')

// createApp(App).mount('#app').$nextTick(() => {
//   // Use contextBridge
//   window.ipcRenderer.on('main-process-message', (_event, message) => {
//     console.log(message)
//   })
// })
