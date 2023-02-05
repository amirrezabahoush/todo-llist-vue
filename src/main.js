import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import routes from './routes';
import store from './store/store';
// import dateMixin from './mixins/date';
import './index.css';

Vue.config.productionTip = false

Vue.use(VueResource);
Vue.use(VueRouter);

// Vue.mixin(dateMixin);

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
