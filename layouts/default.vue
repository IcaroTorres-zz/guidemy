<template>
  <v-app :dark="lightOut"
    class="hide-overflow"
    style="position: relative;">
    <v-navigation-drawer
      v-model="sidebarVisible"
      :mini-variant.sync="mini"
      fixed floating
      app
      style="z-index: 6;"
    >
      <v-layout v-if="!mini">
        <v-img :src="signedImage" height="220">
          <v-layout column align-center justify-content-start fill-height class="white--text">
            <v-spacer></v-spacer>
            <div class="text-xs-center">
              <router-link to="/dashboard" v-html="apptitle" class="flat-link white--text headline"/>
            </div>
            <small>signed as</small>
            <v-avatar size="64px">
              <img :src="loggedUserObj.picture" alt="">
            </v-avatar>
            <div class="title info--text"> {{loggedUserObj.username}}</div>
            <div>
              Projects: {{userProjects(loggedUser).length}} - Tasks: {{userTasks(loggedUser).length}}
            </div>
            <v-list dense class="pa-0" style="width: 100%;">
              <v-list-tile @click.stop.prevent="toggleMini">
                <v-list-tile-action>
                  <v-tooltip bottom>
                    <v-icon slot="activator" class="white--text" @click.stop="toggleLight">invert_colors</v-icon>
                    <span>Turn lights</span>
                  </v-tooltip>
                </v-list-tile-action>
                <v-list-tile-content>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-tooltip bottom>
                    <v-icon slot="activator" class="white--text">{{miniIcon}}</v-icon>
                    <span>shrink navigation</span>
                  </v-tooltip>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-layout>
          <!-- </v-container> -->
        </v-img>
      </v-layout>
      <v-list dense class="pa-0" v-else>
        <v-list-tile @click.stop.prevent="toggleMini">
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
            <v-subheader v-html="item.groupHeading"/>
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
    <v-toolbar 
      color="transparent" 
      app
      fixed
      flat
      :style="{ 'z-index': '5' }">
      <v-toolbar-title>
        <v-toolbar-side-icon @click.native="sidebarVisible = !sidebarVisible"></v-toolbar-side-icon>
        <router-link to="/dashboard" v-html="apptitle" v-if="(sidebarVisible && mini) || !sidebarVisible"
          :class="{'hidden-sm-and-down flat-link': true, 'secondary--text': !lightOut, 'white--text': lightOut, 'headline': true}"/>
      </v-toolbar-title>
      <v-autocomplete
        style="opacity: .5"
        class="hidden-sm-and-down px-2"
        hide-details
        solo-inverted
        flat
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
      
      <v-tooltip bottom>
        <v-icon slot="activator" class="pa-2" v-if="!sidebarVisible" @click.stop="toggleLight">invert_colors</v-icon>
        <span>Turn lights</span>
      </v-tooltip>
      <v-spacer></v-spacer>
      <!-- <v-toolbar-items class="hidden-xs-only"> -->
      <!-- <template class="hidden-xs-only"> -->
        <v-btn :icon="smAndDown" flat nuxt :to="{ name: 'dashboard' }">
          <v-icon >dashboard</v-icon>
          <span class="hidden-sm-and-down">dashboard</span>
        </v-btn>
        <v-btn :icon="smAndDown" flat nuxt :to="{ name: 'archived' }">
          <v-icon>archive</v-icon>
          <span class="hidden-sm-and-down">archived</span>
        </v-btn>
        <v-btn :icon="smAndDown" flat nuxt :to="{ name: 'dailymeetings' }">
          <v-icon>supervised_user_circle</v-icon>
          <span class="hidden-sm-and-down">my dailies</span>
        </v-btn>
      <!-- </template> -->
      <!-- </v-toolbar-items> -->
      <v-tooltip bottom>
        <v-badge slot="activator" color="red" overlap>
          <span slot="badge">{{notifications.filter(n => n.status === 0).length}}</span>
          <v-icon class="pa-1">notifications</v-icon>
        </v-badge>
        <span>Unreaded notifications</span>
      </v-tooltip>
      <v-btn icon large v-if="!sidebarVisible">
        <v-avatar size="46px">
          <img :src="loggedUserObj.picture" :alt="loggedUserObj.username">
        </v-avatar>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid align-center class="guidemy-container pt-0">
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
  import { mapMutations, mapState, mapGetters } from 'vuex'
  export default {
    components: { dproject, dtask },
    data: (vm) => ({
      visibleSnack: false,
      sidebarVisible: true
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
      ...mapGetters(['loggedUserObj', 'lgAndUp', 'smAndDown', 'useravatar', 'userProjects', 'userTasks']),
      ...mapState([
        'sidebar',
        'mini',
        'lightOut',
        'appLoading',
        'appError',
        'loggedUser',
        'users',
        'snack'
      ]),
      signedImage () {
        return this.lightOut
          // ? 'https://images.unsplash.com/photo-1536267743923-0249225165d8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f6f0367366b35aadc9e0f2ae541db74d&auto=format&fit=crop&w=1350&q=80'
          ? 'http://coffecase.win/77/abc1f/material-design-wallpaper-red-034-by-charlie-henson_material-design-wallpaper-red-by-charlie-henson-devia-on-material-wallpapers-collection-for-free-downl.png'
          : 'https://images.unsplash.com/photo-1510070112810-d4e9a46d9e91?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0aa88cd9eb66029e5134a759d301d549&auto=format&fit=crop&w=500&q=60'
      },
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
      },
      items () {
        return [
          // { groupHeading: `<small>signined as </small><span class="subheading pl-2 info--text"> ${this.loggedUserObj.username}</span>` },
          { groupHeading: 'User' },
          { icon: 'portrait', text: 'Profile settings', soon: '( future feature )' },
          { icon: 'arrow_back', text: 'LogOut', action: this.logUserOut },
          { groupHeading: 'Management' },
          { icon: 'supervised_user_circle', text: 'Dailies', action: () => this.$router.push('/dailymeetings') },
          {
            heading: 'Manage project activities and handle tasks',
            icon: 'table_chart',
            'icon-alt': 'view_stream',
            text: 'Projects',
            model: false,
            children: [
              { icon: 'add', text: 'Create Project', slot: 'customactivator', component: 'dproject' },
              { icon: 'dashboard', text: 'Dashboard', action: () => this.$router.push('/dashboard') },
              { icon: 'archive', text: 'Archived', action: () => this.$router.push('/archived') }
            ]
          },
          { groupHeading: 'General settings' },
          { icon: 'settings', text: 'Settings', soon: '( future feature )' },
          { groupHeading: 'Help us to evolve' },
          { icon: 'chat_bubble', text: 'Send feedback', soon: '( future feature )' },
          { icon: 'help', text: 'Help', soon: '( future feature )' }
        ]
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
<style src="@/assets/style/style.css"></style>
<style scoped>
/* .v-content{
  overflow:hidden ;
} */
.guidemy-container {
  height: calc(100vh - 64px);
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
}
</style>
