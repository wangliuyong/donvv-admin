<template>
  <ele-pro-layout
    :collapse="theme.collapse"
    :fixed-header="theme.fixedHeader"
    :fixed-sidebar="theme.fixedSidebar"
    :fixed-body="theme.fixedBody"
    :layout-style="theme.layoutStyle"
    :head-style="theme.headStyle"
    :side-style="theme.sideStyle"
    :logo-auto-size="theme.logoAutoSize"
    :colorful-icon="theme.colorfulIcon"
    :side-unique-open="theme.sideUniqueOpen"
    :show-tabs="theme.showTabs"
    :tab-style="theme.tabStyle"
    :body-full="theme.bodyFull"
    :keep-alive-list="keepAliveList"
    :home-title="homeTitle"
    :project-name="projectName"
    :tabs="user.tabs"
    :menus="user.menus"
    :need-setting="needSetting"
    :show-setting.sync="showSetting"
    :color="theme.color"
    :dark-mode="theme.darkMode"
    :weak-mode="theme.weakMode"
    :show-content="showContent"
    @update-collapse="updateCollapse"
    @update-screen="updateScreen"
    @tab-add="tabAdd"
    @tab-remove="tabRemove"
    @tab-remove-left="tabRemoveLeft"
    @tab-remove-right="tabRemoveRight"
    @tab-remove-other="tabRemoveOther"
    @tab-remove-all="tabRemoveAll"
    @change-color="changeColor"
    @change-style="changeStyle">
    <!-- logo图标 -->
    <template slot="logo">
      <img @click="toIndex" src="@/assets/logo.svg" alt="logo"/>
    </template>
    <!-- 顶栏右侧区域 -->
    <template slot="right">
      <ele-header-right
        :show-setting="needSetting"
        @item-click="onItemClick"/>
    </template>
    <!-- 修改密码弹窗 -->
    <ele-password :visible.sync="showPassword"/>
  </ele-pro-layout>
</template>

<script>
import {mapGetters} from 'vuex';
import setting from '@/config/setting';
import EleHeaderRight from './header-right';
import ElePassword from './password';

export default {
  name: 'EleLayout',
  components: {
    EleHeaderRight,
    ElePassword
  },
  computed: {
    // 主页标题
    homeTitle() {
      return setting.homeTitle;
    },
    // 需要缓存的组件
    keepAliveList() {
      return setting.keepAliveList;
    },
    // 是否需要主题设置按钮
    needSetting() {
      return setting.showSetting;
    },
    ...mapGetters(['theme', 'user'])
  },
  data() {
    return {
      // 项目名
      projectName: process.env.VUE_APP_NAME,
      // 是否显示修改密码弹窗
      showPassword: false,
      // 是否显示主题设置抽屉
      showSetting: false,
      // 是否显示主体部分, 如果你的首页用到了权限控制指令, 把这个改成false, 避免权限控制指令可能不生效
      showContent: true
    };
  },
  created(){
    if(this.$route.path == '/index'){
      this.$store.dispatch('theme/set',{
        showTabs:null,
        layoutStyle:1
      })
      console.log(45445454);
    }
  },
  mounted() {
    // 获取用户信息
    this.getUserInfo();
  },
  methods: {
    // 去首页
    toIndex(){
      if(this.$route.path !== '/index'){
        this.$router.push('/index')
      }
    },
    /* 获取当前用户信息 */
    getUserInfo() {
      if (setting.userUrl) {
        this.$http.get(setting.userUrl).then(res => {
          let result;
          if (setting.parseUser) {
            result = setting.parseUser(res.data);
          } else {
            result = res.data;
          }
          if (res.data.code === 0) {
            const user = result.data;
            this.$store.dispatch('user/setUser', user);
            this.$store.dispatch('user/setRoles', user ? user.roles : null);
            this.$store.dispatch('user/setAuthorities', user ? user.authorities : null);
          } else {
            this.$message.error(res.data.msg);
          }
          // 在用户权限信息请求完成后再渲染主体部分, 以免权限控制指令不生效
          this.showContent = true;
        }).catch(e => {
          this.showContent = true;
          this.$message.error(e.message);
        });
      }
    },
    /* 顶栏右侧点击 */
    onItemClick(key) {
      if (key === 'password') {
        this.showPassword = true;
      } else if (key === 'setting') {
        this.showSetting = true;
      }
    },
    /* 更新collapse */
    updateCollapse(value) {
      this.$store.dispatch('theme/set', {
        key: 'collapse',
        value: value
      });
    },
    /* 更新屏幕尺寸 */
    updateScreen() {
      this.$store.dispatch('theme/updateScreen');
    },
    /* 切换主题色 */
    changeColor(value) {
      const loading = this.$loading({
        lock: true,
        background: 'transparent'
      });
      this.$store.dispatch('theme/setColor', value).then(() => {
        loading.close();
      }).catch(e => {
        loading.close();
        console.error(e);
        this.$message.error('主题加载失败');
      });
    },
    /* 切换主题风格 */
    changeStyle(value) {
      this.$store.dispatch('theme/set', value);
    },
    /* 添加tab */
    tabAdd(value) {
      this.$store.dispatch('user/tabAdd', value);
    },
    /* 移除tab */
    tabRemove(obj) {
      this.$store.dispatch('user/tabRemove', obj.name).then(last => {
        if (obj.active === obj.name) {
          this.$router.push(last === -1 ? '/' : this.user.tabs[last].path);
        }
      });
    },
    /* 移除左边tab */
    tabRemoveLeft(value) {
      this.$store.dispatch('user/tabRemoveLeft', value);
    },
    /* 移除右边tab */
    tabRemoveRight(value) {
      this.$store.dispatch('user/tabRemoveRight', value);
    },
    /* 移除其它tab */
    tabRemoveOther(value) {
      this.$store.dispatch('user/tabRemoveOther', value);
    },
    /* 移除全部tab */
    tabRemoveAll() {
      this.$store.dispatch('user/tabRemoveAll');
    }
  }
}
</script>
