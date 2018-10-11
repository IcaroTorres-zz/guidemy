<template>
  <v-app dark>
    <v-toolbar prominent flat class="hidden-sm-and-down transparent flex sm10 md8" style="margin: 0 auto;">
      <v-toolbar-title>{{apptitle}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <v-btn disabled flat slot="activator">user guide</v-btn>
        <span>available soon</span>
      </v-tooltip>
      <v-tooltip bottom>
        <v-btn disabled flat slot="activator">Objetives</v-btn>
        <span>available soon</span>
      </v-tooltip>
      <v-tooltip bottom>
        <v-btn disabled flat slot="activator">About Us</v-btn>
        <span>available soon</span>
      </v-tooltip>
    </v-toolbar>
    <v-content>
      <section>
        <v-parallax
          :src="require('@/assets/hero.jpeg')"
          style="height: auto; min-height: 550px;"
          >
          <v-layout
            row
            wrap
            align-center
            justify-center
            fill-height
            style="height: auto; min-height: 550px;"
          >
            <div class="text-xs-center hidden-sm-and-down" >
              <img src="../assets/logo1-alpha.png" alt="Guideme" height="150px">
              <h1 class="display-2 primary--text">{{apptitle}}</h1>
              <div class="subheading secondary--text">Agile Tracker.</div>
            </div>
            <v-flex xs1 class="hidden-sm-and-down"></v-flex>
            <v-flex xs12 sm6 md4 lg3 style="opacity: .85">
              <nuxt />
            </v-flex>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-layout
          row
          wrap
          class="py-2"
          align-center
          justify-center
        >
          <v-flex xs12 sm10 md8>
            <v-layout column>
              <v-flex xs12 sm4 class="my-2 text-xs-center">
                <h2 class="headline primary--text">Track your progress easily</h2>
                <em class="subheading">
                  Completely Open Sourced
                </em>
              </v-flex>
              <v-flex xs12>
                <v-container grid-list-xl>
                  <v-layout row wrap justify-center align-center>
                    <v-flex xs12 sm4 :key="column.title" v-for="(column, i) in promoColumns"
                      :class="{'left-border': i !== 0, 'top-border': xsOnly && i !== 0}">
                      <v-card class="elevation-20 text-xs-center" :img="column.image" height="220">
                        <v-layout fill-height align-center justify-center class="display-1 black--text" v-text="column.title"/>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </section>

      <section>
        <v-parallax :src="require('@/assets/section2.jpg')" height="330">
          <v-layout column align-center justify-center class="text-xs-center primary--text">
            <div class="headline mb-2">Flow your projects has never been easier</div>
            <em>Kick-start one today</em>
            <v-btn
              color="success"
              class="mt-3"
              dark
              round
              raised
              href="/"
            >
              Get Started
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-layout
          row
          wrap
          class="py-2"
          align-center
          justify-center
        >
          <v-flex xs12 sm10 md8>
            <v-container grid-list-xl>
              <v-layout row wrap justify-space-between>
                <v-flex xs12 md5>
                  <v-card class="elevation-0 transparent">
                    <v-card-title class="layout justify-center">
                      <div class="headline primary--text">Company info</div>
                    </v-card-title>
                    <v-card-text class="text-xs-justify">
                      Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                      Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti. 
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md6>
                  <v-card class="elevation-0 transparent">
                    <v-card-title class="layout justify-center headline primary--text">Contact us</v-card-title>
                    <v-card-text class="text-xs-center">
                      Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                    </v-card-text>
                    <v-list dense class="mx-3">
                      <v-list-tile class="px-0">
                        <v-layout row justify-center align-center>
                          <v-flex xs3 sm4 md5 class="text-xs-center"><v-icon class="primary--text">place</v-icon></v-flex>
                          <v-flex class="white--text">Aracaju - SE, BR</v-flex>
                        </v-layout>
                      </v-list-tile>
                      <v-list-tile>
                        <v-layout row justify-center align-center>
                          <v-flex xs3 sm4 md5 class="text-xs-center"><v-icon class="primary--text">email</v-icon></v-flex>
                          <v-flex><div class="white--text">icaro.torres@dcomp.ufs.br <br>icaro.stuart@gmail.com</div></v-flex>
                        </v-layout>
                      </v-list-tile>
                    </v-list>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <v-footer dark class="primary px-4">
        <v-layout row justify-center align-center>
          <v-flex xs12 sm10 md8 class="hidden-sm-and-down">
            <v-layout row justify-space-between align-center>
              <v-layout row align-center>
                <img src="../assets/logo2.png" alt="Guideme" height="25" class="pr-1">
                Guideme by
                <em><a class="white--text" href="https://github.com/icarotorres" target="_blank"> Ícaro Torres</a></em>.
              </v-layout>
              <div class="text-xs-right">
                See more at my
                <em><a class="white--text" href="https://icarotorres.github.io" target="_blank">Portifolio</a></em>
              </div>
            </v-layout>
          </v-flex>
          <v-layout row justify-center align-center class="hidden-md-and-up">
            <img src="../assets/logo2.png" alt="Guideme" height="25" class="pr-1">
            Guideme by
            <em><a class="white--text" href="https://github.com/icarotorres" target="_blank"> Ícaro Torres</a></em>.
            More at my
            <em><a class="white--text" href="https://icarotorres.github.io" target="_blank">Portifolio</a></em>
          </v-layout>
        </v-layout>
      </v-footer>
    </v-content>
  </v-app>  
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    promoColumns: [
      {
        title: 'User centered',
        image: 'https://images.unsplash.com/photo-1532102235608-dc8fc689c9ab?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=344665e7ec2cff87b2ea6185c807e173&auto=format&fit=crop&w=1350&q=80'
      },
      {
        title: 'Contextual',
        image: 'https://images.unsplash.com/photo-1510070112810-d4e9a46d9e91?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0aa88cd9eb66029e5134a759d301d549&auto=format&fit=crop&w=1350&q=80'
      },
      {
        title: 'Better work',
        image: 'https://images.unsplash.com/photo-1520588831435-1529e6d7cf5e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fd3d7c35892bd8c7c9e757865a764d4c&auto=format&fit=crop&w=984&q=80'
      }
    ]
  }),
  computed: mapGetters([
    'mdAndUp',
    'smAndUp',
    'smAndDown',
    'xsOnly'
  ])
}
</script>

<style scoped>
.left-border {
  border-left: .75px solid #555;
}
.left-border.top-border {
  border-left: none;
  border-top: .75px solid #555;
}
.v-toolbar {
  z-index: 99;
}
</style>
