<!-- 字典项编辑弹窗 -->
<template>
  <el-dialog
    :title="isUpdate?'修改字典项':'添加字典项'"
    :visible="visible"
    width="400px"
    :destroy-on-close="true"
    :lock-scroll="false"
    @update:visible="updateVisible">
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      label-width="96px">
      <el-form-item
        label="字典项名称:"
        prop="dictDataName">
        <el-input
          v-model="form.dictDataName"
          placeholder="请输入字典项名称"
          clearable/>
      </el-form-item>
      <el-form-item
        label="字典项值:"
        prop="dictDataCode">
        <el-input
          v-model="form.dictDataCode"
          placeholder="请输入字典项值"
          clearable/>
      </el-form-item>
      <el-form-item
        label="排序号:"
        prop="sortNumber">
        <el-input-number
          v-model="form.sortNumber"
          controls-position="right"
          :min="0"
          placeholder="请输入排序号"
          class="ele-fluid ele-text-left"/>
      </el-form-item>
      <el-form-item label="备注:">
        <el-input
          v-model="form.comments"
          placeholder="请输入备注"
          :rows="4"
          type="textarea"/>
      </el-form-item>
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
export default {
  name: 'SysDictDataEdit',
  props: {
    // 弹窗是否打开
    visible: Boolean,
    // 修改回显的数据
    data: Object,
    // 字典id
    dictId: Number
  },
  data() {
    return {
      // 表单数据
      form: Object.assign({}, this.data),
      // 表单验证规则
      rules: {
        dictDataName: [
          {required: true, message: '请输入字典项名称', trigger: 'blur'}
        ],
        dictDataCode: [
          {required: true, message: '请输入字典项值', trigger: 'blur'}
        ],
        sortNumber: [
          {required: true, message: '请输入排序号', trigger: 'blur'}
        ]
      },
      // 提交状态
      loading: false,
      // 是否是修改
      isUpdate: false
    }
  },
  watch: {
    data() {
      if (this.data) {
        this.form = Object.assign({}, this.data);
        this.isUpdate = true;
      } else {
        this.form = {};
        this.isUpdate = false;
      }
    }
  },
  methods: {
    /* 保存编辑 */
    save() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$http[this.isUpdate ? 'put' : 'post']('/sys/dictdata',
            Object.assign({}, this.form, {
              dictId: this.dictId
            })
          ).then(res => {
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
    }
  }
}
</script>

<style scoped>
</style>
