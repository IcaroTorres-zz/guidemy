<template>
  <v-flex :class="'px-0 mr-2 project-block-container ' + singleview ? 'singleview' : ''">
    <v-toolbar light :class=" block.color + ' block-toolbar'" dense>
      <v-toolbar-title v-html=" block.text"/>
      <v-spacer/>
      <v-btn small icon light>
        <v-icon>more_horiz</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card :class="'transparent project-block scroller scroller__' +  block.color + singleview ? ' singleview' : ''" flat style="position: relative;">
      
      <v-expansion-panel expand>
        <taskcard :index="i"
                  v-for="(taskid, i) in block.tasks" :key="taskid"
                  :taskid.sync="taskid"
                  @input="update"/>
      </v-expansion-panel>

    </v-card>
    <v-toolbar :class="'block-footer ' +  block.color" dense>
      <v-icon style="width: 12px;">drag_indicator</v-icon>
      <v-icon style="width: 12px;">drag_indicator</v-icon>
      <v-icon style="width: 12px;">drag_indicator</v-icon>
      <v-icon style="width: 12px;">drag_indicator</v-icon>
      <v-icon style="width: 12px;">drag_indicator</v-icon>
      <v-icon style="width: 12px;">drag_indicator</v-icon>
      <v-spacer/>
      <dtask :suggestedBlock="block" :suggestedProject="projects[block.project]" @task-created="update">
        <v-btn small class="border-dashed-dark ma-0" slot="customactivator" style="min-width: 100%">
          <v-icon small>add</v-icon> add task
        </v-btn>
      </dtask>
    </v-toolbar>
  </v-flex>
</template>

<script lang="js">
import taskcard from '@/components/taskcard'
import { dtask } from '@/components/dialog'
export default {
  name: 'taskblock',
  components: {taskcard, dtask},
  props: {
    blockid: { required: true, type: [String, Number] },
    singleview: Boolean
  },
  computed: {
    block () {
      return this.blocks[this.blockid]
    }
  },
  methods: {
    update () {
      this.$emit('input', this.block)
    }
  }
}
</script>


