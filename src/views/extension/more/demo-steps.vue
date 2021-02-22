<template>
  <el-card shadow="never" header="步骤条">
    <div class="demo-steps-item">
      <el-steps :active="stepsActive" class="ele-steps-horizontal">
        <el-step title="第一步"/>
        <el-step title="第二步"/>
        <el-step title="第三步"/>
        <el-step title="第四步"/>
      </el-steps>
    </div>
    <div class="demo-steps-item">
      <el-steps :active="stepsActive" class="ele-steps-horizontal">
        <el-step title="第一步" description="这里是该步骤的描述信息"/>
        <el-step title="第二步" description="这里是该步骤的描述信息"/>
        <el-step title="第三步" description="这里是该步骤的描述信息"/>
        <el-step title="第四步" description="这里是该步骤的描述信息"/>
      </el-steps>
    </div>
    <div class="demo-steps-item" style="margin-bottom: 16px;">
      <el-button @click="stepsPrev" size="small">上一步</el-button>
      <el-button type="primary" @click="stepsNext" size="small">下一步</el-button>
    </div>
    <div class="demo-steps-item-vertical">
      <el-steps direction="vertical" :active="stepsActive" style="height: 360px">
        <el-step title="第一步"/>
        <el-step title="第二步"/>
        <el-step title="第三步"/>
        <el-step title="第四步"/>
      </el-steps>
    </div>
    <div class="demo-steps-item-vertical">
      <el-steps direction="vertical" :active="stepsActive" style="height: 360px">
        <el-step title="第一步" description="这里是该步骤的描述信息"/>
        <el-step title="第二步" description="这里是该步骤的描述信息"/>
        <el-step title="第三步" description="这里是该步骤的描述信息"/>
        <el-step title="第四步" description="这里是该步骤的描述信息"/>
      </el-steps>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'DemoSteps',
  data() {
    return {
      stepsActive: 0
    }
  },
  methods: {
    /* 下一步 */
    stepsNext() {
      this.stepsActive++;
      if (this.stepsActive > 4) {
        this.stepsActive = 0;
      }
    },
    /* 上一步 */
    stepsPrev() {
      this.stepsActive--;
      if (this.stepsActive < 0) {
        this.stepsActive = 4;
      }
    }
  }
}
</script>

<style scoped>
.demo-steps-item {
  max-width: 900px;
  padding: 10px 10px 0 10px;
}

.demo-steps-item + .demo-steps-item {
  margin-top: 15px;
}

.el-button + .el-button {
  margin-left: 20px;
}

.demo-steps-item-vertical {
  width: 250px;
  display: inline-block;
  padding: 10px 0 10px 10px;
}
</style>