// 列权限的自定义指令
export default {
  cols: {
    // 绑定
    bind(el, binding, vnode, oldVnode) {
      const { value } = binding
      console.log('bind')
      if (!value || !value.table || !value.col) {
        throw new Error(`输入正确的操作权限指令!eg. v-cols='{table:"sys",col:"name"}'`)
      }

      // const cols = vnode.context.$store.state.permission.cols
      const columns = value.cols || []
      // const parent = vnode.context.$route.meta && vnode.context.$route.meta.title
      // console.log(columns)
      if (columns.length === 0) return
      const name = value.col
      let hasPermission = false

      hasPermission = columns.some(e => {
        return e.val === name
      })

      if (!hasPermission) {
        // el.parentNode && el.parentNode.removeChild(el)
        // // el.style.display = 'none'
        console.log(el)
      }
    },
    inserted() {
      // 当绑定了指令的这个HTML元素插入到父元素上时触发(在这里父元素是 `div#app`)**.但不保证,父元素已经插入了 DOM 文档.**
      console.log('inserted triggerd')
    },
    // 更新
    update(el, binding, vnode, oldVnode) {
      const { value } = binding
      console.log('update')
      if (!value || !value.table || !value.col || !value.cols) {
        throw new Error(`输入正确的操作权限指令!eg. v-cols='{table:"sys",col:"name",cols:[]}'`)
      }
      // const cols = vnode.context.$store.state.permission.cols
      const columns = value.cols || []
      // const parent = vnode.context.$route.meta && vnode.context.$route.meta.title
      if (columns.length === 0) return
      const name = value.col
      let hasPermission = false

      hasPermission = columns.some(e => {
        return e.val === name
      })

      if (!hasPermission) {
        // el.parentNode && el.parentNode.removeChild(el)
        // el.style.display = 'none'
        console.log(el)
        // el.remove()
      }
    },
    componentUpdate() {
      console.log('componentUpdate')
    },
    // 卸载
    unbind(el, binding, vnode, oldVnode) {
      console.log('unbind triggerd')
    }
  }
}
