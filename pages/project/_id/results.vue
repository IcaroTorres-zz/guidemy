<template>
  <v-container grid-list-xl>
    <!-- <projectToolbar :projectid="$route.params.id"/> -->
    <v-layout row wrap align-center justify-space-between>
      <v-flex xs12 class="px-2 py-0">
        <v-divider></v-divider>
      </v-flex>
      <v-flex xs12 sm6 md4 lg3>
        <v-subheader class="subheading">Project Score Weights %</v-subheader>
        <v-card-text class="pa-0">
          <v-slider
            v-model="deliveryWeight"
            label="Task Delivery"
            :color="color1"
            :track-color="color2"
            hide-details
            persistent-hint
            thumb-size="2"
            thumb-label="always"
          ></v-slider>
        </v-card-text>
        <v-card-text class="pa-0">
          <v-slider
            v-model="dailyWeight"
            label="Participation"
            :color="color2"
            :track-color="color1"
            hide-details
            thumb-size="2"
            thumb-label="always"
          ></v-slider>
        </v-card-text>
      </v-flex>
      <v-flex xs12 sm6 md6>
        <v-text-field
          label="Team search"
          persistent-hint
          hint="Filter your team by username or Displayname"
          v-model="searchTerm"
          class="pa-0"
          box/>
      </v-flex>
    </v-layout>
    <v-data-iterator
      :items="team"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      content-tag="v-layout"
      row
      wrap
      align-center justify-center
    >
      <v-divider
        slot="header"
        class="my-2"
      ></v-divider>
      <template
        slot="item"
        slot-scope="props"
      >
        <memberResult
        :member="props.item" 
        :project="resultProject" 
        :weight="weight"/>
      </template>

      <v-divider
        slot="footer"
        class="my-2"
      ></v-divider>
    </v-data-iterator>

  </v-container>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
// import { projectPieChart, projectToolbar } from '@/components/project'
import memberResult from '@/components/memberResult'
export default {
  components: { memberResult },
  validate ({ params, store }) {
    return !!store.state.projects[params.id] // Must be a valid project id
  },
  data: () => ({
    deliveryWeight: 50,
    rowsPerPageItems: [2, 4, 6, 8],
    pagination: {
      rowsPerPage: 4
    },
    searchTerm: ''
  }),
  computed: {
    ...mapState([
      'loggedUser',
      'users',
      'projects',
      'dailyMeetings'
    ]),
    ...mapGetters([
      'temperColor'
    ]),
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
      return this.resultProject.team.map(uid => this.users[uid]).filter(this.teamfilter)
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
  },
  methods: {
    teamfilter (user) {
      return user.username.trim().toLowerCase().includes(this.searchTerm.trim().toLowerCase()) ||
      user.displayName.trim().toLowerCase().includes(this.searchTerm.trim().toLowerCase())
    }
  }
}
</script>
<style>

</style>
