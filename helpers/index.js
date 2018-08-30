// helper functions and addapters
export const alertFor = (actionName, value) => `Erro ao tentar a ação ${actionName} com o valor ${value.toString()}`

export const snack = (commit, callback, timeout = 2000) => {
  (() => callback)()
  setTimeout(() => commit('snack', {active: false}), timeout)
}

export const increaseDays = (date, daysCount) => {
  let [ increased, daysInMilliseconds ] = [ new Date(date), daysCount * 24 * 60 * 60 * 1000 ]
  increased.setTime(increased.getTime() + daysInMilliseconds)
  return increased
}
