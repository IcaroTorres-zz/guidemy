<template>
  <v-dialog v-model="dialog" width="800px">
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
        <div class="grey--text text-xs-justify">{{computedTask.description}}</div>
      </div>
      <v-divider/>
      <v-form 
        v-model="valid" 
        ref="newcomment"
        @submit.prevent="post">
        <v-card-actions>
          
          <!-- <v-flex> -->
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
              append-icon="send"
              @click:append="post"
              v-model.trim="comment.text"
            >
              <template slot="prepend-inner">
                <v-avatar
                  class="mb-2"
                  :key="loggedUser"
                  size="48px"
                  color="grey lighten-4"
                >
                  <img :src="loggedUserObj.picture" alt="avatar">
                </v-avatar>
              </template>
            </v-textarea>
          <!-- </v-flex> -->
        </v-card-actions>
      </v-form>
      <v-divider v-show="comments.length > 0"/>
      <v-card-text v-show="comments.length > 0">
        <v-container fluid grid-list-sm class="pa-0">
          <template v-for="comment in comments" >
            <v-list>

            </v-list>
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
                <v-subheader class="pa-0" style="max-height: 24px">
                  <a class="primary--text subheading">{{username(comment.by)}}</a>
                  <v-spacer/>
                  <span class="caption grey--text pl-1">
                    {{comment.date | postFormat}}
                  </span>
                  <v-bottom-sheet
                    v-model="sheet"
                    inset
                    hide-overlay
                  >
                    <v-icon
                      small
                      class="error--text"
                      slot="activator"
                      @click.stop="toggleSheet(comment.id)"
                    >delete</v-icon>
                    <v-card color="error" flat>
                      <v-card-actions>
                        <div class="subheading">
                          Remove comment?
                        </div>
                        <v-spacer></v-spacer>
                        <v-btn
                          flat
                          @click="sheet = false"
                        >cancel</v-btn>
                        <v-btn
                          flat
                          @click.stop="onDeleteComment(deletingComment)">Confirm</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-bottom-sheet>
                </v-subheader>
                <div style="position: relative; width: 100%; overflow: hidden;">
                  <pre>{{comment.text}}</pre>
                </div>
                <v-divider/>
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
                  <span class="caption grey--text pl-1">
                    {{comment.date | postFormat}}
                  </span>
                  <a>{{username(comment.by)}}</a>
                </div>
                <pre class="text-xs-right">{{comment.text}}</pre>
                <v-divider/>
                <!-- <v-divider style="margin-left: 56px"/> -->
              </v-flex>
              <v-avatar size="48px" color="grey lighten-4 mt-2 ml-2">
                <img :src="useravatar(comment.by)" alt="avatar">
              </v-avatar>
            </v-layout>
          </template>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {Comment} from '@/models'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'taskcomments',
  props: {
    taskid: { type: [String, Number], required: true }
  },
  data () {
    return {
      valid: false,
      dialog: false,
      comment: undefined,
      deletingComment: undefined
    }
  },
  created () {
    this.comment = new Comment({
      at: this.taskid,
      by: this.loggedUser
    })
  },
  computed: {
    ...mapState(['tasks', 'loggedUser']),
    ...mapGetters(['useravatar', 'username', 'loggedUserObj']),
    sheet: {
      get () { return !!this.deletingComment },
      set (val) { if (!val) this.deletingComment = val }
    },
    computedTask () { return this.tasks[this.taskid] },
    comments () {
      return this.$store.getters.taskComments(this.computedTask)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }
  },
  methods: {
    post () {
      if (this.valid && this.comment.text && this.$refs.newcomment.validate()) {
        this.$store.dispatch('postComment', new Comment({
          ...this.comment,
          date: new Date()
        })).then(() => {
          this.comment = new Comment({ at: this.taskid, by: this.loggedUser })
        })
      }
    },
    onDeleteComment (cid) {
      this.$store.dispatch('deleteComment', cid)
      this.sheet = false
    },
    toggleSheet (cid) {
      this.deletingComment = cid
    }
  }
}
</script>
