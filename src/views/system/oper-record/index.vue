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
            <el-form-item label="操作模块:">
              <el-input
                v-model="where.model"
                placeholder="请输入"
                clearable/>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12">
            <el-form-item label="操作时间:">
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
        <!-- 状态列 -->
        <template slot="state" slot-scope="{row}">
          <el-tag
            :type="['success','danger'][row.state]"
            size="mini">
            {{ ['正常', '异常'][row.state] }}
          </el-tag>
        </template>
        <!-- 操作列 -->
        <template slot="action" slot-scope="{row}">
          <el-link
            @click="openDetail(row)"
            icon="el-icon-view"
            type="primary"
            :underline="false">详情
          </el-link>
        </template>
      </ele-pro-table>
    </el-card>
    <!-- 详情弹窗 -->
    <oper-record-detail
      :visible.sync="showInfo"
      :data="current||{}"/>
  </div>
</template>

<script>
import XLSX from 'xlsx';
import OperRecordDetail from './oper-record-detail';

export default {
  name: 'SystemOperRecord',
  components: {OperRecordDetail},
  data() {
    return {
      // 表格数据接口
      url: '/sys/operRecord/page',
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
          prop: 'model',
          label: '操作模块',
          sortable: 'custom',
          showOverflowTooltip: true,
          minWidth: 110
        },
        {
          prop: 'description',
          label: '操作功能',
          sortable: 'custom',
          showOverflowTooltip: true,
          minWidth: 110
        },
        {
          prop: 'url',
          label: '请求地址',
          sortable: 'custom',
          showOverflowTooltip: true,
          minWidth: 110
        },
        {
          prop: 'requestMethod',
          label: '方式',
          sortable: 'custom',
          showOverflowTooltip: true
        },
        {
          prop: 'state',
          label: '状态',
          sortable: 'custom',
          showOverflowTooltip: true,
          slot: 'state'
        },
        {
          prop: 'spendTime',
          label: '耗时',
          sortable: 'custom',
          showOverflowTooltip: true,
          formatter: (row, column, cellValue) => {
            return cellValue / 1000 + 's';
          }
        },
        {
          prop: 'createTime',
          label: '操作时间',
          sortable: 'custom',
          showOverflowTooltip: true,
          minWidth: 110,
          formatter: (row, column, cellValue) => {
            return this.$util.toDateString(cellValue);
          }
        },
        {
          columnKey: 'action',
          label: '操作',
          width: 90,
          align: 'center',
          resizable: false,
          fixed: 'right',
          slot: 'action'
        }
      ],
      // 表格搜索条件
      where: {},
      // 当前选中数据
      current: null,
      // 是否显示查看弹窗
      showInfo: false,
      // 筛选日期范围
      daterange: null,
      // 日期时间选择器快捷项
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }
        ]
      }
    }
  },
  methods: {
    /* 刷新表格 */
    reload() {
      this.$refs.table.reload({page: 1});
    },
    /* 重置搜索 */
    reset() {
      this.where = {};
      this.daterange = null;
      this.$nextTick(() => {
        this.reload();
      });
    },
    /* 日期选择改变回调 */
    onDateRangeChoose() {
      if (this.daterange && this.daterange.length === 2) {
        this.where.createTimeStart = this.daterange[0];
        this.where.createTimeEnd = this.daterange[1];
      } else {
        this.where.createTimeStart = null;
        this.where.createTimeEnd = null;
      }
    },
    /* 详情 */
    openDetail(row) {
      this.current = row;
      this.showInfo = true;
    },
    /* 导出数据 */
    exportData() {
      let array = [['账号', '用户名', '操作模块', '操作功能', '请求地址', '请求方式', '状态', '耗时', '操作时间']];
      const loading = this.$loading({lock: true});
      this.$http.get('/sys/operRecord/page?page=1&limit=2000').then(res => {
        loading.close();
        if (res.data.code === 0) {
          res.data.data.forEach(d => {
            array.push([
              d.username,
              d.nickname,
              d.model,
              d.description,
              d.url,
              d.requestMethod,
              ['正常', '异常'][d.state],
              d.spendTime / 1000 + 's',
              this.$util.toDateString(d.createTime)
            ]);
          });
          this.$util.exportSheet(XLSX, array, '操作日志');
        } else {
          this.$message.error(res.data.msg);
        }
      }).catch(e => {
        loading.close();
        this.$message.error(e.message);
      });
    }
  }
}
</script>

<style scoped>
</style>
