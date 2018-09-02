<template>
    <v-dialog v-model="dialog" width="600px" :dark="lightOut">
      <template slot="activator">
        <slot name="customactivator"  @click.stop="dialog = !dialog" />
      </template>
      <v-card>
        <v-card-title class="py-4 title primary">
          Task
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs8>
              <v-text-field
                label="Task title"
                v-model="title"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-menu
                ref="menudate"
                :close-on-content-click="false"
                v-model="datemenu"
                :return-value.sync="end"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="computedDate"
                  label="due date"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker v-model="end" @input="$refs.menudate.save(end)"></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12>
            <v-autocomplete
              prepend-icon="view_quilt"
              label="project"
              v-model="project"
              :items="projects"
              item-text="title"
              :item-value="item => item"
            >
              <!-- item-value="id" -->
              <template slot="item" slot-scope="data" >
                <template v-if="typeof data.item !== 'object'">
                  <v-list-tile-content v-text="data.item"></v-list-tile-content>
                </template>
                <template v-else>
                  <v-list-tile-content>
                    <v-list-tile-title v-html="data.item.title"></v-list-tile-title>
                  </v-list-tile-content>
                </template>
              </template>
            </v-autocomplete>

            </v-flex>
            <v-flex xs6>
              <v-autocomplete
                prepend-icon="view_carousel"
                label="block"
                :items="blocks"
                v-model="block"  
                item-text="text"
                :item-value="item => item"
              >
                <!-- item-value="id" -->
                <template slot="item" slot-scope="data" >
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-tile-content v-text="data.item"></v-list-tile-content>
                  </template>
                  <template v-else>
                    <v-list-tile-content>
                      <v-list-tile-title v-html="data.item.text"></v-list-tile-title>
                    </v-list-tile-content>
                  </template>
                </template>
              </v-autocomplete>
            </v-flex>
            <v-flex xs6>
              <v-autocomplete
                prepend-icon="account_circle"
                label="assigned to"
                :items="assignable"
                v-model="assigned" 
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
            <v-flex xs12 align-center justify-space-between>
              <v-textarea
                outline
                label="Description"
                v-model="description"
              ></v-textarea>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn round color="success" @click="addTask">create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  name: 'dialogtask',
  props: {
    suggestedProject: Object,
    suggestedBlock: Object
  },
  data () {
    return {
      datemenu: false,
      dialog: false,
      title: '',
      description: '',
      end: null,
      assigned: this.$store.getters.loggedUserObject,
      project: this.suggestedProject || {},
      block: this.suggestedBlock || {}
    }
  },
  computed: {
    users () { return this.project.id ? this.project.coworkers.map(w => this.$store.getters.user(w)) : [] },
    projects () { return this.$store.getters.userProjects(this.$store.getters.loggedUser) },
    blocks () { return this.project.id ? this.$store.getters.projectBlocks(this.project.id) : [] },
    assignable () {
      return this.users.filter(u => u.id !== this.project.manager || u.id === this.$store.getters.loggedUser)
    },
    computedDate () { return this.stringToDateddmmYYYY(this.end) },
    lightOut () { return this.$store.getters.lightOut }
  },
  watch: {
    dialog (val) {
      // if (!val) this.close()
    }
  },
  methods: {
    close () {
      this.datemenu = null
      this.title = ''
      this.description = ''
      this.end = null
      this.block = {}
    },
    addTask () {
      const dataSent = {
        id: 't' + Date.now().toString(),
        project: this.project.id,
        creator: this.$store.getters.loggedUser,
        block: this.block.id,
        assigned: this.assigned.id,
        title: this.title,
        description: this.description,
        start: new Date(),
        end: new Date(this.end),
        finishedAt: null,
        comments: [],
        status: 0
      }
      this.$store.dispatch('addTask', dataSent)
        .then(() => {
          console.log(`success applying data: ${dataSent}`)
          this.$emit('task-created')
          this.dialog = false
        })
    }
  }
}
</script>
