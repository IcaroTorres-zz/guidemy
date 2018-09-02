<template>
      <v-dialog v-model="dialog" width="800px" scrollable :dark="lightOut">
      <template slot="activator">
        <slot name="customactivator"  @click.stop="dialog = !dialog" >
           <!-- <v-btn fab bottom right color="primary" slot="customactivator" dark fixed @click.stop="dialog = !dialog"><v-icon>add</v-icon></v-btn> -->
        </slot>
      </template>
      <v-card>
        <v-card-title class="py-3 display-1 primary">
          {{task.title}}
        </v-card-title>
        <div class="px-3 py-2">
          Description: 
          <div class="grey--text text-xs-justify">{{task.description}} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga voluptas sit eveniet doloremque ea enim quaerat quibusdam nihil obcaecati. Maxime quasi explicabo earum in necessitatibus beatae hic. Dolores, fugiat dignissimos.</div>
        </div>
        <v-divider></v-divider>
        <v-card-text height="800">
          <v-container grid-list-xl class="py-0">
            <v-layout row wrap>
              <v-flex xs12>
                <template v-for="(comment, cidx) in comments">
                  <v-layout row justify-center align-content-start :key="comment.id">
                    <v-avatar  size="48px" color="grey lighten-4" >
                      <img :src="getAvatar(comment.by)" alt="avatar">
                    </v-avatar>
                    <v-flex>
                      <v-layout column align-start class="px-2">
                        <a class="primary--text subheading">{{getUsername(comment.by)}}</a>
                        <p class="grey--text text-xs-justify">{{comment.text}}</p>
                      </v-layout>
                    </v-flex>
                    <v-btn icon small class="error--text" v-if="canRemove(comment, user.id)">
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </v-layout>
                  <v-divider :key="cidx"  class="ml-5 mb-3"/>
                </template>
              </v-flex>

            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions class="pl-4">
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
              append-icon="send"
            ></v-text-field>
          </v-flex>
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
      return this.$store.getters.taskComments(this.task)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    },
    lightOut () { return this.$store.getters.lightOut }
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
  .v-expansion-panel__header {
    padding-left: 0 !important ;
    padding-right: 0 !important; 
  }
</style>
