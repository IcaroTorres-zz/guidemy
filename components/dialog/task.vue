<template>
    <v-dialog v-model="dialog" width="600px">
      <template slot="activator">
        <slot name="customactivator"  @click.stop="dialog = !dialog" />
      </template>
      <v-card >
        <v-card-title class="py-4 title primary">
          Task
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs8>
              <v-text-field
                label="Task title"
                v-model="editing.title"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-menu
                ref="menudate"
                :close-on-content-click="false"
                v-model="datemenu"
                :return-value.sync="editing.end"
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
                <v-date-picker v-model="editing.end"
                  :min="editing.created | YYYYmmdd"
                  reactive
                  locale="pt-BR"
                  @input="$refs.menudate.save(editing.end)"
                ></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12>
            <v-autocomplete
              dense
              prepend-icon="view_quilt"
              label="project"
              v-model="editing.project"
              :items="myProjects"
              item-text="title"
              :item-value="item => item.id"
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
                dense
                prepend-icon="view_carousel"
                label="block"
                :items="blocks"
                v-model="editing.block"  
                item-text="text"
                :item-value="item => item.id"
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
                dense
                label="assigned to"
                :items="assignable"
                v-model="editing.assigned"
                item-text="username"
                :item-value="item => item.id"
              >
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
                v-model="editing.description"
              ></v-textarea>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click.stop="dialog = false">Cancel</v-btn>
          <v-btn round color="success" @click.stop="saveTask">create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import {Task} from '../../models'
export default {
  name: 'dialogtask',
  props: {
    suggestedProject: Object,
    suggestedBlock: Object,
    taskid: [String, Number]
  },
  data () {
    return {
      datemenu: false,
      dialog: false,
      editing: new Task()
    }
  },
  created () {
    this.editing = new Task({...this.task(this.taskid),
      creator: this.loggedUser,
      project: (this.suggestedProject || {}).id,
      block: (this.suggestedBlock || {}).id
    })
  },
  computed: {
    team () {
      return this.editing.project ? this.projects[this.editing.project].team.map(w => this.users[w]) : []
    },
    blocks () {
      return this.editing.project ? this.$store.getters.projectBlocks(this.editing.project) : []
    },
    assignable () {
      return this.editing.project
        ? this.team.filter(u => u.id !== this.projects[this.editing.project].manager || u.id === this.loggedUser)
        : [this.loggedUserObj]
    },
    computedDate () { return this.stringToDateddmmYYYY(this.editing.end) }
  },
  methods: {
    saveTask () {
      this.$store.dispatch('saveTask', this.editing)
        .then(() => {
          this.$emit('task-created')
          this.editing = new Task({
            creator: this.loggedUserObj.id,
            project: (this.suggestedProject || {}).id,
            block: (this.suggestedBlock || {}).id
          })
          this.dialog = false
        })
    }
  }
}
</script>
