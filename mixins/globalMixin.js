// import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      apptitle: 'GuideMy'
    }
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
    sortByStart (order) {
      return (a, b) => {
        return !order
          ? new Date(b.created).getTime() - new Date(a.created).getTime()
          : new Date(b.created).getTime() + new Date(a.created).getTime()
      }
    },
    stringToDateddmmYYYY (dateString) {
      return dateString instanceof Date
        ? dateString.toLocaleDateString('pt-BR')
        : (dateString || '').replace(/(\d{4})-(\d{2})-(\d{2})/, (str, y, m, d) => [d, m, y].join('/'))
    }
  }
}
