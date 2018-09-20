<template>
  <v-layout row wrap justify-center align-center style="position: relative">
    <projectList :items="myArchive" :label="$route.name" />
  </v-layout>
</template>
<script>
import { projectList } from '@/components/project'
import { mapGetters } from 'vuex'

export default {
  components: {
    projectList
  },
  computed: mapGetters(['myArchive'])
}
</script>

