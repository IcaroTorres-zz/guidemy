<template>
      <v-dialog v-model="dialog" width="800px">
      <template slot="activator">
        <slot name="customactivator"  @click.stop="dialog = !dialog" >
           <!-- <v-btn fab bottom right color="primary" slot="customactivator" dark fixed @click.stop="dialog = !dialog"><v-icon>add</v-icon></v-btn> -->
        </slot>
      </template>
      <v-card>
        <v-card-title class="py-2 display-1 primary">
          {{task.title}}
        </v-card-title>
        <v-card-text>
          <div class="primary--text">{{task.description}}</div>
          <v-divider></v-divider>
        </v-card-text>
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex xs12 class="layout row align-center justify-space-between">
              <v-avatar
                size="48px"
                color="grey lighten-4"
              >
                <img :src="user.profilePicture" alt="avatar">
              </v-avatar>
              <v-text-field
                class="px-2"
                placeholder="your comment"
                v-model="commentText"
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-list two-line>
                <template v-for="comment in comments">
                  <v-list-tile
                    :key="comment.id"
                    avatar
                  >
                    <v-list-tile-avatar>
                      <img :src="getUser(comment.by).profilePicture" alt="avatar">
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                      <v-list-tile-title class="primary--text" v-html="getUsername(comment.by)"></v-list-tile-title>
                      <v-layout row>
                        <v-flex class="caption">
                          {{comment.text}}
                        </v-flex>
                      </v-layout>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider
                    inset
                    :key="comment.id"
                  ></v-divider>
                </template>
              </v-list>

              <!-- <v-avatar
                size="48px"
                color="grey lighten-4"
              >
                <img :src="getUser(comment.by).profilePicture" alt="avatar">
              </v-avatar>
              <v-card class="transparent body-1 px-2" flat dark>
                {{comment.text}}
                <v-card-actions>
                  <v-icon>{{setIcon(comment, user.id)}}</v-icon>
                </v-card-actions>
              </v-card> -->
            </v-flex>

          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="dialog = false">Back</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  name: 'taskcomments',
  props: {
    task: Object
  },
  data () {
    return {
      dialog: false,
      creator: this.$store.getters.user(this.task.creator),
      commentText: ''
    }
  },
  computed: {
    user () { return this.$store.getters.loggedUserObject },
    users () { return this.$store.getters.usernames },
    comments () {
      let ccs = this.$store.getters.taskComments(this.task)
      console.log(ccs)
      return ccs
    }
  },
  methods: {
    setIcon (comment, uid) {
      return this.canRemove(comment, uid) ? 'delete' : ''
    },
    canRemove (comment, uid) {
      return comment.by === uid
    }
  }
}
</script>

<style scoped>

</style>
