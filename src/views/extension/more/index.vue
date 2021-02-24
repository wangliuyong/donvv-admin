<template>
  <div class="ele-body">
    <demo-tag/>
    <demo-dot/>
    <demo-alert/>
    <demo-steps/>
    <demo-menu/>
    <demo-message/>
    <demo-empty/>
    <demo-city-select/>
    <demo-cropper/>
    <demo-count-up/>
    <demo-qrcode/>
  </div>
</template>

<script>
import DemoTag from './demo-tag'
import DemoDot from './demo-dot'
import DemoAlert from './demo-alert'
import DemoSteps from './demo-steps'
import DemoMenu from './demo-menu'
import DemoMessage from './demo-message'
import DemoEmpty from './demo-empty'
import DemoCitySelect from './demo-city-select'
import DemoCropper from './demo-cropper'
import DemoCountUp from './demo-count-up'
import DemoQrcode from './demo-qrcode'

export default {
  name: 'ExtensionMore',
  components: {
    DemoTag,
    DemoDot,
    DemoAlert,
    DemoSteps,
    DemoMenu,
    DemoMessage,
    DemoEmpty,
    DemoCitySelect,
    DemoCropper,
    DemoCountUp,
    DemoQrcode
  }
}
</script>

<style scoped>
</style>
