import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import './directives';
import App from './App.vue';

import './assets/styles/index.css';

Vue.use(VueCompositionAPI);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
