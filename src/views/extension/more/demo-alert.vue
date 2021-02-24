<template>
  <el-card
    shadow="never"
    header="警告组件"
    body-style="padding: 0 20px 20px 20px;">
    <el-row :gutter="20">
      <el-col
        :sm="6"
        :xs="12"
        style="margin-top: 20px">
        <div class="demo-alert-item">
          <el-alert
            title="Success Tips"
            type="success"
            show-icon
            class="ele-alert-border"/>
        </div>
        <div class="demo-alert-item">
          <el-alert
            title="Success Tips"
            type="success"
            show-icon
class="ele-alert-border"
            description="Detailed description and advice about successful copywriting."/>
        </div>
      </el-col>
      <el-col
        :sm="6"
        :xs="12"
        style="margin-top: 20px">
        <div class="demo-alert-item">
          <el-alert
            title="Informational Notes"
            type="info"
            show-icon
            class="ele-alert-border"/>
        </div>
        <div class="demo-alert-item">
          <el-alert
            title="Informational Notes"
            type="info"
            show-icon
class="ele-alert-border"
            description="Additional description and information about copywriting."/>
        </div>
      </el-col>
      <el-col
        :sm="6"
        :xs="12"
        style="margin-top: 20px">
        <div class="demo-alert-item">
          <el-alert
            title="Warning"
            type="warning"
            show-icon
class="ele-alert-border"/>
        </div>
        <div class="demo-alert-item">
          <el-alert
            title="Warning"
            description="This is a warning notice about copywriting."
            type="warning"
            show-icon
            class="ele-alert-border"/>
        </div>
      </el-col>
      <el-col
        :sm="6"
        :xs="12"
        style="margin-top: 20px">
        <div class="demo-alert-item">
          <el-alert
            title="Error"
            type="error"
            show-icon
            class="ele-alert-border"/>
        </div>
        <div class="demo-alert-item">
          <el-alert
            title="Error"
            description="This is an error message about copywriting."
            type="error"
            show-icon
            class="ele-alert-border"/>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'DemoAlert'
}
</script>

<style scoped>
.demo-alert-item {
  max-width: 320px;
}

.demo-alert-item + .demo-alert-item {
  margin-top: 20px;
}
</style>
