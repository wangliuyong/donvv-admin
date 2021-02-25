<!-- 文件列表组件 license by http://eleadmin.com -->
<template>
  <div class="ele-file-list-group">
    <!-- 网格模式 -->
    <div v-if="grid" class="ele-file-list">
      <!-- 头部全选框 -->
      <div v-if="showCheckbox" class="ele-file-list-header">
        <div class="ele-file-list-check-group" @click.stop="allChecked=!allChecked">
          <i :class="['ele-file-list-check ele-file-icon-check ele-bg-primary', {'checked': allChecked}]"></i>
          <span v-if="checked.length">已选中 {{ checked.length }} 个文件/文件夹</span>
          <span v-else>全选</span>
        </div>
      </div>
      <!-- item -->
      <div
        v-for="(item,index) in data"
        :key="index"
        :class="['ele-file-list-item', {'checked': checked.indexOf(item)!==-1}]"
        @click="onItemClick(item)">
        <!-- 背景和边框 -->
        <div class="ele-file-list-item-bg ele-bg-primary"></div>
        <div class="ele-file-list-item-border ele-border-primary"></div>
        <!-- item body -->
        <div class="ele-file-list-item-body">
          <!-- 图标 -->
          <div class="ele-file-list-item-icon">
            <img :src="getIcon(item)" :class="{'ele-file-list-item-icon-image': item.thumbnail}" alt=""/>
          </div>
          <!-- 标题 -->
          <div class="ele-file-list-item-title ele-text-primary" :title="item.name">{{ item.name }}</div>
        </div>
        <!-- 复选框 -->
        <div v-if="showCheckbox" @click.stop="onCheckedChange(item)" class="ele-file-list-item-check ele-bg-white">
          <i class="ele-file-icon-check ele-bg-primary"></i>
        </div>
      </div>
    </div>
    <!-- 表格模式 -->
    <div v-else class="ele-file-list-table">
      <!-- 表头 -->
      <div :class="['ele-file-list-table-item ele-file-list-table-item-header', {'checked': allChecked}]">
        <div class="ele-file-list-table-item-body">
          <div v-if="showCheckbox" class="ele-file-list-table-item-check-group">
            <i class="ele-file-list-table-item-check ele-file-icon-check ele-bg-primary"
               @click.stop="allChecked=!allChecked"></i>
          </div>
          <div class="ele-file-list-table-item-name" @click="onSortChange('name')">
            <span v-if="!checked.length">
              <span>文件名</span>
              <i :class="getSortClass('name')">
                <i class="ele-border-primary"></i>
                <i class="ele-border-primary"></i>
              </i>
            </span>
            <span v-else @click.stop="allChecked=!allChecked">已选中 {{ checked.length }} 个文件/文件夹</span>
          </div>
          <div class="ele-file-list-table-item-size" @click="onSortChange('length')">
            <span>大小</span>
            <i :class="getSortClass('length')">
              <i class="ele-border-primary"></i>
              <i class="ele-border-primary"></i>
            </i>
          </div>
          <div class="ele-file-list-table-item-time" @click="onSortChange('updateTime')">
            <span>修改日期</span>
            <i :class="getSortClass('updateTime')">
              <i class="ele-border-primary"></i>
              <i class="ele-border-primary"></i>
            </i>
          </div>
        </div>
      </div>
      <!-- 列表item -->
      <div
        v-for="(item, i) in data"
        :key="i"
        :class="['ele-file-list-table-item', {'checked': checked.indexOf(item)>=0}]">
        <!-- 背景和边框 -->
        <div class="ele-file-list-table-item-bg ele-bg-primary"></div>
        <div class="ele-file-list-table-item-border ele-border-primary"></div>
        <!-- item body cells -->
        <div class="ele-file-list-table-item-body">
          <!-- 复选框 -->
          <div v-if="showCheckbox" class="ele-file-list-table-item-check-group">
            <i class="ele-file-list-table-item-check ele-file-icon-check ele-bg-primary"
               @click.stop="onCheckedChange(item)"></i>
          </div>
          <!-- 图标和标题 -->
          <div class="ele-file-list-table-item-name">
            <div class="ele-file-list-table-item-icon">
              <img
                :src="getIcon(item)"
                class="ele-file-list-table-item-icon-image"
                @click="onItemClick(item)"
                alt=""/>
              <div
                class="ele-file-list-table-item-title ele-text-primary"
                :title="item.name"
                @click="onItemClick(item)">{{ item.name }}
              </div>
            </div>
            <div class="ele-file-list-table-item-tool-group">
              <slot name="tool" v-bind:item="item"></slot>
            </div>
          </div>
          <!-- 大小 -->
          <div class="ele-file-list-table-item-size">{{ item.length }}</div>
          <!-- 修改时间 -->
          <div class="ele-file-list-table-item-time">{{ item.updateTime }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {icons, smIcons} from './icons';

export default {
  name: 'EleFileList',
  emits: ['update:checked', 'item-click', 'sort-change'],
  props: {
    // 数据
    data: Array,
    // 选中数据
    checked: Array,
    // 是否网格展示
    grid: {
      type: Boolean,
      default: true
    },
    // 排序字段
    sort: {
      type: [String, Boolean],
      default: false
    },
    // 排序方式
    order: String,
    // 网格模式后缀对应图标
    icons: {
      type: Array,
      default() {
        return icons;
      }
    },
    // 表格模式后缀对应图标
    smIcons: {
      type: Array,
      default() {
        return smIcons;
      }
    }
  },
  computed: {
    /* 是否显示复选框 */
    showCheckbox() {
      return this.checked && Array.isArray(this.checked);
    },
    /* 是否全选 */
    allChecked: {
      get() {
        return this.checked.length && (this.checked.length === this.data.length);
      },
      set(value) {
        this.$emit('update:checked', value ? this.data : []);
      }
    }
  },
  methods: {
    /* 文件对应的图标 */
    getIcon(item) {
      // 网格模式文件有缩略图返回文件缩略图
      if (this.grid && item.thumbnail) {
        return item.thumbnail;
      }
      const icons = this.grid ? this.icons : this.smIcons;
      // 文件夹
      if (item.isDirectory) {
        const temp = icons.filter(d => d.type === 'dir');
        if (temp.length) {
          return temp[0].icon;
        } else {
          return;
        }
      }
      // 匹配后缀对应的图标
      let ic;
      icons.forEach(d => {
        if (d.types) {
          d.types.forEach(s => {
            if (item.name.endsWith(s)) {
              ic = d.icon;
            }
          });
        }
      });
      if (!ic) {
        const temp = icons.filter(d => d.type === 'file');
        if (temp.length) {
          ic = temp[0].icon;
        }
      }
      return ic;
    },
    /* 表头排序的class */
    getSortClass(sort) {
      return [
        {'ele-file-list-table-item-sort': this.sort !== false},
        {'ele-file-list-sort-asc': this.sort === sort && this.order === 'asc'},
        {'ele-file-list-sort-desc': this.sort === sort && this.order === 'desc'}
      ];
    },
    /* 复选框改变 */
    onCheckedChange(item) {
      const index = this.checked.indexOf(item);
      if (index === -1) {
        // 选中
        this.$emit('update:checked', this.checked.concat([item]));
      } else {
        // 取消选中
        let temp = this.checked.slice(0, index).concat(this.checked.slice(index + 1, this.checked.length));
        this.$emit('update:checked', temp);
      }
    },
    /* item点击事件 */
    onItemClick(item) {
      this.$emit('item-click', item);
    },
    /* 排序点击事件 */
    onSortChange(name) {
      if (this.sort === false) {
        return;
      }
      let order = 'asc';
      if (this.sort && this.order && name === this.sort) {
        order = {'asc': 'desc', 'desc': null}[this.order];
      }
      this.$emit('sort-change', {sort: name, order: order});
    }
  },
  // 默认图标
  defaultIcons: icons,
  // 表格模式默认图标
  defaultSmIcons: smIcons
}
</script>

<style>
/* 复选框对勾 */
.ele-file-list-group .ele-file-icon-check {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
}

.ele-file-list-group .ele-file-icon-check:before {
  content: "";
  width: 9px;
  height: 5px;
  border-left: 2px solid #fff;
  border-bottom: 2px solid #fff;
  transform: rotate(-45deg);
  position: absolute;
  left: 4px;
  top: 5px;
}

/** 网格风格样式 */
.ele-file-list {
  box-sizing: border-box;
  position: relative;
}

/* header */
.ele-file-list .ele-file-list-header {
  padding: 0 16px;
  margin-bottom: 8px;
  border-bottom: 1px solid hsla(0, 0%, 60%, .15);
  box-sizing: border-box;
  line-height: 36px;
}

/* 全选框 */
.ele-file-list .ele-file-list-header .ele-file-list-check-group {
  display: inline-block;
  cursor: pointer;
}

.ele-file-list .ele-file-list-header .ele-file-list-check-group .ele-file-list-check {
  width: 16px;
  height: 16px;
  border-radius: 2px;
  margin-right: 13px;
  vertical-align: -3px;
}

.ele-file-list .ele-file-list-header .ele-file-list-check-group .ele-file-list-check:before {
  left: 3px;
  top: 4px;
  width: 8px;
  height: 4px;
}

.ele-file-list .ele-file-list-header .ele-file-list-check-group .ele-file-list-check:not(.checked) {
  background-color: transparent !important;
  border: 1px solid hsla(0, 0%, 60%, .3);
}

.ele-file-list .ele-file-list-header .ele-file-list-check-group .ele-file-list-check:not(.checked):before {
  display: none;
}

/* item */
.ele-file-list .ele-file-list-item {
  display: inline-block;
  box-sizing: border-box;
  padding: 10px 3px 10px 3px;
  margin: 0 0 8px 8px;
  text-align: center;
  position: relative;
  cursor: pointer;
}

/* 图标 */
.ele-file-list .ele-file-list-item .ele-file-list-item-icon {
  position: relative;
}

.ele-file-list .ele-file-list-item .ele-file-list-item-icon > img {
  width: 56px;
  height: 56px;
  margin: 14px 0;
  display: inline-block;
  border-radius: 2px;
}

.ele-file-list .ele-file-list-item .ele-file-list-item-icon > .ele-file-list-item-icon-image {
  width: 84px;
  height: 84px;
  margin: 0;
  object-fit: cover;
}

/* 标题 */
.ele-file-list .ele-file-list-item .ele-file-list-item-title {
  width: 110px;
  margin-top: 4px;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
}

.ele-file-list .ele-file-list-item .ele-file-list-item-title:not(:hover) {
  color: inherit;
}

/* 复选框 */
.ele-file-list .ele-file-list-item .ele-file-list-item-check {
  position: absolute;
  right: 6px;
  top: 6px;
  border-radius: 50%;
  display: none;
  z-index: 1;
}

.ele-file-list .ele-file-list-item .ele-file-list-item-check .ele-file-icon-check {
  width: 19px;
  height: 19px;
  border-radius: 50%;
  display: block;
  opacity: .35;
}

.ele-file-list .ele-file-list-item.checked .ele-file-list-item-check,
.ele-file-list .ele-file-list-item:hover .ele-file-list-item-check {
  display: block;
}

.ele-file-list .ele-file-list-item.checked .ele-file-list-item-check .ele-file-icon-check {
  opacity: 1;
}

/* 背景和边框 */
.ele-file-list .ele-file-list-item .ele-file-list-item-bg,
.ele-file-list .ele-file-list-item .ele-file-list-item-border {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  box-sizing: border-box;
  display: none;
}

.ele-file-list .ele-file-list-item:hover .ele-file-list-item-bg,
.ele-file-list .ele-file-list-item.checked .ele-file-list-item-bg {
  opacity: .06;
  display: block;
}

.ele-file-list .ele-file-list-item.checked .ele-file-list-item-border {
  opacity: .3;
  border-width: 1px;
  border-style: solid;
  display: block;
}

/* body */
.ele-file-list .ele-file-list-item .ele-file-list-item-body {
  position: relative;
  z-index: 1;
}

/** 表格样式 */
.ele-file-list-table {
  position: relative;
}

/* item */
.ele-file-list-table .ele-file-list-table-item {
  line-height: 44px;
  position: relative;
}

/* body */
.ele-file-list-table .ele-file-list-table-item .ele-file-list-table-item-body {
  display: flex;
  align-items: center;
  border-top: 1px solid hsla(0, 0%, 60%, .15);
  position: relative;
  z-index: 1;
}

.ele-file-list-table .ele-file-list-table-item:last-child .ele-file-list-table-item-body {
  border-bottom: 1px solid hsla(0, 0%, 60%, .15);
}

.ele-file-list-table .ele-file-list-table-item:first-child .ele-file-list-table-item-body {
  border-top: none;
}

/* item body cells */
.ele-file-list-table .ele-file-list-table-item .ele-file-list-table-item-check-group {
  width: 45px;
  padding-left: 16px;
  box-sizing: border-box;
  flex-shrink: 0;
}

.ele-file-list-table .ele-file-list-table-item .ele-file-list-table-item-name {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
}

.ele-file-list-table .ele-file-list-table-item .ele-file-list-table-item-size {
  width: 120px;
  flex-shrink: 0;
}

.ele-file-list-table .ele-file-list-table-item .ele-file-list-table-item-time {
  width: 180px;
  flex-shrink: 0;
}

/* 表格复选框 */
.ele-file-list-table .ele-file-list-table-item .ele-file-list-table-item-check {
  width: 16px;
  height: 16px;
  border-radius: 2px;
  display: inline-block;
  vertical-align: -3px;
  cursor: pointer;
}

.ele-file-list-table .ele-file-list-table-item .ele-file-list-table-item-check:before {
  left: 3px;
  top: 4px;
  width: 8px;
  height: 4px;
}

.ele-file-list-table .ele-file-list-table-item:not(.checked) .ele-file-list-table-item-check {
  background-color: transparent !important;
  border: 1px solid hsla(0, 0%, 60%, .3);
}

.ele-file-list-table .ele-file-list-table-item:not(.checked) .ele-file-list-table-item-check:before {
  display: none;
}

/* 图标和标题 */
.ele-file-list-table .ele-file-list-table-item .ele-file-list-table-item-icon {
  flex: 1;
  height: 24px;
  overflow: hidden;
}

.ele-file-list-table .ele-file-list-table-item .ele-file-list-table-item-icon-image {
  width: 24px;
  height: 24px;
  object-fit: cover;
  display: inline-block;
  vertical-align: top;
  cursor: pointer;
}

.ele-file-list-table .ele-file-list-table-item .ele-file-list-table-item-title {
  display: inline;
  padding-left: 10px;
  box-sizing: border-box;
  word-break: break-all;
  vertical-align: top;
  line-height: 24px;
  cursor: pointer;
}

.ele-file-list-table .ele-file-list-table-item .ele-file-list-table-item-title:not(:hover) {
  color: inherit;
}

/* 工具按钮 */
.ele-file-list-table .ele-file-list-table-item .ele-file-list-table-item-tool-group {
  flex-shrink: 0;
  display: none;
  align-items: center;
  box-sizing: border-box;
  padding: 0 15px;
  cursor: default;
}

.ele-file-list-table .ele-file-list-table-item .ele-file-list-table-item-tool-group .ele-file-list-item-tool {
  margin-right: 15px;
  font-size: 16px;
  cursor: pointer;
  line-height: 1;
}

.ele-file-list-table .ele-file-list-table-item:hover .ele-file-list-table-item-tool-group {
  display: flex;
}

/* 背景和边框 */
.ele-file-list-table .ele-file-list-table-item .ele-file-list-table-item-bg,
.ele-file-list-table .ele-file-list-table-item .ele-file-list-table-item-border {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: none;
}

.ele-file-list-table .ele-file-list-table-item:hover .ele-file-list-table-item-bg,
.ele-file-list-table .ele-file-list-table-item.checked .ele-file-list-table-item-bg {
  opacity: .06;
  display: block;
}

.ele-file-list-table .ele-file-list-table-item:hover .ele-file-list-table-item-border,
.ele-file-list-table .ele-file-list-table-item:not(.ele-file-list-table-item-header):hover + .ele-file-list-table-item .ele-file-list-table-item-border,
.ele-file-list-table .ele-file-list-table-item.checked .ele-file-list-table-item-border,
.ele-file-list-table .ele-file-list-table-item.checked + .ele-file-list-table-item .ele-file-list-table-item-border {
  opacity: .3;
  border-top-width: 1px;
  border-top-style: solid;
  display: block;
}

.ele-file-list-table .ele-file-list-table-item:not(.ele-file-list-table-item-header):last-child:hover .ele-file-list-table-item-border,
.ele-file-list-table .ele-file-list-table-item:not(.ele-file-list-table-item-header):last-child.checked .ele-file-list-table-item-border {
  border-bottom-width: 1px;
  border-bottom-style: solid;
}

.ele-file-list-table .ele-file-list-table-item-header {
  line-height: 36px;
  cursor: pointer;
}

/* 表头排序 */
.ele-file-list-table .ele-file-list-table-item-sort {
  width: 8px;
  height: 12px;
  margin-left: 6px;
  position: relative;
  display: inline-block;
  vertical-align: -1px;
}

.ele-file-list-table .ele-file-list-table-item-sort > i {
  width: 0;
  height: 0;
  border-width: 4px;
  border-style: solid;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  display: block;
}

.ele-file-list-table .ele-file-list-table-item-sort > i:first-child {
  border-top-color: transparent !important;
  margin: -4px 0 4px 0;
}

.ele-file-list-table .ele-file-list-table-item-sort > i:last-child {
  border-bottom-color: transparent !important;
}

.ele-file-list-table .ele-file-list-table-item-sort:not(.ele-file-list-sort-asc) > i:first-child {
  border-bottom-color: hsla(0, 0%, 60%, .6) !important;
}

.ele-file-list-table .ele-file-list-table-item-sort:not(.ele-file-list-sort-desc) > i:last-child {
  border-top-color: hsla(0, 0%, 60%, .6) !important;
}

/* 小屏幕样式 */
@media screen and (max-width: 768px) {
  .ele-file-list-table .ele-file-list-table-item .ele-file-list-table-item-size {
    display: none;
  }

  .ele-file-list-table .ele-file-list-table-item .ele-file-list-table-item-time {
    display: none;
  }

  .ele-file-list-table .ele-file-list-table-item .ele-file-list-table-item-tool-group {
    padding-right: 0;
  }
}
</style>
