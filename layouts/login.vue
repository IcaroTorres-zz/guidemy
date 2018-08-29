<template>
  <v-app dark>
    <v-toolbar light flat class="transparent">
      <v-layout row justify-center align-center>
        <v-flex xs12 sm10 md8>
          <v-layout row justify-space-between align-center>
            <v-layout row align-center>
              <!-- <nuxt-link to="/" class="flat-link"><img src="../assets/logo1-alpha.png" alt="Guideme" height="50"></nuxt-link> -->
              <nuxt-link to="/" class="title flat-link">{{apptitle}}</nuxt-link>
            </v-layout>
            <div class="text-xs-right">
              <nuxt-link to="/" class="subheading px-2 flat-link">Why {{apptitle}}?</nuxt-link>
              <nuxt-link to="/" class="subheading px-2 flat-link">Examples</nuxt-link>
              <nuxt-link to="/" class="subheading px-2 flat-link">About Us</nuxt-link>
              <nuxt-link to="/" class="subheading px-2 flat-link">Find Projects</nuxt-link>
            </div>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-toolbar>

    <v-content>
      <section>
        <v-parallax :src="require('@/assets/hero.jpeg')" style="height: auto" class="pt-5">
          <v-layout
            row
            wrap
            align-center
            justify-center
            class="my-3"
          >
            <div class="text-xs-center">
              <img src="../assets/logo1-alpha.png" alt="Guideme">
              <h1 class=" display-3 primary--text">{{apptitle}}</h1>
              <div class="title secondary--text">Lorem, ipsum dolor.</div>
            </div>
            <v-flex xs12 sm7 md5 lg4 offset-xs1 style="opacity: .8">
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
                  <v-layout row wrap align-center>
                    <v-flex xs12 md4>
                      <v-card light class="elevation-5 primary lighten-2">
                        <v-card-text class="text-xs-center">
                          <v-icon x-large>color_lens</v-icon>
                        </v-card-text>
                        <v-card-title class="layout justify-center">
                          <div class="headline text-xs-center">Ease usage</div>
                        </v-card-title>
                        <v-card-text>
                          Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
                          Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                          Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti. 
                        </v-card-text>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 md4>
                      <v-card light class="elevation-10 primary">
                        <v-card-text class="text-xs-center">
                          <v-icon x-large>flash_on</v-icon>
                        </v-card-text>
                        <v-card-title class="layout justify-center">
                          <div class="headline">Fast feedbacks</div>
                        </v-card-title>
                        <v-card-text>
                          Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
                          Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                          Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti. 
                        </v-card-text>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 md4>
                      <v-card light class="elevation-15 primary darken-2">
                        <v-card-text class="text-xs-center">
                          <v-icon x-large>build</v-icon>
                        </v-card-text>
                        <v-card-title class="layout justify-center">
                          <div class="headline text-xs-center">Better guidance</div>
                        </v-card-title>
                        <v-card-text>
                          Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
                          Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                          Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti. 
                        </v-card-text>
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
