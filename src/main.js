import Vue from 'vue'
import router from './router/index'

new Vue({
  el: '#app',
  router,
  render(h) {
    return h({template: '<router-view></router-view>'})
  }
})
