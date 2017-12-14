import Vue from 'vue'
import App from './App.vue'
import axios from "axios"
Vue.prototype.$http=axios;
//导入vue-notify-message
import notifyMsg from "./lib/index.js"
Vue.use(notifyMsg);

new Vue({
  el: '#app',
  render: h => h(App)
})
