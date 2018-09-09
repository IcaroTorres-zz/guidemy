export class User {
  constructor (payload = {}) {
    // console.log(`creating instance of ${this.constructor.name} with value`)
    // console.dir(payload)
    this.id = payload.id || 'u' + Date.now().toString()
    this.username = payload.username || ''
    this.displayName = payload.displayName || payload.username || ''
    this.email = payload.email || ''
    this.profilePicture = payload.profilePicture || ''
    this.tasks = payload.tasks || []
    this.projects = payload.projects || []
    this.teams = payload.teams || []
    this.dailyMeetings = payload.dailyMeetings || []
    this.notifications = payload.notifications || []
  }
}

export class Project {
  constructor (payload = {}) {
    // console.log(`creating instance of ${this.constructor.name} with value`)
    // console.dir(payload)
    this.id = payload.id || 'p' + Date.now().toString()
    this.creator = payload.creator
    this.manager = payload.description || ''
    this.coworkers = payload.coworkers || [payload.creator]
    this.title = payload.title || ''
    this.description = payload.description || ''
    this.company = payload.company || ''
    this.blocks = payload.blocks || []
    this.dailyMeetings = payload.dailyMeetings || []
    this.start = payload.start || new Date()
    this.end = payload.end || null
    this.finishedAt = payload.finishedAt || null
    this.notes = payload.notes || ''
    this.status = payload.status || 0
  }
}

export class Block {
  constructor (payload = {}) {
    // console.log(`creating instance of ${this.constructor.name} with value`)
    // console.dir(payload)
    this.id = payload.id || 'b' + Date.now().toString()
    this.project = payload.project || ''
    this.text = payload.text || ''
    this.color = payload.color || ''
    this.tasks = payload.tasks || []
  }
}

export class Task {
  constructor (payload = {}) {
    // console.log(`creating instance of ${this.constructor.name} with value`)
    // console.dir(payload)
    this.id = payload.id || 't' + Date.now().toString()
    this.creator = payload.creator
    this.project = payload.project || ''
    this.block = payload.block || ''
    this.assigned = payload.assigned || payload.creator
    this.title = payload.title || ''
    this.description = payload.description || ''
    this.start = payload.start || new Date()
    this.end = payload.end || null
    this.finishedAt = payload.finishedAt || null
    this.comments = payload.comments || []
    this.status = payload.status || 0
  }
}

export class Comment {
  constructor (payload = {}) {
    this.id = payload.id || 'cm' + Date.now().toString()
    this.by = payload.by
    this.at = payload.at
    this.date = payload.date || new Date()
    this.text = payload.text || ''
    this.likes = payload.likes || []
  }
}

export class Activity {
  constructor (payload = {}) {
    this.id = 'atv' + Date.now().toString()
    this.text = payload.text || ''
    this.project = payload.project
    this.by = payload.by
    this.at = payload.at
  }
}

const appTitle = 'App title'
export default class Notification {
  constructor (payload = {}) {
    const generatedId = 'nf' + Date.now().toString()
    this.id = generatedId
    this.receiverList = payload.receiverList || []
    this.from = payload.from || appTitle
    this.title = payload.title || 'App notification'
    this.message = payload.message || ''
    this.route = payload.route || {
      name: 'notification', // route name
      params: { id: generatedId }, // route params object
      path: `/notification/${generatedId}`// route path
    }
    this.status = 0
  }
}
