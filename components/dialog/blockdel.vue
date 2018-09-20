<template>
  <v-dialog v-model="dialog" width="400px" >
    <template slot="activator">
      <slot name="customactivator"  @click.stop="dialog = !dialog" />
    </template>
    <v-card>
      <v-card-title class="py-4 title error">
        Remove empty block with text '{{computedBlock.text}}'?
      </v-card-title>       
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn flat small color="primary" @click="dialog = false">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn round small color="error" @click.stop="onBlockDeleted">confirm!</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'dialogblockdel',
  props: {
    blockid: { type: [String, Number], required: true }
  },
  data: () => ({
    dialog: false
  }),
  computed: {
    ...mapState(['blocks']),
    computedBlock () { return this.blocks[this.blockid] }
  },
  methods: {
    onBlockDeleted () {
      this.$store.dispatch('deleteBlock', this.blockid)
        .then(response => {
          this.$emit('Block-deleted')
          this.dialog = false
        })
    }
  }
}
</script>