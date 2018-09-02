<template>
    <v-expansion-panel-content  hide-actions :class="{'red-bordered': delayed}">
      <v-flex xs12 slot="header" :class="{'pl-0': true}">
        <v-layout row wrap align-center>
          <v-flex style="max-width: 26px; transform: scaleY(1.4) scaleX(1.2); margin-left: -6px;" class="pa-0"><v-icon color="primary">drag_indicator</v-icon></v-flex>
          <v-flex class="pa-0">
            <span class="subheading">{{task.title}}</span>
            <div v-if="task.status === 1" :class="ratecolor +'--text'" style="font-size: 11px; line-height: 8px;">finished at: {{finished}}</div>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs1 class="pa-0 text-xs-right">
            <v-layout column>
              <dialogdone :task="task" v-if="task.status !== 1" >
                <v-btn small icon flat class="ma-0" color="light-green accent-2" slot="customactivator">
                  <v-icon small>done_outline</v-icon>
                </v-btn>
              </dialogdone>
              <dialogtaskdel :task="task">
                <v-btn small icon flat class="ma-0" color="error" v-if="canRemove" slot="customactivator">
                  <v-icon small>delete</v-icon>
                </v-btn>
              </dialogtaskdel>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-card tile flat :class="{'secondary darken-1':lightOut, 'grey lighten-3': !lightOut}">
        <v-card-text class="px-2 pt-2 pb-0">
          <div class="body-1 grey--text">
            {{task.description}}
            <v-divider></v-divider>
          </div>
          <div class="layout row wrap align-center justify-content-end px-2">
            <v-flex xs12 class="py-0 mb-1">
              <v-range-slider
                hide-details
                v-model="sliderange"
                :max="slidemax"
                :min="0"
                readonly
                :color="ratecolor"
              ></v-range-slider>
            </v-flex>
            <v-flex xs12>
              <v-layout class="px-1">
                <span class="info--text pr-2">starts</span> {{startDate}} <v-spacer/> {{endDate}} <span class="error--text pl-2">ends</span>
              </v-layout>
            </v-flex>
            <v-flex xs12 class="py-0 px-1">
              <v-divider/>
            </v-flex>
            <v-flex xs12>
              <div class="text-xs-center">
              <div class="grey--text text-lighten--2">days spent X remaining</div>
              <v-rating
                dense
                v-model="rating"
                :length="slidemax"
                :background-color="lightOut ? 'secondary' : 'grey ligten-3'"
                empty-icon="panorama_fish_eye"
                full-icon="lens"
                readonly
                :color="ratecolor"
              ></v-rating>
              </div>
            </v-flex>
            <v-flex xs12 class="py-0 px-1" v-if="overdue">
              <v-divider/>
            </v-flex>
            <v-flex xs12 v-if="overdue">
              <div class="text-xs-center">
              <v-rating
                dense
                v-model="overdue"
                :length="overdue"
                full-icon="brightness_1"
                half-increments
                readonly
                color="red"
              ></v-rating>
              <div class="grey--text text-lighten--2">overdue days</div>
              </div>
            </v-flex>
          </div>
          <v-divider></v-divider>
        </v-card-text>
        <v-card-actions>
          <v-avatar size="46px" class="mr-1">
            <img :src="avatar">
          </v-avatar>
          <div>
            <div class="body-1">{{assigned.username}}</div>
            <div class="caption grey--text">#{{assigned.teams.join('- ')}}</div>
          </div>
          <v-spacer/>
          <div class="d--wrapper">
            <span class="caption grey--text mr-2">{{commentCount}}</span>
            <taskcomments :task="task">
              <v-btn icon small slot="customactivator">
                <v-icon color="grey lighten-2" class="mr-1">question_answer</v-icon>
              </v-btn>
            </taskcomments>
          </div>
        </v-card-actions>
      </v-card>
    </v-expansion-panel-content>
</template>

<script lang="js">
import taskcomments from '../components/dialog-task-comments'
import dialogdone from '../components/dialog-done'
import dialogtaskdel from '../components/dialog-taskdel'
// let dummyavatar = 'data:image/png;base64,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'
export default {
  name: 'taskcard',
  components: {taskcomments, dialogdone, dialogtaskdel},
  props: {
    taskId: [String, Number],
    block: Object
  },
  data: () => ({
    sliderange: [0, 0]
  }),
  computed: {
    lightOut () { return this.$store.getters.lightOut },
    task () { return this.$store.getters.task(this.taskId) },
    assigned () { return this.$store.getters.user(this.task.assigned) },
    avatar () { return this.assigned.profilePicture || this.dummyavatar },
    commentCount () { return this.task.comments.length || Math.floor(Math.random() * 100) },
    color () {
      return (this.task.status === 0 && new Date(this.task.end).getTime() < new Date().getTime()) ||
        (this.task.status === 1 && new Date(this.task.end).getTime() < new Date(this.task.finishedAt).getTime())
        ? 'error'
        : this.block.color
    },
    delayed () { return this.isTaskDelayed(this.task) },
    rating () {
      let max = this.daysBetween(new Date(this.task.start), new Date(this.task.end))
      this.sliderangeUpdate()
      return this.task.status === 0
        ? Math.min(this.daysBetween(new Date(this.task.start), new Date()), max)
        : Math.min(this.daysBetween(new Date(this.task.start), new Date(this.task.finishedAt)), max)
    },
    overdue () {
      let today = new Date()
      let end = new Date(this.task.end)
      let finished = new Date(this.task.finishedAt)
      return this.task.status === 1
        ? finished.getTime() > end.getTime()
          ? Math.abs(this.daysBetween(finished, end))
          : undefined
        : today.getTime() > end.getTime()
          ? Math.abs(this.daysBetween(today, end))
          : undefined
    },
    ratecolor () {
      let max = this.daysBetween(new Date(this.task.start), new Date(this.task.end))
      return this.task.status === 1
        ? 'success'
        : this.rating <= (1 * max / 4)
          ? 'accent'
          : this.rating <= (2 * max / 4)
            ? 'info'
            : this.rating <= (3 * max / 4)
              ? 'warning'
              : 'deep-orange'
    },
    slidemax () {
      return this.daysBetween(new Date(this.task.start), new Date(this.task.end))
    },
    startDate () {
      return new Date(this.task.start).toLocaleDateString('pt-BR')
    },
    endDate () {
      return new Date(this.task.end).toLocaleDateString('pt-BR')
    },
    finished () {
      return this.task.finishedAt ? new Date(this.task.finishedAt).toLocaleDateString('pt-BR') : undefined
    },
    canRemove () {
      let loggedUserId = this.$store.getters.loggedUser
      return this.task.creator === loggedUserId || this.$store.getters.project(this.task.project).manager === loggedUserId
    }
  },
  methods: {
    sliderangeUpdate () {
      this.sliderange = [0, this.daysBetween(new Date(this.task.start), new Date())]
      return this.sliderange
    }
  }
}
</script>
<style scoped>
.red-bordered {
  border-top: 3px solid #f72719 !important;
  background-color: rgba(255, 0, 0, 0.3) !important;
}
</style>


