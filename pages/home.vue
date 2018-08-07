<template>
  <v-layout row align-center justify-center>
    <v-flex xs12 sm10 md8>
      <v-container fluid grid-list-xl>
        <v-layout row wrap justify-center align-center>
          <v-flex sm4>
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
          <v-flex sm8>
            <v-card light
              img="https://images.pexels.com/photos/1043514/pexels-photo-1043514.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
              height="280">
              <v-card-title primary-title class="align-end">
                <v-icon large color="secondary">dashboard</v-icon>
                <div class="display2">Manage your Projects</div>
              </v-card-title>
              <v-card-text class="text-xs-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste a sed reprehenderit quam tenetur neque,
                temporibus debitis ex, odit ad unde ab cupiditate error, tempore culpa provident dicta cumque? Ad?
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex sm4>
            <v-card
              light
              height="175"
              img="https://images.pexels.com/photos/733852/pexels-photo-733852.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260">
              <v-card-title>
                <div class="headline primary--text text--darken-2">Follow tasks results</div>
              </v-card-title>
              <v-card-text class="subheading">
                Any project progress emits ease to answer notifications, with live updates on each answer.
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex sm4>
            <!-- <v-container
              fluid
              grid-list-md
            > -->
            <v-card color="error"
              height="175"
              img="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260">
              <v-card-title>
                <v-flex xs12>
                  <div class="headline">LateX writing</div>
                  <div>icarotorres</div>
                  <v-divider dark></v-divider>
                  <div>{{new Date().toLocaleDateString()}}</div>
                </v-flex>
              </v-card-title>
              
              <!-- <v-card-media
                src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"
                height="125px"
                contain
              ></v-card-media> -->
              
              <v-divider dark></v-divider>
              <v-card-actions class="py-2 px-4">
                Rate task results
                <v-spacer></v-spacer>
                <v-icon>star_border</v-icon>
                <v-icon>star_border</v-icon>
                <v-icon>star_border</v-icon>
                <v-icon>star_border</v-icon>
                <v-icon>star_border</v-icon>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex sm4>
            
          </v-flex>
          <v-flex sm6>
            
          </v-flex>
          <v-flex sm6>
            
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>

</template>
<script>
export default {
  layout: 'alter',
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
