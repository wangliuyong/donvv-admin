<!-- 用户导入弹窗 -->
<template>
  <el-dialog
    title="导入用户"
    :visible="visible"
    width="440px"
    :destroy-on-close="true"
    :lock-scroll="false"
    @update:visible="updateVisible">
    <el-upload
      v-loading="loading"
      action=""
      accept=".xls,.xlsx"
      :before-upload="beforeUpload"
      :show-file-list="false"
      drag
      class="ele-block">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或 <em>点击上传</em></div>
      <div class="el-upload__tip ele-text-center" slot="tip">
        <span>只能上传xls、xlsx文件，</span>
        <el-link
          type="primary"
          :underline="false"
          :href="url"
          style="vertical-align: baseline;"
          download>下载模板
        </el-link>
      </div>
    </el-upload>
  </el-dialog>
</template>

<script>
export default {
  name: 'UserImport',
  props: {
    // 是否打开弹窗
    visible: Boolean
  },
  data() {
    return {
      // 导入请求状态
      loading: false,
      // 导入模板下载地址
      url: 'https://cdn.eleadmin.com/20200610/用户导入模板.xlsx'
    }
  },
  methods: {
    /* 上传 */
    beforeUpload(file) {
      this.loading = true
      const formData = new FormData()
      formData.append('file', file)
      this.$http.post('/sys/user/import', formData).then(res => {
        this.loading = false
        if (res.data.code === 0) {
          this.$message({ type: 'success', message: res.data.msg })
          this.updateVisible(false)
          this.$emit('done')
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(e => {
        this.loading = false
        this.$message.error(e.message)
      })
      return false
    },
    /* 更新visible */
    updateVisible(value) {
      this.$emit('update:visible', value)
    }
  }
}
</script>

<style scoped>
.ele-block ::v-deep .el-upload,
.ele-block ::v-deep .el-upload-dragger {
  width: 100%;
}
</style>
