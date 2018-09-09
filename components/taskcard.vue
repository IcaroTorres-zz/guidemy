<template>
    <v-expansion-panel-content  hide-actions :class="{'task-delayed': delayed}">
      <template slot="header" row :class="{'mt-1': index !== 0 }">
          <v-progress-linear
            style="left: 0; right:0; top: 0;position: absolute; transform: translateY(-14px)"
            background-color="transparent"
            :color="ratecolor"
            height="4"
            :value="rating * (100 / slidemax)"
          ></v-progress-linear>

        <v-flex xs12 :class="{'pl-0': true}">
          <v-layout row wrap align-center>
            <v-flex style="max-width: 26px; transform: scaleY(1.4) scaleX(1.2); margin-left: -6px;" class="pa-0"><v-icon color="primary">drag_indicator</v-icon></v-flex>
            <v-flex class="pa-0 task-title">
              <span class="subheading">{{computedTask.title}}</span>
              <div v-if="computedTask.status === 1" :class="ratecolor +'--text'" style="font-size: 11px; line-height: 8px;">done on: {{finished}}</div>
            </v-flex>
            <v-spacer/>
            <v-flex xs1 class="py-0 pl-0 pr-1 text-xs-right">
              <v-layout column>
                <dtaskdone :taskid="taskid" v-if="computedTask.status !== 1" @task-finished="update($event)">
                  <v-icon small color="success" slot="customactivator">done_outline</v-icon>
                </dtaskdone>
                <dtaskdel :taskid="taskid" @task-deleted="update($event)">
                  <v-icon small color="error" v-if="canRemove" slot="customactivator">delete</v-icon>
                </dtaskdel>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>

      </template>
      <v-card tile flat :class="{'secondary darken-1':lightOut, 'grey lighten-3': !lightOut}">
        <v-card-text class="px-2 pt-2 pb-0">
          <div class="body-1 grey--text">
            {{computedTask.description}}
            <v-divider></v-divider>
          </div>
          <div class="layout row wrap align-center justify-content-end px-2">
            <v-flex xs12>
              <v-layout class="pa-1">
                <span class="info--text pr-2">starts</span> {{startDate}} <v-spacer/> {{endDate}} <span class="error--text pl-2">ends</span>
              </v-layout>
            </v-flex>
            <v-flex xs12 class="py-0 px-1">
              <v-divider/>
            </v-flex>
            <v-flex xs12>
              <div class="text-xs-center">
              <div class="grey--text text-lighten--2">spent credits</div>
              <v-rating
                dense
                v-model="rating"
                :length="slidemax"
                :background-color="lightOut ? 'secondary' : 'grey ligten-3'"
                empty-icon="star"
                full-icon="star"
                readonly
                small
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
                  full-icon="star_border"
                  half-increments
                  readonly
                  small
                  color="red"
                ></v-rating>
                <div class="grey--text text-lighten--2">lost credits</div>
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
            <div class="caption grey--text">#{{assigned.teams.map(t => teams[t].name).join(' - ')}}</div>
          </div>
          <v-spacer/>
          <div class="d--wrapper">
            <span class="caption grey--text mr-2">{{commentCount}}</span>
            <dtaskcomments :taskid="taskid">
              <v-icon slot="customactivator" color="grey lighten-2" class="mr-1">question_answer</v-icon>
            </dtaskcomments>
          </div>
        </v-card-actions>
      </v-card>
    </v-expansion-panel-content>
</template>

<script lang="js">
import { dtaskcomments, dtaskdone, dtaskdel } from '@/components/dialog'
export default {
  name: 'taskcard',
  components: {dtaskcomments, dtaskdone, dtaskdel},
  props: {
    taskid: { required: true, type: [String, Number] },
    index: Number
  },
  computed: {
    computedTask () { return this.task(this.taskid) },
    // task () { return this.tasks[this.taskid] },
    assigned () { return this.user(this.computedTask.assigned) },
    avatar () { return this.assigned.profilePicture || this.dummyavatar },
    commentCount () { return this.computedTask.comments.length },
    color () {
      return (this.computedTask.status === 0 && new Date(this.computedTask.end).getTime() < new Date().getTime()) ||
        (this.computedTask.status === 1 && new Date(this.computedTask.end).getTime() < new Date(this.computedTask.finishedAt).getTime())
        ? 'error'
        : this.blocks[this.computedTask.block].color
    },
    delayed () { return this.isDelayed(this.task) },
    rating () {
      let max = this.daysBetween(new Date(this.computedTask.start), new Date(this.computedTask.end))
      // this.sliderangeUpdate()
      return this.computedTask.status === 0
        ? Math.min(this.daysBetween(new Date(this.computedTask.start), new Date()), max)
        : Math.min(this.daysBetween(new Date(this.computedTask.start), new Date(this.computedTask.finishedAt)), max)
    },
    overdue () {
      let today = new Date()
      let end = new Date(this.computedTask.end)
      let finished = new Date(this.computedTask.finishedAt)
      return this.computedTask.status === 1
        ? finished.getTime() > end.getTime()
          ? Math.abs(this.daysBetween(finished, end))
          : undefined
        : today.getTime() > end.getTime()
          ? Math.abs(this.daysBetween(today, end))
          : undefined
    },
    ratecolor () {
      let max = this.daysBetween(new Date(this.computedTask.start), new Date(this.computedTask.end))
      return this.rating <= (1 * max / 5)
        ? 'success'
        : this.rating <= (2 * max / 5)
          ? 'accent'
          : this.rating <= (3 * max / 5)
            ? 'info'
            : this.rating <= (4 * max / 5)
              ? 'warning'
              : 'deep-orange'
    },
    slidemax () {
      return this.daysBetween(new Date(this.computedTask.start), new Date(this.computedTask.end))
    },
    startDate () {
      return new Date(this.computedTask.start).toLocaleDateString()
    },
    endDate () {
      return new Date(this.computedTask.end).toLocaleDateString()
    },
    finished () {
      return this.computedTask.finishedAt ? new Date(this.computedTask.finishedAt).toLocaleDateString() : undefined
    },
    canRemove () {
      return this.computedTask.creator === this.loggedUser || this.projects(this.computedTask.project).manager === this.loggedUser
    }
  },
  methods: {
    update (val) {
      this.$emit('input', val)
    }
    // onTaskDeleted () {
    //   this.$emit('task-deleted', this.task)
    // },
    // onTaskFinished () {
    //   this.$emit('task-finished', this.task)
    // }
    // sliderangeUpdate () {
    // this.sliderange = [0, this.daysBetween(new Date(this.computedTask.start), new Date())]
    // return this.sliderange
    // }
  }
}
</script>
<style scoped>
.task-delayed {
  background-color: rgba(255, 0, 0, 0.3) !important;
}
</style>


