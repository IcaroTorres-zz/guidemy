<!--<template>
  <v-container fluid grid-list-xl fill-height style="min-height: 100vh">
    <v-layout row wrap justify-center align-center>
        <v-card tile color="primary">
          <v-container fill-height height="150" align-center>
            <v-layout row wrap>
              <v-flex xs12 class="display-2 text-xs-center pb-0 px-0">
                {{projectCount}}
              </v-flex>
              <v-flex xs12 class="title text-xs-center pt-0 px-0">
                <v-icon large>dashboard</v-icon><span class="title">Projects</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <v-card tile height="200px">
          <v-container fill-height align-center>
            <v-layout row wrap>
              <v-flex xs12 class="display-2 text-xs-center pb-0 px-0">
                {{projectCount}}
              </v-flex>
              <v-flex xs12 class="title text-xs-center pt-0 px-0">
                <v-icon large>dashboard</v-icon><span class="title">Projects</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
    </v-layout>
  </v-container>
</template> -->

<template>
  <v-layout justify-center align-center style="min-height: 100vh">
    <v-flex xs12 sm6>
      <v-toolbar dense flat class="transparent">
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title>{{loggedUserObj.username}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>search</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card>
        <v-container
          fluid
          grid-list-md
        >
          <v-layout row wrap>
            <v-flex
              v-for="card in cards"
              v-bind="{ [`xs${card.flex}`]: true }"
              :key="card.title"
            >
              <v-card>
                <v-img
                  :src="card.src"
                  height="200px"
                >
                  <v-container
                    fill-height
                    fluid
                    pa-2
                  >
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline white--text" v-text="card.title"></span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-img>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>favorite</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>bookmark</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>share</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
  export default {
    data: () => ({
      cards: [
        { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
        { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
        { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 }
      ]
    })
  }
</script>

<style>

</style>
