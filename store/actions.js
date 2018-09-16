import { User, Project, Block, Task, uidGen } from '@/models'
import userbase from '@/helpers/userbase'
import {
  uniq,
  loremLittle,
  loremTitle,
  loremDescription,
  userProjectDailies,
  defaultBlockSetup,
  dateConfig,
  randomInRange
} from '@/helpers'

const snackTimeout = 6000
const dailyResult = { 0: 'pending', 1: 'accepted', '-1': 'rejected' }
export const actions = {
  generateData ({ state, commit }) {
    commit('setLoading', true)
    const tempUsers = userbase.results.map(u => {
      const newUser = {
        ...new User({
          id: u.login.uuid,
          email: u.email,
          picture: u.picture.large,
          username: u.login.username,
          displayName: Object.values(u.name)
            .map(namepart => namepart.charAt(0).toUpperCase() + namepart.substr(1))
            .slice(1)
            .join(' ')
        })
      }
      commit('saveuser', newUser)
      return newUser
    })
    for (let i = 0; i < 11; i++) {
      let projectTeam = []
      let teamsize = randomInRange(1, 5)
      for (let j = 0; j < teamsize; j++) {
        let chosenIndex = Math.floor(Math.random() * tempUsers.length)
        let insertId = tempUsers[chosenIndex].id
        projectTeam = uniq(projectTeam, insertId)
      }
      const pid = '-p_' + uidGen()
      const newProject = new Project({
        id: pid,
        title: loremTitle(),
        description: loremDescription(),
        creator: state.loggedUser,
        manager: state.loggedUser,
        team: projectTeam
      })
      commit('saveProject', newProject)
      const projectBlocks = defaultBlockSetup.map(b => {
        const newBlock = new Block({
          ...b, project: pid
        })
        commit('saveBlock', newBlock)
        return newBlock
      })
      commit('projectToLoggedUser', pid)
      projectTeam.forEach(uid => {
        // dailies creation
        userProjectDailies(pid, uid, state.loggedUser)
          .forEach(daily => {
            commit('saveDaily', daily)
          })
        // task creation
        for (let j = 0; j < randomInRange(5, 10); j++) {
          let bid = projectBlocks[Math.floor(Math.random() * projectBlocks.length)].id
          const newTask = new Task({
            creator: Math.random() > 0.30 ? state.loggedUser : uid,
            assigned: uid,
            block: bid,
            title: loremLittle(),
            description: loremDescription(),
            ...dateConfig('2018-08-15')
          })
          commit('saveTask', { ...newTask })
        }
      })
    }
    commit('setLoading', false)
    return state
  },
  fetchAppData ({ dispatch, commit, state }) {
    return dispatch('generateData')
      .then(newState => {
        commit('setLoading', false)
        commit('toggleSnack', {
          message: `What can I say, except "You're Welcome!" ?`,
          color: 'success'
        })
        setTimeout(() => commit('toggleSnack'), snackTimeout)
        return newState || state
      }).catch(e => {
        commit('setLoading', false)
        console.warn(e.message)
        commit('setError', e.message)
        commit('toggleSnack', {
          message: `Opps, something wrong with data placeholder...!`,
          color: 'error'
        })
        setTimeout(() => commit('toggleSnack'), snackTimeout)
      })
  },
  signin ({ commit, getters, dispatch }, payload) {
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
  signup ({ commit, dispatch }, payload) {
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
  moveTask ({ commit }, payload) {
    commit('moveTask', payload)
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
  updateBlockText ({ commit, state }, payload) {
    commit('updateBlockText', payload)
    commit('toggleSnack', {
      message: 'block updated'
    })
    setTimeout(() => { commit('toggleSnack') }, snackTimeout)
    return state.blocks[payload.id]
  },
  updateBlockPosition ({ commit, state }, {block, movetype}) {
    commit('updateBlockPosition', {block, movetype})
    commit('toggleSnack', {
      message: 'block updated'
    })
    setTimeout(() => { commit('toggleSnack') }, snackTimeout)
    return state.blocks[block.id]
  },
  saveTask ({ commit }, payload) {
    // console.log(payload)
    commit('saveTask', payload)
    commit('toggleSnack', {
      message: `task '${payload.title}' saved`,
      color: 'success'
    })
    setTimeout(() => { commit('toggleSnack') }, snackTimeout)
  },
  invite ({ commit, state }, { pid, uids }) {
    commit('invite', {pid: pid, uids: uids})
    commit('toggleSnack', {
      message: `invitation sent`
    })
    return uids.map(id => state.users[id])
    // new Promise(resolve => resolve(setTimeout(() => { commit('toggleSnack') }, snackTimeout)))
    //   .then(() => dispatch('inviteResponse'))
  },
  // inviteResponse ({ state, commit }, uid) {
  //   commit('toggleSnack', {
  //     message: `'${state.users[uid].username}' joined project`,
  //     color: 'success'
  //   })
  //   setTimeout(() => { commit('toggleSnack') }, snackTimeout)
  // },
  toggleArchiving ({ commit, state }, pid) {
    let status = state.projects[pid].status === 1 ? 're-opened' : 'archived'
    commit('toggleArchiving', pid)
    commit('toggleSnack', {
      message: `project ${status}.`,
      color: 'success'
    })
    setTimeout(() => { commit('toggleSnack') }, snackTimeout)
    return pid
  },
  toggleTask ({ commit, state }, payload) {
    let taskstatus = state.tasks[payload].status ? 're-opened' : 'finished'
    commit('toggleTask', payload)
    commit('toggleSnack', {
      message: `task ${taskstatus}.`,
      color: 'success'
    })
    setTimeout(() => { commit('toggleSnack') }, snackTimeout)
    return payload
  },
  deleteTask ({ commit, state }, payload) {
    commit('deleteTask', payload)
    commit('toggleSnack', {
      message: `task deleted.`,
      color: 'warning'
    })
    setTimeout(() => { commit('toggleSnack') }, snackTimeout)
    return payload
  },
  postComment ({ commit }, payload) {
    commit('postComment', payload)
    commit('toggleSnack', {
      message: `comment posted.`
    })
    setTimeout(() => { commit('toggleSnack') }, snackTimeout)
    return payload
  },
  deleteComment ({ commit }, payload) {
    commit('deleteComment', payload)
    commit('toggleSnack', {
      message: `comment deleted.`
    })
    setTimeout(() => { commit('toggleSnack') }, snackTimeout)
    return payload
  },
  answerDaily ({ commit }, payload) {
    commit('answerDaily', payload)
    commit('toggleSnack', {
      message: `daily meeting submitted.`,
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
