<template>
  <nav v-if="auth" class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <router-link to="/" class="flex-shrink-0 flex items-center">
            <img
              class="block lg:hidden h-8 w-auto"
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.bingo.org%2Fwp-content%2Fuploads%2F2018%2F10%2Fintroduction-to-bingo-620x344.png&f=1&nofb=1"
              alt="Workflow"
            />
            <img
              class="hidden lg:block h-8 w-auto"
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.bingo.org%2Fwp-content%2Fuploads%2F2018%2F10%2Fintroduction-to-bingo-620x344.png&f=1&nofb=1"
              alt="Workflow"
            />
          </router-link>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <router-link to="/history" class="link">History </router-link>
              <router-link to="/profile" active-class="menu" class="link">Profile </router-link>
              <router-link to="/bet" active-class="menu" class="link">Bet </router-link>
            </div>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <div class="ml-3">
            <div v-if="auth" class="text-white">
              <button
                @click="logout"
                class="bg-red-500 hover:bg-red-700 text-white font-bold p-2 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu. -->
    <div class="sm:hidden" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1 text-center">
        <router-link to="/" class="link" aria-current="page">Home</router-link>
        <router-link to="/history" class="link">History</router-link>
        <router-link to="/profile" class="link">Profile</router-link>
        <router-link to="bet" class="link">Bet</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
  computed: {
    auth() {
      return this.$store.getters.getIfIsAuth
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('setUser', '')
      this.$store.dispatch('setAuth', false)
      this.$router.push('/login')
    },
  },
}
</script>
