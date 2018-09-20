<template>
  <v-toolbar
  card
  dense
  flat
  :class="{'secondary darken-1':lightOut, 'grey lighten-3': !lightOut, 'project--toolbar': true}"
  >
    <template v-if="toolbarProject.manager === loggedUser">
      <darchive :project="toolbarProject" >
        <v-btn 
          class="ma-0"
          flat 
          :icon="!lgAndUp"
          :color="toolbarProject.status === 0 ? 'error' : 'info'" 
          slot="customactivator">
          <v-icon>{{toolbarProject.status === 0 ? 'archive' : 'publish'}}</v-icon>
          <span class="hidden-md-and-down">{{toolbarProject.status === 0 ? 'archive' : 'unarchive'}}</span>
        </v-btn>
      </darchive>
      <v-divider vertical></v-divider>
      <dproject :edition="true" :project="toolbarProject" >
        <v-btn 
           class="ma-0"
          flat 
          :icon="!lgAndUp"
          color="warning" 
          slot="customactivator">
          <v-icon >edit</v-icon>
          <span class="hidden-md-and-down">edit</span>
        </v-btn>
      </dproject>
      <v-divider vertical></v-divider>
      <dinvite :project="toolbarProject" class="pa-0" >
        <v-btn
          icon 
          slot="customactivator"
          class="pa-0" >
          <v-icon>person_add</v-icon>
        </v-btn>
      </dinvite>                
    </template>
    <template v-else>
      <v-btn 
        class="ma-0" 
        flat 
        :icon="!lgAndUp"  
        disabled>
        <v-icon>archive</v-icon>
        <span class="hidden-md-and-down">archive</span>
      </v-btn>
      <v-divider vertical></v-divider>
      <v-btn 
        class="ma-0" 
        flat 
        :icon="!lgAndUp"  
        disabled>
        <v-icon >edit</v-icon>
        <span class="hidden-md-and-down">edit</span>
      </v-btn>
      <v-divider vertical></v-divider>
      <v-btn 
         
        icon 
        class="pa-0" 
        disabled>
        <v-icon>person_add</v-icon>
      </v-btn>
    </template>
    <v-spacer/>
    <v-btn
      nuxt
      exact
      :to="`/project/${toolbarProject.id}/activities`"
      class="ma-0" 
      flat 
      :icon="!lgAndUp" 
      color="accent">
      <span class="hidden-md-and-down">activities</span>
      <v-icon >receipt</v-icon>
    </v-btn>
    <v-divider vertical></v-divider>
    <v-btn
      nuxt
      exact
      :to="`/project/${toolbarProject.id}/dailies`"
      class="ma-0" 
      flat 
      :icon="!lgAndUp"  
      color="info">
      <span class="hidden-md-and-down">project dailes</span>
      <v-icon >supervised_user_circle</v-icon>
    </v-btn>
    <v-divider vertical></v-divider>
    <v-btn 
      nuxt
      exact
      :to="`/project/${toolbarProject.id}/results`"
      class="ma-0" 
      flat 
      :icon="!lgAndUp" 
      color="success" >
      <span class="hidden-md-and-down">results</span>
      <v-icon >poll</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { dproject, darchive, dblock, dinvite, dtask } from '@/components/dialog'
export default {
  name: 'toolbarproject',
  components: { dproject, dtask, dinvite, darchive, dblock },
  props: {
    projectid: { required: true, type: [String, Number] }
  },
  computed: {
    ...mapState([
      'loggedUser',
      'projects',
      'lightOut'
    ]),
    ...mapGetters(['lgAndUp']),
    toolbarProject () {
      return this.projects[this.projectid]
    }
  }
}
</script>
