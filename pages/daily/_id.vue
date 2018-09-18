<template>
  <v-container fluid class="new-daily-container">
    <h2 class="headline text-xs-center">
      Project: <nuxt-link :to="{name: 'project', params: {id: dailyProject.id}}">
        {{dailyProject.title}}
      </nuxt-link>
    </h2>
    <v-layout row justify-center align-content-start >
      <v-flex v-if="newDaily">
        <v-layout row align-center>
          <v-avatar  size="48px" color="grey lighten-4 mb-2">
            <img :src="loggedUserObj.picture" alt="avatar">
          </v-avatar>
          <div class="ml-2">
            <a class="primary--text subheading">{{loggedUserObj.username}}</a><br>
            {{newDaily.created | locale}} <span class="body-2 ml-2">TODAY!</span>
          </div>
          <v-spacer></v-spacer>
          <v-icon @click="open = !open">{{open ? 'unfold_less' : 'unfold_more'}}</v-icon>
          <v-btn flat small :disabled="!open" color="warning" @click.stop="onAnswerDaily"> responder <v-icon class="pl-2">send</v-icon></v-btn>
        </v-layout>
        <v-layout row wrap align-start class="px-2 pt-2">
          <v-flex xs12 v-for="n in 3" :key="n" class="pa-0 ma-0" v-if="open">
            <v-textarea
              color="black"
              box
              placeholder="Question was not responded"
              rows="2"
              row-height="16"
              :background-color="dailyColor(newDaily) + ' darken-1'"
              :append-icon="icons[n-1]"
              class="text-xs-right"
              :hint="`Answer for question r${n}`"
              persistent-hint
              :label="questions[n-1]"
              v-model="newDaily['r'+(n)]"
              auto-grow
            ></v-textarea>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex v-else>
        <div>
          <v-layout row>
            <v-avatar  size="48px" color="grey lighten-4 mb-2" >
              <img :src="useravatar(daily.assigned)" alt="avatar">
            </v-avatar>
            <div class="ml-2">
              <a class="primary--text subheading">{{username(daily.assigned)}}</a><br>
              <div v-if="daily.finished" class="caption grey--text mr-2">
                responded: {{daily.finished | postFormat}}
              </div>
            </div>
            <v-spacer></v-spacer>
          </v-layout>
        </div>
        <v-layout row wrap align-start class="pa-2">
          <v-flex xs12 v-for="n in 3" :key="n" class="pa-0 ma-0">
            <div >                          
              <span class="caption primary--text">{{questions[n-1]}}</span>
              <span class="error--text pl-2" style="font-size: 10px" v-if="daily.status === -1">(Question was not accepted)</span>
            </div>
            <p :class="dailyColor(daily) + '--text'">
              {{daily['r'+n] || 'Question was not responded'}}
            </p>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  validate ({store, params}) {
    console.log('daily', store.state.dailyMeetings[params.id], params)
    return !!store.state.dailyMeetings[params.id]
  },
  data () {
    return {
      questions: ['What did you do yesterday?', 'What will you do today?', 'Are there any impediments in the way?'],
      icons: ['alarm_on', 'alarm_add', 'alarm_off'],
      open: true,
      newDaily: undefined
    }
  },
  create () {
    console.log(this.$route.params)
    if (this.daily.status === 0 & new Date(this.daily.end).getDate() === new Date().getDate()) {
      this.newDaily = Object.assign({}, this.daily)
    }
  },
  computed: {
    daily () {
      return this.dailyMeetings[this.$route.params.id]
    },
    dailyProject () {
      const project = this.projects[this.daily.project]
      console.log(project, 'dailyproject')
      return project
    },
    isManager () { return this.loggedUser === this.dailyProject.manager }
    // myResults () {
    //   let total = this.dailies.length + 1
    //   let attended = this.dailies.filter(d => d.status === 1).length
    //   let participation = (attended * 100 / total).toFixed(2)
    //   return {
    //     participation: participation,
    //     attended: attended,
    //     missed: total - attended,
    //     total: total
    //   }
    // },
    // resultColor () {
    //   return this.temperColor(this.myResults.total, this.myResults.attended)
    // }
  },
  methods: {
    onAnswerDaily () {
      this.answerDaily(this.newDaily)
      this.newDaily = undefined
    },
    dailyColor (d) {
      return d.status === -1 ? 'error' : d.status === 0 ? 'warning' : 'success'
    }
  }
}
</script>
<style scoped>
  .v-expansion-panel__header {
    padding-left: 0 !important ;
    padding-right: 0 !important; 
  }
  .connected-left{position: relative}
  .connected-left::before, .connected-left::after {
    content: ' ';
    width: 1px;
    position: absolute;
    background-color: #555;
  }
  .connected-left::before {
    margin: 2.5px 20px 20px 0;
    top:0;
    bottom:50%;
    right:0;
  }
  .connected-left::after {
    margin: 35px 20px 5px 0;
    top:50%;
    bottom:0;
    right:0;
  }
  .action-middle-1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-35%);
  }
  .action-middle-2 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(70%);
  }
</style>
