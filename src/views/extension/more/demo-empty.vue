<template>
  <el-card shadow="never" header="空视图">
    <el-row>
      <el-col :md="8" style="padding: 22px 0;">
        <ele-empty></ele-empty>
      </el-col>
      <el-col :md="8" style="padding: 22px 0;">
        <ele-empty>
          <i slot="icon" class="el-icon-_retrieve-solid"></i>
        </ele-empty>
      </el-col>
      <el-col :md="8">
        <ele-empty text="哎呀~怎么还没有数据呀~">
          <div style="margin-top: 20px;">
            <el-button size="mini">添加数据</el-button>
            <el-button type="primary" size="mini">重新加载</el-button>
          </div>
        </ele-empty>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'DemoEmpty'
}
</script>

<style scoped>
</style>
