import { User, Project, Block } from '@/models'
import userbase from '@/helpers/userbase'
import {
  loremTitle, loremDescription, userProjectDailies, defaultBlockSetup
} from '@/helpers'

const snackTimeout = 6000
const dailyResult = { 0: 'pending', 1: 'accepted', '-1': 'rejected' }
export const actions = {
  fetchAppData ({ dispatch, commit }) {
    commit('setLoading', true)
    dispatch('generateusers')
      .then((newUsers) => dispatch('generateprojects', newUsers))
      .then((newProjects) => {
        console.log(newProjects, 'generateprojects promise data')
        commit('setLoading', false)
        commit('toggleSnack', {
          message: `What can I say, except "You're Welcome!" ?`,
          color: 'success'
        })
        setTimeout(() => commit('toggleSnack'), snackTimeout)
        return newProjects
      }).catch(e => {
        commit('setLoading', false)
        console.warn(e.message)
        commit('setError', e.message)
        commit('toggleSnack', {
          message: `Opps, placeholder data fails...!`,
          color: 'error'
        })
        setTimeout(() => commit('toggleSnack'), snackTimeout)
      })
  },
  generateusers ({ commit }) {
    const myCustomUsers = userbase.results
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
              .slice(1)
              .join(' ')
          })
        }
      ), {})
    commit('generateusers', myCustomUsers)
    return myCustomUsers
  },
  generateprojects ({ state, dispatch, commit }, usersState) {
    const projectsState = {}
    for (let i = 0; i < 10; i++) {
      const tempUsers = Object.values(usersState || state.users)
      let projectTeam = []
      let teamsize = Math.round(Math.random() * (tempUsers.length / 50))
      for (let j = 0; j < teamsize; j++) {
        let chosenIndex = Math.round(Math.random() * (tempUsers.length - 1))
        let insertId = tempUsers[chosenIndex].id
        if (projectTeam.indexOf(insertId) === -1) {
          projectTeam.push(insertId)
        } else {
          j -= 1
        }
      }
      const projectId = 'pjt' + Math.random().toFixed(4).toString() + '-' +
        Math.random().toFixed(3).toString() + '-' +
        Math.random().toFixed(5).toString() + '-' + 'bls'
      let flatenDailies = []
      let projectDailies = projectTeam
        .reduce((pDailies, uid) => {
          pDailies[uid] = userProjectDailies(projectId, uid, state.loggedUser)
          flatenDailies.concat(pDailies)
          // console.log(pDailies[uid], uid, 'dailies aplyied to user')
          return pDailies
        }, {})
      let projectBlocks = defaultBlockSetup.map(b => new Block({
        ...b, project: projectId
      }))
      const newProject = new Project({
        id: projectId,
        title: loremTitle(),
        description: loremDescription(),
        creator: state.loggedUser,
        manager: state.loggedUser,
        team: projectTeam,
        blocks: projectBlocks.map(b => b.id),
        dailyMeetings: {}
      })
      Object.entries(projectDailies).forEach(([key, val]) => {
        newProject.dailyMeetings[key] = val.map(dl => dl.id)
      })
      // console.log('new blocks', projectBlocks)
      commit('generateProjectBlocks', projectBlocks)
      // console.log(projectDailies, 'generateProjectDailies')
      commit('generateProjectDailies', flatenDailies)
      // console.log(newProject, 'project created before commit')
      projectsState[projectId] = newProject
    }
    // console.log(projectsState, 'generateprojects')
    commit('generateprojects', projectsState)
    return projectsState
  },
  signin ({ commit, getters }, payload) {
    const userFound = getters.userByName(payload.username)
    if (userFound) {
      const userSent = new User({ ...payload, ...userFound })
      commit('signuser', userSent)
      // commit('toggleSnack', {
      //   message: `${payload.username} logged`,
      //   color: 'info'
      // })
      // setTimeout(() => commit('toggleSnack'), snackTimeout)
      return userSent
    }
    const error = new Error('Invalid E-mail or Username!!')
    commit('setError', error)
    return error
  },
  signup ({ commit }, payload) {
    const userSent = new User(payload)
    commit('signuser', userSent)
    // commit('toggleSnack', {
    //   message: `${payload.username} logged`,
    //   color: 'info'
    // })
    // setTimeout(() => commit('toggleSnack'), snackTimeout)
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
  toggleTask ({ commit, state }, payload) {
    let tasktitle = state.tasks[payload].title
    let taskstatus = state.tasks[payload].status ? 're-opened' : 'finished'
    commit('toggleTask', payload)
    commit('toggleSnack', {
      message: `task '${tasktitle}' ${taskstatus}.`,
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
