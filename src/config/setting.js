/**
 * 项目统一配置
 */
export default {
  // 路由白名单(不需要登录的)
  whiteList: ['/login', '/forget'],
  // 需要缓存的组件名称
  keepAliveList: [],
  // 菜单数据接口
  menuUrl: 'system/permission/GetPermission',
  // 自定义解析接口菜单数据
  parseMenu: null,
  // 自定义解析接口菜单每一个数据格式
  parseMenuItem: null,
  // 直接指定菜单数据
  menus: null,
  // 用户信息接口
  userUrl: 'system/user/info',
  // 自定义解析接口用户信息
  parseUser: (res) => {
    res.data.roles = res.data.roles.map(d => d.roleCode)
    res.data.authorities = res.data.authorities.map(d => d.authority)
    return res
  },
  // token传递的header名称
  tokenHeaderName: 'Authorization',
  // token存储的名称
  tokenStoreName: 'access_token',
  // 用户信息存储的名称
  userStoreName: 'user',
  // 主题配置存储的名称
  themeStoreName: 'theme',
  // 首页tab显示标题, null会根据菜单自动获取
  homeTitle: '主页',
  // 首页路径, null会自动获取
  homePath: '/index',
  // 顶栏是否显示主题设置按钮
  showSetting: true,
  // 侧边栏风格: 0亮色, 1暗色
  sideStyle: 1,
  // 顶栏风格: 0亮色, 1暗色, 2主色
  headStyle: 0,
  // 标签页风格: 0默认, 1圆点, 2卡片
  tabStyle: 0,
  // 布局风格: 0默认, 1顶部菜单风格, 2混合菜单风格
  layoutStyle: 0,
  // 是否固定侧栏
  fixedSidebar: true,
  // 是否固定顶栏
  fixedHeader: false,
  // 是否固定主体
  fixedBody: true,
  // logo是否自适应宽度
  logoAutoSize: false,
  // 内容区域宽度是否铺满
  bodyFull: true,
  // 是否开启多标签
  showTabs: true,
  // 侧栏是否多彩图标
  colorfulIcon: false,
  // 侧边栏是否只保持一个子菜单展开
  sideUniqueOpen: true,
  // 是否是色弱模式
  weakMode: false,
  // 是否是暗黑模式
  darkMode: false,
  // 默认主题色
  color: null
}
