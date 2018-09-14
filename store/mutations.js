import Vue from 'vue'
import { User } from '@/models'
export const mutations = {
  generateusers (state, payload) {
    Vue.set(state, 'users', {
      ...state.users, ...payload
    })
  },
  generateProjectBlocks (state, payload) {
    payload.forEach(block => {
      Vue.set(state.blocks, block.id, block)
    })
  },
  generateProjectDailies (state, payload) {
    Vue.set(state, 'dailyMeetings', {
      ...state.dailyMeetings,
      ...payload.reduce((mapState, daily) => {
        mapState[daily.id] = daily
        return mapState
      }, {})
    })
  },
  generateprojects (state, payload) {
    Object.entries(payload).forEach(([key, val]) => {
      Vue.set(state.projects, key, { ...val })
    })
    // Vue.set(state, 'projects', {
    //   ...state.projects,
    //   ...payload
    // })
  },
  signuser (state, payload) {
    Vue.set(state, 'loggedUser', payload.id)
    Vue.set(state.users, payload.id, new User({ ...state.users[payload.id], ...payload }))
  },
  logOut (state) {
    Vue.set(state, 'loggedUser', undefined)
  },
  toggleSnack (state, payload) {
    if (state.snackbar && state.snackbar.active) Vue.set(state.snackbar, 'active', false)
    Vue.set(state, 'snack', {
      message: payload ? payload.message : 'Warning',
      color: payload ? payload.color : 'secondary',
      active: !!payload
    })
  },
  toggleMini (state) {
    Vue.set(state, 'mini', !state.mini)
  },
  toggleSidebar (state) {
    Vue.set(state, 'sidebar', !state.sidebar)
  },
  toggleLight (state) {
    Vue.set(state, 'lightOut', !state.lightOut)
  },
  saveProject (state, payload) {
    Vue.set(state.projects, payload.id, { ...payload })
    payload.team.forEach(uid => {
      if (state.users[uid].projects.indexOf(payload.id) === -1) {
        state.users[uid].projects.push(payload.id)
      }

      Vue.set(state.users[uid].dailyMeetings, payload.id, [])
      Vue.set(state.projects[payload.id].dailyMeetings, uid, [])
    })
  },
  saveBlock (state, payload) {
    let idx = state.projects[payload.project].blocks.indexOf(payload.id)
    if (idx === -1) {
      state.projects[payload.project].blocks.push(payload.id)
    }

    Vue.set(state.blocks, payload.id, { ...payload })
  },
  moveTask(state, { tid, bid }) {
    let removePosix = state.blocks[bid].tasks.indexOf(tid)
    if (removePosix !== 0)state.blocks[bid].tasks.splice(removePosix, 1)
    Vue.set(state.tasks[tid], 'block', bid)
    Vue.set(state.tasks[tid], 'block', bid)
  },
  saveTask (state, payload) {
    let idxInBlock = state.blocks[payload.block].tasks.indexOf(payload.id)
    if (idxInBlock === -1) {
      state.blocks[payload.block].tasks.push(payload.id)
    }

    Vue.set(state.tasks, payload.id, { ...payload })
  },
  toggleTask (state, payload) {
    const task = {
      ...state.tasks[payload],
      status: Math.abs(state.tasks[payload].status - 1),
      finished: new Date()
    }
    Vue.set(state.tasks, payload, task)
  },
  deleteTask (state, payload) {
    let task = state.tasks[payload]
    state.users[task.assigned].tasks
      .splice(state.users[task.assigned].tasks
        .findIndex(t => t === task.id), 1)

    state.blocks[task.block].tasks
      .splice(state.blocks[task.block].tasks
        .findIndex(t => t === task.id), 1)

    Vue.set(state.tasks, payload, undefined)
    // delete state.tasks[payload]
  },
  judgeDaily (state, payload) {
    Vue.set(state.dailyMeetings, payload.id, { ...state.dailyMeetings[payload.id], ...payload })
  },
  answerDaily (state, payload) {
    Vue.set(state.dailyMeetings, payload.id, { ...state.dailyMeetings[payload.id], ...payload, status: 1 })
  },
  postComment (state, payload) {
    state.tasks[payload.at].comments.push(payload.id)
    Vue.set(state.comments, payload.id, { ...state.comments[payload.id], ...payload })
  },
  deleteComment (state, payload) {
    let comment = state.comments[payload]
    state.tasks[comment.at].comments
      .splice(state.tasks[comment.at].comments
        .findIndex(cm => cm === payload), 1)
    Vue.set(state.comments, payload, undefined)
    // delete state.comments[payload]
  },
  setError (state, payload) {
    Vue.set(state, 'appError', payload)
  },
  clearError (state) {
    Vue.set(state, 'appError', undefined)
  },
  setLoading (state, payload = false) {
    Vue.set(state, 'appLoading', payload)
  }
}
