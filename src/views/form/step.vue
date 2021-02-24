<template>
  <div>
    <div class="ele-page-header">
      <div class="ele-page-title">分步表单</div>
      <div class="ele-page-desc">将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。</div>
    </div>
    <div class="ele-body">
      <el-card
        shadow="never"
        body-style="padding: 15px 20px 25px 20px;">
        <div style="max-width: 700px;margin: 0 auto;">
          <el-steps
            :active="active"
            class="ele-steps-horizontal"
            style="margin: 10px 0 45px 0;">
            <el-step title="第一步" description="填写转账信息"/>
            <el-step title="第二步" description="确认转账信息"/>
            <el-step title="第三步" description="转账成功"/>
          </el-steps>
          <!-- 第一步 -->
          <el-form
            v-if="active===0"
            ref="form1"
            :model="form1"
            :rules="rules1"
            label-width="120px"
            style="padding-right: 45px;">
            <el-form-item label="付款账户:" prop="account">
              <el-select
                v-model="form1.account"
                placeholder="请选择付款账户"
                class="ele-fluid"
                clearable>
                <el-option
                  label="eleadmin@eclouds.com"
                  value="eleadmin@eclouds.com"/>
              </el-select>
            </el-form-item>
            <el-form-item label="收款账户:" prop="receiver">
              <el-input
                v-model="form1.receiver"
                placeholder="请输入收款账户"
                clearable
                class="input-with-select">
                <el-select v-model="form1.pay" slot="prepend">
                  <el-option label="支付宝" value="alipay"/>
                  <el-option label="微信" value="wxpay"/>
                </el-select>
              </el-input>
            </el-form-item>
            <el-form-item label="收款人姓名:" prop="name">
              <el-input
                v-model="form1.name"
                placeholder="请输入收款人姓名"
                clearable/>
            </el-form-item>
            <el-form-item label="转账金额:" prop="amount">
              <el-input
                v-model="form1.amount"
                placeholder="请输入转账金额"
                prefix-icon="el-icon-_rmb"
                clearable/>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="submit1"
                :loading="loading1">下一步
              </el-button>
            </el-form-item>
          </el-form>
          <!-- 第二步 -->
          <el-form
            v-if="active===1"
            ref="form2"
            :model="form2"
            :rules="rules2"
            label-width="140px"
            class="ele-form-detail">
            <el-alert
              title="确认转账后，资金将直接打入对方账户，无法退回。"
              type="info"
              show-icon
              class="ele-alert-border"
              style="margin-bottom: 20px;"/>
            <el-form-item label="付款账户:">
              <span>{{ form1.account }}</span>
            </el-form-item>
            <el-form-item label="收款账户:" prop="receiver">
              <span>{{ form1.receiver }}</span>
            </el-form-item>
            <el-form-item label="收款人姓名:" prop="name">
              <span>{{ form1.name }}</span>
            </el-form-item>
            <el-form-item label="转账金额:" prop="amount">
              <span style="font-size: 24px;">{{ form1.amount }}</span>
              <span> 元</span>
            </el-form-item>
            <div style="margin: 20px 0 30px 0;">
              <el-divider/>
            </div>
            <el-form-item
              label="支付密码:"
              prop="password"
              style="margin-bottom: 22px;">
              <el-input
                v-model="form2.password"
                placeholder="请输入支付密码"
                show-password
                style="max-width: 280px;"/>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="submit2"
                :loading="loading2">下一步
              </el-button>
              <el-button @click="active=0">上一步</el-button>
            </el-form-item>
          </el-form>
          <!-- 第三步 -->
          <div v-if="active===2">
            <ele-result title="操作成功" desc="预计两小时内到账">
              <el-form
                label-width="100px"
                size="mini"
                class="ele-form-detail">
                <el-form-item label="付款账户:">
                  <span>{{ form1.account }}</span>
                </el-form-item>
                <el-form-item label="收款账户:">
                  <span>{{ form1.receiver }}</span>
                </el-form-item>
                <el-form-item label="收款人姓名:">
                  <span>{{ form1.name }}</span>
                </el-form-item>
                <el-form-item label="转账金额:" style="margin-bottom: 0;">
                  <span style="font-size: 24px;">{{ form1.amount }}</span>
                  <span> 元</span>
                </el-form-item>
              </el-form>
              <template slot="actions">
                <el-button type="primary" @click="active=0">再转一笔</el-button>
                <el-button>查看账单</el-button>
              </template>
            </ele-result>
          </div>
        </div>
        <div v-if="active===0">
          <div style="margin: 35px 0 25px 0;">
            <el-divider/>
          </div>
          <el-alert type="info" :closable="false" class="ele-alert-border">
            <h6 style="margin: 5px 0 15px 0;">说明</h6>
            <h6 style="margin-bottom: 10px;">转账到支付宝</h6>
            <p style="margin-bottom: 15px;">
              如果需要，这里可以放一些关于产品的常见问题说明。如果需要，
              这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
            </p>
            <h6 style="margin-bottom: 10px;">转账到微信</h6>
            <p style="margin-bottom: 15px;">
              如果需要，这里可以放一些关于产品的常见问题说明。如果需要，
              这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
            </p>
          </el-alert>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormStep',
  data() {
    return {
      // 步骤条选中索引
      active: 0,
      // 步骤一表单数据
      form1: {
        account: 'eleadmin@eclouds.com',
        receiver: 'test@example.com',
        pay: 'alipay',
        name: 'Alex',
        amount: 500
      },
      // 步骤一表单验证规则
      rules1: {
        account: [
          { required: true, message: '请选择付款账户', trigger: 'blur' }
        ],
        receiver: [
          { required: true, message: '请输入收款账户', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入收款人姓名', trigger: 'blur' }
        ],
        amount: [
          { required: true, message: '请输入转账金额', trigger: 'blur' }
        ]
      },
      // 步骤一表单提交状态
      loading1: false,
      // 步骤二表单数据
      form2: {
        password: '123456'
      },
      // 步骤二表单验证规则
      rules2: {
        password: [
          { required: true, message: '请输入支付密码', trigger: 'blur' }
        ]
      },
      // 步骤二表单提交状态
      loading2: false
    }
  },
  methods: {
    // 步骤一表单提交
    submit1() {
      this.$refs['form1'].validate((valid) => {
        if (valid) {
          this.loading1 = true
          setTimeout(() => {
            this.loading1 = false
            this.active = 1
          }, 300)
        } else {
          return false
        }
      })
    },
    // 步骤二表单提交
    submit2() {
      this.$refs['form2'].validate((valid) => {
        if (valid) {
          this.loading2 = true
          setTimeout(() => {
            this.loading2 = false
            this.active = 2
          }, 300)
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.input-with-select ::v-deep .el-select .el-input {
  width: 100px;
}
</style>
