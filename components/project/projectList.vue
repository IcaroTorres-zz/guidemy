<template>
  <v-flex xs12>
    <v-layout row  align-center justify-space-between>
      <v-flex class="title primary--text py-2">
        {{loggedUserObj.username}} <v-icon flat>chevron_right</v-icon> {{label || ''}}
      </v-flex>
      <!-- <v-btn class="hidden-sm-and-down" small flat @click="printJSONState">
        <v-icon>print</v-icon>log json state
      </v-btn> -->
      <v-tooltip left>
        <v-btn icon small @click="listmode = !listmode" slot="activator">
          <v-icon>{{listmode ? 'view_module' : 'view_list'}}</v-icon>
        </v-btn>
        <span>{{listmode ? 'Grid' : 'List'}}</span>
      </v-tooltip>
      <v-btn class="hidden-sm-and-down" small flat @click="descending = !descending">
        <v-icon>sort</v-icon>{{sortButtonText}}
      </v-btn>
    </v-layout>
    <v-list v-if="listedProjects.length === 0">
      <v-list-tile>
        <v-list-tile-title class="error--text">
          No projects to list!
        </v-list-tile-title>
      </v-list-tile>
    </v-list>
    <v-container grid-list-lg fluid v-else-if="!listmode" class="pa-0">
      <v-layout row wrap align-content-start justify-start>
        <v-flex xs6 sm4 md3 lg2 v-for="project in listedProjects" :key="project.id">
          <v-card>
            <v-card-title style="height:170px">
              <v-container fill-height fluid class="pa-1">
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <nuxt-link :class="{'info--text': project.status === 0, 'error--text': project.status !== 0, 'headline': !xsOnly, 'subheading': xsOnly}"
                    :to="`/project/${project.id}/activities`" nuxt v-text="project.title"/>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-title>
            <v-card-text>
              <v-list tow-line>
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
              </v-list>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <div>{{ project.created | locale }}</div>
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <darchive :project="project" slot="activator">
                  <v-btn icon flat :color="project.status === 0 ? 'error' : 'info'" slot="customactivator">
                    <v-icon>{{project.status === 0 ? 'archive' : 'unarchive'}}</v-icon>
                  </v-btn>
                </darchive>
                <span>{{project.status === 0 ? 'archive project' : 'unarchive project'}}</span>
              </v-tooltip>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-list three-line dense subheader v-else>
      <template v-for="(project, pidx) in listedProjects">
        <!-- <v-subheader inset :key="`pidx-${project.id}`" style="max-height: 28px; line-height: 28px; margin-bottom: -15px;">
          <v-spacer/>
          <div class="caption">{{ project.created | locale }}</div>
        </v-subheader> -->
        <v-list-tile  :key="project.id" class="py-1">
          <v-list-tile-action>
            <v-tooltip top>
              <template slot="activator">
                <v-btn icon flat :color=" project.status === 0 ? 'info' : 'error'" :to="`/project/${project.id}/activities`" nuxt>
                  <v-icon>launch</v-icon>
                </v-btn>
              </template>
              <span>open</span>
            </v-tooltip>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <nuxt-link
                :class="{'info--text': project.status === 0, 'error--text': project.status === 1, 'body-2': true}"
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
                <v-btn icon flat :color="project.status === 0 ? 'error' : 'info'" slot="customactivator"><v-icon>{{project.status === 0 ? 'archive' : 'unarchive'}}</v-icon></v-btn>
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
    descending: true,
    listmode: true
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
