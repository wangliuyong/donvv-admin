<template>
  <div :class="['login-wrapper', ['','login-form-right','login-form-left'][direction]]">
    <el-form
      ref="loginForm"
      :model="form"
      :rules="rules"
      class="login-form ele-bg-white"
      size="large"
      @keyup.enter.native="doSubmit">
      <h4>用户登录</h4>
      <el-form-item prop="username">
        <el-input
          placeholder="请输入登录账号"
          v-model="form.username"
          prefix-icon="el-icon-user"
          clearable/>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          placeholder="请输入登录密码"
          v-model="form.password"
          prefix-icon="el-icon-lock"
          show-password/>
      </el-form-item>
      <el-form-item prop="code">
        <div class="login-input-group">
          <el-input
            placeholder="请输入验证码"
            v-model="form.code"
            prefix-icon="el-icon-_vercode"/>
          <img
            v-if="captcha"
            :src="captcha"
            @click="changeCode"
            class="login-captcha"
            alt=""/>
        </div>
      </el-form-item>
      <div class="el-form-item">
        <el-checkbox
          v-model="form.remember">记住密码
        </el-checkbox>
        <el-link
          @click="$router.push('/forget')"
          type="primary"
          class="ele-pull-right"
          :underline="false">忘记密码
        </el-link>
      </div>
      <div class="el-form-item">
        <el-button
          @click="doSubmit"
          :loading="loading"
          type="primary"
          class="login-btn"
          size="large">
          {{ loading ? '登录中' : '登录' }}
        </el-button>
      </div>
      <div
        class="ele-text-center"
        style="margin-bottom: 10px;">
        <i
          class="login-oauth-icon el-icon-_qq"
          style="background-color:#3492ed;">
        </i>
        <i
          class="login-oauth-icon el-icon-_wechat"
          style="background-color:#4daf29;">
        </i>
        <i
          class="login-oauth-icon el-icon-_weibo"
          style="background-color: #CF1900;">
        </i>
      </div>
    </el-form>
    <div class="login-copyright">copyright © 2020 eleadmin.com all rights reserved.</div>
    <!-- 实际项目去掉这段 -->
    <div
      style="position: absolute;right: 30px;top: 20px;"
      class="hidden-xs-only">
      <el-radio-group v-model="direction" size="mini">
        <el-radio-button label="2">居左</el-radio-button>
        <el-radio-button label="0">居中</el-radio-button>
        <el-radio-button label="1">居右</el-radio-button>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      // 登录框方向, 0居中, 1居右, 2居左
      direction: 0,
      // 加载状态
      loading: false,
      // 表单数据
      form: {
        username: 'admin',
        password: 'admin',
        code: '',
        remember: true
      },
      // 表单验证规则
      rules: {
        username: [
          {required: true, message: '请输入账号', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        code: [
          {required: true, message: '请输入验证码', trigger: 'blur'}
        ]
      },
      captcha: '',
      text: ''
    }
  },
  mounted() {
    if (this.$store.state.user.token) {
      this.goHome();
    }
    this.changeCode();
  },
  methods: {
    /* 提交 */
    doSubmit() {
      this.$refs['loginForm'].validate((valid) => {
        if (!valid) {
          return false;
        }
        if (this.form.code.toLowerCase() !== this.text) {
          this.$message.error('验证码错误');
          return;
        }
        this.loading = true;
        let formData = new FormData();
        for (let key in this.form) {
          formData.append(key, this.form[key]);
        }
        this.$http.post('/login', formData).then((res) => {
          this.loading = false;
          if (res.data.code === 0) {
            this.$message({type: 'success', message: '登录成功'});
            this.$store.dispatch('user/setToken', {
              token: 'Bearer ' + res.data.access_token,
              remember: this.form.remember
            }).then(() => {
              this.goHome();
            });
          } else {
            this.$message.error(res.data.msg);
          }
        });
      });
    },
    /* 跳转到首页 */
    goHome() {
      if (this.$route.query && this.$route.query.from) {
        this.$router.push(String(this.$route.query.from));
      } else {
        this.$router.push('index').catch(() => {
        });
      }
    },
    /* 更换图形验证码 */
    changeCode() {
      // 这里演示的验证码是后端返回base64格式的形式, 如果后端地址直接是图片请参考忘记密码页面
      this.$http.get('/file/captcha').then(res => {
        if (res.data.code === 0) {
          this.captcha = res.data.data;
          // 实际项目后端一般会返回验证码的key而不是直接返回验证码的内容, 登录用key去验证, 你可以根据自己后端接口修改
          this.text = res.data.text;
          // 自动回填验证码, 实际项目去掉这个
          this.form.code = this.text;
        } else {
          this.$message.error(res.data.msg);
        }
      }).catch(e => {
        this.$message.error(e.message);
      });
    }
  }
}
</script>

<style scoped>
.login-wrapper {
  padding: 50px 20px;
  position: relative;
  box-sizing: border-box;
  background-image: url("~@/assets/bg-login.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
}

.login-wrapper:before {
  content: "";
  background-color: rgba(0, 0, 0, .2);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.login-form {
  margin: 0 auto;
  width: 360px;
  max-width: 100%;
  padding: 25px 30px;
  position: relative;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  border-radius: 4px;
  z-index: 2;
}

.login-form-right .login-form {
  margin: 0 15% 0 auto;
}

.login-form-left .login-form {
  margin: 0 auto 0 15%;
}

.login-form h4 {
  text-align: center;
  margin: 0 0 25px 0;
}

.login-form > .el-form-item {
  margin-bottom: 25px;
}

.login-input-group {
  display: flex;
  align-items: center;
}

.login-input-group ::v-deep .el-input {
  flex: 1;
}

.login-captcha {
  height: 38px;
  width: 102px;
  margin-left: 10px;
  border-radius: 4px;
  border: 1px solid #DCDFE6;
  text-align: center;
  cursor: pointer;
}

.login-captcha:hover {
  opacity: .75;
}

.login-btn {
  display: block;
  width: 100%;
}

.login-oauth-icon {
  color: #FFF;
  padding: 5px;
  margin: 0 10px;
  font-size: 18px;
  border-radius: 50%;
  cursor: pointer;
}

.login-copyright {
  color: #eee;
  padding-top: 20px;
  text-align: center;
  position: relative;
  z-index: 1;
}

@media screen and (min-height: 550px) {
  .login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: -220px;
  }

  .login-form-right .login-form,
  .login-form-left .login-form {
    left: auto;
    right: 15%;
    transform: translateX(0);
    margin: -220px auto auto auto;
  }

  .login-form-left .login-form {
    right: auto;
    left: 15%;
  }

  .login-copyright {
    position: absolute;
    bottom: 20px;
    right: 0;
    left: 0;
  }
}

@media screen and (max-width: 768px) {
  .login-form-right .login-form,
  .login-form-left .login-form {
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    margin-right: auto;
  }
}
</style>
