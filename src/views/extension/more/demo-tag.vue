<template>
  <el-card shadow="never" header="标签组件">
    <div class="ele-cell">
      <div>默认样式：</div>
      <div class="ele-cell-content">
        <el-tag
          :size="tagSize"
          :effect="tagTheme">标签一
        </el-tag>
        <el-tag
          :size="tagSize"
          :effect="tagTheme"
          type="success">标签二
        </el-tag>
        <el-tag
          :size="tagSize"
          :effect="tagTheme"
          type="info">标签三
        </el-tag>
        <el-tag
          :size="tagSize"
          :effect="tagTheme"
          type="warning">标签四
        </el-tag>
        <el-tag
          :size="tagSize"
          :effect="tagTheme"
          type="danger">标签五
        </el-tag>
      </div>
    </div>
    <div class="ele-cell">
      <div>圆角样式：</div>
      <div class="ele-cell-content">
        <el-tag
          :size="tagSize"
          :effect="tagTheme"
          class="ele-tag-radius">标签一
        </el-tag>
        <el-tag
          :size="tagSize"
          :effect="tagTheme"
          type="success"
          class="ele-tag-radius">标签二
        </el-tag>
        <el-tag
          :size="tagSize"
          :effect="tagTheme"
          type="info"
          class="ele-tag-radius">标签三
        </el-tag>
        <el-tag
          :size="tagSize"
          :effect="tagTheme"
          type="warning"
          class="ele-tag-radius">标签四
        </el-tag>
        <el-tag
          :size="tagSize"
          :effect="tagTheme"
          type="danger"
          class="ele-tag-radius">标签五
        </el-tag>
      </div>
    </div>
    <div class="ele-cell">
      <div>圆形样式：</div>
      <div class="ele-cell-content">
        <el-tag
          :size="tagSize"
          :effect="tagTheme"
          class="ele-tag-round">1
        </el-tag>
        <el-tag
          :size="tagSize"
          :effect="tagTheme"
          type="success"
          class="ele-tag-round">2
        </el-tag>
        <el-tag
          :size="tagSize"
          :effect="tagTheme"
          type="info"
          class="ele-tag-round">3
        </el-tag>
        <el-tag
          :size="tagSize"
          :effect="tagTheme"
          type="warning"
          class="ele-tag-round">4
        </el-tag>
        <el-tag
          :size="tagSize"
          :effect="tagTheme"
          type="danger"
          class="ele-tag-round">5
        </el-tag>
      </div>
    </div>
    <div class="ele-cell">
      <div>标签输入：</div>
      <div class="ele-cell-content">
        <ele-tags-input
          v-model="tags"
          :size="tagSize"
          :effect="tagTheme"/>
        <div style="margin-top:8px;">{{ JSON.stringify(tags) }}</div>
      </div>
    </div>
    <div class="ele-cell">
      <div>尺寸设置：</div>
      <div class="ele-cell-content">
        <el-radio-group v-model="tagSize">
          <el-radio label="large">默认</el-radio>
          <el-radio label="medium">中等</el-radio>
          <el-radio label="small">小型</el-radio>
          <el-radio label="mini">超小</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="ele-cell">
      <div>主题设置：</div>
      <div class="ele-cell-content">
        <el-radio-group v-model="tagTheme">
          <el-radio label="light">light</el-radio>
          <el-radio label="dark">dark</el-radio>
          <el-radio label="plain">plain</el-radio>
        </el-radio-group>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'DemoTag',
  data() {
    return {
      tagSize: 'small',
      tagTheme: 'light',
      tags: ['标签一', '标签二', '标签三']
    }
  }
}
</script>

<style scoped>
.ele-cell + .ele-cell {
  margin-top: 16px;
}
</style>
