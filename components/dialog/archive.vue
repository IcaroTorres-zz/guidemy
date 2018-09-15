<template>
  <v-dialog v-model="dialog" width="400px">
    <template slot="activator" @click.stop="dialog = !dialog" >
      <slot name="customactivator" />
    </template>
    <v-card >
      <v-card-title :class="'py-4 title ' + project.status === 0 ? 'warning' : 'info'">
        {{project.status === 1 ? 'Unarchive' : 'Archive'}} project and {{project.status === 1 ? 're-open' : 'stop'}} activities?
      </v-card-title>
      <v-card-text>
        {{project.title}}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn flat small color="primary" @click="dialog = false">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn round small color="success" @click="onToggleArchiving">confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'dialogarchive',
  props: {
    project: { type: Object, required: true }
  },
  data: () => ({
    dialog: false
  }),
  methods: {
    onToggleArchiving () {
      this.toggleArchiving(this.project.id)
      this.dialog = false
    }
  }
}
</script>
