<template>
  <v-dialog v-model="dialog" width="1000px" scrollable>
    <template slot="activator" @click.stop="dialog = !dialog">
      <slot name="customactivator"/>
    </template>
    <v-card :dark="lightOut">
      <v-card-title class="py-3 display-1 primary">
        {{project.title}} Daily Meetings
      </v-card-title>
      <div class="px-3 mt-2">
        Description: <p class="grey--text text-xs-justify">{{project.description}}</p>
        <v-divider v-if="isManager"></v-divider>
        <v-select v-if="isManager"
          dense
          prepend-icon="group"
          v-model="selectedWorker"
          :items="coworkers"
          item-value="id"
          item-text="username"
          label="project coworkers">
          <v-list-tile slot="prepend-item" disabled>
            <v-list-tile-avatar color="primary title">
              M
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title><span class="subheading primary--text">{{loggedUserObj.username}}</span> - you are the project anager</v-list-tile-title>
              <v-list-tile-sub-title class="caption grey--text" v-text="selectionSentense"/>
            </v-list-tile-content>
          </v-list-tile>
          <template slot="item" slot-scope="data">
            <template v-if="typeof data.item !== 'object'">
              <v-list-tile-content v-text="data.item"></v-list-tile-content>
            </template>
            <template v-else>
              <v-list-tile-avatar>
                <img :src="useravatar(data.item.id)">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="data.item.username"></v-list-tile-title>
                <v-list-tile-sub-title class="caption grey--text" v-html="data.item.teams.join(' - ')"></v-list-tile-sub-title>
              </v-list-tile-content>
            </template>
          </template>
          <v-divider slot="prepend-item" class="my-1"></v-divider>
        </v-select>

      </div>
      <v-divider/>
      <v-container grid-list-xl class="pb-0 p4-5 mt-2" v-if="newDaily" ref="dailycontainer">
        <v-layout column justify-center align-content-start>
          <v-flex class="pt-0">
            <v-layout row>
              <v-avatar  size="48px" color="grey lighten-4 mb-2">
                <img :src="loggedUserObj.profilePicture" alt="avatar">
              </v-avatar>
              <div class="ml-2">
                <a class="primary--text subheading">{{loggedUserObj.username}}</a><br>
                {{new Date(newDaily.start).toLocaleDateString()}} <span class="body-2 ml-2">TODAY!</span>
              </div>
              <v-spacer></v-spacer>
              <div class="caption grey--text">
                <v-btn icon small class="warning--text" @click="toggleNewDaily"><v-icon>{{open ? 'unfold_less' : 'unfold_more'}}</v-icon></v-btn>
                <v-btn flat small :disabled="!open" class="warning--text" @click.stop="answerDaily(newDaily)"> responder <v-icon class="pl-2">send</v-icon></v-btn>
              </div>
            </v-layout>
            <v-layout row wrap align-start class="px-2 pt-2" v-if="open">
              <v-flex xs12 v-for="n in 3" :key="n" class="pa-0 ma-0">
                <v-textarea
                  rows="2"
                  row-height="16"
                  :background-color="dailyColor(newDaily)"
                  outline
                  :append-outer-icon="icons[n-1]"
                  class="text-xs-right"
                  :hint="`Answer for question r${n}`"
                  persistent-hint
                  :label="questions[n-1]"
                  v-model="newDaily['r'+(n)]"
                  :auto-grow="true"
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
      <v-divider></v-divider>
      <v-card-text height="900">
        <v-container grid-list-xl class="py-1">
          <v-layout row wrap>
            <v-flex xs12 class="followline-decorated">
              <template v-for="(daily, didx) in dailies">
                <v-divider class="my-2 mr-5" :key="didx" v-if="didx !== 0"/>
                <v-layout row justify-center align-content-start :key="daily.id" class="connected-left">
                  <v-flex>
                    <div :key="didx">
                      <v-layout row>
                        <v-avatar  size="48px" color="grey lighten-4 mb-2" >
                          <img :src="useravatar(daily.assigned)" alt="avatar">
                        </v-avatar>
                        <div class="ml-2">
                          <a class="primary--text subheading">{{username(daily.assigned)}}</a><br>
                          <div v-if="daily.finishedAt" class="caption grey--text mr-2">
                            responded at: {{new Date(daily.start).toLocaleDateString()}} - {{new Date(daily.finishedAt).toLocaleTimeString()}}
                          </div>
                        </div>
                        <v-spacer></v-spacer>
                      </v-layout>
                    </div>
                    <v-layout row wrap align-start class="pa-2">
                      <v-flex xs12 v-for="n in 3" :key="n" class="pa-0 ma-0">
                        <v-textarea
                          rows="2"
                          row-height="16"
                          :background-color="dailyColor(daily)"
                          outline
                          :disabled="daily.status === -1"
                          :readonly="daily.status !== -1"
                          :append-outer-icon="icons[n-1]"
                          class="text-xs-right"
                          :hint="`Answer for question r${n}`"
                          :placeholder="daily.status === -1 ? 'Question was not responded' : ''"
                          persistent-hint
                          :label="questions[n-1]"
                          :value="daily['r'+(n)]"
                          :auto-grow="true"
                        ></v-textarea>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex style="max-width: 40px;">
                    <v-layout column fill-height align-center justify-start style="position: relative;">
                      <div style="transform: translateY(-18px)" class="caption">
                        <span v-if="didx === 0">TODAY!</span>
                        <span v-else>{{new Date(daily.start).toLocaleDateString()}}</span>
                      </div>
                      <!-- <v-btn icon small :class="{'success--text':daily.status === 1,  'action-middle-1': true}" -->
                        <!-- :disabled="!isManager" @click.stop="judgeDaily({id: daily.id, status: daily.status === 1 ? 0 : 1})"> -->
                        <v-icon :class="{'success--text':daily.status === 1,  'action-middle-1': true}"
                          :disabled="!isManager" @click.stop="judgeDaily({id: daily.id, status: daily.status === 1 ? 0 : 1})">
                          done_outline
                        </v-icon>
                      <!-- </v-btn> -->
                      <!-- <v-btn icon small :class="{'error--text':daily.status === -1,  'action-middle-2': true}" -->
                        <!-- :disabled="!isManager" @click.stop="judgeDaily({id: daily.id, status: daily.status === -1 ? 0 : -1})"> -->
                        <v-icon :class="{'error--text':daily.status === -1,  'action-middle-2': true}"
                          :disabled="!isManager" @click.stop="judgeDaily({id: daily.id, status: daily.status === -1 ? 0 : -1})">
                          gavel
                        </v-icon>
                      <!-- </v-btn> -->
                    </v-layout>
                  </v-flex>
                </v-layout>
              </template>
            </v-flex>

          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions class="pl-4">
        <v-spacer></v-spacer>
        <v-btn flat color="primary" @click="dialog = false">Back</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'projectdailies',
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      dialog: false,
      questions: ['What did you do yesterday?', 'What will you do today?', 'Are there any impediments in the way?'],
      icons: ['alarm_on', 'alarm_add', 'alarm_off'],
      selectionSentense: 'Select between your team coworkers below, to view their daily meetings progress and evaluate their contributions',
      selectedWorker: [],
      newDaily: undefined,
      open: false
    }
  },
  created () {
    this.selectedWorker = this.project.coworkers[0]
  },
  computed: {
    manager () { return this.user(this.project.manager) },
    coworkers () { return this.project.coworkers.map(uid => this.user(uid)) },
    assigned () { return this.selectedWorker ? this.user(this.selectedWorker) : this.loggedUserObj },
    dailies () {
      let mydailies = this.loggedUser === this.project.manager
        ? this.$store.getters.projectDailies(this.project.id)[this.selectedWorker]
        : this.$store.getters.projectDailies(this.project.id)[this.loggedUser]

      mydailies = mydailies.sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime())
      console.log(
        'condition values',
        mydailies.length > 0,
        mydailies[0].start,
        new Date(mydailies[0].start).getDate() === new Date().getDate(),
        mydailies[0].status === 0,
        this.loggedUser === mydailies[0].assigned
      )

      if (mydailies.length > 0 &&

          new Date(mydailies[0].start).getDate() === new Date().getDate() &&

          mydailies[0].status === 0 &&

          this.loggedUser === mydailies[0].assigned) {
        this.newDaily = { ...mydailies[0] }
        this.open = true
        return mydailies.slice(1)
      } else {
        return mydailies
      }
    },
    isManager () { return this.loggedUser === this.project.manager }
  },
  methods: {
    toggleNewDaily () {
      this.open = !this.open
      if (this.open) {
        this.$refs.dailycontainer.style.maxHeight = '100%'
      } else {
        this.$refs.dailycontainer.style.maxHeight = '54px'
      }
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
