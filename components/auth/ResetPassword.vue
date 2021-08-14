<template>
  <div>
    <div class="row">
      <div class="container">
        <div class="col-12">
          <div class="text-danger text-center" v-if="lv_errors.abc">{{ lv_errors.abc[0] }}</div>
          <input type="text" placeholder="Enter Email" id="email" :class="{'is-invalid' : lv_errors.email }"
                 v-model="form.email" required>
          <div class="invalid-feedback" v-if="lv_errors.email">{{ lv_errors.email[0] }}</div>
          <div class="text-center" v-if="showLoader"><b-spinner type="grow" label="Spinning"></b-spinner></div>
          <button type="button" class="btn-info" v-if="!showLoader" v-on:click="submit()">Reset My Password</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data() {

    return {
      showLoader: false,
      form: {
        email: '',
        password: '',
        password_confirmation: ''
      }
    }

  },
  methods: {
    submit() {
      // this.showLoader = true
      let pass = this.randomString(10, 'an')
      this.form.password = pass
      this.form.password_confirmation = pass
      let that = this
      this.$axios.$patch('/auth/password-reset', that.form)
        .then(function (response) {
          that.showLoader = false
          if(response.success){
            that.$swal({
              title: 'Done!',
              text: response.message,
              type: 'success',
              allowOutsideClick: false,
            }).then((result) => {
              that.$router.push({ path : 'login'})
            })
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    randomString(len, an) {
      an = an && an.toLowerCase();
      var str = "",
        i = 0,
        min = an == "a" ? 10 : 0,
        max = an == "n" ? 10 : 62;
      for (; i++ < len;) {
        var r = Math.random() * (max - min) + min << 0;
        str += String.fromCharCode(r += r > 9 ? r < 36 ? 55 : 61 : 48);
      }
      return str;
    },
  }

}
</script>


