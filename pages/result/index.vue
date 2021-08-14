<template>
  <div>
    <h3>...Results</h3>
    <Results></Results>
  </div>
</template>
<script>
import Results from "~/components/results/Results";
export default {
  name: "index",
  layout: 'general',
  middleware:['guest'],
  components:{Results},
  methods: {

  }
}
</script>

<style scoped>

</style>
