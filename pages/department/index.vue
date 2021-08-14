<template>
  <div>
    <h3>Department</h3>
    <Departments></Departments>
  </div>
</template>
<script>
import Departments from "~/components/departments/Departments";
export default {
  name: "index",
  layout: 'general',
  middleware:['guest'],
  components:{Departments},
  methods: {

  }
}
</script>

<style scoped>

</style>
