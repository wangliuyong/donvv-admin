<!-- 标签页 license by http://eleadmin.com -->
<template>
  <div class="ele-admin-tabs">
    <el-tabs
      v-model="active"
      @tab-click="onTabClick"
      @tab-remove="onTabRemove">
      <el-tab-pane
        name="/"
        :label="homeTitle"/>
      <el-tab-pane
        v-for="d in tabs"
        :key="d.path"
        :name="d.path"
        :label="d.title"
        :closable="true"/>
    </el-tabs>
    <el-dropdown
      class="ele-admin-tabs-drop"
      @command="onDropClick">
      <i class="el-icon-arrow-down"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          command="reload"
          icon="el-icon-refresh-right"
          v-if="showRefresh">刷新当前
        </el-dropdown-item>
        <el-dropdown-item
          command="left"
          icon="el-icon-back">关闭左侧
        </el-dropdown-item>
        <el-dropdown-item
          command="right"
          icon="el-icon-right">关闭右侧
        </el-dropdown-item>
        <el-dropdown-item
          command="other"
          icon="el-icon-close">关闭其他
        </el-dropdown-item>
        <el-dropdown-item
          command="all"
          icon="el-icon-circle-close">关闭全部
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'EleProTabs',
  emits: [
    'tab-add',
    'tab-remove',
    'tab-remove-left',
    'tab-remove-right',
    'tab-remove-other',
    'tab-remove-all',
    'reload-page'
  ],
  props: {
    // 主页标题
    homeTitle: String,
    // 标签页数据
    tabs: Array,
    // 右侧下拉是否显示刷新按钮
    showRefresh: Boolean
  },
  data() {
    return {
      // 当前选中页签
      active: '/'
    };
  },
  mounted() {
    this.onRouteChange();
  },
  methods: {
    /* 处理路由切换 */
    onRouteChange() {
      const current = this.$route,
        path = current.fullPath;
      if (this.isHome(path)) {
        this.active = '/';
      } else {
        const title = current.meta ? current.meta.title : '';
        this.$emit('tab-add', {
          path: path,
          title: title
        });
        this.active = path;
      }
    },
    /* 是否是主页 */
    isHome(path) {
      if (path === '/') {
        return true;
      }
      const matched = this.$route.matched;
      return matched.length && matched[0].redirect === path;
    },
    /* 处理tab点击 */
    onTabClick(tab) {
      const path = this.$route.fullPath;
      if (path === tab.name) {
        return;
      }
      if (tab.name === '/' && this.isHome(path)) {
        return;
      }
      this.$router.push(tab.name);
    },
    /* 处理tab编辑 */
    onTabRemove(name) {
      this.$emit('tab-remove', {
        name: name,
        active: this.active
      });
    },
    /* 下拉菜单点击 */
    onDropClick(command) {
      if (command === 'left') {  // 关闭左侧
        this.$emit('tab-remove-left', this.active);
      } else if (command === 'right') {  // 关闭右侧
        if (this.active === '/') {
          this.removeAllTab();
        } else {
          this.$emit('tab-remove-right', this.active);
        }
      } else if (command === 'other') {  // 关闭其他
        this.$emit('tab-remove-other', this.active);
      } else if (command === 'all') {  // 关闭全部
        this.removeAllTab();
        if (this.active !== '/') {
          this.$router.push('/');
        }
      } else if (command === 'reload') {  // 刷新当前
        this.reloadPage();
      }
    },
    /* 关闭全部Tab */
    removeAllTab() {
      this.$emit('tab-remove-all');
    },
    /* 刷新页面 */
    reloadPage() {
      this.$emit('reload-page');
    }
  },
  destroyed() {
    this.removeAllTab();
  },
  watch: {
    $route() {
      this.onRouteChange();
    }
  }
}
</script>
