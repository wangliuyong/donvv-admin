/** 主入口js */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import setting from './config/setting';
import permission from '@/utils/permission';
import VueClipboard from 'vue-clipboard2';
import './config/axios';
import EleAdmin from 'ele-admin';
import './styles/index.scss';

Vue.config.productionTip = false;
Vue.prototype.$setting = setting;
Vue.use(EleAdmin, {size: 'medium'});
Vue.use(permission);
Vue.use(VueClipboard);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
