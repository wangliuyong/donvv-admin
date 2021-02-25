<!-- 面包屑导航 license by http://eleadmin.com -->
<template>
  <el-breadcrumb
    :separator="breadcrumbSeparator"
    class="ele-admin-breadcrumb">
    <el-breadcrumb-item
      v-for="(d,i) in levels"
      :key="i"
      :to="d.home?'/':null">
      {{ d.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'EleProBreadcrumb',
  props: {
    // 主页标题
    homeTitle: String,
    // 面包屑导航分隔符
    breadcrumbSeparator: String
  },
  data() {
    return {
      // 面包屑数据
      levels: []
    };
  },
  mounted() {
    this.onRouteChange();
  },
  methods: {
    /* 处理路由切换 */
    onRouteChange() {
      const current = this.$route,
        path = current.path,
        matched = current.matched;
      let levels = [];
      if (path !== '/' && !(matched.length && matched[0].redirect === path)) {
        levels.push({
          home: true,
          meta: {
            title: this.homeTitle
          }
        });
      }
      matched.forEach(d => {
        if (d.meta && d.meta.title && d.meta.breadcrumb !== false) {
          levels.push(d);
        }
      });
      this.levels = levels;
    }
  },
  watch: {
    $route() {
      this.onRouteChange();
    }
  }
}
</script>
