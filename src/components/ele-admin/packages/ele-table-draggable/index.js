/** 拖拽排序表格 license by http://eleadmin.com */
import ElTableDraggable from './src/main';

ElTableDraggable.install = function (Vue) {
  Vue.component(ElTableDraggable.name, ElTableDraggable);
};

export default ElTableDraggable;
