<template>
  <el-card shadow="never" header="省市区级联选择">
    <div style="margin-bottom: 15px;">
      <span>请选择省市区：</span>
      <el-cascader
        v-model="city"
        :options="regions.cityData"
        clearable
        popper-class="ele-pop-wrap-higher"/>
    </div>
    <div style="margin-bottom: 15px;">
      <span><em/>请选择省市：</span>
      <el-cascader
        v-model="provinceCity"
        :options="regions.provinceCityData"
        clearable
        popper-class="ele-pop-wrap-higher"/>
    </div>
    <div>
      <span><em/><em/>请选择省：</span>
      <el-cascader
        v-model="province"
        :options="regions.provinceData"
        clearable
        popper-class="ele-pop-wrap-higher"/>
    </div>
  </el-card>
</template>

<script>
import regions from 'ele-admin/packages/regions'

export default {
  name: 'DemoCitySelect',
  data() {
    return {
      // 省市区数据
      regions: regions,
      // 选中的省市区
      city: [],
      // 选中的省市
      provinceCity: [],
      // 选中的省
      province: []
    }
  }
}
</script>

<style scoped>
</style>
