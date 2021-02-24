/**
 * 主题状态管理 license by http://eleadmin.com
 */
import setting from '@/config/setting'

// 获取本地缓存配置
let cache = {}
try {
  cache = JSON.parse(localStorage.getItem(setting.themeStoreName) || '{}')
} catch (e) {
  console.error(e)
}

// 获取缓存的主题配置和缓存的主题css
const cacheTheme = getCache(cache, [
  'color', 'sideStyle', 'headStyle',
  'tabStyle', 'layoutStyle', 'bodyFull',
  'fixedHeader', 'fixedSidebar', 'fixedBody',
  'showTabs', 'logoAutoSize', 'colorfulIcon',
  'sideUniqueOpen', 'weakMode', 'darkMode'
], setting)

// 恢复色弱模式
if (cacheTheme.weakMode) {
  document.body.classList.add('ele-admin-weak')
}

// 恢复主题色
window.onload = function() {
  changeTheme(cacheTheme.color, cacheTheme.darkMode).catch(e => {
    console.error(e)
  })
}

// 获取屏幕宽度
const screenWidth = document.documentElement.clientWidth || document.body.clientWidth
  const screenHeight = document.documentElement.clientHeight || document.body.clientHeight

export default {
  namespaced: true,
  state: {
    // 侧边栏风格: 0亮色, 1暗色
    sideStyle: cacheTheme.sideStyle,
    // 顶栏风格: 0亮色, 1暗色, 2主色
    headStyle: cacheTheme.headStyle,
    // 标签页风格: 0默认, 1圆点, 2卡片
    tabStyle: cacheTheme.tabStyle,
    // 布局风格: 0默认, 1顶部菜单风格, 2混合菜单风格
    layoutStyle: cacheTheme.layoutStyle,
    // 是否固定侧栏
    fixedSidebar: cacheTheme.fixedSidebar,
    // 是否固定顶栏
    fixedHeader: cacheTheme.fixedHeader,
    // 是否固定主体
    fixedBody: cacheTheme.fixedBody,
    // 内容区域宽度铺满
    bodyFull: cacheTheme.bodyFull,
    // 是否开启多标签
    showTabs: cacheTheme.showTabs,
    // logo是否自适应宽度
    logoAutoSize: cacheTheme.logoAutoSize,
    // 侧栏是否多彩图标
    colorfulIcon: cacheTheme.colorfulIcon,
    // 侧边栏是否只保持一个子菜单展开
    sideUniqueOpen: cacheTheme.sideUniqueOpen,
    // 是否是色弱模式
    weakMode: cacheTheme.weakMode,
    // 是否是暗黑模式
    darkMode: cacheTheme.darkMode,
    // 主题色
    color: cacheTheme.color,
    // 是否折叠侧边栏
    collapse: screenWidth < 992,
    // 当前屏幕宽度
    screenWidth: screenWidth,
    // 当前屏幕高度
    screenHeight: screenHeight
  },
  mutations: {
    SET: (state, obj) => {
      console.log(36366, obj)
      state[obj.key] = obj.value
      // 开关色弱模式
      if (obj.key === 'weakMode') {
        if (obj.value) {
          document.body.classList.add('ele-admin-weak')
        } else {
          document.body.classList.remove('ele-admin-weak')
        }
      }
      // 缓存修改的配置
      if (['collapse', 'screenWidth', 'screenHeight'].indexOf(obj.key) === -1) {
        const temp = JSON.parse(localStorage.getItem(setting.themeStoreName) || '{}')
        temp[obj.key] = obj.value
        localStorage.setItem(setting.themeStoreName, JSON.stringify(temp))
      }
    }
  },
  actions: {
    /**
     * 修改配置
     * @param commit
     * @param obj
     */
    set({ commit }, obj) {
      commit('SET', obj)
    },
    /**
     * 切换配置(boolean类型的配置)
     * @param commit
     * @param state
     * @param key
     */
    toggle({ commit, state }, key) {
      commit('SET', { key: key, value: !state[key] })
    },
    /**
     * 更新屏幕尺寸
     * @param commit
     * @param state
     */
    updateScreen({ commit, state }) {
      const w = document.documentElement.clientWidth || document.body.clientWidth
        const h = document.documentElement.clientHeight || document.body.clientHeight
      if (w !== state.screenWidth) {
        commit('SET', { key: 'screenWidth', value: w })
      }
      if (h !== state.screenHeight) {
        commit('SET', { key: 'screenHeight', value: h })
      }
    },
    /**
     * 切换主题色
     * @param commit
     * @param state
     * @param color
     * @returns {Promise<>}
     */
    setColor({ commit, state }, color) {
      return new Promise((resolve, reject) => {
        changeTheme(color, state.darkMode).then(() => {
          commit('SET', { key: 'color', value: color })
          return resolve()
        }).catch(e => {
          reject(e)
        })
      })
    }
  }
}

/**
 * 获取缓存配置项
 * @param cache 缓存数据
 * @param k 配置项
 * @param v 默认值
 */
function getCache(cache, k, v) {
  if (Array.isArray(k)) {
    const obj = {}
    k.forEach(t => {
      obj[t] = (cache[t] === null || cache[t] === undefined) ? v[t] : cache[t]
    })
    return obj
  } else {
    if (cache[k] === null || cache[k] === undefined) {
      return v
    }
    return cache[k]
  }
}

/**
 * 切换主题
 * @param color 主题色
 * @param darkMode 是否是暗黑模式
 * @returns {Promise<>}
 */
function changeTheme(color, darkMode) {
  const version = process.env.VUE_APP_VERSION
  // 对应的css文件名
  let colorCss
  if (darkMode) {
    if (color) {
      colorCss = color + '-dark'
    } else {
      colorCss = 'dark'
    }
  } else {
    colorCss = color
  }
  // 获取缓存的主题css
  let themeCache = {}
    const cacheStoreName = setting.themeStoreName + '-cache'
  if (window.eleThemeCache) {
    themeCache = window.eleThemeCache
  } else {
    try {
      const localCache = JSON.parse(localStorage.getItem(cacheStoreName) || '{}')
      if (localCache && version === localCache.version && localCache.cache) {
        themeCache = localCache.cache
        window.eleThemeCache = themeCache
      }
    } catch (e) {
      console.error(e)
    }
  }
  // 加载主题css
  return new Promise((resolve, reject) => {
    // 恢复默认主题
    if (!colorCss) {
      removeTheme()
      return resolve()
    }
    // 主题css已经缓存过
    if (themeCache[colorCss]) {
      removeTheme() // 移除上次的主题
      const elem = document.createElement('style')
      elem.id = `ele-theme-${colorCss}`
      elem.setAttribute('type', 'text/css')
      elem.innerHTML = themeCache[colorCss]
      document.head.appendChild(elem)
      return resolve()
    }
    // 主题css的js模块已被加载过
    const oldElem = document.head.querySelector(`#ele-theme-${colorCss}-js`)
    if (oldElem) {
      removeTheme() // 移除上次的主题
      const elem = document.createElement('link')
      elem.id = `ele-theme-${colorCss}`
      elem.setAttribute('type', 'text/css')
      elem.setAttribute('rel', 'stylesheet')
      elem.setAttribute('href', oldElem.getAttribute('ele-css'))
      document.head.appendChild(elem)
      return resolve()
    }
    // 把head下面相关元素标记为非主题元素
    const nid = ':not([id^="ele-theme-"])'; const sel = `style${nid},link${nid},script${nid}`
    document.head.querySelectorAll(sel).forEach(elem => {
      if (!elem.getAttribute('ele-theme')) {
        elem.setAttribute('ele-theme', 'no')
      }
    })
    // 加载主题css模块
    import(`@/styles/theme/${colorCss}.scss`).then(() => {
      removeTheme() // 移除上次的主题
      // 获取import之后的主题标签
      let elem = document.head.querySelectorAll('style:not([ele-theme="no"])')
      elem = elem.length ? elem[elem.length - 1] : null
      if (!elem) {
        // 可能是style标签也可能是link标签
        elem = document.head.querySelectorAll('link:not([ele-theme="no"])')
        elem = elem.length ? elem[elem.length - 1] : null
        if (!elem) {
          return reject(new Error('theme element not found.'))
        }
        // 再找到对应的主题js模块的标签
        const href = elem.getAttribute('href')
          const uuid = href.substring(href.indexOf('chunk-'), href.indexOf('.'))
          const qs = `script[src^="/js/${uuid}"]:not([ele-theme="no"])`
        const node = document.head.querySelectorAll(qs)
        if (node.length) {
          node[node.length - 1].id = `ele-theme-${colorCss}-js`
          // 记录css地址
          node[node.length - 1].setAttribute('ele-css', href)
        }
      }
      elem.id = `ele-theme-${colorCss}`
      // 缓存主题css
      if (elem.innerHTML) {
        const cache = {}
        cache[colorCss] = elem.innerHTML
        try {
          localStorage.setItem(cacheStoreName, JSON.stringify({
            version: version,
            cache: cache
          }))
        } catch (e) {
          console.error(e)
        }
        if (!window.eleThemeCache) {
          window.eleThemeCache = {}
        }
        window.eleThemeCache[colorCss] = cache[colorCss]
      }
      return resolve()
    }).catch(e => {
      reject(e)
    })
  })
}

/**
 * 移除主题
 */
function removeTheme() {
  const sel = 'style[id^="ele-theme-"],link[id^="ele-theme-"]'
  document.head.querySelectorAll(sel).forEach(elem => {
    elem.parentNode.removeChild(elem)
  })
}
