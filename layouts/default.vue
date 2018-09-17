<template>
  <v-app :dark="lightOut">
    <v-navigation-drawer
      clipped
      v-model="sidebarVisible"
      :mini-variant.sync="mini"
      fixed floating
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
            v-if="item.groupHeading"
            :key="item.groupHeading"
            row
            justify-start
            align-center
          >
            <v-subheader>{{ item.groupHeading }}</v-subheader>
          </v-layout>

          <v-list-group
            subheader
            v-else-if="item.children"
            v-model="item.model"
            :key="j"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon="">
            <v-subheader style="font-size: 10px;" class="grey--text text--darken-2" v-text="item.heading" />
            <v-list-tile slot="activator" :disabled="!!item.soon">
              <v-list-tile-content>
                <v-list-tile-title class="layout row justify-space-between align-center">
                  {{ item.text }}
                  <span v-if="item.soon"
                  style="font-size: 10px;"
                  class="ml-2 grey--text text--darken-2"
                  v-text="item.soon"/>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <template v-for="(child, i) in item.children">
              <dproject
                style="width: 100%;"
                :edition="false"
                :key="child.component"
                v-if="child.component && child.component === 'dproject'">
                <v-list-tile
                  @click="child.action ? child.action() : ''"
                  :slot="child.slot"
                  style="width: 100%;">
                  <v-list-tile-action v-if="child.icon">
                    <v-icon>{{ child.icon }}</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>
                      {{ child.text }}
                      <span v-if="child.soon"
                        style="font-size: 10px;"
                        class="ml-2 grey--text text--darken-2"
                        v-text="child.soon"/>
                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </dproject>

              <dtask 
                style="width: 100%;"
                v-else-if="child.component && child.component === 'task'"
                :key="child.component">
                <v-list-tile
                  @click="child.action ? child.action() : ''"
                  style="width: 100%;"
                  :slot="child.slot" 
                  :disabled="!!child.soon">
                    <v-list-tile-action v-if="child.icon">
                      <v-icon>{{ child.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>
                        {{ child.text }}
                        <span v-if="child.soon"
                        style="font-size: 10px;"
                        class="ml-2 grey--text text--darken-2"
                        v-text="child.soon"/>
                      </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
              </dtask>
              <v-list-tile v-else
                :key="i"
                :disabled="!!child.soon"
                @click="child.action ? child.action() : ''">
                <v-list-tile-action v-if="child.icon">
                  <v-icon>{{ child.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ child.text }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider inset :key="child.text" v-if="i !== item.children.length - 1"/>
            </template>
          </v-list-group>
          <v-list-tile
            v-else
            :disabled="!!item.soon"
            :key="item.text"
            @click="item.action ? item.action() : ''">
            <v-list-tile-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="layout row justify-space-between align-center">
                {{ item.text }}
                <span v-if="item.soon"
                  style="font-size: 10px;"
                  class="ml-2 grey--text text--darken-2"
                  v-text="item.soon"/>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar clipped-left color="primary" app fixed flat :style="{ 'z-index': '5' }">
      <v-toolbar-title style="width: 300px" class="ml-0">
        <v-toolbar-side-icon @click.native="sidebarVisible = !sidebarVisible"></v-toolbar-side-icon>
        <router-link to="/" v-html="apptitle"
          :class="{'hidden-sm-and-down flat-link': true, 'secondary--text': !lightOut, 'white--text': lightOut, 'headline': true}"/>
      </v-toolbar-title>

      <v-autocomplete
        class="hidden-sm-and-down"
        hide-details
        solo-inverted
        prepend-inner-icon="search"
        :menu-props="{'closeOnClick':true, 'closeOnContentClick': true}"
        label="search users"
        :items="Object.values(users)"
        item-text="username"
        item-value="id"
      >
        <v-list-tile :to="{name: 'user', params: {user: data.item.username}}" slot="item" slot-scope="data"  class="pa-0">
          <v-list-tile-avatar>
            <img :src="useravatar(data.item.id)">
          </v-list-tile-avatar>
            <v-list-tile-content>
            <v-list-tile-title v-html="data.item.displayName || data.item.username"></v-list-tile-title>
            <v-list-tile-sub-title class="caption grey--text" v-html="data.item.username"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-autocomplete>

      <v-spacer></v-spacer>
      
      <v-toolbar-items>
        <v-btn flat small nuxt :to="{ name: 'dailymeetings' }">
          <v-icon >update</v-icon>my dailies
        </v-btn>
        <v-btn flat small nuxt :to="{ name: 'dashboard' }">
          <v-icon >dashboard</v-icon>Dashboard
        </v-btn>
      </v-toolbar-items>
      <v-icon class="pa-2" @click.stop="toggleLight">invert_colors</v-icon>
      <v-tooltip bottom>
        <v-badge slot="activator" color="red" overlap>
          <span slot="badge">{{notifications.filter(n => n.status === 0).length}}</span>
          <v-icon class="pa-1">notifications</v-icon>
        </v-badge>
        <span>Unreaded notifications</span>
      </v-tooltip>
      <v-btn icon large>
        <v-avatar size="46px">
          <img :src="loggedUserObj.picture" :alt="loggedUserObj.username">
        </v-avatar>
      </v-btn>
    </v-toolbar>
    <v-progress-linear
      color="info"
      height="3"
      v-if="!!appLoading"
      :indeterminate="true"/>
    <v-content>
      <h1 class="display-1 text-xs-center">{{routeLabel}}</h1>
      <v-container align-center class="py-0">
        <nuxt/>
      </v-container>
    </v-content>
     <v-snackbar
      bottom
      left
      v-model="visibleSnack"
      :color="snack.color"
      :multi-line="!lgAndUp"
    >
      {{ snack.message }}
      <v-btn
        dark
        flat
        @click="dissmissSnack"
      >
        dismiss
      </v-btn>
    </v-snackbar>
    <dproject>
      <v-btn
        fab 
        bottom 
        right 
        color="primary" 
        slot="customactivator" 
        :dark="lightOut"
        fixed>
        <v-icon>add</v-icon>
      </v-btn>
    </dproject>
  </v-app>
</template>

<script>
  import { dproject, dtask } from '@/components/dialog'
  import { mapMutations } from 'vuex'
  export default {
    components: { dproject, dtask },
    data: (vm) => ({
      visibleSnack: false,
      sidebarVisible: true,
      items: [
        { groupHeading: 'User' },
        { icon: 'portrait', text: 'Profile settings', soon: '( future feature )' },
        { icon: 'arrow_back', text: 'LogOut', action: vm.logUserOut },
        { groupHeading: 'Management' },
        { icon: 'update', text: 'Dailies', action: () => vm.$router.push('dailymeetings') },
        {
          heading: 'Manage project activities and handle tasks',
          icon: 'table_chart',
          'icon-alt': 'dashboard',
          text: 'Projects',
          model: false,
          children: [
            { icon: 'add', text: 'Create Project', slot: 'customactivator', component: 'dproject' },
            { icon: 'view_stream', text: 'Dashboard', action: () => vm.$router.push('dashboard') },
            { icon: 'archive', text: 'Archived', action: () => vm.$router.push('archived') }
          ]
        },
        { groupHeading: 'General settings' },
        { icon: 'settings', text: 'Settings', soon: '( future feature )' },
        { groupHeading: 'Help us to evolve' },
        { icon: 'chat_bubble', text: 'Send feedback', soon: '( future feature )' },
        { icon: 'help', text: 'Help', soon: '( future feature )' }
      ]
    }),
    watch: {
      sidebarVisible (val) {
        this.toggleSidebar(val)
      },
      loggedUser (val) {
        if (!val) {
          console.warn('User logged out', val)
          this.$router.push('/')
        }
      },
      watch: {
        appLoading (val, oldval) {
          // console.log(val, oldval, 'app loading state change')
          if (val) {
            this.$nuxt.$loading.start()
          } else this.$nuxt.$loading.finish()
        }
      },
      snack: {
        deep: true,
        handler (val, oldval) {
          if (val) {
            this.visibleSnack = val.active
          }
        }
      }
    },
    mounted () {
      this.sidebarVisible = this.sidebar
      if (!this.loggedUser) {
        console.warn('User logged out')
        this.$router.push('/')
      }
    },
    computed: {
      routeLabel () {
        let params = this.$route.params
        let suffix = ''
        for (let key in params) {
          suffix += ` - ${params[key]}`
        }
        return (this.$route.name || '').toUpperCase() + suffix || this.loggedUserObj.username
      },
      miniIcon () { return this.mini ? 'chevron_right' : 'chevron_left' },
      miniText () { return this.mini ? '' : 'Shrink navigation' },
      notifications () {
        return this.$store.getters.userNotifications(this.loggedUser)
      }
    },
    methods: {
      logUserOut () {
        this.$store.dispatch('logOut')
      },
      ...mapMutations([
        'toggleSidebar',
        'toggleMini',
        'toggleLight',
        'toggleSnack'
      ]),
      dissmissSnack () {
        this.visibleSnack = false
      }
    }
  }
</script>