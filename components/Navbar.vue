<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item v-if="!authenticated" :to="{ name: 'login' }">login</b-nav-item>
        <b-nav-item v-if="authenticated" :to="{ name: 'dashboard' }">Dashboard</b-nav-item>
        <b-nav-item v-if="authenticated" :to="{ name: 'department' }">Department</b-nav-item>
        <b-nav-item v-if="authenticated" :to="{ name: 'batch' }">Batch</b-nav-item>
        <b-nav-item v-if="authenticated" :to="{ name: 'student' }">Student</b-nav-item>

        <!-- Navbar dropdowns -->

        <client-only>
          <b-nav-item-dropdown right v-if="authenticated" size="sm"
                               :text="'welcome '+user.name" variant="outline-info" class="m-2">
            <b-dropdown-item href="#">Account</b-dropdown-item>
            <b-dropdown-item href="#">Settings</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item href="javascript:" @click.prevent="logout()">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </client-only>
      </b-navbar-nav>
    </b-navbar>

  </div>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    logout() {
      this.$auth.logout()
    }
  }
}
</script>

<style scoped>

</style>
