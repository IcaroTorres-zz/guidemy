<template>
  <div class="project-area">
    <projectToolbar :projectid="project.id"/>
    <!-- <v-layout row wrap justify-center align-center> -->
      <!-- <v-flex xs12 class="pa-0"> -->
        <v-card class="transparent" flat>
          <v-card-text>
            <v-layout
              row wrap
              justify-space-between
            >
              <v-flex xs12 sm12 md8 class="px-0">
                <v-tooltip bottom>
                  <v-btn icon small @click="expand = !expand" slot="activator" class="ma-0">
                    <v-icon>{{expand ? 'expand_less' : 'expand_more'}}</v-icon>
                  </v-btn>
                  <span>{{expand ? 'hide details' : 'view details'}}</span>
                </v-tooltip>
                <nuxt-link
                  :to="{ name: 'project-id', params: {id: project.id} }"
                  :class="{'title': !mdAndUp, 'headline': mdAndUp, 'info--text pt-2': true}" v-text="project.title" />
                <div v-show="expand">Manager: 
                  <a class="info--text">@{{username(project.manager)}}</a>
                </div>
                <p class="pb-0 mr-2" v-show="expand">Team:
                  <nuxt-link 
                    :to="{ name: 'user', params: {user: username(coworker)}}" 
                    class="pr-2" 
                    v-for="coworker in project.team" 
                    :key="coworker">@{{username(coworker)}}
                  </nuxt-link>
                </p>
                <div v-show="expand">Created: 
                  <span class="text-xs-justify primary--text">{{project.created | locale}}</span>
                </div>
                <v-divider class="my-2" v-show="expand"></v-divider>
                <div v-show="expand">Description:</div>
                <p class="caption text-xs-justify primary--text mr-2" v-show="expand">{{project.description}}</p>
              </v-flex>
              <!-- <v-divider vertical class="hidden-sm-and-down"></v-divider> -->
              <v-flex md4 class="hidden-sm-and-down px-0" style="border-left: .75px solid #555">
                <projectPieChart :projectid="project.id" :hidechart="expand"/>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      <!-- </v-flex> -->
    <!-- </v-layout> -->
    <nuxt-child :key="$route.params.id"  v-if="project.status === 0"/>
    <v-layout row v-else>
      <h2 class="text-xs-center primary--text subheading">This project is <b class="error--text">Archived</b>.
      To enable all features, unarchieve it on Project Toolbar "unarchive" button.
      </h2>
    </v-layout>
    <!-- <nuxt-child :key="$route.params.id"  v-if="project.status === 0" style="position: sticky; top: 64px; display: contents"/>
    <v-layout row v-else>
      <h2 class="text-xs-center primary--text subheading">This project is <b class="error--text">Archived</b>.
      To enable all features, unarchieve it on Project Toolbar "unarchive" button.
      </h2>
    </v-layout> -->
  </div>
</template>

<script>
import { projectPieChart, projectToolbar } from '@/components/project'
import { mapState, mapGetters } from 'vuex'
export default {
  validate ({ params, store }) {
    return !!store.state.projects[params.id] // Must be a valid project id
  },
  data: () => ({
    expand: true
  }),
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
<style scoped>
.project-area {
   /* background: url(https://images.unsplash.com/photo-1501876991173-f9c47cd28268?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=11822fe6ab2de36ee07cd74486dbdaf4&auto=format&fit=crop&w=1306&q=80) center center fixed no-repeat; */
   /* background-attachment: fixed; */
   background-size: cover;
   /* background-position: 50% 50%; */
   /* background-repeat: no-repeat;  */
}
</style>

