export const state = () => ({
  sidebar: false,
  users: {
    'u1': {
      username: 'icarotorres',
      id: 'u1',
      email: 'icaro.stuart@gmail.com',
      profilePicture: 'https://icarotorres.github.io/images/perfil1.jpg',
      tasks: ['t1'],
      projects: ['p1'],
      teams: ['tm1'],
      dailyMeetings: ['d1'],
      notifications: ['n1']
    }
  },
  projects: {
    'p1': {
      id: 'p1',
      creator: 'u1',
      coworkers: [],
      tasks: ['t1'],
      dailyMeetings: ['d1'],
      start: new Date(),
      end: null,
      finished: null,
      status: 0
    }
  },
  tasks: {
    't1': {
      id: 't1',
      project: 'p1',
      creator: 'u1',
      assigned: 'u1',
      title: 'Dummy task title',
      description: 'task description',
      start: new Date(),
      end: new Date(),
      finished: null,
      comments: [],
      status: 0
    },
    't2': {
      id: 't2',
      project: 'p1',
      creator: 'u1',
      assigned: 'u1',
      title: 'Dummy task title',
      description: 'task description',
      start: new Date(),
      end: new Date(),
      finished: null,
      comments: [],
      status: 1
    },
    't3': {
      id: 't3',
      project: 'p1',
      creator: 'u1',
      assigned: 'u1',
      title: 'Dummy task title',
      description: 'task description',
      start: new Date(),
      end: new Date(),
      finished: null,
      comments: [],
      status: 2
    },
    't4': {
      id: 't4',
      project: 'p1',
      creator: 'u1',
      assigned: 'u1',
      title: 'Dummy task title',
      description: 'task description',
      start: new Date(),
      end: new Date(),
      finished: null,
      comments: [],
      status: 3
    }
  },
  comments: {
    'c1': {
      id: 'c1',
      by: 'u1',
      at: 't1',
      date: new Date(),
      text: 'dummy test comment sample',
      likes: []
    }
  },
  dailyMeetings: {
    'd1': {
      id: 'd1',
      manager: 'u1',
      assigned: 'u1',
      r1: '',
      r2: '',
      r3: '',
      start: new Date(),
      end: null, // 24hr after
      finished: null
    }
  },
  status: {
    0: 'active',
    1: 'done',
    2: 'delayed',
    3: 'closed'
  },
  notifications: {
    'n1': {
      id: 'n1',
      sender: '',
      receiver: 'u1',
      title: 'Test Notification',
      message: 'A dummy Test Notification to be seen',
      route: {
        name: 'notification', // route name
        params: { id: 'n1' }, // route params object
        path: '/notification/n1'// route path
      },
      status: 0
    }
  }
})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  }
}

export const getters = {
  user (state) {
    return userId => state.users[userId]
  },
  userByName (state) {
    return username => Object.values(state.users).find(user => user.username === username)
  },
  userProjects (state) {
    return username => state.users[username]
      .projects.map(pId => state.projects[pId])
  },
  task (state) {
    return taskId => state.tasks[taskId]
  },
  taskComments (state) { return task => task.comments.map(c => state.comments[c.id]) }
}
