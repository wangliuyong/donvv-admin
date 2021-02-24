// 操作权限的自定义指令
export default {
  action: {
    // 绑定
    bind(el, binding, vnode, oldVnode) {
      const { value } = binding
      const actions = vnode.context.$store.state.permission.actions
      const parent = vnode.context.$route.meta && vnode.context.$route.meta.code
      if (value && parent) {
        const name = value
        // const full = `${parent}-${name}`
        let hasPermission = false

        hasPermission = actions.some(e => {
          return e.alias === name && e.pCode === parent
        })

        if (!hasPermission) {
          // el.parentNode && el.parentNode.removeChild(el)
          el.style.display = 'none'
        }
      } else {
        throw new Error(`输入正确的操作权限指令!eg. v-action="add"`)
      }
    },
    // 更新
    update(el, binding, vnode, oldVnode) {
      const { value } = binding
      const actions = vnode.context.$store.state.permission.actions
      const parent = vnode.context.$route.meta && vnode.context.$route.meta.code
      if (value && parent) {
        const name = value
        // const full = `${parent}-${name}`
        let hasPermission = false

        hasPermission = actions.some(e => {
          return e.alias === name && e.pCode === parent
        })
        if (!hasPermission) {
          // el.parentNode && el.parentNode.removeChild(el)
          el.style.display = 'none'
        } else {
          el.style = null
        }
      }
    },
    // 卸载
    unbind(el, binding, vnode, oldVnode) {
    }
  }
}
