<template>
  <div>
    <v-layout row justify-center align-center>
      <v-flex xs12 class="pa-0">
        <v-card class="transparent" flat>
          <projectToolbar :projectid="project.id"/>
          <v-card-text>
            <v-layout
              row wrap
              justify-space-between
            >
              <v-flex xs12 sm12 md8>
                <nuxt-link :to="{ name: 'project-id', params: {id: project.id} }" class="display-1 info--text">{{project.title}}</nuxt-link>
                <div>Manager: 
                  <a class="info--text">@{{username(project.manager)}}</a>
                </div>
                <p class="pb-0 mr-2">Team:
                  <nuxt-link 
                    :to="{ name: 'user', params: {user: username(coworker)}}" 
                    class="pr-2" 
                    v-for="coworker in project.team" 
                    :key="coworker">@{{username(coworker)}}
                  </nuxt-link>
                </p>
                <div>Created: 
                  <span class="text-xs-justify primary--text">{{project.created | locale}}</span>
                </div>
                <v-divider class="my-2"></v-divider>
                <div class="layout row ml-0">
                  Description:
                  <v-spacer></v-spacer>
                  <v-tooltip left v-if="project.status === 0">
                    <v-btn
                      small 
                      flat 
                      class="pa-0 mr-1 ml-0 my-0" 
                      @click.stop="expand = !expand" 
                      slot="activator">
                      {{expand ? 'Hide blocks' : 'Show blocks'}}
                      <v-icon>{{expand ? 'unfold_less' : 'unfold_more'}}</v-icon>
                    </v-btn>
                    <span>{{expand ? 'Collapse project' : 'Expand project'}}</span>
                  </v-tooltip>
                </div>
                <p class="caption text-xs-justify primary--text mr-2">{{project.description}}</p>
              </v-flex>
              <!-- <v-divider vertical class="hidden-sm-and-down"></v-divider> -->
              <v-flex md4 class="hidden-sm-and-down" style="border-left: .75px solid #555">
                <projectPieChart :projectid="project.id"/>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>

    </v-layout>
    <template v-if="expand && project.blocks.length === 0 && project.status === 0">
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
      row
      align-content-start
      style="position: relative;"
    >
      <dblock
        :project="project"
        v-if="expand && project.blocks.length > 0"
      >
        <div
          class="new-block__button border-dashed-grey"
          slot="customactivator"
        >
          <v-icon small>add</v-icon>ADD BLOCK
        </div>
      </dblock>
      <v-layout
        row
        align-content-start
        class="scroller-horiz"
        v-if="expand"
        style="margin-right: 0; margin-left: 44px;"
      >            
        <taskblock
          v-for="blockid in  project.blocks" :key="blockid"
          :blockid="blockid"/>
      </v-layout>
    </v-layout>
  </div>
</template>

<script>
import { dblock } from '@/components/dialog'
import { projectPieChart, projectToolbar } from '@/components/project'
import taskblock from '@/components/taskblock'
import { Block } from '@/models'
import { defaultBlockSetup } from '@/helpers'
import { mapState, mapGetters } from 'vuex'
export default {
  validate ({ params, store }) {
    return !!store.state.projects[params.id] // Must be a valid project id
  },
  components: {
    dblock,
    projectPieChart,
    projectToolbar,
    taskblock
  },
  data: () => ({
    expand: true,
    defaultBlockSetup: defaultBlockSetup
  }),
  computed: {
    ...mapState(['projects']),
    ...mapGetters(['username']),
    project () { return this.projects[this.$route.params.id] }
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

<style>
</style>
