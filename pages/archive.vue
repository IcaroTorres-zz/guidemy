<template>
  <div style="position: relative">
    <div class="layout row control-buttons">
      <v-btn small color="primary" @click="descending = !descending">
        <v-icon>sort</v-icon>{{sortButtonText}}
      </v-btn>
      <v-btn small color="accent" @click="toggleAll" disabled>
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
                row
                justify-space-between
              >
                <v-flex>
                  <nuxt-link :to="{ name: 'project-id', params: {id: project.id} }" class="title">{{project.title}}</nuxt-link>
                  <div>Manager: 
                    <nuxt-link :to="{ name: 'user-username', params: {username: username(project.manager) }}" class="info--text">@{{username(project.manager)}}</nuxt-link>
                  </div>
                  <div>Team: 
                    <nuxt-link :to="{ name: 'user-username', params: {username: username(coworker)}}" class="pr-2" v-for="coworker in project.team" :key="coworker">@{{username(coworker)}}</nuxt-link>
                  </div>
                  <div>Created: 
                    <span class="text-xs-justify primary--text">{{project.created | locale}}</span>
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
                        disabled
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
          <v-btn
            style="margin-left: -12px"
            class="border-dashed-grey ma-0"
            disabled
          >
            <v-icon small>add</v-icon>add block
          </v-btn>
          <v-btn
            color="accent"
            style="font-size:10px"
            small
            flat
            disabled
          >
            default block setup ?
          </v-btn>
        </template>
        <v-layout
          row
          align-content-start
          style="position: relative; margin-top: -4px;"
        >
          <div
            disabled
            v-if="visionMap[project.id] && project.blocks.length > 0"
            class="new-block__button border-dashed-grey"
            slot="customactivator"
          >
            <v-icon small>add</v-icon>ADD BLOCK
          </div>
          <v-layout
            row
            align-content-start
            class="scroller-horiz"
            v-if="visionMap[project.id]"
            style="margin-right: 0; margin-bottom: -16px; margin-left: 44px;"
          >            
            <taskblock
              :archived="true"
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
        ? this.myArchive.sort(this.sortByStart)
        : this.myArchive.sort(this.sortByStart).reverse()
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
<style src="@/assets/style/style.css"></style>

