import axios from 'axios'
const dummyavatar = 'https://bit.ly/2CaX7sw'
const state = {
  loggedUser: '91jh2d1m2',
  users: {},
  projects: {},
  dailyMeetings: {},
  blocks: {},
  tasks: {}
}

class User {
  constructor (payload = {}) {
    this.id = payload.id || 'u' + Date.now().toString()
    this.username = payload.username || ''
    this.displayName = payload.displayName || payload.username || ''
    this.email = payload.email || ''
    this.picture = payload.picture || dummyavatar
    this.projects = payload.projects || []
    this.notifications = payload.notifications || []
  }
}

class Project {
  constructor (payload = {}) {
    this.id = payload.id || 'p' + Date.now().toString()
    this.creator = payload.creator
    this.manager = payload.manager || ''
    this.team = payload.team || []
    this.title = payload.title || ''
    this.description = payload.description || ''
    this.blocks = payload.blocks || []
    this.dailyMeetings = payload.dailyMeetings || {}
    this.created = payload.created || new Date()
    this.end = payload.end || null
    this.archived = payload.archived || null
    this.status = payload.status || 0
  }
}

class Block {
  constructor (payload = {}) {
    this.id = payload.id || 'b' + Date.now().toString()
    this.project = payload.project || ''
    this.text = payload.text || ''
    this.color = payload.color || ''
    this.tasks = payload.tasks || []
  }
}

const generateMyUsers = async (count = 150) => {
  return axios
    .get(`https://randomuser.me/api/?results=${count}&nat=BR&inc=name,email,picture,login`)
    .then(jsonUsers => {
      const users = jsonUsers.data.results
      const myCustomUsers = users.reduce((usersState, u) => Object.assign(
        {},
        {
          ...usersState,
          [u.login.uuid]: new User({
            id: u.login.uuid,
            email: u.email,
            profilePicture: u.picture.medium,
            username: u.login.username,
            displayName: Object.values(u.name)
              .map(namepart => namepart.charAt(0).toUpperCase() + namepart.substr(1)).join(' ')
          })
        }
      ), {})
      state.users = myCustomUsers
      return myCustomUsers
    })
}

const generateAppProjects = async (count = 15) => {
  const promises = []
  for (let i = 0; i < count; i++) {
    const tempUsers = Object.values(state.users)
    let projectTeam = []
    let teamsize = Math.round(Math.random() * Math.max(tempUsers.length / 10, 5))
    for (let j = 0; j < teamsize; j++) {
      let chosenIndex = Math.round(Math.random() * (tempUsers.length - 1))
      let insertId = tempUsers[chosenIndex].id
      if (projectTeam.indexOf(insertId) === -1) {
        projectTeam.push(insertId)
      } else {
        j -= 1
      }
    }

    promises.push(
      generateTitleAndDescription().then(loremObj => {
        const projectId = 'p' + Date.now().toString()
        const newProject = new Project({
          ...loremObj,
          id: projectId,
          creator: state.loggedUser,
          manager: state.loggedUser,
          team: projectTeam,
          blocks: defaultBlockSetup(projectId)
        })
        return newProject
      }).then(newProject => {
        const dailypromises = newProject.team.map(uid => {
          return generateUserDailiesInProject(newProject.id, uid, newProject.manager)
            .then(userDailies => {
              return { uid: uid, dailies: userDailies }
            })
        })
        return axios.all(dailypromises).then(teamDailies => {
          teamDailies.forEach(userDailies => {
            newProject.dailyMeetings[userDailies.uid] = userDailies.dailies
          })
          return newProject
        })
      })
    )
  }
  return axios.all(promises).then(projectList => {
    state.projects = {
      ...state.projects,
      ...projectList
        .reduce((projectsState, project) => {
          console.log(project)
          projectsState[project.id] = project
          return projectsState
        }, {})
    }
    return state.projects
  }).catch(e => console.log('fetching projects error', e.message))
}

const increaseDays = (date, daysCount) => {
  let [ increased, daysInMilliseconds ] = [ new Date(date), daysCount * 24 * 60 * 60 * 1000 ]
  increased.setTime(increased.getTime() + daysInMilliseconds)
  return increased
}

const randomStatus = () => {
  let rand = Math.random()
  return rand <= 0.25 ? -1 : rand <= 0.4 ? 0 : 1
}

const daysBetween = (date1, date2) => Math.round((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24))

const addDays = (days) => {
  var date = new Date(this.valueOf())
  date.setDate(date.getDate() + days)
  return date
}
const dateConfig = (start = new Date('2018-08-12')) => {
  const startDate = new Date(start)
  const limit = daysBetween(startDate, addDays.call(new Date(), -7))
  const random = Math.random() * limit

  const genstatus = Math.round(Math.random())
  return {
    created: addDays.call(startDate, random),
    finished: genstatus ? addDays.call(startDate, Math.round(Math.random() * (limit + random))) : null,
    end: addDays.call(startDate, Math.round(Math.random() * (limit + random))),
    status: genstatus
  }
}

const generateUserDailiesInProject = async (p, a, m, startDate = new Date('2018-09-05')) => {
  const promises = Array.from(
    Array(daysBetween(startDate, new Date())).keys()
  ).map((i, idx, arr) => {
    let status = i === arr.length - 1 ? 0 : randomStatus()
    return axios.get('http://loripsum.net/api/1/long/prude/plaintext')
      .then(lorem => {
        const answers = lorem.data.replace(/\n/g, '').split('. ')
        const newDaily = {
          id: 'dl' + Date.now().toString() + 'dif' + (Math.random() * 200).toString(),
          project: p,
          manager: m,
          assigned: a,
          r1: status === 1 ? answers.slice(0, 3).join('. ') : '',
          r2: status === 1 ? answers.slice(3, 5).join('. ') : '',
          r3: status === 1 ? answers.slice(5, answers.length).join('. ') : '',
          created: increaseDays(startDate, i),
          end: increaseDays(startDate, i + 1), // 24hr after
          finished: status === 1 ? increaseDays(startDate, i) : null,
          status: status
        }
        return newDaily
      })
  })

  return axios.all(promises).then(UserdailiesInProjectList => {
    const listToObject = UserdailiesInProjectList
      .reduce((dailiesState, daily) => {
        dailiesState[daily.id] = daily
        return dailiesState
      }, {})
    state.dailyMeetings = {
      ...state.dailyMeetings,
      ...listToObject
    }
    return UserdailiesInProjectList.map(d => d.id).reverse()
  })
}
export class Task {
  constructor (payload = {}) {
    this.id = payload.id || 't' + Date.now().toString()
    this.creator = payload.creator
    this.block = payload.block || ''
    this.assigned = payload.assigned || payload.creator
    this.title = payload.title || ''
    this.description = payload.description || ''
    this.created = payload.created || new Date()
    this.end = payload.end || null
    this.finished = payload.finished || null
    this.comments = payload.comments || []
    this.status = payload.status || 0
  }
}
const generateBlockTasks = async function (bid, team) {
  let taskcount = Math.floor(Math.random() * (team.length - 10 + 10) + 10)
  const taskpromise = []
  for (let j = 0; j < taskcount; j++) {
    let chosenIndex = Math.round(Math.random() * (team.length - 1))

    taskpromise.push(
      generateTitleAndDescription().then(lorem => {
        const mylorem = lorem
        mylorem.title = mylorem.title.split(' ').slice(0, Math.floor(Math.random() * (3 - 1 + 1) + 1)).join(' ')
        return mylorem
      }).then(descritive => {
        const newTask = new Task({
          block: bid,
          creator: state.loggedUser,
          assigned: team[chosenIndex],
          ...descritive,
          ...dateConfig()
        })
        state.tasks[newTask.id] = newTask
        return state.tasks[newTask]
      })
    )
  }
  axios.all(taskpromise).then(blocktasks => )
}
