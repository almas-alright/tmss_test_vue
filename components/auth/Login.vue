<template>
  <div>
    <b-container class="mt-5">
      <b-row>
        <b-col offset-md="4" md="4">
          <div class="mb-3">
            <b-form-input
              type="email"
              v-model="form.email"
              :state="hasError(lv_errors, 'email')"
              aria-describedby="input-live-help input-live-feedback"
              placeholder="mail@example.com"
              trim
            ></b-form-input>
            <div class="invalid-feedback" v-if="lv_errors.email">{{ lv_errors.email[0] }}</div>
          </div>
          <div class="mb-3">
            <b-form-input
              type="password"
              v-model="form.password"
              :state="hasError(lv_errors, 'password')"
              aria-describedby="input-live-help input-live-feedback"
              placeholder="password"
              trim
            ></b-form-input>
            <div class="invalid-feedback" v-if="lv_errors.password"> {{ lv_errors.password[0] }} </div>
          </div>
          <b-button size="sm" variant="dark" v-on:click="login()">Login</b-button>
          <p v-if="!lv_errors.abc" class="text-info text-sm-center">do not have an account?
            <nuxt-link to="/register">sign up</nuxt-link>
          </p>
          <div v-if="lv_errors.abc" class="text-danger text-sm-center bg-custom mx-3">forgot password?
            <nuxt-link to="/forgot-password">reset password</nuxt-link>
          </div>
          <div v-if="lv_errors.abc" class="text-warning text-sm-center bg-custom mx-3">or if you do not have an account
            then
            <nuxt-link to="/register">create an account</nuxt-link>
          </div>
        </b-col>
      </b-row>
    </b-container>

  </div>
</template>

<script>
import utility from "../../mixins/utility";
export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      }
    }
  },
  mixins:[utility],
  methods: {
    submit(){
      let that = this
      this.$axios.$post('/auth/login', that.form)
        .then(function (response) {
          if(response.success){
            let token  = response.access_token
            let expiery = response.expires_in
            that.$auth.$storage.setCookie('token', token)
            that.$store.dispatch('setToken', { token, expiery});
            that.$router.push({ name : 'dashboard'})
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    // async login(){
    //   let that = this
    //   await this.$auth.loginWith('local', { data: that.form })
    //     // that.$router.push({ name : 'user-profile'})
    //     .then(function (response) {
    //       if(response.data.success){
    //         that.$auth.$storage.setCookie('token', token)
    //         that.$store.dispatch('setToken', { token, expiery})
    //         console.log('redirecting')
    //         that.$router.push({ name : 'dashboard'})
    //       }
    //     }).catch(function (error){
    //
    //   })
    // },

    // async login() {
    //   try {
    //     await this.$auth.loginWith('local', { data: this.form })
    //
    //     this.$router.push('/dashboard')
    //   } catch (e) {
    //     this.error = e.response.data.message
    //   }
    // },

    login(){
      let that = this
      this.$auth.login({ data: that.form })
        // that.$router.push({ name : 'user-profile'})
        .then(function (response) {
          if(response.data.success){
            that.$router.push({ name : 'dashboard'})
          }
        })
    },

  },

}
</script>

