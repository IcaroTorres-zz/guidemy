<template>
  <v-layout row wrap justify-center align-center style="position: relative">
    <v-flex xs12 class="layout control-buttons">
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
            <div>Created: 
              <span class="text-xs-justify primary--text">{{project.created | locale}}</span>
            </div>
            <div>Manager: 
              <nuxt-link :to="{ name: 'user', params: {user: username(project.manager) }}" class="info--text">@{{username(project.manager)}}</nuxt-link>
            </div>
            <p class="pb-0 mr-2">Team:
              <nuxt-link 
                :to="{ name: 'user', params: {user: username(coworker)}}" 
                class="pr-2" 
                v-for="coworker in project.team" 
                :key="coworker">@{{username(coworker)}}
              </nuxt-link>
            </p>
            <v-divider class="mb-2"></v-divider>
            <div class="layout row ml-0">Description:</div>
            <p class="caption text-xs-justify primary--text mr-2">{{project.description}}</p>
          </v-flex>
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
import { dblock } from '@/components/dialog'
import { projectPieChart, projectToolbar } from '@/components/project'
import { Block } from '@/models'
import { defaultBlockSetup } from '@/helpers'
import { mapGetters } from 'vuex'

export default {
  components: {
    projectPieChart,
    projectToolbar,
    dblock
  },
  data () {
    return {
      descending: true,
      defaultBlockSetup: defaultBlockSetup
    }
  },
  computed: {
    ...mapGetters(['myProjects', 'username']),
    sortButtonText () { return this.descending ? 'older first' : 'recent first' },
    userProjects () {
      const projects = this.myProjects.sort(this.sortByStart)
      return this.descending ? projects : projects.reverse()
    }
  },
  methods: {
    printJSONState () {
      console.log(JSON.parse(this.$store.getters.JSONState))
      console.log(this.$store.getters.JSONState)
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

