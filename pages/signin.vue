<template>
  <v-card class="elevation-10">
    <v-card-title class="layout column justify-center">
      <div class="display-3 primary--text text-xs-center">Welcome Back</div>
      <div class="caption text-xs-center">
        <b>Sign In</b> below to continue managing your projects.
        <hr class="primary my-1">
      </div>
    </v-card-title>
    <v-layout row wrap justify-center>
      <v-form v-model="valid" @submit.prevent="signin">
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
        <v-btn color="success" block type="submit">Sign in</v-btn>
      </v-form>
    </v-layout>
    <hr class="primary my-1">
    <v-card-actions>
      <em>Not Registered yet?</em>
      <v-spacer></v-spacer>
      <v-btn color="primary" small flat nuxt to="/">Sign up</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  layout: 'login',
  data: () => ({
    valid: false,
    newUser: {
      emailOrUsername: '',
      password: ''
    }
  }),
  methods: {
    signin () {
      if (this.valid) {
        const patt = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)
        if (patt.test(this.emailOrUsername)) {
          this.$store.dispatch('signin', {email: this.emailOrUsername, password: this.password})
            .then((responseUser) => {
              console.log(responseUser)
              this.$router.push('/home')
            })
        } else if (!this.$store.getters.available(this.emailOrUsername.trim().toLowerCase())) {
          const username = this.emailOrUsername
          this.$store.dispatch('signin', {
            email: this.$store.getters.email(username),
            password: this.password
          })
            .then((responseUser) => {
              console.log(responseUser)
              this.$router.push('/home')
            })
        } else {
          this.$store.dispatch('setError', {
            message: 'The password is invalid or the user does not have a password.'
          })
        }
      }
    }
  }
}
</script>
