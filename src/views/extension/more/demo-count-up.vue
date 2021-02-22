<template>
  <el-card shadow="never" header="数字动画">
    <h1>
      <vue-count-up
        :endVal="countUpVal"
        :delay="0"
        :options="countUpOptions"
        @ready="onCountUpReady"/>
    </h1>
    <div style="margin-top: 15px;">
      <el-button
        @click="startCountUp"
        size="mini">重新开始
      </el-button>
      <el-button
        @click="updateCountUp"
        size="mini">更新数字
      </el-button>
    </div>
  </el-card>
</template>

<script>
import VueCountUp from 'vue-countup-v2'

export default {
  name: 'DemoCountUp',
  components: {VueCountUp},
  data() {
    return {
      // countUp值
      countUpVal: 6317,
      // countUp配置
      countUpOptions: {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
        prefix: '',
        suffix: ''
      },
      // countUp实例
      countUpIns: null,
    };
  },
  methods: {
    /* countUp渲染完成 */
    onCountUpReady(instance) {
      this.countUpIns = instance;
    },
    /* countUp重新开始 */
    startCountUp() {
      if (!this.countUpIns) {
        return;
      }
      this.countUpIns.reset();
      this.countUpIns.start();
    },
    /* countUp更新 */
    updateCountUp() {
      if (!this.countUpIns) {
        return;
      }
      this.countUpIns.update(1000 + Math.round(Math.random() * 9000));
    }
  }
}
</script>

<style scoped>
</style>
