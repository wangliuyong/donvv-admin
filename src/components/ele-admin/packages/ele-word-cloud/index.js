/** echarts 词云组件封装 license by http://eleadmin.com */
import EleWordCloud from './src/main';

EleWordCloud.install = function (Vue) {
  Vue.component(EleWordCloud.name, EleWordCloud);
};

export default EleWordCloud;
