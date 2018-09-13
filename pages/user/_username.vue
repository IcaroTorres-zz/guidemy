<template>
  <v-container grid-list-xl fill-height style="height: 80vh; min-height: 650px">
    <v-layout row align-center justify-center class="pa-3">
      <div>
        <v-avatar size="150px" >
          <img :src="pageOwner.picture" :alt="pageOwner.username">
        </v-avatar>
      </div>
      <div :class="{'elevation-2 pa-3': true, 'secondary':lightOut, 'grey lighten-5': !lightOut}">
        <div class="display-1 primary--text">
        {{pageOwner.displayName}}
        </div><br><hr>
        <div class="subheading secondary--text">
        {{pageOwner.username}}
        </div>
      </div>
    </v-layout>
    <v-layout row wrap justify-center align-center>
      <v-flex xs12 class="layout align-center justify-center">
        <v-card tile flat>
          <v-card-title class="primary-title">
            <div class="title">
              Projects {{userProjects.length}}
            </div>
            <div class="subheading">
              Tasks {{userTasks.length}}
            </div>
          </v-card-title>
          <v-card-text>
            <v-expansion-panel>
              <v-expansion-panel-content v-for="project in userProjects" :key="project.id">
                <template slot="head">
                  {{Project.title}}
                </template>
                <v-card flat class="transparent">
                  <v-layout row align-center justify-center>
                    Project tasks - {{userTasks.filter(t => project.blocks.indexOf(t.block) > -1).length}}
                  </v-layout>
                  <v-divider inset></v-divider>
                  <v-card-text>
                    {{project.description}}
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="success">
              <v-icon>user_add</v-icon>
              invite
            </v-btn>
            <v-btn flat color="info">
              <v-icon>chat_bubble</v-icon>
              send message
            </v-btn>
            <v-btn>
              <v-icon color="error">block</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  validate ({ params, state }) {
    return !!this.userByName(this.$route.params.username).id
  },
  computed: {
    pageOWner () {
      return this.userByName(this.$route.params.username)
    },
    userProjects () {
      return this.userProjects(this.pageOWner.id)
    },
    userTasks () {
      return this.userTasks(this.pageOWner.id)
    }
  }
}
</script>
