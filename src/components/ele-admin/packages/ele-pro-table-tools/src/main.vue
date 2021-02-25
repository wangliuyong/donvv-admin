<!-- 表格工具按钮组件 license by http://eleadmin.com -->
<template>
  <div class="ele-tool ele-space">
    <slot/>
    <template v-for="tool in tools">
      <template v-if="tool==='reload'">
        <div class="ele-tool-item ele-action" :key="tool">
          <el-tooltip content="刷新" placement="top">
            <i class="el-icon-refresh-right" @click="reload"></i>
          </el-tooltip>
        </div>
      </template>
      <template v-if="tool==='size'">
        <div class="ele-tool-item ele-action" :key="tool">
          <el-tooltip content="密度" placement="top">
            <el-dropdown
              trigger="click"
              placement="bottom-end"
              @command="updateSize">
              <i class="el-icon-_nav"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="medium">
                  <span :class="{'ele-text-primary': size==='medium'}">默认</span>
                </el-dropdown-item>
                <el-dropdown-item command="small">
                  <span :class="{'ele-text-primary': size==='small'}">中等</span>
                </el-dropdown-item>
                <el-dropdown-item command="mini">
                  <span :class="{'ele-text-primary': size==='mini'}">紧凑</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-tooltip>
        </div>
      </template>
      <template v-if="tool==='columns'">
        <div class="ele-tool-item ele-action" :key="tool">
          <el-tooltip content="列设置" placement="top">
            <el-popover
              popper-class="ele-tool-column"
              placement="bottom-end"
              transition="el-zoom-in-top">
              <i class="el-icon-setting" slot="reference"></i>
              <div class="ele-tool-column-header ele-tool-column-item">
                <div v-if="columnsSort" style="width: 20px;"></div>
                <div v-else style="width: 10px;"></div>
                <el-checkbox
                  v-model="columnIsAllChecked"
                  :indeterminate="columnIsIndeterminate"
                  @change="onColumnCheckAllChange">列展示
                </el-checkbox>
                <el-link
                  type="primary"
                  :underline="false"
                  @click="resetColumnChecked">重置
                </el-link>
              </div>
              <el-divider/>
              <el-checkbox-group v-model="columnChecked" @change="onColumnCheckedChange">
                <draggable
                  v-model="columnList"
                  animation="300"
                  handle=".ele-tool-column-handle"
                  @change="onColumnSortChange">
                  <div
                    class="ele-tool-column-item"
                    v-for="element in columnList"
                    :key="element.key">
                    <div class="ele-tool-column-handle" v-if="columnsSort">
                      <i class="el-icon-_more"></i>
                      <i class="el-icon-_more"></i>
                    </div>
                    <div v-else style="width: 10px;"></div>
                    <el-checkbox :label="element.key">
                      {{ element.title }}
                    </el-checkbox>
                  </div>
                </draggable>
              </el-checkbox-group>
            </el-popover>
          </el-tooltip>
        </div>
      </template>
      <template v-if="tool==='fullscreen'">
        <div
          class="ele-tool-item ele-action"
          :key="tool"
          @click="toggleFullscreen">
          <el-tooltip content="全屏" placement="top">
            <i :class="isFullscreen?'el-icon-_screen-restore':'el-icon-_screen-full'"></i>
          </el-tooltip>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import util from '../../util';
import draggable from 'vuedraggable';

export default {
  name: 'EleProTableTools',
  components: {draggable},
  emits: [
    'reload',
    'update:size',
    'update:columns',
    'fullscreen'
  ],
  props: {
    // 表格尺寸，支持 .sync 修饰符
    size: {
      type: String,
      default: 'medium'
    },
    // 表格列配置，支持 .sync 修饰符
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    // 工具按钮布局
    tools: {
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
    // 是否是全屏状态
    isFullscreen: Boolean
  },
  data() {
    return {
      // 列配置原始数据
      orgColumns: this.columns,
      // 列配置下拉列表数据
      columnList: [],
      // 列配置下拉列表选中数据
      columnChecked: [],
      // 列配置下拉列表是否全选
      columnIsAllChecked: false,
      // 列配置下拉列表是否半选
      columnIsIndeterminate: false
    };
  },
  mounted() {
    // 获取列配置下拉列表数据
    this.initColumnList();
  },
  methods: {
    /* 刷新表格 */
    reload() {
      this.$emit('reload');
    },
    /* 修改表格尺寸 */
    updateSize(command) {
      this.$emit('update:size', command);
    },
    /* 获取列配置下拉列表数据 */
    initColumnList(reset) {
      let data = [];
      util.eachTreeData(this.orgColumns, d => {
        if (d.children && d.children.length) {
          return;
        }
        if (d.columnKey || d.prop) {
          data.push({
            key: d.columnKey || d.prop,
            title: d.label || ('index' === d.type ? '序号' : ('selection' === d.type ? '选择列' : '无标题')),
            show: d.show !== false
          });
        }
      });
      this.columnList = data;
      this.columnChecked = data.filter(d => d.show).map(d => d.key);
      this.columnIsAllChecked = this.columnList.length && this.columnList.length === this.columnChecked.length;
      this.columnIsIndeterminate = this.columnList.length !== this.columnChecked.length;
      // 默认有隐藏列或者强制重置
      if (reset || !this.columnIsAllChecked) {
        let columns = this.getCheckedColumns(this.orgColumns, this.columnChecked);
        this.$emit('update:columns', columns);
      }
    },
    /* 列配置改变 */
    onColumnCheckedChange() {
      this.columnIsAllChecked = !!this.columnList.length && this.columnList.length === this.columnChecked.length;
      this.columnIsIndeterminate = !!this.columnChecked.length && this.columnList.length !== this.columnChecked.length;
      let columns = this.getCheckedColumns(this.orgColumns, this.columnChecked);
      this.$emit('update:columns', columns);
    },
    /* 列配置全选/取消全选 */
    onColumnCheckAllChange() {
      if (this.columnIsAllChecked) {
        this.columnChecked = this.columnList.map(d => d.key);
      } else {
        this.columnChecked = [];
      }
      this.columnIsIndeterminate = false;
      let columns = this.getCheckedColumns(this.orgColumns, this.columnChecked);
      this.$emit('update:columns', columns);
    },
    /* 重置列配置 */
    resetColumnChecked() {
      this.initColumnList(true);
    },
    /* 获取显示的列配置 */
    getCheckedColumns(columns, checked) {
      let data = [];
      columns.forEach(d => {
        if (this.columnList.some(c => c.key === d.columnKey || c.key === d.prop)) {
          if (checked.indexOf(d.columnKey) === -1 && checked.indexOf(d.prop) === -1) {
            return;
          }
        }
        if (d.children) {
          let children = this.getCheckedColumns(d.children, checked);
          if (children.length) {
            data.push(Object.assign({}, d, {children: children}));
          }
        } else {
          data.push(Object.assign({}, d));
        }
      });
      // 排序
      if (this.columnsSort) {
        data.sort((a, b) => {
          let ai = this.columnList.findIndex(c => c.key === a.columnKey || c.key === a.prop),
            bi = this.columnList.findIndex(c => c.key === b.columnKey || c.key === b.prop);
          // 父级列处理
          if (ai === -1 && a.children && a.children.length) {
            ai = this.columnList.findIndex(c => c.key === a.children[0].columnKey || c.key === a.children[0].prop);
          }
          if (bi === -1 && b.children && b.children.length) {
            bi = this.columnList.findIndex(c => c.key === b.children[0].columnKey || c.key === b.children[0].prop);
          }
          // 固定列处理
          if (a.fixed === true || a.fixed === 'left') {
            ai -= this.columnList.length;
          } else if (a.fixed === 'right') {
            ai += this.columnList.length;
          }
          if (b.fixed === true || b.fixed === 'left') {
            bi -= this.columnList.length;
          } else if (b.fixed === 'right') {
            bi += this.columnList.length;
          }
          return ai - bi;
        });
      }
      return data;
    },
    /* 列配置拖动改变顺序 */
    onColumnSortChange() {
      let columns = this.getCheckedColumns(this.orgColumns, this.columnChecked);
      this.$emit('update:columns', columns);
    },
    /* 全屏切换 */
    toggleFullscreen() {
      this.$emit('fullscreen', !this.isFullscreen);
    }
  }
}
</script>

<style>
.ele-tool .ele-tool-item {
  font-size: 18px;
  padding: 0 2px;
  cursor: pointer;
}

.ele-tool .ele-tool-item .el-dropdown > i {
  font-size: 18px;
}

/* 带背景色主题 */
.ele-table-tool-default .ele-tool-item {
  font-size: 16px;
  padding: 5px 6px;
  box-sizing: border-box;
  border-radius: 2px;
  line-height: 1;
}

.ele-table-tool-default .ele-tool-item .el-dropdown > i {
  font-size: 16px;
}

/* 列配置 */
.ele-tool-column.el-popover {
  padding: 0;
}

.ele-tool-column-item {
  display: flex;
  align-items: center;
  padding: 4px 16px 4px 4px;
  box-sizing: border-box;
}

.ele-tool-column-item .el-checkbox {
  flex: 1;
}

.ele-tool-column-item .el-checkbox__label {
  color: inherit !important;
}

.ele-tool-column-item .ele-tool-column-handle {
  opacity: .8;
  cursor: move;
}

.ele-tool-column-item .ele-tool-column-handle .el-icon-_more {
  font-size: 12px;
}

.ele-tool-column-item .ele-tool-column-handle .el-icon-_more + .el-icon-_more {
  margin: 0 4px 0 -8px;
}

.ele-tool-column-item.sortable-chosen {
  background: hsla(0, 0%, 60%, .1);
}

.ele-tool-column-header {
  padding: 12px 16px 10px 4px;
  min-width: 180px;
}

.ele-tool-column .el-checkbox-group {
  padding: 5px 0;
}
</style>
