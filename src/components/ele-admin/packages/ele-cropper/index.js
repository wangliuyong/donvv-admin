/** 图片裁剪组件 license by http://eleadmin.com */
import EleCropper from './src/main';

EleCropper.install = function (Vue) {
  Vue.component(EleCropper.name, EleCropper);
};

export default EleCropper;
