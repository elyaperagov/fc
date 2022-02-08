<template>
  <div id="__app">
    <sprite />
    <div class="wrapper">
      <main>
        <notifications group="app-notifications" />
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import Sprite from '@/components/common/Sprite'

export default {
  name: 'App',
  components: {
    Sprite
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>
