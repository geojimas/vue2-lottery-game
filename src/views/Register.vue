<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-100 animate__animated animate__fadeIn"
  >
    <div
      class="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md"
    >
      <div class="font-medium self-center text-xl sm:text-3xl text-gray-800">Register</div>

      <div class="mt-10 w-12/12">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(register)">
            <div class="flex flex-col mb-7">
              <label for="email" class="font-bold mb-1 tracking-wide text-gray-600">Email:</label>
              <div class="relative">
                <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                  <input
                    v-model="user.email"
                    id="email"
                    type="email"
                    name="email"
                    class="text-sm placeholder-gray-500 p-4 rounded-xl border-2 border-black w-full py-2 focus:outline-none focus:border-blue-600"
                    placeholder="Enter your email"
                  />
                  <p class="mt-2 ml-3 text-red-500 underline">{{ errors[0] }}</p>
                </ValidationProvider>
              </div>
            </div>
            <div class="flex flex-col mb-6">
              <label for="password" class="font-bold mb-1 sm:text-sm tracking-wide text-gray-600"
                >Password:</label
              >
              <div class="relative">
                <ValidationProvider name="password" rules="required" v-slot="{ errors }">
                  <input
                    v-model="user.password"
                    id="password"
                    type="password"
                    name="password"
                    class="text-sm placeholder-gray-500 p-4 rounded-xl border-2 border-black w-full py-2 focus:outline-none focus:border-blue-600"
                    placeholder="Enter your password"
                  />
                  <h1 class="mt-2 ml-2 text-red-500 underline">{{ errors[0] }}</h1>
                </ValidationProvider>
              </div>
            </div>

            <div class="flex w-full">
              <button
                type="submit"
                class="flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-500 hover:bg-blue-600 rounded-2xl py-2 w-full transition duration-150 ease-in"
              >
                <span class="mr-2 uppercase">Register</span>
                <span>
                  <svg
                    class="h-6 w-6"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </button>
            </div>
            <div>
              <div class="flex justify-center items-center mt-6">
                <span class="ml-2"
                  >Already have an Account ?
                  <router-link to="/login" class="ml-2 text-blue-500 font-semibold hover:underline"
                    >Login</router-link
                  ></span
                >
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Register2',
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    register() {
      axios
        .post(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDRRNETurSnjMHKOSutDtYiVLz8jM7AkqM',
          {
            email: this.user.email,
            password: this.user.password,
            returnSecureToken: true,
          }
        )
        .then(response => {
          this.$store.dispatch('setUser', response.data)
          this.$store.dispatch('setAuth', true)

          this.$router.push('/')
        })
        .catch(error => {
          alert(error.response.data.error.message)
        })
    },
  },
}
</script>
