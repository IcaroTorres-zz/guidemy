export const actions = {
  clearError ({commit}) {
    commit('clearError')
  },
  error ({commit}, payload) {
    commit('error', payload)
  },
  sliceToLoad ({commit}, payload = 6) {
    commit('sliceToLoad', payload)
  },
  toggleLight ({ commit }) {
    commit('toggleLight')
  },
  addBlock ({ commit }, payload) {
    commit('addBlock', payload)
  },
  addTask ({ commit }, payload) {
    commit('addTask', payload)
  }
}
