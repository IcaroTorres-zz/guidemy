export const getters = {
  loggedUser (state) {
    return state.loggedUser
  },
  loggedUserObject (state) {
    return state.users[state.loggedUser]
  },
  users (state) {
    return state.users
  },
  usernames (state) {
    return Object.values(state.users).map(u => u.username)
  },
  user (state) {
    return uid => state.users[uid]
  },
  userByName (state) {
    return username => Object.values(state.users).find(user => user.username === username)
  },
  project (state) {
    return pid => state.projects[pid]
  },
  userProjects (state) {
    return uid => state.users[uid]
      .projects.map(pId => state.projects[pId])
  },
  userNotifications (state) {
    return uid => state.users[uid]
      .notifications.map(nid => state.notifications[nid])
  },
  task (state) {
    return taskId => state.tasks[taskId]
  },
  taskComments (state) { return task => task.comments.map(c => state.comments[c]) },
  colors (state) {
    return state.colors
  }
}
