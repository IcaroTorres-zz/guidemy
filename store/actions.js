import { User } from '@/models'
// import { snack } from '../helpers'
const snackTimeout = 6000
export const actions = {
  signin ({ commit }, payload) {
    commit('signUser', new User(payload))
    commit('toggleSnack', {
      message: `${payload.username} logged`,
      color: 'info'
    })
    setTimeout(() => commit('toggleSnack'), snackTimeout)
  },
  signup ({ commit }, payload) {
    commit('signUser', new User(payload))
    commit('toggleSnack', {
      message: `${payload.username} logged`,
      color: 'info'
    })
    setTimeout(() => commit('toggleSnack'), snackTimeout)
  },
  clearError ({commit}) {
    commit('clearError')
  },
  setError ({commit}, payload) {
    commit('error', payload)
    commit('toggleSnack', {
      message: payload,
      color: 'error'
    })
    setTimeout(() => { commit('toggleSnack') }, snackTimeout)
  },
  setLoading ({commit}, payload = false) {
    commit('setLoading', payload)
  },
  sliceToLoad ({commit}, payload = 6) {
    commit('sliceToLoad', payload)
  },
  toggleLight ({ commit, state }) {
    commit('toggleLight')
    commit('toggleSnack', {
      message: `Lights ${state.lightOut ? 'Off' : 'On'}`,
      color: 'secondary'
    })
    setTimeout(() => { commit('toggleSnack') }, snackTimeout)
  },
  saveProject ({ commit }, payload) {
    commit('saveProject', payload)
    commit('toggleSnack', {
      message: `Project '${payload.title}' saved`,
      color: 'success'
    })
    setTimeout(() => { commit('toggleSnack') }, snackTimeout)
  },
  saveBlock ({ commit }, payload) {
    commit('saveBlock', payload)
    commit('toggleSnack', {
      message: `Block '${payload.text}' saved`,
      color: 'success'
    })
    setTimeout(() => { commit('toggleSnack') }, snackTimeout)
  },
  saveTask ({ commit }, payload) {
    console.log(payload)
    commit('saveTask', payload)
    commit('toggleSnack', {
      message: `task '${payload.title}' saved`,
      color: 'success'
    })
    setTimeout(() => { commit('toggleSnack') }, snackTimeout)
  }
}
