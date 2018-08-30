import Vue from 'vue'
import Vuetify from 'vuetify'
import VueChartkick from 'vue-chartkick'
import Highcharts from 'highcharts'
import './mixins'

Vue.use(VueChartkick, { adapter: Highcharts })

Vue.use(Vuetify, {
  theme: {
    'primary': '#607d8b',
    'secondary': '#424242',
    'accent': '#80deea',
    'error': '#ef5350',
    'info': '#4fc3f7',
    'success': '#66bb6a',
    'warning': '#ffc107'
  }
})
