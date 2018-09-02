export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  },
  toggleLight (state) {
    state.lightOut = !state.lightOut
  },
  addBlock (state, payload) {
    state.blocks[payload.id] = payload
    state.projects[payload.project].blocks.push(payload.id)
  },
  addTask (state, payload) {
    state.tasks[payload.id] = payload
    // add task ref to assigned user
    state.users[payload.assigned].tasks.push(payload.id)
    // add task ref to block user
    state.blocks[payload.block].tasks.push(payload.id)
  }
}
