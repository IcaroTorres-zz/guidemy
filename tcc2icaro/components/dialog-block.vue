<template>
      <v-dialog v-model="dialog" width="600px">
      <template slot="activator">
        <slot name="customactivator"  @click.stop="dialog = !dialog" />
      </template>
      <v-card>
        <v-card-title :class="{'py-4 title': true, 'primary': !!project, 'warning': !project }">
          {{dialogtitle}}
        </v-card-title>
        <v-container fluid grid-list-md>
          <v-layout row wrap align-content-start justify-center>
            <v-flex  xs12 md7>
              <v-text-field
                class="mx-2"
                label="Block text"
                v-model="text"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md5>
              <v-autocomplete
                class="mx-2"
                append-icon="brush"
                label="color"
                v-model="color"
                :items="colors"
              >
                <template slot="item" slot-scope="data" >
                  <v-list-tile-content :class="data.item">
                    <v-list-tile-title></v-list-tile-title>
                  </v-list-tile-content>
                </template>
              </v-autocomplete>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions class="px-4">
          <v-spacer></v-spacer>
          <v-btn flat small color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn small color="success" @click="dialog = false">create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import {colors} from '../helpers'
export default {
  name: 'dialogblock',
  props: {
    project: Object,
    block: Object
  },
  data () {
    return {
      dialog: false,
      text: this.block ? this.block.text : '',
      tasks: this.block ? this.block.tasks : [],
      color: this.block ? this.block.color : 'primary'
    }
  },
  watch: {
    dialog (val) {
      if (!val) this.close()
    }
  },
  methods: {
    close () {
      this.text = ''
      this.tasks = []
      this.color = ''
    }
  },
  computed: {
    dialogtitle () { return this.block ? `Editing ${this.block.text}` : 'New Block' },
    colors () { return Object.keys(colors) }
  }
}
</script>
