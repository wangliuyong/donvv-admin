<!-- 状态文字组件 license by http://eleadmin.com -->
<template>
  <span class="ele-status-dot">
    <span :class="dotClass" :style="dotStyle">
      <span :class="dotColor"></span>
    </span>
    <span v-if="text" class="ele-dot-text">{{ text }}</span>
  </span>
</template>

<script>
export default {
  name: 'EleDot',
  props: {
    // 类型，success、warning、danger、info
    type: String,
    // 是否显示水波动画
    ripple: {
      type: Boolean,
      default: true
    },
    // 文本
    text: [String, Boolean],
    // 尺寸
    size: {
      type: [String, Number],
      default: '6px'
    }
  },
  computed: {
    // class
    dotClass() {
      return [
        'ele-dot',
        {'ele-dot-ripple': this.ripple}
      ].concat(this.dotColor);
    },
    // 样式
    dotStyle() {
      return {
        width: this.size,
        height: this.size
      };
    },
    // 颜色
    dotColor() {
      return [
        'ele-bg-primary',
        {'ele-bg-success': 'success' === this.type},
        {'ele-bg-warning': 'warning' === this.type},
        {'ele-bg-danger': 'danger' === this.type},
        {'ele-bg-info': 'info' === this.type}
      ]
    }
  }
}
</script>

<style>
.ele-status-dot {
  line-height: 1;
  display: inline-block;
  box-sizing: border-box;
}

.ele-status-dot .ele-dot-text {
  margin-left: 8px;
  display: inline-block;
  vertical-align: middle;
}

.ele-dot {
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
  position: relative;
}

.ele-dot > span {
  display: none;
}

.ele-dot.ele-dot-ripple > span {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 50%;
  box-sizing: border-box;
  animation: eleAnimStatusDot 1.2s ease-in-out infinite;
}

@keyframes eleAnimStatusDot {
  from {
    transform: scale(.8);
    opacity: .6;
  }
  to {
    transform: scale(2.4);
    opacity: 0;
  }
}
</style>
