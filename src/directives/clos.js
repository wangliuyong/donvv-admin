// 列权限的自定义指令
export default {
  col: {
    // 绑定
    bind(el, binding, vnode, oldVnode) {
      const { value } = binding
      const cols = vnode.context.$store.state.permission.cols
      const parent = vnode.context.$route.meta && vnode.context.$route.meta.title
      if (value && parent) {
        const name = value
        const full = `${parent}-${name}`
        let hasPermission = false

        if (full) {
          hasPermission = cols.some(e => {
            return e.alias === full
          })
        }

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
      const cols = vnode.context.$store.state.permission.cols
      const parent = vnode.context.$route.meta && vnode.context.$route.meta.title
      if (value && parent) {
        const name = value
        const full = `${parent}-${name}`
        let hasPermission = false

        if (full) {
          hasPermission = cols.some(e => e.alias === full)
        }

        if (!hasPermission) {
          el.parentNode && el.parentNode.removeChild(el)
          // el.style.display = 'none'
        } else {
          // el.parentNode && el.parentNode.append(el)
          el.style.display = 'block'
        }
      }
    },
    // 卸载
    unbind(el, binding, vnode, oldVnode) {
    }
  }
}
