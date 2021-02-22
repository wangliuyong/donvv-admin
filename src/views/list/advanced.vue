<template>
  <div class="ele-body">
    <el-card shadow="never">
      <el-row>
        <el-col :sm="8">
          <div class="top-text-item">
            <div class="top-text-title">进行中的任务</div>
            <div class="top-text-content">10 个任务</div>
          </div>
        </el-col>
        <el-col :sm="8">
          <div class="top-text-item">
            <div class="top-text-title">剩余任务</div>
            <div class="top-text-content">3 个任务</div>
          </div>
        </el-col>
        <el-col :sm="8">
          <div class="top-text-item">
            <div class="top-text-title">任务总耗时</div>
            <div class="top-text-content">120 个小时</div>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-card shadow="never" v-loading="loading">
      <!-- 头部工具栏 -->
      <div class="ele-table-tool">
        <h6 class="ele-table-tool-title">复杂列表</h6>
        <div class="ele-table-tool-right">
          <div class="ele-inline-block">
            <el-radio-group
              v-model="search.state"
              @change="query"
              size="small">
              <el-radio-button :label="0">全部</el-radio-button>
              <el-radio-button :label="1">进行中</el-radio-button>
              <el-radio-button :label="2">已完成</el-radio-button>
            </el-radio-group>
          </div>
          <div class="ele-inline-block adv-list-search-group hidden-xs-only">
            <el-input
              placeholder="请输入..."
              v-model="search.keyword"
              size="small"
              clearable
              @keyup.enter.native="query">
              <el-button
                @click="query"
                slot="append"
                icon="el-icon-search"/>
            </el-input>
          </div>
          <div class="ele-inline-block">
            <el-button
              @click="showSearch=true"
              icon="el-icon-_retrieve"
              class="ele-btn-icon"
              size="mini"
              style="font-size:15px;"
              title="高级查询"/>
          </div>
        </div>
      </div>
      <el-button
        @click="showEdit=true"
        icon="el-icon-plus"
        class="ele-fluid"
        style="margin-bottom: 10px;">添加
      </el-button>
      <!-- 数据列表 -->
      <div v-for="(item,index) in data" :key="index">
        <div class="basic-list-item">
          <div class="ele-cell">
            <el-avatar shape="square" :size="60" :src="item.cover"/>
            <div class="ele-cell-content">
              <div class="ele-cell-title">{{ item.title }}</div>
              <div class="ele-cell-desc">{{ item.content }}</div>
            </div>
          </div>
          <div class="basic-list-item-owner">
            <div>发布人</div>
            <div class="ele-text-secondary">{{ item.user }}</div>
          </div>
          <div class="basic-list-item-time">
            <div>开始时间</div>
            <div class="ele-text-secondary">{{ item.time }}</div>
          </div>
          <div class="basic-list-item-progress">
            <el-progress :percentage="item.progress" :status="item.status"/>
          </div>
          <div class="basic-list-item-tool">
            <el-link
              @click="edit(item)"
              icon="el-icon-edit"
              type="primary"
              :underline="false">编辑
            </el-link>
            <el-dropdown @command="command => dropClick(command, item)">
              <el-link
                type="primary"
                :underline="false">
                更多<i class="el-icon-arrow-down"/>
              </el-link>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="share">分享</el-dropdown-item>
                <el-dropdown-item command="remove">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <el-divider/>
      </div>
      <el-pagination
        :current-page="page.page"
        :page-size="page.limit"
        :total="count"
        :background="true"
        @size-change="d => (page.limit=d) && query()"
        @current-change="d => (page.page=d) && query()"
        layout="total, prev, pager, next, jumper"
        :pager-count="5"
        class="ele-pagination-circle"/>
    </el-card>
    <!-- 编辑弹窗 -->
    <el-dialog
      :title="form.id?'任务编辑':'任务添加'"
      :visible.sync="showEdit"
      width="400px"
      @closed="form={}"
      :destroy-on-close="true"
      :lock-scroll="false">
      <el-form ref="editForm"
               :model="form"
               :rules="rules"
               label-width="82px">
        <el-form-item label="任务名称:" prop="title">
          <el-input
            v-model="form.title"
            placeholder="请输入任务名称"
            clearable/>
        </el-form-item>
        <el-form-item label="开始时间:" prop="time">
          <el-date-picker
            v-model="form.time"
            type="datetime"
            placeholder="请选择开始时间"
            format="yyyy-MM-dd HH:mm"
            value-format="yyyy-MM-dd HH:mm"
            class="ele-fluid"/>
        </el-form-item>
        <el-form-item label="负责人:" prop="user">
          <el-select
            v-model="form.user"
            placeholder="请选择负责人"
            class="ele-fluid"
            clearable>
            <el-option label="SunSmile" value="SunSmile"/>
            <el-option label="你的名字很好听" value="你的名字很好听"/>
            <el-option label="全村人的希望" value="林东东"/>
            <el-option label="Jasmine" value="Jasmine"/>
            <el-option label="酷酷的大叔" value="酷酷的大叔"/>
          </el-select>
        </el-form-item>
        <el-form-item label="任务描述:">
          <el-input
            v-model="form.content"
            placeholder="请输入任务描述"
            :rows="4"
            type="textarea"/>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="showEdit=false">取消</el-button>
        <el-button
          type="primary"
          @click="save"
          :loading="editLoading">保存
        </el-button>
      </div>
    </el-dialog>
    <!-- 高级查询抽屉 -->
    <el-drawer
      title="高级查询"
      :visible.sync="showSearch"
      size="340px"
      :append-to-body="true">
      <div style="padding: 22px 22px 22px 10px;">
        <el-form
          ref="searchForm"
          :model="searchForm"
          label-width="82px">
          <el-form-item label="任务名称:">
            <el-input
              v-model="searchForm.title"
              placeholder="请输入任务名称"
              clearable/>
          </el-form-item>
          <el-form-item label="开始时间:">
            <el-date-picker
              v-model="searchForm.time"
              type="datetime" placeholder="请选择开始时间"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              class="ele-fluid"/>
          </el-form-item>
          <el-form-item label="负责人:" prop="user">
            <el-select
              v-model="searchForm.user"
              placeholder="请选择负责人"
              clearable
              class="ele-fluid">
              <el-option label="SunSmile" value="SunSmile"/>
              <el-option label="你的名字很好听" value="你的名字很好听"/>
              <el-option label="全村人的希望" value="林东东"/>
              <el-option label="Jasmine" value="Jasmine"/>
              <el-option label="酷酷的大叔" value="酷酷的大叔"/>
            </el-select>
          </el-form-item>
          <el-form-item label="任务描述:">
            <el-input
              v-model="searchForm.content"
              placeholder="请输入任务描述"
              :rows="4"
              type="textarea"/>
          </el-form-item>
        </el-form>
        <div class="ele-text-center">
          <el-button type="primary" @click="query">搜索</el-button>
          <el-button @click="showSearch=false">关闭</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'ListAdvanced',
  data() {
    return {
      // 列表加载状态
      loading: false,
      data: [
        {
          id: 1,
          title: 'ElementUI',
          time: '2020-06-13 08:33',
          user: 'SunSmile',
          progress: 87,
          content: 'Element，一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的组件库，提供了配套设计资源，帮助你的网站快速成型。',
          cover: 'https://cdn.eleadmin.com/20200609/c184eef391ae48dba87e3057e70238fb.jpg'
        },
        {
          id: 2,
          title: 'Vue.js',
          time: '2020-06-13 06:40',
          user: 'Pojin',
          progress: 100,
          status: 'success',
          content: 'Vue 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。',
          cover: 'https://cdn.eleadmin.com/20200609/b6a811873e704db49db994053a5019b2.jpg'
        },
        {
          id: 3,
          title: 'Vuex',
          time: '2020-06-13 04:40',
          user: 'SuperWill',
          progress: 75,
          content: 'Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。',
          cover: 'https://cdn.eleadmin.com/20200609/948344a2a77c47a7a7b332fe12ff749a.jpg'
        },
        {
          id: 4,
          title: 'Vue Router',
          time: '2020-06-13 02:40',
          user: 'Jasmine',
          progress: 65,
          content: 'Vue Router 是 Vue.js 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌。',
          cover: 'https://cdn.eleadmin.com/20200609/f6bc05af944a4f738b54128717952107.jpg'
        },
        {
          id: 5,
          title: 'Sass',
          time: '2020-06-13 00:40',
          user: 'Vast',
          progress: 45,
          status: 'exception',
          content: 'Sass 是世界上最成熟、稳定、强大的专业级 CSS 扩展语言。',
          cover: 'https://cdn.eleadmin.com/20200609/2d98970a51b34b6b859339c96b240dcd.jpg'
        }
      ],
      // 搜索表单
      search: {
        state: 0
      },
      // 分页参数
      page: {page: 1, limit: 5},
      // 数据总数
      count: 100,
      // 是否显示编辑弹窗
      showEdit: false,
      // 编辑弹窗数据
      form: {},
      // 编辑弹窗表单验证规则
      rules: {
        title: [
          {required: true, message: '请输入任务名称', trigger: 'blur'}
        ],
        time: [
          {required: true, message: '请选择开始时间', trigger: 'blur'}
        ],
        user: [
          {required: true, message: '请选择负责人', trigger: 'blur'}
        ]
      },
      // 编辑表单加载状态
      editLoading: false,
      // 是否显示搜索抽屉
      showSearch: false,
      // 高级搜索表单
      searchForm: {}
    }
  },
  methods: {
    /* 查询数据 */
    query() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 300);
    },
    /* 显示编辑弹窗 */
    edit(item) {
      this.form = Object.assign({}, item);
      this.showEdit = true;
    },
    /* 保存编辑 */
    save() {
      this.$refs['editForm'].validate((valid) => {
        if (valid) {
          this.editLoading = true;
          setTimeout(() => {
            this.editLoading = false;
            this.showEdit = false;
            this.$message({type: 'success', message: '保存成功'});
            if (this.form.id) {
              // 保存修改
              Object.assign(this.data.filter(d => d.id === this.form.id)[0], this.form);
            } else {
              // 保存添加
              this.data.push(Object.assign({
                id: new Date().getTime(),
                cover: 'https://cdn.eleadmin.com/20200610/RZ8FQmZfHkcffMlTBCJllBFjEhEsObVo.jpg'
              }, this.form));
            }
          }, 300);
        } else {
          return false;
        }
      });
    },
    /* 下拉菜单点击事件 */
    dropClick(command, item) {
      if (command === 'remove') {
        // 删除
        this.$confirm('确定删除该任务吗？', '删除任务', {
          type: 'warning'
        }).then(() => {
          this.data.splice(this.data.findIndex(d => d.id === item.id), 1);
          this.$message({type: 'success', message: '删除成功'});
        }).catch(() => 0);
      } else if (command === 'share') {
        this.$message('点击了分享');
      }
    }
  }
}
</script>

<style scoped>
/* 顶部文字样式 */
.top-text-item {
  padding: 8px 0;
  text-align: center;
}

.top-text-item .top-text-content {
  font-size: 24px;
  margin-top: 8px;
}

/* 列表样式 */
.basic-list-item {
  display: flex;
  align-items: center;
  padding: 15px 10px;
}

.basic-list-item .ele-cell {
  flex: 1;
}

.basic-list-item .basic-list-item-owner {
  width: 60px;
  padding: 0 15px;
}

.basic-list-item .basic-list-item-time {
  width: 150px;
  padding: 0 15px;
}

.basic-list-item .ele-text-secondary {
  margin-top: 8px;
}

.basic-list-item .basic-list-item-progress {
  width: 180px;
}

.basic-list-item .basic-list-item-tool {
  padding: 0 15px;
}

.ele-body .el-pagination {
  margin: 20px 0 5px 0;
}

/* 表头工具栏 */
.ele-table-tool-right .ele-inline-block {
  vertical-align: top;
}

.ele-table-tool-right .ele-inline-block + .ele-inline-block {
  margin-left: 12px;
}

.ele-inline-block ::v-deep .el-radio-button__inner {
  padding-left: 12px;
  padding-right: 12px;
}

.adv-list-search-group {
  width: 180px;
}

.adv-list-search-group ::v-deep .el-button {
  padding-left: 13px;
  padding-right: 12px;
}

/* 响应式 */
@media screen and (max-width: 992px) {
  .basic-list-item .basic-list-item-owner,
  .basic-list-item .basic-list-item-time,
  .basic-list-item .basic-list-item-progress,
  .basic-list-item .basic-list-item-tool {
    width: auto;
    padding: 0 10px;
  }

  .basic-list-item .basic-list-item-progress {
    width: 100px;
  }
}

@media screen and (max-width: 768px) {
  .basic-list-item {
    display: block;
  }

  .basic-list-item .basic-list-item-owner,
  .basic-list-item .basic-list-item-time,
  .basic-list-item .basic-list-item-progress,
  .basic-list-item .basic-list-item-tool {
    width: auto;
    padding: 8px 0 0 0;
  }

  .basic-list-item .ele-text-secondary {
    margin-top: 0;
    padding-left: 15px;
  }

  .basic-list-item .basic-list-item-owner > div,
  .basic-list-item .basic-list-item-time > div {
    display: inline-block;
  }

  .basic-list-item .basic-list-item-tool {
    text-align: right;
  }
}
</style>
