<template>
  <section class="contact">
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
          class="form callback__form"
          @submit.prevent="sendForm()"
        >
          <p class="form__text">
            You can send the message directly via Telegram or use contact form so we can get in
            touch with you
          </p>
          <div class="form__input-wrapper">
            <input
              class="form__input"
              :class="{ error: form.name.error }"
              type="text"
              placeholder="Name"
              maxlength="32"
              v-model="form.name.value"
            />
            <template v-if="form.name.error">
              <p class="form__error">{{ form.name.error }}</p>
            </template>
          </div>

          <div class="form__input-wrapper">
            <input
              class="form__input"
              :class="{ error: form.email.error }"
              type="email"
              placeholder="Phone number or e-mail"
              maxlength="32"
              v-model="form.email.value"
            />
            <template v-if="form.email.error">
              <p class="form__error">{{ form.email.error }}</p>
            </template>
          </div>
          <textarea
            class="form__input"
            maxlength="1000"
            type="text"
            placeholder="Comment"
            v-model="form.message.value"
          />
          <button type="submit" class="button button--submit" @click.prevent="sendForm()">
            Send
          </button>
        </form>
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
      form: {
        name: {
          value: '',
          label: '',
          type: 'text',
          error: ''
        },
        phone: {
          value: '',
          label: '',
          type: 'tel',
          error: ''
        },
        message: {
          value: ''
        },
        email: {
          value: '',
          label: '',
          type: 'email',
          error: ''
        }
      }
    }
  },
  methods: {
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
      //   this.showMessage()
      //   setTimeout(() => {
      //     for (const key in this.form) {
      //       if (typeof this.form[key].value !== 'undefined') {
      //         this.form[key].value = ''
      //       }
      //     }
      //     this.hideMessage()
      //   }, 3000)
      //   if (this.goal) {
      //     this.$root.reachGoal(this.goal)
      //   }
      // }
    }
  }
}
</script>

<style></style>
