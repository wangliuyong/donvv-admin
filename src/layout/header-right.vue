<!-- 顶栏右侧区域按钮 -->
<template>
  <div class="ele-admin-header-tool">
    <div
      class="ele-admin-header-tool-item"
      @click="toggleFullscreen">
      <i :class="isFullscreen?'el-icon-_screen-restore':'el-icon-_screen-full'"></i>
    </div>
    <!-- 消息通知 -->
    <div class="ele-admin-header-tool-item">
      <ele-notice/>
    </div>
    <!-- 用户信息 -->
    <div class="ele-admin-header-tool-item">
      <el-dropdown @command="onUserDropClick">
        <div class="ele-admin-header-avatar">
          <el-avatar :src="loginUser.avatar"/>
          <span>{{ loginUser.nickname }}</span>
          <i class="el-icon-arrow-down"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            command="user"
            icon="el-icon-user">个人中心
          </el-dropdown-item>
          <el-dropdown-item
            command="password"
            icon="el-icon-key">修改密码
          </el-dropdown-item>
          <el-dropdown-item
            command="logout"
            icon="el-icon-switch-button"
            divided>退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 主题设置 -->
    <div
      class="ele-admin-header-tool-item"
      v-if="showSetting"
      @click="openSetting">
      <i class="el-icon-_more"></i>
    </div>
  </div>
</template>

<script>
import EleNotice from './notice';

export default {
  name: 'EleHeaderRight',
  components: {EleNotice},
  props: {
    // 是否显示打开设置抽屉按钮
    showSetting: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    // 当前登录用户信息
    loginUser() {
      return this.$store.state.user.user;
    }
  },
  data() {
    return {
      // 是否全屏状态
      isFullscreen: false
    };
  },
  methods: {
    /* 个人信息下拉菜单点击 */
    onUserDropClick(command) {
      if (command === 'user') {
        if (this.$route.fullPath !== '/user/info') {
          this.$router.push('/user/info');
        }
      } else if (command === 'password') {
        this.$emit('item-click', 'password');
      } else if (command === 'logout') {
        // 退出登录
        this.$confirm(
          '确定要退出登录吗?',
          '提示',
          {type: 'warning'}
        ).then(() => {
          // 清除缓存的token
          this.$store.dispatch('user/setToken').then(() => {
            location.replace('/');
          });
        }).catch(() => {
        });
      }
    },
    /* 打开设置抽屉 */
    openSetting() {
      this.$emit('item-click', 'setting');
    },
    /* 全屏切换 */
    toggleFullscreen() {
      try {
        this.isFullscreen = this.$util.toggleFullscreen();
      } catch (e) {
        this.$message.error('您的浏览器不支持全屏模式');
      }
    }
  }
}
</script>
