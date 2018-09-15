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
      ...state.dailyMeetings, ...payload
    })
    // console.log(state.dailyMeetings, 'pos commmit project dailies')
  },
  generateprojects (state, payload) {
    Vue.set(state, 'projects', {
      ...state.projects,
      ...payload
    })
    // console.log(state.projects, 'pos generated project commit')
  },
  pushProjectInUser (state, { pid, uid }) {
    console.log('pushProjectin user mutation user', state.users[uid])
    if (state.users[uid]) {
      Vue.set(state.users[uid], 'projects', [...(state.users[uid].projects || []), pid])
    }
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
      Vue.set(state.users[uid], 'projects', [
        ...(state.users[uid].projects || []), payload.id
      ])
      Vue.set(state.projects[payload.id].dailyMeetings, uid, [])
    })
  },
  saveBlock (state, payload) {
    Vue.set(state.projects[payload.project], 'blocks', [
      ...(state.projects[payload.project].blocks || []), payload.id
    ])
    Vue.set(state.blocks, payload.id, { ...payload })
  },
  moveTask (state, { tid, bid }) {
    Vue.set(state.blocks[bid], 'tasks', state.blocks[bid].tasks.filter(t => t.id !== tid))
    Vue.set(state.tasks[tid], 'block', bid)
    state.blocks[bid].tasks.push(tid)
  },
  saveTask (state, payload) {
    console.log('on saveask mutation')
    console.log(payload)
    console.log(state.blocks[payload.block])
    // console.log(payload.block)
    // console.log(state.blocks[payload.block])

    Vue.set(state.blocks[payload.block], 'tasks', [...(state.blocks[payload.block].tasks || []), payload.id])
    Vue.set(state.tasks, payload.id, { ...payload })
  },
  invite (state, { pid, uids }) {
    uids.forEach(uid => {
      Vue.set(state.projects[pid], 'team', [
        ...(state.projects[pid].team || []), uid
      ])
    })
  },
  toggleArchiving (state, payload) {
    const project = {
      ...state.projects[payload],
      status: Math.abs(state.projects[payload].status - 1),
      archived: new Date()
    }
    Vue.set(state.tasks, payload, project)
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
    state.blocks[task.block].tasks
      .splice(state.blocks[task.block].tasks
        .findIndex(t => t === task.id), 1)

    Vue.set(state.tasks, payload, undefined)
    // delete state.tasks[payload]
  },
  judgeDaily (state, payload) {
    Vue.set(state.dailyMeetings, payload.id, {
      ...state.dailyMeetings[payload.id],
      ...payload
    })
  },
  answerDaily (state, payload) {
    Vue.set(state.dailyMeetings, payload.id, {
      ...state.dailyMeetings[payload.id],
      ...payload,
      status: 1
    })
  },
  postComment (state, payload) {
    state.tasks[payload.at].comments.push(payload.id)
    Vue.set(state.comments, payload.id, {
      ...state.comments[payload.id],
      ...payload
    })
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
