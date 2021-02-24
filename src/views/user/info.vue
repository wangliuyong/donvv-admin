<template>
  <div class="ele-body">
    <el-row :gutter="15">
      <el-col :md="6" :sm="8">
        <el-card shadow="never" body-style="padding: 25px;">
          <div class="user-info-card">
            <div class="user-info-avatar-group" @click="showCropper=true">
              <img class="user-info-avatar" :src="form.avatar" alt=""/>
              <i class="el-icon-upload2"></i>
            </div>
            <h2 class="user-info-name">Jasmine</h2>
            <div class="user-info-desc">海纳百川，有容乃大</div>
          </div>
          <div class="user-info-list">
            <div class="user-info-item">
              <i class="el-icon-user"></i>
              <span>资深前端工程师</span>
            </div>
            <div class="user-info-item">
              <i class="el-icon-office-building"></i>
              <span>某某公司 - 某某事业群 - 某某技术部</span>
            </div>
            <div class="user-info-item">
              <i class="el-icon-location-information"></i>
              <span>中国 • 浙江省 • 杭州市</span>
            </div>
            <div class="user-info-item">
              <i class="el-icon-_school"></i>
              <span>JavaScript、HTML、CSS、Vue、Node</span>
            </div>
          </div>
          <div style="margin: 30px 0 20px 0;">
            <el-divider class="ele-divider-dashed ele-divider-base"/>
          </div>
          <h6 class="ele-text" style="margin-bottom: 8px;">标签</h6>
          <div class="user-info-tags">
            <el-tag size="mini" type="info">很有想法的</el-tag>
            <el-tag size="mini" type="info">专注设计</el-tag>
            <el-tag size="mini" type="info">辣~</el-tag>
            <el-tag size="mini" type="info">大长腿</el-tag>
            <el-tag size="mini" type="info">川妹子</el-tag>
            <el-tag size="mini" type="info">海纳百川</el-tag>
          </div>
        </el-card>
      </el-col>
      <el-col :md="18" :sm="16">
        <el-card shadow="never" body-style="padding-top: 5px;">
          <el-tabs v-model="active" class="user-info-tabs">
            <el-tab-pane label="基本信息" name="info">
              <el-form
                ref="infoForm"
                :model="form"
                :rules="rules"
                label-width="90px"
                style="max-width: 450px;padding-top: 40px;"
                @keyup.enter.native="save"
                @submit.native.prevent>
                <el-form-item label="昵称:" prop="nickname">
                  <el-input
                    v-model="form.nickname"
                    placeholder="请输入昵称"
                    clearable/>
                </el-form-item>
                <el-form-item label="性别:" prop="sex">
                  <el-select
                    v-model="form.sex"
                    placeholder="请选择性别"
                    class="ele-fluid"
                    clearable>
                    <el-option label="保密" :value="0"/>
                    <el-option label="男" :value="1"/>
                    <el-option label="女" :value="2"/>
                  </el-select>
                </el-form-item>
                <el-form-item label="邮箱:" prop="email">
                  <el-input
                    v-model="form.email"
                    placeholder="请输入邮箱"
                    clearable/>
                </el-form-item>
                <el-form-item label="个人简介:">
                  <el-input
                    v-model="form.introduction"
                    placeholder="请输入个人简介"
                    :rows="4"
                    type="textarea"/>
                </el-form-item>
                <el-form-item label="街道地址:">
                  <el-input
                    v-model="form.address"
                    placeholder="请输入街道地址"
                    clearable/>
                </el-form-item>
                <el-form-item label="联系电话:">
                  <div class="ele-cell">
                    <el-input
                      v-model="form.tellPre"
                      style="width: 65px;"/>
                    <div class="ele-cell-content">
                      <el-input
                        v-model="form.tell"
                        placeholder="请输入联系电话"
                        clearable/>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="save"
                    :loading="loading">保存更改
                  </el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="账号绑定" name="account">
              <div class="user-account-list">
                <div class="user-account-item ele-cell">
                  <div class="ele-cell-content">
                    <div>密保手机</div>
                    <div class="ele-text-secondary">已绑定手机：138****8293</div>
                  </div>
                  <el-link type="primary" :underline="false">去修改</el-link>
                </div>
                <el-divider/>
                <div class="user-account-item ele-cell">
                  <div class="ele-cell-content">
                    <div>密保邮箱</div>
                    <div class="ele-text-secondary">已绑定邮箱：eleadmin@eclouds.com</div>
                  </div>
                  <el-link type="primary" :underline="false">去修改</el-link>
                </div>
                <el-divider/>
                <div class="user-account-item ele-cell">
                  <div class="ele-cell-content">
                    <div>密保问题</div>
                    <div class="ele-text-secondary">未设置密保问题</div>
                  </div>
                  <el-link type="primary" :underline="false">去设置</el-link>
                </div>
                <el-divider/>
                <div class="user-account-item ele-cell">
                  <i class="user-account-icon el-icon-_qq"></i>
                  <div class="ele-cell-content">
                    <div>绑定QQ</div>
                    <div class="ele-text-secondary">当前未绑定QQ账号</div>
                  </div>
                  <el-link type="primary" :underline="false">去绑定</el-link>
                </div>
                <el-divider/>
                <div class="user-account-item ele-cell">
                  <i class="user-account-icon el-icon-_wechat"></i>
                  <div class="ele-cell-content">
                    <div>绑定微信</div>
                    <div class="ele-text-secondary">当前未绑定绑定微信账号</div>
                  </div>
                  <el-link type="primary" :underline="false">去绑定</el-link>
                </div>
                <el-divider/>
                <div class="user-account-item ele-cell">
                  <i class="user-account-icon el-icon-_alipay"></i>
                  <div class="ele-cell-content">
                    <div>绑定支付宝</div>
                    <div class="ele-text-secondary">当前未绑定绑定支付宝账号</div>
                  </div>
                  <el-link type="primary" :underline="false">去绑定</el-link>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
    <!-- 头像裁剪弹窗 -->
    <ele-cropper-dialog
      :show.sync="showCropper"
      @crop="onCrop"
      :src="form.avatar"
      :lock-scroll="false"/>
  </div>
</template>

<script>
import EleCropperDialog from 'ele-admin/packages/ele-cropper-dialog'

export default {
  name: 'UserInfo',
  components: { EleCropperDialog },
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
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
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
          this.loading = true
          setTimeout(() => {
            this.loading = false
            this.$message({ type: 'success', message: '保存成功' })
          }, 800)
        } else {
          return false
        }
      })
    },
    /* 头像裁剪完成回调 */
    onCrop(res) {
      this.form.avatar = res
      this.showCropper = false
    }
  }
}
</script>

<style scoped>
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
