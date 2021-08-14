<template>
  <div class="my-4">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-12">
          <h4>Change Password</h4>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="my-2" role="group">
            <label for="cpsw">Current Password :</label>
            <b-form-input
              id="cpsw"
              type="password"
              v-model="form_cp.password_current"
              :class="{'is-invalid' : lv_errors.password_current }"
              placeholder="Enter your current password"
              trim
            ></b-form-input>
            <div class="invalid-feedback" v-if="lv_errors.password_current">{{ lv_errors.password_current[0] }}</div>
          </div>
          <div class="my-2" role="group">
            <label for="psw">New Password :</label>
            <b-form-input
              id="psw"
              type="password"
              v-model="form_cp.password"
              :class="{'is-invalid' : lv_errors.password}"
              placeholder="New Password"
              trim
            ></b-form-input>
            <div class="invalid-feedback" v-if="lv_errors.password">{{ lv_errors.password[0] }}</div>
          </div>
          <div class="my-2" role="group">
            <label for="pswc">Retype New Password :</label>
            <b-form-input
              id="pswc"
              type="password"
              v-model="form_cp.password_confirmation"
              :class="{'is-invalid' : lv_errors.password_confirmation}"
              placeholder="Retype New Password"
              trim
            ></b-form-input>
            <div class="invalid-feedback" v-if="lv_errors.password_confirmation">{{ lv_errors.password_confirmation[0] }}</div>
            <div class="text-danger text-center" v-if="lv_errors.abc">{{ lv_errors.abc[0] }}</div>
          </div>
          <div class="form-group my-2">
            <button @click="changePassword()" type="button" class="btn btn-success btn-sm"> <fa :icon="['fas', 'save']"/> Change Password </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewPassword",
  data() {

    return {
      showLoader: false,
      form_cp: {
        password_current: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  methods:{
    changePassword() {
      // this.showLoader = true
      let that = this
      this.$axios.$patch('/auth/password-change', that.form_cp)
        .then(function (response) {
          if(response.success){
            that.$swal({
              title: 'Done!',
              text: response.message,
              type: 'success',
              allowOutsideClick: false,
            }).then((result) => {
              that.logout()
            })
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    logout() {
      let that = this
      this.$auth.logout().then(function (response) {
        that.$router.push({ path : '/login'})
      })
    }
  }
}
</script>

