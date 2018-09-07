<template>
  <v-dialog v-model="dialog" width="800px" scrollable>
    <template slot="activator" @click.stop="dialog = !dialog">
      <slot name="customactivator" />
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
        <v-container grid-list-sm class="pa-0">
          <template v-for="(comment, cidx) in comments" >
          <v-layout row align-content-start:key="comment.id" v-if="comment.by === loggedUser">
            <v-avatar  size="48px" color="grey lighten-4 mt-2 mr-2">
              <img :src="useravatar(comment.by)" alt="avatar">
            </v-avatar>
            <v-flex>
              <a class="primary--text subheading">{{username(comment.by)}}</a>
              <p>{{comment.text}}</p>
              <v-layout>
                <div class="caption grey--text px-1">posted: {{formatPostTime(comment.date)}}</div>
                <v-icon small class="px-1">thumb_up</v-icon>
                <v-icon small class="px-1">thumb_down</v-icon>
                <v-icon small class="px-1">chat_bubble_outline</v-icon>

                <v-bottom-sheet v-model="sheet" inset hide-overlay>
                  <v-icon small class="px-1 error--text" slot="activator">delete</v-icon>
                  <v-card color="error" flat :dark="lightOut">
                    <v-card-actions>
                      <div class="title">
                        Confirm to delete comment ?
                      </div>
                      <v-spacer></v-spacer>
                      <v-btn flat @click="sheet = false">cancel</v-btn>
                      <v-btn flat @click="deleteComment(comment.id); sheet = false">Confirm</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-bottom-sheet>             
                
                <v-spacer/>
              </v-layout>
              <v-divider style="margin-right: 56px"/>
            </v-flex>
          </v-layout>
          
          <v-layout row align-content-start v-if="comment.by !== loggedUser">
            <v-flex>
              <div class="primary--text text-xs-right subheading"><a>{{username(comment.by)}}</a></div>
              <p class="text-xs-right">{{comment.text}}</p>
              <v-layout>
                <v-spacer/>
                <v-icon small class="px-1">thumb_up</v-icon>
                <v-icon small class="px-1">thumb_down</v-icon>
                <v-icon small class="px-1">chat_bubble_outline</v-icon>
                <v-icon small class="px-1">star_border</v-icon>
                <div class="caption grey--text px-1">posted: {{formatPostTime(comment.date)}}</div>
              </v-layout>
              <v-divider style="margin-left: 56px"/>
            </v-flex>
            <v-avatar  size="48px" color="grey lighten-4 mt-2 ml-2">
              <img :src="useravatar(comment.by)" alt="avatar">
            </v-avatar>
          </v-layout>

          <!-- <v-divider /> -->
          </template :key="cidx">
        </v-container>
      </v-card-text>
      <v-card-actions class="pl-4">
        <v-flex xs12 class="layout row align-center justify-space-between">
          <v-avatar
            size="48px"
            color="grey lighten-4"
          >
            <img :src="loggedUserObj.profilePicture" alt="avatar">
          </v-avatar>
          <v-textarea
            class="px-2"
            autofocus
            flat
            row-height="16"
            rows="2"
            auto-grow
            placeholder="your comment"
            v-model="comment.text"
            @click:append-outer="post"
            append-outer-icon="send"
          ></v-textarea>
        </v-flex>
        <v-btn flat color="primary" @click="dialog = false">Back</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { User, Comment } from '../../models'
export default {
  name: 'taskcomments',
  props: {
    task: { type: Object, required: true }
  },
  data () {
    return {
      dialog: false,
      sheet: false,
      creator: new User(),
      comment: undefined
    }
  },
  created () {
    this.creator = new User({ ...this.user(this.task.creator) })
    this.comment = new Comment({
      at: this.task.id,
      by: this.loggedUser
    })
  },
  computed: {
    comments () {
      return this.$store.getters.taskComments(this.task)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }
  },
  methods: {
    post () {
      console.dir(this.comment)
      this.postComment(new Comment({
        ...this.comment,
        date: new Date()
      }))
      this.comment = new Comment({ at: this.task.id, by: this.loggedUser })
    }
  }
}
</script>
