<template>
  <div class="ele-body">
    <el-card shadow="never">
      <!-- 搜索表单 -->
      <el-form
        :model="where"
        label-width="77px"
        class="ele-form-search"
        @keyup.enter.native="reload"
        @submit.native.prevent>
        <el-row :gutter="15">
          <el-col :md="6" :sm="12">
            <el-form-item label="角色名称:">
              <el-input
                v-model="where.roleName"
                placeholder="请输入"
                clearable/>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12">
            <el-form-item label="角色标识:">
              <el-input
                v-model="where.roleCode"
                placeholder="请输入"
                clearable/>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12">
            <el-form-item label="备注:">
              <el-input
                v-model="where.comments"
                placeholder="请输入"
                clearable/>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12">
            <div class="ele-form-actions">
              <el-button
                type="primary"
                @click="reload"
                icon="el-icon-search"
                class="ele-btn-icon">查询
              </el-button>
              <el-button @click="reset">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <!-- 数据表格 -->
      <ele-pro-table
        ref="table"
        :datasource="url"
        :columns="columns"
        :where="where"
        :selection.sync="selection">
        <!-- 表头工具栏 -->
        <template slot="toolbar">
          <el-button
            @click="openEdit(null)"
            type="primary"
            icon="el-icon-plus"
            class="ele-btn-icon"
            size="small">添加
          </el-button>
          <el-button
            @click="removeBatch"
            type="danger"
            icon="el-icon-delete"
            class="ele-btn-icon"
            size="small">删除
          </el-button>
        </template>
        <!-- 操作列 -->
        <template slot="action" slot-scope="{row}">
          <el-link
            @click="openEdit(row)"
            icon="el-icon-edit"
            type="primary"
            :underline="false">修改
          </el-link>
          <el-link
            @click="openAuth(row)"
            icon="el-icon-finished"
            type="primary"
            :underline="false">分配权限
          </el-link>
          <el-popconfirm
            title="确定要删除此角色吗？"
            @confirm="remove(row)"
            class="ele-action">
            <el-link
              slot="reference"
              icon="el-icon-delete"
              type="danger"
              :underline="false">删除
            </el-link>
          </el-popconfirm>
        </template>
      </ele-pro-table>
    </el-card>
    <!-- 编辑弹窗 -->
    <role-edit
      :visible.sync="showEdit"
      :data="current"
      @done="reload"/>
    <!-- 权限分配弹窗 -->
    <role-auth
      :visible.sync="showAuth"
      :data="current"/>
  </div>
</template>

<script>
import RoleEdit from './role-edit'
import RoleAuth from './role-auth'

export default {
  name: 'SystemRole',
  components: { RoleEdit, RoleAuth },
  data() {
    return {
      // 表格数据接口
      url: '/sys/role/page',
      // 表格列配置
      columns: [
        {
          columnKey: 'selection',
          type: 'selection',
          width: 45,
          align: 'center',
          fixed: 'left'
        },
        {
          columnKey: 'index',
          type: 'index',
          width: 45,
          align: 'center',
          fixed: 'left',
          showOverflowTooltip: true
        },
        {
          prop: 'roleName',
          label: '角色名称',
          sortable: 'custom',
          showOverflowTooltip: true,
          minWidth: 110
        },
        {
          prop: 'roleCode',
          label: '角色标识',
          sortable: 'custom',
          showOverflowTooltip: true,
          minWidth: 110
        },
        {
          prop: 'comments',
          label: '备注',
          sortable: 'custom',
          showOverflowTooltip: true,
          minWidth: 110
        },
        {
          prop: 'createTime',
          label: '创建时间',
          sortable: 'custom',
          showOverflowTooltip: true,
          minWidth: 110,
          formatter: (row, column, cellValue) => {
            return this.$util.toDateString(cellValue)
          }
        },
        {
          columnKey: 'action',
          label: '操作',
          width: 230,
          align: 'center',
          resizable: false,
          slot: 'action'
        }
      ],
      // 表格搜索条件
      where: {},
      // 表格选中数据
      selection: [],
      // 当前编辑数据
      current: null,
      // 是否显示编辑弹窗
      showEdit: false,
      // 是否显示导入弹窗
      showAuth: false
    }
  },
  methods: {
    /* 刷新表格 */
    reload() {
      this.$refs.table.reload({ page: 1 })
    },
    /* 重置搜索 */
    reset() {
      this.where = {}
      this.$nextTick(() => {
        this.reload()
      })
    },
    /* 显示编辑 */
    openEdit(row) {
      this.current = row
      this.showEdit = true
    },
    /* 显示分配权限 */
    openAuth(row) {
      this.current = row
      this.showAuth = true
    },
    /* 删除 */
    remove(row) {
      const loading = this.$loading({ lock: true })
      this.$http.delete('/sys/role/' + row.roleId).then(res => {
        loading.close()
        if (res.data.code === 0) {
          this.$message({ type: 'success', message: res.data.msg })
          this.reload()
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(e => {
        loading.close()
        this.$message.error(e.message)
      })
    },
    /* 批量删除 */
    removeBatch() {
      if (!this.selection.length) {
        this.$message.error('请至少选择一条数据')
        return
      }
      this.$confirm('确定要删除选中的角色吗?', '提示', {
        type: 'warning'
      }).then(() => {
        const loading = this.$loading({ lock: true })
        this.$http.delete('/sys/role/batch', {
          data: this.selection.map(d => d.roleId)
        }).then(res => {
          loading.close()
          if (res.data.code === 0) {
            this.$message({ type: 'success', message: res.data.msg })
            this.reload()
          } else {
            this.$message.error(res.data.msg)
          }
        }).catch(e => {
          loading.close()
          this.$message.error(e.message)
        })
      }).catch(() => {
      })
    }
  }
}
</script>

<style scoped>
</style>
