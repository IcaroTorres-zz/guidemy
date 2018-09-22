<template>
    <v-dialog v-model="dialog" width="600px">
      <template slot="activator">
        <slot name="customactivator"  @click.stop="dialog = !dialog" />
      </template>
      <v-form @submit.prevent="saveTask" ref="taskform">
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
                  required
                  :rules="[v => !!v || 'field required']"
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
                    required
                    :rules="[v => !!v || 'field required']"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="pickerdate"
                    :min="editing.created | YYYYmmdd"
                    reactive
                    locale="pt-BR"
                    @input="$refs.menudate.save(pickerdate)"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs6>
                <v-autocomplete
                  prepend-icon="account_circle"
                  dense
                  label="assigned to"
                  :items="assignable"
                  v-model="editing.assigned"
                  :error="!editing.assigned"
                  item-text="username"
                  :item-value="item => item.id"
                  required
                  :rules="[v => !!v || 'field required']"
                  :menu-props="{'closeOnClick':true, 'closeOnContentClick': true}"
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
                        <v-list-tile-sub-title class="caption grey--text" v-html="data.item.displayName || data.item.username"></v-list-tile-sub-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  dense
                  prepend-icon="view_carousel"
                  label="block"
                  v-model="taskblock.text"
                  required
                  readonly
                >
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
                </v-text-field>
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
            <v-btn round color="success" type="submit">save</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
</template>

<script>
import {Task} from '@/models'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'dialogtask',
  props: {
    blockid: { type: [String, Number], required: true },
    taskid: [String, Number]
  },
  data (vm) {
    return {
      datemenu: false,
      dialog: false,
      editing: new Task({
        creator: this.loggedUser,
        block: this.blockid
      }),
      pickerdate: new Date().toISOString().split('T')[0]
    }
  },
  mounted () {
    if (this.taskid) {
      this.editing = new Task({...this.tasks[this.taskid]})
      this.pickerdate = new Date(this.editing.end).toISOString().split('T')[0]
    }
  },
  computed: {
    ...mapState(['tasks', 'blocks', 'users', 'projects']),
    ...mapGetters(['loggedUserObj', 'useravatar']),
    computedTask () {
      return this.tasks[this.taskid]
    },
    taskblock () {
      return this.blocks[this.blockid]
    },
    assignable () {
      return this.projects[this.taskblock.project].team.map(uid => this.users[uid]) || []
    },
    computedDate () {
      return this.stringToDateddmmYYYY(this.editing.end)
    }
  },
  methods: {
    saveTask () {
      if (this.$refs.taskform.validate()) {
        this.$store.dispatch('saveTask', this.editing)
          .then(() => {
            this.$emit('task-saved')
            if (!this.taskid) {
              this.editing = new Task({
                creator: this.loggedUserObj.id,
                block: this.blockid
              })
            }
            this.dialog = false
          })
      }
    }
  }
}
</script>
