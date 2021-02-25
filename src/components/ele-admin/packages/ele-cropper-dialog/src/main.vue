<!-- 图片裁剪弹窗 license by http://eleadmin.com -->
<template>
  <el-dialog
    :visible="show"
    :title="title"
    :width="width"
    :custom-class="customClass"
    :show-close="showClose"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    :destroy-on-close="destroyOnClose"
    :lock-scroll="lockScroll"
    :append-to-body="appendToBody"
    :modal-append-to-body="modalAppendToBody"
    :modal="modal"
    :top="top"
    @update:visible="updateVisible"
    @open="onOpen"
    @closed="onClosed">
    <template slot="title">
      <slot name="title"/>
    </template>
    <ele-cropper
      v-if="showCropper"
      :src="src"
      :aspect-ratio="aspectRatio"
      :view-mode="viewMode"
      :accept="accept"
      :drag-mode="dragMode"
      :initial-aspect-ratio="initialAspectRatio"
      :min-container-width="minContainerWidth"
      :min-container-height="minContainerHeight"
      :min-canvas-width="minCanvasWidth"
      :min-canvas-height="minCanvasHeight"
      :min-crop-box-width="minCropBoxWidth"
      :min-crop-box-height="minCropBoxHeight"
      :cropped-width="croppedWidth"
      :cropped-height="croppedHeight"
      :cropped-min-width="croppedMinWidth"
      :cropped-min-height="croppedMinHeight"
      :cropped-max-width="croppedMaxWidth"
      :cropped-max-height="croppedMaxHeight"
      :cropped-fill-color="croppedFillColor"
      :to-blob="toBlob"
      :image-smoothing-enabled="imageSmoothingEnabled"
      :image-smoothing-quality="imageSmoothingQuality"
      :tools="tools"
      :show-preview="showPreview"
      @crop="onCrop"/>
    <template slot="footer">
      <slot/>
    </template>
  </el-dialog>
</template>

<script>
import EleCropper from '../../ele-cropper';

export default {
  name: 'EleCropperDialog',
  components: {
    EleCropper
  },
  emits: ['crop', 'open', 'closed', 'update:show'],
  props: {
    // 裁剪的图片地址
    src: String,
    // 裁剪比例
    aspectRatio: {
      type: Number,
      default: 1
    },
    // 裁剪组件模式
    viewMode: Number,
    dragMode: String,
    initialAspectRatio: Number,
    minContainerWidth: Number,
    minContainerHeight: Number,
    minCanvasWidth: Number,
    minCanvasHeight: Number,
    minCropBoxWidth: Number,
    minCropBoxHeight: Number,
    croppedWidth: Number,
    croppedHeight: Number,
    croppedMinWidth: Number,
    croppedMinHeight: Number,
    croppedMaxWidth: Number,
    croppedMaxHeight: Number,
    croppedFillColor: Number,
    imageSmoothingEnabled: Boolean,
    imageSmoothingQuality: String,
    // 是否返回blob数据
    toBlob: Boolean,
    // 允许上传的图片类型
    accept: {
      type: String,
      default: 'image/*'
    },
    // 操作按钮布局
    tools: {
      type: [Boolean, String],
      default: true
    },
    // 是否显示预览组件
    showPreview: {
      type: Boolean,
      default: true
    },
    // 弹窗的标题
    title: {
      type: String,
      default: '裁剪图片'
    },
    // 弹窗的宽度
    width: {
      type: String,
      default: '680px'
    },
    // Dialog 的自定义类名
    customClass: String,
    // 是否可以通过点击 modal 关闭 Dialog
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    // 是否可以通过按下 ESC 关闭 Dialog
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    // 是否显示关闭按钮
    showClose: {
      type: Boolean,
      default: true
    },
    // 是否在 Dialog 出现时将 body 滚动锁定
    lockScroll: {
      type: Boolean,
      default: true
    },
    // Dialog 自身是否插入至 body 元素上
    appendToBody: Boolean,
    // 遮罩层是否插入至 body 元素上
    modalAppendToBody: {
      type: Boolean,
      default: true
    },
    // 是否需要遮罩层
    modal: {
      type: Boolean,
      default: true
    },
    // Dialog CSS 中的 margin-top 值
    top: String,
    // 关闭时销毁 Dialog 中的元素
    destroyOnClose: {
      type: Boolean,
      default: false
    },
    // 是否显示, 支持.sync修饰
    show: Boolean
  },
  data() {
    return {
      showCropper: false
    };
  },
  methods: {
    /* 弹窗打开回调 */
    onOpen() {
      this.showCropper = true;
      this.$emit('open');
    },
    /* 弹窗关闭回调 */
    onClosed() {
      if (this.destroyOnClose) {
        this.showCropper = false;
      }
      this.$emit('closed');
    },
    /* 裁剪完成回调 */
    onCrop(data) {
      this.$emit('crop', data);
    },
    /* 更新show参数 */
    updateVisible(value) {
      this.$emit('update:show', value);
    }
  }
}
</script>
