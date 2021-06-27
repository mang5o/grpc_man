<template>
    <div class='outer'>
        <vue3-tabs-chrome :tabs="tabs" v-model="tab" />
    </div>
</template>

<script>
import Vue3TabsChrome from 'vue3-tabs-chrome'
import 'vue3-tabs-chrome/dist/vue3-tabs-chrome.css'
import { defineComponent, reactive, ref } from 'vue'
export default defineComponent({
    components: {
      Vue3TabsChrome
    },
    setup() {
      const tab = ref('a1')
      const tabs = reactive([
        {
          label: 'a1',
          key: 'a1',
          favico: require('../assets/logo.png')
        },
        {
          label: 'b1',
          key: 'b1',
          favico: require('../assets/logo.png')
        },
        {
          label: 'c1',
          key: 'c1'
        }
      ])
      return {
        tabs,
        tab
      }
    }
  })
</script>


<style scoped>


</style>