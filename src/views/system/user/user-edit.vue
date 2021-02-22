<!-- 用户编辑弹窗 -->
<template>
  <el-dialog
    :title="isUpdate?'修改用户':'添加用户'"
    :visible="visible"
    width="600px"
    :destroy-on-close="true"
    :lock-scroll="false"
    custom-class="ele-dialog-form"
    @update:visible="updateVisible">
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      label-width="82px">
      <el-row :gutter="15">
        <el-col :sm="12">
          <el-form-item
            label="用户账号:"
            prop="username">
            <el-input
              v-model="form.username"
              placeholder="请输入账号"
              clearable
              :disabled="isUpdate"/>
          </el-form-item>
          <el-form-item
            label="用户名:"
            prop="nickname">
            <el-input
              v-model="form.nickname"
              placeholder="请输入用户名"
              clearable/>
          </el-form-item>
          <el-form-item
            label="性别:"
            prop="sex">
            <el-select
              v-model="form.sex"
              placeholder="请选择性别"
              class="ele-block"
              clearable>
              <el-option label="男" :value="1"/>
              <el-option label="女" :value="2"/>
            </el-select>
          </el-form-item>
          <el-form-item
            label="角色:"
            prop="roleIds">
            <el-select
              v-model="form.roleIds"
              placeholder="请选择角色"
              class="ele-block"
              clearable
              multiple>
              <el-option
                v-for="item in roleList"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="12">
          <el-form-item
            label="手机号:"
            prop="phone">
            <el-input
              v-model="form.phone"
              placeholder="请输入手机号"
              clearable/>
          </el-form-item>
          <el-form-item label="邮箱:">
            <el-input
              v-model="form.email"
              placeholder="请输入邮箱"
              clearable/>
          </el-form-item>
          <el-form-item label="个人简介:">
            <el-input
              v-model="form.introduction"
              placeholder="请输入个人简介"
              clearable/>
          </el-form-item>
          <el-form-item
            v-if="!isUpdate"
            label="登录密码:"
            prop="password">
            <el-input
              v-model="form.password"
              placeholder="请输入登录密码"
              show-password/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer">
      <el-button
        @click="updateVisible(false)">取消
      </el-button>
      <el-button
        type="primary"
        @click="save"
        :loading="loading">保存
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import validate from 'ele-admin/packages/validate';

export default {
  name: 'UserEdit',
  props: {
    // 弹窗是否打开
    visible: Boolean,
    // 修改回显的数据
    data: Object
  },
  data() {
    return {
      // 表单数据
      form: Object.assign({}, this.data),
      // 表单验证规则
      rules: {
        username: [
          {required: true, message: '请输入用户账号', trigger: 'blur'}
        ],
        nickname: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        sex: [
          {required: true, message: '请选择性别', trigger: 'blur'}
        ],
        roleIds: [
          {required: true, message: '请选择角色', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入登录密码', trigger: 'blur'}
        ],
        phone: [
          {pattern: validate.phone, message: '手机号格式不正确', trigger: 'blur'}
        ]
      },
      // 提交状态
      loading: false,
      // 是否是修改
      isUpdate: false,
      // 角色列表
      roleList: []
    }
  },
  watch: {
    data() {
      if (this.data) {
        this.form = Object.assign({}, this.data, {
          roleIds: this.data.roles.map(d => d.roleId)
        });
        this.isUpdate = true;
      } else {
        this.form = {};
        this.isUpdate = false;
      }
    }
  },
  mounted() {
    this.queryRoles();  // 查询角色列表
  },
  methods: {
    /* 保存编辑 */
    save() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$http[this.isUpdate ? 'put' : 'post']('/sys/user', this.form).then(res => {
            this.loading = false;
            if (res.data.code === 0) {
              this.$message({type: 'success', message: res.data.msg});
              if (!this.isUpdate) {
                this.form = {};
              }
              this.updateVisible(false);
              this.$emit('done');
            } else {
              this.$message.error(res.data.msg);
            }
          }).catch(e => {
            this.loading = false;
            this.$message.error(e.message);
          });
        } else {
          return false;
        }
      });
    },
    /* 更新visible */
    updateVisible(value) {
      this.$emit('update:visible', value);
    },
    /* 查询角色列表 */
    queryRoles() {
      this.$http.get('/sys/role').then(res => {
        if (res.data.code === 0) {
          this.roleList = res.data.data;
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
</style>
