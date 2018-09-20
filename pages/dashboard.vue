<template>
  <v-layout row wrap justify-center align-center style="position: relative">
    <projectList :items="myProjects" :label="$route.name" />
  </v-layout>
</template>
<script>
import { projectList } from '@/components/project'
import { mapGetters } from 'vuex'

export default {
  components: {
    projectList
  },
  computed: mapGetters(['myProjects'])
}
</script>

