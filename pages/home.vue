<template>
  <v-container fluid grid-list-lg>
    <v-layout row>
      
      <v-flex sm12>
        <v-card >
          <v-card-title class="pa-2" style="background-color: rgba(0,0,0,.5)">
            <v-flex xs12 sm7>
              <div class="title primary--text">Ferramenta Reativa para GEstão Ágil de Projetos Acadêmicos</div>
              <div class="caption">manager: <span class="body-2 info--text">@giltonsilva</span></div>
              <div class="caption">team: <span class="body-2 success--text">@icarotorres</span></div>
              <v-divider dark></v-divider>
              <div class="caption">start: <span class="success--text">{{new Date().toLocaleDateString()}}</span></div>
              <div class="caption">due date: <span class="red--text">{{new Date('09-18-2018').toLocaleDateString()}}</span></div>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex class="justify-end">
              <v-card-media
                src="https://images.pexels.com/photos/450035/pexels-photo-450035.jpeg?auto=compress&cs=tinysrgb&h=350"
                height="120px"
                contain
              ></v-card-media>
            </v-flex>
          </v-card-title>
          <v-card-actions class="py-2 px-4">
            Rate Project
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

    <v-layout row justify-center align-content-start style="overflow-x: auto">

      <v-flex sm3 :class="'project-block project-block__' + block.color" v-for="(block, i) in blocks" :key="i">
        <v-layout column justify-start align-content-start style="position: relative;">
          <v-toolbar :class="block.color + ' mb-2'"
            dense raised style="position: sticky; top: -8px; z-index:2">
            <v-toolbar-title v-html="block.text"/>
            <v-spacer/>
            <v-toolnar-items>
              <v-btn small icon >
                <v-icon small>edit</v-icon>
              </v-btn>
            </v-toolnar-items>
          </v-toolbar>
          <cardsample v-for="(t, tidx) in block.tasks" :key="tidx" :taskId="t" :user="user"/>
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
      return this.$store.getters.userProjects(this.user.id)
    },
    blocks () {
      const bs = this.$store.getters.userProjects(this.user.id)[0].blocks
      console.log(bs)
      return bs
    }
  },
  methods: {
    toggleBlockEdit (block, value) {
      block.button = value
      console.log(block)
    }
  }
}
</script>
<style src="assets/style/style.css"></style>
