<template>
  <div>
    <h3>Batches</h3>
    <Batches></Batches>
  </div>
</template>
<script>
import Batches from "~/components/batches/Batches";
export default {
  name: "index",
  layout: 'general',
  middleware:['guest'],
  components:{Batches},
  methods: {

  }
}
</script>

<style scoped>

</style>
