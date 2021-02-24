<template>
  <div>
    987879787978
  </div>
</template>

<script>
export default {
  name: 'Shop',
  data() {
    return {
      // 登录框方向, 0居中, 1居右, 2居左
      direction: 0,
      // 加载状态
      loading: false,
      // 表单数据
      form: {
        identity: 'admin',
        password: 'admin',
        // code: '',
        remember: true
      },
      // 表单验证规则
      rules: {
        identity: [
          {required: true, message: '请输入账号', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
      },
    }
  },
  mounted() {
    if (this.$store.state.user.token) {
      this.goHome();
    }
    // this.changeCode();
  },
  methods: {}
    
}
</script>

<style scoped>

</style>
