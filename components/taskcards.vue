<template>

  <v-expansion-panel expand>
    <v-expansion-panel-content
      v-for="(task, index) in value"
      :key="task.id"
      hide-actions :class="{'task-delayed': isDelayed(task), 'mt-1': index !== 0}">
      <div slot="header" row :class="{'mt-1': index !== 0, 'pa-0': true }">
          <v-progress-linear
            style="left: 0; right:0; top: 0;position: absolute; transform: translateY(-14px)"
            background-color="transparent"
            :color="ratecolor(task)"
            height="4"
            :value="rating(task) * (100 / slidemax(task))"
          ></v-progress-linear>

        <!-- <v-flex xs12 class="pa-0"> -->
          <!-- <v-list dense class="pa-0 no-padding"> -->
            <ul class="pa-0">
            <v-list-tile tag="li" class="pa-0">
              <v-list-tile-action class="task-action-block-left">
                <v-menu 
                  top 
                  left 
                  offset-y
                  v-model="visionMap[task.id]">
                  <v-icon
                    slot="activator"        
                    @click.stop="openTaskMenu(task.id)"
                  >more_vert
                  </v-icon>
                  <v-list dense subheader>
                    <v-subheader>Move to block</v-subheader>
                    <v-list-tile v-for="block in taskMenuOptions(task)" :key="block.id" @click="moveTask({tid: task.id, bid: block.id})">
                      <!-- <v-list-tile-title >n {{task.block}}</v-list-tile-title> -->
                      <v-list-tile-title :class="`${block.color}--text`">{{ block.text }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title class="body-1">{{task.title}} </v-list-tile-title>
                <v-list-tile-sub-title 
                  :class="ratecolor(task) +'--text'"
                  style="font-size: 11px;"
                  v-if="task.status === 1">
                  done on: {{task.finished | locale}}
                </v-list-tile-sub-title >
              </v-list-tile-content>

              <v-list-tile-action class="task-action-block-right">
                <v-tooltip top>
                  <dtaskdone :taskid="task.id" @task-finished="update($event)" slot="activator">
                    <v-icon small :color="task.status === 1 ? 'warning' : 'success'" slot="customactivator">
                      {{task.status === 1 ? 'settings_backup_restore' : 'check_circle'}}
                    </v-icon>
                  </dtaskdone>
                  <span>{{task.status === 1 ? 're-open' : 'finish'}}</span>
                </v-tooltip>
                <dtaskdel :taskid="task.id" @task-deleted="update($event)">
                  <v-icon small color="error" v-if="canRemove(task)" slot="customactivator">delete</v-icon>
                </dtaskdel>
              </v-list-tile-action>
            </v-list-tile>
          </ul>
          <!-- </v-list> -->
          <!-- <v-layout row wrap align-center justify-center>
            <v-menu 
              top 
              left 
              offset-y
              v-model="visionMap[task.id]">
              <v-icon
                slot="activator"        
                @click.stop="openTaskMenu(task.id)"
              >more_vert
              </v-icon>
              <v-list dense>
                <v-list-tile v-for="block in taskMenuOptions(task)" :key="block.id" @click="moveTask({tid: task.id, bid: block.id})">
                  <v-list-tile-title :class="`${block.color}--text`">{{ block.text }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
            <v-flex class="pa-0 task-title">
              <div class="body-1">{{task.title}} aoisdj9qiwndpuiqnfpiu qnfipu nq fipuqnw fpqi unfp qinf pqwfn qpfinq wpfjqnp</div>
              <div v-if="task.status === 1" :class="ratecolor(task) +'--text'" style="font-size: 11px; line-height: 8px;">done on: {{task.finished | locale}}</div>
            </v-flex>
            <v-flex xs1 class="py-0 pl-0 pr-1 text-xs-right">
              <v-layout column>
                <v-tooltip top>
                  <dtaskdone :taskid="task.id" @task-finished="update($event)" slot="activator">
                    <v-icon small :color="task.status === 1 ? 'warning' : 'success'" slot="customactivator">
                      {{task.status === 1 ? 'settings_backup_restore' : 'check_circle'}}
                    </v-icon>
                  </dtaskdone>
                  <span>{{task.status === 1 ? 're-open' : 'finish'}}</span>
                </v-tooltip>
                <dtaskdel :taskid="task.id" @task-deleted="update($event)">
                  <v-icon small color="error" v-if="canRemove(task)" slot="customactivator">delete</v-icon>
                </dtaskdel>
              </v-layout>
            </v-flex>
          </v-layout> -->
        <!-- </v-flex> -->

      </div>
      <v-card tile flat :class="{'secondary darken-1':lightOut, 'grey lighten-3': !lightOut}">
        <v-card-text class="px-2 pt-2 pb-0">
          <div class="body-1 grey--text">
            {{task.description}}
            <v-divider></v-divider>
          </div>
          <div class="layout row wrap align-center justify-content-end px-2">
            <v-flex xs12>
              <v-layout class="pa-1">
                <span class="info--text pr-2">starts</span> {{task.created | locale }} <v-spacer/> {{task.end | locale}} <span class="error--text pl-2">ends</span>
              </v-layout>
            </v-flex>
            <v-flex xs12 class="py-0 px-1">
              <v-divider/>
            </v-flex>
            <v-flex xs12>
              <div class="text-xs-center">
              <div class="grey--text text-lighten--2">spent credits</div>
              <v-rating
                dense
                :value="rating(task)"
                :length="slidemax(task)"
                :background-color="lightOut ? 'secondary' : 'grey ligten-3'"
                empty-icon="star"
                full-icon="star"
                readonly
                small
                :color="ratecolor(task)"
              ></v-rating>
              </div>
            </v-flex>
            <v-flex xs12 class="py-0 px-1" v-if="overdue(task)">
              <v-divider/>
            </v-flex>
            <v-flex xs12 v-if="overdue(task)">
              <div class="text-xs-center">
                <v-rating
                  dense
                  :value="overdue(task)"
                  :length="overdue(task)"
                  full-icon="star_border"
                  half-increments
                  readonly
                  small
                  color="red"
                ></v-rating>
                <div class="grey--text text-lighten--2">lost credits</div>
              </div>
            </v-flex>
          </div>
          <v-divider></v-divider>
        </v-card-text>
        <v-card-actions>
          <v-avatar size="46px" class="mr-1">
            <img :src="useravatar(task.assigned)">
          </v-avatar>
          <div>
            <div class="body-1">{{username(task.assigned)}}</div>
            <div class="caption grey--text">#{{users[task.assigned].displayName}}</div>
          </div>
          <v-spacer/>
          <div class="d--wrapper">
            <span class="caption grey--text mr-2">{{task.comments.length}}</span>
            <dtaskcomments :taskid="task.id">
              <v-icon slot="customactivator" color="grey lighten-2" class="mr-1">question_answer</v-icon>
            </dtaskcomments>
          </div>
        </v-card-actions>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="js">
import Vue from 'vue'
import { dtaskcomments, dtaskdone, dtaskdel } from '@/components/dialog'
export default {
  name: 'taskcards',
  components: {dtaskcomments, dtaskdone, dtaskdel},
  props: {
    value: { require: true, type: Array },
    archived: [Boolean, Number]
  },
  data: () => ({
    visionMap: {}
  }),
  methods: {
    openTaskMenu (tid) {
      Vue.set(this.visionMap, tid, !this.visionMap[tid])
    },
    taskMenuOptions (task) {
      return this.projectBlocks(this.blocks[task.block].project).filter(b => b.id !== task.block)
    },
    assigned (task) { return this.users[task.assigned] },
    color (task) {
      return (task.status === 0 && new Date(task.end).getTime() < new Date().getTime()) ||
        (task.status === 1 && new Date(task.end).getTime() < new Date(task.finished).getTime())
        ? 'error'
        : this.blocks[task.block].color
    },
    rating (task) {
      let max = this.daysBetween(new Date(task.created), new Date(task.end))
      return Math.min(this.daysBetween(
        task.created,
        (task.status === 0 ? new Date() : task.finished)
      ), max)
    },
    overdue (task) {
      let today = new Date()
      let end = new Date(task.end)
      let finished = new Date(task.finished)
      return task.status === 1
        ? finished.getTime() > end.getTime()
          ? Math.abs(this.daysBetween(finished, end))
          : undefined
        : today.getTime() > end.getTime()
          ? Math.abs(this.daysBetween(today, end))
          : undefined
    },
    ratecolor (task) {
      let max = this.daysBetween(task.created, task.end)
      return this.temperColorInvert(max, this.rating(task))
    },
    slidemax (task) {
      return this.daysBetween(new Date(task.created), new Date(task.end))
    },
    canRemove (task) {
      const block = this.blocks[task.block]
      const taskProject = this.projects[block.project]
      return task.creator === this.loggedUser || (taskProject || {}).manager === this.loggedUser
    },
    update (val) {
      this.$emit('input', val)
    }
  }
}
</script>
<style scoped>
.task-delayed {
  background-color: rgba(255, 0, 0, 0.3) !important;
}
.no-padding div.v-expansion-panel__header,
.no-padding div.v-list__tile {
  padding-top: 0px !important;
  padding-right: 0px !important;
  padding-bottom: 0px !important;
  padding-left: 0px !important;
  display: block !important;
  }
  .task-action-block-left {
    max-width: 24px !important;
    position: absolute;
    left: -8px;
    margin: auto;
  }
  .task-action-block-right {
    max-width: 24px !important;
    position: absolute;
    right: -8px;
    top: -10px;
    /* transform: tanslateY(-100%); */
  }
</style>


