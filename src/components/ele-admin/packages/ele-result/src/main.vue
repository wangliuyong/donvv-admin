<!-- 操作结果组件 license by http://eleadmin.com -->
<template>
  <div class="ele-result">
    <i :class="['ele-result-icon', icon]"></i>
    <h2 class="ele-result-title" v-if="title">{{ title }}</h2>
    <div class="ele-result-desc ele-text-secondary" v-if="desc">{{ desc }}</div>
    <div class="ele-result-extra ele-bg-base">
      <slot></slot>
    </div>
    <div class="ele-result-actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EleResult',
  props: {
    // 类型，success、fail
    type: {
      type: String,
      default: 'success'
    },
    // 标题
    title: String,
    // 描述
    desc: String
  },
  computed: {
    // 类型图标
    icon() {
      if (this.type === 'success') {
        return 'el-icon-check ele-bg-success';
      }
      if (this.type === 'fail') {
        return 'el-icon-close ele-bg-danger';
      }
      return this.type;
    }
  }
}
</script>

<style>
.ele-result {
  text-align: center;
}

.ele-result .ele-result-icon {
  width: 72px;
  height: 72px;
  line-height: 72px;
  font-size: 42px;
  color: #FFF;
  text-align: center;
  border-radius: 50%;
  display: inline-block;
  margin-bottom: 24px;
}

.ele-result .ele-result-title {
  line-height: 32px;
  margin-bottom: 16px;
}

.ele-result .ele-result-desc {
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 24px;
}

.ele-result .ele-result-extra {
  text-align: left;
  padding: 24px 40px;
  border-radius: 4px;
}

.ele-result .ele-result-actions {
  margin-top: 32px;
}
</style>
