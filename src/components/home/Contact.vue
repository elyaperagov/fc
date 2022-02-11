<template>
  <section class="contact" id="contact">
    <div class="container">
      <h2>Contact Us</h2>
      <div class="contact__inner">
        <div class="contact__picture">
          <img src="@/assets/img/map.png" alt="" />
        </div>

        <form
          id="form"
          action=""
          method="post"
          v-if="!form_success"
          class="form callback__form"
          @submit.prevent="sendForm()"
        >
          <p class="form__text">
            You can send the message directly via Telegram or use contact form so we can get in
            touch with you
          </p>
          <div class="form__inputs">
            <div class="form__field">
              <input
                class="form__input"
                :class="{ error: form.name.error }"
                id="name"
                name="email"
                :type="form.name.type"
                size="20"
                v-model="form.name.value"
                placeholder=" "
              />
              <label class="form__label" for="name">{{ form.name.label }}</label>
              <template v-if="form.name.error">
                <p class="form__error">{{ form.name.error }}</p>
              </template>
            </div>
            <div class="form__field">
              <input
                class="form__input"
                :class="{ error: form.email.error }"
                id="email"
                name="email"
                :type="form.email.type"
                size="20"
                v-model="form.email.value"
                placeholder=" "
              />
              <label class="form__label" for="email">{{ form.email.label }}</label>
              <template v-if="form.email.error">
                <p class="form__error">{{ form.email.error }}</p>
              </template>
            </div>
            <div class="form__message">
              <div class="form__field">
                <textarea
                  class="form__message-textarea"
                  :class="{ error: form.message.error }"
                  id="message"
                  name="message"
                  :type="form.message.type"
                  size="20"
                  v-model="form.message.value"
                  placeholder=" "
                  :maxlength="form_maxlength"
                ></textarea>
                <label class="form__label" for="message">{{ form.message.label }}</label>
              </div>
            </div>
          </div>
          <button type="submit" class="button button--submit" @click.prevent="sendForm()">
            Send
          </button>
          <template v-if="preloader">
            <loader
              object="#0F1110"
              color1="#0F1110"
              color2="#00FFC5"
              size="21"
              speed="2"
              bg="#3E2F56"
              objectbg="#00FFC5"
              opacity="80"
              name="spinning"
              z-index="0"
            ></loader>
          </template>
        </form>

        <div class="contact__success" v-if="form_success">
          <p>Thanks for contacting us! We will contact with you as soon as possible.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import axios from 'axios'
export default {
  name: 'Contact',
  data() {
    return {
      form_maxlength: 300,
      form_success: false,
      preloader: false,
      form: {
        name: {
          value: '',
          label: 'Name',
          type: 'text',
          error: ''
        },
        email: {
          value: '',
          label: 'Phone number or e-mail',
          type: 'text',
          error: ''
        },

        message: {
          value: '',
          label: 'Comment',
          type: 'text',
          error: ''
        }
      }
    }
  },
  methods: {
    async showPreloader() {
      this.preloader = true
      setTimeout(() => {
        this.preloader = false
        this.form_success = true
      }, 2000)
    },
    async showMessage() {
      await this.showPreloader()

      setTimeout(() => {
        for (const key in this.form) {
          if (typeof this.form[key].value !== 'undefined') {
            this.form[key].value = ''
          }
        }
        this.form_success = false
      }, 4000)
    },
    async sendForm() {
      if (!this.$validate(this.form)) {
        return
      }

      const data = new FormData()
      for (const key in this.form) {
        if (typeof this.form[key].value !== 'undefined') {
          data.append(key, this.form[key].value)
        }
      }
      // const response = await axios.post('/api/request', data).catch(error => {})

      // if (response.data.success) {
      await this.showMessage()

      setTimeout(() => {
        for (const key in this.form) {
          if (typeof this.form[key].value !== 'undefined') {
            this.form[key].value = ''
          }
        }
      }, 3000)
      // }

      if (this.goal) {
        this.$root.reachGoal(this.goal)
      }
      // }
    }
  },
  computed: {}
}
</script>

<style></style>
