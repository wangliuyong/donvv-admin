<!-- 主题设置抽屉 license by http://eleadmin.com -->
<template>
  <el-drawer
    title="主题设置"
    :visible="visible"
    size="300px"
    :append-to-body="true"
    @update:visible="updateVisible">
    <div :class="['ele-setting-wrapper', {'ele-setting-dark': darkMode}]">
      <!-- 侧栏风格设置 -->
      <div class="ele-setting-theme ele-text-primary">
        <el-tooltip
          v-for="d in sideStyles"
          :key="d.value"
          :content="d.name"
          placement="top">
          <div
            :class="['ele-bg-base', d.style]"
            @click="setSideStyle(d.value)">
            <i
              class="el-icon-check"
              v-if="sideStyle === d.value">
            </i>
          </div>
        </el-tooltip>
      </div>
      <!-- 顶栏风格设置 -->
      <div class="ele-setting-theme ele-text-primary">
        <el-tooltip
          v-for="d in headStyles"
          :key="d.value"
          :content="d.name"
          placement="top">
          <div
            :class="['ele-bg-base', d.style]"
            @click="setHeadStyle(d.value)">
            <div
              v-if="d.value === 2"
              class="ele-bg-primary">
            </div>
            <i
              class="el-icon-check"
              v-if="headStyle === d.value">
            </i>
          </div>
        </el-tooltip>
      </div>
      <!-- 主题颜色设置 -->
      <div class="ele-setting-colors">
        <el-tooltip
          v-for="d in themes"
          :key="d.value"
          :content="d.name"
          placement="top">
          <div
            class="ele-setting-color-item"
            :style="{'background': d.color}"
            @click="setColor(d.value)">
            <i
              class="el-icon-check"
              v-if="color === d.value">
            </i>
          </div>
        </el-tooltip>
      </div>
      <div class="ele-setting-item">
        <div class="setting-item-title">开启暗黑模式</div>
        <div class="setting-item-control">
          <el-switch :value="darkMode" @change="setDarkMode"/>
        </div>
      </div>
      <el-divider/>
      <!-- 导航模式设置 -->
      <div class="ele-setting-title ele-text-secondary">导航模式</div>
      <div class="ele-setting-theme ele-text-primary">
        <el-tooltip
          v-for="d in layoutStyles"
          :key="d.value"
          :content="d.name"
          placement="top">
          <div
            :class="['ele-bg-base',d.style]"
            @click="setLayoutStyle(d.value)">
            <i
              class="el-icon-check"
              v-if="layoutStyle === d.value">
            </i>
          </div>
        </el-tooltip>
      </div>
      <div class="ele-setting-item">
        <div class="setting-item-title">内容区域铺满</div>
        <div class="setting-item-control">
          <el-switch :value="bodyFull" @change="setBodyFull"/>
        </div>
      </div>
      <!-- 其它配置 -->
      <el-divider/>
      <div class="ele-setting-title ele-text-secondary">其它配置</div>
      <div class="ele-setting-item">
        <div class="setting-item-title">固定顶栏区域</div>
        <div class="setting-item-control">
          <el-switch :value="fixedHeader" @change="setFixedHeader"/>
        </div>
      </div>
      <div class="ele-setting-item">
        <div class="setting-item-title">固定侧栏区域</div>
        <div class="setting-item-control">
          <el-switch :value="fixedSidebar" @change="setFixedSidebar"/>
        </div>
      </div>
      <div class="ele-setting-item">
        <div class="setting-item-title">固定主体区域</div>
        <div class="setting-item-control">
          <el-switch :value="fixedBody" @change="setFixedBody"/>
        </div>
      </div>
      <div class="ele-setting-item">
        <div class="setting-item-title">Logo宽度自动</div>
        <div class="setting-item-control">
          <el-switch :value="logoAutoSize" @change="setLogoAutoSize"/>
        </div>
      </div>
      <div class="ele-setting-item">
        <div class="setting-item-title">侧栏彩色图标</div>
        <div class="setting-item-control">
          <el-switch :value="colorfulIcon" @change="setColorfulIcon"/>
        </div>
      </div>
      <div class="ele-setting-item">
        <div class="setting-item-title">侧栏排他展开</div>
        <div class="setting-item-control">
          <el-switch :value="sideUniqueOpen" @change="setSideUniqueOpen"/>
        </div>
      </div>
      <div class="ele-setting-item">
        <div class="setting-item-title">开启色弱模式</div>
        <div class="setting-item-control">
          <el-switch :value="weakMode" @change="setWeakMode"/>
        </div>
      </div>
      <div class="ele-setting-item">
        <div class="setting-item-title">开启多页签栏</div>
        <div class="setting-item-control">
          <el-switch :value="showTabs" @change="setShowTabs"/>
        </div>
      </div>
      <div class="ele-setting-item">
        <div class="setting-item-title">页签显示风格</div>
        <div class="setting-item-control">
          <el-select
            size="mini"
            :value="tabStyle"
            @change="setTabStyle">
            <el-option
              v-for="d in tabStyles"
              :key="d.value"
              :label="d.name"
              :value="d.value"/>
          </el-select>
        </div>
      </div>
      <template v-if="tips">
        <el-divider/>
        <el-alert
          :title="tips"
          type="warning"
          :closable="false"
          class="ele-alert-border"/>
      </template>
    </div>
  </el-drawer>
</template>

<script>
export default {
  name: 'EleProSetting',
  emits: ['change-color', 'change-style', 'update:visible'],
  props: {
    // 是否显示, 支持.sync修饰
    visible: Boolean,
    // 提示文字
    tips: [String, Boolean],
    // 主题列表
    themes: Array,
    // 当前主题色
    color: String,
    // 是否固定顶栏
    fixedHeader: Boolean,
    // 是否固定侧栏
    fixedSidebar: Boolean,
    // 是否固定主体
    fixedBody: Boolean,
    // 布局风格
    layoutStyle: Number,
    // 顶栏风格
    headStyle: Number,
    // 侧边栏风格
    sideStyle: Number,
    // logo是否自适应宽度
    logoAutoSize: Boolean,
    // 侧栏是否多彩图标
    colorfulIcon: Boolean,
    // 侧边栏是否只保持一个子菜单展开
    sideUniqueOpen: Boolean,
    // 是否开启多标签
    showTabs: Boolean,
    // 标签页风格
    tabStyle: Number,
    // 内容区域宽度是否铺满
    bodyFull: Boolean,
    // 是否暗黑模式
    darkMode: Boolean,
    // 是否色弱模式
    weakMode: Boolean
  },
  data() {
    return {
      // 侧边栏风格
      sideStyles: [
        {name: '暗色侧边栏', value: 1, style: 'ele-side-dark'},
        {name: '亮色侧边栏', value: 0}
      ],
      // 顶栏风格
      headStyles: [
        {name: '亮色顶栏', value: 0, style: 'ele-head-light'},
        {name: '暗色顶栏', value: 1, style: 'ele-head-dark'},
        {name: '主色顶栏', value: 2, style: 'ele-head-primary'}
      ],
      // 布局风格
      layoutStyles: [
        {name: '左侧菜单布局', value: 0, style: 'ele-side-dark'},
        {name: '顶部菜单布局', value: 1, style: 'ele-head-dark'},
        {name: '混合菜单布局', value: 2, style: 'ele-layout-mix'}
      ],
      // 标签页风格
      tabStyles: [
        {name: '默认', value: 0},
        {name: '圆点', value: 1},
        {name: '卡片', value: 2}
      ]
    };
  },
  methods: {
    /* 切换主题色 */
    setColor(color, force) {
      if (!force && color === this.color) {
        return;
      }
      this.$emit('change-color', color);
    },
    /* 切换侧边栏风格 */
    setSideStyle(value) {
      this.setStyle('sideStyle', value);
    },
    /* 切换顶栏风格 */
    setHeadStyle(value) {
      this.setStyle('headStyle', value);
    },
    /* 设置导航布局 */
    setLayoutStyle(value) {
      this.setStyle('layoutStyle', value);
    },
    setBodyFull(value) {
      this.setStyle('bodyFull', value);
    },
    setFixedHeader(value) {
      this.setStyle('fixedHeader', value);
    },
    setFixedSidebar(value) {
      this.setStyle('fixedSidebar', value);
    },
    setFixedBody(value) {
      this.setStyle('fixedBody', value);
      if (value) {
        document.body.style.width = null;
      }
    },
    setLogoAutoSize(value) {
      this.setStyle('logoAutoSize', value);
    },
    setColorfulIcon(value) {
      this.setStyle('colorfulIcon', value);
    },
    setSideUniqueOpen(value) {
      this.setStyle('sideUniqueOpen', value);
    },
    setWeakMode(value) {
      this.setStyle('weakMode', value);
    },
    setDarkMode(value) {
      this.setStyle('darkMode', value);
      this.setColor(this.color, true);
    },
    setShowTabs(value) {
      this.setStyle('showTabs', value);
    },
    setTabStyle(value) {
      this.setStyle('tabStyle', value);
    },
    /* 修改主题风格 */
    setStyle(key, value) {
      this.$emit('change-style', {
        key: key,
        value: value
      });
    },
    /* 修改visible */
    updateVisible(value) {
      this.$emit('update:visible', value);
    }
  }
}
</script>

<style>
.ele-setting-wrapper {
  padding: 20px 18px;
}

.ele-setting-wrapper .ele-setting-title {
  font-size: 13px;
  margin-bottom: 15px;
}

/* 主题风格 */
.ele-setting-wrapper .ele-setting-theme > div {
  width: 52px;
  height: 36px;
  line-height: 1;
  font-size: 18px;
  border-radius: 3px;
  margin: 0 20px 30px 0;
  padding: 14px 0 0 24px;
  box-sizing: border-box;
  box-shadow: 0 1px 4px rgba(0, 0, 0, .15);
  display: inline-block;
  vertical-align: top;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.ele-setting-wrapper .ele-setting-theme > div:before,
.ele-setting-wrapper .ele-setting-theme > div:after,
.ele-setting-wrapper .ele-setting-theme > div > .ele-bg-primary {
  content: "";
  width: 100%;
  height: 10px;
  background: #fff;
  position: absolute;
  left: 0;
  top: 0;
}

.ele-setting-wrapper .ele-setting-theme > div:after {
  width: 14px;
  height: 100%;
}

.ele-setting-wrapper .ele-setting-theme > div.ele-side-dark:after,
.ele-setting-wrapper .ele-setting-theme > div.ele-head-dark:before,
.ele-setting-wrapper .ele-setting-theme > div.ele-layout-mix:before,
.ele-setting-wrapper .ele-setting-theme > div.ele-layout-mix:after {
  background: #001529;
}

.ele-setting-wrapper .ele-setting-theme > div.ele-head-light:before,
.ele-setting-wrapper .ele-setting-theme > div.ele-head-dark:before,
.ele-setting-wrapper .ele-setting-theme > div > .ele-bg-primary {
  z-index: 1;
}

/* 主题色选择 */
.ele-setting-wrapper .ele-setting-colors {
  color: #fff;
  margin-bottom: 20px;
}

.ele-setting-wrapper .ele-setting-color-item {
  width: 20px;
  height: 20px;
  line-height: 22px;
  border-radius: 2px;
  margin: 8px 8px 0 0;
  display: inline-block;
  box-shadow: 0 1px 4px rgba(0, 0, 0, .15);
  vertical-align: top;
  text-align: center;
  cursor: pointer;
}

/* 主题配置项 */
.ele-setting-wrapper .ele-setting-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.ele-setting-wrapper .ele-setting-item .setting-item-title {
  flex: 1;
  line-height: 28px;
}

.ele-setting-wrapper .ele-setting-item .setting-item-control {
  line-height: 1;
  max-width: 80px;
}

.ele-setting-wrapper .el-divider {
  margin-bottom: 20px;
}

.ele-setting-dark .ele-setting-theme > div {
  box-shadow: 0 1px 4px rgba(0, 0, 0, .55);
}

.ele-setting-dark .ele-setting-theme > div:before,
.ele-setting-dark .ele-setting-theme > div:after,
.ele-setting-dark .ele-setting-theme > div > .ele-bg-primary {
  background: #1f1f1f;
}

.ele-setting-dark .ele-setting-theme > div.ele-side-dark:after,
.ele-setting-dark .ele-setting-theme > div.ele-head-dark:before,
.ele-setting-dark .ele-setting-theme > div.ele-layout-mix:before,
.ele-setting-dark .ele-setting-theme > div.ele-layout-mix:after {
  background: #262626;
}
</style>
