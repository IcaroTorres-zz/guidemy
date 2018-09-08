import { mapState, mapMutations, mapGetters } from 'vuex'
import { colors } from '../helpers'
import Highcharts from 'highcharts'

const pieColors = (blocks) => blocks.map(b => colors[b.color])
const pieSeries = (blocks) => blocks.map(b => Object.assign({}, { name: b.text, y: b.tasks.length }))

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
      'teams',
      'projects',
      'blocks',
      'tasks'
    ]),
    ...mapGetters([
      'myProjects',
      'loggedUserObj',
      'users',
      'usernames',
      'user',
      'username',
      'useravatar',
      'projectTasks',
      'doneTasks',
      'delayedTasks',
      'isDelayed'
    ]),
    lgAndUp () { return this.$vuetify.breakpoint.lgAndUp }
  },
  methods: {
    ...mapMutations({
      finishTask (commit, payload) { commit('finishTask', payload) },
      deleteTask (commit, payload) { commit('deleteTask', payload) },
      judgeDaily (commit, payload) { commit('judgeDaily', payload) },
      answerDaily (commit, payload) { commit('answerDaily', payload) },
      postComment (commit, payload) { commit('postComment', payload) },
      deleteComment (commit, payload) { commit('deleteComment', payload) },
      toggleSidebar (commit) { commit('toggleSidebar') },
      toggleMini (commit) { commit('toggleMini') },
      toggleLight (commit) { commit('toggleLight') },
      clearError (commit) { commit('clearError') },
      setLoading (commit) { commit('setLoading') }
    }),
    daysBetween: (date1, date2) => Math.round((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24)),
    stringToDateddmmYYYY (dateString) {
      return (dateString || '').replace(/(\d{4})-(\d{2})-(\d{2})/, (str, y, m, d) => [d, m, y].join('/'))
    },
    dateToISODate (date) {
      return new Date(date).toISOString().split('T')[0]
    },
    // isDelayed (t) {
    //   return (t.status === 0 && new Date(t.end).getTime() < new Date().getTime()) ||
    //   (t.status === 1 && new Date(t.end).getTime() < new Date(t.finishedAt).getTime())
    // },
    sortByStart (a, b) {
      return new Date(b.start).getTime() - new Date(a.start).getTime()
    },
    formatPostTime (date = new Date()) {
      let d = new Date(date)
      return d.toLocaleDateString() + ' - ' + d.toLocaleTimeString()
    },
    highchart (p) {
      if (!p) return

      if (this.$refs[`${p.id}-piechart`]) {
        Highcharts.chart(`${p.id}-piechart`, {
          chart: {
            type: 'pie',
            height: '180',
            margin: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.0)'
          },
          title: {
            text: null
          },
          plotOptions: {
            pie: {
              discrete: true,
              allowPointSelect: true,
              cursor: 'pointer',
              colors: pieColors(this.projects[p.id].blocks.map(b => this.blocks[b])),
              dataLabels: {
                enabled: false
                // format: '{point.name} {point.y}'
              },
              width: '100%',
              innerSize: '60%',
              height: '100%'
            }
          },
          series: [{
            type: 'pie',
            name: 'Tasks per block',
            data: pieSeries(this.projects[p.id].blocks.map(b => this.blocks[b]))
          }]
        })
      }
    }
  }
}
