<template>
  <section ref="services" class="services">
    <div class="container">
      <h2>Services</h2>
      <div class="services__list">
        <div v-for="(item, i) in items" :key="i" class="services__item">
          <video ref="video" class="services__video" :poster="item.poster" playsinline muted>
            <source :src="item.video" type="video/mp4" />
            <source :src="item.videoOgg" type="video/ogg" />
            <source :src="item.videoWebm" type="video/webm" />
          </video>
          <p class="services__text">{{ item.text }}</p>
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
          videoWebm: require('@/assets/media/Smart_contracts_video.webm'),
          videoOgg: require('@/assets/media/Smart_contracts_video.mp4'),
          poster: require('@/assets/img/Smart.jpg'),
          text: 'Smart contracts'
        },
        {
          video: require('@/assets/media/Blockchain.mp4'),
          videoWebm: require('@/assets/media/Blockchain.webm'),
          videoOgg: require('@/assets/media/Blockchain.mp4'),
          poster: require('@/assets/img/Blockchain.jpg'),
          text: 'Blockchain'
        },
        {
          video: require('@/assets/media/Audit.mp4'),
          videoWebm: require('@/assets/media/Audit.webm'),
          videoOgg: require('@/assets/media/Audit.mp4'),
          poster: require('@/assets/img/Audit.jpg'),
          text: 'Audit and verification'
        }
      ]
    }
  },
  mounted() {
    window.addEventListener('scroll', this.startVideos)
  },
  destroyed() {
    window.removeEventListener('scroll', this.startVideos)
  },
  methods: {
    startVideos() {
      const services = this.$refs.services
      const divPosition = services.getBoundingClientRect().top + (window.scrollY - 150)

      if (window.scrollY >= divPosition && !this.videoPlayed) {
        this.videoPlayed = true

        const videos = this.$refs.video

        videos.forEach(video => {
          video.play()
        })
      }
    }
  }
}
</script>
