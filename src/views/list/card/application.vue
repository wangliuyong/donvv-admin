<template>
  <el-row :gutter="15">
    <el-col
      v-for="(item,index) in data"
      :key="index"
      :md="6"
      :sm="8"
      :xs="12">
      <el-card
        class="application-list-item ele-card-border"
        shadow="never">
        <div class="application-list-body">
          <div class="ele-cell">
            <el-avatar :size="34" :src="item.cover"/>
            <h6 class="ele-cell-content"><b>{{ item.title }}</b></h6>
          </div>
          <div class="application-body-item ele-elip">网址：{{ item.url }}</div>
          <div class="application-body-item ele-elip">最后更新时间：{{ item.time }}</div>
        </div>
        <el-divider/>
        <div class="application-list-footer">
          <div class="application-list-tool">
            <el-tooltip content="下载" placement="top">
              <i class="el-icon-download ele-text-secondary"/>
            </el-tooltip>
          </div>
          <el-divider direction="vertical" class="line-color-light"/>
          <div class="application-list-tool">
            <el-tooltip content="编辑" placement="top">
              <i class="el-icon-edit ele-text-secondary"/>
            </el-tooltip>
          </div>
          <el-divider direction="vertical" class="line-color-light"/>
          <div class="application-list-tool">
            <el-tooltip content="分享" placement="top">
              <i class="el-icon-share ele-text-secondary"/>
            </el-tooltip>
          </div>
          <el-divider direction="vertical" class="line-color-light"/>
          <div class="application-list-tool">
            <el-dropdown placement="bottom">
              <i class="el-icon-more ele-text-secondary"/>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>1st menu item</el-dropdown-item>
                <el-dropdown-item>2nd menu item</el-dropdown-item>
                <el-dropdown-item>3d menu item</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'ListCardApplication',
  data() {
    return {
      data: [{
        title: 'ElementUI',
        url: 'https://element.eleme.cn',
        time: '2 小时前',
        cover: 'https://cdn.eleadmin.com/20200609/c184eef391ae48dba87e3057e70238fb.jpg'
      }, {
        title: 'Vue.js',
        url: 'https://cn.vuejs.org',
        time: '4 小时前',
        cover: 'https://cdn.eleadmin.com/20200609/b6a811873e704db49db994053a5019b2.jpg'
      }, {
        title: 'Vuex',
        url: 'https://vuex.vuejs.org',
        time: '12 小时前',
        cover: 'https://cdn.eleadmin.com/20200609/948344a2a77c47a7a7b332fe12ff749a.jpg'
      }, {
        title: 'Vue Router',
        url: 'https://vuex.vuejs.org',
        time: '14 小时前',
        cover: 'https://cdn.eleadmin.com/20200609/f6bc05af944a4f738b54128717952107.jpg'
      }, {
        title: 'Sass',
        url: 'https://www.sass.hk',
        time: '10 小时前',
        cover: 'https://cdn.eleadmin.com/20200609/2d98970a51b34b6b859339c96b240dcd.jpg'
      }, {
        title: 'Axios',
        url: 'http://www.axios-js.com',
        time: '16 小时前',
        cover: 'https://cdn.eleadmin.com/20200609/faa0202700ee455b90fe77d8bef98bc0.jpg'
      }, {
        title: 'Webpack',
        url: 'https://www.webpackjs.com',
        time: '6 小时前',
        cover: 'https://cdn.eleadmin.com/20200609/d3519518b00d42d3936b2ab5ce3a4cc3.jpg'
      }, {
        title: 'Node.js',
        url: 'http://nodejs.cn',
        time: '8 小时前',
        cover: 'https://cdn.eleadmin.com/20200609/fe9196dd091e438fba115205c1003ee7.jpg'
      }]
    }
  }
}
</script>

<style scoped>
.application-list-item {
  margin-bottom: 15px;
}

.application-list-item ::v-deep .el-card__body {
  padding: 0;
}

.application-list-body {
  padding: 12px 15px 15px 15px;
}

.application-body-item {
  margin-top: 12px;
}

.application-body-item + .application-body-item {
  margin-top: 8px;
}

.application-list-footer {
  display: flex;
  padding: 8px 0;
}

.application-list-tool {
  flex: 1;
  text-align: center;
}

.application-list-tool ::v-deep i {
  font-size: 18px;
  line-height: 36px;
  cursor: pointer;
}

.application-list-footer ::v-deep .el-divider--vertical {
  height: 36px;
}
</style>
