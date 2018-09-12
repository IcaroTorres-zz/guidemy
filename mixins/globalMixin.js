import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      apptitle: 'app title'
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
      'teams',
      'projects',
      'blocks',
      'tasks',
      'snack'
    ]),
    ...mapGetters([
      'myProjects',
      'filledProjects',
      'filledUserProjects',
      'filledProject',
      'loggedUserObj',
      'users',
      'usernames',
      'user',
      'username',
      'useravatar',
      'projectTasks',
      'doneTasks',
      'delayedTasks',
      'isDelayed',
      'temperColor',
      'memberScoreForTasks',
      'memberScoreForDailies',
      'daysBetween',
      'task',
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
    ])
  },
  filters: {
    locale (dateString) {
      return dateString ? new Date(dateString).toLocaleDateString('pt-BR') : ''
    },
    ddmmYYYY (dateString) {
      return (dateString || '').replace(/(\d{4})-(\d{2})-(\d{2})/, (str, y, m, d) => [d, m, y].join('/'))
    },
    YYYYmmdd (date) {
      return new Date(date).toISOString().split('T')[0]
    },
    postFormat (date = new Date()) {
      let d = new Date(date)
      return d.toLocaleDateString() + ' - ' + d.toLocaleTimeString()
    }
  },
  methods: {
    ...mapActions([
      'finishTask',
      'deleteTask',
      'postComment',
      'deleteComment',
      'answerDaily',
      'judgeDaily'
    ]),
    ...mapMutations([
      'toggleSnack',
      'setError',
      'clearError',
      'setLoading'
    ]),
    nuxtFromClick (route) {
      this.$router.push(route)
    },
    sortByStart (a, b) {
      return new Date(b.start).getTime() - new Date(a.start).getTime()
    },
    stringToDateddmmYYYY (dateString) {
      return (dateString || '').replace(/(\d{4})-(\d{2})-(\d{2})/, (str, y, m, d) => [d, m, y].join('/'))
    }
  }
}
