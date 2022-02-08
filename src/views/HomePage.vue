<template>
  <main class="main">
    <Header />
    <Blank />
  </main>
</template>

<script>
import Header from '@/components/common/Header'
import Blank from '@/components/home/Blank'

export default {
  name: 'HomePage',
  components: {
    Header,
    Blank
  },
  props: {},
  data() {
    return {}
  },
  metaInfo() {
    return {
      title: this.$route.meta.title
    }
  },
  computed: {},
  mounted() {},
  methods: {}
}
</script>
