<template>
  <div class="ele-body">
    <el-card shadow="never">
      <ele-pro-table
        ref="table"
        :datasource="url"
        :columns="columns"
        :selection.sync="selection"
        title="案卷列表">
        <template slot="toolkit">
          <el-button
            @click="openFileSortDialog"
            size="small"
            type="primary"
            icon="el-icon-sort"
            class="ele-btn-icon">卷内文件调整
          </el-button>
        </template>
      </ele-pro-table>
    </el-card>
    <!-- 卷内文件调整弹窗 -->
    <file-sort
      :visible.sync="showFileSort"
      :documents="fileSortChoose"/>
  </div>
</template>

<script>
import FileSort from './file-sort'

export default {
  name: 'ExampleDocument',
  components: { FileSort },
  data() {
    return {
      // 列表接口地址
      url: 'https://cdn.eleadmin.com/20200610/document.json',
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
          fixed: 'left'
        },
        {
          prop: 'piece_no',
          label: '案卷档号',
          width: 215,
          minWidth: 110,
          showOverflowTooltip: true
        },
        {
          prop: 'title',
          label: '案卷题名',
          minWidth: 110,
          showOverflowTooltip: true
        },
        {
          prop: 'year',
          label: '年度',
          minWidth: 110,
          showOverflowTooltip: true
        },
        {
          prop: 'retention',
          label: '保管期限',
          minWidth: 110,
          showOverflowTooltip: true
        },
        {
          prop: 'secret',
          label: '密级',
          minWidth: 110,
          showOverflowTooltip: true
        },
        {
          prop: 'type',
          label: '档案类别',
          minWidth: 110,
          showOverflowTooltip: true
        },
        {
          prop: 'carrier',
          label: '载体规格',
          minWidth: 110,
          showOverflowTooltip: true
        }
      ],
      // 是否显示卷内文件调整弹窗
      showFileSort: false,
      // 列表选中数据
      selection: [],
      // 选中的案卷
      fileSortChoose: []
    }
  },
  methods: {
    /* 打开卷内文件调整弹窗 */
    openFileSortDialog() {
      if (this.selection.length < 2) {
        return this.$message.error('请至少选择两条数据')
      }
      // 实际项目用这一行
      /* this.fileSortChoose = this.selection.map(d => {
        return Object.assign({}, d);
      });*/
      // 演示强制选前三个演示
      this.fileSortChoose = this.$refs.table.data.slice(0, 3)
      this.showFileSort = true
    }
  }
}
</script>

<style scoped>
</style>
