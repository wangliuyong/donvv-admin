export default {
  data() {
    return {

    }
  },
  created() {
    this.initApp()
  },
  computed: {
    // token
    token() {
      return this.$store.state.user.token
    }
  },
  methods: {
    async initApp() {
      // const domainConfig = await this.$http.get('api1/admin/1.0/domain?domain=' + process.env.VUE_APP_Branch)
      // if (domainConfig.isSucceed) {
      //   const urlConfig = {
      //     baseUrl: domainConfig.data,
      //     system: `http://${domainConfig.data}/api1/admin/1.0/`,
      //     commodity: `http://${domainConfig.data}/api2/api/1.0/`,
      //     customer: `http://${domainConfig.data}/api3/admin/1.0/`,
      //     order: `http://${domainConfig.data}/api4/admin/1.0/`,
      //     file: `http://${domainConfig.data}/api5/admin/1.0/`,
      //     lucene: `http://${domainConfig.data}/api6/admin/1.0/`,
      //     content: `http://${domainConfig.data}/api7/admin/1.0/`,

      //     upload: `http://${domainConfig.data}/admin/1/upload/upload`,
      //     uploadPart: `http://${domainConfig.data}/admin/1/upload/uploadByWeb`,
      //     mergeChunks: `http://${domainConfig.data}/admin/1/upload/merge-chunks`
      //   }
      //   this.$store.dispatch('app/setUrl', urlConfig)
      // }
      // console.log(domainConfig);
    }
  }
}
