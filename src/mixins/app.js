// import meta from '@/mixins/meta'
export default {
  // mixins: [meta],
  created() {
    // var _this = this
    // // 全局请求成功日志
    // _this.$bus.$on('EVENT_API_SUCCESS', function(response) {
    //   console.log(response)
    // })
    // // 全局请求失败日志
    // _this.$bus.$on('EVENT_API_ERROR', function(response) {
    //   console.log(response)
    // })
    // window.localStorage.setItem('application', this.app.name)
    // window.localStorage.setItem('unique', this.app.unique)
  },
  computed: {
    // 应用信息
    app() {
      return this.$store.state.app
    }
  },
  async beforeCreate() {
  },
  methods: {

  }
}
