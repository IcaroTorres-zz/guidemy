<template>
  <v-card tile class="elevation-10">
    <v-card-text class="layout column justify-center">
      <div class="text-xs-center hidden-md-and-up">
        <img src="../assets/logo1-alpha.png" alt="Guideme" height="60px">
        <h1 class="headline primary--text">{{apptitle}}</h1>
        <div class="body-2 grey--text">Agile Tracker.</div>
      </div>
      <div class="display-1 primary--text text-xs-center">Sign <u>Up</u></div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text class="caption text-xs-center">
      <b>Sign Up</b> below and try {{apptitle}} on your new projects.
      <hr class="primary my-1">
      <v-alert
        v-if="!!appError"
        :value="!!appError"
        type="error"
        dismissible
      >
        {{appError.message}}
      </v-alert>
    </v-card-text>
    <v-form 
      v-model="valid" 
      ref="form" 
      @submit.prevent="signup"
      @keydown.prevent.enter>
      <v-card-text>
        <v-layout row wrap justify-space-between align-center>
          <v-flex xs10 sm5>
            <v-text-field
              label="User Name"
              name="username"
              v-model.trim="newUser.username"
              type="text"
              :rules="[...usernameRules, available]"
              required
            >
            </v-text-field>
          </v-flex>
          <v-flex xs10 sm5>
            <v-text-field
              label="Your displayed name"
              name="displayname"
              v-model.trim="newUser.displayName"
              type="text"
              :rules="displayNameRules"
              required
            >
            </v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              label="Email"
              name="email"
              v-model.trim="newUser.email"
              type="email"
              :rules="emailRules"
              required>
            </v-text-field>
          </v-flex>
          <v-flex xs12 sm5>
            <v-text-field
              label="Password"
              name="password"
              v-model.trim="newUser.password"
              type="password"
              :rules="[v => !!v || 'Password is required']"
              required
            >
            </v-text-field>
          </v-flex>
          <v-flex xs10 sm5>
            <v-text-field
              label="Confirm Password"
              name="confirmPassword"
              v-model.trim="newUser.confirmPassword"
              type="password"
              :rules="[confirmRule]"
              :error-messages="!confirmRule ? ['password confirmation not matching with password'] : []"
              required
            >
            </v-text-field>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" type="submit" :disabled="!valid" >Register</v-btn>
      </v-card-actions>
    </v-form>
    <v-progress-linear
      color="info"
      height="2"
      v-show="!!isLoading"
      :indeterminate="true"/>
    <hr class="primary my-1" v-show="!isLoading">
    <v-card-actions>
      <em>Already using {{apptitle}}?</em>
      <v-spacer></v-spacer>
      <v-btn color="primary" flat nuxt to="/">Sign in</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { routeMixin } from '@/mixins'
import { mapMutations, mapState } from 'vuex'
export default {
  layout: 'login',
  mixins: [routeMixin],
  data: (vm) => ({
    valid: false,
    newUser: {
      username: '',
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
      isLoading: false
    },
    usernameRules: [
      v => !!v || 'Name is required',
      v => (!!v && v.length <= 15) || 'Name must be less than 10 characters'
    ],
    displayNameRules: [
      v => (v && v.length <= 25) || 'Required and less than 25 characters'
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(v) || 'E-mail must be valid'
    ]
  }),
  computed: {
    ...mapState(['appLoading', 'appError']),
    confirmRule () {
      return this.newUser.password === this.newUser.confirmPassword
    },
    fixUserName () {
      return this.newUser.username.toLowerCase()
    },
    available () {
      return () => !!this.$store.getters.available(this.fixUserName) || 'User name not available'
    }
  },
  methods: {
    ...mapMutations(['setError', 'clearError']),
    signup () {
      this.isLoading = true
      if (this.$refs.form.validate()) {
        this.$store.dispatch('signup', {
          ...this.newUser,
          password: this.password
        }).then((responseUser) => {
          // console.log(responseUser)
        }).then(() => this.$store.dispatch('fetchAppData'))
          .then((data) => this.$router.push('/dashboard'))
          .catch(error => {
            console.warn(error)
            this.$store.dispatch('setError', { message: error.message || error })
          })
      }
      this.isLoading = false
    }
  }
}
</script>
