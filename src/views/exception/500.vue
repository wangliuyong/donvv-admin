<template>
  <div :class="classes">
    <div class="ele-exception-img">
      <img src="@/assets/ic-500.svg" alt="">
    </div>
    <div class="ele-exception-content ele-text-left">
      <h1 class="ele-text">500</h1>
      <p class="ele-text-secondary">抱歉，服务器出错了</p>
      <div>
        <el-button
          type="primary"
          @click="$router.push('/')">返回首页
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Exception500',
  computed: {
    classes() {
      return [
        'ele-exception ele-text-center',
        { 'ele-exception-dark': this.$store.state.theme.darkMode }
      ]
    }
  }
}
</script>
