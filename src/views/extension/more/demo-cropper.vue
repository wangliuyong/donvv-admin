<template>
  <el-card shadow="never" header="裁剪图片">
    <el-button
      @click="(aspectRatio=1)&&(showCropper=true)">1:1裁剪
    </el-button>
    <el-button
      @click="(aspectRatio=16/9)&&(showCropper=true)">16:9裁剪
    </el-button>
    <div>
      <img
        v-if="cropResult"
        :src="cropResult"
        style="height: 120px;width: auto;margin-top: 15px;"/>
    </div>
    <ele-cropper-dialog
      :show.sync="showCropper"
      @crop="onCrop"
      :aspectRatio="aspectRatio"
      :destroy-on-close="true"
      src="https://cdn.eleadmin.com/20200610/LrCTN2j94lo9N7wEql7cBr1Ux4rHMvmZ.jpg"
      :lock-scroll="false"/>
  </el-card>
</template>

<script>
import EleCropperDialog from 'ele-admin/packages/ele-cropper-dialog'

export default {
  name: 'DemoCropper',
  components: { EleCropperDialog },
  data() {
    return {
      // 是否显示图片裁剪
      showCropper: false,
      // 裁剪比例
      aspectRatio: 1,
      // 裁剪后的数据
      cropResult: null
    }
  },
  methods: {
    /* 图片裁剪完成事件 */
    onCrop(data) {
      this.cropResult = data
      this.showCropper = false
    }
  }
}
</script>

<style scoped>
</style>
