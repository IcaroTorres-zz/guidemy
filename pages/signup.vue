<template>
  <v-card class="elevation-10">
    <v-card-title class="layout justify-center">
      <div class="display-3 amber--text text--darken-4">Welcome to Guideme</div>
    </v-card-title>
    <v-card-text class="caption text-xs-center">
      <b>Sign Up</b> below and try guideme on your new projects.
      <hr class="amber darken-4 my-1">
    </v-card-text>
      <v-form>
        <v-layout row wrap justify-space-around>
          <v-flex xs10 md5>
            <v-text-field
              label="User Name"
              name="username"
              model="username"
              type="text"
            >
            </v-text-field>
          </v-flex>
          <v-flex xs10 md5>
            <v-text-field
              label="Email"
              name="email"
              model="email"
              type="email">
            </v-text-field>
          </v-flex>
          <v-flex xs10 md5>
            <v-text-field
              label="Password"
              name="password"
              model="password"
              type="password"
            >
            </v-text-field>
          </v-flex>
          <v-flex xs10 md5>
            <v-text-field
              label="Confirm Password"
              name="confirmPassword"
              model="confirmPassword"
              type="password"
            >
            </v-text-field>
          </v-flex>
        </v-layout>
      </v-form>
    <v-card-text class="body-2 text-xs-justify">
      <hr class="amber darken-4 my-1">
      When your team needs to kick off a project, hire a new employee, deploy some code,
      review a sales contract, finalize next year's budget, measure an A/B test,
      plan your next office opening, and more, Slack has you covered.
      <div class="text-xs-right">
        <em><small>&mdash; Ícaro Torres</small></em>
      </div>
      <hr class="amber darken-4 my-1">
    </v-card-text>
    <v-card-actions>
      <em>Already using Guideme?</em>
      <v-spacer></v-spacer>
      <v-btn color="success" flat nuxt to="/inspire">Sign in</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  layout: 'login',
  data () {
    return {
      username: '',
      password: '',
      corfirmPassword: ''
    }
  }
}
</script>
