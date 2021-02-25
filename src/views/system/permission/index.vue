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
            <el-form-item label="菜单名称:">
              <el-input
                v-model="where.title"
                placeholder="请输入"
                clearable/>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12">
            <el-form-item label="菜单地址:">
              <el-input
                v-model="where.path"
                placeholder="请输入"
                clearable/>
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="12">
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
        method="POST"
        :datasource="url"
        :columns="columns"
        :where="where"
        :parse-data="parseData"
        row-key="menuId"
        height="calc(100vh - 265px)"
        default-expand-all
        :need-page="false">
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
            @click="expandAll"
            class="ele-btn-icon"
            size="small">展开全部
          </el-button>
          <el-button
            @click="foldAll"
            class="ele-btn-icon"
            size="small">折叠全部
          </el-button>
        </template>
        <!-- 标题列 -->
        <template slot="title" slot-scope="{row}">
          <i :class="row.icon"></i> {{ row.title }}
        </template>
        <!-- 类型列 -->
        <template slot="menuType" slot-scope="{row}">
          <el-tag
            :type="['primary','info'][row.menuType]"
            size="mini">
            {{ ['菜单', '按钮'][row.menuType] }}
          </el-tag>
        </template>
        <!-- 操作列 -->
        <template slot="action" slot-scope="{row}">
          <el-link
            @click="openEdit(null, row.menuId)"
            icon="el-icon-plus"
            type="primary"
            :underline="false">添加
          </el-link>
          <el-link
            @click="openEdit(row)"
            icon="el-icon-edit"
            type="primary"
            :underline="false">修改
          </el-link>
          <el-popconfirm
            title="确定要删除吗？"
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
    <menu-edit
      :visible.sync="showEdit"
      :data="current"
      :menu-list="menuList"
      @done="reload"/>
  </div>
</template>

<script>
import MenuEdit from './menu-edit'

export default {
  name: 'SystemMenu',
  components: { MenuEdit },
  data() {
    return {
      // 表格数据接口
      url: 'system/Permission/Search',
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
          prop: 'title',
          label: '权限名称',
          showOverflowTooltip: true,
          minWidth: 110,
          slot: 'title'
        },
        {
          prop: 'path',
          label: '路径',
          showOverflowTooltip: true,
          minWidth: 110
        },
        {
          prop: 'code',
          label: '权限编号',
          showOverflowTooltip: true,
          minWidth: 90
        },
        {
          prop: 'type',
          label: '权限类型',
          showOverflowTooltip: true,
          minWidth: 60,
          formatter: (row, column, cellValue) => {
            if (cellValue === 1) {
              return '菜单'
            } else {
              return '页面'
            }
          }
        },
        {
          prop: 'alias',
          label: '权限别名',
          align: 'center',
          showOverflowTooltip: true,
          width: 110

        },
        {
          prop: 'sort',
          label: '排序',
          align: 'center',
          showOverflowTooltip: true
        },
        {
          prop: 'isEnabled',
          label: '是否启用',
          width: 60,
          showOverflowTooltip: true,
          formatter: (row, column, cellValue) => {
            return cellValue ? '是' : '否'
          }
        },
        {
          prop: 'remark',
          label: '备注',
          align: 'center',
          showOverflowTooltip: true
        },
        {
          columnKey: 'action',
          label: '操作',
          width: 190,
          align: 'center',
          resizable: false,
          slot: 'action',
          fixed: 'right'
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
      // 全部菜单数据
      menuList: []
    }
  },
  methods: {
    /* 解析接口返回数据 */
    parseData(data) {
      data.map((item) => {
        item.component = item.path
        item.menuId = item.code
        item.parentId = item.pcode
      })
      const res = {
        data: this.$util.toTreeData(data, 'menuId', 'parentId'),
        code: 0
      }
      this.menuList = res.data
      return res
    },
    /* 刷新表格 */
    reload() {
      this.$refs.table.reload()
    },
    /* 重置搜索 */
    reset() {
      this.where = {}
      this.$nextTick(() => {
        this.reload()
      })
    },
    /* 显示编辑 */
    openEdit(row, parentId) {
      this.current = Object.assign({
        menuType: 0,
        hide: 0,
        parentId: parentId
      }, row)
      this.showEdit = true
    },
    /* 删除 */
    remove(row) {
      if (row.children && row.children.length > 0) {
        this.$message.error('请先删除子节点')
        return
      }
      const loading = this.$loading({ lock: true })
      this.$http.delete('/sys/menu/' + row.menuId).then(res => {
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
    /* 展开全部 */
    expandAll() {
      this.$refs.table.data.forEach(d => {
        this.$refs.table.toggleRowExpansion(d, true)
      })
    },
    /* 折叠全部 */
    foldAll() {
      this.$refs.table.data.forEach(d => {
        this.$refs.table.toggleRowExpansion(d, false)
      })
    }
  }
}
</script>

<style scoped>
</style>
