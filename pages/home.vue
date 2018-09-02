<template>
  <div style="position: relative">
    <div class="layout row control-buttons">
      <v-btn small color="primary" @click="descending = !descending">
        <v-icon>sort</v-icon>{{sortButtonText}}
      </v-btn>
      <v-btn small color="accent" @click="toggleAll">
        <v-icon>{{expandAll ? 'unfold_less' : 'unfold_more'}}</v-icon>{{expandAll ? 'close all' : 'open all'}}
      </v-btn>
      <v-spacer></v-spacer>
      <span class="display-1 mr-3 border-dashed-grey">/dashboard</span>
    </div>
    <v-container fluid grid-list-xl v-for="(project, pidx) in userProjects" :key="project.id" class="pt-1">
      
      <v-layout column>
        
        <v-flex xs12 class="pa-0">
          <v-card class="transparent" flat>
            <v-divider v-if="pidx !== 0" class="py-2"></v-divider>
            <v-toolbar dense flat :class="{'secondary darken-1':lightOut, 'grey lighten-3': !lightOut, 'project--toolbar': true}">
              <dialogfinish :project="project">
                <v-btn flat :icon="!lgAndUp" class="ma-0" color="success" slot="customactivator">
                  <v-icon>done_all</v-icon><span class="hidden-sm-and-down">finish</span>
                </v-btn>
              </dialogfinish>
              <dialogproject :edition="true" :project="project">
                <v-btn flat :icon="!lgAndUp" class="ma-0" color="warning" slot="customactivator" >
                  <v-icon >edit</v-icon><span class="hidden-sm-and-down">edit</span>
                </v-btn>
              </dialogproject>
              <dialogprojectdel :project="project">
                <v-btn flat :icon="!lgAndUp" class="ma-0" color="error" slot="customactivator" >
                  <v-icon >delete</v-icon><span class="hidden-sm-and-down">remove</span>
                </v-btn>
              </dialogprojectdel>
              <dialoginviteuser :project="project" class="pa-0">
                <v-btn small icon slot="customactivator" class="pa-0">
                  <v-icon>person_add</v-icon>
                </v-btn>
              </dialoginviteuser>
              <v-spacer/>
              <v-btn flat :icon="!lgAndUp" class="ma-0" color="info" slot="" ><span class="hidden-sm-and-down">view dailes</span><v-icon >update</v-icon></v-btn>
              <v-btn flat :icon="!lgAndUp" class="ma-0" color="accent" slot="" ><span class="hidden-sm-and-down">contributions</span><v-icon >supervised_user_circle</v-icon></v-btn>
              <v-btn flat :icon="!lgAndUp" class="ma-0" color="success" ><span class="hidden-sm-and-down">results</span><v-icon >poll</v-icon></v-btn>
            </v-toolbar>
            <v-layout row wrap justify-space-between align-content-start class="py-0 px-1">
              <v-flex sm7 md9 class="pb-0">
                <div class="title">{{project.title}}</div>
                <div>Manager: <a class="info--text">@{{getUsername(project.manager)}}</a></div>
                <div>Team: <a class="pr-2" v-for="coworker in project.coworkers" :key="coworker">@{{getUsername(coworker)}}</a>
                  <!-- <dialoginviteuser :project="project" class="pa-0">
                    <v-btn small icon slot="customactivator" class="pa-0">
                      <v-icon>person_add</v-icon>
                    </v-btn>
                  </dialoginviteuser> -->
                </div>
                <div>Created: <span class="text-xs-justify primary--text">{{new Date(project.start).toLocaleDateString('pt-BR')}}</span></div>
                <v-divider class="my-2"></v-divider>
                <div class="layout row ml-0">
                  Description:
                  <v-spacer></v-spacer>
                  <v-tooltip left>
                    <v-btn icon flat class="pa-0 ma-0" @click.stop="toggleProject(project.id)" slot="activator">
                      <v-icon large>{{expandAll ? 'unfold_less' : 'unfold_more'}}</v-icon>
                    </v-btn>
                    <span>Open project</span>
                  </v-tooltip>
                </div>
                <p class="caption text-xs-justify primary--text">{{project.description}}</p>
                <!-- <div :class="{ 'display-1': lgAndUp, 'subheading': !lgAndUp, 'primary--text py-2': true }">{{project.title}}</div>
                <div :class="{ 'title': lgAndUp, 'body-1': !lgAndUp,  'py-1': true }">Manager: <a class="info--text">@{{getUsername(project.manager)}}</a></div>
                <div :class="{ 'title': lgAndUp, 'body-1': !lgAndUp,  'py-1': true }">Team:
                  <a class="pr-2" v-for="coworker in project.coworkers" :key="coworker">@{{getUsername(coworker)}}</a>
                  <dialoginviteuser :project="project">
                    <v-btn small icon slot="customactivator">
                      <v-icon>person_add</v-icon>
                    </v-btn>
                  </dialoginviteuser>
                </div>
                <div :class="{ 'title': lgAndUp, 'body-1': !lgAndUp,  'py-1': true }">Created: <span class="body-2 text-xs-justify primary--text">{{new Date(project.start).toLocaleDateString('pt-BR')}}</span></div>
                <v-divider class="my-2"></v-divider>
                <div :class="{ 'title': lgAndUp, 'body-1': !lgAndUp,  'py-1': true }">Description:</div>
                <p :class="{ 'body-2': lgAndUp, 'caption': !lgAndUp, 'text-xs-justify primary--text': true }">{{project.description}}</p> -->
              </v-flex>
              <v-flex sm5 md3 class="pb-0">
                <div class="text-xs-center" style="position: relative">
                  <v-layout row justify-center
                    :class="{
                    'chart--total': false,
                    'body-2': lgAndUp,
                    'caption': !lgAndUp,
                    'secondary--text': !lightOut,
                    'grey--text text--lighten-3': lightOut }">
                    
                    <v-flex xs3 class="px-0 error--text text-xs-right">{{taskMap[project.id].delayed}} <small>delayed</small></v-flex>
                    <v-flex xs1 class="px-0">|</v-flex>
                    <v-flex xs4 class="px-0 text-xs-center">{{taskMap[project.id].taskCount}} <small>tasks</small></v-flex>
                    <v-flex xs1 class="px-0">|</v-flex>
                    <v-flex xs3 class="px-0 success--text text-xs-left">{{taskMap[project.id].complete}} <small>completed</small></v-flex>
                    
                  </v-layout>
                  <div :id="`${project.id}-piechart`" :ref="`${project.id}-piechart`"></div>
                </div>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>

      </v-layout>
      
      <dialogblock :project="project" v-if="visionMap[project.id] && project.blocks.length === 0" @block-created="updateCharts" style="margin-left: -12px">
        <v-btn class="border-dashed-grey ma-0" slot="customactivator" ><v-icon small>add</v-icon>add block</v-btn>
      </dialogblock>

      <v-layout row v-if="visionMap[project.id] && project.blocks.length > 6" class="mt-4">
        <v-btn icon small @click="toggleAll" v-if="project.blocks.length > 0"><v-icon>view_day</v-icon></v-btn>
        <v-btn class="border-dashed-grey ma-0" block><v-icon small>add</v-icon>split to new roll</v-btn>
      </v-layout>
      <v-layout row align-content-start style="position: relative; margin-top: -4px;">
        <dialogblock :project="project" v-if="visionMap[project.id] && project.blocks.length > 0" @block-created="updateCharts">
          <div class="new-block__button border-dashed-grey" slot="customactivator">
            <v-icon small>add</v-icon>ADD BLOCK
          </div>
        </dialogblock>
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
              <dialogtask :suggestedBlock="block" :suggestedProject="project" @task-created="updateCharts">
                <v-btn small class="border-dashed-dark ma-0" slot="customactivator" style="min-width: 100%">
                  <v-icon small>add</v-icon> add task
                </v-btn>
              </dialogtask>
            </v-toolbar>
          </v-flex>
          
        </v-layout>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import taskcard from '../components/taskcard'
import dialogproject from '../components/dialog-project'
import dialogblock from '../components/dialog-block'
import dialogfinish from '../components/dialog-finish'
import dialoginviteuser from '../components/dialog-inviteuser'
import dialogtask from '../components/dialog-task'
import dialogprojectdel from '../components/dialog-projectdel'
import Highcharts from 'highcharts'
import { colors } from '../helpers'

const pieColors = (blocks) => blocks.map(b => colors[b.color])
const pieSeries = (blocks) => blocks.map(b => Object.assign({}, { name: b.text, y: b.tasks.length }))

export default {
  layout: 'alter',
  components: {taskcard, dialogproject, dialogtask, dialoginviteuser, dialogfinish, dialogprojectdel, dialogblock},
  data () {
    return {
      expandAll: false,
      descending: true,
      myCharts: null,
      visionMap: {},
      taskMap: {},
      blockMap: {}
    }
  },
  computed: {
    lightOut () { return this.$store.getters.lightOut },
    user () { return this.$store.getters.userByName('icarotorres') },
    sortButtonText () { return this.descending ? 'older first' : 'recent first' },
    userProjects () {
      let projects = this.$store.getters.userProjects(this.$store.getters.loggedUser)
        .sort(this.sortProjects)
      this.myCharts = this.highchart(projects)
      this.updateVisionMap(projects)
      this.updateBlockMap(projects, this.$store.getters)
      this.updateTaskMap(projects, this.$store.getters)
      return projects
    }
  },
  mounted () {
    this.updateCharts()
  },
  methods: {
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
    updateBlockMap (projects, getters) {
      this.blockMap = projects.reduce((blockMap, project) => {
        blockMap[project.id] = getters.projectBlocks(project.id) || []
        return blockMap
      }, {})
    },
    updateTaskMap (projects, getters) {
      this.taskMap = projects.reduce((taskMap, project) => {
        taskMap[project.id] = {
          delayed: getters.projectTasks(project.id).filter(t => this.isTaskDelayed(t)).length,
          complete: getters.projectTasks(project.id).filter(t => t.status === 1).length,
          taskCount: this.projectTaskCount(project)
        }
        return taskMap
      }, {})
    },
    projectTaskCount (project) { return this.blockMap[project.id].reduce((count, b) => count + b.tasks.length, 0) },
    updateCharts () {
      if (this.myCharts) this.myCharts.destroy()
      this.myCharts = this.highchart(this.userProjects)
      console.warn('chart update successfully')
    },
    // Build the chart
    highchart (projects) {
      if (!projects) return

      projects.forEach(p => {
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

