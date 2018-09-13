<template>
  <v-app dark>
    <v-content>
      <v-toolbar flat fixed class="transparent">
      <v-spacer v-if="smAndUp"/>
      <v-toolbar-items app>
        <v-btn flat small color="primary">Why {{apptitle}}?</v-btn>
        <v-btn flat small color="primary">Examples</v-btn>
        <v-btn flat small color="primary">About Us</v-btn>
        <v-btn flat small color="primary">Find Projects</v-btn>
      </v-toolbar-items>
    </v-toolbar>
      <section>
        <v-parallax
          :src="require('@/assets/hero.jpeg')" 
          :style="{ 'height': 'auto'}"
          class="pt-5"
          >
          <v-layout
            :row="mdAndUp || $route.name === 'index'"
            :wrap="mdAndUp || $route.name === 'index'"
            :column="smAndDown && $route.name === 'signin'"
            align-center
            justify-center
            class="my-3"
            fill-height
            :style="{'height':smAndUp || $route.name === 'signin' ? '600px' : '850px'}"
          >
            <div class="text-xs-center">
              <img src="../assets/logo1-alpha.png" alt="Guideme"
                :style="{'height':smAndUp ? '100px' : '60px'}">
              <h1 :class="{'display-2': smAndUp, 'headline': !smAndUp, 'primary--text': true}">{{apptitle}}</h1>
              <div :class="{'subheading': smAndUp, 'body-2': !smAndUp, 'secondary--text': true}">Lorem, ipsum dolor.</div>
            </div>
            <v-flex xs12 sm7 md5 lg4 offset-md1 style="opacity: .8">
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
                <h2 class="headline">Keep your developing feedbacks flowing</h2>
                <em class="subheading">
                  Completely Open Sourced
                </em>
              </v-flex>
              <v-flex xs12>
                <v-container grid-list-xl>
                  <v-layout row :wrap="smAndDown" justify-center align-center>
                    <template v-for="(column, i) in promoColumns">
                      <v-flex xs12 :key="column.title">
                        <v-card :color="column.color" class="elevation-20">
                          <v-card-text class="text-xs-center">
                            <v-icon medium v-html="column.icon"/>
                          </v-card-text>
                          <v-card-title class="layout justify-center title pa-0" v-text="column.title"/>
                          <v-card-text v-text="column.text" class="grey--text caption"/>
                        </v-card>
                      </v-flex>
                      <v-divider :vertical="$vuetify.breakpoint.mdAndUp" :key="i" v-if="i !== promoColumns.length - 1"></v-divider>
                    </template>
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
                <img src="../assets/logo2-alpha.png" alt="Guideme" height="25" class="pr-1">
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
            <img src="../assets/logo2-alpha.png" alt="Guideme" height="25" class="pr-1">
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
export default {
  data: () => ({
    promoColumns: [
      {
        color: 'secondary',
        title: 'Ease Usage',
        icon: 'color_lens',
        text: `Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
              Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.`
      },
      {
        color: 'transparent',
        title: 'Fast Feedbacks',
        icon: 'flash_on',
        text: `Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
              Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.`
      },
      {
        color: 'secondary darken-1',
        title: 'Better Guidance',
        icon: 'build',
        text: `Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
              Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.`
      }
    ]
  }),
  watch: {
    hasUserLogged (val, oldval) {
      if (!oldval && val) {
        this.$store.dispatch('generateusers', 150)
      }
    }
  },
  computed: {
    hasUserLogged () {
      return !!this.loggedUser
    }
  }
}
</script>

<style scoped>

.v-toolbar {
  z-index: 99;
}
</style>
