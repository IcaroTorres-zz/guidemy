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
    <v-container fluid grid-list-xl v-for="project in userProjects" :key="project.id">
      <v-layout column>
        
        <v-flex xs12 class="pa-0">
          <v-card class="transparent" flat>
            <v-toolbar dense flat class="secondary darken-1 project--toolbar">
              <dialogfinish :project="project">
                <v-btn flat :icon="!browserMode" class="ma-0" color="success" slot="customactivator" >
                  <v-icon >check_circle_outline</v-icon>
                  <span v-if="browserMode">finish</span>
                </v-btn>
              </dialogfinish>
              <dialogproject :edition="true" :project="project">
                <v-btn flat :icon="!browserMode" class="ma-0" color="warning" slot="customactivator" ><v-icon >edit</v-icon><span v-if="browserMode">edit</span></v-btn>
              </dialogproject>
              <dialogprojectdel :project="project">
                <v-btn flat :icon="!browserMode" class="ma-0" color="error" slot="customactivator" ><v-icon >delete</v-icon><span v-if="browserMode">remove</span></v-btn>
              </dialogprojectdel>
              <v-spacer/>
              <v-btn flat :icon="!browserMode" class="ma-0" color="info" slot="" ><span v-if="browserMode">view dailes</span><v-icon >update</v-icon></v-btn>
              <v-btn flat :icon="!browserMode" class="ma-0" color="accent" slot="" ><span v-if="browserMode">contributions</span><v-icon >supervised_user_circle</v-icon></v-btn>
              <v-btn flat :icon="!browserMode" class="ma-0" color="success" ><span v-if="browserMode">results</span><v-icon >poll</v-icon></v-btn>
            </v-toolbar>
            <v-layout row wrap justify-space-between align-content-start class="py-0 px-1">
              <v-flex sm7 md9 class="pb-0">
                <div :class="{ 'display-1': browserMode, 'subheading': !browserMode, 'primary--text py-2': true }">{{project.title}}</div>
                <div :class="{ 'title': browserMode, 'body-1': !browserMode,  'py-1': true }">Manager: <a class="info--text">@{{getUsername(project.manager)}}</a></div>
                <div :class="{ 'title': browserMode, 'body-1': !browserMode,  'py-1': true }">Team:
                  <a class="pr-2" v-for="coworker in project.coworkers" :key="coworker">@{{getUsername(coworker)}}</a>
                  <dialoginviteuser :project="project">
                    <v-btn small icon slot="customactivator">
                      <v-icon>person_add</v-icon>
                    </v-btn>
                  </dialoginviteuser>
                </div>
                <div :class="{ 'title': browserMode, 'body-1': !browserMode,  'py-1': true }">Created: <span class="body-2 text-xs-justify primary--text">{{new Date(project.start).toLocaleDateString('pt-BR')}}</span></div>
                <v-divider class="my-2"></v-divider>
                <div :class="{ 'title': browserMode, 'body-1': !browserMode,  'py-1': true }">Description:</div>
                <p :class="{ 'body-2': browserMode, 'caption': !browserMode, 'text-xs-justify primary--text': true }">{{project.description}}</p>
              </v-flex>
              <v-flex sm5 md3 class="pb-0">
                <div class="text-xs-center" style="position: relative">
                  <!-- <pie-chart
                    :data="pizzaChart(project)"
                    :discrete="true"
                    thousands="."
                    decimal=","
                    height="180px">
                  </pie-chart> -->
                  <div :class="{ 'chart--total': true, 'body-2': browserMode, 'caption': !browserMode  }">
                    {{projectTaskCount(project)}}<br><small>tasks</small>
                  </div>
                  <div :id="`${project.id}-piechart`"></div>
                </div>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>

      </v-layout>
      
      <dialogblock :project="project" v-if="expand && project.blocks.length === 0">
        <v-btn class="border-dashed-grey ma-0" slot="customactivator"><v-icon small>add</v-icon>add block</v-btn>
      </dialogblock>
      <v-layout row align-content-start style="position: relative" class="mt-4">
        <dialogblock :project="project" v-if="expand && project.blocks.length > 0">
          <div class="new-block__button border-dashed-grey" slot="customactivator">
            <v-icon small>add</v-icon>ADD BLOCK
          </div>
        </dialogblock>
      <v-layout row align-content-start class="scroller-horiz" v-if="expand" style="margin-left: 32px;">
        <v-flex v-for="(block, i) in project.blocks" :key="i" class="project-block-container">
          <v-toolbar light :class="block.color + ' block-toolbar'" dense>
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
          <v-toolbar :class="'block-footer ' + block.color" dense>
            <v-spacer/>
            <dialogtask :suggestedBlock="block" :suggestedProject="project">
              <v-btn small class="border-dashed-dark ma-0" slot="customactivator">
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
  components: {taskcard, dialogproject, dialogtask, dialoginviteuser, dialogfinish, dialogprojectdel, dialogblock},
  data () {
    return {
      expand: false,
      descending: true
    }
  },
  computed: {
    sortButtonText () { return this.descending ? 'older first' : 'recent first' },
    userProjects () {
      return this.$store.getters.userProjects(this.$store.getters.loggedUser)
        .sort((a, b) => this.descending ? new Date(b.start).getTime() - new Date(a.start).getTime() : new Date(a.start).getTime() - new Date(b.start).getTime())
    },
    user () {
      return this.$store.getters.userByName('icarotorres')
    }
  },
  mounted () {
    this.highchart(this.userProjects)
  },
  methods: {
    // pizzaChart (project) {
    //   return project.blocks.reduce((chart, b) => {
    //     chart[b.text] = b.tasks.length
    //     return chart
    //   }, {})
    // },
    addBlock (project, block) {
      //
    },
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

