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
    </div>
      <v-container grid-list-xl v-for="(project, pidx) in userProjects" :key="project.id" class="pt-1">
        
        <v-layout row justify-center align-center>
          
          <v-flex xs12 class="pa-0">
            <v-card flat>
              <v-divider v-if="pidx !== 0" class="py-2"></v-divider>
              <projectToolbar :projectid="project.id"/>
              <v-layout
                row
                justify-space-between
                class="py-0 px-1"
              >
                <v-flex xs12 md8 >
                  <a class="title">{{project.title}}</a>
                  <div>Manager: 
                    <a class="info--text">@{{username(project.manager)}}</a>
                  </div>
                  <div>Team: 
                    <a class="pr-2" v-for="coworker in project.coworkers" :key="coworker">@{{username(coworker)}}</a>
                  </div>
                  <div>Created: 
                    <span class="text-xs-justify primary--text">{{new Date(project.start).toLocaleDateString()}}</span>
                  </div>
                  <v-divider class="my-2"></v-divider>
                  <div class="layout row ml-0">
                    Description:
                    <v-spacer></v-spacer>
                    <v-tooltip left>
                      <v-btn 
                        icon 
                        small 
                        flat 
                        class="pa-0 mr-1 ml-0 my-0" 
                        @click.stop="expand = !expand" 
                        slot="activator">
                        <v-icon>{{expand ? 'unfold_less' : 'unfold_more'}}</v-icon>
                      </v-btn>
                      <span>{{expand ? 'Collapse project' : 'Expand project'}}</span>
                    </v-tooltip>
                  </div>
                  <p class="caption text-xs-justify primary--text">{{project.description}}</p>
                </v-flex>
                <v-divider vertical class="hidden-sm-and-down"></v-divider>
                <v-flex sm5 md4 class="hidden-sm-and-down">
                  <projectPieChart :projectid="project.id"/>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>

        </v-layout>
        <template v-if="visionMap[project.id] && project.blocks.length == 0">
          <dblock
            :project="project"
            style="margin-left: -12px"
          >
            <!-- @block-created="updateChart(project)" -->
            <v-btn
              class="border-dashed-grey ma-0"
              slot="customactivator"
            >
              <v-icon small>add</v-icon>add block
            </v-btn>
          </dblock>
          <v-btn
            color="accent"
            style="font-size:10px"
            small
            flat
            @click="defaultBlocks(project)"
          >
            default block setup ?
          </v-btn>
        </template>
        <v-layout
          row v-if="visionMap[project.id] && project.blocks.length > 6"
          class="mt-4"
        >
          <v-btn
            icon
            small
            v-if="project.blocks.length > 0"
          >
            <v-icon>view_day</v-icon>
          </v-btn>
          <v-btn
            class="border-dashed-grey ma-0"
            block
          >
            <v-icon small>add</v-icon>split to new roll
          </v-btn>
        </v-layout>
        <v-layout
          row
          align-content-start
          style="position: relative; margin-top: -4px;"
        >
          <dblock
            :project="project"
            v-if="visionMap[project.id] && project.blocks.length > 0"
          >
            <!-- @block-created="updateChart(project)" -->
            <div
              class="new-block__button border-dashed-grey"
              slot="customactivator"
            >
              <v-icon small>add</v-icon>ADD BLOCK
            </div>
          </dblock>
          <v-layout
            row
            align-content-start
            class="scroller-horiz"
            v-if="visionMap[project.id]"
            style="margin-right: 0; margin-bottom: -16px; margin-left: 44px;"
          >            
              <!-- @input="updateBlock($event)" -->
            <taskblock
              :singleview="true"
              v-for="blockid in  project.blocks" :key="blockid"
              :blockid="blockid"/>
          </v-layout>
        </v-layout>
      </v-container>

    <!-- <v-container grid-list-xl v-for="(project, pidx) in userProjects" :key="project.id" class="pt-1">
      
      <v-layout column>
        
        <v-flex xs12 class="pa-0">
          <v-card class="transparent" flat>
            <v-divider v-if="pidx !== 0" class="py-2"></v-divider>
            <v-toolbar dense flat :class="{'secondary darken-1':lightOut, 'grey lighten-3': !lightOut, 'project--toolbar': true}">
            
              <template v-if="project.manager === loggedUser">
                <dfinish :project="project">
                  <v-btn small flat :icon="!lgAndUp" class="ma-0" color="success" slot="customactivator" :disabled="project.manager !== loggedUser">
                    <v-icon>done_all</v-icon><span class="hidden-md-and-down">finish</span>
                  </v-btn>
                </dfinish>
                <v-divider vertical></v-divider>
                <dproject :edition="true" :project="project">
                  <v-btn small flat :icon="!lgAndUp" class="ma-0" color="warning" slot="customactivator"  :disabled="project.manager !== loggedUser">
                    <v-icon >edit</v-icon><span class="hidden-md-and-down">edit</span>
                  </v-btn>
                </dproject>
                <v-divider vertical></v-divider>
                <dprojectdel :project="project">
                  <v-btn small flat :icon="!lgAndUp" class="ma-0" color="error" slot="customactivator"  :disabled="project.manager !== loggedUser">
                    <v-icon >delete</v-icon><span class="hidden-md-and-down">remove</span>
                  </v-btn>
                </dprojectdel>
                <v-divider vertical></v-divider>
                <dinvite :project="project" class="pa-0">
                  <v-btn small icon slot="customactivator" class="pa-0" :disabled="project.manager !== loggedUser">
                    <v-icon>person_add</v-icon>
                  </v-btn>
                </dinvite>                
              </template>
              <template v-else>
                <v-btn small flat :icon="!lgAndUp" class="ma-0" disabled>
                  <v-icon>done_all</v-icon><span class="hidden-md-and-down">finish</span>
                </v-btn>
                <v-divider vertical></v-divider>
                <v-btn small flat :icon="!lgAndUp" class="ma-0" disabled>
                  <v-icon >edit</v-icon><span class="hidden-md-and-down">edit</span>
                </v-btn>
                <v-divider vertical></v-divider>
                <v-btn small flat :icon="!lgAndUp" class="ma-0" disabled>
                  <v-icon >delete</v-icon><span class="hidden-md-and-down">remove</span>
                </v-btn>
                <v-divider vertical></v-divider>
                <v-btn small icon class="pa-0" disabled>
                  <v-icon>person_add</v-icon>
                </v-btn>
              </template>
              <v-spacer/>
              <ddailies :projectid="project.id">
                <v-btn small flat :icon="!lgAndUp" class="ma-0" color="info" slot="customactivator">
                  <span class="hidden-md-and-down">view dailes</span><v-icon >update</v-icon>
                </v-btn>
              </ddailies>
              <v-divider vertical></v-divider>
              <v-btn small flat :icon="!lgAndUp" class="ma-0" color="accent" slot="" ><span class="hidden-md-and-down">contributions</span><v-icon >supervised_user_circle</v-icon></v-btn>
              <v-divider vertical></v-divider>
              <v-btn small flat :icon="!lgAndUp" class="ma-0" color="success" ><span class="hidden-md-and-down">results</span><v-icon >poll</v-icon></v-btn>
            </v-toolbar>
            <v-layout row justify-space-between class="py-0 px-1">
              <v-flex sm7 md8 >
                <nuxt-link nuxt :to="{ name:'project-id', params: { id: project.id } }" class="title">{{project.title}}</nuxt-link>
                <div>Manager: <a class="info--text">@{{username(project.manager)}}</a></div>
                <div>Team: <a class="pr-2" v-for="coworker in project.coworkers" :key="coworker">@{{username(coworker)}}</a></div>
                <div>Created: <span class="text-xs-justify primary--text">{{new Date(project.start).toLocaleDateString()}}</span></div>
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
              <v-divider vertical></v-divider>
              <v-flex sm5 md4>
                <div class="text-xs-center" style="position: relative">
                  <v-layout row justify-space-around
                    :class="{
                    'body-2': lgAndUp,
                    'caption': !lgAndUp,
                    'secondary--text': !lightOut,
                    'grey--text text--lighten-3': lightOut }">

                    <div class="pa-3"><span class="title error--text">{{delayedTasks(project.id).length}}</span><br> <small>delayed</small></div>
                    <div class="pa-3"><span class="title">{{projectTasks(project.id).length}}</span><br> <small>tasks</small></div>
                    <div class="pa-3"><span class="title success--text">{{doneTasks(project.id).length}}</span><br> <small>done</small></div>
                    
                  </v-layout>
                  <div :id="`${project.id}-piechart`" :ref="`${project.id}-piechart`"></div>
                </div>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>

      </v-layout>
      
      <template v-if="visionMap[project.id] && project.blocks.length === 0">

        <dblock :project="project"
          style="margin-left: -12px" @block-created="updateChart(project)">
          <v-btn class="border-dashed-grey ma-0" slot="customactivator" ><v-icon small>add</v-icon>add block</v-btn>
        </dblock>
        <v-btn color="accent" style="font-size:10px" small flat @click="defaultBlocks(project)" >default block setup ?</v-btn>

      </template>
      <v-layout row v-if="visionMap[project.id] && project.blocks.length > 6" class="mt-4">
        <v-btn icon small @click="toggleAll" v-if="project.blocks.length > 0"><v-icon>view_day</v-icon></v-btn>
        <v-btn class="border-dashed-grey ma-0" block><v-icon small>add</v-icon>split to new roll</v-btn>
      </v-layout>
      <v-layout row align-content-start style="position: relative; margin-top: -4px;">

        <dblock :project="project" v-if="visionMap[project.id] && project.blocks.length > 0" @block-created="updateChart(project)">
          <div class="new-block__button border-dashed-grey" slot="customactivator">
            <v-icon small>add</v-icon>ADD BLOCK
          </div>
        </dblock>

        <v-layout row align-content-start class="scroller-horiz" v-if="visionMap[project.id]" style="margin-right: 0; margin-bottom: -16px; margin-left: 44px;">
                       
          <taskblock
            @input="updateBlock($event)"
            v-for="blockid in  project.blocks" :key="blockid"
            :blockid="blockid"/>

          <!-- <v-flex v-for="block in project.blocks" :key="block" class="px-0 mr-2 project-block-container">
            <v-toolbar light :class=" blocks[block].color + ' block-toolbar'" dense>
              <v-toolbar-title v-html=" blocks[block].text"/>
              <v-spacer/>
              <v-btn small icon light>
                <v-icon>more_horiz</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card :class="'transparent project-block scroller scroller__' +  blocks[block].color" flat style="position: relative;">
              <v-expansion-panel expand>
                <taskcard :class="{ 'mt-1': tidx !== 0 }"
                  v-model.sync="tasks[t]"
                  @input="updateChart($event)"
                  v-for="(t, tidx) in  blocks[block].tasks" :key="t"
                  :block=" blocks[block]" />
              </v-expansion-panel>
            </v-card>
            <v-toolbar :class="'block-footer ' +  blocks[block].color" dense>
              <v-icon style="width: 12px;">drag_indicator</v-icon>
              <v-icon style="width: 12px;">drag_indicator</v-icon>
              <v-icon style="width: 12px;">drag_indicator</v-icon>
              <v-icon style="width: 12px;">drag_indicator</v-icon>
              <v-icon style="width: 12px;">drag_indicator</v-icon>
              <v-icon style="width: 12px;">drag_indicator</v-icon>
              <v-spacer/>
              <dtask :suggestedBlock="blocks[block]" :suggestedProject="project"
                @task-created="updateChart(project)">
                <v-btn small class="border-dashed-dark ma-0" slot="customactivator" style="min-width: 100%">
                  <v-icon small>add</v-icon> add task
                </v-btn>
              </dtask>
            </v-toolbar>
          </v-flex> -->
          
        <!-- </v-layout> -->
      <!-- </v-layout> -->
    <!-- </v-container> -->
  </div>
</template>
<script>
import { dproject, dfinish, dblock, dinvite, dtask, dprojectdel, ddailies } from '@/components/dialog'
import { projectPieChart, projectToolbar } from '@/components/project'
import taskblock from '@/components/taskblock'
import { Block } from '@/models'
import { defaultBlockSetup } from '@/helpers'

export default {
  validate ({ params, store }) {
    return !!store.state.projects[params.id] // Must be a valid project id
  },
  components: {
    projectPieChart,
    projectToolbar,
    taskblock,
    dproject,
    dtask,
    dinvite,
    dfinish,
    dprojectdel,
    dblock,
    ddailies
  },
  data () {
    return {
      expandAll: false,
      descending: true,
      myCharts: {},
      visionMap: {},
      defaultBlockSetup: defaultBlockSetup
    }
  },
  computed: {
    sortButtonText () { return this.descending ? 'older first' : 'recent first' },
    userProjects () {
      return this.descending
        ? this.myProjects.sort(this.sortByStart)
        : this.myProjects.sort(this.sortByStart).reverse()
    }
  },
  created () {
    this.visionMap = this.userProjects
      .reduce((map, p) => Object
        .assign(map, {...map, [p.id]: !!this.visionMap[p.id]}), {})
  },
  methods: {
    printJSONState () {
      console.log(JSON.parse(this.$store.getters.JSONState))
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
    defaultBlocks (p) {
      this.defaultBlockSetup.forEach(b => {
        let block = new Block({...b, project: p.id})
        this.$store.dispatch('saveBlock', block)
          .then((data) => {
            console.log('success applyied data: ')
            console.dir(data)
          })
      })
    }
  }
}
</script>
<style src="assets/style/style.css"></style>

