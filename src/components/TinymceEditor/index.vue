<!-- tinymce富文本编辑器组件 License By http://eleadmin.com -->
<template>
  <editor
    :init="config"
    :disabled="disabled"
    :value="value"
    @input="updateValue"/>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/icons/default'
import 'tinymce/themes/silver'
import 'tinymce/plugins/code'
import 'tinymce/plugins/print'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/save'
import 'tinymce/plugins/autosave'
import 'tinymce/plugins/link'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/image'
import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/media'
import 'tinymce/plugins/table'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/emoticons'
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/directionality'
import 'tinymce/plugins/pagebreak'
import 'tinymce/plugins/quickbars'
import 'tinymce/plugins/nonbreaking'
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/visualchars'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/emoticons/js/emojis'
import Editor from '@tinymce/tinymce-vue'
// 默认配置
const defaultConfig = {
  height: 300,
  branding: false,
  skin_url: '/tinymce/skins/ui/oxide',
  content_css: '/tinymce/skins/content/default/content.css',
  language_url: '/tinymce/langs/zh_CN.js',
  language: 'zh_CN',
  plugins: [
    'code',
    'print',
    'preview',
    'fullscreen',
    'paste',
    'searchreplace',
    'save',
    'autosave',
    'link',
    'autolink',
    'image',
    'imagetools',
    'media',
    'table',
    'codesample',
    'lists',
    'advlist',
    'hr',
    'charmap',
    'emoticons',
    'anchor',
    'directionality',
    'pagebreak',
    'quickbars',
    'nonbreaking',
    'visualblocks',
    'visualchars',
    'wordcount'
  ].join(' '),
  toolbar: [
    'fullscreen',
    'preview',
    'code',
    '|',
    'undo',
    'redo',
    '|',
    'forecolor',
    'backcolor',
    '|',
    'bold',
    'italic',
    'underline',
    'strikethrough',
    '|',
    'alignleft',
    'aligncenter',
    'alignright',
    'alignjustify',
    '|',
    'outdent',
    'indent',
    '|',
    'numlist',
    'bullist',
    '|',
    'formatselect',
    'fontselect',
    'fontsizeselect',
    '|',
    'link',
    'image',
    'media',
    'emoticons',
    'charmap',
    'anchor',
    'pagebreak',
    'codesample',
    '|',
    'ltr',
    'rtl'
  ].join(' '),
  toolbar_drawer: 'sliding',
  images_upload_handler: (blobInfo, success) => {
    success('data:image/jpeg;base64,' + blobInfo.base64());
  },
  file_picker_types: 'media',
  file_picker_callback: () => {
  }
};

export default {
  name: 'TinymceEditor',
  components: {Editor},
  props: {
    // 值
    value: String,
    // 编辑器配置
    init: Object,
    // 是否禁用
    disabled: Boolean
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  computed: {
    config() {
      return Object.assign(defaultConfig, this.init);
    }
  },
  mounted() {
    tinymce.init({});
  },
  methods: {
    updateValue(value) {
      this.$emit('change', value);
    }
  }
}
</script>

<style>
body .tox-tinymce-aux {
  z-index: 19892000;
}
</style>
