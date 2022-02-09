<template>
  <main class="main">
    <Blank />
    <Services />
    <Company />
  </main>
</template>

<script>
import Blank from '@/components/home/Blank'
import Services from '@/components/home/Services'
import Company from '@/components/home/Company'

export default {
  name: 'HomePage',
  components: {
    Blank,
    Services,
    Company
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
