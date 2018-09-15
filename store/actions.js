import { User, Project, Block, Task } from '@/models'
import userbase from '@/helpers/userbase-250'
import {
  loremLittle, loremTitle, loremDescription, userProjectDailies, defaultBlockSetup, dateConfig, randomInRange
} from '@/helpers'

const snackTimeout = 6000
const dailyResult = { 0: 'pending', 1: 'accepted', '-1': 'rejected' }
export const actions = {
  fetchAppData ({ dispatch, commit }, userlogin) {
    commit('setLoading', true)
    dispatch('generateusers')
      .then(newUsers => dispatch('generateprojects', userlogin))
      .then(newProjects => dispatch('generatetasks', newProjects))
      .then(taskState => {
        console.log(taskState, 'generatedtasks promise data')
        commit('setLoading', false)
        commit('toggleSnack', {
          message: `What can I say, except "You're Welcome!" ?`,
          color: 'success'
        })
        setTimeout(() => commit('toggleSnack'), snackTimeout)
        return taskState
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
  generateusers ({ commit }) {
    commit('setLoading', true)
    const myCustomUsers = userbase.results
      .reduce((usersState, u) => Object.assign(
        {},
        {
          ...usersState,
          [u.login.uuid]: {
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
        }
      ), {})
    commit('generateusers', myCustomUsers)
    commit('setLoading', false)
    return myCustomUsers
  },
  generateprojects ({ state, dispatch, commit }, userlogin) {
    commit('setLoading', true)
    const projectsState = {}
    for (let i = 0; i < 11; i++) {
      const tempUsers = Object.values(state.users)
      let projectTeam = []
      let teamsize = randomInRange(3, 8)
      for (let j = 0; j < teamsize; j++) {
        let chosenIndex = Math.floor(Math.random() * tempUsers.length)
        let insertId = tempUsers[chosenIndex].id
        console.log('for loop team assignment', chosenIndex, insertId)
        if (state.users[insertId]) {
          projectTeam = [...projectTeam, insertId]
          console.log('team uids', projectTeam)
        }
      }
      const projectId = 'pjt' + Math.random().toFixed(4).toString() + '-' +
        (Math.random() * 2).toFixed(3).toString() + '-' +
        (Math.random() * 3).toFixed(5).toString() + '-' + 'bls'
      let dailiesAsObj = {}
      let projectDailies = projectTeam
        .filter(uid => state.users[uid])
        .reduce((pDailies, uid) => {
          let userDailies = userProjectDailies(projectId, uid, state.loggedUser)
          pDailies[uid] = userDailies.map(d => {
            dailiesAsObj[d.id] = d
            return d.id
          })
          commit('pushProjectInUser', { uid: uid, pid: projectId })
          console.log('bind for assigned')
          return pDailies
        }, {})

      let projectBlocks = defaultBlockSetup.map(b => new Block({
        ...b, project: projectId
      }))
      const newProject = new Project({
        id: projectId,
        title: loremTitle(),
        description: loremDescription(),
        creator: userlogin,
        manager: userlogin,
        team: projectTeam,
        blocks: projectBlocks.map(b => b.id),
        dailyMeetings: projectDailies
      })
      commit('generateProjectBlocks', projectBlocks)
      // console.log(projectDailies, 'generateProjectDailies')
      commit('generateProjectDailies', dailiesAsObj)
      // console.log(newProject, 'project created before commit')
      commit('pushProjectInUser', { uid: userlogin, pid: projectId })
      projectsState[projectId] = { ...newProject }
    }
    // console.log(projectsState, 'generateprojects')
    commit('generateprojects', projectsState)
    commit('setLoading', false)
    return projectsState
  },
  generatetasks ({ commit, state }, projectsState) {
    commit('setLoading', true)
    let tempProjects = { ...projectsState, ...state.projects }
    for (let pid in tempProjects) {
      let { team, blocks } = tempProjects[pid]
      if (blocks.length === 0) break
      team.forEach(uid => {
        let taskcount = randomInRange(5, 15)
        for (let j = 0; j < taskcount; j++) {
          let bid = blocks[Math.floor(Math.random() * blocks.length)]
          // console.log(`ids used on task creation pid:${pid} uid:${uid} bid:${bid} loggedUser: ${state.loggedUser}`)
          const newTask = new Task({
            creator: Math.random() > 0.45 ? state.loggedUser : uid,
            assigned: uid,
            block: bid,
            title: loremLittle(),
            description: loremDescription(),
            ...dateConfig('2018-08-25')
          })
          commit('saveTask', { ...newTask })
        }
      })
    }
    commit('setLoading', false)
    // console.log(state.tasks, 'state.tasks after generate tasks')
    return state.tasks
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
      dispatch('fetchAppData', userSent.id)
        .then(response => console.log(response))
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
    dispatch('fetchAppData', userSent.id)
      .then(response => console.log(response))
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
  saveTask ({ commit }, payload) {
    console.log(payload)
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
