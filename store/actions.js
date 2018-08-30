export const actions = {
  clearError ({commit}) {
    commit('clearError')
  },
  error ({commit}, payload) {
    commit('error', payload)
  },
  sliceToLoad ({commit}, payload = 6) {
    commit('sliceToLoad', payload)
  }
}
