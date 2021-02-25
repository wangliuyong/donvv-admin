<!-- echarts 词云组件封装 license by http://eleadmin.com -->
<template>
  <ele-chart :option="options" :click="onClick"/>
</template>

<script>
import 'echarts-wordcloud';
import EleChart from '../../ele-chart';

export default {
  name: 'EleWordCloud',
  components: {EleChart},
  emits: ['click'],
  props: {
    // 词云数据
    data: Array
  },
  data() {
    return {
      // 词云文字颜色
      colors: [
        'rgb(24,144,255)',
        'rgb(102,181,255)',
        'rgb(65, 217, 199)',
        'rgb(47, 194, 91)',
        'rgb(110, 219, 143)',
        'rgb(154, 230, 92)',
        'rgb(250, 204, 20)',
        'rgb(230, 150, 92)',
        'rgb(87, 173, 113)',
        'rgb(34, 50, 115)',
        'rgb(115, 138, 230)',
        'rgb(117, 100, 204)',
        'rgb(133, 67, 224)',
        'rgb(168, 119, 237)',
        'rgb(92, 142, 230)',
        'rgb(19, 194, 194)',
        'rgb(112, 224, 224)',
        'rgb(92, 163, 230)',
        'rgb(52, 54, 199)',
        'rgb(128, 130, 255)',
        'rgb(221, 129, 230)',
        'rgb(240, 72, 100)',
        'rgb(250, 125, 146)',
        'rgb(213, 152, 217)'
      ]
    };
  },
  computed: {
    // echarts配置
    options() {
      return {
        tooltip: {
          show: true
        },
        series: [
          {
            type: 'wordCloud',
            width: '100%',
            height: '100%',
            sizeRange: [12, 24],
            gridSize: 6,
            textStyle: {
              normal: {
                color: () => {
                  return this.randomColor();
                }
              },
              emphasis: {
                shadowBlur: 8,
                shadowColor: 'rgba(0,0,0,.15)'
              }
            },
            data: this.data
          }
        ]
      };
    }
  },
  methods: {
    /* 取随机颜色 */
    randomColor() {
      return this.colors[this.random(0, this.colors.length)];
    },
    /* 取随机数 */
    random(m, n) {
      return Math.floor(Math.random() * (m - n) + n);
    },
    /* 图表渲染完成回调 */
    onClick(e) {
      this.$emit('click', e.data);
    }
  }
}
</script>
