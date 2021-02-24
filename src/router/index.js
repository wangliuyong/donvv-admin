/**
 * 路由配置
 */
import setting from '@/config/setting'
import EleLayout from '@/layout'
import store from '@/store'
import { EleEmptyLayout } from 'ele-admin'
import NProgress from 'nprogress'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 静态路由
const routes = [
  {
    path: '/login',
    component: () => import('@/views/login/login'),
    meta: { title: '登录' }
  },
  {
    path: '/forget',
    component: () => import('@/views/login/forget'),
    meta: { title: '忘记密码' }
  },
  {
    path: '*',
    component: () => import('@/views/exception/404'),
    meta: { title: '404' }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history' // 把这个删掉就是hash模式
})

// 路由守卫
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  document.title = ((to.meta && to.meta.title) ? `${to.meta.title}` : '')
  // 获取域名配置
  if (!store.state.app.urlConfig?.baseUrl) {
    await store.dispatch('app/getDomain')
  }
  // 判断是否登录
  if (store.state.user.token) {
    // 判断是否已经注册动态路由
    if (!store.state.user.menus) {
      // 获取动态路由
      store.dispatch('user/getMenus').then(({ menus, home, permission }) => {
        // 存储到权限
        store.dispatch('permission/permission', permission)
        if (menus) {
          router.addRoute({
            path: '/',
            name: '/',
            redirect: setting.homePath || home,
            component: EleLayout,
            children: menuToRoutes(menus)
          })
        }
        next({ ...to, replace: true })
      }).catch(e => {
        console.error(e)
        next()
      })
    } else {
      next()
    }
  } else if (setting.whiteList.indexOf(to.path) !== -1) {
    next() // 在无需登录的白名单内
  } else {
    // 未登录跳转登录页面
    next({
      path: '/login',
      query: to.path === '/' ? {} : { from: to.path }
    })
  }
})

router.afterEach(() => {
  setTimeout(() => {
    NProgress.done(true)
  }, 300)
})

export default router

/**
 * 菜单生成路由
 * @param menus
 * @returns {[]}
 */
function menuToRoutes(menus) {
  if (!menus) {
    return []
  }
  const routes = [{
    path: 'index',
    name: 'index',
    meta: { title: '主页' },
    component: () => import('@/views/index/index')
  }]

  menus.forEach(item => {
    const path = item.path
    if (path && !(
      path.startsWith('http://') ||
      path.startsWith('https://') ||
      path.startsWith('//')
    )) {
      let component
      if (item.type !== 1) {
        component = () => import('@/views' + item.component)
      } else {
        component = EleEmptyLayout
      }
      routes.push({
        path: item.path,
        name: item.path,
        redirect: item.redirect,
        meta: item.meta,
        component: component,
        children: menuToRoutes(item.children)
      })
    }
  })
  return routes
}
