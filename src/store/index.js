/**
 * vuex状态管理
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import permission from './modules/permission'
import theme from './modules/theme'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    theme,
    user,
    app,
    permission
  },
  getters
})
