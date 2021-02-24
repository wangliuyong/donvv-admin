<template>
  <div :class="classes">
    <div class="ele-exception-img">
      <img src="@/assets/ic-403.svg" alt="">
    </div>
    <div class="ele-exception-content ele-text-left">
      <h1 class="ele-text">403</h1>
      <p class="ele-text-secondary">抱歉，你无权访问该页面</p>
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
  name: 'Exception403',
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
