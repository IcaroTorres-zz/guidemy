<template>
  <v-dialog v-model="dialog" width="400px" >
    <template slot="activator" @click.stop="dialog = !dialog" >
      <slot name="customactivator" />
    </template>
    <v-card >
      <v-card-title :class="{'py-4 title': true, 'warning': computedTask.status, 'success': !computedTask.status}">
        {{cardText}}
      </v-card-title>
      <v-card-text>
        {{computedTask.title}}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn flat small color="primary" @click="dialog = false">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn round small color="success" @click="onToggleTask">confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'dialogdone',
  props: {
    taskid: { type: [String, Number], required: true }
  },
  data: () => ({
    dialog: false
  }),
  computed: {
    computedTask () { return this.tasks[this.taskid] },
    cardText () { return this.computedTask.status ? 'Re-open this task?' : 'Corfirme as done?' }
  },
  methods: {
    onToggleTask () {
      this.toggleTask(this.taskid)
      this.$emit('task-finished', this.computedTask)
      this.dialog = false
    }
  }
}
</script>
