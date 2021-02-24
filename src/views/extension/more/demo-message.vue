<template>
  <el-card shadow="never" header="消息提示">
    <div style="margin:0 0 10px 0;">默认风格</div>
    <el-button
      @click="showSuccessMessage(false)">成功
    </el-button>
    <el-button
      @click="showWarningMessage(false)">警告
    </el-button>
    <el-button
      @click="showErrorMessage(false)">错误
    </el-button>
    <el-button
      @click="showInfoMessage(false)">消息
    </el-button>
    <el-button
      @click="showLoadingMessage">loading
    </el-button>
    <div style="margin:20px 0 10px 0;">边框风格</div>
    <el-button
      @click="showSuccessMessage(true)">成功
    </el-button>
    <el-button
      @click="showWarningMessage(true)">警告
    </el-button>
    <el-button
      @click="showErrorMessage(true)">错误
    </el-button>
    <el-button
      @click="showInfoMessage(true)">消息
    </el-button>
  </el-card>
</template>

<script>
export default {
  name: 'DemoMessage',
  methods: {
    showSuccessMessage(border) {
      this.$message({
        type: 'success',
        message: '这是一条成功的提示',
        customClass: border ? 'ele-message-border' : ''
      })
    },
    showWarningMessage(border) {
      this.$message({
        type: 'warning',
        message: '这是一条警告的提示',
        customClass: border ? 'ele-message-border' : ''
      })
    },
    showErrorMessage(border) {
      if (border) {
        this.$message({
          type: 'error',
          message: '这是一条错误的提示',
          customClass: 'ele-message-border'
        })
      } else {
        this.$message.error('这是一条错误的提示')
      }
    },
    showInfoMessage(border) {
      if (border) {
        this.$message({
          type: 'info',
          message: '这是一条普通的提示',
          customClass: 'ele-message-border'
        })
      } else {
        this.$message('这是一条普通的提示')
      }
    },
    showLoadingMessage() {
      const loading = this.$message({
        message: '正在加载中..',
        customClass: 'ele-message-loading',
        duration: 0
      })
      setTimeout(() => {
        loading.close()
      }, 6000)
    }
  }
}
</script>

<style scoped>
</style>
