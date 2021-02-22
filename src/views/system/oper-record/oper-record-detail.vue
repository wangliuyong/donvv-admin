<!-- 详情弹窗 -->
<template>
  <el-dialog
    title="详情"
    :visible="visible"
    width="600px"
    :destroy-on-close="true"
    :lock-scroll="false"
    @update:visible="updateVisible">
    <el-form
      label-width="82px"
      size="mini"
      class="ele-form-detail">
      <el-row :gutter="15">
        <el-col :sm="12">
          <el-form-item label="操作人:">
            <div class="ele-text-secondary">
              {{ data.nickname }}({{ data.username }})
            </div>
          </el-form-item>
          <el-form-item label="操作模块:">
            <div class="ele-text-secondary">
              {{ data.model }}
            </div>
          </el-form-item>
          <el-form-item label="操作时间:">
            <div class="ele-text-secondary">
              {{ data.createTime | toDateString }}
            </div>
          </el-form-item>
          <el-form-item label="请求方式:">
            <div class="ele-text-secondary">
              {{ data.requestMethod }}
            </div>
          </el-form-item>
        </el-col>
        <el-col :sm="12">
          <el-form-item label="IP地址:">
            <div class="ele-text-secondary">
              {{ data.ip }}
            </div>
          </el-form-item>
          <el-form-item label="操作功能:">
            <div class="ele-text-secondary">
              {{ data.description }}
            </div>
          </el-form-item>
          <el-form-item label="请求耗时:">
            <div class="ele-text-secondary">
              {{ data.spendTime / 1000 }}s
            </div>
          </el-form-item>
          <el-form-item label="请求状态:">
            <el-tag
              :type="['success','danger'][data.state]"
              size="mini">
              {{ ['正常', '异常'][data.state] }}
            </el-tag>
          </el-form-item>
        </el-col>
      </el-row>
      <div style="margin: 12px 0;">
        <el-divider/>
      </div>
      <el-form-item label="请求地址:">
        <div class="ele-text-secondary">
          {{ data.url }}
        </div>
      </el-form-item>
      <el-form-item label="调用方法:">
        <div class="ele-text-secondary">
          {{ data.operMethod }}
        </div>
      </el-form-item>
      <el-form-item label="请求参数:">
        <div class="ele-text-secondary">
          {{ data.param }}
        </div>
      </el-form-item>
      <el-form-item label="返回结果:">
        <div class="ele-text-secondary">
          {{ data.result }}
        </div>
      </el-form-item>
      <el-form-item label="备注:">
        <div class="ele-text-secondary">
          {{ data.comments }}
        </div>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button
        @click="updateVisible(false)">关闭
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'OperRecordDetail',
  props: {
    // 弹窗是否打开
    visible: Boolean,
    // 数据
    data: Object
  },
  methods: {
    /* 更新visible */
    updateVisible(value) {
      this.$emit('update:visible', value);
    }
  }
}
</script>

<style scoped>
</style>
