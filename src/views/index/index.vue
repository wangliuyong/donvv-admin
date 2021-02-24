<template>
  <div class="ele-body">
    <el-card shadow="never">
      <div style="max-width: 900px; margin: 45px auto;">
        <ele-result
          title="提交成功"
          desc="提交结果页用于反馈一系列操作任务的处理结果，如果仅是简单操作，使用 Message 全局提示反馈即可。灰色区域可以显示一些补充的信息。">
          <span>已提交申请，等待部门审核。</span>
          <template slot="actions">
            <el-button type="primary">返回列表</el-button>
            <el-button>查看项目</el-button>
            <el-button>打印</el-button>
          </template>
        </ele-result>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ResultSuccess'
}
</script>

<style scoped>

</style>
