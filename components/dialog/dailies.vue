<template>
      <v-dialog v-model="dialog" width="800px" scrollable :dark="lightOut">
      <template slot="activator" @click.stop="dialog = !dialog">
        <slot name="customactivator">
           <!-- <v-btn fab bottom right color="primary" slot="customactivator" dark fixed @click.stop="dialog = !dialog"><v-icon>add</v-icon></v-btn> -->
        </slot>
      </template>
      <v-card>
        <v-card-title class="py-3 display-1 primary">
          {{project.title}} Daily Meetings
        </v-card-title>
        <div class="px-3 py-2">
          Description: 
          <div class="grey--text text-xs-justify">{{project.description}}</div>
        </div>
        <v-divider></v-divider>
        <v-card-text height="800">
          <v-container grid-list-xl class="py-0">
            <v-layout row wrap>
              <v-flex xs12 class="followline-decorated">
                <template v-for="(daily, didx) in dailies">
                  <v-layout row justify-center align-content-start :key="daily.id">
                    <v-avatar  size="48px" color="grey lighten-4" >
                      <img :src="assigned.profilePicture" alt="avatar">
                    </v-avatar>
                    <v-flex>
                      <v-subheader class="ma-0 pa-0" v-if="didx === 0">TODAY!</v-subheader>
                      <v-layout row wrap align-start class="px-2">
                        <a class="primary--text subheading">{{assigned.username}}</a>
                        <v-flex xs12 v-for="n in 3" :key="n" class="pa-0 ma-0">
                          <v-textarea v-if="canAnswer(daily)"
                            rows="2"
                            row-height="16"
                            :background-color="dailyColor(daily)"
                            outline
                            :disabled="daily.status === -1"
                            :append-outer-icon="icons[n-1]"
                            class="text-xs-right"
                            :label="`Answer for question r${n}`"
                            persistent-hint
                            :hint="questions[n-1]"
                            :value="daily['r'+(n)]"
                            :auto-grow="true"
                          ></v-textarea>
                          <p v-else class="caption">r{{n}}: {{daily['r'+(n)]}}</p>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-btn icon small class="error--text" v-if="isManager">
                      <v-icon>gavel</v-icon>
                    </v-btn>
                  </v-layout>
                  <div :key="didx">
                    <v-layout row >
                      <div class="ml-5">{{new Date(daily.start).toLocaleDateString()}}</div>
                      <v-spacer></v-spacer>
                      <div v-if="daily.finishedAt" class="mr-5">
                        responded at: {{new Date(daily.start).toLocaleDateString()}} - {{new Date(daily.finishedAt).toLocaleTimeString()}}
                      </div>
                    </v-layout>
                    <v-divider   class="mx-0 mb-3"/>
                  </div>
                </template>
              </v-flex>

            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions class="pl-4">
          <!-- <v-flex xs12 class="layout row align-center justify-space-between">
            <v-avatar
              size="48px"
              color="grey lighten-4"
            >
              <img :src="loggedUserObj.profilePicture" alt="avatar">
            </v-avatar>
            <v-text-field
              class="px-2"
              placeholder="your comment"
              :value="todays"
              append-icon="send"
            ></v-text-field>
          </v-flex> -->
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
      todays: ''
    }
  },
  computed: {
    manager () { return this.user(this.project.manager) },
    assigned () { return this.loggedUserObj },
    dailies () {
      let mydailies = this.loggedUser === this.project.manager
        ? this.$store.getters.projectDailies(this.project.id)
        : this.$store.getters.projectDailies(this.project.id).filter(dl => dl.assigned === this.assigned.id)
      return mydailies.sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime())
    },
    isManager () { return this.loggedUser === this.project.manager }
  },
  methods: {
    dailyColor (d) {
      return d.status === -1 ? 'error' : d.status === 0 ? 'warning' : 'success'
    },
    judgeDaily (did) {
      // return comment.by === uid
    },
    canAnswer (d) {
      return true
      // return d.status > -1 && new Date(d.end).getDate() >= new Date().getDate()
    }
  }
}
</script>
<style scoped>
  .v-expansion-panel__header {
    padding-left: 0 !important ;
    padding-right: 0 !important; 
  }
  .followline-decorated{position: relative}
  .followline-decorated::after {
    height: 100%;
    width: 100%;
    position: absolute;
    top:0;
    left:0;
    bottom:0;
    right:0;
    border-left: 1.5px solid #fff !important;
    border-right: 1.5px solid #fff !important;
  }
</style>
