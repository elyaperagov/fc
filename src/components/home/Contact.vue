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
          @submit.prevent="onSubmit()"
        >
          <p class="form__text">
            You can send the message directly via
            <a href="https://t.me/formalcrypto" target="blank">Telegram</a> or use contact form so
            we can get in touch with you
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
          <button type="submit" class="button button--submit" @click.prevent="onSubmit()">
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
import { sendDataToEmail } from '@/api'
import { showNotification } from '@/utils'
export default {
  name: 'Contact',
  data() {
    return {
      form_maxlength: 140,
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
    showMessage() {
      this.form_success = true
      setTimeout(() => {
        // for (const key in this.form) {
        //   if (typeof this.form[key].value !== 'undefined') {
        //     this.form[key].value = ''
        //   }
        // }
        this.form_success = false
      }, 4000)
    },

    onSubmit() {
      if (!this.$validate(this.form)) {
        return
      }
      this.preloader = true
      const formData = new FormData()
      for (const key in this.form) {
        if (typeof this.form[key].value !== 'undefined') {
          formData.append(key, this.form[key].value)
        }
      }
      sendDataToEmail(formData)
        .then(() => {
          this.preloader = false
          this.showMessage()

          showNotification(this.$notify, {
            text: 'Your message was sent successfully, Thanks!',
            type: 'success'
          })

          setTimeout(() => {
            for (const key in this.form) {
              if (typeof this.form[key].value !== 'undefined') {
                this.form[key].value = ''
              }
            }
          }, 3000)
        })
        .catch(() => {
          this.preloader = false
          showNotification(this.$notify, {
            text: 'An error occurred. Please try again later.',
            type: 'error'
          })
        })
    }
  },
  computed: {}
}
</script>

<style></style>
