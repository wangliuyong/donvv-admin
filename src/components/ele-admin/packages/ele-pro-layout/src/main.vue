<!-- ele admin 布局 license by http://eleadmin.com -->
<template>
  <div :class="layoutClass">
    <!-- 顶栏 -->
    <ele-pro-header
      :project-name="projectName"
      :home-title="homeTitle"
      :data="menus"
      :head-style="headStyle"
      :layout-style="layoutStyle"
      :screen-width="screenWidth"
      :collapse="collapse"
      :show-collapse="showCollapse"
      :show-refresh="showRefresh"
      :breadcrumb-separator="breadcrumbSeparator"
      @reload-page="reloadPage"
      @toggle-collapse="toggleCollapse">
      <template slot="logo">
        <slot name="logo">
          <img src="https://cdn.eleadmin.com/20200610/logo.svg" alt="logo"/>
        </slot>
      </template>
      <template slot="left">
        <slot name="left"/>
      </template>
      <template slot="right">
        <slot name="right"/>
      </template>
    </ele-pro-header>
    <div class="ele-admin-main">
      <!-- 侧栏 -->
      <ele-pro-sidebar
        v-if="showSidebar"
        :data="menus"
        :side-style="sideStyle"
        :side-unique-open="sideUniqueOpen"
        :layout-style="layoutStyle"
        :screen-width="screenWidth"
        :collapse="collapse"
        @reload-page="reloadPage"
        @update-collapse="updateCollapse">
        <template slot="top">
          <slot name="top"/>
        </template>
        <template slot="bottom">
          <slot name="bottom"/>
        </template>
      </ele-pro-sidebar>
      <!-- 主体 -->
      <div class="ele-admin-body">
        <!-- 多页签 -->
        <ele-pro-tabs
          v-if="showTabs"
          :home-title="homeTitle"
          :tabs="tabs"
          :show-refresh="showTabRefresh"
          @reload-page="reloadPage"
          @tab-add="tabAdd"
          @tab-remove="tabRemove"
          @tab-remove-left="tabRemoveLeft"
          @tab-remove-right="tabRemoveRight"
          @tab-remove-other="tabRemoveOther"
          @tab-remove-all="tabRemoveAll"/>
        <!-- 内容区域 -->
        <div v-if="showContent" class="ele-admin-content">
          <keep-alive :include="keepAliveList">
            <router-view v-if="!reloading"/>
          </keep-alive>
        </div>
        <slot name="footer"/>
      </div>
    </div>
    <!-- 小屏幕下遮罩层 -->
    <div
      class="ele-admin-shade"
      @click="toggleCollapse">
    </div>
    <!-- 主题设置抽屉 -->
    <ele-pro-setting
      v-if="needSetting"
      :visible="showSetting"
      :tips="tips"
      :themes="themes"
      :color="color"
      :fixed-header="fixedHeader"
      :fixed-sidebar="fixedSidebar"
      :fixed-body="fixedBody"
      :layout-style="layoutStyle"
      :head-style="headStyle"
      :side-style="sideStyle"
      :logo-auto-size="logoAutoSize"
      :colorful-icon="colorfulIcon"
      :side-unique-open="sideUniqueOpen"
      :show-tabs="showTabs"
      :tab-style="tabStyle"
      :body-full="bodyFull"
      :dark-mode="darkMode"
      :weak-mode="weakMode"
      @change-color="changeColor"
      @change-style="changeStyle"
      @update:visible="updateVisible"/>
    <!-- 自定义内容 -->
    <slot/>
  </div>
</template>

<script>
import NProgress from 'nprogress';
import {debounce} from 'throttle-debounce';
import EleProHeader from '../../ele-pro-header';
import EleProSidebar from '../../ele-pro-sidebar';
import EleProTabs from '../../ele-pro-tabs';
import EleProSetting from '../../ele-pro-setting';

export default {
  name: 'EleProLayout',
  components: {
    EleProHeader,
    EleProSidebar,
    EleProTabs,
    EleProSetting
  },
  emits: [
    'update-collapse',
    'update-screen',
    'tab-add',
    'tab-remove',
    'tab-remove-left',
    'tab-remove-right',
    'tab-remove-other',
    'tab-remove-all',
    'change-color',
    'change-style',
    'update:show-setting'
  ],
  props: {
    // 是否折叠
    collapse: {
      type: Boolean,
      default: false
    },
    // 是否固定顶栏
    fixedHeader: {
      type: Boolean,
      default: false
    },
    // 是否固定侧栏
    fixedSidebar: {
      type: Boolean,
      default: true
    },
    // 是否固定主体
    fixedBody: {
      type: Boolean,
      default: false
    },
    // 布局风格
    layoutStyle: {
      type: Number,
      default: 0
    },
    // 顶栏风格
    headStyle: {
      type: Number,
      default: 0
    },
    // 侧边栏风格
    sideStyle: {
      type: Number,
      default: 1
    },
    // logo是否自适应宽度
    logoAutoSize: {
      type: Boolean,
      default: false
    },
    // 侧栏是否多彩图标
    colorfulIcon: {
      type: Boolean,
      default: false
    },
    // 侧边栏是否只保持一个子菜单展开
    sideUniqueOpen: {
      type: Boolean,
      default: true
    },
    // 是否开启多标签
    showTabs: {
      type: Boolean,
      default: true
    },
    // 标签页风格
    tabStyle: {
      type: Number,
      default: 0
    },
    // 内容区域宽度是否铺满
    bodyFull: {
      type: Boolean,
      default: true
    },
    // 是否暗黑模式
    darkMode: Boolean,
    // 是否色弱模式
    weakMode: Boolean,
    // 当前主题色
    color: String,
    // 需要缓存的组件
    keepAliveList: Array,
    // 主页标题
    homeTitle: {
      type: String,
      default: '主页'
    },
    // 项目名
    projectName: {
      type: [String, Boolean],
      default: 'Ele Admin'
    },
    // 是否显示折叠按钮
    showCollapse: {
      type: Boolean,
      default: true
    },
    // 是否显示刷新按钮
    showRefresh: {
      type: Boolean,
      default: true
    },
    // 面包屑导航分隔符
    breadcrumbSeparator: {
      type: String,
      default: '/'
    },
    // 标签页数据
    tabs: {
      type: Array,
      default() {
        return [];
      }
    },
    // 全部菜单数据
    menus: {
      type: Array,
      default() {
        return [];
      }
    },
    // 是否需要主题设置抽屉
    needSetting: {
      type: Boolean,
      default: true
    },
    // 是否打开主题设置抽屉, 支持.sycn修饰
    showSetting: Boolean,
    // 主题设置抽屉界面提示文字
    tips: {
      type: [String, Boolean],
      default: '该功能可实时预览各种布局效果, 修改后会缓存在本地, 下次打开会记忆主题配置.'
    },
    // 主题设置抽屉界面显示的主题列表
    themes: {
      type: Array,
      default() {
        return [
          {name: '拂晓蓝', value: null, color: '#409eff'},
          {name: '薄暮', value: 'dust', color: '#5f80c7'},
          {name: '日暮', value: 'sunset', color: '#faad14'},
          {name: '火山', value: 'volcano', color: '#f5686f'},
          {name: '酱紫', value: 'purple', color: '#9266f9'},
          {name: '明青', value: 'cyan', color: '#2bccce'},
          {name: '极光绿', value: 'green', color: '#33cc99'},
          {name: '极客蓝', value: 'geekblue', color: '#32a2d4'}
        ];
      }
    },
    // 是否显示主体部分
    showContent: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    // 布局class
    layoutClass() {
      return [
        'ele-admin-layout',
        // 折叠侧栏
        {'ele-admin-collapse': this.collapse},
        // 固定顶栏
        {'ele-admin-fixed-header': this.fixedHeader},
        // 固定侧栏
        {'ele-admin-fixed-sidebar': this.fixedSidebar && this.layoutStyle !== 1},
        // 固定主体
        {'ele-admin-fixed-body': this.fixedBody},
        // 暗色顶栏
        {'ele-admin-head-dark': this.headStyle !== 0},
        // 暗色侧栏
        {'ele-admin-side-dark': this.sideStyle === 1},
        // 侧栏彩色图标
        {'ele-admin-side-colorful': this.colorfulIcon},
        // logo宽度自适应
        {'ele-admin-logo-auto': this.logoAutoSize || this.layoutStyle === 1},
        // 开启多页签
        {'ele-admin-show-tabs': this.showTabs},
        // 圆点风格页签
        {'ele-admin-tab-dot': this.tabStyle === 1},
        // 卡片风格页签
        {'ele-admin-tab-card': this.tabStyle === 2},
        // 主体内容定宽
        {'ele-admin-body-limit': !this.bodyFull}
      ]
    },
    // 是否显示侧栏
    showSidebar() {
      return this.layoutStyle !== 1 || this.screenWidth < 768;
    },
    // tab右侧下拉是否显示刷新按钮
    showTabRefresh() {
      return this.layoutStyle === 1 && this.screenWidth >= 768;
    }
  },
  data() {
    const screenWidth = document.documentElement.clientWidth || document.body.clientWidth;
    return {
      // 是否正在刷新
      reloading: false,
      // 屏幕宽度
      screenWidth: screenWidth,
      // 窗口大小改变监听器
      onResizeListener: debounce(300, false, () => {
        this.updateScreen();
      })
    };
  },
  mounted() {
    // 监听浏览器窗口大小改变
    window.addEventListener('resize', this.onResizeListener);
  },
  methods: {
    /* 折叠展开侧栏 */
    toggleCollapse() {
      this.updateCollapse(!this.collapse);
    },
    /* 更新侧栏折叠状态 */
    updateCollapse(value) {
      this.$emit('update-collapse', value);
    },
    /* 刷新页面 */
    reloadPage() {
      if (this.reloading) {
        return;
      }
      this.reloading = true;
      NProgress.start();
      this.$nextTick(() => {
        this.reloading = false;
        setTimeout(() => {
          NProgress.done(true);
        }, 300);
      });
    },
    /* 更新屏幕尺寸 */
    updateScreen() {
      this.screenWidth = document.documentElement.clientWidth || document.body.clientWidth;
      this.$emit('update-screen', {
        width: this.screenWidth,
        height: document.documentElement.clientHeight || document.body.clientHeight
      });
    },
    /* 添加tab */
    tabAdd(value) {
      this.$emit('tab-add', value);
    },
    /* 移除tab */
    tabRemove(value) {
      this.$emit('tab-remove', value);
    },
    /* 移除左边tab */
    tabRemoveLeft(value) {
      this.$emit('tab-remove-left', value);
    },
    /* 移除右边tab */
    tabRemoveRight(value) {
      this.$emit('tab-remove-right', value);
    },
    /* 移除其它tab */
    tabRemoveOther(value) {
      this.$emit('tab-remove-other', value);
    },
    /* 移除全部tab */
    tabRemoveAll(value) {
      this.$emit('tab-remove-all', value);
    },
    /* 切换主题色 */
    changeColor(value) {
      this.$emit('change-color', value);
    },
    /* 切换主题风格 */
    changeStyle(value) {
      this.$emit('change-style', value);
    },
    /* 修改visible */
    updateVisible(value) {
      this.$emit('update:show-setting', value);
    }
  },
  destroyed() {
    // 销毁浏览器窗口大小改变监听
    window.removeEventListener('resize', this.onResizeListener);
  }
}
</script>
