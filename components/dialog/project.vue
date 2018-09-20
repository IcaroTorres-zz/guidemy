<template>
  <v-dialog v-model="dialog" width="800px" scrollable >
    <template slot="activator">
      <slot name="customactivator"  @click.stop="dialog = !dialog" >
          <!-- <v-btn fab bottom right color="primary" slot="customactivator" dark fixed @click.stop="dialog = !dialog"><v-icon>add</v-icon></v-btn> -->
      </slot>
    </template>
    <v-form @submit.prevent="saveProject" ref="projectform">
      <v-card >
        <v-card-title :class="{ 'py-4': true, 'title': true, 'primary': !project, 'warning grey--text text--darken-3': project }">
          {{project ? 'Edit' : 'Create'}} Project
        </v-card-title>
        <v-card-text class="pa-0" height="800">
          <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>
              <v-flex xs12 sm8>
                <v-text-field
                  label="Project Name"
                  required
                  :rules="[v => !!v || 'field required']"
                  v-model="editing.title"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm4>
                <v-autocomplete
                  prepend-icon="account_box"
                  label="manager"
                  :items="Object.values(users)"
                  v-model="editing.manager" 
                  clearable
                  dense
                  required
                  :menu-props="{'closeOnClick':true, 'closeOnContentClick': true}"
                  :rules="[v => !!v || 'field required']"
                  item-text="username"
                  item-value="id"
                >
                  <!-- :item-value="item => item" -->
                  <template slot="item" slot-scope="data"  class="pa-0">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-avatar>
                        <img :src="useravatar(data.item.id)">
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="data.item.username"></v-list-tile-title>
                        <v-list-tile-sub-title class="caption grey--text" v-html="data.item.displayName"></v-list-tile-sub-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>
              <v-flex xs12>
                <v-autocomplete
                  prepend-icon="group"
                  label="team coworkers"
                  :items="Object.values(users)"
                  v-model="editing.team"
                  clearable
                  required
                  :rules="[
                    v => !!v || 'field required',
                    v => editing.team.length > 0 || 'at least one member'
                  ]"
                  dense
                  item-text="username"
                  multiple
                  :item-value="item => item.id"
                >
                  <!-- :item-value="item => item" -->
                  <template slot="item" slot-scope="data"  class="pa-0">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-avatar>
                        <img :src="useravatar(data.item.id)">
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="data.item.username"></v-list-tile-title>
                        <v-list-tile-sub-title class="caption grey--text" v-html="data.item.displayName"></v-list-tile-sub-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>
              <v-flex xs12 align-center justify-space-between>
                <v-textarea
                  outline
                  label="Description"
                  row-height="16"
                  auto-grow
                  v-model="editing.description"
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click.stop="dialog = false">Cancel</v-btn>
          <v-btn round color="success" type="submit">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import {Project} from '@/models'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'dialogproject',
  props: {
    project: Object
  },
  data () {
    return {
      dialog: false,
      editing: new Project()
    }
  },
  created () {
    this.editing = new Project({...this.project, creator: this.loggedUser})
  },
  computed: {
    ...mapState(['loggedUser', 'users']),
    ...mapGetters(['useravatar'])
  },
  methods: {
    saveProject () {
      if (this.$refs.projectform.validate()) {
        this.$store.dispatch('saveProject', this.editing)
          .then(() => {
            this.$emit('project-created')
            this.editing = new Project({creator: this.loggedUser})
            this.dialog = false
          })
      }
    }
  }
}
</script>

<style>

</style>
