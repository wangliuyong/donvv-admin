<!-- 表格工具栏组件 license by http://eleadmin.com -->
<template>
  <div :class="['ele-table-tool', {'ele-table-tool-default': 'default'===theme}]">
    <div class="ele-table-tool-title ele-space">
      <div v-if="title||subTitle" class="ele-action">
        <h6 v-if="title">{{ title }}</h6>
        <div v-if="subTitle">{{ subTitle }}</div>
      </div>
      <slot/>
    </div>
    <ele-pro-table-tools
      ref="tool"
      :size="size"
      :columns="columns"
      :tools="tools"
      :columns-sort="columnsSort"
      :style="toolkitStyle"
      :is-fullscreen="isFullscreen"
      @reload="reload"
      @update:size="updateSize"
      @update:columns="updateColumns"
      @fullscreen="toggleFullscreen">
      <slot name="action"/>
    </ele-pro-table-tools>
  </div>
</template>

<script>
import EleProTableTools from '../../ele-pro-table-tools';

export default {
  name: 'EleToolbar',
  components: {EleProTableTools},
  emits: [
    'reload',
    'update:size',
    'update:columns',
    'fullscreen'
  ],
  props: {
    // 主题风格
    theme: {
      type: String,
      default: 'default'
    },
    // 标题
    title: String,
    // 二级标题
    subTitle: String,
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
    // 工具栏右侧样式
    toolkitStyle: [Object, String],
    // 是否是全屏状态
    isFullscreen: Boolean
  },
  methods: {
    /* 初始化列配置 */
    initColumnList() {
      this.$refs.tool.initColumnList();
    },
    /* 刷新表格 */
    reload() {
      this.$emit('reload');
    },
    /* 修改表格尺寸 */
    updateSize(value) {
      this.$emit('update:size', value);
    },
    /* 修改表格尺寸 */
    updateColumns(value) {
      this.$emit('update:columns', value);
    },
    /* 全屏切换 */
    toggleFullscreen(value) {
      this.$emit('fullscreen', value);
    }
  }
}
</script>

<style>
.ele-pro-table .ele-table-tool {
  margin-bottom: 10px;
}

.ele-pro-table .ele-table-tool .ele-table-tool-title {
  margin: 5px 0;
  flex: auto;
}

.ele-pro-table .ele-table-tool .ele-tool {
  margin: 5px 0 5px auto;
}

/* 内部表单样式处理 */
.ele-pro-table .ele-table-tool.ele-toolbar-form .ele-table-tool-title {
  margin: 0;
}

.ele-pro-table .ele-table-tool.ele-toolbar-form .el-form .el-form-item,
.ele-pro-table .ele-table-tool.ele-toolbar-form .el-form .ele-form-actions {
  margin: 5px 0;
}

.ele-pro-table .ele-table-tool-default {
  padding-top: 5px;
  padding-bottom: 5px;
  margin-bottom: 0;
}

/* 小屏幕下样式优化 */
@media screen and (max-width: 768px) {
  .ele-pro-table .ele-table-tool.ele-toolbar-form .el-form .ele-form-actions {
    text-align: left;
  }
}
</style>
