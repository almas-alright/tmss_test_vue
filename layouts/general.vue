<template>
  <div class="container">
    <Navbar></Navbar>
    <nuxt/>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
export default {
  name: "general",
  components:{Navbar}
}
</script>

<style scoped>

</style>
