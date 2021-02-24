import _ from 'lodash'
let menus = []

/**
 *初始化路由
 *
 * @param {array} routers 动态路由集合
 * @param {string} [pCode='0'] 父级目录
 */
export const generate = function(routers, permissions) {
  menus = []
  generateRoutes(routers, permissions)
  menus = _.sortBy(menus, e => e.sort)
  return menus
}

/**
 *初始化路由
 *
 * @param {array} routers 动态路由集合
 * @param {string} [pCode='0'] 父级目录
 */
export const generateRoutes = function(routers, permissions, pCode = '0', path = '') {
  routers.forEach(e => {
    if (!e.meta || !e.meta.code) return false
    const exist = _.find(permissions, p => p.code === e.meta.code && p.pCode === pCode && (p.type === 1 || p.type === 2))
    if (!exist) return false
    e.meta.authorize = true
    e.meta.title = exist.name || e.meta.title
    e.meta.hidden = !exist.show || false
    generateMenus(e, exist, path)
    if (!e.children || e.children.length <= 0) return false
    generateRoutes(e.children, permissions, e.meta.code, e.path)
  })
}

/**
 *生成菜单
 *
 * @param {*} router 路由
 * @param {*} permission 权限
 */
export const generateMenus = function(router, permission, path = '') {
  const menu = {
    code: permission.code,
    pCode: permission.pCode,
    name: permission.name,
    sort: permission.sort,
    type: permission.type,
    show: permission.show,
    icon: permission.icon,
    path: router.path
  }
  if (router.meta) {
    menu.unique = router.meta.unique
    menu.fixed = router.meta.affix
    if (menu.type === 2) {
      menu.url = path + '/' + router.path
    }
  }
  if (!menus.some(e => e.code === menu.code) && router.meta && !router.meta.hidden) {
    menus.push(menu)
  }
}

export const menueClass  = (permission) => {
  permission.map((item) => {
    item.component = item.path
  })
  let menuList = permission
  for (let i = 1; i <= 6; i++) { 
    menuList.forEach((item1) => {
      menuList.forEach((item2) => {
        if(item1.code.length === (3 * i) && item2.code.length === (3 * 2 * i) &&  item2.pcode === item1.code){
          if(item1.children){
            if(!item1.children.find(menuItem => menuItem.code === item2.code)){
              item1.children.push(item2)
            }
          } else {
            item1.children = []
          }
        }
      })
    })
 }
  return menuList.filter(item => item.pcode === '0')
}
