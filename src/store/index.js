import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null,
    authenticated: false,
    betNumbers: null,
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload
    },
    SET_AUTH(state, payload) {
      state.authenticated = payload
    },
    SET_BETNUMBERS(state, payload) {
      state.betNumbers = payload
    },
  },
  actions: {
    setAuth: ({ commit }, payload) => commit('SET_AUTH', payload),
    setUser: ({ commit }, payload) => commit('SET_USER', payload),
    setNumbers: ({ commit }, payload) => commit('SET_BETNUMBERS', payload),
  },
  getters: {
    getUser(state) {
      return state.user
    },
    getIfIsAuth(state) {
      return state.authenticated
    },
    getSelectedNumbers(state) {
      return state.betNumbers
    },
  },
  plugins: [createPersistedState()],
})

export default store
