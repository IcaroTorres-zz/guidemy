import { User, Task, Block } from '../models'
import { spliceInManyStates } from '../helpers'
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
    state.projects[payload.id] = { ...payload }
    payload.coworkers.forEach(uid => {
      if (state.users[uid].projects.indexOf(payload.id) === -1) {
        state.users[uid].projects.push(payload.id)
      }
    })
  },
  saveBlock (state, payload) {
    state.blocks[payload.id] = { ...payload }
    if (state.projects[payload.project].blocks.indexOf(payload.id) === -1) {
      state.projects[payload.project].blocks.push(payload.id)
    }
  },
  saveTask (state, payload) {
    state.tasks[payload.id] = { ...payload }
    // add task ref to assigned user
    if (state.users[payload.assigned].tasks.indexOf(payload.id) === -1) {
      state.users[payload.assigned].tasks.push(payload.id)
    }
    // add task ref to block user
    if (state.blocks[payload.block].tasks.indexOf(payload.id) === -1) {
      state.blocks[payload.block].tasks.push(payload.id)
    }
  },
  finishTask (state, payload) {
    state.tasks[payload] = { ...state.tasks[payload], status: 1, finishedAt: new Date() }
  },
  deleteTask (state, payload) {
    let task = new Task(state.tasks[payload])
    // needs objects with custom constructors
    // to walk through satte properties
    spliceInManyStates(
      [
        new User(state.users[task.creator]),
        new Block(state.blocks[task.block])
      ], task, state)

    delete state.tasks[payload]
  },
  judgeDaily (state, payload) {
    state.dailyMeetings[payload.id].status = payload.status
    console.log(state.dailyMeetings[payload.id])
  },
  answerDaily (state, payload) {
    state.dailyMeetings[payload.id] = { ...state.dailyMeetings[payload.id], ...payload, status: 1 }
    console.log(state.dailyMeetings[payload.id])
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
