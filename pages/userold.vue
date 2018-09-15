<template>
  <v-container grid-list-xl>
    <v-layout column align-center justify-center class="pa-3">
      <v-avatar size="150px">
        <img :src="useravatar(pageOwner.id)" :alt="pageOwner.username">
      </v-avatar>
      <div>
          <div class="headline">{{pageOwner.displayName || pageOwner.username}}</div>
          <hr>
          <div class="subheading">{{pageOwner.username}}</div>
      </div>
      <v-card tile flat>
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
            expand
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
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="success">
            <v-icon>person_add</v-icon>
            invite
          </v-btn>
          <v-btn flat color="info">
            <v-icon>chat_bubble</v-icon>
            send message
          </v-btn>
          <v-tooltip top>
            <v-btn icon slot="activator">
              <v-icon color="error">block</v-icon>
            </v-btn>
            <span>block user</span>
          </v-tooltip>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    pageOwner () {
      return this.loggedUserObj
    },
    ownerProjects () {
      return this.userProjects(this.pageOwner.id)
    },
    ownerTasks () {
      return this.userTasks(this.pageOwner.id)
    }
  }
}
</script>
