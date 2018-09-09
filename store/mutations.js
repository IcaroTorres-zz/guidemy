import { User } from '@/models'
export const mutations = {
  signUser (state, payload) {
    console.warn(`User ${payload.username} - ${payload.email}: logged On sucessfully`)
    state.loggedUser = payload.id
    state.users[payload.id] = new User({ ...state.users[payload.id], ...payload })
  },
  toggleSnack (state, payload) {
    state.snack = {
      message: payload ? payload.message : 'Warning',
      color: payload ? payload.color : 'secondary',
      active: !!payload
    }
  },
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
    payload.coworkers.forEach(uid => {
      if (state.users[uid].projects.indexOf(payload.id) === -1) {
        state.users[uid].projects.push(payload.id)
      }
    })
    state.projects[payload.id] = { ...payload }
  },
  saveBlock (state, payload) {
    let idxInProject = state.projects[payload.project].blocks.indexOf(payload.id)
    if (idxInProject === -1) {
      state.projects[payload.project].blocks.push(payload.id)
    } else {
      delete state.projects[payload.project].blocks[idxInProject]
      state.projects[payload.project].blocks[idxInProject] = payload.id
    }

    state.blocks[payload.id] = { ...payload }
  },
  saveTask (state, payload) {
    let idxInUser = state.users[payload.assigned].tasks.indexOf(payload.id)
    if (idxInUser === -1) {
      state.users[payload.assigned].tasks.push(payload.id)
    } else {
      delete state.users[payload.assigned].tasks[idxInUser]
      state.users[payload.assigned].tasks[idxInUser] = payload.id
    }

    let idxInBlock = state.blocks[payload.block].tasks.indexOf(payload.id)
    if (idxInBlock === -1) {
      state.blocks[payload.block].tasks.push(payload.id)
    } else {
      delete state.blocks[payload.block].tasks[idxInBlock]
      state.blocks[payload.block].tasks[idxInBlock] = payload.id
    }

    state.tasks[payload.id] = { ...payload }
  },
  finishTask (state, payload) {
    state.tasks[payload] = { ...state.tasks[payload], status: 1, finishedAt: new Date() }
  },
  deleteTask (state, payload) {
    let task = state.tasks[payload]
    /* needs pairs of model and constructor name
     * to walk through satte properties
     * fixed cause minification modify original constructors names
     */
    state.users[task.assigned].tasks
      .splice(state.users[task.assigned].tasks
        .findIndex(t => t === task.id), 1)

    state.blocks[task.block].tasks
      .splice(state.blocks[task.block].tasks
        .findIndex(t => t === task.id), 1)
    delete state.tasks[payload]
  },
  judgeDaily (state, payload) {
    state.dailyMeetings[payload.id] = { ...state.dailyMeetings[payload.id], ...payload }
  },
  answerDaily (state, payload) {
    state.dailyMeetings[payload.id] = { ...state.dailyMeetings[payload.id], ...payload, status: 1 }
  },
  postComment (state, payload) {
    state.comments[payload.id] = { ...state.comments[payload.id], ...payload }
    state.tasks[payload.at].comments.push(payload.id)
  },
  deleteComment (state, payload) {
    let comment = state.comments[payload]
    state.tasks[comment.at].comments
      .splice(state.tasks[comment.at].comments
        .findIndex(cm => cm === payload), 1)
    delete state.comments[payload]
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
