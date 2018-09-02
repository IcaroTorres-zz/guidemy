<template>
  <v-app dark>
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      :mini-variant.sync="mini"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile @click.stop="mini = !mini">
          <v-list-tile-action>
            <v-icon>{{miniIcon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{miniText}}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list dense>
        <template v-for="(item, j) in items">
          <v-layout
            v-if="item.heading"
            :key="item.heading"
            row
            align-center
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2">EDIT</a>
            </v-flex>
          </v-layout>

          <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="j"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <template v-for="(child, i) in item.children">
              <dialogproject :edition="false" :key="child.component" v-if="child.component && child.component === 'project'">
                <v-list-tile :slot="child.slot">
                    <v-list-tile-action v-if="child.icon">
                      <v-icon>{{ child.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>
                        {{ child.text }}
                      </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
              </dialogproject>
              <dialogtask v-else-if="child.component && child.component === 'task'" :key="child.component">
                <v-list-tile :slot="child.slot">
                    <v-list-tile-action v-if="child.icon">
                      <v-icon>{{ child.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>
                        {{ child.text }}
                      </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
              </dialogtask>
              <v-list-tile v-else :key="i">
                <v-list-tile-action v-if="child.icon">
                  <v-icon>{{ child.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ child.text }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list-group>
          <v-list-tile v-else :key="item.text" @click="() => (console.log('aaaa'))">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp" color="primary" light app fixed :style="{ 'z-index': '99' }"
    >
      <v-toolbar-title style="width: 300px" class="ml-0">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <nuxt-link nuxt to="/" class="white--text flat-link hidden-sm-and-down" v-text="apptitle"/>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <v-badge slot="activator" color="red" overlap left>
          <span slot="badge" dark>{{notifications.filter(n => n.status === 0).length}}</span>
          <v-btn icon>
            <v-icon large>notifications</v-icon>
          </v-btn>
        </v-badge>
        <span>Unreaded notifications</span>
      </v-tooltip>
      <v-btn icon large>
        <v-avatar size="46px">
          <img
            :src="user.profilePicture"
            :alt="user.username"
          >
        </v-avatar>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container align-center>
        <nuxt/>
      </v-container>
    </v-content>
    <dialogproject :edition="false">
       <v-btn fab bottom right color="primary" slot="customactivator" dark fixed><v-icon>add</v-icon></v-btn>
    </dialogproject>
  </v-app>
</template>

<script>
  import dialogproject from '../components/dialog-project.vue'
  import dialogtask from '../components/dialog-task.vue'
  export default {
    components: {dialogproject, dialogtask},
    data: () => ({
      mini: true,
      drawer: true,
      items: [
        { icon: 'update', text: 'Dailies' },
        {
          icon: 'table_chart',
          'icon-alt': 'view_carousel',
          text: 'Projects',
          model: false,
          children: [
            { icon: 'add', text: 'Create Project', slot: 'customactivator', component: 'project' },
            { icon: 'view_stream', text: 'View all' },
            { icon: 'group', text: 'View Teams' }
          ]
        },
        {
          icon: 'view_week',
          'icon-alt': 'view_column',
          text: 'Tasks',
          model: false,
          children: [
            { icon: 'add', text: 'Create task', slot: 'customactivator', component: 'task' },
            { icon: 'view_week', text: 'View all' }
          ]
        },
        { icon: 'settings', text: 'Settings' },
        { icon: 'chat_bubble', text: 'Send feedback' },
        { icon: 'help', text: 'Help' }
      ]
    }),
    computed: {
      miniIcon () { return this.mini ? 'chevron_right' : 'chevron_left' },
      miniText () { return this.mini ? '' : 'Shrink navigation' },
      user () {
        return this.$store.getters.userByName('icarotorres')
      },
      notifications () {
        return this.$store.getters.userNotifications(this.user.id)
      }
    },
    props: {
      source: String
    }
  }
</script>