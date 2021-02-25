<!-- 顶栏 license by http://eleadmin.com -->
<template>
  <div :class="['ele-admin-header', {'ele-bg-primary': headStyle === 2}]">
    <!-- logo -->
    <div class="ele-admin-logo">
      <slot name="logo"/>
      <span v-if="projectName">{{ projectName }}</span>
    </div>
    <!-- 左侧功能区 -->
    <div class="ele-admin-header-tool" v-if="showLeft">
      <div
        v-if="showCollapse"
        class="ele-admin-header-tool-item"
        @click="toggleCollapse">
        <i :class="collapse?'el-icon-_unfold':'el-icon-_fold'"></i>
      </div>
      <div
        v-if="showRefresh"
        class="ele-admin-header-tool-item"
        @click="reloadPage">
        <i class="el-icon-refresh-right"></i>
      </div>
      <slot name="left"/>
    </div>
    <!-- 面包屑导航 -->
    <ele-pro-breadcrumb
      v-if="layoutStyle===0"
      :home-title="homeTitle"
      :breadcrumb-separator="breadcrumbSeparator"/>
    <!-- 顶部菜单区 -->
    <el-menu
      :default-active="active"
      mode="horizontal"
      @mousewheel.native="scrollHeaderNav"
      :class="['ele-admin-header-nav', {'ele-menu-dark': headStyle!==0}]"
      @select="onSelect">
      <template v-for="menu in menus">
        <ele-pro-sidebar-item
          v-if="!menu.meta.hide"
          :key="menu.path"
          :item="menu"/>
      </template>
    </el-menu>
    <!-- 右侧功能区 -->
    <slot name="right"/>
  </div>
</template>

<script>
import EleProBreadcrumb from '../../ele-pro-breadcrumb';
import EleProSidebarItem from '../../ele-pro-sidebar-item';

export default {
  name: 'ELeProHeader',
  components: {
    EleProBreadcrumb,
    EleProSidebarItem
  },
  emits: ['toggle-collapse', 'reload-page'],
  props: {
    // 项目名
    projectName: [String, Boolean],
    // 主页标题
    homeTitle: String,
    // 全部菜单数据
    data: Array,
    // 顶栏风格
    headStyle: Number,
    // 布局风格
    layoutStyle: Number,
    // 屏幕宽度
    screenWidth: Number,
    // 是否折叠
    collapse: Boolean,
    // 是否显示折叠按钮
    showCollapse: Boolean,
    // 是否显示刷新按钮
    showRefresh: Boolean,
    // 面包屑导航分隔符
    breadcrumbSeparator: String
  },
  data() {
    return {
      // 导航滚动节流
      canScroll: true,
      // 外链选中控制
      showActive: true
    };
  },
  computed: {
    // 菜单数据
    menus() {
      if (this.layoutStyle === 0 || this.screenWidth < 768) {
        return [];
      }
      let menus = this.data;
      if (!menus || !menus.length) {
        const routes = this.$router.options.routes.filter(d => d.path === '/');
        menus = routes.length ? routes[0].children : [];
      }
      if (this.layoutStyle === 1) {
        return menus;
      }
      return menus.map(d => Object.assign({}, d, {children: null}));
    },
    // 菜单选中
    active() {
      if (!this.showActive) {
        return null;
      }
      const matched = this.$route.matched;
      if (matched.length) {
        let match = matched[matched.length - 1];
        if (matched.length > 1 && this.layoutStyle === 2) {
          match = matched[1];
        }
        return (match.meta && match.meta.uid) || match.path;
      }
      return null;
    },
    // 是否显示左侧按钮
    showLeft() {
      return this.layoutStyle !== 1 || this.screenWidth < 768;
    }
  },
  methods: {
    /* 折叠展开侧栏 */
    toggleCollapse() {
      this.$emit('toggle-collapse');
    },
    /* 刷新页面 */
    reloadPage() {
      this.$emit('reload-page');
    },
    /* 滚动顶栏导航 */
    scrollHeaderNav(e) {
      e.stopPropagation();
      e.preventDefault();
      if (!this.canScroll) {
        return;
      }
      this.canScroll = false;
      let elem = e.currentTarget;
      const delta = e.wheelDelta || e.detail;
      if (delta > 0) {
        elem.scrollLeft -= elem.clientWidth;
      } else if (delta < 0) {
        elem.scrollLeft += elem.clientWidth;
      }
      setTimeout(() => {
        this.canScroll = true;
      }, 300);
    },
    /* 菜单点击事件 */
    onSelect(index) {
      let isUrl = index.startsWith('http://') || index.startsWith('https://') || index.startsWith('//');
      if (isUrl) {
        window.open(index);
        this.showActive = false;
        this.$nextTick(() => {
          this.showActive = true;
        });
      } else {
        const path = this.$route.fullPath;
        if (path === index) {
          this.reloadPage();
        } else {
          this.$router.push(index);
        }
      }
    }
  }
}
</script>
