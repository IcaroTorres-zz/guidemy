<template>
    <v-expansion-panel-content  hide-actions :class="{'task-delayed': delayed}">
      <template slot="header" row>
          <v-progress-linear
            style="left: 0; right:0; top: 0;position: absolute; transform: translateY(-14px)"
            background-color="transparent"
            :color="ratecolor"
            height="4"
            :value="rating * (100 / slidemax)"
          ></v-progress-linear>

        <v-flex xs12:class="{'pl-0': true}">
          <v-layout row wrap align-center>
            <v-flex style="max-width: 26px; transform: scaleY(1.4) scaleX(1.2); margin-left: -6px;" class="pa-0"><v-icon color="primary">drag_indicator</v-icon></v-flex>
            <v-flex class="pa-0">
              <span class="subheading">{{task.title}}</span>
              <div v-if="task.status === 1" :class="ratecolor +'--text'" style="font-size: 11px; line-height: 8px;">finished at: {{finished}}</div>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs1 class="pa-0 text-xs-right">
              <v-layout column>
                <dtaskdone :task="task" v-if="task.status !== 1" >
                  <v-btn small icon flat class="ma-0" color="light-green accent-2" slot="customactivator">
                    <v-icon small>done_outline</v-icon>
                  </v-btn>
                </dtaskdone>
                <dtaskdel :task="task">
                  <v-btn small icon flat class="ma-0" color="error" v-if="canRemove" slot="customactivator">
                    <v-icon small>delete</v-icon>
                  </v-btn>
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
            <!-- <v-flex xs12 class="py-0 mb-1">
              <v-range-slider
                hide-details
                v-model="sliderange"
                :max="slidemax"
                :min="0"
                readonly
                :color="ratecolor"
              ></v-range-slider>
            </v-flex> -->
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
            <div class="caption grey--text">#{{assigned.teams.join('- ')}}</div>
          </div>
          <v-spacer/>
          <div class="d--wrapper">
            <span class="caption grey--text mr-2">{{commentCount}}</span>
            <dtaskcomments :task="task">
              <v-btn icon small slot="customactivator">
                <v-icon color="grey lighten-2" class="mr-1">question_answer</v-icon>
              </v-btn>
            </dtaskcomments>
          </div>
        </v-card-actions>
      </v-card>
    </v-expansion-panel-content>
</template>

<script lang="js">
import { dtaskcomments, dtaskdone, dtaskdel } from '../components/dialog'
export default {
  name: 'taskcard',
  components: {dtaskcomments, dtaskdone, dtaskdel},
  props: {
    taskId: [String, Number],
    block: Object
  },
  data: () => ({
    sliderange: [0, 0]
  }),
  computed: {
    task () { return this.$store.getters.task(this.taskId) },
    assigned () { return this.user(this.task.assigned) },
    avatar () { return this.assigned.profilePicture || this.dummyavatar },
    commentCount () { return this.task.comments.length || Math.floor(Math.random() * 100) },
    color () {
      return (this.task.status === 0 && new Date(this.task.end).getTime() < new Date().getTime()) ||
        (this.task.status === 1 && new Date(this.task.end).getTime() < new Date(this.task.finishedAt).getTime())
        ? 'error'
        : this.block.color
    },
    delayed () { return this.isDelayed(this.task) },
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
      return this.task.creator === this.loggedUser || this.$store.getters.project(this.task.project).manager === this.loggedUser
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
.task-delayed {
  /* border-top: 3px solid #f72719 !important; */
  background-color: rgba(255, 0, 0, 0.3) !important;
}
</style>


