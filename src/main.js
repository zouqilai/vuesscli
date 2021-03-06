// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import createRouter from './router';
import VueResource from 'vue-resource';
import '@/common/stylus/index.styl';

Vue.config.productionTip = false

Vue.use(VueResource);

const router = createRouter();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
