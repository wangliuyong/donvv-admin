/**
 * 权限(角色)控制组件
 */
import store from '@/store';

export default {
  install(Vue) {
    // 添加全局方法
    Vue.prototype.$hasRole = this.hasRole;
    Vue.prototype.$hasAnyRole = this.hasAnyRole;
    Vue.prototype.$hasPermission = this.hasPermission;
    Vue.prototype.$hasAnyPermission = this.hasAnyPermission;

    // 添加自定义指令
    Vue.directive('role', {
      bind: (el, binding) => {
        if (!this.hasRole(binding)) {
          el.parentNode.removeChild(el);
        }
      }
    });
    Vue.directive('any-role', {
      bind: (el, binding) => {
        if (!this.hasAnyRole(binding)) {
          el.parentNode.removeChild(el);
        }
      }
    });
    Vue.directive('permission', {
      bind: (el, binding) => {
        if (!this.hasPermission(binding)) {
          el.parentNode.removeChild(el);
        }
      }
    });
    Vue.directive('any-permission', {
      bind: (el, binding) => {
        if (!this.hasAnyPermission(binding)) {
          el.parentNode.removeChild(el);
        }
      }
    });
  },
  /**
   * 是否有某些角色
   * @param role {String, Array<String>} 角色字符或字符数组
   * @returns {boolean}
   */
  hasRole(role) {
    return this.arrayHas(store.state.user.roles, role);
  },
  /**
   * 是否有任意角色
   * @param role {String, Array<String>} 角色字符或字符数组
   * @returns {boolean}
   */
  hasAnyRole(role) {
    return this.arrayHasAny(store.state.user.roles, role);
  },
  /**
   * 是否有某些权限
   * @param auth {String, Array<String>} 权限字符或字符数组
   * @returns {boolean}
   */
  hasPermission(auth) {
    return this.arrayHas(store.state.user.authorities, auth);
  },
  /**
   * 是否有任意权限
   * @param auth {String, Array<String>} 权限字符或字符数组
   * @returns {boolean}
   */
  hasAnyPermission(auth) {
    return this.arrayHasAny(store.state.user.authorities, auth);
  },
  /**
   * 数组是否有某些值
   * @param array {Array<String>} 数组
   * @param obj {String, Array<String>} 值
   * @returns {boolean}
   */
  arrayHas(array, obj) {
    if (!obj) {
      return true;
    }
    if (!array) {
      return false;
    }
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        if (array.indexOf(obj[i]) === -1) {
          return false;
        }
      }
      return true;
    }
    return array.indexOf(obj) !== -1;
  },
  /**
   * 数组是否有任意值
   * @param array {Array<String>} 数组
   * @param obj {String, Array<String>} 值
   * @returns {boolean}
   */
  arrayHasAny(array, obj) {
    if (!obj) {
      return true;
    }
    if (!array) {
      return false;
    }
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        if (array.indexOf(obj[i]) !== -1) {
          return true;
        }
      }
      return false;
    }
    return array.indexOf(obj) !== -1;
  }
}
