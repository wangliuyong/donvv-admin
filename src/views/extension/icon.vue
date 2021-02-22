<template>
  <div class="ele-body">
    <el-alert
      :title="tipTitle"
      type="info"
      show-icon
      class="ele-alert-border"
      :closable="false"/>
    <el-card
      shadow="never"
      body-style="position: relative;padding: 0;"
      style="margin-top: 15px;">
      <div class="demo-icon-search">
        <el-input
          v-model="keywords"
          placeholder="输入关键词搜索..."
          size="small"/>
      </div>
      <el-tabs v-model="active" class="demo-icon-tabs">
        <el-tab-pane
          v-for="(item,index) in result"
          :key="index"
          :label="item.title"
          :name="item.title">
          <el-row class="demo-icon">
            <el-col
              :md="4"
              :sm="6"
              :xs="8"
              v-for="(d,i) in item.icons"
              :key="i"
              class="demo-icon-item"
              v-clipboard:copy="d"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError">
              <div class="demo-icon-content">
                <i :class="d"></i>
              </div>
              <div class="demo-icon-text ele-text-secondary">{{ d }}</div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="图标选择器" name="icon-picker">
          <div
            class="ele-cell demo-icon-picker-item"
            style="margin-top: 20px;">
            <div>默认样式一：</div>
            <div class="ele-cell-content">
              <ele-icon-picker
                v-model="menuIcon"
                placeholder="请选择菜单图标"/>
            </div>
          </div>
          <div class="ele-cell demo-icon-picker-item">
            <div>默认样式二：</div>
            <div class="ele-cell-content">
              <ele-icon-picker
                v-model="menuIcon"
                theme="style2"
                :readonly="false"/>
            </div>
          </div>
          <div class="ele-cell demo-icon-picker-item">
            <div>默认样式三：</div>
            <div class="ele-cell-content">
              <ele-icon-picker
                v-model="menuIcon"
                theme="style3"/>
            </div>
          </div>
          <div class="ele-cell demo-icon-picker-item">除了默认的三种样式，你还可以通过插槽自定义样式</div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import EleIconPicker from 'ele-admin/packages/ele-icon-picker';

export default {
  name: 'ExtensionIcon',
  components: {EleIconPicker},
  data() {
    return {
      // 图标数据
      data: EleIconPicker.defaultIcons,
      // 搜索关键字
      keywords: '',
      // 图标选择器选择图标
      menuIcon: 'el-icon-_heart-solid'
    }
  },
  computed: {
    // 搜索后的结果
    result() {
      if (!this.keywords) {
        return this.data;
      }
      let result = [];
      this.data.forEach(item => {
        result.push({
          title: item.title,
          icons: item.icons.filter(d => d.indexOf(this.keywords) !== -1)
        });
      });
      return result;
    },
    // 标签页选中位置
    active: {
      get() {
        if (!this.result || this.result.length === 0) {
          return null;
        }
        for (let i = 0; i < this.result.length; i++) {
          if (this.result[i].icons.length !== 0) {
            return this.result[i].title;
          }
        }
        return null;
      },
      set() {
      }
    },
    // 计算总个数
    total() {
      let num = {el: 0, ele: 0};
      this.data.forEach(item => {
        item.icons.forEach(d => {
          if (d.indexOf('el-icon-_') === 0) {
            num.ele++;
          } else {
            num.el++;
          }
        });
      });
      num.all = num.el + num.ele;
      return num;
    },
    // 提示文本
    tipTitle() {
      return `新增 ${this.total.ele} 个图标 + Element UI ${this.total.el} 个图标, 共计 ${this.total.all} 个图标`;
    }
  },
  methods: {
    /* 复制图标 */
    onCopy() {
      this.$message({type: 'success', message: '复制成功'});
    },
    onError() {
      this.$message.error('复制失败');
    }
  }
}
</script>

<style scoped>
/* 搜索框 */
.demo-icon-search {
  width: 180px;
  position: absolute;
  right: 10px;
  top: 7px;
  z-index: 1;
}

/* 选项卡 */
.demo-icon-tabs ::v-deep .el-tabs__nav-scroll {
  padding: 0 20px;
}

.demo-icon-tabs ::v-deep .el-tabs__item {
  height: 45px;
  line-height: 45px;
}

/* 图标 */
.demo-icon {
  margin: 15px;
  border-top: 1px solid hsla(0, 0%, 60%, .15);
  border-left: 1px solid hsla(0, 0%, 60%, .15);
}

.demo-icon-item {
  text-align: center;
  padding: 25px 0 25px 0;
  border-right: 1px solid hsla(0, 0%, 60%, .15);
  border-bottom: 1px solid hsla(0, 0%, 60%, .15);
  transition: color .2s, background-color .2s;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.demo-icon-content {
  font-size: 38px;
}

.demo-icon-text {
  font-size: 13px;
  margin-top: 8px;
  padding: 0 5px;
  transition: color .2s;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
}

.demo-icon-item:after {
  content: "点击复制";
  position: absolute;
  bottom: -30px;
  left: 0;
  width: 100%;
  color: #FFF;
  padding: 4px 0;
  font-size: 12px;
  background-color: #409EFF;
  transition: bottom .2s;
}

.demo-icon-item:hover:after {
  bottom: 0;
}

/* 图标选择器演示 */
.demo-icon-picker-item {
  max-width: 400px;
  padding: 0 20px 20px;
}

/* 自适应 */
@media screen and (max-width: 660px) {
  .demo-icon-search {
    width: auto;
    margin: 10px 10px 0;
    position: static;
  }
}
</style>
