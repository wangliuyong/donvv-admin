export default {
  created() {
    // const _t = this
    // _t.$bus.$on('meta.title', function(val) {
    //   _t.title = val
    // })
  },
  computed: {
    // meta信息
    meta() {
      return this.$store.state.meta
    },
    fullTitle() {
      if (this.title) {
        return this.title + '-' + this.meta.title
      }
      return this.meta.title
    }
  },
  data() {
    return {
      title: ''
    }
  },
  methods: {
    // meta信息
    set_meta() {
      // icon
      var link = document.querySelector("link[rel*='icon']") || document.createElement('link')
      link.type = 'image/x-icon'
      link.rel = 'shortcut icon'
      link.href = this.meta.icon
      document.getElementsByTagName('head')[0].appendChild(link)
      // title
      document.title = this.fullTitle
      // keywords
      if (this.meta.description) {
        document.querySelector('meta[name="description"]').setAttribute('content', this.meta.description)
      }
      // description
      if (this.meta.keywords) {
        document.querySelector('meta[name="keywords"]').setAttribute('content', this.meta.keywords)
      }
    }
  },
  watch: {
    title: {
      handler: function(val) {
        this.set_meta()
      }
    }
  }
}
