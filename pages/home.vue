<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap justify-center align-content-start>
      <v-flex xs12 sm5 md3 v-for="i in 5" :key="i">
        <v-card light>
          <v-card-text class="caption">project description Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, doloremque.</v-card-text>
          <v-card-title class="headline">Project title</v-card-title>
          <v-card-actions>

          </v-card-actions>
        </v-card>
      </v-flex>

      <v-layout row justify-start align-center style="overflow-X: auto;">
        <v-flex v-for="n in Math.floor(Math.random() * 28)" :key="n">
          <cardsample
            :user="user"
            :comments="Array((n*n) - Math.floor(Math.random() * n) * n)"
            :date="() => {
              let d = new Date()
              d.setDate(Math.floor(Math.random() * 28))
              return d.toLocaleDateString()
            }"
            :likes="75"
            :like="true"
            :fav="false"
            :closed="n%5===0"
          ></cardsample>
      </v-flex>
      </v-layout>

      <v-flex xs12 sm6>
        <v-card flat class="transparent">
          <v-card-text class="subheading">INSTANT FEEDBACKS</v-card-text>
          <v-card-title primary-title class="display-3">
            Time is Money<br>
            <div class="subheading">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, consectetur minus distinctio officiis et reiciendis!</div>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12 sm3>
        <v-card-text>
          <div class="subheading">PARALLEL MANAGEMENT</div>
          <div class="headline">Fluid tasks</div>
          <div class="headline">from many Projects</div>
          <div class="body-2">In the same monitoring platform. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, assumenda ratione et omnis dolor quod.</div>
        </v-card-text>
      </v-flex>
      <v-flex xs12 sm6>
        <v-card height="280">
          <v-card-media
            class="white--text"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="headline">Top 10 Australian beaches</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-media>
          <v-card-title>
            <div>
              <span class="grey--text">Number 10</span><br>
              <span>Whitehaven Beach</span><br>
              <span>Whitsunday Island, Whitsunday Islands</span>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>

      <v-flex sm3>
        <v-card >
          <v-card-title class="pa-2" style="background-color: rgba(0,0,0,.5)">
            <v-flex xs12 sm7>
              <div class="title primary--text">LateX writing</div>
              <div class="caption">manager: <span class="body-2 info--text">@icarotorres</span></div>
              <div class="caption">assigned: <span class="body-2 success--text">@icarotorres</span></div>
              <v-divider dark></v-divider>
              <div class="caption">start: <span class="success--text">{{new Date().toLocaleDateString()}}</span></div>
              <div class="caption">due date: <span class="red--text">{{new Date().toLocaleDateString()}}</span></div>
            </v-flex>
            <v-flex xs12 sm5>
              <v-card-media
                src="https://images.pexels.com/photos/450035/pexels-photo-450035.jpeg?auto=compress&cs=tinysrgb&h=350"
                height="120px"
                contain
              ></v-card-media>
            </v-flex>
          </v-card-title>
          
          
          <v-divider dark></v-divider>
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
          <v-card-title class="subheading justify-center pa-2">CREATE EVALUATE RATE</v-card-title>
          <v-card-text class="body-2 pb-2 pt-0">Find process problems, co-workers dificulties and get the best returns from your teams engagement</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm4>
        <v-card img="https://images.pexels.com/photos/826349/pexels-photo-826349.jpeg?auto=compress&cs=tinysrgb&h=350">
          <v-card-text class="subheading">
            Any project progress emits ease to answer notifications, with live updates on each answer.
          </v-card-text>
          <v-card-title class="justify-end display-1">Follow tasks results</v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12 sm5>
        <v-card img="https://images.pexels.com/photos/914931/pexels-photo-914931.jpeg?auto=compress&cs=tinysrgb&h=350">
          <v-card-title>
            <div class="display-1">Follow tasks results</div>
          </v-card-title>
          <v-card-text class="subheading">
            Any project progress emits ease to answer notifications, with live updates on each answer.
          </v-card-text>
        </v-card>
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
      return this.$store.getters.user('icarotorres') || {}
    },
    userProjects () {
      return this.$store.getters.userProjects(this.user.username)
    }
  }
}
</script>
<style src="assets/style/style.css"></style>
