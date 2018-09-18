<template>
  <div class="text-xs-center" style="position: relative">
    <v-layout row justify-space-around
      :class="{
      'body-2': lgAndUp,
      'caption': !lgAndUp,
      'secondary--text': !lightOut,
      'grey--text text--lighten-3': lightOut }">
      <div class="pa-3">
        <span class="title error--text">{{delayedTasks(chartProject.id).length}}</span><br> 
        <small>delayed</small>
      </div>
      <div class="pa-3">
        <span class="title">{{projectTasks(chartProject.id).length}}</span><br>
        <small>tasks</small>
      </div>
      <div class="pa-3">
        <span class="title success--text">{{doneTasks(chartProject.id).length}}</span><br> 
        <small>done</small>
      </div>
    </v-layout>
    <div
      :id="`${chartProject.id}-piechart`"
      :ref="`${chartProject.id}-piechart`"
      v-if="mdAndUp"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapState } from 'vuex'
import { colors } from '@/helpers'
import Highcharts from 'highcharts'

const pieColors = (blocks) => blocks.map(b => colors[b.color])
const pieSeries = (blocks) => blocks
  .map(b => Object.assign({}, { name: b.text, y: b.tasks.length }))

export default {
  name: 'projectpiechart',
  props: {
    projectid: {
      type: [String, Number],
      required: true
    }
  },
  data: () => ({
    piechart: undefined
  }),
  mounted () {
    Vue.set(this, 'piechart', this.drawPiechart(this.chartProject))
  },
  computed: {
    ...mapGetters([
      'delayedTasks',
      'projectTasks',
      'doneTasks',
      'filledProject',
      'mdAndUp',
      'lgAndUp'
    ]),
    ...mapState(['lightOut']),
    chartProject () {
      const project = this.filledProject(this.projectid)
      // Vue.set(project, 'blocks', project.blocks)
      if (this.piechart) {
        this.updatePiechart(project)
      } else {
        this.drawPiechart(project)
      }
      return project
    },
    chartOptions () {
      return (p) => ({
        chart: {
          type: 'pie',
          height: '180px',
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
            colors: pieColors(p.blocks),
            dataLabels: {
              enabled: false
            },
            width: '100%',
            innerSize: '60%',
            height: '100%'
          }
        },
        series: [{
          type: 'pie',
          name: 'Tasks per block',
          data: pieSeries(p.blocks)
        }]
      })
    }
  },
  methods: {
    drawPiechart (p) {
      return p && this.$refs[`${p.id}-piechart`] && this.mdAndUp
        ? Highcharts.chart(`${p.id}-piechart`, this.chartOptions(p)) : undefined
    },
    updatePiechart (p) {
      return p && this.$refs[`${p.id}-piechart`] && this.mdAndUp
        ? this.piechart.update(`${p.id}-piechart`, this.chartOptions(p)) : undefined
    }
  }
}
</script>
