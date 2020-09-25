import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'

import './assets/css/global.css';

Vue.config.productionTip = false;

Vue.filter('timespan', function(time: Date) {
  if (time) {
    return moment(String(time)).format('HH:mm:ss');
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
