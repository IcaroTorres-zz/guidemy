<template>
  <div style="position: relative">
    <div class="control-buttons">
      <v-btn small color="primary" dark @click="descending = !descending">
        <v-icon>sort</v-icon>{{sortButtonText}}
      </v-btn>
      <v-btn small color="accent" dark @click="expand = !expand">
        <v-icon>swap_vert</v-icon>expand
      </v-btn>
    </div>
    <v-container fluid grid-list-xl class="py-0" v-for="project in userProjects" :key="project.id">
      <v-layout column>
        
      <v-btn small color="warning" light
        @click="toggleProject(project)">
        <v-icon>apps</v-icon>
      </v-btn>
        <v-flex xs12 class="pa-0">
          <dialogproject :edition="true" :project="project">
            <v-btn flat class="ma-0" color="warning" slot="customactivator" >edit<v-icon small>edit</v-icon></v-btn>
          </dialogproject>
          <v-card class="transparent" flat>
            <v-layout row wrap justify-space-between align-content-start class="py-0 px-1">
              <v-flex sm8 md9 class="pb-0">
                <div class="display-1 primary--text py-2">{{project.title}}</div>
                <div class="title py-1">Manager: <a class="info--text">@{{getUsername(project.manager)}}</a></div>
                <div class="title py-1">Team:
                  <a class="pr-2" v-for="coworker in project.coworkers" :key="coworker">@{{getUsername(coworker)}}</a>
                  <dialoginviteuser :project="project">
                    <v-btn small icon slot="customactivator">
                      <v-icon>person_add</v-icon>
                    </v-btn>
                  </dialoginviteuser>
                </div>
                <div class="title py-1">Created: <span class="body-2 text-xs-justify primary--text">{{new Date(project.start).toLocaleDateString('pt-BR')}}</span></div>
                <v-divider class="my-2"></v-divider>
                <div class="title py-1">Description:</div>
                <p class="body-2 text-xs-justify primary--text">{{project.description}}</p>
              </v-flex>
              <v-flex sm4 md3 class="pb-0">
                <div class="text-xs-center" style="position: relative">
                  <!-- <pie-chart
                    :data="pizzaChart(project)"
                    :discrete="true"
                    thousands="."
                    decimal=","
                    height="180px">
                  </pie-chart> -->
                  <div class="chart--total">
                    {{projectTaskCount(project)}}<br><small>tasks</small>
                  </div>
                  <div :id="`${project.id}-piechart`"></div>
                </div>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>

      </v-layout>
      
      {{project.visibility}}
      <v-layout row align-content-start class="scroller-horiz" v-if="expand">
        <v-flex v-for="(block, i) in project.blocks" :key="i">
          <v-toolbar light :class="block.color + ' block-toolbar'" dense flat>
            <v-toolbar-title v-html="block.text"/>
            <v-spacer/>
            <v-btn small icon light>
              <v-icon>more_horiz</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card :class="'transparent project-block scroller scroller__' + block.color" flat style="position: relative;">
            <v-expansion-panel dark expand>
              <taskcard :class="{ 'mt-1': tidx !== 0 }" v-for="(t, tidx) in block.tasks" :key="tidx" :taskId="t" :block="block"/>
            </v-expansion-panel>
          </v-card>
          <v-toolbar :class="'block-footer ' + block.color" dense flat>
            <v-spacer/>
            <dialogtask :suggestedBlock="block" :suggestedProject="project">
              <v-btn small flat slot="customactivator">
                <v-icon small>add</v-icon> add task
              </v-btn>
            </dialogtask>
          </v-toolbar>
        </v-flex>

      </v-layout>
      <v-divider class="my-4"></v-divider>
    </v-container>
  </div>
</template>
<script>
import taskcard from '../components/taskcard'
import dialogproject from '../components/dialog-project'
import dialoginviteuser from '../components/dialog-inviteuser'
import dialogtask from '../components/dialog-task'
import Highcharts from 'highcharts'

const theme = {
  'primary': '#607d8b',
  'secondary': '#424242',
  'accent': '#80deea',
  'error': '#ef5350',
  'info': '#4fc3f7',
  'success': '#66bb6a',
  'warning': '#ffc107'
}
export default {
  layout: 'alter',
  components: {taskcard, dialogproject, dialogtask, dialoginviteuser},
  data () {
    return {
      expand: false,
      descending: true,
      projects: this.$store.getters.userProjects(this.$store.getters.loggedUser).sort(
        (a, b) => new Date(b.start).getTime() - new Date(a.start).getTime()
      )
    }
  },
  watch: {
    projects (val) {
      if (val) {
        console.log(val)
        this.projects = val.sort(
          (a, b) => this.descending
            ? new Date(b.start).getTime() - new Date(a.start).getTime()
            : new Date(a.start).getTime() - new Date(b.start).getTime()
        )
      }
    }
  },
  computed: {
    sortButtonText () { return this.descending ? 'older first' : 'recent first' },
    user () {
      return this.$store.getters.userByName('icarotorres') || {}
    },
    userProjects () { return this.projects }
  },
  mounted () {
    this.highchart(this.userProjects)
  },
  methods: {
    toggleBlockEdit (block, value) {
      block.button = value
    },
    toggleProject (proj) {
      let pjs = this.projects
      console.log('before', pjs)
      pjs[pjs.findIndex(p => p.id === proj.id)].visibility = !pjs[pjs.findIndex(p => p.id === proj.id)].visibility
      this.projects = pjs
      console.log('after', pjs)
    },
    // toggleBlocks (project) {
    //   this.visible[project.id] = !this.visible[project.id]
    //   console.log(this.visible)
    // },
    // pizzaChart (project) {
    //   return project.blocks.reduce((chart, b) => {
    //     chart[b.text] = b.tasks.length
    //     return chart
    //   }, {})
    // },
    pieColors: blocks => blocks.map(b => theme[b.color]),
    pieSeries: blocks => blocks.map(b => {
      let obj = { name: b.text, y: b.tasks.length }
      return obj
    }),
    projectTaskCount: project => project.blocks.reduce((count, b) => count + b.tasks.length, 0),
    // Build the chart
    highchart (projects) {
      if (!projects) return
      projects.forEach(p => {
        Highcharts.chart(`${p.id}-piechart`, {
          chart: {
            type: 'pie',
            height: '250',
            margin: 0
          },
          title: {
            text: null
          },
          plotOptions: {
            pie: {
              discrete: true,
              allowPointSelect: true,
              cursor: 'pointer',
              colors: this.pieColors(p.blocks),
              dataLabels: {
                enabled: true,
                format: '{point.name} {point.y}'
              },
              width: '100%',
              innerSize: '50%',
              height: '100%'
            }
          },
          series: [{
            type: 'pie',
            name: 'Task by Status',
            data: this.pieSeries(p.blocks)
          }]
        })
      })
    },
    onDrop: function (collection, dropResult) {
      // this[collection] = applyDrag(this[collection], dropResult)
    },
    getChildPayload1: function (index) {
      return this.items1[index]
    },
    getChildPayload2: function (index) {
      return this.items2[index]
    },
    getChildPayload3: function (index) {
      return this.items3[index]
    },
    getChildPayload4: function (index) {
      return this.items4[index]
    }
  }
}
</script>
<style src="assets/style/style.css"></style>
<style scoped>
.control-buttons{
  position:  sticky;
  top: 90px;
  width: 100%;
  /* text-align: right; */
  z-index: 3;
  margin: 0;
}
</style>

