<template>
  <div>
    <div class="ele-page-header">
      <div class="ele-page-title">基础表单</div>
      <div class="ele-page-desc">表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。</div>
    </div>
    <div class="ele-body">
      <el-card shadow="never">
        <el-form
          ref="demoForm"
          :model="form"
          :rules="rules"
          label-width="90px"
          style="max-width: 700px;margin: 10px auto;">
          <el-form-item label="标题:" prop="title">
            <el-input
              v-model="form.title"
              placeholder="请输入标题"
              clearable/>
          </el-form-item>
          <el-form-item label="起止日期:" prop="datetime">
            <el-date-picker
              v-model="form.datetime"
              type="daterange"
              unlink-panels range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              class="ele-fluid"/>
          </el-form-item>
          <el-form-item label="目标描述:" prop="goal">
            <el-input
              v-model="form.goal"
              placeholder="请输入目标描述"
              :rows="4"
              type="textarea"/>
          </el-form-item>
          <el-form-item label="衡量标准:" prop="standard">
            <el-input
              v-model="form.standard"
              placeholder="请输入衡量标准"
              :rows="4"
              type="textarea"/>
          </el-form-item>
          <el-form-item label="地点:" prop="address">
            <el-select
              v-model="form.address"
              placeholder="请选择地点"
              clearable
              class="ele-fluid">
              <el-option label="地点一" :value="1"/>
              <el-option label="地点二" :value="2"/>
              <el-option label="地点三" :value="3"/>
            </el-select>
          </el-form-item>
          <el-form-item label="邀评人:">
            <el-select
              v-model="form.invites"
              placeholder="请选择邀评人"
              clearable
              multiple
              class="ele-fluid">
              <el-option
                v-for="item in users"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                <el-avatar
                  :size="24"
                  :src="item.avatar"
                  style="vertical-align: middle;"/>
                <span style="padding-left: 8px;">{{ item.name }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="权重:">
            <el-input-number
              v-model="form.weight"
              controls-position="right"
              :min="0"
              :max="100"
              style="width: 150px;margin-right: 10px;"/>
            <span>%</span>
          </el-form-item>
          <el-form-item label="目标公开:">
            <el-radio-group v-model="form.publicType">
              <el-radio :label="1">公开</el-radio>
              <el-radio :label="2">部分公开</el-radio>
              <el-radio :label="3">不公开</el-radio>
            </el-radio-group>
            <el-input
              v-if="form.publicType===2"
              placeholder="公开给"/>
            <div class="text-info">客户、邀评人默认被分享</div>
          </el-form-item>
          <el-form-item>
            <el-button @click="closeThis">关闭</el-button>
            <el-button
              type="primary"
              @click="submit"
              :loading="loading">提交
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormBasic',
  data() {
    return {
      // 提交状态
      loading: false,
      // 表单数据
      form: {
        weight: 0,
        publicType: 1
      },
      // 表单验证规则
      rules: {
        title: [
          {required: true, message: '请输入标题', trigger: 'blur'}
        ],
        datetime: [
          {required: true, message: '请选择起止日期', trigger: 'blur'}
        ],
        goal: [
          {required: true, message: '请输入目标描述', trigger: 'blur'}
        ],
        standard: [
          {required: true, message: '请输入衡量标准', trigger: 'blur'}
        ],
        address: [
          {required: true, message: '请选择地点', trigger: 'blur'}
        ]
      },
      // 邀评人数据
      users: [
        {
          id: 1,
          name: 'SunSmile',
          avatar: 'https://cdn.eleadmin.com/20200609/c184eef391ae48dba87e3057e70238fb.jpg'
        },
        {
          id: 2,
          name: '你的名字很好听',
          avatar: 'https://cdn.eleadmin.com/20200609/b6a811873e704db49db994053a5019b2.jpg'
        },
        {
          id: 3,
          name: '全村人的希望',
          avatar: 'https://cdn.eleadmin.com/20200609/948344a2a77c47a7a7b332fe12ff749a.jpg'
        },
        {
          id: 4,
          name: 'Jasmine',
          avatar: 'https://cdn.eleadmin.com/20200609/f6bc05af944a4f738b54128717952107.jpg'
        },
        {
          id: 5,
          name: '酷酷的大叔',
          avatar: 'https://cdn.eleadmin.com/20200609/2d98970a51b34b6b859339c96b240dcd.jpg'
        }
      ]
    }
  },
  methods: {
    /* 提交 */
    submit() {
      this.$refs['demoForm'].validate((valid) => {
        if (valid) {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.$message({type: 'success', message: '提交成功'});
          }, 1500);
        } else {
          return false;
        }
      });
    },
    /* 关闭当前页面 */
    closeThis() {
      this.$store.dispatch('user/tabRemove', this.$route.fullPath).then(last => {
        this.$router.push(last === -1 ? '/' : this.$store.state.user.tabs[last].path);
      });
    }
  }
}
</script>

<style scoped>

</style>
