import Vue from 'vue';
import AppAdmin from './admin/index';
import createRouter from './router';

Vue.config.productionTip = false


const router = createRouter();
/* eslint-disable no-new */
new Vue({
  el: '#admin',
  router,
  components: { AppAdmin },
  template: '<AppAdmin/>'
})