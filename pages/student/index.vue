<template>
  <div>
    <h3>...students</h3>
    <Students></Students>
  </div>
</template>
<script>
import Students from "~/components/students/Students";
export default {
  name: "index",
  layout: 'general',
  middleware:['guest'],
  components:{Students},
  methods: {

  }
}
</script>

<style scoped>

</style>
