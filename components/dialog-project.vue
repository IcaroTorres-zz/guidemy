<template>
  <v-dialog v-model="dialog" width="800px" scrollable :dark="lightOut">
    <template slot="activator">
      <slot name="customactivator"  @click.stop="dialog = !dialog" >
          <!-- <v-btn fab bottom right color="primary" slot="customactivator" dark fixed @click.stop="dialog = !dialog"><v-icon>add</v-icon></v-btn> -->
      </slot>
    </template>
    <v-card>
      <v-card-title :class="{ 'py-4': true, 'title': true, 'primary': !project, 'warning grey--text text--darken-3': project }">
        {{project ? 'Edit' : 'Create'}} Project
      </v-card-title>
      <v-card-text class="pa-0" height="800">
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field
                label="Project Name"
                v-model="title"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 align-center justify-space-between>
              <v-textarea
                outline
                label="Description"
                v-model="description"
              ></v-textarea>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                prepend-icon="business"
                label="Company"
                v-model="company"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-autocomplete
                prepend-icon="account_box"
                label="manager"
                :items="users"
                v-model="manager" 
                item-text="username"
                :item-value="item => item"
              >
                <template slot="item" slot-scope="data"  class="pa-0">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-tile-content v-text="data.item"></v-list-tile-content>
                  </template>
                  <template v-else>
                    <v-list-tile-avatar>
                      <img :src="getAvatar(data.item.id)">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title v-html="data.item.username"></v-list-tile-title>
                      <v-list-tile-sub-title class="caption grey--text" v-html="data.item.teams.join('- ')"></v-list-tile-sub-title>
                    </v-list-tile-content>
                  </template>
                </template>
              </v-autocomplete>
            </v-flex>
            <v-flex xs12>
              <v-autocomplete
                prepend-icon="group"
                label="team coworkers"
                :items="users"
                v-model="team"
                item-text="username"
                :item-value="item => item"
                multiple
              >
                <template slot="item" slot-scope="data"  class="pa-0">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-tile-content v-text="data.item"></v-list-tile-content>
                  </template>
                  <template v-else>
                    <v-list-tile-avatar>
                      <img :src="getAvatar(data.item.id)">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title v-html="data.item.username"></v-list-tile-title>
                      <v-list-tile-sub-title class="caption grey--text" v-html="data.item.teams.reduce((str, t) => `${str} #${t}`, '')"></v-list-tile-sub-title>
                    </v-list-tile-content>
                  </template>
                </template>
              </v-autocomplete>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="notes"
                label="Notes"
                v-model="notes"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn flat color="primary"><v-icon>info</v-icon> More</v-btn>
        <v-spacer></v-spacer>
        <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
        <v-btn round color="success" @click="dialog = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'dialogproject',
  props: {
    project: Object
  },
  data () {
    return {
      dialog: false,
      title: this.project ? this.project.title : '',
      description: this.project ? this.project.description : '',
      manager: this.project ? this.getUser(this.project.manager) : {},
      team: this.project ? this.project.coworkers.map(cid => this.$store.getters.user(cid)) : [],
      company: this.project ? this.project.company : '',
      notes: this.project ? this.project.notes : ''
    }
  },
  computed: {
    users () { return Object.values(this.$store.getters.users) },
    lightOut () { return this.$store.getters.lightOut }
  },
  watch: {
    dialog (val) {
      if (!val) this.close()
    }
  },
  methods: {
    close () {
      this.title = null
      this.description = null
      this.manager = null
      this.team = null
      this.compan = null
      this.notes = null
    }
  }
}
</script>

<style>

</style>
