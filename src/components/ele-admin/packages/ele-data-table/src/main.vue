<!-- 数据表格组件 license by http://eleadmin.com -->
<template>
  <div class="ele-data-table-group">
    <!-- 表格 -->
    <el-table
      ref="dataTable"
      :data="list"
      v-loading="loading"
      :height="height"
      :max-height="maxHeight"
      :stripe="stripe"
      :border="border"
      :size="size"
      :fit="fit"
      :show-header="showHeader"
      :highlight-current-row="highlightCurrentRow"
      :current-row-key="currentRowKey"
      :row-class-name="rowClassName"
      :row-style="rowStyle"
      :cell-class-name="cellClassName"
      :cell-style="cellStyle"
      :header-row-class-name="headerRowClassName"
      :header-row-style="headerRowStyle"
      :header-cell-class-name="headerCellClassName"
      :header-cell-style="headerCellStyle"
      :row-key="rowKey"
      :empty-text="emptyText"
      :default-expand-all="defaultExpandAll"
      :expand-row-keys="expandRowKeys"
      :default-sort="defaultSort"
      :tooltip-effect="tooltipEffect"
      :show-summary="showSummary"
      :sum-text="sumText"
      :summary-method="summaryMethod"
      :span-method="spanMethod"
      :select-on-indeterminate="selectOnIndeterminate"
      :indent="indent"
      :lazy="lazy"
      :load="load"
      :tree-props="treeProps"
      @select="select"
      @select-all="selectAll"
      @selection-change="selectionChange"
      @cell-mouse-enter="cellMouseEnter"
      @cell-mouse-leave="cellMouseLeave"
      @cell-click="cellClick"
      @cell-dblclick="cellDblclick"
      @row-click="rowClick"
      @row-contextmenu="rowContextmenu"
      @row-dblclick="rowDblclick"
      @header-click="headerClick"
      @header-contextmenu="headerContextmenu"
      @sort-change="sortChange"
      @filter-change="filterChange"
      @current-change="currentChange"
      @header-dragend="headerDragend"
      @expand-change="expandChange"
      style="width: 100%;">
      <slot
        v-bind:page="page"
        v-bind:count="count"
        v-bind:index="tableIndex"/>
      <ele-empty slot="empty" :text="emptyText"/>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      v-if="page"
      :current-page="page.page"
      :page-size="page.limit"
      :total="count"
      :background="true"
      :layout="layout"
      :page-sizes="pageSizes"
      :pager-count="pagerCount"
      :prev-text="prevText"
      :next-text="nextText"
      :hide-on-single-page="hideOnSinglePage"
      @size-change="pageSizeChange"
      @current-change="pageCurrentChange"
      class="ele-pagination-circle"/>
  </div>
</template>

<script>
export default {
  name: 'EleDataTable',
  emits: [
    'done',
    'update:choose',
    'update:current',
    'select',
    'select-all',
    'selection-change',
    'cell-mouse-enter',
    'cell-mouse-leave',
    'cell-click',
    'cell-dblclick',
    'row-click',
    'row-contextmenu',
    'row-dblclick',
    'header-click',
    'header-contextmenu',
    'sort-change',
    'filter-change',
    'current-change',
    'header-dragend',
    'expand-change'
  ],
  props: {
    // 数据表格参数配置
    config: {
      type: Object,
      default() {
        return {}
      }
    },
    // 前端分页直接指定数据
    data: Array,
    // 列表选中数据(多选)
    choose: Array,
    // 列表选中数据(单选)
    current: Object,
    // 强制后端分页
    servePage: Boolean,
    // 自动请求数据
    initLoad: {
      type: Boolean,
      default: true
    },
    // 表格参数
    size: String,
    width: [String, Number],
    height: [String, Number],
    maxHeight: [String, Number],
    fit: {
      type: Boolean,
      default: true
    },
    stripe: Boolean,
    border: {
      type: Boolean,
      default: true
    },
    rowKey: [String, Function],
    showHeader: {
      type: Boolean,
      default: true
    },
    showSummary: Boolean,
    sumText: String,
    summaryMethod: Function,
    rowClassName: [String, Function],
    rowStyle: [Object, Function],
    cellClassName: [String, Function],
    cellStyle: [Object, Function],
    headerRowClassName: [String, Function],
    headerRowStyle: [Object, Function],
    headerCellClassName: [String, Function],
    headerCellStyle: [Object, Function],
    highlightCurrentRow: Boolean,
    currentRowKey: [String, Number],
    emptyText: String,
    expandRowKeys: Array,
    defaultExpandAll: Boolean,
    defaultSort: Object,
    tooltipEffect: String,
    spanMethod: Function,
    selectOnIndeterminate: {
      type: Boolean,
      default: true
    },
    indent: {
      type: Number,
      default: 16
    },
    treeProps: {
      type: Object,
      default() {
        return {
          hasChildren: 'hasChildren',
          children: 'children'
        };
      }
    },
    lazy: Boolean,
    load: Function,
    // 分页组件参数
    pagerCount: {
      type: Number,
      default: 5
    },
    layout: {
      default: 'total, sizes, prev, pager, next, jumper'
    },
    pageSizes: Array,
    prevText: String,
    nextText: String,
    hideOnSinglePage: Boolean
  },
  data() {
    // 分页参数
    let page = false;
    if (this.config.page !== false) {
      page = Object.assign({page: 1, limit: 10}, this.config.page === true ? {} : this.config.page);
    }
    // 请求参数名
    let request = Object.assign({
      pageName: 'page', limitName: 'limit', sortName: 'sort', orderName: 'order'
    }, this.config.request);
    return {
      // 加载状态
      loading: false,
      // 列表数据源(后端)
      mData: [],
      // 总数量
      count: this.data ? this.data.length : 0,
      // 分页参数
      page: page,
      // 排序参数
      order: this.config.order ? this.config.order : {},
      // 请求参数名
      request: request
    };
  },
  computed: {
    /* 表格当前显示数据 */
    list() {
      let allData;
      if (this.data) {
        allData = this.data;
      } else if (this.mData.length < this.count) {
        return this.mData;
      } else {
        allData = this.mData;
      }
      let sort = this.order[this.request.sortName],
        order = this.order[this.request.orderName];
      // 进行前端分页、排序
      if (this.page) {
        let start = (this.page.page - 1) * this.page.limit;
        let end = start + this.page.limit;
        end = end > allData.length ? allData.length : end;
        if (sort) {
          return allData.sort((a, b) => {
            if (b[sort] == a[sort]) return 0;
            if (order === 'desc') {
              return (a[sort] < b[sort]) ? 1 : -1;
            } else {
              return (a[sort] < b[sort]) ? -1 : 1;
            }
          }).slice(start, end);
        } else {
          return allData.slice(start, end);
        }
      } else {
        // 进行前端排序
        if (sort) {
          return allData.sort((a, b) => {
            if (b[sort] == a[sort]) return 0;
            if (order === 'desc') {
              return (a[sort] < b[sort]) ? 1 : -1;
            } else {
              return (a[sort] < b[sort]) ? -1 : 1;
            }
          });
        } else {
          return allData;
        }
      }
    },
    /* 表格索引开始序号 */
    tableIndex() {
      if (!this.page) return 1;
      return (this.page.page - 1) * this.page.limit + 1;
    }
  },
  watch: {
    /* 监听数据改变 */
    data() {
      this.count = this.data.length;
      if (this.page) {
        let maxPage = Math.ceil(this.count / this.page.limit);
        if (maxPage < this.page.page) this.page.page = maxPage || 1;
      }
    }
  },
  mounted() {
    if (this.initLoad) {
      this.reload(true);
    }
  },
  methods: {
    /* 获取数据 */
    reload(first) {
      let config;
      if (typeof first === 'object') {
        config = Object.assign({}, this.config, first);
        first = false;
      } else {
        config = this.config;
      }
      if (!first) {
        // 分页参数
        if (config.page) {
          this.page = Object.assign({
            page: 1, limit: 10
          }, this.page || {}, config.page === true ? {} : config.page);
        } else if (this.page === false) {
          this.page = false;
        }
        // 排序参数
        if (config.order) {
          Object.assign(this.order, config.order);
        }
        // 请求参数名
        if (config.request) {
          Object.assign(this.request, config.request);
        }
      }
      if (config.url && (this.servePage || !first || !this.mData.length || this.mData.length < this.count)) {  // 后端分页
        this.loading = true;
        let pageParam = {};
        if (this.page) {
          pageParam[this.request.pageName] = this.page.page;
          pageParam[this.request.limitName] = this.page.limit;
        }
        let params, data = Object.assign({}, config.where || {}, pageParam, this.order);
        if (config.parseParam) data = config.parseParam(data);
        let method = config.method ? config.method.toUpperCase() : 'GET';
        if (['POST', 'PUT', 'PATCH'].indexOf(method) === -1) {
          params = data;
          data = undefined;
        } else if (config.contentType && config.contentType.toLowerCase().indexOf('form') !== -1) {
          let formData = new FormData();
          for (let key in data) {
            if (!Object.prototype.hasOwnProperty.call(data, key)) continue;
            formData.append(key, data[key]);
          }
          data = formData;
        }
        this.$http.request({
          url: config.url,
          method: method,
          params: params,
          data: data,
          headers: config.headers
        }).then(res => {
          this.loading = false;
          if (config.parseData) {
            res.data = config.parseData(res.data);
          }
          if (res.data.code === 0) {
            this.mData = res.data.data;
            this.count = res.data.count || this.mData.length;
            if (this.page) {
              let maxPage = Math.ceil(this.count / this.page.limit);
              if (maxPage < this.page.page) {
                this.page.page = maxPage || 1;
              }
            }
            this.$emit('done', res.data, this.page ? this.page.page : 1, this.count, this.$refs.dataTable);
          } else {
            this.$message.error(res.data.msg || '获取数据失败, 正确的状态码为0');
          }
        }).catch(e => {
          this.loading = false;
          this.$message.error(e.message);
        });
      } else {  // 前端分页
        this.$emit('done', {data: this.list}, this.page ? this.page.page : 1, this.count, this.$refs.dataTable);
      }
    },
    /* 获取列表当前显示数据 */
    getData() {
      return this.list;
    },
    /* 获取列表的排序参数 */
    getOrder() {
      return this.order;
    },
    /* 获取列表的分页参数 */
    getPage() {
      return this.page;
    },
    /* 分页limit改变 */
    pageSizeChange(limit) {
      this.page.limit = limit;
      this.reload(true);
    },
    /* 分页page改变 */
    pageCurrentChange(page) {
      this.page.page = page;
      this.reload(true);
    },
    select(selection, row) {
      this.$emit('select', selection, row);
    },
    selectAll(selection) {
      this.$emit('select-all', selection);
    },
    /* 多选改变 */
    selectionChange(selection) {
      this.$emit('update:choose', selection);
      this.$emit('selection-change', selection);
    },
    cellMouseEnter(row, column, cell, event) {
      this.$emit('cell-mouse-enter', row, column, cell, event);
    },
    cellMouseLeave(row, column, cell, event) {
      this.$emit('cell-mouse-leave', row, column, cell, event);
    },
    cellClick(row, column, cell, event) {
      this.$emit('cell-click', row, column, cell, event);
    },
    cellDblclick(row, column, cell, event) {
      this.$emit('cell-dblclick', row, column, cell, event);
    },
    /* 行点击事件 */
    rowClick(row, column, event) {
      if (this.highlightCurrentRow && this.choose) {
        if (this.choose.length === 0 || this.choose.length === 1) {
          this.clearSelection();
          this.toggleRowSelection(row, true);
        } else {
          this.toggleRowSelection(row);
        }
      }
      this.$emit('row-click', row, column, event);
    },
    rowContextmenu(row, column, event) {
      this.$emit('row-contextmenu', row, column, event);
    },
    rowDblclick(row, column, event) {
      this.$emit('row-dblclick', row, column, event);
    },
    headerClick(column, event) {
      this.$emit('header-click', column, event);
    },
    headerContextmenu(column, event) {
      this.$emit('header-contextmenu', column, event);
    },
    /* 排序改变 */
    sortChange({column, prop, order}) {
      if (this.$listeners['sort-change']) {
        this.$emit('sort-change', {column, prop, order});
      } else {
        let temp = {};
        temp[this.request.sortName] = order ? prop : undefined;
        temp[this.request.orderName] = order ? {
          ascending: 'asc', descending: 'desc'
        }[order] : undefined;
        this.order = temp;
        this.reload(true);
      }
    },
    filterChange(filters) {
      this.$emit('filter-change', filters);
    },
    /* 单选改变 */
    currentChange(currentRow, oldCurrentRow) {
      this.$emit('update:current', currentRow);
      this.$emit('current-change', currentRow, oldCurrentRow);
    },
    headerDragend(newWidth, oldWidth, column, event) {
      this.$emit('header-dragend', newWidth, oldWidth, column, event);
    },
    expandChange(row, expandedRows) {
      this.$emit('expand-change', row, expandedRows);
    },
    clearSelection() {
      this.$refs.dataTable.clearSelection();
    },
    toggleRowSelection(row, selected) {
      this.$refs.dataTable.toggleRowSelection(row, selected);
    },
    toggleAllSelection() {
      this.$refs.dataTable.toggleAllSelection();
    },
    toggleRowExpansion(row, expanded) {
      this.$refs.dataTable.toggleRowExpansion(row, expanded);
    },
    setCurrentRow(row) {
      this.$refs.dataTable.setCurrentRow(row);
    },
    clearSort() {
      this.$refs.dataTable.clearSort();
    },
    clearFilter(columnKey) {
      this.$refs.dataTable.clearFilter(columnKey);
    },
    doLayout() {
      this.$refs.dataTable.doLayout();
    },
    sort(prop, order) {
      this.$refs.dataTable.sort(prop, order);
    }
  }
}
</script>
