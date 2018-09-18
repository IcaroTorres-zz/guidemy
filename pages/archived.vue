<template>
  <v-layout row wrap justify-center align-center style="position: relative">
    <v-flex xs12 row class="layout control-buttons">
      <v-btn small color="primary" @click="descending = !descending">
        <v-icon>sort</v-icon>{{sortButtonText}}
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn small color="primary" @click="printJSONState">
        <v-icon>print</v-icon>log json state
      </v-btn>
    </v-flex>

    <v-flex xs12 v-for="(project, pidx) in userProjects" :key="project.id">
      <v-divider v-if="pidx !== 0" class="my-3"></v-divider>
      <v-card flat>
        <projectToolbar :projectid="project.id"/>
        <v-card-text>
          <v-layout
          row wrap
          justify-space-between
        >
          <v-flex xs12 sm12 md8>
            <nuxt-link :to="{ name: 'project-id', params: {id: project.id} }" class="display-1 info--text">{{project.title}}</nuxt-link>
            <div>Manager: 
              <nuxt-link :to="{ name: 'user', params: {user: username(project.manager) }}" class="info--text">@{{username(project.manager)}}</nuxt-link>
            </div>
            <div>Team: 
              <nuxt-link :to="{ name: 'user', params: {user: username(coworker)}}" class="pr-2" v-for="coworker in project.team" :key="coworker">@{{username(coworker)}}</nuxt-link>
            </div>
            <div>Created: 
              <span class="text-xs-justify primary--text">{{project.created | locale}}</span>
            </div>
            <v-divider class="my-2"></v-divider>
            <div class="layout row ml-0">
              Description:
              <!-- <v-spacer></v-spacer>
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
              </v-tooltip> -->
            </div>
            <p class="caption text-xs-justify primary--text mr-2">{{project.description}}</p>
          </v-flex>
          <!-- <v-divider vertical class="hidden-sm-and-down" ></v-divider> -->
          <v-flex md4 class="hidden-sm-and-down" style="border-left: .75px solid #555;">
            <projectPieChart :projectid="project.id"/>
          </v-flex>
        </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>

  </v-layout>
</template>
<script>
import { projectPieChart, projectToolbar } from '@/components/project'
import { Block } from '@/models'
import {mapGetters} from 'vuex'
export default {
  components: {
    projectPieChart,
    projectToolbar
  },
  data () {
    return {
      expandAll: false,
      descending: true
    }
  },
  computed: {
    ...mapGetters(['myArchive', 'username']),
    sortButtonText () { return this.descending ? 'older first' : 'recent first' },
    userProjects () {
      const projects = this.myArchive.sort(this.sortByStart)
      return this.descending ? projects : projects.reverse()
    }
  },
  methods: {
    printJSONState () {
      console.log(JSON.parse(this.$store.getters.JSONState))
    },
    defaultBlocks (p) {
      this.defaultBlockSetup.forEach(b => {
        let block = new Block({...b, project: p.id})
        this.$store.dispatch('saveBlock', block)
      })
    }
  }
}
</script>

