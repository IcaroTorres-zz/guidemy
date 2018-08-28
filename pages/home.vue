<template>
  <v-container fluid grid-list-lg>
    <v-layout row>
      
      <v-flex sm12>
        <v-card >
          <v-card-title class="pa-2" style="background-color: rgba(0,0,0,.5)">
            <v-flex xs12 sm7>
              <div class="title primary--text">LateX writing</div>
              <div class="caption">manager: <span class="body-2 info--text">@icarotorres</span></div>
              <div class="caption">team: <span class="body-2 success--text">@icarotorres</span></div>
              <v-divider dark></v-divider>
              <div class="caption">start: <span class="success--text">{{new Date().toLocaleDateString()}}</span></div>
              <div class="caption">due date: <span class="red--text">{{new Date().toLocaleDateString()}}</span></div>
            </v-flex>
            <v-flex xs12 sm5 class="align-end">
              <v-card-media
                src="https://images.pexels.com/photos/450035/pexels-photo-450035.jpeg?auto=compress&cs=tinysrgb&h=350"
                height="120px"
                contain
              ></v-card-media>
            </v-flex>
          </v-card-title>
          <v-card-actions class="py-2 px-4">
            Rate task results
            <v-spacer></v-spacer>
            <v-icon>star</v-icon>
            <v-icon>star</v-icon>
            <v-icon>star</v-icon>
            <v-icon>star_border</v-icon>
            <v-icon>star_border</v-icon>
          </v-card-actions>
        </v-card>
        <v-card flat class="transparent">
          <v-card-title class="subheading justify-start pa-2">CREATE EVALUATE RATE</v-card-title>
          <v-card-text class="body-2 pb-2 pt-0">Find process problems, co-workers dificulties and get the best returns from your teams engagement</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row justify-center align-content-start>

      <v-flex sm3 class="mx-2">
        <v-layout column justify-start align-center>
          <v-toolbar class="yellow mb-2" dark dense flat>
            <v-toolbar-title v-html="'To-do'"/>
          </v-toolbar>
          <cardsample v-for="n in Math.floor(Math.random() * 9)" :key="n" :taskId="'t1'" :user="user"/>
        </v-layout>
      </v-flex>

      <v-flex sm3 class="mx-2">
        <v-layout column justify-start align-center>
          <v-toolbar class="light-blue lighten-2 mb-2" dark dense flat>
            <v-toolbar-title v-html="'Doing'"/>
          </v-toolbar>
          <cardsample v-for="n in Math.floor(Math.random() * 9)" :key="n" :taskId="'t2'" :user="user"/>
        </v-layout>
      </v-flex>

      <v-flex sm3 class="mx-2">
        <v-layout column justify-start align-center>
          <v-toolbar class="info mb-2" dark dense flat>
            <v-toolbar-title v-html="'To-check'"/>
          </v-toolbar>
          <cardsample v-for="n in Math.floor(Math.random() * 9)" :key="n" :taskId="'t3'" :user="user"/>
        </v-layout>
      </v-flex>

      <v-flex sm3 class="mx-2">
        <v-layout column justify-start align-center>
          <v-toolbar class="light-green lighten-1 mb-2" dark dense flat>
            <v-toolbar-title v-html="'Done'"/>
          </v-toolbar>
          <cardsample v-for="n in Math.floor(Math.random() * 9)" :key="n" :taskId="'t4'" :user="user"/>
        </v-layout>
      </v-flex>

    </v-layout>
  </v-container>
</template>
<script>
import cardsample from '../components/cardsample'
export default {
  layout: 'alter',
  components: {cardsample},
  data () {
    return {
    }
  },
  computed: {
    user () {
      return this.$store.getters.userByName('icarotorres') || {}
    },
    userProjects () {
      return this.$store.getters.userProjects(this.user.username)
    }
  }
}
</script>
<style src="assets/style/style.css"></style>
