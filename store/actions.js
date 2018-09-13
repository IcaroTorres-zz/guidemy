import { User } from '@/models'
import axios from 'axios'

const snackTimeout = 6000
const dailyResult = { 0: 'pending', 1: 'accepted', '-1': 'rejected' }
export const actions = {
  fetchAppData ({ dispatch, commit }) {
    dispatch('generateusers', 30).then(newUsers => {
      return dispatch('generateProjects', newUsers)
    }).then(data => console.log(data))
      .catch(e => {
        commit('setError', e.message)
      })
  },
  generateusers: async function ({ commit, state }, usercount) {
    return axios
      .get(`https://randomuser.me/api/?results=${usercount}&nat=BR&inc=name,email,picture,login`)
      .then(jsonUsers => {
        commit('setLoading', true)
        const myCustomUsers = jsonUsers.data.results
          .reduce((usersState, u) => Object.assign(
            {},
            {
              ...usersState,
              [u.login.uuid]: new User({
                id: u.login.uuid,
                email: u.email,
                picture: u.picture.medium,
                username: u.login.username,
                displayName: Object.values(u.name)
                  .map(namepart => namepart.charAt(0).toUpperCase() + namepart.substr(1))
                  .join(' ')
              })
            }
          ), {})

        console.log(myCustomUsers)
        commit('generateusers', myCustomUsers)
        commit('toggleSnack', {
          message: `Dummy users generated. Enjoy!`,
          color: 'info'
        })
        setTimeout(() => commit('toggleSnack'), snackTimeout)
        commit('setLoading', false)
      })
      .catch(e => {
        console.log(e.message)
        commit('setError', e.message)
        commit('toggleSnack', {
          message: 'Fail to load dummy users',
          color: 'error'
        })
        setTimeout(() => commit('toggleSnack'), snackTimeout)
        commit('setLoading', false)
      })
      .then(() => state.users)
  },
  loremIpsum: async function () {
    return axios.get('http://loripsum.net/api/1/medium/prude/plaintext')
  },
  signin ({ commit, getters }, payload) {
    const userFound = getters.userByName(payload.username)
    if (userFound) {
      const userSent = new User({ ...payload, ...userFound })
      commit('signuser', userSent)
      commit('toggleSnack', {
        message: `${payload.username} logged`,
        color: 'info'
      })
      setTimeout(() => commit('toggleSnack'), snackTimeout)
      return userSent
    }
    const error = new Error('Invalid E-mail or Username!!')
    commit('setError', error)
    return error
  },
  signup ({ commit }, payload) {
    const userSent = new User(payload)
    commit('signuser', userSent)
    commit('toggleSnack', {
      message: `${payload.username} logged`,
      color: 'info'
    })
    setTimeout(() => commit('toggleSnack'), snackTimeout)
    return userSent
  },
  logOut ({ commit, getters }) {
    const userLogout = getters.loggedUserObj.username
    commit('logOut')
    commit('toggleSnack', {
      message: `${userLogout} loggOut!`
    })
    setTimeout(() => commit('toggleSnack'), snackTimeout)
  },
  clearError ({ commit }) {
    commit('clearError')
  },
  setError ({ commit }, payload) {
    commit('error', payload)
    commit('toggleSnack', {
      message: payload,
      color: 'error'
    })
    setTimeout(() => { commit('toggleSnack') }, snackTimeout)
  },
  setLoading ({ commit }, payload = false) {
    commit('setLoading', payload)
  },
  sliceToLoad ({ commit }, payload = 6) {
    commit('sliceToLoad', payload)
  },
  toggleLight ({ commit, state }) {
    commit('toggleLight')
    commit('toggleSnack', {
      message: `Lights ${state.lightOut ? 'Off' : 'On'}`,
      color: 'secondary'
    })
    setTimeout(() => { commit('toggleSnack') }, snackTimeout)
  },
  saveProject ({ commit }, payload) {
    commit('saveProject', payload)
    commit('toggleSnack', {
      message: `Project '${payload.title}' saved`,
      color: 'success'
    })
    setTimeout(() => { commit('toggleSnack') }, snackTimeout)
  },
  saveBlock ({ commit }, payload) {
    commit('saveBlock', payload)
    commit('toggleSnack', {
      message: `Block '${payload.text}' saved`,
      color: 'success'
    })
    setTimeout(() => { commit('toggleSnack') }, snackTimeout)
  },
  saveTask ({ commit }, payload) {
    console.log(payload)
    commit('saveTask', payload)
    commit('toggleSnack', {
      message: `task '${payload.title}' saved`,
      color: 'success'
    })
    setTimeout(() => { commit('toggleSnack') }, snackTimeout)
  },
  finishTask ({ commit, state }, payload) {
    let tasktitle = state.tasks[payload].title
    commit('finishTask', payload)
    commit('toggleSnack', {
      message: `task '${tasktitle}' finished.`,
      color: 'success'
    })
    setTimeout(() => { commit('toggleSnack') }, snackTimeout)
    return payload
  },
  deleteTask ({ commit, state }, payload) {
    const tasktitle = state.tasks[payload].title
    commit('deleteTask', payload)
    commit('toggleSnack', {
      message: `task '${tasktitle}' deleted.`,
      color: 'warning'
    })
    setTimeout(() => { commit('toggleSnack') }, snackTimeout)
    return payload
  },
  postComment ({ commit, state }, payload) {
    commit('postComment', payload)
    commit('toggleSnack', {
      message: `comment posted at ${state.tasks[payload.at].title}.`
    })
    setTimeout(() => { commit('toggleSnack') }, snackTimeout)
    return payload
  },
  deleteComment ({ commit, state }, payload) {
    const tasktitle = state.tasks[state.comments[payload].at].title
    commit('deleteComment', payload)
    commit('toggleSnack', {
      message: `comment deleted from ${tasktitle}.`
    })
    setTimeout(() => { commit('toggleSnack') }, snackTimeout)
    return payload
  },
  answerDaily ({ commit, state }, payload) {
    commit('answerDaily', payload)
    commit('toggleSnack', {
      message: `daily meeting for ${state.projects[payload.project].title} submitted.`,
      color: 'success'
    })
    setTimeout(() => { commit('toggleSnack') }, snackTimeout)
    return payload
  },
  judgeDaily ({ commit, state }, payload) {
    const daily = state.dailyMeetings[payload.id]
    const dailyAssigned = state.users[daily.assigned].username
    commit('judgeDaily', payload)
    commit('toggleSnack', {
      message: `${dailyAssigned}'s daily meeting judged as ${dailyResult[payload.status]}.`,
      color: payload.status === 1 ? 'success' : payload.status === 0 ? 'warning' : 'error'
    })
    setTimeout(() => { commit('toggleSnack') }, snackTimeout)
    return payload
  }
}
