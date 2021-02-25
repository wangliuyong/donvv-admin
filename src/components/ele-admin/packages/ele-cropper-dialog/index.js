/** 图片裁剪弹窗 license by http://eleadmin.com */
import EleCropperDialog from './src/main';

EleCropperDialog.install = function (Vue) {
  Vue.component(EleCropperDialog.name, EleCropperDialog);
};

export default EleCropperDialog;
