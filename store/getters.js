const dummyavatar = 'https://bit.ly/2CaX7sw'
export const getters = {
  // ui states
  // lightOut: state => state.lightOut,
  // user states
  JSONState: state => JSON.stringify(state),
  loggedUser: state => state.loggedUser,
  loggedUserObj: state => state.users[state.loggedUser],
  user: state => uid => state.users[uid],
  username: state => uid => state.users[uid].username,
  useravatar: state => uid => state.users[uid].profilePicture || dummyavatar,
  // appUser: state => uid => state.users[uid],
  // appUsername: state => uid => state.users[uid].username,
  // appUseravatar: state => uid => state.users[uid].profilePicture || dummyavatar,
  users: state => Object.values(state.users),
  usernames: state => Object.values(state.users).map(u => u.username),
  userByName: state => username => Object.values(state.users).find(user => user.username === username),
  userProjects: state => uid => state.users[uid].projects.map(pid => state.projects[pid]),
  myProjects: state => state.users[state.loggedUser].projects.map(pid => state.projects[pid]),
  userNotifications: state => uid => state.users[uid].notifications.map(nid => state.notifications[nid]),
  // project states
  // project: state => pid => state.projects[pid],
  projectBlocks: state => pid => state.projects[pid].blocks.map(bid => state.blocks[bid]),
  task: state => taskId => state.tasks[taskId],
  projectTasks: state => pid => state.projects[pid].blocks.reduce((fullList, b) => fullList.concat(state.blocks[b].tasks), []).map(t => state.tasks[t]),
  projectDailies: state => pid => Object.keys(state.projects[pid].dailyMeetings)
    .reduce((dailyMap, uid) => Object.assign(
      dailyMap, {
        ...dailyMap,
        [uid]: state.projects[pid].dailyMeetings[uid].map(daily => state.dailyMeetings[daily])
      }), {}),
  taskComments: state => task => task.comments.map(c => state.comments[c])
}
