/**
 * axios配置
 */
import router from '@/router'
import store from '@/store'
import axios from 'axios'
import { MessageBox } from 'element-ui'
import Vue from 'vue'
import VueAxios from 'vue-axios'
import setting from './setting'

Vue.use(VueAxios, axios)

// 设置统一url
axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL

// 请求拦截器
axios.interceptors.request.use((config) => {
  config.headers.Application = 'workTable'

  // 添加token到header
  if (store.state.user.token) {
    config.headers[setting.tokenHeaderName] = store.state.user.token
  }

  // system
  if (config.url.indexOf('system/') === 0) {
    const urlConfig = store.getters.urlConfig

    config.baseURL = urlConfig.system

    config.url = config.url.replace('system/', '')
  }
  // commodity
  if (config.url.indexOf('commodity/') === 0) {
    const urlConfig = store.getters.urlConfig
    config.baseURL = urlConfig.commodity
    config.url = config.url.replace('commodity/', '')
  }
  // customer
  if (config.url.indexOf('customer/') === 0) {
    const urlConfig = store.getters.urlConfig
    config.baseURL = urlConfig.customer
    config.url = config.url.replace('customer/', '')
  }
  // order
  if (config.url.indexOf('order/') === 0) {
    const urlConfig = store.getters.urlConfig
    config.baseURL = urlConfig.order
    config.url = config.url.replace('order/', '')
  }
  // content
  if (config.url.indexOf('content/') === 0) {
    const urlConfig = store.getters.urlConfig
    config.baseURL = urlConfig.content
    config.url = config.url.replace('content/', '')
  }
  // content
  if (config.url.indexOf('file/') === 0) {
    const urlConfig = store.getters.urlConfig
    config.baseURL = urlConfig.file
    config.url = config.url.replace('file/', '')
  }
  return config
}, function(error) {
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use((res) => {
  // 登录过期处理
  if (res.data.status === 401) {
    if (res.config.url === setting.menuUrl) {
      store.dispatch('user/setToken').then(() => {
        router.push('/login')
      })
    } else {
      MessageBox.alert('登录状态已过期, 请退出重新登录!', '系统提示', {
        confirmButtonText: '重新登录',
        callback: action => {
          if (action === 'confirm') {
            store.dispatch('user/setToken').then(() => {
              location.replace('/')
            })
          }
        },
        beforeClose: () => {
          MessageBox.close()
        }
      })
    }
    return Promise.reject(new Error(res.data.msg))
  }
  // token自动续期
  const access_token = res.headers[setting.tokenHeaderName]
  if (access_token) {
    store.dispatch('user/setToken', access_token)
  }

  return res.data
}, (error) => {
  return Promise.reject(error)
})
