import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import App from './App.vue';
import { RefinePlugin } from '../../packages/refine-vue/dist/vue2/refine-vue.esm';
import CustomCriterionRow from './custom-criterion-row';
import CustomDivider from './custom-divider';

Vue.use(RefinePlugin, {
  showLocators: true,
});

Vue.use(VueCompositionAPI);

Vue.component('custom-criterion-row', CustomCriterionRow);
Vue.component('custom-divider', CustomDivider);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
