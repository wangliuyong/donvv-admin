<!-- echarts 图表组件封装 https://github.com/ecomfe/vue-echarts -->
<template>
  <div class="ele-charts"></div>
</template>

<script>
import echarts from 'echarts';
import EleCharTheme from './theme';
// 改变后需要重新初始化的属性
const INIT_TRIGGERS = ['theme', 'initOptions'];
// 改变后需要重新监听options改变的属性
const REWATCH_TRIGGERS = ['manualUpdate', 'watchShallow'];

export default {
  name: 'EleChart',
  props: {
    // 主题
    theme: {
      type: [String, Object],
      default() {
        return EleCharTheme;
      }
    },
    // 图表初始配置
    initOptions: Object,
    // 图表配置
    option: Object,
    // 实例分组
    group: String,
    // 是否关闭深度监听options改变
    watchShallow: Boolean,
    // 是否关闭响应式更新
    manualUpdate: Boolean
  },
  computed: {
    // 屏幕宽度
    screenWidth() {
      try {
        return this.$store.state.theme.screenWidth;
      } catch (e) {
        return null;
      }
    },
    // 侧边栏折叠状态
    collapse() {
      try {
        return this.$store.state.theme.collapse;
      } catch (e) {
        return null;
      }
    }
  },
  watch: {
    group(group) {
      this.chart.group = group;
    },
    screenWidth() {
      this.resize();
    },
    collapse() {
      setTimeout(() => {
        this.resize();
      }, 360);
    }
  },
  created() {
    this.initOptionsWatcher();
    INIT_TRIGGERS.forEach(prop => {
      this.$watch(
        prop,
        () => {
          this.refresh();
        },
        {deep: true}
      );
    });
    REWATCH_TRIGGERS.forEach(prop => {
      this.$watch(prop, () => {
        this.initOptionsWatcher();
        this.refresh();
      });
    });
  },
  mounted() {
    if (this.option) {
      this.init();
    }
  },
  unmounted() {
    if (this.chart) {
      this.destroy();
    }
  },
  methods: {
    /* 初始化echarts */
    init(options) {
      if (this.chart) {
        return;
      }
      const chart = echarts.init(this.$el, this.theme, this.initOptions);
      if (this.group) {
        chart.group = this.group;
      }
      chart.setOption(options || this.manualOptions || this.option || {}, true);
      // echarts事件监听
      Object.keys(this.$attrs).forEach(event => {
        const handler = this.$attrs[event]
        if (handler instanceof Function) {
          if (event.indexOf('zr:') === 0) {
            chart.getZr().on(event.slice(3), handler);
          } else {
            chart.on(event, handler);
          }
        }
      });
      // 增加实例属性
      Object.defineProperties(this, {
        width: {
          configurable: true,
          get: () => {
            return this.delegateGet('getWidth');
          }
        },
        height: {
          configurable: true,
          get: () => {
            return this.delegateGet('getHeight');
          }
        },
        isDisposed: {
          configurable: true,
          get: () => {
            return !!this.delegateGet('isDisposed');
          }
        },
        computedOptions: {
          configurable: true,
          get: () => {
            return this.delegateGet('getOption');
          }
        }
      });
      this.chart = chart;
    },
    /* 初始化options属性变化监听 */
    initOptionsWatcher() {
      if (this.__unwatchOptions) {
        this.__unwatchOptions();
        this.__unwatchOptions = null;
      }
      if (!this.manualUpdate) {
        this.__unwatchOptions = this.$watch(
          'option',
          (val, oldVal) => {
            if (!this.chart && val) {
              this.init();
            } else {
              this.chart.setOption(val, val !== oldVal);
            }
          },
          {deep: !this.watchShallow}
        );
      }
    },
    /* 显式修改options */
    mergeOptions(options, notMerge, lazyUpdate) {
      if (this.manualUpdate) {
        this.manualOptions = options;
      }
      if (!this.chart) {
        this.init(options);
      } else {
        this.delegateMethod('setOption', options, notMerge, lazyUpdate);
      }
    },
    /* 刷新echarts */
    refresh() {
      if (this.chart) {
        this.destroy();
        this.init();
      }
    },
    /* 销毁echarts */
    destroy() {
      this.dispose();
      this.chart = null;
    },
    /* echarts实例方法 */
    resize(options) {
      this.delegateMethod('resize', options);
    },
    appendData(params) {
      this.delegateMethod('appendData', params);
    },
    clear() {
      this.delegateMethod('clear');
    },
    showLoading(type, options) {
      this.delegateMethod('showLoading', type, options);
    },
    hideLoading() {
      this.delegateMethod('hideLoading');
    },
    dispatchAction(payload) {
      this.delegateMethod('dispatchAction', payload);
    },
    convertToPixel(finder, value) {
      return this.delegateMethod('convertToPixel', finder, value);
    },
    convertFromPixel(finder, value) {
      return this.delegateMethod('convertFromPixel', finder, value);
    },
    containPixel(finder, value) {
      return this.delegateMethod('containPixel', finder, value);
    },
    getDataURL(options) {
      return this.delegateMethod('getDataURL', options);
    },
    getConnectedDataURL(options) {
      return this.delegateMethod('getConnectedDataURL', options);
    },
    dispose() {
      this.delegateMethod('dispose');
    },
    /* 调用echarts实例方法 */
    delegateMethod(name, ...args) {
      if (!this.chart) {
        this.init();
      }
      return this.chart[name](...args);
    },
    /* 获取echarts属性 */
    delegateGet(methodName) {
      if (!this.chart) {
        this.init();
      }
      return this.chart[methodName]();
    }
  },
  /* echarts静态方法 */
  connect(group) {
    if (typeof group !== 'string') {
      group = group.map(chart => chart.chart);
    }
    echarts.connect(group);
  },
  disconnect(group) {
    echarts.disConnect(group);
  },
  getMap(mapName) {
    return echarts.getMap(mapName);
  },
  registerMap(mapName, geoJSON, specialAreas) {
    echarts.registerMap(mapName, geoJSON, specialAreas);
  },
  registerTheme(name, theme) {
    echarts.registerTheme(name, theme);
  },
  graphic: echarts.graphic
}
</script>
