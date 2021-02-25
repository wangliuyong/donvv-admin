<!-- 侧边栏 license by http://eleadmin.com -->
<template>
  <div class="ele-admin-sidebar ele-scrollbar-hide">
    <slot name="top"/>
    <el-menu
      :collapse="isCollapse"
      :default-active="active"
      :collapse-transition="false"
      :class="{'ele-menu-dark': sideStyle===1}"
      :unique-opened="sideUniqueOpen"
      @select="onSelect">
      <template v-for="menu in menus">
        <ele-pro-sidebar-item
          v-if="!menu.meta.hide"
          :key="menu.path"
          :item="menu"
          :pop-class="sideStyle===1?'ele-menu-dark':''"/>
      </template>
    </el-menu>
    <slot name="bottom"/>
  </div>
</template>

<script>
import EleProSidebarItem from '../../ele-pro-sidebar-item';

export default {
  name: 'EleProSidebar',
  components: {EleProSidebarItem},
  emits: ['reload-page', 'update-collapse'],
  props: {
    // 全部菜单数据
    data: Array,
    // 侧边栏风格
    sideStyle: Number,
    // 侧边栏是否只保持一个子菜单展开
    sideUniqueOpen: Boolean,
    // 布局风格
    layoutStyle: Number,
    // 屏幕宽度
    screenWidth: Number,
    // 是否折叠
    collapse: Boolean
  },
  data() {
    return {
      // 外链选中控制
      showActive: true
    };
  },
  computed: {
    // 左侧菜单数据
    menus() {
      let menus = this.data;
      if (!menus || !menus.length) {
        const routes = this.$router.options.routes.filter(d => d.path === '/');
        menus = routes.length ? routes[0].children : [];
      }
      // 混合导航
      if (this.layoutStyle === 2 && this.screenWidth >= 768) {
        const matched = this.$route.matched;
        if (matched.length > 1) {
          const temps = menus.filter(d => d.path === matched[1].path);
          return temps.length ? temps[0].children : [];
        } else {
          return [];
        }
      }
      return menus;
    },
    // 是否折叠menu
    isCollapse() {
      return this.screenWidth < 768 ? false : this.collapse;
    },
    // 侧边栏选中
    active() {
      if (!this.showActive) {
        return null;
      }
      const current = this.$route;
      if (current.meta && current.meta.uid) {
        return current.meta.uid;
      }
      return current.path;
    }
  },
  methods: {
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
          this.$emit('reload-page');
        } else {
          this.$router.push(index);
        }
      }
      // 小屏幕下自动收起侧边栏
      if (this.screenWidth < 768) {
        this.$emit('update-collapse', true);
      }
    }
  }
}
</script>
