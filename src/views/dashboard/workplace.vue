<template>
  <div class="ele-body ele-body-card">
    <!-- 顶部卡片 -->
    <el-card shadow="never" body-style="padding: 20px;">
      <div class="ele-cell workplace-user-card">
        <div class="ele-cell-content ele-cell">
          <el-avatar :size="68" :src="loginUser.avatar"/>
          <div class="ele-cell-content">
            <h4 class="ele-elip">早安，{{ loginUser.nickname }}，开始您一天的工作吧！</h4>
            <div class="ele-text-secondary ele-elip" style="margin-top: 8px;">
              <i class="el-icon-heavy-rain"></i>
              <span><s/><s/>今日阴转小雨，22℃ - 32℃，出门记得带伞哦。</span>
            </div>
          </div>
        </div>
        <div class="workplace-count-group">
          <div class="workplace-count-item">
            <div class="workplace-count-header">
              <el-tag size="small" class="ele-tag-round">
                <i class="el-icon-menu"></i>
              </el-tag>
              <span class="workplace-count-name">项目数</span>
            </div>
            <div class="workplace-count-num">3</div>
          </div>
          <div class="workplace-count-item">
            <div class="workplace-count-header">
              <el-tag type="warning" size="small" class="ele-tag-round">
                <i class="el-icon-finished"></i>
              </el-tag>
              <span class="workplace-count-name">待办项</span>
            </div>
            <div class="workplace-count-num">6 / 24</div>
          </div>
          <div class="workplace-count-item">
            <div class="workplace-count-header">
              <el-tag type="success" size="small" class="ele-tag-round">
                <i class="el-icon-bell"></i>
              </el-tag>
              <span class="workplace-count-name">消息</span>
            </div>
            <div class="workplace-count-num">1,689</div>
          </div>
        </div>
      </div>
    </el-card>
    <!-- 快捷方式 -->
    <el-row :gutter="15">
      <el-col :md="3" :sm="6" :xs="12">
        <el-card shadow="hover" body-style="padding: 0;">
          <router-link to="/system/user" class="app-link-block">
            <i class="app-link-icon el-icon-user"></i>
            <div class="app-link-title">用户</div>
          </router-link>
        </el-card>
      </el-col>
      <el-col :md="3" :sm="6" :xs="12">
        <el-card shadow="hover" body-style="padding: 0;">
          <router-link to="/dashboard/analysis" class="app-link-block">
            <i class="app-link-icon el-icon-data-line" style="color: #95de64;"></i>
            <div class="app-link-title">分析</div>
          </router-link>
        </el-card>
      </el-col>
      <el-col :md="3" :sm="6" :xs="12">
        <el-card shadow="hover" body-style="padding: 0;">
          <router-link to="/list/card/project" class="app-link-block">
            <i class="app-link-icon el-icon-shopping-cart-2" style="color: #ff9c6e;"></i>
            <div class="app-link-title">商品</div>
          </router-link>
        </el-card>
      </el-col>
      <el-col :md="3" :sm="6" :xs="12">
        <el-card shadow="hover" body-style="padding: 0;">
          <router-link to="/list/basic" class="app-link-block">
            <i class="app-link-icon el-icon-tickets" style="color: #b37feb;"></i>
            <div class="app-link-title">订单</div>
          </router-link>
        </el-card>
      </el-col>
      <el-col :md="3" :sm="6" :xs="12">
        <el-card shadow="hover" body-style="padding: 0;">
          <router-link to="/list/advanced" class="app-link-block">
            <i class="app-link-icon el-icon-bank-card" style="color: #ffd666;"></i>
            <div class="app-link-title">票据</div>
          </router-link>
        </el-card>
      </el-col>
      <el-col :md="3" :sm="6" :xs="12">
        <el-card shadow="hover" body-style="padding: 0;">
          <router-link to="/user/message" class="app-link-block">
            <i class="app-link-icon el-icon-message" style="color: #5cdbd3;"></i>
            <div class="app-link-title">消息</div>
          </router-link>
        </el-card>
      </el-col>
      <el-col :md="3" :sm="6" :xs="12">
        <el-card shadow="hover" body-style="padding: 0;">
          <router-link to="/extension/more" class="app-link-block">
            <i class="app-link-icon el-icon-discount" style="color: #ff85c0;"></i>
            <div class="app-link-title">标签</div>
          </router-link>
        </el-card>
      </el-col>
      <el-col :md="3" :sm="6" :xs="12">
        <el-card shadow="hover" body-style="padding: 0;">
          <router-link to="/user/info" class="app-link-block">
            <i class="app-link-icon el-icon-s-operation" style="color: #ffc069;"></i>
            <div class="app-link-title">配置</div>
          </router-link>
        </el-card>
      </el-col>
    </el-row>
    <!-- 最新动态、我的任务、本月目标 -->
    <el-row :gutter="15">
      <el-col :sm="8">
        <el-card
          shadow="never"
          header="最新动态"
          body-style="padding: 0;">
          <el-scrollbar
            style="height: 318px;"
            wrapStyle="overflow-x: hidden;"
            viewStyle="padding: 20px 10px;">
            <el-timeline
              :reverse="false"
              class="ele-timeline ele-timeline-act">
              <el-timeline-item
                v-for="(act, index) in activities"
                :key="index"
                :timestamp="act.timestamp"
                :type="act.primary ? 'primary' : ''">
                {{ act.title }}
              </el-timeline-item>
            </el-timeline>
          </el-scrollbar>
        </el-card>
      </el-col>
      <el-col :sm="8">
        <el-card
          class="workplace-table-card"
          shadow="never"
          header="我的任务"
          body-style="padding: 0;">
          <el-table-draggable handle=".sort-handle" :animate="300">
            <el-table :data="taskList" :height="318" class="ele-table-default-head">
              <el-table-column width="38" align="center">
                <i class="sort-handle el-icon-_nav ele-text-placeholder"></i>
              </el-table-column>
              <el-table-column label="优先级" width="65">
                <template slot-scope="{row}">
                  <el-tag
                    size="mini"
                    :type="['danger','warning','primary'][row.priority-1]"
                    class="ele-tag-round">
                    {{ row.priority }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="任务名称">
                <template slot-scope="{row}">
                  <el-link
                    type="primary"
                    :underline="false">
                    {{ row.taskName }}
                  </el-link>
                </template>
              </el-table-column>
              <el-table-column label="状态" width="70" align="center">
                <template slot-scope="{row}">
                  <span
                    :class="['ele-text-warning','ele-text-success','ele-text-info'][row.state]">
                      {{ ['未开始', '进行中', '已完成'][row.state] }}
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </el-table-draggable>
        </el-card>
      </el-col>
      <el-col :sm="8">
        <el-card shadow="never" header="本月目标">
          <div class="workplace-goal-group">
            <el-progress
              type="dashboard"
              :percentage="80"
              :width="170"
              :format="()=>{return ''}"/>
            <div class="workplace-goal-content">
              <el-tag
                size="large"
                class="ele-tag-round">
                <i class="el-icon-s-data"></i>
              </el-tag>
              <div class="workplace-goal-num">285</div>
            </div>
            <div class="workplace-goal-text">恭喜，本月目标已达标！</div>
          </div>
        </el-card>
      </el-col>
      <el-col :sm="16">
        <el-card
          class="workplace-table-card"
          shadow="never"
          header="项目进度"
          body-style="padding: 12px;">
          <el-table :data="projectList" height="358">
            <el-table-column
              type="index"
              width="35"
              min-width="35"
              align="right"/>
            <el-table-column
              label="项目名称"
              min-width="110">
              <template slot-scope="{row}">
                <el-link
                  type="primary"
                  :underline="false">
                  {{ row.projectName }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column
              prop="startDate"
              label="开始时间"
              width="95"
              min-width="80"
              align="center"/>
            <el-table-column
              prop="endDate"
              label="结束时间"
              width="95"
              min-width="80"
              align="center"/>
            <el-table-column
              label="状态"
              width="70"
              min-width="60"
              align="center">
              <template slot-scope="{row}">
                <span
                  :class="['ele-text-success','ele-text-danger','ele-text-warning','ele-text-info ele-text-delete'][row.state]">
                    {{ ['进行中', '已延期', '未开始', '已结束'][row.state] }}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="进度" width="160" min-width="100" align="center">
              <template slot-scope="{row}">
                <el-progress :percentage="row.progress" class="ele-text-small"/>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :sm="8">
        <el-card
          shadow="never"
          header="小组成员"
          body-style="padding: 19px 0;">
          <div
            v-for="(item,index) in userList"
            :key="index"
            class="ele-cell user-list-item">
            <el-avatar :size="42" :src="item.avatar"/>
            <div class="ele-cell-content">
              <div class="ele-cell-title">{{ item.name }}</div>
              <div class="ele-cell-desc">{{ item.desc }}</div>
            </div>
            <el-tag
              size="mini"
              :type="['success','danger'][item.state]">
              {{ ['在线', '离线'][item.state] }}
            </el-tag>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'DashboardWorkplace',
  data() {
    return {
      // 最新动态数据
      activities: [
        {
          title: 'SunSmile 解决了bug 登录提示操作失败',
          timestamp: '20:30',
          primary: false
        },
        {
          title: 'Jasmine 解决了bug 按钮颜色与设计不符',
          timestamp: '19:30',
          primary: false
        },
        {
          title: '项目经理 指派了任务 解决项目一的bug',
          timestamp: '18:30',
          primary: true
        },
        {
          title: '项目经理 指派了任务 解决项目二的bug',
          timestamp: '17:30',
          primary: true
        },
        {
          title: '项目经理 指派了任务 解决项目三的bug',
          timestamp: '16:30',
          primary: true
        },
        {
          title: '项目经理 指派了任务 解决项目四的bug',
          timestamp: '15:30',
          primary: false
        },
        {
          title: '项目经理 指派了任务 解决项目五的bug',
          timestamp: '14:30',
          primary: false
        },
        {
          title: '项目经理 指派了任务 解决项目六的bug',
          timestamp: '12:30',
          primary: false
        },
        {
          title: '项目经理 指派了任务 解决项目七的bug',
          timestamp: '11:30',
          primary: true
        },
        {
          title: '项目经理 指派了任务 解决项目八的bug',
          timestamp: '10:30',
          primary: false
        },
        {
          title: '项目经理 指派了任务 解决项目九的bug',
          timestamp: '09:30',
          primary: false
        },
        {
          title: '项目经理 指派了任务 解决项目十的bug',
          timestamp: '08:30',
          primary: false
        }
      ],
      // 我的任务数据
      taskList: [
        {
          id: 1,
          priority: 1,
          taskName: '解决项目一的bug',
          state: 0
        },
        {
          id: 2,
          priority: 2,
          taskName: '解决项目二的bug',
          state: 0
        },
        {
          id: 3,
          priority: 2,
          taskName: '解决项目三的bug',
          state: 1
        },
        {
          id: 4,
          priority: 3,
          taskName: '解决项目四的bug',
          state: 1
        },
        {
          id: 5,
          priority: 3,
          taskName: '解决项目五的bug',
          state: 2
        },
        {
          id: 6,
          priority: 3,
          taskName: '解决项目六的bug',
          state: 2
        }
      ],
      // 项目进度数据
      projectList: [
        {
          projectName: '项目0000001',
          state: 0,
          startDate: '2020-03-01',
          endDate: '2020-06-01',
          progress: 30
        },
        {
          projectName: '项目0000002',
          state: 0,
          startDate: '2020-03-01',
          endDate: '2020-08-01',
          progress: 10
        },
        {
          projectName: '项目0000003',
          state: 1,
          startDate: '2020-01-01',
          endDate: '2020-05-01',
          progress: 60
        },
        {
          projectName: '项目0000004',
          state: 1,
          startDate: '2020-06-01',
          endDate: '2020-10-01',
          progress: 0
        },
        {
          projectName: '项目0000005',
          state: 2, startDate: '2020-01-01',
          endDate: '2020-03-01',
          progress: 100
        },
        {
          projectName: '项目0000006',
          state: 3,
          startDate: '2020-01-01',
          endDate: '2020-03-01',
          progress: 100
        },
        {
          projectName: '项目0000007',
          state: 3,
          startDate: '2020-01-01',
          endDate: '2020-03-01',
          progress: 100
        }
      ],
      // 小组成员数据
      userList: [
        {
          name: 'SunSmile',
          desc: 'UI设计师、交互专家',
          state: 0,
          avatar: 'https://cdn.eleadmin.com/20200609/c184eef391ae48dba87e3057e70238fb.jpg'
        },
        {
          name: '你的名字很好听',
          desc: '前端工程师',
          state: 0,
          avatar: 'https://cdn.eleadmin.com/20200609/b6a811873e704db49db994053a5019b2.jpg'
        },
        {
          name: '全村人的希望',
          desc: '前端工程师',
          state: 0,
          avatar: 'https://cdn.eleadmin.com/20200609/948344a2a77c47a7a7b332fe12ff749a.jpg'
        },
        {
          name: 'Jasmine',
          desc: '产品经理、项目经理',
          state: 1,
          avatar: 'https://cdn.eleadmin.com/20200609/f6bc05af944a4f738b54128717952107.jpg'
        },
        {
          name: '酷酷的大叔',
          desc: '组长、后端工程师',
          state: 1,
          avatar: 'https://cdn.eleadmin.com/20200609/2d98970a51b34b6b859339c96b240dcd.jpg'
        }
      ]
    }
  },
  computed: {
    // 当前登录用户信息
    loginUser() {
      return this.$store.state.user.user;
    }
  }
}
</script>

<style scoped>
/* 顶部用户信息卡片 */
.workplace-user-card .ele-cell-content {
  overflow: hidden;
}

.workplace-count-group {
  white-space: nowrap;
}

.workplace-count-item {
  padding: 0 5px 0 25px;
  box-sizing: border-box;
  display: inline-block;
  text-align: right;
}

.workplace-count-name {
  padding-left: 8px;
}

.workplace-count-num {
  font-size: 24px;
  margin-top: 6px;
}

@media screen and (max-width: 992px) {
  .workplace-count-item {
    padding: 0 5px 0 10px;
  }
}

@media screen and (max-width: 768px) {
  .workplace-user-card,
  .workplace-count-group {
    display: block;
  }

  .workplace-count-group {
    margin-top: 15px;
    text-align: right;
  }
}

/* 快捷方式 */
.app-link-block {
  display: block;
  color: inherit;
  padding: 15px 0;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
}

.app-link-block .app-link-icon {
  color: #69c0ff;
  font-size: 30px;
  margin-top: 5px;
}

.app-link-block .app-link-title {
  margin-top: 8px;
}

/* 最新动态时间轴 */
.ele-timeline-act {
  padding-left: 50px;
}

.ele-timeline-act ::v-deep .el-timeline-item__timestamp {
  margin: 0;
  position: absolute;
  top: 3px;
  left: -45px;
}

.ele-timeline-act ::v-deep .el-timeline-item {
  padding-bottom: 19px;
}

.ele-timeline-act ::v-deep .el-timeline-item:last-child {
  padding-bottom: 0;
}

/* 表格 */
.workplace-table-card ::v-deep .el-table tbody > .el-table__row:last-child td {
  border-bottom: none;
}

.workplace-table-card ::v-deep .el-table:before {
  display: none;
}

.workplace-table-card .sort-handle {
  cursor: move;
  font-size: 18px;
  vertical-align: middle;
}

.workplace-table-card ::v-deep .el-table__row.sortable-chosen {
  background-color: hsla(0, 0%, 60%, .1);
}

.workplace-table-card ::v-deep .el-table__row.sortable-chosen td {
  background-color: transparent;
}

/* 本月目标 */
.workplace-goal-group {
  text-align: center;
  position: relative;
  padding: 48px 0;
}

.workplace-goal-group .workplace-goal-content {
  position: absolute;
  top: 90px;
  left: 0;
  width: 100%;
}

.workplace-goal-group .workplace-goal-num {
  font-size: 40px;
  margin-top: 15px;
}

/* 小组成员 */
.user-list-item {
  padding: 13px 18px;
}

.user-list-item + .user-list-item {
  border-top: 1px solid hsla(0, 0%, 60%, .15);
}

.user-list-item .ele-cell-desc {
  margin-top: 5px;
}
</style>
