<!-- 编辑弹窗 -->
<template>
  <el-dialog
      :title="isUpdate?'修改菜单':'添加菜单'"
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
        label-width="82px"
        @keyup.enter.native="save"
        @submit.native.prevent>
      <el-row :gutter="15">
        <el-col :sm="12">
          <el-form-item label="上级菜单:">
            <treeselect
                v-model="form.parentId"
                :options="menuList"
                placeholder="请选择上级菜单"
                :defaultExpandLevel="3"
                :normalizer="normalizer"/>
          </el-form-item>
          <el-form-item
              label="菜单名称:"
              prop="title">
            <el-input
                v-model="form.title"
                placeholder="请输入菜单名称"
                clearable/>
          </el-form-item>
          <el-form-item label="菜单图标:">
            <ele-icon-picker
                v-model="form.icon"
                placeholder="请选择菜单图标"/>
          </el-form-item>
          <el-form-item label="路由地址:">
            <el-input
                v-model="form.path"
                placeholder="请输入路由地址"
                clearable/>
          </el-form-item>
          <el-form-item label="组件路径:">
            <el-input
                v-model="form.component"
                placeholder="请输入组件路径"
                clearable/>
          </el-form-item>
        </el-col>
        <el-col :sm="12">
          <el-form-item label="权限标识:">
            <el-input
                v-model="form.authority"
                placeholder="请输入权限标识"
                clearable/>
          </el-form-item>
          <el-form-item label="排序号:" prop="sortNumber">
            <el-input-number
                v-model="form.sortNumber"
                controls-position="right"
                :min="0"
                placeholder="请输入排序号"
                class="ele-fluid ele-text-left"/>
          </el-form-item>
          <el-form-item label="菜单类型:">
            <el-radio-group v-model="form.menuType">
              <el-radio :label="0">菜单</el-radio>
              <el-radio :label="1">按钮</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否隐藏:">
            <el-radio-group v-model="form.hide">
              <el-radio :label="0">显示</el-radio>
              <el-radio :label="1">隐藏</el-radio>
            </el-radio-group>
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
import EleIconPicker from 'ele-admin/packages/ele-icon-picker';
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';

export default {
  name: 'MenuEdit',
  components: {EleIconPicker, Treeselect},
  props: {
    // 弹窗是否打开
    visible: Boolean,
    // 修改回显的数据
    data: Object,
    // 全部菜单数据
    menuList: Array
  },
  data() {
    return {
      // 表单数据
      form: Object.assign({}, this.data, {
        parentId: this.data ? (this.data.parentId === 0 ? null : this.data.parentId) : null
      }),
      // 表单验证规则
      rules: {
        title: [
          {required: true, message: '请输入菜单名称', trigger: 'blur'}
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
        this.form = Object.assign({}, this.data, {
          parentId: this.data.parentId === 0 ? null : this.data.parentId
        });
        this.isUpdate = !!this.data.menuId;
      } else {
        this.form = {};
        this.isUpdate = false;
      }
    }
  },
  methods: {
    /* 下拉树格式化 */
    normalizer(d) {
      return {
        id: d.menuId,
        label: d.title,
        children: d.children || undefined
      };
    },
    /* 保存编辑 */
    save() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$http[this.isUpdate ? 'put' : 'post']('/sys/menu',
              Object.assign({}, this.form, {
                parentId: this.form.parentId || 0
              })
          ).then(res => {
            this.loading = false;
            if (res.data.code === 0) {
              this.$message({type: 'success', message: res.data.msg});
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
