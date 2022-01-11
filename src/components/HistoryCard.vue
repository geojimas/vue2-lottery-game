<template>
  <div class="flex justify-center mx-10 animate__animated animate__fadeIn">
    <div
      class="hover:shadow-2xl cursor-pointer max-w-sm py-4 px-8 bg-white shadow-lg rounded-lg my-20"
    >
      <div>
        <h2 class="text-gray-800 text-xl font-semibold">Bet {{ index }}</h2>
        <p class="mt-2 text-gray-600">Your Bet: {{ bet.userBet }}</p>
        <p class="mt-2 text-gray-600">Live Bet: {{ bet.liveBet }}</p>
        <p class="mt-2 text-gray-600">You Find: {{ bet.same }}</p>
        <p class="mt-2 text-gray-600">Your Money: {{ bet.money }}</p>
        <p class="mt-2 text-gray-600">Your Score: {{ bet.score }} / 5</p>
      </div>
      <div class="flex justify-end mt-4">
        <p class="text-md font-medium text-indigo-500">
          <!-- {{ new Date(bet.drawDate).toLocaleDateString('en-US') }} -->
          {{ format(new Date(bet.drawDate), 'dd/MM/yyyy') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns'

export default {
  props: ['bet', 'index'],
  data() {
    return {
      format,
    }
  },
}
</script>
