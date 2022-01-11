<template>
  <div v-if="auth">
    <div class="flex justify-center m-10">
      <button
        @click="again"
        class="mr-10 bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
      >
        Try Again
      </button>
      <button
        @click="newDraw"
        class="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
      >
        New Draw
      </button>
    </div>

    <div class="flex justify-evenly">
      <fieldset
        class="border border-solid border-gray-700 p-3 flex items-center justify-center h-auto rounded-xl text-xl text-center text-purple-500"
      >
        <legend class="font-bold underline text-xl text-black">Live Draw</legend>

        <div class="flex justify-center">
          <div v-if="draw.length" class="bg-white font-bold shadow-xl rounded-lg w-16">
            <ul class="flex justify-center" v-for="(item, index) in draw" :key="index">
              <li
                class="p-6 mt-4 hover:bg-gray-50 cursor-pointer text-2xl text-red-500 animate__animated animate__heartBeat"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </fieldset>
      <div>
        <img
          class="mt-40"
          v-if="draw.length < 5"
          alt="Spinner"
          src="../assets/270.gif"
          width="50"
        />
      </div>

      <fieldset
        class="border border-solid border-gray-700 p-3 flex items-center justify-center h-auto rounded-xl text-xl text-center text-purple-500"
      >
        <legend class="font-bold underline text-xl text-black">Your Numbers</legend>
        <div class="flex justify-center">
          <div v-if="selectedNumbers" class="bg-white font-bold shadow-xl rounded-lg w-16">
            <ul class="flex justify-center" v-for="item in selectedNumbers" :key="item">
              <li class="p-6 mt-4 hover:bg-gray-50 cursor-pointer text-2xl text-blue-500">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </fieldset>
    </div>
    <div class="mt-10 flex justify-center">
      <fieldset
        class="border border-solid border-gray-700 p-3 flex items-center justify-center h-auto rounded-xl text-xl text-center text-purple-500"
      >
        <legend class="font-bold underline text-xl text-black">Matched Numbers</legend>
        <div v-if="matchedNumbers.length">
          <div class="text-center" v-for="item in matchedNumbers" :key="item">
            <h4 class="font-bold text-2xl text-green-500">{{ item }}</h4>
          </div>
        </div>
        <div v-else>
          <h4 class="font-bold text-2xl text-red-500">None</h4>
        </div>
      </fieldset>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'Draw',
  data() {
    return {
      timesRun: 0,
      draw: [],
      score: 0,
      euros: 0,
      matchedNumbers: [],
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    },
    auth() {
      return this.$store.getters.getIfIsAuth
    },
    selectedNumbers() {
      return this.$store.getters.getSelectedNumbers
    },
  },
  methods: {
    again() {
      window.location.reload()
    },
    newDraw() {
      this.$router.push('/bet')
    },
  },
  mounted() {
    const interval = setInterval(() => {
      this.timesRun += 1
      if (this.timesRun === 5) {
        clearInterval(interval)
        for (let i = 0; i <= this.draw.length; i++) {
          for (let j = 0; j <= this.draw.length; j++) {
            if (this.selectedNumbers[i] === this.draw[j]) {
              this.matchedNumbers.push(this.draw[j])
              this.score += 1
            }
          }
        }
        Swal.fire({
          title: `You Win ${this.euros} € :) `,
          text: 'Save your Bet',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Save',
        })
        if (this.score >= 2) {
          if (this.score === 2) this.euros = 2.5
          else if (this.score === 3) this.euros = 5
          else if (this.score === 4) this.euros = 10
          else if (this.score === 5) this.euros = 15
          else this.euros = 0

          Swal.fire({
            title: `You Win ${this.euros} € :) `,
            text: 'Save your Bet',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Save',
          }).then(result => {
            if (result.isConfirmed) {
              axios
                .post(
                  'https://lottery-76494-default-rtdb.europe-west1.firebasedatabase.app/draws.json',
                  {
                    user: this.user.email,
                    userBet: this.selectedNumbers,
                    liveBet: this.draw,
                    same: this.matchedNumbers,
                    money: this.euros,
                    score: this.score,
                    drawDate: new Date(Date.now()),
                  }
                )
                .then(() => {
                  Swal.fire({
                    icon: 'success',
                    title: 'Your Bet has been Saved.',
                    showConfirmButton: false,
                    timer: 1500,
                  })
                })
                .catch(err => {
                  Swal.fire({
                    icon: 'error',
                    title: err,
                    showConfirmButton: false,
                    timer: 1500,
                  })
                })
            }
          })
        } else {
          Swal.fire({
            position: 'center',
            title: 'You Lose :( ',
            showConfirmButton: false,
            timer: 1700,
          })
        }
      }
      this.draw.push(Math.floor(Math.random() * 30) + 1)
    }, 3000)
  },
  // beforeRouteLeave() {
  //   if (this.timesRun !== 5) {
  //       return Swal.fire({
  //         position: 'center',
  //         title: 'Please Wait the Draw to finish',
  //         showConfirmButton: false,
  //         timer: 850
  //       })
  //     } else {
  //       return true
  //     }
  // },
}
</script>
