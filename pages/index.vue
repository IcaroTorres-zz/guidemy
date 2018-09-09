<template>
  <v-card class="elevation-10">
    <v-card-title class="layout justify-center">
      <div class="display-2 primary--text">Welcome to {{apptitle}}</div>
    </v-card-title>
    <v-card-text class="caption text-xs-center">
      <b>Sign Up</b> below and try {{apptitle}} on your new projects.
      <hr class="primary my-1">
    </v-card-text>
      <v-form v-model="valid" ref="form" @submit.prevent="signup">
        <v-layout row wrap justify-space-around>
          <v-flex xs10 sm5>
            <v-text-field
              label="User Name"
              name="username"
              v-model="newUser.username"
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
              v-model="newUser.displayName"
              type="text"
              :rules="displayNameRules"
              required
            >
            </v-text-field>
          </v-flex>
          <v-flex xs11>
            <v-text-field
              label="Email"
              name="email"
              v-model="newUser.email"
              type="email"
              :rules="emailRules"
              required>
            </v-text-field>
          </v-flex>
          <v-flex xs10 sm5>
            <v-text-field
              label="Password"
              name="password"
              v-model="newUser.password"
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
              v-model="newUser.confirmPassword"
              type="password"
              :rules="[confirmRule]"
              :error-messages="!confirmRule ? ['password confirmation not matching with password'] : []"
              required
            >
            </v-text-field>
          </v-flex>
          <v-flex xs11>
            <v-layout>
              <v-spacer></v-spacer>
              <v-btn color="success" type="submit" :disabled="!valid" @submit="">Register</v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-form>
    <v-card-text class="body-2 text-xs-justify">
      <hr class="primary my-1">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel quo praesentium, soluta omnis rem nostrum aperiam fugiat ab numquam dolor!
      <div class="text-xs-right">
        <em><small>&mdash; Ícaro Torres</small></em>
      </div>
      <hr class="primary my-1">
    </v-card-text>
    <v-card-actions>
      <em>Already using {{apptitle}}?</em>
      <v-spacer></v-spacer>
      <v-btn color="primary" flat nuxt to="/signin">Sign in</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  layout: 'login',
  data: (vm) => ({
    valid: false,
    newUser: {
      username: '',
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
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
    confirmRule () {
      return this.newUser.password === this.newUser.confirmPassword
    },
    fixUserName () {
      return this.newUser.username.replace(' ', '').toLowerCase()
    },
    available () {
      return () => !!this.$store.getters.available(this.fixUserName) || 'User name not available'
    }
  },
  methods: {
    signup () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('signup', {
          ...this.newUser,
          password: this.password
        })
          .then((responseUser) => {
            console.log(responseUser)
            this.$router.push('/home')
          })
          .catch(error => {
            this.$store.dispatch('setError', { message: error.message })
          })
      }
    }
  }
}
</script>
