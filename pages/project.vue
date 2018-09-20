<template>
  <div>
    <v-layout row justify-center align-center>
      <v-flex xs12 class="pa-0">
        <v-card class="transparent" flat>
          <projectToolbar :projectid="project.id"/>
          <v-card-text>
            <v-layout
              row wrap
              justify-space-between
            >
              <v-flex xs12 sm12 md8>
                <nuxt-link
                  :to="{ name: 'project-id', params: {id: project.id} }"
                  :class="{'title': !mdAndUp, 'display-1': mdAndUp, 'info--text': true}" v-text="project.title" />
                <div>Manager: 
                  <a class="info--text">@{{username(project.manager)}}</a>
                </div>
                <p class="pb-0 mr-2">Team:
                  <nuxt-link 
                    :to="{ name: 'user', params: {user: username(coworker)}}" 
                    class="pr-2" 
                    v-for="coworker in project.team" 
                    :key="coworker">@{{username(coworker)}}
                  </nuxt-link>
                </p>
                <div>Created: 
                  <span class="text-xs-justify primary--text">{{project.created | locale}}</span>
                </div>
                <v-divider class="my-2"></v-divider>
                <div>Description:</div>
                <p class="caption text-xs-justify primary--text mr-2">{{project.description}}</p>
              </v-flex>
              <!-- <v-divider vertical class="hidden-sm-and-down"></v-divider> -->
              <v-flex md4 class="hidden-sm-and-down" style="border-left: .75px solid #555">
                <projectPieChart :projectid="project.id"/>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <nuxt-child :key="$route.params.id" v-if="project.status === 0"/>
    <v-layout row v-else>
      <h2 class="text-xs-center primary--text subheading">This project is <b class="error--text">Archived</b>.
      To enable all features, unarchieve it on Project Toolbar "unarchive" button.
      </h2>
    </v-layout>
  </div>
</template>

<script>
import { projectPieChart, projectToolbar } from '@/components/project'
import { mapState, mapGetters } from 'vuex'
export default {
  validate ({ params, store }) {
    return !!store.state.projects[params.id] // Must be a valid project id
  },
  components: {
    projectPieChart,
    projectToolbar
  },
  computed: {
    ...mapState(['projects']),
    ...mapGetters(['username', 'mdAndUp']),
    project () { return this.projects[this.$route.params.id] }
  }
}
</script>

<style>
</style>
