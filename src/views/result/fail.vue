<template>
  <div class="ele-body">
    <el-card shadow="never">
      <div style="max-width: 900px; margin: 45px auto;">
        <ele-result
          type="fail"
          title="提交失败"
          desc="请核对并修改以下信息后，再重新提交。">
          <span>您提交的内容有如下错误：</span>
          <div class="error-tips-item">
            <i class="el-icon-circle-close ele-text-danger"></i>
            <span><s/> 您的账户已被冻结 <em/></span>
            <el-link type="primary" :underline="false">
              <span>立即解冻</span>
              <i class="el-icon-arrow-right"></i>
            </el-link>
          </div>
          <div class="error-tips-item">
            <i class="el-icon-circle-close ele-text-danger"></i>
            <span><s/> 您的账户还不具备申请资格 <em/></span>
            <el-link type="primary" :underline="false">
              <span>立即升级</span>
              <i class="el-icon-arrow-right"></i>
            </el-link>
          </div>
          <template slot="actions">
            <el-button type="primary">返回修改</el-button>
          </template>
        </ele-result>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ResultFail'
}
</script>

<style scoped>
.error-tips-item {
  margin-top: 15px;
}

.error-tips-item > * {
  vertical-align: baseline;
}

@media screen and (max-width: 768px) {
  .ele-body ::v-deep .ele-result-extra {
    padding-left: 18px;
    padding-right: 18px;
  }
}
</style>
