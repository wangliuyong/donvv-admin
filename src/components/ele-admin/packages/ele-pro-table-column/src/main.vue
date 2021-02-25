<!-- 高级表格 column 组件 license by http://eleadmin.com -->
<template>
  <el-table-column
    v-if="col.children&&col.children.length"
    :type="col.type"
    :index="col.index||index"
    :column-key="col.columnKey"
    :label="col.label"
    :prop="col.prop"
    :width="col.width"
    :min-width="col.minWidth"
    :fixed="col.fixed"
    :render-header="col.renderHeader"
    :sortable="col.sortable"
    :sort-method="col.sortMethod"
    :sort-by="col.sortBy"
    :sort-orders="col.sortOrders"
    :resizable="col.resizable"
    :formatter="col.formatter"
    :show-overflow-tooltip="col.showOverflowTooltip"
    :align="col.align"
    :header-align="col.headerAlign"
    :class-name="col.className"
    :label-class-name="col.labelClassName"
    :selectable="col.selectable"
    :reserve-selection="col.reserveSelection"
    :filters="col.filters"
    :filter-placement="col.filterPlacement"
    :filter-multiple="col.filterMultiple"
    :filter-method="col.filterMethod"
    :filtered-value="col.filteredValue">
    <ele-pro-table-column
      v-for="child in col.children"
      :key="child.columnKey||child.prop"
      :col="child"
      :index="index">
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
  </el-table-column>
  <el-table-column
    v-else-if="col.slot"
    :type="col.type"
    :index="col.index||index"
    :column-key="col.columnKey"
    :label="col.label"
    :prop="col.prop"
    :width="col.width"
    :min-width="col.minWidth"
    :fixed="col.fixed"
    :render-header="col.renderHeader"
    :sortable="col.sortable"
    :sort-method="col.sortMethod"
    :sort-by="col.sortBy"
    :sort-orders="col.sortOrders"
    :resizable="col.resizable"
    :formatter="col.formatter"
    :show-overflow-tooltip="col.showOverflowTooltip"
    :align="col.align"
    :header-align="col.headerAlign"
    :class-name="col.className"
    :label-class-name="col.labelClassName"
    :selectable="col.selectable"
    :reserve-selection="col.reserveSelection"
    :filters="col.filters"
    :filter-placement="col.filterPlacement"
    :filter-multiple="col.filterMultiple"
    :filter-method="col.filterMethod"
    :filtered-value="col.filteredValue">
    <template slot-scope="{row, column, $index}">
      <slot
        :name="col.slot"
        v-bind:row="row"
        v-bind:column="column"
        v-bind:$index="$index"/>
    </template>
  </el-table-column>
  <el-table-column
    v-else
    :type="col.type"
    :index="col.index||index"
    :column-key="col.columnKey"
    :label="col.label"
    :prop="col.prop"
    :width="col.width"
    :min-width="col.minWidth"
    :fixed="col.fixed"
    :render-header="col.renderHeader"
    :sortable="col.sortable"
    :sort-method="col.sortMethod"
    :sort-by="col.sortBy"
    :sort-orders="col.sortOrders"
    :resizable="col.resizable"
    :formatter="col.formatter"
    :show-overflow-tooltip="col.showOverflowTooltip"
    :align="col.align"
    :header-align="col.headerAlign"
    :class-name="col.className"
    :label-class-name="col.labelClassName"
    :selectable="col.selectable"
    :reserve-selection="col.reserveSelection"
    :filters="col.filters"
    :filter-placement="col.filterPlacement"
    :filter-multiple="col.filterMultiple"
    :filter-method="col.filterMethod"
    :filtered-value="col.filteredValue">
  </el-table-column>
</template>

<script>
export default {
  name: 'EleProTableColumn',
  props: {
    // 列配置参数
    col: Object,
    // 设置index列的起始索引
    index: Number
  }
}
</script>
