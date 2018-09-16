<template>
  <v-container grid-list-xl>
    <projectToolbar :projectid="$route.params.id"/>
    <h1 class="headline text-xs-center">
      <nuxt-link v-html="resultProject.title" :to="{ name: 'project-id', params: { id: resultProject.id } }"/>
    </h1>
    <v-layout row wrap align-center justify-center>
      <v-card flat color="transparent">
        <v-subheader class="title">Project Score Weights %</v-subheader>
        <v-card-text class="px-1">
          <v-slider
            v-model="deliveryWeight"
            label="Task Delivery"
            :color="color1"
            :track-color="color2"
            persistent-hint
            thumb-label="always"
          ></v-slider>
        </v-card-text>
        <v-card-text class="pa-1">
          <v-slider
            v-model="dailyWeight"
            label="Participation"
            :color="color2"
            :track-color="color1"
            thumb-label="always"
          ></v-slider>
        </v-card-text>
      </v-card>
      <v-card flat color="transparent">
        <v-card-title>
          <projectPieChart :projectid="resultProject.id" />
        </v-card-title>
      </v-card>
    </v-layout>
    <!-- <v-layout row align-content-start justify-center>
      <div v-for="member in team" :key="member.id">
        <memberResult
          :member="member" 
          :project="resultProject" 
          :weight="weight"/>
      </div>
    </v-layout> -->

    <v-data-iterator
      :items="team"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      content-tag="v-layout"
      search
      row
      wrap
      align-center justify-center
    >
      <v-toolbar
        slot="header"
        class="mb-2"
        color="primary"
        dense
        dark
        flat
      >
        <v-toolbar-title>Team progress</v-toolbar-title>
      </v-toolbar>

      <template
        slot="item"
        slot-scope="props"
      >
        <memberResult
        :member="props.item" 
        :project="resultProject" 
        :weight="weight"/>
      </template>

      <v-toolbar
        slot="footer"
        class="mt-2"
        color="secondary"
        dark
        dense
        flat
      >
        <v-spacer></v-spacer>
        <v-toolbar-title class="subheading">team management</v-toolbar-title>
      </v-toolbar>
    </v-data-iterator>

  </v-container>
</template>

<script>
import { projectPieChart, projectToolbar } from '@/components/project'
import memberResult from '@/components/memberResult'
export default {
  components: { memberResult, projectToolbar, projectPieChart },
  validate ({ params, store }) {
    return !!store.state.projects[params.id] // Must be a valid project id
  },
  data: () => ({
    deliveryWeight: 50,
    rowsPerPageItems: [4, 5, 6, 7, 8, 9, 10, 11, 12],
    pagination: {
      rowsPerPage: 4
    }
  }),
  computed: {
    dailyWeight: {
      get () {
        return 100 - this.deliveryWeight
      },
      set (val) {
        this.deliveryWeight = 100 - val
      }
    },
    resultProject () {
      return this.projects[this.$route.params.id]
    },
    isManager () {
      return this.loggedUser === this.resultProject.manager
    },
    team () {
      return this.resultProject.team.map(uid => this.users[uid])
    },
    color1 () {
      return this.temperColor(100, this.deliveryWeight)
    },
    color2 () {
      return this.temperColor(100, this.dailyWeight)
    },
    weight () {
      return {
        delivery: this.deliveryWeight,
        daily: this.dailyWeight
      }
    }
  }
}
</script>
<style>

</style>
