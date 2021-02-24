<template>
  <div>
    <div class="ele-page-header">
      <div class="ele-page-title">复杂表单</div>
      <div class="ele-page-desc">复杂表单常见于一次性输入和提交大批量数据的场景。</div>
    </div>
    <div class="ele-body" style="padding-bottom: 71px;">
      <el-form
        ref="demoForm"
        :model="form"
        :rules="rules"
        label-width="100px"
        @keyup.enter.native="submit"
        @submit.native.prevent>
        <el-card
          shadow="never"
          header="仓库信息"
          body-style="padding: 22px 22px 0 22px;">
          <el-row :gutter="15">
            <el-col :md="8" :sm="12">
              <el-form-item label="仓库名:" prop="name">
                <el-input
                  v-model="form.name"
                  placeholder="请输入仓库名"
                  clearable/>
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12">
              <el-form-item label="仓库域名:" prop="url">
                <el-input
                  v-model="form.url"
                  placeholder="请输入"
                  clearable>
                  <template slot="prepend">http://</template>
                  <template slot="append">.com</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12">
              <el-form-item label="仓库管理员:" prop="administrator">
                <el-select
                  v-model="form.administrator"
                  placeholder="请选择仓库管理员"
                  class="ele-block"
                  clearable>
                  <el-option label="SunSmile" :value="1"/>
                  <el-option label="Jasmine" :value="2"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12">
              <el-form-item label="审批人:" prop="approver">
                <el-select
                  v-model="form.approver"
                  placeholder="请选择审批人"
                  class="ele-block"
                  clearable>
                  <el-option label="SunSmile" :value="1"/>
                  <el-option label="Jasmine" :value="2"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12">
              <el-form-item label="生效日期:" prop="datetime">
                <el-date-picker
                  v-model="form.datetime"
                  type="daterange"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  class="ele-fluid"/>
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12">
              <el-form-item label="仓库类型:" prop="type">
                <el-select
                  v-model="form.type"
                  placeholder="请选择仓库类型"
                  class="ele-fluid"
                  clearable>
                  <el-option label="私密" :value="1"/>
                  <el-option label="公开" :value="2"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card
          shadow="never"
          header="任务信息"
          body-style="padding: 22px 22px 0 22px;">
          <el-row :gutter="15">
            <el-col :md="8" :sm="12">
              <el-form-item label="任务名:" prop="task">
                <el-input
                  v-model="form.task"
                  placeholder="请输入任务名"
                  clearable/>
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12">
              <el-form-item label="任务表述:" prop="description">
                <el-input
                  v-model="form.description"
                  placeholder="请输入任务表述"
                  clearable/>
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12">
              <el-form-item label="执行人:" prop="executor">
                <el-select
                  v-model="form.executor"
                  placeholder="请选择执行人"
                  class="ele-fluid"
                  clearable>
                  <el-option label="SunSmile" :value="1"/>
                  <el-option label="Jasmine" :value="2"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12">
              <el-form-item label="责任人:" prop="officer">
                <el-select
                  v-model="form.officer"
                  placeholder="请选择责任人"
                  class="ele-fluid"
                  clearable>
                  <el-option label="SunSmile" :value="1"/>
                  <el-option label="Jasmine" :value="2"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12">
              <el-form-item label="提醒时间:" prop="reminder">
                <el-time-picker
                  v-model="form.reminder"
                  placeholder="请选择提醒时间"
                  class="ele-fluid"
                  :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"/>
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12">
              <el-form-item label="任务类型:" prop="type">
                <el-select
                  v-model="form.taskType"
                  placeholder="请选择任务类型"
                  class="ele-block"
                  clearable>
                  <el-option label="私密" :value="1"/>
                  <el-option label="公开" :value="2"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <!-- 选择成员 -->
        <el-card shadow="never" header="选择成员">
          <el-table :data="list" border style="width: 100%;">
            <el-table-column
              type="index"
              width="45"
              align="center"/>
            <el-table-column label="用户名">
              <template slot-scope="{row, $index}">
                <el-input
                  v-if="$index===editIndex"
                  v-model="editRow.name"
                  placeholder="请输入用户名"/>
                <span v-else>{{ row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="工号">
              <template slot-scope="{row, $index}">
                <el-input
                  v-if="$index===editIndex"
                  v-model="editRow.number"
                  placeholder="请输入工号"/>
                <span v-else>{{ row.number }}</span>
              </template>
            </el-table-column>
            <el-table-column label="所属部门">
              <template slot-scope="{row, $index}">
                <el-select
                  v-if="$index===editIndex"
                  v-model="editRow.department"
                  placeholder="请选择部门"
                  class="ele-fluid">
                  <el-option label="研发部" value="研发部"/>
                  <el-option label="测试部" value="测试部"/>
                  <el-option label="产品部" value="产品部"/>
                </el-select>
                <span v-else>{{ row.department }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="130px"
              align="center"
              :resizable="false">
              <template slot-scope="{row, $index}">
                <div v-if="$index===editIndex">
                  <el-link
                    @click="onSave(row, $index)"
                    icon="el-icon-check"
                    type="success"
                    :underline="false">保存
                  </el-link>
                  <el-link
                    @click="onCancel(row, $index)"
                    icon="el-icon-close"
                    type="warning"
                    :underline="false">取消
                  </el-link>
                </div>
                <div v-else>
                  <el-link
                    @click="onEdit(row, $index)"
                    icon="el-icon-edit"
                    type="primary"
                    :underline="false">修改
                  </el-link>
                  <span class="ele-action">
                      <el-popconfirm
                        title="确定要删除此用户吗？"
                        @confirm="onRemove(row,$index)">
                          <el-link
                            slot="reference"
                            icon="el-icon-delete"
                            type="danger"
                            :underline="false">删除
                          </el-link>
                      </el-popconfirm>
                  </span>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-button
            @click="addRow"
            icon="el-icon-plus"
            style="width: 100%;margin-top: 15px;">新增成员
          </el-button>
        </el-card>
        <!-- 底部工具栏 -->
        <div class="ele-bottom-tool">
          <div v-if="validMsg" class="ele-text-danger">
            <i class="el-icon-circle-close"/>
            <span>{{ validMsg }}</span>
          </div>
          <div class="ele-bottom-tool-actions">
            <el-button
              type="primary"
              @click="submit"
              :loading="loading">提交
            </el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormAdvanced',
  data() {
    return {
      // 表单提交状态
      loading: false,
      // 表单数据
      form: {
        weight: 0,
        publicType: 1
      },
      // 表单验证规则
      rules: {
        name: [
          { required: true, message: '请输入仓库名', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入仓库域名', trigger: 'blur' }
        ],
        datetime: [
          { required: true, message: '请选择生效日期', trigger: 'blur' }
        ],
        administrator: [
          { required: true, message: '请选择仓库管理员', trigger: 'blur' }
        ],
        approver: [
          { required: true, message: '请选择审批人', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择仓库类型', trigger: 'blur' }
        ],
        task: [
          { required: true, message: '请输入任务名', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入任务表述', trigger: 'blur' }
        ],
        executor: [
          { required: true, message: '请选择执行人', trigger: 'blur' }
        ],
        officer: [
          { required: true, message: '请选择责任人', trigger: 'blur' }
        ],
        reminder: [
          { required: true, message: '请选择提醒时间', trigger: 'blur' }
        ],
        taskType: [
          { required: true, message: '请选择任务类型', trigger: 'blur' }
        ]
      },
      // 已添加成员
      list: [
        { name: 'John Brown', number: '00001', department: '研发部' },
        { name: 'Jim Green', number: '00002', department: '产品部' },
        { name: 'Joe Black', number: '00003', department: '产品部' }
      ],
      // 表单验证信息
      validMsg: '',
      // 表格编辑行索引
      editIndex: null,
      // 表格编辑行数据
      editRow: {}
    }
  },
  methods: {
    /* 表单提交 */
    submit() {
      this.$refs['demoForm'].validate((valid, obj) => {
        if (valid) {
          this.validMsg = ''
          this.loading = true
          setTimeout(() => {
            this.loading = false
            this.$message({ type: 'success', message: '提交成功' })
          }, 1500)
        } else {
          this.validMsg = ` 共有校验 ${Object.keys(obj).length} 项不通过`
          return false
        }
      })
    },
    /* 添加一行 */
    addRow() {
      if (this.list[this.list.length - 1].__is_add) {
        return
      }
      this.list.push({ __is_add: true })
      this.editRow = {}
      this.editIndex = this.list.length - 1
    },
    /* 修改行 */
    onEdit(row, index) {
      this.editIndex = index
      this.editRow = Object.assign({}, row)
    },
    /* 删除行 */
    onRemove(row, index) {
      console.log(row)
      this.list.splice(index, 1)
      // 如果需要请求接口删除可以在这里写
    },
    /* 保存编辑 */
    onSave(row, index) {
      if (!this.editRow.name) {
        return this.$message.error('请输入用户')
      }
      if (!this.editRow.number) {
        return this.$message.error('请输入工号')
      }
      if (!this.editRow.department) {
        return this.$message.error('请选择部门')
      }
      this.list[index] = Object.assign({}, this.editRow, { __is_add: false })
      this.editIndex = null
      this.editRow = {}
      // 如果需要请求接口保存可以在这里写
    },
    /* 取消编辑 */
    onCancel(row, index) {
      console.log(row)
      if (row.__is_add) {
        this.list.splice(index, 1)
      }
      this.editIndex = null
      this.editRow = {}
    }
  }
}
</script>

<style scoped>

</style>
