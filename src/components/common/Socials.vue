<template>
  <div class="socials">
    <div class="container">
      <div class="socials__inner">
        <div class="header__socials">
          <a
            v-for="(social, s) in socials"
            :key="s"
            class="header__social"
            :href="social.href"
            target="_blank"
          >
            <svg width="40" height="40" aria-hidden="true">
              <use :xlink:href="social.icon"></use>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Socials',
  data() {
    return {}
  },
  computed: {
    socials() {
      return this.$root.data.socials
    }
  }
}
</script>
