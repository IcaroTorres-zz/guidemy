import { increaseDays } from '@/helpers'
const dummyavatar = 'https://bit.ly/2CaX7sw'

export const uidGen = () => (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
export class User {
  constructor (payload = {}) {
    this.id = payload.id || 'u.-' + uidGen()
    this.username = payload.username || ''
    this.displayName = payload.displayName || payload.username || ''
    this.email = payload.email || ''
    this.picture = payload.picture || dummyavatar
    this.projects = payload.projects || []
    this.notifications = payload.notifications || []
  }
}
// export const uidGen = (prefix, suffix) => {
//   return (prefix || '') + Math.random().toFixed(4).toString() + '-' +
//   (Math.random() * 3).toFixed(3).toString() + '-' +
//   (Math.random() * 2).toFixed(5).toString() + '-' + (suffix || '')
// }

export class Project {
  constructor (payload = {}) {
    this.id = payload.id || '-p_' + uidGen()
    this.creator = payload.creator || ''
    this.manager = payload.manager || ''
    this.team = payload.team || []
    this.title = payload.title || ''
    this.description = payload.description || ''
    this.blocks = payload.blocks || []
    this.dailyMeetings = payload.dailyMeetings || {}
    this.created = payload.created || new Date()
    this.archived = payload.archived || null
    this.status = payload.status || 0
  }
}

export class Block {
  constructor (payload = {}) {
    this.id = payload.id || '__b' + uidGen()
    this.project = payload.project || ''
    this.text = payload.text || ''
    this.color = payload.color || ''
    this.tasks = payload.tasks || []
  }
}

export class Task {
  constructor (payload = {}) {
    this.id = payload.id || 't-' + uidGen()
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

export class Daily {
  constructor (payload = {}) {
    this.id = payload.id || '-dL_' + uidGen()
    this.project = payload.project || ''
    this.manager = payload.manager || ''
    this.assigned = payload.assigned
    this.r1 = payload.r1 || ''
    this.r2 = payload.r2 || ''
    this.r3 = payload.r3 || ''
    this.created = payload.created || new Date()
    this.end = increaseDays(payload.creted || new Date(), 1)
    this.finished = payload.finished || null
    this.status = payload.status || 0
  }
}

export class Comment {
  constructor (payload = {}) {
    this.id = payload.id || 'c_m' + uidGen()
    this.by = payload.by
    this.at = payload.at
    this.date = payload.date || new Date()
    this.text = payload.text || ''
    this.likes = payload.likes || []
  }
}
export class Activity {
  constructor (payload = {}) {
    this.id = 'a-ct' + uidGen()
    this.text = payload.text || ''
    this.project = payload.project
    this.by = payload.by
    this.at = payload.at
  }
}

const appTitle = 'App title'
export default class Notification {
  constructor (payload = {}) {
    const generatedId = 'n_f-' + uidGen()
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
