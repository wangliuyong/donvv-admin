<template>
  <div class="ele-body">
    <!-- 地图位置选择弹窗 -->
    <ele-map-picker
      :show.sync="showMapPicker"
      :need-city="true"
      @done="onChoose"
      :lock-scroll="false"/>
    <ele-map-picker
      :show.sync="showMapPicker2"
      :need-city="true"
      @done="onChoose"
      :search-type="1"
      :lock-scroll="false"/>
    <el-card
      shadow="never"
      header="弹窗选择位置">
      <el-tooltip
        content="POI检索模式"
        placement="top">
        <el-button
          @click="showMapPicker=true"
          size="small"
          class="ele-btn-icon"
          icon="el-icon-location-information">
          <span>地图选择位置 </span>
          <i class="el-icon-right"/>
        </el-button>
      </el-tooltip>
      <el-button
        @click="showMapPicker2=true"
        size="small"
        class="ele-btn-icon"
        icon="el-icon-location-information">
        <span>关键字检索模式 </span>
        <i class="el-icon-right"/>
      </el-button>
      <div style="margin-top: 10px;">收货地址: {{ form.location }}</div>
      <div style="margin-top: 10px;">详细地址: {{ form.address }}</div>
      <div style="margin-top: 10px;">经 纬 度 : {{ form.jinweidu }}</div>
    </el-card>
    <el-card
      shadow="never"
      header="官网底部地图">
      <div
        ref="locationMap"
        style="max-width: 800px;height: 300px;">
      </div>
    </el-card>
    <el-card
      shadow="never"
      header="轨迹展示及轨迹回放">
      <div
        ref="trackMap"
        style="max-width: 800px;height: 300px;">
      </div>
      <div style="margin-top: 15px;">
        <el-button
          @click="startTrackAnim"
          size="small">开始动画
        </el-button>
        <el-button
          @click="pauseTrackAnim"
          size="small">暂停动画
        </el-button>
        <el-button
          @click="resumeTrackAnim"
          size="small">继续动画
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';
import EleMapPicker from 'ele-admin/packages/ele-map-picker';

export default {
  name: 'ExtensionMap',
  components: {EleMapPicker},
  data() {
    return {
      // 表单数据
      form: {},
      // 是否显示地图选择弹窗
      showMapPicker: false,
      showMapPicker2: false,
      // 小车的marker
      carMarker: null,
      // 轨迹路线
      lineData: [
        [116.478935, 39.997761],
        [116.478939, 39.997825],
        [116.478912, 39.998549],
        [116.478912, 39.998549],
        [116.478998, 39.998555],
        [116.478998, 39.998555],
        [116.479282, 39.99856],
        [116.479658, 39.998528],
        [116.480151, 39.998453],
        [116.480784, 39.998302],
        [116.480784, 39.998302],
        [116.481149, 39.998184],
        [116.481573, 39.997997],
        [116.481863, 39.997846],
        [116.482072, 39.997718],
        [116.482362, 39.997718],
        [116.483633, 39.998935],
        [116.48367, 39.998968],
        [116.484648, 39.999861]
      ]
    }
  },
  mounted() {
    this.renderLocationMap();
    this.renderTrackMap();
  },
  methods: {
    /* 地图选择后回调 */
    onChoose(location) {
      this.showMapPicker = false;
      this.showMapPicker2 = false;
      this.form.address = location.name + ' ' + location.address;
      this.form.jinweidu = [location.lng, location.lat].join(',');
      this.form.location = location.city.province + '/' + location.city.city + '/' + location.city.district;
      console.log(location);
    },
    /* 渲染官网底部地图 */
    renderLocationMap() {
      AMapLoader.load({
        'key': '006d995d433058322319fa797f2876f5',
        'version': '2.0',
        'plugins': ['AMap.InfoWindow', 'AMap.Marker']
      }).then((AMap) => {
        // 渲染地图
        let map = new AMap.Map(this.$refs.locationMap, {
          // 初缩放级别
          zoom: 13,
          // 初始中心点
          center: [114.346084, 30.511215 + 0.005]
        });
        // 创建信息窗体
        let infoWindow = new AMap.InfoWindow({
          content: `
            <div style="color: #333;">
                <div style="padding: 5px;font-size: 16px;">武汉易云智科技有限公司</div>
                <div style="padding: 0 5px;">地址：湖北省武汉市洪山区雄楚大道222号</div>
                <div style="padding: 0 5px;">电话：020-123456789</div>
                <a style="padding: 8px 5px 0;text-decoration: none;display: inline-block;"
                    class="ele-text-primary"
                    href="//uri.amap.com/marker?position=114.346084,30.511215&name=武汉易云智科技有限公司"
                    target="_blank">到这里去<i class="el-icon-right"></i>
                </a>
            </div>
          `
        });
        infoWindow.open(map, [114.346084, 30.511215]);
        let icon = new AMap.Icon({
          size: new AMap.Size(25, 34),
          image: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png',
          imageSize: new AMap.Size(25, 34)
        });
        let marker = new AMap.Marker({
          icon: icon,
          position: [114.346084, 30.511215],
          offset: new AMap.Pixel(-12, -28)
        });
        marker.setMap(map);
        marker.on('click', () => {
          infoWindow.open(map);
        });
      }).catch(e => {
        console.error(e);
      });
    },
    /* 渲染轨迹回放地图 */
    renderTrackMap() {
      AMapLoader.load({
        'key': '006d995d433058322319fa797f2876f5',
        'version': '2.0',
        'plugins': ['AMap.MoveAnimation', 'AMap.Marker', 'AMap.Polyline']
      }).then((AMap) => {
        // 渲染地图
        let map = new AMap.Map(this.$refs.trackMap, {
          zoom: 17,
          center: [116.478935, 39.997761],
        });

        // 创建小车marker
        this.carMarker = new AMap.Marker({
          map: map,
          position: [116.478935, 39.997761],
          icon: 'https://a.amap.com/jsapi_demos/static/demo-center-v2/car.png',
          offset: new AMap.Pixel(-13, -26),
        });

        // 绘制轨迹
        new AMap.Polyline({
          map: map,
          path: this.lineData,
          showDir: true,
          strokeColor: '#28F',  // 线颜色
          strokeOpacity: 1,     // 线透明度
          strokeWeight: 6,      // 线宽
          // strokeStyle: 'solid'  // 线样式
        });

        // 通过的轨迹
        let passedPolyline = new AMap.Polyline({
          map: map,
          showDir: true,
          strokeColor: '#4B5',  // 线颜色
          strokeOpacity: 1,     // 线透明度
          strokeWeight: 6,      // 线宽
        });

        // 小车移动回调
        this.carMarker.on('moving', function (e) {
          passedPolyline.setPath(e.passedPath);
        });

        // 地图自适应
        map.setFitView();
      }).catch(e => {
        console.error(e);
      });
    },
    /* 开始轨迹回放动画 */
    startTrackAnim() {
      this.carMarker.stopMove();
      this.carMarker.moveAlong(this.lineData, {
        duration: 200,
        autoRotation: true,
      });
    },
    /* 暂停轨迹回放动画 */
    pauseTrackAnim() {
      this.carMarker.pauseMove();
    },
    /* 继续开始轨迹回放动画 */
    resumeTrackAnim() {
      this.carMarker.resumeMove();
    }
  }
}
</script>

<style scoped>
</style>
