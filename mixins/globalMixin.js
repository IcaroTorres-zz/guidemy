// import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      apptitle: 'GuideMy'
    }
  },
  computed: {
    // ...mapState([
    //   'sidebar',
    //   'mini',
    //   'lightOut',
    //   'appLoading',
    //   'appError',
    //   'loggedUser',
    //   'users',
    //   'projects',
    //   'blocks',
    //   'tasks',
    //   'dailyMeetings',
    //   'snack'
    // ]),
    // ...mapGetters([
    //   'myProjects',
    //   'myArchive',
    //   'loggedUserObj',
    //   'usernames',
    //   'username',
    //   'useravatar',
    //   'userProjects',
    //   'userTasks',
    //   'userByName',
    //   'projectBlocks',
    //   'projectTasks',
    //   'doneTasks',
    //   'delayedTasks',
    //   'isDelayed',
    //   'temperColor',
    //   'temperColorInvert',
    //   'memberScoreForTasks',
    //   'memberScoreForDailies',
    //   'daysBetween',
    //   'task',
    //   'xlOnly',
    //   'lgAndUp',
    //   'lgAndDown',
    //   'lgOnly',
    //   'mdAndUp',
    //   'mdAndDown',
    //   'mdOnly',
    //   'smAndUp',
    //   'smAndDown',
    //   'smOnly',
    //   'xsOnly'
    // ])
  },
  filters: {
    limitToSize (str, size) {
      return str.length > size ? str.substring(0, size) + '...' : str
    },
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
      let d = (date instanceof Date) ? date : new Date(date)
      return d.toLocaleString()
    }
  },
  methods: {
    // ...mapActions([
    //   'toggleTask',
    //   'toggleArchiving',
    //   'invite',
    //   'deleteTask',
    //   'postComment',
    //   'deleteComment',
    //   'answerDaily',
    //   'judgeDaily',
    //   'moveTask'
    // ]),
    // ...mapMutations([
    //   'toggleSnack',
    //   'setError',
    //   'clearError',
    //   'setLoading'
    // ]),
    nuxtFromClick (route) {
      this.$router.push(route)
    },
    sortByStart (a, b) {
      return new Date(b.created).getTime() - new Date(a.created).getTime()
    },
    stringToDateddmmYYYY (dateString) {
      // console.warn('datestring got', dateString)
      return dateString instanceof Date
        ? dateString.toLocaleDateString('pt-BR')
        : (dateString || '').replace(/(\d{4})-(\d{2})-(\d{2})/, (str, y, m, d) => [d, m, y].join('/'))
    }
  }
}
