import { uuid } from '@/utils/uuid';
import axios from 'axios';
import Cookies from 'js-cookie';
const state = {
  urlConfig: {
    mode: 1,
    baseUrl: '',
    commodity: '',
    customer: '',
    order: '',
    file: '',
    lucene: '',
    content: '',
    // 普通上传
    upload: '',
    // 分片上传
    uploadPart: '',
    // 合并上传
    mergeChunks: ''

  },
  // 应用名称
  name: 'branch',
  // 唯一标识
  unique: window.localStorage.getItem('unique') || uuid(32),
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  language: Cookies.get('language') || 'en',
  size: Cookies.get('size') || 'medium'
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_LANGUAGE: (state, language) => {
    state.language = language
    Cookies.set('language', language)
  },
  SET_SIZE: (state, size) => {
    state.size = size
    Cookies.set('size', size)
  },
  setUrl: (state, urlConfig) => {
    Object.assign(state.urlConfig, urlConfig)
  }

}

const actions = {
  getDomain({ commit }) {
    axios.get('api1/admin/1.0/domain?domain=' + process.env.VUE_APP_Branch).then((res) => {
      if (res.isSucceed) {
        const urlConfig = {
          baseUrl: res.data,
          system: `http://${res.data}/api1/admin/1.0/`,
          commodity: `http://${res.data}/api2/api/1.0/`,
          customer: `http://${res.data}/api3/admin/1.0/`,
          order: `http://${res.data}/api4/admin/1.0/`,
          file: `http://${res.data}/api5/admin/1.0/`,
          lucene: `http://${res.data}/api6/admin/1.0/`,
          content: `http://${res.data}/api7/admin/1.0/`,

          upload: `http://${res.data}/admin/1/upload/upload`,
          uploadPart: `http://${res.data}/admin/1/upload/uploadByWeb`,
          mergeChunks: `http://${res.data}/admin/1/upload/merge-chunks`
        }
        commit('setUrl', urlConfig)
      }
      
    })
  },
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language)
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
