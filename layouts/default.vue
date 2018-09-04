<template>
  <v-app :dark="lightOut">
    <v-navigation-drawer
      :clipped="lgAndUp"
      :value="sidebar"
      :mini-variant.sync="mini"
      fixed
      app
    >
      <v-list dense :class="{'pa-0': true, 'secondary darken-1': lightOut, 'grey lighten-1': !lightOut}">
        <v-list-tile @click.stop="toggleMini">
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
      <v-list dense class="pa-0">
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
              <dproject :edition="false" :key="child.component" v-if="child.component && child.component === 'dproject'">
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
              </dproject>
              <dtask v-else-if="child.component && child.component === 'task'" :key="child.component">
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
              </dtask>
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
          <v-list-tile v-else :key="item.text" @click="">
            <v-list-tile-action v-if="item.icon">
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
      :clipped-left="lgAndUp" color="primary" app fixed :style="{ 'z-index': '5' }"
    >
      <v-toolbar-title style="width: 300px" class="ml-0">
        <v-toolbar-side-icon @click.stop="toggleSidebar"></v-toolbar-side-icon>
        <router-link to="/" v-html="apptitle"
          :class="{'hidden-sm-and-down flat-link': true, 'secondary--text': !lightOut, 'white--text': lightOut, 'headline': true}"/>
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
      <v-toolbar-items>
        <v-btn flat small @click.stop="toggleLight">
          <v-icon small>invert_colors</v-icon>
        </v-btn>
        <v-btn flat small nuxt :to="{ name: 'dashboard' }">
          <v-icon>dashboard</v-icon>Dashboard
        </v-btn>
      </v-toolbar-items>
      <v-tooltip bottom>
        <v-badge slot="activator" color="red" overlap left>
          <span slot="badge">{{notifications.filter(n => n.status === 0).length}}</span>
          <v-btn icon>
            <v-icon large>notifications</v-icon>
          </v-btn>
        </v-badge>
        <span>Unreaded notifications</span>
      </v-tooltip>
      <v-btn icon large>
        <v-avatar size="46px">
          <img :src="loggedUserObj.profilePicture" :alt="loggedUserObj.username">
        </v-avatar>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container align-center class="py-0">
        <nuxt/>
      </v-container>
    </v-content>
    <dproject>
       <v-btn fab bottom right color="primary" slot="customactivator" :dark="lightOut" :light="!lightOut" fixed><v-icon>add</v-icon></v-btn>
    </dproject>
  </v-app>
</template>

<script>
  import { dproject, dtask } from '../components/dialog'
  export default {
    components: { dproject, dtask },
    data: () => ({
      items: [
        { icon: 'update', text: 'Dailies' },
        {
          icon: 'table_chart',
          'icon-alt': 'view_carousel',
          text: 'Projects',
          model: false,
          children: [
            { icon: 'add', text: 'Create Project', slot: 'customactivator', component: 'dproject' },
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
      notifications () {
        return this.$store.getters.userNotifications(this.loggedUser)
      }
    }
  }
</script>