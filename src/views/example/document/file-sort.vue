<template>
  <el-dialog
    title="卷内文件调整"
    width="980px"
    top="5vh"
    @opened="onOpened"
    @closed="onClosed"
    :visible="visible"
    @update:visible="updateVisible"
    custom-class="demo-file-sort-dialog"
    :lock-scroll="false">
    <el-row :gutter="15">
      <el-col :md="8">
        <ele-pro-table
          ref="docTable"
          sub-title="案卷列表"
          :datasource="documents"
          :columns="columns1"
          highlight-current-row
          height="400px"
          :toolkit="[]"
          :need-page="false"
          :current.sync="current"
          class="demo-file-sort-table">
        </ele-pro-table>
      </el-col>
      <el-col :md="8">
        <ele-pro-table
          ref="fileTable"
          :loading="loading"
          sub-title="卷内列表"
          :datasource="data1"
          :columns="columns2"
          height="400px"
          :selection.sync="selection1"
          :need-page="false"
          :toolkit="[]">
          <template slot="toolkit">
            <el-button
              @click="moveUp"
              type="primary"
              icon="el-icon-top"
              class="ele-btn-icon"
              size="mini">上移
            </el-button>
            <el-button
              @click="moveDown"
              type="primary"
              icon="el-icon-bottom"
              class="ele-btn-icon"
              size="mini">下移
            </el-button>
            <el-button
              @click="moveOut"
              type="primary"
              icon="el-icon-top-right"
              class="ele-btn-icon"
              size="mini">调出
            </el-button>
          </template>
        </ele-pro-table>
      </el-col>
      <el-col :md="8">
        <ele-pro-table
          :loading="loading"
          sub-title="未归档列表"
          :datasource="data2"
          :columns="columns2"
          height="400px"
          :selection.sync="selection2"
          :need-page="false"
          :toolkit="[]">
          <template slot="toolkit">
            <el-button
              @click="moveIn"
              type="primary"
              icon="el-icon-top-left"
              class="ele-btn-icon"
              size="mini">调入
            </el-button>
          </template>
        </ele-pro-table>
      </el-col>
    </el-row>
    <div slot="footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'FileSort',
  props: {
    // 弹窗是否打开
    visible: Boolean,
    // 案卷列表
    documents: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      // 案卷表格列配置
      columns1: [
        {
          prop: 'title',
          label: '案卷题名',
          showOverflowTooltip: true
        },
        {
          prop: 'piece_no',
          label: '案卷档号',
          showOverflowTooltip: true
        }
      ],
      // 卷内表格列配置
      columns2: [
        {
          columnKey: 'selection',
          type: 'selection',
          width: 45,
          align: 'center'
        },
        {
          prop: 'title',
          label: '文件题名',
          showOverflowTooltip: true
        },
        {
          prop: 'archive_no',
          label: '文件档号',
          showOverflowTooltip: true
        }
      ],
      // 案卷下的全部文件列表
      data: [],
      // 选中案卷
      current: null,
      // 加载loading
      loading: true,
      // 卷内列表选中数据
      selection1: [],
      // 未归档列表选中数据
      selection2: []
    }
  },
  computed: {
    // 选中案卷的卷内文件
    data1() {
      if (!this.current) {
        return []
      }
      return this.data.filter(d => d.piece_no === this.current.piece_no)
    },
    // 未归档的卷内文件
    data2() {
      return this.data.filter(d => !d.piece_no)
    }
  },
  methods: {
    /* 弹窗被打开 */
    onOpened() {
      this.query()
      if (this.documents.length) {
        this.$refs.docTable.setCurrentRow(this.documents[0])
      }
    },
    /* 弹窗被关闭 */
    onClosed() {
      this.data = []
    },
    /* 查询所选案卷的卷内文件 */
    query() {
      this.loading = true
      this.$http.get('https://cdn.eleadmin.com/20200610/archive.json').then(res => {
        this.loading = false
        if (res.data.code === 0) {
          this.data = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(e => {
        this.loading = false
        this.$message.error(e.message)
      })
    },
    /* 上移 */
    moveUp() {
      if (!this.selection1.length) {
        return this.$message.error('请选择一条数据')
      }
      if (this.selection1.length > 1) {
        return this.$message.error('只能选择一条数据')
      }
      if (this.data1.indexOf(this.selection1[0]) === 0) {
        return
      }
      const index = this.data.indexOf(this.selection1[0])
      const old = this.data[index - 1]
      this.$set(this.data, index - 1, this.selection1[0])
      this.$set(this.data, index, old)
      this.$nextTick(() => {
        this.$refs.fileTable.toggleRowSelection(this.data[index - 1])
      })
    },
    /* 下移 */
    moveDown() {
      if (!this.selection1.length) {
        return this.$message.error('请选择一条数据')
      }
      if (this.selection1.length > 1) {
        return this.$message.error('只能选择一条数据')
      }
      if (this.data1.indexOf(this.selection1[0]) === this.data1.length - 1) {
        return
      }
      const index = this.data.indexOf(this.selection1[0])
      const old = this.data[index + 1]
      this.$set(this.data, index + 1, this.selection1[0])
      this.$set(this.data, index, old)
      this.$nextTick(() => {
        this.$refs.fileTable.toggleRowSelection(this.data[index + 1])
      })
    },
    /* 调出 */
    moveOut() {
      if (!this.selection1.length) {
        return this.$message.error('请至少选择一条数据')
      }
      this.selection1.forEach(d => {
        d.piece_no = ''
      })
    },
    /* 调入 */
    moveIn() {
      if (!this.current) return
      if (!this.selection2.length) {
        return this.$message.error('请至少选择一条数据')
      }
      this.selection2.forEach(d => {
        d.piece_no = this.current.piece_no
      })
    },
    /* 保存 */
    save() {
      const result = this.data.map(d => {
        return {
          archive_no: d.archive_no,
          piece_no: d.piece_no
        }
      })
      console.log(result)
      this.updateVisible(false)
    },
    /* 关闭弹窗 */
    close() {
      this.updateVisible(false)
    },
    /* 更新visible */
    updateVisible(value) {
      this.$emit('update:visible', value)
    }
  }
}
</script>

<style>
.demo-file-sort-dialog {
  margin-bottom: 5vh;
}

.demo-file-sort-dialog .el-dialog__body {
  padding-top: 15px;
  padding-bottom: 0;
}

.demo-file-sort-dialog .el-dialog__body > .el-row > .el-col {
  margin-bottom: 15px;
}

.demo-file-sort-table .el-table__row {
  cursor: pointer;
}

.demo-file-sort-table .el-table__row > td:last-child:after {
  content: "\e6e0";
  font-family: element-icons !important;
  font-style: normal;
  font-variant: normal;
  text-transform: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1;
  position: absolute;
  right: 10px;
  top: 50%;
  margin-top: -7px;
}

.demo-file-sort-table .el-table__row > td:last-child .cell {
  padding-right: 20px;
}

.demo-file-sort-table .ele-table-tool-title {
  line-height: 28px;
}
</style>
