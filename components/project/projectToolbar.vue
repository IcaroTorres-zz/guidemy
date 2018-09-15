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
 
          color="primary" 
          slot="customactivator"
          :disabled="toolbarProject.manager !== loggedUser">
          <v-icon>archive</v-icon>
          <span class="hidden-md-and-down">archive</span>
        </v-btn>
      </darchive>
      <v-divider vertical></v-divider>
      <dproject :edition="true" :project="toolbarProject" >
        <v-btn 
           class="ma-0"
          flat 
          :icon="!lgAndUp" 
 
          color="warning" 
          slot="customactivator"  
          :disabled="toolbarProject.manager !== loggedUser">
          <v-icon >edit</v-icon>
          <span class="hidden-md-and-down">edit</span>
        </v-btn>
      </dproject>
      <v-divider vertical></v-divider>
      <dinvite :project="toolbarProject" class="pa-0" >
        <v-btn 
           
          icon 
          slot="customactivator" 
          class="pa-0" 
          :disabled="toolbarProject.manager !== loggedUser">
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
      :to="{ path: `/project/${toolbarProject.id}/results` }"
      class="ma-0" 
      flat 
      :icon="!lgAndUp" 
      color="success" >
      <span class="hidden-md-and-down">results</span>
      <v-icon >poll</v-icon>
    </v-btn>
    <v-divider vertical></v-divider>
    <ddailies :projectid="toolbarProject.id" >
      <v-btn 
       class="ma-0" 
        flat 
        :icon="!lgAndUp"  
        color="info" 
        slot="customactivator">
        <span class="hidden-md-and-down">project dailes</span>
        <v-icon >supervised_user_circle</v-icon>
      </v-btn>
    </ddailies>
    <v-divider vertical></v-divider>
    <v-btn 
      class="ma-0" 
      flat 
      :icon="!lgAndUp" 
      color="accent" 
      slot="" >
      <span class="hidden-md-and-down">contributions</span>
      <v-icon >update</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import { dproject, darchive, dblock, dinvite, dtask, ddailies } from '@/components/dialog'
export default {
  name: 'toolbarproject',
  components: { dproject, dtask, dinvite, darchive, dblock, ddailies },
  props: {
    projectid: { required: true, type: [String, Number] }
  },
  computed: {
    toolbarProject () {
      return this.projects[this.projectid]
    }
  }
}
</script>
