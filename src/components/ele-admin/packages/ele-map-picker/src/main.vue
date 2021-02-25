<!-- 地图位置选择器组件 license by http://eleadmin.com -->
<template>
  <el-dialog
    :visible="show"
    :title="title"
    :width="width"
    :custom-class="dialogClass"
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
    <div v-if="showMap" v-loading="loading">
      <div class="ele-map-picker-header">
        <div class="ele-map-picker-header-search">
          <el-autocomplete
            v-model="suggestionKeyWord"
            :fetch-suggestions="searchSuggestions"
            @blur="onSuggestionBlur"
            :placeholder="searchPlaceholder"
            :popper-class="searchPopClass"
            @select="onSuggestionChoose">
            <i class="el-icon-search el-input__icon" slot="suffix"></i>
            <template slot-scope="{item}">
              <div class="ele-map-picker-poi-item ele-map-picker-suggestion-item">
                <i class="ele-map-picker-poi-item-icon el-icon-search"></i>
                <div class="ele-map-picker-poi-item-title">{{ item.name }}</div>
                <div v-if="item.address" class="ele-map-picker-poi-item-address">{{ item.address }}</div>
              </div>
            </template>
          </el-autocomplete>
        </div>
        <el-button
          :loading="doneLoading"
          type="primary"
          @click="done"
          icon="el-icon-check"
          class="ele-btn-icon">确定
        </el-button>
      </div>
      <div class="ele-map-picker-body">
        <div class="ele-map-picker-main">
          <div ref="eleMapPickerMap" :style="mapStyle"></div>
          <i :class="['ele-map-picker-main-plus el-icon-plus',{'ele-map-picker-hide':searchType!==0}]"></i>
          <img :class="iconClass" :src="markerSrc" alt=""/>
        </div>
        <div class="ele-map-picker-poi-list" :style="mapStyle" v-loading="poiLoading">
          <div
            v-for="(poi,index) in poiData"
            :key="index"
            @click="choose(index)"
            :class="['ele-map-picker-poi-item',{'ele-map-picker-poi-item-active':index===chooseIndex}]">
            <i class="ele-map-picker-poi-item-icon el-icon-location-outline"></i>
            <div class="ele-map-picker-poi-item-title">{{ poi.name }}</div>
            <div v-if="poi.address" class="ele-map-picker-poi-item-address">{{ poi.address }}</div>
            <i class="el-icon-circle-check ele-map-picker-poi-item-check"></i>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';

export default {
  name: 'EleMapPicker',
  emits: [
    'done',
    'open',
    'closed',
    'update:show'
  ],
  props: {
    // 地图的高度
    height: {
      type: String,
      default: '450px'
    },
    // 地图默认中心点
    center: Array,
    // 地图初始缩放级别
    zoom: {
      type: Number,
      default: 11
    },
    // 地图选中后缩放级别
    chooseZoom: {
      type: Number,
      default: 17
    },
    // poi检索每页数量
    poiSize: {
      type: Number,
      default: 30
    },
    // poi检索兴趣点类别
    poiType: {
      type: String,
      default: ''
    },
    // poi检索关键字
    poiKeywords: {
      type: String,
      default: ''
    },
    // poi检索半径
    poiRadius: {
      type: Number,
      default: 1000
    },
    // 是否返回行政区
    needCity: Boolean,
    // 是否强制选择
    forceChoose: {
      type: Boolean,
      default: true
    },
    // 搜索建议的城市范围
    suggestionCity: {
      type: String,
      default: '全国'
    },
    // 地点检索类型,0:POI检索,1:关键字检索
    searchType: {
      type: Number,
      default: 0
    },
    // 搜索建议框提示文字
    searchPlaceholder: {
      type: String,
      default: '输入关键字搜索'
    },
    // marker图标地址
    markerSrc: {
      type: String,
      default: 'https://3gimg.qq.com/lightmap/components/locationPicker2/image/marker.png'
    },
    // 地图默认的key
    mapKey: {
      type: String,
      default: '006d995d433058322319fa797f2876f5'
    },
    // 地图默认版本号
    mapVersion: {
      type: String,
      default: '2.0'
    },
    // 弹窗的标题
    title: {
      type: String,
      default: '选择位置'
    },
    // 弹窗的宽度
    width: {
      type: String,
      default: '780px'
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
      // 是否显示地图
      showMap: false,
      // 地图实例
      map: null,
      // 地图中心标记点
      centerMarker: null,
      // poi检索实例
      placeSearch: null,
      // 输入建议实例
      autoComplete: null,
      // poi检索的数据
      poiData: [],
      // 选中的数据
      chooseIndex: null,
      // 是否是点击poi列表移动地图
      isSelMove: false,
      // 图标是否显示跳动动画
      showIconAnim: false,
      // 搜索输入内容
      suggestionKeyWord: '',
      // 上次搜索输入内容
      lastSuggestion: '',
      // 搜索建议列表
      suggestionData: [],
      // 选中的建议
      chooseSuggestion: null,
      // 初始化loading
      loading: true,
      // poi检索loading
      poiLoading: false,
      // 确定按钮loading
      doneLoading: false
    };
  },
  computed: {
    // 地图的样式
    mapStyle() {
      return {'height': this.height}
    },
    // 弹窗的class
    dialogClass() {
      return ['ele-map-picker-dialog', this.customClass || ''].join(' ');
    },
    // 跳动图标的class
    iconClass() {
      return [
        'ele-map-picker-main-icon',
        {'ele-map-picker-anim-bounce': this.showIconAnim},
        {'ele-map-picker-hide': this.searchType !== 0}
      ];
    },
    // 搜索建议pop的class
    searchPopClass() {
      return ['ele-map-picker-search-pop', this.searchType !== 0 ? 'ele-map-picker-hide' : ''].join(' ');
    },
    // 是否是暗黑模式
    darkMode() {
      try {
        return this.$store.state.theme.darkMode;
      } catch (e) {
        return null;
      }
    }
  },
  methods: {
    /* 渲染地图 */
    render() {
      AMapLoader.load({
        'key': this.mapKey,
        'version': this.mapVersion,
        'plugins': ['AMap.PlaceSearch', 'AMap.AutoComplete']
      }).then((AMap) => {
        this.loading = false;
        this.poiLoading = true;
        // 渲染地图
        let option = {
          resizeEnable: true, // 监控地图容器尺寸变化
          zoom: this.zoom,  // 初缩放级别
          center: this.center  // 初始中心点
        };
        if (this.darkMode) {
          option.mapStyle = 'amap://styles/dark';
        }
        this.map = new AMap.Map(this.$refs.eleMapPickerMap, option);
        // 获取poi检索实例
        this.placeSearch = new AMap.PlaceSearch({
          type: this.poiType, pageSize: this.poiSize, pageIndex: 1
        });
        // 获取输入建议实例
        this.autoComplete = new AMap.AutoComplete({city: this.suggestionCity});
        // 地图加载完成事件
        this.map.on('complete', () => {
          this.chooseIndex = null;
          let center = this.map.getCenter();
          this.searchNearBy(center.lat, center.lng, true);
        });
        // 地图移动结束事件
        this.map.on('moveend', () => {
          if (this.isSelMove) {  // poi列表点击的移动
            this.isSelMove = false;
          } else {  // 拖动或搜索建议的移动
            this.showIconAnim = false;
            this.$nextTick(() => {
              setTimeout(() => {
                this.showIconAnim = true;
              }, 0);
            });
            let center = this.map.getCenter();
            this.searchNearBy(center.lat, center.lng);
          }
        });
        // 地图中心marker
        this.centerMarker = new AMap.Marker({
          icon: new AMap.Icon({
            image: this.markerSrc, size: new AMap.Size(26, 36.5), imageSize: new AMap.Size(26, 36.5)
          }),
          offset: new AMap.Pixel(-13, -36.5)
        });
      }).catch(e => {
        this.loading = false;
        console.error(e);
      });
    },
    /* poi检索 */
    searchNearBy(lat, lng, force) {
      if (!force && this.searchType !== 0) {
        // 非POI检索模式
        this.poiLoading = false;
        return;
      }
      if (!this.placeSearch) {
        return;
      }
      this.poiLoading = true;
      this.placeSearch.searchNearBy(this.poiKeywords, [lng, lat], this.poiRadius, (status, result) => {
        this.poiLoading = false;
        if (status === 'complete') {
          let data = result.poiList.pois.filter(p => p.location !== undefined);
          if (this.chooseSuggestion) {  // 如果选中的搜索建议不在poi列表中则添加
            if (data.length === 0 || data[0].name !== this.chooseSuggestion.name) {
              data.unshift(Object.assign({}, this.chooseSuggestion));
            }
            this.chooseSuggestion = null;
          } else {
            this.chooseIndex = null;
          }
          this.poiData = data;
        }
      });
    },
    /* poi列表选中 */
    choose(index) {
      this.chooseIndex = index;
      this.isSelMove = true;
      this.showIconAnim = false;
      this.$nextTick(() => {
        setTimeout(() => {
          this.showIconAnim = true;
        }, 0);
      });
      let point = this.poiData[index].location;
      this.map.setZoomAndCenter(this.chooseZoom, [point.lng, point.lat]);
      // 添加标记点
      if (this.searchType !== 0) {  // 非poi检索类型给地图添加中心标记点
        this.centerMarker.setPosition([point.lng, point.lat]);
        this.map.add(this.centerMarker);
      }
    },
    /* 搜索建议 */
    searchSuggestions(keywords, callback) {
      if (!this.autoComplete || !keywords || this.lastSuggestion === keywords) {
        return callback(this.suggestionData);
      }
      if (this.searchType !== 0) {
        this.poiLoading = true;
      }
      this.lastSuggestion = keywords;
      this.autoComplete.search(keywords, (status, result) => {
        if (this.searchType === 0) {  // POI检索模式
          if (result.tips) {
            result.tips.forEach(d => {
              d.value = '';
              if (Array.isArray(d.address)) {
                d.address = d.address[0];
              }
            });
            this.suggestionData = result.tips;
          } else {
            this.suggestionData = [];
          }
          callback(this.suggestionData);
        } else {  // 关键字检索模式
          if (result.tips) {
            result.tips.forEach(d => {
              d.value = '';
              if (Array.isArray(d.address)) d.address = d.address[0];
            });
            this.poiData = result.tips;
          } else {
            this.poiData = [];
          }
          this.chooseIndex = null;
          this.map.remove(this.centerMarker);
          this.poiLoading = false;
          callback([]);
        }
      });
    },
    /* 搜索建议选中 */
    onSuggestionChoose(item) {
      this.chooseSuggestion = item;
      this.chooseIndex = 0;
      if (this.poiData.length === 0 || this.poiData[0].name !== this.chooseSuggestion.name) {
        this.poiData.unshift(Object.assign({}, this.chooseSuggestion));
      }
      let point = item.location;
      if (point) {
        this.map.setZoomAndCenter(this.chooseZoom, [point.lng, point.lat]);
      }
    },
    /* 搜索建议框失去焦点 */
    onSuggestionBlur() {
      if (this.searchType === 0) this.suggestionKeyWord = '';
    },
    /* 确定选择 */
    done() {
      if (!this.map) return;
      let location;
      if (this.chooseIndex === null) {
        if (this.forceChoose) {  // 强制选择
          return this.$message.error('请点击列表选中位置');
        } else {  // 未选择使用地图中心点
          location = Object.assign({}, this.map.getCenter());
        }
      } else {
        location = Object.assign({
          name: this.poiData[this.chooseIndex].name,
          address: this.poiData[this.chooseIndex].address || ''
        }, this.poiData[this.chooseIndex].location);
      }
      if (this.needCity) {  // 获取行政区
        this.doneLoading = true;
        this.map.setCenter([location.lng, location.lat]);
        this.map.getCity((result) => {
          this.doneLoading = false;
          location.city = result;
          this.$emit('done', location);
        });
      } else {
        this.$emit('done', location);
      }
    },
    /* 弹窗打开回调 */
    onOpen() {
      this.showMap = true;
      if (this.destroyOnClose || this.map === null) {
        this.render();  // 渲染地图
        this.$emit('open');
      }
    },
    /* 弹窗关闭回调 */
    onClosed() {
      this.$emit('closed');
      if (this.destroyOnClose) {
        this.showMap = false;
        this.suggestionKeyWord = '';
        this.lastSuggestion = '';
        this.poiData = [];
        this.chooseIndex = null;
        this.suggestionData = [];
        this.chooseSuggestion = null;
      }
    },
    /* 更新show参数 */
    updateVisible(value) {
      this.$emit('update:show', value);
    }
  },
  watch: {
    darkMode() {
      if (this.map) {
        if (this.darkMode) {
          this.map.setMapStyle('amap://styles/dark');
        } else {
          this.map.setMapStyle('amap://styles/normal');
        }
      }
    }
  }
}
</script>

<style>
.ele-map-picker-dialog .el-dialog__body {
  padding: 0;
}

/* 工具栏 */
.ele-map-picker-header {
  padding: 8px 18px;
  display: flex;
}

.ele-map-picker-header-search {
  flex: 1;
}

.ele-map-picker-header-search .el-autocomplete {
  max-width: 200px;
}

/* 地图 */
.ele-map-picker-body {
  display: flex;
  border-top: 1px solid hsla(0, 0%, 60%, .15);
}

.ele-map-picker-main {
  flex: 1;
  position: relative;
  border-bottom-left-radius: 4px;
  overflow: hidden;
}

.ele-map-picker-main-plus {
  color: #3b74ff;
  font-size: 12px;
  font-weight: 600;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.ele-map-picker-main-icon {
  width: 26px;
  position: absolute;
  left: 50%;
  bottom: 50%;
  margin-left: -13px;
}

/* poi列表 */
.ele-map-picker-poi-list {
  width: 300px;
  overflow: auto;
}

.ele-map-picker-poi-item {
  padding: 8px 30px 8px 44px;
  border-bottom: 1px solid hsla(0, 0%, 60%, .15);
  position: relative;
  cursor: pointer;
}

.ele-map-picker-poi-item:hover {
  background-color: hsla(0, 0%, 60%, .05);
}

.ele-map-picker-poi-item-icon {
  position: absolute;
  top: 50%;
  left: 14px;
  transform: translateY(-50%);
  font-size: 20px;
  opacity: .4;
}

.ele-map-picker-poi-item-title {
  font-size: 14px;
}

.ele-map-picker-poi-item-address {
  font-size: 12px;
  margin-top: 2px;
  opacity: .6;
}

.ele-map-picker-poi-item .ele-map-picker-poi-item-check {
  position: absolute;
  top: 50%;
  right: 7px;
  transform: translateY(-50%);
  color: #3b74ff;
  font-size: 16px;
  display: none;
}

.ele-map-picker-poi-item-active .ele-map-picker-poi-item-check {
  display: block;
}

/* 地图图标跳动动画 */
.ele-map-picker-anim-bounce {
  animation: elePickerAnimBounce 500ms;
  animation-direction: alternate;
}

@keyframes elePickerAnimBounce {
  0%, 60%, 75%, 90%, to {
    transition-timing-function: cubic-bezier(.215, .61, .355, 1)
  }
  0%, to {
    transform: translate3d(0, 0, 0)
  }
  25% {
    transform: translate3d(0, -10px, 0)
  }
  50% {
    transform: translate3d(0, -20px, 0)
  }
  75% {
    transform: translate3d(0, -10px, 0)
  }
}

/* 搜索建议列表 */
.ele-map-picker-suggestion-item {
  padding-right: 0;
  padding-left: 24px;
  line-height: normal;
  border: none;
}

.ele-map-picker-suggestion-item:hover {
  background-color: transparent;
}

.ele-map-picker-suggestion-item .ele-map-picker-poi-item-icon {
  left: 0;
  font-size: 14px;
  font-weight: 600;
  opacity: .3;
}

.ele-map-picker-suggestion-item .ele-map-picker-poi-item-address,
.ele-map-picker-suggestion-item .ele-map-picker-poi-item-title {
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
}

.ele-map-picker-search-pop {
  max-width: 100%;
  width: 240px !important;
}

.ele-map-picker-search-pop .el-autocomplete-suggestion__wrap {
  max-height: 320px;
}

.ele-map-picker-hide {
  display: none !important;
}

/* 小屏幕适应 */
@media screen and (max-width: 768px) {
  .ele-map-picker-dialog {
    margin: 0 !important;
    width: 100vw !important;
    max-width: unset !important;
    border-radius: 0 !important;
  }

  .ele-map-picker-body {
    display: block;
  }

  .ele-map-picker-main > div {
    height: 250px !important;
  }

  .ele-map-picker-poi-list {
    width: auto;
    height: calc(100vh - 353px) !important;
  }
}
</style>
