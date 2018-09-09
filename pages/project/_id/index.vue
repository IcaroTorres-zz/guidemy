<template>
  <v-container grid-list-xl>
        
    <v-layout row justify-center align-center>
      
      <v-flex xs12 class="pa-0">
        <v-card class="transparent" flat>
          <v-toolbar
            dense
            flat
            :class="{'secondary darken-1':lightOut, 'grey lighten-3': !lightOut, 'project--toolbar': true}"
          >
            <template v-if="project.manager === loggedUser">
              <dfinish :project="project">
                <v-btn 
                  small 
                  flat 
                  :icon="!lgAndUp" 
                  class="ma-0" 
                  color="success" 
                  slot="customactivator"
                  :disabled="project.manager !== loggedUser">
                  <v-icon>done_all</v-icon>
                  <span class="hidden-md-and-down">finish</span>
                </v-btn>
              </dfinish>
              <v-divider vertical></v-divider>
              <dproject :edition="true" :project="project">
                <v-btn 
                  small 
                  flat 
                  :icon="!lgAndUp" 
                  class="ma-0" 
                  color="warning" 
                  slot="customactivator"  
                  :disabled="project.manager !== loggedUser">
                  <v-icon >edit</v-icon>
                  <span class="hidden-md-and-down">edit</span>
                </v-btn>
              </dproject>
              <v-divider vertical></v-divider>
              <dprojectdel :project="project">
                <v-btn 
                  small 
                  flat 
                  :icon="!lgAndUp" 
                  class="ma-0" 
                  color="error" 
                  slot="customactivator"  
                  :disabled="project.manager !== loggedUser">
                  <v-icon >delete</v-icon>
                  <span class="hidden-md-and-down">remove</span>
                </v-btn>
              </dprojectdel>
              <v-divider vertical></v-divider>
              <dinvite :project="project" class="pa-0">
                <v-btn 
                  small 
                  icon 
                  slot="customactivator" 
                  class="pa-0" 
                  :disabled="project.manager !== loggedUser">
                  <v-icon>person_add</v-icon>
                </v-btn>
              </dinvite>                
            </template>
            <template v-else>
              <v-btn 
                small 
                flat 
                :icon="!lgAndUp" 
                class="ma-0" 
                disabled>
                <v-icon>done_all</v-icon>
                <span class="hidden-md-and-down">finish</span>
              </v-btn>
              <v-divider vertical></v-divider>
              <v-btn 
                small 
                flat 
                :icon="!lgAndUp" 
                class="ma-0" 
                disabled>
                <v-icon >edit</v-icon>
                <span class="hidden-md-and-down">edit</span>
              </v-btn>
              <v-divider vertical></v-divider>
              <v-btn 
                small 
                flat 
                :icon="!lgAndUp" 
                class="ma-0" 
                disabled>
                <v-icon >delete</v-icon>
                <span class="hidden-md-and-down">remove</span>
              </v-btn>
              <v-divider vertical></v-divider>
              <v-btn 
                small 
                icon 
                class="pa-0" 
                disabled>
                <v-icon>person_add</v-icon>
              </v-btn>
            </template>
            <v-spacer/>
            <ddailies :projectid="$route.params.id">
              <v-btn 
                small 
                flat 
                :icon="!lgAndUp" 
                class="ma-0" 
                color="info" 
                slot="customactivator">
                <span class="hidden-md-and-down">view dailes</span>
                <v-icon >update</v-icon>
              </v-btn>
            </ddailies>
            <v-divider vertical></v-divider>
            <v-btn 
              small 
              flat 
              :icon="!lgAndUp" 
              class="ma-0" 
              color="accent" 
              slot="" >
              <span class="hidden-md-and-down">contributions</span>
              <v-icon >supervised_user_circle</v-icon>
            </v-btn>
            <v-divider vertical></v-divider>
            <v-btn 
              small 
              flat 
              :icon="!lgAndUp" 
              class="ma-0" 
              color="success" >
              <span class="hidden-md-and-down">results</span>
              <v-icon >poll</v-icon>
            </v-btn>
          </v-toolbar>
          <v-layout
            row
            justify-space-between
            class="py-0 px-1"
          >
            <v-flex sm7 md8 >
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
            <v-divider vertical></v-divider>
            <v-flex sm5 md4>
              <div class="text-xs-center" style="position: relative">
                <v-layout row justify-space-around
                  :class="{
                  'body-2': lgAndUp,
                  'caption': !lgAndUp,
                  'secondary--text': !lightOut,
                  'grey--text text--lighten-3': lightOut }">
                  <div class="pa-3">
                    <span class="title error--text">{{delayedTasks(project.id).length}}</span><br> 
                    <small>delayed</small>
                  </div>
                  <div class="pa-3">
                    <span class="title">{{projectTasks(project.id).length}}</span><br>
                    <small>tasks</small>
                  </div>
                  <div class="pa-3">
                    <span class="title success--text">{{doneTasks(project.id).length}}</span><br> 
                    <small>done</small>
                  </div>
                </v-layout>
                <div :id="`${project.id}-piechart`" :ref="`${project.id}-piechart`"></div>
              </div>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>

    </v-layout>
    <template v-if="expand && project.blocks.length === 0">
      <dblock
        :project="project"
        style="margin-left: -12px"
        @block-created="updateChart(project)"
      >
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
      row v-if="expand && project.blocks.length > 6"
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
        v-if="expand && project.blocks.length > 0"
        @block-created="updateChart(project)"
      >
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
        v-if="expand"
        style="margin-right: 0; margin-bottom: -16px; margin-left: 44px;"
      >            
        <taskblock
          :singleview="true"
          @input="updateBlock($event)"
          v-for="blockid in  project.blocks" :key="blockid"
          :blockid="blockid"/>
          <!-- :blockid="blockid" -->
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import { dproject, dfinish, dblock, dinvite, dtask, dprojectdel, ddailies } from '@/components/dialog'
import taskblock from '@/components/taskblock'
import { Block } from '@/models'
import { defaultBlockSetup } from '@/helpers'

export default {
  validate ({ params, store }) {
    return !!store.state.projects[params.id] // Must be a valid project id
  },
  components: {taskblock, dproject, dtask, dinvite, dfinish, dprojectdel, dblock, ddailies},
  data: () => ({
    expand: true,
    myChart: undefined,
    defaultBlockSetup: defaultBlockSetup
  }),
  computed: {
    project () { return this.projects[this.$route.params.id] }
  },
  mounted () {
    this.updateChart(this.project)
  },
  methods: {
    updateChart (p) {
      if (this.myChart) this.myChart.destroy()
      this.myChart = this.highchart(p)
      console.warn(`project ${p.title}'s chart updated sucessfully`)
    },
    updateBlock (block) {
      // this.updateChart(this.projects[block.project])
      this.updateChart(this.project)
    },
    updateTask (task) {
      // this.updateChart(this.projects[task.project])
      this.updateChart(this.project)
    },
    defaultBlocks (p) {
      this.defaultBlockSetup.forEach(b => {
        let block = new Block({...b, project: p.id})
        this.$store.dispatch('saveBlock', block)
      })
      this.updateChart(p)
    }
  }
}
</script>

<style>
</style>
