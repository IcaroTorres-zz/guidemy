export const mutations = {
  toggleMini (state) {
    state.mini = !state.mini
  },
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  },
  toggleLight (state) {
    state.lightOut = !state.lightOut
  },
  saveProject (state, payload) {
    if (!payload.id) payload.id = 'p' + Date.now().toString()

    state.projects[payload.id] = payload
    payload.coworkers.forEach(uid => {
      if (state.users[uid].projects.indexOf(payload.id) === -1) {
        state.users[uid].projects.push(payload.id)
      }

      state.users[uid].projects = Array.from(new Set(state.users[uid].projects.concat([payload.id])))
    })
  },
  saveBlock (state, payload) {
    if (!payload.id) payload.id = 'b' + Date.now().toString()

    state.blocks[payload.id] = payload
    if (state.projects[payload.project].blocks.indexOf(payload.id) === -1) {
      state.projects[payload.project].blocks.push(payload.id)
    }
  },
  saveTask (state, payload) {
    if (!payload.id) payload.id = 't' + Date.now().toString()

    state.tasks[payload.id] = payload
    // add task ref to assigned user
    if (state.users[payload.assigned].tasks.indexOf(payload.id) === -1) {
      state.users[payload.assigned].tasks.push(payload.id)
    }
    // add task ref to block user
    if (state.blocks[payload.block].tasks.indexOf(payload.id) === -1) {
      state.blocks[payload.block].tasks.push(payload.id)
    }
    state.blocks[payload.block].tasks.push(payload.id)
  },
  setError (state, payload) {
    state.appError = payload
  },
  clearError (state) {
    state.appError = undefined
  },
  setLoading (state, payload = false) {
    state.appLoading = payload
  }
}
