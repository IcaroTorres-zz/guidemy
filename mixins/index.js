import { mapState, mapMutations, mapGetters } from 'vuex'
// import { state, getters, actions, mutations } from '../store'

// const allState = Reflect.ownKeys(state)
// const allGetters = Reflect.ownKeys(getters)
// const allActions = Reflect.ownKeys(actions)
// const allMutations = Reflect.ownKeys(mutations)

export const globalMixin = {
  data () {
    return {
      apptitle: 'app title',
      dummyavatar: 'https://bit.ly/2CaX7sw'
    }
  },
  computed: {
    ...mapState([
      'sidebar',
      'mini',
      'lightOut',
      'appLoading',
      'appError',
      'loggedUser',
      'teams'
    ]),
    ...mapGetters([
      'myProjects',
      'loggedUserObj',
      'users',
      'usernames'
    ]),
    lgAndUp () { return this.$vuetify.breakpoint.lgAndUp }
  },
  methods: {
    ...mapMutations({
      finishTask (commit, payload) { commit('finishTask', payload) },
      deleteTask (commit, payload) { commit('deleteTask', payload) },
      judgeDaily (commit, payload) { commit('judgeDaily', payload) },
      answerDaily (commit, payload) { commit('answerDaily', payload) },
      toggleSidebar (commit) { commit('toggleSidebar') },
      toggleMini (commit) { commit('toggleMini') },
      toggleLight (commit) { commit('toggleLight') },
      clearError (commit) { commit('clearError') },
      setLoading (commit) { commit('setLoading') }
    }),
    user (uid) { return this.$store.getters.appUser(uid) },
    useravatar (uid) { return this.$store.getters.appUseravatar(uid) }, // || this.dummyavatar },
    username (uid) { return this.$store.getters.appUsername(uid) },
    getProject (pid) { return this.$store.getters.project(pid) },
    daysBetween: (date1, date2) => Math.round((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24)),
    stringToDateddmmYYYY (date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    isDelayed (t) {
      return (t.status === 0 && new Date(t.end).getTime() < new Date().getTime()) ||
      (t.status === 1 && new Date(t.end).getTime() < new Date(t.finishedAt).getTime())
    }
  }
}
