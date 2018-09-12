<template>
  <div :class="{'pa-4 ma-2 text-xs-center': true, 'secondary darken-1':lightOut, 'grey lighten-3': !lightOut}"
   style="width: 360px;">
    <v-layout row align-center justify-space-between class="pa-3">
      <div>
        <v-avatar size="80px" >
          <img :src="useravatar(member.id)" :alt="member.username">
        </v-avatar>
        <div class="subheading">
        {{member.username}}
        </div>
      </div>
      <div :class="{'elevation-2 pa-3': true, 'secondary':lightOut, 'grey lighten-5': !lightOut}" style="width: 160px">
        <div :class="`display-1 ${temperColor(100, assignedResult)}--text`">
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
      <div class="pb-2">
        <span :class="`${taskTemper}--text headline`">{{percentAssignedScore}}%</span>
        <br>Tasks Score<br>
        <hr>
        {{scoreForTasks.score}} credits
      </div>
      <div class="py-2">
        <span :class="`${taskTemper}--text subheading`">{{scoreForTasks.antecipatedCredits}}</span>
        <br>Anticipation<br>
        <hr>
        {{scoreForTasks.antecipatedTasks}} tasks
      </div>
      <div class="py-2">
        <span :class="`${taskTemper}--text subheading`">{{scoreForTasks.overduedCredits}}</span>
        <br>Overdue<br>
        <hr>
        {{scoreForTasks.overduedTasks}} tasks
      </div>
      <div class="py-2">
        <span :class="`${taskTemper}--text subheading`">{{scoreForTasks.credits}}</span>
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
      <div class="pb-2">
        <span :class="`${dailyTemper}--text headline`"> {{scoreForDailies.participation}}%</span><br>
        Participation
      </div>
      <div class="py-2">
        <span :class="`${dailyTemper}--text subheading`"> {{scoreForDailies.attended}}</span><br>
        Attended
      </div>
      <div class="py-2">
        <span :class="`${dailyTemper}--text subheading`"> {{scoreForDailies.missed}}</span><br> 
        Missed
      </div>
      <div class="py-2">
        <span :class="`${dailyTemper}--text subheading`"> {{scoreForDailies.total}}</span><br> 
        Total
      </div>
    </v-layout>
  </div>
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
