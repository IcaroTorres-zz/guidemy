<template>
  <v-dialog v-model="dialog" width="400px" >
    <template slot="activator" @click.stop="dialog = !dialog" >
      <slot name="customactivator" />
    </template>
    <v-card :dark="lightOut">
      <v-card-title class="py-4 title success">
        Confirm task as completed?
      </v-card-title>
      <v-card-text>
        {{task.title}}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn flat small color="primary" @click="dialog = false">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn round small color="success" @click.stop="onTaskFinished">confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'dialogdone',
  props: {
    task: { type: Object, required: true }
  },
  data: () => ({
    dialog: false
  }),
  methods: {
    onTaskFinished () {
      this.finishTask(this.task.id)
      this.dialog = false
      setTimeout(() => this.$emit('task-finished'), 0)
    }
  }
}
</script>
