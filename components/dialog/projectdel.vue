<template >
  <v-dialog v-model="dialog" width="400px">
    <template slot="activator">
      <slot name="customactivator"  @click.stop="dialog = !dialog" />
    </template>
    <v-card>
      <v-card-title class="py-4 title error">
        Confirm Project Exclusion?
      </v-card-title>
      <v-card-text>
        {{project.title}}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn flat small color="primary" @click="dialog = false">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn round small color="error" @click="dialog = false">confirm!</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'dialogtaskdel',
  props: {
    project: Object
  },
  data: () => ({
    dialog: false
  }),
  computed: {
  }
}
</script>
