import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';

Vue.use(VueRouter); // 미들웨어라고 한다.

const Login = {template: '<div> Login Page </div>'}
const NotFound = {template: '<div> Page not found </div>'};


const router = new VueRouter({
  mode: 'history', // url 에 * 없앰
  routes :[
    {path: '/', component: App},
    {path: '/login', component: Login},
    {path: '*', component: NotFound},
  ]
})

new Vue({
  el: '#app',
  router,
  render(h) {
    return h({template: '<router-view></router-view>'})
  }
})
