<template>
  <div class="ele-body">
   <el-row :gutter="24">
  
    <el-col :span="6">
      <el-card shadow="hover">
        <div class="enter-item">
          鼠标悬浮时显示
        </div>
      </el-card>
    </el-col>
   
  </el-row>
  </div>
</template>

<script>


export default {
  name: 'UserInfo',
  
  data() {
    return {
      // tab页选中
      active: 'info',
      // 表单数据
      form: {
        nickname: 'Jasmine',
        sex: 0,
        email: 'eleadmin@eclouds.com',
        tellPre: '0752',
        avatar: 'https://cdn.eleadmin.com/20200610/avatar.jpg'
      },
      // 表单验证规则
      rules: {
        nickname: [
          {required: true, message: '请输入昵称', trigger: 'blur'}
        ],
        sex: [
          {required: true, message: '请选择性别', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'}
        ]
      },
      // 保存按钮loading
      loading: false,
      // 是否显示裁剪弹窗
      showCropper: false
    }
  },
  methods: {
    /* 保存更改 */
    save() {
      this.$refs['infoForm'].validate((valid) => {
        if (valid) {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.$message({type: 'success', message: '保存成功'});
          }, 800);
        } else {
          return false;
        }
      });
    },
    /* 头像裁剪完成回调 */
    onCrop(res) {
      this.form.avatar = res;
      this.showCropper = false;
    }
  }
}
</script>

<style scoped>
.enter-item{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5vw;
}
.ele-body {
  padding-bottom: 0;
}

.el-card {
  margin-bottom: 15px;
}

/* 用户资料卡片 */
.user-info-card {
  padding-top: 8px;
  text-align: center;
}

.user-info-card .user-info-avatar-group {
  position: relative;
  cursor: pointer;
  margin: 0 auto;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  overflow: hidden;
}

.user-info-card .user-info-avatar {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info-card .user-info-avatar-group > i {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #FFF;
  font-size: 30px;
  display: none;
  z-index: 2;
}

.user-info-card .user-info-avatar-group:hover > i {
  display: block;
}

.user-info-card .user-info-avatar-group:hover:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .3);
}

.user-info-card .user-info-name {
  font-size: 24px;
  margin-top: 20px;
}

.user-info-card .user-info-desc {
  margin-top: 8px;
}

/* 用户信息列表 */
.user-info-list {
  margin-top: 30px;
}

.user-info-list .user-info-item {
  margin-bottom: 10px;
  display: flex;
  align-items: baseline;
}

.user-info-item > i {
  margin-right: 10px;
  font-size: 16px;
}

.user-info-item > span {
  flex: 1;
  display: block;
}

/* 用户标签 */
.user-info-tags .el-tag {
  margin: 10px 10px 0 0;
}

/* 用户账号绑定列表 */
.user-account-list {
  margin-top: 10px;
}

.user-account-list .user-account-item {
  padding: 15px;
}

.user-account-list .user-account-item .ele-text-secondary {
  margin-top: 6px;
}

.user-account-list .user-account-item .user-account-icon {
  width: 42px;
  height: 42px;
  line-height: 42px;
  text-align: center;
  color: #FFF;
  font-size: 26px;
  border-radius: 50%;
  background-color: #3492ED;
  box-sizing: border-box;
}

.user-account-list .user-account-item .user-account-icon.el-icon-_wechat {
  background-color: #4DAF29;
  font-size: 28px;
}

.user-account-list .user-account-item .user-account-icon.el-icon-_alipay {
  background-color: #1476FE;
  padding-left: 5px;
  font-size: 32px;
}

/* tab页签 */
.user-info-tabs ::v-deep .el-tabs__nav-wrap {
  padding-left: 20px;
}
</style>
