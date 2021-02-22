<template>
  <el-card shadow="never" style="overflow: visible;">
    <div
      class="article-list-item"
      v-for="(item,index) in data"
      :key="index">
      <div class="article-list-wrapper">
        <div class="article-list-left">
          <h6><b>{{ item.title }}</b></h6>
          <div class="article-list-tags">
            <el-tag
              type="info"
              size="mini"
              v-for="(tag,i) in item.tags"
              :key="i">
              {{ tag }}
            </el-tag>
          </div>
          <div class="article-list-content">{{ item.content }}</div>
          <div class="article-list-user-group">
            <el-avatar :size="24" :src="item.avatar"/>
            <span> {{ item.user }} 发表于 {{ item.time }}</span>
          </div>
          <div class="article-list-footer">
            <div class="article-list-tool">
              <i class="el-icon-star-off"/>
              <span> {{ item.favorites }}</span>
            </div>
            <el-divider direction="vertical"/>
            <div class="article-list-tool">
              <i class="el-icon-view"/>
              <span> {{ item.likes }}</span>
            </div>
            <el-divider direction="vertical"/>
            <div class="article-list-tool">
              <i class="el-icon-chat-dot-square"/>
              <span> {{ item.comments }}</span>
            </div>
          </div>
        </div>
        <div class="article-list-right">
          <el-image
            style="width: 280px;height: 175px;"
            :src="item.cover"
            :preview-src-list="previewList"/>
        </div>
      </div>
      <el-divider/>
    </div>
    <div style="padding-top: 15px;text-align: center;">
      <el-button
        size="small"
        @click="query"
        :loading="loading">加载更多
      </el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'ListCardArticle',
  data() {
    return {
      loading: false,
      data: [
        {
          title: 'ElementUI',
          content: 'Element，一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的组件库，提供了配套设计资源，帮助你的网站快速成型。',
          time: '2 小时前',
          cover: 'https://cdn.eleadmin.com/20200610/RZ8FQmZfHkcffMlTBCJllBFjEhEsObVo.jpg',
          tags: ['UI框架', '设计语言'],
          user: 'SunSmile',
          avatar: 'https://cdn.eleadmin.com/20200609/c184eef391ae48dba87e3057e70238fb.jpg',
          favorites: 104,
          likes: 189,
          comments: 15
        },
        {
          title: 'Vue.js',
          content: 'Vue 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。',
          time: '4 小时前',
          cover: 'https://cdn.eleadmin.com/20200610/WLXm7gp1EbLDtvVQgkeQeyq5OtDm00Jd.jpg',
          tags: ['UI框架', '设计语言'],
          user: '你的名字很好听',
          avatar: 'https://cdn.eleadmin.com/20200609/b6a811873e704db49db994053a5019b2.jpg',
          favorites: 104,
          likes: 189,
          comments: 15
        },
        {
          title: 'Vuex',
          content: 'Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。',
          time: '12 小时前',
          cover: 'https://cdn.eleadmin.com/20200610/4Z0QR2L0J1XStxBh99jVJ8qLfsGsOgjU.jpg',
          tags: ['UI框架', '设计语言'],
          user: '全村人的希望',
          avatar: 'https://cdn.eleadmin.com/20200609/948344a2a77c47a7a7b332fe12ff749a.jpg',
          favorites: 104,
          likes: 189,
          comments: 15
        },
        {
          title: 'Vue Router',
          content: 'Vue Router 是 Vue.js 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌。',
          time: '14 小时前',
          cover: 'https://cdn.eleadmin.com/20200610/ttkIjNPlVDuv4lUTvRX8GIlM2QqSe0jg.jpg',
          tags: ['UI框架', '设计语言'],
          user: 'Jasmine',
          avatar: 'https://cdn.eleadmin.com/20200609/f6bc05af944a4f738b54128717952107.jpg',
          favorites: 104,
          likes: 189,
          comments: 15
        },
        {
          title: 'Sass',
          content: 'Sass 是世界上最成熟、稳定、强大的专业级 CSS 扩展语言。',
          time: '10 小时前',
          cover: 'https://cdn.eleadmin.com/20200610/fAenQ8nvRjL7x0i0jEfuDBZHvJfHf3v6.jpg',
          tags: ['UI框架', '设计语言'],
          user: '酷酷的大叔',
          avatar: 'https://cdn.eleadmin.com/20200609/2d98970a51b34b6b859339c96b240dcd.jpg',
          favorites: 104,
          likes: 189,
          comments: 15
        },
        {
          title: 'Axios',
          content: 'Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。',
          time: '16 小时前',
          cover: 'https://cdn.eleadmin.com/20200610/LrCTN2j94lo9N7wEql7cBr1Ux4rHMvmZ.jpg',
          tags: ['UI框架', '设计语言'],
          user: 'SunSmile',
          avatar: 'https://cdn.eleadmin.com/20200609/c184eef391ae48dba87e3057e70238fb.jpg',
          favorites: 104,
          likes: 189,
          comments: 15
        },
        {
          title: 'Webpack',
          content: 'webpack 是一个模块打包器。webpack 的主要目标是将 JavaScript 文件打包在一起，打包后的文件用于在浏览器中使用。',
          time: '6 小时前',
          cover: 'https://cdn.eleadmin.com/20200610/yeKvhT20lMU0f1T3Y743UlGEOLLnZSnp.jpg',
          tags: ['UI框架', '设计语言'],
          user: '全村人的希望',
          avatar: 'https://cdn.eleadmin.com/20200609/948344a2a77c47a7a7b332fe12ff749a.jpg',
          favorites: 104,
          likes: 189,
          comments: 15
        },
        {
          title: 'Node.js',
          content: 'Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。',
          time: '8 小时前',
          cover: 'https://cdn.eleadmin.com/20200610/CyrCNmTJfv7D6GFAg39bjT3eRkkRm5dI.jpg',
          tags: ['UI框架', '设计语言'],
          user: 'Jasmine',
          avatar: 'https://cdn.eleadmin.com/20200609/f6bc05af944a4f738b54128717952107.jpg',
          favorites: 104,
          likes: 189,
          comments: 15
        }
      ]
    }
  },
  computed: {
    previewList() {
      return this.data.map(item => item.cover);
    }
  },
  methods: {
    query() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 300);
    }
  }
}
</script>

<style scoped>
.article-list-wrapper {
  display: flex;
  padding: 15px 0;
}

.article-list-left {
  flex: 1;
}

.article-list-tags {
  margin-top: 12px;
}

.article-list-content {
  margin-top: 15px;
  max-width: 700px;
}

.article-list-user-group {
  margin-top: 15px;
}

.article-list-user-group > span {
  vertical-align: middle;
}

.article-list-footer {
  margin-top: 15px;
}

.article-list-footer .article-list-tool {
  display: inline-block;
  line-height: 22px;
  cursor: pointer;
}

.article-list-footer .el-divider--vertical {
  margin: 0 16px;
}

/* 响应式 */
@media screen and (max-width: 768px) {
  .article-list-wrapper {
    display: block;
  }

  .article-list-right {
    margin-top: 10px;
  }

  .article-list-right ::v-deep .el-image {
    max-width: 100%;
  }
}
</style>
