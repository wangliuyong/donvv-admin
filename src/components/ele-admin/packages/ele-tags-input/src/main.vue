<!-- 标签输入框组件 license by http://eleadmin.com -->
<template>
  <div class="ele-tags-input">
    <el-tag
      v-for="(text,index) in data"
      :key="index"
      :size="size"
      :effect="effect"
      :disable-transitions="true"
      :type="type"
      @close="remove(index)"
      closable>
      {{ text }}
    </el-tag>
    <el-input
      v-if="edit"
      ref="input"
      v-model="value"
      :size="size"
      @keyup.enter.native="save"
      @blur="save"
      :style="btnStyle"/>
    <el-button
      v-else
      :size="size"
      @click="showEdit"
      :style="btnStyle">
      {{ placeholder }}
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'EleTagsInput',
  model: {
    prop: 'data',
    event: 'change'
  },
  props: {
    // 标签数据, v-model绑定
    data: Array,
    // 标签类型
    type: String,
    // 标签尺寸
    size: String,
    // 标签主题
    effect: String,
    // 输入框提示文字
    placeholder: {
      type: String,
      default: '+ New Tag'
    },
    // 输入框宽度
    width: {
      type: String,
      default: '90px'
    },
    // 是否唯一
    unique: {
      type: Boolean,
      default: true
    },
    // 自定义验证
    validator: [Function, Array],
    // 删除前回调
    beforeRemove: Function
  },
  data() {
    return {
      // 是否编辑状态
      edit: false,
      // 输入框值
      value: ''
    };
  },
  computed: {
    // 输入框样式
    btnStyle() {
      return {
        width: this.width
      };
    }
  },
  methods: {
    /* 编辑状态 */
    showEdit() {
      this.edit = true;
      this.$nextTick(() => {
        this.$refs.input.$refs.input.focus();
      });
    },
    /* 保存编辑 */
    save() {
      if (this.value) {
        if (this.unique && this.data.indexOf(this.value) !== -1) {
          this.$message.error(this.value + ' 已经存在');
          return;
        }
        if (this.validator) {
          if (typeof this.validator === 'function') {
            if (this.validator(this.value) === false) {
              return;
            }
          } else if (!new RegExp(this.validator[0]).test(this.value)) {
            this.$message.error(this.validator[1]);
            return;
          }
        }
        this.$emit('change', this.data.concat([this.value]));
      }
      this.edit = false;
      this.value = '';
    },
    /* 删除 */
    remove(index) {
      if (this.beforeRemove && this.beforeRemove(index) === false) {
        return;
      }
      let data = this.data.slice(0, index).concat(this.data.slice(index + 1, this.data.length));
      this.$emit('change', data);
    }
  }
}
</script>

<style>
.ele-tags-input {
  margin-bottom: -10px;
}

.ele-tags-input .el-tag {
  margin: 0 10px 10px 0;
}

.ele-tags-input .el-button,
.ele-tags-input .el-input {
  overflow: hidden;
  vertical-align: middle;
}

.ele-tags-input .el-button--mini {
  padding: 3px 5px;
}

.ele-tags-input .el-input--mini .el-input__inner {
  height: 20px;
  line-height: 1;
  padding: 0 5px;
}

.ele-tags-input .el-button--small {
  padding: 5px 8px;
}

.ele-tags-input .el-input--small .el-input__inner {
  height: 24px;
  line-height: 1;
  padding: 0 8px;
  font-size: 12px;
}

.ele-tags-input .el-button--medium {
  padding: 7px 10px;
  font-size: 12px;
}

.ele-tags-input .el-input--medium .el-input__inner {
  height: 28px;
  line-height: 1;
  padding: 0 10px;
  font-size: 12px;
}

.ele-tags-input .el-button--large {
  padding: 9px 10px;
  font-size: 12px;
}

.ele-tags-input .el-input--large .el-input__inner {
  height: 32px;
  line-height: 1;
  padding: 0 10px;
  font-size: 12px;
}
</style>
