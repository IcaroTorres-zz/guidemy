import Vue from 'vue'
import { User } from '@/models'
import { uniq } from '@/helpers'
export const mutations = {
  saveuser (state, payload) {
    Vue.set(state.users, payload.id, payload)
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
    // console.log(payload, state.users)
    payload.team.forEach(uid => {
      Vue.set(state.users[uid],
        'projects',
        uniq(state.users[uid].projects, payload.id)
      )
    })
  },
  projectToLoggedUser (state, payload) {
    Vue.set(
      state.users[state.loggedUser],
      'projects',
      uniq(state.users[state.loggedUser].projects, payload)
    )
  },
  saveBlock (state, payload) {
    Vue.set(state.blocks, payload.id, { ...payload })
    Vue.set(state.projects[payload.project],
      'blocks',
      uniq(state.projects[payload.project].blocks, payload.id)
    )
  },
  updateBlockText (state, payload) {
    Vue.set(state.blocks[payload.id], 'text', payload.text)
  },
  updateBlockColor (state, payload) {
    Vue.set(state.blocks[payload.id], 'color', payload.color)
  },
  updateBlockPosition (state, { block, movetype }) {
    let project = state.projects[block.project]
    let index = project.blocks.findIndex(b => b === block.id)
    if (movetype === 0) { // move to first
      let swapped = project.blocks.splice(index, 1).join()
      project.blocks.unshift(swapped)
    } else if (movetype === -1) { // move to last
      let swapped = project.blocks.splice(index, 1).join()
      project.blocks.push(swapped)
    } else if (movetype === 1 && index !== 0) { // move backward
      let swapped = project.blocks[index]
      Vue.set(project.blocks, index, project.blocks[index - 1])
      Vue.set(project.blocks, index - 1, swapped)
    } else if (movetype === 2 && index !== project.blocks.length - 1) { // move forward
      let swapped = project.blocks[index]
      Vue.set(project.blocks, index, project.blocks[index + 1])
      Vue.set(project.blocks, index + 1, swapped)
    }
    Vue.set(state.projects[block.project], 'blocks', project.blocks)
  },
  moveTask (state, { tid, bid }) {
    let blocktasks = state.blocks[state.tasks[tid].block].tasks.filter(t => t !== tid)
    Vue.set(state.blocks[state.tasks[tid].block], 'tasks', blocktasks)
    Vue.set(state.tasks[tid], 'block', bid)
    state.blocks[bid].tasks.push(tid)
  },
  saveTask (state, payload) {
    Vue.set(state.tasks, payload.id, { ...payload })
    Vue.set(state.blocks[payload.block],
      'tasks',
      uniq(state.blocks[payload.block].tasks, payload.id)
    )
  },
  saveDaily (state, payload) {
    Vue.set(state.dailyMeetings, payload.id, { ...payload })
    Vue.set(state.projects[payload.project].dailyMeetings,
      payload.assigned,
      uniq(state.projects[payload.project].dailyMeetings[payload.assigned], payload.id)
    )
  },
  invite (state, { pid, uids }) {
    uids.forEach(uid => {
      Vue.set(state.projects[pid],
        'team',
        uniq(state.projects[pid].team, uid)
      )
    })
  },
  toggleArchiving (state, payload) {
    const project = {
      ...state.projects[payload],
      status: Math.abs(state.projects[payload].status - 1),
      archived: new Date()
    }
    Vue.set(state.projects, payload, project)
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
