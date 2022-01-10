import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
Vue.use(VueCompositionAPI);

import './directives';
import App from './App.vue';

import './assets/styles/index.css';
// import "vue2-datepicker/index.css";


Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
