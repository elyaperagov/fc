<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <router-link to="/" class="header__logo">
          <svg width="233" height="70">
            <use xlink:href="#logo"></use>
          </svg>
        </router-link>
        <ul class="header__nav">
          <li class="header__item">
            <a class="header__link" href="#" @click.prevent="$root.goTo('#contact')">
              contact us
            </a>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  beforeDestroy() {},
  created() {},
  methods: {}
}
</script>
