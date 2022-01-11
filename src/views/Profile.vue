<template>
  <div v-if="auth">
    <ProfileCard :user="user" :auth="auth" />
  </div>
</template>

<script>
import ProfileCard from '../components/ProfileCard.vue'

export default {
  name: 'Profile',
  components: {
    ProfileCard,
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    },
    auth() {
      return this.$store.getters.getIfIsAuth
    },
  }
}
</script>
