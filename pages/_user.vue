<template>
  <v-container grid-list-xl>
    <v-layout column align-center justify-center class="pa-3">
      <v-avatar size="130px">
        <img :src="useravatar(pageOwner.id)" :alt="pageOwner.username">
      </v-avatar>
      <div>
          <div class="headline">{{pageOwner.displayName || pageOwner.username}}</div>
          <hr>
          <div class="subheading">{{pageOwner.username}}
            <v-icon class="ml-3" color="success">person_add</v-icon>
          </div>
      </div>
      <v-card tile flat max-width="900px" width="600px" class="ma-3">
        <template v-if="ownerProjects.length > 0">
          <v-card-text>
            <v-flex>
              <v-layout row class="title" align-center justify-space-between>
                <span class="title info--text">Projects involved {{ownerProjects.length}}</span>
                <span class="body-2 warning--text">{{ownerTasks.length}} Tasks assigned</span>
              </v-layout>
            </v-flex>
          </v-card-text>
          <v-card-text>
            <v-expansion-panel
              expand popout :value="ownerProjects.map(p => true)"
            >
              <v-expansion-panel-content style="width: 250px"
                v-for="project in ownerProjects"
                :key="project.id"
              >
                <div slot="header">{{project.title}}</div>
                <v-card flat class="transparent">
                  <v-flex class="px-4 pt-0">
                    Project description: <span class="grey--text text-darken-2 caption">{{project.description}}</span>
                    <v-divider></v-divider>
                    Tasks in the project: {{ownerTasks.filter(t => project.blocks.indexOf(t.block) > -1).length}}
                  </v-flex>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-card-text>
        </template>
        <v-card-text v-else class="text-xs-center subheading primary--text">
          No Project activities for this user
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  validate ({ params, store }) {
    console.log(params.user, '_user')
    return !!store.getters.userByName(params.user).id
  },
  computed: {
    ...mapGetters(['username', 'useravatar', 'userByName', 'userTasks']),
    pageOwner () {
      return this.userByName(this.$route.params.user)
    },
    ownerProjects () {
      return this.$store.getters.userProjects(this.pageOwner.id)
    },
    ownerTasks () {
      return this.userTasks(this.pageOwner.id)
    }
  }
}
</script>
