/** 主入口js */
import permission from '@/utils/permission'
import EleAdmin from 'ele-admin'
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import App from './App.vue'
import './config/axios'
import setting from './config/setting'
import router from './router'
import store from './store'
import './styles/index.scss'

Vue.config.productionTip = false
Vue.prototype.$setting = setting
Vue.use(EleAdmin, { size: 'medium' })
Vue.use(permission)
Vue.use(VueClipboard)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
