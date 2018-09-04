<template>
  <div style="position: relative">
    <div class="layout row control-buttons">
      <v-btn small color="primary" @click="descending = !descending">
        <v-icon>sort</v-icon>{{sortButtonText}}
      </v-btn>
      <v-btn small color="accent" @click="toggleAll">
        <v-icon>{{expandAll ? 'unfold_less' : 'unfold_more'}}</v-icon>{{expandAll ? 'collapse all' : 'expand all'}}
      </v-btn>
      <v-btn small flat @click="printJSONState">
        <v-icon>print</v-icon>log json state
      </v-btn>
      <!-- <v-spacer></v-spacer>
      <span class="display-1 pr-3">/dashboard</span> -->
    </div>
    <v-container grid-list-xl v-for="(project, pidx) in userProjects" :key="project.id" class="pt-1">
      
      <v-layout column>
        
        <v-flex xs12 class="pa-0">
          <v-card class="transparent" flat>
            <v-divider v-if="pidx !== 0" class="py-2"></v-divider>
            <v-toolbar dense flat :class="{'secondary darken-1':lightOut, 'grey lighten-3': !lightOut, 'project--toolbar': true}">
              <dfinish :project="project">
                <v-btn flat :icon="!lgAndUp" class="ma-0" color="success" slot="customactivator">
                  <v-icon>done_all</v-icon><span class="hidden-md-and-down">finish</span>
                </v-btn>
              </dfinish>
              <dproject :edition="true" :project="project">
                <v-btn flat :icon="!lgAndUp" class="ma-0" color="warning" slot="customactivator" >
                  <v-icon >edit</v-icon><span class="hidden-md-and-down">edit</span>
                </v-btn>
              </dproject>
              <dprojectdel :project="project">
                <v-btn flat :icon="!lgAndUp" class="ma-0" color="error" slot="customactivator" >
                  <v-icon >delete</v-icon><span class="hidden-md-and-down">remove</span>
                </v-btn>
              </dprojectdel>
              <dinvite :project="project" class="pa-0">
                <v-btn small icon slot="customactivator" class="pa-0">
                  <v-icon>person_add</v-icon>
                </v-btn>
              </dinvite>
              <v-spacer/>
              <ddailies :project="project">
                <v-btn flat :icon="!lgAndUp" class="ma-0" color="info" slot="customactivator">
                  <span class="hidden-md-and-down">view dailes</span><v-icon >update</v-icon>
                </v-btn>
              </ddailies>
              <v-btn flat :icon="!lgAndUp" class="ma-0" color="accent" slot="" ><span class="hidden-md-and-down">contributions</span><v-icon >supervised_user_circle</v-icon></v-btn>
              <v-btn flat :icon="!lgAndUp" class="ma-0" color="success" ><span class="hidden-md-and-down">results</span><v-icon >poll</v-icon></v-btn>
            </v-toolbar>
            <v-layout row wrap justify-space-between align-content-start class="py-0 px-1">
              <v-flex sm7 md8 class="pb-0">
                <a class="title">{{project.title}}</a>
                <div>Manager: <a class="info--text">@{{username(project.manager)}}</a></div>
                <div>Team: <a class="pr-2" v-for="coworker in project.coworkers" :key="coworker">@{{username(coworker)}}</a></div>
                <div>Created: <span class="text-xs-justify primary--text">{{new Date(project.start).toLocaleDateString('pt-BR')}}</span></div>
                <v-divider class="my-2"></v-divider>
                <div class="layout row ml-0">
                  Description:
                  <v-spacer></v-spacer>
                  <v-tooltip left>
                    <v-btn icon small flat class="pa-0 mr-1 ml-0 my-0" @click.stop="toggleProject(project.id)" slot="activator">
                      <v-icon>{{visionMap[project.id] ? 'unfold_less' : 'unfold_more'}}</v-icon>
                    </v-btn>
                    <span>{{visionMap[project.id] ? 'Collapse project' : 'Expand project'}}</span>
                  </v-tooltip>
                </div>
                <p class="caption text-xs-justify primary--text">{{project.description}}</p>
              </v-flex>
              <v-flex sm5 md4 class="pb-0">
                <div class="text-xs-center" style="position: relative">
                  <v-layout row justify-center
                    :class="{
                    'chart--total': false,
                    'body-2': lgAndUp,
                    'caption': !lgAndUp,
                    'secondary--text': !lightOut,
                    'grey--text text--lighten-3': lightOut }">
                    <v-spacer></v-spacer>
                    <v-flex class="px-0 error--text text-xs-right">{{taskMap[project.id].delayed}} <small>delayed</small></v-flex>
                    <v-flex xs1 class="px-0">|</v-flex>
                    <v-flex class="px-0 text-xs-center">{{taskMap[project.id].taskCount}} <small>tasks</small></v-flex>
                    <v-flex xs1 class="px-0">|</v-flex>
                    <v-flex class="px-0 success--text text-xs-left">{{taskMap[project.id].complete}} <small>completed</small></v-flex>
                    
                  </v-layout>
                  <div :id="`${project.id}-piechart`" :ref="`${project.id}-piechart`"></div>
                </div>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>

      </v-layout>
      
      <dblock :project="project" v-if="visionMap[project.id] && project.blocks.length === 0"
        @block-created="updateBlockMap(project, $store.getters)"
        style="margin-left: -12px">
        <v-btn class="border-dashed-grey ma-0" slot="customactivator" ><v-icon small>add</v-icon>add block</v-btn>
      </dblock>

      <v-layout row v-if="visionMap[project.id] && project.blocks.length > 6" class="mt-4">
        <v-btn icon small @click="toggleAll" v-if="project.blocks.length > 0"><v-icon>view_day</v-icon></v-btn>
        <v-btn class="border-dashed-grey ma-0" block><v-icon small>add</v-icon>split to new roll</v-btn>
      </v-layout>
      <v-layout row align-content-start style="position: relative; margin-top: -4px;">
        <dblock :project="project" v-if="visionMap[project.id] && project.blocks.length > 0"
          @block-created="updateBlockMap(project, $store.getters)">
          <div class="new-block__button border-dashed-grey" slot="customactivator">
            <v-icon small>add</v-icon>ADD BLOCK
          </div>
        </dblock>
        <v-layout row align-content-start class="scroller-horiz" v-if="visionMap[project.id]" style="margin-right: 0; margin-bottom: -16px; margin-left: 44px;">

          <v-flex v-for="block in blockMap[project.id]" :key="block.id" class="px-0 mr-2 project-block-container">
            <v-toolbar light :class="block.color + ' block-toolbar'" dense>
              <v-toolbar-title v-html="block.text"/>
              <v-spacer/>
              <v-btn small icon light>
                <v-icon>more_horiz</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card :class="'transparent project-block scroller scroller__' + block.color" flat style="position: relative;">
              <v-expansion-panel expand>
                <taskcard :class="{ 'mt-1': tidx !== 0 }" v-for="(t, tidx) in block.tasks" :key="block[tidx]" :taskId="t" :block="block"/>
              </v-expansion-panel>
            </v-card>
            <v-toolbar :class="'block-footer ' + block.color" dense>
              <v-spacer/>
              <dtask :suggestedBlock="block" :suggestedProject="project" @task-created="updateTaskMap(project, $store.getters)">
                <v-btn small class="border-dashed-dark ma-0" slot="customactivator" style="min-width: 100%">
                  <v-icon small>add</v-icon> add task
                </v-btn>
              </dtask>
            </v-toolbar>
          </v-flex>
          
        </v-layout>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import { dproject, dfinish, dblock, dinvite, dtask, dprojectdel, ddailies } from '../components/dialog'
import taskcard from '../components/taskcard'
import Highcharts from 'highcharts'
import { colors } from '../helpers'

const pieColors = (blocks) => blocks.map(b => colors[b.color])
const pieSeries = (blocks) => blocks.map(b => Object.assign({}, { name: b.text, y: b.tasks.length }))

export default {
  components: {taskcard, dproject, dtask, dinvite, dfinish, dprojectdel, dblock, ddailies},
  data () {
    return {
      expandAll: false,
      descending: true,
      myCharts: {},
      visionMap: {},
      taskMap: {},
      blockMap: {}
    }
  },
  computed: {
    sortButtonText () { return this.descending ? 'older first' : 'recent first' },
    userProjects () { return this.myProjects.sort(this.sortProjects) }
  },
  created () {
    this.updateVisionMap(this.userProjects)
    const getters = this.$store.getters

    const map = this.userProjects.reduce((m, p) => {
      m.blockMap[p.id] = getters.projectBlocks(p.id) || []
      m.taskMap[p.id] = {
        delayed: getters.projectTasks(p.id).filter(t => this.isDelayed(t)).length,
        complete: getters.projectTasks(p.id).filter(t => t.status === 1).length,
        taskCount: this.projectTaskCount(p)
      }
      if (m.visionMap[p.id] === undefined) m.visionMap[p.id] = false

      return m
    }, {
      blockMap: this.blockMap,
      taskMap: this.taskMap,
      visionMap: this.visionMap
    })
    this.visionMap = map.visionMap
    this.blockMap = map.blockMap
    this.taskMap = map.taskMap
  },
  mounted () {
    this.updateAllCharts()
  },
  beforeUpdate () {

  },
  methods: {
    printJSONState () {
      console.log(this.$store.getters.JSONState)
      console.log(JSON.parse(this.$store.getters.JSONState))
    },
    sortProjects (a, b) {
      return this.descending
        ? new Date(b.start).getTime() - new Date(a.start).getTime()
        : new Date(a.start).getTime() - new Date(b.start).getTime()
    },
    toggleAll () {
      this.expandAll = !this.expandAll
      this.userProjects.map(p => p.id).forEach(pid => {
        this.visionMap[pid] = this.expandAll
      })
    },
    toggleProject (pid) {
      this.visionMap[pid] = !this.visionMap[pid]
    },
    updateVisionMap (projects) {
      this.visionMap = projects.reduce((visionMap, project) => {
        if (visionMap[project.id] === undefined) visionMap[project.id] = false
        return visionMap
      }, {})
    },
    updateBlockMap (p, getters) {
      this.blockMap[p.id] = getters.projectBlocks(p.id) || []
      this.updateChart(p)
    },
    updateTaskMap (p, getters) {
      this.taskMap[p.id] = {
        delayed: getters.projectTasks(p.id).filter(t => this.isDelayed(t)).length,
        complete: getters.projectTasks(p.id).filter(t => t.status === 1).length,
        taskCount: this.projectTaskCount(p)
      }
      this.updateChart(p)
    },
    updateChart (p) {
      if (this.myCharts[p.id]) this.myCharts[p.id].destroy()
      this.myCharts[p.id] = this.highchart(p)
      console.warn(`project ${p.title}'s chart updated sucessfully`)
    },
    updateAllCharts () {
      const charts = this.myCharts
      if (charts) {
        console.log(charts)
        Object.keys(charts).forEach(pid => {
          charts[pid].destroy()
        })
      }
      this.userProjects.reduce((chartMap, p) => {
        this.myCharts[p.id] = this.highchart(p)
      })
      console.warn('all charts updated successfully')
    },
    projectTaskCount (project) { return this.blockMap[project.id].reduce((count, b) => count + b.tasks.length, 0) },
    // Build the chart
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
              colors: pieColors(this.blockMap[p.id]),
              dataLabels: {
                enabled: true,
                format: '{point.name} {point.y}'
              },
              width: '100%',
              innerSize: '60%',
              height: '100%'
            }
          },
          series: [{
            type: 'pie',
            name: 'Task by Status',
            data: pieSeries(this.blockMap[p.id])
          }]
        })
      }
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
  position: sticky;
  top: 70px;
  width: 100%;
  /* text-align: right; */
  z-index: 3;
  margin: 0;
}
.new-block__button {
  position: absolute;
  top: -4px;
  left: 0;
  /* left: -3px; */
  bottom: 0;
  width: 36px;
  margin: 16px 0 0;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  text-align: center;
  line-height: 36px;
  cursor: pointer;
  font: normal normal 20px;
  outline: none;
}
.border-dashed-grey {
  color: #777;
  background: transparent !important;
  border: 1.5px dashed #777;
}
.border-dashed-grey i{
  color: #777;
}
.border-dashed-grey:hover {
  /* background: rgba(255,255,255,0.2); */
  background: rgba(255,255,255,0.1) !important;
  transition: all .2s ease-out;
}

.border-dashed-dark {
  color: #444;
  background: transparent !important;
  border: 1.5px dashed #444;
}
.border-dashed-dark i{
  color: #444;
}
.border-dashed-dark:hover {
  background: rgba(0,0,0,0.1) !important;
  transition: all .2s ease-out;
}
</style>

