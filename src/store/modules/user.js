/**
 * 登录状态管理
 */
import setting from '@/config/setting'
import axios from 'axios'
import { util } from 'ele-admin'

// 获取缓存的用户信息和token信息
let loginUser = { }
  let loginToken = localStorage.getItem(setting.tokenStoreName)
if (!loginToken) {
  loginToken = sessionStorage.getItem(setting.tokenStoreName)
}
try {
  loginUser = JSON.parse(localStorage.getItem(setting.userStoreName) || '{}') || { avatar: '', nickName: '' }
} catch (e) {
  console.error(e)
}

export default {
  namespaced: true,
  state: {
    // 当前token
    token: loginToken,
    // 当前用户信息
    user: loginUser,
    // 当前用户权限
    authorities: [],
    // 当前用户角色
    roles: [],
    // 当前用户的菜单
    menus: null,
    // 当前打开的选项卡
    tabs: []
  },
  mutations: {
    SET: (state, obj) => {
      state[obj.key] = obj.value
    },
    TAB_PUSH(state, obj) {
      if (!state.tabs.some(r => r.path === obj.path)) {
        state.tabs.push(obj)
      }
    }
  },
  actions: {
    /**
     * 缓存token
     * @param commit
     * @param token {String, {token: String, remember: String}}
     */
    setToken({ commit, dispatch }, token) {
      let remember = true
      if (typeof token === 'object') {
        remember = token.remember
        token = token.token
      }
      localStorage.removeItem(setting.tokenStoreName)
      sessionStorage.removeItem(setting.tokenStoreName)
      if (token) {
        if (remember) {
          localStorage.setItem(setting.tokenStoreName, token)
        } else {
          sessionStorage.setItem(setting.tokenStoreName, token)
        }
      } else {
        commit('SET', { key: 'menus', value: null })
        commit('SET', { key: 'tabs', value: [] })
      }
      commit('SET', { key: 'token', value: token })
      // dispatch('setUser', token)
    },
    /**
     * 缓存用户信息
     * @param commit
     * @param user {Object} 用户信息
     */
    setUser({ commit }, user) {
      if (user) {
        localStorage.setItem(setting.userStoreName, JSON.stringify(user))
      } else {
        localStorage.removeItem(setting.userStoreName)
      }
      commit('SET', { key: 'user', value: user })
    },
    /**
     * 设置用户权限
     * @param commit
     * @param authorities {Array<String>} 权限
     */
    setAuthorities({ commit }, authorities) {
      commit('SET', { key: 'authorities', value: authorities })
    },
    /**
     * 设置用户角色
     * @param commit
     * @param roles {Array<String>} 角色
     */
    setRoles({ commit }, roles) {
      commit('SET', { key: 'roles', value: roles })
    },
    /**
     * 设置用户菜单
     * @param commit
     * @param menus {Array<Object>} 菜单
     */
    setMenus({ commit }, menus) {
      commit('SET', { key: 'menus', value: menus })
    },
    /**
     * 获取用户菜单路由
     * @param commit
     * @returns {Promise<Object>} {menus: Array, home: String}
     */
    getMenus({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        if (!setting.menuUrl) {
          const menus = setting.menus || []
          commit('SET', { key: 'menus', value: menus })
          return resolve({ menus: menus })
        }
        axios.get(setting.menuUrl).then(res => {
          res.data = res.data.filter((item) => {
            item.component = item.path.toLocaleLowerCase()
            item.menuId = item.code
            item.parentId = item.pcode
            item.checked = null
            item.hide = 0
            item.open = null
            if (item.pcode === '0') {
              item.path = null
            }
            return item.type < 3
          })
          const result = setting.parseMenu ? setting.parseMenu(res.data) : res.data
          const menus = util.toTreeData(res.data, 'menuId', 'parentId'); let home = null

          if (!menus) {
            return reject(new Error(result.msg))
          }
          util.eachTreeData(menus, item => {
            if (setting.parseMenuItem) {
              item = setting.parseMenuItem(item)
            }
            item.meta = Object.assign({
              title: item.title || item.name,
              icon: item.icon,
              hide: item.hide,
              uid: item.uid
            }, item.meta)
            if (!item.children || !item.children.length) {
              if (!home && item.path && !(
                item.path.startsWith('http://') ||
                item.path.startsWith('https://') ||
                item.path.startsWith('//')
              )) {
                home = item.path
                if (!setting.homeTitle) {
                  setting.homeTitle = item.title
                }
              }
            } else if (item.children[0].path) {
              if (!item.redirect) {
                item.redirect = item.children[0].path
              }
              if (!item.path) {
                const cp = item.children[0].path
                item.path = cp.substring(0, cp.lastIndexOf('/'))
              }
            }
          })
          commit('SET', { key: 'menus', value: menus })
          resolve({ menus: menus, home: home, permission: res.data })
        }).catch(e => {
          reject(e)
        })
      })
    },
    /**
     * 添加新tab
     * @param commit
     * @param obj {{path: String, title: String}} tab信息
     */
    tabAdd({ commit }, obj) {
      commit('TAB_PUSH', obj)
    },
    /**
     * 关闭指定tab
     * @param commit
     * @param state
     * @param path {String} tab路由
     * @returns {Promise<Number>} 前一个tab位置
     */
    tabRemove({ commit, state }, path) {
      return new Promise((resolve) => {
        let last = -1
        for (let i = 0; i < state.tabs.length; i++) {
          if (state.tabs[i].path === path) {
            break
          }
          last = i
        }
        commit('SET', { key: 'tabs', value: state.tabs.filter(d => d.path !== path) })
        resolve(last)
      })
    },
    /**
     * 关闭所有tab
     * @param commit
     */
    tabRemoveAll({ commit }) {
      commit('SET', { key: 'tabs', value: [] })
    },
    /**
     * 关闭左侧tab
     * @param commit
     * @param state
     * @param path {String} tab路由
     */
    tabRemoveLeft({ commit, state }, path) {
      for (let i = 0; i < state.tabs.length; i++) {
        if (state.tabs[i].path === path) {
          commit('SET', { key: 'tabs', value: state.tabs.slice(i) })
          break
        }
      }
    },
    /**
     * 关闭右侧tab
     * @param commit
     * @param state
     * @param path {String} tab路由
     */
    tabRemoveRight({ commit, state }, path) {
      for (let i = 0; i < state.tabs.length; i++) {
        if (state.tabs[i].path === path) {
          commit('SET', { key: 'tabs', value: state.tabs.slice(0, i + 1) })
          break
        }
      }
    },
    /**
     * 关闭其他tab
     * @param commit
     * @param state
     * @param path {String} tab路由
     */
    tabRemoveOther({ commit, state }, path) {
      commit('SET', { key: 'tabs', value: state.tabs.filter(d => d.path === path) })
    },
    /**
     * 修改指定tab标题
     * @param commit
     * @param state
     * @param obj {{path: String, title: String}}
     */
    tabSetTitle({ commit, state }, obj) {
      const i = state.tabs.findIndex(d => d.path === obj.path)
      const tabs = state.tabs.slice(0, i).concat([
        Object.assign({}, state.tabs[i], {
          title: obj.title
        })
      ]).concat(state.tabs.slice(i + 1))
      commit('SET', { key: 'tabs', value: tabs })
    }
  }
}
