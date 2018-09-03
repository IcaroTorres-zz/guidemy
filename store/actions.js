export const actions = {
  clearError ({commit}) {
    commit('clearError')
  },
  setError ({commit}, payload) {
    commit('error', payload)
  },
  setLoading ({commit}, payload = false) {
    commit('setLoading', payload)
  },
  sliceToLoad ({commit}, payload = 6) {
    commit('sliceToLoad', payload)
  },
  toggleLight ({ commit }) {
    commit('toggleLight')
  },
  saveProject ({ commit }, payload) {
    commit('saveProject', payload)
  },
  saveBlock ({ commit }, payload) {
    commit('saveBlock', payload)
  },
  saveTask ({ commit }, payload) {
    commit('saveTask', payload)
  }
}
