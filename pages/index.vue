<template>
  <v-card class="elevation-10">
    <v-card-title class="layout column justify-center">
      <div class="display-3 primary--text text-xs-center">Welcome Back</div>
      <div class="caption text-xs-center">
        <b>Sign In</b> below to continue managing your projects.
        <hr class="primary my-1">
      </div>
      <v-alert
        v-if="!!appError"
        :value="!!appError"
        type="error"
        dismissible
        @input="clearError"
      >
        {{appError.message}}
      </v-alert>
    </v-card-title>
    <v-layout row wrap justify-center>
      <v-form 
        v-model="valid" 
        @submit.prevent="signin"
        @keydown.prevent.enter>
        <v-text-field class="my-0"
          label="Email or User Name"
          name="emailOrUsername"
          v-model="newUser.emailOrUsername"
          type="text"
          required
          :rules="[v => !!v || 'Field is required']"
        >
        </v-text-field>
        <v-text-field class="my-0"
          label="Password"
          name="password"
          v-model="newUser.password"
          type="password"
          required
          :rules="[v => !!v || 'Field is required']"
        >
        </v-text-field>
        <v-btn color="success" block type="submit" :disabled="!valid">Sign in</v-btn>
      </v-form>
    </v-layout>
    <hr class="primary my-1">
    <v-card-actions>
      <em>Not Registered yet?</em>
      <v-spacer></v-spacer>
      <v-btn color="primary" small flat nuxt to="/signup">Sign up</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { routeMixin } from '@/mixins'
export default {
  layout: 'login',
  mixins: [routeMixin],
  data: () => ({
    valid: false,
    newUser: {
      emailOrUsername: '',
      password: ''
    }
  }),
  fetch ({ store, params }) {
    return store.dispatch('fetchAppData')
      .then((res) => {
        console.warn(res)
        // store.commit('setStars', res.data)
      })
  },
  methods: {
    signin () {
      if (this.valid) {
        const emailOrUsername = this.newUser.emailOrUsername.trim().toLowerCase()
        const emailPattern = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)
        const payload = {
          email: emailPattern.test(emailOrUsername)
            ? emailOrUsername
            : this.$store.getters.emailByUsername(emailOrUsername),
          username: !this.$store.getters.available(emailOrUsername)
            ? emailOrUsername
            : this.$store.getters.usernameByEmail(emailOrUsername),
          password: this.password
        }
        this.$store.dispatch('signin', payload)
          .then((result) => {
            if (result) {
              if (result.username) {
                console.log(result)
                console.warn(`User ${result.username} - ${result.email}: logged On sucessfully`)
                this.$router.push('/dashboard')
              } else throw new Error('Invalid E-mail or Username!!')
            } else throw Error('Request failed!!')
          })
          .catch(error => console.warn(error))
      }
    }
  }
}
</script>
