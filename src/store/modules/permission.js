
const permission = {
  namespaced: true,
  state: {
    // 全部路由
    routes: [],
    // 权限
    permissions: [],
    // 菜单
    menus: [],
    // 列权限
    cols: [],
    // 操作权限
    actions: [],
    // 模式 简单模式/权限模式
    method: 1,
    // 当前权限
    permission: ''
  },
  mutations: {
    SET_ROUTES: (state, r) => {
      state.routes = r
    },
    SET_PERMISSIONS: (state, p) => {
      state.permissions = p
      state.actions = p.filter(e => e.type === 3)
      state.cols = p.filter(e => e.type === 4)
    },
    SET_MENUS: (state, m) => {
      state.menus = m
    },
    change: (state, m) => {
      state.permission = m
    }
  },
  actions: {
    permission({ commit, state }, permissions) {
      return new Promise((resolve, reject) => {
        try {
          commit('SET_PERMISSIONS', permissions)
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    },
    change({ commit, state }, val) {
      commit('change', val)
    }
  }
}

export default permission
