<template>
  <v-card class="elevation-10">
    <v-card-title class="layout column justify-center">
      <h1 class="display-3 primary--text text-xs-center">Welcome to Guideme</h1>
      <div class="caption text-xs-center">
        <b>Sign Up</b> below and try guideme on your new projects.
        <hr class="primary my-1">
      </div>
    </v-card-title>
    <v-form>
      <v-layout row wrap justify-space-around>
        <v-flex xs10 md5>
          <v-text-field class="my-0"
            label="User Name"
            name="loginusername"
            model="loginusername"
            type="text"
          >
          </v-text-field>
        </v-flex>
        <v-flex xs10 md5>
          <v-text-field class="my-0"
            label="Email"
            name="email"
            model="email"
            type="email">
          </v-text-field>
        </v-flex>
        <v-flex xs10 md5>
          <v-text-field class="my-0"
            label="Password"
            name="password"
            model="password"
            type="password"
          >
          </v-text-field>
        </v-flex>
        <v-flex xs10 md5>
          <v-text-field class="my-0"
            label="Confirm Password"
            name="confirmPassword"
            model="confirmPassword"
            type="password"
          >
          </v-text-field>
        </v-flex>
      </v-layout>
    </v-form>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn round color="success" nuxt to="/dashboard">Sign up</v-btn>
    </v-card-actions>
    <hr class="primary my-1">
    <v-card-actions>
      <em>Already using Guideme?</em>
      <v-spacer></v-spacer>
      <v-btn color="primary" small flat nuxt to="/signin">Sign in</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  layout: 'login',
  data () {
    return {
      loginusername: '',
      password: '',
      corfirmPassword: ''
    }
  }
}
</script>
