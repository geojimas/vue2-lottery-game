<template>
  <div v-if="!loading">
    <div v-if="bets" class="flex justify-evenly flex-wrap">
      <HistoryCard v-for="(bet, index) in bets" :key="index" :index="index" :bet="bet" />
    </div>
    <div v-else class="flex justify-center items-center mt-20 animate__animated animate__fadeIn">
      <div class="text-center bg-blue-400 text-white font-bold p-20 rounded-lg mt-20" role="alert">
        <h1 class="text-3xl p-2">No History Found for User</h1>
        <p class="p-2 text-4xl text-red-800 underline">{{ user.email.split('@')[0] }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import HistoryCard from '../components/HistoryCard.vue'

export default {
  components: {
    HistoryCard,
  },
  data() {
    return {
      bets: null,
      loading: true,
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    },
    auth() {
      return this.$store.getters.getIfIsAuth
    },
  },
  mounted() {
    axios
      .get(
        `https://lottery-76494-default-rtdb.europe-west1.firebasedatabase.app/draws.json?orderBy="user"&equalTo="${this.user.email}"`
      )
      .then(response => {
        if (Object.keys(response.data).length !== 0) this.bets = response.data
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        this.loading = false
      })
  },
}
</script>
