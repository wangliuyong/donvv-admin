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
            <el-form-item label="用户账号:">
              <el-input
                v-model="where.username"
                placeholder="请输入"
                clearable/>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12">
            <el-form-item label="登录时间:">
              <el-date-picker
                v-model="daterange"
                type="datetimerange"
                :picker-options="pickerOptions"
                unlink-panels
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                class="ele-fluid"
                @change="onDateRangeChoose"/>
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
        :where="where">
        <!-- 表头工具栏 -->
        <template slot="toolbar">
          <el-button
            @click="exportData"
            type="primary"
            icon="el-icon-download"
            class="ele-btn-icon"
            size="small">导出
          </el-button>
        </template>
        <!-- 操作类型列 -->
        <template slot="operType" slot-scope="{row}">
          <el-tag
            :type="['success','danger','info','warning'][row.operType]"
            size="mini">
            {{ ['登录成功', '登录失败', '退出登录', '刷新TOKEN'][row.operType] }}
          </el-tag>
        </template>
      </ele-pro-table>
    </el-card>
  </div>
</template>

<script>
import XLSX from 'xlsx'

export default {
  name: 'SystemLoginRecord',
  data() {
    return {
      // 表格数据接口
      url: '/sys/loginRecord/page',
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
          prop: 'username',
          label: '账号',
          sortable: 'custom',
          showOverflowTooltip: true,
          minWidth: 110
        },
        {
          prop: 'nickname',
          label: '用户名',
          sortable: 'custom',
          showOverflowTooltip: true,
          minWidth: 110
        },
        {
          prop: 'ip',
          label: 'IP地址',
          sortable: 'custom',
          showOverflowTooltip: true,
          minWidth: 110
        },
        {
          prop: 'device',
          label: '设备型号',
          sortable: 'custom',
          showOverflowTooltip: true,
          minWidth: 110
        },
        {
          prop: 'os',
          label: '操作系统',
          sortable: 'custom',
          showOverflowTooltip: true,
          minWidth: 110
        },
        {
          prop: 'browser',
          label: '浏览器',
          sortable: 'custom',
          showOverflowTooltip: true,
          minWidth: 110
        },
        {
          prop: 'operType',
          label: '操作类型',
          sortable: 'custom',
          showOverflowTooltip: true,
          minWidth: 110,
          slot: 'operType'
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
          label: '登录时间',
          sortable: 'custom',
          showOverflowTooltip: true,
          minWidth: 110,
          formatter: (row, column, cellValue) => {
            return this.$util.toDateString(cellValue)
          }
        }
      ],
      // 表格搜索条件
      where: {},
      // 筛选日期范围
      daterange: null,
      // 日期时间选择器快捷项
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
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
      this.daterange = null
      this.$nextTick(() => {
        this.reload()
      })
    },
    /* 日期选择改变回调 */
    onDateRangeChoose() {
      if (this.daterange && this.daterange.length === 2) {
        this.where.createTimeStart = this.daterange[0]
        this.where.createTimeEnd = this.daterange[1]
      } else {
        this.where.createTimeStart = null
        this.where.createTimeEnd = null
      }
    },
    /* 导出数据 */
    exportData() {
      const array = [['账号', '用户名', 'IP地址', '设备型号', '操作系统', '浏览器', '操作类型', '备注', '登录时间']]
      const loading = this.$loading({ lock: true })
      this.$http.get('/sys/loginRecord/page?page=1&limit=2000').then(res => {
        loading.close()
        if (res.data.code === 0) {
          res.data.data.forEach(d => {
            array.push([
              d.username,
              d.nickname,
              d.ip,
              d.device,
              d.os,
              d.browser,
              ['登录成功', '登录失败', '退出登录', '刷新TOKEN'][d.operType],
              d.comments,
              this.$util.toDateString(d.createTime)
            ])
          })
          this.$util.exportSheet(XLSX, array, '登录日志')
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(e => {
        loading.close()
        this.$message.error(e.message)
      })
    }
  }
}
</script>

<style scoped>
</style>
