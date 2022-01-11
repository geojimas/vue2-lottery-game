<template>
  <div v-if="auth" class="flex mt-20 justify-evenly flex-wrap m-2 p-2 animate__animated animate__fadeIn">
    <!-- numbers -->
    <div class="p-2 w-5/12">
      <h1 class="text-black text-2xl text-center mb-2 underline font-bold">Choose 5 Numbers</h1>
      <div v-for="index in 30" :key="index" class="m-2 p-2 inline-block rounded-md text-center">
        <p class="text-red-600 text-center font-bold text-xl">{{ index }}</p>
        <input
          class="text-indigo-500 w-6 h-6 m-2 focus:ring-indigo-400 focus:ring-opacity-25 rounded"
          :disabled="selection.length === 5"
          v-model="selection"
          :value="index"
          type="checkbox"
        />
      </div>
    </div>

    <!-- actions -->
    <div class="m-4">
      <h5 class="text-black text-2xl text-center mb-2 underline font-bold">Selected Numbers</h5>
      <div
        class="mx-24 flex justify-center p-4 m-4 border rounded-lg animate__animated animate__fadeInDown"
        v-for="(item, index) in selection"
        :key="index"
      >
        <h4 class="w-12 text-2xl flex justify-center font-bold">{{ item }}</h4>
      </div>
      <div class="flex justify-center p-2 m-2 mt-16">
        <button
          class="bg-transparent bg-blue-500 font-semibold text-white py-2 px-4 hover:border-transparent rounded m-2"
          :disabled="selection.length < 5"
          @click="add"
        >
          Start
        </button>
        <button
          class="bg-transparent bg-red-500 font-semibold text-white py-2 px-4 hover:border-transparent rounded m-2"
          :disabled="selection.length < 1"
          @click="remove"
        >
          Remove
        </button>
        <button
          class="bg-transparent bg-yellow-500 font-semibold text-white py-2 px-4 hover:border-transparent rounded m-2"
          :disabled="selection.length < 1"
          @click="reset"
        >
          Reset
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Bet',
  data() {
    return {
      selection: [],
    }
  },
  computed: {
    auth() {
      return this.$store.getters.getIfIsAuth
    },
  },
  methods: {
    add() {
      this.$store.dispatch('setNumbers', this.selection)
      this.$router.push({ name: 'Draw' })
    },
    reset() {
      this.selection = []
    },
    remove() {
      this.selection.splice(-1, 1)
    },
  },
}
</script>
