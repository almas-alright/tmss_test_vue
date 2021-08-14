<template>
<div><h1>Rprower[o {{ $auth.loggedIn }}</h1>
  <b-button type="button" variant="info" @click="logout()">sdd</b-button>
</div>
</template>

<script>
import utility from "../mixins/utility";
export default {
  name: "index",
  middleware: ['fuck'],
  auth : 'guest',
  layout: 'main',
  mixins:[utility],
  methods: {
    logout() {
      this.$auth.logout()
    }
  }
}
</script>

<style scoped>

</style>
