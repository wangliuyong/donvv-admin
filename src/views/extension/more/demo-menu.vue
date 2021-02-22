<template>
  <el-card
    shadow="never"
    header="垂直导航"
    body-style="white-space: nowrap;overflow: auto;">
    <div style="margin-bottom: 20px;">
      <el-radio-group v-model="collapse">
        <el-radio :label="false">展开</el-radio>
        <el-radio :label="true">收起</el-radio>
      </el-radio-group>
    </div>
    <div style="width: 200px;display: inline-block;vertical-align: top;">
      <el-menu
        default-active="1-1"
        :collapse="collapse"
        mode="vertical">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-s-tools"></i>
            <span slot="title">系统管理</span>
          </template>
          <el-menu-item index="1-1">用户管理</el-menu-item>
          <el-menu-item index="1-2">角色管理</el-menu-item>
          <el-menu-item index="1-3">权限管理</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-s-opportunity"></i>
            <span slot="title">日志管理</span>
          </template>
          <el-menu-item index="2-1">登录日志</el-menu-item>
          <el-menu-item index="2-2">操作日志</el-menu-item>
          <el-menu-item index="2-3">错误日志</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-s-order"></i>
            <span slot="title">订单管理</span>
          </template>
          <el-menu-item index="3-1">
            <i class="el-icon-s-opportunity"></i>
            <span>订单查询</span>
          </el-menu-item>
          <el-menu-item index="3-2">
            <i class="el-icon-s-opportunity"></i>
            <span>退款记录</span>
          </el-menu-item>
          <el-menu-item index="3-3">
            <i class="el-icon-s-opportunity"></i>
            <span>订单报表</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="4">
          <i class="el-icon-s-opportunity"></i>
          <span>订单报表</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div style="width: 200px;display: inline-block;margin-left: 30px;vertical-align: top;">
      <el-menu
        default-active="1-1"
        :collapse="collapse"
        mode="vertical"
        class="ele-menu-dark">
        <el-submenu index="1" popper-class="ele-menu-dark">
          <template slot="title">
            <i class="el-icon-s-tools"></i>
            <span slot="title">系统管理</span>
          </template>
          <el-menu-item index="1-1">用户管理</el-menu-item>
          <el-menu-item index="1-2">角色管理</el-menu-item>
          <el-menu-item index="1-3">权限管理</el-menu-item>
        </el-submenu>
        <el-submenu index="2" popper-class="ele-menu-dark">
          <template slot="title">
            <i class="el-icon-s-opportunity"></i>
            <span slot="title">日志管理</span>
          </template>
          <el-menu-item index="2-1">登录日志</el-menu-item>
          <el-menu-item index="2-2">操作日志</el-menu-item>
          <el-menu-item index="2-3">错误日志</el-menu-item>
        </el-submenu>
        <el-submenu index="3" popper-class="ele-menu-dark">
          <template slot="title">
            <i class="el-icon-s-order"></i>
            <span slot="title">订单管理</span>
          </template>
          <el-menu-item index="3-1">
            <i class="el-icon-s-opportunity"></i>
            <span>订单查询</span>
          </el-menu-item>
          <el-menu-item index="3-2">
            <i class="el-icon-s-opportunity"></i>
            <span>退款记录</span>
          </el-menu-item>
          <el-menu-item index="3-3">
            <i class="el-icon-s-opportunity"></i>
            <span>订单报表</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="4">
          <i class="el-icon-s-opportunity"></i>
          <span>订单报表</span>
        </el-menu-item>
      </el-menu>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'DemoMenu',
  data() {
    return {
      collapse: false
    }
  }
}
</script>

<style scoped>
.demo-menu-item + .demo-menu-item {
  margin-top: 40px;
}

.demo-menu-item-nav {
  max-width: 800px;
  min-width: 470px;
}
</style>
