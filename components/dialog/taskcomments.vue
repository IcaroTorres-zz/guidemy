<template>
  <v-dialog v-model="dialog" width="800px" scrollable>
    <template slot="activator" @click.stop="dialog = !dialog">
      <slot name="customactivator" />
    </template>
    <v-card>
      <v-card-title class="py-3 display-1 primary">
        {{computedTask.title}}
        <v-spacer></v-spacer>
        <v-btn icon flat @click="dialog = false"><v-icon>close</v-icon></v-btn>
      </v-card-title>
      <div class="px-3 py-2">
        Description: 
        <div class="grey--text text-xs-justify">{{computedTask.description}} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga voluptas sit eveniet doloremque ea enim quaerat quibusdam nihil obcaecati. Maxime quasi explicabo earum in necessitatibus beatae hic. Dolores, fugiat dignissimos.</div>
      </div>
      <v-divider></v-divider>
      <v-card-text height="800">
        <v-container grid-list-sm class="pa-0">
          <template v-for="comment in comments" >
          <v-layout
            row
            align-content-start
            :key="comment.id"
            v-if="comment.by === loggedUser"
          >
            <v-avatar  size="48px" color="grey lighten-4 mt-2 mr-2">
              <img :src="useravatar(comment.by)" alt="avatar">
            </v-avatar>
            <v-flex>
              <a class="primary--text subheading">{{username(comment.by)}}</a>
              <pre>{{comment.text}}</pre>
              <v-layout>
                <div class="caption grey--text px-1">
                  posted: {{comment.date | postFormat}}
                </div>
                <v-icon small class="px-1">thumb_up</v-icon>
                <v-icon small class="px-1">thumb_down</v-icon>
                <v-icon small class="px-1">chat_bubble_outline</v-icon>

                <v-bottom-sheet
                  v-model="sheet"
                  inset
                  hide-overlay
                >
                  <v-icon
                    small
                    class="px-1 error--text"
                    slot="activator"
                  >delete</v-icon>
                  <v-card color="error" flat>
                    <v-card-actions>
                      <div class="title">
                        Confirm to delete comment ?
                      </div>
                      <v-spacer></v-spacer>
                      <v-btn
                        flat
                        @click="sheet = false"
                      >cancel</v-btn>
                      <v-btn
                        flat
                        @click="onDeleteComment(comment.id)">Confirm</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-bottom-sheet>             
                
                <v-spacer/>
              </v-layout>
              <v-divider style="margin-right: 56px"/>
            </v-flex>
          </v-layout>
          
          <v-layout
            row
            align-content-start 
            :key="comment.id"
            v-if="comment.by !== loggedUser"
          >
            <v-flex>
              <div class="primary--text text-xs-right subheading">
                <a>{{username(comment.by)}}</a>
              </div>
              <pre class="text-xs-right">{{comment.text}}</pre>
              <v-layout>
                <v-spacer/>
                <v-icon small class="px-1">thumb_up</v-icon>
                <v-icon small class="px-1">thumb_down</v-icon>
                <v-icon small class="px-1">chat_bubble_outline</v-icon>
                <v-icon small class="px-1">star_border</v-icon>
                <div class="caption grey--text px-1">
                  posted: {{comment.date | postFormat}}
                </div>
              </v-layout>
              <v-divider style="margin-left: 56px"/>
            </v-flex>
            <v-avatar size="48px" color="grey lighten-4 mt-2 ml-2">
              <img :src="useravatar(comment.by)" alt="avatar">
            </v-avatar>
          </v-layout>
          </template>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="pl-4">
        <v-avatar
          size="48px"
          color="grey lighten-4"
        >
          <img :src="loggedUserObj.picture" alt="avatar">
        </v-avatar>
        <v-flex>
          <v-form 
            v-model="valid" 
            ref="newcomment" 
            @submit.prevent="post"
            @keydown.prevent.enter>
            <v-textarea
              required
              :rules="[v => !!v || 'type your comment']"
              class="px-2"
              autofocus
              flat
              row-height="16"
              rows="2"
              auto-grow
              placeholder="Leave your comment"
              v-model="comment.text"
            ></v-textarea>
          </v-form>
        </v-flex>
        <v-icon class="pr-2" color="primary" @click="valid ? submit() : ''">send</v-icon>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {Comment} from '@/models'
export default {
  name: 'taskcomments',
  props: {
    taskid: { type: [String, Number], required: true }
  },
  data () {
    return {
      valid: false,
      dialog: false,
      sheet: false,
      comment: undefined
    }
  },
  created () {
    this.comment = Object(new Comment({
      at: this.taskid,
      by: this.loggedUser
    }))
  },
  computed: {
    computedTask () { return this.tasks[this.taskid] },
    comments () {
      return this.$store.getters.taskComments(this.computedTask)
        .sort(this.sortByStart)
    }
  },
  methods: {
    post () {
      this.postComment(Object(new Comment({
        ...this.comment,
        date: new Date()
      })))
      this.comment = Object(new Comment({ at: this.taskid, by: this.loggedUser }))
    },
    submit () {
      if (this.$refs.newcomment.validate()) this.post()
    },
    onDeleteComment (cid) {
      this.deleteComment(cid)
      this.sheet = false
    }
  }
}
</script>
