import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import { colors } from '../helpers'
import Highcharts from 'highcharts'

const pieColors = (blocks) => blocks.map(b => colors[b.color])
const pieSeries = (blocks) => {
  blocks.map(b => Object.assign({},
    { name: b.text, y: b.tasks.length })
  )
}
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
    ...mapMutations({
      toggleSnack (commit, payload) { commit('toggleSnack', payload) },
      setError (commit, payload) { commit('setError', payload) },
      clearError (commit) { commit('clearError') },
      setLoading (commit) { commit('setLoading') }
    }),
    daysBetween: (date1, date2) => Math.round((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24)),
    sortByStart (a, b) {
      return new Date(b.start).getTime() - new Date(a.start).getTime()
    },
    stringToDateddmmYYYY (dateString) {
      return (dateString || '').replace(/(\d{4})-(\d{2})-(\d{2})/, (str, y, m, d) => [d, m, y].join('/'))
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
