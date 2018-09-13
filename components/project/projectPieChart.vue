<template>
  <div class="text-xs-center" style="position: relative">
    <v-layout row justify-space-around
      :class="{
      'body-2': lgAndUp,
      'caption': !lgAndUp,
      'secondary--text': !lightOut,
      'grey--text text--lighten-3': lightOut }">
      <div class="pa-3">
        <span class="title error--text">{{delayedTasks(projectid).length}}</span><br> 
        <small>delayed</small>
      </div>
      <div class="pa-3">
        <span class="title">{{projectTasks(projectid).length}}</span><br>
        <small>tasks</small>
      </div>
      <div class="pa-3">
        <span class="title success--text">{{doneTasks(projectid).length}}</span><br> 
        <small>done</small>
      </div>
    </v-layout>
    <div :id="`${projectid}-piechart`" :ref="`${projectid}-piechart`" v-if="mdAndUp"></div>
  </div>
</template>

<script>
import Vue from 'vue'
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
    chartProject () { return this.projects[this.projectid] }
  },
  watch: {
    chartProject: {
      deep: true,
      handler (val, oldval) {
        console.log('values changes for piechart project component', val, oldval)
        if (val && val !== oldval && this.piechart) {
          this.piechart.destroy()
        }
        Vue.set(this, 'piechart', this.drawPiechart(this.chartProject))
      }
    }
  },
  methods: {
    drawPiechart (p) {
      return p && this.$refs[`${p.id}-piechart`] && this.mdAndUp
        ? Highcharts.chart(`${p.id}-piechart`, {
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
              colors: pieColors(this.projects[p.id]
                .blocks.map(b => this.blocks[b])),
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
            data: pieSeries(this.projects[p.id]
              .blocks.map(b => this.blocks[b]))
          }]
        }) : undefined
    }
  }
}
</script>

<style>

</style>
