<!-- 侧边栏菜单 item license by http://eleadmin.com -->
<template>
  <el-submenu
    v-if="haveChildren"
    :index="item.path"
    :popper-class="popClass"
    :popper-append-to-body="false">
    <template slot="title">
      <i v-if="item.meta.icon" :class="item.meta.icon"></i>
      <span slot="title">{{ item.meta.title }}</span>
    </template>
    <template v-for="child in item.children">
      <ele-pro-sidebar-item
        v-if="!child.meta.hide"
        :key="child.path"
        :item="child"
        :pop-class="popClass"/>
    </template>
  </el-submenu>
  <el-menu-item v-else :index="item.path">
    <i v-if="item.meta.icon" :class="item.meta.icon"></i>
    <span slot="title">{{ item.meta.title }}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: 'EleProSidebarItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    popClass: String
  },
  computed: {
    /* 是否有子级 */
    haveChildren() {
      if (!this.item.children) {
        return false;
      }
      return this.item.children.filter(d => !d.meta.hide).length > 0;
    }
  }
}
</script>
