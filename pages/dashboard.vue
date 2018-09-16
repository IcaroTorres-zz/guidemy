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
            <v-divider v-if="pidx !== 0" class="py-2"></v-divider>
            <v-card flat>
              <projectToolbar :projectid="project.id"/>
              <v-card-text>
                <v-layout
                row wrap
                justify-space-between
              >
                <v-flex  style="max-width: calc(100% - 520px); min-width: 500px;">
                  <nuxt-link :to="{ name: 'project-id', params: {id: project.id} }" class="title">{{project.title}}</nuxt-link>
                  <div>Created: 
                    <span class="text-xs-justify primary--text">{{project.created | locale}}</span>
                  </div>
                  <div>Manager: 
                    <nuxt-link :to="{ name: 'user', params: {user: username(project.manager) }}" class="info--text">@{{username(project.manager)}}</nuxt-link>
                  </div>
                  <!-- <v-card class="transparent" flat>Team: 
                  </v-card> -->
                  <p class="pb-0">Team:
                    <nuxt-link 
                      :to="{ name: 'user', params: {user: username(coworker)}}" 
                      class="pr-2" 
                      v-for="coworker in project.team" 
                      :key="coworker">@{{username(coworker)}}
                    </nuxt-link>
                  </p>
                  <v-divider class="mb-2"></v-divider>
                  <div class="layout row ml-0">
                    Description:
                    <v-spacer></v-spacer>
                    <v-tooltip left>
                      <v-btn 
                        icon 
                        small 
                        flat 
                        class="pa-0 mr-1 ml-0 my-0" 
                        @click.stop="visionMap[project.id] = !visionMap[project.id]" 
                        slot="activator">
                        <v-icon>{{visionMap[project.id] ? 'unfold_less' : 'unfold_more'}}</v-icon>
                      </v-btn>
                      <span>{{visionMap[project.id] ? 'Collapse project' : 'Expand project'}}</span>
                    </v-tooltip>
                  </div>
                  <p class="caption text-xs-justify primary--text">{{project.description}}</p>
                </v-flex>
                <v-divider vertical class="hidden-sm-and-down" ></v-divider>
                <v-flex class="hidden-sm-and-down" style="max-width: 380px">
                  <projectPieChart :projectid="project.id"/>
                </v-flex>
              </v-layout>
              </v-card-text>
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
              :singleview="false"
              v-for="blockid in  project.blocks" :key="blockid"
              :blockid="blockid"/>
          </v-layout>
        </v-layout>
      </v-container>
  </div>
</template>
<script>
import { dblock } from '@/components/dialog'
import { projectPieChart, projectToolbar } from '@/components/project'
import taskblock from '@/components/taskblock'
import { Block } from '@/models'
import { defaultBlockSetup } from '@/helpers'

export default {
  components: {
    projectPieChart,
    projectToolbar,
    taskblock,
    dblock
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
      console.log(this.$store.getters.JSONState)
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
<style src="@/assets/style/style.css"></style>

