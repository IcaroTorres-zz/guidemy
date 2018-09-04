<template>
  <v-dialog v-model="newProjectDialog" width="800px">
    <v-btn
      slot="activator"
      fab
      bottom
      right
      color="success"
      dark
      fixed
      @click.stop="newProjectDialog = true"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-card>
      <v-card-title class="primary py-4 title" >
        Create Project
      </v-card-title>
      <v-container grid-list-sm class="pa-4">
        <v-layout row wrap>
          <v-flex xs6>
            <v-text-field
              prepend-icon="spellcheck"
              placeholder="Poject Name"
            ></v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              prepend-icon="business"
              placeholder="Company"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-textarea
              outline
              placeholder="Description"
              prepend-icon="description"
            ></v-textarea>
          </v-flex>
          <v-flex xs4>
            <v-autocomplete
              :items="usernames"
              placeholder="Manager"
              prepend-icon="star"
              :value="user.username"
              class="py-2"
            >
              <template slot="no-data">
                <v-list-tile>
                  <v-list-tile-title>
                    Search for project
                    <strong>Manager</strong>
                  </v-list-tile-title>
                </v-list-tile>
              </template>
            </v-autocomplete>
          </v-flex>
          <v-flex xs8>
            <v-autocomplete
              :items="users"
              chips
              deletable-chips
              placeholder="Co-Workers"
              item-text="username"
              item-value="id"
              prepend-icon="group"
              multiple
            >
              <template
                slot="selection"
                slot-scope="data"
              >
                <v-chip
                  :selected="data.selected"
                  close
                  class="chip--select-multi"
                  @input="data.parent.selectItem(data.item)"
                >
                  <v-avatar>
                    <img :src="data.item.profilePicture">
                  </v-avatar>
                  {{ data.item.username }}
                </v-chip>
              </template>
              <template
                slot="item"
                slot-scope="data"
              >
                <template v-if="typeof data.item !== 'object'">
                  <v-list-tile-content v-text="data.item"></v-list-tile-content>
                </template>
                <template v-else>
                  <v-list-tile-avatar>
                    <img :src="data.item.profilePicture">
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title v-html="data.item.username"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="data.item.teams[0]"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </template>
              </template>
            </v-autocomplete>
          </v-flex>
          <v-flex xs4>
            <v-menu
              ref="menu2"
              :close-on-content-click="false"
              v-model="menu2"
              :return-value.sync="date"
              lazy
              transition="scale-transition"
              full-width
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="date"
                placeholder="Estimated end date?"
                prepend-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker reactive v-model="date" @input="$refs.menu2.save(date)"></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              prepend-icon="notes"
              placeholder="Notes"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
      <v-card-actions>
        <v-btn flat color="info">More</v-btn>
        <v-spacer></v-spacer>
        <v-btn flat color="warning" @click.stop="newProjectDialog = false">Cancel</v-btn>
        <v-btn round color="success" @click.stop="newProjectDialog = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    dialog: Boolean
  },
  data () {
    return {
      date: null,
      menu2: null
    }
  },
  computed: {
    newProjectDialog: {
      get () {
        console.log(this.dialog)
        return this.dialog
      },
      set (value) {
        if (!value) {
          this.$emit('closenewproject')
        }
      }
    },
    user () {
      return this.$store.getters.user
    },
    notificationCount () {
      return this.$store.getters.userNotifications(this.user.id).filter(n => n.status === 0).length
    },
    users () {
      return this.$store.getters.users
    },
    usernames () {
      return this.users.map(u => u.username)
    }
  }
}
</script>