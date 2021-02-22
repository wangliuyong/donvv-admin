<template>
  <el-card shadow="never" header="状态文字">
    <div class="ele-cell">
      <div>默认效果：</div>
      <div class="ele-cell-content">
        <ele-dot
          :ripple="ripple"
          text="运行中"/>
        <ele-dot
          type="success"
          :ripple="ripple"
          text="已上线"/>
        <ele-dot
          type="danger"
          :ripple="ripple"
          text="异常"/>
        <ele-dot
          type="info"
          :ripple="ripple"
          text="关闭"/>
      </div>
    </div>
    <div class="ele-cell">
      <div>大小设置：</div>
      <div class="ele-cell-content">
        <ele-dot
          :ripple="ripple"
          text="运行中"
          size="8px"/>
        <ele-dot
          type="success"
          :ripple="ripple"
          text="已上线"
          size="8px"/>
        <ele-dot
          type="danger"
          :ripple="ripple"
          text="异常"
          size="8px"/>
        <ele-dot
          type="info"
          :ripple="ripple"
          text="关闭"
          size="8px"/>
      </div>
    </div>
    <div class="ele-cell">
      <div>显示动画：</div>
      <div class="ele-cell-content">
        <el-radio-group v-model="ripple">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'DemoDot',
  data() {
    return {
      ripple: true
    }
  }
}
</script>

<style scoped>
.ele-cell + .ele-cell {
  margin-top: 16px;
}

.ele-status-dot + .ele-status-dot {
  margin-left: 16px;
}
</style>
