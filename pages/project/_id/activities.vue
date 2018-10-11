<template>
  <v-card :img="projectBg">
    <v-card-text>

      <template v-if="project.blocks.length === 0 && project.status === 0">
        <dblock
          :project="project"
          style="margin-left: -12px"
        >
          <v-btn
            class="border-dashed-grey ma-0"
            slot="customactivator"
          >
            <v-icon small>add</v-icon>add block
          </v-btn>
        </dblock>
        <v-btn
          color="accent"
          style="font-size:10px"
          small
          flat
          @click="defaultBlocks(project)"
        >
          default block setup ?
        </v-btn>
      </template>
      <!-- future feature -->
      <!-- <v-layout
        row v-if="expand && project.blocks.length > 6"
        class="mt-4"
      >
        <v-btn
          icon
          small
          v-if="project.blocks.length > 0"
        >
          <v-icon>view_day</v-icon>
        </v-btn>
        <v-btn
          class="border-dashed-grey ma-0"
          block
        >
          <v-icon small>add</v-icon>split to new roll
        </v-btn>
      </v-layout> -->
      <v-layout
        v-if="project.status === 0"
        class="rel"
        align-content-start>
        <dblock
          :project="project"
          v-if="project.blocks.length > 0">
          <div
            class="new-block__button border-dashed-grey"
            slot="customactivator">
            <v-icon small>add</v-icon>ADD BLOCK
          </div>
        </dblock>
        <v-layout
          row
          align-content-start
          class="scroller-horiz"
          style="margin-right: 0; margin-left: 44px;">            
          <taskblock
            v-for="blockid in  project.blocks" :key="blockid"
            :blockid="blockid"/>
        </v-layout>
      </v-layout>
            
    </v-card-text>
  </v-card>
</template>

<script>
import { dblock } from '@/components/dialog'
import { Block } from '@/models'
import taskblock from '@/components/taskblock'
import { defaultBlockSetup } from '@/helpers'
import { mapState, mapGetters } from 'vuex'
export default {
  validate ({ params, store }) {
    return !!store.state.projects[params.id] // Must be a valid project id
  },
  components: {
    dblock,
    taskblock
  },
  data: () => ({
    defaultBlockSetup: defaultBlockSetup
  }),
  computed: {
    ...mapState(['projects', 'lightOut']),
    ...mapGetters(['username']),
    project () { return this.projects[this.$route.params.id] },
    projectBg () {
      return this.lightOut
        ? 'http://coffecase.win/77/abc1f/material-design-wallpaper-red-034-by-charlie-henson_material-design-wallpaper-red-by-charlie-henson-devia-on-material-wallpapers-collection-for-free-downl.png'
        : 'https://images.unsplash.com/photo-1510070112810-d4e9a46d9e91?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0aa88cd9eb66029e5134a759d301d549&auto=format&fit=crop&w=1350&q=80'
    }
  },
  methods: {
    defaultBlocks (p) {
      this.defaultBlockSetup.forEach(b => {
        let block = new Block({...b, project: p.id})
        this.$store.dispatch('saveBlock', block)
      })
    }
  }
}
</script>