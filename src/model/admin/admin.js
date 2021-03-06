import Vue from 'vue';
import AppAdmin from './index';
import createRouter from '../../router/admin';

Vue.config.productionTip = false


const router = createRouter();
/* eslint-disable no-new */
new Vue({
  el: '#admin',
  router,
  components: { AppAdmin },
  template: '<AppAdmin/>'
})