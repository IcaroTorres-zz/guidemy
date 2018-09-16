<template>
  <v-flex :class="'px-0 mr-2 project-block-container ' + singleview ? 'singleview' : ''">
    <v-card light :class=" block.color + ' block-card'">
      <v-card-actions>
        <v-text-field
          class="pa-0"
          v-model="blocktext"
          hide-details
          solo-inverted
          :color="isEditing ? 'black' : block.color"
          :readonly="!isEditing"
          :label="isEditing ? 'Editing' : ''"
        >
          <v-slide-x-reverse-transition
            slot="append"
            mode="out-in"
          >
            <v-icon
              :color="isEditing ? 'white' : 'black'"
              :key="`icon-${isEditing}`"
              @click="updateBlockText"
              v-text="isEditing ? 'save' : 'edit'"/>
          </v-slide-x-reverse-transition>
        </v-text-field>
      </v-card-actions>
    </v-card>
    <v-card
      :class="`transparent project-block scroller scroller__${block.color} ${singleview ? 'singleview' : ''}`"
      flat
      style="position: relative;"
    >
      <taskcards :value="blocktasks" @input="update"/>
    </v-card>
    <v-toolbar :class="'block-footer ' +  block.color" dense>
      <v-tooltip top>
          <v-btn icon @click="updatePosition(0)"  slot="activator" >
            <v-icon>first_page</v-icon>
          </v-btn>
        <span>move to first</span>
      </v-tooltip>
      <v-tooltip top>
          <v-btn icon @click="updatePosition(1)"  slot="activator" >
            <v-icon>chevron_left</v-icon>
          </v-btn>
        <span>move backward</span>
      </v-tooltip>
      <v-spacer/>
      <dtask 
        :suggestedBlock="block" 
        :suggestedProject="projects[block.project]" 
        @task-created="update"
      >
        <v-btn 
          small 
          class="border-dashed-dark ma-0" slot="customactivator" 
          style="min-width: 100%"
        >
          <v-icon small>add</v-icon> add task
        </v-btn>
      </dtask>
      <v-spacer/>
      <v-tooltip top>
          <v-btn icon @click="updatePosition(2)"  slot="activator" >
            <v-icon>chevron_right</v-icon>
          </v-btn>
        <span>move forward</span>
      </v-tooltip>
      <v-tooltip top>
          <v-btn icon @click="updatePosition(-1)" slot="activator" >
            <v-icon >last_page</v-icon>
          </v-btn>
        <span>move to last</span>
      </v-tooltip>
      
    </v-toolbar>
  </v-flex>
</template>

<script lang="js">
import taskcards from '@/components/taskcards'
import dragarea from '@/components/dragarea'
import { dtask } from '@/components/dialog'
export default {
  name: 'taskblock',
  components: {taskcards, dtask, dragarea},
  props: {
    blockid: { required: true, type: [String, Number] },
    singleview: Boolean
  },
  data: () => ({
    blocktext: '',
    isEditing: false
  }),
  beforeMount () {
    this.blocktext = this.block.text
  },
  computed: {
    block: {
      get () {
        return this.blocks[this.blockid]
      },
      set (val) {
        if (val && val.text) {
          this.blocktext = val.text
        }
      }
    },
    blocktasks () {
      return this.block.tasks.map(tid => this.tasks[tid])
    }
  },
  methods: {
    update () {
      this.$emit('input', this.blocktasks)
    },
    updateBlockText () {
      if (this.isEditing) {
        console.log('trying to update text')
        this.$store.dispatch('updateBlockText', {
          ...this.block, text: this.blocktext
        })
          .then(response => {
            console.log(response)
            this.isEditing = !this.isEditing
          })
          .catch(error => this.setError(error))
      } else {
        this.isEditing = !this.isEditing
      }
    },
    updatePosition (int) {
      this.$store.dispatch('updateBlockPosition', {
        block: this.block, movetype: int
      })
    }
  }
}
</script>


