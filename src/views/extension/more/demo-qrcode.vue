<template>
  <el-card
    shadow="never"
    header="二维码">
    <vue-qr
      :text="text"
      :size="100"
      :margin="0"/>
    <div style="display: inline-block;margin: 15px 10px 0 15px;width: 160px;vertical-align: bottom;">
      <el-input
        v-model="text"
        size="mini"/>
    </div>
  </el-card>
</template>

<script>
import VueQr from 'vue-qr'

export default {
  name: 'DemoQrcode',
  components: {VueQr},
  data() {
    return {
      text: 'https://eleadmin.com'  // 二维码内容
    }
  }
}
</script>

<style scoped>
</style>
