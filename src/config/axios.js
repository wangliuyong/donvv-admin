/**
 * axios配置
 */
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import store from '@/store';
import router from '@/router';
import setting from './setting';
import {MessageBox} from 'element-ui';

Vue.use(VueAxios, axios);

// 设置统一url
axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

// 请求拦截器
axios.interceptors.request.use((config) => {
  // 添加token到header
  if (store.state.user.token) {
    config.headers[setting.tokenHeaderName] = store.state.user.token;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use((res) => {
  // 登录过期处理
  if (res.data.code === 401) {
    if (res.config.url === setting.menuUrl) {
      store.dispatch('user/setToken').then(() => {
        router.push('/login');
      });
    } else {
      MessageBox.alert('登录状态已过期, 请退出重新登录!', '系统提示', {
        confirmButtonText: '重新登录',
        callback: action => {
          if (action === 'confirm') {
            store.dispatch('user/setToken').then(() => {
              location.replace('/');
            });
          }
        },
        beforeClose: () => {
          MessageBox.close();
        }
      });
    }
    return Promise.reject(new Error(res.data.msg));
  }
  // token自动续期
  let access_token = res.headers[setting.tokenHeaderName];
  if (access_token) {
    store.dispatch('user/setToken', access_token);
  }
  return res;
}, (error) => {
  return Promise.reject(error);
});
