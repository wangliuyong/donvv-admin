<template>
  <div>
    <!-- 数据表格 -->
    <ele-pro-table
      ref="table"
      :datasource="url"
      :columns="columns"
      :where="where"
      :height="tbHeight"
      tool-class="ele-toolbar-form">
      <!-- 表头工具栏 -->
      <template slot="toolbar">
        <el-form
          :model="where"
          class="ele-form-search"
          size="small"
          @keyup.enter.native="reload"
          @submit.native.prevent>
          <el-row :gutter="10">
            <el-col :md="8">
              <el-form-item>
                <el-input
                  v-model="where.dictDataName"
                  placeholder="请输入字典项名称"
                  clearable
                  size="small"/>
              </el-form-item>
            </el-col>
            <el-col :md="8">
              <el-form-item>
                <el-input
                  v-model="where.dictDataCode"
                  placeholder="请输入字典项值"
                  clearable
                  size="small"/>
              </el-form-item>
            </el-col>
            <el-col :md="8">
              <div class="ele-form-actions">
                <el-button
                  type="primary"
                  @click="reload"
                  icon="el-icon-search"
                  class="ele-btn-icon"
                  size="small">查询
                </el-button>
                <el-button
                  @click="openEdit(null)"
                  type="primary"
                  icon="el-icon-plus"
                  class="ele-btn-icon"
                  size="small">添加
                </el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <!-- 操作列 -->
      <template slot="action" slot-scope="{row}">
        <el-link
          @click="openEdit(row)"
          icon="el-icon-edit"
          type="primary"
          :underline="false">修改
        </el-link>
        <el-popconfirm
          title="确定要删除此字典项吗？"
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
    <!-- 编辑弹窗 -->
    <sys-dict-data-edit
      :visible.sync="showEdit"
      :data="current"
      :dict-id="dictId"
      @done="reload"/>
  </div>
</template>

<script>
import SysDictDataEdit from './sys-dict-data-edit'

export default {
  name: 'SysDictData',
  components: { SysDictDataEdit },
  props: {
    // 字典id
    dictId: Number,
    // 表格高度
    tbHeight: String
  },
  data() {
    return {
      // 表格数据接口
      url: '/sys/dictdata/page',
      // 表格列配置
      columns: [
        {
          columnKey: 'index',
          type: 'index',
          width: 45,
          align: 'center',
          fixed: 'left',
          showOverflowTooltip: true
        },
        {
          prop: 'dictDataName',
          label: '字典项名称',
          sortable: 'custom',
          showOverflowTooltip: true,
          minWidth: 120
        },
        {
          prop: 'dictDataCode',
          label: '字典项值',
          sortable: 'custom',
          showOverflowTooltip: true,
          minWidth: 110
        },
        {
          prop: 'sortNumber',
          label: '排序号',
          sortable: 'custom',
          showOverflowTooltip: true,
          width: 90
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
          width: 130,
          align: 'center',
          resizable: false,
          slot: 'action'
        }
      ],
      // 表格搜索条件
      where: {
        dictId: this.dictId
      },
      // 当前编辑数据
      current: null,
      // 是否显示编辑弹窗
      showEdit: false
    }
  },
  methods: {
    /* 刷新表格 */
    reload() {
      this.$refs.table.reload({ page: 1 })
    },
    /* 显示编辑 */
    openEdit(row) {
      this.current = row
      this.showEdit = true
    },
    /* 删除 */
    remove(row) {
      const loading = this.$loading({ lock: true })
      this.$http.delete('/sys/dictdata/' + row.dictDataId).then(res => {
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
    }
  },
  watch: {
    // 监听字典id变化
    dictId() {
      this.where.dictId = this.dictId
      this.reload()
    }
  }
}
</script>

<style scoped>
</style>
