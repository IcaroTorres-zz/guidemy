<template>
      <v-dialog v-model="dialog" width="800px">
      <template slot="activator">
        <slot name="customactivator"  @click.stop="dialog = !dialog" >
           <!-- <v-btn fab bottom right color="primary" slot="customactivator" dark fixed @click.stop="dialog = !dialog"><v-icon>add</v-icon></v-btn> -->
        </slot>
      </template>
      <v-card>
        <v-card-title class="py-4 title primary">
          {{edition ? 'Edit' : 'Create'}} Project
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field
                placeholder="Project Name"
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
                placeholder="Company"
                v-model="company"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                prepend-icon="account_box"
                placeholder="Manager"
                v-model="manager"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-autocomplete
                prepend-icon="group"
                placeholder="team coworkers"
                :items="users"
                v-model="team"
                multiple
              ></v-autocomplete>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="notes"
                placeholder="Notes"
                v-model="notes"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
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
    edition: Boolean,
    project: Object
  },
  data () {
    return {
      dialog: false,
      title: this.edition ? this.project.title : '',
      description: this.edition ? this.project.description : '',
      manager: this.edition ? this.getUsername(this.project.manager) : '',
      team: this.edition ? this.project.coworkers.map(cid => this.$store.getters.user(cid).username) : [],
      company: this.edition ? this.project.company : '',
      notes: this.edition ? this.project.notes : ''
    }
  },
  computed: {
    users () { return this.$store.getters.usernames }
  },
  methods: {
    getUsername (uid) {
      return this.edition ? this.$store.getters.user(uid).username : ''
    }
  }
}
</script>

<style>

</style>
