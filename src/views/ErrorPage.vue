<template>
  <main class="main">
    <Header />
    <section id="error-page" class="section error-page">
      <div class="container"></div>
    </section>
    <Footer />
  </main>
</template>

<script>
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'

export default {
  name: 'ErrorPage',
  components: { Header, Footer },
  props: {},
  metaInfo() {
    return {
      title: this.$route.meta.title
    }
  },
  data() {
    return {}
  },
  computed: {},
  methods: {}
}
</script>
