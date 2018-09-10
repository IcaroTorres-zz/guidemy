import Vue from 'vue'

const dummyavatar = 'https://bit.ly/2CaX7sw'
export const getters = {
  dictNamesToEmails: (state) => Object.values(state.users)
    .reduce((nameDictionary, user) => Object.assign(
      nameDictionary, {
        ...nameDictionary,
        [user.username]: user.email
      }), {}),
  // on signUp component check if tried user isn't already used
  available: (state, getters) => username => !getters.dictNamesToEmails[username],
  // get email for equivalente name
  emailByUsername: (state, getters) => name => getters.dictNamesToEmails[name],
  usernameByEmail: (state, getters) => email => (Object.entries(getters.dictNamesToEmails)
    .find(entry => entry[1] === email) || [])[0],
  filledProjects: (state, getters) => {
    return Object.entries(state.projects)
      .map(([pid, project]) => ({
        ...project,
        blocks: getters.projectBlocks(pid).map(blockToFill => ({
          ...blockToFill,
          tasks: blockToFill.tasks
            .map(taskid => state.tasks[taskid])
        }))
      }))
  },
  filledUserProjects: (state, getters) => uid => {
    return uid
      ? getters.userProjects(uid)
        .map(project => ({
          ...project,
          blocks: getters.projectBlocks(project.id)
            .map(blockToFill => ({
              ...blockToFill,
              tasks: blockToFill.tasks
                .map(taskid => state.tasks[taskid])
            }))
        }))
      : []
  },
  filledProject: (state, getters) => pid => pid
    ? ({
      ...state.projects[pid],
      blocks: getters.projectBlocks(pid)
        .map(blockToFill => ({
          ...blockToFill,
          tasks: blockToFill.tasks
            .map(taskid => state.tasks[taskid])
        }))
    })
    : {},
  // ui states
  // lightOut: state => state.lightOut,
  // user states
  JSONState: state => JSON.stringify(state),
  loggedUser: state => state.loggedUser,
  loggedUserObj: state => state.users[state.loggedUser] || {},
  user: state => uid => uid ? state.users[uid] : {},
  username: state => uid => uid ? state.users[uid].username : '',
  useravatar: state => uid => uid ? state.users[uid].profilePicture || dummyavatar : dummyavatar,
  // appUser: state => uid => state.users[uid],
  // appUsername: state => uid => state.users[uid].username,
  // appUseravatar: state => uid => state.users[uid].profilePicture || dummyavatar,
  users: state => Object.values(state.users),
  usernames: state => Object.values(state.users).map(u => u.username),
  userByName: state => username => username ? Object.values(state.users).find(user => user.username === username) : {},
  userProjects: state => uid => uid ? state.users[uid].projects.map(pid => state.projects[pid]) : [],
  myProjects: state => state.loggedUser ? state.users[state.loggedUser].projects.map(pid => state.projects[pid]) : [],
  userNotifications: state => uid => uid ? state.users[uid].notifications.map(nid => state.notifications[nid]) : [],
  // project states
  // project: state => pid => state.projects[pid],
  projectBlocks: state => pid => pid ? state.projects[pid].blocks.map(bid => state.blocks[bid]) : [],
  task: state => taskid => taskid ? state.tasks[taskid] : {},
  projectTasks: state => pid => pid ? state.projects[pid].blocks.reduce((fullList, b) => fullList.concat(state.blocks[b].tasks), []).map(t => state.tasks[t]) : [],
  projectDailies: state => pid => pid
    ? Object.keys(state.projects[pid].dailyMeetings)
      .reduce((dailyMap, uid) => Object.assign(dailyMap, {
        ...dailyMap,
        [uid]: state.projects[pid].dailyMeetings[uid].map(daily => state.dailyMeetings[daily])
      }), {})
    : [],
  taskComments: state => task => task ? task.comments.map(c => state.comments[c]) : [],
  delayedTasks: (state, getters) => pid => pid ? getters.projectTasks(pid).filter(t => getters.isDelayed(t)) : [],
  doneTasks: (state, getters) => pid => pid ? getters.projectTasks(pid).filter(t => t.status === 1) : [],
  isDelayed: (state, getters) => t => t ? (t.status === 0 && new Date(t.end).getTime() < new Date().getTime()) ||
    (t.status === 1 && new Date(t.end).getTime() < new Date(t.finishedAt).getTime()) : false,
  ...([
    'xlOnly',
    'lgAndUp',
    'lgAndDown',
    'lgOnly',
    'mdAndUp',
    'mdAndDown',
    'mdOnly',
    'smAndUp',
    'smAndDown',
    'smOnly',
    'xsOnly'
  ].reduce((all, brk) => Object.assign(all, {
    ...all,
    [brk]: state => Vue.prototype.$vuetify.breakpoint[brk]
  }), {}))
}
