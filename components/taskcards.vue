<template>

  <v-expansion-panel expand>
    <v-expansion-panel-content
      v-for="(task, index) in value"
      :key="task.id"
      hide-actions :class="{'task-delayed': isDelayed(task), 'mt-1': index !== 0}">
      <template slot="header" row :class="{'mt-1': index !== 0 }">
          <v-progress-linear
            style="left: 0; right:0; top: 0;position: absolute; transform: translateY(-14px)"
            background-color="transparent"
            :color="ratecolor(task)"
            height="4"
            :value="rating(task) * (100 / slidemax(task))"
          ></v-progress-linear>

        <v-flex xs12 :class="{'pl-0': true}">
          <v-layout row wrap align-center>
            <v-flex style="max-width: 26px; transform: scaleY(1.2); margin-left: -6px;" class="pa-0">
              <v-icon color="primary">drag_indicator</v-icon>
            </v-flex>
            <v-flex class="pa-0 task-title">
              <span class="subheading">{{task.title}}</span>
              <div v-if="task.status === 1" :class="ratecolor(task) +'--text'" style="font-size: 11px; line-height: 8px;">done on: {{task.finishedAt | locale}}</div>
            </v-flex>
            <v-spacer/>
            <v-flex xs1 class="py-0 pl-0 pr-1 text-xs-right">
              <v-layout column>
                <dtaskdone :taskid="task.id" v-if="task.status !== 1" @task-finished="update($event)">
                  <v-icon small color="success" slot="customactivator">done_outline</v-icon>
                </dtaskdone>
                <dtaskdel :taskid="task.id" @task-deleted="update($event)">
                  <v-icon small color="error" v-if="canRemove(task)" slot="customactivator">delete</v-icon>
                </dtaskdel>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>

      </template>
      <v-card tile flat :class="{'secondary darken-1':lightOut, 'grey lighten-3': !lightOut}">
        <v-card-text class="px-2 pt-2 pb-0">
          <div class="body-1 grey--text">
            {{task.description}}
            <v-divider></v-divider>
          </div>
          <div class="layout row wrap align-center justify-content-end px-2">
            <v-flex xs12>
              <v-layout class="pa-1">
                <span class="info--text pr-2">starts</span> {{task.start | locale }} <v-spacer/> {{task.end | locale}} <span class="error--text pl-2">ends</span>
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
                :value="rating(task)"
                :length="slidemax(task)"
                :background-color="lightOut ? 'secondary' : 'grey ligten-3'"
                empty-icon="star"
                full-icon="star"
                readonly
                small
                :color="ratecolor(task)"
              ></v-rating>
              </div>
            </v-flex>
            <v-flex xs12 class="py-0 px-1" v-if="overdue(task)">
              <v-divider/>
            </v-flex>
            <v-flex xs12 v-if="overdue(task)">
              <div class="text-xs-center">
                <v-rating
                  dense
                  :value="overdue(task)"
                  :length="overdue(task)"
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
            <img :src="useravatar(task.assigned)">
          </v-avatar>
          <div>
            <div class="body-1">{{username(task.assigned)}}</div>
            <div class="caption grey--text">#{{user(task.assigned).teams.map(t => teams[t].name).join(' - ')}}</div>
          </div>
          <v-spacer/>
          <div class="d--wrapper">
            <span class="caption grey--text mr-2">{{task.comments.length}}</span>
            <dtaskcomments :taskid="task.id">
              <v-icon slot="customactivator" color="grey lighten-2" class="mr-1">question_answer</v-icon>
            </dtaskcomments>
          </div>
        </v-card-actions>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="js">
import { dtaskcomments, dtaskdone, dtaskdel } from '@/components/dialog'
export default {
  name: 'taskcards',
  components: {dtaskcomments, dtaskdone, dtaskdel},
  props: {
    value: { require: true, type: Array }
  },
  methods: {
    assigned (task) { return this.user(task.assigned) },
    color (task) {
      return (task.status === 0 && new Date(task.end).getTime() < new Date().getTime()) ||
        (task.status === 1 && new Date(task.end).getTime() < new Date(task.finishedAt).getTime())
        ? 'error'
        : this.blocks[task.block].color
    },
    rating (task) {
      let max = this.daysBetween(new Date(task.start), new Date(task.end))
      return Math.min(this.daysBetween(
        new Date(task.start),
        (task.status === 0 ? new Date() : new Date(task.finishedAt))
      ), max)
    },
    overdue (task) {
      let today = new Date()
      let end = new Date(task.end)
      let finished = new Date(task.finishedAt)
      return task.status === 1
        ? finished.getTime() > end.getTime()
          ? Math.abs(this.daysBetween(finished, end))
          : undefined
        : today.getTime() > end.getTime()
          ? Math.abs(this.daysBetween(today, end))
          : undefined
    },
    ratecolor (task) {
      let max = this.daysBetween(task.start, task.end)
      return this.temperColor(max, this.rating(task))
    },
    slidemax (task) {
      return this.daysBetween(new Date(task.start), new Date(task.end))
    },
    canRemove (task) {
      return task.creator === this.loggedUser || this.projects(task.project).manager === this.loggedUser
    },
    update (val) {
      this.$emit('input', val)
    }
  }
}
</script>
<style scoped>
.task-delayed {
  background-color: rgba(255, 0, 0, 0.3) !important;
}
</style>


