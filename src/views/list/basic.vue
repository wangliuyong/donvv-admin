<template>
  <div class="ele-body">
    <el-card shadow="never" body-style="padding: 22px 22px 0 22px;">
      <!-- 搜索表单 -->
      <el-form
        :model="where"
        label-width="120px"
        @keyup.enter.native="reload"
        @submit.native.prevent>
        <el-row>
          <el-col :md="8" :sm="12">
            <el-form-item label="规则名称:" prop="name">
              <el-input
                v-model="where.name"
                placeholder="请输入"
                clearable/>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12">
            <el-form-item label="描述:" prop="desc">
              <el-input
                v-model="where.desc"
                placeholder="请输入"
                clearable/>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12" v-if="searchExpand">
            <el-form-item label="服务调用次数:" prop="callTimes">
              <el-input-number
                v-model="where.callTimes"
                placeholder="请输入"
                controls-position="right"
                class="ele-fluid ele-text-left"/>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12" v-if="searchExpand">
            <el-form-item label="上次调度时间:" prop="lastTime">
              <el-date-picker
                v-model="where.lastTime"
                type="datetime"
                placeholder="请选择"
                value-format="yyyy-MM-dd HH:mm:ss"
                class="ele-fluid"/>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12" v-if="searchExpand">
            <el-form-item label="状态:" prop="state">
              <el-select
                v-model="where.state"
                placeholder="请选择"
                clearable
                class="ele-fluid">
                <el-option label="运行中" value="0"/>
                <el-option label="已上线" value="1"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12">
            <el-form-item class="ele-text-right">
              <el-button
                type="primary"
                @click="reload"
                icon="el-icon-search"
                class="ele-btn-icon">查询
              </el-button>
              <el-button @click="(where={})&&reload()">重置</el-button>
              <el-link
                @click="searchExpand=!searchExpand"
                type="primary"
                :underline="false">
                <template v-if="searchExpand">
                  收起<i class="el-icon-arrow-up"></i>
                </template>
                <template v-else>
                  展开<i class="el-icon-arrow-down"></i>
                </template>
              </el-link>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card shadow="never">
      <!-- 提示信息 -->
      <el-alert
        type="info"
        class="ele-alert-border"
        :closable="false"
        style="margin-bottom: 15px;">
        <i class="el-icon-info ele-text-info"></i>
        <span class="ele-text">
          <span>已选择 <b class="ele-text-info">{{ selection.length }}</b> 项</span>
          <span><em/>服务调用次数总计 <b>{{ sumTimes }} 万</b><em/></span>
        </span>
        <el-link
          @click="clearChoose"
          type="primary"
          :underline="false">清空
        </el-link>
      </el-alert>
      <!-- 高级表格 -->
      <ele-pro-table
        ref="table"
        :datasource="url"
        :where="where"
        :columns="columns"
        :selection.sync="selection">
        <template slot="toolbar">
          <el-button
            @click="edit=true"
            type="primary"
            icon="el-icon-plus"
            class="ele-btn-icon"
            size="small">添加
          </el-button>
          <el-dropdown @command="dropClick">
            <el-button
              class="ele-btn-icon"
              :disabled="selection.length===0"
              size="small">
              <span>批量操作</span>
              <i class="el-icon-arrow-down"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="del">批量删除</el-dropdown-item>
              <el-dropdown-item command="check">批量审批</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template slot="state" slot-scope="{ row }">
          <ele-dot
            :type="['','success','danger','info'][row.state]"
            :ripple="row.state===0"
            :text="['运行中','已上线','异常','关闭'][row.state]"/>
        </template>
        <template slot="action" slot-scope="{ row }">
          <el-link
            @click="openEdit(row)"
            icon="el-icon-edit"
            type="primary"
            :underline="false">配置
          </el-link>
          <el-link
            @click="$message('click')"
            icon="el-icon-finished"
            type="primary"
            :underline="false">订阅警报
          </el-link>
        </template>
      </ele-pro-table>
    </el-card>
    <!-- 编辑弹窗 -->
    <el-dialog
      :title="form.id?'配置规则':'新建规则'"
      :visible.sync="edit"
      width="400px"
      @closed="form={}"
      :destroy-on-close="true"
      :lock-scroll="false">
      <el-form
        :model="form"
        ref="editForm"
        :rules="rules"
        label-width="82px"
        @submit.native.prevent>
        <el-form-item label="规则名称:" prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入规则名称"
            clearable/>
        </el-form-item>
        <el-form-item label="描述:">
          <el-input
            v-model="form.desc"
            placeholder="请输入描述"
            :rows="4"
            type="textarea"/>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="edit=false">取消</el-button>
        <el-button
          type="primary"
          @click="save"
          :loading="loading">保存
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ListBasic',
  data() {
    return {
      // 列表接口地址
      url: 'https://cdn.eleadmin.com/20200610/list-demo-basic.json',
      // 表格列配置
      columns: [
        {
          columnKey: 'selection',
          type: 'selection',
          width: 45,
          align: 'center'
        },
        {
          columnKey: 'index',
          type: 'index',
          width: 45,
          align: 'center',
          showOverflowTooltip: true
        },
        {
          prop: 'name',
          label: '规则名称',
          sortable: 'custom',
          minWidth: 110,
          showOverflowTooltip: true
        },
        {
          prop: 'desc',
          label: '描述',
          sortable: 'custom',
          minWidth: 110,
          showOverflowTooltip: true
        },
        {
          prop: 'callTimes',
          label: '服务调用次数',
          sortable: 'custom',
          minWidth: 135,
          showOverflowTooltip: true,
          formatter(row, column, cellValue) {
            return cellValue + ' 万'
          }
        },
        {
          prop: 'state',
          label: '状态',
          sortable: 'custom',
          minWidth: 110,
          showOverflowTooltip: true,
          slot: 'state',
          filters: [
            {
              text: '运行中',
              value: 0
            },
            {
              text: '已上线',
              value: 1
            },
            {
              text: '异常',
              value: 2
            },
            {
              text: '关闭',
              value: 3
            }
          ],
          filterMethod: (value, row) => {
            return row.state === value
          }
        },
        {
          prop: 'lastTime',
          label: '上次调度时间',
          sortable: 'custom',
          minWidth: 135,
          showOverflowTooltip: true,
          formatter: (row, column, cellValue) => {
            return this.$util.toDateString(cellValue)
          }
        },
        {
          prop: 'action',
          label: '操作',
          width: 180,
          minWidth: 160,
          align: 'center',
          slot: 'action'
        }
      ],
      // 列表搜索参数
      where: {},
      // 表格选中数据
      selection: [],
      // 编辑表单数据
      form: {},
      // 编辑表单验证规则
      rules: {
        name: [
          { required: true, message: '请输入规则名称', trigger: 'blur' }
        ]
      },
      // 是否显示编辑表单弹窗
      edit: false,
      // 表单提交状态
      loading: false,
      // 搜索表单是否展开
      searchExpand: false
    }
  },
  computed: {
    // 计算服务总调用次数
    sumTimes() {
      let sum = 0
      // eslint-disable-next-line no-return-assign
      this.selection.forEach(d => sum += d.callTimes)
      return sum
    }
  },
  methods: {
    /* 清空选择 */
    clearChoose() {
      this.$refs.table.clearSelection()
    },
    /* 刷新表格 */
    reload() {
      this.$refs.table.reload()
    },
    /* 保存编辑 */
    save() {
      this.$refs['editForm'].validate((valid) => {
        if (valid) {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            this.edit = false
            this.$message({ type: 'success', message: '保存成功' })
          }, 300)
        } else {
          return false
        }
      })
    },
    /* 编辑 */
    openEdit(row) {
      this.form = Object.assign({}, row)
      this.edit = true
    },
    /* 下拉按钮点击 */
    dropClick(command) {
      if (command === 'del') {
        this.$message('点击了批量删除')
        this.clearChoose()
      } else if (command === 'check') {
        this.$message('点击了批量审批')
      }
    }
  }
}
</script>

<style scoped>

</style>
