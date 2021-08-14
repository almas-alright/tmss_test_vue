<template>
  <div>
    <Login v-if="!authenticated"/>
    <NuxtLink v-if="authenticated" :to="{name:'index'}">You Are Logged In</NuxtLink>
  </div>
</template>

<script>
import Login from '~/components/auth/Login'
export default {
  components:{Login},
}
</script>
