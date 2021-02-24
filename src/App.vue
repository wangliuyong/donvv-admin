<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

import app from '@/mixins/app'
import auth from '@/mixins/auth'
export default {
  mixins: [app, auth]
}

</script>
