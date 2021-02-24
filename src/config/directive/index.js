// 全局自定义指令
import Vue from 'vue'

/**
 * 全局过滤器
 */
export default function Initializer() {
  Vue.use((Vue) => {
    ((requireContext) => {
      const arr = requireContext.keys().map(requireContext);
      (arr || []).forEach((directive) => {
        directive = directive.__esModule && directive.default ? directive.default : directive
        Object.keys(directive).forEach((key) => {
          Vue.directive(key, directive[key])
        })
      })
    })(require.context('../../directives', false, /^\.\/.*\.js$/))
  })
}
