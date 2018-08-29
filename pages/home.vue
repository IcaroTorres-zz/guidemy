<template>
  <div>
    <v-container fluid grid-list-xl class="py-0" v-for="project in userProjects" :key="project.id">
      <v-layout column>
        
        <v-flex xs12 class="pa-0">
          <dialogproject :edition="true" :project="project">
            <v-btn small outline class="ma-0" color="warning" slot="customactivator" >edit<v-icon small>edit</v-icon></v-btn>
          </dialogproject>
          <v-card class="transparent" flat @click="toggleBlocks(project)">
            <v-layout row wrap justify-space-between align-content-start class="py-0 px-1">
              <v-flex sm8 md9 class="pb-0">
                <div class="title primary--text py-2">{{project.title}}</div>
                <div class="body-2">Manager: <a class="info--text">@{{getUsername(project.manager)}}</a></div>
                <div class="body-2">Team: <a class="pr-2" v-for="coworker in project.coworkers" :key="coworker">@{{getUsername(coworker)}}</a></div>
                <div class="body-2">Created: <span class="caption text-xs-justify primary--text">{{new Date(project.start).toLocaleDateString('pt-BR')}}</span></div>
                <v-divider class="my-2"></v-divider>
                <div class="body-2">Description:</div>
                <p class="caption text-xs-justify primary--text">{{project.description}}</p>
              </v-flex>
              <v-flex sm4 md3 class="pb-0">
                <div class="text-xs-center" style="margin: auto; width: 100%;">

                  <pie-chart
                    :discrete="true"
                    type="variablepie"
                    innerSize="20%"
                    :data="donutChart(project)"
                    thousands="."
                    decimal=","
                    height="180px">
                  </pie-chart>

                  <!-- <img src="https://interworks.com/sites/default/files/blog/u150/donut.png" alt="" style="width: auto; max-width: 100%; max-height: 220px;"> -->
                </div>

                <!-- <v-card-actions>
                  <v-spacer></v-spacer>
                  Rate <v-icon v-for="n in 5" :key="n">star</v-icon>
                  <v-spacer></v-spacer>
                </v-card-actions> -->

              </v-flex>
              <!-- <v-flex xs12 class="pt-0">
                <v-divider class="mb-2"></v-divider>
                <div class="body-2 layout row px-3 mb-2 justify-space-between"><span class="success--text">{{new Date().toLocaleDateString()}}</span><span class="red--text">{{new Date('09-18-2018').toLocaleDateString()}}</span></div>
                <img src="https://datavizcatalogue.com/methods/images/top_images/line_graph.png" alt="" height="60">
                <img src="../assets/contributions.png" alt="" height="60" width="100%">
              </v-flex> -->
            </v-layout>
          </v-card>
        </v-flex>

      </v-layout>
      
      <v-layout row align-content-start class="scroller-horiz" value="visible[project.id] === true">

        <v-flex v-for="(block, i) in project.blocks" :key="i">
          <v-toolbar light :class="block.color + ' block-toolbar'" dense flat>
            <v-toolbar-title v-html="block.text"/>
            <v-spacer/>
            <v-btn small icon light>
              <v-icon small>more_horiz</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card :class="'transparent project-block scroller scroller__' + block.color" flat style="position: relative;">
            <cardsample :class="{ 'mt-1': tidx !== 0 }" v-for="(t, tidx) in block.tasks" :key="tidx" :taskId="t" :user="user"/>
          </v-card>
          <v-toolbar class="block-footer" dense flat>
            <v-spacer/>
            <v-btn small flat>
              <v-icon small>add</v-icon> add task
            </v-btn>
          </v-toolbar>
        </v-flex>

      </v-layout>
      <v-divider class="my-5"></v-divider>
    </v-container>
  </div>
</template>
<script>
import cardsample from '../components/cardsample'
import dialogproject from '../components/dialog-project'
export default {
  layout: 'alter',
  components: {cardsample, dialogproject},
  data () {
    return {
      visible: {}
    }
  },
  computed: {
    user () {
      return this.$store.getters.userByName('icarotorres') || {}
    },
    userProjects () {
      return this.$store.getters.userProjects(this.user.id)
    }
  },
  methods: {
    toggleBlockEdit (block, value) {
      block.button = value
      console.log(block)
    },
    getUsername (uid) {
      return this.$store.getters.user(uid).username
    },
    toggleBlocks (project) {
      this.visible[project.id] ? this.visible[project.id] = false : this.visible[project.id] = true
      console.log(this.visible)
    },
    donutChart (project) {
      return project.blocks.reduce((chart, b) => {
        chart[b.text] = b.tasks.length
        return chart
      }, {})
    }
  }
}
</script>
<style src="assets/style/style.css"></style>
