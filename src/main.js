/** 主入口js */
import EleAdmin from '@/components/ele-admin'
import permission from '@/utils/permission'
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import App from './App.vue'
import './config/axios'
import directive from './config/directive'
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
  created() {
    directive()
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
