<!-- 头像列表组件 license by http://eleadmin.com -->
<template>
  <div class="ele-avatar-list">
    <template v-for="(item, index) in list">
      <el-tooltip
        :key="index"
        :content="item[name]"
        :placement="placement"
        :effect="effect"
        :disabled="!tooltip"
        :offset="offset"
        :transition="transition">
        <el-avatar
          :shape="shape"
          :size="size"
          :src="item[avatar]"
          :alt="item[name]"
          :style="[commonStyle, itemStyle, avatarStyle]"/>
      </el-tooltip>
    </template>
    <el-avatar
      v-if="showMore"
      class="ele-avatar-list-more"
      :shape="shape"
      :size="size"
      :style="[commonStyle, itemStyle, moreStyle]">
      +{{ data.length - max }}
    </el-avatar>
  </div>
</template>

<script>
export default {
  name: 'EleAvatarList',
  props: {
    // 头像数据
    data: {
      type: Array,
      required: true
    },
    // 最大显示个数
    max: {
      type: Number,
      default: 0
    },
    // name字段名
    name: {
      type: String,
      default: 'name'
    },
    // avatar字段名
    avatar: {
      type: String,
      default: 'avatar'
    },
    // avatar形状
    shape: {
      type: String,
      default: 'circle'
    },
    // avatar大小
    size: {
      type: [Number, String],
      default: 'default'
    },
    // 自定义item样式
    itemStyle: [String, Object],
    // 自定义avatar样式
    avatarStyle: [String, Object],
    // 自定义more样式
    moreStyle: [String, Object],
    // 是否需要tooltip
    tooltip: {
      type: Boolean,
      default: true
    },
    // tooltip位置
    placement: {
      type: String,
      default: 'top'
    },
    // tooltip主题
    effect: {
      type: String,
      default: 'dark'
    },
    // tooltip偏移
    offset: {
      type: Number,
      default: 0
    },
    // tooltip动画
    transition: {
      type: String,
      default: 'el-fade-in-linear'
    }
  },
  computed: {
    // 公共样式
    commonStyle() {
      if (typeof this.size === 'number') {
        return {marginLeft: `${-this.size / 3}px`};
      } else {
        const ml = {large: '-12px', default: '-10px', small: '-8px'}[this.size];
        return {marginLeft: ml || '-12px'};
      }
    },
    // 头像列表
    list() {
      if (!this.max || this.data.length <= this.max) {
        return this.data;
      }
      return this.data.slice(0, this.max);
    },
    // 是否显示更多
    showMore() {
      return this.max && this.data.length > this.max;
    }
  }
}
</script>

<style>
.ele-avatar-list {
  display: inline-block;
  font-size: 0;
}

.ele-avatar-list .el-avatar {
  border: 1px solid #fff;
  box-sizing: content-box;
  cursor: pointer;
}

.ele-avatar-list .el-avatar:first-child {
  margin-left: 0 !important;
}

.ele-avatar-list .ele-avatar-list-more {
  color: #f56a00;
  background: #fde3cf;
  cursor: default;
}
</style>
