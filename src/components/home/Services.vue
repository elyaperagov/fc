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
          poster: require('@/assets/img/Smart_contracts_poster.png'),
          text: 'Smart contracts'
        },
        {
          video: require('@/assets/media/Blockchain.mp4'),
          poster: require('@/assets/img/Blockchain_poster.png'),
          text: 'Blockchain'
        },
        {
          video: require('@/assets/media/Audit.mp4'),
          poster: require('@/assets/img/Audit_poster.png'),
          text: 'Audit and verification'
        }
      ]
    }
  },
  mounted() {
    window.addEventListener('scroll', this.checkScroll)
  },
  methods: {
    async checkScroll() {
      const coordsY = document.querySelector('.services__list').getBoundingClientRect().top
      // console.log(coordsY, window.scrollY)
      if (coordsY < window.scrollY && this.videoPlayed === false) {
        await this.startVideos()
        this.videoPlayed = true
      }
    },
    startVideos() {
      const videos = document.getElementsByTagName('video')

      const fraction = 0.8

      for (var i = 0; i < videos.length; i++) {
        var video = videos[i]

        const x = video.offsetLeft
        const y = video.offsetTop
        const w = video.offsetWidth
        const h = video.offsetHeight
        const r = x + w
        const b = y + h

        const visibleX = Math.max(
          0,
          Math.min(w, window.pageXOffset + window.innerWidth - x, r - window.pageXOffset)
        )
        const visibleY = Math.max(
          0,
          Math.min(h, window.pageYOffset + window.innerHeight - y, b - window.pageYOffset)
        )

        const visible = (visibleX * visibleY) / (w * h)

        if (visible > fraction) {
          video.play()
        }
      }
    }
  }
}
</script>

<style></style>
