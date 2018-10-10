<template>
  <!-- <v-card :class="{'pa-4 mx-2 mt-5 text-xs-center': true, 'secondary darken-1':lightOut, 'grey lighten-3': !lightOut}" -->
  <v-card :class="{'pa-4 mx-2 mt-5 text-xs-center member-result': true, 'dark': lightOut, 'light': !lightOut}" width="360px">
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
import { mapGetters, mapState } from 'vuex'
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
    ...mapState(['lightOut']),
    ...mapGetters([
      'memberScoreForTasks',
      'memberScoreForDailies',
      'username',
      'useravatar',
      'temperColor'
    ]),
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

<style scoped>
.member-result.dark {
  background: url(http://coffecase.win/77/abc1f/material-design-wallpaper-red-034-by-charlie-henson_material-design-wallpaper-red-by-charlie-henson-devia-on-material-wallpapers-collection-for-free-downl.png) 59% 60% no-repeat;
  background: url(https://www.vactualpapers.com/wallpapers/material-design-hd-wallpaper-no-0196/download/1920x1080.png) 59% 60% no-repeat;
  background-size: auto;
}
.member-result.light {
  background: url(https://images.unsplash.com/photo-1520588831435-1529e6d7cf5e?ixlib=rb-0.3.5&s=7b9b8daa4ec154bb3d599ddeb16fffec&auto=format&fit=crop&w=984&q=80) 50% 50% no-repeat;
  background: url(https://spayce.me/wp-content/uploads/2018/02/4k-wallpaper-android-material-design-wallpaper-full.jpg) 25% 15% no-repeat;
  background: url(https://wallpaper-house.com/data/out/7/wallpaper2you_166304.png) 100% 0% no-repeat;
  background: url(http://coffecase.win/77/48fda/material-design-android-6-0-marshmallow-material-design-android-6-0-marshmallow_x-material-design-android-marshmallow-on-material-wallpap.jpg) 45% 100% no-repeat;
  background: url(https://besthqwallpapers.com/img/original/33662/4k-material-design-lines-geometry-triangles.jpg) 25% 0% no-repeat;
  background: url(http://getwallpapers.com/wallpaper/full/a/3/3/432019.jpg) 25% 0% no-repeat;
  /* background-size:300%; */
  background-size:cover;
}
</style>
