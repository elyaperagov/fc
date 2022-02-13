<template>
  <section class="services">
    <div class="container">
      <h2>Services</h2>
      <div class="services__list">
        <div v-for="(item, i) in items" :key="i" class="services__item">
          <video class="services__video" :poster="item.poster" muted>
            <source :src="item.video" type="video/mp4" />
            <!-- <source src="@/assets/media/main_alt.ogv" type="video/ogg" /> -->
            <!-- <source src="@/assets/media/main_alt.webm" type="video/webm" /> -->
          </video>
          <p class="services__text" v-html="item.text"></p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Services',
  data() {
    return {
      videoPlayed: false,
      items: [
        {
          video: require('@/assets/media/Smart_contracts_video.mp4'),
          poster: require('@/assets/img/Smart.jpg'),
          text: 'Smart contracts'
        },
        {
          video: require('@/assets/media/Blockchain.mp4'),
          poster: require('@/assets/img/Blockchain.jpg'),
          text: 'Blockchain'
        },
        {
          video: require('@/assets/media/Audit.mp4'),
          poster: require('@/assets/img/Audit.jpg'),
          text: 'Audit and verification'
        }
      ]
    }
  },
  mounted() {
    window.addEventListener('scroll', this.startVideos)
  },
  methods: {
    startVideos() {
      const div = document.querySelector('.services')
      const divPosition = div.getBoundingClientRect().top + (window.scrollY - 100)

      if (window.scrollY >= divPosition && this.videoPlayed === false) {
        const videos = document.getElementsByTagName('video')

        for (var i = 0; i < videos.length; i++) {
          const video = videos[i]

          video.play()
          this.videoPlayed = true
        }
      }
    }
  }
}
</script>

<style></style>
