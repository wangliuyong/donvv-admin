<!-- 高级表格组件 license by http://eleadmin.com -->
<template>
  <div
    :class="['ele-pro-table ele-bg-white', {'ele-pro-table-fullscreen': isFullscreen}]"
    :style="{zIndex: fullZIndex}">
    <ele-toolbar
      v-if="toolbar"
      ref="toolbar"
      :theme="toolsTheme"
      :title="title"
      :sub-title="subTitle"
      :size="tableSize"
      :columns="cols"
      :tools="toolkit"
      :columns-sort="columnsSort"
      :toolkit-style="toolkitStyle"
      :style="toolStyle"
      :class="toolClass"
      :is-fullscreen="isFullscreen"
      @reload="reload"
      @update:size="updateSize"
      @update:columns="updateColumns"
      @fullscreen="toggleFullscreen">
      <slot name="toolbar"/>
      <template slot="action">
        <slot name="toolkit"/>
      </template>
    </ele-toolbar>
    <!-- 表格 -->
    <el-table
      ref="table"
      :data="list"
      v-loading="isLoading"
      :height="height"
      :max-height="maxHeight"
      :stripe="stripe"
      :border="border"
      :size="tableSize"
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
      <template v-if="!reloading">
        <ele-pro-table-column
          v-for="col in cols"
          :key="col.columnKey||col.prop"
          :col="col"
          :index="tableIndex">
          <template
            v-for="name in Object.keys($scopedSlots)"
            :slot="name"
            slot-scope="{row, column, $index}">
            <slot
              :name="name"
              v-bind:row="row"
              v-bind:column="column"
              v-bind:$index="$index"/>
          </template>
        </ele-pro-table-column>
      </template>
      <ele-empty
        slot="empty"
        :text="errorText||emptyText"/>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      v-if="needPage"
      :current-page="page"
      :page-size="limit"
      :total="total"
      :background="true"
      :layout="layout"
      :page-sizes="pageSizes"
      :pager-count="pagerCount"
      :popper-class="popperClass"
      :prev-text="prevText"
      :next-text="nextText"
      :hide-on-single-page="hideOnSinglePage"
      @size-change="pageSizeChange"
      @current-change="pageCurrentChange"
      :style="paginationStyle"
      class="ele-pagination-circle"/>
  </div>
</template>

<script>
import EleProTableColumn from '../../ele-pro-table-column';
import EleEmpty from '../../ele-empty';
import EleToolbar from '../../ele-toolbar';
// 如果是服务端数据源默认请求参数名称
const defaultRequest = {
  // 页码的参数名称
  pageName: 'page',
  // 每页数据量的参数名
  limitName: 'limit',
  // 排序字段参数名称
  sortName: 'sort',
  // 排序方式的参数名称
  orderName: 'order'
};

export default {
  name: 'EleProTable',
  components: {
    EleProTableColumn,
    EleEmpty,
    EleToolbar
  },
  emits: [
    'done',
    'update:selection',
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
    // 数据源
    datasource: [String, Array, Function],
    // 如果是服务端数据源设定请求方式
    method: {
      type: String,
      default: 'GET'
    },
    // 如果是服务端数据源设定请求的参数
    where: Object,
    // 如果是服务端数据源设定请求的header
    headers: Object,
    // 如果是服务端数据源设定请求数据类型
    contentType: {
      type: String,
      default: 'application/json'
    },
    // 如果是服务端数据源设定请求参数名称
    request: Object,
    // 如果是服务端数据源自定义返回格式解析
    parseData: Function,
    // 如果是服务端数据源自定义参数格式解析
    parseParam: Function,
    // 列表选中数据(多选)，支持 .sync 修饰符
    selection: Array,
    // 列表选中数据(单选)，支持 .sync 修饰符
    current: Object,
    // 是否需要分页组件
    needPage: {
      type: Boolean,
      default: true
    },
    // 如果是服务端数据源默认是否请求数据
    initLoad: {
      type: Boolean,
      default: true
    },
    // 表格请求状态
    loading: {
      type: Boolean,
      default: true
    },
    // 表格列配置
    columns: {
      type: Array,
      required: true
    },
    // Table 的高度，默认为自动高度。如果 height 为 number 类型，单位 px
    height: [String, Number],
    // Table 的最大高度。合法的值为数字或者单位为 px 的高度
    maxHeight: [String, Number],
    // 是否为斑马纹 table
    stripe: Boolean,
    // 是否带有纵向边框
    border: {
      type: Boolean,
      default: true
    },
    // Table 的尺寸
    size: {
      type: String,
      default: 'medium'
    },
    // 列的宽度是否自撑开
    fit: {
      type: Boolean,
      default: true
    },
    // 是否显示表头
    showHeader: {
      type: Boolean,
      default: true
    },
    // 是否要高亮当前行
    highlightCurrentRow: Boolean,
    // 当前行的 key，只写属性
    currentRowKey: [String, Number],
    // 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className
    rowClassName: [String, Function],
    // 行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style
    rowStyle: [Object, Function],
    // 单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className
    cellClassName: [String, Function],
    // 单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style
    cellStyle: [Object, Function],
    // 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className
    headerRowClassName: [String, Function],
    // 表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style
    headerRowStyle: [Object, Function],
    // 表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className
    headerCellClassName: [String, Function],
    // 表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style
    headerCellStyle: [Object, Function],
    // 行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能与显示树形数据时，该属性是必填的
    rowKey: [String, Function],
    // 空数据时显示的文本内容
    emptyText: String,
    // 是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效
    defaultExpandAll: Boolean,
    // 可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组
    expandRowKeys: Array,
    // 默认的排序列的 prop 和顺序。它的prop属性指定默认的排序的列，order指定默认排序的顺序
    defaultSort: Object,
    // tooltip effect 属性
    tooltipEffect: String,
    // 是否在表尾显示合计行
    showSummary: Boolean,
    // 合计行第一列的文本
    sumText: String,
    // 自定义的合计计算方法
    summaryMethod: Function,
    // 合并行或列的计算方法
    spanMethod: Function,
    // 在多选表格中，当仅有部分行被选中时，点击表头的多选框时的行为。若为 true，则选中所有行；若为 false，则取消选择所有行
    selectOnIndeterminate: {
      type: Boolean,
      default: true
    },
    // 展示树形数据时，树节点的缩进
    indent: {
      type: Number,
      default: 16
    },
    // 是否懒加载子节点数据
    lazy: Boolean,
    // 加载子节点数据的函数，lazy 为 true 时生效，函数第二个参数包含了节点的层级信息
    load: Function,
    // 渲染嵌套数据的配置选项
    treeProps: {
      type: Object,
      default() {
        return {
          hasChildren: 'hasChildren',
          children: 'children'
        };
      }
    },
    // 分页组件每页显示条目个数
    pageSize: {
      type: Number,
      default: 10
    },
    // 分页组件页码按钮的数量，当总页数超过该值时会折叠
    pagerCount: {
      type: Number,
      default: 5
    },
    // 分页组件默认页码
    currentPage: {
      type: Number,
      default: 1
    },
    // 分页组件布局，子组件名用逗号分隔
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    // 分页组件每页显示个数选择器的选项设置
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 40, 50, 100];
      }
    },
    // 分页组件每页显示个数选择器的下拉框类名
    popperClass: String,
    // 分页组件替代图标显示的上一页文字
    prevText: String,
    // 分页组件替代图标显示的下一页文字
    nextText: String,
    // 分页组件只有一页时是否隐藏
    hideOnSinglePage: {
      type: Boolean,
      default: false
    },
    // 表头工具栏主题风格
    toolsTheme: String,
    // 标题
    title: String,
    // 二级标题
    subTitle: String,
    // 表头工具按钮布局
    toolkit: {
      type: Array,
      default() {
        return ['reload', 'size', 'columns', 'fullscreen'];
      }
    },
    // 是否开启列拖拽排序
    columnsSort: {
      type: Boolean,
      default: true
    },
    // 行点击选中
    rowClickChecked: Boolean,
    // 行点击选中当单个选中时互斥
    rowClickCheckedIntelligent: {
      type: Boolean,
      default: true
    },
    // 是否显示
    toolbar: {
      type: Boolean,
      default: true
    },
    // 工具栏样式
    toolStyle: [Object, String],
    // 自定义工具栏class
    toolClass: String,
    // 工具栏右侧样式
    toolkitStyle: [Object, String],
    // 分页组件样式
    paginationStyle: [Object, String],
    // 表格全屏时的z-index
    fullZIndex: {
      type: Number,
      default: 999
    }
  },
  data() {
    let isServer = !Array.isArray(this.datasource),
      requestNames = Object.assign(defaultRequest, this.request),
      order = {};
    if (this.defaultSort) {
      order[requestNames.sortName] = this.defaultSort.prop;
      order[requestNames.orderName] = {
        ascending: 'asc',
        descending: 'desc'
      }[this.defaultSort.order];
    }
    return {
      // 数据请求状态
      isLoading: this.loading,
      // 是否是服务端返回数据
      isServer: isServer,
      // 全部数据
      data: isServer ? [] : this.datasource,
      // 数据总数量
      total: isServer ? 0 : this.datasource.length,
      // 当前在第几页
      page: this.currentPage,
      // 每页显示数量
      limit: this.pageSize,
      // 当前排序参数
      order: order,
      // 请求参数名称
      requestNames: requestNames,
      // 请求错误后的提示信息
      errorText: null,
      // 表格列配置
      cols: this.columns,
      // 是否重载表格列
      reloading: false,
      // 表格尺寸
      tableSize: this.size,
      // 是否是全屏状态
      isFullscreen: false
    };
  },
  computed: {
    // 表格当前显示数据
    list() {
      if (this.isServer) {
        return this.data;
      }
      let data = this.data,
        sort = this.order[this.requestNames.sortName],
        order = this.order[this.requestNames.orderName];
      // 前端排序
      if (sort) {
        data.sort((a, b) => {
          if (b[sort] == a[sort]) {
            return 0;
          }
          if (order === 'desc') {
            return (a[sort] < b[sort]) ? 1 : -1;
          }
          return (a[sort] < b[sort]) ? -1 : 1;
        });
      }
      // 前端分页
      if (this.needPage) {
        let start = (this.page - 1) * this.limit;
        let end = start + this.limit;
        if (end > data.length) {
          end = data.length;
        }
        return data.slice(start, end);
      }
      return data;
    },
    // 表格索引开始序号
    tableIndex() {
      return this.needPage ? ((this.page - 1) * this.limit + 1) : 1;
    }
  },
  watch: {
    datasource() {
      this.isServer = !Array.isArray(this.datasource);
      if (!this.isServer) {
        this.data = this.datasource;
        this.total = this.datasource.length;
      }
      this.reload();
    },
    request() {
      this.requestNames = Object.assign(defaultRequest, this.request);
    },
    pageSize() {
      this.limit = this.pageSize;
      this.reload();
    },
    currentPage() {
      this.page = this.currentPage;
      this.reload();
    },
    columns() {
      this.cols = this.columns;
      this.$refs.toolbar.initColumnList();
    },
    size() {
      this.tableSize = this.size;
    },
    loading() {
      this.isLoading = this.loading;
    }
  },
  mounted() {
    if (this.initLoad) {
      this.reload();
    }
  },
  methods: {
    /* 获取数据 */
    reload(obj) {
      if (obj) {
        if (obj.page) {
          this.page = obj.page;
        }
      }
      this.errorText = null;
      // 前端分页
      if (!this.isServer) {
        this.isLoading = false;
        this.$emit('done', {
            data: this.list,
            total: this.total
          },
          this.needPage ? this.page : 1,
          this.total,
          this.$refs.table
        );
        return;
      }
      // 后端分页
      this.isLoading = true;
      if (typeof this.datasource === 'function') {
        // 自定义请求方法
        this.datasource({
          page: this.page,
          limit: this.limit,
          where: this.where,
          order: this.order
        }, function (data, total) {
          this.isLoading = false;
          if (Array.isArray(data)) {
            this.data = data;
            this.total = total || data.length;
            if (this.needPage) {
              let max = Math.ceil(this.total / this.limit);
              if (max < this.page) {
                this.page = max || 1;
              }
            }
            this.$emit('done', {
                data: data,
                total: total
              },
              this.needPage ? this.page : 1,
              this.total,
              this.$refs.table
            );
          } else if (typeof data === 'string') {
            this.errorText = data;
          } else {
            this.errorText = '获取数据失败';
            console.error('callback返回的data格式错误: ', data);
          }
        });
      } else {
        // 数据源为url方式
        let pageParam = {};
        if (this.needPage) {
          pageParam[this.requestNames.pageName] = this.page;
          pageParam[this.requestNames.limitName] = this.limit;
        }
        let params = Object.assign(
          {},
          this.where || {},
          pageParam,
          this.order
        ), data = null;
        if (this.parseParam) {
          params = this.parseParam(params);
        }
        let method = this.method ? this.method.toUpperCase() : 'GET';
        if (['POST', 'PUT', 'PATCH'].indexOf(method) !== -1) {
          data = params;
          params = null;
          if (this.contentType && this.contentType.toLowerCase().indexOf('form') !== -1) {
            let formData = new FormData();
            for (let key in data) {
              if (!Object.prototype.hasOwnProperty.call(data, key)) {
                continue;
              }
              formData.append(key, data[key]);
            }
            data = formData;
          }
        }
        this.$http.request({
          url: this.datasource,
          method: method,
          params: params,
          data: data,
          headers: this.headers
        }).then(res => {
          this.isLoading = false;
          const result = this.parseData ? this.parseData(res.data) : res.data;
          if (result.code === 0) {
            this.data = result.data;
            this.total = result.count || this.data.length;
            if (this.needPage) {
              let max = Math.ceil(this.total / this.limit);
              if (max < this.page) {
                this.page = max || 1;
              }
            }
            this.$emit('done',
              result,
              this.needPage ? this.page : 1,
              this.total,
              this.$refs.table
            );
          } else {
            this.errorText = result.msg || '获取数据失败, 正确的状态码为0';
          }
        }).catch(e => {
          this.isLoading = false;
          this.errorText = e.message;
        });
      }
    },
    /* 分页 pageSize 改变时会触发 */
    pageSizeChange(limit) {
      this.limit = limit;
      this.reload(true);
    },
    /* 分页 currentPage 改变时会触发 */
    pageCurrentChange(page) {
      this.page = page;
      this.reload();
    },
    /* 当用户手动勾选数据行的 Checkbox 时触发的事件	 */
    select(selection, row) {
      this.$emit('select', selection, row);
    },
    /* 当用户手动勾选全选 Checkbox 时触发的事件 */
    selectAll(selection) {
      this.$emit('select-all', selection);
    },
    /* 当选择项发生变化时会触发该事件 */
    selectionChange(selection) {
      this.$emit('update:selection', selection);
      this.$emit('selection-change', selection);
    },
    /* 当单元格 hover 进入时会触发该事件 */
    cellMouseEnter(row, column, cell, event) {
      this.$emit('cell-mouse-enter', row, column, cell, event);
    },
    /* 当单元格 hover 退出时会触发该事件 */
    cellMouseLeave(row, column, cell, event) {
      this.$emit('cell-mouse-leave', row, column, cell, event);
    },
    /* 当某个单元格被点击时会触发该事件 */
    cellClick(row, column, cell, event) {
      this.$emit('cell-click', row, column, cell, event);
    },
    /* 当某个单元格被双击击时会触发该事件 */
    cellDblclick(row, column, cell, event) {
      this.$emit('cell-dblclick', row, column, cell, event);
    },
    /* 当某一行被点击时会触发该事件 */
    rowClick(row, column, event) {
      if (this.rowClickChecked && this.selection) {
        if (this.rowClickCheckedIntelligent && (this.selection.length === 0 || this.selection.length === 1)) {
          this.clearSelection();
          this.toggleRowSelection(row, true);
        } else {
          this.toggleRowSelection(row);
        }
      }
      this.$emit('row-click', row, column, event);
    },
    /* 当某一行被鼠标右键点击时会触发该事件 */
    rowContextmenu(row, column, event) {
      this.$emit('row-contextmenu', row, column, event);
    },
    /* 当某一行被双击时会触发该事件 */
    rowDblclick(row, column, event) {
      this.$emit('row-dblclick', row, column, event);
    },
    /* 当某一列的表头被点击时会触发该事件 */
    headerClick(column, event) {
      this.$emit('header-click', column, event);
    },
    /* 当某一列的表头被鼠标右键点击时触发该事件 */
    headerContextmenu(column, event) {
      this.$emit('header-contextmenu', column, event);
    },
    /* 当表格的排序条件发生变化的时候会触发该事件 */
    sortChange({column, prop, order}) {
      if (this.$listeners['sort-change']) {
        this.$emit('sort-change', {column, prop, order});
      } else {
        let temp = {};
        if (order) {
          temp[this.requestNames.sortName] = prop;
          temp[this.requestNames.orderName] = {ascending: 'asc', descending: 'desc'}[order];
        }
        this.order = temp;
        this.reload();
      }
    },
    /* 当表格的筛选条件发生变化的时候会触发该事件，filters的 key 是 column 的 columnKey，value 为用户选择的筛选条件的数组 */
    filterChange(filters) {
      this.$emit('filter-change', filters);
    },
    /* 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性 */
    currentChange(currentRow, oldCurrentRow) {
      this.$emit('update:current', currentRow);
      this.$emit('current-change', currentRow, oldCurrentRow);
    },
    /* 当拖动表头改变了列的宽度的时候会触发该事件 */
    headerDragend(newWidth, oldWidth, column, event) {
      this.$emit('header-dragend', newWidth, oldWidth, column, event);
    },
    /* 当用户对某一行展开或者关闭的时候会触发该事件（展开行时，回调的第二个参数为 expandedRows；树形表格时第二参数为 expanded） */
    expandChange(row, expandedRows) {
      this.$emit('expand-change', row, expandedRows);
    },
    /* 用于多选表格，清空用户的选择 */
    clearSelection() {
      this.$refs.table.clearSelection();
    },
    /* 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中） */
    toggleRowSelection(row, selected) {
      this.$refs.table.toggleRowSelection(row, selected);
    },
    /* 用于多选表格，切换所有行的选中状态 */
    toggleAllSelection() {
      this.$refs.table.toggleAllSelection();
    },
    /* 用于可展开表格与树形表格，切换某一行的展开状态，如果使用了第二个参数，则是设置这一行展开与否（expanded 为 true 则展开） */
    toggleRowExpansion(row, expanded) {
      this.$refs.table.toggleRowExpansion(row, expanded);
    },
    /* 用于单选表格，设定某一行为选中行，如果调用时不加参数，则会取消目前高亮行的选中状态 */
    setCurrentRow(row) {
      this.$refs.table.setCurrentRow(row);
    },
    /* 用于清空排序条件，数据会恢复成未排序的状态 */
    clearSort() {
      this.$refs.table.clearSort();
    },
    /* 不传入参数时用于清空所有过滤条件，数据会恢复成未过滤的状态，也可传入由columnKey组成的数组以清除指定列的过滤条件 */
    clearFilter(columnKey) {
      this.$refs.table.clearFilter(columnKey);
    },
    /* 对 Table 进行重新布局，当 Table 或其祖先元素由隐藏切换为显示时，可能需要调用此方法 */
    doLayout() {
      this.$refs.table.doLayout();
    },
    /* 手动对 Table 进行排序，参数prop属性指定排序列，order指定排序顺序 */
    sort(prop, order) {
      this.$refs.table.sort(prop, order);
    },
    /* 修改表格尺寸 */
    updateSize(value) {
      this.tableSize = value;
    },
    /* 修改表格尺寸 */
    updateColumns(value) {
      this.reloading = true;
      this.cols = value;
      this.$nextTick(() => {
        this.reloading = false;
      });
    },
    /* 全屏切换 */
    toggleFullscreen(value) {
      this.isFullscreen = value;
    }
  }
}
</script>

<style>
.ele-pro-table.ele-pro-table-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  padding-bottom: 15px;
  box-sizing: border-box;
}
</style>
