import Vue from 'vue'

const dummyavatar = 'https://bit.ly/2CaX7sw'
export const getters = {
  dictNamesToEmails: (state) => Object.values(state.users)
    .reduce((nameDictionary, user) => Object.assign(
      nameDictionary, {
        ...nameDictionary,
        [user.username]: user.email
      }), {}),
  available: (state, getters) => username => !getters.dictNamesToEmails[username],
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
        })),
        dailyMeetings: Object.entries(project.dailyMeetings)
          .reduce((meetings, [uid, dllist]) => {
            return {
              ...meetings,
              [uid]: dllist.map(dlid => state.dailyMeetings[dlid])
            }
          }, {})
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
            })),
          dailyMeetings: Object.entries(project.dailyMeetings)
            .reduce((meetings, [uid, dllist]) => {
              return {
                ...meetings,
                [uid]: dllist.map(dlid => state.dailyMeetings[dlid])
              }
            }, {})
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
        })),
      dailyMeetings: Object.entries(state.projects[pid].dailyMeetings)
        .reduce((meetings, [uid, dllist]) => {
          return {
            ...meetings,
            [uid]: dllist.map(dlid => state.dailyMeetings[dlid])
          }
        }, {})
    })
    : {},
  JSONState: state => JSON.stringify(state),
  loggedUser: state => state.loggedUser,
  loggedUserObj: state => state.users[state.loggedUser] || {},
  username: state => uid => uid ? state.users[uid].username : '',
  useravatar: state => uid => uid ? state.users[uid].picture || dummyavatar : dummyavatar,
  usernames: state => Object.values(state.users).map(u => u.username),
  userByName: state => username => username ? Object.values(state.users).find(user => user.username === username) : {},
  userProjects: state => uid => uid ? state.users[uid].projects.map(pid => state.projects[pid]) : [],
  userTasks: (state, getters) => uid => getters.userProjects(uid)
    .reduce((projectTasklist, p) => p.blocks
      .map(bid => state.blocks[bid])
      .reduce((tasklist, b) => b.tasks
        .map(tid => state.tasks[tid]).concat(tasklist)
        , []).concat(projectTasklist)
      , []),
  myProjects: state => state.loggedUser ? state.users[state.loggedUser].projects.map(pid => state.projects[pid]).filter(p => p.status === 0) : [],
  myArchive: state => state.loggedUser ? state.users[state.loggedUser].projects.map(pid => state.projects[pid]).filter(p => p.status === 1) : [],
  userNotifications: state => uid => uid ? state.users[uid].notifications.map(nid => state.notifications[nid]) : [],
  projectBlocks: state => pid => pid ? state.projects[pid].blocks.map(bid => state.blocks[bid]) : [],
  projectTasks: state => pid => pid ? state.projects[pid].blocks.reduce((fullList, b) => fullList.concat(state.blocks[b].tasks), []).map(t => state.tasks[t]) : [],
  projectDailies: state => pid => {
    let userDict = { ...state.projects[pid].dailyMeetings }
    for (let key in userDict) {
      userDict[key] = userDict[key].map(d => state.dailyMeetings[d])
    }
    return userDict || {}
  },
  temperColor: () => (max, value) => {
    return value >= (4 * max / 5)
      ? 'success'
      : value >= (3 * max / 5)
        ? 'accent'
        : value >= (2 * max / 5)
          ? 'info'
          : value >= (1 * max / 5)
            ? 'warning'
            : 'deep-orange'
  },
  temperColorInvert: () => (max, value) => {
    return value <= (4 * max / 5)
      ? 'success'
      : value <= (3 * max / 5)
        ? 'accent'
        : value <= (2 * max / 5)
          ? 'info'
          : value <= (1 * max / 5)
            ? 'warning'
            : 'deep-orange'
  },
  daysBetween: () => (date1, date2) => Math.round(
    (new Date(date2).getTime() - new Date(date1).getTime()) /
    (1000 * 60 * 60 * 24) // day in milisseconds
  ),
  memberScoreForTasks: (state, getters) => (uid, pid) => {
    return getters.projectTasks(pid)
      .filter(t => t.assigned === uid)
      .reduce((member, t) => {
        // project credits value
        const taskcredits = getters.daysBetween(t.created, t.end)

        let innerCredits = 0
        if (t.status !== 0) {
          member.score += taskcredits
          // finished tasks
          innerCredits = getters.daysBetween(t.finished, t.end)
        } else {
          // pending tasks
          innerCredits = getters.daysBetween(new Date(), t.end)
        }
        // computed credits acumulation
        if (innerCredits > 0) {
          member.antecipatedCredits += innerCredits
          member.antecipatedTasks += 1
        } else {
          member.overduedCredits += (innerCredits * -1)
          member.overduedTasks += 1
        }

        member.credits += taskcredits
        // assigned score
        member.score += innerCredits
        // task count
        member.total += 1
        return member
      }, {
        score: 0,
        antecipatedCredits: 0,
        antecipatedTasks: 0,
        overduedCredits: 0,
        overduedTasks: 0,
        credits: 0,
        total: 0
      })
  },
  memberScoreForDailies: (state, getters) => (uid, pid) => {
    let dailies = getters.projectDailies(pid)[uid] || []
    let total = dailies.length
    let attended = dailies.filter(d => d.status === 1).length
    let participation = (attended * 100 / total).toFixed(2)
    return {
      participation: participation,
      attended: attended,
      missed: total - attended,
      total: total
    }
  },
  taskComments: state => task => task ? task.comments.map(c => state.comments[c]) : [],
  delayedTasks: (state, getters) => pid => pid ? getters.projectTasks(pid).filter(t => getters.isDelayed(t)) : [],
  doneTasks: (state, getters) => pid => pid ? getters.projectTasks(pid).filter(t => t.status === 1) : [],
  isDelayed: () => t => t ? (t.status === 0 && new Date(t.end).getTime() < new Date().getTime()) ||
    (t.status === 1 && new Date(t.end).getTime() < new Date(t.finished).getTime()) : false,
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
