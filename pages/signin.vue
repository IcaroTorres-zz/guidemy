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
      <v-form>
        <v-text-field class="my-0"
          label="Email or User Name"
          name="emailOrUsername"
          model="emailOrUsername"
          type="text"
        >
        </v-text-field>
        <v-text-field class="my-0"
          label="Password"
          name="password"
          model="password"
          type="password"
        >
        </v-text-field>
        <v-btn color="success" block round nuxt to="/dashboard">Sign in</v-btn>
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
  data () {
    return {
      emailOrUsername: '',
      password: ''
    }
  }
}
</script>
