<template>
  <!-- <v-card :class="{'pa-4 mx-2 mt-5 text-xs-center': true, 'secondary darken-1':lightOut, 'grey lighten-3': !lightOut}" -->
  <v-card class="pa-4 mx-2 mt-5 text-xs-center" width="360px">
    <v-layout column align-center justify-center style="margin-top: -64px">
        <nuxt-link :to="{name: 'user', params: {user: member.username}}">
          <v-avatar size="80px" :class="`elevation-${hover}`" @mouseover="hover = 15" @mouseout="hover = 0">
            <img :src="useravatar(member.id)" :alt="member.username">
          </v-avatar>
        </nuxt-link>
        <div class="subheading">{{member.username}}</div>
      <div style="width: 110px">
        <div :class="`headline ${temperColor(100, assignedResult)}--text`">
        {{assignedResult}}%
        </div>
        <hr>
        Assigned score
      </div>
    </v-layout>
    <v-layout row wrap justify-center align-center>
      <v-flex xs12 class="layout justify-center text-xs-center py-0">
        <v-progress-linear
          :color="taskTemper"
          height="15"
          :value="percentAssignedScore"
        ></v-progress-linear>
      </v-flex>
    </v-layout>
    <v-layout row justify-space-between align-content-end class="caption px-3">
      <div class="py-2">
        <span :class="`${taskTemper}--text title`">{{percentAssignedScore}}%</span>
        <br>Tasks Score<br>
        <hr>
        {{scoreForTasks.score}} credits
      </div>
      <div class="py-2">
        <span :class="`${taskTemper}--text body-2`">{{scoreForTasks.antecipatedCredits}}</span>
        <br>Anticipation<br>
        <hr>
        {{scoreForTasks.antecipatedTasks}} tasks
      </div>
      <div class="py-2">
        <span :class="`${taskTemper}--text body-2`">{{scoreForTasks.overduedCredits}}</span>
        <br>Overdue<br>
        <hr>
        {{scoreForTasks.overduedTasks}} tasks
      </div>
      <div class="py-2">
        <span :class="`${taskTemper}--text body-2`">{{scoreForTasks.credits}}</span>
        <br>Credits<br>
        <hr>
        {{scoreForTasks.total}} tasks
      </div>
    </v-layout>
    <v-divider></v-divider>
    <v-layout row wrap justify-center align-center>
      <v-flex xs12 class="layout justify-center text-xs-center pb-0">
        <v-progress-linear
          :color="dailyTemper"
          height="15"
          :value="scoreForDailies.participation"
        ></v-progress-linear>
      </v-flex>
    </v-layout>
    <v-layout row justify-space-between align-content-end class="caption px-3">
      <div class="py-2">
        <span :class="`${dailyTemper}--text title`"> {{scoreForDailies.participation}}%</span><br>
        Participation
      </div>
      <div class="py-2">
        <span :class="`${dailyTemper}--text body-2`"> {{scoreForDailies.attended}}</span><br>
        Attended
      </div>
      <div class="py-2">
        <span :class="`${dailyTemper}--text body-2`"> {{scoreForDailies.missed}}</span><br> 
        Missed
      </div>
      <div class="py-2">
        <span :class="`${dailyTemper}--text body-2`"> {{scoreForDailies.total}}</span><br> 
        Total
      </div>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: {
    member: {
      type: Object,
      required: true
    },
    project: {
      type: Object,
      required: true
    },
    weight: {
      type: [Object, Array],
      required: true
    }
  },
  data: () => ({
    hover: 0
  }),
  computed: {
    scoreForTasks () {
      return this.memberScoreForTasks(this.member.id, this.project.id)
    },
    percentAssignedScore () {
      return this.scoreForTasks.score
        ? Math.max(
          Math.min(
            (this.scoreForTasks.score * 100 / this.scoreForTasks.credits).toFixed(2),
            100),
          0)
        : 0
    },
    scoreForDailies () {
      return this.memberScoreForDailies(this.member.id, this.project.id)
    },
    taskTemper () {
      return this.temperColor(this.scoreForTasks.credits, this.scoreForTasks.score)
    },
    dailyTemper () {
      return this.temperColor(this.scoreForDailies.total, this.scoreForDailies.attended)
    },
    assignedResult () {
      return ((this.percentAssignedScore * this.weight.delivery / 100) + (this.scoreForDailies.participation * this.weight.daily / 100)).toFixed(2)
    }
  }
}
</script>

<style>

</style>
