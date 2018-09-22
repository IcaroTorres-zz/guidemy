<template>
  <v-flex xs12>
    <v-layout row  align-center justify-space-between>
      <v-flex class="title primary--text py-2">
        {{loggedUserObj.username}} <v-icon flat>chevron_right</v-icon> {{label || ''}}
      </v-flex>
      <v-btn class="hidden-sm-and-down" small color="primary" @click="printJSONState">
        <v-icon>print</v-icon>log json state
      </v-btn>
      <v-btn class="hidden-sm-and-down" small color="primary" @click="descending = !descending">
        <v-icon>sort</v-icon>{{sortButtonText}}
      </v-btn>
    </v-layout>
    <v-list three-line dense subheader>
      <template v-for="(project, pidx) in listedProjects">
        <!-- <v-subheader inset :key="`pidx-${project.id}`" style="max-height: 28px; line-height: 28px; margin-bottom: -15px;">
          <v-spacer/>
          <div class="caption">{{ project.created | locale }}</div>
        </v-subheader> -->
        <v-list-tile  :key="project.id" class="py-1">
          <v-list-tile-action>
            <v-tooltip top>
              <template slot="activator">
                <v-btn icon flat :color=" project.status === 0 ? 'info' : 'warning'" :to="`/project/${project.id}/activities`" nuxt>
                  <v-icon>launch</v-icon>
                </v-btn>
              </template>
              <span>open</span>
            </v-tooltip>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <nuxt-link
                :class="{'info--text': project.status === 0, 'warning--text': project.status === 1, 'body-2': true}"
                :to="`/project/${project.id}/activities`">
                {{project.title}}
              </nuxt-link>
            </v-list-tile-title>
            <v-list-tile-sub-title>
              manager: <nuxt-link :to="{name: 'user', params: {user: users[project.manager].username}}">@{{users[project.manager].username}}</nuxt-link>
            </v-list-tile-sub-title>
            <v-list-tile-sub-title>
              team: <nuxt-link
                class="primary--text"
                v-for="uid in project.team"
                :key="uid"
                :to="{name: 'user', params: {user: users[uid].username}}">
                  @{{users[uid].username}}
                </nuxt-link>
            </v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action class="layout column align-center justify-center">
            <v-tooltip left>
              <darchive :project="project" slot="activator">
                <v-btn icon flat :color="project.status === 0 ? 'error' : 'info'" slot="customactivator"><v-icon>{{project.status === 0 ? 'archive' : 'publish'}}</v-icon></v-btn>
              </darchive>
              <span>{{project.status === 0 ? 'archive project' : 'unarchive project'}}</span>
            </v-tooltip>
            <div style="font-size: 10px; color: #aaa;">{{ project.created | locale }}</div>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider v-if="pidx !== items.length - 1" :key="pidx"></v-divider>
      </template>
    </v-list>
  </v-flex>
</template>

<script>

import { mapGetters, mapState } from 'vuex'
import {uniq} from '@/helpers'
import {darchive} from '@/components/dialog'
export default {
  name: 'projectList',
  props: {
    items: {
      type: Array,
      required: true
    },
    label: [String, Number]
  },
  components: {darchive},
  data: () => ({
    descending: true
  }),
  computed: {
    ...mapState(['loggedUser', 'users']),
    ...mapGetters(['loggedUserObj', 'xsOnly']),
    sortButtonText () { return this.descending ? 'older first' : 'recent first' },
    listedProjects () {
      return this.items.sort(this.sortByStart(this.descending))
    }
  },
  methods: {
    printJSONState () {
      console.log(JSON.parse(this.$store.getters.JSONState))
      console.log(this.$store.getters.JSONState)
    },
    uniq () {
      return uniq
    }
  }
}
</script>

<style>

</style>
