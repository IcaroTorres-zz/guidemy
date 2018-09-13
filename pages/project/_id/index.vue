<template>
  <v-container grid-list-xl>
        
    <v-layout row justify-center align-center>
      
      <v-flex xs12 class="pa-0">
        <v-card class="transparent" flat>
          <projectToolbar :projectid="project.id"/>
          <v-card-text>
            <v-layout
              row
              justify-space-between
            >
              <v-flex>
                <a class="title">{{project.title}}</a>
                <div>Manager: 
                  <a class="info--text">@{{username(project.manager)}}</a>
                </div>
                <div>Team: 
                  <a class="pr-2" v-for="coworker in project.team" :key="coworker">@{{username(coworker)}}</a>
                </div>
                <div>Created: 
                  <span class="text-xs-justify primary--text">{{new Date(project.created).toLocaleDateString()}}</span>
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
              <v-flex class="hidden-sm-and-down" style="max-width: 380px">
                <projectPieChart :projectid="project.id"/>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>

    </v-layout>
    <template v-if="expand && project.blocks.length === 0">
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
        v-if="expand"
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
  data: () => ({
    expand: true,
    defaultBlockSetup: defaultBlockSetup
  }),
  computed: {
    project () { return this.projects[this.$route.params.id] }
  },
  methods: {
    // updateChart (p) {
    //   if (this.myChart) this.myChart.destroy()
    //   this.myChart = this.highchart(p)
    //   console.warn(`project ${p.title}'s chart updated sucessfully`)
    // },
    defaultBlocks (p) {
      this.defaultBlockSetup.forEach(b => {
        let block = new Block({...b, project: p.id})
        this.$store.dispatch('saveBlock', block)
      })
      // this.updateChart(p)
    }
  }
}
</script>

<style>
</style>
