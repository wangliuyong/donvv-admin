<template>
  <div class="ele-body">
    <el-card shadow="never">
      <!-- 操作按钮 -->
      <div class="ele-table-tool">
        <el-button
          @click="showViewContent=true"
          size="small">获取html
        </el-button>
        <el-button
          @click="showViewText=true"
          size="small">获取文本
        </el-button>
        <el-button
          @click="editContent"
          size="small">修改内容
        </el-button>
        <el-button
          @click="showDialog=true"
          size="small">弹窗打开
        </el-button>
      </div>
      <!-- 编辑器 -->
      <tinymce-editor
        v-model="value1"
        :init="option1"/>
    </el-card>
    <!-- 内容弹窗 -->
    <el-dialog
      title="编辑器内容"
      :visible.sync="showViewContent"
      width="400px">
      <div>{{ value1 }}</div>
    </el-dialog>
    <!-- 纯文本弹窗 -->
    <el-dialog
      title="编辑器纯文本"
      :visible.sync="showViewText"
      width="400px">
      <div>{{ value1 | htmlToText }}</div>
    </el-dialog>
    <!-- 编辑器弹窗 -->
    <el-dialog
      title="弹窗中使用"
      :visible.sync="showDialog"
      width="671px">
      <tinymce-editor
        v-model="value2"
        :init="option2"/>
    </el-dialog>
  </div>
</template>

<script>
import TinymceEditor from '@/components/TinymceEditor'

export default {
  name: 'ExtensionEditor',
  components: { TinymceEditor },
  data() {
    // 自定义文件上传(这里使用把选择的文件转成blob演示)
    const file_picker_callback = (callback, value, meta) => {
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      // 设定文件可选类型
      if (meta.filetype === 'image') {
        input.setAttribute('accept', 'image/*')
      } else if (meta.filetype === 'media') {
        input.setAttribute('accept', 'video/*')
      }
      input.onchange = () => {
        const file = input.files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
          const blob = new Blob([e.target.result], { type: file.type })
          callback(URL.createObjectURL(blob))
        }
        reader.readAsArrayBuffer(file)
      }
      input.click()
    }
    return {
      option1: {
        height: 520,
        file_picker_callback: file_picker_callback
      },
      option2: {
        height: 380,
        menubar: false,
        file_picker_callback: file_picker_callback
      },
      value1: '',
      value2: '',
      showViewContent: false,
      showViewText: false,
      showDialog: false

    }
  },
  methods: {
    /* 修改编辑器内容 */
    editContent() {
      this.value1 = [
        '<div style="text-align: center;color: #fff;background-image: linear-gradient(to right,#009688,#5fb878);padding: 20px;">',
        '   <div style="font-size: 28px;margin-bottom: 10px;">EASY WEB 后台管理模板</div>',
        '   <div style="font-size: 18px">基于Layui的一套通用型后台管理模板，拥有众多原创组件及模板页面</div>',
        '</div><br/>'
      ].join('')
    }
  }
}
</script>

<style scoped>
</style>
