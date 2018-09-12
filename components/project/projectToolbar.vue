<template>
  <v-toolbar
  card
  dense
  flat
  :class="{'secondary darken-1':lightOut, 'grey lighten-3': !lightOut, 'project--toolbar': true}"
  >
    <template v-if="toolbarProject.manager === loggedUser">
      <dfinish :project="toolbarProject">
        <v-btn 
          small 
          flat 
          :icon="!lgAndUp" 
          class="ma-0" 
          color="success" 
          slot="customactivator"
          :disabled="toolbarProject.manager !== loggedUser">
          <v-icon>done_all</v-icon>
          <span class="hidden-md-and-down">finish</span>
        </v-btn>
      </dfinish>
      <v-divider vertical></v-divider>
      <dproject :edition="true" :project="toolbarProject">
        <v-btn 
          small 
          flat 
          :icon="!lgAndUp" 
          class="ma-0" 
          color="warning" 
          slot="customactivator"  
          :disabled="toolbarProject.manager !== loggedUser">
          <v-icon >edit</v-icon>
          <span class="hidden-md-and-down">edit</span>
        </v-btn>
      </dproject>
      <v-divider vertical></v-divider>
      <dprojectdel :project="toolbarProject">
        <v-btn 
          small 
          flat 
          :icon="!lgAndUp" 
          class="ma-0" 
          color="error" 
          slot="customactivator"  
          :disabled="toolbarProject.manager !== loggedUser">
          <v-icon >delete</v-icon>
          <span class="hidden-md-and-down">remove</span>
        </v-btn>
      </dprojectdel>
      <v-divider vertical></v-divider>
      <dinvite :project="toolbarProject" class="pa-0">
        <v-btn 
          small 
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
    <v-btn 
      nuxt
      :to="{ path: `/project/${toolbarProject.id}/results` }"
      small 
      flat 
      :icon="!lgAndUp" 
      class="ma-0" 
      color="success" >
      <span class="hidden-md-and-down">results</span>
      <v-icon >poll</v-icon>
    </v-btn>
    <v-divider vertical></v-divider>
    <ddailies :projectid="toolbarProject.id">
      <v-btn 
        small 
        flat 
        :icon="!lgAndUp" 
        class="ma-0" 
        color="info" 
        slot="customactivator">
        <span class="hidden-md-and-down">view dailes</span>
        <v-icon >supervised_user_circle</v-icon>
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
      <v-icon >update</v-icon>
    </v-btn>      
  </v-toolbar>
</template>

<script>
import { dproject, dfinish, dblock, dinvite, dtask, dprojectdel, ddailies } from '@/components/dialog'
export default {
  name: 'toolbarproject',
  components: { dproject, dtask, dinvite, dfinish, dprojectdel, dblock, ddailies },
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
