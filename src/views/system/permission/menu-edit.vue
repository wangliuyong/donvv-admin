<!-- 编辑弹窗 -->
<template>
  <el-dialog
      :title="isUpdate?'修改权限':'添加权限'"
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
          <el-form-item  label="系统应用" prop="pCode">
            <el-select v-model="form.systemCode" placeholder="请选择应用" style="min-width:50%">
              <el-option v-for="item in systems" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </el-form-item>
          <el-form-item v-if="data.type < 3" label="上级权限:">
            <treeselect
                v-model="form.pCode"
                :options="menuList"
                placeholder="请选择上级权限"
                :defaultExpandLevel="3"
                :normalizer="normalizer"/>
          </el-form-item>

           <el-form-item
            label="权限类型:"
            prop="type">
            <el-select v-model="form.type" placeholder="权限类型">
              <el-option v-for="item in types" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>

          <el-form-item
              label="权限名称:"
              prop="name">
            <el-input
                v-model="form.name"
                placeholder="请输入权限名称"
                clearable/>
          </el-form-item>
          <el-form-item label="权限路径" prop="path">
            <el-input v-model="form.path" placeholder="权限路径" />
          </el-form-item>

        </el-col>

        <el-col :sm="12">
          <el-form-item label="权限图标:" prop="icon">
            <ele-icon-picker
                v-model="form.icon"
                placeholder="请选择权限图标"/>
          </el-form-item>
          <el-form-item label="是否启用" prop="isEnabled">
            <el-switch v-model="form.isEnabled" active-text="是" inactive-text="否" />
          </el-form-item>

          <el-form-item label="排序" prop="sort">
            <el-input-number v-model="form.sort" controls-position="right" :min="1" :max="999" />
            <span class="help-block">数字越小 排序越靠前</span>
          </el-form-item>
          <el-form-item label="备注" prop="name">
            <el-input v-model="form.remark" type="textarea" :rows="2" placeholder="权限备注" />
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
import EleIconPicker from 'ele-admin/packages/ele-icon-picker'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  name: 'MenuEdit',
  components: { EleIconPicker, Treeselect },
  props: {
    // 弹窗是否打开
    visible: Boolean,
    // 修改回显的数据
    data: Object,
    // 全部权限数据
    menuList: Array
  },
  data() {
    return {
      systems: [],
      types: [
        { id: 1, name: '菜单', des: 'Menu' },
        { id: 2, name: '页面', des: 'Page' },
        { id: 3, name: '操作', des: 'Action' },
        { id: 4, name: '元素', des: 'Element' }
      ],
      // 表单数据
      form: Object.assign({}, this.data, {
        pCode: this.data ? (this.data.pCode === 0 ? null : this.data.pCode) : null
      }),
      // 表单验证规则
      rules: {
        name: [
          { required: true, message: '请输入权限名称', trigger: 'blur' }
        ],
        sortNumber: [
          { required: true, message: '请输入排序号', trigger: 'blur' }
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
          pCode: this.data.pCode === 0 ? null : this.data.pCode
        })
        this.isUpdate = !!this.data.menuId
      } else {
        this.form = {}
        this.isUpdate = false
      }
    }
  },
  async created() {
    const result = await this.$http.get('system/Module/GetAll', { code: this.pid })
    if (result && result.data) {
      this.systems = result.data
    }
  },
  methods: {
    /* 下拉树格式化 */
    normalizer(d) {
      return {
        id: d.menuId,
        label: d.title,
        children: d.children || undefined
      }
    },
    /* 保存编辑 */
    save() {
      console.log(this.data)
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          this.$http[this.isUpdate ? 'put' : 'post']('system/Permission/Save',
              Object.assign({}, this.form, {
                pCode: this.form.pCode || 0,
                url: this.form.path
              })
          ).then(res => {
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
        } else {
          return false
        }
      })
    },
    /* 更新visible */
    updateVisible(value) {
      this.$emit('update:visible', value)
    }
  }
}
</script>

<style scoped>
</style>
