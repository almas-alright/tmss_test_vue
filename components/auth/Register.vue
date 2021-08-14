<template>
  <div>
    <div class="row">
      <div class="container">
        <div v-if="!showForm" class="col-12 bg-dark text-center p2">
          <p class="lead text-danger p-2">{{ msg }}</p>
        </div>
        <div v-if="showForm" class="col-12">
          <div class="text-info text-center bg-secondary" >{{ form.email }}</div>
          <div class="text-danger text-center" v-if="lv_errors.abc">{{ lv_errors.abc[0] }}</div>
          <input type="text" placeholder="Enter Username" id="uname" :class="{'is-invalid' : lv_errors.name }" v-model="form.name" required>
            <div class="invalid-feedback" v-if="lv_errors.name">{{ lv_errors.name[0] }}</div>
          <input v-show="false" type="text" placeholder="Enter Email" id="email" :class="{'is-invalid' : lv_errors.email }"
                 v-model="form.email" required>
          <div class="invalid-feedback" v-if="lv_errors.email">{{ lv_errors.email[0] }}</div>
           <label for="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" id="psw" :class="{'is-invalid' : lv_errors.password }" v-model="form.password" required>
          <input type="password" placeholder="Enter Password again" id="pswc" :class="{'is-invalid' : lv_errors.password }" v-model="form.password_confirmation" required>
          <div class="invalid-feedback" v-if="lv_errors.password">{{ lv_errors.password[0] }}</div>
          <div class="text-center" v-if="showLoader"><b-spinner type="grow" label="Spinning"></b-spinner></div>
          <button type="button" v-if="!showLoader" v-on:click="submit()">Sign Up</button>
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
      showForm:true,
      msg:'',
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        otp:'',
        purpose: 'registration'
      }
    }

  },
  methods: {
    submit() {
      this.showLoader = true
      // let pass = this.randomString(10, 'an')
      // this.form.password = pass
      // this.form.password_confirmation = pass
      let that = this
      this.$axios.$post('/auth/register', that.form)
        .then(function (response) {
          if(response.success){
            that.login()
          }
        })
        .catch(function (error) {
          console.log(error);
        }).finally(function (){
        that.showLoader = false
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
    login(){
      let that = this
      this.form.active = '1'
      this.$auth.login({ data: that.form })
        // that.$router.push({ name : 'user-profile'})
        .then(function (response) {
          if(response.data.success){
            that.$router.push({ name : 'my-profile'})

          }
        })
    }

  },
  // computed:{
  //   hasError(){
  //     if(_.isEmpty(this.lv_errors)){
  //       return false
  //     }
  //   }
  // }
  mounted() {
    this.form.email = atob(this.$route.params.hash);
    this.form.otp = this.$route.params.otp
    let that = this
    this.$axios.$patch('/auth/verify-link', that.form)
      .then(function (response) {
        if (!response.success) {
          that.showForm = false
          that.msg = response.message
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }
}
</script>

