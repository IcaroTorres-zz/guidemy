import Vue from 'vue'
import { User } from '@/models'
// this.$set(this, '_level', this._level + 1);
export const mutations = {
  signup (state, payload) {
    state.loggedUser = payload.id
    state.users[payload.id] = new User({ ...state.users[payload.id], ...payload })
    return state.users[payload.id]
  },
  signin (state, payload) {
    state.users[payload.id] = new User({ ...state.users[payload.id], ...payload })
    state.loggedUser = payload.id
    return state.users[payload.id]
  },
  logOut (state) {
    Vue.set(state, 'loggedUser', undefined)
  },
  toggleSnack (state, payload) {
    state.snack = {
      message: payload ? payload.message : 'Warning',
      color: payload ? payload.color : 'secondary',
      active: !!payload
    }
    return state.snack
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
    const task = { ...state.tasks[payload], status: 1, finishedAt: new Date() }
    delete state.tasks[payload]
    state.blocks[task.block].tasks.splice(state.blocks[task.block].tasks.findIndex(t => t === task.id), 1)
    state.tasks[payload] = task
    state.blocks[task.block].tasks.push(task.id)
  },
  deleteTask (state, payload) {
    let task = state.tasks[payload]
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
